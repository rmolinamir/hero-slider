import React from 'react';

import { useController } from '../../modules/Controller';
import { useManager } from '../../modules/Manager';
import { composeCssClasses } from '../../utils/composeCssClasses';
import { NavPosition, NavProps } from '../Nav';
import SideNavModuleCss from './index.module.css';

/**
 * `SideNav` component props.
 */
export interface SideNavProps extends NavProps {
  /**
   * Defines the inline CSS property `right` of the component.
   */
  right?: React.CSSProperties['right'];
  /**
   * Defines the inline CSS property `left` of the component.
   */
  left?: React.CSSProperties['left'];
  /**
   * Defines the position. If you set it to the left, set this to false to disable any existing `right` CSS properties and avoid any conflicts.
   * @default true
   */
  isPositionedRight?: boolean;
  /**
   * Object of CSS properties `top`, `left`, `bottom`, and `right` used to absolutely position elements.
   * Aside from the former, you can also set the CSS `transform` property to help you center the element.
   * @default
   * {
   *    bottom: undefined,
   *    top: '50%',
   *    left: !isPositionedRight ? left || '1rem' : undefined,
   *    right: isPositionedRight ? right || '1rem' : undefined,
   *    transform: 'translateY(-50%)'
   * }
   */
  position?: NavPosition;
}

export function SideNav({
  color,
  activeColor,
  left,
  right,
  isPositionedRight = true,
  position = {
    bottom: undefined,
    top: '50%',
    left: !isPositionedRight ? left || '1rem' : undefined,
    right: isPositionedRight ? right || '1rem' : undefined,
    transform: 'translateY(-50%)'
  }
}: SideNavProps) {
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
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <li
          key={number}
          className={composeCssClasses(
            'hero-slider-side-nav-button',
            SideNavModuleCss.Button,
            {
              className: SideNavModuleCss.Active,
              useIf: activeSlide === number
            }
          )}
          onClick={() => onClickHandler(number)}
          style={{
            justifyContent: isPositionedRight ? 'flex-end' : 'flex-start'
          }}
        >
          <span
            className={composeCssClasses(
              'hero-slider-side-nav-button-line',
              SideNavModuleCss.Line
            )}
          />
          <span
            className={composeCssClasses(
              'hero-slider-side-nav-button-number',
              SideNavModuleCss.Number
            )}
          >
            {number.toLocaleString()}
          </span>
        </li>
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
        'hero-slider-side-nav-wrapper',
        SideNavModuleCss.Wrapper
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

(SideNav as React.FunctionComponent).displayName = 'hero-slider/nav';
