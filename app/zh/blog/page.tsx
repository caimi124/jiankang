'use client'

import React from 'react'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { blogPosts } from '../../../lib/blog-data'

export default function Blog() {
  // 从Notion获取的中文博客数据
  const chinesePosts = blogPosts.filter(post => 
    post.category === '科学研究' || 
    post.category === '季节养生' || 
    post.category === '草药科普' || 
    post.category === '购买指南' ||
    post.title.includes('中') || 
    post.title.includes('姜黄的神奇功效')
  )
  
  const featuredArticles = chinesePosts.slice(0, 3).map(article => ({
    ...article,
    id: article.id,
    date: article.publishDate,
    image: '/api/placeholder/600/400'
  }))

  const recentArticles = chinesePosts.slice(3).map(article => ({
    ...article,
    id: article.id,
    date: article.publishDate
  }))

  const categories = [
    { name: '科学研究', count: 15, color: 'bg-blue-100 text-blue-800' },
    { name: '季节养生', count: 23, color: 'bg-green-100 text-green-800' },
    { name: '草药科普', count: 31, color: 'bg-purple-100 text-purple-800' },
    { name: '购买指南', count: 18, color: 'bg-orange-100 text-orange-800' },
    { name: '用药安全', count: 12, color: 'bg-red-100 text-red-800' },
    { name: '体质养生', count: 27, color: 'bg-yellow-100 text-yellow-800' }
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
                  <span className="text-lg font-bold text-purple-600 ml-2">126</span>
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
                <article key={article.id} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📰</div>
                      <div className="text-sm">{article.category}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{article.author}</span>
                      <span className="mx-2">·</span>
                      <span>{article.date}</span>
                      <span className="mx-2">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/zh/blog/${article.slug}`}>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                        阅读全文 →
                      </button>
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
              {categories.map((category, index) => (
                <button key={index} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${category.color}`}>
                    {category.name}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                  <div className="text-sm text-gray-600">篇文章</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              🔥 最新文章
            </h2>
            <div className="space-y-6">
              {recentArticles.map((article) => (
                <article key={article.id} className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-3">
                          {article.category}
                        </span>
                        <span>{article.author}</span>
                        <span className="mx-2">·</span>
                        <span>{article.date}</span>
                        <span className="mx-2">·</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                        {article.title}
                      </h3>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                        阅读
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
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
              {[
                '姜黄', '人参', '洋甘菊', '生姜', '甘草', '紫锥菊',
                '冬季养生', '免疫力', '抗炎', '消化健康', '睡眠质量',
                '中医体质', '现代化研究', '安全用药', '营养科普'
              ].map((tag, index) => (
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