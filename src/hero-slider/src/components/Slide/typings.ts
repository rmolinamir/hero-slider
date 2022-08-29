import { TAnyFunction } from '../../typings/definitions';
import { IBackgroundProps } from './Background/typings';

/**
 * `Slide` component props.
 */
export interface ISlideProps {
  shouldRenderMask: boolean;
  background: IBackgroundProps;
  navDescription: string;
  style: React.CSSProperties;
  onBackgroundLoad: TAnyFunction;
  children: React.ReactNode;
}
