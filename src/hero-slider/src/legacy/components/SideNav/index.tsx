import React from 'react';
import { SliderContext } from '../Context';
import SideNavModuleCss from './SideNav.module.css';
import { SideNavProps } from './typings';

const SliderNav = (props: SideNavProps) => {
  /**
   * Deconstructing navSettings to set it up.
   */
  const {
    color,
    activeColor,
    // totalSlides,
    // activeSlide,
    // changeSlide,
    left,
    right,
    position,
    isPositionedRight = true
  } = props;

  const { navProps, slidesArray } = React.useContext(SliderContext);

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-color': color,
    '--nav-active-color': activeColor
  };

  const navButtons = React.useMemo(() => {
    if (!navProps || !slidesArray.length) return [];
    const { changeSlide, activeSlide } = navProps;
    const changeSlideHandler = (navButtonIndex: number) => {
      const nextSlide = navButtonIndex + 1;
      if (nextSlide !== activeSlide) {
        changeSlide(nextSlide);
      }
    };
    return slidesArray.map((_, index) => {
      const respectiveSlide = index + 1;
      return (
        // TODO: Deal with the disabled linting later:
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <li
          onClick={() => changeSlideHandler(index)}
          key={index}
          className={[
            SideNavModuleCss.Button,
            activeSlide === respectiveSlide && SideNavModuleCss.Active
          ].join(' ')}
          style={{
            justifyContent: isPositionedRight ? 'flex-end' : 'flex-start'
          }}
        >
          <span className={SideNavModuleCss.Line} />
          <span className={SideNavModuleCss.Number}>{respectiveSlide}</span>
        </li>
      );
    });
  }, [navProps, slidesArray, isPositionedRight]);

  return (
    <ul
      style={{
        bottom: position?.bottom,
        top: position?.top || '50%',
        left: position?.left || !isPositionedRight ? left || '1rem' : undefined,
        right:
          position?.right || isPositionedRight ? right || '1rem' : undefined,
        transform: position?.transform || 'translateY(-50%)',
        ...CSSVariables
      }}
      className={SideNavModuleCss.Wrapper}
    >
      {navButtons}
    </ul>
  );
};

export const SideNav = (props: SideNavProps): JSX.Element => (
  <SliderNav {...props} />
);

(SideNav as React.FunctionComponent).displayName = 'hero-slider/nav';
