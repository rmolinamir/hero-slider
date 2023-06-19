import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    exports: 'named',
    format: 'cjs',
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
