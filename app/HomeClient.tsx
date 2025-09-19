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

  // 健康目标数据
  const healthGoals = [
    {
      id: 'stress',
      icon: '😌',
      title: 'Stress Management',
      description: 'Natural ways to reduce stress and anxiety',
      herbs: ['Ashwagandha', 'Rhodiola', 'Holy Basil']
    },
    {
      id: 'energy',
      icon: '⚡',
      title: 'Energy & Vitality',
      description: 'Boost natural energy without caffeine crashes',
      herbs: ['Ginseng', 'Cordyceps', 'Maca Root']
    },
    {
      id: 'sleep',
      icon: '😴',
      title: 'Better Sleep',
      description: 'Improve sleep quality naturally',
      herbs: ['Valerian', 'Passionflower', 'Chamomile']
    },
    {
      id: 'immunity',
      icon: '🛡️',
      title: 'Immune Support',
      description: 'Strengthen your natural defenses',
      herbs: ['Echinacea', 'Elderberry', 'Astragalus']
    }
  ]

  // 用户故事数据
  const userStories = [
    {
      name: "Sarah M.",
      location: "California, USA",
      herb: "Ashwagandha",
      condition: "Stress & Anxiety",
      result: "Better sleep and less anxiety within 2 weeks",
      avatar: "👩‍💼"
    },
    {
      name: "Dr. Jennifer L.",
      location: "Toronto, Canada",
      herb: "Rhodiola & Ginseng",
      condition: "Mental Fatigue",
      result: "Sustained energy and clear thinking without caffeine",
      avatar: "👩‍⚕️"
    },
    {
      name: "Michael R.",
      location: "London, UK",
      herb: "Turmeric & Ginger",
      condition: "Joint Pain",
      result: "95% reduction in pain, running 5K again",
      avatar: "🏃‍♂️"
    }
  ]

  // 精选博客文章
  const featuredArticles = [
    {
      title: "Turmeric Made Simple: How to Use It Today for Real Gut Relief",
      excerpt: "Discover how turmeric can help calm your gut, reduce inflammation, and boost your energy.",
      readTime: "8 min read",
      category: "Lifestyle",
      slug: "turmeric-gut-relief-guide",
      icon: "🌿"
    },
    {
      title: "Best Herbs for Anxiety: Natural Alternatives to Prescriptions",
      excerpt: "Compare ashwagandha, valerian, and passionflower vs. prescription anti-anxiety drugs.",
      readTime: "8 min read",
      category: "Science",
      slug: "herbs-for-anxiety-natural-alternatives",
      icon: "🧠"
    },
    {
      title: "Hidden Dangers: 5 Popular Herb-Medication Combinations to Avoid",
      excerpt: "Essential safety information about dangerous interactions between herbal supplements and medications.",
      readTime: "7 min read",
      category: "Science",
      slug: "herb-medication-interactions",
      icon: "⚠️"
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

        {/* 1. Hero Banner Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect Herbs
              <span className="block text-green-600">Through Science</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Take our TCM constitution test to get personalized herb recommendations based on your unique body type and health patterns.
            </p>

            {/* 2. CTA - 突出体质测试 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/constitution-test"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                🧠 Take Constitution Test
              </Link>

              <Link
                href="/herb-finder"
                className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                🔍 Browse Herbs Database
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span>⚗️</span>
                <span>Evidence-Based</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>👥</span>
                <span>10K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🌿</span>
                <span>500+ Herbs</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Personalized Herb Recommendations */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What's Your Health Goal Today?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get instant herb recommendations based on your specific health objectives.
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

        {/* 4. User Success Stories */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Real Results from Our Community
              </h2>
              <p className="text-xl text-gray-600">
                See how others have transformed their health with evidence-based herbal guidance.
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

                  <p className="text-gray-700 text-sm italic">"ÂÅ{story.result}ÂÄ"</p>
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

        {/* 5. Featured Blog Articles */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest Herb Insights
              </h2>
              <p className="text-xl text-gray-600">
                Evidence-based articles to guide your herbal journey.
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

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands who've found their perfect herbs through our personalized approach.
            </p>
            <Link
              href="/constitution-test"
              className="inline-flex items-center bg-white text-green-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors shadow-xl"
            >
              🎯 Start Your Personalized Journey
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
