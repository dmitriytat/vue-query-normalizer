import pkg from './package.json';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: 'src/index.js',
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
    plugins: [
      babel({}),
    ],
  },
];
