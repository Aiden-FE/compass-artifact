---
title: Compass Style Library
description: Compass common style library
permalink: /en/styles/
---

# @compass-aiden/styles

> Compass common style library

## Getting Started

`npm install @compass-aiden/styles` Install dependencies

### Use bem.scss

Vite's configuration as an example, other projects are similar, global import can be

The nullable variables of scss are as follows, which can be declared again according to the actual

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

Used within the template, using Vue as an example

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
  // Select Multiple
  @include e((button, input)) {
    // .cp-container__button 和 .cp-container__input
  }
}

// Redefining the domain
@include b(container, demo) {
  // .demo-container
}
</style>
```

### Using Style Files

```stylus
// Import all css files
@import '@compass-aiden/styles';
// Import specific files
@import '@compass-aiden/styles/assets/base.css'; // Separate Import Base Style Sheets
@import '@compass-aiden/styles/assets/tools.css'; // Separate Import Utility Style Sheet
@import '@compass-aiden/styles/assets/scrollbar.css'; // Separate Import Scroll Bar Style Sheets
```

#### CSS Variables

##### CSS variables in dist/assets/base.css

- --cp-page-bg-color Page background color

##### CSS variables in dist/assets/tools.css

- --cp-selection-color Select area color
- --cp-selection-bg-color Select area background color

##### CSS variables in dist/assets/scrollbar.css

- --cp-scrollbar-bg-color Scroll bar background color
- --cp-scrollbar-thumb-bg-color Scroll bar slider background color
- --cp-scrollbar-thumb-border-color Scroll bar slider border color
- --cp-scrollbar-track-bg-color Scroll bar outer track background color
