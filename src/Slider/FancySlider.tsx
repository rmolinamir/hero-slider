import * as React from 'react'
import IntervalTimer from '../IntervalTimer'
// CSS
import classes from './FancySlider.module.css'

enum EAnimations {
  BOTTOM_TO_TOP = 'bottom-to-top',
  LEFT_TO_RIGHT = 'left-to-right'
}

interface ISettings {
  slidingDuration: number
  slidingDelay: number
  slidingAnimation: string
  bShouldAutoplay: boolean
  autoplayDuration: number
  autoplayOnMouseMoveResumeDuration: number
}

const setSlidingAnimation = (animation: EAnimations): string => {
  switch (animation) {
    case EAnimations.BOTTOM_TO_TOP:
      return classes.Sliding_Bottom_To_Top
    case EAnimations.LEFT_TO_RIGHT:
    default:
      return classes.Sliding_Left_To_Right
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
}

const fancySlider = React.memo((props: ISliderProps) => {
  const animation = EAnimations.BOTTOM_TO_TOP

  const settings: ISettings = {
    slidingDuration: 800,
    slidingDelay: 0,
    slidingAnimation: setSlidingAnimation(animation),
    bShouldAutoplay: true,
    autoplayDuration: 3000,
    autoplayOnMouseMoveResumeDuration: 1000
  }

  const CSSVariables = {
    '--sliding-duration': `${settings.slidingDuration}ms`, // Default: 600ms
    '--sliding-delay': `${settings.slidingDelay}ms`, // Default: 0ms
    '--sliding-animation': `${settings.slidingAnimation}`,
    '--slide-transition-delay': `${settings.slidingDuration + settings.slidingDelay}ms` // Default: 600ms
  }

  const changeSlide = (slide: number) => {
    if (bIsDoneSliding) {
      setActiveSlide(slide)
      onSlidingHandler()
    }
  }

  const onClickHandler = (slide: number) => {
    if (settings.bShouldAutoplay) {
      autoplayInstance.reset()
    }
    changeSlide(slide)
  }

  const slidingTimeoutDuration = (settings.slidingDuration + settings.slidingDelay) * 1.1 // 110% safety factor.

  const onSlidingHandler = () => {
    setIsDoneSliding(false)
    const timeoutId = setTimeout(() => {
      setIsDoneSliding(true)
    }, slidingTimeoutDuration)
    setSlidingTimeout(timeoutId)
  }

  const autoplayHandler = () => {
    autoplayInstance.pause()
  }

  const autoplay = () => {
    const nextSlide = autoplayActiveSlideWatcher === 1 ? 2 : 1
    autoplayActiveSlideWatcher = nextSlide
    changeSlide(nextSlide)
  }

  /**
   * `onMouseMoveCaptureHandler` will pause the autoplay timer whenever the mouse moves over the
   * slider. If the mouse stops moving the autoplay will resume. If not, `onMouseMoveCaptureHandler`
   * will also clear the `autoplayInstance`resume `setTimeout` callbacks if any exist, so that the slides
   * won't move if the user is interacting with the slider component.
   */
  const onMouseMoveCaptureHandler = () => {
    autoplayInstance.pause()
    if (onMouseMoveTimeout) {
      clearTimeout(onMouseMoveTimeout)
    }
    const onMouseMoveTimeoutId = setTimeout(() => {
      autoplayInstance.resume()
    }, settings.autoplayOnMouseMoveResumeDuration)
    setOnMouseMoveTimeout(onMouseMoveTimeoutId)
  }

  const onMouseOutCaptureHandler = () => {
    autoplayInstance.reset()
  }

  const [activeSlide, setActiveSlide] = React.useState(1)
  const [bIsDoneSliding, setIsDoneSliding] = React.useState(true)

  const [slidingTimeout, setSlidingTimeout] = React.useState()

  const [onMouseMoveTimeout, setOnMouseMoveTimeout] = React.useState()
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
      clearTimeout(slidingTimeout)
      clearTimeout(onMouseMoveTimeout)
      autoplayInstance.stop()
    }
  }, [])

  /**
   * `setUpSlides` will filter the `props.children` array looking for any children that is not a `Slider` component.
   * If a children is not a `Slider` component then it simply is filtered by using the `Array.filter()` method.
   */
  const setUpSlides = () => {
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
