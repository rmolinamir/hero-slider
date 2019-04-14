import * as React from 'react'
// Types
import { ISlideProps } from '../HeroSlider'
// CSS
import classes from './Slide.module.css'
// JSX
import Background from './Background/Background'
import Mask from './Mask/Mask'

const HeroSlide = (props: ISlideProps) => {
  const {
    isActive,
    isDoneSliding,
    slidingAnimation,
    shouldRenderMask,
    style,
    background,
    onBackgroundLoad,
    children
  } = props

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = React.useMemo(() => {
    return {
      '--background-fade-in-duration': background.backgroundFadeInDuration ? `${background.backgroundFadeInDuration}ms` : null,
      '--background-fade-in-delay': background.backgroundFadeInDelay ? `${background.backgroundFadeInDelay}ms` : null,
    }
  }, [background.backgroundFadeInDelay, background.backgroundFadeInDuration])

  return (
    <div
      style={{
        ...style,
        ...CSSVariables
      }}
      className={[
        classes.Slide,
        isActive && classes.Active,
        (isActive && isDoneSliding) && classes.Sliding,
        (isActive && !isDoneSliding) && slidingAnimation
      ].join(' ')}>
      <Background
        onLoad={onBackgroundLoad}
        {...background} />
      <div className={classes.Wrapper}>
        {/* Inner Mask */}
        {shouldRenderMask ? (
          <Mask
            background={background}
            isActive={isActive}
            isDoneSliding={isDoneSliding} />
        ) : null}
        {/* Container */}
        <div
          className={[
            classes.Container,
            (isActive && isDoneSliding) && classes.Active
          ].join(' ')}>
          {children}
        </div>
      </div>
    </div>
  )
}

export const Slide = (props: ISlideProps): JSX.Element => <HeroSlide {...props} />
(Slide as React.FunctionComponent).displayName = 'react-fancy-slider/slide'
