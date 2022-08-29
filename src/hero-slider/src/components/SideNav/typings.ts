import { INavProps } from '../Nav/typings';

/**
 * `SideNav` component props.
 */
export interface ISideNavProps extends INavProps {
  right: string;
  left: string;
  isPositionedRight: boolean;
}
