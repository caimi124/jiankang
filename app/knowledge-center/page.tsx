'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import SmartSearch from '../../components/SmartSearch'

export default function KnowledgeCenter() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const pathname = usePathname()
  const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en'
  
  // CollectionPage + Breadcrumb 结构化数据
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Knowledge Center',
    description: 'Explore FAQs, safety guides, and research on herbal medicine.',
    url: 'https://herbscience.shop/knowledge-center',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Knowledge List',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: 30
    }
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://herbscience.shop/' },
      { '@type': 'ListItem', position: 2, name: 'Knowledge Center', item: 'https://herbscience.shop/knowledge-center' }
    ]
  }

  // 添加语言前缀的函数
  const addLocalePrefix = (href: string) => {
    if (currentLocale === 'zh') {
      return `/zh${href}`
    }
    return href
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="min-h-screen bg-white">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: addLocalePrefix('/') },
              { label: 'Knowledge Center', href: addLocalePrefix('/knowledge-center') }
            ]} 
          />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📚 Knowledge Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore evidence-based information about herbal medicine, safety guidelines, and research findings.
            </p>
          </div>

          {/* Smart Search */}
          <div className="mb-12">
            <SmartSearch 
              placeholder="Search knowledge base..."
              onSearch={(query) => setSearchTerm(query)}
            />
          </div>

          {/* Content Placeholder */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Knowledge Center Coming Soon
            </h2>
            <p className="text-gray-600">
              We're building a comprehensive knowledge base with FAQs, safety guides, and research articles.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
