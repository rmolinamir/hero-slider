import {
  INavPosition,
} from '../../typings/definitions';

export enum EAutoplayButtons {
  PLAY = 'play',
  PAUSE = 'pause',
}

/**
 * `AutoplayButton` component props.
 */
export interface IAutoplayButtonProps {
  className?: string;
  position?: INavPosition;
  style?: React.CSSProperties;
}
