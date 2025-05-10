import withNuxt from './.nuxt/eslint.config.mjs';


export default withNuxt({
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        map: [
          ['@', './app'],
          ['~', './app'],
          ['~~', '.']
        ]
      },
      typescript: {
        paths: {
          '~/*': ['./app/*'],
          '@/*': ['./app/*'],
          '~~/*': ['./*']
        }
      }
    }
  },
  ignores: ['*.config.*js', '.tailwind/*', 'shims-vue.d.ts'],
  rules: {
    // ...getRules(compat.extends('airbnb-base')),
    // ...getRules(compat.extends('airbnb-typescript/base'), '@typescript-eslint/'),
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-components': 'error',
    'vue/first-attribute-linebreak': 'error',
    'vue/max-attributes-per-line': 'error',
    'vue/html-closing-bracket-newline': 'error',
    'vue/html-closing-bracket-spacing': 'warn',
    'vue/html-indent': 'warn',
    'vue/html-self-closing': 'warn',
    'vue/html-button-has-type': 'warn',
    'vue/no-multiple-template-root': 'off',
    'import/order': 'warn',
    'no-unused-vars': 'off',
    'vue/no-v-html': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    'vuejs-accessibility/mouse-events-have-key-events': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'func-names': 'off',
    'import/no-cycle': 'off',
    'vue/max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true
      }
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        '': 'never'
      }
    ]
  }
});
