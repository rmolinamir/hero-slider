import * as React from 'react'
// Autoplay & Types
import IntervalTimer, { EState } from '../IntervalTimer'
import {
  EAnimations,
  ISettings,
  ISliderProps,
  EOrientation,
  ISliderDimensions,
  ITouchState,
  IChildren,
  ISlideProps,
  IMenuNavProps,
  INavProps,
  IAutoplayButtonProps,
  IWithProviderProps
} from './typings'
// CSS
import classes from './HeroSlider.module.css'
// JSX
import SliderContextProvider from './Context'
import Buttons from './Buttons'
import { useInView } from 'react-intersection-observer'

const setInitialSlidingAnimation = (animation?: EAnimations): string => {
  switch (animation) {
    case EAnimations.FADE:
      return classes.Sliding_Fade_In
    // Top to bottom.
    case EAnimations.TOP_TO_BOTTOM:
      return classes.Sliding_Top_To_Bottom
    // Bottom to top.
    case EAnimations.BOTTOM_TO_TOP:
      return classes.Sliding_Bottom_To_Top
    // Left to right.
    case EAnimations.LEFT_TO_RIGHT:
      return classes.Sliding_Left_To_Right
    // Right to left, by default.
    case EAnimations.RIGHT_TO_LEFT:
    default:
      return classes.Sliding_Right_To_Left
  }
}

