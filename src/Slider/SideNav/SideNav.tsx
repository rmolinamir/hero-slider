import * as React from 'react'
// Types
import { ISideNavProps } from '../typings'
// CSS
import classes from './SideNav.module.css'

const SliderNav = (props: ISideNavProps) => {
  /**
   * Deconstructing navSettings to set it up.
   */
  const {
    color,
    activeColor,
    totalSlides,
    activeSlide,
    changeSlide,
    left,
    right,
    position,
    isPositionedRight = true
  } = props

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-color': color,
    '--nav-active-color': activeColor
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
      const respectiveSlide = index + 1
      return (
        <li
          onClick={() => changeSlideHandler(index)}
          key={index}
          className={[
            classes.Button,
            activeSlide === respectiveSlide && classes.Active
          ].join(' ')}
          style={{
            justifyContent: isPositionedRight ? 'flex-end' : 'flex-start'
          }}>
          <span className={classes.Line} />
          <span className={classes.Number}>{respectiveSlide}</span>
        </li>
      )
    })
  }, [activeSlide, activeColor, color])

  return (
    <ul
      style={{
        top: !position ? '50%' : undefined,
        left: !position && !isPositionedRight ? left || '1rem' : undefined,
        right: !position && isPositionedRight ? right || '1rem' : undefined,
        transform: !position ? 'translateY(-50%)' : undefined,
        ...position,
        ...CSSVariables
      }}
      className={classes.Wrapper}>
      {navButtons}
    </ul>
  )
}

export const SideNav = (props: ISideNavProps): JSX.Element => <SliderNav {...props} />
(SideNav as React.FunctionComponent).displayName = 'hero-slider/nav'
