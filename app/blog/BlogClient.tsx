'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { Calendar, User, Tag, ArrowRight, Search, Filter } from 'lucide-react'
import { getAllBlogPosts, getFeaturedBlogPosts, getBlogCategories, staticBlogData } from '../../lib/sanity'
import Link from 'next/link'

// Static fallback articles (defined outside component)
const staticArticles = [
  {
    id: 1758713619586,
    title: "Why Personalized Herbal Supplements Work Better Than One-Size-Fits-All Herbal Remedies",
    excerpt: "Walk into any supplement store and you'll see shelves stacked with herbal capsules and teas. But why do some herbs work for you while others don't? Discover how constitution tests and body type assessments help you find safe herbal supplements that actually work.",
    category: "science",
    author: "Dr. Sarah Chen",
    publishedAt: "2024-01-15",
    readTime: 9,
    featured_image: null,
    slug: { current: "why-some-herbs-work-for-you-and-others-dont" },
    tags: ["personalized herbal supplements","herbal remedies","constitution test","body type test","safe herbal supplements","natural supplements","immune boosting herbs","stress relief herbs","herbs for focus and energy"]
  },
  {
    id: 3,
    title: "Best Herbs for Anxiety: Natural Alternatives to Prescription Medications",
    excerpt: "Compare the effectiveness of ashwagandha, valerian, and passionflower vs. prescription anti-anxiety drugs. Evidence-based guide with dosages.",
    category: "science",
    author: "Dr. Sarah Chen",
    publishedAt: "2024-01-10",
    readTime: 8,
    featured_image: null,
    slug: { current: "herbs-for-anxiety-natural-alternatives" },
    tags: ["anxiety", "herbs vs drugs", "ashwagandha", "prescription alternatives"]
  },
  {
    id: 4,
    title: "Is Turmeric Safe During Pregnancy? Complete Safety Guide",
    excerpt: "Everything expecting mothers need to know about turmeric and curcumin supplementation, including trimester-specific recommendations.",
    category: "science",
    author: "Dr. Michael Rodriguez",
    publishedAt: "2024-01-08",
    readTime: 6,
    featured_image: null,
    slug: { current: "turmeric-pregnancy-safety-guide" },
    tags: ["turmeric pregnancy", "curcumin safety", "pregnancy herbs", "expecting mothers"]
  },
  {
    id: 5,
    title: "Best Herbs for Sleep: What Actually Works for Insomnia",
    excerpt: "Scientific comparison of valerian, chamomile, passionflower, and melatonin. Which sleep herbs have the strongest evidence?",
    category: "lifestyle",
    author: "Dr. Sarah Chen",
    publishedAt: "2024-01-06",
    readTime: 7,
    featured_image: null,
    slug: { current: "herbs-for-sleep-insomnia" },
    tags: ["herbs for sleep", "insomnia", "valerian vs melatonin", "natural sleep aids"]
  }
]

interface BlogClientProps {
  initialPosts?: any[]
  initialFeaturedPosts?: any[]
  initialCategories?: any[]
}

export default function BlogClient({
  initialPosts,
  initialFeaturedPosts,
  initialCategories
}: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // 使用传入的数据，如果没有则使用静态fallback
  const [posts, setPosts] = useState<any[]>(
    initialPosts && initialPosts.length > 0 ? initialPosts : staticArticles
  )
  const [featuredPosts, setFeaturedPosts] = useState<any[]>(
    initialFeaturedPosts && initialFeaturedPosts.length > 0 ? initialFeaturedPosts : staticBlogData.featuredPosts
  )
  
  // 处理categories数据
  const processedCategories = initialCategories && initialCategories.length > 0
    ? [
        { id: 'all', name: 'All Articles', count: initialPosts?.length || 0 },
        ...initialCategories.map(cat => ({
          id: cat.title,
          name: cat.title.charAt(0).toUpperCase() + cat.title.slice(1),
          count: cat.postCount || 0,
          description: cat.description
        }))
      ]
    : [
        { id: 'all', name: 'All Articles', count: staticArticles.length },
        ...staticBlogData.categories.map(cat => ({
          id: cat.title,
          name: cat.title.charAt(0).toUpperCase() + cat.title.slice(1),
          count: cat.postCount || 0,
          description: cat.description
        }))
      ]
  
  const [categories, setCategories] = useState<any[]>(processedCategories)
  const [loading, setLoading] = useState(false)

  const filteredArticles = posts.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some((tag: any) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Health Blog', href: '/blog' }
            ]}
          />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Health & Wellness Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest research, safety updates, and expert insights on herbal supplements and natural health.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or herbs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((article) => (
                <Link 
                  key={article._id || article.id} 
                  href={`/blog/${article.slug?.current || article.slug}`}
                  className="group block h-full"
                >
                  <article className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer h-full">
                    <div className="p-8">
                      <div className="text-4xl mb-4">🌿</div>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm capitalize">
                          {article.category}
                        </span>
                        <span className="text-sm text-gray-500">{article.readTime} min read</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-green-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(article.tags || []).slice(0, 3).map((tag: any, index: number) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                            #{typeof tag === 'string' ? tag : tag.title || tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{article.author}</span>
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {new Date(article.publishedAt || article.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-green-600 group-hover:text-green-700 flex items-center space-x-2 group-hover:translate-x-2 transition-all">
                          <span className="text-sm font-semibold">阅读全文</span>
                          <ArrowRight className="w-5 h-5 group-hover:animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Articles {selectedCategory !== 'all' && `(${selectedCategory})`}
            </h2>
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 text-lg">No articles found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <Link
                    key={article._id || article.id}
                    href={`/blog/${article.slug?.current || article.slug}`}
                    className="group block h-full"
                  >
                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer h-full flex flex-col border-2 border-transparent hover:border-green-200">
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="text-3xl mb-3 animate-pulse">🌿</div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs capitalize">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500">{article.readTime} min read</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-green-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-1">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {(article.tags || []).slice(0, 3).map((tag: any, index: number) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              #{typeof tag === 'string' ? tag : tag.title || tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-xs text-gray-500">
                            {article.author} • {new Date(article.publishedAt || article.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center space-x-1 text-green-600 group-hover:text-green-700 group-hover:translate-x-2 transition-all font-medium">
                            <span className="text-sm">阅读更多</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Get the latest research, safety alerts, and health insights delivered to your inbox weekly.
              Join 10,000+ readers who trust our expert analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-green-200 text-xs mt-3">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}