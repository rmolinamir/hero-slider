import React from 'react';
import type CSS from 'csstype';

export interface SettingsProps {
  /**
   * Next and previous buttons rendering. Defaults to `true`.
   */
  shouldDisplayButtons?: boolean;
  shouldAutoplay?: boolean;
  shouldSlideOnArrowKeypress?: boolean;
  sliderColor?: CSS.Properties['color'];
  sliderStyle?: Omit<CSS.Properties, 'width' | 'height'>;
  navbarStyle?: {
    color?: CSS.Properties['color'];
    activeColor?: CSS.Properties['color'];
  };
}

interface SettingsState extends Required<SettingsProps> {}

const defaultProps: Pick<SettingsState, keyof SettingsProps> = {
  shouldDisplayButtons: true,
  shouldAutoplay: true,
  shouldSlideOnArrowKeypress: true,
  sliderColor: 'inherit',
  sliderStyle: {},
  navbarStyle: {
    color: undefined,
    activeColor: undefined
  }
};

type Action = {
  type: 'update-state-with-new-settings';
  payload: SettingsProps;
};
type Dispatch = (action: Action) => void;
type State = SettingsState;
type Props = React.PropsWithChildren<{ settings: SettingsProps }>;

const SettingsStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function settingsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'update-state-with-new-settings': {
      return { ...state, ...action.payload };
    }
    default: {
      throw new Error(`Unhandled action: [${JSON.stringify(action, null, 2)}]`);
    }
  }
}

function SettingsProvider({ children, settings }: Props) {
  const [state, dispatch] = React.useReducer(settingsReducer, {
    shouldDisplayButtons:
      settings.shouldDisplayButtons || defaultProps.shouldDisplayButtons,
    shouldAutoplay: settings.shouldAutoplay || defaultProps.shouldAutoplay,
    shouldSlideOnArrowKeypress:
      settings.shouldSlideOnArrowKeypress ||
      defaultProps.shouldSlideOnArrowKeypress,
    sliderColor: settings.sliderColor || defaultProps.sliderColor,
    sliderStyle: settings.sliderStyle || defaultProps.sliderStyle,
    navbarStyle: settings.navbarStyle || defaultProps.navbarStyle
  } as SettingsState);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };

  React.useEffect(() => {
    dispatch({
      type: 'update-state-with-new-settings',
      payload: settings
    });
  }, [settings]);

  return (
    <SettingsStateContext.Provider value={value}>
      {children}
    </SettingsStateContext.Provider>
  );
}

function useSettings() {
  const context = React.useContext(SettingsStateContext);

  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
}

export { SettingsProvider, useSettings };
