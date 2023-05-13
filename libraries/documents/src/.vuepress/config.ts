import { defineUserConfig } from 'vuepress';
import theme from './theme.js';

export default defineUserConfig({
  base: '/',

  locales: {
    '/en/': {
      lang: 'en-US',
      title: 'Docs',
      description: 'A docs demo for vuepress-theme-hope',
    },
    '/': {
      lang: 'zh-CN',
      title: '文档',
      description: 'vuepress-theme-hope 的文档演示',
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
