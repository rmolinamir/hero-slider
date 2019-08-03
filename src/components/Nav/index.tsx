// Libraries
import * as React from 'react';

// Dependencies
import { INavProps } from './typings';
import { SliderContext } from '../Context';

// Components
import ExtendedThemeProvider from '../ExtendedThemeProvider';
import { Wrapper } from './styled-components';

const { useContext, useMemo, memo } = React;

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

  const navButtons = useMemo(
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
              'slide-nav-button',
              activeSlide === index + 1 ? 'slide-nav-active-button' : undefined,
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
  const extendedTheme = {
    navColor: color,
    navActiveColor: activeColor,
  };

  return (
    <ExtendedThemeProvider
      extendedTheme={extendedTheme}
    >
      <Wrapper
        style={{
          bottom: !position ? '1.5rem' : undefined,
          left: !position ? '50%' : undefined,
          transform: !position ? 'translateX(-50%)' : undefined,
          ...position,
        }}
      >
        {navButtons}
      </Wrapper>
    </ExtendedThemeProvider>
  );
});

export const Nav = (props: INavProps): JSX.Element => <SliderNav {...props} />;
(Nav as React.FunctionComponent).displayName = 'hero-slider/nav';
