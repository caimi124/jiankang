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
      title: "Turmeric Made Simple: How to Use It Today for Real Gut Relief and Pain Reduction",
      excerpt: "Feeling bloated, achy, or tired? Discover how turmeric can help calm your gut, reduce inflammation, and boost your energy.",
      category: "lifestyle",
      author: "HerbScience Team", 
      date: "2025-01-19",
      readTime: "8 min read",
      image: "🌿",
      featured: true,
      slug: "turmeric-gut-relief-guide",
      tags: ["turmeric benefits", "gut health", "natural pain relief", "inflammation"]
    },
    {
      id: 2,
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
      id: 3,
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
    // High-traffic SEO optimized articles
    {
      id: 3,
      title: "Best Herbs for Anxiety: Natural Alternatives to Prescription Medications",
      excerpt: "Compare the effectiveness of ashwagandha, valerian, and passionflower vs. prescription anti-anxiety drugs. Evidence-based guide with dosages.",
      category: "research",
      author: "Dr. Sarah Chen",
      date: "2024-01-10",
      readTime: "8 min read",
      image: "🧠",
      slug: "herbs-for-anxiety-natural-alternatives",
      tags: ["anxiety", "herbs vs drugs", "ashwagandha", "prescription alternatives"]
    },
    {
      id: 4,
      title: "Is Turmeric Safe During Pregnancy? Complete Safety Guide",
      excerpt: "Everything expecting mothers need to know about turmeric and curcumin supplementation, including trimester-specific recommendations.",
      category: "safety",
      author: "Dr. Michael Rodriguez",
      date: "2024-01-08",
      readTime: "6 min read",
      image: "🤰",
      tags: ["turmeric pregnancy", "curcumin safety", "pregnancy herbs", "expecting mothers"]
    },
    {
      id: 5,
      title: "Best Herbs for Sleep: What Actually Works for Insomnia",
      excerpt: "Scientific comparison of valerian, chamomile, passionflower, and melatonin. Which sleep herbs have the strongest evidence?",
      category: "lifestyle",
      author: "Dr. Sarah Chen",
      date: "2024-01-06",
      readTime: "7 min read",
      image: "🌙",
      tags: ["herbs for sleep", "insomnia", "valerian vs melatonin", "natural sleep aids"]
    },
    {
      id: 6,
      title: "Ginseng vs. Coffee: Which is Better for Energy and Focus?",
      excerpt: "Head-to-head comparison of ginseng and caffeine for mental energy, with pros, cons, and ideal use cases for each.",
      category: "lifestyle",
      author: "Dr. Michael Rodriguez",
      date: "2024-01-04",
      readTime: "5 min read",
      image: "⚡",
      tags: ["ginseng vs coffee", "natural energy", "focus supplements", "caffeine alternatives"]
    },
    {
      id: 7,
      title: "Herbs for Women's Health: Hormonal Balance and Menstrual Support",
      excerpt: "Evidence-based guide to chasteberry, evening primrose, and other herbs for PMS, irregular periods, and hormone balance.",
      category: "lifestyle",
      author: "Dr. Lisa Zhang",
      date: "2024-01-02",
      readTime: "9 min read",
      image: "🌸",
      tags: ["women's health", "hormonal balance", "menstrual herbs", "PMS relief"]
    },
    {
      id: 8,
      title: "Herbs for Brain Health: Memory, Focus, and Cognitive Protection",
      excerpt: "Complete guide to nootropic herbs: ginkgo, bacopa, lion's mane, and rhodiola for memory enhancement and brain protection.",
      category: "research",
      author: "Dr. Sarah Chen",
      date: "2023-12-30",
      readTime: "10 min read",
      image: "🧬",
      tags: ["brain health", "memory herbs", "cognitive enhancement", "nootropics"]
    },
    {
      id: 9,
      title: "Are Herbal Supplements FDA Approved? Regulation Guide 2024",
      excerpt: "Understanding supplement regulations, what FDA approval means for herbs, and how to choose quality products.",
      category: "safety",
      author: "Dr. Michael Rodriguez",
      date: "2023-12-28",
      readTime: "6 min read",
      image: "🏛️",
      tags: ["FDA approval", "supplement regulation", "quality standards", "herb safety"]
    },
    {
      id: 10,
      title: "Herbs for Immunity: Boost Your Immune System Naturally",
      excerpt: "Research-backed immune herbs: echinacea, elderberry, astragalus, and medicinal mushrooms. When and how to use them effectively.",
      category: "traditional",
      author: "Dr. Lisa Zhang",
      date: "2023-12-26",
      readTime: "8 min read",
      image: "🛡️",
      tags: ["immune herbs", "echinacea", "elderberry", "immune support"]
    },
    {
      id: 11,
      title: "Herbs vs. Prescription Drugs: Safety, Effectiveness, and Cost Comparison",
      excerpt: "Honest comparison of herbal medicine vs. pharmaceutical drugs for common conditions, including benefits, risks, and costs.",
      category: "research",
      author: "Dr. Sarah Chen",
      date: "2023-12-24",
      readTime: "12 min read",
      image: "⚖️",
      tags: ["herbs vs drugs", "natural vs pharmaceutical", "treatment comparison", "healthcare costs"]
    },
    {
      id: 12,
      title: "Digestive Health Herbs: Natural Remedies for Gut Issues",
      excerpt: "Traditional and modern herbs for IBS, bloating, acid reflux, and digestive wellness. Evidence-based dosing and combinations.",
      category: "traditional",
      author: "Dr. Lisa Zhang",
      date: "2023-12-22",
      readTime: "7 min read",
      image: "🫶",
      tags: ["digestive herbs", "gut health", "IBS herbs", "stomach remedies"]
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