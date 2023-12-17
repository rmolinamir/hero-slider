import React from 'react';
import {
  AccessibilityProps,
  AccessibilityProvider
} from './modules/Accessibility';
import { AnimationsProps, AnimationsProvider } from './modules/Animations';
import { AutoplayProps, AutoplayProvider } from './modules/Autoplay';
import { ControllerProps, ControllerProvider } from './modules/Controller';
import { IntersectionObserverProvider } from './modules/IntersectionObserver';
import { LayoutProvider } from './modules/Layout';
import { ManagerProps, ManagerProvider } from './modules/Manager';
import { SettingsProps, SettingsProvider } from './modules/Settings';
import { Orchestrator } from './Orchestrator';

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
