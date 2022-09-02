import React from 'react';
import { ButtonsNavProps } from './typings';
import ButtonsNavModuleCss from './ButtonsNav.module.css';
import { Nav } from '../Nav';
import { SliderContext } from '../../Context';

const SliderNav = (props: ButtonsNavProps) => {
  /**
   * Deconstructing ButtonNavSettings to set it up.
   */
  const {
    color,
    activeColor,
    backgroundColor,
    position,
    justifyContent,
    alignItems,
    sliderWidth = window.innerWidth,
    mobileThreshold = 1024,
    isNullAfterThreshold,
    extraButton,
    isExtraButtonRight
  } = props;

  const { navProps, slidesArray } = React.useContext(SliderContext);

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-color': color,
    '--nav-background-color': backgroundColor,
    '--nav-active-color': activeColor
  };

  const ButtonNavButtons = React.useMemo(() => {
    if (!navProps || !slidesArray.length) return [];
    const { changeSlide, activeSlide } = navProps;
    const changeSlideHandler = (ButtonNavButtonIndex: number) => {
      const nextSlide = ButtonNavButtonIndex + 1;
      if (nextSlide !== activeSlide) {
        changeSlide(nextSlide);
      }
    };
    return slidesArray.map(({ navDescription }, index) => {
      const description = navDescription;
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
  }, [navProps, slidesArray]);

  console.log(
    'sliderWidth <= mobileThreshold: ',
    sliderWidth <= mobileThreshold
  );
  if (sliderWidth <= mobileThreshold) {
    if (isNullAfterThreshold) return null;
    return <Nav {...props} />;
  }

  return (
    <div
      style={{
        bottom: !position ? '0' : undefined,
        left: !position ? '50%' : undefined,
        transform: !position ? 'translateX(-50%)' : undefined,
        ...position,
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

(ButtonsNav as React.FunctionComponent).displayName = 'hero-slider/buttons-nav';
