module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    'eslint-plugin-vue/lib/configs/vue3-strongly-recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    './recommended-base.js',
  ].map(require.resolve),
};
