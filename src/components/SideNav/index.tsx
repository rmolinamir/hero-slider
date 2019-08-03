// Libraries
import * as React from 'react';

// Dependencies
import { ISideNavProps } from '../../typings/definitions';
import { SliderContext } from '../Context';

// Components
import ExtendedThemeProvider from '../ExtendedThemeProvider';
import { Wrapper } from './styled-components';

const { useContext, useMemo, memo } = React;

const SliderNav = memo((props: ISideNavProps) => {
  /**
   * Deconstructing navSettings to set it up.
   */
  const {
    color,
    activeColor,
    left,
    right,
    position,
    isPositionedRight = true,
  } = props;

  const { navProps, slidesArray } = useContext(SliderContext);

  /**
   * CSS variables for the transitions.
   */
  const extendedTheme = {
    navColor: color,
    navActiveColor: activeColor,
  };

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
        const respectiveSlide = index + 1;
        return (
          <li
            onClick={() => changeSlideHandler(index)}
            key={index}
            className={[
              'slide-side-nav-button',
              activeSlide === respectiveSlide ? 'slide-side-nav-active-button' : undefined,
            ].join(' ')}
            style={{
              justifyContent: isPositionedRight ? 'flex-end' : 'flex-start',
            }}>
            <span className="slide-side-nav-button-line" />
            <span className="slide-side-nav-button-number">{respectiveSlide}</span>
          </li>
        );
      });
    },
    [navProps, slidesArray, isPositionedRight],
  );

  return (
    <ExtendedThemeProvider
      extendedTheme={extendedTheme}
    >
      <Wrapper
        style={{
          top: !position ? '50%' : undefined,
          left: !position && !isPositionedRight ? left || '1rem' : undefined,
          right: !position && isPositionedRight ? right || '1rem' : undefined,
          transform: !position ? 'translateY(-50%)' : undefined,
          ...position,
        }}
      >
        {navButtons}
      </Wrapper>
    </ExtendedThemeProvider>
  );
});

export const SideNav = (props: ISideNavProps): JSX.Element => <SliderNav {...props} />;
(SideNav as React.FunctionComponent).displayName = 'hero-slider/nav';
