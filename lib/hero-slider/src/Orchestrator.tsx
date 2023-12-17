import React from 'react';
import Buttons from './components/Buttons';
import { HeroSliderProps } from './HeroSlider';
import HeroSliderModuleCss from './HeroSlider.module.css';
import { useAccessibility } from './modules/Accessibility';
import { useAnimations } from './modules/Animations';
import { useAutoplay } from './modules/Autoplay';
import ConsoleLogger from './modules/ConsoleLogger';
import { useController } from './modules/Controller';
import { useIntersectionObserver } from './modules/IntersectionObserver';
import { useLayout } from './modules/Layout';
import { useSettings } from './modules/Settings';
import { composeCssClasses } from './utils/composeCssClasses';

const logger = ConsoleLogger.new();

export function Orchestrator({
  className,
  width = '100%',
  height = '100vh',
  style,
  children
}: React.PropsWithChildren<
  Pick<HeroSliderProps, 'className' | 'width' | 'height' | 'style'>
>) {
  logger.info('[Orchestrator] rerender');

  const { shouldDisplayButtons } = useAccessibility();
  const { sliderFadeInDuration, navbarFadeInDuration, navbarFadeInDelay } =
    useAnimations();
  const { state: layout } = useLayout();
  const { slidingDuration, slidingDelay, getSlidingCycleDuration } =
    useController();
  const settings = useSettings();
  const { debounce } = useAutoplay();
  const { onTouchStartHandler, onTouchMoveHandler, onTouchEndHandler } =
    useAccessibility();
  const { elementObservedRef } = useIntersectionObserver();

  /**
   * CSS variables for the transitions.
   */
  const cssVariables = {
    '--sliding-duration': `${slidingDuration}ms`,
    '--sliding-delay': `${slidingDelay}ms`,
    '--slide-transition-delay': `${getSlidingCycleDuration()}ms`,
    '--slider-width': layout.width ? `${layout.width}px` : undefined,
    '--slider-height': layout.height ? `${layout.height}px` : undefined,
    '--slider-color': settings.sliderColor,
    '--slider-fade-in-duration': `${sliderFadeInDuration}ms`,
    '--nav-fade-in-duration': `${navbarFadeInDuration}ms`,
    '--nav-fade-in-delay': `${navbarFadeInDelay}ms`,
    '--nav-background-color': settings.navbarStyle
      ? settings.navbarStyle.color
      : undefined,
    '--nav-active-color': settings.navbarStyle
      ? settings.navbarStyle.activeColor
      : undefined,
    '--mask-duration': `${getSlidingCycleDuration()}ms`
  };

  return (
    <div
      data-testid="hero-slider"
      className={composeCssClasses('hero-slider', className)}
      ref={elementObservedRef}
    >
      <div
        data-testid="hero-slider-wrapper"
        ref={layout.slider}
        className={composeCssClasses(
          'hero-slider-wrapper',
          HeroSliderModuleCss.Wrapper
        )}
        onTouchStart={onTouchStartHandler}
        onTouchMove={onTouchMoveHandler}
        onTouchEnd={onTouchEndHandler}
        onMouseMoveCapture={debounce}
        style={{
          ...(cssVariables as React.CSSProperties),
          ...style,
          width,
          height
        }}
      >
        {children}
        {shouldDisplayButtons && <Buttons />}
      </div>
    </div>
  );
}
