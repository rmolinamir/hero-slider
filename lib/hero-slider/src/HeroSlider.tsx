import React from 'react';

import Buttons from './components/Buttons';
import HeroSliderModuleCss from './HeroSlider.module.css';
import {
  AccessibilityProps,
  AccessibilityProvider,
  useAccessibility
} from './modules/Accessibility';
import {
  AnimationsProps,
  AnimationsProvider,
  useAnimations
} from './modules/Animations';
import {
  AutoplayProps,
  AutoplayProvider,
  useAutoplay
} from './modules/Autoplay';
import ConsoleLogger from './modules/ConsoleLogger';
import {
  ControllerProps,
  ControllerProvider,
  useController
} from './modules/Controller';
import {
  IntersectionObserverProvider,
  useIntersectionObserver
} from './modules/IntersectionObserver';
import { LayoutProvider, useLayout } from './modules/Layout';
import { ManagerProps, ManagerProvider } from './modules/Manager';
import {
  SettingsProps,
  SettingsProvider,
  useSettings
} from './modules/Settings';
import { composeCssClasses } from './utils/composeCssClasses';

const logger = ConsoleLogger.new();

/**
 * `HeroSlider` props.
 */
export interface HeroSliderProps {
  /**
   * Slider className.
   */
  className?: React.HTMLProps<HTMLDivElement>['className'];
  /**
   * CSS property. Defines the width of the slider.
   * @default '100%'
   */
  width?: React.CSSProperties['width'];
  /**
   * CSS property. Defines the height of the slider.
   * @default '100vh'
   */
  height?: React.CSSProperties['height'];
  /**
   * Inline CSS styling.
   */
  style?: Omit<React.CSSProperties, 'width' | 'height'>;

  // Modules
  manager?: ManagerProps;
  settings?: SettingsProps;
  controller?: ControllerProps;
  accessibility?: AccessibilityProps;
  animations?: AnimationsProps;
  autoplay?: AutoplayProps;
}

function Orchestrator({
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

export default function HeroSlider(
  props: React.PropsWithChildren<HeroSliderProps>
) {
  return (
    <LayoutProvider>
      <ManagerProvider manager={props.manager}>
        <SettingsProvider settings={props.settings}>
          <ControllerProvider controller={props.controller}>
            <AccessibilityProvider accessibility={props.accessibility}>
              <AnimationsProvider animations={props.animations}>
                <IntersectionObserverProvider>
                  <AutoplayProvider autoplay={props.autoplay}>
                    <Orchestrator
                      className={props.className}
                      width={props.width}
                      height={props.height}
                      style={props.style}
                    >
                      {props.children}
                    </Orchestrator>
                  </AutoplayProvider>
                </IntersectionObserverProvider>
              </AnimationsProvider>
            </AccessibilityProvider>
          </ControllerProvider>
        </SettingsProvider>
      </ManagerProvider>
    </LayoutProvider>
  );
}
