import * as React from 'react'
import IntervalTimer from '../IntervalTimer'
// CSS
import classes from './FancySlider.module.css'
import Buttons from './Buttons/Buttons'

enum EAnimations {
  TOP_TO_BOTTOM = 'top_to_bottom',
  BOTTOM_TO_TOP = 'bottom_to_top',
  LEFT_TO_RIGHT = 'left_to_right',
  RIGHT_TO_LEFT = 'right_to_left',
  FADE = 'fade'
}

enum EOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

interface ISettings {
  slidingDuration: number
  slidingDelay: number
  initialSlidingAnimation: EAnimations
  slidingAnimation: string
  sliderOrientation: EOrientation
  sliderColor: string
  isSmartSliding: boolean
  shouldAutoplay: boolean
  autoplayDuration: number
  autoplayHandlerTimeout: number
}

interface ISettingsProps {
  slidingDuration: number
  slidingDelay: number
  sliderOrientation: EOrientation
  sliderColor: string
  isSmartSliding: boolean
  shouldAutoplay: boolean
  autoplayDuration: number
  autoplayHandlerTimeout: number
}

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

interface ITouchState {
  initialX?: number
  initialY?: number
  currentX?: number
  currentY?: number
  finalX?: number
  finalY?: number
}

interface ISliderProps {
  children: React.ReactElement[] | React.ReactElement
  settings?: ISettingsProps
  slidingAnimation?: EAnimations
  isSmartSliding?: boolean
  initialSlide?: number
  nextSlide?: React.MutableRefObject<any>
  previousSlide?: React.MutableRefObject<any>
}

interface ISliderDimensions {
  width?: number
  height?: number
}

