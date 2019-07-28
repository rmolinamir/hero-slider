// Libraries
import styled, { css, keyframes } from 'styled-components';

// Styles
const absolutelyPositioned = css`
  position: absolute;
  top: 0;
  left: 0;
`;

const backgroundAnimationDuration = css`
  ${({ theme }) => {
    console.log('theme', theme);
    return '';
  }}
  ${({ theme }) => theme.backgroundAnimationDuration || '1500ms'}
`;
const backgroundAnimationDelay = css`
  ${({ theme }) => theme.backgroundAnimationDelay || '100ms'}
`;

// Animations
const fadeInKeyframes = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1;
  }
`;

const zoomOutKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.5);
  }
  5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Components
export const Img = styled.img`
  ${absolutelyPositioned};
  opacity: 0;
  z-index: -1;
`;

export const Background = styled.div`
  &.slide-background-loader,
  &.slide-background-loading,
  &.slide-background-loaded {
    ${absolutelyPositioned};
  }

  &.slide-background-loader {
    opacity: 0;
    z-index: -1;
  }

  &.slide-background-loading {
    opacity: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
  }

  &.slide-background-fade-in {
    opacity: 0;
    animation: ${fadeInKeyframes} ${backgroundAnimationDuration} ease-in-out ${backgroundAnimationDelay} forwards;
  }

  &.slide-background-zoom-out {
    opacity: 0;
    transform: scale(1.5);
    animation:
      ${fadeInKeyframes} ${backgroundAnimationDuration} ease-in-out ${backgroundAnimationDelay} forwards,
      ${zoomOutKeyframes} 30000ms ease-in-out ${backgroundAnimationDelay} forwards;
  }
`;
