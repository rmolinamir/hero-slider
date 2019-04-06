import * as React from 'react'
// CSS
import classes from '../FancySlider.module.css'

interface ISlide {
  bIsActive: boolean
  bIsDoneSliding: boolean
  slidingAnimation: string
  style: React.CSSProperties
  children: React.ReactChildren
}

const FancySlide = (props: ISlide) => {
  return (
      <div
        style={props.style}
        className={[
          classes.Slide,
          props.bIsActive && classes.Active,
          (props.bIsActive && props.bIsDoneSliding) && classes.Sliding,
          (props.bIsActive && !props.bIsDoneSliding) && props.slidingAnimation
        ].join(' ')}>
        <div
          className={[
            classes.Container,
            (props.bIsActive && props.bIsDoneSliding) && classes.Active
          ].join(' ')}>
          {props.children}
        </div>
      </div>
  )
}

export const Slide = (props: ISlide): JSX.Element => <FancySlide {...props} />
(Slide as React.FunctionComponent).displayName = 'react-fancy-slider/slide'
