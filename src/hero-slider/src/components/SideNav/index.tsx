import React from 'react';
import SideNavModuleCss from './index.module.css';
import { NavProps } from '../Nav';
import { useController } from '../../modules/Controller';
import { useManager } from '../../modules/Manager';

/**
 * `SideNav` component props.
 */
export interface SideNavProps extends NavProps {
  right?: string;
  left?: string;
  isPositionedRight?: boolean;
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
          onClick={() => onClickHandler(number)}
          className={[
            SideNavModuleCss.Button,
            activeSlide === number && SideNavModuleCss.Active
          ].join(' ')}
          style={{
            justifyContent: isPositionedRight ? 'flex-end' : 'flex-start'
          }}
        >
          <span className={SideNavModuleCss.Line} />
          <span className={SideNavModuleCss.Number}>
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
      style={{
        ...position,
        ...CSSVariables
      }}
      className={SideNavModuleCss.Wrapper}
    >
      {renderButtons()}
    </ul>
  );
}

(SideNav as React.FunctionComponent).displayName = 'hero-slider/nav';
