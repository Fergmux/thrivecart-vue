import prettier from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['src/pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    ignores: ['dist/', 'node_modules/'],
  },
];
