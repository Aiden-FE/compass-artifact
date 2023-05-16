import { defineUserConfig } from 'vuepress';
// @ts-ignore
import path from 'node:path';
import theme from './theme.js';
import { findFilesInFolder, cpFiles } from '../utils/index';

const IS_PROD = process.env.NODE_ENV === 'production';

function resolver(...paths) {
  return path.join(__dirname, ...paths);
}

if (IS_PROD) {
  const mdFiles = findFilesInFolder(resolver('../../../eslint-config'), /.md$/i);
  cpFiles(mdFiles, resolver('../temp/eslint-config'));
}

export default defineUserConfig({
  // @ts-ignore
  base: IS_PROD ? '/compass-artifact/' : '/',
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'].concat(
    IS_PROD ? [] : ['../../eslint-config/**/*.md', '!../../eslint-config/node_modules'],
  ),
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
