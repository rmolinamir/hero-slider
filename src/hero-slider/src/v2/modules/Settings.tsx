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

const defaultProps: Required<SettingsProps> = {
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

type ProviderProps = React.PropsWithChildren<{ settings?: SettingsProps }>;

const SettingsStateContext = React.createContext<
  Required<SettingsProps> | undefined
>(undefined);

function SettingsProvider({ children, settings }: ProviderProps) {
  const params: Required<SettingsProps> = {
    shouldDisplayButtons:
      settings?.shouldDisplayButtons || defaultProps.shouldDisplayButtons,
    shouldAutoplay: settings?.shouldAutoplay || defaultProps.shouldAutoplay,
    shouldSlideOnArrowKeypress:
      settings?.shouldSlideOnArrowKeypress ||
      defaultProps.shouldSlideOnArrowKeypress,
    sliderColor: settings?.sliderColor || defaultProps.sliderColor,
    sliderStyle: settings?.sliderStyle || defaultProps.sliderStyle,
    navbarStyle: settings?.navbarStyle || defaultProps.navbarStyle
  };

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = params;

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
