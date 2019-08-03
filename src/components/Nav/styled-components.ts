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
const navColor = css`${({ theme }) => theme.navColor || 'rgba(200, 215, 235, 0.6)'}`;
const navActiveColor = css`${({ theme }) => theme.navActiveColor || 'rgba(200, 215, 235, 1)'}`;

// CSS
export const Wrapper = styled.ul`
  display: inline-flex;
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  z-index: 3;
  opacity: 0;
  animation: ${fadeInKeyframes} ${navFadeInDuration} ease-in ${navFadeInDelay} forwards;

  .slide-nav-button {
    position: relative;
    color: currentColor;
    height: 50px;
    max-width: 60px;
    min-width: 50px;
    width: 15%;
    margin: 0 6px;
    border-bottom: 2px solid ${navColor};
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .slide-nav-active-button {
    border-color: ${navActiveColor}
  }

  @media (max-width: 744px) {
    .slide-nav-button {
      display: block;
      cursor: pointer;
      color: currentColor;
      outline: none;
      height: 14px;
      width: 14px;
      min-width: 14px;
      max-width: 14px;
      margin: 0 9px;
      border: 0;
      font-size: 0;
      line-height: 0;
      background: ${navColor};
      border-radius: 50%;
    }

    .slide-nav-active-button {
      background: ${navActiveColor};
    }
  }
`;
