// Libraries
import * as React from 'react';

// Dependencies
import { INavProps } from '../../typings/definitions';
import { SliderContext } from '../Context';

// CSS
import NavModuleCss from './Nav.module.css';

const { useContext, memo } = React;

const SliderNav = memo((props: INavProps) => {
  /**
   * Deconstructing navSettings to set it up.
   */
  const {
    color,
    activeColor,
    position,
  } = props;

  const { navProps, slidesArray } = useContext(SliderContext);

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
        return (
          <li
            onClick={() => changeSlideHandler(index)}
            key={index}
            className={[
              NavModuleCss.Button,
              activeSlide === index + 1 && NavModuleCss.Active,
            ].join(' ')} />
        );
      });
    },
    [navProps, slidesArray],
  );

  if (!navProps) return null;

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-color': color,
    '--nav-active-color': activeColor,
  };

  return (
    <ul
      style={{
        bottom: !position ? '1.5rem' : undefined,
        left: !position ? '50%' : undefined,
        transform: !position ? 'translateX(-50%)' : undefined,
        ...position,
        ...CSSVariables,
      }}
      className={NavModuleCss.Wrapper}>
      {navButtons}
    </ul>
  );
});

export const Nav = (props: INavProps): JSX.Element => <SliderNav {...props} />;
(Nav as React.FunctionComponent).displayName = 'hero-slider/nav';
