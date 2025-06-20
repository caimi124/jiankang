'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { HerbCard } from '../../../components/HerbRecommendations'
import { Search, Filter, Leaf, Shield, Star, ChevronDown, ChevronUp, AlertTriangle, Info } from 'lucide-react'
import type { Herb } from '../../../lib/herbs-recommendation'

export default function HerbFinderPage() {
  const [herbs, setHerbs] = useState<Herb[]>([])
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedConstitution, setSelectedConstitution] = useState<string>('')
  const [selectedSafety, setSelectedSafety] = useState<string>('')
  const [selectedEfficacy, setSelectedEfficacy] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // 体质类型选项
  const constitutionOptions = [
    { value: '', label: '全部体质' },
    { value: 'balanced', label: '平和质' },
    { value: 'qi_deficiency', label: '气虚质' },
    { value: 'yang_deficiency', label: '阳虚质' },
    { value: 'yin_deficiency', label: '阴虚质' },
    { value: 'phlegm_dampness', label: '痰湿质' },
    { value: 'damp_heat', label: '湿热质' },
    { value: 'blood_stasis', label: '血瘀质' },
    { value: 'qi_stagnation', label: '气郁质' },
    { value: 'special_constitution', label: '特禀质' }
  ]

  // 安全等级选项
  const safetyOptions = [
    { value: '', label: '全部等级' },
    { value: 'high', label: '高安全性' },
    { value: 'medium', label: '中等安全性' },
    { value: 'low', label: '低安全性' }
  ]

  // 功效选项
  const efficacyOptions = [
    { value: '', label: '全部功效' },
    { value: '免疫支持', label: '免疫支持' },
    { value: '能量提升', label: '能量提升' },
    { value: '消化健康', label: '消化健康' },
    { value: '睡眠支持', label: '睡眠支持' },
    { value: '情绪管理', label: '情绪管理' },
    { value: '呼吸系统', label: '呼吸系统' },
    { value: '肝脏健康', label: '肝脏健康' },
    { value: '解毒支持', label: '解毒支持' },
    { value: '抗炎作用', label: '抗炎作用' },
    { value: '压力与焦虑', label: '压力与焦虑' }
  ]

  // 加载草药数据
  useEffect(() => {
    const loadHerbs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/herbs/data?limit=100')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.herbs) {
          setHerbs(data.herbs)
          setFilteredHerbs(data.herbs)
        } else {
          throw new Error('Failed to fetch herbs data')
        }
      } catch (error) {
        console.error('加载草药数据失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHerbs()
  }, [])

  // 应用筛选器
  useEffect(() => {
    let filtered = [...herbs]

    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(herb =>
        herb.chinese_name.toLowerCase().includes(query) ||
        herb.english_name.toLowerCase().includes(query) ||
        herb.latin_name.toLowerCase().includes(query) ||
        herb.description.toLowerCase().includes(query)
      )
    }

    // 体质筛选
    if (selectedConstitution) {
      filtered = filtered.filter(herb => herb.constitution_type === selectedConstitution)
    }

    // 安全等级筛选
    if (selectedSafety) {
      filtered = filtered.filter(herb => herb.safety_level === selectedSafety)
    }

    // 功效筛选
    if (selectedEfficacy) {
      filtered = filtered.filter(herb =>
        herb.efficacy.some(eff => eff.includes(selectedEfficacy)) ||
        herb.primary_effects.some(eff => eff.includes(selectedEfficacy))
      )
    }

    // 按质量评分排序
    filtered.sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0))

    setFilteredHerbs(filtered)
  }, [herbs, searchQuery, selectedConstitution, selectedSafety, selectedEfficacy])

  // 清除所有筛选器
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedConstitution('')
    setSelectedSafety('')
    setSelectedEfficacy('')
  }



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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">加载草药数据库</h2>
            <p className="text-gray-600">正在获取最新的草药信息...</p>
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
              { label: '首页', href: '/zh' },
              { label: '草药查找器', href: '/zh/herb-finder' }
            ]} 
          />
        
        {/* 页面标题 */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-6 shadow-lg">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">智能草药查找器</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              探索我们完整的草药数据库，包含{herbs.length}种传统中草药，根据体质、功效和安全性进行个性化推荐
          </p>
        </div>

          {/* 搜索和筛选区域 */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
            {/* 搜索框 */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索草药名称、功效或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none text-lg"
              />
            </div>

            {/* 筛选器切换按钮 */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                高级筛选
                {showFilters ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
              </button>
              
              {(selectedConstitution || selectedSafety || selectedEfficacy || searchQuery) && (
                  <button
                  onClick={clearFilters}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  清除筛选
                </button>
              )}
            </div>

            {/* 筛选器选项 */}
            {showFilters && (
              <div className="grid md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">体质类型</label>
                  <select
                    value={selectedConstitution}
                    onChange={(e) => setSelectedConstitution(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                  >
                    {constitutionOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">安全等级</label>
                  <select
                    value={selectedSafety}
                    onChange={(e) => setSelectedSafety(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                  >
                    {safetyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">主要功效</label>
                  <select
                    value={selectedEfficacy}
                    onChange={(e) => setSelectedEfficacy(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                  >
                    {efficacyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* 结果统计 */}
          <div className="mb-8">
            <p className="text-gray-600 text-lg">
              找到 <span className="font-bold text-green-600">{filteredHerbs.length}</span> 种草药
              {filteredHerbs.length < herbs.length && (
                <span className="text-gray-500"> （共{herbs.length}种）</span>
              )}
            </p>
        </div>

          {/* 草药列表 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHerbs.map((herb) => (
              <HerbCard 
                key={herb.id} 
                herb={herb} 
                showDetailed={true}
              />
            ))}
          </div>

          {/* 无结果提示 */}
          {filteredHerbs.length === 0 && (
            <div className="text-center py-16">
              <Leaf className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">未找到匹配的草药</h3>
              <p className="text-gray-600 mb-6">请尝试调整搜索条件或筛选器</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                清除所有筛选条件
              </button>
            </div>
          )}

          {/* 数据库统计 */}
          {herbs.length > 0 && (
            <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">数据库统计</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">{herbs.length}</div>
                  <div className="text-green-100">总草药数量</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {herbs.filter(h => h.safety_level === 'high').length}
                  </div>
                  <div className="text-green-100">高安全性草药</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {new Set(herbs.flatMap(h => h.efficacy)).size}
                  </div>
                  <div className="text-green-100">独特功效类型</div>
                </div>
              </div>
            </div>
          )}

          {/* 免责声明 */}
          <div className="mt-16 bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">重要提醒</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  本信息仅供教育和参考目的。在使用任何草药之前，请咨询合格的中医师或医疗专业人员。
                  个人体质不同，草药的使用应该根据专业指导进行个性化调整。
                </p>
              </div>
            </div>
          </div>
      </div>
      </main>
    </div>
  )
} 