const HeroSlider = React.memo((props: ISliderProps) => {
  /**
   * Initial settings for the carousel.
   */
  const initialSettings: ISettings = React.useMemo(() => ({
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
    ...props.settings
  }), [props.settings])

  const [settings, setSettings] = React.useState<ISettings>(initialSettings)

  /**
   * Subscribes to any changes made to the settings, then resets them through `setSettings`.
   */
  React.useEffect(() => {
    setSettings({
      ...settings,
      ...props.settings as ISettings
    })
  }, [props.settings])

  const setSlidingAnimation = (newAnimation: string) => {
    setSettings({
      ...settings,
      slidingAnimation: newAnimation
    })
  }

  /**
   * `changeSlide` sets a new slide then executes `onSlidingHandler` to handle the smooth transition and
   * set `isDoneSlidingWatcher.current` (like a pointer) as true. While `isDoneSliding` is true, no the
   * slides won't change.
   * The `onBeforeChange` event is executed here.
   */
  const changeSlide = (nextSlide: number): void => {
    if (isDoneSlidingWatcher.current) {
      if (props.onBeforeChange) {
        props.onBeforeChange(activeSlideWatcher.current, nextSlide)
      }
      setActiveSlide(nextSlide)
      onSlidingHandler(nextSlide)
    }
  }

  /**
   * `smartAnimations` decides which animation to do next depending on the chosen
   * animation set by the programmer, the current and next slides, and if
   * `settings.initialSlidingAnimation` is `true`.
   */
  const smartAnimations = (nextSlide: number): void => {
    switch (settings.initialSlidingAnimation) {
      case EAnimations.TOP_TO_BOTTOM:
      case EAnimations.BOTTOM_TO_TOP:
        if (nextSlide > activeSlideWatcher.current) {
          setSlidingAnimation(classes.Sliding_Bottom_To_Top)
        } else {
          setSlidingAnimation(classes.Sliding_Top_To_Bottom)
        }
        break
      case EAnimations.RIGHT_TO_LEFT:
      case EAnimations.LEFT_TO_RIGHT:
        if (nextSlide > activeSlideWatcher.current) {
          setSlidingAnimation(classes.Sliding_Right_To_Left)
        } else {
          setSlidingAnimation(classes.Sliding_Left_To_Right)
        }
    }
  }

  /**
   * Calculates the next slide based on the current slide (`activeSlide` by default)
   * based on the total amount of slides.
   */
  const getNextSlide = (currentSlide: number = activeSlide) => {
    const totalSlides = slidesArray.length
    let nextSlide: number
    /**
     * If **not** at the last slide, then add one. Otherwise set the next slide back to 1.
     */
    if (currentSlide <= (totalSlides - 1)) {
      nextSlide = currentSlide + 1
    } else {
      nextSlide = 1
    }
    return nextSlide
  }

  /**
   * Changes the active slide to the next one.
   */
  const setNextSlide = () => {
    /**
     * Forces the animation to be set as the same always, it will slide from right to left,
     * or from top to bottom so long as the initial animation is not fade.
     */
    const animationParam = slidesArray.length + 1
    changeSlideHandler(getNextSlide(activeSlideWatcher.current), animationParam)
  }

  /**
   * Calculates the previous slide similar to `getNextSlide`.
   */
  const getPreviousSlide = (currentSlide: number = activeSlide) => {
    const totalSlides = slidesArray.length
    let nextSlide: number
    /**
     * If **not** at the first slide, then add one. Otherwise set the next slide to the
     * last one.
     */
    if (currentSlide > 1) {
      nextSlide = currentSlide - 1
    } else {
      nextSlide = totalSlides
    }
    return nextSlide
  }

  /**
   * Changes the active slide to the previous one.
   */
  const setPreviousSlide = () => {
    /**
     * Similar to `setNextSlide`, it will always slide from left to right,
     * or from bottom to top unless the fade animation is active.
     */
    const animationParam = 1
    changeSlideHandler(getPreviousSlide(activeSlideWatcher.current), animationParam)
  }

  /**
   * Handles slide changes. If the user interacts with the slide, the timer of the
   * autoplay instance is reset and the next animation is algo decided depending on
   * the parameter (which is a slide number) **so long as it has not been manually paused**.
   */
  const changeSlideHandler = (nextSlide: number, animationParam: number): void => {
    clearTimeout(autoplayHandlerTimeout && +autoplayHandlerTimeout)
    const isAutoplayPaused = autoplayInstance.state === EState.PAUSED || isManuallyPaused
    if (settings.shouldAutoplay && !isAutoplayPaused) {
      autoplayInstance.reset()
    }
    if (settings.isSmartSliding) {
      smartAnimations(animationParam || nextSlide)
    }
    changeSlide(nextSlide)
  }

  /**
   * `slidingTimeoutDuration` is the total time it takes for the transition of each slide. It's the sum of
   * the duration of the slide, plus any delay of the animation.
   */
  const slidingTimeoutDuration = (settings.slidingDuration + settings.slidingDelay) * 1.1 // 110% safety factor.

  /**
   * `onSlidingHandler` sets `isDoneSliding` as false when executed and triggers a `setTimeout` that will set
   * `isDoneSliding` as true after the time it takes for the slide to change passes.
   * Saves the timeout ID to `slidingTimeout`.
   * The `onChange` and `onAfterChange` events are executed here.
   */
  const onSlidingHandler = (nextSlide: number): void => {
    setIsDoneSliding(false)
    // Only save the delay timeout if `onChange` exists.
    if (props.onChange) {
      const delayTimeoutId = setTimeout(() => {
        props.onChange && props.onChange(nextSlide)
      }, settings.slidingDelay)
      setDelayTimeout(delayTimeoutId)
    }
    // Sliding timeout ID's for the transitions.
    const slidingTimeoutId = setTimeout(() => {
      setIsDoneSliding(true)
      if (props.onAfterChange) {
        props.onAfterChange(nextSlide)
      }
    }, slidingTimeoutDuration)
    // Saving the timeout ID's in case clearing them is needed.
    setSlidingTimeout(slidingTimeoutId)
  }

  /**
   * Autoplay manually paused state handled by the autoplay buttons.
   */
  const [isManuallyPaused, setIsManuallyPaused] = React.useState(false)

  /**
   * Subscribe to changes in `inView`.
   * If the slider goes out of the viewport, then pause the slider autoplay
   * instance if it's running. If it comes back into viewport, resume the
   * autoplay instance.
   */
  React.useEffect(() => {
    switch (true) {
      case isManuallyPaused:
        break
      case autoplayInstance.state === EState.PAUSED && settings.shouldAutoplay && props.inView:
        autoplayInstance.resume()
        break
      case autoplayInstance.state === EState.RUNNING && !props.inView:
        autoplayInstance.pause()
        break
    }
  }, [props.inView, settings.shouldAutoplay])

  /**
   * `onMouseMoveCaptureHandler` executes `autoplayHandler` whenever the user moves the mouse
   * over the slider.
   */
  const onMouseMoveCaptureHandler = (): void => {
    if (settings.shouldAutoplay) {
      autoplayHandler()
    }
  }

  /**
   * `autoplayHandler` will pause the autoplay timer whenever the mouse moves over the
   * slider. If the mouse stops moving the autoplay will resume. If not, `onMouseMoveCaptureHandler`
   * will also clear the `autoplayInstance`resume `setTimeout` callbacks if any exist, so that the slides
   * won't move if the user is interacting with the slider component.
   */
  const autoplayHandler = (): void => {
    const isAutoplayPaused = autoplayInstance.state === EState.PAUSED || isManuallyPaused
    if (isAutoplayPaused) { return } // If the slider has been paused, do nothing.
    autoplayInstance.pause()
    if (autoplayHandlerTimeout) {
      clearTimeout(autoplayHandlerTimeout)
    }
    const autoplayHandlerTimeoutId = setTimeout(() => {
      autoplayInstance.resume()
    }, settings.autoplayHandlerTimeout)
    setAutoplayHandlerTimeout(autoplayHandlerTimeoutId)
  }

  /**
   * `autoplay` is the callback sent to the autoplay instance.
   */
  const autoplay = (): void => {
    const nextSlide = getNextSlide(activeSlideWatcher.current)
    if (settings.isSmartSliding) {
      smartAnimations(nextSlide)
    }
    changeSlide(getNextSlide(activeSlideWatcher.current))
  }

  const [activeSlide, setActiveSlide] = React.useState(props.initialSlide || 1)
  const [isDoneSliding, setIsDoneSliding] = React.useState(true)
  /**
   * `activeSlideWatcher` `isDoneSlidingWatcher` are a mutable objects that will persist for the full
   * lifetime of the component.
   *  - `isDoneSlidingWatcher` will serve as a pointer in case a `nextSlide` event is called from outside.
   *  - `activeSlideWatcher` serves as a pointer to the `activeSlide` so that the auto play instance won't
   *    be out of sync with the current slide. It is updated during the `useEffects` subscribed to the `activeSlide`
   *    state whenever the user changes slide.
   */
  const isDoneSlidingWatcher = React.useRef<boolean>(true)
  const activeSlideWatcher = React.useRef(activeSlide)

  const [delayTimeout, setDelayTimeout] = React.useState<NodeJS.Timeout>()
  const [slidingTimeout, setSlidingTimeout] = React.useState<NodeJS.Timeout>()

  const [autoplayHandlerTimeout, setAutoplayHandlerTimeout] = React.useState<NodeJS.Timeout>()
  // const [autoplayInstance] = React.useState(React.useMemo(() => {
  //   return new IntervalTimer(autoplay, settings.autoplayDuration + slidingTimeoutDuration)
  // }, []))
  const autoplayInstanceRef = React.useRef((React.useMemo(() => {
    return new IntervalTimer(autoplay, settings.autoplayDuration + slidingTimeoutDuration)
  }, [])))
  const autoplayInstance = autoplayInstanceRef.current

  /**
   * Slider reference object to calculate its dimensions.
   */
  const sliderRef = React.useRef<HTMLDivElement>(null)
  const [sliderDimensions, setSliderDimensions] = React.useState<ISliderDimensions>({})

  const setSliderDimensionsHandler = (): void => {
    const sliderDimensions: ISliderDimensions = {
      width: sliderRef.current ? sliderRef.current.clientWidth : undefined,
      height: sliderRef.current ? sliderRef.current.clientHeight : undefined
    }
    setSliderDimensions(sliderDimensions)
  }

  /**
   * `onTouchStartHandler` sets the initial coordinates of the touch event.
   */
  const onTouchStartHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    const initialX = event.touches[0].clientX
    const initialY = event.touches[0].clientY
    setTouchState({
      ...touchState,
      initialX,
      initialY
    })
  }

  /**
   * `onTouchMoveHandler` sets the current coordinates of the touch event to the state.
   */
  const onTouchMoveHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    const currentX = event.touches[0].clientX
    const currentY = event.touches[0].clientY
    setTouchState({
      ...touchState,
      currentX,
      currentY
    })
  }

  /**
   * `onTouchEndHandler` determines in which direction **and** sense (vector) the user is sliding.
   * Animations are then set accordingly depending on which direction the user is dragging and
   * the slide is changed. Finally the touch state is set back to the initial state, where
   * everything is undefined.
   */
  const onTouchEndHandler = () => {
    const diffX: number = touchState && Number(touchState.initialX) - Number(touchState.currentX)
    const diffY: number = touchState && Number(touchState.initialY) - Number(touchState.currentY)
    const thresholdToSlide: number = 50

    const isSlidingHorizontally: boolean = Math.abs(diffX) > Math.abs(diffY)
    const isSliderSetHorizontally: boolean = settings.sliderOrientation === EOrientation.HORIZONTAL
    const isSliderVertically: boolean = settings.sliderOrientation === EOrientation.VERTICAL

    if (
        isSlidingHorizontally &&
        isSliderSetHorizontally &&
        Math.abs(diffX) >= thresholdToSlide
      ) {
      // Sliding horizontally.
      if (diffX > 0) {
        // Swiped left.
        setNextSlide()
      } else {
        // Swiped right.
        setPreviousSlide()
      }
    } else if (
        isSliderVertically &&
        Math.abs(diffY) >= thresholdToSlide
      ) {
      // Sliding vertically.
      if (diffY > 0) {
        // Swiped up.
        setNextSlide()
      } else {
        // Swiped down.
        setPreviousSlide()
      }
    }
    setTouchState(initialTouchState)
  }

  const initialTouchState: ITouchState = {
    initialX: undefined,
    initialY: undefined,
    currentX: undefined,
    currentY: undefined,
    finalX: undefined,
    finalY: undefined
  }

  const [touchState, setTouchState] = React.useState<ITouchState>(initialTouchState)

  const onArrowKeypressHandler = (e: KeyboardEvent): void => {
    const isHorizontal = settings.sliderOrientation === EOrientation.HORIZONTAL
    switch (true) {
      // Left keypress.
      case isHorizontal && e.keyCode === 37:
        setPreviousSlide()
        break
      // Right keypress.
      case isHorizontal && e.keyCode === 39:
        setNextSlide()
        break
      // Up keypress.
      case !isHorizontal && e.keyCode === 38:
        setPreviousSlide()
        break
      // Down keypress.
      case !isHorizontal && e.keyCode === 40:
        setNextSlide()
        break
      default: // Do nothing.
    }
  }

  /**
   * Update the respective watchers' current values.
   */
  React.useEffect(() => {
    activeSlideWatcher.current = activeSlide
  }, [activeSlide])
  React.useEffect(() => {
    isDoneSlidingWatcher.current = isDoneSliding
  }, [isDoneSliding])

  /**
   * After mounting, akin to `componentDidMount`.
   */
  React.useEffect(() => {
    activeSlideWatcher.current = activeSlide
    /**
     * Turn on autoplay if `props.shouldAutoplay` is true.
     */
    if (settings.shouldAutoplay) {
      autoplayInstance.start()
    }
    /**
     * Sets up the `nextSlide` and `previousSlide` reference object if they exist.
     */
    if (props.nextSlide) {
      props.nextSlide.current = setNextSlide
    }
    if (props.previousSlide) {
      props.previousSlide.current = setPreviousSlide
    }
    /**
     * Calculates the initial dimensions of the slider and adds event listener.
     */
    setSliderDimensionsHandler()
    window.addEventListener('resize', setSliderDimensions as EventListenerOrEventListenerObject)
    if (settings.shouldSlideOnArrowKeypress) window.addEventListener('keydown', onArrowKeypressHandler)
    /**
     * Clearing any existing timeouts to avoid memory leaks, and clear event listener.
     */
    return () => {
      clearTimeout(delayTimeout && +delayTimeout)
      clearTimeout(slidingTimeout && +slidingTimeout)
      clearTimeout(autoplayHandlerTimeout && +autoplayHandlerTimeout)
      autoplayInstance.stop()
      window.removeEventListener('resize', setSliderDimensions as EventListenerOrEventListenerObject)
      if (settings.shouldSlideOnArrowKeypress) window.removeEventListener('keydown', onArrowKeypressHandler)
    }
  }, [])

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = React.useMemo(() => {
    return {
      '--sliding-duration': `${settings.slidingDuration}ms`, // Default: 800ms
      '--sliding-delay': `${settings.slidingDelay}ms`, // Default: 0ms
      '--sliding-animation': settings.slidingAnimation, // Default: classes.Sliding_Left_To_Right.
      '--slide-transition-delay': `${settings.slidingDuration + settings.slidingDelay}ms`, // Default: 800ms
      '--slider-width': `${sliderDimensions.width}px`,
      '--slider-height': `${sliderDimensions.height}px`,
      '--slider-color': settings.sliderColor,
      '--slider-fade-in-duration': `${settings.sliderFadeInDuration}ms`,
      '--nav-fade-in-duration': `${settings.navbarFadeInDuration}ms`,
      '--nav-fade-in-delay': `${settings.navbarFadeInDelay}ms`,
      '--nav-background-color': props.navbarSettings ? props.navbarSettings.color : undefined,
      '--nav-active-color': props.navbarSettings ? props.navbarSettings.activeColor : undefined,
      '--mask-duration': `${settings.slidingDuration + settings.slidingDelay}ms` // Default: 800ms
    }
  }, [settings, props.navbarSettings])

  /**
   * `getChildren` will categorize the `props.children` elements array into the `children` object.
   */
  const getChildren = (): IChildren => {
    const children: IChildren = {
      slidesArray: [],
      navbarsArray: [],
      autoplayButtonsArray: [],
      othersArray: [],
      navDescriptions: []
    }
    React.Children.toArray(props.children).forEach(child => {
      if (typeof child.type === 'function' && React.isValidElement(child)) {
        // tslint:disable-next-line:variable-name
        const RFC_Child: React.FunctionComponent = child.type as React.FunctionComponent
        const displayName = RFC_Child.displayName
        switch (displayName) {
          case 'hero-slider/slide':
            const props = child.props as ISlideProps
            children.navDescriptions.push(props.navDescription)
            return children.slidesArray.push(child)
          case 'hero-slider/nav':
          case 'hero-slider/menu-nav':
            return children.navbarsArray.push(child)
          case 'hero-slider/autoplay-button':
            return children.autoplayButtonsArray.push(child)
          default:
            return children.othersArray.push(child)
        }
      }
      return children.othersArray.push(child)
    })
    return children
  }

  /**
   * Sets up initial slides array, `useMemo` is used for performance optimization since a loop is
   * ran inside `getChildren`.
   */
  const children: IChildren = React.useMemo(() => {
    return getChildren()
  }, [props.children])

  const { slidesArray, navbarsArray, autoplayButtonsArray, othersArray } = children

  /**
   * `setSlides` clones the necessary properties for each slide to work.
   */
  const setSlides = () => {
    return React.Children.map(slidesArray, (child, index) => {
      const currentSlide = index + 1
      return (
        React.cloneElement(
          child as React.ReactElement<ISlideProps>,
          {
            isActive: activeSlide === currentSlide,
            isDoneSliding: isDoneSliding,
            slidingAnimation: settings.slidingAnimation
          }
        )
      )
    })
  }

  /**
   * Performance optimization to avoid re-rendering after mouse over captures.
   * Only updates if `activeSlide` or `isDoneSliding` change.
   */
  const slides = React.useMemo(() => {
    return children.slidesArray && setSlides()
  }, [activeSlide, isDoneSliding])

  /**
   * `setSlides` clones the necessary properties for each slide to work.
   */
  const setAutoplayButtons = () => {
    return React.Children.map(autoplayButtonsArray, child => {
      return (
        React.cloneElement(child as React.ReactElement<IAutoplayButtonProps>,
          {
            autoplay: autoplayInstanceRef,
            setIsManuallyPaused: setIsManuallyPaused,
            autoplayHandlerTimeout: autoplayHandlerTimeout
          }
        )
      )
    })
  }

  /**
   * Performance optimization to avoid re-rendering after mouse over captures.
   * Only updates if `activeSlide` or `isDoneSliding` change.
   */
  const autoplayButtons = children.autoplayButtonsArray && setAutoplayButtons()

  /**
   * `setNavbars`, similar to `setSlides`.
   * If it's a `menu-nav`, then the `navDescriptions` of each slide are also passed as props.
   */
  const setNavbars = () => {
    return React.Children.map(navbarsArray, child => {
      // tslint:disable-next-line:variable-name
      const RFC_Child: React.FunctionComponent = child.type as React.FunctionComponent
      const isMenuNav = RFC_Child.displayName === 'hero-slider/menu-nav'
      const navProps = {
        changeSlide: changeSlideHandler,
        activeSlide: activeSlideWatcher.current,
        totalSlides: slides.length
      }
      if (isMenuNav) {
        return (
          React.cloneElement(
            child as React.ReactElement<IMenuNavProps>,
            {
              ...navProps,
              navDescriptions: children.navDescriptions,
              sliderWidth: sliderDimensions.width
            }
          )
        )
      }
      return React.cloneElement(child as React.ReactElement<INavProps>, navProps)
    })
  }

  /**
   * Performance optimization similar to `slides`.
   */
  const navbars = React.useMemo(() => {
    return children.slidesArray && setNavbars()
  }, [activeSlide, isDoneSliding, sliderDimensions])

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
        height: settings.height
      }}
      onMouseMoveCapture={onMouseMoveCaptureHandler}
      className={classes.Wrapper}>
      {slides.length ? slides : null}
      {navbars.length ? navbars : null}
      {settings.shouldAutoplay && autoplayButtons.length ? autoplayButtons : null}
      {othersArray.length ? (
        <div className={classes.Container}>
          {othersArray}
        </div>
      ) : null}
      {settings.shouldDisplayButtons && (
        <Buttons
          isHorizontal={settings.sliderOrientation === EOrientation.HORIZONTAL}
          previousSlide={setPreviousSlide}
          nextSlide={setNextSlide} />
      )}
    </div>
  )
})

const WithProvider = (props: IWithProviderProps) => {
  const {
    isMobile,
    ...rest
  } = props
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0
  })

  return (
    <SliderContextProvider
      isMobile={isMobile}
    >
      <div
        className='rm-hero-slider'
        ref={ref}
      >
        <HeroSlider
          inView={inView}
          {...rest}
        />
      </div>
    </SliderContextProvider>
  )
}

export default React.memo(WithProvider)
