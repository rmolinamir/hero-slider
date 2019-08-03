// Libraries
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 2;

  &,
  & * {
    /* To disable double-tap zoom */
    touch-action: manipulation;
    pointer-events: none;
  }

  @media (max-width: 744px) {
    & {
      display: none;
    }
  }

  .slide-button-container {
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    transition: all 400ms;
    pointer-events: none;
  }

  /* pointer-events manipulation to allow clicking inner children AND children inside the slide-button-container. */
  & *:not(.slide-button-container),
  .slide-button-container * {
    pointer-events: auto;
  }

  .slide-button-button-svg {
    width: 100%;
    /* Disabling button styling */
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  .slide-button-button-svg svg {
    opacity: 0.5;
    width: 60px;
    height: 60px;
    transition: all 200ms ease-in-out;
    color: #FFF;
  }

  .slide-button-button-svg:hover svg {
    opacity: 1;
    width: 80px;
    height: 80px;
    color: #FFF;
  }

  /**
  * --------------------------------------
  * -------------HORIZONTAL---------------
  * --------------------------------------
  */

  &.slide-button-horizontal {
    top: 0;
    width: 20%;
    height: 100%;
    min-width: 45px;
    max-width: 120px;
  }

  &.slide-button-horizontal.slide-button-previous {
    left: 0;
  }

  &.slide-button-horizontal.slide-button-next {
    right: 0;
  }

  &.slide-button-horizontal .slide-button-container:hover {
    --shadow: 100%;
  }

  &.slide-button-horizontal.slide-button-previous .slide-button-container {
    left: 33%;
    transform: translateX(-50%) scaleX(-1);
    background: linear-gradient(
      90deg,
      var(--c1, transparent) 40%,
      var(--c2, rgb(37, 37, 37, .05)) 60%,
      var(--c3, rgb(37, 37, 37, 0.5)) 85%
    ) var(--shadow, 0) / 200%;
  }

  &.slide-button-horizontal.slide-button-next .slide-button-container {
    right: 33%;
    transform: translateX(50%);
    background: linear-gradient(
      90deg,
      var(--c1, transparent) 40%,
      var(--c2, rgb(37, 37, 37, .05)) 60%,
      var(--c3, rgb(37, 37, 37, 0.5)) 85%
    ) var(--shadow, 0) / 200%;
  }

  /**
  * ------------------------------------
  * -------------VERTICAL---------------
  * ------------------------------------
  */

  &.slide-button-vertical {
    width: 100%;
    height: 15%;
    max-height: 200px;
  }

  &.slide-button-vertical.slide-button-previous {
    top: 0;
  }

  &.slide-button-vertical.slide-button-next {
    bottom: 0;
  }

  &.slide-button-vertical .slide-button-container:hover {
    --shadow: 0;
  }

  &.slide-button-vertical.slide-button-previous .slide-button-container {
    background: linear-gradient(to bottom,
      rgb(37, 37, 37, 0.66) 0%,
      rgb(37, 37, 37, 0.33) 50%,
      rgb(37, 37, 37, 0.15) 75%,
      rgb(37, 37, 37, 0.01) 100%) no-repeat 0px var(--shadow, -200px);
  }

  &.slide-button-vertical.slide-button-previous svg {
    transform: rotate(-90deg);
  }

  &.slide-button-vertical.slide-button-next .slide-button-container {
    background: linear-gradient(to top,
      rgb(37, 37, 37, 0.66) 0%,
      rgb(37, 37, 37, 0.33) 50%,
      rgb(37, 37, 37, 0.15) 75%,
      rgb(37, 37, 37, 0.01) 100%) no-repeat 0px var(--shadow, 200px);
  }

  &.slide-button-vertical.slide-button-next svg {
    transform: rotate(90deg);
  }
`;
