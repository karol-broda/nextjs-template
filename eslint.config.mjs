import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ),
  {
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true,
      },
    },
    plugins: ["@typescript-eslint", "drizzle"],
    ignores: ["node_modules", ".next"],
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "drizzle/enforce-delete-with-where": [
        "error",
        {
          drizzleObjectName: ["db", "ctx.db"],
        },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        {
          drizzleObjectName: ["db", "ctx.db"],
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "no-implicit-coercion": [
        "error",
        { boolean: true, number: false, string: false },
      ],
      "no-extra-boolean-cast": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "MemberExpression[optional=true]",
          message: "Optional chaining (?.) is not allowed.",
        },
        {
          selector: "UnaryExpression[operator='!'] > Identifier",
          message: "Avoid implicit boolean coercion.",
        },
      ],
    },
  },
];
