// Libraries
import styled, { css, keyframes } from 'styled-components';

// Styles
const sliderWidth = css`
  ${({ theme }) => `calc(${theme.sliderWidth || '100vw'} * 0.66)`};
`;

const sliderHeight = css`
  ${({ theme }) => `calc(${theme.sliderHeight || '100vw'} * 0.66)`};
`;

const maskDuration = (multiplier = 1.5) => css`
  ${({ theme }) => `calc(${theme.maskDuration || '200ms'} * ${multiplier})`};
`;

const backgroundFadeInDuration = css`
  ${({ theme }) => theme.backgroundFadeInDuration || '1500ms'};
`;

const backgroundFadeInDelay = css`
  ${({ theme }) => theme.backgroundFadeInDelay || '100ms'};
`;

// Animations
const maskSlideIn = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    -webkit-clip-path: inset(50% 50% 50% 50%);
    clip-path: inset(50% 50% 50% 50%);
  }
  100% {
    opacity: 1;
    -webkit-clip-path: inset(0 0 0 0);
    clip-path: inset(0 0 0 0);
  }
`;

// Components
export const Mask = styled.div`
  &.slide-background-mask {
    overflow: hidden;
    position: absolute;
    left: 25%;
    top: 50%;
    width: ${sliderWidth};
    height: ${sliderHeight};
    max-width: 33%;
    max-height: 50%;
    -webkit-clip-path: polygon(0% 0%, 0% 100%, 16% 100%, 15% 15%, 85% 15%, 85% 85%, 15% 85%, 16% 100%, 100% 100%, 100% 0%);
    clip-path: polygon(0% 0%, 0% 100%, 16% 100%, 15% 15%, 85% 15%, 85% 85%, 15% 85%, 16% 100%, 100% 100%, 100% 0%);
    transform: translate3d(-33.33%, -50%, 0);
    transition: all ${maskDuration()} ease 0s;
  }
  &.slide-background-mask:not(.slide-background-mask-active) {
    opacity: 0;
    z-index: 1;
    transform: translate3d(33.33%, -50%, 0);
    /* property name | duration | timing function | delay */
    transition: all ${maskDuration(1)} ease 0s;
  }
  .slide-background-mask-inner {
    z-index: -1;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200%;
    height: 200%;
    transform: translate3d(-50%, -50%, 0);
    background-size: cover;
    background-position: center center;
    -webkit-transform-origin: 50% 16.5vh;
    transform-origin: 50% 16.5vh;
    transition: all ${maskDuration(1.66)} ease 0s;
  }
  .slide-background-mask-inner.slide-background-mask-inner-sliding {
    transition: all ${maskDuration(1)} ease 0s;
    transform: translate3d(-85%, -50%, 0);
  }

  @media (max-width: 1024px) {
    &.slide-background-mask {
      max-width: 50% !important;
    }
    .slide-background-mask-inner {
      width: ${sliderHeight};
      height: ${sliderHeight};
    }
  }
`;

export const Img = styled.img`
  &.slide-background-mask-loader {
    opacity: 0;
    z-index: -1;
  }

  &.slide-background-mask-loading {
    opacity: 0;
  }

  &.slide-background-mask-loaded {
    opacity: 0;
    animation-name: ${maskSlideIn};
    animation-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045);
    animation-fill-mode: forwards;
    animation-duration: ${backgroundFadeInDuration};
    animation-delay: ${backgroundFadeInDelay};
  }
`;
