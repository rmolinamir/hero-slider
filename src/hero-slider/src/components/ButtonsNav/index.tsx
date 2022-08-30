import React from 'react';
import { ButtonsNavProps } from './typings';
import ButtonsNavModuleCss from './ButtonsNav.module.css';
import { Nav } from '../Nav';

const SliderNav = (props: ButtonsNavProps) => {
  /**
   * Deconstructing ButtonNavSettings to set it up.
   */
  const {
    color,
    activeColor,
    backgroundColor,
    position,
    totalSlides,
    activeSlide,
    changeSlide,
    justifyContent,
    alignItems,
    navDescriptions,
    sliderWidth = window.innerWidth,
    mobileThreshold = 1024,
    isNullAfterThreshold,
    extraButton,
    isExtraButtonRight
  } = props;

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-color': color,
    '--nav-background-color': backgroundColor,
    '--nav-active-color': activeColor
  };

  const ButtonNavButtons = React.useMemo(() => {
    const changeSlideHandler = (ButtonNavButtonIndex: number) => {
      const nextSlide = ButtonNavButtonIndex + 1;
      if (changeSlide && nextSlide !== activeSlide) {
        changeSlide(nextSlide);
      }
    };
    const emptyArray = Array.from(Array(totalSlides));
    return emptyArray.map((_, index) => {
      const description = navDescriptions[index];
      const respectiveSlide = index + 1;
      return (
        // TODO: Deal with the disabled linting later:
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li
          key={index}
          onClick={() => changeSlideHandler(index)}
          className={[
            ButtonsNavModuleCss.Button,
            activeSlide === respectiveSlide && ButtonsNavModuleCss.Active
          ].join(' ')}
        >
          <div className={ButtonsNavModuleCss.Description}>
            <div className={ButtonsNavModuleCss.Text}>{description}</div>
          </div>
        </li>
      );
    });
  }, [activeSlide, navDescriptions, totalSlides, changeSlide]);

  if (sliderWidth <= mobileThreshold) {
    if (isNullAfterThreshold) return null;
    return <Nav {...props} />;
  }

  return (
    <div
      style={{
        top: position?.top,
        right: position?.right,
        bottom: position?.bottom || '0',
        left: position?.left || '50%',
        transform: position?.transform || 'translateX(-50%)',
        ...CSSVariables
      }}
      className={ButtonsNavModuleCss.Wrapper}
    >
      <ul
        style={{
          justifyContent: justifyContent || 'center',
          /**
           * The **vertical alignment** of the buttons can be set manually.
           * If it's undefined and if there is a position top passed as prop,
           * then `alignItems` will be `flex-start`. Otherwise,
           * it is set as `flex-end`.
           */
          alignItems:
            alignItems ||
            (position && position.top !== undefined ? 'flex-start' : 'flex-end')
        }}
        className={ButtonsNavModuleCss.Container}
      >
        {ButtonNavButtons}
        {extraButton && (
          <div
            style={{
              order: isExtraButtonRight ? 1 : 0
            }}
            className={ButtonsNavModuleCss.ExtraButton}
          >
            {extraButton}
          </div>
        )}
      </ul>
    </div>
  );
};

export const ButtonsNav = (props: ButtonsNavProps): JSX.Element => (
  <SliderNav {...props} />
);

(ButtonsNav as React.FunctionComponent).displayName = 'hero-slider/menu-nav';
