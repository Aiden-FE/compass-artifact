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
  const commanderFiles = findFilesInFolder(resolver('../../../commander'), /.md$/i);
  cpFiles(commanderFiles, resolver('../temp/commander'));
  const stylesFiles = findFilesInFolder(resolver('../../../styles'), /.md$/i);
  cpFiles(stylesFiles, resolver('../temp/styles'));
  const utilsFiles = findFilesInFolder(resolver('../../../utils'), /.md$/i);
  cpFiles(utilsFiles, resolver('../temp/utils'));
}

export default defineUserConfig({
  // @ts-ignore
  base: IS_PROD ? '/compass-artifact/' : '/',
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'].concat(
    IS_PROD
      ? []
      : [
          '../../eslint-config/**/*.md',
          '!../../eslint-config/node_modules',
          '../../commander/**/*.md',
          '!../../commander/node_modules',
          '../../styles/**/*.md',
          '!../../styles/node_modules',
          '../../utils/**/*.md',
          '!../../utils/node_modules',
        ],
  ),
  locales: {
    '/en/': {
      lang: 'en-US',
      title: 'Compass',
      description: 'Compass infrastructure platform',
    },
    '/': {
      lang: 'zh-CN',
      title: 'Compass',
      description: 'Compass 基础设施平台',
    },
  },

  theme,

  markdown: {
    headers: {
      level: [2, 3, 4, 5],
    },
  },

  plugins: [],
  // Enable it with pwa
  // shouldPrefetch: false,
});
