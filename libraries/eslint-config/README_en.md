---
title: Eslint Preset Config
description: Recommended preset eslint configurations
permalink: /en/eslint-config/
---

# @compass-aiden/eslint-config

> Recommended preset eslint configurations

**Why would there be it?**

Unified eslint code verification standard.

**What standard does it follow?**

The entire Eslint specification is divided into four layers, in the following order, with the post-rule overwriting the pre-rule:

1. Airbnb, a highly recommended standard in the industry.
2. Framework recommended standards, applicable to specific operating environments, such as JS, TS, React, Vue, Angular, and so on.
3. Abstract and shareable standards, filling in the recommended rules not covered by the first two items or repairing rules that are too strict to implement.
4. Business standards, rules covered again by business projects when actually implemented (this library does not involve this layer).

If you want to contribute rules for the third layer, please submit your contributions based on the guidance of the ISSUES template. Thank you very much.

## Getting Started

Install basic dependencies in the development environment

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

### Nestjs environment using

Install pre-dependencies

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

Take the '.eslintrc.js' of the nest default template as an example:

```javascript
module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    // Add this configuration inside nestjs
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

### Vue3 environment using

Install pre-dependencies

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

Using the create-vue base template as an example, update the '.eslintrc' configuration file:

```javascript
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    '@compass-aiden/eslint-config/vue', // Add this line
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
```

### Vue2 environment using

Install pre-dependencies

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

The contents of the '.eslintrc.js' file are as follows:

```javascript
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    '@compass-aiden/eslint-config/vue2', // Add this line
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
```

::: warning

If there is an exception in the old project, you can try to update the eslint version. If it is cli lint, please update the @vue/cli-plugin-eslint version.
:::

### React environment using

Install pre-dependencies

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

Update the '.eslintrc' configuration file:

```javascript
module.exports = {
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  extends: [
    '@compass-aiden/eslint-config/react', // Add this line
  ],
};
```

Use `eslint . --fix --ext .js,.jsx,.ts,.tsx`

### Angular environment using

Install pre-dependencies

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

`ng add @angular-eslint/schematics` cli add schematic

lint command parser adjusted `@angular-eslint/builder`

.eslintrc.json

```json
{
  "extends": ["@compass-aiden/eslint-config/angular"]
}
```

::: warning

Angular config not yet validated for business
:::

### Typescript environment using

Install pre-dependencies

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

Update the '.eslintrc' configuration file:

```javascript
module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    '@compass-aiden/eslint-config/ts', // Add this line
  ],
};
```

### JavaScript environment using

Install pre-dependencies

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

Update the '.eslintrc' configuration file:

```javascript
module.exports = {
  extends: ['@compass-aiden/eslint-config/js'], // Add this line
};
```

## Use with prettier

> Refer to this guide when lint works with prettier

Install pre-dependencies

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

Update the '.eslintrc' configuration file:

```javascript
module.exports = {
  extends: [
    'plugin:prettier/recommended', // Add this line
  ],
};
```

Add .prettierrc.json file, configure as needed

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

## FAQ

### Unknown compiler option 'preserveValueImports'

The problem may occur in the Monorepo project, because the variable promotion of the typescript dependent package conflicts with other packages, you can fix it by prohibiting the typescript package dependency promotion.

### Parsing error: ImportDeclaration should appear when the mode is ES6 and in the module context

Add the following settings to the .eslintrc file

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
