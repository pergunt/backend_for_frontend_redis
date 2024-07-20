const path = require("path");

const baseConfig = path.resolve(__dirname, '..', '.eslintrc.js')

module.exports = {
  extends: [
    baseConfig
  ],
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: [".", "node_modules"],
      },
    },
  },
  rules: {
    // some modules like aws-sdk, aws-lambda are being taken from root
    // this rule configuration doesn't allow to specify this case
    'import/no-extraneous-dependencies': 0,
    // For some reasons import .. from 'types' and './types` throw an errror
    'import/no-duplicates': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'import/no-self-import': 0,
    'no-irregular-whitespace': 0,
    'import/no-mutable-exports': 0,
  },
  overrides: [
    {
      // Extend config for ts files.
      files: ["**/*.ts"],
      // Default eslint parser for TypeScript.
      // https://github.com/palantir/tslint/issues/4534
      parser: "@typescript-eslint/parser",
      // Find project's root and project's `tsconfig.json` for parser.
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      },
    },
  ],
};
