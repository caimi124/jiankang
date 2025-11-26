/**
 * 静态博客文章列表 - 用于sitemap生成
 * 每次新增博客文章时，需要手动更新此列表
 */

export interface StaticBlogPost {
  slug: string
  title: string
  publishedAt: string
  priority: number
}

// 🎯 所有已发布的博客文章列表（按发布时间倒序）
export const staticBlogPosts: StaticBlogPost[] = [
  // 📅 2025-01-27 新增的 Echinacea 文章
  {
    slug: 'what-is-echinacea-good-for-personalized-immune-support',
    title: 'What Is Echinacea Good For? A Practical Guide to Personalized Immune Support',
    publishedAt: '2025-01-27',
    priority: 0.9
  },
  // 📅 2025-01-26 新增的Ginger系列
  {
    slug: 'ginger-tablets-chews-nausea-bloating-guide',
    title: 'Ginger Tablets vs Chews: Which Works Better for Nausea & Bloating?',
    publishedAt: '2025-01-26',
    priority: 0.85
  },
  {
    slug: 'ginger-tea-menstrual-cramps-natural-relief',
    title: 'Ginger Tea for Menstrual Cramps: Your Complete Natural Relief Guide',
    publishedAt: '2025-01-25',
    priority: 0.85
  },
  
  // 📅 2025-01-24 Ashwagandha系列
  {
    slug: 'ashwagandha-for-women-hormone-balance',
    title: 'Ashwagandha for Women: Balance Hormones, Beat Stress, and Feel Like Yourself Again',
    publishedAt: '2025-01-24',
    priority: 0.9 // 高优先级（女性健康热门话题）
  },
  
  // 📅 早期Turmeric系列
  {
    slug: 'turmeric-dosage-guide',
    title: 'Turmeric Dosage Guide: How Much Should You Take?',
    publishedAt: '2025-01-20',
    priority: 0.85
  },
  {
    slug: 'turmeric-side-effects-what-to-watch',
    title: 'Turmeric Side Effects: What You Need to Watch For',
    publishedAt: '2025-01-20',
    priority: 0.85
  },
  
  // 📅 Rhodiola系列
  {
    slug: 'rhodiola-tea-benefits-recipe',
    title: 'Rhodiola Tea: Benefits, Recipe & When to Drink It',
    publishedAt: '2025-01-18',
    priority: 0.8
  },
  {
    slug: 'rhodiola-for-body-types',
    title: 'Which Body Type Benefits Most from Rhodiola?',
    publishedAt: '2025-01-18',
    priority: 0.8
  },
  {
    slug: 'rhodiola-adaptogen-guide',
    title: 'Rhodiola: The Ultimate Adaptogen Guide',
    publishedAt: '2025-01-17',
    priority: 0.8
  }
]

/**
 * 获取所有静态博客文章的slugs（用于sitemap生成）
 */
export function getStaticBlogSlugs() {
  return staticBlogPosts.map(post => ({
    slug: post.slug,
    publishedAt: post.publishedAt,
    priority: post.priority
  }))
}

/**
 * 根据slug获取单篇博客文章信息
 */
export function getStaticBlogPostBySlug(slug: string): StaticBlogPost | undefined {
  return staticBlogPosts.find(post => post.slug === slug)
}

/**
 * 获取最新的N篇博客文章
 */
export function getRecentBlogPosts(limit: number = 5): StaticBlogPost[] {
  return staticBlogPosts.slice(0, limit)
}

