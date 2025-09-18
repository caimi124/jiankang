'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getTranslation } from '../lib/i18n'

// 🚀 移动端极限优化：最小化初始JavaScript
// 仅在用户交互后加载Header
const Header = dynamic(() => 
  new Promise<any>((resolve) => {
    // 等待用户首次交互或5秒后加载
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

// 完全延迟PersonalizedRecommendations
const PersonalizedRecommendations = dynamic(
  () => 
    new Promise<any>((resolve) => {
      // 10秒后或用户滚动到底部时加载
      const loadComponent = () => resolve(import('../components/PersonalizedRecommendations'))
      
      const onScroll = () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 1000) {
          window.removeEventListener('scroll', onScroll)
          loadComponent()
        }
      }
      
      window.addEventListener('scroll', onScroll)
      setTimeout(() => {
        window.removeEventListener('scroll', onScroll)
        loadComponent()
      }, 10000)
    }),
  {
    ssr: false,
    loading: () => null
  }
)

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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://herbscience.shop/' }
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
      <section className="hero-section" aria-label="Main hero section">
        <h1 className="hero-title">
          Your Herbal Companion
          <span style={{color:'#059669',display:'block'}}>Backed by Science</span>
        </h1>
        
        <p className="hero-subtitle">
          Navigate herbal supplements with confidence. Get evidence-based recommendations, safety checks, and personalized guidance.
        </p>
        
        {/* 优化DOM结构 - 精简按钮容器 */}
        <div role="group" aria-label="Main actions" style={{display:'flex',flexDirection:'column',gap:'0.75rem',alignItems:'center'}}>
          <Link 
            href="/constitution-test"
            aria-label="Start your personalized herbal medicine journey with constitution test"
            role="button"
            style={{
              display:'inline-flex',
              alignItems:'center',
              justifyContent:'center',
              padding:'1rem 2rem',
              background:'#047857',
              color:'#ffffff',
              fontWeight:'600',
              borderRadius:'0.75rem',
              textDecoration:'none',
              fontSize:'1rem',
              minWidth:'200px',
              minHeight:'48px'
            }}
          >
            Start Journey
          </Link>
          
          <Link 
            href="/herb-finder"
            aria-label="Explore comprehensive herbal medicine database and search tool"
            role="button"
            style={{
              display:'inline-flex',
              alignItems:'center',
              justifyContent:'center',
              padding:'1rem 2rem',
              background:'#ffffff',
              color:'#047857',
              fontWeight:'600',
              borderRadius:'0.75rem',
              textDecoration:'none',
              border:'2px solid #047857',
              fontSize:'1rem',
              minWidth:'200px',
              minHeight:'48px'
            }}
          >
            Explore Database
          </Link>
        </div>
      </section>

        {/* Personalized Recommendations Section */}
        <PersonalizedRecommendations />
      </main>
    </>
  )
}
