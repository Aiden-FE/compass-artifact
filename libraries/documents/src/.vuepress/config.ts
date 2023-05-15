import { defineUserConfig } from 'vuepress';
// @ts-ignore
import path from 'node:path';
import theme from './theme.js';
// @ts-ignore
import child_process from 'node:child_process';
import { findFilesInFolder, cpFiles } from '../utils/index';

const IS_PROD = process.env.NODE_ENV === 'production';

if (IS_PROD) {
  const mdFiles = findFilesInFolder(path.join(__dirname, '../../../eslint-config'), /.md$/i);
  cpFiles(mdFiles, path.join(__dirname, './temp/eslint-config'));
  child_process.execSync('ls ./temp/eslint-config', { stdio: 'inherit' });
}

export default defineUserConfig({
  base: IS_PROD ? '/compass-artifact/' : '/',
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'].concat(
    IS_PROD ? ['./temp/**/*.md'] : ['../../eslint-config/**/*.md', '!../../eslint-config/node_modules'],
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
