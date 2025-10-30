'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Breadcrumb from '@/components/Breadcrumb'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  readTime: number
  featured?: boolean
  author: string | { name: string }
  category: string | { title: string }
  tags: string[] | { title: string }[]
  featured_image?: any
  seoTitle?: string
  seoDescription?: string
}

interface Category {
  _id: string
  title: string
  slug?: { current: string }
  description?: string
  postCount?: number
}

interface ZhBlogClientProps {
  initialPosts: BlogPost[]
  initialFeaturedPosts: BlogPost[]
  initialCategories: Category[]
}

export default function ZhBlogClient({
  initialPosts,
  initialFeaturedPosts,
  initialCategories
}: ZhBlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // 从博客文章中提取分类统计
  const categoryStats = initialCategories.length > 0 
    ? initialCategories 
    : [
        { _id: '1', title: '科学研究', postCount: initialPosts.filter(p => getCategoryTitle(p.category) === '科学研究').length },
        { _id: '2', title: '生活方式', postCount: initialPosts.filter(p => getCategoryTitle(p.category) === '生活方式').length },
        { _id: '3', title: '季节养生', postCount: 0 },
        { _id: '4', title: '草药科普', postCount: 0 },
        { _id: '5', title: '购买指南', postCount: 0 },
        { _id: '6', title: '用药安全', postCount: 0 },
        { _id: '7', title: '体质养生', postCount: 0 }
      ]

  // 辅助函数：安全获取作者名称
  const getAuthorName = (author: any): string => {
    if (typeof author === 'string') return author
    if (author && typeof author === 'object' && author.name) return author.name
    return 'HerbScience团队'
  }

  // 辅助函数：安全获取分类标题
  const getCategoryTitle = (category: any): string => {
    if (typeof category === 'string') return category
    if (category && typeof category === 'object' && category.title) return category.title
    return '未分类'
  }

  // 辅助函数：安全获取标签数组
  const getTags = (tags: any): string[] => {
    if (!Array.isArray(tags)) return []
    return tags.map(tag => {
      if (typeof tag === 'string') return tag
      if (tag && typeof tag === 'object' && tag.title) return tag.title
      return ''
    }).filter(Boolean)
  }

  // 格式化日期
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return dateString
    }
  }

  // 筛选文章
  const filteredPosts = selectedCategory
    ? initialPosts.filter(post => getCategoryTitle(post.category) === selectedCategory)
    : initialPosts

  // 精选文章（取前3篇）
  const featuredArticles = initialFeaturedPosts.length > 0 
    ? initialFeaturedPosts.slice(0, 3)
    : initialPosts.slice(0, 3)

  // 最新文章（除精选外的其他文章）
  const recentArticles = filteredPosts
    .filter(post => !featuredArticles.find(f => f._id === post._id))
    .slice(0, 4)

  // 热门标签
  const popularTags = [
    '姜黄', '人参', '洋甘菊', '生姜', '甘草', '紫锥菊',
    '冬季养生', '免疫力', '抗炎', '消化健康', '睡眠质量',
    '中医体质', '现代化研究', '安全用药', '营养科普'
  ]

  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: '博客' }
        ]} 
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                📖 草药知识博客
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                专业的草药知识分享平台，为您提供最新的草药研究资讯、养生知识和实用指南。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm text-gray-600">每周更新</span>
                  <span className="text-lg font-bold text-blue-600 ml-2">3-5篇</span>
                </div>
                <div className="bg-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm text-gray-600">专家作者</span>
                  <span className="text-lg font-bold text-green-600 ml-2">20+</span>
                </div>
                <div className="bg-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm text-gray-600">文章总数</span>
                  <span className="text-lg font-bold text-purple-600 ml-2">{initialPosts.length}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              🌟 精选文章
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <article key={article._id} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📰</div>
                      <div className="text-sm">{getCategoryTitle(article.category)}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{getAuthorName(article.author)}</span>
                      <span className="mx-2">·</span>
                      <span>{formatDate(article.publishedAt)}</span>
                      <span className="mx-2">·</span>
                      <span>{article.readTime}分钟阅读</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {getTags(article.tags).slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={`/zh/blog/${article.slug.current}`}
                      className="block w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      阅读全文 →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              📚 文章分类
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categoryStats.map((category) => (
                <button 
                  key={category._id} 
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.title ? null : category.title
                  )}
                  className={`p-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-center ${
                    selectedCategory === category.title 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                    selectedCategory === category.title
                      ? 'bg-white/20 text-white'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {category.title}
                  </div>
                  <div className="text-2xl font-bold">{category.postCount || 0}</div>
                  <div className="text-sm">篇文章</div>
                </button>
              ))}
            </div>
            {selectedCategory && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  清除筛选 ✕
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              🔥 {selectedCategory ? `${selectedCategory} - 文章列表` : '最新文章'}
            </h2>
            {recentArticles.length > 0 ? (
              <div className="space-y-6">
                {recentArticles.map((article) => (
                  <article key={article._id} className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-3">
                            {getCategoryTitle(article.category)}
                          </span>
                          <span>{getAuthorName(article.author)}</span>
                          <span className="mx-2">·</span>
                          <span>{formatDate(article.publishedAt)}</span>
                          <span className="mx-2">·</span>
                          <span>{article.readTime}分钟阅读</span>
                        </div>
                        <Link href={`/zh/blog/${article.slug.current}`}>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {getTags(article.tags).slice(0, 4).map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Link 
                          href={`/zh/blog/${article.slug.current}`}
                          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors block text-center"
                        >
                          阅读
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <p className="text-gray-600 text-lg mb-4">该分类下暂无文章</p>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  查看所有文章 →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                📧 订阅我们的newsletter
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                每周获取最新的草药知识和健康资讯，不错过任何重要信息
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="输入您的邮箱地址"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  立即订阅
                </button>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                我们承诺保护您的隐私，不会向第三方分享您的信息
              </p>
            </div>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              🏷️ 热门标签
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {popularTags.map((tag, index) => (
                <button
                  key={index}
                  className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

