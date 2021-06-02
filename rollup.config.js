import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

import { terser } from 'rollup-plugin-terser';
import klawSync from 'klaw-sync';
import path from 'path';

import pkg from './package.json';

const extensions = ['.ts', '.tsx', '.json'];

export default {
  input: 'src',
  output: [
    {
      file: 'dist/common.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    alias({
      entries: {
        '~': './src',
      },
      resolve: extensions,
    }),
    typescript({tsconfig: "tsconfig.json" }),
    babel({
      extensions,
      exclude: 'node_modules/**',
    }),
    resolve({
      extensions,
    }),
    commonjs(),
    terser(),
  ],
};
