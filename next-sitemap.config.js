/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.herbscience.shop',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  
  // 排除不需要在sitemap中的页面
  exclude: [
    '/test',
    '/api/*',
    '/_*'
  ],
  
  // 添加额外的路径或自定义页面
  additionalPaths: async (config) => [
    await config.transform(config, '/knowledge-center'),
    await config.transform(config, '/zh/knowledge-center'),
    await config.transform(config, '/constitution-test'),
    await config.transform(config, '/zh/constitution-test'),
    await config.transform(config, '/herb-finder'),
    await config.transform(config, '/zh/herb-finder'),
    await config.transform(config, '/ingredient-checker'),
    await config.transform(config, '/zh/ingredient-checker'),
    await config.transform(config, '/dosage-calculator'),
    await config.transform(config, '/zh/dosage-calculator'),
  ],

  // 为不同类型的页面设置不同的优先级
  transform: async (config, path) => {
    // 首页最高优先级
    if (path === '/' || path === '/zh') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // 核心工具页面高优先级
    if (path.includes('constitution-test') || path.includes('herb-finder') || path.includes('knowledge-center')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // 其他页面标准优先级
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/test', '/_next/']
      }
    ],
    additionalSitemaps: [
      'https://www.herbscience.shop/sitemap.xml'
    ]
  }
} 