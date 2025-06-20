'use client'

import React, { useState } from 'react'
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
  CheckCircle
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Leaf className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {herb.chinese_name || herb.english_name}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-1">{herb.english_name}</p>
          {herb.constitution_type && (
            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {herb.constitution_type}
            </span>
          )}
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

      {/* Expand/Collapse Button */}
      {showDetailed && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full py-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      )}

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
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
        <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recommendations Available</h3>
        <p className="text-gray-600">We're working on getting personalized herb recommendations for you.</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border border-green-100">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 text-lg">{subtitle}</p>
        )}
        <div className="flex items-center justify-center mt-4">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-sm text-gray-700">
            {herbs.length} personalized recommendations based on your constitution
          </span>
        </div>
      </div>

      {/* Herbs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {visibleHerbs.map((herb, index) => (
          <HerbCard 
            key={herb.id || index} 
            herb={herb} 
            showDetailed={showDetailed}
          />
        ))}
      </div>

      {/* Show More/Less Button */}
      {herbs.length > maxVisible && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors inline-flex items-center"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Show {herbs.length - maxVisible} More <ChevronDown className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-yellow-800">
              <strong>Medical Disclaimer:</strong> These recommendations are for educational purposes only and are not intended to replace professional medical advice. Please consult with a qualified healthcare provider before starting any new herbal regimen, especially if you have existing health conditions or are taking medications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 