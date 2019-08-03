// Dependencies
import {
  EAnimations,
} from '../typings/definitions';

export const setInitialSlidingAnimation = (animation?: EAnimations): EAnimations => {
  switch (animation) {
    case EAnimations.FADE:
    // Top to bottom.
    case EAnimations.TOP_TO_BOTTOM:
    // Bottom to top.
    case EAnimations.BOTTOM_TO_TOP:
    // Left to right.
    case EAnimations.LEFT_TO_RIGHT:
      return animation;
    // Right to left, by default.
    case EAnimations.RIGHT_TO_LEFT:
    default:
      return EAnimations.RIGHT_TO_LEFT;
  }
};
