import * as React from 'react'
// Types
import { ISlideProps } from '../HeroSlider'
// CSS
import classes from './Slide.module.css'
// JSX
import Mask from '../Mask/Mask'

const HeroSlide = (props: ISlideProps) => {
  const {
    shouldRenderMask = false,
    isActive,
    isDoneSliding,
    slidingAnimation,
    style,
    children
  } = props

  return (
      <div
        style={style}
        className={[
          classes.Slide,
          isActive && classes.Active,
          (isActive && isDoneSliding) && classes.Sliding,
          (isActive && !isDoneSliding) && slidingAnimation
        ].join(' ')}>
        <div className={classes.Wrapper}>
          {/* Inner Mask */}
          {shouldRenderMask ? (
            <Mask
              style={style}
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
