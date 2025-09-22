'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { Calendar, User, Tag, ArrowRight, Search, Filter } from 'lucide-react'
import { getAllBlogPosts, getFeaturedBlogPosts, getBlogCategories, staticBlogData } from '../../lib/sanity.js'
import Link from 'next/link'

export default function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState([])
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBlogData() {
      try {
        setLoading(true)

        // Try to fetch from Sanity first, fallback to static data
        const [allPosts, featured, cats] = await Promise.all([
          getAllBlogPosts().catch(() => []),
          getFeaturedBlogPosts().catch(() => staticBlogData.featuredPosts),
          getBlogCategories().catch(() => staticBlogData.categories)
        ])

        setPosts(allPosts.length > 0 ? allPosts : staticArticles)
        setFeaturedPosts(featured.length > 0 ? featured : staticBlogData.featuredPosts)

        // Add "All Articles" option to categories
        const formattedCategories = [
          { id: 'all', name: 'All Articles', count: allPosts.length || staticArticles.length },
          ...cats.map(cat => ({
            id: cat.title,
            name: cat.title.charAt(0).toUpperCase() + cat.title.slice(1),
            count: cat.postCount,
            description: cat.description
          }))
        ]
        setCategories(formattedCategories)

      } catch (error) {
        console.error('Error loading blog data:', error)
        // Use static fallback
        setPosts(staticArticles)
        setFeaturedPosts(staticBlogData.featuredPosts)
        setCategories([
          { id: 'all', name: 'All Articles', count: 32 },
          { id: 'lifestyle', name: 'Lifestyle', count: 18, description: 'Practical guides for daily wellness and traditional wisdom' },
          { id: 'science', name: 'Science', count: 14, description: 'Research, safety studies, and evidence-based insights' }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadBlogData()
  }, [])

  // Static fallback articles (existing content)
  const staticArticles = [
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

  const filteredArticles = posts.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
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

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">Loading blog articles...</p>
            </div>
          )}

          {/* Featured Articles */}
          {!loading && (
            <>
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((article) => (
                    <div key={article._id || article.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-8">
                        <div className="text-4xl mb-4">🌿</div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm capitalize">
                            {article.category}
                          </span>
                          <span className="text-sm text-gray-500">{article.readTime} min read</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(article.tags || []).slice(0, 3).map((tag, index) => (
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
                          <Link
                            href={`/blog/${article.slug?.current || article.slug}`}
                            className="text-green-600 hover:text-green-700 flex items-center space-x-1"
                          >
                            <span className="text-sm font-medium">Read More</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Articles */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Recent Articles {selectedCategory !== 'all' && `(${selectedCategory})`}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <div key={article._id || article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6">
                        <div className="text-3xl mb-3">🌿</div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs capitalize">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500">{article.readTime} min read</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {(article.tags || []).slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              #{typeof tag === 'string' ? tag : tag.title || tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {article.author} • {new Date(article.publishedAt || article.date).toLocaleDateString()}
                          </div>
                          <Link
                            href={`/blog/${article.slug?.current || article.slug}`}
                            className="text-green-600 hover:text-green-700"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

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