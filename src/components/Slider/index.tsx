// Libraries
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

// Dependencies
import IntervalTimer, { EState } from '../../dependencies/IntervalTimer';
import {
  EAnimations,
  ISettings,
  ISliderProps,
  EOrientation,
  ISliderDimensions,
  ITouchState,
  // IChildren,
  // ISlideProps,
  // IMenuNavProps,
  // INavProps,
  // IAutoplayButtonProps,
  IWithProviderProps,
  EActionTypes,
} from '../../typings/definitions';
import { setInitialSlidingAnimation } from '../../dependencies/setInitialSlidingAnimation';

// CSS
import HeroSliderModuleCss from './HeroSlider.module.css';

// Components
import Context, { SliderContext } from '../Context';
import Buttons from '../Buttons';

const { useContext, useEffect } = React;

const HeroSlider = React.memo((props: ISliderProps) => {
  const {
    onBeforeChange,
    onAfterChange,
    onChange,
  } = props;

  /**
   * Slider reference object to calculate its dimensions.
   */
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [sliderDimensions, setSliderDimensions] = React.useState<ISliderDimensions>({});
  /**
   * Initial settings for the carousel.
   */
  const initialSettings: ISettings = React.useMemo(
    () => ({
      // Dependants
      initialSlidingAnimation: props.slidingAnimation || EAnimations.RIGHT_TO_LEFT,
      slidingAnimation: setInitialSlidingAnimation(props.slidingAnimation),
      sliderOrientation: props.orientation || EOrientation.HORIZONTAL,
      // Defaults
      slidingDuration: 500,
      slidingDelay: 200,
      sliderColor: 'inherit',
      sliderFadeInDuration: 100,
      navbarFadeInDuration: 1000,
      navbarFadeInDelay: 500,
      isSmartSliding: true,
      shouldDisplayButtons: true,
      shouldAutoplay: true,
      shouldSlideOnArrowKeypress: false,
      autoplayDuration: 8000,
      autoplayHandlerTimeout: 1000,
      width: '100%',
      height: '100%',
      ...props.settings,
    }),
    [props.settings, props.orientation, props.slidingAnimation],
  );

  const [sliderSettings, setSettings] = React.useState<ISettings>(initialSettings);

  const settings = React.useMemo(
    () => ({
      ...sliderSettings,
      ...props.settings,
    }),
    [sliderSettings, props.settings],
  );

  const initialTouchState: ITouchState = {
    initialX: undefined,
    initialY: undefined,
    currentX: undefined,
    currentY: undefined,
    finalX: undefined,
    finalY: undefined,
  };

  const [touchState, setTouchState] = React.useState<ITouchState>(initialTouchState);

  const [activeSlide, setActiveSlide] = React.useState(props.initialSlide || 1);
  const [isDoneSliding, setIsDoneSliding] = React.useState(true);
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
  const isDoneSlidingWatcher = React.useRef<boolean>(true);
  const activeSlideWatcher = React.useRef(activeSlide);

  const [delayTimeout, setDelayTimeout] = React.useState<NodeJS.Timeout>();
  const [slidingTimeout, setSlidingTimeout] = React.useState<NodeJS.Timeout>();

  /**
   * `slidingTimeoutDuration` is the total time it takes for
   * the transition of each slide. It's the sum of the duration
   * of the slide, plus any delay of the animation.
   */
  const slidingTimeoutDuration = (
    (settings.slidingDuration + settings.slidingDelay) * 1.1
  ); // 110% safety factor.

  const setSlidingAnimation = React.useCallback(
    (newAnimation: string) => {
      setSettings({
        ...settings,
        slidingAnimation: newAnimation,
      });
    },
    [settings],
  );

  /**
   * `onSlidingHandler` sets `isDoneSliding` as false when executed
   * and triggers a `setTimeout` that will set `isDoneSliding` as true
   * after the time it takes for the slide to change passes.
   * Saves the timeout ID to `slidingTimeout`.
   * The `onChange` and `onAfterChange` events are executed here.
   */
  const onSlidingHandler = React.useCallback(
    (nextSlide: number): void => {
      setIsDoneSliding(false);
      // Only save the delay timeout if `onChange` exists.
      if (onChange) {
        const delayTimeoutId = setTimeout(
          () => {
            onChange && onChange(nextSlide);
          },
          settings.slidingDelay,
        );
        setDelayTimeout(delayTimeoutId);
      }
      // Sliding timeout ID's for the transitions.
      const slidingTimeoutId = setTimeout(
        () => {
          setIsDoneSliding(true);
          if (onAfterChange) {
            onAfterChange(nextSlide);
          }
        },
        slidingTimeoutDuration,
      );
      // Saving the timeout ID's in case clearing them is needed.
      setSlidingTimeout(slidingTimeoutId);
    },
    [onChange, onAfterChange, settings.slidingDelay, slidingTimeoutDuration],
  );

  /**
   * `changeSlide` sets a new slide then executes `onSlidingHandler` to handle
   * the smooth transition and set `isDoneSlidingWatcher.current` (like a pointer)
   * as true. While `isDoneSliding` is true, no the slides won't change.
   * The `onBeforeChange` event is executed here.
   */
  const changeSlide = React.useCallback(
    (nextSlide: number): void => {
      if (isDoneSlidingWatcher.current) {
        if (onBeforeChange) {
          onBeforeChange(activeSlideWatcher.current, nextSlide);
        }
        setActiveSlide(nextSlide);
        onSlidingHandler(nextSlide);
      }
    },
    [onSlidingHandler, onBeforeChange],
  );

  /**
   * `smartAnimations` decides which animation to do next depending on the chosen
   * animation set by the programmer, the current and next slides, and if
   * `settings.initialSlidingAnimation` is `true`.
   */
  const smartAnimations = React.useCallback(
    (nextSlide: number): void => {
      switch (settings.initialSlidingAnimation) {
        case EAnimations.TOP_TO_BOTTOM:
        case EAnimations.BOTTOM_TO_TOP:
          if (nextSlide > activeSlideWatcher.current) {
            setSlidingAnimation(HeroSliderModuleCss.Sliding_Bottom_To_Top);
          } else {
            setSlidingAnimation(HeroSliderModuleCss.Sliding_Top_To_Bottom);
          }
          break;
        case EAnimations.RIGHT_TO_LEFT:
        case EAnimations.LEFT_TO_RIGHT:
          if (nextSlide > activeSlideWatcher.current) {
            setSlidingAnimation(HeroSliderModuleCss.Sliding_Right_To_Left);
          } else {
            setSlidingAnimation(HeroSliderModuleCss.Sliding_Left_To_Right);
          }
      }
    },
    [setSlidingAnimation, settings.initialSlidingAnimation],
  );

  const [autoplayHandlerTimeout, setAutoplayHandlerTimeout] = React.useState<NodeJS.Timeout>();

  /**
   * `getChildren` will categorize the `props.children` elements array into the `children` object.
   */
  // const getChildren = React.useCallback(
  //   (): IChildren => {
  //     const children: IChildren = {
  //       slidesArray: [],
  //       navbarsArray: [],
  //       autoplayButtonsArray: [],
  //       othersArray: [],
  //       navDescriptions: [],
  //     };
  //     React.Children.toArray(props.children).forEach((child) => {
  //       if (typeof child.type === 'function' && React.isValidElement(child)) {
  //         // tslint:disable-next-line:variable-name
  //         const RFC_CHILD: React.FunctionComponent = child.type as React.FunctionComponent;
  //         const displayName = RFC_CHILD.displayName;
  //         switch (displayName) {
  //           case 'hero-slider/slide':
  //             const props = child.props as ISlideProps;
  //             children.navDescriptions.push(props.navDescription);
  //             return children.slidesArray.push(child);
  //           case 'hero-slider/nav':
  //           case 'hero-slider/menu-nav':
  //             return children.navbarsArray.push(child);
  //           case 'hero-slider/autoplay-button':
  //             return children.autoplayButtonsArray.push(child);
  //           default:
  //             return children.othersArray.push(child);
  //         }
  //       }
  //       return children.othersArray.push(child);
  //     });
  //     return children;
  //   },
  //   [props.children],
  // );

  /**
   * Sets up initial slides array, `useMemo` is used for performance optimization since a loop is
   * ran inside `getChildren`.
   */
  // const children: IChildren = React.useMemo(
  //   () => {
  //     return getChildren();
  //   },
  //   [getChildren],
  // );

  /**
   * Autoplay manually paused state handled by the autoplay buttons.
   */
  const [isManuallyPaused , setIsManuallyPaused] = React.useState(false);

  const { dispatchProps, slidesArray } = useContext(SliderContext);

  // const { navbarsArray, autoplayButtonsArray, othersArray } = children;

  /**
   * Calculates the next slide based on the current slide (`activeSlide` by default)
   * based on the total amount of slides.
   */
  const getNextSlide = React.useCallback(
    (currentSlide: number = activeSlide) => {
      const totalSlides = slidesArray.length;
      let nextSlide: number;
      /**
       * If **not** at the last slide, then add one. Otherwise set the next slide back to 1.
       */
      if (currentSlide <= (totalSlides - 1)) {
        nextSlide = currentSlide + 1;
      } else {
        nextSlide = 1;
      }
      return nextSlide;
    },
    [activeSlide, slidesArray.length],
  );

  /**
   * `autoplay` is the callback sent to the autoplay instance.
   */
  const autoplay = React.useCallback(
    (): void => {
      const nextSlide = getNextSlide(activeSlideWatcher.current);
      if (settings.isSmartSliding) {
        smartAnimations(nextSlide);
      }
      changeSlide(getNextSlide(activeSlideWatcher.current));
    },
    [changeSlide, getNextSlide, settings.isSmartSliding, smartAnimations],
  );

  // const [autoplayInstance] = React.useState(React.useMemo(() => {
  //   return new IntervalTimer(autoplay, settings.autoplayDuration + slidingTimeoutDuration)
  // }, []))

  const autoplayInstanceRef = React.useRef((React.useMemo(
    () => {
      return new IntervalTimer(autoplay, settings.autoplayDuration + slidingTimeoutDuration);
    },
    [autoplay, settings.autoplayDuration, slidingTimeoutDuration])
  ));

  const autoplayInstance = autoplayInstanceRef.current;

  /**
   * Handles slide changes. If the user interacts with the slide, the timer of the
   * autoplay instance is reset and the next animation is algo decided depending on
   * the parameter (which is a slide number) **so long as it has not been manually paused**.
   */
  const changeSlideHandler = React.useCallback(
    (nextSlide: number, animationParam: number): void => {
      clearTimeout(autoplayHandlerTimeout && +autoplayHandlerTimeout);
      const isAutoplayPaused = autoplayInstance.state === EState.PAUSED || isManuallyPaused;
      if (settings.shouldAutoplay && !isAutoplayPaused) {
        autoplayInstance.reset();
      }
      if (settings.isSmartSliding) {
        smartAnimations(animationParam || nextSlide);
      }
      changeSlide(nextSlide);
    },
    [
      autoplayHandlerTimeout,
      autoplayInstance,
      changeSlide,
      isManuallyPaused,
      settings.isSmartSliding,
      settings.shouldAutoplay,
      smartAnimations,
    ],
  );

  /**
   * Changes the active slide to the next one.
   */
  const setNextSlide = () => {
    /**
     * Forces the animation to be set as the same always, it will slide from right to left,
     * or from top to bottom so long as the initial animation is not fade.
     */
    const animationParam = slidesArray.length + 1;
    changeSlideHandler(getNextSlide(activeSlideWatcher.current), animationParam);
  };

  /**
   * Calculates the previous slide similar to `getNextSlide`.
   */
  const getPreviousSlide = (currentSlide: number = activeSlide) => {
    const totalSlides = slidesArray.length;
    let nextSlide: number;
    /**
     * If **not** at the first slide, then add one. Otherwise set the next slide to the
     * last one.
     */
    if (currentSlide > 1) {
      nextSlide = currentSlide - 1;
    } else {
      nextSlide = totalSlides;
    }
    return nextSlide;
  };

  /**
   * Changes the active slide to the previous one.
   */
  const setPreviousSlide = () => {
    /**
     * Similar to `setNextSlide`, it will always slide from left to right,
     * or from bottom to top unless the fade animation is active.
     */
    const animationParam = 1;
    changeSlideHandler(getPreviousSlide(activeSlideWatcher.current), animationParam);
  };

  /**
   * `autoplayHandler` will pause the autoplay timer whenever the mouse
   * moves over the slider. If the mouse stops moving the autoplay will
   * resume. If not, `onMouseMoveCaptureHandler` will also clear the
   * `autoplayInstance`resume `setTimeout` callbacks if any exist, so
   * that the slides won't move if the user is interacting with the
   * slider component.
   */
  const autoplayHandler = (): void => {
    const isAutoplayPaused = autoplayInstance.state === EState.PAUSED || isManuallyPaused;
    if (isAutoplayPaused) { return; } // If the slider has been paused, do nothing.
    autoplayInstance.pause();
    if (autoplayHandlerTimeout) {
      clearTimeout(autoplayHandlerTimeout);
    }
    const autoplayHandlerTimeoutId = setTimeout(
      () => {
        autoplayInstance.resume();
      },
      settings.autoplayHandlerTimeout,
    );
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

  const setSliderDimensionsHandler = (): void => {
    const sliderDimensions: ISliderDimensions = {
      width: sliderRef.current ? sliderRef.current.clientWidth : undefined,
      height: sliderRef.current ? sliderRef.current.clientHeight : undefined,
    };
    setSliderDimensions(sliderDimensions);
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
      initialY,
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
      currentY,
    });
  };

  /**
   * `onTouchEndHandler` determines in which direction **and** sense (vector) the user is sliding.
   * Animations are then set accordingly depending on which direction the user is dragging and
   * the slide is changed. Finally the touch state is set back to the initial state, where
   * everything is undefined.
   */
  const onTouchEndHandler = () => {
    const diffX: number = touchState && Number(touchState.initialX) - Number(touchState.currentX);
    const diffY: number = touchState && Number(touchState.initialY) - Number(touchState.currentY);
    const thresholdToSlide = 50;

    const isSlidingHorizontally: boolean = Math.abs(diffX) > Math.abs(diffY);
    const isSliderSetHorizontally: boolean = settings.sliderOrientation === EOrientation.HORIZONTAL;
    const isSliderVertically: boolean = settings.sliderOrientation === EOrientation.VERTICAL;

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
    } else if (
        isSliderVertically &&
        Math.abs(diffY) >= thresholdToSlide
      ) {
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
   * Update the respective watchers' current values.
   */
  React.useEffect(
    () => {
      activeSlideWatcher.current = activeSlide;
    },
    [activeSlide],
  );
  React.useEffect(
    () => {
      isDoneSlidingWatcher.current = isDoneSliding;
    },
    [isDoneSliding],
  );

  /**
   * After mounting, akin to `componentDidMount`.
   */
  React.useEffect(
    () => {
      activeSlideWatcher.current = activeSlide;
      /**
       * Turn on autoplay if `props.shouldAutoplay` is true.
       */
      if (settings.shouldAutoplay) {
        autoplayInstance.start();
      }
      /**
       * Sets up the `nextSlide` and `previousSlide` reference object if they exist.
       */
      if (props.nextSlide) {
        props.nextSlide.current = setNextSlide;
      }
      if (props.previousSlide) {
        props.previousSlide.current = setPreviousSlide;
      }
      /**
       * Calculates the initial dimensions of the slider and adds event listener.
       */
      setSliderDimensionsHandler();
      window.addEventListener('resize', setSliderDimensions as EventListenerOrEventListenerObject);
      if (settings.shouldSlideOnArrowKeypress) {
        window.addEventListener('keydown', onArrowKeypressHandler);
      }
      /**
       * Clearing any existing timeouts to avoid memory leaks, and clear event listener.
       */
      return () => {
        clearTimeout(delayTimeout && +delayTimeout);
        clearTimeout(slidingTimeout && +slidingTimeout);
        clearTimeout(autoplayHandlerTimeout && +autoplayHandlerTimeout);
        autoplayInstance.stop();
        window.removeEventListener(
          'resize',
          setSliderDimensions as EventListenerOrEventListenerObject,
        );
        if (settings.shouldSlideOnArrowKeypress) {
          window.removeEventListener('keydown', onArrowKeypressHandler);
        }
      };
    },
    // eslint-disable-next-line
    [],
  );

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = React.useMemo(
    () => {
      return {
        // Default: 800ms
        '--sliding-duration': `${settings.slidingDuration}ms`,
        // Default: 0ms
        '--sliding-delay': `${settings.slidingDelay}ms`,
        // Default: HeroSliderModuleCss.Sliding_Left_To_Right.
        '--sliding-animation': settings.slidingAnimation,
        // Default: 800ms
        '--slide-transition-delay': `${settings.slidingDuration + settings.slidingDelay}ms`,
        '--slider-width': `${sliderDimensions.width}px`,
        '--slider-height': `${sliderDimensions.height}px`,
        '--slider-color': settings.sliderColor,
        '--slider-fade-in-duration': `${settings.sliderFadeInDuration}ms`,
        '--nav-fade-in-duration': `${settings.navbarFadeInDuration}ms`,
        '--nav-fade-in-delay': `${settings.navbarFadeInDelay}ms`,
        '--nav-background-color': props.navbarSettings ? props.navbarSettings.color : undefined,
        '--nav-active-color': props.navbarSettings ? props.navbarSettings.activeColor : undefined,
        // Default: 800ms
        '--mask-duration': `${settings.slidingDuration + settings.slidingDelay}ms`,
      };
    },
    [settings, props.navbarSettings, sliderDimensions.height, sliderDimensions.width],
  );

  /**
   * `setSlides` clones the necessary properties for each slide to work.
   */
  // const setSlides = React.useCallback(
  //   () => {
  //     return React.Children.map(slidesArray, (child, index) => {
  //       const currentSlide = index + 1;
  //       return (
  //         React.cloneElement(
  //           child as React.ReactElement<ISlideProps>,
  //           {
  //             isDoneSliding,
  //             isActive: activeSlide === currentSlide,
  //             slidingAnimation: settings.slidingAnimation,
  //           },
  //         )
  //       );
  //     });
  //   },
  //   [activeSlide, isDoneSliding, settings.slidingAnimation, slidesArray],
  // );

  /**
   * Performance optimization to avoid re-rendering after mouse over captures.
   * Only updates if `activeSlide` or `isDoneSliding` change.
   */
  // const slides = React.useMemo(
  //   () => {
  //     return children.slidesArray && setSlides();
  //   },
  //   [children.slidesArray, setSlides],
  // );

  /**
   * `setSlides` clones the necessary properties for each slide to work.
   */
  // const setAutoplayButtons = () => {
  //   return React.Children.map(autoplayButtonsArray, (child) => {
  //     return (
  //       React.cloneElement(
  //         child as React.ReactElement<IAutoplayButtonProps>,
  //         {
  //           setIsManuallyPaused,
  //           autoplayHandlerTimeout,
  //           autoplay: autoplayInstanceRef,
  //         },
  //       )
  //     );
  //   });
  // };

  /**
   * Performance optimization to avoid re-rendering after mouse over captures.
   * Only updates if `activeSlide` or `isDoneSliding` change.
   */
  // const autoplayButtons = children.autoplayButtonsArray && setAutoplayButtons();

  /**
   * `setNavbars`, similar to `setSlides`.
   * If it's a `menu-nav`, then the `navDescriptions` of each slide are also passed as props.
   */
  // const setNavbars = React.useCallback(
  //   () => {
  //     return React.Children.map(navbarsArray, (child) => {
  //       // tslint:disable-next-line:variable-name
  //       const RFC_CHILD: React.FunctionComponent = child.type as React.FunctionComponent;
  //       const isMenuNav = RFC_CHILD.displayName === 'hero-slider/menu-nav';
  //       const navProps = {
  //         changeSlide: changeSlideHandler,
  //         activeSlide: activeSlideWatcher.current,
  //         totalSlides: slidesArray.length,
  //       };
  //       if (isMenuNav) {
  //         return (
  //           React.cloneElement(
  //             child as React.ReactElement<IMenuNavProps>,
  //             {
  //               ...navProps,
  //               navDescriptions: children.navDescriptions,
  //               sliderWidth: sliderDimensions.width,
  //             },
  //           )
  //         );
  //       }
  //       return React.cloneElement(child as React.ReactElement<INavProps>, navProps);
  //     });
  //   },
  //   [
  //     changeSlideHandler,
  //     children.navDescriptions,
  //     navbarsArray,
  //     sliderDimensions.width,
  //     slidesArray.length,
  //   ],
  // );

  /**
   * Performance optimization similar to `slides`.
   */
  // const navbars = React.useMemo(
  //   () => {
  //     return children.slidesArray && setNavbars();
  //   },
  //   [children.slidesArray, setNavbars],
  // );

  const [inView, setInView] = React.useState(props.inView);

  /**
   * Subscribe to changes in `inView`.
   * If the slider goes out of the viewport, then pause the slider autoplay
   * instance if it's running. If it comes back into viewport, resume the
   * autoplay instance.
   */
  React.useEffect(
    () => {
      if (inView !== props.inView) {
        switch (true) {
          case isManuallyPaused:
            break;
          case autoplayInstance.state === EState.PAUSED && settings.shouldAutoplay && props.inView:
            autoplayInstance.resume();
            break;
          case autoplayInstance.state === EState.RUNNING && !props.inView:
            autoplayInstance.pause();
            break;
        }
        setInView(props.inView);
      }
    },
    [
      props.inView,
      inView,
      setInView,
      settings.shouldAutoplay,
      autoplayInstance.state,
      isManuallyPaused,
      autoplayInstance,
    ],
  );

  // Setting slides props for the contexts.
  useEffect(
    () => {
      if (dispatchProps && typeof dispatchProps === 'function') {
        dispatchProps({
          type: EActionTypes.SET_SLIDE_PROPS,
          payload: {
            activeSlide,
            isDoneSliding,
            slidingAnimation: settings.slidingAnimation,
          },
        });
      }
    },
    [dispatchProps, activeSlide, isDoneSliding, settings.slidingAnimation],
  );

  // Setting navbars props for the contexts.
  useEffect(
    () => {
      if (dispatchProps && typeof dispatchProps === 'function') {
        dispatchProps({
          type: EActionTypes.SET_NAVBAR_PROPS,
          payload: {
            changeSlide: changeSlideHandler,
            activeSlide: activeSlideWatcher.current,
            totalSlides: slidesArray.length,
            sliderWidth: sliderDimensions.width || 0,
          },
        });
      }
    },
    [
      changeSlideHandler,
      dispatchProps,
      sliderDimensions.width,
      slidesArray.length,
    ],
  );

  // Setting autoplay buttons props props for the contexts.
  useEffect(
    () => {
      if (dispatchProps && typeof dispatchProps === 'function') {
        dispatchProps({
          type: EActionTypes.SET_AUTOPLAY_BUTTON_PROPS,
          payload: {
            setIsManuallyPaused,
            autoplayHandlerTimeout,
            autoplay: autoplayInstanceRef,
          },
        });
      }
    },
    [
      dispatchProps,
      setIsManuallyPaused,
      autoplayHandlerTimeout,
      autoplayInstanceRef,
    ],
  );

  console.log('rerendering');

  return (
    <div
      ref={sliderRef}
      onTouchStart={onTouchStartHandler}
      onTouchMove={onTouchMoveHandler}
      onTouchEnd={onTouchEndHandler}
      style={{
        ...CSSVariables as React.CSSProperties,
        ...props.style,
        width: settings.width,
        height: settings.height,
      }}
      onMouseMoveCapture={onMouseMoveCaptureHandler}
      className={HeroSliderModuleCss.Wrapper}>
      {/* {navbars.length ? navbars : null} */}
      {/* {settings.shouldAutoplay && autoplayButtons.length ? autoplayButtons : null} */}
      {props.children}
      {/* {othersArray.length ? (
        <div className={HeroSliderModuleCss.Container}>
          {othersArray}
        </div>
      ) : null} */}
      {settings.shouldDisplayButtons && (
        <Buttons
          isHorizontal={settings.sliderOrientation === EOrientation.HORIZONTAL}
          previousSlide={setPreviousSlide}
          nextSlide={setNextSlide} />
      )}
    </div>
  );
});

const WithProvider = (props: IWithProviderProps) => {
  const {
    isMobile,
    ...rest
  } = props;
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <Context
      isMobile={isMobile}
    >
      <div
        className="rm-hero-slider"
        ref={ref}
      >
        <HeroSlider
          inView={inView}
          {...rest}
        />
      </div>
    </Context>
  );
};

export default React.memo(WithProvider);
