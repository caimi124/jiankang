'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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
  XCircle
} from 'lucide-react'

interface HerbData {
  id: string
  name: string
  chinese_name: string
  latin_name: string
  slug: string
  category: string
  evidence_level: 'Strong' | 'Moderate' | 'Limited'
  safety_level: 'high' | 'medium' | 'low'
  overview: string
  benefits: string[]
  active_compounds: string
  traditional_uses: string
  suitable_for: string[]
  not_suitable_for: string[]
  dosage_forms: Array<{
    form: string
    dosage: string
    usage: string
  }>
  safety_warnings: string[]
  interactions: string[]
  scientific_evidence: string
  constitution_match: Array<{
    type: string
    suitable: 'yes' | 'warning' | 'no'
    description: string
  }>
  pairs_well_with: string[]
  user_stories: Array<{
    quote: string
    author: string
    location: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
  seo_keywords: string[]
  properties: string[]
}

interface HerbDetailClientProps {
  slug: string
}

export default function HerbDetailClient({ slug }: HerbDetailClientProps) {
  const [herbData, setHerbData] = useState<HerbData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  useEffect(() => {
    async function fetchHerbData() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/herbs/${slug}`)
        const result = await response.json()
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch herb data')
        }
        
        if (!result.success) {
          throw new Error(result.message || 'Invalid response')
        }
        
        setHerbData(result.data)
      } catch (err) {
        console.error('Error fetching herb data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchHerbData()
  }, [slug])

  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'high': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'medium': return <Shield className="w-5 h-5 text-yellow-600" />
      case 'low': return <AlertTriangle className="w-5 h-5 text-red-600" />
      default: return <Shield className="w-5 h-5 text-gray-600" />
    }
  }

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-700 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200'  
      case 'low': return 'text-red-700 bg-red-50 border-red-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getSafetyLabel = (level: string) => {
    switch (level) {
      case 'high': return 'High Safety'
      case 'medium': return 'Moderate Safety'
      case 'low': return 'Use with Caution'
      default: return 'Unknown'
    }
  }

  const getEvidenceIcon = (level: string) => {
    switch (level) {
      case 'Strong': return '🏆'
      case 'Moderate': return '⭐'
      case 'Limited': return '📋'
      default: return '❓'
    }
  }

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'Strong': return 'text-emerald-700 bg-emerald-50 border-emerald-200'
      case 'Moderate': return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'Limited': return 'text-gray-700 bg-gray-50 border-gray-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getConstitutionIcon = (suitable: string) => {
    switch (suitable) {
      case 'yes': return <CheckSquare className="w-4 h-4 text-green-600" />
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'no': return <XCircle className="w-4 h-4 text-red-600" />
      default: return <HelpCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const shareHerb = () => {
    if (navigator.share) {
      navigator.share({
        title: `${herbData?.name} - Natural Herb Guide`,
        text: `Learn about ${herbData?.name} (${herbData?.chinese_name}) - ${herbData?.overview.slice(0, 100)}...`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setShowShareMenu(false)
      // 可以添加一个toast通知
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // 这里可以添加到本地存储或后端
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Herb Information</h2>
          <p className="text-gray-500">Please wait while we gather the details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Herb Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Link 
              href="/herb-finder"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Browse All Herbs
            </Link>
            <br />
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!herbData) {
    return notFound()
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
    { id: 'usage', label: 'Usage & Dosage', icon: <Clock className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety & Interactions', icon: <Shield className="w-4 h-4" /> },
    { id: 'science', label: 'Scientific Evidence', icon: <Award className="w-4 h-4" /> },
    { id: 'experiences', label: 'User Experiences', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'faqs', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-transparent"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Navigation & Actions */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/herb-finder"
              className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Herb Finder
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleFavorite}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-3 z-10">
                    <button
                      onClick={shareHerb}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Share this herb
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getEvidenceColor(herbData.evidence_level)}`}>
                  <span className="mr-2">{getEvidenceIcon(herbData.evidence_level)}</span>
                  {herbData.evidence_level} Evidence
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                  <Leaf className="w-4 h-4 mr-2" />
                  {herbData.category}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                {herbData.name}
                <span className="block text-2xl md:text-3xl text-green-200 font-normal mt-2">
                  {herbData.chinese_name}
                </span>
              </h1>

              <p className="text-xl text-green-100 mb-2 italic">
                {herbData.latin_name}
              </p>

              <p className="text-lg leading-relaxed mb-8 text-green-50">
                {herbData.overview}
              </p>

              {/* Key Benefits Preview */}
              <div className="flex flex-wrap gap-3 mb-8">
                {herbData.benefits.slice(0, 4).map((benefit, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30"
                  >
                    {benefit}
                  </span>
                ))}
                {herbData.benefits.length > 4 && (
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                    +{herbData.benefits.length - 4} more
                  </span>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-2 ${getSafetyColor(herbData.safety_level)}`}>
                    {getSafetyIcon(herbData.safety_level)}
                  </div>
                  <p className="text-sm text-green-100 font-medium">{getSafetyLabel(herbData.safety_level)}</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg mb-2">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm text-green-100 font-medium">{herbData.constitution_match.length} Constitution Types</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg mb-2">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm text-green-100 font-medium">{herbData.dosage_forms.length} Dosage Forms</p>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="w-full h-full bg-gradient-to-br from-green-300 to-emerald-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <Leaf className="w-32 h-32 text-white/80" />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Quick Action Button */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={() => setActiveTab('usage')}
                  className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  View Usage Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tab Navigation */}
      <section className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto scrollbar-hide py-4">
            <div className="flex space-x-1 min-w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* Enhanced Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Benefits Section */}
            <section className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Sparkles className="w-8 h-8 text-green-500 mr-3" />
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {herbData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Active Compounds & Traditional Uses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                  Active Compounds
                </h3>
                <p className="text-gray-700 leading-relaxed">{herbData.active_compounds}</p>
              </section>

              <section className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
                  Traditional Uses
                </h3>
                <p className="text-gray-700 leading-relaxed">{herbData.traditional_uses}</p>
              </section>
            </div>

            {/* Constitution Matching */}
            <section className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-purple-500 mr-2" />
                Constitution Matching
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {herbData.constitution_match.map((match, index) => (
                  <div key={index} className={`p-6 rounded-xl border-2 ${
                    match.suitable === 'yes' ? 'bg-green-50 border-green-200' :
                    match.suitable === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center mb-3">
                      {getConstitutionIcon(match.suitable)}
                      <h4 className="text-lg font-semibold text-gray-900 ml-2">{match.type}</h4>
                    </div>
                    <p className="text-gray-700 text-sm">{match.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Usage & Dosage Tab */}
        {activeTab === 'usage' && (
          <div className="space-y-8">
            <section className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-8 h-8 text-blue-500 mr-3" />
                Dosage Forms & Instructions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {herbData.dosage_forms.map((form, index) => (
                  <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">{form.form}</h3>
                    <div className="space-y-2">
                      <p className="text-blue-800"><strong>Dosage:</strong> {form.dosage}</p>
                      <p className="text-blue-700"><strong>Usage:</strong> {form.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <ThumbsUp className="w-6 h-6 text-green-500 mr-2" />
                  Suitable For
                </h3>
                <ul className="space-y-3">
                  {herbData.suitable_for.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <XCircle className="w-6 h-6 text-red-500 mr-2" />
                  Not Suitable For
                </h3>
                <ul className="space-y-3">
                  {herbData.not_suitable_for.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-6 h-6 text-purple-500 mr-2" />
                Pairs Well With
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {herbData.pairs_well_with.map((item, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-4 border border-purple-200 text-center">
                    <p className="text-purple-800 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Safety Tab */}
        {activeTab === 'safety' && (
          <div className="space-y-8">
            <section className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-8 h-8 text-yellow-500 mr-3" />
                Safety Information
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                    Safety Warnings
                  </h3>
                  <ul className="space-y-3">
                    {herbData.safety_warnings.map((warning, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Info className="w-5 h-5 text-blue-500 mr-2" />
                    Drug Interactions
                  </h3>
                  <ul className="space-y-3">
                    {herbData.interactions.map((interaction, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Info className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{interaction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Scientific Evidence Tab */}
        {activeTab === 'science' && (
          <div className="space-y-8">
            <section className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-8 h-8 text-emerald-500 mr-3" />
                Scientific Evidence
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{herbData.scientific_evidence}</p>
              </div>
            </section>
          </div>
        )}

        {/* User Experiences Tab */}
        {activeTab === 'experiences' && (
          <div className="space-y-8">
            <section className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageCircle className="w-8 h-8 text-indigo-500 mr-3" />
                User Experiences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {herbData.user_stories.map((story, index) => (
                  <div key={index} className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                    <blockquote className="text-indigo-800 mb-4 italic">
                      "{story.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold">{story.author.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-indigo-900">{story.author}</p>
                        <p className="text-indigo-600 text-sm">{story.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faqs' && (
          <div className="space-y-8">
            <section className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="w-8 h-8 text-teal-500 mr-3" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {herbData.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Call-to-Action Section */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
          <p className="text-xl mb-8 text-green-100">
            Explore our complete herb database and find the perfect natural remedies for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/herb-finder"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5 mr-2" />
              Explore More Herbs
            </Link>
            <Link 
              href="/constitution-test"
              className="inline-flex items-center px-8 py-4 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition-all duration-200"
            >
              <Users className="w-5 h-5 mr-2" />
              Take Constitution Test
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
