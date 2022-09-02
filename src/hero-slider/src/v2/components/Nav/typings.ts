import { TAnyFunction } from '../../../typings/definitions';

/**
 * `NavPosition` define a position object used to position the nav components
 * through inline CSS styles.
 */
export interface NavPosition {
  top: string;
  left: string;
  bottom: string;
  right: string;
  transform: string;
}

/**
 * `NavSettings` is the base definition of the nav components prop.
 */
export interface NavSettings {
  position?: NavPosition;
  color?: string;
  activeColor?: string;
}

/**
 * `Nav` component props.
 */
export interface NavProps extends NavSettings {
  totalSlides?: number;
  activeSlide?: number;
  changeSlide?: TAnyFunction;
}
