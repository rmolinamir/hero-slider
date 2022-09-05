import { SlidingAnimation } from '../../components/Slider/modules/wireframes';
import HeroSliderModuleCss from '../HeroSlider.module.css';

// TODO: Rename to getInitialSlidingAnimation
export const setInitialSlidingAnimation = (
  animation?: `${SlidingAnimation}`
): string => {
  switch (animation) {
    case SlidingAnimation.FADE:
      return HeroSliderModuleCss.Sliding_Fade_In;
    // Top to bottom.
    case SlidingAnimation.TOP_TO_BOTTOM:
      return HeroSliderModuleCss.Sliding_Top_To_Bottom;
    // Bottom to top.
    case SlidingAnimation.BOTTOM_TO_TOP:
      return HeroSliderModuleCss.Sliding_Bottom_To_Top;
    // Left to right.
    case SlidingAnimation.LEFT_TO_RIGHT:
      return HeroSliderModuleCss.Sliding_Left_To_Right;
    // Right to left, by default.
    case SlidingAnimation.RIGHT_TO_LEFT:
    default:
      return HeroSliderModuleCss.Sliding_Right_To_Left;
  }
};
