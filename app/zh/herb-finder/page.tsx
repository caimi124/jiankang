'use client'

import { useState } from 'react'
import Header from '../../../components/Header'
import Breadcrumbs from '../../../components/Breadcrumbs'
import SmartSearch from '../../../components/SmartSearch'
import { LoadingSpinner, CardSkeleton } from '../../../components/LoadingSpinner'
import { searchHerbsBySymptom, convertHerbsToResults, advancedSearch } from '../../../lib/herbs-data'

interface HerbResult {
  id: string
  name: string
  chineseName: string
  scientificName: string
  category: string
  uses: string[]
  briefDescription: string
  safety: 'high' | 'medium' | 'low'
  evidence: 'strong' | 'moderate' | 'limited'
  composition: string
  dosage: string
  precautions: string
  tcmConstitution: string
  caseStudy: string
  usageRecommendations: string
  detailedDescription?: string
  imageUrl?: string
}

export default function ZhHerbFinder() {
  const [searchResults, setSearchResults] = useState<HerbResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const breadcrumbItems = [
    { label: '工具', href: '/zh/tools', icon: '🔧' },
    { label: '草药查找器', icon: '🔍' }
  ]

  const handleSearch = async (query: string, filters: any) => {
    setLoading(true)
    setHasSearched(true)
    
    // 模拟API延迟，然后使用真实数据
    setTimeout(() => {
      try {
        // 使用真实的草药数据搜索
        const herbs = searchHerbsBySymptom(query)
        const results = convertHerbsToResults(herbs) as HerbResult[]
        
        // 如果没有结果，返回所有草药的前5个作为推荐
        const finalResults = results.length > 0 ? results : convertHerbsToResults(
          advancedSearch({ limit: 5 })
        ) as HerbResult[]
        
        setSearchResults(finalResults)
      } catch (error) {
        console.error('搜索错误:', error)
        setSearchResults([])
      }
      setLoading(false)
    }, 800)
  }

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case 'high': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getEvidenceColor = (evidence: string) => {
    switch (evidence) {
      case 'strong': return 'text-blue-600 bg-blue-100'
      case 'moderate': return 'text-purple-600 bg-purple-100'
      case 'limited': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSafetyLabel = (safety: string) => {
    switch (safety) {
      case 'high': return '高安全性'
      case 'medium': return '中等安全性'
      case 'low': return '低安全性'
      default: return '未知'
    }
  }

  const getEvidenceLabel = (evidence: string) => {
    switch (evidence) {
      case 'strong': return '强证据'
      case 'moderate': return '中等证据'
      case 'limited': return '有限证据'
      default: return '未知'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 统一标题栏 */}
      <Header />
      
      {/* 页面内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🔍 草药查找器
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            输入您的症状或健康目标，发现可能有帮助的草药。所有推荐都基于传统使用和现代科学研究。
          </p>
        </div>

        {/* 搜索区域 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              您希望改善什么健康问题？
            </h2>
            
            <SmartSearch
              placeholder="输入症状、健康目标或草药名称..."
              onSearch={handleSearch}
            />
            
            {/* 热门搜索 */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3">热门搜索:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  '缓解焦虑',
                  '改善睡眠',
                  '关节疼痛',
                  '消化问题',
                  '免疫支持',
                  '提升能量',
                  '压力管理',
                  '认知功能',
                  '抗炎',
                  '肝脏保护'
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term, {})}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-green-100 hover:text-green-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">正在搜索我们的综合草药数据库...</p>
            </div>
            <CardSkeleton count={3} />
          </div>
        )}

        {/* 搜索结果 */}
        {!loading && hasSearched && searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                为您找到 {searchResults.length} 种草药
              </h3>
              <div className="text-sm text-gray-600">
                按相关性排序
              </div>
            </div>

            <div className="space-y-6">
              {searchResults.map((herb) => (
                <div
                  key={herb.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-xl font-semibold text-gray-900 mr-2">
                          {herb.chineseName}
                        </h4>
                        <span className="text-lg text-gray-600 mr-4">
                          {herb.name}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(herb.safety)}`}>
                          {getSafetyLabel(herb.safety)}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getEvidenceColor(herb.evidence)}`}>
                          {getEvidenceLabel(herb.evidence)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 italic mb-2">{herb.scientificName}</p>
                      <p className="text-gray-700 mb-3">{herb.briefDescription}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">主要功效:</p>
                          <div className="flex flex-wrap gap-2">
                            {herb.uses.map((use, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs"
                              >
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">主要成分:</p>
                          <p className="text-sm text-gray-700">{herb.composition}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">推荐剂量:</p>
                          <p className="text-sm text-gray-700">{herb.dosage}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">适宜体质:</p>
                          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                            {herb.tcmConstitution}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-600 mb-1">使用建议:</p>
                        <p className="text-sm text-gray-700">{herb.usageRecommendations}</p>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-600 mb-1">注意事项:</p>
                        <p className="text-sm text-orange-600">{herb.precautions}</p>
                      </div>
                      
                      {herb.caseStudy && (
                        <div className="bg-gray-50 rounded-lg p-4 mt-4">
                          <p className="text-sm font-medium text-gray-600 mb-2">临床案例:</p>
                          <p className="text-sm text-gray-700">{herb.caseStudy}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 无搜索结果 */}
        {!loading && hasSearched && searchResults.length === 0 && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-md p-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                未找到相关草药
              </h3>
              <p className="text-gray-600 mb-6">
                请尝试使用不同的关键词搜索，或者浏览我们的热门搜索建议。
              </p>
              <button
                onClick={() => handleSearch('', {})}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                浏览所有草药
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 