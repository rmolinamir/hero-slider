import * as React from 'react'
import IntervalTimer from '../IntervalTimer'
// CSS
import classes from './FancySlider.module.css'

enum EAnimations {
  TOP_TO_BOTTOM = 'top-to-bottom',
  BOTTOM_TO_TOP = 'bottom-to-top',
  LEFT_TO_RIGHT = 'left-to-right',
  RIGHT_TO_LEFT = 'right-to-left'
}

interface ISettings {
  slidingDuration: number
  slidingDelay: number
  slidingAnimation: string
  bSmartSliding: boolean
  bShouldAutoplay: boolean
  autoplayDuration: number
  autoplayHandlerTimeout: number
}

const setSlidingAnimation = (animation?: EAnimations): string => {
  switch (animation) {
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

interface ISliderProps {
  children: React.ReactElement[] | React.ReactElement
  settings?: ISettings
  slidingAnimation?: EAnimations
  bSmartSliding?: boolean
  initialSlide?: number
  nextSlide?: React.MutableRefObject<any>
  previousSlide?: React.MutableRefObject<any>
}

const fancySlider = React.memo((props: ISliderProps) => {
  /**
   * Initial settings for the carousel.
   */
  const initialSettings: ISettings = {
    slidingDuration: 500,
    slidingDelay: 0,
    slidingAnimation: setSlidingAnimation(props.slidingAnimation),
    bSmartSliding: true,
    bShouldAutoplay: false,
    autoplayDuration: 8000,
    autoplayHandlerTimeout: 1000,
    ...props.settings
  }

  const [settings, setSettings] = React.useState<ISettings>(initialSettings)

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--sliding-duration': `${settings.slidingDuration}ms`, // Default: 800ms
    '--sliding-delay': `${settings.slidingDelay}ms`, // Default: 0ms
    '--sliding-animation': `${settings.slidingAnimation}`, // Default: classes.Sliding_Left_To_Right.
    '--slide-transition-delay': `${settings.slidingDuration + settings.slidingDelay}ms` // Default: 800ms
  }

  /**
   * `changeSlide` sets a new slide then executes `onSlidingHandler` to handle the smooth transition and
   * set `bIsDoneSlidingWatcher.current` (like a pointer) as true. While `bIsDoneSliding` is true, no the
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
   * `props.slidingAnimation` is `true`.
   */
  const smartAnimations = (nextSlide: number): void => {
      switch (props.slidingAnimation) {
      case EAnimations.TOP_TO_BOTTOM:
      case EAnimations.BOTTOM_TO_TOP:
        if (nextSlide > activeSlideWatcher.current) {
          setSettings({
            ...settings,
            slidingAnimation: classes.Sliding_Top_To_Bottom
          })
        } else {
          setSettings({
            ...settings,
            slidingAnimation: classes.Sliding_Bottom_To_Top
          })
        }
        break
      case EAnimations.RIGHT_TO_LEFT:
      case EAnimations.LEFT_TO_RIGHT:
      default:
        if (nextSlide > activeSlideWatcher.current) {
          setSettings({
            ...settings,
            slidingAnimation: classes.Sliding_Right_To_Left
          })
        } else {
          setSettings({
            ...settings,
            slidingAnimation: classes.Sliding_Left_To_Right
          })
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
   * `setUpSlides` clones the necessary properties for each slide to work.
   */
  const setUpSlides = () => {
    return React.Children.map(slidesArray, (child, index) => {
      const currentSlide = index + 1
      return (
        React.cloneElement(
          child as React.ReactElement<any>, 
          {
            bIsActive: activeSlide === currentSlide,
            bIsDoneSliding: bIsDoneSliding,
            slidingAnimation: settings.slidingAnimation
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
  const setNextSlide = () => {
    /**
     * Forces the animation to be set as the same always, it will slide from right to left,
     * or from top to bottom.
     */
    if (settings.bSmartSliding) {
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
     * or from bottom to top.
     */
    if (settings.bSmartSliding) {
      smartAnimations(1)
    }
    changeSlideHandler(getPreviousSlide(activeSlideWatcher.current))
  }

  /**
   * Handles clicking on the slide, it changes current slide to the next one. If the user interacts
   * with the slide, the timer of the autoplay instance is reset.
   */
  const changeSlideHandler = (nextSlide: number): void => {
    if (settings.bShouldAutoplay) {
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
   * `onSlidingHandler` sets `bIsDoneSliding` as false when executed and triggers a `setTimeout` that will set
   * `bIsDoneSliding` as true after the time it takes for the slide to change passes.
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
    if (settings.bShouldAutoplay) {
      autoplayHandler()
    }
  }

  /**
   * `onMouseOutCaptureHandler` resets the autoplay instance whenever the user moves the mouse
   * out of the slider.
   */
  const onMouseOutCaptureHandler = (): void => {
    if (settings.bShouldAutoplay) {
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
    if (settings.bSmartSliding) {
      smartAnimations(nextSlide)
    }
    changeSlide(getNextSlide(activeSlideWatcher.current))
  }

  const [activeSlide, setActiveSlide] = React.useState(props.initialSlide || 1)
  const [bIsDoneSliding, setIsDoneSliding] = React.useState(true)
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

  React.useEffect(() => {
    activeSlideWatcher.current = activeSlide
  }, [activeSlide])

  React.useEffect(() => {
    bIsDoneSlidingWatcher.current = bIsDoneSliding
  }, [bIsDoneSliding])

  /**
   * After mounting, akin to `componentDidMount`.
   */
  React.useEffect(() => {
    activeSlideWatcher.current = activeSlide
    /**
     * Turn on autoplay if `props.bShouldAutoplay` is true.
     */
    if (settings.bShouldAutoplay) {
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
   * Only update if `activeSlide` or `bIsDoneSliding` change.
   */
  const slides = React.useMemo(() => {
    return props.children && setUpSlides()
  }, [activeSlide, bIsDoneSliding])

  return (
    <div
      onScroll={(event) => console.log(event)}
      onClick={autoplayHandler}
      style={CSSVariables as React.CSSProperties}
      onMouseMoveCapture={onMouseMoveCaptureHandler}
      onMouseOutCapture={onMouseOutCaptureHandler}
      className={classes.Wrapper}>
      {slides}
    </div>
  )
})

export default fancySlider
