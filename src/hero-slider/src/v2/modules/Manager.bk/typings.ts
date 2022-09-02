import { TAnyFunction } from '../../typings/definitions';
import { SliderProps } from '../../typings';

export interface SlideDataPayload {
  slideNumber: number;
  navDescription?: string;
}

/**
 * `SliderContext` is the React Context interface definition.
 */
export interface SliderContext extends ReducerState {
  isMobile: boolean | undefined;
  dispatch: React.Dispatch<ReducerAction> | undefined;
  generateNewSlideId: TAnyFunction;
  removeSlideId: TAnyFunction;
}

export enum EActionTypes {
  SET_SLIDE_DATA
}

export interface ReducerState {
  slidesArray: SlideDataPayload[];
  // slideProps: SlidePayload | undefined;
  // navProps: NavPayload | undefined;
  // autoplayButtonProps: ReducerAutoplayButtonPayload | undefined;
}

export type ReducerAction =
  // | ReducerSlideAction
  ReducerSetSlideNumberAction;

export interface ReducerSetSlideNumberAction {
  type: EActionTypes.SET_SLIDE_DATA;
  payload: SlideDataPayload;
}

/**
 * `HeroSliderProps` is the HOC Slider component.
 */
export interface HeroSliderProps extends Omit<SliderProps, 'inView'> {}
