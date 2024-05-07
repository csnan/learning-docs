import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  base: "/learning-docs/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: "javascript设计模式",
        items: [
          { text: "工厂模式", link: "/designPatterns/factory" },
          { text: "单例模式", link: "/designPatterns/single" },
          { text: "原型模式", link: "/designPatterns/prototype" },
          { text: "装饰器模式", link: "/designPatterns/decorator" },
          { text: "适配器模式", link: "/designPatterns/adapter" },
          { text: "代理模式", link: "/designPatterns/proxy" },
          { text: "策略模式", link: "/designPatterns/strategy" },
          { text: "状态模式", link: "/designPatterns/state" },
          { text: "观察者模式", link: "/designPatterns/observer" },
          { text: "迭代器模式", link: "/designPatterns/iterator" },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
