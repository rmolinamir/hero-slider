import type CSS from 'csstype';
import React from 'react';

const mobileThreshold = 1024;

type Action = {
  type: 'update-slider-dimensions';
};
type State = {
  slider: React.RefObject<HTMLDivElement>;
  width?: CSS.Properties['width'];
  height?: CSS.Properties['height'];
};

const LayoutStateContext = React.createContext<
  { state: State; mobileThreshold: number } | undefined
>(undefined);

function layoutReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'update-slider-dimensions': {
      return {
        slider: state.slider,
        width: state.slider.current?.clientWidth as CSS.Properties['width'],
        height: state.slider.current?.clientHeight as CSS.Properties['height']
      };
    }
    default: {
      throw new Error(`Unhandled action: [${JSON.stringify(action, null, 2)}]`);
    }
  }
}

function LayoutProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = React.useReducer(layoutReducer, {
    slider: React.useRef<HTMLElement>(null),
    width: undefined,
    height: undefined
  } as State);

  /**
   * After mounting, similar to `componentDidMount`, set up the window event listeners and update dimensions.
   */
  React.useEffect(() => {
    function updateSliderDimensions() {
      if (state.slider.current) dispatch({ type: 'update-slider-dimensions' });
    }

    updateSliderDimensions();

    window.addEventListener(
      'resize',
      updateSliderDimensions as EventListenerOrEventListenerObject
    );
    /**
     * Clearing event listener to avoid memory leaks.
     */
    return () => {
      window.removeEventListener(
        'resize',
        updateSliderDimensions as EventListenerOrEventListenerObject
      );
    };
  }, [state.slider.current]);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, mobileThreshold };

  return (
    <LayoutStateContext.Provider value={value}>
      {children}
    </LayoutStateContext.Provider>
  );
}

function useLayout() {
  const context = React.useContext(LayoutStateContext);

  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }

  return context;
}

export { LayoutProvider, useLayout };
