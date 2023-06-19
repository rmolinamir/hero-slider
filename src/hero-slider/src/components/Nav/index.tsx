import React from 'react';

import { useController } from '../../modules/Controller';
import { useManager } from '../../modules/Manager';
import { composeCssClasses } from '../../utils/composeCssClasses';
import NavModuleCss from './index.module.css';

/**
 * Defines the position of the navigation component.
 */
export interface NavPosition {
  top?: React.CSSProperties['top'];
  left?: React.CSSProperties['left'];
  bottom?: React.CSSProperties['bottom'];
  right?: React.CSSProperties['right'];
  transform?: React.CSSProperties['transform'];
}

/**
 * `Nav` component props.
 */
export interface NavProps {
  /**
   * Object of CSS properties `top`, `left`, `bottom`, and `right` used to absolutely position elements.
   * Aside from the former, you can also set the CSS `transform` property to help you center the element.
   * @default
   * {
   *    bottom: '1.5rem',
   *    left: '50%',
   *    transform: 'translateX(-50%)'
   * }
   */
  position?: NavPosition;
  /**
   * Defines `--nav-color` CSS variable.
   */
  color?: string;
  /**
   * Defines `--nav-active-color` CSS variable.
   */
  activeColor?: string;
}

export function Nav({
  color,
  activeColor,
  position = {
    bottom: '1.5rem',
    left: '50%',
    transform: 'translateX(-50%)'
  }
}: NavProps) {
  const {
    state: { slides, totalSlides }
  } = useManager();

  const {
    state: { activeSlide },
    changeSlide
  } = useController();

  function renderButtons() {
    if (!totalSlides) return [];

    const onClickHandler = (slideNumber: number) => {
      if (slideNumber !== activeSlide) changeSlide(slideNumber);
    };

    return Array.from(slides.values()).map(({ number }) => {
      return (
        // TODO: Deal with the disabled linting later:
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li
          key={number}
          className={composeCssClasses(
            'hero-slider-nav-button',
            NavModuleCss.Button,
            { className: NavModuleCss.Active, useIf: activeSlide === number }
          )}
          onClick={() => onClickHandler(number)}
        />
      );
    });
  }

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-color': color,
    '--nav-active-color': activeColor
  };

  return (
    <ul
      className={composeCssClasses(
        'hero-slider-nav-wrapper',
        NavModuleCss.Wrapper
      )}
      style={{
        ...position,
        ...CSSVariables
      }}
    >
      {renderButtons()}
    </ul>
  );
}

(Nav as React.FunctionComponent).displayName = 'hero-slider/nav';
