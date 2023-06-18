module.exports = {
  extends: ['./recommended-react.js', 'eslint-config-next/core-web-vitals', './recommended-base.js'].map(
    require.resolve,
  ),
};
