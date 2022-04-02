module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/no-shadow': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'no-param-reassign': ['error', { props: false }],
    'implicit-arrow-linebreak': 'off',
    'import/no-cycle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-quotes': [2, 'prefer-single'],
    'react/button-has-type': 'off',
    'prefer-destructuring': 'off',
  },
  ignorePatterns: ['vite.config.ts', '*.js'],
};
