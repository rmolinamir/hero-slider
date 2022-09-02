import React from 'react';
import { isMobile } from '../dependencies/isMobile';

type Slide = {
  ref: React.MutableRefObject<HTMLElement>;
  number: number;
  label?: string;
};

export interface ManagerProps {
  isMobile?: boolean;
}

interface ManagerState extends Required<ManagerProps> {
  slides: Map<Slide['ref'], Slide>;
  totalSlides: number;
}

const defaultProps: Pick<ManagerState, keyof ManagerProps> = {
  isMobile: isMobile()
};

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
type Dispatch = (action: Action) => void;
type State = ManagerState;
type Props = React.PropsWithChildren<{ manager: ManagerProps }>;

const ManagerStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
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

function ManagerProvider({ children, manager }: Props) {
  const [state, dispatch] = React.useReducer(managerReducer, {
    isMobile: manager.isMobile || defaultProps.isMobile,
    slides: new Map(),
    totalSlides: 0
  } as ManagerState);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };

  React.useEffect(() => {
    if (typeof manager.isMobile === 'boolean')
      dispatch({
        type: 'update-is-mobile',
        payload: manager.isMobile
      });
  }, [manager.isMobile]);

  return (
    <ManagerStateContext.Provider value={value}>
      {children}
    </ManagerStateContext.Provider>
  );
}

interface RegisterSlide {
  (ref: Slide['ref'], label?: string): void;
}

interface RemoveSlide {
  (ref: Slide['ref']): void;
}

function useManager(): {
  state: State;
  registerSlide: RegisterSlide;
  removeSlide: RemoveSlide;
} {
  const context = React.useContext(ManagerStateContext);

  if (context === undefined) {
    throw new Error('useManager must be used within a ManagerProvider');
  }

  const { state, dispatch } = context;

  /**
   * Registers a rendered Slide.
   */
  const registerSlide: RegisterSlide = (ref: Slide['ref'], label?: string) => {
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
  const removeSlide: RemoveSlide = (ref: Slide['ref']) => {
    dispatch({
      type: 'remove-slide',
      payload: ref
    });
  };

  return {
    state,
    registerSlide,
    removeSlide
  };
}

export { ManagerProvider, useManager };
