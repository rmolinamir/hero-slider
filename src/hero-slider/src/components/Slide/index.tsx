import React from 'react';
import SlideModuleCss from './index.module.css';
import Background, { BackgroundProps } from './Background';
import Mask from './Mask';
import { useManager } from '../../modules/Manager';
import { useController } from '../../modules/Controller';
import { useAnimations } from '../../modules/Animations';
import { composeCssClasses } from '../../utils/composeCssClasses';
import ConsoleLogger from '../../modules/ConsoleLogger';

const logger = ConsoleLogger.new();

/**
 * `Slide` component props.
 */
export interface SlideProps {
  /**
   * Slider className.
   */
  className?: React.HTMLProps<HTMLDivElement>['className'];
  /**
   * Each slide has a "Mask" that serves as an adornment.
   * They mimic the background, then offsets it a bit. It has an animation during slide transitions.
   * @default false
   */
  shouldRenderMask?: boolean;
  /**
   * Defines the background of the `Slide`.
   * You may pass CSS properties just like you would style the background of a regular HTML element.
   * The main difference is that the `backgroundImage` property will work just like an image `src` property instead of the typical background image URL.
   */
  background?: Partial<BackgroundProps>;
  /**
   * If the developer is using a `MenuNav` or `ButtonsNav` component, a label for each slide may be passed.
   * These labels will be shown in the nav components.
   */
  label?: string;
  /**
   * Inline CSS styling.
   */
  style?: React.CSSProperties;
  /**
   * Callback that executes when the background image loads.
   */
  onBackgroundLoad?: BackgroundProps['onLoad'];
}

export function Slide(props: React.PropsWithChildren<SlideProps>) {
  const {
    className,
    shouldRenderMask = false,
    style,
    background,
    onBackgroundLoad,
    children,
    label
  } = props;

  const { getSlide, registerSlide, removeSlide } = useManager();

  const {
    state: { activeSlide, isSliding, prevActiveSlide, slidingDirection }
  } = useController(); // controller

  const { getSlidingAnimationCssClass } = useAnimations();

  const slideRef = React.useRef<HTMLDivElement>(null);

  const slide = getSlide(slideRef);

  logger.info('[Slide] rerender', 'slide.number: ', slide?.number);

  const [classNames, setClassNames] = React.useState(
    composeCssClasses('hero-slider-slide', SlideModuleCss.Slide, className)
  );

  const isActive = activeSlide === slide?.number;

  React.useEffect(() => {
    if (slide) {
      setClassNames(
        composeCssClasses(
          'hero-slider-slide',
          SlideModuleCss.Slide,
          { className: SlideModuleCss.Active, useIf: isActive },
          { className: SlideModuleCss.Sliding, useIf: isActive && !isSliding },
          {
            className: getSlidingAnimationCssClass(
              slide.number,
              prevActiveSlide,
              slidingDirection
            ),
            useIf: isActive && isSliding
          }
        )
      );
    }
  }, [isActive, isSliding]);

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

  return (
    <div
      ref={slideRef}
      className={classNames}
      style={{
        ...style,
        ...CSSVariables
      }}
    >
      <Background {...background} onLoad={onBackgroundLoad} />
      <div
        className={composeCssClasses(
          'hero-slider-slide-wrapper',
          SlideModuleCss.Wrapper
        )}
      >
        {/* Mask */}
        {shouldRenderMask ? (
          <Mask background={background} isActive={isActive} />
        ) : null}

        {/* Container */}
        <div
          className={composeCssClasses(
            'hero-slider-slide-container',
            SlideModuleCss.Container,
            { className: SlideModuleCss.Active, useIf: isActive && !isSliding }
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

(Slide as React.FunctionComponent).displayName = 'hero-slider/slide';
