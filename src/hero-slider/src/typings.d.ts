/**
 * Default CSS definition for TypeScript.
 * Will be overridden with file-specific definitions by rollup on compile.
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
