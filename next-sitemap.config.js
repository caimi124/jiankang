/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://herbscience.shop',
  generateRobotsTxt: true,
  exclude: [
    '/api/*',
    '/404',
    '/500', 
    '/not-found',
    '/loading', 
    '/error',
    '/test*',
    '/_*'
  ],
  additionalPaths: async (config) => {
    const result = []
    
    // 静态页面
    const staticPages = [
      '/',
      '/herb-finder',
      '/constitution-test',
      '/ingredient-checker',
      '/dosage-calculator',
      '/knowledge-center',
      '/user-experiences',
      '/blog',
      '/articles',
      '/about',
      '/privacy'
    ]
    
    // 添加英文页面
    staticPages.forEach(page => {
      result.push({
        loc: page,
        changefreq: 'weekly',
        priority: page === '/' ? 0.9 : 0.8,
        lastmod: new Date().toISOString(),
      })
    })
    
    // 添加中文页面
    staticPages.forEach(page => {
      if (page !== '/') {
        result.push({
          loc: `/zh${page}`,
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        })
      } else {
        result.push({
          loc: '/zh',
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        })
      }
    })
    
    // 草药详情页面
    const herbPages = [
      'ginseng',
      'ginger',
      'turmeric',
      'cinnamon',
      'clove',
      'pumpkin-seed'
    ]
    
    herbPages.forEach(herb => {
      result.push({
        loc: `/herbs/${herb}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
      
      result.push({
        loc: `/zh/herbs/${herb}`,
        changefreq: 'monthly', 
        priority: 0.5,
        lastmod: new Date().toISOString(),
      })
    })
    
    // 文章页面
    const articlePages = [
      'ashwagandha-complete-guide',
      'beginners-herbal-supplement-guide',
      'herb-drug-interactions-guide',
      'natural-anxiety-relief-herbs',
      'rhodiola-vs-ginseng-comparison'
    ]
    
    articlePages.forEach(article => {
      result.push({
        loc: `/articles/${article}`,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      })
    })
    
    // 博客页面
    const blogPages = [
      'turmeric-gut-relief-guide'
    ]
    
    blogPages.forEach(blog => {
      result.push({
        loc: `/blog/${blog}`,
        changefreq: 'monthly',
        priority: 0.4,
        lastmod: new Date().toISOString(),
      })
      
      result.push({
        loc: `/zh/blog/${blog}`,
        changefreq: 'monthly',
        priority: 0.3,
        lastmod: new Date().toISOString(),
      })
    })
    
    return result
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/test*',
          '/_next/',
          '/404',
          '/500',
          '/error',
          '/loading'
        ],
      },
    ],
    additionalSitemaps: [
      'https://herbscience.shop/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // 自定义优先级和更新频率
    let priority = 0.5
    let changefreq = 'monthly'
    
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.includes('/herb-finder') || path.includes('/constitution-test')) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.includes('/herbs/') || path.includes('/ingredient-checker')) {
      priority = 0.7
      changefreq = 'weekly'
    } else if (path.includes('/blog/') || path.includes('/articles/')) {
      priority = 0.6
      changefreq = 'monthly'
    } else if (path.includes('/zh/')) {
      priority = priority * 0.8 // 中文页面优先级稍低
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: path.startsWith('/zh/') 
        ? [
            {
              href: `https://herbscience.shop${path.replace('/zh', '')}`,
              hreflang: 'en',
            }
          ]
        : [
            {
              href: `https://herbscience.shop/zh${path === '/' ? '' : path}`,
              hreflang: 'zh',
            }
          ]
    }
  },
} 