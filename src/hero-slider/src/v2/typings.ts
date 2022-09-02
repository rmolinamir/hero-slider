import type CSS from 'csstype';
import { NavbarSettings, TAnyFunction } from './typings/definitions';

/**
 * `Settings` is used for a `settings` object variable
 * inside `HeroSlider`, this extends to `SettingsProps`.
 * These properties are set inside the slider and are not
 * part of the received props.
 */
// TODO: Rename to SliderSettings
export interface Settings extends SettingsProps {
  initialSlidingAnimation: EAnimations; // [x]
  slidingAnimation: string; // [x]
  sliderOrientation: EOrientation; // [x]
}

/**
 * Type definition for `SliderProps.settings`.
 */
export interface SettingsProps {
  slidingDuration: number; // [x]
  slidingDelay: number; // [x]
  sliderColor: string; // [x]
  sliderFadeInDuration: number; // [x]
  navbarFadeInDuration: number; // [x]
  navbarFadeInDelay: number; // [x]
  isSmartSliding: boolean; // [x]
  shouldDisplayButtons: boolean; // [x]
  shouldAutoplay: boolean; // [x]
  shouldSlideOnArrowKeypress: boolean; // [x]
  autoplayDuration: number;
  autoplayHandlerTimeout: number;
  width: CSS.Properties['width']; // [x]
  height: CSS.Properties<string | number>['height']; // [x]
}

/**
 * `HeroSlider` props.
 */
export interface SliderProps {
  settings?: Partial<SettingsProps>;
  orientation?: `${EOrientation}`; // [x]
  slidingAnimation?: `${EAnimations}`;
  isSmartSliding?: boolean;
  initialSlide?: number; // [x]
  nextSlide?: React.MutableRefObject<any>; // [x]
  previousSlide?: React.MutableRefObject<any>; // [x]
  navbarSettings?: Partial<NavbarSettings>; // [x]
  style?: React.CSSProperties; // [x]
  onBeforeChange?: TAnyFunction; // [x]
  onChange?: TAnyFunction; // [x]
  onAfterChange?: TAnyFunction; // [x]
  inView?: boolean; // [x]
  children?: React.ReactNode; // [x]
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

/**
 * `EOrientation` definition used for the `SliderProps.orientation` prop.
 * Used to define which swipes (depending on directions) will change the slides,
 * and where and how will the buttons render, if set to render.
 */
export enum EOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

/**
 * `SliderDimensions` defines an object that holds the dimensions of the slider.
 * They update everytime the `resize` window event is fired.
 */
export interface SliderDimensions {
  width?: number;
  height?: number;
}

/**
 * `TouchState` defines the state object that handles touch evend on mobile devices.
 * Used to change slides after the user swipes respective to directions and senses.
 */
export interface TouchState {
  initialX?: number;
  initialY?: number;
  currentX?: number;
  currentY?: number;
  finalX?: number;
  finalY?: number;
}
