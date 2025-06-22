'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { LoadingSpinner } from '../../../components/LoadingSpinner'
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

// Ginseng 详细数据 - 基于用户提供的模板
const ginsengData: HerbData = {
  id: 'ginseng',
  name: 'Ginseng',
  latin_name: 'Panax ginseng',
  slug: 'ginseng',
  overview: 'Ginseng (Panax ginseng) is one of the most revered herbs in traditional Chinese and Korean medicine. Known as an adaptogen, it helps the body manage stress, fight fatigue, and restore balance. Today, Ginseng remains a popular herbal remedy for boosting energy, focus, and immunity.',
  benefits: [
    'Fights fatigue and increases energy naturally',
    'Enhances memory, focus, and mental clarity',
    'Strengthens the immune system',
    'Improves circulation and blood sugar balance',
    'Supports recovery after illness or surgery'
  ],
  active_compounds: 'The main active compounds in Panax ginseng are ginsenosides, which have antioxidant, anti-inflammatory, and neuroprotective effects. They work by enhancing mitochondrial energy production, regulating the stress-response (HPA axis), and supporting nitric oxide production (beneficial for blood flow).',
  traditional_uses: 'In Traditional Chinese Medicine (TCM), Ginseng is considered a "superior tonic" used to tonify Qi (vital energy), calm the mind (Shen) and enhance focus, rebuild strength after chronic illness, and nourish the lungs and heart.',
  suitable_for: [
    'People with low energy, brain fog, or chronic fatigue',
    'Professionals under high mental stress',
    'Individuals recovering from illness or surgery',
    'Older adults seeking cognitive and physical support'
  ],
  not_suitable_for: [
    'People with uncontrolled high blood pressure',
    'Those with insomnia or sleep disorders',
    'Pregnant women',
    'Children under 12 years old'
  ],
  dosage_forms: [
    {
      form: 'Capsule',
      dosage: '200–400 mg/day',
      usage: 'Standardized to 5% ginsenosides, take with food'
    },
    {
      form: 'Tea',
      dosage: '1–2g dried root',
      usage: 'Boiled 10–15 minutes, drink 1-2 cups daily'
    },
    {
      form: 'Tincture',
      dosage: '30–50 drops',
      usage: 'In water, 1–2 times per day'
    },
    {
      form: 'Wellness Soup',
      dosage: '5-10g root',
      usage: 'Simmer with lotus seeds and dates for recovery boost'
    }
  ],
  safety_warnings: [
    'May interact with blood pressure, blood sugar, or anticoagulant medications',
    'Avoid during fever or acute inflammation',
    'Monitor for insomnia, restlessness, or fast heartbeat if overdosed',
    'Take in cycles: 3 weeks on, 1 week off'
  ],
  interactions: [
    'Blood pressure medications',
    'Diabetes medications (may affect blood sugar)',
    'Blood thinners (warfarin)',
    'MAO inhibitors',
    'Stimulant medications'
  ],
  scientific_evidence: 'A 2022 randomized trial found Ginseng reduced fatigue by 28% among adults with chronic tiredness. Several studies show improved cognitive performance in aging adults. Ginsenosides shown to reduce inflammation markers in lab and animal studies.',
  constitution_match: [
    {
      type: 'Qi Deficient',
      suitable: 'yes',
      description: 'Ideal for pale face, tiredness, and low voice'
    },
    {
      type: 'Yang Deficient',
      suitable: 'warning',
      description: 'May benefit, consider warming version'
    },
    {
      type: 'Yin Deficient',
      suitable: 'no',
      description: 'Not ideal; may cause dryness'
    },
    {
      type: 'Heat Excess',
      suitable: 'no',
      description: 'Avoid if experiencing fever or irritability'
    }
  ],
  pairs_well_with: [
    'Rhodiola Rosea – for stress resistance',
    'Ginger – boosts circulation and warmth',
    'Cordyceps – enhances stamina in recovery',
    'Astragalus – immune and energy support'
  ],
  user_stories: [
    {
      quote: 'I started taking Ginseng after recovering from a viral infection. Within two weeks, my energy was back and I felt mentally sharper.',
      author: 'Michael B., 42',
      location: 'Seattle'
    },
    {
      quote: 'I replaced my second coffee with Ginseng tea. No jitters, just clean energy.',
      author: 'Sarah L., 29',
      location: 'London'
    }
  ],
  faqs: [
    {
      question: 'Is Ginseng a stimulant like caffeine?',
      answer: 'No. Ginseng improves energy through hormonal and cellular support, without overstimulation.'
    },
    {
      question: 'Can I take Ginseng every day?',
      answer: 'Yes, in short cycles (e.g., 3 weeks on, 1 week off). Long-term continuous use is not recommended.'
    },
    {
      question: 'Can I take Ginseng with medication?',
      answer: 'If you are on diabetes, blood pressure, or blood-thinning medications, consult a doctor first.'
    }
  ],
  seo_keywords: ['ginseng supplement', 'ginseng for energy', 'ginsenosides', 'panax ginseng', 'adaptogen', 'ginseng benefits'],
  evidence_level: 'Strong',
  category: 'Adaptogen',
  properties: ['Energizing', 'Immune Support', 'Cognitive Enhancement', 'Stress Adaptation']
}

