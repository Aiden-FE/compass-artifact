import { defineUserConfig, viteBundler } from 'vuepress';
// @ts-ignore
import path from 'node:path';
import theme from './theme.js';
import { findFilesInFolder, cpFiles } from '../utils/index';

const IS_PROD = process.env.NODE_ENV === 'production';

if (IS_PROD) {
  const mdFiles = findFilesInFolder(path.join(__dirname, '../../../eslint-config'), /.md$/i);
  cpFiles(mdFiles, path.join(__dirname, './temp'));
}

export default defineUserConfig({
  base: IS_PROD ? '/compass-artifact/' : '/',
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'].concat(
    IS_PROD ? ['./temp'] : ['../../eslint-config/**/*.md'],
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
