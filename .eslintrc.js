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
    '@typescript-eslint/no-shadow': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'react/function-component-definition': 'off',
  },
  ignorePatterns: ['vite.config.ts', '*.js'],
};
