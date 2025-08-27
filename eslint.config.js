import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import vitest from "eslint-plugin-vitest";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      prettierConfig, // Add prettier config
    ],
    plugins: {
      react,
      "jsx-a11y": jsxA11y,
      prettier: prettierPlugin, // Add prettier plugin
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-has-content": "warn",
      "valid-jsdoc": "off", // Disable the deprecated rule
      "require-jsdoc": "off", // Disable the deprecated rule
      "new-cap": "off", // Disable new-cap rule
      "max-len": "off", // Disable max-len as prettier handles it
      "prettier/prettier": "error", // Enable prettier rule
    },
  },
  {
    files: ["**/*.test.{js,jsx}"],
    plugins: {
      vitest,
    },
    rules: vitest.configs.recommended.rules,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...vitest.environments.env.globals,
      },
    },
  },
]);
