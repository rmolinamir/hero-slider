import IntervalTimer from '../../dependencies/IntervalTimer';
import {
  TAnyFunction,
  ISliderProps,
} from '../../typings/definitions';

/**
 * `ISliderContext` is the React Context interface definition.
 */
export interface ISliderContext extends IReducerState {
  isMobile: boolean | undefined;
  dispatchProps: React.Dispatch<IReducerAction> | undefined;
}

export enum EActionTypes {
  SET_SLIDE_PROPS,
  SET_NAVBAR_PROPS,
  SET_AUTOPLAY_BUTTON_PROPS,
  SET_SLIDE_DATA,
}

export interface IReducerState {
  slidesArray: ISlideDataPayload[];
  slideProps: ISlidePayload | undefined;
  navProps: INavPayload | undefined;
  autoplayButtonProps: IReducerAutoplayButtonPayload | undefined;
}

export type IReducerAction = (
  IReducerSlideAction |
  IReducerSetSlideNumbereAction |
  IReducerNavAction |
  IReducerAutoplayButtonAction
);

export interface IReducerSlideAction {
  type: EActionTypes.SET_SLIDE_PROPS;
  payload: ISlidePayload;
}

export interface ISlidePayload {
  activeSlide: number;
  isDoneSliding: boolean;
  slidingAnimation: string;
}

export interface IReducerSetSlideNumbereAction {
  type: EActionTypes.SET_SLIDE_DATA;
  payload: ISlideDataPayload;
}

export interface ISlideDataPayload {
  slideNumber: number;
  navDescription: string;
}

export interface IReducerNavAction {
  type: EActionTypes.SET_NAVBAR_PROPS;
  payload: INavPayload;
}

export interface INavPayload {
  changeSlide: TAnyFunction;
  activeSlide: number;
  totalSlides: number;
  sliderWidth: number;
}

export interface IReducerAutoplayButtonAction {
  type: EActionTypes.SET_AUTOPLAY_BUTTON_PROPS;
  payload: IReducerAutoplayButtonPayload;
}

export interface IReducerAutoplayButtonPayload {
  setIsManuallyPaused: React.Dispatch<React.SetStateAction<boolean>>;
  autoplayHandlerTimeout: NodeJS.Timeout | undefined;
  shouldAutoplay: boolean;
  autoplay: React.MutableRefObject<IntervalTimer>;
}

/**
 * `ISliderProps` is the Slider Context's Provider props interface definition.
 */
export interface ISliderProviderProps {
  isMobile: boolean;
  children: React.ReactElement[] | React.ReactElement;
}

/**
 * `IWithProviderProps` is the HOC Slider component.
 */
export interface IWithProviderProps extends ISliderProps, ISliderProviderProps {}
