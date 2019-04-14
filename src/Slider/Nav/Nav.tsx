import * as React from 'react'
// Types
import { INavProps } from '../typings'
// CSS
import classes from './Nav.module.css'

const SliderNav = (props: INavProps) => {
  /**
   * Deconstructing navSettings to set it up.
   */
  const {
    color,
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
    '--nav-color': color,
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
  }, [activeSlide, activeColor, color, position])

  return (
    <ul
      style={{
        bottom: !position ? '1.5rem' : undefined,
        left: !position ? '50%' : undefined,
        transform: !position ? 'translateX(-50%)' : undefined,
        ...position,
        ...CSSVariables
      }}
      className={classes.Wrapper}>
      {navButtons}
    </ul>
  )
}

export const Nav = (props: INavProps): JSX.Element => <SliderNav {...props} />
(Nav as React.FunctionComponent).displayName = 'react-fancy-slider/nav'
