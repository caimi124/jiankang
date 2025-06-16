import React from 'react'
import type { Metadata } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import './globals.css'

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
    default: 'HerbScience.shop - Evidence-Based Herbal Supplement Guidance',
    template: '%s | HerbScience.shop'
  },
  description: 'Discover safe and effective herbal supplements with science-backed insights, TCM guidance, and personalized recommendations. Check herb safety, find remedies by symptoms, and make informed decisions.',
  keywords: [
    'herbal supplements',
    'traditional chinese medicine',
    'TCM',
    'herb safety checker',
    'natural remedies',
    'evidence-based herbs',
    'supplement interactions',
    'herbal medicine',
    'wellness',
    'natural health'
  ],
  authors: [{ name: 'HerbScience Team' }],
  creator: 'HerbScience.shop',
  publisher: 'HerbScience.shop',
  metadataBase: new URL('https://herbscience.shop'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'zh-CN': '/zh'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://herbscience.shop',
    title: 'HerbScience.shop - Evidence-Based Herbal Supplement Guidance',
    description: 'Discover safe and effective herbal supplements with science-backed insights and personalized TCM recommendations.',
    siteName: 'HerbScience.shop',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HerbScience.shop - Herbal Supplement Guidance'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HerbScience.shop - Evidence-Based Herbal Guidance',
    description: 'Safe, effective herbal supplements with TCM insights',
    images: ['/twitter-image.jpg']
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansSC.variable}`}>
      <head>
        {/* 预加载关键字体 */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        
        {/* DNS 预解析优化 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* 预连接重要资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* 添加 theme-color for PWA */}
        <meta name="theme-color" content="#16a34a" />
        <meta name="color-scheme" content="light" />
        
        {/* 优化视窗配置 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900 font-feature-settings-default`}>
        {children}
      </body>
    </html>
  )
} 