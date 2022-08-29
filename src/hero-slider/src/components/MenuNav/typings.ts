import { INavProps } from '../Nav/typings';

/**
 * `MenuNav` component props.
 */
export interface IMenuNavProps extends INavProps {
  navDescriptions: string[];
  justifyContent: string;
  sliderWidth: number;
  mobileThreshold: number;
  isNullAfterThreshold: boolean;
  extraButton: React.ReactNode;
  isExtraButtonRight: boolean;
}
