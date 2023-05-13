/**
 * @description 适用于基础TS环境 [详情文档地址](https://github.com/search?q=airbnb-typescript)
 */
module.exports = {
  extends: ['eslint-config-airbnb-base', 'eslint-config-airbnb-typescript/base', './recommended-base.js'].map(
    require.resolve,
  ),
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    // 解决使用@nestjs/testing会error的问题
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
