import globals from 'globals';
import pluginJs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import pluginPrettier from 'eslint-plugin-prettier';
import airbnb from 'eslint-config-airbnb';
import prettier from 'eslint-config-prettier';

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...compat.config(airbnb),
  ...compat.config(prettier),
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    rules: {
      'no-var': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    },
  },
];
