/**
 * @description 适用于基础React环境
 * @example
 * 1. npm install -D eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react
 * eslint-plugin-react-hooks eslint-config-airbnb-typescript
 * @typescript-eslint/eslint-plugin @typescript-eslint/parser
 * 2. eslint . --ext .js,.jsx,.ts,.tsx
 */
module.exports = {
  extends: [
    'eslint-config-airbnb',
    'eslint-config-airbnb/hooks',
    'eslint-config-airbnb-typescript',
    './recommended-base.js',
  ].map(require.resolve),
};
