import React from 'react';
import { useManager } from './Manager';

interface GetNextSlide {
  (aSlide?: number): number;
}

interface GetPreviousSlide {
  (aSlide?: number): number;
}

interface ChangeSlide {
  (nextSlide: number, slidingDirection?: 'forward' | 'backward'): void;
}

interface GoToNextSlide {
  (): void;
}

interface GoToPreviousSlide {
  (): void;
}

interface GetSlidingCycleDuration {
  (): number;
}

export interface ControllerProps {
  /**
   * Sliding duration, in milliseconds.
   * @default 500
   */
  slidingDuration?: number;
  /**
   * Sliding delay, in milliseconds.
   * @default 200
   */
  slidingDelay?: number;
  /**
   * The initial slide can also be set, but the slider starts at the first slide by default.
   * @default 1
   */
  initialSlide?: number;
  /**
   * Callback executed before sliding begins.
   * The previous and next slide numbers are received as arguments, since the sliding event can be delayed, this is useful to handle state changes from the outside (e.g. fire custom animations inside the active slide).
   * @param activeSlide
   * @param nextSlide
   * @default undefined
   */
  onBeforeSliding?(activeSlide: number, nextSlide: number): void;
  /**
   * Callback executed after the sliding ends similar to `onBeforeSliding`.
   * @param activeSlide
   * @param prevSlide
   * @default undefined
   */
  onSliding?(activeSlide: number, prevSlide: number): void;
  /**
   * Callback executed after the sliding ends similar to `onBeforeChange`.
   * @param activeSlide
   * @param prevSlide
   * @default undefined
   */
  onAfterSliding?(activeSlide: number, prevSlide: number): void;
  /**
   * Similar to pointers in C++, objects can work like pointers in JavaScript. React references are mutable objects that can be changed but will always point to an origin. If you declare an `object` and pass it as a reference, then the `current` property of the React reference `object` will be set to be equal to the `goToNextSlide` handler within the slider. This provides the developer with a way to change the slides "from the outside" of the bounds of the HeroSlider component.
   */
  goToNextSlidePointer?: React.MutableRefObject<GoToNextSlide | undefined>;
  /**
   * Similar to `nextSlide`, this sets the `object` to be equal to the `goToPreviousSlide` handler within the HeroSlider component.
   */
  goToPreviousSlidePointer?: React.MutableRefObject<
    GoToPreviousSlide | undefined
  >;
}

type Action =
  | {
      type: 'start-sliding';
      payload: {
        nextSlide: State['activeSlide'];
        slidingDirection?: Required<State['slidingDirection']>;
      };
    }
  | { type: 'finish-sliding' }
  | { type: 'set-delay-timeout'; payload: State['delayTimeout'] }
  | { type: 'set-sliding-timeout'; payload: State['slidingTimeout'] };
interface State {
  activeSlide: number;
  prevActiveSlide: number;
  isSliding: boolean;
  slidingDirection: 'forward' | 'backward' | undefined;
  delayTimeout?: NodeJS.Timeout;
  slidingTimeout?: NodeJS.Timeout;
}
type ProviderProps = React.PropsWithChildren<{ controller?: ControllerProps }>;

const defaultProps: Pick<
  Required<ControllerProps>,
  'slidingDuration' | 'slidingDelay' | 'initialSlide'
> = {
  slidingDuration: 500,
  slidingDelay: 200,
  initialSlide: 1
};

const ControllerStateContext = React.createContext<
  | {
      state: State;
      slidingDuration: number;
      slidingDelay: number;
      getNextSlide: GetNextSlide;
      getPreviousSlide: GetPreviousSlide;
      getSlidingCycleDuration: GetSlidingCycleDuration;
      changeSlide: ChangeSlide;
      goToNextSlide: GoToNextSlide;
      goToPreviousSlide: GoToPreviousSlide;
    }
  | undefined
  | undefined
>(undefined);

function settingsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start-sliding': {
      return {
        ...state,
        isSliding: true,
        activeSlide: action.payload.nextSlide,
        prevActiveSlide: state.activeSlide,
        slidingDirection: action.payload.slidingDirection
      };
    }
    case 'finish-sliding': {
      return {
        ...state,
        isSliding: false,
        slidingDirection: undefined
      };
    }
    case 'set-delay-timeout': {
      return {
        ...state,
        delayTimeout: action.payload
      };
    }
    case 'set-sliding-timeout': {
      return {
        ...state,
        slidingTimeout: action.payload
      };
    }
    default: {
      throw new Error(`Unhandled action: [${JSON.stringify(action, null, 2)}]`);
    }
  }
}

