import { EAnimations } from '../typings/definitions';
import HeroSliderModuleCss from '../components/Slider/HeroSlider.module.css';

export const setInitialSlidingAnimation = (animation?: EAnimations): string => {
  switch (animation) {
    case EAnimations.FADE:
      return HeroSliderModuleCss.Sliding_Fade_In;
    // Top to bottom.
    case EAnimations.TOP_TO_BOTTOM:
      return HeroSliderModuleCss.Sliding_Top_To_Bottom;
    // Bottom to top.
    case EAnimations.BOTTOM_TO_TOP:
      return HeroSliderModuleCss.Sliding_Bottom_To_Top;
    // Left to right.
    case EAnimations.LEFT_TO_RIGHT:
      return HeroSliderModuleCss.Sliding_Left_To_Right;
    // Right to left, by default.
    case EAnimations.RIGHT_TO_LEFT:
    default:
      return HeroSliderModuleCss.Sliding_Right_To_Left;
  }
};
