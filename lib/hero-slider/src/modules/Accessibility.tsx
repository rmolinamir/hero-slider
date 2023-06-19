import React from 'react';

import { useController } from './Controller';

/**
 * `AccessibilityOrientation` definition used for the `SliderProps.orientation` prop.
 * Used to define which swipes (depending on directions) will change the slides,
 * and where and how will the buttons render, if set to render.
 */
export enum AccessibilityOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export interface AccessibilityProps {
  /**
   * Controls render of the next and previous buttons.
   * @default true
   */
  shouldDisplayButtons?: boolean;
  /**
   * When an arrow key is pressed, the active slide will change respectively to the pressed arrow.
   * The left and down arrows will set the previous slide, and the right and up arrows will set the next slide.
   * The left and right will only work if the slider is horizontal, and the up and down arrows will only work if the slider is vertical.
   * @default true
   */
  shouldSlideOnArrowKeypress?: boolean;
  /**
   * The slider orientation can either set to be `horizontal` or `vertical`.
   * The orientation sets the slide buttons respective to the orientation (e.g. if vertical, the buttons will be at the top and at the bottom).
   * Swipe (touch) gestures in mobile devices to change slides will also be configured automatically depending on the orientation (e.g. if horizontal, swiping vertically won't change slides).
   * @default 'horizontal'
   */
  orientation?: `${AccessibilityOrientation}`;
  /**
   * Pixel threshold for the Slider to register a swiping command to change slides.
   * @default 50
   */
  thresholdToSlide?: number;
}

type Action =
  | {
      type: 'start-motion';
      payload: { x: number; y: number };
    }
  | {
      type: 'update-motion';
      payload: { x: number; y: number };
    }
  | { type: 'end-motion' };
type State = {
  initialX: number | undefined;
  initialY: number | undefined;
  currentX: number | undefined;
  currentY: number | undefined;
};
type ProviderProps = React.PropsWithChildren<{
  accessibility?: AccessibilityProps;
}>;

const defaultProps: Required<AccessibilityProps> = {
  shouldDisplayButtons: true,
  shouldSlideOnArrowKeypress: true,
  orientation: AccessibilityOrientation.HORIZONTAL,
  thresholdToSlide: 50
};

const AccessibilityStateContext = React.createContext<
  | {
      state: State;
      shouldDisplayButtons: boolean;
      orientation: AccessibilityOrientation;
      onTouchStartHandler: (event: React.TouchEvent<HTMLDivElement>) => void;
      onTouchMoveHandler: (event: React.TouchEvent<HTMLDivElement>) => void;
      onTouchEndHandler: () => void;
    }
  | undefined
>(undefined);

function accessibilityReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start-motion': {
      return {
        initialX: action.payload.x,
        initialY: action.payload.y,
        currentX: undefined,
        currentY: undefined
      };
    }
    case 'update-motion': {
      return {
        initialX: state.initialX,
        initialY: state.initialY,
        currentX: action.payload.x,
        currentY: action.payload.y
      };
    }
    case 'end-motion': {
      return {
        initialX: undefined,
        initialY: undefined,
        currentX: undefined,
        currentY: undefined
      };
    }
    default: {
      throw new Error(`Unhandled action: [${JSON.stringify(action, null, 2)}]`);
    }
  }
}

