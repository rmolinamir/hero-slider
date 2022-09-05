import React from 'react';
import type CSS from 'csstype';

export interface SettingsProps {
  /**
   * Next and previous buttons rendering.
   * @default true
   */
  sliderColor?: CSS.Properties['color'];
  sliderStyle?: Omit<CSS.Properties, 'width' | 'height'>;
  navbarStyle?: {
    color?: CSS.Properties['color'];
    activeColor?: CSS.Properties['color'];
  };
}

const defaultProps: Required<SettingsProps> = {
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
