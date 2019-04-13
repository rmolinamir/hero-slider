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
    // changeSlide
  } = props

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--MenuNav-color': color,
    '--MenuNav-active-color': activeColor,
  }

  // const changeSlideHandler = (MenuNavButtonIndex: number) => {
  //   const nextSlide = MenuNavButtonIndex + 1
  //   if (nextSlide !== activeSlide) {
  //     changeSlide(nextSlide)
  //   }
  // }

  // const MenuNavButtons = React.useMemo(() => {
  //   const emptyArray = Array.from(new Array(totalSlides))
  //   return emptyArray.map((_, index) => {
  //     return (
  //       <li
  //         onClick={() => changeSlideHandler(index)}
  //         key={index}
  //         className={[
  //           classes.Button,
  //           activeSlide === index + 1 && classes.Active
  //         ].join(' ')} />
  //     )
  //   })
  // }, [activeSlide, activeColor, color, position])

  return (
    <div
      style={{
        bottom: !position ? '1.5rem' : undefined,
        left: !position ? '50%' : undefined,
        transform: !position ? 'translateX(-50%)' : undefined,
        ...position,
        ...CSSVariables
      }}
      className={classes.Wrapper}>
      <nav className={classes.Container}>
        {/* {MenuNavButtons} */}
        <span
          style={{
            width: `${100/totalSlides}%`,
            transform: `translate3d(${activeSlide - 1}00%, 0, 0)`
          }}
          className={classes.Bar} />
      </nav>
    </div>
  )
}

export const MenuNav = (props: IMenuNavProps): JSX.Element => <SliderNav {...props} />
(MenuNav as React.FunctionComponent).displayName = 'react-fancy-slider/menu-nav'
