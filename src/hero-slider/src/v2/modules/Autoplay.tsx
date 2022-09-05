import React from 'react';
import IntervalTimer, { IntervalState } from '../dependencies/IntervalTimer';
import { useController } from './Controller';
import { useIntersectionObserver } from './IntersectionObserver';

export interface AutoplayProps {
  /**
   * Autoplay duration, interval or duration betweens executions to change slides, in milliseconds.
   * Defaults to 8000.
   */
  autoplayDuration?: number;
  /**
   * Time (in milliseconds) in which the autoplay will be disabled if the user interacts with the slider. The autoplay resumes if the user stops interacting. Set as 0 to disable this feature.
   * Defaults to 4000.
   */
  autoplayDebounce?: number;
}

type Action =
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'set-debounce-timeout'; payload: NodeJS.Timeout };
interface State {
  isPausedByUser: boolean;
  debounceTimeout?: NodeJS.Timeout;
}
type ProviderProps = React.PropsWithChildren<{ autoplay?: AutoplayProps }>;

const defaultProps: Required<AutoplayProps> = {
  autoplayDuration: 8000,
  autoplayDebounce: 4000
};

const AutoplayStateContext = React.createContext<
  | {
      state: State;
      autoplayState: IntervalState;
      debounce: () => void;
      pause: () => void;
      resume: () => void;
    }
  | undefined
>(undefined);

function autoplayReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'pause': {
      return { ...state, isPausedByUser: true };
    }
    case 'resume': {
      return { ...state, isPausedByUser: false };
    }
    case 'set-debounce-timeout': {
      return { ...state, debounceTimeout: action.payload };
    }
    default: {
      throw new Error(`Unhandled action: [${JSON.stringify(action, null, 2)}]`);
    }
  }
}

function AutoplayProvider({ children, autoplay }: ProviderProps) {
  const params: Required<AutoplayProps> = {
    autoplayDuration:
      autoplay?.autoplayDuration || defaultProps.autoplayDuration,
    autoplayDebounce:
      autoplay?.autoplayDebounce || defaultProps.autoplayDebounce
  };

  const [state, dispatch] = React.useReducer(autoplayReducer, {
    isPausedByUser: false,
    debounceTimeout: undefined
  } as State);

  // const [debounceTimeout, setAutoplayDebounceTimeout] =
  //   React.useState<NodeJS.Timeout>();

  const {
    state: controller,
    changeSlide,
    getNextSlide,
    getSlidingCycleDuration
  } = useController();

  const autoplayInstance = IntervalTimer.new((): void => {
    changeSlide(getNextSlide(controller.activeSlide));
  }, getSlidingCycleDuration() + params.autoplayDuration); // TODO: Is the SlidingCycleDuration needed as part of the interval duration?

  const { isInView } = useIntersectionObserver();

  // // TODO: Might not be necessary
  // /**
  //  * Resets the intervals after the slide is over.
  //  */
  // React.useEffect(() => {
  //   console.log('isSliding', controller.isSliding);
  //   // if (!controller.isSliding && settings.shouldAutoplay && !state.isPausedByUser) {
  //   if (!controller.isSliding && autoplay && !state.isPausedByUser) {
  //     console.log('RESETTING');
  //     autoplayInstance.reset();
  //   }
  // }, [controller.isSliding, autoplayInstance, state.isPausedByUser]);

  /**
   * Debounces the autoplay interval whene called.
   */
  const debounce = (): void => {
    const isPausedOrIdle =
      autoplayInstance.state === IntervalState.IDLE || state.isPausedByUser;

    if (isPausedOrIdle) return; // If the slider has been paused, do nothing.

    autoplayInstance.pause();

    if (state.debounceTimeout) clearTimeout(state.debounceTimeout);

    dispatch({
      type: 'set-debounce-timeout',
      payload: setTimeout(autoplayInstance.resume, params.autoplayDebounce)
    });
  };

  /**
   * Pauses the autoplay.
   */
  const pause = (): void => {
    autoplayInstance.pause();
    dispatch({ type: 'pause' });
  };

  /**
   * Resumes the autoplay.
   */
  const resume = (): void => {
    autoplayInstance.resume();
    dispatch({ type: 'resume' });
  };

  /**
   * When the user pauses the slider, clear any debounced timeouts.
   */
  React.useEffect(() => {
    if (state.isPausedByUser) clearTimeout(state.debounceTimeout);
    return () => {};
  }, [state.isPausedByUser]);

  /**
   * Subscribe to changes in `inView`.
   * If the slider goes out of the viewport, then pause the slider autoplay instance if it's running.
   * If it comes back into viewport, resume the autoplay instance.
   */
  React.useLayoutEffect(() => {
    if (autoplay) {
      switch (true) {
        case state.isPausedByUser:
          break;
        // When not in view, stop the autoplay.
        case !isInView:
          console.log('STOPPPING');
          autoplayInstance.stop();
          break;
        // When in view and idle, start it.
        case isInView && autoplayInstance.state === IntervalState.IDLE: {
          console.log('STARTING');
          autoplayInstance.start();
          break;
        }
        // When in view and paused, resume it.
        case isInView && autoplayInstance.state === IntervalState.PAUSED: {
          console.log('RESUMING');
          autoplayInstance.resume();
          break;
        }
      }
    }
  }, [isInView]);

  /**
   * After mounting, similar to `componentDidMount`, start the autoplay.
   * TODO: Might not be necessary? I think `IntersectionObserver` will do this.
   */
  React.useEffect(() => {
    /**
     * Turn on autoplay if `props.shouldAutoplay` is true.
     * TODO: This seems to be in the IntersectionObserver module right now.
     */
    // if (settings.shouldAutoplay) {
    //   autoplayInstance.start();
    // }
    /**
    /**
     * Clearing any existing timeouts to avoid memory leaks, and clear event listener.
     */
    return () => {
      clearTimeout(state.debounceTimeout);
      autoplayInstance.stop();
    };
  }, []);

  /**
   * When the slide changes, clear any debounced timeouts, after the slide finishes, the
   * autoplay resets.
   */
  React.useEffect(() => {
    clearTimeout(state.debounceTimeout);
    return () => {};
  }, [controller.activeSlide]);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {
    state,
    autoplayState: autoplayInstance.state,
    debounce,
    pause,
    resume
  };

  return (
    <AutoplayStateContext.Provider value={value}>
      {children}
    </AutoplayStateContext.Provider>
  );
}

function useAutoplay() {
  const context = React.useContext(AutoplayStateContext);

  if (context === undefined) {
    throw new Error('useAutoplay must be used within a AutoplayProvider');
  }

  return context;
}

export { AutoplayProvider, useAutoplay };
