// @ts-check

import eslint from "@eslint/js";
import pluginLit from "eslint-plugin-lit";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default [
    eslint.configs.recommended,
    pluginLit.configs["flat/recommended"],
    pluginPrettier,
    ...tseslint.configs.strict,
    {
        ignores: ["*.styles.ts"],
    },
];
