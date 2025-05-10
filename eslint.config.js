// eslint.config.js
import { defineConfig } from 'eslint/config';
import vue from 'eslint-plugin-vue';

export default defineConfig([
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.build/',
      '.nuxt/',
      'output/',
      'public/',
      'coverage/',
      'static/',
      '.vscode/',
      '.idea/',
    ],
  },
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: 'vue-eslint-parser', // Add vue-eslint-parser here
      },
    },
    plugins: {
      vue,
    },
    rules: {
      // Base XO-like stylistic rules
      indent: ['error', 2],
      quotes: ['error', 'double'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-multi-spaces': 'error',
      'single-quote': ['error', 'single'],

      // Vue 3 plugin individual rules
      'vue/no-v-html': 'warn', // Prevent using v-html
      'vue/require-prop-types': 'error', // Require prop types
      'vue/require-default-prop': 'error', // Require default prop values
      'vue/valid-v-for': 'error', // Check valid v-for directives
      'vue/no-unused-vars': 'warn', // Warn on unused variables
      'vue/valid-v-bind': 'error', // Ensure valid v-bind directives
      'vue/valid-v-slot': 'error', // Ensure valid v-slot directives
    },
  },
]);
