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
  Eye
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

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Leaf className="w-5 h-5 text-green-600 mr-2 group-hover:text-green-700 transition-colors" />
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-green-700 transition-colors">
              {herb.chinese_name || herb.english_name}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">{herb.english_name}</p>
          {herb.latin_name && (
            <p className="text-xs text-gray-500 italic mb-2">{herb.latin_name}</p>
          )}
          <div className="flex flex-wrap gap-1 mb-2">
            {herb.constitution_type && (
              <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                {herb.constitution_type}
              </span>
            )}
            {herb.quality_score && herb.quality_score > 80 && (
              <span className="inline-flex items-center px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </span>
            )}
          </div>
        </div>
        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(herb.safety_level)}`}>
          {getSafetyIcon(herb.safety_level)}
          <span className="ml-1 capitalize">{herb.safety_level}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{herb.description}</p>

      {/* Efficacy Tags */}
      {herb.efficacy && herb.efficacy.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {herb.efficacy.slice(0, 3).map((eff, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md"
            >
              {eff}
            </span>
          ))}
          {herb.efficacy.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
              +{herb.efficacy.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-2 mb-4">
        {herb.dosage && (
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-gray-600">剂量: </span>
            <span className="text-gray-800 ml-1">{herb.dosage}</span>
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