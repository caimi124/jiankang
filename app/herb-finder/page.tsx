import { Metadata } from 'next'
import HerbFinderClient from './HerbFinderClient'

export const metadata: Metadata = {
  title: "智能草药查找器 | 症状匹配推荐 - HerbScience.shop",
  description: "根据症状智能匹配草药。500+草药数据库，专业安全检查，传统用法与现代研究相结合。找到最适合您的天然解决方案，获得个性化草药建议。",
  keywords: [
    "草药查找", "症状匹配", "草药推荐", "天然疗法", "草药数据库",
    "中医草药", "植物药物", "草药搜索", "症状治疗", "个性化草药",
    "herb finder", "symptom matcher", "herbal remedies", "natural medicine", "TCM herbs"
  ],
  authors: [{ name: 'HerbScience Team' }],
  openGraph: {
    title: "智能草药查找器 | 症状匹配推荐 - HerbScience.shop",
    description: "根据症状智能匹配草药。500+草药数据库，专业安全检查，传统用法与现代研究相结合。",
    type: 'website',
    url: 'https://www.herbscience.shop/herb-finder',
    siteName: 'HerbScience.shop',
    images: [
      {
        url: '/hero-bg.svg',
        width: 1200,
        height: 630,
        alt: 'HerbScience草药查找器 - 症状匹配推荐'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "智能草药查找器 | 症状匹配推荐 - HerbScience.shop",
    description: "根据症状智能匹配草药。500+草药数据库，专业安全检查，传统用法与现代研究相结合。",
    images: ['/hero-bg.svg']
  },
  alternates: {
    canonical: 'https://www.herbscience.shop/herb-finder',
    languages: {
      'en': 'https://www.herbscience.shop/herb-finder',
      'zh': 'https://www.herbscience.shop/zh/herb-finder',
    },
  },
}

export default function HerbFinderPage() {
  return <HerbFinderClient />
} 