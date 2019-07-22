import {
  INavProps,
} from '../../typings/definitions';

/**
 * `SideNav` component props.
 */
export interface ISideNavProps extends INavProps {
  right: string;
  left: string;
  isPositionedRight: boolean;
}
