'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '../components/Header'
import SmartSearch from '../components/SmartSearch'
import TrustIndicators from '../components/TrustIndicators'
import PersonalizedRecommendations from '../components/PersonalizedRecommendations'
import { getTranslation } from '../lib/i18n'

export default function Home() {
  const pathname = usePathname()
  const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en'
  const t = getTranslation(currentLocale)
  
  // 添加语言前缀的函数
  const addLocalePrefix = (href: string) => {
    if (currentLocale === 'zh') {
      return `/zh${href}`
    }
    return href
  }
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
              Your Herbal Companion
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 block">
                Backed by Science
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Navigate herbal supplements with confidence. Get evidence-based recommendations, safety checks, and personalized guidance from traditional medicine experts.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="mb-8">
              <SmartSearch 
                placeholder={currentLocale === 'zh' ? '搜索草药、症状或获取安全信息...' : 'Search herbs, symptoms, or get safety information...'}
                onSearch={(query, filters) => {
                  // Handle search - could redirect to search results page
                  console.log('Search:', query, filters);
                }}
              />
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={addLocalePrefix("/constitution-test")} className="group bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="flex items-center justify-center">
                  🎯 Start Your Herb Journey
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <Link href={addLocalePrefix("/herb-finder")} className="group border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="flex items-center justify-center">
                  🔍 Explore Herb Database
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
              Everything You Need to Navigate Herbal Supplements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From safety checking to personalized recommendations, our evidence-based tools guide you every step of the way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href={addLocalePrefix("/herb-finder")} className="group herb-card">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">Symptom-Based Finder</h3>
              <p className="text-gray-600 leading-relaxed">Enter your symptoms and discover which herbs might help, backed by traditional use and modern research.</p>
              <div className="mt-4 flex items-center text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Try it now</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            <Link href={addLocalePrefix("/ingredient-checker")} className="group herb-card">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">Safety Checker</h3>
              <p className="text-gray-600 leading-relaxed">Upload your supplement label and get detailed safety analysis of each ingredient and potential interactions.</p>
              <div className="mt-4 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Check safety</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            <Link href={addLocalePrefix("/knowledge-center")} className="group herb-card">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">Knowledge Base</h3>
              <p className="text-gray-600 leading-relaxed">Browse comprehensive guides on herbs, research studies, and traditional medicine principles.</p>
              <div className="mt-4 flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore now</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            <Link href={addLocalePrefix("/constitution-test")} className="group herb-card relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Popular!
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors">Body Constitution Quiz</h3>
              <p className="text-gray-600 leading-relaxed">Discover your unique body type through Traditional Chinese Medicine assessment for personalized recommendations.</p>
              <div className="mt-4 flex items-center text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Take quiz</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>

          {/* Interactive CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Not Sure Where to Start?</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Take our quick 2-minute assessment to get personalized recommendations based on your health goals and concerns.
            </p>
            <Link href={addLocalePrefix("/constitution-test")} className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl">
              <span className="mr-2">🎯</span>
              Get Personalized Recommendations
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Common Herbal Supplement Concerns, Solved
            </h2>
            <p className="text-xl text-gray-600">
              We understand the challenges people face when choosing herbal supplements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">❓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"I don't know what this herb actually does"</h3>
                  <p className="text-gray-600 text-sm">Our database explains each herb's traditional uses, active compounds, and scientific evidence in plain English.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🤔</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"Will this actually work for me?"</h3>
                  <p className="text-gray-600 text-sm">We provide evidence ratings and help you understand which herbs have strong vs. limited research support.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"Is this safe to take?"</h3>
                  <p className="text-gray-600 text-sm">Our safety checker identifies potential risks, contraindications, and drug interactions before you start.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">😰</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"What if I get side effects?"</h3>
                  <p className="text-gray-600 text-sm">We list known side effects, warning signs to watch for, and when to stop taking supplements.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🏛️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"Are herbal supplements FDA approved?"</h3>
                  <p className="text-gray-600 text-sm">We explain supplement regulations, quality standards, and how to choose reputable brands.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🈲</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"I can't read Chinese herb names"</h3>
                  <p className="text-gray-600 text-sm">We provide English names, pronunciation guides, and clear explanations for all traditional herbs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why 50,000+ People Trust HerbScience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We bridge the gap between traditional wisdom and modern science with expert-backed information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Team</h3>
              <p className="text-gray-600 leading-relaxed">
                Licensed TCM practitioners, pharmacists, and research scientists collaborate to review every herb profile and safety guideline.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Evidence-Based</h3>
              <p className="text-gray-600 leading-relaxed">
                Every recommendation is backed by peer-reviewed research and traditional clinical experience, with clear evidence ratings.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Institutional Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Referenced by leading hospitals, wellness clinics, and educational institutions for our accurate, up-to-date information.
              </p>
            </div>
          </div>

          {/* Research Partners & Citations */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Our Sources & Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="opacity-70 hover:opacity-100 transition-opacity">
                <div className="text-sm font-medium text-gray-600">PubMed Research</div>
                <div className="text-xs text-gray-500">2,000+ studies cited</div>
              </div>
              <div className="opacity-70 hover:opacity-100 transition-opacity">
                <div className="text-sm font-medium text-gray-600">TCM Universities</div>
                <div className="text-xs text-gray-500">5 partner institutions</div>
              </div>
              <div className="opacity-70 hover:opacity-100 transition-opacity">
                <div className="text-sm font-medium text-gray-600">Clinical Trials</div>
                <div className="text-xs text-gray-500">500+ trials reviewed</div>
              </div>
              <div className="opacity-70 hover:opacity-100 transition-opacity">
                <div className="text-sm font-medium text-gray-600">Expert Reviews</div>
                <div className="text-xs text-gray-500">Monthly updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility - Enhanced */}
      <TrustIndicators />

      {/* Personalized Recommendations */}
      <PersonalizedRecommendations />

      {/* User Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600">Real stories from people who've transformed their herbal supplement journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-green-200 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4 text-white font-bold">
                  SM
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah M.</h4>
                  <p className="text-gray-600 text-sm">Wellness Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Finally found a reliable source for herbal information. The safety checker saved me from a potentially dangerous interaction!"
              </p>
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 text-white font-bold">
                  DL
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">David L.</h4>
                  <p className="text-gray-600 text-sm">Chronic Pain Sufferer</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "The symptom-based finder helped me discover turmeric and boswellia. My joint pain has improved significantly."
              </p>
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-purple-200 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4 text-white font-bold">
                  MJ
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Maria J.</h4>
                  <p className="text-gray-600 text-sm">Anxiety Management</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "The constitution quiz revealed I'm a 'heat' type. The cooling herbs recommended work perfectly for my anxiety."
              </p>
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & Lead Magnet Section */}
      <section className="py-20 bg-gradient-to-br from-green-700 via-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Your Free Herbal Guide
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Download our comprehensive "Traditional Chinese Medicine Body Constitution Guide" and weekly evidence-based herbal insights.
            </p>
            
            {/* Lead Magnet Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-green-100">
              <div className="flex items-center justify-center md:justify-start">
                <span className="mr-2">📊</span>
                <span>TCM Constitution Assessment</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <span className="mr-2">🌿</span>
                <span>Personalized Herb Recommendations</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <span className="mr-2">📚</span>
                <span>Weekly Research Updates</span>
              </div>
            </div>

            {/* Email Signup Form */}
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
                />
                <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg whitespace-nowrap">
                  Get Free Guide
                </button>
              </div>
              <p className="text-green-200 text-sm mt-3">
                No spam. Unsubscribe anytime. 📧 Join 15,000+ herb enthusiasts.
              </p>
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center justify-center space-x-6 text-green-200">
              <div className="flex items-center">
                <span className="mr-2">👥</span>
                <span className="text-sm">15,000+ subscribers</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">⭐</span>
                <span className="text-sm">4.9/5 rating</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📈</span>
                <span className="text-sm">98% find it helpful</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How HerbScience.shop Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Describe Your Needs</h3>
              <p className="text-gray-600">Tell us your symptoms, health goals, or current supplements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Analysis</h3>
              <p className="text-gray-600">Our AI analyzes your needs against our scientific database</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Recommendations</h3>
              <p className="text-gray-600">See personalized herb suggestions with safety information</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Make Informed Decisions</h3>
              <p className="text-gray-600">Choose supplements with confidence and proper guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are herbal supplements safe?</h3>
              <p className="text-gray-600">Herbal supplements can be safe when used appropriately, but they can also interact with medications and cause side effects. Our safety checker helps identify potential risks before you start taking any supplement.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I know if an herb will work for me?</h3>
              <p className="text-gray-600">Individual responses vary, but our evidence ratings show which herbs have strong scientific support. We also consider your body constitution to provide more personalized recommendations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use this information to replace medical treatment?</h3>
              <p className="text-gray-600">No. Our information is for educational purposes only and should not replace professional medical advice. Always consult with your healthcare provider before starting any new supplement regimen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make Informed Decisions About Herbal Supplements?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of users who trust HerbScience.shop for reliable herbal information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={addLocalePrefix("/herb-finder")} className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Herb Finder
            </Link>
            <Link href={addLocalePrefix("/ingredient-checker")} className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
              Check My Supplements
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">🌿 HerbScience.shop</h3>
              <p className="text-gray-400">
                Evidence-based herbal supplement information for informed health decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={addLocalePrefix("/herb-finder")} className="hover:text-white">Herb Finder</Link></li>
                <li><Link href={addLocalePrefix("/ingredient-checker")} className="hover:text-white">Safety Checker</Link></li>
                <li><Link href={addLocalePrefix("/knowledge-center")} className="hover:text-white">Knowledge Base</Link></li>
                <li><Link href={addLocalePrefix("/user-experiences")} className="hover:text-white">User Reviews</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={addLocalePrefix("/blog")} className="hover:text-white">Health Blog</Link></li>
                <li><Link href={addLocalePrefix("/constitution-test")} className="hover:text-white">Constitution Test</Link></li>
                <li><Link href={addLocalePrefix("/dosage-calculator")} className="hover:text-white">Dosage Calculator</Link></li>
                <li><Link href={addLocalePrefix("/articles")} className="hover:text-white">Research Articles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={addLocalePrefix("/about")} className="hover:text-white">About Us</Link></li>
                <li><Link href={addLocalePrefix("/about#contact")} className="hover:text-white">Contact Us</Link></li>
                <li><Link href={addLocalePrefix("/privacy")} className="hover:text-white">Privacy Policy</Link></li>
                <li><a href={addLocalePrefix("/knowledge-center#faq")} className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="mb-2">© 2025 HerbScience.shop - All Rights Reserved</p>
            <p className="text-sm">
              <strong>Disclaimer:</strong> This website provides educational information only and is not intended to diagnose, treat, cure, or prevent any disease. 
              Always consult with a qualified healthcare professional before starting any herbal supplement regimen.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
} 