import type CSS from 'csstype';
import React from 'react';

import { PartiallyRequired } from '../utils/PartiallyRequired';
import ConsoleLogger, { LoggerLevels } from './ConsoleLogger';

export interface SettingsProps {
  /**
   * Sets up the `--slider-color` CSS variable.
   * @default 'inherit'
   */
  sliderColor?: CSS.Properties['color'];
  /**
   * Inline CSS styling for the wrapper div element of the component.
   * @default {}
   */
  sliderStyle?: Omit<CSS.Properties, 'width' | 'height'>;
  /**
   * Aesthetics settings. You can configure the base color and the active color of all nav components within the `HeroSlider`. They can be set individually as well.
   * @default
   * {
   *    color: undefined,
   *    activeColor: undefined
   * }
   */
  navbarStyle?: {
    color?: CSS.Properties['color'];
    activeColor?: CSS.Properties['color'];
  };
  /**
   * Debugger logs level. Only useful if you need insights.
   * @default
   * {
   *    verbose: false,
   *    info: false,
   *    debug: false,
   *    warnings: true,
   *    errors: true
   * }
   */
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
