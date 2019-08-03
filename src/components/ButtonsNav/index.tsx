// Libraries
import * as React from 'react';

// Dependencies
import { IButtonsNavProps } from './typings';
import { SliderContext } from '../Context';

// Components
import ExtendedThemeProvider from '../ExtendedThemeProvider';
import { Nav } from '../Nav';
import { Wrapper, Container, ExtraButton, Button, Description, Text } from './styled-components';

const { useContext, useMemo, memo } = React;

const SliderNav = memo((props: IButtonsNavProps) => {
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
    isExtraButtonRight,
  } = props;

  const { navProps, slidesArray } = useContext(SliderContext);

  /**
   * CSS variables for the transitions.
   */
  const extendedTheme = {
    navColor: color,
    navActiveColor: activeColor,
    navBackgroundColor: backgroundColor,
  };

  const ButtonNavButtons = useMemo(
    () => {
      if (
        !navProps ||
        !slidesArray.length
      ) return [];
      const {
        changeSlide,
        activeSlide,
      } = navProps;
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
          <Button
            key={index}
            onClick={() => changeSlideHandler(index)}
            className={activeSlide === respectiveSlide ? 'slide-button-nav-active-button' : undefined}
          >
            <Description>
              <Text>
                {description}
              </Text>
            </Description>
          </Button>
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

  return (
    <ExtendedThemeProvider
      extendedTheme={extendedTheme}
    >
      <Wrapper
        style={{
          bottom: !position ? '0' : undefined,
          left: !position ? '50%' : undefined,
          transform: !position ? 'translateX(-50%)' : undefined,
          ...position,
        }}
      >
        <Container
          style={{
            justifyContent: justifyContent || 'center',
            /**
             * The **vertical alignment** of the buttons can be set manually.
             * If it's undefined and if there is a position top passed as prop,
             * then `alignItems` will be `flex-start`. Otherwise,
             * it is set as `flex-end`.
             */
            alignItems: (
              alignItems || ((position && position.top !== undefined) ? 'flex-start' : 'flex-end')
            ),
          }}
        >
          {ButtonNavButtons}
          {extraButton && (
            <ExtraButton
              style={{
                order: isExtraButtonRight ? 1 : 0,
              }}
            >
              {extraButton}
            </ExtraButton>
          )}
        </Container>
      </Wrapper>
    </ExtendedThemeProvider>
  );
});

export const ButtonsNav = (props: IButtonsNavProps): JSX.Element => <SliderNav {...props} />;
(ButtonsNav as React.FunctionComponent).displayName = 'hero-slider/menu-nav';
