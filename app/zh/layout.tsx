import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import GoogleAnalytics, { GoogleTagManagerNoScript } from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://herbscience.shop'),
  title: {
    default: 'HerbScience.shop | 基于科学证据的草药医学指南',
    template: '%s | HerbScience.shop'
  },
  description: '探索草药医学的力量，获取基于科学证据的个性化草药建议、安全信息和专家见解。传统中医与现代科学的完美结合。',
  keywords: [
    '草药医学',
    '中草药',
    '天然疗法',
    '传统中医',
    '草药养生',
    '中药材',
    '植物药',
    '天然治疗',
    '草药安全',
    '循证草药学'
  ],
  authors: [{ name: 'HerbScience团队' }],
  creator: 'HerbScience.shop',
  publisher: 'HerbScience.shop',
  // 不在区域布局设置 canonical/hreflang，避免与页面级设置冲突，交给各页面或 sitemap 处理
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    url: 'https://herbscience.shop/zh',
    siteName: 'HerbScience.shop',
    title: 'HerbScience.shop | 基于科学证据的草药医学指南',
    description: '探索草药医学的力量，获取基于科学证据的个性化草药建议、安全信息和专家见解。传统中医与现代科学的完美结合。',
    images: [
      {
        url: '/hero-bg.svg',
        width: 1200,
        height: 630,
        alt: 'HerbScience.shop - 基于科学证据的草药医学',
      },
    ],
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
}

export default function ZhRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" dir="ltr">
      <head>
        {/* Google Analytics and Tag Manager */}
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <GoogleTagManagerNoScript />
        
        {children}
      </body>
    </html>
  )
} 