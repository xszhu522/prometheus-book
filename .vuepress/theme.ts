import {hopeTheme} from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://xszhu522.github.io",

  favicon: "/favicon.ico",

  author: {
    name: "xszhu522",
    url: "https://xszhu522.github.io",
  },

  iconAssets: [
    "https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.2/js/fontawesome.min.js",
    "https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.2/js/solid.min.js",
    "https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.2/js/brands.min.js",
  ],

  iconPrefix: "fa-",

  logo: "/avatar.webp",

  repo: "xszhu522/prometheus-book",

  docsBranch: "vuepress-theme-hope",

  docsDir: "",

  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: "",

  displayFooter: true,

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  fullscreen: true,

  plugins: {
    // You should generate and use your own comment service
    comment: {
      provider: "Giscus",
      repo: "xszhu522/prometheus-book",
      repoId: "R_kgDOKy7-KQ",
      category: "Comment",
      categoryId: "DIC_kwDOKy7-Kc4CbWmI",
    },

    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,

      // install chart.js before enabling it
      // chart: true,

      codetabs: true,

      // insert component easily
      // component: true,

      demo: true,

      // install echarts before enabling it
      // echarts: true,

      figure: true,

      // install flowchart.ts before enabling it
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      imgLazyload: true,
      imgSize: true,
      include: true,

      // install katex before enabling it
      // katex: true,

      // install mathjax-full before enabling it
      mathjax: true,

      mark: true,

      // install mermaid before enabling it
      // mermaid: true,

      playground: {
        presets: ["ts", "vue"],
      },

      // install reveal.js before enabling it
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,

      // install @vue/repl before enabling it
      // vuePlayground: true,
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
