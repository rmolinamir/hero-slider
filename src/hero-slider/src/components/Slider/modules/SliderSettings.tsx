import React from 'react';

// /**
//  * Type definition for `SliderProps.settings`.
//  */
// export interface SliderSettingsProps {
//   slidingDuration: number;
//   slidingDelay: number;
//   sliderColor: string;
//   sliderFadeInDuration: number;
//   navbarFadeInDuration: number;
//   navbarFadeInDelay: number;
//   shouldAutomaticallyControlAnimations: boolean;
//   shouldDisplayButtons: boolean;
//   shouldAutoplay: boolean;
//   shouldSlideOnArrowKeypress: boolean;
//   autoplayDuration: number;
//   autoplayHandlerTimeout: number;
//   width: CSS.Properties['width'];
//   height: CSS.Properties<string | number>['height'];
// }

// export interface SliderSettings extends SliderSettingsProps {
//   initialSlidingAnimation: EAnimations;
//   slidingAnimation: string;
//   sliderOrientation: EOrientation;
// }

type Action = { type: 'increment' } | { type: 'decrement' };
type Dispatch = (action: Action) => void;
type State = { count: number };
type CountProviderProps = { children: React.ReactNode };

const CountStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment': {
      return { count: state.count + 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider({ children }: CountProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <CountStateContext.Provider value={value}>
      {children}
    </CountStateContext.Provider>
  );
}

function useCount() {
  const context = React.useContext(CountStateContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { CountProvider, useCount };
