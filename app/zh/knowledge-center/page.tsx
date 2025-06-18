import React from 'react'
import { Metadata } from 'next'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'

export const metadata: Metadata = {
  title: '知识中心 | HerbScience.shop',
  description: '全面的中草药知识库，包含详细的草药信息、研究文献和传统医学指导。',
  keywords: ['中草药知识', '草药信息', '传统医学', '研究文献', '草药百科'],
}

export default function KnowledgeCenter() {
  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: '知识中心' }
        ]} 
      />

      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              📚 知识中心
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              全面的中草药知识库，为您提供科学的草药信息、传统医学智慧和最新研究成果。
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-gray-600">草药条目</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2000+</div>
                  <div className="text-gray-600">研究文献</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100+</div>
                  <div className="text-gray-600">专家审核</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔍 搜索草药知识
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="搜索草药名称、功效或症状..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                搜索
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            🏷️ 草药分类
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: '消化健康', icon: '🌿', count: 87, color: 'from-green-500 to-emerald-500' },
              { name: '免疫支持', icon: '🛡️', count: 65, color: 'from-blue-500 to-cyan-500' },
              { name: '睡眠改善', icon: '😴', count: 42, color: 'from-purple-500 to-pink-500' },
              { name: '压力管理', icon: '🧘', count: 58, color: 'from-indigo-500 to-purple-500' },
              { name: '能量提升', icon: '⚡', count: 73, color: 'from-yellow-500 to-orange-500' },
              { name: '关节健康', icon: '🦴', count: 39, color: 'from-red-500 to-pink-500' }
            ].map((category, index) => (
              <div key={index} className="group bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.count} 种草药
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Herbs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            🌟 热门草药
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: '姜黄', english: 'Turmeric', uses: '抗炎、关节疼痛', safety: '高' },
              { name: '人参', english: 'Ginseng', uses: '补气养血、抗疲劳', safety: '高' },
              { name: '洋甘菊', english: 'Chamomile', uses: '促进睡眠、缓解焦虑', safety: '高' },
              { name: '生姜', english: 'Ginger', uses: '促进消化、抗炎', safety: '高' }
            ].map((herb, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {herb.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    herb.safety === '高' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    安全性: {herb.safety}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{herb.english}</p>
                <p className="text-gray-600 text-sm mb-4">{herb.uses}</p>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  查看详情
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Updates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            🔬 最新研究
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '姜黄素在炎症管理中的最新发现',
                date: '2024年12月',
                category: '炎症研究',
                summary: '最新研究表明姜黄素在慢性炎症治疗中具有显著效果...'
              },
              {
                title: '人参皂苷对认知功能的影响',
                date: '2024年11月',
                category: '认知健康',
                summary: '临床试验显示人参皂苷能有效改善记忆力和注意力...'
              },
              {
                title: '中医体质与草药个性化配方',
                date: '2024年10月',
                category: '个性化医学',
                summary: '基于个人体质的草药配方显示出更好的治疗效果...'
              }
            ].map((research, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {research.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-auto">
                    {research.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {research.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {research.summary}
                </p>
                <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
                  阅读全文 →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            开始您的草药学习之旅
          </h2>
          <p className="text-xl text-green-100 mb-8">
            订阅我们的专业通讯，每周获取最新的草药研究和健康指导
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="输入您的邮箱"
              className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
            />
            <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
              订阅
            </button>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
} 