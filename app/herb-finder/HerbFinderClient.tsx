'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { HerbCard } from '../../components/HerbRecommendations'
import HerbFinderFAQ from '../../components/HerbFinderFAQ'
import { 
  Search, 
  Filter, 
  Leaf, 
  ChevronDown,
  AlertCircle,
  RefreshCw,
  X,
  Star,
  Shield,
  Heart,
  Brain,
  Zap,
  Moon,
  Users,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  ChevronRight
} from 'lucide-react'
import type { Herb } from '../../lib/herbs-recommendation'

interface FilterState {
  constitution: string
  efficacy: string
  safety: string
  search: string
  category: string
  sortBy: string
}

// Enhanced popular search categories with more detailed info
const popularCategories = [
  { 
    icon: <Moon className="w-4 h-4" />, 
    label: 'Sleep & Relaxation', 
    description: '助眠安神',
    keywords: ['睡眠支持', '镇静安神', '情绪管理', 'sleep', 'relaxation', 'calm', '失眠', '焦虑'],
    color: 'from-indigo-500 to-purple-600'
  },
  { 
    icon: <Zap className="w-4 h-4" />, 
    label: 'Energy & Vitality', 
    description: '补气提神',
    keywords: ['能量提升', '补气养血', 'energy', 'vitality', 'boost', '疲劳', '虚弱'],
    color: 'from-orange-500 to-red-600'
  },
  { 
    icon: <Shield className="w-4 h-4" />, 
    label: 'Immune Support', 
    description: '免疫增强',
    keywords: ['免疫支持', 'immune', 'support', 'defense', '抵抗力', '预防'],
    color: 'from-green-500 to-emerald-600'
  },
  { 
    icon: <Heart className="w-4 h-4" />, 
    label: 'Digestive Health', 
    description: '消化调理',
    keywords: ['消化健康', 'digestive', 'stomach', 'gut', '胃病', '肠胃'],
    color: 'from-yellow-500 to-orange-600'
  },
  { 
    icon: <Brain className="w-4 h-4" />, 
    label: 'Mental Clarity', 
    description: '健脑益智',
    keywords: ['压力与焦虑', 'mental', 'focus', 'clarity', 'stress', 'anxiety', '记忆力', '专注'],
    color: 'from-blue-500 to-indigo-600'
  },
  { 
    icon: <Users className="w-4 h-4" />, 
    label: 'Women\'s Health', 
    description: '女性健康',
    keywords: ['女性健康', 'women', 'female', 'hormonal', '月经', '更年期'],
    color: 'from-pink-500 to-rose-600'
  }
]

// Enhanced sort options
const sortOptions = [
  { value: 'relevance', label: '相关度排序', icon: <Target className="w-4 h-4" /> },
  { value: 'quality', label: '质量评分', icon: <Award className="w-4 h-4" /> },
  { value: 'safety', label: '安全等级', icon: <Shield className="w-4 h-4" /> },
  { value: 'name', label: '名称排序', icon: <BookOpen className="w-4 h-4" /> },
  { value: 'popularity', label: '热门程度', icon: <TrendingUp className="w-4 h-4" /> }
]

