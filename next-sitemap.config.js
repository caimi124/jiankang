/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://herbscience.shop',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  
  // 排除不需要在sitemap中的页面
  exclude: [
    // ❌ 测试和开发页面
    '/test',
    '/test/*',
    '/test-cms',
    '/test-cms/*',
    '/test-enhanced',
    '/test-enhanced/*',
    '/simple-test',
    '/simple-test/*',
    '/constitution-test/debug',
    '/constitution-test/debug/*',
    '/zh/test',
    '/zh/test/*',
    
    // ❌ 技术路径
    '/api/*',
    '/_*',
    '/loading',
    '/error',
    '/not-found',
    
    // ❌ 旧的/重复的URL（已被301重定向）
    '/articles',
    '/articles/*',
    '/quiz',
    '/quiz/*',
    '/zh/articles',
    '/zh/articles/*',
    '/zh/quiz',
    '/zh/quiz/*',
    
    // ❌ 已废弃的功能页面
    '/home',
    '/index.html',
    '/ingredient-checker',
    '/knowledge-center', 
    '/user-experiences',
    '/zh/ingredient-checker',
    '/zh/knowledge-center',
    '/zh/user-experiences'
  ],
  
  // 添加额外的路径或自定义页面
  additionalPaths: async (config) => {
    // 从 Sanity 动态拉取 slug，确保所有草药详情/博客被发现
    async function fetchSanitySlugs() {
      try {
        const { createClient } = require('@sanity/client')
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
        const token = process.env.SANITY_API_TOKEN
        if (!projectId || !dataset) return { herbs: [], posts: [] }
        const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: true })
        const herbs = await client.fetch(`*[_type == "herb" && defined(slug.current)]{ "slug": slug.current }`)
        const posts = await client.fetch(`*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`).catch(() => [])
        return { herbs: herbs || [], posts: posts || [] }
      } catch (e) {
        console.warn('[sitemap] Sanity slug fetch failed:', e?.message)
        return { herbs: [], posts: [] }
      }
    }

    // 从静态数据库获取草药slugs作为备选
    async function fetchStaticHerbSlugs() {
      try {
        const { getStaticHerbSlugs } = require('./lib/herbs-data-sitemap')
        return getStaticHerbSlugs()
      } catch (e) {
        console.warn('[sitemap] Static herbs fetch failed:', e?.message)
        return []
      }
    }

    // 从静态数据库获取博客文章slugs作为备选
    async function fetchStaticBlogSlugs() {
      try {
        const { getStaticBlogSlugs } = require('./lib/blog-data-sitemap')
        return getStaticBlogSlugs()
      } catch (e) {
        console.warn('[sitemap] Static blog fetch failed:', e?.message)
        return []
      }
    }

    const { herbs, posts } = await fetchSanitySlugs()
    const staticHerbs = await fetchStaticHerbSlugs() // Always fetch static herbs
    const staticBlogs = await fetchStaticBlogSlugs() // Always fetch static blogs

    const extraPaths = [
      // 核心功能页面
      await config.transform(config, '/constitution-test'),
      await config.transform(config, '/constitution-test/quick'),
      await config.transform(config, '/zh/constitution-test'),
      await config.transform(config, '/zh/constitution-test/quick'),
      await config.transform(config, '/herb-finder'),
      await config.transform(config, '/zh/herb-finder'),
      await config.transform(config, '/dosage-calculator'),
      await config.transform(config, '/zh/dosage-calculator'),
      await config.transform(config, '/about'),
      await config.transform(config, '/zh/about'),
      await config.transform(config, '/blog'),
      await config.transform(config, '/zh/blog'),
      await config.transform(config, '/privacy'),
      await config.transform(config, '/zh/privacy'),
      
      // 动态草药详情（合并 Sanity 和静态数据库，去重）
      ...await Promise.all(
        Array.from(new Map(
          [...herbs, ...staticHerbs]
            .filter(h => h.slug && h.slug !== '-' && h.slug.length > 1)
            .map(h => [h.slug, h]) // 用slug作为key去重
        ).values())
        .map(h => config.transform(config, `/herbs/${h.slug}`))
      ),
      
      // 博客文章页面（合并 Sanity 和静态数据库，去重）
      ...await Promise.all(
        Array.from(new Map(
          [...posts, ...staticBlogs]
            .filter(p => p.slug && p.slug !== '-' && p.slug.length > 1)
            .map(p => [p.slug, p]) // 用slug作为key去重
        ).values())
        .map(p => config.transform(config, `/blog/${p.slug}`))
      ),
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
            href: 'https://herbscience.shop/',
            hreflang: 'en',
          },
          {
            href: 'https://herbscience.shop/zh',
            hreflang: 'zh',
          },
          {
            href: 'https://herbscience.shop/',
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
    if (path.includes('constitution-test') || path.includes('herb-finder') || path.includes('knowledge-center') || path.includes('ingredient-checker') || path.includes('dosage-calculator') || path.includes('user-experiences') || path.includes('about') || path.includes('articles') || path.includes('blog') || path.includes('privacy')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
        // 为核心页面添加hreflang支持
        alternateRefs: [
          {
            href: `https://herbscience.shop${path.startsWith('/zh') ? path.replace('/zh', '') : path}`,
            hreflang: 'en',
          },
          {
            href: `https://herbscience.shop/zh${path.startsWith('/zh') ? path.replace('/zh', '') : path}`,
            hreflang: 'zh',
          },
          {
            href: `https://herbscience.shop${path.startsWith('/zh') ? path.replace('/zh', '') : path}`,
            hreflang: 'x-default',
          },
        ],
      }
    }

    // 其他页面标准优先级
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString()
    }
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/test-enhanced', '/_next/', '/zh/test']
      }
    ],
    // 移除 additionalSitemaps 配置，避免重复引用
    // next-sitemap 会自动生成 sitemap-index.xml 和相应的 sitemap-0.xml 文件
  }
} 