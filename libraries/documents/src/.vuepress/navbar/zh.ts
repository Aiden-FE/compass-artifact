import { navbar } from 'vuepress-theme-hope';

export const zhNavbar = navbar([
  '/',
  {
    text: '文档',
    icon: 'stack',
    children: [
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
    ],
  },
]);