export default function HerbFinderClient() {
  const [herbs, setHerbs] = useState<Herb[]>([])
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>('')
  
  const [filters, setFilters] = useState<FilterState>({
    constitution: '',
    efficacy: '',
    safety: '',
    search: '',
    category: '',
    sortBy: 'relevance'
  })

  // Initialize filters from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const initialFilters: FilterState = {
      constitution: urlParams.get('constitution') || '',
      efficacy: urlParams.get('efficacy') || '',
      safety: urlParams.get('safety') || '',
      search: urlParams.get('search') || '',
      category: urlParams.get('category') || '',
      sortBy: urlParams.get('sortBy') || 'relevance'
    }
    
    setFilters(initialFilters)
    
    // Show filters if any are set from URL
    if (Object.values(initialFilters).some(value => value !== '')) {
      setShowFilters(true)
    }
  }, [])

  const constitutionOptions = [
    '平和质', '气虚质', '阳虚质', '阴虚质', '痰湿质', 
    '湿热质', '血瘀质', '气郁质', '特禀质'
  ]

  const efficacyOptions = [
    '免疫支持', '消化健康', '肝脏健康', '呼吸系统', '镇静安神',
    '抗炎作用', '解毒支持', '补气养血', '止咳化痰', '能量提升',
    '情绪管理', '睡眠支持', '压力与焦虑', '记忆增强', '心血管健康'
  ]

  const safetyOptions = [
    { value: 'high', label: 'High Safety (高安全)', icon: <Shield className="w-4 h-4 text-green-600" /> },
    { value: 'medium', label: 'Moderate Safety (中等安全)', icon: <Shield className="w-4 h-4 text-yellow-600" /> },
    { value: 'low', label: 'Use with Caution (谨慎使用)', icon: <AlertCircle className="w-4 h-4 text-red-600" /> }
  ]

  // 获取草药数据
  useEffect(() => {
    fetchHerbsData()
  }, [])

  // Enhanced search suggestions based on real herb data
  const generateSearchSuggestions = useMemo(() => {
    if (!filters.search || filters.search.length < 2) return []
    
    const searchLower = filters.search.toLowerCase()
    const suggestions = new Set<string>()
    
    herbs.forEach(herb => {
      // Add herb names
      if (herb.chinese_name.toLowerCase().includes(searchLower)) {
        suggestions.add(herb.chinese_name)
      }
      if (herb.english_name.toLowerCase().includes(searchLower)) {
        suggestions.add(herb.english_name)
      }
      
      // Add efficacy suggestions
      herb.efficacy.forEach(eff => {
        if (eff.toLowerCase().includes(searchLower)) {
          suggestions.add(eff)
        }
      })
      
      // Add symptom suggestions from descriptions
      const commonSymptoms = ['失眠', '焦虑', '疲劳', '消化不良', '头痛', '咳嗽', '感冒', '压力']
      commonSymptoms.forEach(symptom => {
        if (symptom.includes(searchLower) || herb.description.includes(symptom)) {
          suggestions.add(symptom)
        }
      })
    })
    
    return Array.from(suggestions).slice(0, 8)
  }, [herbs, filters.search])

  useEffect(() => {
    setSearchSuggestions(generateSearchSuggestions)
    setShowSuggestions(generateSearchSuggestions.length > 0 && filters.search.length >= 2)
  }, [generateSearchSuggestions, filters.search])

  // Enhanced search with fuzzy matching and multiple fields
  const applyFilters = useCallback(() => {
    let filtered = [...herbs]

    // Search filter with enhanced matching
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase().trim()
      filtered = filtered.filter(herb => {
        const searchIn = [
          herb.chinese_name,
          herb.english_name,
          herb.latin_name || '',
          herb.description,
          ...(herb.efficacy || []),
          ...(herb.symptoms || [])
        ].join(' ').toLowerCase()
        
        return searchIn.includes(searchTerm)
      })
    }

    // Constitution filter
    if (filters.constitution) {
      filtered = filtered.filter(herb => 
        herb.constitution_match && 
        herb.constitution_match.includes(filters.constitution)
      )
    }

    // Efficacy filter
    if (filters.efficacy) {
      filtered = filtered.filter(herb => 
        herb.efficacy && herb.efficacy.includes(filters.efficacy)
      )
    }

    // Safety filter
    if (filters.safety) {
      filtered = filtered.filter(herb => herb.safety_level === filters.safety)
    }

    // Category filter
    if (filters.category) {
      const categoryKeywords = popularCategories
        .find(cat => cat.label === filters.category)?.keywords || []
      
      filtered = filtered.filter(herb => {
        const herbContent = [
          ...herb.efficacy,
          herb.description,
          ...(herb.symptoms || [])
        ].join(' ').toLowerCase()
        
        return categoryKeywords.some(keyword => 
          herbContent.includes(keyword.toLowerCase())
        )
      })
    }

    // Sorting
    switch (filters.sortBy) {
      case 'quality':
        filtered.sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0))
        break
      case 'safety':
        const safetyOrder = { 'high': 3, 'medium': 2, 'low': 1 }
        filtered.sort((a, b) => 
          (safetyOrder[b.safety_level as keyof typeof safetyOrder] || 0) - 
          (safetyOrder[a.safety_level as keyof typeof safetyOrder] || 0)
        )
        break
      case 'name':
        filtered.sort((a, b) => a.chinese_name.localeCompare(b.chinese_name))
        break
      case 'popularity':
        filtered.sort((a, b) => (b.popularity_score || 0) - (a.popularity_score || 0))
        break
      default: // relevance
        // Keep current order for relevance
        break
    }

    setFilteredHerbs(filtered)
  }, [herbs, filters])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  // 获取草药数据
  const fetchHerbsData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      console.log('🔍 Fetching herbs data...')
      const response = await fetch('/api/herbs/data')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📊 API Response:', data)
      
      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ Loaded ${data.data.length} herbs`)
        setHerbs(data.data)
        setFilteredHerbs(data.data)
      } else {
        console.error('❌ Invalid data format:', data)
        setError('数据格式错误')
      }
    } catch (error) {
      console.error('❌ Failed to fetch herbs:', error)
      setError('无法加载草药数据，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    // Update URL with new filters
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
  }

  const handleCategorySelect = (categoryLabel: string) => {
    handleFilterChange('category', categoryLabel)
    setActiveFilter('category')
  }

  const handleSearchSuggestionSelect = (suggestion: string) => {
    handleFilterChange('search', suggestion)
    setShowSuggestions(false)
  }

  const clearFilters = () => {
    const clearedFilters = {
      constitution: '',
      efficacy: '',
      safety: '',
      search: '',
      category: '',
      sortBy: 'relevance'
    }
    setFilters(clearedFilters)
    setActiveFilter('')
    
    // Clear URL parameters
    window.history.replaceState({}, '', window.location.pathname)
  }

  const refreshData = () => {
    fetchHerbsData()
  }

  const activeFilterCount = Object.values(filters).filter(v => v && v !== 'relevance').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Herb Finder', href: '/herb-finder' }
            ]} 
          />

          {/* SEO-Enhanced Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🌿 Herbal Remedy Database
              <span className="block text-green-600 text-lg md:text-xl font-normal mt-2">
                Find Natural Solutions for Your Health
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover evidence-based herbal remedies from our comprehensive database of 500+ medicinal herbs. 
              Search by symptoms, health conditions, or Traditional Chinese Medicine constitution type to find 
              natural solutions backed by centuries of traditional wisdom and modern scientific research.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Medicinal Herbs</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-600">2000+</div>
                <div className="text-sm text-gray-600">Studies Referenced</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-600">9</div>
                <div className="text-sm text-gray-600">TCM Constitutions</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-emerald-600">24/7</div>
                <div className="text-sm text-gray-600">AI Guidance</div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索草药、症状或功效... (如：失眠、人参、补气)"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>
              
              {/* Search Suggestions */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 max-h-48 overflow-y-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSuggestionSelect(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <span className="text-gray-900">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-center">🎯 Popular Health Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {popularCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategorySelect(category.label)}
                    className={`group relative overflow-hidden rounded-xl p-4 text-white transition-all duration-300 hover:scale-105 ${
                      filters.category === category.label ? 'ring-2 ring-white' : ''
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})`
                    }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      {category.icon}
                    </div>
                    <div className="text-xs font-medium text-center">
                      {category.label}
                    </div>
                    <div className="text-xs text-center opacity-80 mt-1">
                      {category.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>高级筛选</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                {activeFilterCount > 0 && (
                  <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-3">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    <X className="h-4 w-4" />
                    <span>清除筛选</span>
                  </button>
                )}
                
                <button
                  onClick={refreshData}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>刷新</span>
                </button>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Constitution Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">体质类型</label>
                    <select
                      value={filters.constitution}
                      onChange={(e) => handleFilterChange('constitution', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                    >
                      <option value="">所有体质</option>
                      {constitutionOptions.map((constitution) => (
                        <option key={constitution} value={constitution}>
                          {constitution}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Efficacy Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">功效类别</label>
                    <select
                      value={filters.efficacy}
                      onChange={(e) => handleFilterChange('efficacy', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                    >
                      <option value="">所有功效</option>
                      {efficacyOptions.map((efficacy) => (
                        <option key={efficacy} value={efficacy}>
                          {efficacy}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Safety Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">安全等级</label>
                    <select
                      value={filters.safety}
                      onChange={(e) => handleFilterChange('safety', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                    >
                      <option value="">所有等级</option>
                      {safetyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">排序方式</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">搜索结果</h2>
                <p className="text-gray-600">
                  {isLoading ? '正在加载草药数据库...' : `找到 ${filteredHerbs.length} 个草药`}
                </p>
              </div>
              
              {!isLoading && filteredHerbs.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                    基于传统中医理论和现代研究
                  </span>
                </div>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <RefreshCw className="h-8 w-8 text-green-600 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">正在加载草药数据库</h3>
                <p className="text-gray-600">获取最新的草药信息中...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">加载失败</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={refreshData}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  重新加载
                </button>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !error && filteredHerbs.length === 0 && herbs.length > 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">没有找到匹配的草药</h3>
                <p className="text-gray-600 mb-4">
                  试试调整搜索条件或使用不同的关键词
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  清除所有筛选
                </button>
              </div>
            )}

            {/* Herbs Grid */}
            {!isLoading && !error && filteredHerbs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredHerbs.map((herb) => (
                  <HerbCard 
                    key={herb.id} 
                    herb={herb}
                    onClick={() => {
                      window.location.href = `/herbs/${herb.slug}`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* SEO Content - Evidence and FAQ */}
          {!isLoading && (
            <>
              {/* Evidence-Based Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🔬 Evidence-Based Recommendations</h3>
                  <p className="text-gray-600 mb-4">
                    Every herb in our database is backed by peer-reviewed research and traditional usage patterns. 
                    We combine ancient wisdom from Traditional Chinese Medicine with modern scientific validation 
                    to provide you with reliable, safe, and effective herbal guidance.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Over 2,000 scientific studies referenced</li>
                    <li>• Traditional usage patterns documented</li>
                    <li>• Safety profiles regularly updated</li>
                    <li>• Interaction warnings included</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🌱 Traditional Chinese Medicine Integration</h3>
                  <p className="text-gray-600 mb-4">
                    Our recommendations consider TCM principles including constitution types, organ systems, 
                    and energy patterns. This holistic approach ensures that herb recommendations align with 
                    your individual body type and health patterns for optimal therapeutic results.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Constitution-based matching</li>
                    <li>• Organ system considerations</li>
                    <li>• Energy pattern analysis</li>
                    <li>• Synergistic herb combinations</li>
                  </ul>
                </div>
              </div>

              {/* FAQ Section */}
              <HerbFinderFAQ />
            </>
          )}
        </div>
      </main>
    </div>
  )
} 