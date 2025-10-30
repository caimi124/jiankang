import { Metadata } from 'next'
import Header from '@/components/Header'
import TurmericClient from './TurmericClient'

// SEO优化的元数据 - 基于KGR关键词研究优化
export const metadata: Metadata = {
  title: 'Turmeric Benefits, Dosage & Side Effects Guide',
  description: 'Turmeric and curcumin for inflammation, liver support, pain relief. Safe dosage (≤3g/day), top supplements, and side effects to avoid.',
  keywords: [
    'turmeric benefits',
    'curcumin benefits',
    'turmeric side effects',
    'turmeric for inflammation',
    'turmeric dosage',
    'best turmeric supplement',
    'turmeric and black pepper benefits',
    'what is turmeric good for',
    'how much turmeric powder per day',
    'is turmeric bad for your liver',
    '10 serious side effects of turmeric',
    'best turmeric powder for inflammation',
    'what does turmeric do for the body'
  ],
  openGraph: {
    title: 'Turmeric & Curcumin: Anti-Inflammatory Benefits, Dosage & Safety',
    description: 'Evidence-based guide on turmeric benefits for inflammation, joint pain, liver health. Learn safe usage and potential risks.',
    images: ['/images/herbs/turmeric.jpg'],
    type: 'article'
  },
  alternates: {
    canonical: 'https://herbscience.shop/herbs/turmeric'
  }
}

// 结构化数据 - Article类型更适合健康指南内容
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://herbscience.shop/herbs/turmeric#article',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://herbscience.shop/herbs/turmeric'
  },
  'headline': 'Turmeric Benefits & Side Effects: Complete Evidence-Based Guide',
  'description': 'Complete guide to Turmeric (Curcuma longa) benefits, dosage, and safety. Learn about anti-inflammatory effects, proper usage, and 10 serious side effects.',
  'image': {
    '@type': 'ImageObject',
    'url': 'https://herbscience.shop/images/herbs/turmeric.jpg',
    'width': 1200,
    'height': 630
  },
  'author': {
    '@type': 'Organization',
    '@id': 'https://herbscience.shop/#organization',
    'name': 'HerbScience',
    'url': 'https://herbscience.shop'
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
    }
  },
  'datePublished': '2024-10-01T00:00:00Z',
  'dateModified': new Date().toISOString(),
  'inLanguage': 'en',
  'about': {
    '@type': 'Thing',
    'name': 'Turmeric',
    'alternateName': 'Curcuma longa',
    'description': 'A golden-colored spice and herbal supplement known for anti-inflammatory properties'
  },
  'keywords': 'turmeric benefits, curcumin benefits, turmeric side effects, turmeric dosage, anti-inflammatory herbs',
  'articleSection': 'Natural Health',
  'wordCount': 2800
}

export default function TurmericPage() {
  return (
    <>
      <Header />
      
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <TurmericClient />
    </>
  )
}
