import { defineConfig } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  {
    ignores: ['node_modules', 'dist'],
    files: ['**/*.{ts}'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: { ...globals.node },
      parser: tsParser,
    },
  },
  tseslint.configs.recommended,
]);
