'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '../../components/Header'
import SmartSearch from '../../components/SmartSearch'
import TrustIndicators from '../../components/TrustIndicators'
import PersonalizedRecommendations from '../../components/PersonalizedRecommendations'
import { getTranslation } from '../../lib/i18n'

export default function ZhHome() {
  const pathname = usePathname()
  const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en'
  const t = getTranslation(currentLocale)

  return (
    <main className="min-h-screen bg-white">
      {/* Unified Header Component */}
      <Header />

      {/* Hero Section with Enhanced Visual Design */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 text-green-600">🌿</div>
          <div className="absolute top-20 right-20 w-16 h-16 text-blue-600">⚗️</div>
          <div className="absolute bottom-20 left-20 w-18 h-18 text-purple-600">🧬</div>
          <div className="absolute bottom-10 right-10 w-16 h-16 text-green-700">🌱</div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 text-emerald-600">✨</div>
          <div className="absolute top-1/3 right-1/4 w-14 h-14 text-teal-600">🔬</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg">
              <span className="text-green-600 font-medium">✅ {t.home.heroSubtitle}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.home.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 block">
                {t.home.subtitle}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.home.description}
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="mb-8">
              <SmartSearch 
                placeholder={currentLocale === 'zh' ? '搜索草药、症状或获取安全信息...' : 'Search herbs, symptoms, or get safety information...'}
                onSearch={(query, filters) => {
                  // Redirect to herb finder with search query
                  const searchParams = new URLSearchParams();
                  if (query) searchParams.set('search', query);
                  if (filters.category) searchParams.set('category', filters.category);
                  
                  // For Chinese version, redirect to Chinese herb finder
                  const targetUrl = `/zh/herb-finder?${searchParams.toString()}`;
                  window.location.href = targetUrl;
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/zh/herb-finder" className="group bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="flex items-center justify-center">
                  🔍 {t.home.findHerbs}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <Link href="/zh/ingredient-checker" className="group border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="flex items-center justify-center">
                  🛡️ {t.home.checkSafety}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-xs text-gray-600">{t.home.heroStats.herbs}</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-xs text-gray-600">{t.home.heroStats.users}</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-2xl font-bold text-purple-600">2K+</div>
                <div className="text-xs text-gray-600">{t.home.heroStats.research}</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-2xl font-bold text-emerald-600">24/7</div>
                <div className="text-xs text-gray-600">{t.home.heroStats.database}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Functions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.home.sectionTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.home.sectionDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/zh/herb-finder" className="group herb-card">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">症状草药查找器</h3>
              <p className="text-gray-600 leading-relaxed">输入您的症状，发现可能有帮助的草药，基于传统使用和现代研究。</p>
              <div className="mt-4 flex items-center text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>立即尝试</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            <Link href="/zh/ingredient-checker" className="group herb-card">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">安全检查器</h3>
              <p className="text-gray-600 leading-relaxed">上传您的补充剂标签，获得每种成分的详细安全分析和潜在相互作用。</p>
              <div className="mt-4 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>检查安全性</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            <Link href="/zh/knowledge-center" className="group herb-card">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">知识库</h3>
              <p className="text-gray-600 leading-relaxed">浏览草药综合指南、研究报告和传统医学原理。</p>
              <div className="mt-4 flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>立即探索</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            <Link href="/zh/constitution-test" className="group herb-card relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                热门！
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors">体质测试</h3>
              <p className="text-gray-600 leading-relaxed">通过中医体质评估发现您的独特体质类型，获得个性化推荐。</p>
              <div className="mt-4 flex items-center text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>参加测试</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>

          {/* Interactive CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">{t.home.ctaTitle}</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              {t.home.ctaDescription}
            </p>
            <Link href="/zh/constitution-test" className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl">
              <span className="mr-2">🎯</span>
              {t.home.ctaButton}
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Personalized Recommendations */}
      <PersonalizedRecommendations />
    </main>
  )
} 