'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Herb } from '../lib/herbs-recommendation'
import { urlFor } from '@/lib/sanity'
import { generateHerbSlug } from '@/lib/herb-slug-utils'
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
  const router = useRouter()

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

  // 兼容 Sanity 返回的 slug 结构（可能为 { current: string }）与普通字符串
  const herbSlug = (herb as any)?.slug?.current || (herb as any)?.slug || generateHerbSlug(herb.chinese_name, herb.english_name, herb.id)
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

  const handleHerbClick = (e: React.MouseEvent) => {
    console.log(`[HerbCard] 点击事件触发: ${herb.chinese_name}`)
    console.log(`[HerbCard] 点击目标:`, e.target)
    console.log(`[HerbCard] 目标slug: ${herbSlug}`)
    
    // 如果点击的是按钮区域，不要跳转
    const isButtonClick = (e.target as HTMLElement).closest('button')
    if (isButtonClick) {
      console.log(`[HerbCard] 按钮点击，取消导航`)
      return
    }
    
    console.log(`[HerbCard] 导航到: /herbs/${herbSlug}`)
    router.push(`/herbs/${herbSlug}`)
  }

  return (
    <div 
      onClick={handleHerbClick} 
      className="block cursor-pointer relative hover:scale-105 transition-transform duration-200"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 group cursor-pointer">
        {/* Cover Image */}
        {imageSrc && (
          <div className="mb-4 -mt-2 -mx-2">
            <Image 
              src={imageSrc} 
              alt={formattedName} 
              width={600} 
              height={160} 
              className="w-full h-40 object-cover rounded-lg"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
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

      {/* Action Area */}
      <div className="space-y-3">
        {/* Click Hint - Only show if not in detailed view */}
        {!showDetailed && (
          <div className="text-center">
            <p className="text-sm text-green-600 font-medium flex items-center justify-center">
              <Eye className="w-4 h-4 mr-1" />
              Click anywhere to view details
              <ArrowRight className="w-4 h-4 ml-1" />
            </p>
          </div>
        )}
        
        {/* For detailed view, show a different message */}
        {showDetailed && (
          <div className="text-center border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500 flex items-center justify-center">
              <Eye className="w-3 h-3 mr-1" />
              Click anywhere on the card to see full herb details
              <ArrowRight className="w-3 h-3 ml-1" />
            </p>
          </div>
        )}

        {/* Show More Details Button (only for detailed view) */}
        {showDetailed && (
          <button
            onClick={(e) => {
              e.stopPropagation() // 阻止事件冒泡到父容器
              setIsExpanded(!isExpanded)
            }}
            className="flex items-center justify-center gap-2 w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
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