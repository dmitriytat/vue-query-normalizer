import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const extensions = [
  '.js', '.ts',
];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        sourcemap: true,
        format: 'cjs',
      },
      {
        file: pkg.module,
        sourcemap: true,
        format: 'es',
      },
    ],
    external: ['vue', 'vue-router'],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({ extensions, include: ['src/**/*'] }),
    ],
  },
];
