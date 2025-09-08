'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getTranslation } from '../lib/i18n'

// 🚀 极限性能优化：超激进懒加载
const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
  loading: () => (
    <div style={{height:'80px',background:'#fff',borderBottom:'1px solid #e5e7eb'}} />
  )
})

// 延迟5秒加载非关键组件
const PersonalizedRecommendations = dynamic(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('../components/PersonalizedRecommendations'))
    }, 5000)
  }), {
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
    <>
      {/* Skip link for accessibility */}
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
        {/* 移动端优化：延迟加载头部 */}
        <Header />

      {/* Hero Section - 移动端极简化 */}
      <section className="hero-section">
        <h1 className="hero-title">
          Your Herbal Companion
          <span style={{color:'#059669',display:'block'}}>Backed by Science</span>
        </h1>
        
        <p className="hero-subtitle">
          Navigate herbal supplements with confidence. Get evidence-based recommendations, safety checks, and personalized guidance.
        </p>
        
        {/* 极简化按钮 */}
        <div style={{display:'flex',flexDirection:'column',gap:'0.75rem',alignItems:'center'}}>
          <Link 
            href="/constitution-test"
            aria-label="Start herb journey"
            style={{
              display:'block',
              padding:'0.875rem 1.75rem',
              background:'#059669',
              color:'white',
              fontWeight:'600',
              borderRadius:'0.75rem',
              textDecoration:'none',
              fontSize:'1rem'
            }}
          >
            🎯 Start Journey
          </Link>
          
          <Link 
            href="/herb-finder"
            aria-label="Explore herb database"
            style={{
              display:'block',
              padding:'0.875rem 1.75rem',
              background:'white',
              color:'#059669',
              fontWeight:'600',
              borderRadius:'0.75rem',
              textDecoration:'none',
              border:'2px solid #059669',
              fontSize:'1rem'
            }}
          >
            🔍 Explore Database
          </Link>
        </div>
      </section>

        {/* Personalized Recommendations Section */}
        <PersonalizedRecommendations />
      </main>
    </>)
  )
}
