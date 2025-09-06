'use client'

import React, { useState, useEffect, useCallback } from 'react'
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
  Target
} from 'lucide-react'
import type { Herb } from '../../lib/herbs-recommendation'
import { sanityFetch } from '@/lib/sanity'
import { HERBS_DATABASE } from '../../lib/herbs-data-complete'

// 获取草药数据（优化版本：使用本地API）
async function getHerbsData(filters: any = {}) {
  try {
    console.log(`[HerbFinder] 🚀 Fetching herbs with filters:`, filters)
    
    // 构建查询参数
    const searchParams = new URLSearchParams()
    
    if (filters.search) searchParams.set('search', filters.search)
    if (filters.category) searchParams.set('category', filters.category)
    if (filters.constitution) searchParams.set('constitution', filters.constitution)
    if (filters.safety) searchParams.set('safety', filters.safety)
    if (filters.page) searchParams.set('page', filters.page.toString())
    if (filters.limit) searchParams.set('limit', filters.limit.toString())
    
    // 强制使用新版本，添加超时控制
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超时
    
    const response = await fetch(`/api/herbs/data?${searchParams.toString()}&_t=${Date.now()}&v=${Date.now()}`, {
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    console.log(`[HerbFinder] ⚡ API SUCCESS - Version: ${Date.now()} - Herbs: ${data.herbs?.length || 0} - Total: ${data.total || 0}`)
    
    return {
      herbs: data.herbs || [],
      total: data.total || 0
    }
  } catch (error) {
    console.error('[HerbFinder] ❌ API FAILED:', error)
    return { herbs: [], total: 0 }
  }
}

interface FilterState {
  constitution: string
  efficacy: string
  safety: string
  search: string
  category: string
}

// Popular search categories for better UX
const popularCategories = [
  { 
    icon: <Moon className="w-4 h-4" />, 
    label: 'Sleep & Relaxation', 
    keywords: ['睡眠支持', '镇静安神', '情绪管理', 'sleep', 'relaxation', 'calm'] 
  },
  { 
    icon: <Zap className="w-4 h-4" />, 
    label: 'Energy & Vitality', 
    keywords: ['能量提升', '补气养血', 'energy', 'vitality', 'boost'] 
  },
  { 
    icon: <Shield className="w-4 h-4" />, 
    label: 'Immune Support', 
    keywords: ['免疫支持', 'immune', 'support', 'defense'] 
  },
  { 
    icon: <Heart className="w-4 h-4" />, 
    label: 'Digestive Health', 
    keywords: ['消化健康', 'digestive', 'stomach', 'gut'] 
  },
  { 
    icon: <Brain className="w-4 h-4" />, 
    label: 'Mental Clarity', 
    keywords: ['压力与焦虑', 'mental', 'focus', 'clarity', 'stress', 'anxiety'] 
  },
  { 
    icon: <Users className="w-4 h-4" />, 
    label: 'Women\'s Health', 
    keywords: ['女性健康', 'women', 'female', 'hormonal'] 
  }
]

export default function HerbFinderClient() {

  // 静态备用草药数据（保留作为最终fallback）
  const staticHerbs: Herb[] = [
    {
      id: "ginseng-001",
      chinese_name: "人参",
      english_name: "Ginseng",
      latin_name: "Panax ginseng",
      category: "energy",
      constitution_type: "气虚质",
      primary_effects: ["能量提升", "免疫支持"],
      secondary_effects: ["抗疲劳", "认知增强"],
      efficacy: ["能量提升", "免疫支持", "抗疲劳", "认知增强"],
      dosage: "每日500-2000mg",
      safety_level: "high" as const,
      contraindications: "高血压患者慎用，孕妇禁用",
      description: "人参是传统中医中最著名的补气药材，具有显著的滋补强壮作用。",
      traditional_use: "用于气虚体弱、疲劳乏力、食欲不振等症状。",
      modern_applications: "现代研究证实人参具有适应原作用，能提高机体抗应激能力。",
      taste: "甘、微苦",
      meridians: ["脾", "肺"],
      part_used: "根",
      source: "野生或人工种植",
      growing_regions: ["中国东北", "韩国", "俄罗斯"],
      price_range: "expensive" as const,
      availability: "common" as const,
      quality_score: 95,
      popularity_score: 90,
      usage_suggestions: "空腹服用效果更佳，避免与咖啡同服",
      ingredients: ["人参皂苷", "多糖", "氨基酸"]
    },
    {
      id: "turmeric-002", 
      chinese_name: "姜黄",
      english_name: "Turmeric",
      latin_name: "Curcuma longa",
      category: "immune",
      constitution_type: "湿热质",
      primary_effects: ["抗炎作用", "免疫支持"],
      secondary_effects: ["消化健康", "关节健康"],
      efficacy: ["抗炎作用", "免疫支持", "消化健康", "关节健康"],
      dosage: "每日500-1000mg姜黄素",
      safety_level: "high" as const,
      contraindications: "胆结石患者慎用，手术前停用",
      description: "姜黄含有强效的抗炎化合物姜黄素，具有广泛的健康益处。",
      traditional_use: "传统上用于消化不良、关节疼痛和皮肤问题。",
      modern_applications: "现代研究显示姜黄素具有强大的抗氧化和抗炎特性。",
      taste: "辛、苦",
      meridians: ["脾", "肝"],
      part_used: "根茎",
      source: "人工种植",
      growing_regions: ["印度", "中国", "东南亚"],
      price_range: "moderate" as const,
      availability: "common" as const,
      quality_score: 88,
      popularity_score: 85,
      usage_suggestions: "与黑胡椒同服可增强吸收",
      ingredients: ["姜黄素", "挥发油", "多糖"]
    },
    {
      id: "ginkgo-003",
      chinese_name: "银杏叶",
      english_name: "Ginkgo Biloba",
      latin_name: "Ginkgo biloba",
      category: "cognitive",
      constitution_type: "平和质",
      primary_effects: ["认知增强", "血液循环"],
      secondary_effects: ["记忆改善", "抗氧化"],
      efficacy: ["认知增强", "血液循环", "记忆改善", "抗氧化"],
      dosage: "每日120-240mg标准提取物",
      safety_level: "medium" as const,
      contraindications: "服用抗凝血药物者慎用",
      description: "银杏是世界上最古老的树种之一，其叶子提取物对大脑健康有益。",
      traditional_use: "传统中医用于治疗咳喘、心悸等症状。",
      modern_applications: "现代主要用于改善认知功能和循环系统健康。",
      taste: "苦、涩",
      meridians: ["肺", "心"],
      part_used: "叶",
      source: "人工种植",
      growing_regions: ["中国", "欧洲", "北美"],
      price_range: "moderate" as const,
      availability: "common" as const,
      quality_score: 82,
      popularity_score: 78,
      usage_suggestions: "餐后服用，避免空腹",
      ingredients: ["银杏内酯", "黄酮苷", "萜类化合物"]
    },
    {
      id: "astragalus-004",
      chinese_name: "黄芪",
      english_name: "Astragalus",
      latin_name: "Astragalus membranaceus",
      category: "immune",
      constitution_type: "气虚质",
      primary_effects: ["免疫支持", "补气养血"],
      secondary_effects: ["抗疲劳", "保肝"],
      efficacy: ["免疫支持", "补气养血", "抗疲劳", "保肝"],
      dosage: "每日10-30g煎服或3-9g粉剂",
      safety_level: "high" as const,
      contraindications: "感冒发热时暂停使用",
      description: "黄芪是中医最常用的补气药之一，具有显著的免疫调节作用。",
      traditional_use: "用于气虚乏力、自汗、久泻脱肛等症。",
      modern_applications: "现代研究证实具有增强免疫力、抗疲劳、保护肝脏的作用。",
      taste: "甘、微温",
      meridians: ["脾", "肺"],
      part_used: "根",
      source: "野生或人工种植",
      growing_regions: ["中国北方", "蒙古"],
      price_range: "moderate" as const,
      availability: "common" as const,
      quality_score: 90,
      popularity_score: 88,
      usage_suggestions: "可与红枣、枸杞同煎",
      ingredients: ["黄芪皂苷", "多糖", "黄酮类"]
    },
    {
      id: "rhodiola-005",
      chinese_name: "红景天",
      english_name: "Rhodiola",
      latin_name: "Rhodiola rosea",
      category: "energy",
      constitution_type: "气虚质",
      primary_effects: ["抗疲劳", "适应原"],
      secondary_effects: ["抗抑郁", "认知增强"],
      efficacy: ["抗疲劳", "适应原", "抗抑郁", "认知增强"],
      dosage: "每日200-400mg标准提取物",
      safety_level: "high" as const,
      contraindications: "躁狂症患者慎用",
      description: "红景天是珍贵的高原药材，具有显著的抗疲劳和适应原作用。",
      traditional_use: "藏医用于治疗高原反应、疲劳等症。",
      modern_applications: "现代研究显示对压力、疲劳、抑郁有良好效果。",
      taste: "甘、苦、寒",
      meridians: ["肺", "心"],
      part_used: "根茎",
      source: "野生采集",
      growing_regions: ["西藏", "新疆", "东北"],
      price_range: "expensive" as const,
      availability: "rare" as const,
      quality_score: 92,
      popularity_score: 75,
      usage_suggestions: "早晨空腹服用效果最佳",
      ingredients: ["红景天苷", "酪醇", "黄酮类"]
    },
    {
      id: "echinacea-006",
      chinese_name: "紫锥菊",
      english_name: "Echinacea",
      latin_name: "Echinacea purpurea",
      category: "immune",
      constitution_type: "平和质",
      primary_effects: ["免疫支持", "抗感染"],
      secondary_effects: ["抗炎", "伤口愈合"],
      efficacy: ["免疫支持", "抗感染", "抗炎", "伤口愈合"],
      dosage: "每日300-500mg提取物",
      safety_level: "high" as const,
      contraindications: "自身免疫疾病患者慎用",
      description: "紫锥菊是北美印第安人传统药材，具有强大的免疫调节作用。",
      traditional_use: "传统用于治疗感冒、感染、伤口等。",
      modern_applications: "现代主要用于预防和缓解感冒症状。",
      taste: "微苦、辛",
      meridians: ["肺", "肝"],
      part_used: "全草",
      source: "人工种植",
      growing_regions: ["北美", "欧洲", "中国"],
      price_range: "moderate" as const,
      availability: "common" as const,
      quality_score: 85,
      popularity_score: 80,
      usage_suggestions: "感冒初期使用效果更佳",
      ingredients: ["多酚", "烷基酰胺", "多糖"]
    }
  ]

  // 直接转换和使用完整的草药数据库
  const allHerbsData: Herb[] = React.useMemo(() => 
    HERBS_DATABASE.map(herb => ({
      id: herb.id,
      chinese_name: herb.chinese_name,
      english_name: herb.english_name,
      latin_name: herb.latin_name,
      category: herb.category,
      constitution_type: herb.constitution_type,
      primary_effects: herb.primary_effects,
      secondary_effects: herb.secondary_effects,
      efficacy: herb.efficacy,
      dosage: herb.dosage,
      safety_level: herb.safety_level,
      contraindications: herb.contraindications,
      description: herb.description,
      traditional_use: herb.traditional_use,
      modern_applications: herb.modern_applications,
      taste: herb.taste,
      meridians: herb.meridians,
      part_used: herb.part_used,
      source: herb.source,
      growing_regions: herb.growing_regions,
      price_range: herb.price_range,
      availability: herb.availability,
      quality_score: herb.quality_score,
      popularity_score: herb.popularity_score,
      usage_suggestions: herb.usage_suggestions,
      ingredients: herb.ingredients
    } as Herb)), [])

  const [herbs, setHerbs] = useState<Herb[]>(allHerbsData) // 直接使用完整数据
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>(allHerbsData) // 直接显示所有草药
  const [isLoading, setIsLoading] = useState(false) // 不需要loading，数据已经可用
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(120)
  const [total, setTotal] = useState(HERBS_DATABASE.length) // 设置正确的总数
  
  const [filters, setFilters] = useState<FilterState>({
    constitution: '',
    efficacy: '',
    safety: '',
    search: '',
    category: ''
  })

  const constitutionOptions = [
    '平和质', '气虚质', '阳虚质', '阴虚质', '痰湿质', 
    '湿热质', '血瘀质', '气郁质', '特禀质'
  ]

  const efficacyOptions = [
    '免疫支持', '消化健康', '肝脏健康', '呼吸系统', '镇静安神',
    '抗炎作用', '解毒支持', '补气养血', '止咳化痰', '能量提升',
    '情绪管理', '睡眠支持', '压力与焦虑'
  ]

  const safetyOptions = [
    { value: 'high', label: 'High Safety' },
    { value: 'medium', label: 'Moderate Safety' },
    { value: 'low', label: 'Use with Caution' }
  ]

  // 简单的初始化效果 - 确保组件挂载后数据正确设置
  useEffect(() => {
    if (herbs.length === 0) {
      console.log(`[HerbFinder] 🚀 初始化草药数据: ${allHerbsData.length} 个草药`)
      setHerbs(allHerbsData)
      setFilteredHerbs(allHerbsData)
      setTotal(allHerbsData.length)
    }
  }, [allHerbsData, herbs.length])

  // 防抖搜索 + 智能筛选
  const applyFilters = useCallback(() => {
    let filtered = [...herbs]

    // 使用Set进行快速搜索匹配
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const searchTerms = searchLower.split(/\s+/).filter(term => term.length > 0)
      
      filtered = filtered.filter(herb => {
        const searchableText = [
          herb.chinese_name || '',
          herb.english_name || '',
          herb.latin_name || '',
          herb.description || '',
          ...(herb.efficacy || []),
          ...(herb.primary_effects || []),
          herb.traditional_use || '',
          herb.modern_applications || '',
          ...(herb.ingredients || [])
        ].filter(Boolean).join(' ').toLowerCase()
        
        // 所有搜索词都必须匹配
        return searchTerms.every(term => searchableText.includes(term))
      })
    }

    // 使用Map进行快速分类筛选
    if (filters.category) {
      filtered = filtered.filter(herb => 
        herb.category === filters.category
      )
    }

    if (filters.constitution) {
      filtered = filtered.filter(herb => 
        herb.constitution_type === filters.constitution
      )
    }

    if (filters.safety) {
      filtered = filtered.filter(herb => 
        herb.safety_level === filters.safety
      )
    }

    if (filters.efficacy) {
      filtered = filtered.filter(herb => 
        herb.efficacy.some(eff => eff === filters.efficacy) ||
        herb.primary_effects.some(eff => eff === filters.efficacy)
      )
    }

    // 智能排序算法
    filtered.sort((a, b) => {
      const scoreA = (a.quality_score || 0) * 0.6 + (a.popularity_score || 0) * 0.4
      const scoreB = (b.quality_score || 0) * 0.6 + (b.popularity_score || 0) * 0.4
      return scoreB - scoreA
    })

    console.log(`[HerbFinder] 🔄 Filtered herbs: ${filtered.length} (from ${herbs.length} total)`)
    setFilteredHerbs(filtered)
  }, [herbs, filters])

  // 防抖搜索，减少不必要的API调用
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters()
    }, 300) // 300ms防抖

    return () => clearTimeout(timer)
  }, [applyFilters])

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    console.log(`[HerbFinder] 筛选变更: ${key} = "${value}"`)
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const handleCategorySelect = (categoryLabel: string) => {
    setFilters(prev => ({ 
      ...prev, 
      category: prev.category === categoryLabel ? '' : categoryLabel 
    }))
  }

  const clearFilters = () => {
    setFilters({
      constitution: '',
      efficacy: '',
      safety: '',
      search: '',
      category: ''
    })
    setPage(1)
  }

  const refreshData = () => {
    // 简单刷新：重新设置数据
    console.log('[HerbFinder] 🔄 刷新草药数据')
    setHerbs(allHerbsData)
    setFilteredHerbs(allHerbsData)
    setTotal(allHerbsData.length)
    setError(null)
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative mb-8">
              <Leaf className="w-20 h-20 text-green-600 mx-auto mb-4 animate-pulse" />
              <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-25"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Loading Herb Database</h2>
            <p className="text-gray-600">Loading herbs from local database... Almost ready!</p>
            <div className="mt-8 max-w-4xl mx-auto">
              {/* 骨架屏预览 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
                    <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Herb Finder', href: '/herb-finder' }
            ]} 
          />

          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-6 shadow-lg hover:shadow-xl transition-shadow">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Smart Herb Finder
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect natural remedies from our comprehensive database of <span className="font-semibold text-green-600">{total || herbs.length} traditional herbs</span>. 
              Search by symptoms, health goals, or constitution type.
            </p>
          </div>

          {/* Popular Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Popular Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {popularCategories.map((category) => (
                <button
                  key={category.label}
                  onClick={() => handleCategorySelect(category.label)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    filters.category === category.label
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 border border-gray-200 hover:border-green-200'
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Enhanced Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, symptoms, benefits, or ingredients... (e.g., 'sleep', 'anxiety', 'ginseng')"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                    showFilters ? 'bg-green-100 text-green-700' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Advanced Filters
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <button
                  onClick={refreshData}
                  className="flex items-center px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
                        
            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Constitution Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Constitution Type
                    </label>
                    <select
                      value={filters.constitution}
                      onChange={(e) => handleFilterChange('constitution', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">All Constitutions</option>
                      {constitutionOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                        
                  {/* Efficacy Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Benefit
                    </label>
                    <select
                      value={filters.efficacy}
                      onChange={(e) => handleFilterChange('efficacy', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">All Benefits</option>
                      {efficacyOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                        
                  {/* Safety Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Safety Level
                    </label>
                    <select
                      value={filters.safety}
                      onChange={(e) => handleFilterChange('safety', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">All Safety Levels</option>
                      {safetyOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                      
                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results Header with Enhanced Info */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {error ? 'Error Loading Herbs' : (
                  <>
                    <span className="text-green-600">{filteredHerbs.length > 0 ? filteredHerbs.length : (herbs.length || total)}</span> Herbs Found
                  </>
                )}
              </h2>
              {!error && (
                <p className="text-gray-600 mt-1">
                  {hasActiveFilters ? (
                    <>Filtered • Page {page} of {Math.max(1, Math.ceil((total || herbs.length) / pageSize))}</>
                  ) : (
                    <>Page {page} of {Math.max(1, Math.ceil((total || herbs.length) / pageSize))} • Use filters to find specific remedies</>
                  )}
                </p>
              )}
            </div>
            {/* Pagination Controls */}
            {!error && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-2 rounded-lg border disabled:opacity-50"
                >Prev</button>
                <div className="text-sm text-gray-600">{page}</div>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= Math.max(1, Math.ceil((total || herbs.length) / pageSize))}
                  className="px-3 py-2 rounded-lg border disabled:opacity-50"
                >Next</button>
                <select
                  value={pageSize}
                  onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}
                  className="ml-2 border rounded-lg p-2 text-sm"
                >
                  {[12,24,36,48].map(sz => (<option key={sz} value={sz}>{sz}/page</option>))}
                </select>
              </div>
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
                    Or try searching for: &quot;sleep&quot;, &quot;energy&quot;, &quot;immune&quot;, &quot;stress&quot;, &quot;digestion&quot;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ItemList JSON-LD for SEO (前10条) */}
          {!error && filteredHerbs.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                itemListElement: filteredHerbs.slice(0, 10).map((h, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  url: `https://herbscience.shop/herbs/${(h as any).slug || h.english_name?.toLowerCase()?.replace(/\s+/g,'-')}`,
                  name: `${h.english_name} (${h.chinese_name})`
                }))
              }) }}
            />
          )}

          {/* Enhanced Herbs Grid */}
          {!error && (filteredHerbs.length > 0 || (!isLoading && herbs.length > 0)) && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredHerbs.length > 0 ? filteredHerbs : herbs).map((herb) => (
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
                <div className="bg-white/12 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {new Set(herbs.map(h => h.constitution_type)).size}
                  </div>
                  <div className="text-green-100">Constitution Types</div>
                </div>
              </div>
              
              {/* Quick Tips */}
              <div className="mt-6 text-green-100 text-sm">
                Pro Tip: Use the category buttons above for quick health-focused searches, 
                or try specific symptoms like &quot;sleep problems&quot; or &quot;low energy&quot;
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
