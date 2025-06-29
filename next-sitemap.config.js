/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://herbscience.shop',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  priority: null,
  changefreq: null,
  generateIndexSitemap: false, // 禁用索引sitemap避免嵌套问题
  outDir: './public',
  
  // 排除特定路径
  exclude: [
    '/404',
    '/500', 
    '/error',
    '/loading',
    '/test*',
    '/api/*',
    '/zh/zh*', // 防止zh路径重复
    '*/zh/*' // 防止路径重复
  ],

  // 自定义robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/test*', '/_next/', '/404', '/500', '/error', '/loading']
      }
    ],
    additionalSitemaps: [
      'https://herbscience.shop/sitemap.xml'
    ]
  },

  // 自定义转换函数
  transform: async (config, path) => {
    // 防止重复路径
    if (path.includes('/zh/zh') || 
        path.includes('/articles/articles') || 
        path.includes('/herbs/herbs') ||
        path.includes('/blog/blog') ||
        path.includes('/herb-finder/herb-finder')) {
      return null; // 排除重复路径
    }

    // 自定义每个页面的配置
    const customConfig = {
      loc: path,
      lastmod: new Date().toISOString(),
    }

    // 根据路径类型设置优先级和更新频率
    if (path === '/') {
      return {
        ...customConfig,
        priority: 1.0,
        changefreq: 'daily'
      }
    }

    if (path.includes('/herb-finder/') && !path.includes('/zh/')) {
      return {
        ...customConfig,
        priority: 0.9,
        changefreq: 'weekly'
      }
    }

    if (path.includes('/herbs/')) {
      return {
        ...customConfig,
        priority: 0.8,
        changefreq: 'monthly'
      }
    }

    if (path.includes('/articles/') || path.includes('/blog/')) {
      return {
        ...customConfig,
        priority: 0.7,
        changefreq: 'monthly'
      }
    }

    if (path.includes('/constitution-test') || 
        path.includes('/dosage-calculator') || 
        path.includes('/ingredient-checker')) {
      return {
        ...customConfig,
        priority: 0.8,
        changefreq: 'weekly'
      }
    }

    if (path.startsWith('/zh/')) {
      return {
        ...customConfig,
        priority: 0.6,
        changefreq: 'weekly'
      }
    }

    // 默认配置
    return {
      ...customConfig,
      priority: 0.5,
      changefreq: 'monthly'
    }
  },

  // 额外的路径（如果需要）
  additionalPaths: async (config) => {
    const result = []
    
    // 添加主要静态页面
    const staticPages = [
      { loc: '/', priority: 1.0, changefreq: 'daily' },
      { loc: '/herb-finder', priority: 0.9, changefreq: 'weekly' },
      { loc: '/constitution-test', priority: 0.8, changefreq: 'weekly' },
      { loc: '/dosage-calculator', priority: 0.8, changefreq: 'weekly' },
      { loc: '/ingredient-checker', priority: 0.8, changefreq: 'weekly' },
      { loc: '/articles', priority: 0.8, changefreq: 'weekly' },
      { loc: '/blog', priority: 0.8, changefreq: 'weekly' },
      { loc: '/knowledge-center', priority: 0.7, changefreq: 'weekly' },
      { loc: '/about', priority: 0.6, changefreq: 'monthly' },
      { loc: '/privacy', priority: 0.5, changefreq: 'monthly' }
    ]

    staticPages.forEach(page => {
      result.push({
        loc: page.loc,
        priority: page.priority,
        changefreq: page.changefreq,
        lastmod: new Date().toISOString()
      })
    })

    return result
  }
} 