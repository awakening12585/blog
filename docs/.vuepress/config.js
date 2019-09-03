module.exports = {
  title: '早有觉悟',
  description: '开始',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/blog/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
	nav:[ // 导航栏配置
      { text: '导航', link: '/guide/markdown/' }, // 内部链接 以docs为根目录
      { text: '博客', link: 'http://blog.zaoyoujuewu.cn/' }, // 外部链接
      // 下拉列表
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub地址', link: 'https://github.com/awakening12585' }
        ]
      }        
    ],
	sidebar:{
		'/guide/': [
			{
			  title: '文档',
              collapsable: false,
			  children: [
			    '/guide/markdown/',
				'/guide/docker/',
			  ]
			},
			{
			  title: '安装教程',
              collapsable: false,
			  children: [
			    '/guide/tutorial/',
			  ]
			},
			{
			  title: '面试',
              collapsable: false,
			  children: [
			    '/guide/interview/',
			  ]
			},
		],
		'/interview/': [
			{
			  title: 'Java基础',
              collapsable: false,
			  children: [
			    '/interview/interview1/',
			  ]
			},
		],
		'/tutorial/': [
			{
			  title: 'windows',
              collapsable: false,
			  children: [
			    '/tutorial/powerdesigner/',
			  ]
			},
			{
			  title: 'linux',
              collapsable: false,
			  children: [
			    '/tutorial/jdk/',
			  ]
			},
		],
		'/docker/': [
			{
			  title: 'Docker 安装',
              collapsable: false,
			  children: [
			    '/docker/',
			    '/docker/docker1/',
			    '/docker/docker2/',
			    '/docker/docker3/',
			  ]
			},
			{
			  title: 'docker-compose',
              collapsable: false,
			  children: [
			    '/docker/docker4/',
			  ]
			},
		],
	}
  }
};