const fancySlider = React.memo((props: ISliderProps) => {
  /**
   * Initial settings for the carousel.
   */
  const initialSettings: ISettings = {
    slidingDuration: 500,
    slidingDelay: 200,
    initialSlidingAnimation: props.slidingAnimation || EAnimations.RIGHT_TO_LEFT,
    slidingAnimation: setInitialSlidingAnimation(props.slidingAnimation),
    sliderOrientation: EOrientation.HORIZONTAL,
    sliderColor: 'inherit',
    isSmartSliding: true,
    shouldAutoplay: false,
    autoplayDuration: 8000,
    autoplayHandlerTimeout: 1000,
    ...props.settings
  }

  const [settings, setSettings] = React.useState<ISettings>(initialSettings)

  /**
   * Subscribes to any changes made to the settings, then resets them through `setSettings`.
   */
  React.useEffect(() => {
    setSettings(props.settings as ISettings)
  }, [props.settings])

  const setSlidingAnimation = (newAnimation: string) => {
    setSettings({
      ...settings,
      slidingAnimation: newAnimation
    })
  }

  /**
   * `changeSlide` sets a new slide then executes `onSlidingHandler` to handle the smooth transition and
   * set `bIsDoneSlidingWatcher.current` (like a pointer) as true. While `isDoneSliding` is true, no the
   * slides won't change.
   */
  const changeSlide = (nextSlide: number): void => {
    if (bIsDoneSlidingWatcher.current) {
      setActiveSlide(nextSlide)
      onSlidingHandler()
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
   * `getSlides` will filter the `props.children` array looking for any children that is not a `Slider` component.
   * If a children is not a `Slider` component then it simply is filtered by using the `Array.filter()` method.
   */
  const getSlides = () => {
    return React.Children.toArray(props.children).filter(child => {
      if (typeof child.type === 'function' && React.isValidElement(child)) {
        const RFC_Child: React.FunctionComponent = child.type as React.FunctionComponent
        const displayName = RFC_Child.displayName
        if (displayName === 'react-fancy-slider/slide') {
          return true
        } else {
          return false
        }
      }
      return false
    })
  }

  /**
   * `setSlides` clones the necessary properties for each slide to work.
   */
  const setSlides = () => {
    return React.Children.map(slidesArray, (child, index) => {
      const currentSlide = index + 1
      return (
        React.cloneElement(
          child as React.ReactElement<any>, 
          {
            isActive: activeSlide === currentSlide,
            isDoneSliding: isDoneSliding,
            slidingAnimation: settings.slidingAnimation,
            sliderRef: sliderRef
          }
        )
      )
    })
  }

  /**
   * Calculates the next slide based on the current slide (`activeSlide` by default)
   * based on the total amount of slides.
   */
  const getNextSlide = (currentSlide: number = activeSlide) => {
    const totalSlides = slidesArray.length
    let nextSlide: number;
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
  const setNextSlide = (isTouch?: boolean) => {
    /**
     * Unless the change is triggered by a touch event, this forces the animation to be set as the
     * same always, it will slide from right to left, or from top to bottom.
     * `isTouch` has to be strictly compared to `true` because it might be an event.
     */
    if (settings.isSmartSliding && (isTouch !== true)) {
      smartAnimations(slidesArray.length + 1)
    }
    changeSlideHandler(getNextSlide(activeSlideWatcher.current))
  }

  /**
   * Calculates the previous slide similar to `getNextSlide`.
   */
  const getPreviousSlide = (currentSlide: number = activeSlide) => {
    const totalSlides = slidesArray.length
    let nextSlide: number;
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
     * or from bottom to top - unless it's triggered by a touch event.
     */
    if (settings.isSmartSliding) {
      smartAnimations(1)
    }
    changeSlideHandler(getPreviousSlide(activeSlideWatcher.current))
  }

  /**
   * Handles clicking on the slide, it changes current slide to the next one. If the user interacts
   * with the slide, the timer of the autoplay instance is reset.
   */
  const changeSlideHandler = (nextSlide: number): void => {
    if (settings.shouldAutoplay) {
      autoplayInstance.reset()
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
   */
  const onSlidingHandler = (): void => {
    setIsDoneSliding(false)
    const timeoutId = setTimeout(() => {
      setIsDoneSliding(true)
    }, slidingTimeoutDuration)
    setSlidingTimeout(timeoutId)
  }

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
   * `onMouseOutCaptureHandler` resets the autoplay instance whenever the user moves the mouse
   * out of the slider.
   */
  const onMouseOutCaptureHandler = (): void => {
    if (settings.shouldAutoplay) {
      autoplayInstance.reset()
    }
  }

  /**
   * `autoplayHandler` will pause the autoplay timer whenever the mouse moves over the
   * slider. If the mouse stops moving the autoplay will resume. If not, `onMouseMoveCaptureHandler`
   * will also clear the `autoplayInstance`resume `setTimeout` callbacks if any exist, so that the slides
   * won't move if the user is interacting with the slider component.
   */
  const autoplayHandler = (): void => {
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
   * `activeSlideWatcher` `bIsDoneSlidingWatcher` are a mutable objects that will persist for the full
   * lifetime of the component.
   *  - `bIsDoneSlidingWatcher` will serve as a pointer in case a `nextSlide` event is called from outside.
   *  - `activeSlideWatcher` serves as a pointer to the `activeSlide` so that the auto play instance won't
   *    be out of sync with the current slide. It is updated during the `useEffects` subscribed to the `activeSlide`
   *    state whenever the user changes slide.
   */
  const bIsDoneSlidingWatcher = React.useRef<boolean>(true)
  const activeSlideWatcher = React.useRef(activeSlide)

  const [slidingTimeout, setSlidingTimeout] = React.useState<NodeJS.Timeout>()

  const [autoplayHandlerTimeout, setAutoplayHandlerTimeout] = React.useState<NodeJS.Timeout>()
  const [autoplayInstance] = React.useState(React.useMemo(() => {
    return new IntervalTimer(autoplay, settings.autoplayDuration + slidingTimeoutDuration)
  }, []))

  /**
   * Sets up initial slides array, `useMemo` is used for performance optimization since a loop is
   * ran inside `getSlides`.
   */
  const [slidesArray] = React.useState(React.useMemo(() => {
    return getSlides()
  }, []))

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
   * `onTouchEndHandler` determines in which direction **and** sense the user is sliding.
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

  /**
   * Update the respective watchers' current values.
   */
  React.useEffect(() => {
    activeSlideWatcher.current = activeSlide
  }, [activeSlide])
  React.useEffect(() => {
    bIsDoneSlidingWatcher.current = isDoneSliding
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
     * Calculates the initial dimensions of the slider.
     */
    setSliderDimensionsHandler()
    /**
     * Clearing any existing timeouts to avoid memory leaks.
     */
    return () => {
      clearTimeout(slidingTimeout && +slidingTimeout)
      clearTimeout(autoplayHandlerTimeout && +autoplayHandlerTimeout)
      autoplayInstance.stop()
    }
  }, [])

  /**
   * Performance optimization to avoid re-rendering after mouse over captures.
   * Only update if `activeSlide` or `isDoneSliding` change.
   */
  const slides = React.useMemo(() => {
    return props.children && setSlides()
  }, [activeSlide, isDoneSliding])

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--sliding-duration': `${settings.slidingDuration}ms`, // Default: 800ms
    '--sliding-delay': `${settings.slidingDelay}ms`, // Default: 0ms
    '--sliding-animation': `${settings.slidingAnimation}`, // Default: classes.Sliding_Left_To_Right.
    '--slide-transition-delay': `${settings.slidingDuration + settings.slidingDelay}ms`, // Default: 800ms
    '--slider-width': `${sliderDimensions.width}px`,
    '--slider-height': `${sliderDimensions.height}px`,
    '--slider-color': `${settings.sliderColor}`,
    '--mask-duration': `${settings.slidingDuration + settings.slidingDelay}ms`, // Default: 800ms
  }

  return (
    <div
      ref={sliderRef}
      onScroll={(event) => console.log(event)}
      onClick={autoplayHandler}
      onTouchStart={onTouchStartHandler}
      onTouchMove={onTouchMoveHandler}
      onTouchEnd={onTouchEndHandler}
      style={CSSVariables as React.CSSProperties}
      onMouseMoveCapture={onMouseMoveCaptureHandler}
      onMouseOutCapture={onMouseOutCaptureHandler}
      className={classes.Slider}>
      {slides}
      <Buttons
        previousSlide={setPreviousSlide}
        nextSlide={setNextSlide} />
    </div>
  )
})

export default fancySlider
