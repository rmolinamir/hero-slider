import React from 'react';
import { setInitialSlidingAnimation } from '../../../dependencies/setInitialSlidingAnimation';
import { EAnimations, EOrientation, Settings, SliderProps } from '../typings';

export default function useSliderSettings(
  props: SliderProps
): [Settings, React.Dispatch<React.SetStateAction<Settings>>] {
  const [sliderSettings, setSettings] = React.useState<Settings>({
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

  const settings = React.useMemo(
    () => ({
      ...sliderSettings,
      ...props.settings
    }),
    [sliderSettings, props.settings]
  );

  return [settings, setSettings];
}
