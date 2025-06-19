'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { HerbCard } from '../../components/HerbRecommendations'
import { 
  Search, 
  Filter, 
  Leaf, 
  ChevronDown,
  AlertCircle,
  RefreshCw,
  X
} from 'lucide-react'
import type { Herb } from '../../lib/herbs-recommendation'

interface FilterState {
  constitution: string
  efficacy: string
  safety: string
  search: string
}

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
    search: ''
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
    { value: 'high', label: '高安全性' },
    { value: 'medium', label: '中等安全性' },
    { value: 'low', label: '需谨慎使用' }
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

      // 构建查询参数
      const params = new URLSearchParams()
      if (filters.constitution) params.append('constitution', filters.constitution)
      if (filters.efficacy) params.append('efficacy', filters.efficacy)
      if (filters.safety) params.append('safety', filters.safety)
      params.append('limit', '100')

      const response = await fetch(`/api/herbs/data?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success) {
        setHerbs(data.data)
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

  const applyFilters = () => {
    let filtered = [...herbs]

    // 文本搜索
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(herb =>
        herb.name.toLowerCase().includes(searchLower) ||
        herb.chineseName.toLowerCase().includes(searchLower) ||
        herb.description.toLowerCase().includes(searchLower) ||
        herb.efficacy.some(eff => eff.toLowerCase().includes(searchLower))
      )
    }

    setFilteredHerbs(filtered)
  }

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      constitution: '',
      efficacy: '',
      safety: '',
      search: ''
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
            <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Herb Database</h2>
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

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-6 shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Herb Finder
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive database of traditional herbs and modern supplements. 
              Find the perfect natural remedies for your wellness journey.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search herbs by name, benefits, or description..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
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

          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {error ? 'Error Loading Herbs' : `${filteredHerbs.length} Herbs Found`}
              </h2>
              {!error && (
                <p className="text-gray-600 mt-1">
                  {hasActiveFilters ? 'Filtered results' : 'Showing all available herbs'}
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

          {/* No Results */}
          {!error && filteredHerbs.length === 0 && !isLoading && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
              <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Herbs Found</h3>
              <p className="text-gray-600 mb-6">
                {hasActiveFilters 
                  ? 'Try adjusting your filters to find more results.'
                  : 'No herbs are currently available in the database.'
                }
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Herbs Grid */}
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

          {/* Database Stats */}
          {!error && (
            <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Database Statistics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">{herbs.length}</div>
                  <div className="text-green-100">Total Herbs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {herbs.filter(h => h.safetyLevel === 'high').length}
                  </div>
                  <div className="text-green-100">High Safety</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {new Set(herbs.flatMap(h => h.efficacy)).size}
                  </div>
                  <div className="text-green-100">Unique Benefits</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 