import React from 'react';
import MenuNavModuleCss from './index.module.css';
import { Nav, NavProps } from '../Nav';
import { useLayout } from '../../modules/Layout';
import { useManager } from '../../modules/Manager';
import { useController } from '../../modules/Controller';
import { composeCssClasses } from '../../utils/composeCssClasses';

/**
 * `MenuNav` component props.
 */
export interface MenuNavProps extends NavProps {
  /**
   * Determines how the browser distributes space between and around nav items along the component.
   */
  justifyContent?: React.CSSProperties['justifyContent'];
  /**
   * Given the nature of this component, it doesn't work well with devices of relatively small width.
   * The mobile threshold is the point in which this component turns into a basic `Nav` component or `null`.
   */
  mobileThreshold?: number;
  /**
   * Determines if the nav should render `null` or a basic `Nav` component after the threshold is reached.
   * @default false
   */
  isNullAfterThreshold?: boolean;
  /**
   * An extra button rendered among the nav items in case the developer may want any extra functionality in the component.
   */
  extraButton?: React.ReactNode;
  /**
   * Renders the button to the right side of the nav if true, otherwise it will appear at the left side.
   * @default true
   */
  isExtraButtonRight?: boolean;
}

export function MenuNav(props: MenuNavProps) {
  const {
    color,
    activeColor,
    position = {
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    justifyContent = 'center',
    mobileThreshold: componentMobileThreshold,
    isNullAfterThreshold,
    extraButton,
    isExtraButtonRight = true
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

  if (Number(width) <= (componentMobileThreshold ?? mobileThreshold)) {
    if (isNullAfterThreshold) return null;
    return <Nav {...props} />;
  }

  function renderButtons() {
    if (!totalSlides) return [];

    const onClickHandler = (slideNumber: number) => {
      if (slideNumber !== activeSlide) changeSlide(slideNumber);
    };

    return Array.from(slides.values()).map(({ label, number }, index) => {
      const description = label;
      return (
        // TODO: Deal with the disabled linting later:
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li
          key={index}
          className={composeCssClasses(
            'hero-slider-menu-nav-button',
            MenuNavModuleCss.Button,
            {
              className: MenuNavModuleCss.Active,
              useIf: activeSlide === number
            }
          )}
          onClick={() => onClickHandler(number)}
        >
          <div
            className={composeCssClasses(
              'hero-slider-menu-nav-button-description',
              MenuNavModuleCss.Description
            )}
          >
            <div
              className={composeCssClasses(
                'hero-slider-menu-nav-button-number',
                MenuNavModuleCss.Number
              )}
            >
              {number}
              <span
                className={composeCssClasses(
                  'hero-slider-menu-nav-button-square',
                  MenuNavModuleCss.Square
                )}
              />
            </div>
            <div
              className={composeCssClasses(
                'hero-slider-menu-nav-button-text',
                MenuNavModuleCss.Text
              )}
            >
              {description}
            </div>
          </div>
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
    <div
      className={composeCssClasses(
        'hero-slider-menu-nav-wrapper',
        MenuNavModuleCss.Wrapper
      )}
      style={{
        ...position,
        ...CSSVariables,
        justifyContent
      }}
    >
      {extraButton && (
        <div
          className={composeCssClasses(
            'hero-slider-menu-nav-extra',
            MenuNavModuleCss.Extra
          )}
          style={{
            order: isExtraButtonRight ? 1 : 0
          }}
        >
          <span
            className={composeCssClasses(
              'hero-slider-menu-nav-extra-button',
              MenuNavModuleCss.ExtraButton
            )}
            style={{
              borderLeft: isExtraButtonRight
                ? '1px solid var(--nav-color, rgba(215, 225, 235, 0.6))'
                : undefined,
              borderRight: !isExtraButtonRight
                ? '1px solid var(--nav-color, rgba(215, 225, 235, 0.6))'
                : undefined
            }}
          >
            {extraButton}
          </span>
        </div>
      )}
      <ul
        className={composeCssClasses(
          'hero-slider-menu-nav-container',
          MenuNavModuleCss.Container
        )}
      >
        {renderButtons()}
        <span
          className={composeCssClasses(
            'hero-slider-menu-nav-bar',
            MenuNavModuleCss.Bar
          )}
          style={{
            width: `${100 / totalSlides}%`,
            transform: `translate3d(${activeSlide - 1}00%, 0, 0)`
          }}
        />
      </ul>
    </div>
  );
}

(MenuNav as React.FunctionComponent).displayName = 'hero-slider/menu-nav';
