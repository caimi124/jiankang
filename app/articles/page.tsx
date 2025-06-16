'use client'

import { useState } from 'react'
import Link from 'next/link'
import Breadcrumb from '../../components/Breadcrumb'
import SmartSearch from '../../components/SmartSearch'
import { Calendar, Clock, Tag, TrendingUp, BookOpen, Eye } from 'lucide-react'

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  readTime: number
  category: string
  tags: string[]
  featured: boolean
  views: number
  slug: string
}

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'herbs', name: 'Herb Profiles', count: 8 },
    { id: 'research', name: 'Research Studies', count: 6 },
    { id: 'safety', name: 'Safety & Interactions', count: 5 },
    { id: 'dosage', name: 'Dosage Guides', count: 3 },
    { id: 'conditions', name: 'Health Conditions', count: 2 }
  ]

  const mockArticles: Article[] = [
    {
      id: '1',
      title: 'Ashwagandha: The Complete Scientific Guide to Benefits and Dosage',
      excerpt: 'Comprehensive review of ashwagandha\'s stress-reducing properties, optimal dosing, and clinical evidence.',
      content: '',
      author: 'Dr. Sarah Chen',
      publishDate: '2024-01-15',
      readTime: 8,
      category: 'herbs',
      tags: ['Ashwagandha', 'Stress Relief', 'Adaptogens'],
      featured: true,
      views: 15420,
      slug: 'ashwagandha-complete-guide'
    },
    {
      id: '2',
      title: 'Turmeric and Black Pepper: Why This Combination Works',
      excerpt: 'Scientific explanation of how piperine enhances curcumin absorption by up to 2000%.',
      content: '',
      author: 'Prof. Michael Rodriguez',
      publishDate: '2024-01-10',
      readTime: 6,
      category: 'research',
      tags: ['Turmeric', 'Bioavailability', 'Inflammation'],
      featured: true,
      views: 12350,
      slug: 'turmeric-black-pepper-combination'
    },
    {
      id: '3',
      title: 'Herb-Drug Interactions: What You Need to Know',
      excerpt: 'Essential safety information about common herbal supplements and prescription medications.',
      content: '',
      author: 'Dr. Jennifer Liu',
      publishDate: '2024-01-08',
      readTime: 10,
      category: 'safety',
      tags: ['Drug Interactions', 'Safety', 'Contraindications'],
      featured: false,
      views: 8930,
      slug: 'herb-drug-interactions-guide'
    },
    {
      id: '4',
      title: 'Rhodiola vs Ginseng: Choosing the Right Adaptogen',
      excerpt: 'Detailed comparison of two powerful adaptogens for energy, stress, and cognitive function.',
      content: '',
      author: 'Dr. Sarah Chen',
      publishDate: '2024-01-05',
      readTime: 7,
      category: 'herbs',
      tags: ['Rhodiola', 'Ginseng', 'Adaptogens', 'Energy'],
      featured: false,
      views: 6740,
      slug: 'rhodiola-vs-ginseng-comparison'
    },
    {
      id: '5',
      title: 'Starting Herbal Supplements: A Beginner\'s Safety Guide',
      excerpt: 'Step-by-step guide for safely introducing herbal supplements into your wellness routine.',
      content: '',
      author: 'Dr. Michael Torres',
      publishDate: '2024-01-03',
      readTime: 9,
      category: 'dosage',
      tags: ['Beginner Guide', 'Safety', 'Dosage'],
      featured: false,
      views: 5210,
      slug: 'beginners-herbal-supplement-guide'
    },
    {
      id: '6',
      title: 'Natural Anxiety Relief: Evidence-Based Herbal Options',
      excerpt: 'Scientific review of herbs with proven anxiety-reducing effects and their mechanisms of action.',
      content: '',
      author: 'Dr. Lisa Park',
      publishDate: '2024-01-01',
      readTime: 12,
      category: 'conditions',
      tags: ['Anxiety', 'Mental Health', 'Clinical Evidence'],
      featured: false,
      views: 9840,
      slug: 'natural-anxiety-relief-herbs'
    }
  ]

  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const featuredArticles = mockArticles.filter(article => article.featured)

  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Articles' }]} />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            📚 Herbal Knowledge Articles
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Evidence-based articles about herbal supplements, research findings, and practical guidance from healthcare professionals.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <SmartSearch 
              placeholder="Search articles by herb, condition, or topic..."
              onSearch={(query) => setSearchQuery(query)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {selectedCategory === 'all' && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div key={article.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    <Link href={`/articles/${article.slug}`} className="hover:text-blue-600 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime} min read
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      By {article.author}
                    </span>
                    <Link 
                      href={`/articles/${article.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <BookOpen className="w-8 h-8 text-gray-700 mr-3" />
            {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.name}`}
          </h2>
          
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                        {article.category}
                      </span>
                      {article.featured && (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      <Link href={`/articles/${article.slug}`} className="hover:text-blue-600 transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(article.publishDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime} min
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {article.author}
                      </span>
                      <Link 
                        href={`/articles/${article.slug}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest Research
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get weekly updates on new articles, research findings, and herbal supplement insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No spam, unsubscribe anytime. Read our privacy policy.
          </p>
        </div>
      </section>
    </main>
  )
} 