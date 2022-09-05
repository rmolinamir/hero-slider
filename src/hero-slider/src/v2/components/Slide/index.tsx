import React from 'react';
import SlideModuleCss from './index.module.css';
import Background, { BackgroundProps } from './Background';
import Mask from './Mask';
import { useManager } from '../../modules/Manager';
import { useController } from '../../modules/Controller';
import { useAnimations } from '../../modules/Animations';

/**
 * `Slide` component props.
 */
export interface SlideProps {
  shouldRenderMask?: boolean;
  background?: Partial<BackgroundProps>;
  label?: string;
  style?: React.CSSProperties;
  onBackgroundLoad?: BackgroundProps['onLoad'];
}

export function Slide(props: React.PropsWithChildren<SlideProps>) {
  const {
    shouldRenderMask,
    style,
    background,
    onBackgroundLoad,
    children,
    label
  } = props;

  const { getSlide, registerSlide, removeSlide } = useManager();

  const slideRef = React.useRef<HTMLDivElement>(null);

  const slide = getSlide(slideRef);

  React.useEffect(() => {
    if (slideRef) registerSlide(slideRef, label);
    return () => {
      if (slideRef) removeSlide(slideRef);
    };
  }, []);

  if (!slide) return null;

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--background-animation-duration': background?.backgroundAnimationDuration
      ? `${background.backgroundAnimationDuration}ms`
      : null,
    '--background-animation-delay': background?.backgroundAnimationDelay
      ? `${background.backgroundAnimationDelay}ms`
      : null
  };

  const {
    state: { activeSlide, isSliding }
  } = useController(); // controller

  const { geSlidingAnimationCssClass } = useAnimations();

  const isActive = activeSlide === slide.number;

  return (
    <div
      ref={slideRef}
      style={{
        ...style,
        ...CSSVariables
      }}
      className={[
        SlideModuleCss.Slide,
        isActive && SlideModuleCss.Active,
        isActive && !isSliding && SlideModuleCss.Sliding,
        isActive && isSliding && geSlidingAnimationCssClass()
      ].join(' ')}
    >
      <Background {...background} onLoad={onBackgroundLoad} />
      <div className={SlideModuleCss.Wrapper}>
        {/* Mask */}
        {shouldRenderMask ? (
          <Mask background={background} isActive={isActive} />
        ) : null}

        {/* Container */}
        <div
          className={[
            SlideModuleCss.Container,
            isActive && !isSliding && SlideModuleCss.Active
          ].join(' ')}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

(Slide as React.FunctionComponent).displayName = 'hero-slider/slide';
