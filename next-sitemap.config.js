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
    '/herbs'
  ],
  
  // 添加额外的路径或自定义页面
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
      
      // 确认存在的草药详情页面
      await config.transform(config, '/herbs/ginseng'),
      await config.transform(config, '/herbs/ginger'),
      await config.transform(config, '/herbs/turmeric'),
      
      // 博客文章页面
      await config.transform(config, '/blog/turmeric-gut-relief-guide'),
    ];

    return extraPaths;
  },

  // 为不同类型的页面设置不同的优先级
  transform: async (config, path) => {
    // 首页最高优先级
    if (path === '/' || path === '/zh') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
        // 添加多语言替代版本
        alternateRefs: [
          {
            href: 'https://www.herbscience.shop/',
            hreflang: 'en',
          },
          {
            href: 'https://www.herbscience.shop/zh',
            hreflang: 'zh',
          },
          {
            href: 'https://www.herbscience.shop/',
            hreflang: 'x-default',
          },
        ],
      }
    }

    // 草药详情页面高优先级
    if (path.includes('/herbs/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
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
        // 多语言替代版本
        ...(path.startsWith('/zh/') ? {} : {
          alternateRefs: [
            {
              href: `https://www.herbscience.shop${path}`,
              hreflang: 'en',
            },
            {
              href: `https://www.herbscience.shop/zh${path}`,
              hreflang: 'zh',
            },
          ],
        }),
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
        disallow: ['/api/', '/test', '/test-enhanced', '/_next/', '/zh/test']
      }
    ],
    additionalSitemaps: [
      'https://www.herbscience.shop/sitemap-0.xml'
    ]
  }
} 