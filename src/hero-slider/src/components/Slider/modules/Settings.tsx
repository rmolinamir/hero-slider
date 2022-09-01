import React from 'react';
import type CSS from 'csstype';
import { PartiallyRequired } from '../utils/PartiallyRequired';

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
  /**
   * Similar to pointers in C++, objects can work like pointers in JavaScript. React references are mutable objects that can be changed but will always point to an origin. If you declare an `object` and pass it as a reference, then the `current` property of the React reference `object` will be set to be equal to the `goToNextSlide` handler within the slider. This provides the developer with a way to change the slides "from the outside" of the bounds of the HeroSlider component.
   */
  goToNextSlidePointer?: React.MutableRefObject<any>;
  /**
   * Similar to `nextSlide`, this sets the `object` to be equal to the `goToPreviousSlide` handler within the HeroSlider component.
   */
  goToPreviousSlidePointer?: React.MutableRefObject<any>;
}

interface SettingsState
  extends PartiallyRequired<
    SettingsProps,
    'goToNextSlidePointer' | 'goToPreviousSlidePointer'
  > {}

const defaultProps: Pick<SettingsState, keyof SettingsProps> = {
  shouldDisplayButtons: true,
  shouldAutoplay: true,
  shouldSlideOnArrowKeypress: true,
  sliderColor: 'inherit',
  sliderStyle: {},
  navbarStyle: {
    color: undefined,
    activeColor: undefined
  },
  goToNextSlidePointer: undefined,
  goToPreviousSlidePointer: undefined
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
      throw new Error(`Unhandled action type: ${action.type}`);
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
    navbarStyle: settings.navbarStyle || defaultProps.navbarStyle,
    goToNextSlidePointer: settings.goToNextSlidePointer,
    goToPreviousSlidePointer: settings.goToPreviousSlidePointer
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
