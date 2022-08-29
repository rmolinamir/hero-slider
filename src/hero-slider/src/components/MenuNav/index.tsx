import React from 'react';
import { IMenuNavProps } from './typings';
import { SliderContext } from '../Context';
import MenuNavModuleCss from './MenuNav.module.css';
import { Nav } from '../Nav';

const SliderNav = (props: IMenuNavProps) => {
  /**
   * Deconstructing MenuNavSettings to set it up.
   */
  const {
    color,
    activeColor,
    position,
    justifyContent,
    // navDescriptions,
    sliderWidth = window.innerWidth,
    mobileThreshold = 1024,
    isNullAfterThreshold,
    extraButton,
    isExtraButtonRight = true
  } = props;

  const { navProps, slidesArray } = React.useContext(SliderContext);

  const MenuNavButtons = React.useMemo(() => {
    if (!navProps || !slidesArray.length) return [];
    const { changeSlide, activeSlide } = navProps;
    const changeSlideHandler = (MenuNavButtonIndex: number) => {
      const nextSlide = MenuNavButtonIndex + 1;
      if (nextSlide !== activeSlide) {
        changeSlide(nextSlide);
      }
    };
    return slidesArray.map(({ navDescription }, index) => {
      const description = navDescription;
      const respectiveSlide = index + 1;
      return (
        // TODO: Deal with the disabled linting later:
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li
          onClick={() => changeSlideHandler(index)}
          key={index}
          className={[
            MenuNavModuleCss.Button,
            activeSlide === respectiveSlide && MenuNavModuleCss.Active
          ].join(' ')}
        >
          <div className={MenuNavModuleCss.Description}>
            <div className={MenuNavModuleCss.Number}>
              {respectiveSlide}
              <span className={MenuNavModuleCss.Square} />
            </div>
            <div className={MenuNavModuleCss.Text}>{description}</div>
          </div>
        </li>
      );
    });
  }, [navProps, slidesArray]);

  if (sliderWidth <= mobileThreshold) {
    if (isNullAfterThreshold) return null;
    return <Nav {...props} />;
  }

  if (!navProps) return null;

  const { activeSlide, totalSlides } = navProps;

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
        top: position.top,
        right: position.right,
        bottom: position.bottom || '0',
        left: position.left || '50%',
        transform: position.transform || 'translateX(-50%)',
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
        {MenuNavButtons}
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
};

export const MenuNav = (props: IMenuNavProps): JSX.Element => (
  <SliderNav {...props} />
);

(MenuNav as React.FunctionComponent).displayName = 'hero-slider/menu-nav';
