'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (!herbData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Herb Not Found</h1>
          <p className="text-gray-600 mb-8">The herb you're looking for doesn't exist in our database.</p>
          <a href="/herb-finder" className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
            Browse All Herbs
          </a>
        </div>
      </div>
    )
  }

  const getConstitutionIcon = (suitable: string) => {
    switch (suitable) {
      case 'yes': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'no': return <XCircle className="w-5 h-5 text-red-500" />
      default: return null
    }
  }

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'Strong': return 'bg-green-100 text-green-800'
      case 'Moderate': return 'bg-yellow-100 text-yellow-800'
      case 'Limited': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${herbData.name} Benefits: Energy, Focus, and Immunity`,
            "description": `Discover how ${herbData.name} (${herbData.latin_name}) helps fight fatigue and boosts focus. Science-backed herb for energy and immune support.`,
            "author": {
              "@type": "Organization",
              "name": "HerbScience"
            },
            "publisher": {
              "@type": "Organization",
              "name": "HerbScience",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.herbscience.shop/logo.png"
              }
            },
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": `https://www.herbscience.shop/herbs/${herbData.slug}`
          })
        }}
      />

      <Navigation />
      
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: 'Herb Database', href: '/herb-finder' },
          { label: herbData.name }
        ]} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Leaf className="w-8 h-8 mr-3" />
                <span className="text-green-200 font-medium">{herbData.category}</span>
                <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${getEvidenceColor(herbData.evidence_level)} text-black`}>
                  {herbData.evidence_level} Evidence
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {herbData.name}
              </h1>
              <p className="text-xl text-green-100 mb-2 italic">
                {herbData.latin_name}
              </p>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                {herbData.overview}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {herbData.properties.map((property, index) => (
                  <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                    {property}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                    bookmarked 
                      ? 'bg-white text-green-600' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
                  {bookmarked ? 'Saved' : 'Save Herb'}
                </button>
                <button className="flex items-center px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
                <button className="flex items-center px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all">
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 text-center">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-green-200" />
                  <span>Cognitive Enhancement</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-green-200" />
                  <span>Energy Boost</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-green-200" />
                  <span>Immune Support</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-green-200" />
                  <span>Cardiovascular Health</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-green-100 mb-4">Take your constitution test to see if this herb is right for you</p>
                <a 
                  href="/constitution-test"
                  className="block bg-white text-green-600 px-6 py-3 rounded-xl font-bold text-center hover:bg-gray-100 transition-colors"
                >
                  Take Constitution Test
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Navigation */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex overflow-x-auto space-x-8 py-4">
            {[
              { id: 'overview', label: '📖 Overview' },
              { id: 'benefits', label: '⭐ Benefits' },
              { id: 'dosage', label: '💊 How to Use' },
              { id: 'safety', label: '🛡️ Safety' },
              { id: 'science', label: '🔬 Research' },
              { id: 'constitution', label: '👤 Constitution' },
              { id: 'reviews', label: '💬 Reviews' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              
              {/* Overview Section */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <BookOpen className="w-6 h-6 mr-3 text-green-600" />
                      What is {herbData.name}?
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {herbData.overview}
                    </p>
                    
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                      <div className="flex items-start">
                        <FlaskConical className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                        <div>
                          <h3 className="font-bold text-blue-900 mb-2">🧪 How It Works (Active Compounds)</h3>
                          <p className="text-blue-800 text-sm">
                            {herbData.active_compounds}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <Leaf className="w-6 h-6 mr-3 text-green-600" />
                      📜 Traditional Chinese Medicine Uses
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {herbData.traditional_uses}
                    </p>
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                      <p className="text-yellow-800 text-sm">
                        ⚠️ <em>These uses are part of traditional Chinese medicine and are not evaluated by the FDA.</em>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Section */}
              {activeTab === 'benefits' && (
                <div className="bg-white p-8 rounded-3xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-8 flex items-center">
                    <Star className="w-6 h-6 mr-3 text-green-600" />
                    ✅ Top Health Benefits
                  </h2>
                  <div className="grid md:grid-cols-1 gap-4 mb-8">
                    {herbData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start p-4 bg-green-50 rounded-xl">
                        <span className="text-green-600 mr-3 mt-1 font-bold">💪</span>
                        <span className="text-gray-800">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 mb-8">
                    <div className="flex items-start">
                      <FlaskConical className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-bold text-blue-900 mb-2">🔬 Clinical trials have shown Ginseng can improve physical performance and cognitive function, especially under stress or fatigue.</h3>
                        <p className="text-blue-800 text-sm">
                          {herbData.scientific_evidence}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-6">👤 Who Should Consider {herbData.name}?</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          ✅ Good For
                        </h4>
                        <ul className="space-y-3">
                          {herbData.suitable_for.map((item, index) => (
                            <li key={index} className="text-gray-700 text-sm flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-4 flex items-center">
                          <XCircle className="w-5 h-5 mr-2" />
                          ❗ Not Recommended For
                        </h4>
                        <ul className="space-y-3">
                          {herbData.not_suitable_for.map((item, index) => (
                            <li key={index} className="text-gray-700 text-sm flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dosage Section */}
              {activeTab === 'dosage' && (
                <div className="bg-white p-8 rounded-3xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-8 flex items-center">
                    <Pill className="w-6 h-6 mr-3 text-green-600" />
                    💊 How to Use & Dosage
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {herbData.dosage_forms.map((form, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                        <h3 className="font-bold text-lg mb-3">{form.form}</h3>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-green-600">Recommended Use:</span>
                            <div className="ml-2 text-gray-700 mt-1">{form.usage}</div>
                          </div>
                          <div className="bg-white p-3 rounded-lg mt-3">
                            <span className="font-medium text-purple-600">Dosage:</span>
                            <span className="ml-2 text-gray-700 font-semibold">{form.dosage}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                    <h3 className="font-bold text-green-900 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      ✅ Best Practices
                    </h3>
                    <ul className="text-green-800 text-sm space-y-2">
                      <li>✅ Take in cycles: 3 weeks on, 1 week off. Avoid taking late at night.</li>
                      <li>✅ Start with the lowest recommended dose</li>
                      <li>✅ Keep a health diary to track effects</li>
                      <li>✅ Buy from reputable, third-party tested sources</li>
                      <li>✅ Give herbs adequate time to work (usually 2-8 weeks)</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Safety Section */}
              {activeTab === 'safety' && (
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-8 flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                      ⚠️ Safety & Interactions
                    </h2>
                    
                    <div className="grid md:grid-cols-1 gap-8">
                      <div>
                        <h3 className="font-bold text-red-600 mb-4 flex items-center">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Important Warnings
                        </h3>
                        <ul className="space-y-3">
                          {herbData.safety_warnings.map((warning, index) => (
                            <li key={index} className="text-gray-700 text-sm flex items-start p-3 bg-red-50 rounded-lg">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-orange-600 mb-4 flex items-center">
                          <Pill className="w-5 h-5 mr-2" />
                          Drug Interactions
                        </h3>
                        <ul className="space-y-3">
                          {herbData.interactions.map((interaction, index) => (
                            <li key={index} className="text-gray-700 text-sm flex items-start p-3 bg-orange-50 rounded-lg">
                              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {interaction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 bg-red-50 p-6 rounded-2xl border border-red-200">
                      <h3 className="font-bold text-red-900 mb-3">🚨 Always Consult Healthcare Providers</h3>
                      <p className="text-red-800 text-sm">
                        Before starting any herbal supplement, especially if you have chronic conditions, take medications, 
                        or are pregnant/nursing. This information is for educational purposes only and is not medical advice.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Research Section */}
              {activeTab === 'science' && (
                <div className="bg-white p-8 rounded-3xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-8 flex items-center">
                    <FlaskConical className="w-6 h-6 mr-3 text-blue-600" />
                    🧪 Scientific Evidence Snapshot
                  </h2>
                  
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 mb-8">
                    <h3 className="font-bold text-blue-900 mb-4">Recent Research Findings</h3>
                    <p className="text-blue-800 leading-relaxed">
                      {herbData.scientific_evidence}
                    </p>
                    <div className="mt-4 text-xs text-blue-600">
                      📚 <em>Sources: PubMed, Journal of Ginseng Research</em>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-green-50 rounded-2xl">
                      <div className="text-3xl mb-3">🏆</div>
                      <h4 className="font-bold mb-2">Gold Standard</h4>
                      <p className="text-sm text-gray-600">Randomized controlled trials (RCTs)</p>
                    </div>
                    <div className="text-center p-6 bg-yellow-50 rounded-2xl">
                      <div className="text-3xl mb-3">🥈</div>
                      <h4 className="font-bold mb-2">Good Evidence</h4>
                      <p className="text-sm text-gray-600">Cohort studies, case-control studies</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-2xl">
                      <div className="text-3xl mb-3">🥉</div>
                      <h4 className="font-bold mb-2">Preliminary</h4>
                      <p className="text-sm text-gray-600">Laboratory studies, animal studies</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Constitution Section */}
              {activeTab === 'constitution' && (
                <div className="bg-white p-8 rounded-3xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-8 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-purple-600" />
                    🫀 Body Constitution Match (Traditional Typing)
                  </h2>
                  
                  <div className="mb-8">
                    <div className="space-y-4">
                      {herbData.constitution_match.map((match, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                          {getConstitutionIcon(match.suitable)}
                          <div className="ml-4">
                            <div className="font-semibold">{match.type}</div>
                            <div className="text-sm text-gray-600">{match.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 mb-8">
                    <h3 className="font-bold text-purple-900 mb-3">Find Your Constitution</h3>
                    <p className="text-purple-800 text-sm mb-4">
                      Take our comprehensive constitution assessment to discover which herbs are best suited for your unique body type and health needs.
                    </p>
                    <a 
                      href="/constitution-test"
                      className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                    >
                      Take Constitution Test
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">🤝 Pairs Well With:</h3>
                    <div className="grid md:grid-cols-1 gap-4">
                      {herbData.pairs_well_with.map((herb, index) => (
                        <div key={index} className="flex items-center p-4 bg-green-50 rounded-xl">
                          <Leaf className="w-5 h-5 text-green-600 mr-3" />
                          <span className="text-gray-800">{herb}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-8 flex items-center">
                      <Users className="w-6 h-6 mr-3 text-green-600" />
                      🧑‍⚕️ Real User Story
                    </h2>
                    
                    <div className="space-y-6">
                      {herbData.user_stories.map((story, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                          <div className="flex items-start mb-4">
                            <div className="flex text-yellow-400 mr-3">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-current" />
                              ))}
                            </div>
                          </div>
                          <blockquote className="text-gray-800 italic mb-4">
                            "{story.quote}"
                          </blockquote>
                          <div className="text-sm text-gray-600">
                            — <strong>{story.author}</strong>, {story.location}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-8">❓ Common Questions (FAQ)</h2>
                    <div className="space-y-6">
                      {herbData.faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <h3 className="font-semibold text-lg mb-3 text-gray-900">**Q: {faq.question}**</h3>
                          <p className="text-gray-700 leading-relaxed">A: {faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <h3 className="font-bold mb-4">🚀 Quick Actions</h3>
                <div className="space-y-3">
                  <a 
                    href="/ingredient-checker"
                    className="block bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors"
                  >
                    🛡️ Check Safety
                  </a>
                  <a 
                    href="/dosage-calculator"
                    className="block bg-green-600 text-white px-4 py-3 rounded-xl font-semibold text-center hover:bg-green-700 transition-colors"
                  >
                    📏 Calculate Dosage
                  </a>
                  <a 
                    href="/herb-finder"
                    className="block bg-purple-600 text-white px-4 py-3 rounded-xl font-semibold text-center hover:bg-purple-700 transition-colors"
                  >
                    🔍 Find Similar Herbs
                  </a>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-3xl border border-green-200">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">📧 Stay Updated</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get the latest research on {herbData.name} and other herbs
                  </p>
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 mb-3 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                  <button className="w-full bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Related Herbs */}
              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <h3 className="font-bold mb-4">🌿 Similar Herbs</h3>
                <div className="space-y-3">
                  <a href="/herbs/rhodiola" className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Rhodiola Rosea</div>
                    <div className="text-sm text-gray-600">Stress adaptation</div>
                  </a>
                  <a href="/herbs/ashwagandha" className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Ashwagandha</div>
                    <div className="text-sm text-gray-600">Energy & stress relief</div>
                  </a>
                  <a href="/herbs/cordyceps" className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Cordyceps</div>
                    <div className="text-sm text-gray-600">Athletic performance</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">🌿 Ready to Start Your Herbal Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover personalized herb recommendations based on your unique constitution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/constitution-test"
              className="bg-white text-green-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-2xl text-lg transition-colors"
            >
              Take Constitution Test
            </a>
            <a 
              href="/herb-finder"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200"
            >
              Browse All Herbs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// Note: SEO metadata should be handled in a layout.tsx or through custom Head component
// since this is a client component
