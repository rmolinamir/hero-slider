import React from 'react';
import IntervalTimer, { IntervalState } from './IntervalTimer';
import { useController } from './Controller';
import { useIntersectionObserver } from './IntersectionObserver';
import ConsoleLogger from './ConsoleLogger';

const logger = ConsoleLogger.new();

interface Props {
  /**
   * Autoplay duration, interval or duration betweens slide transitions, in milliseconds.
   * If it's lower than the sliding cycle duration (sliding duration + sliding delay), then the sliding cycle duration will be used instead.
   * @default 8000
   */
  autoplayDuration?: number;
  /**
   * Time (in milliseconds) in which the autoplay will be debounced if the user interacts with the slider.
   * The autoplay resumes if the user stops interacting after this duration.
   * Set as 0 to disable this feature.
   * @default 4000
   */
  autoplayDebounce?: number;
}

export type AutoplayProps = Props | boolean;

type Action =
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'set-debounce-timeout'; payload: NodeJS.Timeout };
interface State {
  isPausedByUser: boolean;
  debounceTimeout?: NodeJS.Timeout;
}
type ProviderProps = React.PropsWithChildren<{
  autoplay?: AutoplayProps;
}>;

const defaultProps: Required<Props> = {
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
  const params: Required<Props> = {
    autoplayDuration:
      (typeof autoplay === 'object' ? autoplay?.autoplayDuration : undefined) ??
      defaultProps.autoplayDuration,
    autoplayDebounce:
      (typeof autoplay === 'object' ? autoplay?.autoplayDebounce : undefined) ??
      defaultProps.autoplayDebounce
  };

  const [state, dispatch] = React.useReducer(autoplayReducer, {
    isPausedByUser: false,
    debounceTimeout: undefined
  } as State);

  const {
    state: controller,
    changeSlide,
    getNextSlide,
    getSlidingCycleDuration
  } = useController();

  const slidingCycleDuration = getSlidingCycleDuration();

  const autoplayCycleDuration = Math.max(
    slidingCycleDuration,
    params.autoplayDuration
  );

  if (params.autoplayDuration < getSlidingCycleDuration())
    logger.warn(
      '[Autoplay] The `autoplayDuration` is lower than the sliding cycle duration (the result of `slidingDuration + slidingDelay`).',
      'The sliding cycle duration will be used instead for the autoplay intervals.'
    );

  const autoplayInstance = IntervalTimer.new((): void => {
    changeSlide(getNextSlide(controller.activeSlide));
  }, autoplayCycleDuration);

  const { isInView } = useIntersectionObserver();

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
    logger.debug('[Autoplay] Paused by user.');
    autoplayInstance.pause();
    dispatch({ type: 'pause' });
  };

  /**
   * Resumes the autoplay.
   */
  const resume = (): void => {
    logger.debug('[Autoplay] Resumed by user.');
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
   * Subscribe to changes in `autoplay` and `isInView`.
   * If the slider goes out of the viewport, then pause the slider autoplay instance if it's not idle.
   * If it comes back into viewport and its idle, start or resume the autoplay instance.
   * If the autoplay is disabled, then stop.
   */
  React.useLayoutEffect(() => {
    if (autoplay) {
      switch (true) {
        case state.isPausedByUser:
          break;
        // When not in view, stop the autoplay.
        case !isInView && autoplayInstance.state !== IntervalState.IDLE:
          autoplayInstance.stop();
          logger.debug('[Autoplay] Stopped.');
          break;
        // When in view and idle, start it.
        case isInView && autoplayInstance.state === IntervalState.IDLE: {
          autoplayInstance.start();
          logger.debug('[Autoplay] Started.');
          break;
        }
        // When in view and paused, resume it.
        case isInView && autoplayInstance.state === IntervalState.PAUSED: {
          autoplayInstance.resume();
          logger.debug('[Autoplay] Resumed.');
          break;
        }
      }
    } else if (autoplayInstance.state !== IntervalState.IDLE) {
      autoplayInstance.stop();
      logger.info('[Autoplay] Stopped.');
    }
  }, [autoplay, isInView]);

  /**
   * Clearing any existing timeouts to avoid memory leaks, and clear event listener.
   */
  React.useEffect(() => {
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
