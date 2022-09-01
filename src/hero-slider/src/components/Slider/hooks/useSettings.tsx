import React from 'react';
import type CSS from 'csstype';
import { setInitialSlidingAnimation } from '../../../dependencies/setInitialSlidingAnimation';
import { EAnimations, EOrientation, SliderProps } from '../typings';

/**
 * Type definition for `SliderProps.settings`.
 */
export interface SliderSettingsProps {
  slidingDuration: number;
  slidingDelay: number;
  sliderColor: string;
  sliderFadeInDuration: number;
  navbarFadeInDuration: number;
  navbarFadeInDelay: number;
  isSmartSliding: boolean;
  shouldDisplayButtons: boolean;
  shouldAutoplay: boolean;
  shouldSlideOnArrowKeypress: boolean;
  autoplayDuration: number;
  autoplayHandlerTimeout: number;
  width: CSS.Properties['width'];
  height: CSS.Properties<string | number>['height'];
}

export interface SliderSettings extends SliderSettingsProps {
  initialSlidingAnimation: EAnimations;
  slidingAnimation: string;
  sliderOrientation: EOrientation;
}

export default function useSettings(
  props: SliderProps
): [SliderSettings, React.Dispatch<React.SetStateAction<SliderSettings>>] {
  const [sliderSettings, setSettings] = React.useState<SliderSettings>({
    // Dependants
    initialSlidingAnimation:
      (props.slidingAnimation as EAnimations | undefined) ||
      EAnimations.RIGHT_TO_LEFT,
    slidingAnimation: setInitialSlidingAnimation(props.slidingAnimation),
    sliderOrientation:
      (props.orientation as EOrientation | undefined) ||
      EOrientation.HORIZONTAL,
    // Defaults
    slidingDuration: 500,
    slidingDelay: 200,
    sliderColor: 'inherit',
    sliderFadeInDuration: 100,
    navbarFadeInDuration: 1000,
    navbarFadeInDelay: 500,
    isSmartSliding: true,
    shouldDisplayButtons: true,
    shouldAutoplay: true,
    shouldSlideOnArrowKeypress: false,
    autoplayDuration: 8000,
    autoplayHandlerTimeout: 1000,
    width: '100%',
    height: '100%',
    ...props.settings
  });

  const settings = {
    ...sliderSettings,
    ...props.settings
  };

  return [settings, setSettings];
}
