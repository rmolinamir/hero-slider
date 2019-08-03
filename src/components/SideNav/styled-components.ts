// Libraries
import styled, { css, keyframes } from 'styled-components';

// Animations
const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Styles
const navFadeInDuration = css`${({ theme }) => theme.navFadeInDuration || 500}`;
const navFadeInDelay = css`${({ theme }) => theme.navFadeInDelay || 1000}`;
const navColor = css`${({ theme }) => theme.navColor || '#C8D7EB'}`;
const navActiveColor = css`${({ theme }) => theme.navActiveColor || '#FFFFFF'}`;

export const Wrapper = styled.ul`
  width: 60px;
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 3;
  opacity: 0;
  animation: ${fadeInKeyframes} ${navFadeInDuration} ease-in ${navFadeInDelay} forwards;

  .slide-side-nav-button {
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 auto;
    padding: 0.5rem 0;
    text-align: right;
    color: ${navActiveColor};
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .slide-side-nav-active-button {
    color: ${navColor};
  }

  .slide-side-nav-button-line {
    width: 20px;
    height: 1px;
    background-color: currentColor;
    transition: all ease 200ms;
  }

  .slide-side-nav-button-number {
    width: 10px;
    font-size: 19px;
    margin: 0;
    transform: scaleX(0);
    transition: all ease 200ms;
  }

  .slide-side-nav-active-button .slide-side-nav-button-line {
    width: 50px;
  }

  .slide-side-nav-active-button .slide-side-nav-button-number {
    margin: 0 0.5ch;
    transform: scaleX(1);
  }
`;
