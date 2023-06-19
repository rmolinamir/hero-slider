import React from 'react';

import { useAutoplay } from '../../modules/Autoplay';
import { IntervalState } from '../../modules/IntervalTimer';
import { composeCssClasses } from '../../utils/composeCssClasses';
import { NavPosition } from '../Nav';
import AutoplayButtonModuleCss from './index.module.css';

enum ButtonType {
  PLAY = 'play',
  PAUSE = 'pause'
}

/**
 * `AutoplayButton` component props.
 */
export interface AutoplayButtonProps {
  /**
   * CSS class name.
   */
  className?: React.HTMLAttributes<HTMLElement>['className'];
  /**
   * Object of CSS properties `top`, `left`, `bottom`, and `right` used to absolutely position elements.
   * Aside from the former, you can also set the CSS `transform` property to help you center the element.
   * @default
   * {
   *    bottom: '0',
   *    left: '0'
   * }
   */
  position?: NavPosition;
  /**
   * Inline CSS styling.
   */
  style?: React.CSSProperties;
}

class AutoplaySvg {
  private static readonly playPath =
    'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z';

  private static readonly pausePath =
    'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z';

  public static getPath(buttonType: ButtonType): string {
    if (buttonType === ButtonType.PAUSE) return AutoplaySvg.pausePath;
    else return AutoplaySvg.playPath;
  }
}

export function AutoplayButton(props: AutoplayButtonProps) {
  const {
    className,
    style,
    position = {
      bottom: '0',
      left: '0'
    }
  } = props;

  const {
    state: { isPausedByUser },
    autoplayState,
    resume,
    pause
  } = useAutoplay();

  const [buttonType, setButtonType] = React.useState<ButtonType>(
    autoplayState !== IntervalState.IDLE ? ButtonType.PAUSE : ButtonType.PLAY
  );

  const onClickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (isPausedByUser) resume();
    else pause();
  };

  React.useEffect(() => {
    if (isPausedByUser && autoplayState === IntervalState.IDLE)
      setButtonType(ButtonType.PLAY);
    else if (isPausedByUser && autoplayState === IntervalState.PAUSED)
      setButtonType(ButtonType.PLAY);
    else setButtonType(ButtonType.PAUSE);
  }, [isPausedByUser, autoplayState]);

  return (
    <button
      data-testid="hero-slider-autoplay-button"
      className={composeCssClasses(
        'hero-slider-autoplay-button',
        AutoplayButtonModuleCss.Button,
        className
      )}
      onClick={onClickHandler}
      style={{
        ...position,
        ...style
      }}
    >
      <svg fill="currentColor" height="100%" width="100%" viewBox="0 0 36 36">
        <path d={AutoplaySvg.getPath(buttonType)} />
      </svg>
    </button>
  );
}

(AutoplayButton as React.FunctionComponent).displayName =
  'hero-slider/autoplay-button';
