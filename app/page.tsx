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

// 结构化数据 - 首页（SEO优化完整版）
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://herbscience.shop/#website',
  'name': 'HerbScience',
  'url': 'https://herbscience.shop',
  'description': 'Evidence-based herbal medicine platform with personalized recommendations based on Traditional Chinese Medicine constitution theory',
  'inLanguage': ['en', 'zh'],
  'potentialAction': {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': 'https://herbscience.shop/herb-finder?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  },
  'publisher': {
    '@id': 'https://herbscience.shop/#organization'
  }
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://herbscience.shop/#organization',
  'name': 'HerbScience',
  'alternateName': '草药科学',
  'url': 'https://herbscience.shop',
  'logo': {
    '@type': 'ImageObject',
    'url': 'https://herbscience.shop/logo.png',
    'width': 256,
    'height': 256
  },
  'description': 'Evidence-based herbal medicine platform combining Traditional Chinese Medicine with modern science. Led by licensed pharmacist Zeng Chuping, offering personalized herb recommendations through TCM constitution testing.',
  'foundingDate': '2024',
  'founder': {
    '@type': 'Person',
    'name': 'Zeng Chuping',
    'jobTitle': 'Licensed Pharmacist & TCM Expert',
    'url': 'https://herbscience.shop/about'
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'Customer Service',
    'email': 'expert@herbscience.shop',
    'availableLanguage': ['English', 'Chinese']
  },
  'areaServed': 'Worldwide',
  'sameAs': [
    'https://twitter.com/herbscience',
    'https://facebook.com/herbscience',
    'https://linkedin.com/company/herbscience'
  ],
  'knowsAbout': [
    'Herbal Medicine',
    'Traditional Chinese Medicine',
    'Pharmacology',
    'Herb-Drug Interactions',
    'Natural Health Products',
    'Evidence-Based Medicine'
  ]
}

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': 'https://herbscience.shop/#webpage',
  'url': 'https://herbscience.shop',
  'name': 'HerbScience - Evidence-Based Herbal Medicine & Personalized Herb Recommendations',
  'description': 'Discover safe, science-backed herbal remedies tailored to your body type. Take our free TCM constitution test for personalized herb recommendations.',
  'mainContentOfPage': {
    '@type': 'WebPageElement',
    'cssSelector': 'main'
  },
  'specialty': 'Herbal Medicine',
  'audience': {
    '@type': 'PeopleAudience',
    'audienceType': 'Health-conscious individuals seeking natural remedies'
  },
  'reviewedBy': {
    '@type': 'Person',
    'name': 'Zeng Chuping',
    'jobTitle': 'Licensed Pharmacist & TCM Expert'
  },
  'datePublished': '2024-01-01',
  'dateModified': new Date().toISOString()
}

export default function Home() {
  return (
    <>
      {/* 结构化数据 - SEO优化完整版 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      
      <HomeClient />
    </>
  )
}
