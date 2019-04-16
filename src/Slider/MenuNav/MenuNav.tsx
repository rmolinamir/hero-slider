import * as React from 'react'
// Types
import { IMenuNavProps } from '../typings'
// CSS
import classes from './MenuNav.module.css'
// JSX
import { Nav } from '../Nav/Nav'

const SliderNav = (props: IMenuNavProps) => {
  /**
   * Deconstructing MenuNavSettings to set it up.
   */
  const {
    color,
    activeColor,
    position,
    totalSlides,
    activeSlide,
    changeSlide,
    justifyContent,
    navDescriptions,
    sliderWidth = window.innerWidth,
    mobileThreshold = 1024,
    extraButton,
    isExtraButtonRight = true
  } = props

  if (sliderWidth <= mobileThreshold) {
    return (
      <Nav {...props} />
    )
  }

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-color': color,
    '--nav-active-color': activeColor
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
      const description = navDescriptions[index]
      const respectiveSlide = index + 1
      return (
        <li
          onClick={() => changeSlideHandler(index)}
          key={index}
          className={[
            classes.Button,
            activeSlide === respectiveSlide && classes.Active
          ].join(' ')}>
          <div className={classes.Description}>
            <div className={classes.Number}>
              {respectiveSlide}
              <span className={classes.Square} />
            </div>
            <div className={classes.Text}>
              {description}
            </div>
          </div>
        </li>
      )
    })
  }, [activeSlide, activeColor, color, position])

  return (
    <div
      style={{
        bottom: !position ? '0' : undefined,
        left: !position ? '50%' : undefined,
        transform: !position ? 'translateX(-50%)' : undefined,
        ...position,
        ...CSSVariables,
        justifyContent: justifyContent || 'center'
      }}
      className={classes.Wrapper}>
      {extraButton && (
        <div
          style={{
            order: isExtraButtonRight ? 1 : 0
          }}
          className={classes.Extra}>
          <span
            style={{
              borderLeft: isExtraButtonRight ? '1px solid var(--nav-color, rgba(215, 225, 235, 0.6))' : undefined,
              borderRight: !isExtraButtonRight ? '1px solid var(--nav-color, rgba(215, 225, 235, 0.6))' : undefined
            }}
            className={classes.ExtraButton}>
            {extraButton}
          </span>
        </div>
      )}
      <ul className={classes.Container}>
        {MenuNavButtons}
        <span
          style={{
            width: `${100 / totalSlides}%`,
            transform: `translate3d(${activeSlide - 1}00%, 0, 0)`
          }}
          className={classes.Bar} />
      </ul>
    </div>
  )
}

export const MenuNav = (props: IMenuNavProps): JSX.Element => <SliderNav {...props} />
(MenuNav as React.FunctionComponent).displayName = 'react-fancy-slider/menu-nav'
