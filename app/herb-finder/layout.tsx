import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '草药搜索器 - 找到最适合您的草药 | HerbScience',
  description: '专业的草药搜索工具，根据体质、功效、安全性等条件，帮您找到最适合的草药。支持中英文搜索，提供详细的功效说明和用法指导。',
  keywords: '草药搜索, 中药搜索, 体质匹配, 草药功效, 中药功效, 草药用法, 中药用法, 草药安全, 中药安全',
  openGraph: {
    title: '草药搜索器 - 找到最适合您的草药',
    description: '专业的草药搜索工具，根据体质、功效、安全性等条件，帮您找到最适合的草药。',
    type: 'website',
    url: 'https://herbscience.shop/herb-finder',
    images: [
      {
        url: '/images/herb-finder-og.jpg',
        width: 1200,
        height: 630,
        alt: '草药搜索器'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '草药搜索器 - 找到最适合您的草药',
    description: '专业的草药搜索工具，根据体质、功效、安全性等条件，帮您找到最适合的草药。',
    images: ['/images/herb-finder-og.jpg']
  },
  alternates: {
    canonical: 'https://herbscience.shop/herb-finder'
  }
}

export default function HerbFinderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="herb-finder-layout">
      {children}
    </div>
  )
}
