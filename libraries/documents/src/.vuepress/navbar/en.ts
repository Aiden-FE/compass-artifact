import { navbar } from 'vuepress-theme-hope';

export const enNavbar = navbar([
  '/en/',
  {
    text: 'Docs',
    icon: 'stack',
    children: [
      {
        text: 'Eslint Config',
        icon: 'linter',
        link: '/en/eslint-config/',
        children: [],
      },
    ],
  },
]);
