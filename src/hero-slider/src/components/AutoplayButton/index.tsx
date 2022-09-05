import React from 'react';
import AutoplayButtonModuleCss from './index.module.css';
import { NavPosition } from '../Nav';
import { useAutoplay } from '../../modules/Autoplay';
import { IntervalState } from '../../modules/IntervalTimer';

enum ButtonType {
  PLAY = 'play',
  PAUSE = 'pause'
}

/**
 * `AutoplayButton` component props.
 */
export interface AutoplayButtonProps {
  className?: string;
  position?: NavPosition;
  style?: React.CSSProperties;
}

class AutoplaySvg {
  public static playPath =
    'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z' as const;

  public static pausePath =
    'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z' as const;

  public static getPath(buttonType: ButtonType): string {
    if (buttonType === ButtonType.PAUSE) return AutoplaySvg.pausePath;
    else return AutoplaySvg.playPath;
  }
}

export function AutoplayButton(props: AutoplayButtonProps) {
  const { className, style, position } = props;

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
      className={[AutoplayButtonModuleCss.Button, className].join(' ')}
      onClick={onClickHandler}
      style={{
        bottom: !position ? '0' : undefined,
        left: !position ? '0' : undefined,
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
