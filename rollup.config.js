import babel from 'rollup-plugin-babel';
import pkg from './package.json';

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
    external: ['vue', 'vue-router'],
    plugins: [
      babel({}),
    ],
  },
];
