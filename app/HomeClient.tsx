'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import { getTranslation } from '../lib/i18n'

const SmartSearch = dynamic(() => import('../components/SmartSearch'), {
  ssr: false,
  loading: () => <div className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
})

const TrustIndicators = dynamic(() => import('../components/TrustIndicators'), {
  ssr: false,
  loading: () => <div className="h-12 bg-gray-100 rounded animate-pulse" />
})

const PersonalizedRecommendations = dynamic(() => import('../components/PersonalizedRecommendations'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-3xl animate-pulse" />
})

export default function HomeClient() {
  // 获取翻译（在服务器端）
  const t = getTranslation('en')
  
  // 添加语言前缀的函数
  const addLocalePrefix = (href: string) => {
    return href // 英文首页不需要前缀
  }

  // CTA 按钮配置
  const ctaConfig = {
    primary: { text: '🎯 Start Your Herb Journey', emoji: '→' },
    secondary: { text: '🔍 Explore Herb Database', emoji: '→' }
  }

  // 价值主张
  const valueProps = {
    title: 'Your Herbal Companion',
    subtitle: 'Backed by Science'
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.herbscience.shop/' }
    ]
  }
  
  return (
    <main className="min-h-screen bg-white">
      {/* 英文首页动态 OG 图 */}
      <meta property="og:image" content="https://www.herbscience.shop/opengraph-image" />
      <meta name="twitter:image" content="https://www.herbscience.shop/opengraph-image" />
      {/* hreflang alternates */}
      <link rel="alternate" hrefLang="en" href="https://www.herbscience.shop/" />
      <link rel="alternate" hrefLang="zh" href="https://www.herbscience.shop/zh" />
      <link rel="alternate" hrefLang="x-default" href="https://www.herbscience.shop/" />
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Unified Header Component */}
      <Header />

      {/* Hero Section - Optimized for LCP */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-20 batch-render">
        {/* Simplified background for faster paint */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-4xl">🌿</div>
          <div className="absolute bottom-10 right-10 text-4xl">🌱</div>
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
                placeholder="Search herbs, symptoms, or get safety information..."
                onSearch={(query, filters) => {
                  // Handle search - could redirect to search results page
                  console.log('Search:', query, filters);
                }}
              />
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href={addLocalePrefix('/constitution-test')}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {ctaConfig.primary.text}
                <span className="ml-2 text-xl">{ctaConfig.primary.emoji}</span>
              </Link>
              
              <Link 
                href={addLocalePrefix('/herb-finder')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl border-2 border-green-200 hover:border-green-300 transform hover:scale-105 transition-all duration-200"
              >
                {ctaConfig.secondary.text}
                <span className="ml-2 text-xl">{ctaConfig.secondary.emoji}</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <TrustIndicators />
          </div>
        </div>
      </section>

      {/* Personalized Recommendations Section */}
      <PersonalizedRecommendations />
    </main>
  )
}
