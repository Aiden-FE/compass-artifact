module.exports = {
  extends: [
    'eslint-config-airbnb',
    'eslint-config-airbnb/hooks',
    'eslint-config-airbnb-typescript',
    './recommended-base.js',
  ].map(require.resolve),
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
