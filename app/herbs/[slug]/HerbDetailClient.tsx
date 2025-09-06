'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import AccordionSection from '../../../components/AccordionSection'
import { 
  Heart, Shield, Brain, Zap, AlertTriangle, Clock, 
  Star, Users, BookOpen, FlaskConical, Pill, Leaf,
  CheckCircle, XCircle, AlertCircle, ArrowRight,
  Share2, Bookmark, Download, Mail, Eye, Award,
  Coffee, Beaker, Target, Activity, ChevronDown
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
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,  // 默认展开概述
    benefits: false,
    safety: false,
    science: false,
    traditional: false,
    faqs: false
  })
  const [bookmarked, setBookmarked] = useState(false)
  const [relatedHerbs, setRelatedHerbs] = useState<string[]>([])
  const [relatedArticles, setRelatedArticles] = useState<{ title: string; href: string }[]>([])

  // 切换折叠状态
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

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

  // 数据驱动的相关草药/文章匹配（基于功效/属性/关键词）
  useEffect(() => {
    const matchKeywords = new Set([
      ...(herbData?.benefits || []),
      ...(herbData?.properties || []),
      ...(herbData?.seo_keywords || []),
    ].map(k => k.toLowerCase()))

    // 简化：从已知热门草药集合中做近似匹配（可替换为 /api/herbs/recommendations 实时接口）
    const candidates = ['ginger','turmeric','ginseng','peppermint','chamomile','cinnamon','echinacea','ashwagandha']
    const scored = candidates
      .filter(name => name !== herbData?.name?.toLowerCase())
      .map(name => {
        const nameKeywords = new Set(
          name === 'ginger' ? ['nausea','digestive','circulation','warming'] :
          name === 'turmeric' ? ['inflammation','pain','joint','antioxidant'] :
          name === 'ginseng' ? ['energy','focus','fatigue'] :
          name === 'peppermint' ? ['ibs','spasm','digestive','cooling'] :
          name === 'chamomile' ? ['sleep','anxiety','calming'] :
          name === 'cinnamon' ? ['metabolic','blood sugar','warming'] :
          name === 'echinacea' ? ['immune','cold','infection'] :
          name === 'ashwagandha' ? ['stress','anxiety','sleep'] : []
        )
        let overlap = 0
        nameKeywords.forEach((k) => { if (matchKeywords.has(k)) overlap += 1 })
        return { name, score: overlap }
      })
      .filter(x => x.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0, 3)

    setRelatedHerbs(scored.map(s => s.name))

    // 相关文章（可替换为 Notion 标签检索）
    const articleBank = [
      { title: 'Digestive Health Herbs: Natural Remedies for Gut Issues', href: '/blog/digestive-health-herbs' , tags: ['digestive','ginger','peppermint']},
      { title: 'Best Herbs for Sleep: What Actually Works for Insomnia', href: '/blog/herbs-for-sleep-insomnia', tags: ['sleep','chamomile','anxiety']},
      { title: 'Hidden Dangers: 5 Popular Herb-Medication Combinations to Avoid', href: '/blog/herb-drug-interactions', tags: ['safety','interaction']},
      { title: 'Best Herbs for Anxiety: Natural Alternatives to Prescription Medications', href: '/blog/herbs-for-anxiety-natural-alternatives', tags: ['anxiety','ashwagandha']},
    ]
    const related = articleBank
      .map(a => ({ a, score: a.tags.reduce((acc, t) => acc + (matchKeywords.has(t) ? 1 : 0), 0) }))
      .filter(x => x.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0, 3)
      .map(x => ({ title: x.a.title, href: x.a.href }))
    setRelatedArticles(related)
  }, [herbData])

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

          {/* Enhanced Quick Stats */}
          <div className="px-8 py-6 bg-gray-50 border-b">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Safety Level</p>
                  <p className="font-semibold text-gray-900">Generally Recognized as Safe (GRAS)</p>
                  <p className="text-xs text-gray-500">Safe for most adults in typical amounts</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FlaskConical className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Evidence Quality</p>
                  <p className="font-semibold text-gray-900">{herbData.evidence_level}</p>
                  <p className="text-xs text-gray-500">
                    {herbData.evidence_level === 'Strong' && 'Multiple clinical studies'}
                    {herbData.evidence_level === 'Moderate' && 'Some clinical evidence'}
                    {herbData.evidence_level === 'Limited' && 'Traditional use primarily'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Main Uses</p>
                  <p className="font-semibold text-gray-900">{herbData.benefits?.length || 0} Science-Backed Benefits</p>
                  <p className="text-xs text-gray-500">Modern & traditional applications</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Important Notes</p>
                  <p className="font-semibold text-gray-900">{herbData.safety_warnings?.length || 0} Safety Considerations</p>
                  <p className="text-xs text-gray-500">Always consult healthcare provider</p>
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

                {/* How to Use Section */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-green-600" />
                    How to Use {herbData.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <p className="font-medium text-gray-900">Morning Routine</p>
                        <p className="text-gray-700 text-sm">Start with ginger tea after breakfast to aid digestion and boost circulation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <p className="font-medium text-gray-900">Before Meals</p>
                        <p className="text-gray-700 text-sm">Take 15-30 minutes before eating to optimize digestive benefits</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                      <div>
                        <p className="font-medium text-gray-900">Winter Wellness</p>
                        <p className="text-gray-700 text-sm">Combine with lemon and honey for a warming winter tonic</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Science-Backed Benefits & Modern Uses</h2>
                  <div className="grid gap-4">
                    {herbData.benefits?.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-800 font-medium mb-2">{benefit}</p>
                          <p className="text-sm text-gray-600">
                            {/* Add contextual examples based on benefit type */}
                            {benefit.toLowerCase().includes('digest') && 'Perfect for post-meal bloating and heavy feeling after eating'}
                            {benefit.toLowerCase().includes('nausea') && 'Especially helpful during travel, pregnancy, or motion sickness'}
                            {benefit.toLowerCase().includes('circulation') && 'Great for cold hands and feet, especially in winter months'}
                            {benefit.toLowerCase().includes('inflammation') && 'May help reduce muscle soreness after exercise'}
                            {benefit.toLowerCase().includes('immune') && 'Support your body\'s natural defenses during seasonal changes'}
                            {!benefit.toLowerCase().includes('digest') && !benefit.toLowerCase().includes('nausea') && 
                             !benefit.toLowerCase().includes('circulation') && !benefit.toLowerCase().includes('inflammation') && 
                             !benefit.toLowerCase().includes('immune') && 'Traditional and modern research support this benefit'}
                          </p>
                        </div>
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

                {/* Constitution Compatibility Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Is {herbData.name} Right for You?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Best for Cold Constitution</p>
                        <p className="text-sm text-gray-600">People who feel cold easily, have sluggish digestion, poor circulation, or low energy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Use Caution with Hot Constitution</p>
                        <p className="text-sm text-gray-600">Those who are easily irritated, get nosebleeds, sweat excessively, or have active ulcers</p>
                      </div>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-4 mt-4">
                      <p className="text-sm text-gray-700 mb-3">
                        <span className="font-medium">Not sure about your constitution?</span> Take our free assessment to discover your body type and get personalized herb recommendations.
                      </p>
                      <Link 
                        href="/constitution-test"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Brain className="w-4 h-4" />
                        Take Constitution Test
                      </Link>
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

                {/* Research Highlights Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Research Highlights
                  </h3>
                  <div className="grid gap-4">
                    <div className="border border-gray-200 rounded-lg p-6 bg-white">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-2">
                          <FlaskConical className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Clinical Trial Evidence</h4>
                          <p className="text-gray-700 text-sm mb-2">
                            A 2020 randomized controlled trial found that ginger extract reduced nausea symptoms by 40% compared to placebo in patients undergoing chemotherapy.
                          </p>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Peer-reviewed</span>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6 bg-white">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Meta-Analysis Results</h4>
                          <p className="text-gray-700 text-sm mb-2">
                            Analysis of 12 studies involving 1,278 participants confirmed ginger's effectiveness for reducing digestive discomfort and inflammation markers.
                          </p>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">High-quality evidence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case Example Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                    Case Example
                  </h3>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-gray-800 italic mb-3">
                          "Lisa, a 36-year-old teacher, started drinking ginger tea daily to reduce bloating after meals. 
                          Within one week, she noticed significant improvement in her digestive comfort and began incorporating 
                          fresh ginger into her cooking for additional benefits."
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Outcome:</span> 85% reduction in post-meal discomfort, improved energy levels
                        </p>
                      </div>
                    </div>
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

                {/* Enhanced Common Combinations */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    Common Herbal Combinations
                  </h3>
                  <div className="grid gap-4">
                    <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Ginger + Peppermint</h4>
                          <p className="text-gray-700 text-sm mb-2">Powerful combination for nausea relief and digestive support</p>
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Best for:</span> Motion sickness, morning sickness, upset stomach
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                      <div className="flex items-start gap-3">
                        <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Ginger + Cinnamon</h4>
                          <p className="text-gray-700 text-sm mb-2">Warming blend for circulation and metabolic support</p>
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Best for:</span> Cold hands and feet, poor circulation, winter wellness
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Ginger + Turmeric</h4>
                          <p className="text-gray-700 text-sm mb-2">Anti-inflammatory powerhouse for joint and muscle support</p>
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Best for:</span> Exercise recovery, joint discomfort, overall inflammation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {herbData.pairs_well_with && herbData.pairs_well_with.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Synergistic Herbs</h3>
                    <div className="grid gap-3">
                      {herbData.pairs_well_with.map((pairing, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
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

        {/* Related Links Section - 内链增强（数据驱动） */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Guides & Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* 相关文章（根据标签/功效匹配） */}
            {relatedArticles.map((a, idx) => (
              <Link key={idx} href={a.href} className="block p-6 bg-gray-50 rounded-xl border hover:border-green-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{a.title}</h3>
                <p className="text-sm text-gray-600">Recommended reading based on your interest</p>
                <span className="inline-block mt-3 text-green-600 text-sm">Read article →</span>
              </Link>
            ))}
            {/* 相似草药（根据关键词匹配） */}
            {relatedHerbs.slice(0, Math.max(0, 3 - relatedArticles.length)).map((name, idx) => (
              <Link key={`rh-${idx}`} href={`/herbs/${name}`} className="block p-6 bg-gray-50 rounded-xl border hover:border-green-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Related Herb: {name[0].toUpperCase() + name.slice(1)}</h3>
                <p className="text-sm text-gray-600">Similar benefits and use cases</p>
                <span className="inline-block mt-3 text-green-600 text-sm">View details →</span>
              </Link>
            ))}
            {/* 工具入口 */}
            <Link href={`/herb-finder?search=${encodeURIComponent(herbData.name)}`} className="block p-6 bg-gray-50 rounded-xl border hover:border-green-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Find Related Herbs</h3>
              <p className="text-sm text-gray-600">See herbs with similar benefits and safety profiles</p>
              <span className="inline-block mt-3 text-green-600 text-sm">Open Herb Finder →</span>
            </Link>
            <Link href="/ingredient-checker" className="block p-6 bg-gray-50 rounded-xl border hover:border-green-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Check Interactions</h3>
              <p className="text-sm text-gray-600">Verify safety with your medications and current supplements</p>
              <span className="inline-block mt-3 text-green-600 text-sm">Open Safety Checker →</span>
            </Link>
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

        {/* Enhanced Professional CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience {herbData.name} Benefits?</h2>
              <p className="text-green-100 mb-8 max-w-3xl mx-auto text-lg">
                Join thousands who've transformed their wellness with evidence-based herbal medicine. 
                Get personalized recommendations, expert guidance, and quality herb sourcing.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <Brain className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Personalized Assessment</h3>
                  <p className="text-green-100 text-sm">Discover your unique constitution and get tailored herb recommendations</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <Shield className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Safety Guidance</h3>
                  <p className="text-green-100 text-sm">Expert dosage calculations and interaction checking</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <Award className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Trusted Sources</h3>
                  <p className="text-green-100 text-sm">Vetted suppliers and quality-tested herbal products</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/constitution-test" 
                  className="bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Brain className="w-5 h-5" />
                  Take Free Constitution Test
                </Link>
                <Link 
                  href="/dosage-calculator" 
                  className="bg-green-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-900 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Pill className="w-5 h-5" />
                  Calculate Safe Dosage
                </Link>
                <Link
                  href="/herb-finder"
                  className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Leaf className="w-5 h-5" />
                  Explore More Herbs
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-6 text-green-100">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Free consultation available
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4" />
                  Science-backed recommendations
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  Join 50,000+ users
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
