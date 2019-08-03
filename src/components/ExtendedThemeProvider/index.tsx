// Libraries
import * as React from 'react';

// Dependencies
import { IExtendedThemeProviderProps } from './typings';

// Components
import { ThemeProvider, withTheme } from 'styled-components';

const { memo } = React;

const ExtendedThemeProvider = (props: IExtendedThemeProviderProps) => {
  const { theme, extendedTheme, children } = props;

  return (
    <ThemeProvider theme={{
      ...theme,
      ...extendedTheme,
    }}>
      {children}
    </ThemeProvider>
  );
};

export default memo(withTheme(ExtendedThemeProvider));
