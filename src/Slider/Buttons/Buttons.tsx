import * as React from 'react'
// CSS
import classes from './Buttons.module.css'

const ButtonSVG = () => {
  return (
    <svg
      width='60px'
      height='60px'
      strokeWidth='5'
      version='1.1'
      viewBox='0 0 129 129'>
      <g fill='currentColor'>
        <path d='m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z' />
      </g>
    </svg>
  )
}

interface IButtonProps {
  previousSlide: TAnyFunction
  nextSlide: TAnyFunction
}

const buttons = (props: IButtonProps) => {
  return (
    <>
      <div className={[
        classes.Wrapper,
        classes.Previous
      ].join(' ')}>
        <div className={classes.Container}>
          <button
            onClick={props.previousSlide}
            className={classes.Button}>
              <ButtonSVG />
            </button>
        </div>
      </div>
      <div className={[
        classes.Wrapper,
        classes.Next
      ].join(' ')}>
        <div className={classes.Container}>
          <button
            onClick={props.nextSlide}
            className={classes.Button}>
              <ButtonSVG />
            </button>
        </div>
      </div>
    </>
  )
}

export default buttons
