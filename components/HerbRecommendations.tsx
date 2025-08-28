'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Herb } from '../lib/herbs-recommendation'
import { urlFor } from '@/lib/sanity'
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

  const getSafetyBadge = (level: string) => {
    switch (level) {
      case 'high': 
        return {
          text: 'Generally safe',
          color: 'text-green-700',
          details: 'GRAS rated, minimal side effects'
        }
      case 'medium': 
        return {
          text: 'Use with caution',
          color: 'text-yellow-700',
          details: 'May have interactions or contraindications'
        }
      case 'low': 
        return {
          text: 'High caution required',
          color: 'text-red-700',
          details: 'Significant restrictions or risks'
        }
      default: 
        return {
          text: 'Consult healthcare provider',
          color: 'text-gray-700',
          details: 'Safety profile under review'
        }
    }
  }

  const getEvidenceLevel = (herb: Herb) => {
    // 基于质量分数和流行度来判断证据强度
    const score = (herb.quality_score || 70) + (herb.popularity_score || 60)
    if (score > 160) return { text: 'Strong scientific support', color: 'text-green-600' }
    if (score > 120) return { text: 'Moderate scientific support', color: 'text-yellow-600' }
    return { text: 'Traditional use evidence', color: 'text-gray-600' }
  }

  const getBestForScenario = (herb: Herb) => {
    // 根据功效生成用户场景
    const efficacy = herb.efficacy || []
    if (efficacy.includes('免疫支持') || efficacy.includes('immune')) {
      return 'Frequent infections or low immunity'
    }
    if (efficacy.includes('消化健康') || efficacy.includes('digestive')) {
      return 'Digestive discomfort or poor gut health'
    }
    if (efficacy.includes('镇静安神') || efficacy.includes('睡眠支持')) {
      return 'Stress, anxiety or sleep issues'
    }
    if (efficacy.includes('抗炎作用')) {
      return 'Inflammation or pain management'
    }
    if (efficacy.includes('能量提升') || efficacy.includes('补气养血')) {
      return 'Fatigue or low energy levels'
    }
    if (efficacy.includes('男性健康') || efficacy.includes("prostate")) {
      return "Men's vitality, frequent urination"
    }
    return 'General wellness and vitality'
  }

  const getMainBenefits = (herb: Herb) => {
    const benefits = herb.efficacy || herb.primary_effects || []
    return benefits.slice(0, 2).join(' · ') || 'Wellness Support'
  }

  // 生成草药的slug用于URL
  const generateSlug = (chineseName: string, englishName: string) => {
    if (englishName) {
      return englishName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    }
    return chineseName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
  }

  const herbSlug = (herb as any).slug || generateSlug(herb.chinese_name, herb.english_name)
  const safetyBadge = getSafetyBadge(herb.safety_level)
  const evidenceLevel = getEvidenceLevel(herb)
  const bestForScenario = getBestForScenario(herb)
  const mainBenefits = getMainBenefits(herb)

  // 格式化草药名称：英文名 (中文名)
  const formatHerbName = (englishName: string, chineseName: string) => {
    const cleanEnglish = englishName?.replace(/\(.*?\)/g, '').trim() || chineseName
    const cleanChinese = chineseName?.replace(/\s*\/\s*.*/g, '').trim()
    
    if (cleanEnglish && cleanChinese && cleanEnglish !== cleanChinese) {
      return `${cleanEnglish} (${cleanChinese})`
    }
    return cleanEnglish || cleanChinese
  }

  const formattedName = formatHerbName(herb.english_name, herb.chinese_name)

  const imageSrc = (herb as any).image_url
    ? urlFor({ _ref: (herb as any).image_url } as any).width(600).height(400).fit('crop').url()
    : undefined

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      {/* Cover Image */}
      {imageSrc && (
        <div className="mb-4 -mt-2 -mx-2">
          <img src={imageSrc} alt={formattedName} className="w-full h-40 object-cover rounded-lg" />
        </div>
      )}
      {/* Header - Herb Name with emoji */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors flex items-center">
          <span className="text-xl mr-2">🌿</span>
          {formattedName}
        </h3>
      </div>

      {/* Subheadline - Main Benefits */}
      <div className="mb-4">
        <p className="text-base font-medium text-gray-800 leading-relaxed">
          {mainBenefits}
        </p>
      </div>

      {/* Best For */}
      <div className="mb-3 flex items-start">
        <span className="text-sm mr-2">✔️</span>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-700">Best for: </span>
          <span className="text-sm text-gray-600">{bestForScenario}</span>
        </div>
      </div>

      {/* Evidence Level */}
      <div className="mb-3 flex items-start">
        <span className="text-sm mr-2">📊</span>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-700">Evidence: </span>
          <span className={`text-sm ${evidenceLevel.color}`}>{evidenceLevel.text}</span>
        </div>
      </div>

      {/* Safety Level */}
      <div className="mb-6 flex items-start">
        <span className="text-sm mr-2">🛡️</span>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-700">Safety: </span>
          <span className={`text-sm ${safetyBadge.color}`}>{safetyBadge.text}</span>
        </div>
      </div>

      {/* Call to Action Buttons */}
      <div className="space-y-3">
        {/* CTA 1 - Learn how to use */}
        <Link 
          href={`/herbs/${herbSlug}`}
          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all duration-200 text-sm font-medium group-hover:bg-green-700"
        >
          <span className="text-sm mr-1">🔍</span>
          Learn how to use
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* CTA 2 - Show More Details */}
        {showDetailed && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            <span className="text-sm mr-1">📖</span>
            {isExpanded ? 'Show Less Details' : 'Show More Details'}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Premium Badge */}
      {herb.quality_score && herb.quality_score > 80 && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full border border-yellow-200">
            <Star className="w-3 h-3 mr-1" />
            Premium
          </span>
        </div>
      )}

      {/* Expanded Details for Detailed View */}
      {isExpanded && showDetailed && (
        <div className="mt-6 pt-4 border-t border-gray-100 space-y-4">
          {/* Traditional Description */}
          {herb.description && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Leaf className="w-4 h-4 mr-2 text-green-600" />
                Traditional Use
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">{herb.description}</p>
            </div>
          )}

          {/* Dosage Information */}
          {herb.dosage && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                Recommended Dosage
              </h4>
              <p className="text-sm text-gray-700">{herb.dosage}</p>
            </div>
          )}

          {/* Safety Notes */}
          {herb.contraindications && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-600" />
                Important Notes
              </h4>
              <p className="text-sm text-gray-700">{herb.contraindications}</p>
            </div>
          )}

          {/* Extended Safety Information */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-blue-600" />
              Safety Details
            </h4>
            <p className="text-sm text-gray-700">{safetyBadge.details}</p>
          </div>
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