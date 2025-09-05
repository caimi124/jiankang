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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Research & Evidence</h3>
              <p className="text-gray-600 mb-4">Latest scientific studies and clinical evidence on herbal medicine effectiveness.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Clinical trials and meta-analyses</li>
                <li>• Systematic reviews</li>
                <li>• Evidence-based recommendations</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety Guidelines</h3>
              <p className="text-gray-600 mb-4">Comprehensive safety information, contraindications, and interaction warnings.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Drug-herb interactions</li>
                <li>• Dosage recommendations</li>
                <li>• Special populations guidance</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">FAQs</h3>
              <p className="text-gray-600 mb-4">Frequently asked questions about herbal medicine usage and benefits.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Common usage questions</li>
                <li>• Preparation methods</li>
                <li>• Quality and sourcing</li>
              </ul>
            </div>
          </div>

          {/* Featured Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">🌿</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Safety Guide</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Understanding Herb-Drug Interactions</h3>
                <p className="text-gray-600 text-sm mb-4">Learn about potential interactions between common herbs and medications, and how to use herbal supplements safely.</p>
                <div className="text-xs text-gray-500">Last updated: January 2025</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">📊</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Research</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Standards for Herbal Products</h3>
                <p className="text-gray-600 text-sm mb-4">Understanding standardization, purity testing, and what to look for when choosing herbal supplements.</p>
                <div className="text-xs text-gray-500">Last updated: December 2024</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">🧑‍⚕️</span>
                  <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Traditional Medicine</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Traditional Chinese Medicine Constitution Types</h3>
                <p className="text-gray-600 text-sm mb-4">Explore the nine constitution types in TCM and how they guide personalized herbal recommendations.</p>
                <div className="text-xs text-gray-500">Last updated: November 2024</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">⚗️</span>
                  <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Preparation</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Proper Preparation Methods</h3>
                <p className="text-gray-600 text-sm mb-4">Learn traditional and modern methods for preparing herbal medicines, from decoctions to standardized extracts.</p>
                <div className="text-xs text-gray-500">Last updated: October 2024</div>
              </div>
            </div>
          </div>

          {/* Quick Reference Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🚨 Emergency Situations</h3>
                <p className="text-sm text-gray-600 mb-2">If you experience any adverse reactions:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Stop taking the herb immediately</li>
                  <li>• Seek medical attention if symptoms persist</li>
                  <li>• Keep the product packaging for reference</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">✅ General Guidelines</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Always consult healthcare providers</li>
                  <li>• Start with lower doses</li>
                  <li>• Buy from reputable sources</li>
                  <li>• Check for quality certifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
