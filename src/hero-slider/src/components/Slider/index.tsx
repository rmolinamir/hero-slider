import React from 'react';
import { useInView } from 'react-intersection-observer';
import IntervalTimer, { EState } from '../../dependencies/IntervalTimer';
import { EAnimations, SliderProps, EOrientation, TouchState } from './typings';
import HeroSliderModuleCss from './HeroSlider.module.css';
import Context, { SliderContext } from '../Context';
import Buttons from '../Buttons';
import { EActionTypes, HeroSliderProps } from '../Context/typings';
import useSettings from './hooks/useSettings';
import useLayout from './hooks/useLayout';
import useController from './hooks/useController';

const Slider = (props: SliderProps) => {
  console.log('[Slider] rerender');

  const [sliderRef, sliderDimensions] = useLayout();

  const [settings, setSettings] = useSettings(props);

  const {
    activeSlide,
    prevActiveSlide,
    isDoneSliding,
    slidingDirection,
    getNextSlide,
    changeSlide,
    setNextSlide,
    setPreviousSlide
  } = useController(props, settings);

  const initialTouchState: TouchState = {
    initialX: undefined,
    initialY: undefined,
    currentX: undefined,
    currentY: undefined,
    finalX: undefined,
    finalY: undefined
  };

  const [touchState, setTouchState] =
    React.useState<TouchState>(initialTouchState);

  /**
   * `slidingTimeoutDuration` is the total time it takes for
   * the transition of each slide. It's the sum of the duration
   * of the slide, plus any delay of the animation.
   */
  const slidingTimeoutDuration =
    (settings.slidingDuration + settings.slidingDelay) * 1.1; // 110% safety factor.

  const setSlidingAnimation = React.useCallback(
    (newAnimation: string) => {
      setSettings({
        ...settings,
        slidingAnimation: newAnimation
      });
    },
    [settings]
  );

  const { dispatchProps, slidesArray } = React.useContext(SliderContext);

  /**
   * `smartAnimations` decides which animation to do next depending on the chosen
   * animation set by the programmer, the current and next slides, and if
   * `settings.initialSlidingAnimation` is `true`.
   */
  const smartAnimations = (): void => {
    let forwardAnimationClass: string;
    let backwardAnimationClass: string;
    switch (settings.initialSlidingAnimation) {
      case EAnimations.FADE:
        return setSlidingAnimation(HeroSliderModuleCss.Sliding_Fade_In);
      case EAnimations.TOP_TO_BOTTOM:
      case EAnimations.BOTTOM_TO_TOP:
        forwardAnimationClass = HeroSliderModuleCss.Sliding_Bottom_To_Top;
        backwardAnimationClass = HeroSliderModuleCss.Sliding_Top_To_Bottom;
        break;
      case EAnimations.RIGHT_TO_LEFT:
      case EAnimations.LEFT_TO_RIGHT:
        forwardAnimationClass = HeroSliderModuleCss.Sliding_Right_To_Left;
        backwardAnimationClass = HeroSliderModuleCss.Sliding_Left_To_Right;
        break;
    }
    if (slidingDirection === 'forward')
      setSlidingAnimation(forwardAnimationClass);
    else if (slidingDirection === 'backward')
      setSlidingAnimation(backwardAnimationClass);
    else {
      // const isLooping =
      //   (prevActiveSlide === slidesArray.length && activeSlide === 1) ||
      //   (prevActiveSlide === 1 && activeSlide === slidesArray.length);
      const isSlidingForward = activeSlide > prevActiveSlide;
      if (isSlidingForward) setSlidingAnimation(forwardAnimationClass);
      else setSlidingAnimation(backwardAnimationClass);
    }
  };

  const [autoplayHandlerTimeout, setAutoplayHandlerTimeout] =
    React.useState<NodeJS.Timeout>();

  /**
   * Autoplay manually paused state handled by the autoplay buttons.
   */
  const [isManuallyPaused, setIsManuallyPaused] = React.useState(false);

  /**
   * `autoplay` is the callback sent to the autoplay instance.
   */
  const autoplay = (): void => {
    changeSlide(getNextSlide(activeSlide));
  };

  const autoplayInstance = IntervalTimer.new(
    autoplay,
    settings.autoplayDuration + slidingTimeoutDuration
  );

  /**
   * `autoplayHandler` will pause the autoplay timer whenever the mouse
   * moves over the slider. If the mouse stops moving the autoplay will
   * resume. If not, `onMouseMoveCaptureHandler` will also clear the
   * `autoplayInstance`resume `setTimeout` callbacks if any exist, so
   * that the slides won't move if the user is interacting with the
   * slider component.
   */
  const autoplayHandler = (): void => {
    const isPausedOrIdle =
      autoplayInstance.state === EState.IDLE || isManuallyPaused;
    if (isPausedOrIdle) return; // If the slider has been paused, do nothing.
    autoplayInstance.pause();
    if (autoplayHandlerTimeout) clearTimeout(autoplayHandlerTimeout);
    const autoplayHandlerTimeoutId = setTimeout(() => {
      autoplayInstance.resume();
    }, settings.autoplayHandlerTimeout);
    setAutoplayHandlerTimeout(autoplayHandlerTimeoutId);
  };

  /**
   * `onMouseMoveCaptureHandler` executes `autoplayHandler` whenever the user moves the mouse
   * over the slider.
   */
  const onMouseMoveCaptureHandler = (): void => {
    if (settings.shouldAutoplay) {
      autoplayHandler();
    }
  };

  /**
   * `onTouchStartHandler` sets the initial coordinates of the touch event.
   */
  const onTouchStartHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    const initialX = event.touches[0].clientX;
    const initialY = event.touches[0].clientY;
    setTouchState({
      ...touchState,
      initialX,
      initialY
    });
  };

  /**
   * `onTouchMoveHandler` sets the current coordinates of the touch event to the state.
   */
  const onTouchMoveHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    setTouchState({
      ...touchState,
      currentX,
      currentY
    });
  };

  /**
   * `onTouchEndHandler` determines in which direction **and** sense (vector) the user is sliding.
   * Animations are then set accordingly depending on which direction the user is dragging and
   * the slide is changed. Finally the touch state is set back to the initial state, where
   * everything is undefined.
   */
  const onTouchEndHandler = () => {
    const diffX: number =
      touchState && Number(touchState.initialX) - Number(touchState.currentX);
    const diffY: number =
      touchState && Number(touchState.initialY) - Number(touchState.currentY);
    const thresholdToSlide = 50;

    const isSlidingHorizontally: boolean = Math.abs(diffX) > Math.abs(diffY);
    const isSliderSetHorizontally: boolean =
      settings.sliderOrientation === EOrientation.HORIZONTAL;
    const isSliderVertically: boolean =
      settings.sliderOrientation === EOrientation.VERTICAL;

    if (
      isSlidingHorizontally &&
      isSliderSetHorizontally &&
      Math.abs(diffX) >= thresholdToSlide
    ) {
      // Sliding horizontally.
      if (diffX > 0) {
        // Swiped left.
        setNextSlide();
      } else {
        // Swiped right.
        setPreviousSlide();
      }
    } else if (isSliderVertically && Math.abs(diffY) >= thresholdToSlide) {
      // Sliding vertically.
      if (diffY > 0) {
        // Swiped up.
        setNextSlide();
      } else {
        // Swiped down.
        setPreviousSlide();
      }
    }
    setTouchState(initialTouchState);
  };

  const onArrowKeypressHandler = (e: KeyboardEvent): void => {
    const isHorizontal = settings.sliderOrientation === EOrientation.HORIZONTAL;
    switch (true) {
      // Left keypress.
      case isHorizontal && e.keyCode === 37:
        setPreviousSlide();
        break;
      // Right keypress.
      case isHorizontal && e.keyCode === 39:
        setNextSlide();
        break;
      // Up keypress.
      case !isHorizontal && e.keyCode === 38:
        setPreviousSlide();
        break;
      // Down keypress.
      case !isHorizontal && e.keyCode === 40:
        setNextSlide();
        break;
      default: // Do nothing.
    }
  };

  /**
   * After mounting, akin to `componentDidMount`.
   */
  React.useEffect(() => {
    /**
     * Turn on autoplay if `props.shouldAutoplay` is true.
     */
    // if (settings.shouldAutoplay) {
    //   autoplayInstance.start();
    // }
    if (settings.shouldSlideOnArrowKeypress) {
      window.addEventListener('keydown', onArrowKeypressHandler);
    }
    /**
     * Clearing any existing timeouts to avoid memory leaks, and clear event listener.
     */
    return () => {
      clearTimeout(autoplayHandlerTimeout && +autoplayHandlerTimeout);
      autoplayInstance.stop();
      if (settings.shouldSlideOnArrowKeypress) {
        window.removeEventListener('keydown', onArrowKeypressHandler);
      }
    };
  }, []);

  /**
   * Sets up the `nextSlide` reference object if they exist.
   */
  React.useEffect(() => {
    if (props.nextSlide) props.nextSlide.current = setNextSlide;
  }, [setNextSlide]);

  /**
   * Sets up the `previousSlide` reference object if they exist.
   */
  React.useEffect(() => {
    if (props.previousSlide) props.previousSlide.current = setPreviousSlide;
  }, [setPreviousSlide]);

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = React.useMemo(() => {
    return {
      // Default: 800ms
      '--sliding-duration': `${settings.slidingDuration}ms`,
      // Default: 0ms
      '--sliding-delay': `${settings.slidingDelay}ms`,
      // Default: HeroSliderModuleCss.Sliding_Left_To_Right.
      '--sliding-animation': settings.slidingAnimation,
      // Default: 800ms
      '--slide-transition-delay': `${
        settings.slidingDuration + settings.slidingDelay
      }ms`,
      '--slider-width': sliderDimensions.width
        ? `${sliderDimensions.width}px`
        : undefined,
      '--slider-height': sliderDimensions.height
        ? `${sliderDimensions.height}px`
        : undefined,
      '--slider-color': settings.sliderColor,
      '--slider-fade-in-duration': `${settings.sliderFadeInDuration}ms`,
      '--nav-fade-in-duration': `${settings.navbarFadeInDuration}ms`,
      '--nav-fade-in-delay': `${settings.navbarFadeInDelay}ms`,
      '--nav-background-color': props.navbarSettings
        ? props.navbarSettings.color
        : undefined,
      '--nav-active-color': props.navbarSettings
        ? props.navbarSettings.activeColor
        : undefined,
      // Default: 800ms
      '--mask-duration': `${settings.slidingDuration + settings.slidingDelay}ms`
    };
  }, [
    settings,
    props.navbarSettings,
    sliderDimensions.height,
    sliderDimensions.width
  ]);

  const [inViewTimeoutHandler, setInViewTimeoutHandler] =
    React.useState<NodeJS.Timeout>();

  /**
   * Subscribe to changes in `inView`.
   * If the slider goes out of the viewport, then pause the slider autoplay
   * instance if it's running. If it comes back into viewport, resume the
   * autoplay instance.
   */
  React.useLayoutEffect(() => {
    if (settings.shouldAutoplay) {
      console.log('autoplayInstance.state', autoplayInstance.state);
      console.log('EState', EState[autoplayInstance.state]);
      console.log('props.inView', props.inView);
      if (inViewTimeoutHandler) clearTimeout(inViewTimeoutHandler);
      switch (true) {
        case isManuallyPaused:
          break;
        // When not in view, stop the autoplay.
        case !props.inView:
          console.log('STOPPPING');
          autoplayInstance.stop();
          setInViewTimeoutHandler(undefined);
          break;
        // When in view and idle, start it.
        case autoplayInstance.state === EState.IDLE && props.inView: {
          console.log('STARTING TIMEOUT');
          const timeoutId = setTimeout(() => {
            console.log('STARTING');
            autoplayInstance.start();
          }, settings.autoplayHandlerTimeout);
          setInViewTimeoutHandler(timeoutId);
          break;
        }
        // When in view and paused, resume it.
        case autoplayInstance.state === EState.PAUSED && props.inView: {
          console.log('RESUMING TIMEOUT');
          const timeoutId = setTimeout(() => {
            console.log('RESUMING');
            autoplayInstance.resume();
          }, settings.autoplayHandlerTimeout);
          setInViewTimeoutHandler(timeoutId);
          break;
        }
      }
    }
    return () => {
      if (inViewTimeoutHandler) clearTimeout(inViewTimeoutHandler);
    };
  }, [
    autoplayInstance,
    isManuallyPaused,
    props.inView,
    settings.shouldAutoplay,
    settings.autoplayHandlerTimeout
  ]);

  // Setting navbars props for the contexts.
  React.useEffect(() => {
    if (dispatchProps && typeof dispatchProps === 'function') {
      dispatchProps({
        type: EActionTypes.SET_NAVBAR_PROPS,
        payload: {
          activeSlide,
          // TODO: Might cause issues
          changeSlide,
          totalSlides: slidesArray.length,
          sliderWidth: sliderDimensions.width || 0
        }
      });
    }
  }, [activeSlide, dispatchProps, sliderDimensions.width, slidesArray.length]);

  // Setting autoplay buttons props props for the contexts.
  React.useEffect(() => {
    if (dispatchProps && typeof dispatchProps === 'function') {
      dispatchProps({
        type: EActionTypes.SET_AUTOPLAY_BUTTON_PROPS,
        payload: {
          setIsManuallyPaused,
          autoplayHandlerTimeout,
          shouldAutoplay: settings.shouldAutoplay,
          autoplay: { current: autoplayInstance }
        }
      });
    }
  }, [
    dispatchProps,
    setIsManuallyPaused,
    settings.shouldAutoplay,
    autoplayHandlerTimeout,
    autoplayInstance
  ]);

  React.useEffect(() => {
    console.log('isDoneSliding', isDoneSliding);
    if (isDoneSliding) {
      if (settings.shouldAutoplay && !isManuallyPaused) {
        console.log('RESETTING');
        autoplayInstance.reset();
      }
    }
  }, [
    isDoneSliding,
    autoplayInstance,
    isManuallyPaused,
    settings.shouldAutoplay
  ]);

  /**
   * Handles slide changes. If the user interacts with the slide, the timer of the
   * autoplay instance is reset and the next animation is algo decided depending on
   * the parameter (which is a slide number) **so long as it has not been manually paused**.
   */
  React.useEffect(() => {
    // TODO: Autoplay logic should be handled inside an autoplay hook
    clearTimeout(autoplayHandlerTimeout && +autoplayHandlerTimeout);
    // TODO: Animation logic should be handled inside an animation hook
    if (settings.isSmartSliding) smartAnimations();
    return () => {};
  }, [activeSlide]);

  return (
    <div
      ref={sliderRef}
      onTouchStart={onTouchStartHandler}
      onTouchMove={onTouchMoveHandler}
      onTouchEnd={onTouchEndHandler}
      style={{
        ...(CSSVariables as React.CSSProperties),
        ...props.style,
        width: settings.width,
        height: settings.height
      }}
      onMouseMoveCapture={onMouseMoveCaptureHandler}
      className={HeroSliderModuleCss.Wrapper}
    >
      {props.children}

      {settings.shouldDisplayButtons && (
        <Buttons
          isHorizontal={settings.sliderOrientation === EOrientation.HORIZONTAL}
          previousSlide={setPreviousSlide}
          nextSlide={setNextSlide}
        />
      )}
    </div>
  );
};

export default function HeroSlider(props: HeroSliderProps) {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0
  });

  return (
    <Context>
      <div className="rm-hero-slider" ref={ref}>
        <Slider {...props} inView={inView} />
      </div>
    </Context>
  );
}
