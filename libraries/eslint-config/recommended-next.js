module.exports = {
  extends: [
    'eslint-config-airbnb',
    'eslint-config-airbnb-typescript',
    'eslint-config-next/core-web-vitals',
    './recommended-base.js',
  ].map(require.resolve),
  plugins: ['react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [2, { namedComponents: ['arrow-function', 'function-declaration'] }],
    'react-refresh/only-export-components': 'off',
  },
};
