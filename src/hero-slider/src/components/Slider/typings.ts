import {
  WidthProperty,
  HeightProperty,
  INavbarSettings,
  TAnyFunction,
} from '../../typings/definitions';

/**
 * `ISettings` is used for a `settings` object variable
 * inside `HeroSlider`, this extends to `ISettingsProps`.
 * These properties are set inside the slider and are not
 * part of the received props.
 */
export interface ISettings extends ISettingsProps {
  initialSlidingAnimation: EAnimations;
  slidingAnimation: string;
  sliderOrientation: EOrientation;
}

/**
 * Type definition for `ISliderProps.settings`.
 */
export interface ISettingsProps {
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
  width: WidthProperty<string | number>;
  height: HeightProperty<string | number>;
}

/**
 * `HeroSlider` props.
 */
export interface ISliderProps {
  settings?: ISettingsProps;
  orientation?: EOrientation;
  slidingAnimation?: EAnimations;
  isSmartSliding?: boolean;
  initialSlide?: number;
  nextSlide?: React.MutableRefObject<any>;
  previousSlide?: React.MutableRefObject<any>;
  navbarSettings?: INavbarSettings;
  style?: React.CSSProperties;
  onBeforeChange?: TAnyFunction;
  onChange?: TAnyFunction;
  onAfterChange?: TAnyFunction;
  inView: boolean;
  children: React.ReactElement[] | React.ReactElement;
}

/**
 * `EAnimations` enum for the different sliding animations.
 */
export enum EAnimations {
  TOP_TO_BOTTOM = 'top_to_bottom',
  BOTTOM_TO_TOP = 'bottom_to_top',
  LEFT_TO_RIGHT = 'left_to_right',
  RIGHT_TO_LEFT = 'right_to_left',
  FADE = 'fade',
}

/**
 * `ISettings` is used for a `settings` object variable
 * inside `HeroSlider`, this extends to `ISettingsProps`.
 * These properties are set inside the slider and are not
 * part of the received props.
 */
export interface ISettings extends ISettingsProps {
  initialSlidingAnimation: EAnimations;
  slidingAnimation: string;
  sliderOrientation: EOrientation;
}

/**
 * `HeroSlider` props.
 */
export interface ISliderProps {
  settings?: ISettingsProps;
  orientation?: EOrientation;
  slidingAnimation?: EAnimations;
  isSmartSliding?: boolean;
  initialSlide?: number;
  nextSlide?: React.MutableRefObject<any>;
  previousSlide?: React.MutableRefObject<any>;
  navbarSettings?: INavbarSettings;
  style?: React.CSSProperties;
  onBeforeChange?: TAnyFunction;
  onChange?: TAnyFunction;
  onAfterChange?: TAnyFunction;
  inView: boolean;
  children: React.ReactElement[] | React.ReactElement;
}

/**
 * `EOrientation` definition used for the `ISliderProps.orientation` prop.
 * Used to define which swipes (depending on directions) will change the slides,
 * and where and how will the buttons render, if set to render.
 */
export enum EOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

/**
 * `ISliderDimensions` defines an object that holds the dimensions of the slider.
 * They update everytime the `resize` window event is fired.
 */
export interface ISliderDimensions {
  width?: number;
  height?: number;
}

/**
 * `ITouchState` defines the state object that handles touch evend on mobile devices.
 * Used to change slides after the user swipes respective to directions and senses.
 */
export interface ITouchState {
  initialX?: number;
  initialY?: number;
  currentX?: number;
  currentY?: number;
  finalX?: number;
  finalY?: number;
}
