# @compass-aiden/eslint-plugin
> Recommend eslint config

## Scripts

`yarn start` 启动开发模式

`yarn build` 打包构建

`yarn lint` 执行代码校验

## Getting Started
> 本项目前置依赖: eslint, eslint-plugin-import

`npm install @compass-aiden/eslint-plugin --save-dev` 在开发环境下安装依赖

```javascript
// 使用eslint配置
module.exports = {
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        // JavaScript项目使用此配置
        'plugin:@compass-aiden/recommended',
        // typescript使用此配置
        'plugin:@compass-aiden/recommended-ts',
        // react使用此配置
        'plugin:@compass-aiden/recommended-react',
        // vue3使用此配置
        'plugin:@compass-aiden/recommended-vue3',
    ],
    // ...
}
```
