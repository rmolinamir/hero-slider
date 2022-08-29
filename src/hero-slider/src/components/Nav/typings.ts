import { TAnyFunction } from '../../typings/definitions';

/**
 * `INavPosition` define a position object used to position the nav components
 * through inline CSS styles.
 */
export interface INavPosition {
  top: string;
  left: string;
  bottom: string;
  right: string;
  transform: string;
}

/**
 * `INavSettings` is the base definition of the nav components prop.
 */
export interface INavSettings {
  position: INavPosition;
  color: string;
  activeColor: string;
}

/**
 * `Nav` component props.
 */
export interface INavProps extends INavSettings {
  totalSlides: number;
  activeSlide: number;
  changeSlide: TAnyFunction;
}
