import { Metadata } from 'next'
import RhodiolaClient from './RhodiolaClient'

// SEO优化 - 基于KGR数据
export const metadata: Metadata = {
  title: 'Rhodiola Crenulata Benefits & Side Effects (2025 Guide) | Arctic Root for Energy & Stress',
  description: 'Discover Rhodiola crenulata benefits for energy, stress relief, and weight loss. Learn proper dosage, side effects, and which body type should use this adaptogen. Based on TCM constitution matching.',
  keywords: [
    // 超低KGR关键词（<0.25）
    'rhodiola crenulata benefits',
    'rhodiola extract benefits',
    'rhodiola root benefits',
    'rhodiola supplement benefits',
    'rhodiola herb benefits',
    'rhodiola benefits',
    'rhodiola rosea benefits',
    'rhodiola side effects',
    'rhodiola rosea side effects',
    'rhodiola extract side effects',
    'rhodiola weight loss',
    'rhodiola rosea weight loss',
    'rhodiola fat loss',
    // 中等KGR但高搜索量
    'rhodiola supplement',
    'best rhodiola supplement',
    'rhodiola dosage',
    'how to take rhodiola',
    'rhodiola for stress and anxiety',
    'rhodiola for fatigue',
    'adaptogen herbs',
    'arctic root supplement'
  ],
  openGraph: {
    title: 'Rhodiola Crenulata: Complete Benefits & Usage Guide (2025)',
    description: 'Science-backed guide to Rhodiola crenulata - benefits, dosage, side effects, and TCM constitution matching. Find if this adaptogen is right for YOU.',
    type: 'article',
    images: [{
      url: '/images/herbs/rhodiola-crenulata-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Rhodiola crenulata (Golden Root) - Natural adaptogen for energy and stress'
    }]
  },
  alternates: {
    canonical: 'https://herbscience.shop/herbs/rhodiola-crenulata'
  },
  robots: {
    index: true,
    follow: true
  }
}

// 结构化数据 - 增强搜索结果显示
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Rhodiola Crenulata Benefits, Dosage & Side Effects Guide',
  description: 'Complete guide to Rhodiola crenulata (Arctic Root) - benefits for energy, stress, weight loss, proper dosage, side effects, and TCM constitution matching.',
  image: 'https://herbscience.shop/images/herbs/rhodiola-crenulata.jpg',
  author: {
    '@type': 'Organization',
    name: 'HerbScience'
  },
  publisher: {
    '@type': 'Organization',
    name: 'HerbScience',
    logo: {
      '@type': 'ImageObject',
      url: 'https://herbscience.shop/logo.png'
    }
  },
  datePublished: '2025-01-21',
  dateModified: '2025-01-21',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://herbscience.shop/herbs/rhodiola-crenulata'
  }
}

// FAQ结构化数据 - 增强搜索结果
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take for Rhodiola to work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most users notice effects within 7-14 days, especially in focus and energy. For long-term stress relief, use consistently for 4-6 weeks.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I take Rhodiola every day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Rhodiola is safe for daily use when cycled (6-8 weeks on, 1 week off) to maintain effectiveness.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does Rhodiola help with weight loss?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rhodiola may support metabolism and stress balance, which can be helpful for emotional or fatigue-related weight gain.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the best time to take Rhodiola?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Morning is best as Rhodiola can mildly stimulate. Avoid late-night doses. Take with breakfast or post-workout snacks with healthy fats for better absorption.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are Rhodiola side effects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rhodiola is generally safe. Some may experience mild restlessness, dry mouth, or irritability if dose is too high. Avoid if you have heat-type constitution, are pregnant, or taking antidepressants.'
      }
    }
  ]
}

export default function RhodiolaPage() {
  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      
      <RhodiolaClient />
    </>
  )
}

