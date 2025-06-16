'use client'

import { useState } from 'react'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs'
import SmartSearch from '../../components/SmartSearch'
import { LoadingSpinner, CardSkeleton } from '../../components/LoadingSpinner'

interface HerbResult {
  id: string
  name: string
  scientificName: string
  category: string
  uses: string[]
  safety: 'high' | 'medium' | 'low'
  evidence: 'strong' | 'moderate' | 'limited'
  image?: string
}

export default function HerbFinder() {
  const [searchResults, setSearchResults] = useState<HerbResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const breadcrumbItems = [
    { label: 'Tools', href: '/tools', icon: '🔧' },
    { label: 'Herb Finder', icon: '🔍' }
  ]

  const handleSearch = async (query: string, filters: any) => {
    setLoading(true)
    setHasSearched(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockResults: HerbResult[] = [
        {
          id: '1',
          name: 'Turmeric',
          scientificName: 'Curcuma longa',
          category: 'Anti-inflammatory',
          uses: ['Joint pain', 'Inflammation', 'Digestive health'],
          safety: 'high',
          evidence: 'strong'
        },
        {
          id: '2',
          name: 'Ginseng',
          scientificName: 'Panax ginseng',
          category: 'Adaptogen',
          uses: ['Energy', 'Stress', 'Cognitive function'],
          safety: 'medium',
          evidence: 'moderate'
        },
        {
          id: '3',
          name: 'Ashwagandha',
          scientificName: 'Withania somnifera',
          category: 'Adaptogen',
          uses: ['Stress', 'Sleep', 'Anxiety'],
          safety: 'high',
          evidence: 'strong'
        }
      ]
      
      setSearchResults(mockResults)
      setLoading(false)
    }, 1500)
  }

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case 'high': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getEvidenceColor = (evidence: string) => {
    switch (evidence) {
      case 'strong': return 'text-blue-600 bg-blue-100'
      case 'moderate': return 'text-purple-600 bg-purple-100'
      case 'limited': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Unified Header */}
      <Header />
      
      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🔍 Herb Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Enter your symptoms or health goals to discover herbs that might help. 
            All recommendations are backed by traditional use and modern scientific research.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              What are you looking to address?
            </h2>
            
            <SmartSearch
              placeholder="Enter symptoms, health goals, or herb names..."
              onSearch={handleSearch}
            />
            
            {/* Popular Searches */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'anxiety relief',
                  'better sleep',
                  'joint pain',
                  'digestive issues',
                  'immune support',
                  'energy boost',
                  'stress management',
                  'cognitive function'
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term, {})}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-green-100 hover:text-green-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Searching our comprehensive herb database...</p>
            </div>
            <CardSkeleton count={3} />
          </div>
        )}

        {!loading && hasSearched && searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Found {searchResults.length} herbs for you
              </h3>
              <div className="text-sm text-gray-600">
                Sorted by relevance
              </div>
            </div>

            <div className="space-y-6">
              {searchResults.map((herb) => (
                <div
                  key={herb.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-xl font-semibold text-gray-900 mr-4">
                          {herb.name}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(herb.safety)}`}>
                          {herb.safety} safety
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getEvidenceColor(herb.evidence)}`}>
                          {herb.evidence} evidence
                        </span>
                      </div>
                      
                      <p className="text-gray-600 italic mb-3">{herb.scientificName}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Traditional uses:</p>
                        <div className="flex flex-wrap gap-2">
                          {herb.uses.map((use, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 md:ml-6">
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                        View Details
                      </button>
                      <button className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium">
                        Check Safety
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && hasSearched && searchResults.length === 0 && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No herbs found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse our categories below.
            </p>
            <button 
              onClick={() => {
                setHasSearched(false)
                setSearchResults([])
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Try New Search
            </button>
          </div>
        )}

        {/* Browse Categories */}
        {!hasSearched && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Browse by Category
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Digestive Health', icon: '🦾', count: 45, color: 'from-blue-500 to-blue-600' },
                { name: 'Stress & Anxiety', icon: '🧘', count: 38, color: 'from-purple-500 to-purple-600' },
                { name: 'Energy & Vitality', icon: '⚡', count: 52, color: 'from-orange-500 to-orange-600' },
                { name: 'Sleep Support', icon: '😴', count: 31, color: 'from-indigo-500 to-indigo-600' },
                { name: 'Immune System', icon: '🛡️', count: 29, color: 'from-green-500 to-green-600' },
                { name: 'Pain Relief', icon: '💊', count: 24, color: 'from-red-500 to-red-600' }
              ].map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleSearch(category.name.toLowerCase(), {})}
                  className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-left"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {category.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {category.count} herbs available
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 