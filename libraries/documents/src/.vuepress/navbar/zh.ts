import { navbar } from 'vuepress-theme-hope';

export const zhNavbar = navbar([
  '/',
  {
    text: '文档',
    icon: 'stack',
    children: [
      {
        text: 'Compass 脚手架',
        icon: 'shell',
        link: '/commander/',
        children: [],
      },
      {
        text: 'Compass 工具函数库',
        icon: 'module',
        link: '/utils/',
        children: [],
      },
      {
        text: 'Eslint Config',
        icon: 'linter',
        link: '/eslint-config/',
        children: [],
      },
      {
        text: '选型推荐',
        icon: 'selection',
        link: '/awesome/',
        children: [],
      },
      {
        text: 'Compass 样式库',
        icon: 'page',
        link: '/styles/',
        children: [],
      },
      {
        text: '贡献文档',
        icon: 'code',
        link: '/contribution/',
        children: [],
      },
    ],
  },
]);
