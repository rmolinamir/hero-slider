// Libraries
import * as React from 'react';

// Dependencies
import { ISideNavProps } from '../../typings/definitions';
import { SliderContext } from '../Context';

// CSS
import SideNavModuleCss from './SideNav.module.css';

const { useContext, memo } = React;

const SliderNav = memo((props: ISideNavProps) => {
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
    isPositionedRight = true,
  } = props;

  const { navProps, slidesArray } = useContext(SliderContext);

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-color': color,
    '--nav-active-color': activeColor,
  };

  const navButtons = React.useMemo(
    () => {
      if (
        !navProps ||
        !slidesArray.length
      ) return [];
      const {
        changeSlide,
        activeSlide,
      } = navProps;
      const changeSlideHandler = (navButtonIndex: number) => {
        const nextSlide = navButtonIndex + 1;
        if (nextSlide !== activeSlide) {
          changeSlide(nextSlide);
        }
      };
      return slidesArray.map((_, index) => {
        const respectiveSlide = index + 1;
        return (
          <li
            onClick={() => changeSlideHandler(index)}
            key={index}
            className={[
              SideNavModuleCss.Button,
              activeSlide === respectiveSlide && SideNavModuleCss.Active,
            ].join(' ')}
            style={{
              justifyContent: isPositionedRight ? 'flex-end' : 'flex-start',
            }}>
            <span className={SideNavModuleCss.Line} />
            <span className={SideNavModuleCss.Number}>{respectiveSlide}</span>
          </li>
        );
      });
    },
    [navProps, slidesArray, isPositionedRight],
  );

  return (
    <ul
      style={{
        top: !position ? '50%' : undefined,
        left: !position && !isPositionedRight ? left || '1rem' : undefined,
        right: !position && isPositionedRight ? right || '1rem' : undefined,
        transform: !position ? 'translateY(-50%)' : undefined,
        ...position,
        ...CSSVariables,
      }}
      className={SideNavModuleCss.Wrapper}>
      {navButtons}
    </ul>
  );
});

export const SideNav = (props: ISideNavProps): JSX.Element => <SliderNav {...props} />;
(SideNav as React.FunctionComponent).displayName = 'hero-slider/nav';
