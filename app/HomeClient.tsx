'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import { getTranslation } from '../lib/i18n'

// 延迟加载所有非关键组件
const PersonalizedRecommendations = dynamic(() => import('../components/PersonalizedRecommendations'), {
  ssr: false,
  loading: () => null
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

      {/* Hero Section - Ultra-optimized for LCP */}
      <section className="hero-section">
        <div>
          <h1 className="hero-title">
            Your Herbal Companion
            <span style={{color:'#059669',display:'block'}}>Backed by Science</span>
          </h1>
          
          <p className="hero-subtitle">
            Navigate herbal supplements with confidence. Get evidence-based recommendations, safety checks, and personalized guidance from traditional medicine experts.
          </p>
          
          {/* Simplified Action Buttons */}
          <div style={{display:'flex',flexDirection:'column',gap:'1rem',alignItems:'center',marginBottom:'2rem'}}>
            <Link 
              href="/constitution-test"
              aria-label="Start your personalized herb journey with constitution test"
              role="button"
              style={{
                display:'inline-flex',
                alignItems:'center',
                justifyContent:'center',
                padding:'1rem 2rem',
                background:'linear-gradient(135deg,#059669,#047857)',
                color:'white',
                fontWeight:'600',
                borderRadius:'1rem',
                textDecoration:'none',
                boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)',
                transition:'all 0.2s ease-in-out'
              }}
              onFocus={(e) => e.currentTarget.style.outline = '2px solid #10b981'}
              onBlur={(e) => e.currentTarget.style.outline = 'none'}
            >
              🎯 Start Your Herb Journey →
            </Link>
            
            <Link 
              href="/herb-finder"
              aria-label="Explore comprehensive herb database and finder tool"
              role="button"
              style={{
                display:'inline-flex',
                alignItems:'center',
                justifyContent:'center',
                padding:'1rem 2rem',
                background:'white',
                color:'#047857',
                fontWeight:'600',
                borderRadius:'1rem',
                textDecoration:'none',
                boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)',
                border:'2px solid #d1fae5',
                transition:'all 0.2s ease-in-out'
              }}
              onFocus={(e) => e.currentTarget.style.outline = '2px solid #10b981'}
              onBlur={(e) => e.currentTarget.style.outline = 'none'}
            >
              🔍 Explore Herb Database →
            </Link>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations Section */}
      <PersonalizedRecommendations />
    </main>
  )
}
