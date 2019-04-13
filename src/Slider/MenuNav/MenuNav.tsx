import * as React from 'react'
// Types
import { IMenuNavProps } from '../HeroSlider'
// CSS
import classes from './MenuNav.module.css'

const SliderNav = (props: IMenuNavProps) => {
  console.log('MenuNav props', props)
  /**
   * Deconstructing MenuNavSettings to set it up.
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
    '--MenuNav-color': color,
    '--MenuNav-active-color': activeColor,
  }

  const changeSlideHandler = (MenuNavButtonIndex: number) => {
    const nextSlide = MenuNavButtonIndex + 1
    if (nextSlide !== activeSlide) {
      changeSlide(nextSlide)
    }
  }

  const MenuNavButtons = React.useMemo(() => {
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
      {MenuNavButtons}
    </ul>
  )
}

export const MenuNav = (props: IMenuNavProps): JSX.Element => <SliderNav {...props} />
(MenuNav as React.FunctionComponent).displayName = 'react-fancy-slider/menu-nav'
