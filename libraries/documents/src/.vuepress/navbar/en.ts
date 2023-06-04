import { navbar } from 'vuepress-theme-hope';

export const enNavbar = navbar([
  '/en/',
  {
    text: 'Docs',
    icon: 'stack',
    children: [
      {
        text: 'Compass commander',
        icon: 'shell',
        link: '/en/commander/',
        children: [],
      },
      {
        text: 'Compass utils library',
        icon: 'module',
        link: '/en/utils/',
        children: [],
      },
      {
        text: 'Eslint Config',
        icon: 'linter',
        link: '/en/eslint-config/',
        children: [],
      },
      {
        text: 'Selection Recommendation',
        icon: 'selection',
        link: '/en/awesome/',
        children: [],
      },
      {
        text: 'Compass Style Library',
        icon: 'page',
        link: '/en/styles/',
        children: [],
      },
      {
        text: 'Contribution Document',
        icon: 'code',
        link: '/en/contribution/',
        children: [],
      },
    ],
  },
]);
