import { Metadata } from 'next'
import React from 'react'
import ConstitutionTestClientOptimized from './ConstitutionTestClientOptimized'
import ErrorBoundary from '../../components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'TCM Body Constitution Test | Free 5-Minute Quiz by HerbScience',
  description: 'Take our free 5-minute TCM constitution test. Discover your body type and get personalized herb recommendations. Evidence-based diet tips for better health.',
  keywords: 'TCM body constitution test, TCM body type quiz, Chinese medicine constitution test, personalized herbal recommendations, 9 TCM constitutions, immune boosting herbs, stress relief herbs, sleep support herbs, natural supplements, evidence-based assessment, holistic wellness guidance',
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'HerbScience Team' }],
  publisher: 'HerbScience',
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
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE
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
      timeRequired: 'PT5M',
      assesses: 'Traditional Chinese Medicine Constitution Type',
      author: {
        '@type': 'Organization',
        name: 'HerbScience',
        url: 'https://herbscience.shop'
      }
    }
  }

  // FAQ Schema for rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why do I need a constitution test before choosing herbs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because the same herb can warm one person and overheat another. This constitution assessment shows which body pattern you follow so you know whether a supplement fits you before you add it.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this just a quiz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. It is a personal assessment built on the official 2009 TCM Constitution Classification Standard. The output includes your traditional pattern name, a modern translation, and the most common “why advice fails” situations.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does it take and what do I get?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You will answer 35 sensation‑based questions in about two minutes. The result page immediately highlights your constitution, a short description of why generic advice misses you, and the next recommended step.'
        }
      },
      {
        '@type': 'Question',
        name: 'What happens after I finish the test?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can jump straight into the Herb Finder filtered by your constitution or book a deeper breakdown. Every CTA points you back to constitution-based decisions.'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ErrorBoundary>
        <ConstitutionTestClientOptimized />
      </ErrorBoundary>
    </>
  )
} 