import * as React from 'react'
// Types
import { ISlideProps } from '../FancySlider'
// CSS
import classes from './Slide.module.css'
// JSX
import Mask from '../Mask/Mask'

const HeroSlide = (props: ISlideProps) => {
  return (
      <div
        style={props.style}
        className={[
          classes.Slide,
          props.isActive && classes.Active,
          (props.isActive && props.isDoneSliding) && classes.Sliding,
          (props.isActive && !props.isDoneSliding) && props.slidingAnimation
        ].join(' ')}>
        <div className={classes.Wrapper}>
          {/* Inner Mask */}
          <Mask
            style={props.style}
            isActive={props.isActive}
            isDoneSliding={props.isDoneSliding} />
          {/* Container */}
          <div
            className={[
              classes.Container,
              (props.isActive && props.isDoneSliding) && classes.Active
            ].join(' ')}>
            {props.children}
          </div>
        </div>
      </div>
  )
}

export const Slide = (props: ISlideProps): JSX.Element => <HeroSlide {...props} />
(Slide as React.FunctionComponent).displayName = 'react-fancy-slider/slide'
