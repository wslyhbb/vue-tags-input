import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pluginVue from 'eslint-plugin-vue';
import js from "@eslint/js";
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
    includeIgnoreFile(gitignorePath),
    {
        ignores: [
            "**/*.demo.*",
            'e2e/**'
        ]
    },
    ...pluginVue.configs['flat/recommended'],
    {
        files: [
            '**/*.vue',
            '**/*.js',
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            "vue/max-attributes-per-line": "off",
            "vue/no-use-v-if-with-v-for": "off",
            "vue/no-unused-components": "off",
            "vue/component-name-in-template-casing": "off",
            "vue/singleline-html-element-content-newline": "off",
            "vue/no-v-html": "off",
            "vue/require-default-prop": "off",
            "vue/use-v-on-exact": "off",
            "vue/multiline-html-element-content-newline": "off",
        },
    },
];