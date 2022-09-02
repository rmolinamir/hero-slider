import React from 'react';
import { SlideProps } from './typings';
import { SliderContext } from '../../Context';
import { EActionTypes } from '../../Context/typings';
import SlideModuleCss from './Slide.module.css';
import Background from './Background';
import Mask from './Mask';

const HeroSlide = (props: SlideProps) => {
  const {
    shouldRenderMask,
    style,
    background,
    onBackgroundLoad,
    children,
    navDescription
  } = props;

  const {
    dispatchProps,
    slidesArray,
    slideProps, // will be gone
    generateNewSlideId,
    removeSlideId
  } = React.useContext(SliderContext); // manager

  const [slideNumber, setSlideNumber] = React.useState<number>(
    slidesArray.length
  );

  const currentSlideData = slidesArray.find(
    ({ slideNumber: number }) => number === slideNumber
  );

  React.useEffect(() => {
    if (dispatchProps && !currentSlideData) {
      const newSlideNumber = generateNewSlideId();
      dispatchProps({
        type: EActionTypes.SET_SLIDE_DATA,
        payload: {
          navDescription,
          slideNumber: newSlideNumber
        }
      });
      setSlideNumber(newSlideNumber);
    }
  }, [
    dispatchProps,
    currentSlideData,
    slideNumber,
    slidesArray,
    navDescription,
    generateNewSlideId
  ]);

  // When unmounting, remove the slideNumber.
  React.useEffect(() => {
    return () => {
      if (slideNumber) removeSlideId(slideNumber);
    };
  }, [slideNumber, removeSlideId]);

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = React.useMemo(() => {
    return background
      ? {
          '--background-animation-duration':
            background.backgroundAnimationDuration
              ? `${background.backgroundAnimationDuration}ms`
              : null,
          '--background-animation-delay': background.backgroundAnimationDelay
            ? `${background.backgroundAnimationDelay}ms`
            : null
        }
      : background;
  }, [background]);

  if (!currentSlideData || !slideProps) return null;

  const { activeSlide, isDoneSliding, slidingAnimation } = slideProps; // controller

  const currentSlide = slidesArray.indexOf(currentSlideData) + 1;
  const isActive = activeSlide === currentSlide;

  return (
    <div
      style={{
        ...style,
        ...CSSVariables
      }}
      className={[
        SlideModuleCss.Slide,
        isActive && SlideModuleCss.Active,
        isActive && isDoneSliding && SlideModuleCss.Sliding,
        isActive && !isDoneSliding && slidingAnimation
      ].join(' ')}
    >
      <Background {...background} onLoad={onBackgroundLoad} />
      <div className={SlideModuleCss.Wrapper}>
        {/* Inner Mask */}
        {shouldRenderMask ? (
          <Mask
            background={background}
            isActive={isActive}
            isDoneSliding={isDoneSliding}
          />
        ) : null}
        {/* Container */}
        <div
          className={[
            SlideModuleCss.Container,
            isActive && isDoneSliding && SlideModuleCss.Active
          ].join(' ')}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Slide = (props: SlideProps): JSX.Element => (
  <HeroSlide {...props} />
);

(Slide as React.FunctionComponent).displayName = 'hero-slider/slide';
