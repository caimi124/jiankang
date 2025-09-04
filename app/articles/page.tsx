import React from 'react'
import ArticlesClient from './ArticlesClient'

export default function ArticlesPage() {
  // CollectionPage + Breadcrumb 结构化数据
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Herbal Articles',
    description: 'Read evidence-based articles about herbal supplements, research, and health guidance.',
    url: 'https://herbscience.shop/articles',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Article List',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: 50
    }
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://herbscience.shop/' },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://herbscience.shop/articles' }
    ]
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ArticlesClient />
    </>
  )
}