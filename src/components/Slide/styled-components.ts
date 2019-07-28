// Libraries
import styled, { css } from 'styled-components';

// Dependencies
import { EAnimations } from '../../typings/definitions';
import { animations } from '../../components/Slider/styled-components';

interface StyledSlideProps {
  isActive: boolean;
  isDoneSliding: boolean;
  slidingAnimation: EAnimations;
}

const slidingDelay = (delay = 200) => css`${({ theme }) => theme.slidingDelay || `${delay}ms`}`;
const slideTransitionDelay = css`${({ theme }) => theme.slideTransitionDelay || '800ms'}`;

const slideCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translate3d(0, 0, 0);
  overflow: hidden;
`;

const activeCss = css`
  z-index: 2; /* NOTE: It is imperative for z-index to be here, do not remove. */
  transform: translate3d(0, 0, 0);
  transition-delay: ${slidingDelay()};
`;

const inactiveCss = css`
  user-select: none;
  z-index: 1;
  transform: translate3d(100%, 0, 0);
  transition-delay: ${slideTransitionDelay};
`;

const setAnimation = css`${({ theme }) => {
  const { slidingAnimation } = theme as { slidingAnimation: EAnimations };
  switch (slidingAnimation) {
      // Top to bottom.
    case EAnimations.TOP_TO_BOTTOM:
      return animations.slideTopToBottom;
      // Bottom to top.
    case EAnimations.BOTTOM_TO_TOP:
      return animations.slideBottomToTop;
      // Left to right.
    case EAnimations.LEFT_TO_RIGHT:
      return animations.slideLeftToRight;
    // Right to left, by default.
    case EAnimations.RIGHT_TO_LEFT:
      return animations.slideRightToLeft;
    case EAnimations.FADE:
    default:
      return animations.slideFadeIn;
  }
}}`;

export const StyledSlide = styled.div<StyledSlideProps>`
  ${slideCss};
  /* property name | duration | timing function | delay */
  transition: transform 0ms ease-in-out ${slidingDelay(0)};
  ${({ isActive, isDoneSliding }) => css`
      ${isActive ? activeCss : inactiveCss};
      ${(isActive && !isDoneSliding) && setAnimation};
  `}
  .slide-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .slide-container  {
    ${slideCss};
  }

  .slide-active {
    ${activeCss};
  }

  .slide-container {
    backface-visibility: hidden;
    /* property name | duration | timing function | delay */
    transition: all 300ms ease-in-out ${slidingDelay()};
  }

  .slide-container:not(.slide-active) {
    z-index: 1;
    opacity: 0;
    /* property name | duration | timing function | delay */
    transition: all 200ms ease-in-out ${slidingDelay()};
  }
`;
