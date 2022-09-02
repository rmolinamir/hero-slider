import { BackgroundProps } from '../Background/typings';

export interface MaskProps {
  isActive?: boolean;
  isDoneSliding?: boolean;
  background?: Partial<BackgroundProps>;
}
