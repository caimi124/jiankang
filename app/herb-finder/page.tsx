import React from 'react'
import { Metadata } from 'next'
import HerbFinderClient from './HerbFinderClient'

export const metadata: Metadata = {
  title: 'Herb Finder - Search 63+ Evidence-Based Herbs | HerbScience',
  description: 'Search our comprehensive database of 63 herbs by symptom, health goal, or constitution type. Find safe, science-backed herbal remedies.',
  openGraph: {
    title: 'Herb Finder - Comprehensive Herbal Medicine Database',
    description: 'Search 63+ evidence-based herbs by symptom, health goal, or constitution type.',
    url: 'https://herbscience.shop/herb-finder',
    type: 'website',
  },
  alternates: {
    canonical: 'https://herbscience.shop/herb-finder',
  },
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
      name: 'Herb List',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: 100
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <HerbFinderClient />
    </>
  );
}