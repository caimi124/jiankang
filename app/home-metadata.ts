import type { Metadata } from 'next'

export const homeMetadata: Metadata = {
  title: "HerbScience.shop | 循证草药指南 - 安全·专业·可信赖",
  description: "专业的草药补充剂指导平台。获取基于科学证据的草药推荐、安全检查、个性化建议。中医专家支持，500+草药数据库，10万+用户信赖。立即开始您的草药健康之旅！",
  keywords: [
    "草药", "中药", "自然疗法", "传统中医", "草药补充剂", "植物药物",
    "另类医学", "自然治疗", "草药安全", "循证草药学", "中医体质",
    "herbal medicine", "TCM", "natural remedies", "herbs", "supplement safety",
    "constitution test", "herb finder", "traditional medicine", "evidence-based"
  ],
  authors: [{ name: 'HerbScience Team' }],
  creator: 'HerbScience.shop',
  publisher: 'HerbScience.shop',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
    url: 'https://www.herbscience.shop',
    siteName: 'HerbScience.shop',
    title: 'HerbScience.shop | Evidence-Based Herbal Medicine Guide',
    description: 'Professional herbal supplement guidance platform. Get evidence-based herb recommendations, safety checks, and personalized advice from TCM experts.',
    images: [
      {
        url: '/hero-bg.svg',
        width: 1200,
        height: 630,
        alt: 'HerbScience.shop - Evidence-Based Herbal Medicine Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HerbScience.shop | Evidence-Based Herbal Medicine Guide',
    description: 'Professional herbal supplement guidance platform. Get evidence-based herb recommendations, safety checks, and personalized advice from TCM experts.',
    images: ['/hero-bg.svg'],
  },
  alternates: {
    canonical: 'https://www.herbscience.shop',
    languages: {
      'en': 'https://www.herbscience.shop',
      'zh': 'https://www.herbscience.shop/zh',
      'x-default': 'https://www.herbscience.shop',
    },
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

export const zhHomeMetadata: Metadata = {
  title: "HerbScience.shop | 循证草药指南 - 中医智慧现代应用",
  description: "权威的中医草药平台，提供科学验证的草药指导。中医体质测试、草药安全检查、个性化调理方案。500+草药数据库，专业中医师团队，10万+用户信赖的草药健康伴侣。",
  keywords: [
    "草药", "中药", "中医", "传统中医", "草药补充剂", "中药材",
    "中医体质", "中医体质测试", "草药安全", "中医调理", "天然疗法",
    "植物药学", "中药现代化", "循证中医", "个性化调理", "中医养生",
    "草药数据库", "中药相互作用", "草药剂量", "中医诊断"
  ],
  authors: [{ name: '草药科学团队' }],
  creator: 'HerbScience.shop',
  publisher: 'HerbScience.shop',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    url: 'https://www.herbscience.shop/zh',
    siteName: 'HerbScience.shop',
    title: 'HerbScience.shop | 循证草药指南 - 中医智慧现代应用',
    description: '权威的中医草药平台，提供科学验证的草药指导。中医体质测试、草药安全检查、个性化调理方案。',
    images: [
      {
        url: '/hero-bg.svg',
        width: 1200,
        height: 630,
        alt: 'HerbScience.shop - 循证草药医学平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HerbScience.shop | 循证草药指南 - 中医智慧现代应用',
    description: '权威的中医草药平台，提供科学验证的草药指导。中医体质测试、草药安全检查、个性化调理方案。',
    images: ['/hero-bg.svg'],
  },
  alternates: {
    canonical: 'https://www.herbscience.shop/zh',
    languages: {
      'en': 'https://www.herbscience.shop',
      'zh': 'https://www.herbscience.shop/zh',
      'x-default': 'https://www.herbscience.shop',
    },
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