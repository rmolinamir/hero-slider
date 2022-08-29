import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true
  },
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    svgr(),
    resolve(),
    typescript({
      tsconfig: './tsconfig.build.json'
    }),
    commonjs()
  ]
};
