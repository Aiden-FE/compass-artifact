# @compass-aiden/styles

> 基础样式库

## Getting Started

`npm install @compass-aiden/styles` 安装依赖

### Use bem.scss

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
  @include e(button) {
    @include m(active) {
    }
  }
  // 选择多个
  @include e((button, input)) {
  }
}

// 重新定义domain
@include b(container, demo) {
}
</style>
```

### Use styles

```stylus
// 导入所有css文件
@import '@compass-aiden/styles';
// 导入特定文件
@import '@compass-aiden/styles/assets/base.css'; // 单独导入基础样式表
@import '@compass-aiden/styles/assets/tools.css'; // 单独导入实用工具样式表
@import '@compass-aiden/styles/assets/scrollbar.css'; // 单独导入滚动条样式表
```

#### CSS variables

##### CSS variables for dist/assets/base.css

- --cp-page-bg-color 页面背景颜色

##### CSS variables for dist/assets/tools.css

- --cp-selection-color 选择区颜色
- --cp-selection-bg-color 选择区背景色

##### CSS variables for dist/assets/scrollbar.css

- --cp-scrollbar-bg-color 滚动条背景色
- --cp-scrollbar-thumb-bg-color 滚动条滑块背景色
- --cp-scrollbar-thumb-border-color 滚动条滑块边框色
- --cp-scrollbar-track-bg-color 滚动条外层轨道背景色
