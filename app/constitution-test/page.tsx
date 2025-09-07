import { Metadata } from 'next'
import React from 'react'
import ConstitutionTestClient from './ConstitutionTestClient'

export const metadata: Metadata = {
  title: 'TCM Constitution Test - Discover Your Body Type | Free Health Assessment',
  description: 'Take our comprehensive Traditional Chinese Medicine constitution test to discover your body type. Get personalized health recommendations, dietary advice, and herbal suggestions based on your TCM constitution.',
  keywords: 'TCM constitution test, Chinese medicine body type test, traditional chinese medicine quiz, constitution assessment, body type analysis, TCM health test, Chinese medicine diagnostic, personalized health assessment, qi deficiency test, yang deficiency test',
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
      <ConstitutionTestClient />
    </>
  )
} 