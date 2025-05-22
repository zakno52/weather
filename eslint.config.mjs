/* eslint-disable import/no-extraneous-dependencies */
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
      'prefer-const': 'warn',
      'no-use-before-define': 'warn',
      'no-unexpected-multiline': 'warn',
      'require-await': 'warn',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    },
  },
];
