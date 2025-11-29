'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import MedicalReviewBanner from '../../../components/MedicalReviewBanner'
import { 
  Heart, Shield, Brain, Zap, AlertTriangle, 
  Star, Users, BookOpen, FlaskConical, Pill, Leaf,
  CheckCircle, XCircle, AlertCircle, Share2, Bookmark,
  Coffee, Beaker, Target, Activity, Eye, Award,
  TrendingUp, Baby, Dumbbell, Scale, Sparkles
} from 'lucide-react'

interface FenugreekClientProps {
  herbData: any
}

export default function FenugreekClient({ herbData }: FenugreekClientProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [bookmarked, setBookmarked] = useState(false)
  const [expandedPairing, setExpandedPairing] = useState<number | null>(null)

  // 获取体质匹配图标
  const getConstitutionIcon = (suitable: string) => {
    switch (suitable) {
      case 'yes': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'no': return <XCircle className="w-5 h-5 text-red-500" />
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  // 获取证据等级颜色
  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'Strong': return 'bg-green-100 text-green-800'
      case 'Moderate': return 'bg-yellow-100 text-yellow-800'
      case 'Limited': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // 用例图标映射
  const useCaseIcons: Record<string, any> = {
    'Testosterone Support': Dumbbell,
    'Lactation Support': Baby,
    'Blood Sugar Control & Weight Loss': Scale,
    'Hair Growth': Sparkles
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Herb Database', href: '/herb-finder' },
            { label: 'Fenugreek' }
          ]} 
        />

        {/* Medical Review Banner */}
        <MedicalReviewBanner 
          reviewerName="曾楚平 (Zeng Chuping)"
          reviewerTitle="Licensed Pharmacist & TCM Expert"
          reviewerCredentials="Southern Medical University Graduate"
          lastUpdated={new Date()}
          reviewerLink="/about"
        />

        {/* Hero Section with Enhanced CTAs */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="relative bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 px-8 py-12">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
            
            <div className="relative">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                    {herbData.name} <span className="text-green-200">({herbData.chinese_name})</span>
                  </h1>
                  <p className="text-green-100 text-lg italic mb-4">{herbData.latin_name}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {herbData.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${getEvidenceColor(herbData.evidence_level)}`}>
                      ⭐ {herbData.evidence_level} Evidence
                    </span>
                    {herbData.tags?.slice(0, 3).map((tag: string, idx: number) => (
                      <span key={idx} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-3 rounded-full transition-all ${
                      bookmarked 
                        ? 'bg-red-500 text-white shadow-lg scale-110' 
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                    }`}
                    aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all"
                    aria-label="Share page"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Value Proposition */}
              <div className="mt-6 p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                <p className="text-white text-lg font-medium mb-2">
                  🎯 <strong>Personalized Herbal Medicine:</strong> Find the right fenugreek dosage for YOUR body type
                </p>
                <p className="text-green-100 text-sm">
                  Not all supplements work for everyone. Use TCM constitution matching to maximize benefits and avoid side effects.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Stats - 4 Key Metrics */}
          <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-green-50 border-b">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Dumbbell className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">For Men</p>
                  <p className="font-bold text-gray-900">+12-20% Testosterone</p>
                  <p className="text-xs text-gray-500">Clinical studies, 600mg daily</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-pink-100 p-3 rounded-xl">
                  <Baby className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">For Women</p>
                  <p className="font-bold text-gray-900">+20-40% Milk Supply</p>
                  <p className="text-xs text-gray-500">Within 24-72 hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Blood Sugar</p>
                  <p className="font-bold text-gray-900">-26 mg/dL Average</p>
                  <p className="text-xs text-gray-500">Fasting glucose reduction</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Safety Rating</p>
                  <p className="font-bold text-gray-900">GRAS Status</p>
                  <p className="text-xs text-gray-500">FDA Generally Recognized as Safe</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 px-8 overflow-x-auto scrollbar-hide">
              {[
                { id: 'overview', label: 'Overview', icon: Eye },
                { id: 'benefits', label: 'Benefits & Uses', icon: Heart },
                { id: 'constitution', label: 'Body Type Match', icon: Activity },
                { id: 'pairing', label: 'Herb Pairing', icon: Leaf },
                { id: 'dosage', label: 'Dosage & Safety', icon: Shield },
                { id: 'science', label: 'Clinical Evidence', icon: FlaskConical },
                { id: 'faq', label: 'FAQ', icon: Users }
              ].map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600 bg-green-50/50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">What is Fenugreek?</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed">{herbData.overview}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Active Compounds */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-blue-600" />
                      Key Active Compounds
                    </h3>
                    <div className="text-gray-700 space-y-3 text-sm">
                      {herbData.active_compounds.split('\n\n').map((compound: string, idx: number) => {
                        const [title, ...rest] = compound.split(':')
                        return (
                          <div key={idx} className="bg-white/50 p-3 rounded-lg">
                            <strong className="text-blue-900">{title}:</strong>
                            <span className="text-gray-600">{rest.join(':')}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* TCM Properties */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      TCM Properties
                    </h3>
                    <div className="space-y-2">
                      {herbData.properties?.map((prop: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 bg-white/50 p-2 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm font-medium">{prop}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mechanism of Action */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-purple-600" />
                    How Fenugreek Works in Your Body
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {herbData.mechanism_of_action?.map((mechanism: any, idx: number) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                            {idx + 1}
                          </div>
                          {mechanism.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{mechanism.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BENEFITS TAB */}
            {activeTab === 'benefits' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Science-Backed Health Benefits</h2>
                  <div className="grid gap-4">
                    {herbData.benefits?.map((benefit: string, idx: number) => {
                      const isForMen = benefit.toLowerCase().includes('men') || benefit.toLowerCase().includes('testosterone') || benefit.toLowerCase().includes('prostate') || benefit.toLowerCase().includes('sexual function')
                      const isForWomen = benefit.toLowerCase().includes('women') || benefit.toLowerCase().includes('breastfeeding') || benefit.toLowerCase().includes('menstrual') || benefit.toLowerCase().includes('menopausal')
                      
                      return (
                        <div key={idx} className={`flex items-start gap-4 p-6 rounded-xl border-2 hover:shadow-lg transition-all ${
                          isForMen ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200' :
                          isForWomen ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200' :
                          'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                        }`}>
                          <CheckCircle className={`w-6 h-6 mt-0.5 flex-shrink-0 ${
                            isForMen ? 'text-blue-600' : isForWomen ? 'text-pink-600' : 'text-green-600'
                          }`} />
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium">{benefit}</p>
                            {isForMen && (
                              <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                👨 Men's Health
                              </span>
                            )}
                            {isForWomen && (
                              <span className="inline-block mt-2 text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full font-medium">
                                👩 Women's Health
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Who Should Use */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      Perfect For:
                    </h3>
                    <ul className="space-y-3">
                      {herbData.suitable_for?.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-green-600 text-lg flex-shrink-0">✓</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                      <XCircle className="w-6 h-6" />
                      Avoid If:
                    </h3>
                    <ul className="space-y-3">
                      {herbData.not_suitable_for?.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-red-600 text-lg flex-shrink-0">✗</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* User Stories */}
                {herbData.user_stories && herbData.user_stories.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-500" />
                      Real User Experiences
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {herbData.user_stories.map((story: any, idx: number) => {
                        const UseCaseIcon = useCaseIcons[story.useCase] || Users
                        return (
                          <div key={idx} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-yellow-100 p-2 rounded-full">
                                <UseCaseIcon className="w-5 h-5 text-yellow-700" />
                              </div>
                              <div className="flex-1">
                                <span className="text-xs font-bold text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full">
                                  {story.useCase}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-700 italic mb-3 leading-relaxed">"{story.quote}"</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">— {story.author}</span>
                              <span className="text-gray-400">•</span>
                              <span>{story.location}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CONSTITUTION TAB - 核心价值主张 */}
            {activeTab === 'constitution' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
                  <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                    <Activity className="w-8 h-8" />
                    Find Your Perfect Match: TCM Body Type Guide
                  </h2>
                  <p className="text-blue-100 text-lg leading-relaxed mb-4">
                    Traditional Chinese Medicine teaches that <strong>not all herbs work for all people</strong>. 
                    Fenugreek's warming nature makes it ideal for some body types but problematic for others.
                  </p>
                  <p className="text-white font-medium">
                    🎯 <strong>Core Value:</strong> Avoid wasting money and risking side effects. 
                    Use our evidence-based body type matching to find if fenugreek is right for YOU.
                  </p>
                </div>

                {/* Constitution Match Grid */}
                <div className="grid gap-4">
                  {herbData.constitution_match?.map((match: any, idx: number) => {
                    const bgColor = match.suitable === 'yes' ? 'from-green-50 to-emerald-50' :
                                   match.suitable === 'warning' ? 'from-yellow-50 to-orange-50' :
                                   'from-red-50 to-pink-50'
                    const borderColor = match.suitable === 'yes' ? 'border-green-300' :
                                       match.suitable === 'warning' ? 'border-yellow-300' :
                                       'border-red-300'
                    
                    return (
                      <div key={idx} className={`bg-gradient-to-r ${bgColor} border-2 ${borderColor} rounded-xl p-6`}>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {getConstitutionIcon(match.suitable)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{match.type}</h3>
                            <div className="prose prose-sm max-w-none mb-3">
                              <p className="text-gray-700 leading-relaxed">{match.description}</p>
                            </div>
                            {match.recommendations && (
                              <div className="bg-white/60 rounded-lg p-4 mt-3">
                                <p className="text-sm font-medium text-gray-900 mb-1">📋 Recommendations:</p>
                                <p className="text-sm text-gray-700">{match.recommendations}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* CTA to Constitution Test */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                  <h3 className="text-2xl font-bold mb-3">Not Sure About Your Body Type?</h3>
                  <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                    Take our free 2-minute TCM Constitution Test to discover your unique body type 
                    and get personalized herb recommendations based on scientific principles.
                  </p>
                  <Link
                    href="/constitution-test"
                    className="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Brain className="w-6 h-6" />
                    Take Free Constitution Test
                    <span className="text-sm bg-indigo-100 px-2 py-1 rounded-full">2 min</span>
                  </Link>
                </div>

                {/* Traditional Uses */}
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    Traditional Chinese Medicine Perspective
                  </h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{herbData.traditional_uses}</p>
                  </div>
                </div>
              </div>
            )}

            {/* HERB PAIRING TAB - 新功能 */}
            {activeTab === 'pairing' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl p-8">
                  <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                    <Leaf className="w-8 h-8" />
                    Herb Pairing: Maximize Fenugreek's Benefits
                  </h2>
                  <p className="text-green-100 text-lg leading-relaxed">
                    Combining fenugreek with complementary herbs can enhance effectiveness, reduce side effects, 
                    and target multiple health goals simultaneously. These pairings are based on both traditional wisdom 
                    and modern research.
                  </p>
                </div>

                <div className="grid gap-6">
                  {herbData.pairs_well_with?.map((pairing: any, idx: number) => (
                    <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                      <div 
                        className="p-6 cursor-pointer"
                        onClick={() => setExpandedPairing(expandedPairing === idx ? null : idx)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                                {idx + 1}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900">{pairing.herb}</h3>
                            </div>
                            <p className="text-green-600 font-semibold mb-2">✓ {pairing.benefit}</p>
                            {expandedPairing === idx && (
                              <div className="mt-4 space-y-3">
                                <p className="text-gray-700 leading-relaxed">{pairing.description}</p>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                  <p className="text-sm font-medium text-gray-900 mb-1">📋 How to Use:</p>
                                  <p className="text-sm text-gray-700">{pairing.usage}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            {expandedPairing === idx ? '▲' : '▼'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Safety Note */}
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">⚠️ Important Safety Note</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Always consult a qualified healthcare practitioner or TCM herbalist before combining herbs, 
                        especially if you are taking prescription medications, pregnant, nursing, or have chronic health conditions. 
                        Start with single herbs first to assess individual tolerance before combining.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DOSAGE & SAFETY TAB */}
            {activeTab === 'dosage' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Dosage Guidelines by Health Goal</h2>
                  <div className="grid gap-6">
                    {herbData.dosage_forms?.map((form: any, idx: number) => (
                      <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-blue-100 p-3 rounded-xl">
                            <Pill className="w-6 h-6 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{form.form}</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <span className="text-sm font-bold text-blue-900 block mb-1">Recommended Dosage:</span>
                            <p className="text-gray-800 font-medium">{form.dosage}</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <span className="text-sm font-bold text-green-900 block mb-1">How to Use:</span>
                            <p className="text-gray-800">{form.usage}</p>
                          </div>
                        </div>
                        {form.notes && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-sm text-gray-700">
                              <strong>💡 Note:</strong> {form.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety Warnings */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    Important Safety Warnings
                  </h3>
                  <div className="space-y-3">
                    {herbData.safety_warnings?.map((warning: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-800">{warning}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drug Interactions */}
                {herbData.interactions && herbData.interactions.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      Potential Drug Interactions
                    </h3>
                    <div className="space-y-3">
                      {herbData.interactions.map((interaction: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-800">{interaction}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CLINICAL EVIDENCE TAB */}
            {activeTab === 'science' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FlaskConical className="w-8 h-8 text-blue-600" />
                    Clinical Research & Evidence
                  </h2>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <div className="prose prose-sm max-w-none">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {herbData.scientific_evidence}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidence Quality Rating */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Evidence Quality Rating</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-6 py-3 rounded-full text-sm font-bold ${getEvidenceColor(herbData.evidence_level)}`}>
                      {herbData.evidence_level} Evidence
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          herbData.evidence_level === 'Strong' ? 'bg-green-500 w-full' :
                          herbData.evidence_level === 'Moderate' ? 'bg-yellow-500 w-2/3' :
                          'bg-gray-400 w-1/3'
                        }`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {herbData.evidence_level === 'Strong' && '✅ Multiple high-quality randomized controlled trials (RCTs) and systematic reviews support the claimed benefits with consistent positive outcomes.'}
                    {herbData.evidence_level === 'Moderate' && '⚠️ Some clinical studies support the benefits, but more high-quality research is needed for definitive conclusions.'}
                    {herbData.evidence_level === 'Limited' && '⚠️ Limited research available. Benefits are primarily based on traditional use and preliminary studies.'}
                  </p>
                </div>
              </div>
            )}

            {/* FAQ TAB */}
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Users className="w-8 h-8 text-purple-600" />
                  Frequently Asked Questions
                </h2>
                {herbData.faqs?.map((faq: any, idx: number) => (
                  <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-2">
                      <span className="text-purple-600 flex-shrink-0">Q{idx + 1}:</span>
                      {faq.question}
                    </h3>
                    <div className="pl-8">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Personalized Herbal Journey?</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Discover your unique body constitution and get customized herb recommendations that actually work for YOU.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/constitution-test"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg"
            >
              <Activity className="w-5 h-5" />
              Take Constitution Test
            </Link>
            <Link
              href="/herb-finder"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition-all"
            >
              <Leaf className="w-5 h-5" />
              Browse More Herbs
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
