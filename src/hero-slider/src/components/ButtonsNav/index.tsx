import React from 'react';
import ButtonsNavModuleCss from './index.module.css';
import { Nav } from '../Nav';
import { MenuNavProps } from '../MenuNav';
import { useManager } from '../../modules/Manager';
import { useController } from '../../modules/Controller';
import { useLayout } from '../../modules/Layout';
import { composeCssClasses } from '../../utils/composeCssClasses';

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
    position = {
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    justifyContent,
    alignItems,
    mobileThreshold: componentMobileThreshold,
    isNullAfterThreshold = false,
    extraButton,
    isExtraButtonRight
  } = props;

  const {
    state: { width },
    mobileThreshold
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

  if (Number(width) <= (componentMobileThreshold ?? mobileThreshold)) {
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
          className={composeCssClasses(
            'hero-slider-buttons-nav-button',
            ButtonsNavModuleCss.Button,
            {
              className: ButtonsNavModuleCss.Active,
              useIf: activeSlide === number
            }
          )}
          onClick={() => onClickHandler(number)}
        >
          <div
            className={composeCssClasses(
              'hero-slider-buttons-nav-button-description',
              ButtonsNavModuleCss.Description
            )}
          >
            <div
              className={composeCssClasses(
                'hero-slider-buttons-nav-button-text',
                ButtonsNavModuleCss.Text
              )}
            >
              {description}
            </div>
          </div>
        </li>
      );
    });
  }

  return (
    <div
      className={composeCssClasses(
        'hero-slider-buttons-nav-wrapper',
        ButtonsNavModuleCss.Wrapper
      )}
      style={{
        ...position,
        ...CSSVariables
      }}
    >
      <ul
        className={composeCssClasses(
          'hero-slider-buttons-nav-container',
          ButtonsNavModuleCss.Container
        )}
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
            (position.top !== undefined ? 'flex-start' : 'flex-end')
        }}
      >
        {renderButtons()}
        {extraButton && (
          <div
            className={composeCssClasses(
              'hero-slider-buttons-nav-extra-button',
              ButtonsNavModuleCss.ExtraButton
            )}
            style={{
              order: isExtraButtonRight ? 1 : 0
            }}
          >
            {extraButton}
          </div>
        )}
      </ul>
    </div>
  );
}

(ButtonsNav as React.FunctionComponent).displayName = 'hero-slider/buttons-nav';
