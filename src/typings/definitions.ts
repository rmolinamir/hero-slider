// Type definitions for HeroSlider (hero-slider)
// Project: https://github.com/rmolinamir/hero-slider
// Definitions by: rmolinamir <https://github.com/rmolinamir>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.3.3333

// CSS Types
import {
  BackdropFilterProperty,
  BackfaceVisibilityProperty,
  BackgroundProperty,
  BackgroundAttachmentProperty,
  BackgroundBlendModeProperty,
  BackgroundClipProperty,
  BackgroundColorProperty,
  BackgroundImageProperty,
  BackgroundOriginProperty,
  BackgroundPositionProperty,
  BackgroundPositionXProperty,
  BackgroundPositionYProperty,
  BackgroundRepeatProperty,
  BackgroundSizeProperty,
  WidthProperty,
  HeightProperty,
} from 'csstype';

import IntervalTimer from '../dependencies/IntervalTimer';

type TAnyFunction = (...anyArg: any[]) => any;

/**
 * `INavbarSettings` settings definition for all of the nav components.
 */
interface INavbarSettings {
  color: string;
  activeColor: string;
}

/**
 * `EAnimations` enum for the different sliding animations.
 */
enum EAnimations {
  TOP_TO_BOTTOM = 'top_to_bottom',
  BOTTOM_TO_TOP = 'bottom_to_top',
  LEFT_TO_RIGHT = 'left_to_right',
  RIGHT_TO_LEFT = 'right_to_left',
  FADE = 'fade',
}

// AutoplayButtons
import {
  EAutoplayButtons,
  IAutoplayButtonProps,
} from '../components/AutoplayButtons/typings';

// Buttons
import {
  IButtonProps,
} from '../components/Buttons/typings';

// ButtonsNav
import {
  IButtonsNavProps,
} from '../components/ButtonsNav/typings';

// Context
import {
  ISliderContext,
  EActionTypes,
  IReducerState,
  IReducerAction,
  IReducerSlideAction,
  ISlidePayload,
  IReducerSetSlideNumbereAction,
  ISlideDataPayload,
  IReducerNavAction,
  INavPayload,
  IReducerAutoplayButtonAction,
  IReducerAutoplayButtonPayload,
  ISliderProviderProps,
  IWithProviderProps,
} from '../components/Context/typings';

// MenuNav
import {
  IMenuNavProps,
} from '../components/MenuNav/typings';

// Nav
import {
  INavPosition,
  INavSettings,
  INavProps,
} from '../components/Nav/typings';

// SideNav
import {
  ISideNavProps,
} from '../components/SideNav/typings';

// Slide
import {
  ISlideProps,
} from '../components/Slide/typings';

// Background
import {
  EBackgroundAnimations,
  IBackgroundProps,
} from '../components/Slide/Background/typings';

// Mask
import {
  IMaskProps,
} from '../components/Slide/Mask/typings';

// Slider
import {
  ISliderProps,
} from '../components/Slider/typings';

// Exports
export {
  IntervalTimer,
  TAnyFunction,
  BackdropFilterProperty,
  BackfaceVisibilityProperty,
  BackgroundProperty,
  BackgroundAttachmentProperty,
  BackgroundBlendModeProperty,
  BackgroundClipProperty,
  BackgroundColorProperty,
  BackgroundImageProperty,
  BackgroundOriginProperty,
  BackgroundPositionProperty,
  BackgroundPositionXProperty,
  BackgroundPositionYProperty,
  BackgroundRepeatProperty,
  BackgroundSizeProperty,
  WidthProperty,
  HeightProperty,
  // General
  INavbarSettings,
  EAnimations,
  // AutoplayButtons
  EAutoplayButtons,
  IAutoplayButtonProps,
  // Buttons
  IButtonProps,
  // ButtonsNav
  IButtonsNavProps,
  // Context
  ISliderContext,
  EActionTypes,
  IReducerState,
  IReducerAction,
  IReducerSlideAction,
  ISlidePayload,
  IReducerSetSlideNumbereAction,
  ISlideDataPayload,
  IReducerNavAction,
  INavPayload,
  IReducerAutoplayButtonAction,
  IReducerAutoplayButtonPayload,
  ISliderProviderProps,
  IWithProviderProps,
  // MenuNav
  IMenuNavProps,
  // Nav
  INavPosition,
  INavSettings,
  INavProps,
  // SideNav
  ISideNavProps,
  // Slide
  ISlideProps,
  // Background
  EBackgroundAnimations,
  IBackgroundProps,
  // Mask
  IMaskProps,
  // Slider
  ISliderProps,
};
