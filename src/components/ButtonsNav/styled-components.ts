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
const navColor = css`${({ theme }) => theme.navColor || 'rgb(255, 255, 255)'}`;
const navActiveColor = css`${({ theme }) => theme.navActiveColor || 'rgb(59, 62, 69)'}`;
const navBackgroundColor = (defaultBackgroundColor: string) => css`${({ theme }) => theme.navBackgroundColor || defaultBackgroundColor}`;

// Components
export const Wrapper = styled.div`
  position: absolute;
  display: inline-flex;
  z-index: 3;
  margin: 0 auto;
  padding: 0;
  cursor: pointer;
  user-select: none;
  opacity: 0;
  animation: ${fadeInKeyframes} ${navFadeInDuration} ease-in ${navFadeInDelay} forwards;
`;

export const Container = styled.ul`
  display: flex;
  position: relative;
  max-width: 100%;
  height: 54px;
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;

const buttonStyle = css`
  display: inline-flex;
  align-items: center;
  position: relative;
  width: 240px;
  height: 48px;
  list-style: none;
  cursor: pointer;
  background-color: transparent;
  color: ${navColor};
  flex-basis: 0;
  flex-grow: 1;
  transition: all 200ms ease-in-out;
  outline: 0;
  padding: 0;
  font-weight: 600;

  &:not(.slide-button-nav-active-button):before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: ${navBackgroundColor('rgba(255, 255, 255, 0.8)')};
    z-index: -1;
    transition: all 200ms ease-in-out;
  }

  &:hover:not(.slide-button-nav-active-button) {
    background-color: ${navColor};
    color: ${navActiveColor};
  }

  &:not(.slide-button-nav-active-button):not(:first-child) {
    box-shadow: -1px 0px 0px 0px ${navBackgroundColor('rgba(215, 225, 235, 0.8)')};
  }

  &.slide-button-nav-active-button {
    height: 54px;
    cursor: default;
    color: ${navColor};
    background-color: transparent;
  }

  /* Backgrounds set in :before to allow for opacity */
  &.slide-button-nav-active-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.95;
    box-shadow: -1px 0px 0px 0px ${navActiveColor};
    background-color: ${navActiveColor};
    z-index: -1;
    transition: all 200ms ease-in-out;
  }

  &.slide-button-nav-active-button + .Button,
  &.slide-button-nav-active-button + .ExtraButton {
    box-shadow: -1px 0px 0px 0px transparent !important;
  }
`;

export const ExtraButton = styled.div`
  ${buttonStyle};
  align-items: unset;
  color: ${navColor};
  box-shadow: -1px 0px 0px 0px ${navBackgroundColor('rgba(215, 225, 235, 0.8)')};
`;

export const Button = styled.li`
  ${buttonStyle};
`;

export const Description = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 0.5rem;
`;

export const Text = styled.div`
  width: 95%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  color: inherit;
  letter-spacing: 0.1rem;
  font-size: 0.75rem;
  line-height: 1rem;
`;
