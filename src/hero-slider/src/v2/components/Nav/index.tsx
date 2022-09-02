import React from 'react';
import { NavProps } from './typings';
import { SliderContext } from '../../Context';
import NavModuleCss from './Nav.module.css';

const SliderNav = (props: NavProps) => {
  /**
   * Deconstructing navSettings to set it up.
   */
  const { color, activeColor, position } = props;

  const { navProps, slidesArray } = React.useContext(SliderContext);

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
      return (
        // TODO: Deal with the disabled linting later:
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li
          onClick={() => changeSlideHandler(index)}
          key={index}
          className={[
            NavModuleCss.Button,
            activeSlide === index + 1 && NavModuleCss.Active
          ].join(' ')}
        />
      );
    });
  }, [navProps, slidesArray]);

  if (!navProps) return null;

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-color': color,
    '--nav-active-color': activeColor
  };

  return (
    <ul
      style={{
        top: position?.top,
        right: position?.right,
        bottom: position?.bottom || '1.5rem',
        left: position?.left || '50%',
        transform: position?.transform || 'translateX(-50%)',
        ...CSSVariables
      }}
      className={NavModuleCss.Wrapper}
    >
      {navButtons}
    </ul>
  );
};

export const Nav = (props: NavProps): JSX.Element => <SliderNav {...props} />;

(Nav as React.FunctionComponent).displayName = 'hero-slider/nav';
