// Libraries
import styled, { keyframes, css } from 'styled-components';

// Keyframes and animations
const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

/*
--------------------------------
----------ANIMATIONS------------
--------------------------------
*/

const slidingDuration = css`${({ theme }) => theme.slidingDuration || '600ms'}`;
const slidingDelay = css`${({ theme }) => theme.slidingDelay || '0ms'}`;

const slideFadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideFadeIn = css`
  /* keyframe name | duration | timing function | delay */
  animation: ${slideFadeInKeyframes} ${slidingDuration} ease-in-out ${slidingDelay};
`;

// --------------------------------

const slideLeftToRightKeyframes = keyframes`
  0% {
    clip-path: inset(0% 100% 0% 0%);
    -webkit-clip-path: inset(0% 100% 0% 0%);
  }
  100% {
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0% 0% 0% 0%);
  }
`;

const slideLeftToRight = css`
  /* keyframe name | duration | timing function | delay */
  animation: ${slideLeftToRightKeyframes} ${slidingDuration} ease-in-out ${slidingDelay};
`;

// --------------------------------

const slideRightToLeftKeyframes = keyframes`
  0% {
    clip-path: inset(0% 0% 0% 100%);
    -webkit-clip-path: inset(0% 0% 0% 100%);
  }
  100% {
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0% 0% 0% 0%);
  }
`;

const slideRightToLeft = css`
  /* keyframe name | duration | timing function | delay */
  animation: ${slideRightToLeftKeyframes} ${slidingDuration} ease-in-out ${slidingDelay};
`;

// --------------------------------

const slideTopToBottomKeyframes = keyframes`
  0% {
    clip-path: inset(0% 0% 100% 0%);
    -webkit-clip-path: inset(0% 0% 100% 0%);
  }
  100% {
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0% 0% 0% 0%);
  }
`;

const slideTopToBottom = css`
  /* keyframe name | duration | timing function | delay */
  animation: ${slideTopToBottomKeyframes} ${slidingDuration} ease-in-out ${slidingDelay};
`;

// --------------------------------

const slideBottomToTopKeyframes = keyframes`
  0% {
    clip-path: inset(100% 0% 0% 0%);
    -webkit-clip-path: inset(100% 0% 0% 0%);
  }
  100% {
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0% 0% 0% 0%);
  }
`;

const slideBottomToTop = css`
/* keyframe name | duration | timing function | delay */
animation: ${slideBottomToTopKeyframes} ${slidingDuration} ease-in-out ${slidingDelay};
`;

// --------------------------------

export const animations = {
  slideFadeIn,
  slideLeftToRight,
  slideRightToLeft,
  slideTopToBottom,
  slideBottomToTop,
};

// Components
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  animation: ${fadeInKeyframes} ${({ theme }) => theme.sliderFadeInDuration || 100} ease-in;
  /* Removes gray highlight when clicked on safari/mobile. */
  -webkit-tap-highlight-color: rgba(0,0,0,0);
`;

/*
  `pointer-events` manipulation to allow clicking inner children AND children inside the Container.
*/
export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  * {
    pointer-events: auto;
  }
`;
