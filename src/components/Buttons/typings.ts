import {
  TAnyFunction,
} from '../../typings/definitions';

export interface IButtonProps {
  isHorizontal: boolean;
  previousSlide: TAnyFunction;
  nextSlide: TAnyFunction;
}
