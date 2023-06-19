import React from 'react';

import HeroSliderModuleCss from '../HeroSlider.module.css';
import { AccessibilityOrientation, useAccessibility } from './Accessibility';

enum SlidingAnimation {
  TOP_TO_BOTTOM = 'top_to_bottom',
  BOTTOM_TO_TOP = 'bottom_to_top',
  LEFT_TO_RIGHT = 'left_to_right',
  RIGHT_TO_LEFT = 'right_to_left',
  FADE = 'fade'
}

export interface AnimationsProps {
  /**
   * The sliding animations during transitions.
   * @default 'wipe'
   */
  slidingAnimation?: 'fade' | 'wipe';
  /**
   * Fade in duration of the slider during mount, in milliseconds.
   * @default 100
   */
  sliderFadeInDuration?: number;
  /**
   * Navbars fade in duration, in milliseconds.
   * @default 1000
   */
  navbarFadeInDuration?: number;
  /**
   * Navbars fade in delay, in milliseconds.
   * @default 500
   */
  navbarFadeInDelay?: number;
  /**
   * When `true`, the `hero-slider` will know which animation should be set next.
   * For example, if the user is selecting the next slide, the animation would be different to the one if the user had selected the previous slide.
   * The animations will essentially be the same, but moving to different directions (e.g. left or right, or right to left).
   * @default true
   */
  shouldManageAnimationSequence?: boolean;
}

type ProviderProps = React.PropsWithChildren<{ animations?: AnimationsProps }>;

interface GetSlidingAnimationCssClass {
  (
    activeSlide: number,
    prevActiveSlide: number,
    slidingDirection?: 'forward' | 'backward'
  ): string;
}

const SlidingAnimationCssClassMap: Record<SlidingAnimation, string> = {
  [SlidingAnimation.FADE]: HeroSliderModuleCss.Sliding_Fade_In,
  [SlidingAnimation.TOP_TO_BOTTOM]: HeroSliderModuleCss.Sliding_Top_To_Bottom,
  [SlidingAnimation.BOTTOM_TO_TOP]: HeroSliderModuleCss.Sliding_Bottom_To_Top,
  [SlidingAnimation.LEFT_TO_RIGHT]: HeroSliderModuleCss.Sliding_Left_To_Right,
  [SlidingAnimation.RIGHT_TO_LEFT]: HeroSliderModuleCss.Sliding_Right_To_Left
};

const defaultProps: Required<AnimationsProps> = {
  slidingAnimation: 'wipe',
  sliderFadeInDuration: 100,
  navbarFadeInDuration: 1000,
  navbarFadeInDelay: 500,
  shouldManageAnimationSequence: true
};

const AnimationsStateContext = React.createContext<
  | {
      sliderFadeInDuration: number;
      navbarFadeInDuration: number;
      navbarFadeInDelay: number;
      getSlidingAnimationCssClass: GetSlidingAnimationCssClass;
    }
  | undefined
>(undefined);

function AnimationsProvider({ children, animations }: ProviderProps) {
  const { orientation } = useAccessibility();

  const params: Required<AnimationsProps> = {
    slidingAnimation:
      animations?.slidingAnimation || defaultProps.slidingAnimation,
    sliderFadeInDuration:
      animations?.sliderFadeInDuration ?? defaultProps.sliderFadeInDuration,
    navbarFadeInDuration:
      animations?.navbarFadeInDuration ?? defaultProps.navbarFadeInDuration,
    navbarFadeInDelay:
      animations?.navbarFadeInDelay ?? defaultProps.navbarFadeInDelay,
    shouldManageAnimationSequence:
      animations?.shouldManageAnimationSequence ??
      defaultProps.shouldManageAnimationSequence
  };

  const getSlidingAnimationCssClass: GetSlidingAnimationCssClass = (
    activeSlide,
    prevActiveSlide,
    slidingDirection
  ): string => {
    const getSlidingAnimation = (): SlidingAnimation => {
      switch (params.slidingAnimation) {
        case 'fade':
          return SlidingAnimation.FADE;
        case 'wipe': {
          let direction: 'forward' | 'backward';

          if (slidingDirection) direction = slidingDirection;
          else {
            const isSlidingForward = activeSlide > prevActiveSlide;
            direction = isSlidingForward ? 'forward' : 'backward';
          }

          if (direction === 'forward')
            return orientation === AccessibilityOrientation.HORIZONTAL
              ? SlidingAnimation.RIGHT_TO_LEFT
              : SlidingAnimation.BOTTOM_TO_TOP;
          else
            return orientation === AccessibilityOrientation.HORIZONTAL
              ? SlidingAnimation.LEFT_TO_RIGHT
              : SlidingAnimation.TOP_TO_BOTTOM;
        }
        default: {
          throw new Error(
            `Unhandled sliding animation: [${params.slidingAnimation}]`
          );
        }
      }
    };

    return SlidingAnimationCssClassMap[getSlidingAnimation()];
  };

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {
    sliderFadeInDuration: params.sliderFadeInDuration,
    navbarFadeInDuration: params.sliderFadeInDuration,
    navbarFadeInDelay: params.sliderFadeInDuration,
    getSlidingAnimationCssClass
  };

  return (
    <AnimationsStateContext.Provider value={value}>
      {children}
    </AnimationsStateContext.Provider>
  );
}

function useAnimations() {
  const context = React.useContext(AnimationsStateContext);

  if (context === undefined) {
    throw new Error('useAnimations must be used within a AnimationsProvider');
  }

  return context;
}

export { AnimationsProvider, useAnimations };
