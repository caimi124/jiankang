'use client'

import React, { useState, useEffect } from 'react'
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

export default function HerbFinderPage() {
  const [herbs, setHerbs] = useState<Herb[]>([])
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  
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

  // 获取草药数据
  useEffect(() => {
    fetchHerbsData()
  }, [])

  // 应用过滤器
  useEffect(() => {
    applyFilters()
  }, [herbs, filters])

  const fetchHerbsData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/herbs/data?limit=100')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.herbs) {
        setHerbs(data.herbs)
      } else {
        throw new Error(data.error || 'Failed to fetch herbs')
      }
    } catch (err) {
      console.error('Error fetching herbs:', err)
      setError(err instanceof Error ? err.message : 'Failed to load herbs data')
      setHerbs([])
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced search with multiple fields and fuzzy matching
  const applyFilters = () => {
    let filtered = [...herbs]

    // Enhanced text search across multiple fields
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(herb =>
        herb.chinese_name.toLowerCase().includes(searchLower) ||
        herb.english_name.toLowerCase().includes(searchLower) ||
        herb.latin_name.toLowerCase().includes(searchLower) ||
        herb.description.toLowerCase().includes(searchLower) ||
        herb.efficacy.some(eff => eff.toLowerCase().includes(searchLower)) ||
        herb.primary_effects.some(eff => eff.toLowerCase().includes(searchLower)) ||
        herb.traditional_use.toLowerCase().includes(searchLower) ||
        herb.modern_applications.toLowerCase().includes(searchLower) ||
        herb.ingredients.some(ing => ing.toLowerCase().includes(searchLower))
      )
    }

    // Category-based filtering
    if (filters.category) {
      const category = popularCategories.find(cat => cat.label === filters.category)
      if (category) {
        filtered = filtered.filter(herb =>
          category.keywords.some(keyword =>
            herb.efficacy.some(eff => eff.toLowerCase().includes(keyword.toLowerCase())) ||
            herb.primary_effects.some(eff => eff.toLowerCase().includes(keyword.toLowerCase())) ||
            herb.description.toLowerCase().includes(keyword.toLowerCase())
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

    // Sort by quality score and popularity
    filtered.sort((a, b) => {
      const scoreA = (a.quality_score || 0) + (a.popularity_score || 0)
      const scoreB = (b.quality_score || 0) + (b.popularity_score || 0)
      return scoreB - scoreA
    })

    setFilteredHerbs(filtered)
  }

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
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
  }

  const refreshData = () => {
    fetchHerbsData()
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
            <p className="text-gray-600">Fetching the latest herb information...</p>
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
              Discover the perfect natural remedies from our comprehensive database of <span className="font-semibold text-green-600">{herbs.length} traditional herbs</span>. 
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
                    <span className="text-green-600">{filteredHerbs.length}</span> Herbs Found
                  </>
                )}
              </h2>
              {!error && (
                <p className="text-gray-600 mt-1">
                  {hasActiveFilters ? (
                    <>Filtered from {herbs.length} total herbs • Sorted by quality & popularity</>
                  ) : (
                    <>Showing all available herbs • Use filters to find specific remedies</>
                  )}
                </p>
              )}
            </div>
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