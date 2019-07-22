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

// CSS
import SlideModuleCss from './Slide.module.css';

// Components
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
  } = props;

  const { dispatchProps, slidesArray, slideProps } = useContext(SliderContext);

  const [slideNumber, setSlideNumber] = useState<number>(slidesArray.length);

  const currentSlideData = slidesArray.find(({ slideNumber: number }) => number === slideNumber);

  useEffect(
    () => {
      if (
        dispatchProps &&
        !currentSlideData
      ) {
        const newSlideNumber = Math.random();
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
    [dispatchProps, currentSlideData, slideNumber, slidesArray, navDescription],
  );

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = React.useMemo(
    () => {
      return background ? {
        '--background-animation-duration': (
          background.backgroundAnimationDuration ?
            `${background.backgroundAnimationDuration}ms` :
            null
        ),
        '--background-animation-delay': (
          background.backgroundAnimationDelay ?
            `${background.backgroundAnimationDelay}ms` :
            null
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
    <div
      style={{
        ...style,
        ...CSSVariables,
      }}
      className={[
        SlideModuleCss.Slide,
        isActive && SlideModuleCss.Active,
        (isActive && isDoneSliding) && SlideModuleCss.Sliding,
        (isActive && !isDoneSliding) && slidingAnimation,
      ].join(' ')}>
      <Background
        onLoad={onBackgroundLoad}
        {...background} />
      <div className={SlideModuleCss.Wrapper}>
        {/* Inner Mask */}
        {shouldRenderMask ? (
          <Mask
            background={background}
            isActive={isActive}
            isDoneSliding={isDoneSliding} />
        ) : null}
        {/* Container */}
        <div
          className={[
            SlideModuleCss.Container,
            (isActive && isDoneSliding) && SlideModuleCss.Active,
          ].join(' ')}>
          {children}
        </div>
      </div>
    </div>
  );
});

export const Slide = (props: ISlideProps): JSX.Element => <HeroSlide {...props} />;
(Slide as React.FunctionComponent).displayName = 'hero-slider/slide';
