const recommendedJS = require('./recommended-javascript');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:prettier/recommended', // 增加此项
    ...recommendedJS.extends,
  ],
  settings: recommendedJS.settings,
};
