import { TAnyFunction } from '../../../typings/definitions';

export interface ButtonProps {
  isHorizontal: boolean;
  previousSlide: TAnyFunction;
  nextSlide: TAnyFunction;
}
