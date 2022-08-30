import { NavPosition } from '../Nav/typings';

export enum EAutoplayButtons {
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
