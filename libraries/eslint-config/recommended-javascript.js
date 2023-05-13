module.exports = {
  extends: ['eslint-config-airbnb-base', './recommended-base.js'].map(require.resolve),
  settings: {
    'import/resolver': {
      // The Node resolver must come first
      // https://github.com/benmosher/eslint-plugin-import/issues/1396
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.mts', '.ts', '.tsx', '.mjs', '.js', '.jsx', '.json', '.node'],
      },
    },
  },
};
