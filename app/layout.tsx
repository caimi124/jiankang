import React from 'react'
import type { Metadata } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import AccessibilityAnnouncer from '@/components/AccessibilityAnnouncer'
import GoogleAnalytics, { GoogleTagManagerNoScript } from '@/components/GoogleAnalytics'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import HeatmapAnalytics from '@/components/HeatmapAnalytics'

// 优化字体配置 - Inter for Latin text
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // 优化字体加载性能
  preload: true,
  fallback: ['system-ui', 'arial'], // 添加系统字体回退
  variable: '--font-inter'
})

// 中文字体配置 - Noto Sans SC for Chinese text
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: false, // 按需加载中文字体
  fallback: ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
  variable: '--font-noto-sans-sc'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.herbscience.shop'),
  title: {
    default: 'HerbScience.shop | Evidence-Based Herbal Medicine Guide',
    template: '%s | HerbScience.shop'
  },
  description: 'Discover the power of herbal medicine with our evidence-based guide. Get personalized herb recommendations, safety information, and expert insights backed by scientific research.',
  keywords: [
    'herbal medicine',
    'natural remedies',
    'herbs for health',
    'traditional chinese medicine',
    'herbal supplements',
    'plant medicine',
    'alternative medicine',
    'natural healing',
    'herb safety',
    'evidence-based herbalism'
  ],
  authors: [{ name: 'HerbScience Team' }],
  creator: 'HerbScience.shop',
  publisher: 'HerbScience.shop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.herbscience.shop',
    languages: {
      'en': 'https://www.herbscience.shop',
      'zh': 'https://www.herbscience.shop/zh',
      'x-default': 'https://www.herbscience.shop',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
    url: 'https://www.herbscience.shop',
    siteName: 'HerbScience.shop',
    title: 'HerbScience.shop | Evidence-Based Herbal Medicine Guide',
    description: 'Discover the power of herbal medicine with our evidence-based guide. Get personalized herb recommendations, safety information, and expert insights backed by scientific research.',
    images: [
      {
        url: '/hero-bg.svg',
        width: 1200,
        height: 630,
        alt: 'HerbScience.shop - Evidence-Based Herbal Medicine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HerbScience.shop | Evidence-Based Herbal Medicine Guide',
    description: 'Discover the power of herbal medicine with our evidence-based guide. Get personalized herb recommendations, safety information, and expert insights backed by scientific research.',
    images: ['/hero-bg.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Google Search Console验证
  // 请在Google Search Console中获取验证代码后取消注释
  // verification: {
  //   google: 'your-actual-verification-code',
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansSC.variable}`}>
      <head>
        {/* 字体通过Google Fonts加载，无需预加载本地字体 */}
        
        {/* DNS 预解析优化 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* 预连接重要资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* 添加 JSON-LD 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "HerbScience.shop",
              "description": "Evidence-based herbal supplement guidance with TCM insights and safety analysis",
              "url": "https://herbscience.shop",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://herbscience.shop/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "HerbScience.shop",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://herbscience.shop/logo.png"
                }
              }
            })
          }}
        />
        
        {/* 医疗相关结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Herbal Supplement Safety and Information",
              "description": "Professional guidance on herbal supplements, traditional Chinese medicine, and natural health",
              "medicalAudience": {
                "@type": "MedicalAudience",
                "audienceType": "General Public"
              },
              "about": {
                "@type": "Thing",
                "name": "Herbal Medicine and Traditional Chinese Medicine"
              }
            })
          }}
        />
        
        {/* 关键资源预加载 */}
        <link rel="preload" href="/hero-bg.svg" as="image" type="image/svg+xml" />
        <script defer src="/js/search.js"></script>
        
        {/* 添加 theme-color for PWA */}
        <meta name="theme-color" content="#16a34a" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* 改进的视窗配置 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        
        {/* Google Analytics and Tag Manager */}
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900 font-feature-settings-default`}>
        {/* Google Tag Manager (noscript) */}
        <GoogleTagManagerNoScript />
        
        <AccessibilityAnnouncer />
        <PerformanceMonitor />
        <HeatmapAnalytics />
        <main>
          {children}
        </main>
        <div id="portal-root" /> {/* 用于模态框等弹出内容 */}
      </body>
    </html>
  )
} 