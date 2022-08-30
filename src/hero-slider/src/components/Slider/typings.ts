import type * as CSS from 'csstype';
import { NavbarSettings, TAnyFunction } from '../../typings/definitions';

/**
 * `Settings` is used for a `settings` object variable
 * inside `HeroSlider`, this extends to `SettingsProps`.
 * These properties are set inside the slider and are not
 * part of the received props.
 */
// TODO: Rename to SliderSettings
export interface Settings extends SettingsProps {
  initialSlidingAnimation: EAnimations;
  slidingAnimation: string;
  sliderOrientation: EOrientation;
}

/**
 * Type definition for `SliderProps.settings`.
 */
export interface SettingsProps {
  slidingDuration: number;
  slidingDelay: number;
  sliderColor: string;
  sliderFadeInDuration: number;
  navbarFadeInDuration: number;
  navbarFadeInDelay: number;
  isSmartSliding: boolean;
  shouldDisplayButtons: boolean;
  shouldAutoplay: boolean;
  shouldSlideOnArrowKeypress: boolean;
  autoplayDuration: number;
  autoplayHandlerTimeout: number;
  width: CSS.Properties['width'];
  height: CSS.Properties<string | number>['height'];
}

/**
 * `HeroSlider` props.
 */
export interface SliderProps {
  settings?: Partial<SettingsProps>;
  orientation?: `${EOrientation}`;
  slidingAnimation?: `${EAnimations}`;
  isSmartSliding?: boolean;
  initialSlide?: number;
  nextSlide?: React.MutableRefObject<any>;
  previousSlide?: React.MutableRefObject<any>;
  navbarSettings?: Partial<NavbarSettings>;
  style?: React.CSSProperties;
  onBeforeChange?: TAnyFunction;
  onChange?: TAnyFunction;
  onAfterChange?: TAnyFunction;
  inView?: boolean;
  children?: React.ReactNode;
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
