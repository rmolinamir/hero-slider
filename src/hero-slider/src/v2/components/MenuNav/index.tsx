import React from 'react';
import MenuNavModuleCss from './index.module.css';
import { Nav, NavProps } from '../Nav';
import { useLayout } from '../../modules/Layout';
import { useManager } from '../../modules/Manager';
import { useController } from '../../modules/Controller';

/**
 * `MenuNav` component props.
 */
export interface MenuNavProps extends NavProps {
  navDescriptions?: string[];
  justifyContent?: string;
  mobileThreshold?: number;
  /**
   * Determines if the nav should render `null` or a basic Nav component after the threshold is reached.
   * @default false
   */
  isNullAfterThreshold?: boolean;
  extraButton?: React.ReactNode;
  isExtraButtonRight?: boolean;
}

export function MenuNav(props: MenuNavProps) {
  const {
    color,
    activeColor,
    position,
    justifyContent,
    // labels,
    // sliderWidth = window.innerWidth,
    mobileThreshold = 1024,
    isNullAfterThreshold,
    extraButton,
    isExtraButtonRight = true
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

  if (Number(width) <= mobileThreshold) {
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
          onClick={() => onClickHandler(number)}
          className={[
            MenuNavModuleCss.Button,
            activeSlide === number && MenuNavModuleCss.Active
          ].join(' ')}
        >
          <div className={MenuNavModuleCss.Description}>
            <div className={MenuNavModuleCss.Number}>
              {number}
              <span className={MenuNavModuleCss.Square} />
            </div>
            <div className={MenuNavModuleCss.Text}>{description}</div>
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
      style={{
        top: position?.top,
        right: position?.right,
        bottom: position?.bottom || '0',
        left: position?.left || '50%',
        transform: position?.transform || 'translateX(-50%)',
        ...CSSVariables,
        justifyContent: justifyContent || 'center'
      }}
      className={MenuNavModuleCss.Wrapper}
    >
      {extraButton && (
        <div
          style={{
            order: isExtraButtonRight ? 1 : 0
          }}
          className={MenuNavModuleCss.Extra}
        >
          <span
            style={{
              borderLeft: isExtraButtonRight
                ? '1px solid var(--nav-color, rgba(215, 225, 235, 0.6))'
                : undefined,
              borderRight: !isExtraButtonRight
                ? '1px solid var(--nav-color, rgba(215, 225, 235, 0.6))'
                : undefined
            }}
            className={MenuNavModuleCss.ExtraButton}
          >
            {extraButton}
          </span>
        </div>
      )}
      <ul className={MenuNavModuleCss.Container}>
        {renderButtons()}
        <span
          style={{
            width: `${100 / totalSlides}%`,
            transform: `translate3d(${activeSlide - 1}00%, 0, 0)`
          }}
          className={MenuNavModuleCss.Bar}
        />
      </ul>
    </div>
  );
}

(MenuNav as React.FunctionComponent).displayName = 'hero-slider/menu-nav';
