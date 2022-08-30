import { TAnyFunction } from '../../typings/definitions';
import { BackgroundProps } from './Background/typings';

/**
 * `Slide` component props.
 */
export interface SlideProps {
  shouldRenderMask?: boolean;
  background?: Partial<BackgroundProps>;
  navDescription?: string;
  style?: React.CSSProperties;
  onBackgroundLoad?: TAnyFunction;
  children?: React.ReactNode;
}
