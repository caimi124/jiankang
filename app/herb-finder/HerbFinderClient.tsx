'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { Herb } from '../../lib/herbs-recommendation'
import { HERBS_DATABASE } from '../../lib/herbs-data-complete'

// Lazy load heavy components
const Navigation = dynamic(() => import('../../components/Navigation'), { ssr: true })
const Breadcrumb = dynamic(() => import('../../components/Breadcrumb'), { ssr: true })
const HerbCard = dynamic(() => import('../../components/HerbRecommendations').then(mod => ({ default: mod.HerbCard })), { ssr: false })
const HerbFinderFAQ = dynamic(() => import('../../components/HerbFinderFAQ'), { ssr: false })

// Lazy load icons - only load what's needed
const Search = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Search })), { ssr: false })
const Filter = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Filter })), { ssr: false })
const Leaf = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Leaf })), { ssr: false })
const ChevronDown = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ChevronDown })), { ssr: false })
const AlertCircle = dynamic(() => import('lucide-react').then(mod => ({ default: mod.AlertCircle })), { ssr: false })
const RefreshCw = dynamic(() => import('lucide-react').then(mod => ({ default: mod.RefreshCw })), { ssr: false })
const X = dynamic(() => import('lucide-react').then(mod => ({ default: mod.X })), { ssr: false })
const Target = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Target })), { ssr: false })

// Lazy load category icons
const Moon = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Moon })), { ssr: false })
const Zap = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Zap })), { ssr: false })
const Shield = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Shield })), { ssr: false })
const Heart = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Heart })), { ssr: false })
const Brain = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Brain })), { ssr: false })
const Users = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Users })), { ssr: false })

// Remove unused API function - using local data only

interface FilterState {
  constitution: string
  efficacy: string
  safety: string
  search: string
  category: string
}

