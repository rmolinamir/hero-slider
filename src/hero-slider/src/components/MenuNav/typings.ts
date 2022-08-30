import { NavProps } from '../Nav/typings';

/**
 * `MenuNav` component props.
 */
export interface MenuNavProps extends NavProps {
  navDescriptions: string[];
  justifyContent: string;
  sliderWidth: number;
  mobileThreshold: number;
  isNullAfterThreshold: boolean;
  extraButton: React.ReactNode;
  isExtraButtonRight: boolean;
}
