'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import { 
  ArrowLeft, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Star, 
  Heart, 
  Share2, 
  BookOpen, 
  Leaf, 
  Clock, 
  Users, 
  Target, 
  Zap,
  Award,
  TrendingUp,
  Info,
  AlertCircle,
  Download,
  Eye,
  ThumbsUp,
  MessageCircle,
  ChevronRight,
  Sparkles,
  FileText,
  Search,
  HelpCircle,
  CheckSquare,
  XCircle,
  Thermometer,
  Droplets,
  Brain,
  Globe,
  Beaker,
  Activity,
  MapPin,
  Calendar,
  Scale,
  Microscope,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus
} from 'lucide-react'
import type { Herb } from '../../../lib/herbs-data-complete'

interface HerbDetailClientProps {
  herb: Herb
}

export default function HerbDetailClient({ herb }: HerbDetailClientProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    benefits: true,
    dosage: true,
    safety: true
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const getSafetyIcon = (level: string) => {
    const normalizedLevel = level.toLowerCase()
    switch (normalizedLevel) {
      case 'high':
      case '高':
      case '高安全':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'medium':
      case 'moderate':
      case '中等':
      case '中':
        return <Shield className="w-5 h-5 text-yellow-600" />
      case 'low':
      case '低':
      case '谨慎':
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default: 
        return <Shield className="w-5 h-5 text-gray-600" />
    }
  }

  const getSafetyColor = (level: string) => {
    const normalizedLevel = level.toLowerCase()
    switch (normalizedLevel) {
      case 'high':
      case '高':
      case '高安全':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'medium':
      case 'moderate':
      case '中等':
      case '中':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'low':
      case '低':
      case '谨慎':
        return 'text-red-700 bg-red-50 border-red-200'
      default: 
        return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getSafetyLabel = (level: string) => {
    const normalizedLevel = level.toLowerCase()
    switch (normalizedLevel) {
      case 'high':
      case '高':
      case '高安全':
        return 'High Safety'
      case 'medium':
      case 'moderate':
      case '中等':
      case '中':
        return 'Moderate Safety'
      case 'low':
      case '低':
      case '谨慎':
        return 'Use with Caution'
      default: 
        return 'Unknown Safety Level'
    }
  }

  const getQualityBadge = (score: number) => {
    if (score >= 90) return { 
      label: 'Excellent', 
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
      icon: '🏆' 
    }
    if (score >= 85) return { 
      label: 'Premium', 
      color: 'bg-green-100 text-green-800 border-green-200', 
      icon: '⭐' 
    }
    if (score >= 75) return { 
      label: 'Good', 
      color: 'bg-blue-100 text-blue-800 border-blue-200', 
      icon: '👍' 
    }
    if (score >= 65) return { 
      label: 'Fair', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      icon: '📋' 
    }
    return { 
      label: 'Unrated', 
      color: 'bg-gray-100 text-gray-800 border-gray-200', 
      icon: '❓' 
    }
  }

  const shareHerb = () => {
    if (navigator.share) {
      navigator.share({
        title: `${herb.herbName} (${herb.englishName}) - HerbScience.shop`,
        text: herb.overview || herb.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setShowShareMenu(false)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // TODO: Add to localStorage or backend
  }

  const qualityBadge = getQualityBadge(herb.qualityScore || 0)

  const parseFAQ = (faqString: string) => {
    if (!faqString) return []
    
    const faqPairs = faqString.split(/Q:|A:/).filter(item => item.trim())
    const faqs = []
    
    for (let i = 0; i < faqPairs.length; i += 2) {
      if (faqPairs[i] && faqPairs[i + 1]) {
        faqs.push({
          question: faqPairs[i].trim(),
          answer: faqPairs[i + 1].trim()
        })
      }
    }
    
    return faqs
  }

  const faqs = parseFAQ(herb.faq || '')

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/herb-finder" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Herb Finder
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Category & Quality Badge */}
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-8 h-8 text-emerald-200" />
                <span className="bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full text-sm font-medium">
                  {herb.category}
                </span>
                {herb.qualityScore && (
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${qualityBadge.color}`}>
                    {qualityBadge.icon} {qualityBadge.label}
                  </div>
                )}
              </div>

              {/* Main Title */}
              <h1 className="text-5xl font-bold mb-4">
                {herb.herbName} 
                <span className="block text-emerald-200 text-2xl font-normal mt-2">
                  {herb.englishName}
                </span>
              </h1>
              
              {/* Latin Name */}
              <p className="text-xl text-emerald-100 mb-6 italic">
                {herb.latinName}
              </p>

              {/* Overview */}
              <p className="text-lg leading-relaxed mb-8 text-emerald-50">
                {herb.overview || herb.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {herb.tags.slice(0, 6).map((tag, index) => (
                  <span key={index} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="w-full h-full bg-gradient-to-br from-emerald-300 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Leaf className="w-32 h-32 text-white" />
                </div>
              </div>
              
              {/* Floating Info Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  {getSafetyIcon(herb.safetyLevel)}
                  <span className="text-sm font-medium">{getSafetyLabel(herb.safetyLevel)}</span>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium">{(herb.qualityScore / 20).toFixed(1)}/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex items-center gap-4">
            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
            
            <button
              onClick={shareHerb}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            
            <div className="ml-auto flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{herb.popularityScore} views</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{Math.floor(herb.popularityScore / 2)} likes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Origin</span>
            </div>
            <p className="font-semibold text-gray-900">{herb.growingRegions.join(', ')}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Part Used</span>
            </div>
            <p className="font-semibold text-gray-900">{herb.partUsed}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Thermometer className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Constitution</span>
            </div>
            <p className="font-semibold text-gray-900">{herb.constitutionType}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Droplets className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Taste</span>
            </div>
            <p className="font-semibold text-gray-900">{herb.taste}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'benefits', label: 'Benefits & Uses', icon: Target },
                { id: 'dosage', label: 'Dosage & Usage', icon: Clock },
                { id: 'safety', label: 'Safety & Warnings', icon: Shield },
                { id: 'research', label: 'Research', icon: Microscope },
                { id: 'faq', label: 'FAQ', icon: HelpCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Constitution Match */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    Constitution Match
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Recommended For
                      </h4>
                      <p className="text-green-800 mb-4">{herb.constitutionExplanation}</p>
                      <ul className="space-y-2">
                        {herb.recommendedFor.map((constitution, index) => (
                          <li key={index} className="text-green-700 flex items-center gap-2">
                            <CheckSquare className="w-4 h-4" />
                            {constitution}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                      <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Not Recommended For
                      </h4>
                      <ul className="space-y-2">
                        {herb.notRecommendedFor.map((constitution, index) => (
                          <li key={index} className="text-red-700 flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            {constitution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Active Compounds */}
                {herb.activeCompounds && (
                  <div>
                                         <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                       <Beaker className="w-5 h-5 text-emerald-600" />
                       Active Compounds
                     </h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-800 leading-relaxed">{herb.activeCompounds}</p>
                    </div>
                  </div>
                )}

                {/* Mechanism of Action */}
                {herb.mechanismOfAction && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      How It Works
                    </h3>
                    <div className="bg-blue-50 rounded-xl p-6">
                      <p className="text-blue-900 leading-relaxed">{herb.mechanismOfAction}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    Health Benefits & Traditional Uses
                  </h3>
                  
                  {herb.benefits && (
                    <div className="bg-emerald-50 rounded-xl p-6 mb-6">
                      <h4 className="font-semibold text-emerald-900 mb-3">Primary Benefits</h4>
                      <div className="whitespace-pre-line text-emerald-800">{herb.benefits}</div>
                    </div>
                  )}

                  {herb.efficacy.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Therapeutic Categories</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {herb.efficacy.map((effect, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-gray-700">{effect}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'dosage' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  Dosage & Usage Guidelines
                </h3>

                {herb.dosage && (
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Recommended Dosage</h4>
                    <p className="text-blue-800">{herb.dosage}</p>
                  </div>
                )}

                {herb.usageTips && (
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Usage Tips</h4>
                    <div className="text-green-800 whitespace-pre-line">{herb.usageTips}</div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  Safety Information
                </h3>

                <div className={`rounded-xl p-6 border ${getSafetyColor(herb.safetyLevel)}`}>
                  <div className="flex items-center gap-3 mb-4">
                    {getSafetyIcon(herb.safetyLevel)}
                    <h4 className="font-semibold">Safety Level: {getSafetyLabel(herb.safetyLevel)}</h4>
                  </div>
                </div>

                {herb.contraindications && (
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Contraindications & Warnings
                    </h4>
                    <div className="text-red-800 whitespace-pre-line">{herb.contraindications}</div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'research' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Microscope className="w-5 h-5 text-emerald-600" />
                  Scientific Research & Studies
                </h3>

                {herb.medicalStudies && (
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h4 className="font-semibold text-purple-900 mb-3">Clinical Evidence</h4>
                    <div className="text-purple-800 whitespace-pre-line">{herb.medicalStudies}</div>
                  </div>
                )}

                {herb.caseStudy && (
                  <div className="bg-indigo-50 rounded-xl p-6">
                    <h4 className="font-semibold text-indigo-900 mb-3">Case Study</h4>
                    <div className="text-indigo-800 whitespace-pre-line">{herb.caseStudy}</div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  Frequently Asked Questions
                </h3>

                {faqs.length > 0 ? (
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <button
                          onClick={() => toggleSection(`faq-${index}`)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h4 className="font-semibold text-gray-900 pr-4">{faq.question}</h4>
                          {expandedSections[`faq-${index}`] ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        
                        {expandedSections[`faq-${index}`] && (
                          <div className="px-6 pb-4">
                            <div className="border-t border-gray-100 pt-4">
                              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No FAQ available for this herb yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Availability & Pricing */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              Availability
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Availability:</span>
                <span className="font-medium">{herb.availability}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Price Range:</span>
                <span className="font-medium">{herb.priceRange}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Source:</span>
                <span className="font-medium">{herb.source}</span>
              </div>
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Quality Metrics
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600">Quality Score:</span>
                  <span className="font-medium">{herb.qualityScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full" 
                    style={{ width: `${herb.qualityScore}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600">Popularity:</span>
                  <span className="font-medium">{herb.popularityScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${herb.popularityScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                Find Similar Herbs
              </button>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Take Constitution Test
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Download PDF Guide
              </button>
            </div>
          </div>
        </div>

        {/* Back to Search */}
        <div className="mt-12 text-center">
          <Link 
            href="/herb-finder" 
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Herb Finder
          </Link>
        </div>
      </div>
    </div>
  )
}
