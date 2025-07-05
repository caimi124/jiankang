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

  const getSafetyText = (level: string) => {
    switch (level) {
      case 'high': 
        return 'Generally safe'
      case 'medium': 
        return 'Use with caution'
      case 'low': 
        return 'Avoid without medical supervision'
      default: 
        return 'Consult healthcare provider'
    }
  }

  const getEvidenceText = (herb: Herb) => {
    const score = (herb.quality_score || 70) + (herb.popularity_score || 60)
    if (score > 160) return 'Strong scientific support'
    if (score > 120) return 'Moderate scientific support'
    return 'Traditional use evidence'
  }

  const getBestForScenario = (herb: Herb) => {
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
    return 'General wellness and vitality'
  }

  const getMainBenefits = (herb: Herb) => {
    const benefits = herb.efficacy || herb.primary_effects || []
    return benefits.slice(0, 2).join(' · ') || 'Wellness Support'
  }

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

  const herbSlug = generateSlug(herb.chinese_name, herb.english_name)
  const safetyText = getSafetyText(herb.safety_level)
  const evidenceText = getEvidenceText(herb)
  const bestForScenario = getBestForScenario(herb)
  const mainBenefits = getMainBenefits(herb)

  // 格式化草药名称显示
  const formatHerbName = () => {
    const englishName = herb.english_name || herb.chinese_name
    const chineseName = herb.chinese_name
    
    if (englishName && chineseName && englishName !== chineseName) {
      return `${englishName} (${chineseName})`
    }
    return englishName || chineseName
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      {/* Herb Name */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
          <span className="mr-2">🌿</span>
          {formatHerbName()}
        </h3>
      </div>

      {/* Subheadline - Main Benefits */}
      <div className="mb-4">
        <p className="text-base font-medium text-gray-700 leading-relaxed">
          {mainBenefits}
        </p>
      </div>

      {/* Best For */}
      <div className="mb-3">
        <p className="text-sm text-gray-600">
          <span className="mr-2">✔️</span>
          <span className="font-medium">Best for:</span> {bestForScenario}
        </p>
      </div>

      {/* Evidence Level */}
      <div className="mb-3">
        <p className="text-sm text-gray-600">
          <span className="mr-2">📊</span>
          <span className="font-medium">Evidence:</span> {evidenceText}
        </p>
      </div>

      {/* Safety Level */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          <span className="mr-2">🛡️</span>
          <span className="font-medium">Safety:</span> {safetyText}
        </p>
      </div>

      {/* Call to Action Buttons */}
      <div className="space-y-3">
        <Link 
          href={`/herbs/${herbSlug}`}
          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
        >
          <span className="mr-1">🔍</span>
          Learn how to use
          <ArrowRight className="w-4 h-4" />
        </Link>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
        >
          <span className="mr-1">📖</span>
          Show More Details
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
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

          {/* Usage Suggestions */}
          {herb.usage_suggestions && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-600" />
                Usage Tips
              </h4>
              <p className="text-sm text-gray-700">{herb.usage_suggestions}</p>
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