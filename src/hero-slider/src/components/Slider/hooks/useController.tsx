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
  const getNextSlide = (aSlide: number = activeSlide) => {
    const lastSlide = slidesArray.length;

    const isNotLastSlide = aSlide <= lastSlide - 1;

    let nextSlide: number;
    if (isNotLastSlide) nextSlide = aSlide + 1;
    else nextSlide = 1;

    return nextSlide;
  };

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
    console.log('[changeSlide] activeSlide: ', activeSlide);
    console.log('[changeSlide] nextSlide: ', nextSlide);
    console.log('[changeSlide] slidingDirection: ', slidingDirection);

    if (onBeforeChange) onBeforeChange(activeSlide, nextSlide);

    setIsDoneSliding(false);

    setSlidingDirection(slidingDirection);

    setActiveSlide(nextSlide);
  };

  /**
   * Changes the active slide to the next one.
   */
  const setNextSlide = () => {
    changeSlide(getNextSlide(activeSlide), 'forward');
  };

  /**
   * Changes the active slide to the previous one.
   */
  const setPreviousSlide = () => {
    changeSlide(getPreviousSlide(activeSlide), 'backward');
  };

  /**
   * Sets `isDoneSliding` as false when executed and triggers
   * a `setTimeout` that will set `isDoneSliding` as true
   * after the time it takes for the slide to change passes.
   * Saves the timeout ID to `slidingTimeout`.
   * The `onChange` and `onAfterChange` events are executed here.
   */
  React.useEffect(() => {
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
    if (isDoneSliding) setSlidingDirection(undefined);
  }, [isDoneSliding]);

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
