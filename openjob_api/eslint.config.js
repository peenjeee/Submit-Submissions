import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      camelcase: 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
