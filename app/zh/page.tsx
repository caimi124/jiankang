'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { getTranslation } from '../../lib/i18n'

// 延迟加载Header
const Header = dynamic(() =>
  new Promise<any>((resolve) => {
    const loadHeader = () => resolve(import('../../components/Header'))
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

export default function ZhHome() {
  const [selectedGoal, setSelectedGoal] = useState('')
  const t = getTranslation('zh')

  const selectedGoalData = selectedGoal ? {
    title: t.home.healthGoals[selectedGoal as keyof typeof t.home.healthGoals]?.title,
    herbs: t.home.healthGoals[selectedGoal as keyof typeof t.home.healthGoals]?.herbs
  } : null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: 'https://herbscience.shop/zh' }
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
        跳转到主要内容
      </a>
      <main id="main-content" className="min-h-screen bg-white">
        {/* 中文首页动态 OG 图 */}
        <meta property="og:image" content="https://herbscience.shop/zh/opengraph-image" />
        <meta name="twitter:image" content="https://herbscience.shop/zh/opengraph-image" />
        {/* hreflang alternates */}
        <link rel="alternate" hrefLang="en" href="https://herbscience.shop/" />
        <link rel="alternate" hrefLang="zh" href="https://herbscience.shop/zh" />
        <link rel="alternate" hrefLang="x-default" href="https://herbscience.shop/" />
        {/* BreadcrumbList JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <Header />

        {/* 1. Hero Banner Section - 优化关键词布局 */}
        <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.home.title}
              <span className="block text-green-600">{t.home.subtitle}</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              {t.home.description}
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
              <p className="text-yellow-800 font-medium text-sm flex items-center justify-center">
                <span className="mr-2">⏰</span>
                <span>{t.home.urgencyAlert}</span>
              </p>
            </div>

            {/* 痛点区域 - 增强视觉冲击力 */}
            <div className="bg-red-50 border-l-4 border-red-400 rounded-2xl p-6 mb-8 max-w-3xl mx-auto shadow-lg">
              <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                <span className="mr-2">⚠️</span>
                {t.home.painPointsTitle}
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="text-red-600 font-medium mb-1">{t.home.painPoints.sleep.title}</div>
                  <div className="text-gray-700">{t.home.painPoints.sleep.description}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="text-red-600 font-medium mb-1">{t.home.painPoints.safety.title}</div>
                  <div className="text-gray-700">{t.home.painPoints.safety.description}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="text-red-600 font-medium mb-1">{t.home.painPoints.guesswork.title}</div>
                  <div className="text-gray-700">{t.home.painPoints.guesswork.description}</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-red-700 font-medium text-sm">
                  {t.home.painPointsFooter}
                </p>
              </div>
            </div>

            {/* 2. CTA - 突出体质测试 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/zh/constitution-test"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 relative"
              >
                <div className="flex items-center space-x-2">
                  <span>🧠</span>
                  <div>
                    <div>{t.home.primaryCta.title}</div>
                    <div className="text-sm text-green-100 font-normal">{t.home.primaryCta.subtitle}</div>
                  </div>
                </div>
              </Link>

              <Link
                href="/zh/herb-finder"
                className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                <div className="flex items-center space-x-2">
                  <span>🌿</span>
                  <span>{t.home.secondaryCta}</span>
                </div>
              </Link>
            </div>

            {/* Trust indicators - 强调安全和科学 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-1 text-sm text-gray-600">
                <span className="text-2xl">🛡️</span>
                <span className="font-medium">{t.home.trustIndicators.safe.title}</span>
                <span className="text-xs">{t.home.trustIndicators.safe.subtitle}</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-sm text-gray-600">
                <span className="text-2xl">⚗️</span>
                <span className="font-medium">{t.home.trustIndicators.evidenceBased.title}</span>
                <span className="text-xs">{t.home.trustIndicators.evidenceBased.subtitle}</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-sm text-gray-600">
                <span className="text-2xl">👥</span>
                <span className="font-medium">{t.home.trustIndicators.users.title}</span>
                <span className="text-xs">{t.home.trustIndicators.users.subtitle}</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-sm text-gray-600">
                <span className="text-2xl">⚕️</span>
                <span className="font-medium">{t.home.trustIndicators.noSideEffects.title}</span>
                <span className="text-xs">{t.home.trustIndicators.noSideEffects.subtitle}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Health Goals - 使用低竞争关键词 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.home.healthGoalsSection.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.home.healthGoalsSection.description}
              </p>
            </div>

            {/* Health Goal Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {Object.entries(t.home.healthGoals).map(([key, goal]) => (
                <button
                  key={key}
                  onClick={() => setSelectedGoal(key === selectedGoal ? '' : key)}
                  className={`p-6 rounded-xl border transition-all text-left hover:shadow-md ${selectedGoal === key
                    ? 'border-green-400 bg-green-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-3">{t.home.featuredArticles[key as keyof typeof t.home.featuredArticles]?.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
                  <p className="text-gray-600 text-sm">{goal.description}</p>
                </button>
              ))}
            </div>

            {/* Herb Recommendations */}
            {selectedGoalData && (
              <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t.common.recommendedFor} {selectedGoalData.title}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {selectedGoalData.herbs?.map((herb, index) => (
                    <Link
                      key={index}
                      href={`/zh/herbs/${herb.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bg-white hover:bg-green-100 px-4 py-2 rounded-full text-green-700 font-medium text-sm transition-colors border border-green-200"
                    >
                      🌿 {herb}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/zh/constitution-test"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  {t.common.getPersonalPlan}
                </Link>
              </div>
            )}

            {!selectedGoal && (
              <div className="text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t.home.personalizedCta.title}</h3>
                <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                  {t.home.personalizedCta.description}
                </p>
                <Link
                  href="/zh/constitution-test"
                  className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
                >
                  {t.home.personalizedCta.button}
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
                {t.home.userStoriesSection.title}
              </h2>
              <p className="text-xl text-gray-600">
                {t.home.userStoriesSection.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {Object.values(t.home.userStories).map((story, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-3xl">{story.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.location}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg mb-3">
                    <div className="text-sm text-blue-600 font-medium">使用: {story.herb}</div>
                    <div className="text-sm text-blue-600">用于: {story.condition}</div>
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
                  <div className="text-sm text-gray-600">{t.home.successMetrics.positiveResults}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">2-4</div>
                  <div className="text-sm text-gray-600">{t.home.successMetrics.timeToResults}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">94%</div>
                  <div className="text-sm text-gray-600">{t.home.successMetrics.recommend}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">1万+</div>
                  <div className="text-sm text-gray-600">{t.home.successMetrics.activeUsers}</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/zh/constitution-test"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                {t.home.communityJoin}
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Featured Blog Articles - 强调实用性 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.home.blogSection.title}
              </h2>
              <p className="text-xl text-gray-600">
                {t.home.blogSection.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {Object.entries(t.home.featuredArticles).map(([key, article]) => (
                <Link
                  key={key}
                  href={`/zh/blog/${key}-support`}
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
                    {t.common.readMore}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/zh/blog"
                className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                {t.home.viewAllArticles}
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA - 重复核心关键词 */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.home.finalCta.title}
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              {t.home.finalCta.description}
            </p>
            <Link
              href="/zh/constitution-test"
              className="inline-flex items-center bg-white text-green-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors shadow-xl"
            >
              {t.home.finalCta.button}
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}