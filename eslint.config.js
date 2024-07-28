// @ts-check

import eslint from "@eslint/js";
import pluginLit from "eslint-plugin-lit";
import pluginMdx from "eslint-plugin-mdx";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default [
    eslint.configs.recommended,
    pluginLit.configs["flat/recommended"],
    pluginPrettier,
    ...tseslint.configs.strict,
    {
        ignores: ["*.styles.ts"],
        ...pluginMdx.flat,
        processor: pluginMdx.createRemarkProcessor({
            lintCodeBlocks: true,
        }),
        ...pluginMdx.flatCodeBlocks,
    },
];
