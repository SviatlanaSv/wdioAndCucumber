// eslint.config.mjs
import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // global ignores
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      'reports/',
      'src/core/reports/',
      '.env',
      '**/*.feature',
      'eslint.config.*',
    ],
  },

  // base rules
  js.configs.recommended,

  // disable format-conflicting rules
  eslintConfigPrettier,

  // project settings
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      globals: {
        ...globals.node,
        ...globals.browser,
        browser: 'readonly',
        $: 'readonly',
        $$: 'readonly',
        expect: 'readonly',
        assert: 'readonly', // Chai assert provided globally via chai-setup
      },
    },
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      'no-var': 'warn',
      'prefer-const': 'warn',
      'no-console': 'off',
    },
  },

  // chai steps
  {
    files: ['src/test/step-definitions-chai/**/*.js'],
    rules: { 'no-redeclare': 'off' },
  },

  // cucumber steps (if they import chai)
  {
    files: ['src/test/step-definitions/**/*.js'],
    rules: { 'no-redeclare': 'off' },
  },
];