function AccessibilityProvider({ children, accessibility }: ProviderProps) {
  const params: Required<AccessibilityProps> = {
    shouldDisplayButtons:
      accessibility?.shouldDisplayButtons ?? defaultProps.shouldDisplayButtons,
    shouldSlideOnArrowKeypress:
      accessibility?.shouldSlideOnArrowKeypress ??
      defaultProps.shouldSlideOnArrowKeypress,
    orientation: accessibility?.orientation || defaultProps.orientation,
    thresholdToSlide:
      accessibility?.thresholdToSlide ?? defaultProps.thresholdToSlide
  };

  const [state, dispatch] = React.useReducer(accessibilityReducer, {
    initialX: undefined,
    initialY: undefined,
    currentX: undefined,
    currentY: undefined
  } as State);

  const { goToNextSlide, goToPreviousSlide } = useController();

  /**
   * Sets the initial coordinates of the touch event.
   */
  const onTouchStartHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    dispatch({
      type: 'start-motion',
      payload: {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
    });
  };

  /**
   * Sets the current coordinates of the touch event to the state.
   */
  const onTouchMoveHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    dispatch({
      type: 'update-motion',
      payload: {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
    });
  };

  /**
   * Determines in which direction **and** sense (vector) the user is swiping.
   * Animations are then set accordingly depending on which direction the user is dragging and the slide is changed.
   * Finally the touch state is set back to the initial state, where everything is undefined.
   */
  const onTouchEndHandler = () => {
    const diffX = Number(state.initialX) - Number(state.currentX);
    const diffY = Number(state.initialY) - Number(state.currentY);

    const isSlidingHorizontally: boolean = Math.abs(diffX) > Math.abs(diffY);
    const isSliderSetHorizontally: boolean =
      params.orientation === AccessibilityOrientation.HORIZONTAL;
    const isSliderSetVertically: boolean =
      params.orientation === AccessibilityOrientation.VERTICAL;

    if (
      isSlidingHorizontally &&
      isSliderSetHorizontally &&
      Math.abs(diffX) >= params.thresholdToSlide
    ) {
      const isSwipingRight = diffX > 0;
      if (isSwipingRight) goToNextSlide();
      else goToPreviousSlide();
    } else if (
      !isSlidingHorizontally &&
      isSliderSetVertically &&
      Math.abs(diffY) >= params.thresholdToSlide
    ) {
      const isSwipingUp = diffY > 0;
      if (isSwipingUp) goToNextSlide();
      else goToPreviousSlide();
    }

    dispatch({ type: 'end-motion' });
  };

  const onArrowKeypressHandler = (e: KeyboardEvent): void => {
    if (!params.shouldSlideOnArrowKeypress) return;

    const code = e.key || e.code || e.keyCode;

    const isHorizontal =
      params.orientation === AccessibilityOrientation.HORIZONTAL;

    switch (true) {
      // Left keypress.
      case isHorizontal && (code === 'ArrowLeft' || code === 37):
        goToPreviousSlide();
        break;
      // Right keypress.
      case isHorizontal && (code === 'ArrowRight' || code === 39):
        goToNextSlide();
        break;
      // Up keypress.
      case !isHorizontal && (code === 'ArrowUp' || code === 38):
        goToPreviousSlide();
        break;
      // Down keypress.
      case !isHorizontal && (code === 'ArrowDown' || code === 40):
        goToNextSlide();
        break;
      default: // Do nothing.
    }
  };

  /**
   * After mounting, similar to `componentDidMount`, setup the window event listeners for keydowns. The event handlers will be changing the slides if enabled to do so.
   */
  React.useEffect(() => {
    window.addEventListener('keydown', onArrowKeypressHandler);
    /**
     * Clearing any existing timeouts to avoid memory leaks, and clear event listener.
     */
    return () => {
      window.removeEventListener('keydown', onArrowKeypressHandler);
    };
  }, [onArrowKeypressHandler]);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {
    state,
    shouldDisplayButtons: params.shouldDisplayButtons,
    orientation: params.orientation as AccessibilityOrientation,
    onTouchStartHandler,
    onTouchMoveHandler,
    onTouchEndHandler
  };

  return (
    <AccessibilityStateContext.Provider value={value}>
      {children}
    </AccessibilityStateContext.Provider>
  );
}

function useAccessibility() {
  const context = React.useContext(AccessibilityStateContext);

  if (context === undefined) {
    throw new Error(
      'useAccessibility must be used within a AccessibilityProvider'
    );
  }

  return context;
}

export { AccessibilityProvider, useAccessibility };
