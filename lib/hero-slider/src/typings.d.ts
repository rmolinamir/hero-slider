/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// WICG Spec: https://wicg.github.io/ua-client-hints
declare interface Navigator extends NavigatorUA {}

// https://wicg.github.io/ua-client-hints/#navigatorua
declare interface NavigatorUA {
  readonly userAgentData?: NavigatorUAData;
}
