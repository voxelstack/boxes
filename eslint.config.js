// @ts-check

import eslint from "@eslint/js";
import pluginLit from "eslint-plugin-lit";
import pluginMdx from "eslint-plugin-mdx";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

const ignores = ["src/components/**/*.styles.ts", "templates/"];

export default [
    eslint.configs.recommended,
    pluginLit.configs["flat/recommended"],
    pluginPrettier,
    ...tseslint.configs.strict,
    {
        ignores,
        ...pluginMdx.flat,
        processor: pluginMdx.createRemarkProcessor({
            lintCodeBlocks: true,
        }),
        ...pluginMdx.flatCodeBlocks,
    },
    {
        ignores,
    },
];
