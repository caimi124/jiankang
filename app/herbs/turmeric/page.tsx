import { Metadata } from 'next'
import Header from '@/components/Header'
import TurmericClient from './TurmericClient'

// SEO优化的元数据 - 基于KGR关键词研究优化
export const metadata: Metadata = {
  title: 'Turmeric Benefits & Side Effects | Safe Dose & Anti-Inflammatory Guide',
  description: 'Explore turmeric and curcumin benefits for inflammation, liver support, pain relief. Learn safe dosage (≤3g/day), top supplements, and 10 serious side effects to avoid.',
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

// 结构化数据
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  'name': 'Turmeric Guide',
  'description': 'Complete guide to Turmeric benefits, dosage, and safety',
  'about': {
    '@type': 'Drug',
    'name': 'Turmeric',
    'description': 'Herbal supplement',
    'proprietaryName': 'Turmeric'
  },
  'lastReviewed': new Date().toISOString().split('T')[0]
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
