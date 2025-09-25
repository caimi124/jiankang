import type { Metadata } from 'next'
import GoogleAnalytics, { GoogleTagManagerNoScript } from '../../components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'HerbScience.shop | 循证草药医学指南',
  description: '发现草药医学的力量，获得循证指南。获取个性化草药推荐、安全信息和专家见解，基于科学研究的传统医学智慧。',
  keywords: [
    '草药医学',
    '天然疗法',
    '健康草药',
    '中医传统',
    '草药补充剂',
    '植物医学',
    '替代医学',
    '自然疗法',
    '草药安全',
    '循证草药学'
  ],
  openGraph: {
    title: 'HerbScience.shop | 循证草药医学指南',
    description: '发现草药医学的力量，获得循证指南。获取个性化草药推荐、安全信息和专家见解。',
    type: 'website',
    url: 'https://herbscience.shop/zh',
    siteName: 'HerbScience.shop',
    images: [
      {
        url: 'https://herbscience.shop/zh/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'HerbScience.shop - 循证草药医学指南'
      }
    ],
    locale: 'zh_CN',
    alternateLocale: ['en_US']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HerbScience.shop | 循证草药医学指南',
    description: '发现草药医学的力量，获得循证指南。',
    images: ['https://herbscience.shop/zh/opengraph-image']
  },
  alternates: {
    canonical: 'https://herbscience.shop/zh',
    languages: {
      'en': 'https://herbscience.shop/',
      'zh': 'https://herbscience.shop/zh',
      'x-default': 'https://herbscience.shop/'
    }
  }
}

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Analytics 和 Google Tag Manager */}
        <GoogleAnalytics />
      </head>
      <body>
        {/* Google Tag Manager (noscript) - 必须放在body开始处 */}
        <GoogleTagManagerNoScript />
        {children}
      </body>
    </html>
  )
} 