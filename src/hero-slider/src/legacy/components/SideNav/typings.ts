import { NavProps } from '../Nav/typings';

/**
 * `SideNav` component props.
 */
export interface SideNavProps extends NavProps {
  right: string;
  left: string;
  isPositionedRight: boolean;
}
