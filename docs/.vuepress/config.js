module.exports = {
  title: 'Kira技术博客',
  description: ' ',
  locales: {
    '/': {
      lang: 'ZH',
      title: 'Kira技术博客',
      description: ''
    },
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: `/favicon.ico`
      }
    ]
  ],
  dest: './docs/.vuepress/dist',
  evergreen: true,
  // 配置导航
  themeConfig: {
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在github上编辑此页',
        nav: [{
            text: '首页',
            link: '/'
          },
          {
            text: '项目经历',
            link: '/about/project/项目总结'
          },
          {
            text: '微前端',
            link: '/about/project/微前端'
          },
          {
            text: '小程序架构',
            link: '/about/project/小程序架构设计'
          },
          {
            text: 'vue',
            link: '/about/vue/生命周期'
          },
          {
            text: '常见考点',
            link: '/about/question/vue'
          },
          {
            text: '性能优化',
            link: '/about/nature/节流防抖'
          },
          // {
          //   text: '项目',
          //   items: [{
          //       text: '去哪儿旅行',
          //       link: 'https://github.com/251205668/Travel'
          //     },
          //     {
          //       text: '饿了么外卖前台',
          //       link: 'https://github.com/251205668/restaurant'
          //     },
          //     {
          //       text: '魔法音乐App',
          //       link: 'https://github.com/251205668/mymusic'
          //     }
          //   ]
          // }
        ],
        lastUpdated: '上次更新',
        sidebarDepth: 2,
        sidebar: {
          '/about/': getBasicsSidebar(
            'JS基础',
            'HTML',
            'CSS',
            'VUE基础',
            'React',
            'Wepback',
            'Http',
            '常见考点',
            '性能优化',
          )
        }
      },
    },
    repo: 'zhaohongwei978',
    repoLabel: 'Github',
    docsRepo: 'zhaohongwei978',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]
  ]
}


function getBasicsSidebar(groupA, groupB, groupC, groupD,groupE, groupF,groupG,groupH,groupI) {
  return [{
      title: groupA,
      collapsable: false,
      children: ['/about/basics/dsBridge','/about/basics/事件流','/about/basics/跨域','/about/basics/generator','/about/basics/Object','/about/basics/数据类型','/about/basics/数组操作','/about/basics/new的过程','/about/basics/原型链', '/about/basics/闭包','/about/basics/异步', '/about/brower/事件循环','/about/brower/渲染过程', '/about/basics/arguments','/about/basics/promise','/about/basics/ts学习']
    },
    {
      title: groupB,
      collapsable: true,
      children: []
    },
    {
      title: groupC,
      collapsable: true,
      children: ['/about/css/盒子模型','/about/css/盒子布局','/about/css/scss使用','/about/css/清除浮动的几种方式','/about/css/BFC介绍和解决的问题']
    },
    {
      title: groupD,
      collapsable: true,
      children: ['/about/vue/newVue时候都做了什么','/about/vue/vue实例挂载','/about/vue/render函数','/about/vue/虚拟DOM','/about/vue/update','/about/vue/watch实现','/about/vue/nextTick','/about/vue/路由原理','/about/vue/生命周期', '/about/vue/自定义model', '/about/vue/异步渲染','/about/vue/响应式observe','/about/vue/模版渲染','/about/vue/组件通信','/about/vue/vue3']
    },
    {
      title: groupE,
      collapsable: true,
      children: ['/about/webpack/webpack配置',]
    },
    {
      title: groupF,
      collapsable: true,
      children: ['/about/webpack/webpack配置',]
    },
    {
      title: groupG,
      collapsable: true,
      children: [ '/about/http/HTTP基础知识', '/about/http/缓存','/about/http/web安全']
    },
    {
      title: groupH,
      collapsable: true,
      children: ['/about/question/vue','/about/question/js','/about/question/移动端问题']
    },
    {
      title: groupI,
      collapsable: true,
      children: ['/about/nature/节流防抖','/about/nature/性能优化总结']
    }
  ]
}
