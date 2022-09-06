import React from 'react';
import HeroSliderModuleCss from './HeroSlider.module.css';
import Buttons from './components/Buttons';
import {
  SettingsProps,
  SettingsProvider,
  useSettings
} from './modules/Settings';
import {
  AnimationsProps,
  AnimationsProvider,
  useAnimations
} from './modules/Animations';
import {
  ControllerProps,
  ControllerProvider,
  useController
} from './modules/Controller';
import { LayoutProvider, useLayout } from './modules/Layout';
import {
  AccessabilityProps,
  AccessabilityProvider,
  useAccessability
} from './modules/Accessability';
import {
  AutoplayProps,
  AutoplayProvider,
  useAutoplay
} from './modules/Autoplay';
import { ManagerProps, ManagerProvider } from './modules/Manager';
import {
  IntersectionObserverProvider,
  useIntersectionObserver
} from './modules/IntersectionObserver';
import { composeCssClasses } from './utils/composeCssClasses';
import ConsoleLogger from './modules/ConsoleLogger';

const logger = ConsoleLogger.new();

/**
 * `HeroSlider` props.
 */
export interface HeroSliderProps {
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  style?: Omit<React.CSSProperties, 'width' | 'height'>;
  manager?: ManagerProps;
  settings?: SettingsProps;
  controller?: ControllerProps;
  accessability?: AccessabilityProps;
  animations?: AnimationsProps;
  autoplay?: AutoplayProps;
}

function Orchestrator({
  width = '100%',
  height = '100vh',
  style,
  children
}: React.PropsWithChildren<
  Pick<HeroSliderProps, 'width' | 'height' | 'style'>
>) {
  logger.info('[Orchestrator] rerender');

  const { shouldDisplayButtons } = useAccessability();
  const { sliderFadeInDuration, navbarFadeInDuration, navbarFadeInDelay } =
    useAnimations();
  const { state: layout } = useLayout();
  const { slidingDuration, slidingDelay, getSlidingCycleDuration } =
    useController();
  const settings = useSettings();
  const { debounce } = useAutoplay();
  const { onTouchStartHandler, onTouchMoveHandler, onTouchEndHandler } =
    useAccessability();
  const { elementObservedRef } = useIntersectionObserver();

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
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
    <div className="hero-slider-root" ref={elementObservedRef}>
      <div
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
          ...(CSSVariables as React.CSSProperties),
          ...style,
          width: width,
          height: height
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
            <AccessabilityProvider accessability={props.accessability}>
              <AnimationsProvider animations={props.animations}>
                <IntersectionObserverProvider>
                  <AutoplayProvider autoplay={props.autoplay}>
                    <Orchestrator
                      width={props.width}
                      height={props.height}
                      style={props.style}
                    >
                      {props.children}
                    </Orchestrator>
                  </AutoplayProvider>
                </IntersectionObserverProvider>
              </AnimationsProvider>
            </AccessabilityProvider>
          </ControllerProvider>
        </SettingsProvider>
      </ManagerProvider>
    </LayoutProvider>
  );
}
