import React from 'react';
import { TouchState } from '../typings';

const initialTouchState: TouchState = {
  initialX: undefined,
  initialY: undefined,
  currentX: undefined,
  currentY: undefined,
  finalX: undefined,
  finalY: undefined
};

export default function useTouch(): {
  onTouchStart: React.TouchEventHandler;
  onTouchMove: React.TouchEventHandler;
  onTouchEnd: React.TouchEventHandler;
} {
  const [touchState, setTouchState] =
    React.useState<TouchState>(initialTouchState);

  /**
   * `onTouchStartHandler` sets the initial coordinates of the touch event.
   */
  const onTouchStartHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    const initialX = event.touches[0].clientX;
    const initialY = event.touches[0].clientY;
    setTouchState({
      ...touchState,
      initialX,
      initialY
    });
  };

  /**
   * `onTouchMoveHandler` sets the current coordinates of the touch event to the state.
   */
  const onTouchMoveHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    setTouchState({
      ...touchState,
      currentX,
      currentY
    });
  };

  /**
   * `onTouchEndHandler` determines in which direction **and** sense (vector) the user is sliding.
   * Animations are then set accordingly depending on which direction the user is dragging and
   * the slide is changed. Finally the touch state is set back to the initial state, where
   * everything is undefined.
   */
  const onTouchEndHandler = () => {
    const diffX: number =
      touchState && Number(touchState.initialX) - Number(touchState.currentX);
    const diffY: number =
      touchState && Number(touchState.initialY) - Number(touchState.currentY);
    const thresholdToSlide = 50;

    const isSlidingHorizontally: boolean = Math.abs(diffX) > Math.abs(diffY);
    const isSliderSetHorizontally: boolean =
      settings.sliderOrientation === EOrientation.HORIZONTAL;
    const isSliderVertically: boolean =
      settings.sliderOrientation === EOrientation.VERTICAL;

    if (
      isSlidingHorizontally &&
      isSliderSetHorizontally &&
      Math.abs(diffX) >= thresholdToSlide
    ) {
      // Sliding horizontally.
      if (diffX > 0) {
        // Swiped left.
        setNextSlide();
      } else {
        // Swiped right.
        setPreviousSlide();
      }
    } else if (isSliderVertically && Math.abs(diffY) >= thresholdToSlide) {
      // Sliding vertically.
      if (diffY > 0) {
        // Swiped up.
        setNextSlide();
      } else {
        // Swiped down.
        setPreviousSlide();
      }
    }
    setTouchState(initialTouchState);
  };
}
