import * as React from 'react'
// Types
import { IButtonsNavProps } from '../typings'
// CSS
import classes from './ButtonsNav.module.css'
// JSX
import { Nav } from '../Nav/Nav'

const SliderNav = (props: IButtonsNavProps) => {
  /**
   * Deconstructing ButtonNavSettings to set it up.
   */
  const {
    color,
    activeColor,
    position,
    totalSlides,
    activeSlide,
    changeSlide,
    justifyContent,
    alignItems,
    navDescriptions,
    sliderWidth = window.innerWidth,
    mobileThreshold = 1024,
    extraButton,
    isExtraButtonRight
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

  const changeSlideHandler = (ButtonNavButtonIndex: number) => {
    const nextSlide = ButtonNavButtonIndex + 1
    if (nextSlide !== activeSlide) {
      changeSlide(nextSlide)
    }
  }

  const ButtonNavButtons = React.useMemo(() => {
    const emptyArray = Array.from(new Array(totalSlides))
    return emptyArray.map((_, index) => {
      const description = navDescriptions[index]
      const respectiveSlide = index + 1
      return (
        <li
          key={index}
          onClick={() => changeSlideHandler(index)}
          className={[
            classes.Button,
            activeSlide === respectiveSlide && classes.Active
          ].join(' ')}>
          <div className={classes.Description}>
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
        ...CSSVariables
      }}
      className={classes.Wrapper}>
      <ul
        style={{
          justifyContent: justifyContent || 'center',
          /**
           * The **vertical alignment** of the buttons can be set manually. If it's undefined and if
           * there is a position top passed as prop, then `alignItems` will be `flex-start`. Otherwise,
           * it is set as `flex-end`.
           */
          alignItems: alignItems || ((position && position.top !== undefined) ? 'flex-start' : 'flex-end')
        }}
        className={classes.Container}>
        {ButtonNavButtons}
        {extraButton && (
          <div
            style={{
              order: isExtraButtonRight ? 1 : 0
            }}
            className={classes.ExtraButton}>
            {extraButton}
          </div>
        )}
      </ul>
    </div>
  )
}

export const ButtonsNav = (props: IButtonsNavProps): JSX.Element => <SliderNav {...props} />
(ButtonsNav as React.FunctionComponent).displayName = 'react-fancy-slider/menu-nav'
