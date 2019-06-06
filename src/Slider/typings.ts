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
  HeightProperty
} from 'csstype'

import IntervalTimer from '../IntervalTimer'

export type TAnyFunction = (...anyArg: any[]) => any

/**
 * `INavPosition` define a position object used to position the nav components
 * through inline CSS styles.
 */
export interface INavPosition {
  top: string
  left: string
  bottom: string
  right: string
  transform: string
}

/**
 * `INavSettings` is the base definition of the nav components prop.
 */
export interface INavSettings {
  position: INavPosition
  color: string
  activeColor: string
}

/**
 * `Nav` component props.
 */
export interface INavProps extends INavSettings {
  totalSlides: number
  activeSlide: number
  changeSlide: TAnyFunction
}

/**
 * `SideNav` component props.
 */
export interface ISideNavProps extends INavProps {
  right: string
  left: string
  isPositionedRight: boolean
}

/**
 * `MenuNav` component props.
 */
export interface IMenuNavProps extends INavProps {
  navDescriptions: string[]
  justifyContent: string
  sliderWidth: number
  mobileThreshold: number
  isNullAfterThreshold: boolean
  extraButton: React.ReactElement | React.Component
  isExtraButtonRight: boolean
}

/**
 * `ButtonsNav` component props.
 */
export interface IButtonsNavProps extends IMenuNavProps {
  backgroundColor: string
  alignItems: string
}

export enum EAutoplayButtons {
  PLAY = 'play',
  PAUSE = 'pause'
}

/**
 * `AutoplayButton` component props.
 */
export interface IAutoplayButtonProps {
  className?: string
  position?: INavPosition
  style?: React.CSSProperties
  autoplay: React.MutableRefObject<IntervalTimer>
  setIsManuallyPaused: React.Dispatch<React.SetStateAction<boolean>>
  autoplayHandlerTimeout: NodeJS.Timeout
}

/**
 * `Slide` component props.
 */
export interface ISlideProps {
  isActive: boolean
  isDoneSliding: boolean
  slidingAnimation: string
  shouldRenderMask: boolean
  background: IBackgroundProps
  navDescription: string
  style: React.CSSProperties
  onBackgroundLoad: TAnyFunction
  children: React.ReactChildren
}

/**
 * Type definition for `IBackgroundProps.backgroundAnimation`.
 */
export enum EBackgroundAnimations {
  FADE = 'fade',
  ZOOM = 'zoom'
}

/**
 * `IBackgroundProps` interface for the `Background` JSX component's props used inside the `Slide` components.
 * The `Slide` components `background` prop is also defined by `IBackgroundProps`.
 */
export interface IBackgroundProps {
  shouldLazyLoad?: boolean,
  lazyLoadingOffset?: number,
  backdropFilter?: BackdropFilterProperty
  backfaceVisibility?: BackfaceVisibilityProperty
  background?: BackgroundProperty<string | number>
  backgroundAttachment?: BackgroundAttachmentProperty
  backgroundBlendMode?: BackgroundBlendModeProperty
  backgroundClip?: BackgroundClipProperty
  backgroundColor?: BackgroundColorProperty
  backgroundImage?: BackgroundImageProperty
  backgroundOrigin?: BackgroundOriginProperty
  backgroundPosition?: BackgroundPositionProperty<string | number>
  backgroundPositionX?: BackgroundPositionXProperty<string | number>
  backgroundPositionY?: BackgroundPositionYProperty<string | number>
  backgroundRepeat?: BackgroundRepeatProperty
  backgroundSize?: BackgroundSizeProperty<string | number>
  backgroundAnimationDuration?: number
  backgroundAnimationDelay?: number
  backgroundAnimation?: EBackgroundAnimations
  maskBackgroundBlendMode?: BackgroundBlendModeProperty
  width?: WidthProperty<string | number>
  height?: HeightProperty<string | number>
  alt?: string
  src: string | undefined
  onLoad: TAnyFunction
}

/**
 * `ISliderDimensions` defines an object that holds the dimensions of the slider.
 * They update everytime the `resize` window event is fired.
 */
export interface ISliderDimensions {
  width?: number
  height?: number
}

/**
 * `INavbarSettings` settings definition for all of the nav components.
 */
export interface INavbarSettings {
  color: string
  activeColor: string
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
 * `EOrientation` definition used for the `ISliderProps.orientation` prop.
 * Used to define which swipes (depending on directions) will change the slides,
 * and where and how will the buttons render, if set to render.
 */
export enum EOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

/**
 * `ISettings` is used for a `settings` object variable inside `HeroSlider`, this extends to `ISettingsProps`.
 * These properties are set inside the slider and are not part of the received props.
 */
export interface ISettings extends ISettingsProps {
  initialSlidingAnimation: EAnimations
  slidingAnimation: string
  sliderOrientation: EOrientation
}

/**
 * Type definition for `ISliderProps.settings`.
 */
export interface ISettingsProps {
  slidingDuration: number
  slidingDelay: number
  sliderColor: string
  sliderFadeInDuration: number
  navbarFadeInDuration: number
  navbarFadeInDelay: number
  isSmartSliding: boolean
  shouldDisplayButtons: boolean
  shouldAutoplay: boolean
  shouldSlideOnArrowKeypress: boolean,
  autoplayDuration: number
  autoplayHandlerTimeout: number,
  width: WidthProperty<string | number>,
  height: HeightProperty<string | number>
}

/**
 * `HeroSlider` props.
 */
export interface ISliderProps {
  settings?: ISettingsProps
  orientation?: EOrientation
  slidingAnimation?: EAnimations
  isSmartSliding?: boolean
  initialSlide?: number
  nextSlide?: React.MutableRefObject<any>
  previousSlide?: React.MutableRefObject<any>
  navbarSettings?: INavbarSettings
  style?: React.CSSProperties
  onBeforeChange?: TAnyFunction
  onChange?: TAnyFunction
  onAfterChange?: TAnyFunction
  children: React.ReactElement[] | React.ReactElement
}

/**
 * The `React.Children` are filtered inside the `HeroSlider`. This interface defined the object structure of said filtering.
 */
export interface IChildren {
  slidesArray: React.ReactElement[]
  navbarsArray: React.ReactElement[]
  autoplayButtonsArray: React.ReactElement[]
  othersArray: React.ReactElement[]
  navDescriptions: string[]
}

/**
 * `ITouchState` defines the state object that handles touch evend on mobile devices.
 * Used to change slides after the user swipes respective to directions and senses.
 */
export interface ITouchState {
  initialX?: number
  initialY?: number
  currentX?: number
  currentY?: number
  finalX?: number
  finalY?: number
}
