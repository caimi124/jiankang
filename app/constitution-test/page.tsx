import { Metadata } from 'next'
import React from 'react'
import ConstitutionTestClientOptimized from './ConstitutionTestClientOptimized'
import ErrorBoundary from '../../components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'TCM Body Constitution Test | 5-Minute Body Type Quiz for Personalized Herbal Guidance',
  description: 'Take this quick TCM Body Constitution Test to discover your body type. Get personalized herbal recommendations, evidence-based diet tips, and holistic wellness guidance for better sleep, energy, and immunity.',
  keywords: 'TCM body constitution test, TCM body type quiz, Chinese medicine constitution test, personalized herbal recommendations, 9 TCM constitutions, immune boosting herbs, stress relief herbs, sleep support herbs, natural supplements, evidence-based assessment, holistic wellness guidance',
  openGraph: {
    title: 'TCM Constitution Test - Discover Your Body Type',
    description: 'Free Traditional Chinese Medicine constitution assessment. Discover your body type and get personalized health recommendations.',
    type: 'website',
    url: 'https://herbscience.shop/constitution-test',
    images: [
      {
        url: '/images/tcm-constitution-test.jpg',
        width: 1200,
        height: 630,
        alt: 'TCM Constitution Test - Traditional Chinese Medicine Body Type Assessment'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCM Constitution Test - Discover Your Body Type',
    description: 'Free Traditional Chinese Medicine constitution assessment with personalized recommendations.',
    images: ['/images/tcm-constitution-test.jpg']
  },
  alternates: {
    canonical: 'https://herbscience.shop/constitution-test'
  }
}

export default function ConstitutionTestPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'TCM Constitution Test',
    description: 'Comprehensive Traditional Chinese Medicine constitution assessment tool',
    url: 'https://herbscience.shop/constitution-test',
    mainEntity: {
      '@type': 'Quiz',
      name: 'Traditional Chinese Medicine Constitution Test',
      description: 'Interactive assessment to determine your TCM body type and constitution',
      educationalLevel: 'Beginner to Advanced',
      timeRequired: 'PT10M',
      assesses: 'Traditional Chinese Medicine Constitution Type',
      author: {
        '@type': 'Organization',
        name: 'HerbScience',
        url: 'https://herbscience.shop'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ErrorBoundary>
        <ConstitutionTestClientOptimized />
      </ErrorBoundary>
    </>
  )
} 