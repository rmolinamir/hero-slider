import React from 'react';
import ButtonsNavModuleCss from './index.module.css';
import { Nav } from '../Nav';
import { MenuNavProps } from '../MenuNav';
import { useManager } from '../../modules/Manager';
import { useController } from '../../modules/Controller';
import { useLayout } from '../../modules/Layout';

/**
 * `ButtonsNav` component props.
 */
export interface ButtonsNavProps extends MenuNavProps {
  backgroundColor?: string;
  alignItems?: string;
}

export function ButtonsNav(props: ButtonsNavProps) {
  const {
    color,
    activeColor,
    backgroundColor,
    position,
    justifyContent,
    alignItems,
    mobileThreshold = 1024, // TODO: This magic variable should be centralized. Other components use the same threshold.
    isNullAfterThreshold = false,
    extraButton,
    isExtraButtonRight
  } = props;

  const {
    state: { width }
  } = useLayout();

  const {
    state: { slides, totalSlides }
  } = useManager();

  const {
    state: { activeSlide },
    changeSlide
  } = useController();

  /**
   * CSS variables for the transitions.
   */
  const CSSVariables = {
    '--nav-color': color,
    '--nav-background-color': backgroundColor,
    '--nav-active-color': activeColor
  };

  console.log(
    'Number(width) <= mobileThreshold: ',
    Number(width) <= mobileThreshold
  );

  if (Number(width) <= mobileThreshold) {
    if (isNullAfterThreshold) return null;
    return <Nav {...props} />;
  }

  function renderButtons() {
    if (!totalSlides) return [];

    const onClickHandler = (slideNumber: number) => {
      if (slideNumber !== activeSlide) changeSlide(slideNumber);
    };

    return Array.from(slides.values()).map(({ number, label }) => {
      const description = label;
      return (
        // TODO: Deal with the disabled linting later:
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li
          key={number}
          onClick={() => onClickHandler(number)}
          className={[
            ButtonsNavModuleCss.Button,
            activeSlide === number && ButtonsNavModuleCss.Active
          ].join(' ')}
        >
          <div className={ButtonsNavModuleCss.Description}>
            <div className={ButtonsNavModuleCss.Text}>{description}</div>
          </div>
        </li>
      );
    });
  }

  return (
    <div
      style={{
        bottom: !position ? '0' : undefined,
        left: !position ? '50%' : undefined,
        transform: !position ? 'translateX(-50%)' : undefined,
        ...position,
        ...CSSVariables
      }}
      className={ButtonsNavModuleCss.Wrapper}
    >
      <ul
        style={{
          justifyContent: justifyContent || 'center',
          /**
           * The **vertical alignment** of the buttons can be set manually.
           * If it's undefined and if there is a position top passed as prop,
           * then `alignItems` will be `flex-start`. Otherwise,
           * it is set as `flex-end`.
           */
          alignItems:
            alignItems ||
            (position && position.top !== undefined ? 'flex-start' : 'flex-end')
        }}
        className={ButtonsNavModuleCss.Container}
      >
        {renderButtons()}
        {extraButton && (
          <div
            style={{
              order: isExtraButtonRight ? 1 : 0
            }}
            className={ButtonsNavModuleCss.ExtraButton}
          >
            {extraButton}
          </div>
        )}
      </ul>
    </div>
  );
}

(ButtonsNav as React.FunctionComponent).displayName = 'hero-slider/buttons-nav';
