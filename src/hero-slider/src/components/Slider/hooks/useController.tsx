import React from 'react';
import { SliderContext } from '../../Context';
import { EActionTypes } from '../../Context/typings';
import { Settings, SliderProps } from '../typings';

// TODO: Refactor this more elegantly later
function usePreviousValue<Type>(value: Type): Type {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * Manages the Slider's slide transitions and event handlers.
 */
export default function useController(
  props: SliderProps,
  settings: Settings
): {
  activeSlide: number;
  prevActiveSlide: number;
  isDoneSliding: boolean;
  slidingDirection?: 'forward' | 'backward';
  getNextSlide(aSlide: number): number;
  getPreviousSlide(aSlide: number): number;
  changeSlide( // TODO: Make an interface
    nextSlide: number,
    slidingDirection?: 'forward' | 'backward'
  ): void;
  setNextSlide(): void; // TODO: Rename to `goToNextSlide`
  setPreviousSlide(): void; // TODO: Rename to `goToPrevSlide`
} {
  const { onBeforeChange, onAfterChange, onChange } = props;

  const { slidesArray, dispatchProps } = React.useContext(SliderContext);

  const [activeSlide, setActiveSlide] = React.useState(props.initialSlide || 1);
  const prevActiveSlide = usePreviousValue(activeSlide);

  // TODO: Rename to isSliding
  const [isDoneSliding, setIsDoneSliding] = React.useState(true);
  const [slidingDirection, setSlidingDirection] = React.useState<
    'forward' | 'backward'
  >();

  /**
   * `activeSlideWatcher` `isDoneSlidingWatcher` are a mutable
   * objects that will persist for the full
   * lifetime of the component.
   *  - `isDoneSlidingWatcher` will serve as a pointer in case
   *    a `nextSlide` event is called from outside.
   *  - `activeSlideWatcher` serves as a pointer to the `activeSlide`
   *    so that the auto play instance won't be out of sync with the
   *    current slide. It is updated during the `useEffects` subscribed
   *    to the `activeSlide` state whenever the user changes slide.
   */
  // TODO: Might not be necessary after refactor
  const isDoneSlidingWatcher = React.useRef<boolean>(true);
  // TODO: Might not be necessary after refactor
  const activeSlideWatcher = React.useRef(activeSlide);

  const [delayTimeout, setDelayTimeout] = React.useState<NodeJS.Timeout>();
  const [slidingTimeout, setSlidingTimeout] = React.useState<NodeJS.Timeout>();

  /**
   * `slidingTimeoutDuration` is the total time it takes for
   * the transition of each slide. It's the sum of the duration
   * of the slide, plus any delay of the animation.
   */
  const slidingTimeoutDuration =
    (settings.slidingDuration + settings.slidingDelay) * 1.1; // 110% safety factor.

  /**
   * Returns the slide after of the given slide (`activeSlide` by default)
   * based on the total amount of slides.
   */
  const getNextSlide = React.useCallback(
    (aSlide: number = activeSlide) => {
      const lastSlide = slidesArray.length;

      const isNotLastSlide = aSlide <= lastSlide - 1;

      let nextSlide: number;
      if (isNotLastSlide) nextSlide = aSlide + 1;
      else nextSlide = 1;

      return nextSlide;
    },
    [activeSlide, slidesArray.length]
  );

  /**
   * Returns the previous slide similar to `getNextSlide`.
   */
  const getPreviousSlide = (aSlide: number = activeSlide) => {
    const lastSlide = slidesArray.length;

    const isNotFirstSlide = aSlide > 1;

    let nextSlide: number;
    if (isNotFirstSlide) nextSlide = aSlide - 1;
    else nextSlide = lastSlide;

    return nextSlide;
  };

  /**
   * `changeSlide` sets a new slide then executes `onSlidingHandler` to handle
   * the smooth transition and set `isDoneSlidingWatcher.current` (like a pointer)
   * as true. While `isDoneSliding` is true, no the slides won't change.
   * The `onBeforeChange` event is executed here. This triggers a useEffect
   * that handles effects after the sliding is done.
   */
  const changeSlide = (
    nextSlide: number,
    slidingDirection?: 'forward' | 'backward'
  ): void => {
    if (isDoneSlidingWatcher.current) {
      console.log('[changeSlide] activeSlide: ', activeSlide);
      console.log('[changeSlide] nextSlide: ', nextSlide);
      console.log(
        '[changeSlide] activeSlideWatcher.current: ',
        activeSlideWatcher.current
      );
      console.log('[changeSlide] slidingDirection: ', slidingDirection);

      if (onBeforeChange) onBeforeChange(activeSlideWatcher.current, nextSlide);

      setIsDoneSliding(false);

      setSlidingDirection(slidingDirection);

      setActiveSlide(nextSlide);
    }
  };

  /**
   * Sets `isDoneSliding` as false when executed and triggers
   * a `setTimeout` that will set `isDoneSliding` as true
   * after the time it takes for the slide to change passes.
   * Saves the timeout ID to `slidingTimeout`.
   * The `onChange` and `onAfterChange` events are executed here.
   */
  React.useEffect(() => {
    activeSlideWatcher.current = activeSlide;

    function startSliding() {
      // Only save the delay timeout if `onChange` exists.
      if (onChange) {
        setDelayTimeout(
          setTimeout(() => {
            onChange(activeSlide);
          }, settings.slidingDelay)
        );
      }
    }

    startSliding();

    function finishSliding() {
      // Saving the timeout ID's in case clearing them is needed.
      setSlidingTimeout(
        setTimeout(() => {
          setIsDoneSliding(true);
          if (onAfterChange) {
            onAfterChange(activeSlide);
          }
        }, slidingTimeoutDuration)
      );
    }

    finishSliding();

    /**
     * Clearing any existing timeouts to avoid memory leaks, and clear event listener.
     */
    return () => {
      if (delayTimeout) clearTimeout(delayTimeout);
      if (slidingTimeout) clearTimeout(slidingTimeout);
    };
    // TODO: Might need to add these variables to useEffect deps array:
    // onChange, onAfterChange, settings.slidingDelay, slidingTimeoutDuration
  }, [activeSlide]);

  React.useEffect(() => {
    isDoneSlidingWatcher.current = isDoneSliding;
    if (isDoneSliding) setSlidingDirection(undefined);
  }, [isDoneSliding]);

  // TODO: Animation logic should be handled inside an autoplay hook
  // const setSlidingAnimation = React.useCallback(
  //   (newAnimation: string) => {
  //     setSettings({
  //       ...settings,
  //       slidingAnimation: newAnimation
  //     });
  //   },
  //   [settings]
  // );

  // TODO: Animation logic should be handled inside an autoplay hook
  // /**
  //  * `smartAnimations` decides which animation to do next depending on the chosen
  //  * animation set by the programmer, the current and next slides, and if
  //  * `settings.initialSlidingAnimation` is `true`.
  //  */
  // const smartAnimations = React.useCallback(
  //   (nextSlide: number): void => {
  //     switch (settings.initialSlidingAnimation) {
  //       case EAnimations.TOP_TO_BOTTOM:
  //       case EAnimations.BOTTOM_TO_TOP:
  //         if (nextSlide > activeSlideWatcher.current) {
  //           setSlidingAnimation(HeroSliderModuleCss.Sliding_Bottom_To_Top);
  //         } else {
  //           setSlidingAnimation(HeroSliderModuleCss.Sliding_Top_To_Bottom);
  //         }
  //         break;
  //       case EAnimations.RIGHT_TO_LEFT:
  //       case EAnimations.LEFT_TO_RIGHT:
  //         if (nextSlide > activeSlideWatcher.current) {
  //           setSlidingAnimation(HeroSliderModuleCss.Sliding_Right_To_Left);
  //         } else {
  //           setSlidingAnimation(HeroSliderModuleCss.Sliding_Left_To_Right);
  //         }
  //     }
  //   },
  //   [setSlidingAnimation, settings.initialSlidingAnimation]
  // );

  // /**
  //  * Handles slide changes. If the user interacts with the slide, the timer of the
  //  * autoplay instance is reset and the next animation is algo decided depending on
  //  * the parameter (which is a slide number) **so long as it has not been manually paused**.
  //  */
  // // TODO: Should be a useEffect...
  // const changeSlideHandler = React.useCallback(
  //   (nextSlide: number, animationParam: number): void => {
  //     // TODO: Autoplay logic should be handled inside an autoplay hook
  //     // clearTimeout(autoplayHandlerTimeout && +autoplayHandlerTimeout);
  //     // TODO: Animation logic should be handled inside an animation hook
  //     // if (settings.isSmartSliding) {
  //     //   smartAnimations(animationParam || nextSlide);
  //     // }
  //     changeSlide(nextSlide);
  //   },
  //   [
  //     // autoplayHandlerTimeout,
  //     changeSlide,
  //     settings.isSmartSliding,
  //     smartAnimations
  //   ]
  // );

  /**
   * Changes the active slide to the next one.
   */
  const setNextSlide = () => {
    // TODO: Animation logic should be handled inside an autoplay hook
    // /**
    //  * Forces the animation to be set as the same always, it will slide from right to left,
    //  * or from top to bottom so long as the initial animation is not fade.
    //  */
    // const animationParam = slidesArray.length + 1;
    // changeSlideHandler(
    //   getNextSlide(activeSlideWatcher.current),
    //   animationParam
    // );
    changeSlide(getNextSlide(activeSlideWatcher.current), 'forward');
  };

  /**
   * Changes the active slide to the previous one.
   */
  const setPreviousSlide = () => {
    // TODO: Animation logic should be handled inside an autoplay hook
    // /**
    //  * Similar to `setNextSlide`, it will always slide from left to right,
    //  * or from bottom to top unless the fade animation is active.
    //  */
    // const animationParam = 1;
    // changeSlideHandler(
    //   getPreviousSlide(activeSlideWatcher.current),
    //   animationParam
    // );
    changeSlide(getPreviousSlide(activeSlideWatcher.current), 'backward');
  };

  // TODO: Might or might not be needed, not sure.
  // /**
  //  * Update the respective watchers' current values.
  //  */
  // React.useEffect(() => {
  //   activeSlideWatcher.current = activeSlide;
  //   /**
  //    * Clearing any existing timeouts to avoid memory leaks, and clear event listener.
  //    */
  //   return () => {
  //     clearTimeout(delayTimeout && +delayTimeout);
  //     clearTimeout(slidingTimeout && +slidingTimeout);
  //   };
  // }, []);

  // Setting slides props for the contexts.
  React.useEffect(() => {
    if (dispatchProps && typeof dispatchProps === 'function') {
      dispatchProps({
        type: EActionTypes.SET_SLIDE_PROPS,
        payload: {
          activeSlide,
          isDoneSliding,
          slidingAnimation: settings.slidingAnimation
        }
      });
    }
  }, [dispatchProps, activeSlide, isDoneSliding, settings.slidingAnimation]);

  return {
    activeSlide,
    prevActiveSlide,
    isDoneSliding,
    slidingDirection,
    getNextSlide,
    getPreviousSlide,
    changeSlide,
    setNextSlide,
    setPreviousSlide
  };
}
