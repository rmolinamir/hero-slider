import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';

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
      extract: true,
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
