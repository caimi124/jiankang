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

    // Enhanced text search with fuzzy matching
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(herb => {
        // Exact matches get higher priority
        const exactMatch = herb.chinese_name.toLowerCase().includes(searchLower) ||
                          herb.english_name.toLowerCase().includes(searchLower) ||
                          herb.latin_name.toLowerCase().includes(searchLower)
        
        // Fuzzy matches in descriptions and efficacy
        const fuzzyMatch = herb.description.toLowerCase().includes(searchLower) ||
                          herb.efficacy.some(eff => eff.toLowerCase().includes(searchLower)) ||
                          herb.primary_effects.some(eff => eff.toLowerCase().includes(searchLower)) ||
                          herb.traditional_use.toLowerCase().includes(searchLower) ||
                          herb.modern_applications.toLowerCase().includes(searchLower) ||
                          herb.ingredients.some(ing => ing.toLowerCase().includes(searchLower))
        
        return exactMatch || fuzzyMatch
      })
    }

    // Category-based filtering with enhanced matching
    if (filters.category) {
      const category = popularCategories.find(cat => cat.label === filters.category)
      if (category) {
        filtered = filtered.filter(herb =>
          category.keywords.some(keyword =>
            herb.efficacy.some(eff => eff.toLowerCase().includes(keyword.toLowerCase())) ||
            herb.primary_effects.some(eff => eff.toLowerCase().includes(keyword.toLowerCase())) ||
            herb.description.toLowerCase().includes(keyword.toLowerCase()) ||
            herb.traditional_use.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      }
    }

    // Constitution filter
    if (filters.constitution) {
      filtered = filtered.filter(herb => 
        herb.constitution_type === filters.constitution
      )
    }

    // Efficacy filter  
    if (filters.efficacy) {
      filtered = filtered.filter(herb =>
        herb.efficacy.includes(filters.efficacy) ||
        herb.primary_effects.includes(filters.efficacy)
      )
    }

    // Safety filter
    if (filters.safety) {
      filtered = filtered.filter(herb => 
        herb.safety_level === filters.safety
      )
    }

    // Enhanced sorting with multiple criteria
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'quality':
          return (b.quality_score || 0) - (a.quality_score || 0)
        case 'safety':
          const safetyOrder = { 'high': 3, 'medium': 2, 'low': 1 }
          return (safetyOrder[b.safety_level as keyof typeof safetyOrder] || 0) - 
                 (safetyOrder[a.safety_level as keyof typeof safetyOrder] || 0)
        case 'name':
          return a.chinese_name.localeCompare(b.chinese_name, 'zh-CN')
        case 'popularity':
          return (b.popularity_score || 0) - (a.popularity_score || 0)
        case 'relevance':
        default:
          // Search relevance + quality + popularity combined
          const scoreA = (a.quality_score || 0) * 0.4 + (a.popularity_score || 0) * 0.3
          const scoreB = (b.quality_score || 0) * 0.4 + (b.popularity_score || 0) * 0.3
          
          // Boost exact search matches
          if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            const exactMatchA = a.chinese_name.toLowerCase().includes(searchLower) || a.english_name.toLowerCase().includes(searchLower)
            const exactMatchB = b.chinese_name.toLowerCase().includes(searchLower) || b.english_name.toLowerCase().includes(searchLower)
            
            if (exactMatchA && !exactMatchB) return -1
            if (exactMatchB && !exactMatchA) return 1
          }
          
          return scoreB - scoreA
      }
    })

    setFilteredHerbs(filtered)
  }, [herbs, filters])

  // 应用过滤器
  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const fetchHerbsData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // 首先尝试从Notion获取数据
      let response = await fetch('/api/herbs/notion?limit=100')
      let data = await response.json()
      
      if (data.success && data.data.length > 0) {
        // 转换Notion数据格式为本地格式
        const notionHerbs = data.data.map((notionHerb: any) => ({
          id: notionHerb.id,
          chinese_name: notionHerb.name_cn || notionHerb.name_en,
          english_name: notionHerb.name_en,
          latin_name: notionHerb.latin_name || notionHerb.name_en,
          description: notionHerb.description_short || notionHerb.description_detail || '',
          efficacy: notionHerb.efficacy || [],
          primary_effects: notionHerb.efficacy || [],
          safety_level: notionHerb.safety_level || 'medium',
          constitution_type: notionHerb.constitution_type || '平和质',
          traditional_use: notionHerb.traditional_use || notionHerb.description_detail || '',
          modern_applications: notionHerb.modern_applications || notionHerb.description_detail || '',
          dosage_info: notionHerb.dosage || '请咨询专业医师',
          safety_notes: notionHerb.safety_notes || '',
          quality_score: notionHerb.quality_score || 75,
          popularity_score: notionHerb.popularity_score || 70,
          ingredients: notionHerb.ingredients || ['待补充'],
          image_url: notionHerb.image_url || `/herbs/${notionHerb.name_en.toLowerCase().replace(/\s+/g, '-')}.jpg`,
          price_range: notionHerb.price_range || 'moderate',
          availability: notionHerb.availability || 'common'
        }))
        
        setHerbs(notionHerbs)
        console.log(`✅ Loaded ${notionHerbs.length} herbs from Notion database`)
      } else {
        // 如果Notion数据不可用，使用本地数据
        console.log('⚠️ Notion data unavailable, using local herb data')
        response = await fetch('/api/herbs/data?limit=100')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        data = await response.json()
        
        if (data.herbs) {
          setHerbs(data.herbs)
        } else {
          throw new Error(data.error || 'Failed to fetch herbs')
        }
      }
    } catch (err) {
      console.error('Error fetching herbs:', err)
      setError(err instanceof Error ? err.message : 'Failed to load herbs data')
      setHerbs([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setActiveFilter(key)
    
    // Update URL parameters for SEO and sharing
    const url = new URL(window.location.href)
    if (value) {
      url.searchParams.set(key, value)
    } else {
      url.searchParams.delete(key)
    }
    window.history.replaceState({}, '', url.toString())
  }

  const handleCategorySelect = (categoryLabel: string) => {
    const newCategory = filters.category === categoryLabel ? '' : categoryLabel
    handleFilterChange('category', newCategory)
  }

  const handleSearchSuggestionSelect = (suggestion: string) => {
    handleFilterChange('search', suggestion)
    setShowSuggestions(false)
  }

  const clearFilters = () => {
    setFilters({
      constitution: '',
      efficacy: '',
      safety: '',
      search: '',
      category: '',
      sortBy: 'relevance'
    })
    setActiveFilter('')
    // Clear URL parameters
    window.history.replaceState({}, '', window.location.pathname)
  }

  const refreshData = () => {
    fetchHerbsData()
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => 
    key !== 'sortBy' && value !== ''
  )

  // Enhanced statistics
  const stats = useMemo(() => {
    return {
      total: herbs.length,
      highSafety: herbs.filter(h => h.safety_level === 'high').length,
      uniqueBenefits: new Set(herbs.flatMap(h => h.efficacy)).size,
      constitutionTypes: new Set(herbs.map(h => h.constitution_type)).size,
      premiumHerbs: herbs.filter(h => (h.quality_score || 0) >= 85).length
    }
  }, [herbs])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <Leaf className="w-full h-full text-green-600 animate-pulse" />
                <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-25"></div>
                <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">正在加载草药数据库</h2>
            <p className="text-gray-600 mb-2">获取最新的草药信息中...</p>
            <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <Navigation />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Herb Finder', href: '/herb-finder' }
            ]} 
          />

          {/* Enhanced Header with more visual appeal */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <Leaf className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
              <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              智能草药查找器
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              从我们的 <span className="font-bold text-green-600">{herbs.length}</span> 种传统草药数据库中发现完美的天然疗法。
              根据症状、健康目标或体质类型进行智能搜索匹配。
            </p>
            
            {/* Quick stats showcase */}
            <div className="flex justify-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.highSafety}</div>
                <div className="text-sm text-gray-600">高安全等级</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{stats.premiumHerbs}</div>
                <div className="text-sm text-gray-600">优质草药</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">{stats.uniqueBenefits}</div>
                <div className="text-sm text-gray-600">独特功效</div>
              </div>
            </div>
          </div>

          {/* Enhanced Popular Categories with visual improvements */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-green-600" />
              热门分类
              <span className="ml-3 text-sm font-normal text-gray-500">点击快速筛选</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularCategories.map((category) => (
                <button
                  key={category.label}
                  onClick={() => handleCategorySelect(category.label)}
                  className={`group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    filters.category === category.label
                      ? `bg-gradient-to-br ${category.color} text-white shadow-2xl scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-green-200'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 transition-colors ${
                    filters.category === category.label
                      ? 'bg-white/20'
                      : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                  }`}>
                    {category.icon}
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{category.label}</h4>
                  <p className={`text-xs ${
                    filters.category === category.label ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {category.description}
                  </p>
                  
                  {/* Active indicator */}
                  {filters.category === category.label && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Search and Filter Bar */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100 backdrop-blur-sm bg-white/90">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Enhanced Search Input with suggestions */}
              <div className="flex-1 relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索草药名称、症状、功效或成分... (例如：'失眠', '焦虑', '人参')"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg bg-gray-50 focus:bg-white"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                  {filters.search && (
                    <button
                      onClick={() => handleFilterChange('search', '')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchSuggestionSelect(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center"
                      >
                        <Search className="w-4 h-4 mr-3 text-gray-400" />
                        <span className="text-gray-700">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Enhanced Control Buttons */}
              <div className="flex gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="appearance-none bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-2xl transition-all hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 pr-12"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value} className="bg-white text-gray-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-6 py-4 rounded-2xl transition-all font-medium ${
                    showFilters || hasActiveFilters 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Filter className="w-5 h-5 mr-2" />
                  高级筛选
                  {hasActiveFilters && (
                    <span className="ml-2 bg-white/20 text-xs px-2 py-1 rounded-full">
                      {Object.values(filters).filter(v => v && v !== 'relevance').length}
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <button
                  onClick={refreshData}
                  className="flex items-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-2xl transition-all shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
                        
            {/* Expanded Filters with enhanced design */}
            {showFilters && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Constitution Filter */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-indigo-600" />
                      体质类型
                    </label>
                    <select
                      value={filters.constitution}
                      onChange={(e) => handleFilterChange('constitution', e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition-all"
                    >
                      <option value="">所有体质类型</option>
                      {constitutionOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                        
                  {/* Efficacy Filter */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-red-600" />
                      主要功效
                    </label>
                    <select
                      value={filters.efficacy}
                      onChange={(e) => handleFilterChange('efficacy', e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition-all"
                    >
                      <option value="">所有功效</option>
                      {efficacyOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                        
                  {/* Safety Filter */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-green-600" />
                      安全等级
                    </label>
                    <select
                      value={filters.safety}
                      onChange={(e) => handleFilterChange('safety', e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition-all"
                    >
                      <option value="">所有安全等级</option>
                      {safetyOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                      
                {/* Clear Filters with enhanced styling */}
                {hasActiveFilters && (
                  <div className="mt-6 flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600">
                      已应用 <span className="font-semibold text-green-600">
                        {Object.values(filters).filter(v => v && v !== 'relevance').length}
                      </span> 个筛选条件
                    </div>
                    <button
                      onClick={clearFilters}
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all"
                    >
                      <X className="w-4 h-4 mr-1" />
                      清除所有筛选
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                {error ? (
                  <span className="text-red-600">加载错误</span>
                ) : (
                  <>
                    找到 <span className="text-green-600 mx-2">{filteredHerbs.length}</span> 种草药
                    <Sparkles className="w-6 h-6 ml-2 text-yellow-500" />
                  </>
                )}
              </h2>
              {!error && (
                <p className="text-gray-600 mt-2 flex items-center">
                  {hasActiveFilters ? (
                    <>
                      <Filter className="w-4 h-4 mr-2" />
                      从 {herbs.length} 种草药中筛选 • 按{sortOptions.find(opt => opt.value === filters.sortBy)?.label}排序
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      显示所有可用草药 • 使用上方筛选器查找特定疗法
                    </>
                  )}
                </p>
              )}
            </div>

            {/* Quick filter reset */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                重置筛选
              </button>
            )}
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-900 mb-2">Unable to Load Herbs</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button 
                onClick={refreshData}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* No Results with Suggestions */}
          {!error && filteredHerbs.length === 0 && !isLoading && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
              <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Herbs Found</h3>
              <p className="text-gray-600 mb-6">
                {hasActiveFilters 
                  ? 'Try adjusting your search terms or filters. You can also browse by popular categories above.'
                  : 'No herbs are currently available in the database.'
                }
              </p>
              {hasActiveFilters && (
                <div className="space-y-3">
                  <button
                    onClick={clearFilters}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors"
                  >
                    Clear All Filters
                  </button>
                  <p className="text-sm text-gray-500">
                    Or try searching for: "sleep", "energy", "immune", "stress", "digestion"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Herbs Grid */}
          {!error && filteredHerbs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHerbs.map((herb) => (
                <HerbCard 
                  key={herb.id} 
                  herb={herb} 
                  showDetailed={true}
                />
              ))}
            </div>
          )}

          {/* Enhanced Database Stats */}
          {!error && herbs.length > 0 && (
            <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-6">Database Statistics</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">{herbs.length}</div>
                  <div className="text-green-100">Total Herbs</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {herbs.filter(h => h.safety_level === 'high').length}
                  </div>
                  <div className="text-green-100">High Safety</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {new Set(herbs.flatMap(h => h.efficacy)).size}
                  </div>
                  <div className="text-green-100">Unique Benefits</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {new Set(herbs.map(h => h.constitution_type)).size}
                  </div>
                  <div className="text-green-100">Constitution Types</div>
                </div>
              </div>
              
              {/* Quick Tips */}
              <div className="mt-6 text-green-100 text-sm">
                💡 <strong>Pro Tip:</strong> Use the category buttons above for quick health-focused searches, 
                or try specific symptoms like "sleep problems" or "low energy"
              </div>
            </div>
          )}

          {/* FAQ Section for SEO */}
          <HerbFinderFAQ language="en" />

          {/* Disclaimer with Better Styling */}
          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  This information is for educational purposes only and is not intended as medical advice. 
                  Always consult with qualified healthcare professionals before using any herbal supplements, 
                  especially if you have medical conditions or take medications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 