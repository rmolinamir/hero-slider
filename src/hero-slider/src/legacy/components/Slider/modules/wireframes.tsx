import type CSS from 'csstype';
import IntervalTimer from '../../../dependencies/IntervalTimer';
import { NavbarSettings } from '../../../typings/definitions';

/**
 * `SlidingAnimation` enum for the different sliding animations.
 */
export enum SlidingAnimation {
  TOP_TO_BOTTOM = 'top_to_bottom',
  BOTTOM_TO_TOP = 'bottom_to_top',
  LEFT_TO_RIGHT = 'left_to_right',
  RIGHT_TO_LEFT = 'right_to_left',
  FADE = 'fade'
}

/**
 * `AccessabilityOrientation` definition used for the `SliderProps.orientation` prop.
 * Used to define which swipes (depending on directions) will change the slides,
 * and where and how will the buttons render, if set to render.
 */
export enum AccessabilityOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

/**
 * `TouchMotion` defines the state object that handles touch event on mobile devices.
 * Used to change slides after the user swipes respective to directions and senses.
 */
export interface TouchMotion {
  initialX?: number;
  initialY?: number;
  currentX?: number;
  currentY?: number;
  finalX?: number;
  finalY?: number;
}

//
//
//
//
//
//

export interface SliderProps {
  // inView?: boolean; // TODO: Might be needed, unsure.
  children?: React.ReactNode;
}

export interface SliderState extends Required<Omit<SliderProps, 'children'>> {}

//
//
//
//
//
//

export interface ManagerProps {} // TODO: Get the current Context stuff in here, discard whatever isn't needed anymore.

export interface ManagerState extends Required<ManagerProps> {} // TODO: Get the current Context stuff in here, discard whatever isn't needed anymore.

//
//
//
//
//
//

export interface SettingsProps {
  shouldDisplayButtons?: boolean;
  shouldAutoplay?: boolean;
  shouldSlideOnArrowKeypress?: boolean;
  sliderColor?: string;
  style?: CSS.Properties;
  nextSlide?: React.MutableRefObject<any>;
  previousSlide?: React.MutableRefObject<any>;
  navbarSettings?: Partial<NavbarSettings>;
}

export interface SettingsState extends Required<SettingsProps> {}

//
//
//
//
//
//

export interface LayoutProps {
  width?: CSS.Properties['width'];
  height?: CSS.Properties['height'];
}

export interface Layout extends Required<LayoutProps> {
  slider: React.RefObject<HTMLDivElement>;
}

//
//
//
//
//
//

export interface ControllerProps {
  initialSlide?: number;
  slidingDuration?: number;
  slidingDelay?: number;
  onBeforeChange?(activeSlide: number, nextSlide: number): void;
  onChange?(activeSlide: number, prevSlide: number): void;
  onAfterChange?(activeSlide: number, prevSlide: number): void;
}

export interface ControllerState extends Required<ControllerProps> {
  activeSlide: number;
  prevActiveSlide: number;
  isSliding: boolean;
  slidingDirection: 'forward' | 'backward' | undefined;
}

//
//
//
//
//
//

export interface AccessabilityProps {
  shouldDisplayButtons?: boolean;
  shouldSlideOnArrowKeypress?: boolean;
  orientation?: `${AccessabilityOrientation}`;
}

export interface AccessabilityState extends Required<AccessabilityProps> {
  slidingAnimation: string;
  sliderOrientation: AccessabilityOrientation; // TODO: Redundant. Can probably be removed.
  orientation: AccessabilityOrientation;
  touchMotion: TouchMotion;
}

//
//
//
//
//
//

export interface AnimationProps {
  slidingAnimation?: `${SlidingAnimation}`;
  sliderFadeInDuration?: number;
  navbarFadeInDuration?: number;
  navbarFadeInDelay?: number;
  isSmartSliding?: boolean;
}

export interface AnimationState extends Required<AnimationProps> {
  slidingAnimation: SlidingAnimation;
  initialSlidingAnimation: SlidingAnimation; // TODO: Redundant. Can probably be removed.
}

//
//
//
//
//
//

export interface AutoplayProps {
  autoplayDuration?: number;
  autoplayHandlerTimeout?: number; // TODO: Rename to autoplayDebounce.
}

export interface AutoplayState extends Required<AutoplayProps> {
  autoplayTimer: IntervalTimer;
  /**
   * `slidingTimeoutDuration` is the total time it takes for
   * the transition of each slide. It's the sum of the duration
   * of the slide, plus the sliding delay of the animation. A safety
   * factor of 1.1 is also used.
   *
   * e.g.:
   *
   * `(slidingDuration + slidingDelay) * 1.1`
   */
  slidingTimeoutDuration: number;
}

//
//
//
//
//
//

export interface IntersectionObserverProps {
  inView?: boolean;
}

export interface IntersectionObserverState
  extends Required<IntersectionObserverProps> {
  inViewTimeoutHandler: NodeJS.Timeout; // TODO: Change to resumeAutoplayInViewTimeout
}
