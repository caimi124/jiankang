'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { 
  Heart, Shield, Brain, Zap, AlertTriangle, Clock, 
  Star, Users, BookOpen, FlaskConical, Pill, Leaf,
  CheckCircle, XCircle, AlertCircle, ArrowRight,
  Share2, Bookmark, Download, Mail, Eye, Award,
  Coffee, Beaker, Target, Activity
} from 'lucide-react'

// 草药数据类型定义
interface HerbData {
  id: string
  name: string
  latin_name: string
  slug: string
  overview: string
  benefits: string[]
  active_compounds: string
  traditional_uses: string
  suitable_for: string[]
  not_suitable_for: string[]
  dosage_forms: {
    form: string
    dosage: string
    usage: string
  }[]
  safety_warnings: string[]
  interactions: string[]
  scientific_evidence: string
  constitution_match: {
    type: string
    suitable: 'yes' | 'warning' | 'no'
    description: string
  }[]
  pairs_well_with: string[]
  user_stories: {
    quote: string
    author: string
    location: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  seo_keywords: string[]
  evidence_level: 'Strong' | 'Moderate' | 'Limited'
  category: string
  properties: string[]
}

interface HerbDetailClientProps {
  herbData: HerbData
  slug: string
}

export default function HerbDetailClient({ herbData, slug }: HerbDetailClientProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [bookmarked, setBookmarked] = useState(false)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Herb Database', href: '/herb-finder' },
            { label: herbData.name }
          ]} 
        />

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative bg-gradient-to-r from-green-600 to-green-700 px-8 py-12">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{herbData.name}</h1>
                  <p className="text-green-100 text-lg italic mb-4">{herbData.latin_name}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {herbData.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEvidenceColor(herbData.evidence_level)}`}>
                      {herbData.evidence_level} Evidence
                    </span>
                    {herbData.properties?.map((prop, idx) => (
                      <span key={idx} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-3 rounded-full transition-colors ${
                      bookmarked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="px-8 py-6 bg-gray-50 border-b">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Safety Level</p>
                  <p className="font-semibold text-gray-900">High</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FlaskConical className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Evidence Quality</p>
                  <p className="font-semibold text-gray-900">{herbData.evidence_level}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Main Uses</p>
                  <p className="font-semibold text-gray-900">{herbData.benefits?.length || 0} Benefits</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Precautions</p>
                  <p className="font-semibold text-gray-900">{herbData.safety_warnings?.length || 0} Warnings</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: Eye },
                { id: 'benefits', label: 'Benefits & Uses', icon: Heart },
                { id: 'safety', label: 'Safety & Dosage', icon: Shield },
                { id: 'science', label: 'Scientific Evidence', icon: FlaskConical },
                { id: 'traditional', label: 'Traditional Use', icon: BookOpen },
                { id: 'faq', label: 'FAQ', icon: Users }
              ].map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
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
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What is {herbData.name}?</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{herbData.overview}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-blue-600" />
                      Key Active Compounds
                    </h3>
                    <p className="text-gray-700">{herbData.active_compounds}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      Primary Properties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {herbData.properties?.map((prop, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {prop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Modern Uses & Benefits</h2>
                  <div className="grid gap-4">
                    {herbData.benefits?.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-800">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Who Should Consider {herbData.name}?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-800 mb-3">✅ Suitable For:</h4>
                      <ul className="space-y-2">
                        {herbData.suitable_for?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800 mb-3">❌ Who Should Avoid It:</h4>
                      <ul className="space-y-2">
                        {herbData.not_suitable_for?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Dosage & Safety Guidelines</h2>
                  <div className="grid gap-6">
                    {herbData.dosage_forms?.map((form, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Pill className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold text-gray-900">{form.form}</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-gray-600">Recommended Dosage:</span>
                            <p className="text-gray-800">{form.dosage}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Usage Instructions:</span>
                            <p className="text-gray-800">{form.usage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Important Safety Warnings
                  </h3>
                  <div className="space-y-3">
                    {herbData.safety_warnings?.map((warning, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-800">{warning}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Potential Drug Interactions
                  </h3>
                  <div className="grid gap-3">
                    {herbData.interactions?.map((interaction, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-800">{interaction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'science' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FlaskConical className="w-6 h-6 text-blue-600" />
                    Scientific Evidence & Research
                  </h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-gray-800 leading-relaxed">{herbData.scientific_evidence}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Evidence Quality Rating</h3>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getEvidenceColor(herbData.evidence_level)}`}>
                      {herbData.evidence_level} Evidence
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          herbData.evidence_level === 'Strong' ? 'bg-green-500 w-full' :
                          herbData.evidence_level === 'Moderate' ? 'bg-yellow-500 w-2/3' :
                          'bg-gray-400 w-1/3'
                        }`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {herbData.evidence_level === 'Strong' && 'Multiple high-quality studies support the claimed benefits'}
                    {herbData.evidence_level === 'Moderate' && 'Some studies support the benefits, more research needed'}
                    {herbData.evidence_level === 'Limited' && 'Limited research available, traditional use primarily'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'traditional' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    Traditional Chinese Medicine Perspective
                  </h2>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <p className="text-gray-800 leading-relaxed">{herbData.traditional_uses}</p>
                  </div>
                </div>

                {herbData.constitution_match && herbData.constitution_match.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">TCM Constitution Matching</h3>
                    <div className="grid gap-4">
                      {herbData.constitution_match.map((constitution, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          {getConstitutionIcon(constitution.suitable)}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{constitution.type}</h4>
                            <p className="text-sm text-gray-600">{constitution.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {herbData.pairs_well_with && herbData.pairs_well_with.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Synergistic Combinations</h3>
                    <div className="grid gap-3">
                      {herbData.pairs_well_with.map((pairing, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Leaf className="w-4 h-4 text-green-600" />
                          <span className="text-gray-800">{pairing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Questions</h2>
                {herbData.faqs?.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-start gap-2">
                      <span className="text-green-600">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 ml-6">
                      <span className="text-blue-600 font-medium">A:</span> {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Stories Section */}
        {herbData.user_stories && herbData.user_stories.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Real User Experiences
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {herbData.user_stories.map((story, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <p className="text-gray-800 italic mb-4">"{story.quote}"</p>
                  <p className="text-sm font-medium text-gray-600">— {story.author}, {story.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Start Your Herbal Journey Today</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Ready to incorporate {herbData.name} into your wellness routine? Explore our comprehensive herb database, 
            take our personalized constitution test, or get expert guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/herb-finder" 
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Leaf className="w-4 h-4" />
              Explore Herb Database
            </Link>
            <Link 
              href="/constitution-test" 
              className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              Take Constitution Test
            </Link>
            <Link
              href="/dosage-calculator"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Pill className="w-4 h-4" />
              Dosage Calculator
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
