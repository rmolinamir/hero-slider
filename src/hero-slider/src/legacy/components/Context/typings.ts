import IntervalTimer from '../../dependencies/IntervalTimer';
import { TAnyFunction } from '../../typings/definitions';
import { SliderProps } from '../Slider/typings';

/**
 * `SliderContext` is the React Context interface definition.
 */
export interface SliderContext extends ReducerState {
  isMobile: boolean | undefined;
  dispatchProps: React.Dispatch<ReducerAction> | undefined;
  generateNewSlideId: TAnyFunction;
  removeSlideId: TAnyFunction;
}

export enum EActionTypes {
  SET_SLIDE_PROPS,
  SET_NAVBAR_PROPS,
  SET_AUTOPLAY_BUTTON_PROPS,
  SET_SLIDE_DATA
}

export interface ReducerState {
  slidesArray: SlideDataPayload[];
  slideProps: SlidePayload | undefined;
  navProps: NavPayload | undefined;
  autoplayButtonProps: ReducerAutoplayButtonPayload | undefined;
}

export type ReducerAction =
  | ReducerSlideAction
  | ReducerSetSlideNumbereAction
  | ReducerNavAction
  | ReducerAutoplayButtonAction;

export interface ReducerSlideAction {
  type: EActionTypes.SET_SLIDE_PROPS;
  payload: SlidePayload;
}

export interface SlidePayload {
  activeSlide: number;
  isDoneSliding: boolean;
  slidingAnimation: string;
}

export interface ReducerSetSlideNumbereAction {
  type: EActionTypes.SET_SLIDE_DATA;
  payload: SlideDataPayload;
}

export interface SlideDataPayload {
  slideNumber: number;
  navDescription?: string;
}

export interface ReducerNavAction {
  type: EActionTypes.SET_NAVBAR_PROPS;
  payload: NavPayload;
}

export interface NavPayload {
  changeSlide: TAnyFunction;
  activeSlide: number;
  totalSlides: number;
  sliderWidth: number;
}

export interface ReducerAutoplayButtonAction {
  type: EActionTypes.SET_AUTOPLAY_BUTTON_PROPS;
  payload: ReducerAutoplayButtonPayload;
}

export interface ReducerAutoplayButtonPayload {
  setIsManuallyPaused: React.Dispatch<React.SetStateAction<boolean>>;
  autoplayHandlerTimeout: NodeJS.Timeout | undefined;
  shouldAutoplay: boolean;
  autoplay: React.MutableRefObject<IntervalTimer>;
}

/**
 * `SliderProps` is the Slider Context's Provider props interface definition.
 */
export interface SliderProviderProps {
  children?: React.ReactNode;
}

/**
 * `HeroSliderProps` is the HOC Slider component.
 */
export interface HeroSliderProps extends Omit<SliderProps, 'inView'> {}
