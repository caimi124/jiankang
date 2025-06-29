import React from 'react'
import type { Metadata } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import AccessibilityAnnouncer from '@/components/AccessibilityAnnouncer'
import GoogleAnalytics, { GoogleTagManagerNoScript } from '@/components/GoogleAnalytics'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import HeatmapAnalytics from '@/components/HeatmapAnalytics'
import FontManager from '@/components/FontManager'

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
  title: {
    template: '%s | HerbScience.shop',
    default: 'HerbScience.shop - Evidence-Based Herbal Medicine Guide | TCM & Natural Remedies'
  },
  description: 'Your trusted guide to herbal wellness. Discover safe and effective herbal remedies with our evidence-based platform combining Traditional Chinese Medicine wisdom with modern scientific research. Get personalized recommendations, safety checks, and expert guidance.',
  keywords: [
    'herbal medicine', 'traditional Chinese medicine', 'TCM', 'natural remedies', 'herb finder',
    'herbal supplements', 'plant medicine', 'alternative medicine', 'holistic health',
    'herbal safety', 'herb interactions', 'constitution test', 'medicinal herbs',
    'botanical medicine', 'natural health', 'evidence-based herbalism', 'herbal wellness',
    '草药', '中医', '传统中医', '中药', '草药补充剂', '天然疗法', '中医体质'
  ],
  authors: [{ name: 'HerbScience Team', url: 'https://herbscience.shop' }],
  creator: 'HerbScience.shop',
  publisher: 'HerbScience.shop',
  metadataBase: new URL('https://herbscience.shop'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'zh-CN': '/zh-CN',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://herbscience.shop',
    siteName: 'HerbScience.shop',
    title: 'HerbScience.shop - Evidence-Based Herbal Medicine Guide',
    description: 'Your trusted guide to herbal wellness. Discover safe and effective herbal remedies with evidence-based guidance combining TCM wisdom and modern research.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HerbScience.shop - Evidence-Based Herbal Medicine Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HerbScience.shop - Evidence-Based Herbal Medicine Guide',
    description: 'Discover safe and effective herbal remedies with evidence-based guidance.',
    images: ['/og-image.jpg'],
    creator: '@herbscience',
    site: '@herbscience',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansSC.variable}`} suppressHydrationWarning>
      <head>
        {/* 基础SEO元标签 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10B981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* 结构化数据 - 组织信息 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'HerbScience.shop',
              url: 'https://herbscience.shop',
              logo: 'https://herbscience.shop/logo.png',
              description: 'Evidence-based herbal medicine platform combining Traditional Chinese Medicine with modern scientific research.',
              foundingDate: '2024',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-555-HERBS',
                contactType: 'customer support',
                availableLanguage: ['English', 'Chinese'],
                areaServed: 'Worldwide'
              },
              sameAs: [
                'https://facebook.com/herbscience',
                'https://twitter.com/herbscience',
                'https://instagram.com/herbscience'
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Herbal Wellness Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Herbal Database Search',
                      description: 'Search and discover herbs by symptoms and health conditions'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Safety Checking',
                      description: 'Analyze herbal supplements for safety and interactions'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'TCM Constitution Test',
                      description: 'Determine your Traditional Chinese Medicine constitution type'
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* 结构化数据 - 网站信息 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'HerbScience.shop',
              url: 'https://herbscience.shop',
              description: 'Evidence-based herbal medicine platform with comprehensive herb database, safety checking, and personalized recommendations.',
              inLanguage: ['en', 'zh'],
              copyrightYear: 2024,
              copyrightHolder: {
                '@type': 'Organization',
                name: 'HerbScience.shop'
              },
              potentialAction: [
                {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: 'https://herbscience.shop/herb-finder?search={search_term_string}'
                  },
                  'query-input': 'required name=search_term_string'
                }
              ],
              mainEntity: {
                '@type': 'Dataset',
                name: 'Herbal Medicine Database',
                description: 'Comprehensive database of 500+ medicinal herbs with safety profiles and traditional usage information',
                creator: {
                  '@type': 'Organization',
                  name: 'HerbScience.shop'
                }
              }
            })
          }}
        />

        {/* 结构化数据 - 面包屑导航 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://herbscience.shop'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Herb Finder',
                  item: 'https://herbscience.shop/herb-finder'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Safety Checker',
                  item: 'https://herbscience.shop/ingredient-checker'
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Constitution Test',
                  item: 'https://herbscience.shop/constitution-test'
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Knowledge Center',
                  item: 'https://herbscience.shop/knowledge-center'
                }
              ]
            })
          }}
        />

        {/* Google Analytics */}
        <GoogleAnalytics />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900 font-feature-settings-default`}>
        {/* Google Tag Manager (noscript) */}
        <GoogleTagManagerNoScript />
        
        {/* 字体管理器 */}
        <FontManager />
        
        <AccessibilityAnnouncer />
        <PerformanceMonitor />
        <HeatmapAnalytics />
        <main>
          {children}
        </main>
        <div id="portal-root" /> {/* 用于模态框等弹出内容 */}
        
        {/* 页面底部的额外结构化数据 */}
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
                    text: 'HerbScience.shop is an evidence-based herbal medicine platform that combines Traditional Chinese Medicine wisdom with modern scientific research to provide safe, effective herbal guidance.'
                  }
                },
                {
                  '@type': 'Question', 
                  name: 'How do I find herbs for my health condition?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Use our Herb Finder tool to search by symptoms or conditions. Our database will suggest appropriate herbs based on traditional usage and scientific evidence.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Are herbal supplements safe?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'When used properly, many herbs are safe. Use our Safety Checker to analyze ingredients for interactions and contraindications. Always consult healthcare providers before starting new supplements.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What is a TCM constitution test?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our constitution test determines your Traditional Chinese Medicine body type through a scientifically-validated questionnaire, helping you find herbs that match your individual constitution.'
                  }
                }
              ]
            })
          }}
        />
      </body>
    </html>
  )
} 