'use client'

import { useState } from 'react'
import { Search, Filter, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

interface SearchFilters {
  symptoms: string[]
  userConditions: string[]
  constitution: string
  ageGroup: string
}

interface HerbResult {
  id: string
  name: string
  chineseName: string
  latinName: string
  briefDescription: string
  safetyLevel: 'high' | 'medium' | 'low'
  benefits: string[]
  contraindications: string[]
  slug: string
}

interface SafetyStatus {
  level: 'safe' | 'caution' | 'forbidden'
  message: string
}

export default function EnhancedHerbSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({
    symptoms: [],
    userConditions: [],
    constitution: '',
    ageGroup: ''
  })
  const [searchResults, setSearchResults] = useState<HerbResult[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])

  // 常见症状选项
  const commonSymptoms = [
    { id: 'insomnia', label: '失眠', icon: '😴' },
    { id: 'anxiety', label: '焦虑', icon: '😰' },
    { id: 'indigestion', label: '消化不良', icon: '🤢' },
    { id: 'cold', label: '感冒', icon: '🤧' },
    { id: 'joint-pain', label: '关节疼痛', icon: '🦴' },
    { id: 'fatigue', label: '疲劳', icon: '😴' },
    { id: 'headache', label: '头痛', icon: '🤕' },
    { id: 'stress', label: '压力', icon: '😣' }
  ]

  // 健康状况选项
  const healthConditions = [
    { id: 'pregnancy', label: '孕妇' },
    { id: 'hypertension', label: '高血压' },
    { id: 'diabetes', label: '糖尿病' },
    { id: 'liver-disease', label: '肝脏疾病' },
    { id: 'autoimmune', label: '自身免疫疾病' },
    { id: 'heart-disease', label: '心脏病' }
  ]

  // 执行搜索
  const performSearch = async () => {
    setLoading(true)
    try {
      // 构建搜索参数
      const params = new URLSearchParams()
      if (searchQuery) params.append('query', searchQuery)
      if (selectedSymptoms.length > 0) params.append('symptoms', selectedSymptoms.join(','))
      if (filters.userConditions.length > 0) params.append('conditions', filters.userConditions.join(','))
      if (filters.ageGroup) params.append('age', filters.ageGroup)

      // 调用搜索API
      const response = await fetch(`/api/herbs/enhanced-search?${params}`)
      const data = await response.json()

      if (data.success) {
        // 转换API结果为组件期望的格式
        const formattedResults: HerbResult[] = data.data.map((herb: any) => ({
          id: herb.id,
          name: herb.name,
          chineseName: herb.chineseName,
          latinName: herb.latinName,
          briefDescription: herb.briefDescription,
          safetyLevel: herb.safetyLevel,
          benefits: herb.effectCategories || [],
          contraindications: herb.contraindicationGroups || [],
          slug: herb.id // 使用id作为slug
        }))

        setSearchResults(formattedResults)
      } else {
        console.error('Search failed:', data.error)
        setSearchResults([])
      }
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  // 症状选择处理
  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  // 健康状况选择处理
  const toggleCondition = (conditionId: string) => {
    setFilters(prev => ({
      ...prev,
      userConditions: prev.userConditions.includes(conditionId)
        ? prev.userConditions.filter(id => id !== conditionId)
        : [...prev.userConditions, conditionId]
    }))
  }

  // 获取安全状态
  const getSafetyStatus = (herb: HerbResult): SafetyStatus => {
    const hasContraindication = herb.contraindications.some(contra =>
      filters.userConditions.some(condition => 
        condition.toLowerCase().includes(contra.toLowerCase()) ||
        contra.toLowerCase().includes(condition.toLowerCase())
      )
    )

    if (hasContraindication) {
      return { level: 'forbidden', message: '不适合您的健康状况' }
    }

    if (herb.safetyLevel === 'high') {
      return { level: 'safe', message: '对您来说是安全的' }
    }

    return { level: 'caution', message: '需要谨慎使用' }
  }

  // 搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 搜索标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🌿 智能草药搜索
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          根据症状找草药，智能安全检查，个性化推荐适合您的天然草药方案
        </p>
      </div>

      {/* 搜索表单 */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <form onSubmit={handleSearch} className="space-y-6">
          {/* 基础搜索 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索草药名称或输入您的症状..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* 症状快速选择 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🎯 选择您的症状
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {commonSymptoms.map(symptom => (
                <button
                  key={symptom.id}
                  type="button"
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{symptom.icon}</span>
                  <span className="text-sm font-medium">{symptom.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 健康状况选择 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 您的健康状况（重要：确保用药安全）
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {healthConditions.map(condition => (
                <label key={condition.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.userConditions.includes(condition.id)}
                    onChange={() => toggleCondition(condition.id)}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm">{condition.label}</span>
                </label>
              ))}
            </div>
            {filters.userConditions.length > 0 && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  ⚠️ 已选择健康状况，系统将进行安全检查并过滤不适合的草药
                </p>
              </div>
            )}
          </div>

          {/* 搜索按钮 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50"
          >
            {loading ? '搜索中...' : '🔍 智能搜索草药'}
          </button>
        </form>
      </div>

      {/* 搜索结果 */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            搜索结果 ({searchResults.length} 个草药)
          </h2>
          
          {searchResults.map(herb => {
            const safetyStatus = getSafetyStatus(herb)
            
            return (
              <div key={herb.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{herb.name}</h3>
                    <p className="text-gray-600">{herb.chineseName} ({herb.latinName})</p>
                  </div>
                  
                  {/* 安全状态指示器 */}
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    safetyStatus.level === 'safe' ? 'bg-green-100 text-green-800' :
                    safetyStatus.level === 'caution' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {safetyStatus.level === 'safe' && <CheckCircle className="w-4 h-4" />}
                    {safetyStatus.level === 'caution' && <AlertTriangle className="w-4 h-4" />}
                    {safetyStatus.level === 'forbidden' && <XCircle className="w-4 h-4" />}
                    {safetyStatus.message}
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{herb.briefDescription}</p>

                {/* 功效标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {herb.benefits.map((benefit, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-between items-center">
                  <Link
                    href={`/herbs/${herb.slug}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    查看详情
                  </Link>
                  
                  {safetyStatus.level === 'forbidden' && (
                    <span className="text-red-600 text-sm font-medium">
                      ⚠️ 不推荐使用
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 搜索提示 */}
      {searchResults.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌿</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            开始您的草药探索之旅
          </h3>
          <p className="text-gray-600">
            选择症状或输入草药名称开始搜索
          </p>
        </div>
      )}
    </div>
  )
} 