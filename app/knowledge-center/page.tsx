'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import SmartSearch from '../../components/SmartSearch'

export default function KnowledgeCenter() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const pathname = usePathname()
  const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en'
  
  // CollectionPage + Breadcrumb 结构化数据
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Knowledge Center',
    description: 'Explore FAQs, safety guides, and research on herbal medicine.',
    url: 'https://herbscience.shop/knowledge-center',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Knowledge List',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: 30
    }
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://herbscience.shop/' },
      { '@type': 'ListItem', position: 2, name: 'Knowledge Center', item: 'https://herbscience.shop/knowledge-center' }
    ]
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="min-h-screen bg-white">
        {/* ...existing code... */}
      </main>
    </>
  )
  // 添加语言前缀的函数
  const addLocalePrefix = (href: string) => {
    if (currentLocale === 'zh') {
      return `/zh${href}`
    }
    return href
  }

  // Featured content for each section
  const featuredContent = {
    faq: [
      {
        title: "Are herbs safe during pregnancy?",
        preview: "Essential safety guidelines for expecting mothers...",
        href: "/knowledge/pregnancy-herbs-safety",
        category: "Safety",
        views: "12.5k views"
      },
      {
        title: "Dangerous herbs to avoid",
        preview: "10 common herbs that can cause serious side effects...",
        href: "/knowledge/dangerous-herbs",
        category: "Safety",
        views: "8.3k views"
      },
      {
        title: "Herbs that interact with medications",
        preview: "Complete guide to herb-drug interactions...",
        href: "/knowledge/herb-drug-interactions",
        category: "Safety",
        views: "15.7k views"
      }
    ],
    safety: [
      {
        title: "Complete Herb Safety Checklist",
        preview: "Step-by-step guide to safely using herbal supplements...",
        href: "/knowledge/herb-safety-checklist",
        category: "Guidelines",
        views: "9.8k views"
      },
      {
        title: "Pregnancy & Breastfeeding Guide",
        preview: "Which herbs are safe during pregnancy and nursing...",
        href: "/knowledge/pregnancy-herb-guide",
        category: "Women's Health",
        views: "11.2k views"
      },
      {
        title: "Children's Herbal Safety",
        preview: "Age-appropriate herbs and dosing for kids...",
        href: "/knowledge/childrens-herbal-safety",
        category: "Pediatric",
        views: "6.4k views"
      }
    ],
    research: [
      {
        title: "Rhodiola for anxiety: What research says",
        preview: "Latest clinical trials on rhodiola's effectiveness...",
        href: "/knowledge/rhodiola-anxiety-research",
        category: "Mental Health",
        views: "14.1k views"
      },
      {
        title: "Can Ginkgo improve memory?",
        preview: "Evidence-based analysis of ginkgo's cognitive benefits...",
        href: "/knowledge/ginkgo-memory-research",
        category: "Cognitive Health",
        views: "18.6k views"
      },
      {
        title: "Turmeric and inflammation: Evidence summary",
        preview: "Comprehensive review of turmeric's anti-inflammatory effects...",
        href: "/knowledge/turmeric-inflammation-research",
        category: "Inflammation",
        views: "22.3k views"
      }
    ]
  }

  // Popular/trending content
  const trendingTopics = [
    {
      title: "Ashwagandha vs. Rhodiola: Which is better for stress?",
      category: "Comparison",
      views: "28.4k",
      trend: "up",
      href: "/knowledge/ashwagandha-vs-rhodiola"
    },
    {
      title: "Lion's Mane: The brain-boosting mushroom guide",
      category: "Nootropics",
      views: "19.7k",
      trend: "up",
      href: "/knowledge/lions-mane-guide"
    },
    {
      title: "Intermittent fasting and herbal supplements",
      category: "Lifestyle",
      views: "16.2k",
      trend: "stable",
      href: "/knowledge/fasting-herbs"
    },
    {
      title: "Best herbs for hormone balance",
      category: "Women's Health",
      views: "31.8k",
      trend: "up",
      href: "/knowledge/hormone-balancing-herbs"
    },
    {
      title: "Natural sleep aids that actually work",
      category: "Sleep",
      views: "25.1k",
      trend: "stable",
      href: "/knowledge/natural-sleep-aids"
    }
  ]

  // Content categories for filtering
  const contentCategories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'safety', name: 'Safety & Warnings', icon: '🛡️' },
    { id: 'research', name: 'Scientific Studies', icon: '🔬' },
    { id: 'womens-health', name: "Women's Health", icon: '👩‍⚕️' },
    { id: 'mental-health', name: 'Mental Clarity', icon: '🧠' },
    { id: 'basics', name: 'Herb Basics', icon: '🌿' },
    { id: 'lifestyle', name: 'Lifestyle', icon: '⚡' }
  ]

  const faqCategories = [
    {
      title: "Safety & Interactions",
      questions: [
        {
          q: "Are herbal supplements safe to take with prescription medications?",
          a: "Some herbs can interact with medications. Always consult your healthcare provider before combining herbs with prescription drugs. Our safety checker tool identifies potential interactions."
        },
        {
          q: "Do herbal supplements have side effects?",
          a: "Yes, herbs can have side effects. Common ones include digestive upset, allergic reactions, and interactions with medications. We provide detailed side effect profiles for each herb."
        },
        {
          q: "Who should avoid herbal supplements?",
          a: "Pregnant women, nursing mothers, children, and people with chronic conditions should be especially cautious. Always consult healthcare providers before use."
        }
      ]
    },
    {
      title: "FDA & Regulation",
      questions: [
        {
          q: "Are herbal supplements approved by the FDA?",
          a: "Most herbal supplements are regulated as dietary supplements, not drugs. The FDA doesn't approve them for safety and effectiveness before marketing, but they do regulate manufacturing and labeling."
        },
        {
          q: "Are herbal supplements considered drugs?",
          a: "No, in the US, herbal supplements are classified as dietary supplements unless they make drug claims. They cannot claim to diagnose, treat, cure, or prevent diseases."
        },
        {
          q: "How can I verify if a supplement is legitimate?",
          a: "Look for third-party testing, GMP certification, and avoid products making unrealistic health claims. Check our safety guidelines for more tips."
        }
      ]
    },
    {
      title: "Effectiveness & Evidence",
      questions: [
        {
          q: "Do herbal supplements really work?",
          a: "Some herbs have strong scientific evidence, others have traditional use but limited research. We rate each herb's evidence level based on clinical studies and research quality."
        },
        {
          q: "Is there science behind herbalism?",
          a: "Yes, many herbs contain active compounds that have been studied scientifically. However, evidence quality varies greatly between different herbs and conditions."
        },
        {
          q: "How long does it take for herbs to work?",
          a: "This varies by herb and condition. Some effects may be felt within days, others may take weeks or months. We provide typical timeframes for each herb in our database."
        }
      ]
    }
  ]

  const herbCategories = [
    {
      name: "Stress & Anxiety",
      herbs: [
        { name: "Ashwagandha", latin: "Withania somnifera", evidence: "Strong", uses: "Stress, anxiety, cortisol reduction" },
        { name: "Reishi Mushroom", latin: "Ganoderma lucidum", evidence: "Moderate", uses: "Stress, sleep, immune support" },
        { name: "L-theanine", latin: "From Camellia sinensis", evidence: "Strong", uses: "Anxiety, focus, relaxation" }
      ]
    },
    {
      name: "Sleep & Insomnia",
      herbs: [
        { name: "Valerian Root", latin: "Valeriana officinalis", evidence: "Moderate", uses: "Insomnia, sleep quality" },
        { name: "Passionflower", latin: "Passiflora incarnata", evidence: "Limited", uses: "Anxiety, sleep disorders" },
        { name: "Melatonin", latin: "Naturally occurring hormone", evidence: "Strong", uses: "Sleep regulation, jet lag" }
      ]
    },
    {
      name: "Digestive Health",
      herbs: [
        { name: "Ginger", latin: "Zingiber officinale", evidence: "Strong", uses: "Nausea, digestive upset" },
        { name: "Peppermint", latin: "Mentha piperita", evidence: "Strong", uses: "IBS, digestive comfort" },
        { name: "Turmeric", latin: "Curcuma longa", evidence: "Strong", uses: "Inflammation, digestive health" }
      ]
    }
  ]

  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Knowledge Center' }
        ]} 
      />

      <main className="bg-white min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              📖 Herbal Knowledge Center
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Science-backed answers to all your herbal supplement questions. From safety to effectiveness, we've got you covered.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SmartSearch 
                placeholder="Search herbs, conditions, safety info, or research..."
                onSearch={(query, filters) => {
                  setSearchTerm(query)
                  // Handle filtered search results
                }}
              />
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-8 px-6 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {[
                { id: 'overview', label: '🏠 Overview', desc: 'Start Here' },
                { id: 'faq', label: '❓ FAQ', desc: 'Common Questions' },
                { id: 'herbs', label: '🌿 Herb Database', desc: 'Browse by Category' },
                { id: 'safety', label: '🛡️ Safety Guide', desc: 'Usage Guidelines' },
                { id: 'research', label: '🔬 Research', desc: 'Scientific Evidence' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-2xl text-center transition-all duration-200 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <div className="font-semibold">{tab.label}</div>
                  <div className="text-sm opacity-80">{tab.desc}</div>
                </button>
              ))}
            </div>

            {/* Category Filter Tags */}
            <div className="flex flex-wrap gap-3 justify-center">
              {contentCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Overview Section */}
            {activeTab === 'overview' && (
              <div className="space-y-16">
                {/* Hero Content Modules */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Main Content Sections */}
                  <div className="space-y-8">
                    {/* Safety Guide Preview */}
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-100 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-red-100 p-3 rounded-full mr-4">
                          <span className="text-2xl">🛡️</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-red-700">Safety Guide</h3>
                          <p className="text-red-600">Learn which herbs are safe to take, which to avoid, and how to combine them with medications.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        {featuredContent.safety.map((item, idx) => (
                          <div key={idx} className="bg-white/60 p-4 rounded-xl hover:bg-white/80 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 hover:text-red-700 transition-colors">{item.title}</h4>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.views}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{item.preview}</p>
                            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">{item.category}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => setActiveTab('safety')}
                          className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                        >
                          View All Safety Guidelines
                        </button>
                        <a 
                          href={addLocalePrefix("/ingredient-checker")}
                          className="bg-white text-red-600 border border-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors"
                        >
                          Check Herb Safety
                        </a>
                      </div>
                    </div>

                    {/* Research Support Preview */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <span className="text-2xl">🔬</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-blue-700">Research Support</h3>
                          <p className="text-blue-600">Get science-backed insights on the most popular herbal supplements.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        {featuredContent.research.map((item, idx) => (
                          <div key={idx} className="bg-white/60 p-4 rounded-xl hover:bg-white/80 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 hover:text-blue-700 transition-colors">{item.title}</h4>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.views}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{item.preview}</p>
                            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{item.category}</span>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => setActiveTab('research')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Browse Scientific Studies
                      </button>
                    </div>
                  </div>

                  {/* Sidebar Content */}
                  <div className="space-y-8">
                    {/* Trending Topics */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 p-8 rounded-3xl">
                      <div className="flex items-center mb-6">
                        <span className="text-2xl mr-3">🔥</span>
                        <h3 className="text-2xl font-bold text-purple-700">Trending This Week</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {trendingTopics.map((topic, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors text-sm">{topic.title}</h4>
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 mr-2">{topic.views}</span>
                                <span className={`text-sm ${topic.trend === 'up' ? 'text-green-500' : 'text-gray-400'}`}>
                                  {topic.trend === 'up' ? '↗️' : '→'}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">{topic.category}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-purple-200">
                        <p className="text-sm text-purple-600 font-medium mb-3">📧 Stay Updated</p>
                        <p className="text-sm text-gray-600 mb-4">Get weekly science updates and new herb spotlights</p>
                        <button className="w-full bg-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                          Subscribe for Updates
                        </button>
                      </div>
                    </div>

                    {/* FAQ Quick Access */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-8 rounded-3xl">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                          <span className="text-2xl">❓</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-green-700">Quick Answers</h3>
                          <p className="text-green-600">Most frequently asked questions about herbal supplements.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        {featuredContent.faq.map((item, idx) => (
                          <div key={idx} className="bg-white/60 p-4 rounded-xl hover:bg-white/80 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 hover:text-green-700 transition-colors text-sm">{item.title}</h4>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.views}</span>
                            </div>
                            <p className="text-sm text-gray-600">{item.preview}</p>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => setActiveTab('faq')}
                        className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                      >
                        View All FAQ
                      </button>
                    </div>
                  </div>
                </div>

                {/* SEO Content Section */}
                <div className="bg-gray-50 p-12 rounded-3xl">
                  <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold mb-6">What is Herbal Constitution?</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Understanding your herbal constitution is the foundation of personalized natural health. Traditional herbal medicine recognizes that each person has unique physiological patterns, energy levels, and responses to different herbs. Our comprehensive knowledge center helps you discover which herbs align with your individual constitution, ensuring safer and more effective natural health outcomes. From ancient wisdom to modern scientific research, we bridge traditional herbal knowledge with evidence-based medicine to provide you with trustworthy, actionable health information.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                      <div className="text-4xl mb-4">🔥</div>
                      <h3 className="text-xl font-bold mb-4 text-red-600">Fire Constitution</h3>
                      <p className="text-gray-600 mb-4">High energy, enthusiastic personalities who benefit from cooling, calming herbs like chamomile and mint.</p>
                      <div className="text-sm text-gray-500">
                        <p className="font-medium">Recommended herbs:</p>
                        <p>Chamomile • Peppermint • Lavender • Lemon Balm</p>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                      <div className="text-4xl mb-4">🌍</div>
                      <h3 className="text-xl font-bold mb-4 text-yellow-600">Earth Constitution</h3>
                      <p className="text-gray-600 mb-4">Stable, grounded individuals who thrive with warming, energizing herbs that support digestion and vitality.</p>
                      <div className="text-sm text-gray-500">
                        <p className="font-medium">Recommended herbs:</p>
                        <p>Ginger • Turmeric • Cinnamon • Cardamom</p>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                      <div className="text-4xl mb-4">💨</div>
                      <h3 className="text-xl font-bold mb-4 text-blue-600">Air Constitution</h3>
                      <p className="text-gray-600 mb-4">Creative, quick-thinking types who benefit from grounding, nourishing herbs that support nervous system health.</p>
                      <div className="text-sm text-gray-500">
                        <p className="font-medium">Recommended herbs:</p>
                        <p>Ashwagandha • Brahmi • Jatamansi • Shankhpushpi</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <a 
                      href={addLocalePrefix("/constitution-test")}
                      className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-purple-700 transition-colors inline-block"
                    >
                      Discover Your Constitution
                    </a>
                  </div>
                </div>

                {/* Database Connection Info */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-12 rounded-3xl text-center">
                  <h2 className="text-3xl font-bold mb-6">🗄️ Connected to 1,000+ Herb Database</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                    Every piece of information in our knowledge center is connected to our comprehensive herb database. Get detailed profiles, safety information, research summaries, and personalized recommendations for over 1,000 herbs and natural supplements.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href={addLocalePrefix("/herb-finder")}
                      className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors"
                    >
                      Explore Herb Database
                    </a>
                    <a 
                      href={addLocalePrefix("/ingredient-checker")}
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-emerald-600 transition-all"
                    >
                      Check Herb Interactions
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {activeTab === 'faq' && (
              <div>
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-8">
                  {faqCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="bg-white rounded-3xl shadow-lg p-8">
                      <h3 className="text-2xl font-bold mb-6 text-purple-600">{category.title}</h3>
                      <div className="space-y-6">
                        {category.questions.map((item, index) => (
                          <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                            <h4 className="text-lg font-semibold mb-3 text-gray-900">{item.q}</h4>
                            <p className="text-gray-700 leading-relaxed">{item.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Herb Database Section */}
            {activeTab === 'herbs' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">🌿 Comprehensive Herb Database</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Explore our scientifically-curated database of over 1,000 herbs and natural supplements. Each entry includes traditional uses, modern research, safety information, dosage guidelines, and evidence-based effectiveness ratings.
                  </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Search herbs by name, condition, or benefit..."
                          className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <button className="bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-green-700 transition-colors">
                        Search Database
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 justify-center">
                      {['All Herbs', 'Mental Health', 'Digestive Health', 'Immune Support', 'Energy & Vitality', 'Sleep & Relaxation', 'Pain Relief'].map((category) => (
                        <button 
                          key={category}
                          className="px-4 py-2 bg-white border border-green-200 rounded-full text-sm font-medium hover:bg-green-50 hover:border-green-300 transition-colors"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Featured Herb Categories */}
                <div className="space-y-8">
                  {herbCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                            <p className="opacity-90">Discover evidence-based natural solutions for {category.name.toLowerCase()}</p>
                          </div>
                          <div className="text-3xl opacity-80">
                            {category.name === 'Stress & Anxiety' ? '🧘' : category.name === 'Sleep & Insomnia' ? '😴' : '🌱'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-8">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.herbs.map((herb, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-2xl hover:bg-gray-100 transition-colors group cursor-pointer">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="text-lg font-bold group-hover:text-green-700 transition-colors">{herb.name}</h4>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                herb.evidence === 'Strong' ? 'bg-green-100 text-green-800' :
                                herb.evidence === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                  {herb.evidence}
                              </span>
                              </div>
                              <p className="text-sm text-gray-600 italic mb-3">{herb.latin}</p>
                              <p className="text-gray-700 text-sm mb-4">{herb.uses}</p>
                              
                              <div className="flex gap-2">
                                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                                  View Details
                                </button>
                                <button className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                                  Safety Info
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-8 text-center">
                          <a 
                            href={addLocalePrefix("/herb-finder")}
                            className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-colors inline-block"
                          >
                            Explore All {category.name} Herbs →
                          </a>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Database Stats & Features */}
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-12 rounded-3xl">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold mb-6">🗄️ Why Our Database is Different</h3>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                      Not just another herb list - our database combines traditional wisdom with modern science to give you actionable, evidence-based information.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📊</div>
                      <div className="text-3xl font-bold mb-2">1,000+</div>
                      <p className="opacity-90">Herbs & Supplements</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">🔬</div>
                      <div className="text-3xl font-bold mb-2">5,000+</div>
                      <p className="opacity-90">Research Studies</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">⚡</div>
                      <div className="text-3xl font-bold mb-2">50+</div>
                      <p className="opacity-90">Health Conditions</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">🛡️</div>
                      <div className="text-3xl font-bold mb-2">100%</div>
                      <p className="opacity-90">Safety Reviewed</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href={addLocalePrefix("/herb-finder")}
                      className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors"
                    >
                      Browse Full Database
                    </a>
                    <a 
                      href={addLocalePrefix("/constitution-test")}
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-emerald-600 transition-all"
                    >
                      Find Your Perfect Herbs
                    </a>
                  </div>
                </div>

                {/* SEO Content for Herb Database */}
                <div className="bg-gray-50 p-12 rounded-3xl">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-6 text-center">Evidence-Based Herbal Medicine Database</h3>
                    <div className="prose prose-lg max-w-none text-gray-700">
                      <p>
                        Our comprehensive herbal database represents years of research compilation, traditional knowledge preservation, and clinical expertise. Each herb profile includes botanical information, active compounds, traditional uses across different cultures, modern clinical research findings, contraindications, drug interactions, and dosage recommendations based on current evidence.
                      </p>
                      <p>
                        We maintain the highest standards of accuracy by cross-referencing multiple authoritative sources including peer-reviewed journals, traditional medicine texts, clinical trial databases, and expert practitioner knowledge. Our evidence rating system helps you understand the quality and quantity of research supporting each herb's traditional and modern uses.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                      <div className="text-center">
                        <div className="text-3xl mb-3">📚</div>
                        <h4 className="font-bold mb-2">Traditional Wisdom</h4>
                        <p className="text-gray-600 text-sm">Documented uses from Ayurveda, Traditional Chinese Medicine, Native American herbalism, and European folk medicine.</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">🔬</div>
                        <h4 className="font-bold mb-2">Modern Research</h4>
                        <p className="text-gray-600 text-sm">Clinical trials, pharmacological studies, and systematic reviews from leading medical journals and research institutions.</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">🎯</div>
                        <h4 className="font-bold mb-2">Personalized Matching</h4>
                        <p className="text-gray-600 text-sm">Advanced algorithms match herbs to your constitution, health goals, and current medications for optimal results.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Safety Guide Section */}
            {activeTab === 'safety' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">🛡️ Comprehensive Herbal Safety Guidelines</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Your safety is our top priority. Get evidence-based safety information covering herb-drug interactions, contraindications, proper dosing, and special population guidelines. Our safety protocols are reviewed by licensed healthcare professionals and updated with the latest clinical research.
                  </p>
                </div>

                {/* Featured Safety Articles */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-3xl border border-red-100">
                  <h3 className="text-2xl font-bold mb-6 text-red-700 text-center">🚨 Must-Read Safety Guides</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {featuredContent.safety.map((article, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">{article.category}</span>
                          <span className="text-xs text-gray-500">{article.views}</span>
                        </div>
                        <h4 className="font-bold text-lg mb-3 group-hover:text-red-700 transition-colors">{article.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{article.preview}</p>
                        <button className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors">
                          Read Full Guide →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-red-50 border border-red-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                    <h3 className="text-2xl font-bold mb-6 text-red-600">⚠️ Critical Safety Warnings</h3>
                    <div className="space-y-4 text-gray-700">
                      <div className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">🚫</span>
                        <div>
                          <p className="font-semibold">Always consult healthcare providers before starting herbs</p>
                          <p className="text-sm text-gray-600">Especially important if you have chronic conditions</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">💊</span>
                        <div>
                          <p className="font-semibold">Inform your doctor about all supplements you take</p>
                          <p className="text-sm text-gray-600">Herbs can interact with prescription medications</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">🤰</span>
                        <div>
                          <p className="font-semibold">Be extra cautious during pregnancy and breastfeeding</p>
                          <p className="text-sm text-gray-600">Many herbs are not safe during these periods</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">⚡</span>
              <div>
                          <p className="font-semibold">Stop use if you experience adverse reactions</p>
                          <p className="text-sm text-gray-600">Seek medical attention for serious side effects</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-red-200">
                      <a 
                        href={addLocalePrefix("/ingredient-checker")}
                        className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors inline-block"
                      >
                        Check Herb Safety Now
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                    <h3 className="text-2xl font-bold mb-6 text-green-600">✅ Safe Usage Best Practices</h3>
                    <div className="space-y-4 text-gray-700">
                      <div className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">📏</span>
                        <div>
                          <p className="font-semibold">Start with the lowest recommended dose</p>
                          <p className="text-sm text-gray-600">Gradually increase if needed and well-tolerated</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">📝</span>
                        <div>
                          <p className="font-semibold">Keep a health diary to track effects</p>
                          <p className="text-sm text-gray-600">Monitor both benefits and side effects</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">🏆</span>
                        <div>
                          <p className="font-semibold">Buy from reputable, third-party tested sources</p>
                          <p className="text-sm text-gray-600">Quality matters for both safety and effectiveness</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">⏰</span>
                        <div>
                          <p className="font-semibold">Give herbs adequate time to work (2-8 weeks)</p>
                          <p className="text-sm text-gray-600">Natural remedies often work gradually</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-green-200">
                      <a 
                        href={addLocalePrefix("/dosage-calculator")}
                        className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors inline-block"
                      >
                        Calculate Safe Dosage
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100">
                  <h3 className="text-2xl font-bold mb-8 text-blue-600 text-center">🚨 When to Stop and Seek Medical Help</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl text-center shadow-lg">
                      <div className="text-4xl mb-4">🤧</div>
                      <h4 className="font-bold text-lg mb-3">Allergic Reactions</h4>
                      <p className="text-sm text-gray-700 mb-4">Rash, itching, swelling, difficulty breathing, hives</p>
                      <p className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Seek immediate medical attention</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl text-center shadow-lg">
                      <div className="text-4xl mb-4">⚡</div>
                      <h4 className="font-bold text-lg mb-3">Severe Side Effects</h4>
                      <p className="text-sm text-gray-700 mb-4">Persistent nausea, liver problems, severe headaches, chest pain</p>
                      <p className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Stop use and consult doctor</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl text-center shadow-lg">
                      <div className="text-4xl mb-4">💊</div>
                      <h4 className="font-bold text-lg mb-3">Drug Interactions</h4>
                      <p className="text-sm text-gray-700 mb-4">Changes in medication effectiveness, unexpected symptoms</p>
                      <p className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Contact healthcare provider</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Emergency hotline:</strong> Call 911 for severe allergic reactions or breathing difficulties
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a 
                          href={addLocalePrefix("/ingredient-checker")}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Check for Interactions
                        </a>
                        <button className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                          Download Safety Checklist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEO Content for Safety */}
                <div className="bg-gray-50 p-12 rounded-3xl">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-6 text-center">Understanding Herbal Safety & Risk Assessment</h3>
                    <div className="prose prose-lg max-w-none text-gray-700">
                      <p>
                        Herbal safety encompasses multiple factors including individual constitution, current health status, medication interactions, pregnancy status, and proper dosage guidelines. Unlike pharmaceutical drugs, herbal supplements are regulated as dietary supplements in the United States, which means they don't undergo the same rigorous testing for safety and efficacy before reaching the market.
                      </p>
                      <p>
                        Our comprehensive safety protocols consider traditional use patterns, modern clinical research, pharmacological interactions, contraindications, and population-specific considerations. We provide evidence-based safety ratings for over 1,000 herbs, helping you make informed decisions about your natural health journey.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                      <div className="text-center">
                        <div className="text-3xl mb-3">🔬</div>
                        <h4 className="font-bold mb-2">Science-Based Safety Ratings</h4>
                        <p className="text-gray-600 text-sm">Our safety assessments are based on peer-reviewed research, clinical trials, and traditional use data from multiple cultures.</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">👨‍⚕️</div>
                        <h4 className="font-bold mb-2">Healthcare Professional Review</h4>
                        <p className="text-gray-600 text-sm">All safety information is reviewed by licensed naturopathic doctors and clinical herbalists with decades of experience.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Research Section */}
            {activeTab === 'research' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">🔬 Scientific Research & Evidence</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Dive deep into the science behind herbal medicine. Our research section provides evidence-based analysis of clinical trials, systematic reviews, and emerging studies in phytotherapy and natural medicine.
                  </p>
                </div>

                {/* Featured Research Articles */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100">
                  <h3 className="text-2xl font-bold mb-6 text-blue-700 text-center">📊 Latest Research Findings</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {featuredContent.research.map((study, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{study.category}</span>
                          <span className="text-xs text-gray-500">{study.views}</span>
                        </div>
                        <h4 className="font-bold text-lg mb-3 group-hover:text-blue-700 transition-colors">{study.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{study.preview}</p>
                        <div className="flex justify-between items-center">
                          <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                            Read Study →
                          </button>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-2">📖</span>
                            <span>5 min read</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="text-2xl mr-3">🏆</span>
                      How We Rate Evidence
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3 min-w-[80px] text-center">Strong</span>
                        <div>
                          <p className="font-semibold text-gray-900">Multiple high-quality clinical trials</p>
                          <p className="text-sm text-gray-600">Randomized, double-blind, placebo-controlled studies with consistent results</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mr-3 min-w-[80px] text-center">Moderate</span>
                        <div>
                          <p className="font-semibold text-gray-900">Some clinical evidence, traditional use</p>
                          <p className="text-sm text-gray-600">Limited clinical trials plus extensive traditional documentation</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium mr-3 min-w-[80px] text-center">Limited</span>
                        <div>
                          <p className="font-semibold text-gray-900">Preliminary studies, traditional use only</p>
                          <p className="text-sm text-gray-600">Animal studies, in vitro research, or traditional use without clinical validation</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                        View Research Methodology
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="text-2xl mr-3">📚</span>
                      Our Research Sources
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">🔬</span>
                        <div>
                          <p className="font-semibold text-gray-900">PubMed/MEDLINE databases</p>
                          <p className="text-sm text-gray-600">The world's largest biomedical literature database</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">📊</span>
                        <div>
                          <p className="font-semibold text-gray-900">Cochrane systematic reviews</p>
                          <p className="text-sm text-gray-600">Gold standard for evidence-based healthcare research</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">🧪</span>
                        <div>
                          <p className="font-semibold text-gray-900">Clinical trial registries</p>
                          <p className="text-sm text-gray-600">ClinicalTrials.gov and international trial databases</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">📖</span>
                        <div>
                          <p className="font-semibold text-gray-900">Traditional medicine literature</p>
                          <p className="text-sm text-gray-600">Ancient texts and ethnobotanical studies</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                        Browse Research Library
                      </button>
                    </div>
                  </div>
                </div>

                {/* Research Quality Guide */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 rounded-3xl">
                  <h3 className="text-3xl font-bold mb-8 text-center">Understanding Research Quality</h3>
                  <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="bg-white/20 p-4 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center">
                        <div className="text-3xl">🏆</div>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Gold Standard</h4>
                      <p className="text-sm opacity-90 mb-3">Randomized controlled trials (RCTs)</p>
                      <p className="text-xs opacity-75">Multiple RCTs with consistent results provide the strongest evidence for effectiveness</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/20 p-4 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center">
                        <div className="text-3xl">🥈</div>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Good Evidence</h4>
                      <p className="text-sm opacity-90 mb-3">Cohort studies, case-control studies</p>
                      <p className="text-xs opacity-75">Observational studies that track outcomes over time in large populations</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/20 p-4 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center">
                        <div className="text-3xl">🥉</div>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Preliminary</h4>
                      <p className="text-sm opacity-90 mb-3">Laboratory studies, animal studies</p>
                      <p className="text-xs opacity-75">Early-stage research that helps identify promising compounds for human studies</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/20 p-4 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center">
                        <div className="text-3xl">📚</div>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Traditional</h4>
                      <p className="text-sm opacity-90 mb-3">Historical use, anecdotal reports</p>
                      <p className="text-xs opacity-75">Centuries of traditional use that may lack modern clinical validation</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-12">
                    <p className="text-xl mb-6 opacity-90">Stay updated with the latest herbal medicine research</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors">
                        Subscribe to Research Updates
                      </button>
                      <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-indigo-600 transition-all">
                        Download Research Guide
                      </button>
                    </div>
                  </div>
                </div>

                {/* Research by Health Condition */}
                <div className="bg-gray-50 p-12 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-8 text-center">Research by Health Condition</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-3xl text-center mb-4">🧠</div>
                      <h4 className="font-bold text-lg mb-3 text-center">Mental Health</h4>
                      <ul className="text-sm text-gray-600 space-y-2 mb-4">
                        <li>• Anxiety and stress management</li>
                        <li>• Depression and mood disorders</li>
                        <li>• Cognitive function and memory</li>
                        <li>• Sleep disorders and insomnia</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                          View Mental Health Research
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-3xl text-center mb-4">💪</div>
                      <h4 className="font-bold text-lg mb-3 text-center">Physical Health</h4>
                      <ul className="text-sm text-gray-600 space-y-2 mb-4">
                        <li>• Cardiovascular health</li>
                        <li>• Immune system support</li>
                        <li>• Digestive health and gut microbiome</li>
                        <li>• Anti-inflammatory effects</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                          View Physical Health Research
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-3xl text-center mb-4">👩‍⚕️</div>
                      <h4 className="font-bold text-lg mb-3 text-center">Women's Health</h4>
                      <ul className="text-sm text-gray-600 space-y-2 mb-4">
                        <li>• Hormonal balance and PMS</li>
                        <li>• Menopause symptom management</li>
                        <li>• Reproductive health support</li>
                        <li>• Pregnancy and breastfeeding safety</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                          View Women's Health Research
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEO Content for Research */}
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold mb-6 text-center">Evidence-Based Herbal Medicine Research</h3>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p>
                      The field of herbal medicine research has expanded dramatically in recent decades, with thousands of clinical trials investigating the safety and efficacy of botanical medicines. Our research section synthesizes findings from peer-reviewed journals, systematic reviews, and meta-analyses to provide you with accurate, up-to-date information about herbal therapeutics.
                    </p>
                    <p>
                      We follow strict criteria when evaluating research quality, considering factors such as study design, sample size, duration, control groups, and statistical significance. Our evidence ratings help you understand the strength of scientific support for each herb's traditional and modern uses, enabling informed decisions about your natural health approach.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="text-center">
                      <div className="text-3xl mb-3">📈</div>
                      <h4 className="font-bold mb-2">Growing Evidence Base</h4>
                      <p className="text-gray-600 text-sm">Over 5,000 new herbal medicine studies are published annually, continually expanding our understanding of plant-based therapeutics.</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">🎯</div>
                      <h4 className="font-bold mb-2">Precision Herbalism</h4>
                      <p className="text-gray-600 text-sm">Modern research is revealing how genetic variations, gut microbiome, and individual constitution influence herbal medicine effectiveness.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 bg-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl mb-8 opacity-90">
              Use our personalized tools to get specific recommendations for your health goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={addLocalePrefix("/herb-finder")}
                className="bg-white text-purple-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-2xl text-lg transition-colors"
              >
                Find Herbs by Symptom
              </a>
              <a 
                href={addLocalePrefix("/ingredient-checker")}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200"
              >
                Check Herb Safety
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 