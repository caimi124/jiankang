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

          {/* Knowledge Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety Guidelines</h3>
              <p className="text-gray-600 mb-4">Essential safety information for using herbal medicines responsibly.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Dosage recommendations</li>
                <li>• Drug interactions</li>
                <li>• Contraindications</li>
                <li>• Quality assurance</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">❓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Frequently Asked Questions</h3>
              <p className="text-gray-600 mb-4">Common questions about herbal medicine and their answers.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• How do herbs work?</li>
                <li>• Are herbs safe?</li>
                <li>• How to choose quality herbs?</li>
                <li>• Dosage guidelines</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Research & Evidence</h3>
              <p className="text-gray-600 mb-4">Scientific studies and clinical research on herbal medicine.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Clinical trials</li>
                <li>• Mechanism of action</li>
                <li>• Efficacy studies</li>
                <li>• Latest research</li>
              </ul>
            </div>
          </div>

          {/* Featured Articles */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Understanding Traditional Chinese Medicine Constitution Types</h3>
                <p className="text-gray-600 text-sm mb-2">Learn about the 9 constitution types in TCM and how they affect herb selection.</p>
                <span className="text-xs text-green-600 font-medium">Updated: September 2024</span>
              </article>
              
              <article className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Herb-Drug Interactions: What You Need to Know</h3>
                <p className="text-gray-600 text-sm mb-2">Important information about potential interactions between herbs and medications.</p>
                <span className="text-xs text-blue-600 font-medium">Updated: August 2024</span>
              </article>
              
              <article className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Standards for Herbal Products</h3>
                <p className="text-gray-600 text-sm mb-2">How to identify high-quality herbal supplements and avoid contaminated products.</p>
                <span className="text-xs text-purple-600 font-medium">Updated: September 2024</span>
              </article>
              
              <article className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Evidence-Based Herbal Medicine</h3>
                <p className="text-gray-600 text-sm mb-2">Overview of scientific research supporting the use of traditional herbs.</p>
                <span className="text-xs text-orange-600 font-medium">Updated: August 2024</span>
              </article>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Quick Facts About Herbal Medicine</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5000+</div>
                <div className="text-green-100">Years of Use</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">80%</div>
                <div className="text-green-100">Global Population Uses Traditional Medicine</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50,000+</div>
                <div className="text-green-100">Known Medicinal Plants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">25%</div>
                <div className="text-green-100">Modern Drugs from Plants</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
