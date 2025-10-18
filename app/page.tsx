import React from 'react'
import { Metadata } from 'next'
import HomeClient from './HomeClient'

// SEO优化的元数据 - 首页
export const metadata: Metadata = {
  title: 'HerbScience - Evidence-Based Herbal Medicine & Personalized Herb Recommendations',
  description: 'Discover safe, science-backed herbal remedies tailored to your body type. Take our free TCM constitution test for personalized herb recommendations. Expert guidance on immune boosting herbs, stress relief herbs, and sleep support herbs.',
  keywords: [
    'herbal medicine',
    'personalized herbal recommendations',
    'TCM constitution test',
    'body type quiz',
    'immune boosting herbs',
    'stress relief herbs',
    'sleep support herbs',
    'natural supplements',
    'evidence-based herbs',
    'herbal remedies',
    'safe herbal guidance',
    'herb finder'
  ],
  openGraph: {
    title: 'HerbScience - Find Herbs That Actually Work for Your Body',
    description: 'Free TCM constitution test + personalized herbal recommendations. Science-backed, safe, and tailored to your unique body type.',
    type: 'website',
    url: 'https://herbscience.shop',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'HerbScience - Personalized Herbal Medicine Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HerbScience - Personalized Herbal Medicine',
    description: 'Free TCM constitution test + science-backed herb recommendations',
    images: ['/images/og-home.jpg']
  },
  alternates: {
    canonical: 'https://herbscience.shop',
    languages: {
      'en': 'https://herbscience.shop',
      'zh': 'https://herbscience.shop/zh'
    }
  },
  verification: {
    google: 'your-google-verification-code' // 替换为实际的Google验证码
  }
}

// 结构化数据 - 首页
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://herbscience.shop/#website',
  'name': 'HerbScience',
  'url': 'https://herbscience.shop',
  'description': 'Evidence-based herbal medicine platform with personalized recommendations',
  'inLanguage': 'en',
  'potentialAction': {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': 'https://herbscience.shop/herb-finder?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  },
  'publisher': {
    '@type': 'Organization',
    '@id': 'https://herbscience.shop/#organization',
    'name': 'HerbScience',
    'url': 'https://herbscience.shop',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://herbscience.shop/logo.png',
      'width': 256,
      'height': 256
    },
    'sameAs': [
      'https://twitter.com/herbscience',
      'https://facebook.com/herbscience'
    ]
  }
}

export default function Home() {
  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <HomeClient />
    </>
  )
}
