# @compass-aiden/eslint-plugin

> Recommend eslint config

<!-- TOC -->
* [@compass-aiden/eslint-plugin](#compass-aideneslint-plugin)
  * [快速上手](#快速上手)
    * [Nestjs 环境使用](#nestjs-环境使用)
    * [Vue3 环境使用](#vue3-环境使用)
    * [Vue2 环境使用](#vue2-环境使用)
    * [React 环境使用](#react-环境使用)
    * [Angular 环境使用](#angular-环境使用)
    * [Typescript 环境使用](#typescript-环境使用)
    * [JavaScript 环境使用](#javascript-环境使用)
  * [添加 prettier](#添加-prettier)
  * [本地开发](#本地开发)
  * [Roadmap](#roadmap)
<!-- TOC -->

**为什么会有它?**

统一 Eslint 代码校验标准

**它遵循什么标准?**

将整个 Eslint 规范分为四层,先后顺序如下,后置规则覆盖前置规则:

1. airbnb, 业内推荐度极高的标准
2. 框架推荐标准, 适用于具体运行环境的标准,诸如 js,ts,react,vue,angular 等等
3. 抽象的可共用标准, 填补前两条未覆盖的推荐规则或修复过于严苛难落地的规则
4. 业务标准, 实际落地时,由业务项目再次覆盖的规则 (本库不涉及此层)

如您想为第三层贡献规则,请根据 ISSUES 模板的引导提交你的贡献,非常感谢.

## 快速上手

`npm install @compass-aiden/eslint-config eslint eslint-plugin-import --save-dev` 在开发环境下安装依赖

### Nestjs 环境使用

> npm install -D eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser

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

> npm install eslint-plugin-vue @typescript-eslint/parser @vue/eslint-config-airbnb-with-typescript -D

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

> npm install eslint-plugin-vue @vue/eslint-config-airbnb-with-typescript @rushstack/eslint-patch -D

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

提示: 如果是老项目存在异常可以尝试更新 eslint 版本,如果是 cli lint 请更新@vue/cli-plugin-eslint 版本.

### React 环境使用

> npm install -D eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser

更新.eslintrc 配置文件:

```javascript
module.exports = {
  // 当include lint异常时可指向正确的ts配置文件
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    // react使用此配置
    '@compass-aiden/eslint-config/react',
  ],
};
```

`eslint . --fix --ext .js,.jsx,.ts,.tsx`

### Angular 环境使用

> npm install -D @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @typescript-eslint/parser @typescript-eslint/eslint-plugin @angular-eslint/builder

`ng add @angular-eslint/schematics` cli 添加原理图

lint 命令解析器调整为 `@angular-eslint/builder`

.eslintrc.json

```json
{
  "extends": ["@compass-aiden/eslint-config/angular"]
}
```

⚠️ 警告: Angular 版尚未经过业务验证

### Typescript 环境使用

> npm install eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

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

> npm install eslint-config-airbnb-base -D

更新.eslintrc 配置文件:

```javascript
// 使用eslint配置
module.exports = {
  extends: ['@compass-aiden/eslint-config/js'],
};
```

## 添加 prettier

> 推荐额外添加的内容

安装依赖`npm install -D prettier eslint-config-prettier eslint-plugin-prettier`

更新 .eslintrc 文件:

```javascript
module.exports = {
  plugins: ['prettier'], // 增加此项
  extends: [
    'plugin:prettier/recommended', // 增加此项
  ],
  rules: {
    'prettier/prettier': 'error', // 增加此项
  },
};
```

更新 package.json 文件:

```json
{
  "scripts": {
    "format": "prettier --write src"
  }
}
```

根目录添加 .prettierrc.json 文件,插入以下内容并按需调整:

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

## 本地开发

`pnpm lint` 执行代码校验

`pnpm format` 执行代码校验

`node scripts/update-version.js -v v1.0.0` 更新package.version版本,以便ci发布

## Roadmap

- [x] Support Typescript plugin
- [x] Support JavaScript plugin
- [x] Support Vue3 plugin
- [x] Support Vue2 plugin
- [x] Add issue template
- [x] Support React plugin
- [x] Support Angular plugin
- [x] Support Next plugin
