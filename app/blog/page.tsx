'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { Calendar, User, Tag, ArrowRight, Search, Filter } from 'lucide-react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'research', name: 'Latest Research', count: 8 },
    { id: 'safety', name: 'Safety & Interactions', count: 6 },
    { id: 'traditional', name: 'Traditional Medicine', count: 5 },
    { id: 'lifestyle', name: 'Lifestyle & Wellness', count: 5 }
  ]

  const featuredArticles = [
    {
      id: 1,
      title: "Breakthrough Research: Turmeric and Curcumin Show Promise in Alzheimer's Prevention",
      excerpt: "New clinical trials demonstrate significant cognitive benefits from standardized curcumin supplementation in adults over 50.",
      category: "research",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "🧠",
      featured: true,
      tags: ["turmeric", "alzheimer's", "cognitive health", "clinical trial"]
    },
    {
      id: 2,
      title: "Hidden Dangers: 5 Popular Herb-Medication Combinations to Avoid",
      excerpt: "Essential safety information about dangerous interactions between common herbal supplements and prescription medications.",
      category: "safety",
      author: "Dr. Michael Rodriguez",
      date: "2024-01-12",
      readTime: "7 min read",
      image: "⚠️",
      featured: true,
      tags: ["drug interactions", "safety", "blood thinners", "diabetes"]
    }
  ]

  const articles = [
    {
      id: 3,
      title: "Winter Immunity: Traditional Chinese Medicine Approaches to Cold Prevention",
      excerpt: "Learn time-tested TCM strategies and herb combinations to strengthen your immune system during cold season.",
      category: "traditional",
      author: "Lisa Zhang",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "❄️",
      tags: ["immunity", "winter", "TCM", "prevention"]
    },
    {
      id: 4,
      title: "Adaptogens Explained: Scientific Evidence Behind Stress-Fighting Herbs",
      excerpt: "A comprehensive review of adaptogenic herbs like ashwagandha, rhodiola, and holy basil, with research-backed benefits.",
      category: "research",
      author: "Dr. Sarah Chen",
      date: "2024-01-08",
      readTime: "8 min read",
      image: "🌿",
      tags: ["adaptogens", "stress", "cortisol", "research"]
    },
    {
      id: 5,
      title: "Sleep Naturally: Herb Combinations That Actually Work",
      excerpt: "Evidence-based guide to herbal sleep aids, including dosing, timing, and which combinations are most effective.",
      category: "lifestyle",
      author: "Dr. Michael Rodriguez",
      date: "2024-01-05",
      readTime: "6 min read",
      image: "🌙",
      tags: ["sleep", "insomnia", "valerian", "melatonin"]
    },
    {
      id: 6,
      title: "FDA Updates on Herbal Supplements: What Consumers Need to Know",
      excerpt: "Recent regulatory changes affecting herbal supplement labeling, quality standards, and consumer protections.",
      category: "safety",
      author: "Dr. Sarah Chen",
      date: "2024-01-03",
      readTime: "5 min read",
      image: "🏛️",
      tags: ["FDA", "regulation", "quality", "labeling"]
    },
    {
      id: 7,
      title: "Digestive Health: Eastern and Western Approaches to Gut Wellness",
      excerpt: "Comparing traditional digestive remedies with modern probiotics and their combined benefits for gut health.",
      category: "traditional",
      author: "Lisa Zhang",
      date: "2024-01-01",
      readTime: "7 min read",
      image: "🫶",
      tags: ["digestion", "gut health", "probiotics", "TCM"]
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
              {featuredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-8">
                    <div className="text-4xl mb-4">{article.image}</div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm capitalize">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{article.author}</span>
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{article.date}</span>
                      </div>
                      <button className="text-green-600 hover:text-green-700 flex items-center space-x-1">
                        <span className="text-sm font-medium">Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
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
                <div key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="text-3xl mb-3">{article.image}</div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs capitalize">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {article.author} • {article.date}
                      </div>
                      <button className="text-green-600 hover:text-green-700">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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