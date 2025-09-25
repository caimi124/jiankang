'use client'

import Link from 'next/link'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'

interface Article {
  title: string
  excerpt: string
  slug: string
  author: string
  publishedAt: string
  readTime: number
  category: string
  tags: string[]
}

interface RelatedArticlesProps {
  currentSlug: string
  category?: string
  tags?: string[]
}

// 静态相关文章数据
const staticArticles: Article[] = [
  {
    title: "Best Herbs for Anxiety: Natural Alternatives to Prescription Medications",
    excerpt: "Compare the effectiveness of ashwagandha, valerian, and passionflower vs. prescription anti-anxiety drugs. Evidence-based guide with dosages.",
    slug: "herbs-for-anxiety-natural-alternatives",
    author: "Dr. Sarah Chen",
    publishedAt: "2024-01-10",
    readTime: 8,
    category: "science",
    tags: ["anxiety", "herbs vs drugs", "ashwagandha", "prescription alternatives"]
  },
  {
    title: "Is Turmeric Safe During Pregnancy? Complete Safety Guide",
    excerpt: "Comprehensive safety information for using turmeric during pregnancy, including dosage recommendations, precautions, and expert guidance.",
    slug: "turmeric-pregnancy-safety-guide",
    author: "HerbScience Team",
    publishedAt: "2024-01-12",
    readTime: 6,
    category: "safety",
    tags: ["turmeric", "pregnancy safety", "herbal safety", "dosage guidance"]
  },
  {
    title: "Herbs for Insomnia: Science-Backed Natural Sleep Solutions",
    excerpt: "Explore the scientific evidence for sleep-promoting herbs like valerian, chamomile, and passionflower. Learn how to safely and effectively improve sleep quality.",
    slug: "herbs-for-sleep-insomnia",
    author: "Dr. Michael Lee",
    publishedAt: "2024-01-08",
    readTime: 10,
    category: "wellness",
    tags: ["insomnia", "sleep herbs", "valerian", "chamomile", "natural sleep aids"]
  },
  {
    title: "Ginseng vs Coffee: Scientific Comparison for Energy Boost",
    excerpt: "Deep dive into the energy-boosting mechanisms of ginseng vs coffee. Discover which option suits your lifestyle and constitution better.",
    slug: "ginseng-vs-coffee-energy",
    author: "Dr. Emily Wang",
    publishedAt: "2024-01-05",
    readTime: 7,
    category: "lifestyle",
    tags: ["ginseng", "coffee", "energy boost", "adaptogenic herbs", "comparative research"]
  }
]

export default function RelatedArticles({ currentSlug, category, tags = [] }: RelatedArticlesProps) {
  // 筛选相关文章（排除当前文章）
  const relatedArticles = staticArticles
    .filter(article => article.slug !== currentSlug)
    .sort((a, b) => {
      // 优先推荐同类别的文章
      const aScore = (a.category === category ? 2 : 0) + 
                     a.tags.filter(tag => tags.includes(tag)).length
      const bScore = (b.category === category ? 2 : 0) + 
                     b.tags.filter(tag => tags.includes(tag)).length
      return bScore - aScore
    })
    .slice(0, 3) // 只显示前3篇

  if (relatedArticles.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Recommended Reading
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Related articles you might find interesting
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 hover:shadow-lg"
          >
            <div className="p-6">
              {/* 类别标签 */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {article.category}
                </span>
              </div>

              {/* 标题 */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-3 line-clamp-2">
                {article.title}
              </h3>

              {/* 摘要 */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              {/* 元信息 */}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {article.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(article.publishedAt).toLocaleDateString('en-US')}
                  </span>
                </div>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime} min
                </span>
              </div>

              {/* 阅读更多 */}
              <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                <span className="text-sm font-medium">Read more</span>
                <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 查看更多文章 */}
      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium"
        >
          <span>View All Articles</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </section>
  )
}