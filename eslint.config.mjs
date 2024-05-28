import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from '@stylistic/eslint-plugin-ts'
import parserTs from '@typescript-eslint/parser'
import stylistic from '@stylistic/eslint-plugin'

export default [
  stylistic.configs['recommended-flat'],
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
  }),
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    languageOptions: { globals: globals.node,
      parser: parserTs,}
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
