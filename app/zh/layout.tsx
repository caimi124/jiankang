import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HerbScience.shop - 中草药补充剂专业指导',
  description: '专业的中草药补充剂指导网站，提供安全检查、个性化推荐和循证研究。',
  keywords: ['中草药', '补充剂', '安全检查', '体质测试', '个性化推荐'],
  openGraph: {
    title: 'HerbScience.shop - 中草药补充剂专业指导',
    description: '专业的中草药补充剂指导网站，提供安全检查、个性化推荐和循证研究。',
    url: 'https://herbscience.shop/zh',
    siteName: 'HerbScience.shop',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HerbScience.shop'
      }
    ],
    locale: 'zh_CN',
    type: 'website'
  }
}

export default function ZhRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" dir="ltr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 