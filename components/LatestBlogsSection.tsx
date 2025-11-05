'use client'

/**
 * 最新博客文章展示组件
 * 用途：在首页展示所有博客文章，帮助Google索引
 * 添加位置：app/page.tsx 或 app/HomeClient.tsx
 */

export default function LatestBlogsSection() {
  const blogs = [
    {
      title: 'Rhodiola Adaptogen Guide: Science & Practical Tips',
      slug: 'rhodiola-smart-way-daily-rituals',
      excerpt: 'Deep dive into how rhodiola helps the body cope with stress and improve adaptability. A complete guide based on latest scientific research.',
      date: '2025-01-17',
      category: 'Herb Guide',
      readTime: '8 min',
      image: '🔴'
    },
    {
      title: 'Rhodiola for Different Body Types: Which is Best for You?',
      slug: 'why-rhodiola-works-body-type',
      excerpt: 'Based on TCM constitution theory, understand if rhodiola suits your body type and how to use it correctly.',
      date: '2025-01-18',
      category: 'Constitution Guide',
      readTime: '7 min',
      image: '🧬'
    },
    {
      title: 'Rhodiola Tea Benefits & Recipe',
      slug: 'rhodiola-tea-recipes-energy-focus',
      excerpt: 'Learn how to make delicious rhodiola tea and its positive effects on energy and mood.',
      date: '2025-01-18',
      category: 'Practical Guide',
      readTime: '5 min',
      image: '🍵'
    },
    {
      title: 'Complete Turmeric Dosage Guide: Safe & Effective Use',
      slug: 'turmeric-gut-relief-guide',
      excerpt: 'Detailed turmeric dosage recommendations, including recommended amounts for different supplement forms and precautions.',
      date: '2025-01-20',
      category: 'Dosage Guide',
      readTime: '10 min',
      image: '🟡'
    },
    {
      title: 'Turmeric Side Effects: What to Watch For',
      slug: 'turmeric-side-effects',
      excerpt: 'Understand potential turmeric side effects, drug interactions, and who should avoid using turmeric.',
      date: '2025-01-20',
      category: 'Safety Info',
      readTime: '6 min',
      image: '⚠️'
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            📚 Latest Blog Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evidence-based herbal knowledge · Reviewed by licensed pharmacist
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
                    Read More
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
            <span>View All Articles</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-gray-500">
            💡 More evidence-based articles continuously updated
          </p>
        </div>
      </div>
    </section>
  )
}

