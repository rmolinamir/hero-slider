interface IThemeObject {
  [propName: string]: any;
}

/**
 * `ExtendedThemeProviderProps` component props.
 */
export interface IExtendedThemeProviderProps {
  theme: IThemeObject;
  extendedTheme: IThemeObject;
  children: any; // Won't work if typed for some reason, spend too much time on this.
}
