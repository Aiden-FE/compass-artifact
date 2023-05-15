import { defineUserConfig } from 'vuepress';
// @ts-ignore
import path from 'node:path';
import theme from './theme.js';
// @ts-ignore
import child_process from 'node:child_process';
import { findFilesInFolder, cpFiles } from '../utils/index';
// @ts-ignore
import fs from 'node:fs';

const IS_PROD = process.env.NODE_ENV === 'production';

console.log('Env: ', process.env.NODE_ENV);

function resolver(path) {
  return path.join(__dirname, path);
}

if (IS_PROD) {
  const mdFiles = findFilesInFolder(resolver('../../../eslint-config'), /.md$/i);
  console.log('Get files: ', mdFiles);
  cpFiles(mdFiles, resolver('./temp/eslint-config'));
}

export default defineUserConfig({
  base: IS_PROD ? '/compass-artifact/' : '/',
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'].concat(
    IS_PROD
      ? ['./temp/**/*.md', './src/.vuepress/temp/**/*.md']
      : ['../../eslint-config/**/*.md', '!../../eslint-config/node_modules'],
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
