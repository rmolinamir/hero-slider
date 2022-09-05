import React from 'react';
import { useController } from './Controller';

/**
 * `AccessabilityOrientation` definition used for the `SliderProps.orientation` prop.
 * Used to define which swipes (depending on directions) will change the slides,
 * and where and how will the buttons render, if set to render.
 */
export enum AccessabilityOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export interface AccessabilityProps {
  shouldDisplayButtons?: boolean;
  shouldSlideOnArrowKeypress?: boolean;
  orientation?: `${AccessabilityOrientation}`;
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
  accessability?: AccessabilityProps;
}>;

const defaultProps: Required<AccessabilityProps> = {
  shouldDisplayButtons: true,
  shouldSlideOnArrowKeypress: true,
  orientation: AccessabilityOrientation.HORIZONTAL,
  thresholdToSlide: 50
};

const AccessabilityStateContext = React.createContext<
  | {
      state: State;
      shouldDisplayButtons: boolean;
      orientation: AccessabilityOrientation;
      onTouchStartHandler: (event: React.TouchEvent<HTMLDivElement>) => void;
      onTouchMoveHandler: (event: React.TouchEvent<HTMLDivElement>) => void;
      onTouchEndHandler: () => void;
    }
  | undefined
>(undefined);

function accessabilityReducer(state: State, action: Action): State {
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

function AccessabilityProvider({ children, accessability }: ProviderProps) {
  const params: Required<AccessabilityProps> = {
    shouldDisplayButtons:
      accessability?.shouldDisplayButtons ?? defaultProps.shouldDisplayButtons,
    shouldSlideOnArrowKeypress:
      accessability?.shouldSlideOnArrowKeypress ??
      defaultProps.shouldSlideOnArrowKeypress,
    orientation: accessability?.orientation || defaultProps.orientation,
    thresholdToSlide:
      accessability?.thresholdToSlide ?? defaultProps.thresholdToSlide
  };

  const [state, dispatch] = React.useReducer(accessabilityReducer, {
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
      params.orientation === AccessabilityOrientation.HORIZONTAL;
    const isSliderVertically: boolean =
      params.orientation === AccessabilityOrientation.VERTICAL;

    if (
      isSlidingHorizontally &&
      isSliderSetHorizontally &&
      Math.abs(diffX) >= params.thresholdToSlide
    ) {
      const isSwipingRight = diffX > 0;
      if (isSwipingRight) goToNextSlide();
      else goToPreviousSlide();
    } else if (
      isSliderVertically &&
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

    const isHorizontal =
      params.orientation === AccessabilityOrientation.HORIZONTAL;

    switch (true) {
      // Left keypress.
      case isHorizontal && e.keyCode === 37:
        goToPreviousSlide();
        break;
      // Right keypress.
      case isHorizontal && e.keyCode === 39:
        goToNextSlide();
        break;
      // Up keypress.
      case !isHorizontal && e.keyCode === 38:
        goToPreviousSlide();
        break;
      // Down keypress.
      case !isHorizontal && e.keyCode === 40:
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
    orientation: params.orientation as AccessabilityOrientation,
    onTouchStartHandler,
    onTouchMoveHandler,
    onTouchEndHandler
  };

  return (
    <AccessabilityStateContext.Provider value={value}>
      {children}
    </AccessabilityStateContext.Provider>
  );
}

function useAccessability() {
  const context = React.useContext(AccessabilityStateContext);

  if (context === undefined) {
    throw new Error(
      'useAccessability must be used within a AccessabilityProvider'
    );
  }

  return context;
}

export { AccessabilityProvider, useAccessability };
