---
title: Eslint预设包
description: 推荐的预设eslint配置
permalink: /eslint-config/
---

# @compass-aiden/eslint-config

> 推荐预设的 eslint 配置

**为什么会有它?**

统一 Eslint 代码校验标准

**它遵循什么标准?**

将整个 Eslint 规范分为四层,先后顺序如下,后置规则覆盖前置规则:

1. Airbnb, 业内推荐度极高的标准
2. 框架推荐标准, 适用于具体运行环境的标准,诸如 js,ts,react,vue,angular 等等
3. 抽象的可共用标准, 填补前两条未覆盖的推荐规则或修复过于严苛难落地的规则
4. 业务标准, 实际落地时,由业务项目再次覆盖的规则 (本库不涉及此层)

如您想为第三层贡献规则,请根据 ISSUES 模板的引导提交你的贡献,非常感谢.

## 快速上手

在开发环境下安装基础依赖

::: tabs#npmManager

@tab:active pnpm

```shell
pnpm add -D @compass-aiden/eslint-config eslint eslint-plugin-import
```

@tab npm

```shell
npm add -D @compass-aiden/eslint-config eslint eslint-plugin-import
```

@tab yarn

```shell
yarn add -D @compass-aiden/eslint-config eslint eslint-plugin-import
```

:::

### Nextjs 环境使用

安装前置依赖

::: tabs#npmManager

@tab pnpm

```shell
pnpm add -D eslint-config-next eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-refresh
```

@tab npm

```shell
npm add -D eslint-config-next eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-refresh
```

@tab yarn

```shell
yarn add -D eslint-config-next eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-refresh
```

:::

更新.eslintrc 配置文件:

```javascript
module.exports = {
  extends: [
    // next使用此配置
    '@compass-aiden/eslint-config/next',
  ],
  parserOptions: {
    project: ['tsconfig.json'],
  },
};
```

使用 `next lint`

### Nestjs 环境使用

安装前置依赖

::: tabs#npmManager

@tab pnpm

```shell
pnpm add -D eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

@tab npm

```shell
npm add -D eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

@tab yarn

```shell
yarn add -D eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

:::

以 nest 默认模板的.eslintrc.js 为例:

```javascript
module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    // nestjs 添加此配置
    '@compass-aiden/eslint-config/nest',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {},
};
```

### Vue3 环境使用

安装前置依赖

::: tabs#npmManager

@tab pnpm

```shell
pnpm add -D eslint-plugin-vue @typescript-eslint/parser @vue/eslint-config-airbnb-with-typescript
```

@tab npm

```shell
npm add -D eslint-plugin-vue @typescript-eslint/parser @vue/eslint-config-airbnb-with-typescript
```

@tab yarn

```shell
yarn add -D eslint-plugin-vue @typescript-eslint/parser @vue/eslint-config-airbnb-with-typescript
```

:::

以 create vue 的基础模板为例,更新.eslintrc 配置文件:

```javascript
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    '@compass-aiden/eslint-config/vue', // 新增此行
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
```

### Vue2 环境使用

安装前置依赖

::: tabs#npmManager

@tab pnpm

```shell
pnpm add -D eslint-plugin-vue @vue/eslint-config-airbnb-with-typescript @rushstack/eslint-patch
```

@tab npm

```shell
npm add -D eslint-plugin-vue @vue/eslint-config-airbnb-with-typescript @rushstack/eslint-patch
```

@tab yarn

```shell
yarn add -D eslint-plugin-vue @vue/eslint-config-airbnb-with-typescript @rushstack/eslint-patch
```

:::

.eslintrc.js 内容参考如下:

```javascript
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    '@compass-aiden/eslint-config/vue2', // 新增此行
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
```

::: warning

如果是老项目存在异常可以尝试更新 eslint 版本,如果是 cli lint 请更新@vue/cli-plugin-eslint 版本.
:::

### React 环境使用

安装前置依赖

::: tabs#npmManager

@tab pnpm

```shell
pnpm add -D eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-refresh
```

@tab npm

```shell
npm add -D eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-refresh
```

@tab yarn

```shell
yarn add -D eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-refresh
```

:::

更新.eslintrc 配置文件:

```javascript
module.exports = {
  // 当include lint异常时可指向正确的ts配置文件
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  extends: [
    // react使用此配置
    '@compass-aiden/eslint-config/react',
  ],
};
```

使用 `eslint . --fix --ext .js,.jsx,.ts,.tsx`

### Angular 环境使用

安装前置依赖

::: tabs#npmManager

@tab pnpm

```shell
pnpm add -D @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @typescript-eslint/parser @typescript-eslint/eslint-plugin @angular-eslint/builder
```

@tab npm

```shell
npm add -D @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @typescript-eslint/parser @typescript-eslint/eslint-plugin @angular-eslint/builder
```

@tab yarn

```shell
yarn add -D @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @typescript-eslint/parser @typescript-eslint/eslint-plugin @angular-eslint/builder
```

:::

`ng add @angular-eslint/schematics` cli 添加原理图

lint 命令解析器调整为 `@angular-eslint/builder`

.eslintrc.json

```json
{
  "extends": ["@compass-aiden/eslint-config/angular"]
}
```

::: warning

Angular 版尚未经过业务验证
:::

### Typescript 环境使用

安装前置依赖

::: tabs#npmManager

@tab pnpm

```shell
pnpm add -D eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

@tab npm

```shell
npm add -D eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

@tab yarn

```shell
yarn add -D eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

:::

更新.eslintrc 配置文件:

```javascript
// 使用eslint配置
module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    // typescript使用此配置
    '@compass-aiden/eslint-config/ts',
  ],
};
```

### JavaScript 环境使用

安装前置依赖

::: tabs#npmManager

@tab pnpm

```shell
pnpm add -D eslint-config-airbnb-base
```

@tab npm

```shell
npm add -D eslint-config-airbnb-base
```

@tab yarn

```shell
yarn add -D eslint-config-airbnb-base
```

:::

更新.eslintrc 配置文件:

```javascript
// 使用eslint配置
module.exports = {
  extends: ['@compass-aiden/eslint-config/js'],
};
```

## prettier 兼容

> 当 lint 与 prettier 一起工作时参考此引导

安装前置依赖

::: tabs#npmManager

@tab pnpm

```shell
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
```

@tab npm

```shell
npm add -D prettier eslint-config-prettier eslint-plugin-prettier
```

@tab yarn

```shell
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

:::

更新 .eslintrc 文件:

```javascript
module.exports = {
  extends: [
    'plugin:prettier/recommended', // 增加此项
  ],
};
```

添加.prettierrc.json 文件,按需配置

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

## 常见问题

### Unknown compiler option 'preserveValueImports'

问题可能发生在 Monorepo 项目内,由于 typescript 依赖包发生变量提升与其他包有冲突,可通过禁止 typescript 包依赖提升即可修复

### Parsing error: ImportDeclaration should appear when the mode is ES6 and in the module context

.eslintrc 文件内 加入以下设置即可

```json
{
  "parserOptions": {
    "ecmaVersion": 2022,
    "ecmaFeatures": {
      "modules": true
    }
  }
}
```
