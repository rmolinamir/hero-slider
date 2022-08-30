import React from 'react';
import { SliderDimensions } from '../typings';

/**
 * Returns the slider reference object to calculate its dimensions.
 */
export default function useSliderDimensions(): [
  React.RefObject<HTMLDivElement>,
  SliderDimensions,
  React.Dispatch<React.SetStateAction<SliderDimensions>>
] {
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const [sliderDimensions, setSliderDimensions] =
    React.useState<SliderDimensions>({});

  /**
   * After mounting, akin to `componentDidMount`.
   */
  React.useEffect(() => {
    setSliderDimensions({
      width: sliderRef.current ? sliderRef.current.clientWidth : undefined,
      height: sliderRef.current ? sliderRef.current.clientHeight : undefined
    });

    window.addEventListener(
      'resize',
      setSliderDimensions as EventListenerOrEventListenerObject
    );
    /**
     * Clearing event listener to avoid memory leaks.
     */
    return () => {
      window.removeEventListener(
        'resize',
        setSliderDimensions as EventListenerOrEventListenerObject
      );
    };
  }, [sliderRef.current]);

  return [sliderRef, sliderDimensions, setSliderDimensions];
}