function ControllerProvider({ children, controller }: ProviderProps) {
  const params: Pick<
    Required<ControllerProps>,
    'slidingDuration' | 'slidingDelay' | 'initialSlide'
  > = {
    slidingDuration:
      controller?.slidingDuration ?? defaultProps.slidingDuration,
    slidingDelay: controller?.slidingDelay ?? defaultProps.slidingDelay,
    initialSlide: controller?.initialSlide || defaultProps.initialSlide
  };

  const [state, dispatch] = React.useReducer(settingsReducer, {
    activeSlide: params.initialSlide,
    prevActiveSlide: 0,
    isSliding: false,
    slidingDirection: undefined,
    delayTimeout: undefined,
    slidingTimeout: undefined
  } as State);

  const { state: manager } = useManager();

  /**
   * Returns the slide after the given slide (`activeSlide` by default) based on the total amount of slides.
   */
  const getNextSlide: GetNextSlide = (aSlide = state.activeSlide) => {
    const lastSlide = manager.totalSlides;

    const isNotLastSlide = aSlide <= lastSlide - 1;

    let nextSlide: number;
    if (isNotLastSlide) nextSlide = aSlide + 1;
    else nextSlide = 1;

    return nextSlide;
  };

  /**
   * Returns the previous slide similarly to `getNextSlide`.
   */
  const getPreviousSlide: GetPreviousSlide = (
    aSlide: number = state.activeSlide
  ) => {
    const lastSlide = manager.totalSlides;

    const isNotFirstSlide = aSlide > 1;

    let nextSlide: number;
    if (isNotFirstSlide) nextSlide = aSlide - 1;
    else nextSlide = lastSlide;

    return nextSlide;
  };

  /**
   * Returns the total time it takes for the transition of each slide. It's the sum of the duration of the slide, plus the sliding delay of the animation. A safety factor of 1.1 is also used.
   * e.g.: `(slidingDuration + slidingDelay) * 1.1`
   */
  const getSlidingCycleDuration: GetSlidingCycleDuration = () => {
    return (params.slidingDuration + params.slidingDelay) * 1.1; // 110% safety factor.
  };

  /**
   * `changeSlide` sets a new slide then executes `onSlidingHandler` to handle
   * the smooth transition and set `isDoneSlidingWatcher.current` (like a pointer)
   * as true. While `isDoneSliding` is true, no the slides won't change.
   * The `onBeforeSliding` event is executed here. This triggers a useEffect
   * that handles effects after the sliding is done.
   */
  const changeSlide = (
    nextSlide: number,
    slidingDirection?: 'forward' | 'backward'
  ): void => {
    if (state.isSliding) return;

    if (controller?.onBeforeSliding)
      controller.onBeforeSliding(state.activeSlide, nextSlide);

    dispatch({
      type: 'start-sliding',
      payload: {
        nextSlide,
        slidingDirection
      }
    });
  };

  /**
   * Changes the active slide to the next one.
   */
  const goToNextSlide: GoToNextSlide = () => {
    changeSlide(getNextSlide(state.activeSlide), 'forward');
  };

  /**
   * Changes the active slide to the previous one.
   */
  const goToPreviousSlide: GoToPreviousSlide = () => {
    changeSlide(getPreviousSlide(state.activeSlide), 'backward');
  };

  /**
   * Sets up the `goToNextSlide` pointer if it exists.
   */
  React.useEffect(() => {
    if (controller?.goToNextSlidePointer)
      controller.goToNextSlidePointer.current = goToNextSlide;
  }, [controller?.goToNextSlidePointer, goToNextSlide]);

  /**
   * Sets up the `previousSlide` reference object if they exist.
   */
  React.useEffect(() => {
    if (controller?.goToPreviousSlidePointer)
      controller.goToPreviousSlidePointer.current = goToPreviousSlide;
  }, [controller?.goToPreviousSlidePointer, goToNextSlide]);

  /**
   * Starts a `setTimeout` that will set `isSliding` as `false` after the time it takes for the slide to change passes.
   * Saves the timeout ID to `slidingTimeout`. The `onSliding` and `onAfterSliding` events are executed here.
   */
  React.useEffect(() => {
    dispatch({
      type: 'set-delay-timeout',
      payload: setTimeout(() => {
        if (controller?.onSliding)
          controller.onSliding(state.activeSlide, state.prevActiveSlide);
      }, params.slidingDelay)
    });

    dispatch({
      type: 'set-sliding-timeout',
      payload: setTimeout(() => {
        dispatch({ type: 'finish-sliding' });

        if (controller?.onAfterSliding)
          controller.onAfterSliding(state.activeSlide, state.prevActiveSlide);
      }, getSlidingCycleDuration())
    });

    /**
     * Clearing any existing timeouts to avoid memory leaks, and clear event listener.
     */
    return () => {
      if (state.delayTimeout) clearTimeout(state.delayTimeout);
      if (state.slidingTimeout) clearTimeout(state.slidingTimeout);
    };
  }, [state.activeSlide]);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {
    state,
    slidingDuration: params.slidingDuration,
    slidingDelay: params.slidingDelay,
    getNextSlide,
    getPreviousSlide,
    getSlidingCycleDuration,
    changeSlide,
    goToNextSlide,
    goToPreviousSlide
  };

  return (
    <ControllerStateContext.Provider value={value}>
      {children}
    </ControllerStateContext.Provider>
  );
}

function useController() {
  const context = React.useContext(ControllerStateContext);

  if (context === undefined) {
    throw new Error('useController must be used within a ControllerProvider');
  }

  return context;
}

export { ControllerProvider, useController };
