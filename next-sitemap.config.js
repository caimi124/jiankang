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
    '/test-enhanced',
    '/api/*',
    '/_*',
    '/zh/test',
    '/loading',
    '/error',
    '/not-found',
    // 排除重定向源页面，避免404
    '/home',
    '/herbs',  // 重定向到 /herb-finder
    '/index.html',
    // 排除草药finder的旧路径，现在重定向到 /herbs/
    '/herb-finder/*',
    // 排除系统生成的页面
    '/_next/*',
    '/api/*',
    '/*.json',
  ],
  
  // robots.txt 配置
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/test',
          '/test-enhanced',
          '/_next/',
          '/zh/test',
          '/herb-finder/*', // 旧的草药页面路径不让爬虫访问
        ],
      },
    ],
    additionalSitemaps: [
      'https://www.herbscience.shop/sitemap.xml',
      'https://www.herbscience.shop/sitemap-0.xml',
    ],
  },
  
  // 添加额外的路径或自定义页面 - 只包含确实存在的页面
  additionalPaths: async (config) => {
    const extraPaths = [
      // 核心功能页面 - 确保这些页面真实存在
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
      await config.transform(config, '/user-experiences'),
      await config.transform(config, '/zh/user-experiences'),
      await config.transform(config, '/about'),
      await config.transform(config, '/zh/about'),
      await config.transform(config, '/articles'),
      await config.transform(config, '/zh/articles'),
      await config.transform(config, '/blog'),
      await config.transform(config, '/zh/blog'),
      await config.transform(config, '/privacy'),
      await config.transform(config, '/zh/privacy'),
      
      // 确认存在的草药详情页面 - 新的统一路径
      await config.transform(config, '/herbs/ginseng'),
      await config.transform(config, '/herbs/ginger'),
      await config.transform(config, '/herbs/turmeric'),
      await config.transform(config, '/herbs/valerian'),
      
      // 博客文章
      await config.transform(config, '/blog/turmeric-gut-relief-guide'),
    ]
    return extraPaths
  },
  
  // 为多语言网站添加 hreflang
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
} 