// Popular search categories - icons loaded dynamically
const PopularCategory = ({ iconName, label, onClick, isActive }: { iconName: string, label: string, onClick: () => void, isActive: boolean }) => {
  const IconComponent = useMemo(() => {
    switch(iconName) {
      case 'moon': return Moon
      case 'zap': return Zap  
      case 'shield': return Shield
      case 'heart': return Heart
      case 'brain': return Brain
      case 'users': return Users
      default: return null
    }
  }, [iconName])
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
        isActive
          ? 'bg-green-600 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 border border-gray-200 hover:border-green-200'
      }`}
    >
      {IconComponent && <IconComponent className="w-4 h-4" />}
      <span className="ml-2">{label}</span>
    </button>
  )
}

const popularCategories = [
  { iconName: 'moon', label: 'Sleep & Relaxation', keywords: ['睡眠支持', '镇静安神', '情绪管理', 'sleep', 'relaxation', 'calm'] },
  { iconName: 'zap', label: 'Energy & Vitality', keywords: ['能量提升', '补气养血', 'energy', 'vitality', 'boost'] },
  { iconName: 'shield', label: 'Immune Support', keywords: ['免疫支持', 'immune', 'support', 'defense'] },
  { iconName: 'heart', label: 'Digestive Health', keywords: ['消化健康', 'digestive', 'stomach', 'gut'] },
  { iconName: 'brain', label: 'Mental Clarity', keywords: ['压力与焦虑', 'mental', 'focus', 'clarity', 'stress', 'anxiety'] },
  { iconName: 'users', label: 'Women\'s Health', keywords: ['女性健康', 'women', 'female', 'hormonal'] }
]

export default function HerbFinderClient() {

  // Use herbs database directly - no transformation needed
  const allHerbsData: Herb[] = useMemo(() => HERBS_DATABASE as Herb[], [])

  const [herbs] = useState<Herb[]>(allHerbsData) // 静态数据，不需要setter
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(24) // 减少默认页面大小减轻DOM负载
  const [total] = useState(HERBS_DATABASE.length)
  
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

  // 初始化效果 - 延迟设置筛选结果以避免初始渲染阻塞
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filteredHerbs.length === 0) {
        console.log(`[HerbFinder] 🚀 初始化草药数据: ${allHerbsData.length} 个草药`)
        setFilteredHerbs(allHerbsData.slice(0, pageSize)) // 仅显示第一页
      }
    }, 100) // 100ms延迟
    
    return () => clearTimeout(timer)
  }, [allHerbsData, filteredHerbs.length, pageSize])

  // 优化的筛选功能 - 使用Web Workers避免主线程阻塞
  const applyFilters = useCallback(() => {
    const startTime = performance.now()
    
    // 使用requestIdleCallback避免阻塞主线程
    const scheduleFilter = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback, { timeout: 50 })
      } else {
        setTimeout(callback, 0)
      }
    }
    
    scheduleFilter(() => {
      let filtered = herbs
      
      // 使用高效的筛选算法
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const searchTerms = searchLower.split(/\s+/).filter(term => term.length > 0)
        
        filtered = filtered.filter(herb => {
          // 优化搜索文本构建
          const searchableText = `${herb.chinese_name || ''} ${herb.english_name || ''} ${herb.latin_name || ''} ${herb.description || ''} ${(herb.efficacy || []).join(' ')} ${(herb.primary_effects || []).join(' ')}`.toLowerCase()
          
          return searchTerms.every(term => searchableText.includes(term))
        })
      }

      if (filters.category) {
        filtered = filtered.filter(herb => herb.category === filters.category)
      }

      if (filters.constitution) {
        filtered = filtered.filter(herb => herb.constitution_type === filters.constitution)
      }

      if (filters.safety) {
        filtered = filtered.filter(herb => herb.safety_level === filters.safety)
      }

      if (filters.efficacy) {
        filtered = filtered.filter(herb => 
          herb.efficacy?.includes(filters.efficacy) || herb.primary_effects?.includes(filters.efficacy)
        )
      }

      // 优化排序 - 使用单次计算
      if (filtered.length > 1) {
        filtered.sort((a, b) => {
          const scoreA = (a.quality_score || 0) * 0.6 + (a.popularity_score || 0) * 0.4
          const scoreB = (b.quality_score || 0) * 0.6 + (b.popularity_score || 0) * 0.4
          return scoreB - scoreA
        })
      }

      const endTime = performance.now()
      console.log(`[HerbFinder] 🔄 Filtered ${filtered.length} herbs in ${(endTime - startTime).toFixed(2)}ms`)
      
      // 只显示当前页的数据
      const startIndex = (page - 1) * pageSize
      const paginatedResults = filtered.slice(startIndex, startIndex + pageSize)
      
      setFilteredHerbs(paginatedResults)
    })
  }, [herbs, filters, page, pageSize])

  // 防抖搜索 - 增加延迟时间减少计算频率
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters()
    }, 500) // 增加到500ms防抖

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
    console.log('[HerbFinder] 🔄 刷新草药数据')
    setFilteredHerbs(allHerbsData.slice(0, pageSize))
    setError(null)
    setPage(1)
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
                <PopularCategory
                  key={category.label}
                  iconName={category.iconName}
                  label={category.label}
                  onClick={() => handleCategorySelect(category.label)}
                  isActive={filters.category === category.label}
                />
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
                  aria-label="Search herbs by name, symptoms, or benefits"
                  role="searchbox"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                    showFilters ? 'bg-green-100 text-green-700' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  aria-expanded={showFilters}
                  aria-controls="filter-panel"
                  aria-label={`${showFilters ? 'Hide' : 'Show'} advanced filters`}
                >
                  <Filter className="w-5 h-5 mr-2" aria-hidden="true" />
                  Advanced Filters
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                
                <button
                  onClick={refreshData}
                  className="flex items-center px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-colors"
                  aria-label="Refresh herb data"
                >
                  <RefreshCw className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
                        
            {/* Expanded Filters */}
            {showFilters && (
              <div 
                id="filter-panel" 
                className="mt-6 pt-6 border-t border-gray-200"
                role="region"
                aria-label="Advanced herb filters"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Constitution Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Constitution Type
                    </label>
                    <select
                      value={filters.constitution}
                      onChange={(e) => handleFilterChange('constitution', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      aria-label="Filter by constitution type"
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
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      aria-label="Filter by primary benefit"
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
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      aria-label="Filter by safety level"
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

          {/* Enhanced Herbs Grid - Virtual Scrolling for Performance */}
          {!error && filteredHerbs.length > 0 && (
            <div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="grid"
              aria-label={`${filteredHerbs.length} herbs found`}
            >
              {filteredHerbs.map((herb, index) => (
                <div key={herb.id} role="gridcell" tabIndex={0}>
                  <HerbCard 
                    herb={herb} 
                    showDetailed={true}
                    aria-label={`${herb.english_name} - ${herb.chinese_name}`}
                  />
                </div>
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
