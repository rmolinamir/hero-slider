// Libraries
import * as React from 'react';

// Dependencies
import {
  EActionTypes,
} from '../../typings/definitions';
import {
  ISlideProps,
} from './typings';
import { SliderContext } from '../Context';

// Components
import ExtendedThemeProvider from '../ExtendedThemeProvider';
import { StyledSlide } from './styled-components';
import Background from './Background';
import Mask from './Mask';

const { useContext, useEffect, useState, memo } = React;

const HeroSlide = memo((props: ISlideProps) => {
  const {
    shouldRenderMask,
    style,
    background,
    onBackgroundLoad,
    children,
    navDescription,
    ...rest
  } = props;

  const { dispatchProps, slidesArray, slideProps, generateNewSlideId, removeSlideId } = useContext(SliderContext);

  const [slideNumber, setSlideNumber] = useState<number>(slidesArray.length);

  const currentSlideData = slidesArray.find(({ slideNumber: number }) => number === slideNumber);

  useEffect(
    () => {
      if (
        dispatchProps &&
        !currentSlideData
      ) {
        const newSlideNumber = generateNewSlideId();
        dispatchProps({
          type: EActionTypes.SET_SLIDE_DATA,
          payload: {
            navDescription,
            slideNumber: newSlideNumber,
          },
        });
        setSlideNumber(newSlideNumber);
      }
    },
    [dispatchProps, currentSlideData, slideNumber, slidesArray, navDescription, generateNewSlideId],
  );

  // When unmounting, remove the slideNumber.
  useEffect(
    () => {
      return () => {
        if (slideNumber) removeSlideId(slideNumber);
      };
    },
    [slideNumber, removeSlideId],
  );

  /**
   * extendedTheme settings for the background
   * animation transitions.
   */
  const extendedTheme = React.useMemo(
    () => {
      return background ? {
        backgroundAnimationDuration: (
          background.backgroundAnimationDuration ?
            `${background.backgroundAnimationDuration}ms` :
            undefined
        ),
        backgroundAnimationDelay: (
          background.backgroundAnimationDelay ?
            `${background.backgroundAnimationDelay}ms` :
            undefined
        ),
      } : background;
    },
    [background],
  );

  if (
    !currentSlideData ||
    !slideProps
  ) return null;

  const {
    activeSlide,
    isDoneSliding,
    slidingAnimation,
  } = slideProps;

  const currentSlide = slidesArray.indexOf(currentSlideData) + 1;
  const isActive = activeSlide === currentSlide;

  return (
    <ExtendedThemeProvider
      extendedTheme={extendedTheme}
    >
      <StyledSlide
        style={{
          ...style,
        }}
        isActive={isActive}
        isDoneSliding={isDoneSliding}
        slidingAnimation={slidingAnimation}
        {...rest}
      >
        <Background
          onLoad={onBackgroundLoad}
          {...background}
        />
        <div className="slide-wrapper">
          {/* Inner Mask */}
          {shouldRenderMask ? (
            <Mask
              background={background}
              isActive={isActive}
              isDoneSliding={isDoneSliding} />
          ) : null}
          {/* Container */}
          {children && (
            <div
              className={[
                'slide-container',
                (isActive && isDoneSliding) ? 'slide-active' : null,
              ].join(' ')}
            >
              {children}
            </div>
          )}
        </div>
      </StyledSlide>
    </ExtendedThemeProvider>
  );
});

export const Slide = (props: ISlideProps): JSX.Element => <HeroSlide {...props} />;
(Slide as React.FunctionComponent).displayName = 'hero-slider/slide';
