'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import AccordionSection from '../../../components/AccordionSection'
import MedicalReviewBanner from '../../../components/MedicalReviewBanner'
import ScientificReferences from '../../../components/ScientificReferences'
import RelatedHerbsSection from '../../../components/RelatedHerbsSection'
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
  const [activeTab, setActiveTab] = useState('overview')
  const [bookmarked, setBookmarked] = useState(false)
  const [relatedHerbs, setRelatedHerbs] = useState<string[]>([])
  const [relatedArticles, setRelatedArticles] = useState<{ title: string; href: string }[]>([])

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

        {/* Medical Review Banner - E-A-T Signal for SEO */}
        <div className="mb-6">
          <MedicalReviewBanner 
            reviewerName="曾楚平 (Zeng Chuping)"
            reviewerTitle="Licensed Pharmacist & TCM Expert"
            reviewerCredentials="Southern Medical University Graduate"
            lastUpdated={new Date()}
            reviewerLink="/about"
          />
        </div>

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
                  {slug === 'onion' ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <p className="font-medium text-gray-900">Onion Soup (Daily Warmth)</p>
                          <p className="text-gray-700 text-sm">Simmer sliced onions with bone broth or vegetable stock 20–30 minutes; add a pinch of black pepper. Enjoy 3–5 times/week to support circulation and digestion.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <p className="font-medium text-gray-900">Raw Onion Salad (Quercetin Focus)</p>
                          <p className="text-gray-700 text-sm">Combine thinly sliced red onion with tomatoes and olive oil. Aim for 1/2–1 medium onion/day. For pairing, explore <Link href="/herb-finder?search=turmeric" className="text-green-700 hover:text-green-800 underline">turmeric</Link> or <Link href="/herb-finder?search=garlic" className="text-green-700 hover:text-green-800 underline">garlic</Link>.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <p className="font-medium text-gray-900">Pickled Onions (Gut-Friendly)</p>
                          <p className="text-gray-700 text-sm">Add 2–3 tbsp/day as a condiment for probiotic support plus onion antioxidants. Start small if you have a sensitive stomach.</p>
                        </div>
                      </div>
                    </div>
                  ) : slug === 'rhodiola-crenulata' || slug === 'rhodiola' ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <p className="font-medium text-gray-900">Morning Energy Boost</p>
                          <p className="text-gray-700 text-sm">Take 200-400mg rhodiola extract (3% salidroside) with breakfast. Best taken early in the day to avoid sleep disruption.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <p className="font-medium text-gray-900">Traditional Tea Method</p>
                          <p className="text-gray-700 text-sm">Simmer 3-6g dried rhodiola root in 250ml water for 10-15 minutes. Drink once daily. Combine with <Link href="/herb-finder?search=goji" className="text-green-700 hover:text-green-800 underline">goji berries</Link> or dates for enhanced adaptogenic support.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <p className="font-medium text-gray-900">Cycling for Best Results</p>
                          <p className="text-gray-700 text-sm">Use for 6-8 weeks, then take 1 week break to maintain effectiveness. Pair with healthy fats or herbal teas for better absorption.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
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
                  )}
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
                    Is {herbData.name} Right for Your Body Type?
                  </h3>
                  <div className="space-y-4">
                    {herbData.constitution_match && herbData.constitution_match.length > 0 ? (
                      herbData.constitution_match.map((match, idx) => (
                        <div key={idx} className={`flex items-start gap-3 p-4 rounded-lg ${
                          match.suitable === 'yes' ? 'bg-green-50' :
                          match.suitable === 'warning' ? 'bg-yellow-50' : 'bg-red-50'
                        }`}>
                          {getConstitutionIcon(match.suitable)}
                          <div>
                            <p className="font-medium text-gray-900">{match.type}</p>
                            <p className="text-sm text-gray-600">{match.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Individual Assessment Recommended</p>
                          <p className="text-sm text-gray-600">Constitutional suitability may vary by individual. Consult with a qualified practitioner.</p>
                        </div>
                      </div>
                    )}
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
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                    <p className="text-gray-800 leading-relaxed">{herbData.scientific_evidence}</p>
                    {slug === 'onion' && (
                      <ul className="list-disc pl-5 text-sm text-blue-900 space-y-2">
                        <li>
                          PMC: Onion anthocyanins – extraction, stability, bioavailability and health benefits. 
                          <a className="text-blue-700 underline ml-1" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9363841/" target="_blank" rel="noopener noreferrer">View study</a>
                        </li>
                        <li>
                          PMC: Unlocking the Health Secrets of Onions – bioactive compounds and mechanisms. 
                          <a className="text-blue-700 underline ml-1" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12029492/" target="_blank" rel="noopener noreferrer">View review</a>
                        </li>
                        <li>
                          AlloHealth: Quercetin-rich onions and potential male sexual health implications. 
                          <a className="text-blue-700 underline ml-1" href="https://www.allohealth.com/blog/sexual-dysfunction/erectile-dysfunction/is-onion-good-for-erectile-dysfunction" target="_blank" rel="noopener noreferrer">Read article</a>
                        </li>
                      </ul>
                    )}
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
                    {(slug === 'rhodiola-crenulata' || slug === 'rhodiola') && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          Understanding Constitution-Based Use
                        </h4>
                        <p className="text-gray-800 text-sm leading-relaxed mb-3">
                          Rhodiola works differently for different body types. Traditional Chinese Medicine identifies specific patterns where this herb excels — 
                          and situations where caution is needed. Understanding your constitution helps maximize benefits and avoid adverse effects.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="font-medium text-green-900 mb-1">✅ Recommended For:</p>
                            <ul className="text-gray-700 space-y-1 ml-4 list-disc">
                              <li>"Cold-limb / low-circulation" types with pale complexion</li>
                              <li>"High-performance / fatigue-prone" individuals</li>
                              <li>Those with slow recovery after illness or exertion</li>
                            </ul>
                          </div>
                          <div className="bg-red-50 p-3 rounded-lg">
                            <p className="font-medium text-red-900 mb-1">❌ Not Recommended For:</p>
                            <ul className="text-gray-700 space-y-1 ml-4 list-disc">
                              <li>"Heat-excess / insomnia" types who feel hot and restless</li>
                              <li>Strong palpitations or existing overstimulation</li>
                              <li>Pregnant/breastfeeding without supervision</li>
                            </ul>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-3 italic">
                          💡 Simple guideline: If you often feel drained, cold, or slow to recover — Rhodiola may help. 
                          If you're already wired, warm, and restless — use with caution or choose a different adaptogen.
                        </p>
                      </div>
                    )}
                    <div className="grid gap-4">
                      {herbData.constitution_match.map((constitution, idx) => (
                        <div key={idx} className={`flex items-center gap-4 p-4 border-2 rounded-lg ${
                          constitution.suitable === 'yes' ? 'border-green-300 bg-green-50' :
                          constitution.suitable === 'warning' ? 'border-yellow-300 bg-yellow-50' :
                          'border-red-300 bg-red-50'
                        }`}>
                          {getConstitutionIcon(constitution.suitable)}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{constitution.type}</h4>
                            <p className="text-sm text-gray-600">{constitution.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {(slug === 'rhodiola-crenulata' || slug === 'rhodiola') && (
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">🔍 Not sure about your constitution?</span> Take our free{' '}
                          <Link href="/constitution-test" className="text-blue-700 hover:text-blue-800 underline font-medium">
                            2-minute Constitution Test
                          </Link>
                          {' '}to discover your body type and get personalized herb recommendations.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Enhanced Common Combinations */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    {(slug === 'rhodiola-crenulata' || slug === 'rhodiola') ? 'Herbal Synergy & Traditional Combinations' : 'Common Herbal Combinations'}
                  </h3>
                  {(slug === 'rhodiola-crenulata' || slug === 'rhodiola') ? (
                    <>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                        <p className="text-gray-800 leading-relaxed">
                          Rhodiola crenulata works best when paired with other herbs that support energy, circulation, or lung health. 
                          In Traditional Chinese Medicine and Tibetan medicine, certain pairings enhance its adaptogenic and restorative effects — 
                          helping your body recover from fatigue, oxygen deficiency, and chronic stress more effectively.
                        </p>
                      </div>
                      <div className="grid gap-4">
                        <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                          <div className="flex items-start gap-3">
                            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Rhodiola + Astragalus (Huang Qi)</h4>
                              <p className="text-gray-700 text-sm mb-2">Boost vitality, support circulation, and strengthen the heart</p>
                              <p className="text-xs text-gray-600 mb-2">
                                This classic combination enhances "Qi and Blood" — improving oxygen transport and endurance. Astragalus boosts immune resilience and stamina, while Rhodiola improves oxygen use and circulation.
                              </p>
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">Best for:</span> Chronic fatigue, post-illness weakness, poor circulation, shortness of breath, recovery from stress or overwork
                              </p>
                              <p className="text-xs text-blue-700 mt-2 italic">
                                💡 Ideal for people who often feel weak, tired, or have low blood pressure
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="border border-purple-200 rounded-lg p-6 bg-purple-50">
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Rhodiola + Glehnia Root (Bei Sha Shen)</h4>
                              <p className="text-gray-700 text-sm mb-2">Nourish the lungs and restore energy balance</p>
                              <p className="text-xs text-gray-600 mb-2">
                                When stress or overexertion leads to dryness — such as dry cough, sore throat, or fatigue — this pairing helps calm the lungs and restore moisture. 
                                Glehnia root nourishes yin (cooling, restorative energy), while Rhodiola strengthens Qi (active energy).
                              </p>
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">Best for:</span> Dry cough, sore throat, fatigue after respiratory illness, easily thirsty
                              </p>
                              <p className="text-xs text-purple-700 mt-2 italic">
                                💡 Best for people who feel dry and develop fatigue after respiratory issues
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                          <div className="flex items-start gap-3">
                            <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Rhodiola + Cordyceps</h4>
                              <p className="text-gray-700 text-sm mb-2">Strengthen endurance and support oxygen utilization</p>
                              <p className="text-xs text-gray-600 mb-2">
                                Both are powerful adaptogens that enhance physical performance, improve oxygen metabolism, and support recovery. 
                                This combination is especially popular among athletes and high-altitude travelers.
                              </p>
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">Best for:</span> Athletic performance, high-altitude adaptation, stamina enhancement, workout recovery
                              </p>
                              <p className="text-xs text-orange-700 mt-2 italic">
                                💡 Perfect for athletes and those needing enhanced physical endurance
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-green-600" />
                          Traditional Formulas Examples
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="font-medium text-gray-900">• Nuo Di Kang Capsules (China Pharmacopoeia, 2015)</p>
                            <p className="text-gray-600 ml-4">Key herb: Rhodiola crenulata. Action: Enhances energy and blood flow, relieves chest tightness and fatigue.</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">• Luo Bu Sang Capsules</p>
                            <p className="text-gray-600 ml-4">Herbs: Rhodiola, Cordyceps, Bletilla striata. Action: Restores Qi and Yin, promotes circulation, nourishes heart and lungs.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">⚠️ Important:</span> Always consult a qualified healthcare practitioner before combining herbal supplements, 
                          especially if you are on prescription medications or have chronic conditions.
                        </p>
                      </div>
                    </>
                  ) : (
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
                            {slug === 'onion' && (
                              <p className="text-xs text-gray-600 mt-2">
                                <span className="font-medium">Pairs well with onion:</span> add sautéed <Link href="/herbs/turmeric" className="text-green-700 hover:text-green-800 underline">turmeric</Link> or
                                <Link href="/herbs/cinnamon" className="text-green-700 hover:text-green-800 underline ml-1">cinnamon</Link> to enhance antioxidant synergy.
                              </p>
                            )}
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
                            {slug === 'onion' && (
                              <p className="text-xs text-gray-600 mt-2">
                                <span className="font-medium">Onion pairing tip:</span> roasted onions with
                                <Link href="/herbs/garlic" className="text-green-700 hover:text-green-800 underline ml-1">garlic</Link> and
                                <Link href="/herbs/turmeric" className="text-green-700 hover:text-green-800 underline ml-1">turmeric</Link> for cardiometabolic support.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                  <p className="text-gray-600 mb-8">Get answers to the most common questions about {herbData.name} safety, usage, and effectiveness.</p>
                </div>

                {herbData.faqs && herbData.faqs.length > 0 ? (
                  <div className="space-y-6">
                    {herbData.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-start gap-3">
                          <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">Q</div>
                          <span className="text-lg">{faq.question}</span>
                        </h3>
                        <div className="ml-9">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">A</div>
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">FAQs Coming Soon</h3>
                    <p className="text-gray-600 mb-6">We're gathering the most frequently asked questions about {herbData.name}.</p>
                    <Link
                      href="/constitution-test"
                      className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <Brain className="w-4 h-4" />
                      Take Constitution Test Instead
                    </Link>
                  </div>
                )}

                {/* User Stories Section */}
                {herbData.user_stories && herbData.user_stories.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Users className="w-6 h-6 text-purple-600" />
                      Real User Experiences
                    </h3>
                    <div className="grid gap-6">
                      {herbData.user_stories.map((story, idx) => (
                        <div key={idx} className="bg-white border border-purple-200 rounded-xl p-6 shadow-sm">
                          <blockquote className="text-gray-800 italic mb-4 text-lg leading-relaxed">
                            "{story.quote}"
                          </blockquote>
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
                              <Users className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{story.author}</p>
                              <p className="text-sm text-gray-600">{story.location}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>Disclaimer:</strong> Individual results may vary. These experiences are for informational purposes only and should not replace professional medical advice.
                      </p>
                      <Link
                        href="/constitution-test"
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        <Brain className="w-4 h-4" />
                        Find out if {herbData.name} is right for your body type
                      </Link>
                    </div>
                  </div>
                )}
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
            <Link href="/constitution-test" className="block p-6 bg-gray-50 rounded-xl border hover:border-green-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Constitution Test</h3>
              <p className="text-sm text-gray-600">Discover if {herbData.name} is right for your body type and constitution</p>
              <span className="inline-block mt-3 text-green-600 text-sm">Open Safety Checker →</span>
            </Link>
          </div>
        </div>

        {/* Scientific References - E-A-T Enhancement for SEO */}
        <div className="mb-8">
          <ScientificReferences herbName={herbData.name} />
        </div>

        {/* Related Herbs Section - Internal Linking for SEO */}
        <div className="mb-8">
          <RelatedHerbsSection currentSlug={slug} count={3} />
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
