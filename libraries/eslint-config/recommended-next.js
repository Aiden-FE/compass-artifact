module.exports = {
  extends: ['./recommended-react.js', 'eslint-config-next/core-web-vitals', './recommended-base.js'].map(
    require.resolve,
  ),
  rules: {
    'react/function-component-definition': [2, { namedComponents: ['arrow-function', 'function-declaration'] }],
    'react-refresh/only-export-components': 'off',
  },
};
