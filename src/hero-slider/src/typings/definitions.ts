export type TAnyFunction = (...anyArg: any[]) => any;

/**
 * `INavbarSettings` settings definition for all of the nav components.
 */
export interface INavbarSettings {
  color: string;
  activeColor: string;
}

/**
 * `EAnimations` enum for the different sliding animations.
 */
export enum EAnimations {
  TOP_TO_BOTTOM = 'top_to_bottom',
  BOTTOM_TO_TOP = 'bottom_to_top',
  LEFT_TO_RIGHT = 'left_to_right',
  RIGHT_TO_LEFT = 'right_to_left',
  FADE = 'fade'
}
