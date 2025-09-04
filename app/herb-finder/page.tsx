import React from 'react'
import HerbFinderClient from './HerbFinderClient'

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
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://herbscience.shop/' },
      { '@type': 'ListItem', position: 2, name: 'Herb Finder', item: 'https://herbscience.shop/herb-finder' }
    ]
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <HerbFinderClient />
    </>
  )
}