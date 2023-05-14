import { defineUserConfig, viteBundler } from 'vuepress';
import theme from './theme.js';

export default defineUserConfig({
  base: process.env.NODE_ENV === 'production' ? '/compass-artifact/' : '/',
  pagePatterns: ['**/*.md', '../../eslint-config/**/*.md', '!.vuepress', '!node_modules'],
  locales: {
    '/en/': {
      lang: 'en-US',
      title: 'Compass',
      description: 'Compass front-end integrated material platform',
    },
    '/': {
      lang: 'zh-CN',
      title: 'Compass',
      description: 'Compass 前端综合物料平台',
    },
  },

  theme,
  // Enable it with pwa
  // shouldPrefetch: false,
});
