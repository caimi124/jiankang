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
  TrendingUp,
  Sparkles,
  Target,
  Info,
  BookOpen,
  Award,
  Zap,
  ThumbsUp,
  HelpCircle
} from 'lucide-react'

interface HerbRecommendationsProps {
  herbs: Herb[]
  title: string
  subtitle?: string
  showDetailed?: boolean
  maxVisible?: number
  language?: 'en' | 'zh'
}

interface HerbCardProps {
  herb: Herb
  showDetailed?: boolean
  language?: 'en' | 'zh'
}

export function HerbCard({ herb, showDetailed = false, language = 'en' }: HerbCardProps) {
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

  const getSafetyLabel = (level: string) => {
    const labels = {
      en: { high: 'High Safety', medium: 'Moderate', low: 'Use Caution' },
      zh: { high: '高安全', medium: '中等', low: '谨慎使用' }
    }
    return labels[language][level as keyof typeof labels[typeof language]] || labels[language].medium
  }

  const getQualityBadge = (score: number) => {
    if (score >= 90) return { 
      label: language === 'zh' ? '卓越' : 'Excellent', 
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
      icon: '🏆' 
    }
    if (score >= 85) return { 
      label: language === 'zh' ? '优质' : 'Premium', 
      color: 'bg-green-100 text-green-800 border-green-200', 
      icon: '⭐' 
    }
    if (score >= 75) return { 
      label: language === 'zh' ? '良好' : 'Good', 
      color: 'bg-blue-100 text-blue-800 border-blue-200', 
      icon: '👍' 
    }
    if (score >= 65) return { 
      label: language === 'zh' ? '一般' : 'Fair', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      icon: '📋' 
    }
    return { 
      label: language === 'zh' ? '待评' : 'Unrated', 
      color: 'bg-gray-100 text-gray-800 border-gray-200', 
      icon: '❓' 
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

  // 根据语言生成正确的链接
  const getHerbDetailLink = () => {
    const herbSlug = generateSlug(herb.chinese_name, herb.english_name)
    // 根据语言参数决定路径
    if (language === 'zh') {
      return `/zh/herbs/${herbSlug}`
    }
    return `/herbs/${herbSlug}`
  }

  const herbSlug = generateSlug(herb.chinese_name, herb.english_name)
  const qualityBadge = getQualityBadge(herb.quality_score || 0)

  // 获取价格范围显示
  const getPriceDisplay = (range: string) => {
    const prices = {
      en: { low: 'Budget', moderate: 'Moderate', high: 'Premium' },
      zh: { low: '经济型', moderate: '中档', high: '高档' }
    }
    return prices[language][range as keyof typeof prices[typeof language]] || prices[language].moderate
  }

  // 获取可用性显示
  const getAvailabilityDisplay = (availability: string) => {
    const avail = {
      en: { common: 'Common', moderate: 'Moderate', rare: 'Rare' },
      zh: { common: '常见', moderate: '一般', rare: '稀少' }
    }
    return avail[language][availability as keyof typeof avail[typeof language]] || avail[language].common
  }

  // 文本国际化
  const text = {
    en: {
      mainEffects: 'Main Effects',
      traditionalUse: 'Traditional Use',
      modernUse: 'Modern Applications',
      dosage: 'Dosage',
      quality: 'Quality Rating',
      availability: 'Availability',
      priceRange: 'Price Range',
      viewDetails: 'View Details',
      learnMore: 'Learn More',
      safetyInfo: 'Safety Info',
      constitution: 'Constitution Match',
      more: 'more',
      viewFullProfile: 'View Full Profile',
      addToFavorites: 'Add to Favorites',
      researchBacked: 'Research Backed',
      traditionalMedicine: 'Traditional Medicine'
    },
    zh: {
      mainEffects: '主要功效',
      traditionalUse: '传统用法',
      modernUse: '现代应用',
      dosage: '推荐剂量',
      quality: '质量评级',
      availability: '可获得性',
      priceRange: '价格范围',
      viewDetails: '查看详情',
      learnMore: '了解更多',
      safetyInfo: '安全信息',
      constitution: '体质匹配',
      more: '更多',
      viewFullProfile: '查看完整资料',
      addToFavorites: '加入收藏',
      researchBacked: '科研支持',
      traditionalMedicine: '传统医学'
    }
  }

  const t = text[language]

  return (
    <article className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-50 via-emerald-25 to-transparent rounded-full -mr-20 -mt-20 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-50 to-transparent rounded-full -ml-12 -mb-12 opacity-40"></div>
      
      {/* Header Section - Enhanced */}
      <header className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-tight">
                  {language === 'zh' ? herb.chinese_name : herb.english_name}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  {language === 'zh' ? herb.english_name : herb.chinese_name}
                </p>
              </div>
            </div>
            
            {/* Enhanced Favorite Button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isFavorite 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100 shadow-sm' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              aria-label={t.addToFavorites}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          {herb.latin_name && (
            <p className="text-xs text-gray-500 italic mb-4 font-medium bg-gray-50 px-2 py-1 rounded-lg inline-block">{herb.latin_name}</p>
          )}
          
          {/* Enhanced Badge Section */}
          <div className="flex flex-wrap gap-2 mb-4">
            {herb.constitution_type && (
              <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs rounded-full font-medium border border-blue-200">
                <Users className="w-3 h-3 mr-1" />
                {herb.constitution_type}
              </span>
            )}
            {herb.quality_score && (
              <span className={`inline-flex items-center px-3 py-1.5 text-xs rounded-full font-medium border ${qualityBadge.color}`}>
                <span className="mr-1">{qualityBadge.icon}</span>
                {qualityBadge.label} ({herb.quality_score})
              </span>
            )}
            {herb.popularity_score && herb.popularity_score > 70 && (
              <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs rounded-full font-medium border border-purple-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                {language === 'zh' ? '热门' : 'Popular'}
              </span>
            )}
            {herb.quality_score && herb.quality_score >= 80 && (
              <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 text-xs rounded-full font-medium border border-amber-200">
                <Award className="w-3 h-3 mr-1" />
                {t.researchBacked}
              </span>
            )}
          </div>
        </div>
        
        {/* Enhanced Safety Badge */}
        <div className={`flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold border shadow-sm ${getSafetyColor(herb.safety_level)}`}>
          {getSafetyIcon(herb.safety_level)}
          <span className="ml-2">{getSafetyLabel(herb.safety_level)}</span>
        </div>
      </header>

      {/* Enhanced Description Section */}
      <section className="mb-5">
        <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-3">{herb.description}</p>
        {herb.traditional_use && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg mb-3">
            <p className="text-xs text-amber-800">
              <span className="font-semibold flex items-center gap-1 mb-1">
                <BookOpen className="w-3 h-3" />
                {t.traditionalUse}：
              </span>
              {herb.traditional_use.slice(0, 100)}...
            </p>
          </div>
        )}
      </section>

      {/* Enhanced Efficacy Tags with Better Organization */}
      {herb.efficacy && herb.efficacy.length > 0 && (
        <section className="mb-5">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Sparkles className="w-4 h-4 mr-1 text-green-500" />
            {t.mainEffects}
          </h4>
          <div className="flex flex-wrap gap-2">
            {herb.efficacy.slice(0, 5).map((eff, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 text-xs rounded-full font-medium border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-colors"
              >
                {eff}
              </span>
            ))}
            {herb.efficacy.length > 5 && (
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium border border-gray-200">
                +{herb.efficacy.length - 5} {t.more}
              </span>
            )}
          </div>
        </section>
      )}

      {/* Enhanced Info Grid with Better UX */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {herb.dosage && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center text-xs font-medium text-blue-700 mb-1">
              <Clock className="w-3 h-3 mr-1" />
              {t.dosage}
            </div>
            <p className="text-xs text-blue-600 font-medium">{herb.dosage.slice(0, 30)}...</p>
          </div>
        )}
        {herb.availability && (
          <div className="bg-green-50 rounded-lg p-3 border border-green-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center text-xs font-medium text-green-700 mb-1">
              <Target className="w-3 h-3 mr-1" />
              {t.availability}
            </div>
            <p className="text-xs text-green-600 font-medium capitalize">{getAvailabilityDisplay(herb.availability)}</p>
          </div>
        )}
        {herb.price_range && (
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center text-xs font-medium text-purple-700 mb-1">
              <Zap className="w-3 h-3 mr-1" />
              {t.priceRange}
            </div>
            <p className="text-xs text-purple-600 font-medium">{getPriceDisplay(herb.price_range)}</p>
          </div>
        )}
                 {herb.contraindications && (
           <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 hover:shadow-sm transition-shadow">
             <div className="flex items-center text-xs font-medium text-amber-700 mb-1">
               <Info className="w-3 h-3 mr-1" />
               {t.safetyInfo}
             </div>
             <p className="text-xs text-amber-600">{herb.contraindications.slice(0, 30)}...</p>
           </div>
         )}
      </section>

      {/* Enhanced Action Buttons */}
      <footer className="flex gap-3">
        <Link 
          href={getHerbDetailLink()}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-4 rounded-xl transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          aria-label={`${t.viewDetails} ${herb.chinese_name}`}
        >
          <Eye className="w-4 h-4" />
          {t.viewDetails}
        </Link>
        
        {showDetailed && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-all duration-200 text-sm font-medium border border-gray-200"
            aria-label={t.learnMore}
          >
            <HelpCircle className="w-4 h-4" />
            {t.learnMore}
          </button>
        )}
      </footer>

      {/* Expandable Content for Enhanced UX */}
      {isExpanded && showDetailed && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-fadeIn">
          {herb.modern_applications && (
            <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
              <h5 className="text-sm font-semibold text-indigo-700 mb-2 flex items-center">
                <ThumbsUp className="w-3 h-3 mr-1" />
                {t.modernUse}
              </h5>
              <p className="text-xs text-indigo-600 leading-relaxed">{herb.modern_applications.slice(0, 200)}...</p>
            </div>
          )}
          {herb.ingredients && herb.ingredients.length > 0 && (
            <div className="bg-rose-50 rounded-lg p-3 border border-rose-100">
              <h5 className="text-sm font-semibold text-rose-700 mb-2">Key Components</h5>
              <div className="flex flex-wrap gap-1">
                {herb.ingredients.slice(0, 4).map((ingredient, index) => (
                  <span key={index} className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default function HerbRecommendations({ 
  herbs, 
  title, 
  subtitle,
  showDetailed = false,
  maxVisible = 6,
  language = 'en'
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
            language={language}
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