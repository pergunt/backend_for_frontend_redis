const path = require("path");

const baseConfig = path.resolve(__dirname, '..', '.eslintrc.js')

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    baseConfig,
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
  ],
  // Set of eslint plugins for better development experience.
  plugins: [ 'jsx-a11y', 'react', 'react-hooks'],
  // Resolve absolute imports from node_modules, src (frontend) and backend directories.
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
  rules: {
    'react/jsx-no-bind': 0,
    'react/function-component-definition': 0,
    'react/no-unstable-nested-components': 0,
    // This rule was deprecated in v6.1.0. It will no longer be maintained.
    // Use label-has-associated-control instead.
    'jsx-a11y/label-has-for': 'off',
    // Disable because of false positive cases with dynamic alt text.
    'jsx-a11y/img-redundant-alt': 'off',
    // We must provide this rule with `htmlFor` attribute (by default)
    // because this one was broken in airbnb config by `labelAttributes: []`.
    'jsx-a11y/label-has-associated-control': [
      'error',
      { labelAttributes: ['htmlFor'] },
    ],
    // 'defaultProps' on function steps-buttons is deprecated by React (https://github.com/facebook/react/pull/16210).
    'react/require-default-props': [
      'error',
      { ignoreFunctionalComponents: true },
    ],
    // Allow both `.js` and `.jsx` extensions.
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // There is no need to use alternatives everywhere like `shape`.
    // Sometimes we just need to know that this is an array in container for example.
    // We do not do any manipulations with array props and just pass it into the component.
    'react/forbid-prop-types': 'off',
    // Disable for our own risk without any grounding for a while.
    // It's also unnecessary for TypeScript users because all props are checking via types.
    'react/jsx-props-no-spreading': 'off',
    // Disable this rule because it causes an error with special html chars
    // on some environments (e.g. Windows).
    'react/jsx-one-expression-per-line': 'off',
    // We use both variants depending on each case.
    'react/state-in-constructor': 'off',
    // Use destructing only in render for `props` and `state`.
    // For handlers we use destruction only if needed.
    'react/destructuring-assignment': 'off',
  },
  overrides: [
    {
      // Extend config for ts(x) files.
      files: ['**/*.ts?(x)'],
      // Default eslint parser for TypeScript.
      // https://github.com/palantir/tslint/issues/4534
      parser: '@typescript-eslint/parser',
      // Find project's root and project's `tsconfig.json` for parser.
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      },
      // Extend config with typescript and typescript import in right order.
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      // TypeScript specific rules.
      rules: {
        'no-restricted-exports': 0,
        camelcase: 'off',
        'react/function-component-definition': 'off',
        // Override again because we extend `prettier` after `baseConfig`.
        curly: ['error', 'all'],
        // Do not warn on `d.ts` references.
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        // Typescript is used for type checking.
        'consistent-return': 'off',
        // Allow ts(x) extensions for files with JSX.
        'react/jsx-filename-extension': [
          'error',
          { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        // TypeScript is used for type checking.
        'react/prop-types': 'off',
        // TypeScript is used for type checking.
        'react/forbid-prop-types': 'off',
        // Do not throw error because we prefer to use type inheritance.
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        // Ignore unused vars for edge case (rest props)
        // e.g. { className, ...rest }
        '@typescript-eslint/no-unused-vars': [
          'error',
          { ignoreRestSiblings: true },
        ],
        // We prefer not to use classes so this rule is useless.
        '@typescript-eslint/unbound-method': 'off',
        // Any is the only option in some cases.
        '@typescript-eslint/no-explicit-any': 'off',
        // Nothing bad in empty function.
        '@typescript-eslint/no-empty-function': 'off',
        // Disable for compatibility with `@typescript-eslint/no-use-before-define`.
        'no-use-before-define': 'off',
        // Extend `no-use-before-define` to support TypeScript.
        '@typescript-eslint/no-use-before-define': 'error',
        // There is no need to enforce double typing because of type inheritance.
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // Disable for compatibility with `@typescript-eslint/no-shadow`.
        'no-shadow': 'off',
        // Nothing bad in type parameter shadow.
        '@typescript-eslint/no-shadow': [
          'error',
          {
            ignoreFunctionTypeParameterNameValueShadow: true,
          },
        ],
        // We prefer to use interface in most cases.
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],
      },
    },
  ],
}
