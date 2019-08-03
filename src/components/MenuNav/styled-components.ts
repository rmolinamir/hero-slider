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
const navColor = css`${({ theme }) => theme.navColor || 'rgba(215, 225, 235, 0.6)'}`;
const navActiveColor = css`${({ theme }) => theme.navActiveColor || 'rgb(255, 255, 255)'}`;

// Components
export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  z-index: 3;
  width: 90%; /* May be placeholder. */
  margin: 0 auto;
  padding: 0;
  cursor: pointer;
  user-select: none;
  opacity: 0;
  animation: ${fadeInKeyframes} ${navFadeInDuration} ease-in ${navFadeInDelay} forwards;

  .slide-menu-nav-button {
    list-style: none;
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    color: var(--nav-active-color, #FFF);
    min-height: 15%;
    height: auto;
    margin: 1rem 0;
    padding: 0.5rem 0.75rem;
  }

  .slide-menu-nav-button:not(:first-child):not(:last-child) {
    border-left: 1px solid var(--nav-color, rgba(215, 225, 235, 0.6));
  }

  .slide-menu-nav-button-description {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 0.5rem;
  }

  .slide-menu-nav-button-number {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 36px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    backface-visibility: hidden;
    color: var(--nav-active-color, #FFF);
    font-size: 12px;
  }

  .slide-menu-nav-button-number .slide-menu-nav-button-square {
    background-color: transparent;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.18);
    display: block;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(45deg) translate(-50%, -50%);
    transform-origin: 0px 0px;
    width: 24px;
    height: 24px;
    z-index: -1;
    border: 1px solid #fff;
    opacity: 0.5;
  }

  .slide-menu-nav-button-text {
    width: 80%;
    padding-left: 1.4rem;
    font-weight: 700;
    font-size: 12px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  margin: 0;
  padding: 0;
  border-top: 1px solid ${navColor};
`;

export const Bar = styled.div`
  position: absolute;
  top: 0px;
  height: 4px;
  background-color: ${navActiveColor};
  opacity: 0.75;
  transition: transform 400ms ease;
`;

export const ExtraButtonWrapper = styled.div<{ isExtraButtonRight: boolean }>`
  display: flex;
  min-width: 50px;
  margin: 0;
  padding: 0;
  color: ${navActiveColor};
  border-top: 1px solid ${navColor};
  order: ${({ isExtraButtonRight }) => (isExtraButtonRight ? 1 : 0)};
`;

export const ExtraButton = styled.span<{ isExtraButtonRight: boolean }>`
  flex: 1;
  color: ${navActiveColor};
  min-height: 15%;
  height: auto;
  margin: 1rem 0;
  padding: 0;
  ${({ isExtraButtonRight }) => (isExtraButtonRight ? `
    border-left: 1px solid ${navColor};
  ` : `
    border-right: 1px solid ${navColor};
  `)};
`;
