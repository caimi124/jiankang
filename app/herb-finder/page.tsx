import React from 'react'
import { Metadata } from 'next'
import HerbFinderClient from './HerbFinderClient'

export const metadata: Metadata = {
  title: 'Herb Finder - Find Herbs by Symptoms, Body Type & Health Goals | HerbScience',
  description: 'Find the perfect herbs for your health needs with our evidence-based Herb Finder. Search 64+ herbs by symptoms, body constitution, or health goals. Safe herbal supplements with personalized recommendations.',
  keywords: 'herb finder, find herbs by symptoms, herbs for body constitution, herbal search tool, safe herbal supplements, herb database, herbs by health goals, TCM constitution herbs, personalized herbal recommendations, best herbs for stress and anxiety, herbs for sleep support, immune boosting herbs, natural remedies finder, evidence-based herbs, herbal supplement search, body type test herbs',
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'HerbScience Team' }],
  publisher: 'HerbScience',
  openGraph: {
    title: 'Herb Finder - Find Herbs by Symptoms & Body Type',
    description: 'Search 64+ safe, evidence-based herbs by symptoms, health goals, or body constitution. Get personalized herbal recommendations based on TCM principles.',
    url: 'https://herbscience.shop/herb-finder',
    type: 'website',
    images: [
      {
        url: '/images/herb-finder-og.jpg',
        width: 1200,
        height: 630,
        alt: 'HerbScience Herb Finder - Search Herbs by Symptom and Body Type'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Herb Finder - Find Herbs by Symptoms & Body Type',
    description: 'Search 64+ safe, evidence-based herbs. Find herbs for stress, sleep, immunity, digestion, and more. Personalized recommendations.',
    images: ['/images/herb-finder-og.jpg']
  },
  alternates: {
    canonical: 'https://herbscience.shop/herb-finder',
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE
  }
}

export default function HerbFinderPage() {
  // CollectionPage + Breadcrumb 结构化数据
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Herb Finder',
    description: 'Browse and search the complete database of evidence-based herbs, with safety, dosage, and scientific support.',
    url: 'https://herbscience.shop/herb-finder',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Herb Database',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: 64
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://herbscience.shop/' },
      { '@type': 'ListItem', position: 2, name: 'Herb Finder', item: 'https://herbscience.shop/herb-finder' }
    ]
  };

  // SearchAction Schema - 帮助 Google 理解搜索功能
  const searchActionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://herbscience.shop/#website',
    url: 'https://herbscience.shop',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://herbscience.shop/herb-finder?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // FAQ Schema for Herb Finder
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find the right herb for my symptoms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the Herb Finder search bar to enter your symptom (e.g., "sleep problems", "low energy", "digestive issues"). You can also filter by health goals using the category buttons. For personalized recommendations based on your TCM body type, take our free Constitution Test first.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are all herbs in the database safe to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our database includes herbs with varying safety profiles. Each herb page includes detailed safety information, potential side effects, and drug interactions. Always consult a qualified healthcare professional before starting any herbal supplement, especially if you have medical conditions or take medications.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I search herbs by my TCM body constitution type?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! The Herb Finder allows you to filter herbs by constitution type. First, take our free TCM Constitution Test to discover your body type, then use the advanced filters to find herbs specifically suited to your constitution (e.g., Qi-deficient, Yang-deficient, Yin-deficient, etc.).'
        }
      },
      {
        '@type': 'Question',
        name: 'How many herbs are in the HerbScience database?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our Herb Finder currently includes 64 evidence-based herbs from Traditional Chinese Medicine and other herbal traditions. Each herb entry includes detailed information on benefits, dosages, safety, scientific research, and personalized recommendations based on TCM constitution types.'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchActionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HerbFinderClient />
    </>
  );
}