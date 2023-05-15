import { hopeTheme } from 'vuepress-theme-hope';
import { enNavbar, zhNavbar } from './navbar';
import { enSidebar, zhSidebar } from './sidebar';

export default hopeTheme({
  hostname: 'https://aiden-fe.github.io/compass-artifact/',

  author: {
    name: 'Aiden',
    url: 'https://github.com/Aiden-FE',
  },

  iconAssets: 'iconfont',

  logo: '/logo-navbar.png',

  repo: 'Aiden-FE/compass-artifact',

  docsBranch: 'master',

  docsDir: 'libraries/documents/src',

  locales: {
    '/en/': {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      displayFooter: true,

      metaLocales: {
        editLink: 'Edit this page on GitHub',
      },
    },

    /**
     * Chinese locale config
     */
    '/': {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      displayFooter: true,

      // page meta
      metaLocales: {
        editLink: '在 GitHub 上编辑此页',
      },
    },
  },

  plugins: {
    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ['ts', 'vue'],
      },
      presentation: {
        plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      },
      locales: {
        '/': {
          info: '信息',
          note: '注释',
          tip: '提示',
          warning: '警告',
          danger: '危险',
          details: '详情',
        },
        '/en/': {
          info: 'Info',
          note: 'Note',
          tip: 'Tip',
          warning: 'Warning',
          danger: 'Danger',
          details: 'Details',
        },
      },
      stylize: [
        {
          matcher: 'Recommended',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommended',
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a pwa
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
