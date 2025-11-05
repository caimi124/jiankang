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
        name: 'How accurate is this TCM body type quiz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This quiz is based on the official TCM Constitution Classification Standards (China Association of Chinese Medicine, 2009) used by practitioners worldwide. While it provides valuable insights into your body constitution, it is not a substitute for professional medical advice from a qualified TCM practitioner.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need to register or pay to see my results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The TCM Body Constitution Test is completely free, requires no registration, and you will get instant results after completing the 35 questions. No payment or personal information is required.'
        }
      },
      {
        '@type': 'Question',
        name: 'What makes this different from a regular body type quiz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unlike general "body type" quizzes, this assessment is rooted in Traditional Chinese Medicine and backed by clinical research. It covers all 9 official TCM constitution types: Balanced, Qi-deficient, Yang-deficient, Yin-deficient, Blood-stasis, Phlegm-damp, Damp-heat, Qi-stagnation, and Special constitution.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use the herbal recommendations immediately?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While the recommendations are evidence-based, you should always consult a qualified TCM practitioner or healthcare provider before starting any herbal supplement, especially if you are pregnant, breastfeeding, taking medications, or have existing health conditions.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does the TCM constitution test take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The test takes approximately 5 minutes to complete. It consists of 35 carefully designed questions about your physical and emotional well-being, sleep patterns, digestion, and energy levels.'
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