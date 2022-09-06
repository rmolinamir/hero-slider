import React from 'react';
import type CSS from 'csstype';
import ConsoleLogger, { LoggerLevels } from './ConsoleLogger';
import { PartiallyRequired } from '../utils/PartiallyRequired';

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
  debug?: LoggerLevels | undefined;
}

const defaultProps: PartiallyRequired<SettingsProps, 'debug'> = {
  sliderColor: 'inherit',
  sliderStyle: {},
  navbarStyle: {
    color: undefined,
    activeColor: undefined
  }
};

type ProviderProps = React.PropsWithChildren<{ settings?: SettingsProps }>;

const SettingsStateContext = React.createContext<
  PartiallyRequired<SettingsProps, 'debug'> | undefined
>(undefined);

function SettingsProvider({ children, settings }: ProviderProps) {
  const params: PartiallyRequired<SettingsProps, 'debug'> = {
    sliderColor: settings?.sliderColor || defaultProps.sliderColor,
    sliderStyle: settings?.sliderStyle || defaultProps.sliderStyle,
    navbarStyle: settings?.navbarStyle || defaultProps.navbarStyle,
    debug: settings?.debug
  };

  /**
   * Set up ConsoleLogger whenever the `params.debug` change.
   */
  React.useEffect(() => {
    ConsoleLogger.new(params.debug);
  }, [params.debug]);

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