export default function HerbDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [herbData, setHerbData] = useState<HerbData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    // 通过API获取草药数据
    const fetchHerbData = async () => {
      try {
        const response = await fetch(`/api/herbs/${slug}`)
        const data = await response.json()
        
        if (data.success) {
          setHerbData(data.data)
        } else {
          console.error('Failed to fetch herb data:', data.error)
          // 使用默认数据结构
          setHerbData({
            ...ginsengData,
            id: slug,
            name: slug.charAt(0).toUpperCase() + slug.slice(1),
            slug: slug,
            overview: `${slug.charAt(0).toUpperCase() + slug.slice(1)} is a beneficial herb with various health properties.`
          })
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching herb data:', error)
        // 如果API失败，使用默认数据
        setHerbData({
          ...ginsengData,
          id: slug,
          name: slug.charAt(0).toUpperCase() + slug.slice(1),
          slug: slug,
          overview: `${slug.charAt(0).toUpperCase() + slug.slice(1)} is a beneficial herb with various health properties.`
        })
        setLoading(false)
      }
    }

    fetchHerbData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (!herbData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Herb Not Found</h1>
            <p className="text-gray-600 mb-6">The herb you&apos;re looking for doesn&apos;t exist.</p>
            <Link 
              href="/herb-finder"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Back to Herb Finder
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Leaf className="w-4 h-4" /> },
    { id: 'usage', label: 'Usage & Dosage', icon: <Pill className="w-4 h-4" /> },
    { id: 'science', label: 'Scientific Evidence', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety & Interactions', icon: <Shield className="w-4 h-4" /> },
    { id: 'constitution', label: 'TCM Constitution', icon: <Target className="w-4 h-4" /> },
    { id: 'reviews', label: 'User Stories', icon: <Users className="w-4 h-4" /> }
  ]

  const getConstitutionIcon = (suitable: string) => {
    switch (suitable) {
      case 'yes': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'no': return <XCircle className="w-5 h-5 text-red-600" />
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'Strong': return 'bg-green-100 text-green-800 border-green-200'
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Limited': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
      <Breadcrumb 
        items={[
            { label: 'Home', href: '/' },
            { label: 'Herb Finder', href: '/herb-finder' },
            { label: herbData.name, href: `/herbs/${slug}` }
        ]} 
      />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Main Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{herbData.name}</h1>
                  <p className="text-gray-600 italic">{herbData.latin_name}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEvidenceColor(herbData.evidence_level)}`}>
                  {herbData.evidence_level} Evidence
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {herbData.category}
                </span>
                {herbData.properties.map((prop, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {prop}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {herbData.overview}
              </p>
              
              {/* Quick Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {herbData.benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-800">{benefit}</span>
                  </div>
                ))}
              </div>
              </div>
              
            {/* Action Panel */}
            <div className="lg:w-80 w-full">
              <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white p-6 rounded-xl mb-4">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                <button 
                  onClick={() => setBookmarked(!bookmarked)}
                    className="w-full flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 py-3 rounded-lg transition-colors"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 py-3 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share Herb
                </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 py-3 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    Download Guide
                </button>
              </div>
            </div>

              {/* Quick Stats */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Evidence Level</span>
                    <span className="font-medium">{herbData.evidence_level}</span>
                </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{herbData.category}</span>
                </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Benefits</span>
                    <span className="font-medium">{herbData.benefits.length}</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                {/* Top Health Benefits */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-green-600" />
                    Top Health Benefits
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {herbData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-800">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <FlaskConical className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800 font-medium">Scientific Note</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Clinical trials have shown {herbData.name} can improve physical performance and cognitive function, especially under stress or fatigue.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* How It Works */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Beaker className="w-6 h-6 text-green-600" />
                    How It Works (Active Compounds)
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">{herbData.active_compounds}</p>
                  </div>
                </section>

                {/* Traditional Uses */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    Traditional Uses in Chinese Medicine
                  </h2>
                  <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                    <p className="text-gray-700 leading-relaxed mb-4">{herbData.traditional_uses}</p>
                    <div className="text-sm text-amber-800 bg-amber-100 rounded-lg p-3">
                      <AlertTriangle className="w-4 h-4 inline mr-2" />
                      These uses are part of traditional Chinese medicine and are not evaluated by the FDA.
                    </div>
                  </div>
                </section>

                {/* Who Should Consider */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Users className="w-6 h-6 text-green-600" />
                    Who Should Consider {herbData.name}?
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Suitable For:
                      </h3>
                      <ul className="space-y-2">
                          {herbData.suitable_for.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                      <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Not Recommended For:
                      </h3>
                      <ul className="space-y-2">
                          {herbData.not_suitable_for.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                    </div>
                  </div>
                </section>
                </div>
              )}

            {/* Usage & Dosage Tab */}
            {activeTab === 'usage' && (
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Pill className="w-6 h-6 text-green-600" />
                    How to Use & Dosage
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Form</th>
                          <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Recommended Use</th>
                          <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Instructions</th>
                        </tr>
                      </thead>
                      <tbody>
                    {herbData.dosage_forms.map((form, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-6 py-4 font-medium text-gray-900">{form.form}</td>
                            <td className="border border-gray-200 px-6 py-4 text-gray-700">{form.dosage}</td>
                            <td className="border border-gray-200 px-6 py-4 text-gray-700">{form.usage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                        <p className="text-sm text-green-800 font-medium">Recommended Cycle</p>
                        <p className="text-sm text-green-700 mt-1">
                          Take in cycles: 3 weeks on, 1 week off. Avoid taking late at night.
                        </p>
                      </div>
                  </div>
                  </div>
                </section>
                </div>
              )}

            {/* Scientific Evidence Tab */}
            {activeTab === 'science' && (
                <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FlaskConical className="w-6 h-6 text-green-600" />
                    Scientific Evidence Snapshot
                    </h2>
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-start gap-3 mb-4">
                      <Award className={`w-6 h-6 mt-1 ${getEvidenceColor(herbData.evidence_level).includes('green') ? 'text-green-600' : 
                        getEvidenceColor(herbData.evidence_level).includes('yellow') ? 'text-yellow-600' : 'text-gray-600'}`} />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Evidence Level: {herbData.evidence_level}</h3>
                        <p className="text-gray-700 mt-2 leading-relaxed">{herbData.scientific_evidence}</p>
                      </div>
                    </div>
                    <div className="text-sm text-blue-800 bg-blue-100 rounded-lg p-3 mt-4">
                      <BookOpen className="w-4 h-4 inline mr-2" />
                      Sources: PubMed, Journal of Ginseng Research
                    </div>
                  </div>
                </section>
                </div>
              )}

            {/* Safety & Interactions Tab */}
            {activeTab === 'safety' && (
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    Safety & Interactions
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Safety Warnings
                      </h3>
                      <div className="space-y-3">
                        {herbData.safety_warnings.map((warning, index) => (
                          <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <p className="text-orange-800 text-sm">{warning}</p>
                    </div>
                        ))}
                  </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Drug Interactions
                      </h3>
                      <div className="space-y-3">
                        {herbData.interactions.map((interaction, index) => (
                          <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-red-800 text-sm">{interaction}</p>
                          </div>
                        ))}
                    </div>
                    </div>
                  </div>
                </section>
                </div>
              )}

            {/* TCM Constitution Tab */}
              {activeTab === 'constitution' && (
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-green-600" />
                    Body Constitution Match (Traditional Typing)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {herbData.constitution_match.map((match, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          {getConstitutionIcon(match.suitable)}
                          <h3 className="font-semibold text-gray-900">{match.type}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{match.description}</p>
                        </div>
                      ))}
                  </div>

                  {/* Pairs Well With */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-green-600" />
                      Pairs Well With:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {herbData.pairs_well_with.map((pair, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-green-800 text-sm">{pair}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                </div>
              )}

            {/* User Stories Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Users className="w-6 h-6 text-green-600" />
                    Real User Stories
                    </h2>
                    <div className="space-y-6">
                      {herbData.user_stories.map((story, index) => (
                      <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <blockquote className="text-gray-700 text-lg italic leading-relaxed mb-4">
                            "{story.quote}"
                          </blockquote>
                        <div className="flex items-center gap-2 text-blue-800">
                          <span className="font-semibold">— {story.author}</span>
                          <span className="text-blue-600">{story.location}</span>
                        </div>
                        </div>
                      ))}
                  </div>
                </section>

                {/* FAQ Section */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    Common Questions (FAQ)
                  </h2>
                  <div className="space-y-4">
                      {herbData.faqs.map((faq, index) => (
                      <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                        </div>
                      ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>

        {/* Related Herbs */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Leaf className="w-6 h-6 text-green-600" />
            Related Herbs You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/herbs/rhodiola/" className="p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-green-800 mb-2">Rhodiola Rosea</h3>
              <p className="text-green-700 text-sm">Another powerful adaptogen for stress and energy</p>
            </Link>
            <Link href="/herbs/ashwagandha/" className="p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-green-800 mb-2">Ashwagandha</h3>
              <p className="text-green-700 text-sm">Calming adaptogen for stress and sleep</p>
            </Link>
            <Link href="/herbs/cordyceps/" className="p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-green-800 mb-2">Cordyceps</h3>
              <p className="text-green-700 text-sm">Energy and athletic performance enhancement</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Note: SEO metadata should be handled in a layout.tsx or through custom Head component
// since this is a client component
