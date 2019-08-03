// Libraries
import * as React from 'react';

// Dependencies
import { IMenuNavProps } from './typings';
import { SliderContext } from '../Context';

// Components
import ExtendedThemeProvider from '../ExtendedThemeProvider';
import { Nav } from '../Nav';
import { Wrapper, Container, Bar, ExtraButtonWrapper, ExtraButton } from './styled-components';

const { useContext, useMemo, memo } = React;

const SliderNav = memo((props: IMenuNavProps) => {
  /**
   * Deconstructing MenuNavSettings to set it up.
   */
  const {
    color,
    activeColor,
    position,
    justifyContent,
    sliderWidth = window.innerWidth,
    mobileThreshold = 1024,
    isNullAfterThreshold,
    extraButton,
    isExtraButtonRight = true,
  } = props;

  const { navProps, slidesArray } = useContext(SliderContext);

  const MenuNavButtons = useMemo(
    () => {
      if (
        !navProps ||
        !slidesArray.length
      ) return [];
      const {
        changeSlide,
        activeSlide,
      } = navProps;
      const changeSlideHandler = (MenuNavButtonIndex: number) => {
        const nextSlide = MenuNavButtonIndex + 1;
        if (nextSlide !== activeSlide) {
          changeSlide(nextSlide);
        }
      };
      return slidesArray.map(({ navDescription }, index) => {
        const description = navDescription;
        const respectiveSlide = index + 1;
        return (
          <li
            onClick={() => changeSlideHandler(index)}
            key={index}
            className={[
              'slide-menu-nav-button',
              activeSlide === respectiveSlide && 'slide-menu-nav-active-button',
            ].join(' ')}>
            <div className="slide-menu-nav-button-description">
              <div className="slide-menu-nav-button-number">
                {respectiveSlide}
                <span className="slide-menu-nav-button-square" />
              </div>
              <div className="slide-menu-nav-button-text">
                {description}
              </div>
            </div>
          </li>
        );
      });
    },
    [navProps, slidesArray],
  );

  if (sliderWidth <= mobileThreshold) {
    if (isNullAfterThreshold) return null;
    return (
      <Nav {...props} />
    );
  }

  if (!navProps) return null;

  const {
    activeSlide,
    totalSlides,
  } = navProps;

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
          bottom: !position ? '0' : undefined,
          left: !position ? '50%' : undefined,
          transform: !position ? 'translateX(-50%)' : undefined,
          justifyContent: justifyContent || 'center',
          ...position,
        }}
      >
        {extraButton && (
          <ExtraButtonWrapper
            isExtraButtonRight={isExtraButtonRight}
          >
            <ExtraButton
              isExtraButtonRight={isExtraButtonRight}
            >
              {extraButton}
            </ExtraButton>
          </ExtraButtonWrapper>
        )}
        <Container>
          {MenuNavButtons}
          <Bar
            style={{
              width: `${100 / totalSlides}%`,
              transform: `translate3d(${activeSlide - 1}00%, 0, 0)`,
            }}
          />
        </Container>
      </Wrapper>
    </ExtendedThemeProvider>
  );
});

export const MenuNav = (props: IMenuNavProps): JSX.Element => <SliderNav {...props} />;
(MenuNav as React.FunctionComponent).displayName = 'hero-slider/menu-nav';
