'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Herb } from '../lib/herbs-recommendation'
import { 
  Leaf, 
  Shield, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  Star,
  Heart,
  CheckCircle,
  ArrowRight,
  Eye,
  Users,
  TrendingUp
} from 'lucide-react'

interface HerbRecommendationsProps {
  herbs: Herb[]
  title: string
  subtitle?: string
  showDetailed?: boolean
  maxVisible?: number
}

interface HerbCardProps {
  herb: Herb
  showDetailed?: boolean
}

export function HerbCard({ herb, showDetailed = false }: HerbCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'high': return <CheckCircle className="w-4 h-4" />
      case 'medium': return <Shield className="w-4 h-4" />
      case 'low': return <AlertTriangle className="w-4 h-4" />
      default: return <Shield className="w-4 h-4" />
    }
  }

  const getQualityBadge = (score: number) => {
    if (score >= 85) return { label: '优质', color: 'bg-green-100 text-green-800', icon: '⭐' }
    if (score >= 75) return { label: '良好', color: 'bg-blue-100 text-blue-800', icon: '👍' }
    if (score >= 65) return { label: '一般', color: 'bg-yellow-100 text-yellow-800', icon: '📋' }
    return { label: '待评', color: 'bg-gray-100 text-gray-800', icon: '❓' }
  }

  // 生成草药的slug用于URL
  const generateSlug = (chineseName: string, englishName: string) => {
    // 优先使用英文名生成slug
    if (englishName) {
      return englishName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    }
    // 如果没有英文名，使用中文名的拼音或直接转换
    return chineseName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
  }

  const herbSlug = generateSlug(herb.chinese_name, herb.english_name)

  const qualityBadge = getQualityBadge(herb.quality_score || 0)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                  {herb.chinese_name || herb.english_name}
                </h3>
                <p className="text-sm text-gray-600">{herb.english_name}</p>
              </div>
            </div>
            
            {/* Favorite Button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-lg transition-all ${
                isFavorite 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          {herb.latin_name && (
            <p className="text-xs text-gray-500 italic mb-3 font-medium">{herb.latin_name}</p>
          )}
          
          {/* Enhanced Badge Section */}
          <div className="flex flex-wrap gap-2 mb-3">
            {herb.constitution_type && (
              <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs rounded-full font-medium">
                <Users className="w-3 h-3 mr-1" />
                {herb.constitution_type}
              </span>
            )}
            {herb.quality_score && (
              <span className={`inline-flex items-center px-3 py-1 text-xs rounded-full font-medium ${qualityBadge.color}`}>
                <span className="mr-1">{qualityBadge.icon}</span>
                {qualityBadge.label} ({herb.quality_score})
              </span>
            )}
            {herb.popularity_score && herb.popularity_score > 70 && (
              <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs rounded-full font-medium">
                <TrendingUp className="w-3 h-3 mr-1" />
                热门
              </span>
            )}
          </div>
        </div>
        
        {/* Enhanced Safety Badge */}
        <div className={`flex items-center px-3 py-2 rounded-xl text-xs font-semibold border ${getSafetyColor(herb.safety_level)} shadow-sm`}>
          {getSafetyIcon(herb.safety_level)}
          <span className="ml-2">{herb.safety_level === 'high' ? '高安全' : herb.safety_level === 'medium' ? '中等' : '谨慎'}</span>
        </div>
      </div>

      {/* Enhanced Description */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-2 line-clamp-3">{herb.description}</p>
        {herb.traditional_use && (
          <p className="text-xs text-gray-600 italic">
            <span className="font-medium">传统用法：</span>{herb.traditional_use.slice(0, 80)}...
          </p>
        )}
      </div>

      {/* Enhanced Efficacy Tags with icons */}
      {herb.efficacy && herb.efficacy.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
            <Star className="w-3 h-3 mr-1 text-yellow-500" />
            主要功效
          </h4>
          <div className="flex flex-wrap gap-2">
            {herb.efficacy.slice(0, 4).map((eff, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 text-xs rounded-full font-medium border border-green-200"
              >
                {eff}
              </span>
            ))}
            {herb.efficacy.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{herb.efficacy.length - 4}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {herb.dosage && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center text-xs font-medium text-gray-700 mb-1">
              <Clock className="w-3 h-3 mr-1 text-blue-500" />
              推荐剂量
            </div>
            <p className="text-xs text-gray-600">{herb.dosage.slice(0, 20)}...</p>
          </div>
        )}
        {herb.availability && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center text-xs font-medium text-gray-700 mb-1">
              <Shield className="w-3 h-3 mr-1 text-green-500" />
              可获得性
            </div>
            <p className="text-xs text-gray-600 capitalize">{herb.availability}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <Link 
          href={`/herbs/${herbSlug}`}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          查看详情
        </Link>
        {showDetailed && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors text-sm"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                收起
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                更多
              </>
            )}
          </button>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && showDetailed && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
          {/* Composition */}
          {herb.ingredients && herb.ingredients.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">主要成分</h4>
              <div className="flex flex-wrap gap-1">
                {herb.ingredients.map((comp: string, index: number) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Usage */}
          {herb.usage_suggestions && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">使用建议</h4>
              <p className="text-sm text-gray-700">{herb.usage_suggestions}</p>
            </div>
          )}

          {/* Precautions */}
          {herb.contraindications && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" />
                注意事项
              </h4>
              <p className="text-sm text-gray-700">{herb.contraindications}</p>
            </div>
          )}

          {/* Case Study */}
          {herb.modern_applications && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">现代应用</h4>
              <p className="text-sm text-gray-700">{herb.modern_applications}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function HerbRecommendations({ 
  herbs, 
  title, 
  subtitle,
  showDetailed = false,
  maxVisible = 6
}: HerbRecommendationsProps) {
  const [showAll, setShowAll] = useState(false)
  const visibleHerbs = showAll ? herbs : herbs.slice(0, maxVisible)

  if (!herbs || herbs.length === 0) {
    return (
      <div className="text-center py-12">
        <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No herbs found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && (
          <p className="text-gray-600">{subtitle}</p>
        )}
      </div>

      {/* Herbs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleHerbs.map((herb, index) => (
          <HerbCard 
            key={`${herb.chinese_name}-${index}`} 
            herb={herb} 
            showDetailed={showDetailed}
          />
        ))}
      </div>

      {/* Show More Button */}
      {herbs.length > maxVisible && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Show All {herbs.length} Herbs <ChevronDown className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
} 