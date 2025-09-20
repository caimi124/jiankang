'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { getTranslation } from '../lib/i18n'

// 延迟加载Header
const Header = dynamic(() =>
  new Promise<any>((resolve) => {
    const loadHeader = () => resolve(import('../components/Header'))
    const events = ['click', 'touchstart', 'keydown', 'scroll']
    const cleanup = () => events.forEach(e => document.removeEventListener(e, loadHeader))
    events.forEach(e => document.addEventListener(e, loadHeader, { once: true }))
    setTimeout(() => { cleanup(); loadHeader() }, 3000)
  }),
  {
    ssr: false,
    loading: () => (
      <div style={{height:'60px',background:'#fff',borderBottom:'1px solid #e5e7eb'}} />
    )
  }
)

export default function HomeClient() {
  const [selectedGoal, setSelectedGoal] = useState('')
  const t = getTranslation('en')

  // 健康目标数据 - 使用低竞争关键词
  const healthGoals = [
    {
      id: 'sleep',
      icon: '😴',
      title: 'Sleep Support Herbs',
      description: 'Sleep herb valerian, chamomile tea for better rest',
      herbs: ['Valerian Root', 'Chamomile Tea', 'Passionflower']
    },
    {
      id: 'stress',
      icon: '😌',
      title: 'Stress Relief Herbs',
      description: 'Best herbs for stress and anxiety without side effects',
      herbs: ['Ashwagandha', 'Holy Basil', 'Lemon Balm']
    },
    {
      id: 'energy',
      icon: '⚡',
      title: 'Energy & Focus Herbs',
      description: 'Herbal teas for energy and focus, mental clarity',
      herbs: ['Ginseng', 'Rhodiola', 'Green Tea']
    },
    {
      id: 'immunity',
      icon: '🛡️',
      title: 'Immune Boosting Herbs',
      description: 'Immune boosting herbs for flu season protection',
      herbs: ['Echinacea', 'Elderberry', 'Astragalus']
    }
  ]

  // 用户故事数据 - 强调安全和效果
  const userStories = [
    {
      name: "Sarah M.",
      location: "California, USA",
      herb: "Sleep Herb Valerian",
      condition: "Sleep Problems",
      result: "Finally sleeping through the night after 2 weeks!",
      avatar: "👩‍💼"
    },
    {
      name: "Michael R.",
      location: "London, UK",
      herb: "Ginseng & Rhodiola",
      condition: "Low Energy",
      result: "Full of energy without caffeine crashes",
      avatar: "🏃‍♂️"
    },
    {
      name: "Dr. Jennifer L.",
      location: "Toronto, Canada",
      herb: "Stress Relief Herbs",
      condition: "Work Stress",
      result: "Calm mind and clear focus for workdays",
      avatar: "👩‍⚕️"
    }
  ]

  // 精选博客文章 - 使用低竞争关键词
  const featuredArticles = [
    {
      title: "Best Herbs for Sleep Support: Natural Ways to Rest Better",
      excerpt: "Sleep herb valerian, chamomile tea, and other natural ways to improve sleep quality.",
      readTime: "8 min read",
      category: "Lifestyle",
      slug: "best-herbs-for-sleep-support",
      icon: "😴"
    },
    {
      title: "Stress Relief Herbs Without Side Effects",
      excerpt: "Safe, natural herbs for stress management that work without harmful side effects.",
      readTime: "7 min read",
      category: "Lifestyle",
      slug: "stress-relief-herbs-no-side-effects",
      icon: "😌"
    },
    {
      title: "Immune Boosting Herbs for Flu Season",
      excerpt: "Strengthen your immune system naturally with proven herbs that protect against illness.",
      readTime: "6 min read",
      category: "Science",
      slug: "immune-boosting-herbs-flu-season",
      icon: "🛡️"
    }
  ]

  const selectedGoalData = healthGoals.find(goal => goal.id === selectedGoal)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://herbscience.shop/' }
    ]
  }
  
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
        style={{position:'absolute',left:'-9999px'}}
        onFocus={(e) => e.currentTarget.style.left = '0'}
        onBlur={(e) => e.currentTarget.style.left = '-9999px'}
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-white">
        <Header />

        {/* 1. Hero Banner Section - 优化关键词布局 */}
        <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Stop Guessing — Find Herbs That
              <span className="block text-green-600">Actually Work for Your Body</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Take our <strong>constitution test</strong> to get <strong>safe, evidence-based herbal recommendations</strong> tailored to your body type and health needs.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
              <p className="text-yellow-800 font-medium text-sm flex items-center justify-center">
                <span className="mr-2">⏰</span>
                <span>Don't waste another month on herbs that don't work for YOUR body type!</span>
              </p>
            </div>

            {/* 痛点区域 - 增强视觉冲击力 */}
            <div className="bg-red-50 border-l-4 border-red-400 rounded-2xl p-6 mb-8 max-w-3xl mx-auto shadow-lg">
              <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                <span className="mr-2">⚠️</span>
                Sound Familiar? You're Not Alone...
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="text-red-600 font-medium mb-1">😴 Sleep Issues</div>
                  <div className="text-gray-700">"Tried chamomile, valerian... nothing helps my insomnia"</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="text-red-600 font-medium mb-1">🧪 Safety Concerns</div>
                  <div className="text-gray-700">"Will this herb interact with my blood pressure meds?"</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="text-red-600 font-medium mb-1">🤷 Guesswork</div>
                  <div className="text-gray-700">"Every website says different things - what actually works?"</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-red-700 font-medium text-sm">
                  👆 Stop wasting time and money on herbs that don't match your body!
                </p>
              </div>
            </div>

            {/* 2. CTA - 突出体质测试 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/constitution-test"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 relative"
              >
                <div className="flex items-center space-x-2">
                  <span>🧠</span>
                  <div>
                    <div>Get Your Personal Herb Plan</div>
                    <div className="text-sm text-green-100 font-normal">Quick 3-minute test • Results instantly</div>
                  </div>
                </div>
              </Link>

              <Link
                href="/herb-finder"
                className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                <div className="flex items-center space-x-2">
                  <span>🌿</span>
                  <span>Browse Herbs by Goal</span>
                </div>
              </Link>
            </div>

            {/* Trust indicators - 强调安全和科学 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-1 text-sm text-gray-600">
                <span className="text-2xl">🛡️</span>
                <span className="font-medium">Safe Herbal Use</span>
                <span className="text-xs">Drug interaction checks</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-sm text-gray-600">
                <span className="text-2xl">⚗️</span>
                <span className="font-medium">Evidence-Based</span>
                <span className="text-xs">Research-backed recommendations</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-sm text-gray-600">
                <span className="text-2xl">👥</span>
                <span className="font-medium">10K+ Users</span>
                <span className="text-xs">Trusted by thousands</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-sm text-gray-600">
                <span className="text-2xl">⚕️</span>
                <span className="font-medium">No Side Effects</span>
                <span className="text-xs">Natural, gentle solutions</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Health Goals - 使用低竞争关键词 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Health Goals — Herbs That Help
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose your main goal and discover <strong>targeted herbs with real results</strong>:
              </p>
            </div>

            {/* Health Goal Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {healthGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id === selectedGoal ? '' : goal.id)}
                  className={`p-6 rounded-xl border transition-all text-left hover:shadow-md ${selectedGoal === goal.id
                    ? 'border-green-400 bg-green-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-3">{goal.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
                  <p className="text-gray-600 text-sm">{goal.description}</p>
                </button>
              ))}
            </div>

            {/* Herb Recommendations */}
            {selectedGoalData && (
              <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Recommended for {selectedGoalData.title}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {selectedGoalData.herbs.map((herb, index) => (
                    <Link
                      key={index}
                      href={`/herbs/${herb.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bg-white hover:bg-green-100 px-4 py-2 rounded-full text-green-700 font-medium text-sm transition-colors border border-green-200"
                    >
                      🌿 {herb}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/constitution-test"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Get Personal Plan →
                </Link>
              </div>
            )}

            {!selectedGoal && (
              <div className="text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Want Personalized Recommendations?</h3>
                <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                  Take our TCM constitution assessment to get recommendations tailored to your unique body type.
                </p>
                <Link
                  href="/constitution-test"
                  className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
                >
                  🧠 Take Constitution Test →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* 4. User Success Stories - 强调安全效果 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Real User Results
              </h2>
              <p className="text-xl text-gray-600">
                See how others found <strong>safe herbal solutions</strong> with our <strong>personalized herbal recommendations</strong>.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {userStories.map((story, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-3xl">{story.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.location}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg mb-3">
                    <div className="text-sm text-blue-600 font-medium">Used: {story.herb}</div>
                    <div className="text-sm text-blue-600">For: {story.condition}</div>
                  </div>

                  <p className="text-gray-700 text-sm italic">"{story.result}"</p>
                </div>
              ))}
            </div>

            {/* Success metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">89%</div>
                  <div className="text-sm text-gray-600">Report Positive Results</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">2-4</div>
                  <div className="text-sm text-gray-600">Weeks to See Benefits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">94%</div>
                  <div className="text-sm text-gray-600">Would Recommend</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">10K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/constitution-test"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Join Our Community - Start Your Test →
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Featured Blog Articles - 强调实用性 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest Herbal Guides
              </h2>
              <p className="text-xl text-gray-600">
                Stay safe and informed with <strong>science-backed herbal guides</strong>:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {featuredArticles.map((article, index) => (
                <Link
                  key={index}
                  href={`/blog/${article.slug}`}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-green-300 transition-all"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl">{article.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-green-600">{article.category}</div>
                      <div className="text-sm text-gray-500">{article.readTime}</div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700 mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center text-green-600 group-hover:text-green-700 font-medium text-sm">
                    Read More →
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                View All Articles →
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA - 重复核心关键词 */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stop guessing. Start using the right herbs for your body.
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Take our <strong>constitution test</strong> and get <strong>safe, evidence-based herbal guidance</strong> today.
            </p>
            <Link
              href="/constitution-test"
              className="inline-flex items-center bg-white text-green-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors shadow-xl"
            >
              Start My Test Now
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
