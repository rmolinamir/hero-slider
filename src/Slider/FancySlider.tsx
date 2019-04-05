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

/**
 * Global scopped variable to help the autoplay instance keep track of the active slide.
 * Mainly used for the timeouts and intervals. It is set during the `useEffects` subscribed
 * to the `activeSlide` state and by the `onClickHandler` function whenever the user goes
 * changes slide. Initialized as 1.
 */
let autoplayActiveSlideWatcher = 1

interface ISliderProps {
  children: React.ReactElement[] | React.ReactElement
  settings?: ISettings
  slidingAnimation?: EAnimations
  bSmartSliding?: boolean
}

const fancySlider = React.memo((props: ISliderProps) => {
  /**
   * Initial settings for the carousel.
   */
  const initialSettings: ISettings = {
    slidingDuration: 800,
    slidingDelay: 0,
    slidingAnimation: setSlidingAnimation(props.slidingAnimation),
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
   * set `bIsDoneSliding` as true. While `bIsDoneSliding` is true, no the slides won't change.
   */
  const changeSlide = (nextSlide: number): void => {
    if (bIsDoneSliding) {
      if (props.bSmartSliding ) {
        smartAnimations(nextSlide)
      }
      setActiveSlide(nextSlide)
      onSlidingHandler()
    }
  }

  const smartAnimations = (nextSlide: number): void => {
      switch (props.slidingAnimation) {
      case EAnimations.TOP_TO_BOTTOM:
      case EAnimations.BOTTOM_TO_TOP:
        if (nextSlide > activeSlide) {
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
        if (nextSlide > activeSlide) {
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
   * Handles clicking on the slide, it changes current slide to the next one. If the user interacts
   * with the slide, the timer of the autoplay instance is reset.
   */
  const onClickHandler = (nextSlide: number): void => {
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
    const nextSlide = autoplayActiveSlideWatcher === 1 ? 2 : 1
    autoplayActiveSlideWatcher = nextSlide
    changeSlide(nextSlide)
  }

  /**
   * `onMouseMoveCaptureHandler` executes `autoplayHandler` whenever the user moves the mouse
   * over the slider.
   */
  const onMouseMoveCaptureHandler = (): void => {
    autoplayHandler()
  }

  /**
   * `onMouseOutCaptureHandler` resets the autoplay instance whenever the user moves the mouse
   * out of the slider.
   */
  const onMouseOutCaptureHandler = (): void => {
    autoplayInstance.reset()
  }

  const [activeSlide, setActiveSlide] = React.useState(1)
  const [bIsDoneSliding, setIsDoneSliding] = React.useState<boolean>(true)

  const [slidingTimeout, setSlidingTimeout] = React.useState<NodeJS.Timeout>()

  const [autoplayHandlerTimeout, setAutoplayHandlerTimeout] = React.useState<NodeJS.Timeout>()
  const [autoplayInstance] = React.useState(new IntervalTimer(autoplay, settings.autoplayDuration + slidingTimeoutDuration))

  React.useEffect(() => {
    autoplayActiveSlideWatcher = activeSlide
  }, [activeSlide])

  React.useEffect(() => {
    autoplayActiveSlideWatcher = activeSlide
    if (settings.bShouldAutoplay) {
      autoplayInstance.start()
    }
    /**
     * Clearing any existing timeout to avoid memory dumps.
     */
    return () => {
      clearTimeout(slidingTimeout && +slidingTimeout)
      clearTimeout(autoplayHandlerTimeout && +autoplayHandlerTimeout)
      autoplayInstance.stop()
    }
  }, [])

  /**
   * `setUpSlides` will filter the `props.children` array looking for any children that is not a `Slider` component.
   * If a children is not a `Slider` component then it simply is filtered by using the `Array.filter()` method.
   */
  const setUpSlides = () => {
    console.log('settings', settings)
    const filteredArray = React.Children.toArray(props.children).filter(child => {
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

    // Thank god for sync code.
    return React.Children.map(filteredArray, (child, index) => {
      const slideIndex = index + 1
      let nextSlide: number;
      if (index !== (filteredArray.length - 1)) {
        nextSlide = slideIndex + 1
      } else {
        nextSlide = 1
      }

      return (
        React.cloneElement(
          child as React.ReactElement<any>, 
          {
            bIsActive: activeSlide === slideIndex,
            bIsDoneSliding: bIsDoneSliding,
            onClick: () => onClickHandler(nextSlide),
            slidingAnimation: settings.slidingAnimation
          }
        )
      )
    })
  }

    /**
   * Performance optimization to avoid re-rendering after mouse over captures.
   * Only update if `activeSlide` or `bIsDoneSliding` change.
   */
  const slides = React.useMemo(() => {
    return props.children && setUpSlides()
  }, [activeSlide, bIsDoneSliding])

  return (
    <div
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
