import * as React from 'react'
// Types
import { INavProps } from '../FancySlider'
// CSS
import classes from './Nav.module.css'

const nav = (props: INavProps) => {
  /**
   * Deconstructing navSettings to set it up.
   */
  const {
    backgroundColor,
    activeColor,
    position,
    totalSlides,
    activeSlide,
    changeSlide
  } = props

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-background-color': backgroundColor,
    '--nav-active-color': activeColor,
  }

  const changeSlideHandler = (navButtonIndex: number) => {
    const nextSlide = navButtonIndex + 1
    if (nextSlide !== activeSlide) {
      changeSlide(nextSlide)
    }
  }

  const navButtons = React.useMemo(() => {
    const emptyArray = Array.from(new Array(totalSlides))
    return emptyArray.map((_, index) => {
      return (
        <li
          onClick={() => changeSlideHandler(index)}
          key={index}
          className={[
            classes.Button,
            activeSlide === index + 1 && classes.Active
          ].join(' ')} />
      )
    })
  }, [activeSlide])

  return (
    <ul
      style={{
        bottom: !position ? '2rem' : undefined,
        left: !position ? '2rem' : undefined,
        ...position,
        ...CSSVariables
      }}
      className={classes.Wrapper}>
      {navButtons}
    </ul>
  )
}

export default nav
