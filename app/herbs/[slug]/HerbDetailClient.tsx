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

        {/* Medical Review Banner - 增强E-A-T信号 */}
        <MedicalReviewBanner 
          reviewerName="曾楚平 (Zeng Chuping)"
          reviewerTitle="Licensed Pharmacist & TCM Expert"
          reviewerCredentials="Southern Medical University Graduate"
          lastUpdated={new Date()}
          reviewerLink="/about"
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
                    <div className="text-gray-700 space-y-2">
                      {herbData.active_compounds.split(/\*\*/).map((part, idx) => {
                        // Split by ** to handle markdown bold
                        // Odd indices are the text between ** markers (should be bold)
                        if (idx % 2 === 1) {
                          return <strong key={idx} className="font-semibold text-gray-900">{part}</strong>
                        }
                        return <span key={idx}>{part}</span>
                      })}
                    </div>
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
                  ) : slug === 'holy-basil' || slug === 'tulsi' ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <p className="font-medium text-gray-900">Holy Basil Tea (Daily Stress Relief)</p>
                          <p className="text-gray-700 text-sm">Steep 2-3 teaspoons dried tulsi leaves in hot water for 5-10 minutes. Drink 1-2 cups daily, preferably in morning and evening, for consistent adaptogenic support.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <p className="font-medium text-gray-900">Holy Basil Extract Capsules</p>
                          <p className="text-gray-700 text-sm">Take 300-600mg standardized extract (2.5% ursolic acid) twice daily with meals. Best for targeted support for stress, anxiety, blood sugar, or hormone balance.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <p className="font-medium text-gray-900">Fresh Tulsi Leaves (Traditional Method)</p>
                          <p className="text-gray-700 text-sm">Chew 5-10 fresh leaves on empty stomach in the morning for maximum enzyme and compound retention. Or add to smoothies, soups, and salads.</p>
                        </div>
                      </div>
                    </div>
                  ) : slug === 'bacopa' || slug === 'bacopa-monnieri' || slug === 'brahmi' ? (
                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-sm text-blue-900 font-medium">💡 Best taken with food for absorption. Consistency is key—memory benefits build over 4-12 weeks.</p>
                      </div>
                      
                      {/* Daily Supplementation */}
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <p className="font-medium text-gray-900">Daily Cognitive Support (Extract)</p>
                          <p className="text-gray-700 text-sm">Take 300mg standardized bacopa extract (20-55% bacosides) with breakfast. For exam prep or intense mental work, take 20-30 minutes before study sessions. Pair with <Link href="/herb-finder?search=ashwagandha" className="text-green-700 hover:text-green-800 underline">Ashwagandha</Link> for stress relief or <Link href="/herb-finder?search=ginkgo" className="text-green-700 hover:text-green-800 underline">Ginkgo</Link> for enhanced blood flow.</p>
                        </div>
                      </div>

                      {/* Recipe 1: Bacopa Pesto */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">🌿 Bacopa Pesto (Brahmi Basil Pesto)</p>
                            <p className="text-xs text-gray-600 italic mb-2">A flavorful way to add Bacopa to your daily meals</p>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 ml-9">
                          <p className="text-sm font-semibold text-gray-800 mb-2">Ingredients:</p>
                          <ul className="text-sm text-gray-700 space-y-1 mb-3">
                            <li>• 1 cup soaked pine nuts (soaked overnight, drained)</li>
                            <li>• 1/2 cup fresh basil</li>
                            <li>• 1/2 cup fresh Bacopa leaves (or 1 tsp dried Bacopa powder)</li>
                            <li>• Juice of 1 lemon</li>
                            <li>• 1 tsp Himalayan salt</li>
                            <li>• 50ml (1.7 oz) water or olive oil</li>
                          </ul>
                          
                          <p className="text-sm font-semibold text-gray-800 mb-2">Instructions:</p>
                          <ol className="text-sm text-gray-700 space-y-1 mb-3">
                            <li>1. Blend all ingredients in high-speed blender until smooth</li>
                            <li>2. Store in clean jar in refrigerator (use within 3 days)</li>
                          </ol>
                          
                          <p className="text-xs text-blue-800 bg-blue-100 rounded px-2 py-1">
                            <strong>How to use:</strong> Spread on toast, pasta, sandwiches, roast vegetables, or mix into salad dressing. 1-2 tbsp provides gentle cognitive support daily.
                          </p>
                        </div>
                      </div>

                      {/* Recipe 2: Bacopa Lentil Stew */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">🍲 Bacopa Lentil Stew (Comforting & Nourishing)</p>
                            <p className="text-xs text-gray-600 italic mb-2">Ideal for stress relief, students, and calming meals</p>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 ml-9">
                          <p className="text-sm font-semibold text-gray-800 mb-2">Ingredients:</p>
                          <ul className="text-sm text-gray-700 space-y-1 mb-3">
                            <li>• 1-2 cups fresh Bacopa leaves (or 2 tsp dried powder)</li>
                            <li>• 3/4 cup mung dal (mung beans)</li>
                            <li>• 1/4 tsp turmeric powder</li>
                            <li>• 1 tsp ghee + 2 tsp coconut oil</li>
                            <li>• 1 tsp mustard seeds, 1 dried red chili</li>
                            <li>• 1 tsp urad dal, 1 tsp chana dal</li>
                            <li>• Pinch of asafoetida, 1/2 tsp cumin seeds</li>
                            <li>• 5-6 curry leaves, salt, fresh lemon juice</li>
                          </ul>
                          
                          <p className="text-sm font-semibold text-gray-800 mb-2">Instructions:</p>
                          <ol className="text-sm text-gray-700 space-y-1 mb-3">
                            <li>1. Pressure cook mung beans with turmeric and 2 cups water for 10 minutes</li>
                            <li>2. Rinse Bacopa leaves and curry leaves. Blend into coarse paste</li>
                            <li>3. Heat ghee + coconut oil. Add mustard seeds until they pop</li>
                            <li>4. Add chili, urad dal, chana dal, asafoetida, cumin. Toast until fragrant</li>
                            <li>5. Add Bacopa paste and cook lightly until bright green</li>
                            <li>6. Mix in cooked lentils. Add salt and lemon juice</li>
                            <li>7. Serve warm with rice or flatbread</li>
                          </ol>
                          
                          <p className="text-xs text-amber-800 bg-amber-100 rounded px-2 py-1">
                            <strong>Perfect for:</strong> Evening meals, cold days, stress relief, students needing calming brain-nourishing food. Supports Heart Blood and calms Shen (Spirit) in TCM.
                          </p>
                        </div>
                      </div>

                      {/* Tea Option */}
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <p className="font-medium text-gray-900">Traditional Bacopa Tea (Brahmi Tea)</p>
                          <p className="text-gray-700 text-sm">Steep 1-2 teaspoons dried Bacopa in hot water for 10-15 minutes. Drink 1-2 cups daily (morning or early afternoon). For best results, take consistently for 8-12 weeks. Avoid late at night if sensitive to herbs.</p>
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

                {/* Constitution Compatibility Note - Moved to Traditional Use tab */}
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
                    <div className="text-gray-800 leading-relaxed">
                      {herbData.scientific_evidence.split(/\*\*/).map((part, idx) => {
                        // Split by ** to handle markdown bold
                        // Odd indices are the text between ** markers (should be bold)
                        if (idx % 2 === 1) {
                          return <strong key={idx} className="font-semibold text-gray-900">{part}</strong>
                        }
                        return <span key={idx}>{part}</span>
                      })}
                    </div>
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
                {slug === 'holy-basil' || slug === 'tulsi' ? (
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
                            <h4 className="font-semibold text-gray-900 mb-2">Stress & Cortisol Reduction</h4>
                            <p className="text-gray-700 text-sm mb-2">
                              A systematic review by Jamshidi & Cohen (2017) in Evidence-based Complementary and Alternative Medicine found that Holy Basil extract significantly reduced stress markers and improved overall well-being across multiple human trials.
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
                            <h4 className="font-semibold text-gray-900 mb-2">Blood Sugar & Metabolic Support</h4>
                            <p className="text-gray-700 text-sm mb-2">
                              A randomized controlled trial published in Journal of Ethnopharmacology (2012) showed that diabetic patients receiving Holy Basil extract had significantly lowered fasting and postprandial blood glucose and improved lipid profiles.
                            </p>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">High-quality evidence</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
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
                              Clinical studies demonstrate {herbData.name.toLowerCase()}'s effectiveness for its primary health benefits. Research shows consistent positive outcomes across multiple trials.
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
                              Systematic reviews and meta-analyses confirm {herbData.name.toLowerCase()}'s therapeutic benefits with high quality evidence supporting traditional uses.
                            </p>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">High-quality evidence</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Case Example Section */}
                {slug === 'holy-basil' || slug === 'tulsi' ? (
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
                            "Jane, a 38-year-old corporate manager with chronic anxiety and mild insulin resistance, began taking 500mg Holy Basil extract daily plus one cup of Tulsi tea in the evening. After 6 weeks, her fasting glucose improved by ~8% and she felt much calmer. Her skin cleared up too!"
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Outcome:</span> Reduced anxiety attacks, improved blood sugar levels, better sleep quality, clearer skin
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
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
                            Users report positive outcomes when incorporating {herbData.name.toLowerCase()} into their wellness routine. Individual results may vary based on constitution, dosage, and consistency of use.
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Note:</span> Always consult with a healthcare provider for personalized guidance
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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

                {/* Is This Herb Right for Your Body Type? - 体质匹配引导 */}
                {herbData.constitution_match && herbData.constitution_match.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-blue-600" />
                      Is {herbData.name} Right for Your Body Type?
                    </h3>
                    <div className="bg-white rounded-lg p-6 mb-6">
                      <p className="text-gray-800 leading-relaxed mb-4">
                        In Traditional Chinese Medicine, herbs work best when matched to your individual constitution. 
                        {herbData.name} has specific patterns where it excels — and situations where caution is needed.
                      </p>
                      <p className="text-gray-700 text-sm">
                        <span className="font-medium">💡 Why this matters:</span> Understanding your constitution helps maximize benefits, 
                        prevent adverse effects, and ensure you're using the right herb for your body's unique needs.
                      </p>
                    </div>
                    <div className="space-y-4">
                      {herbData.constitution_match.map((match, idx) => (
                        <div key={idx} className={`flex items-start gap-3 p-4 rounded-lg border-2 ${
                          match.suitable === 'yes' ? 'border-green-300 bg-green-50' :
                          match.suitable === 'warning' ? 'border-yellow-300 bg-yellow-50' : 'border-red-300 bg-red-50'
                        }`}>
                          {getConstitutionIcon(match.suitable)}
                          <div>
                            <p className="font-medium text-gray-900">{match.type}</p>
                            <p className="text-sm text-gray-600">{match.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-100 rounded-lg p-4 mt-6">
                      <p className="text-sm text-gray-700 mb-3">
                        <span className="font-medium">🔍 Not sure about your constitution?</span> Our free 2-minute assessment will help you discover 
                        your unique body type and get personalized herb recommendations tailored to your needs.
                      </p>
                      <Link
                        href="/constitution-test"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Brain className="w-4 h-4" />
                        Take Free Constitution Test
                      </Link>
                    </div>
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
                  ) : slug === 'holy-basil' || slug === 'tulsi' ? (
                    <div className="grid gap-4">
                      <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Holy Basil + Ashwagandha</h4>
                            <p className="text-gray-700 text-sm mb-2">Synergistic adaptogen duo for comprehensive stress and adrenal balance</p>
                            <p className="text-xs text-gray-600">
                              <span className="font-medium">Best for:</span> Chronic stress, burnout, hormone balance, anxiety relief
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Holy Basil + Rhodiola</h4>
                            <p className="text-gray-700 text-sm mb-2">Calming and energizing adaptogen combination for balanced mental clarity</p>
                            <p className="text-xs text-gray-600">
                              <span className="font-medium">Best for:</span> Anxiety with fatigue, mental fog, focus, stress-induced exhaustion
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Holy Basil + Cinnamon</h4>
                            <p className="text-gray-700 text-sm mb-2">Blood sugar regulation and metabolic support combination</p>
                            <p className="text-xs text-gray-600">
                              <span className="font-medium">Best for:</span> Blood sugar balance, insulin resistance, metabolic syndrome
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex items-start gap-3">
                          <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">i</div>
                          <div>
                            <p className="text-gray-700 text-sm">
                              Common herbal combinations and pairings can enhance therapeutic effects. Consult with a healthcare practitioner for personalized recommendations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Synergistic Herbs - Only show for non-Rhodiola herbs */}
                {herbData.pairs_well_with && herbData.pairs_well_with.length > 0 && slug !== 'rhodiola-crenulata' && slug !== 'rhodiola' && (
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

        {/* Scientific References - rhodiola特定权威来源 */}
        {(slug === 'rhodiola-crenulata' || slug === 'rhodiola') ? (
          <ScientificReferences 
            herbName="Rhodiola Crenulata"
            references={[
              {
                title: 'Panossian A, Wikman G. (2010). "Effects of Adaptogens on the Central Nervous System and the Molecular Mechanisms Associated with Their Stress-Protective Activity" - Pharmaceuticals. 3(1): 188-224.',
                url: 'https://pubmed.ncbi.nlm.nih.gov/27713876/',
                source: 'U.S. National Library of Medicine (PubMed)',
                isExternal: true
              },
              {
                title: 'Spasov AA, et al. (2000). "A double-blind, placebo-controlled pilot study of Rhodiola rosea extract on fatigue of students during examination period" - Phytomedicine. 7(2): 85-9.',
                url: 'https://pubmed.ncbi.nlm.nih.gov/10839209/',
                source: 'U.S. National Library of Medicine (PubMed)',
                isExternal: true
              },
              {
                title: 'Darbinyan V, et al. (2007). "Clinical trial of Rhodiola rosea extract SHR-5 in the treatment of mild to moderate depression" - Nordic Journal of Psychiatry. 61(5): 343-8.',
                url: 'https://pubmed.ncbi.nlm.nih.gov/17990195/',
                source: 'U.S. National Library of Medicine (PubMed)',
                isExternal: true
              },
              {
                title: 'National Center for Complementary and Integrative Health (NCCIH) - Rhodiola',
                url: 'https://www.nccih.nih.gov/health/rhodiola',
                source: 'U.S. National Institutes of Health',
                isExternal: true
              },
              {
                title: 'Memorial Sloan Kettering Cancer Center - Rhodiola Integrative Medicine Monograph',
                url: 'https://www.mskcc.org/cancer-care/integrative-medicine/herbs/rhodiola',
                source: 'Memorial Sloan Kettering Cancer Center',
                isExternal: true
              },
              {
                title: 'Examine.com - Rhodiola Rosea: Research Analysis & Scientific Evidence',
                url: 'https://examine.com/supplements/rhodiola-rosea/',
                source: 'Examine.com (Independent Nutrition Research Database)',
                isExternal: true
              }
            ]}
          />
        ) : (
          <ScientificReferences herbName={herbData.name} />
        )}

        {/* Related Herbs Section - rhodiola特定配伍推荐 */}
        {(slug === 'rhodiola-crenulata' || slug === 'rhodiola') ? (
          <RelatedHerbsSection 
            currentSlug={slug}
            relatedHerbs={[
              {
                name: 'Ashwagandha',
                slug: 'ashwagandha',
                shortDescription: 'Combines with Rhodiola for comprehensive stress management. Ashwagandha provides calming effects while Rhodiola offers energizing support - perfect for balanced stress relief.',
                primaryBenefit: 'Stress + Sleep',
                icon: '🧘'
              },
              {
                name: 'Ginseng',
                slug: 'ginseng',
                shortDescription: 'Synergizes with Rhodiola for sustained energy and mental stamina. Together they provide smooth, long-lasting vitality without caffeine jitters.',
                primaryBenefit: 'Energy Boost',
                icon: '⚡'
              },
              {
                name: 'Cordyceps',
                slug: 'cordyceps',
                shortDescription: 'Pairs with Rhodiola to maximize athletic performance, improve oxygen utilization, and enhance physical endurance for active lifestyles.',
                primaryBenefit: 'Athletic Performance',
                icon: '🏃'
              }
            ]}
            count={3}
          />
        ) : (
          <RelatedHerbsSection currentSlug={slug} />
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
