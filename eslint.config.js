import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: [
      "node_modules/",
      "reports/",
      "src/core/reports/",
      ".env",
      "**/*.feature"
    ]
  },

  // ESLint base recomms
  js.configs.recommended,

  // Turn off rules that mess with Prettier
  eslintConfigPrettier,

  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        // WebdriverIO
        browser: "readonly",
        $: "readonly",
        $$: "readonly",
        expect: "readonly",
        // Cucumber BDD
        Given: "readonly",
        When: "readonly",
        Then: "readonly"
      }
    },
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
      "no-var": "warn",
      "prefer-const": "warn",
      "no-console": "off"
    }
  }
];
