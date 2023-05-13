const recommendedJS = require('./recommended-javascript');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['prettier'], // 增加此项
  extends: [
    'plugin:prettier/recommended', // 增加此项
    ...recommendedJS.extends,
  ],
  settings: recommendedJS.settings,
  rules: {
    'prettier/prettier': 'error', // 增加此项
  },
};
