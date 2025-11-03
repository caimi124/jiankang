'use client'

/**
 * 最新博客文章展示组件
 * 用途：在首页展示所有博客文章，帮助Google索引
 * 添加位置：app/page.tsx 或 app/HomeClient.tsx
 */

export default function LatestBlogsSection() {
  const blogs = [
    {
      title: '红景天适应原指南：科学原理与实用建议',
      slug: 'rhodiola-adaptogen-guide',
      excerpt: '深入了解红景天如何帮助身体应对压力，提高适应能力。基于最新科学研究的完整指南。',
      date: '2025-01-17',
      category: '草药指南',
      readTime: '8分钟',
      image: '🔴'
    },
    {
      title: '红景天与不同体质：哪种体质最适合？',
      slug: 'rhodiola-for-body-types',
      excerpt: '根据中医体质理论，了解红景天是否适合您的体质类型，以及如何正确使用。',
      date: '2025-01-18',
      category: '体质养生',
      readTime: '7分钟',
      image: '🧬'
    },
    {
      title: '红景天茶的好处与制作方法',
      slug: 'rhodiola-tea-benefits-recipe',
      excerpt: '学习如何制作美味的红景天茶，以及它对能量和情绪的积极影响。',
      date: '2025-01-18',
      category: '实用指南',
      readTime: '5分钟',
      image: '🍵'
    },
    {
      title: '姜黄用量完整指南：如何安全有效地使用',
      slug: 'turmeric-dosage-guide',
      excerpt: '详细的姜黄用量建议，包括不同形式的姜黄补充剂的推荐剂量和注意事项。',
      date: '2025-01-20',
      category: '用量指南',
      readTime: '10分钟',
      image: '🟡'
    },
    {
      title: '姜黄副作用：需要注意什么',
      slug: 'turmeric-side-effects-what-to-watch',
      excerpt: '了解姜黄可能的副作用、药物相互作用，以及谁应该避免使用姜黄。',
      date: '2025-01-20',
      category: '安全信息',
      readTime: '6分钟',
      image: '⚠️'
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            📚 最新博客文章
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            循证医学视角下的草药知识分享 · 由持证药剂师审核
          </p>
        </div>

        {/* 博客卡片网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <a
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              {/* 图标头部 */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
                <span className="text-6xl">{blog.image}</span>
              </div>

              {/* 内容 */}
              <div className="p-6">
                {/* 元数据 */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                    {blog.category}
                  </span>
                  <span className="text-gray-500">{blog.readTime}</span>
                </div>

                {/* 标题 */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* 摘要 */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* 底部 */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{blog.date}</span>
                  <span className="text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                    阅读全文
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 底部CTA */}
        <div className="text-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-green-600 font-semibold text-lg hover:text-green-700 hover:gap-3 transition-all"
          >
            <span>查看所有文章</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-gray-500">
            💡 更多循证医学文章持续更新中
          </p>
        </div>
      </div>
    </section>
  )
}

