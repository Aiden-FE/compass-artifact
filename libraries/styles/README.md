---
title: Compass 样式库
description: Compass 通用样式库
permalink: /styles/
---

# @compass-aiden/styles

> Compass 通用样式库

## 快速上手

`npm install @compass-aiden/styles` 安装依赖

### 使用 bem.scss

vite 配置为例,其他项目类似,全局导入即可

scss 的可空变量如下, 可根据业务实际情况进行再次声明覆盖

```scss
$domain: cp !default;
$block-separator: '-' !default;
$element-separator: '__' !default;
$modifier-separator: '_' !default;
```

```typescript
export default defineConfig({
  css: {
    preprocessorOptions: {
      stylus: {
        imports: ['@compass-aiden/styles/static/bem.scss'],
      },
    },
  },
});
```

模板内使用,以 Vue 为例

```vue
<template>
  <div class="cp-container">
    <button class="cp-container__button cp-container__button_active">Test</button>
  </div>
  <div class="demo-container"></div>
</template>

<style scoped lang="scss">
@include b(container) {
  // .cp-container
  @include e(button) {
    // .cp-container__button
    @include m(active) {
      // .cp-container__button_active
    }
  }
  // 选择多个
  @include e((button, input)) {
    // .cp-container__button 和 .cp-container__input
  }
}

// 重新定义domain
@include b(container, demo) {
  // .demo-container
}
</style>
```

### 使用样式文件

```stylus
// 导入所有css文件
@import '@compass-aiden/styles';
// 导入特定文件
@import '@compass-aiden/styles/assets/base.css'; // 单独导入基础样式表
@import '@compass-aiden/styles/assets/tools.css'; // 单独导入实用工具样式表
@import '@compass-aiden/styles/assets/scrollbar.css'; // 单独导入滚动条样式表
```

#### CSS 变量

##### dist/assets/base.css 内的 CSS 变量

- --#{$domain}-page-bg-color 页面背景颜色

##### dist/assets/tools.css 内的 CSS 变量

> DOM Class 添加 cp-selection 即可使用文本选择颜色控制

- --#{$domain}-selection-color 选择区颜色
- --#{$domain}-selection-bg-color 选择区背景色

##### dist/assets/scrollbar.css 内的 CSS 变量

> DOM Class 添加 cp-scrollbar 即可使用
> 添加 cp-scrollbar 后, DOM Class 添加 cp-scrollbar_fixed 即可使用滚动条固定模式

- --#{$domain}-scrollbar-size 滚动条 y, x 的宽高
- --#{$domain}-scrollbar-bg-color 滚动条背景色
- --#{$domain}-scrollbar-thumb-bg-color 滚动条滑块背景色
- --#{$domain}-scrollbar-thumb-border-color 滚动条滑块边框色
- --#{$domain}-scrollbar-track-bg-color 滚动条外层轨道背景色
