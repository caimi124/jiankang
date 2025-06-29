'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '../components/Header'
import SmartSearch from '../components/SmartSearch'
import TrustIndicators from '../components/TrustIndicators'
import PersonalizedRecommendations from '../components/PersonalizedRecommendations'
import { getTranslation } from '../lib/i18n'
import { useABTest } from '../lib/ab-testing'
import Head from 'next/head'

export default function Home() {
  const pathname = usePathname()
  const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en'
  const t = getTranslation(currentLocale)
  
  // A/B 测试 Hook
  const { variant: ctaVariant, trackConversion } = useABTest('hero-cta-buttons')
  const { variant: valuePropositionVariant } = useABTest('value-proposition')
  
  // 添加语言前缀的函数
  const addLocalePrefix = (href: string) => {
    if (currentLocale === 'zh') {
      return `/zh${href}`
    }
    return href
  }

  // CTA 按钮配置根据A/B测试变体
  const getCtaConfig = () => {
    switch (ctaVariant) {
      case 'variant-a':
        return {
          primary: { text: '🎯 Discover Your Perfect Herbs', emoji: '→' },
          secondary: { text: '🔍 Search Our Database', emoji: '→' }
        }
      case 'variant-b':
        return {
          primary: { text: '⚡ Get Instant Herb Guidance', emoji: '💫' },
          secondary: { text: '🛡️ Check Safety First', emoji: '→' }
        }
      default:
        return {
          primary: { text: '🎯 Start Your Herb Journey', emoji: '→' },
          secondary: { text: '🔍 Explore Herb Database', emoji: '→' }
        }
    }
  }

  // 价值主张根据A/B测试变体
  const getValueProposition = () => {
    switch (valuePropositionVariant) {
      case 'variant-a':
        return {
          title: 'Your Safe Path to Herbal Wellness',
          subtitle: 'Safety-First Approach to Traditional Medicine'
        }
      default:
        return {
          title: 'Your Herbal Companion',
          subtitle: 'Backed by Science'
        }
    }
  }

  const ctaConfig = getCtaConfig()
  const valueProps = getValueProposition()
  
  return (
    <>
      {/* SEO结构化数据 */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'HerbScience.shop',
              url: 'https://herbscience.shop',
              logo: 'https://herbscience.shop/logo.png',
              description: 'Your trusted guide to herbal wellness - Evidence-based herb recommendations, safety checking, and personalized guidance backed by Traditional Chinese Medicine and modern research.',
              foundingDate: '2024',
              sameAs: [
                'https://twitter.com/herbscience',
                'https://facebook.com/herbscience'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-555-HERBS',
                contactType: 'customer support',
                availableLanguage: ['English', 'Chinese']
              },
              areaServed: 'Worldwide',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Herbal Wellness Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Herbal Consultation',
                      description: 'Personalized herb recommendations based on Traditional Chinese Medicine'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Safety Checking',
                      description: 'Comprehensive herb and supplement safety analysis'
                    }
                  }
                ]
              }
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Website',
              name: 'HerbScience.shop - Your Guide to Herbal Wellness',
              url: 'https://herbscience.shop',
              description: 'Discover safe and effective herbal remedies with our evidence-based platform. Get personalized recommendations, safety checks, and expert guidance for your wellness journey.',
              inLanguage: ['en', 'zh-CN'],
              author: {
                '@type': 'Organization',
                name: 'HerbScience Team'
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://herbscience.shop/herb-finder?search={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is HerbScience.shop?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'HerbScience.shop is a comprehensive platform that helps you discover safe and effective herbal remedies. We combine Traditional Chinese Medicine wisdom with modern scientific research to provide personalized herb recommendations, safety checking, and expert guidance.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How do I find the right herbs for my symptoms?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Use our intelligent Herb Finder tool. Simply enter your symptoms or health concerns, and our database will suggest appropriate herbs based on traditional use patterns and scientific evidence. You can also take our TCM Constitution Test for personalized recommendations.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Is it safe to use herbal supplements?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'When used properly, many herbs are safe and beneficial. Our Safety Checker analyzes ingredients for potential interactions and contraindications. Always consult healthcare providers before starting new supplements, especially if you have medical conditions or take medications.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What makes your recommendations trustworthy?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our recommendations are based on peer-reviewed research, traditional usage patterns, and safety data. We maintain a database of 500+ herbs with detailed safety profiles, efficacy studies, and interaction warnings reviewed by TCM practitioners and researchers.'
                  }
                }
              ]
            })
          }}
        />
      </Head>

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
                {valueProps.title}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 block">
                  {valueProps.subtitle}
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
                    // Redirect to herb finder with search query
                    const searchParams = new URLSearchParams();
                    if (query) searchParams.set('search', query);
                    if (filters.category) searchParams.set('category', filters.category);
                    
                    const targetUrl = addLocalePrefix(`/herb-finder?${searchParams.toString()}`);
                    window.location.href = targetUrl;
                  }}
                />
              </div>

              {/* Enhanced Action Buttons with A/B Testing */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href={addLocalePrefix("/constitution-test")} 
                  className="group bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={() => trackConversion('hero_primary_cta')}
                >
                  <span className="flex items-center justify-center">
                    {ctaConfig.primary.text}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">{ctaConfig.primary.emoji}</span>
                  </span>
                </Link>
                <Link 
                  href={addLocalePrefix("/herb-finder")} 
                  className="group border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={() => trackConversion('hero_secondary_cta')}
                >
                  <span className="flex items-center justify-center">
                    {ctaConfig.secondary.text}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">{ctaConfig.secondary.emoji}</span>
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

        {/* Welcome Section - 新增丰富内容 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Welcome to HerbScience – Your Guide to Herbal Wellness
              </h2>
              <div className="prose prose-lg mx-auto text-gray-600">
                <p className="text-lg leading-relaxed mb-6">
                  Discover the power of traditional herbal medicine backed by modern science. HerbScience.shop combines thousands of years of Traditional Chinese Medicine (TCM) wisdom with contemporary research to help you make informed decisions about herbal supplements and natural remedies.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Whether you're seeking natural solutions for stress, sleep, digestion, or overall wellness, our comprehensive database of 500+ herbs provides evidence-based guidance you can trust. From safety checking to personalized constitution analysis, we're here to support your journey toward optimal health.
                </p>
                <p className="text-lg leading-relaxed">
                  Join over 50,000 users who rely on HerbScience for safe, effective herbal guidance. Start exploring today and discover how traditional wisdom meets modern science.
                </p>
              </div>
            </div>

            {/* Why Choose HerbScience */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Evidence-Based</h3>
                <p className="text-gray-600">Every recommendation is backed by peer-reviewed research and traditional usage patterns from TCM practitioners.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety First</h3>
                <p className="text-gray-600">Comprehensive safety analysis including drug interactions, contraindications, and dosage guidelines.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized</h3>
                <p className="text-gray-600">Tailored recommendations based on your TCM constitution, symptoms, and individual health profile.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Functions */}
        <section className="py-20 bg-gray-50">
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
              <Link href={addLocalePrefix("/herb-finder")} className="group herb-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
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

              <Link href={addLocalePrefix("/ingredient-checker")} className="group herb-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
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

              <Link href={addLocalePrefix("/constitution-test")} className="group herb-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all">
                  <span className="text-2xl">🧬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">Constitution Test</h3>
                <p className="text-gray-600 leading-relaxed">Discover your TCM body type through our scientifically-validated questionnaire for personalized recommendations.</p>
                <div className="mt-4 flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Take test</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>

              <Link href={addLocalePrefix("/knowledge-center")} className="group herb-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors">Knowledge Center</h3>
                <p className="text-gray-600 leading-relaxed">Expert-reviewed articles, guides, and tips about herbal medicine, constitution types, and healthy living.</p>
                <div className="mt-4 flex items-center text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Articles & Success Stories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Latest Articles */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest from Our Knowledge Center</h2>
                <div className="space-y-4">
                  <Link href={addLocalePrefix("/articles/ashwagandha-complete-guide")} className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">Complete Guide to Ashwagandha Benefits</h3>
                    <p className="text-gray-600 text-sm">Discover how this adaptogenic herb can help manage stress, improve sleep, and boost energy naturally.</p>
                  </Link>
                  <Link href={addLocalePrefix("/articles/natural-anxiety-relief-herbs")} className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">Natural Herbs for Anxiety Relief</h3>
                    <p className="text-gray-600 text-sm">Evidence-based natural alternatives for managing anxiety and promoting mental wellness.</p>
                  </Link>
                  <Link href={addLocalePrefix("/articles/beginners-herbal-supplement-guide")} className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">Beginner's Guide to Herbal Supplements</h3>
                    <p className="text-gray-600 text-sm">Essential tips for choosing, using, and understanding herbal supplements safely.</p>
                  </Link>
                </div>
              </div>

              {/* User Testimonials */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-gray-700 mb-2">"The constitution test helped me understand my body type and find herbs that actually work for me. Sleep quality improved significantly!"</p>
                    <p className="text-sm text-gray-500">- Sarah M., Wellness Enthusiast</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-gray-700 mb-2">"Safety checker saved me from a potentially dangerous interaction between my herbs and prescription medication."</p>
                    <p className="text-sm text-gray-500">- Dr. James L., Healthcare Provider</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <p className="text-gray-700 mb-2">"Finally found natural solutions for my digestive issues. The personalized recommendations were spot-on!"</p>
                    <p className="text-sm text-gray-500">- Maria C., Traditional Medicine Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is HerbScience.shop?</h3>
                <p className="text-gray-600 leading-relaxed">
                  HerbScience.shop is a comprehensive platform that helps you discover safe and effective herbal remedies. We combine Traditional Chinese Medicine wisdom with modern scientific research to provide personalized herb recommendations, safety checking, and expert guidance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I find the right herbs for my symptoms?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Use our intelligent Herb Finder tool. Simply enter your symptoms or health concerns, and our database will suggest appropriate herbs based on traditional use patterns and scientific evidence. You can also take our TCM Constitution Test for personalized recommendations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Is it safe to use herbal supplements?</h3>
                <p className="text-gray-600 leading-relaxed">
                  When used properly, many herbs are safe and beneficial. Our Safety Checker analyzes ingredients for potential interactions and contraindications. Always consult healthcare providers before starting new supplements, especially if you have medical conditions or take medications.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What makes your recommendations trustworthy?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our recommendations are based on peer-reviewed research, traditional usage patterns, and safety data. We maintain a database of 500+ herbs with detailed safety profiles, efficacy studies, and interaction warnings reviewed by TCM practitioners and researchers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Herbal Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust HerbScience for safe, effective herbal guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={addLocalePrefix("/constitution-test")} 
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Take Constitution Test
              </Link>
              <Link 
                href={addLocalePrefix("/herb-finder")} 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Explore Herb Database
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Indicators and Personalized Recommendations remain the same */}
        <TrustIndicators />
        <PersonalizedRecommendations />
      </main>
    </>
  )
} 