import React from 'react';

type Slide = {
  ref: React.RefObject<HTMLElement>;
  number: number;
  label?: string;
};

export interface ManagerProps {
  /**
   * Determines if on a mobile device. If true, the control buttons at the sides of the slider won't render.
   * @default /Mobi|Android/i.test(navigator.userAgentData || navigator.userAgent)
   */
  isMobile?: boolean;
}

interface GetSlide {
  (ref: Slide['ref']): Slide | undefined;
}

interface RegisterSlide {
  (ref: Slide['ref'], label?: string): void;
}

interface RemoveSlide {
  (ref: Slide['ref']): void;
}

type Action =
  | {
      type: 'update-is-mobile';
      payload: boolean;
    }
  | {
      type: 'register-slide';
      payload: Pick<Slide, 'ref' | 'label'>;
    }
  | {
      type: 'remove-slide';
      payload: Slide['ref'];
    };
interface State extends Required<ManagerProps> {
  slides: Map<Slide['ref'], Slide>;
  totalSlides: number;
}
type ProviderProps = React.PropsWithChildren<{ manager?: ManagerProps }>;

/**
 * Detecs if on a mobile device.
 */
function isMobile(): boolean {
  // But first, detect if running on the browser in case of SSR:
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    if (
      navigator &&
      /Mobi|Android/i.test(navigator.userAgentData || navigator.userAgent)
    )
      return true;
    else return false;
  }

  return false;
}

const defaultProps: Pick<State, keyof ManagerProps> = {
  isMobile: isMobile()
};

const ManagerStateContext = React.createContext<
  | {
      state: State;
      getSlide: GetSlide;
      registerSlide: RegisterSlide;
      removeSlide: RemoveSlide;
    }
  | undefined
>(undefined);

function managerReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'update-is-mobile': {
      return { ...state, isMobile: state.isMobile };
    }
    case 'register-slide': {
      const { slides } = state;
      slides.set(action.payload.ref, {
        ref: action.payload.ref,
        number: slides.size + 1,
        label: action.payload.label
      });
      return { isMobile: state.isMobile, slides, totalSlides: slides.size };
    }
    case 'remove-slide': {
      const { slides } = state;
      slides.delete(action.payload);
      return { isMobile: state.isMobile, slides, totalSlides: slides.size };
    }
    default: {
      throw new Error(`Unhandled action: [${JSON.stringify(action, null, 2)}]`);
    }
  }
}

function ManagerProvider({ children, manager }: ProviderProps) {
  const [state, dispatch] = React.useReducer(managerReducer, {
    isMobile: manager?.isMobile ?? defaultProps.isMobile,
    slides: new Map(),
    totalSlides: 0
  } as State);

  /**
   * Finds a Slide by its React `ref`.
   */
  const getSlide: GetSlide = (ref) => {
    return state.slides.get(ref);
  };

  /**
   * Registers a rendered Slide.
   */
  const registerSlide: RegisterSlide = (ref, label) => {
    dispatch({
      type: 'register-slide',
      payload: {
        ref,
        label
      }
    });
  };

  /**
   * Removes a Slide.
   */
  const removeSlide: RemoveSlide = (ref) => {
    dispatch({
      type: 'remove-slide',
      payload: ref
    });
  };

  /**
   * If `manager.isMobile` prop changes, update the current state.
   */
  React.useEffect(() => {
    if (typeof manager?.isMobile === 'boolean')
      dispatch({
        type: 'update-is-mobile',
        payload: manager?.isMobile
      });
  }, [manager?.isMobile]);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, getSlide, registerSlide, removeSlide };

  return (
    <ManagerStateContext.Provider value={value}>
      {children}
    </ManagerStateContext.Provider>
  );
}

function useManager() {
  const context = React.useContext(ManagerStateContext);

  if (context === undefined) {
    throw new Error('useManager must be used within a ManagerProvider');
  }

  return context;
}

export { ManagerProvider, useManager };
