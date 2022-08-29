import {
  IBackgroundProps,
  TAnyFunction,
} from '../../typings/definitions';

/**
 * `Slide` component props.
 */
export interface ISlideProps {
  shouldRenderMask: boolean;
  background: IBackgroundProps;
  navDescription: string;
  style: React.CSSProperties;
  onBackgroundLoad: TAnyFunction;
  children: React.ReactChildren;
}
