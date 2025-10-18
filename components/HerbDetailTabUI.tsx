'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Heart, Shield, BookOpen, FlaskConical, Users, Eye,
  Bookmark, Share2, AlertTriangle
} from 'lucide-react'

interface HerbDetailTabUIProps {
  name: string
  latinName: string
  slug: string
  category?: string
  properties?: string[]
  evidenceLevel?: 'Strong' | 'Moderate' | 'Limited'
  overview: React.ReactNode
  benefits: React.ReactNode
  safety: React.ReactNode
  science?: React.ReactNode
  traditional?: React.ReactNode
  faq?: React.ReactNode
}

export default function HerbDetailTabUI({
  name,
  latinName,
  slug,
  category = 'Warming Herbs',
  properties = ['Warming', 'Circulatory', 'Anti-inflammatory'],
  evidenceLevel = 'Moderate',
  overview,
  benefits,
  safety,
  science,
  traditional,
  faq
}: HerbDetailTabUIProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [bookmarked, setBookmarked] = useState(false)

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'Strong': return 'bg-green-100 text-green-800'
      case 'Moderate': return 'bg-yellow-100 text-yellow-800'
      case 'Limited': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-green-600 hover:underline">🏠 Home</Link>
          <span className="text-gray-400">›</span>
          <Link href="/herb-finder" className="text-green-600 hover:underline">Herb Database</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-700">{name}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative bg-gradient-to-r from-green-600 to-green-700 px-8 py-12">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{name}</h1>
                  <p className="text-green-100 text-lg italic mb-4">{latinName}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEvidenceColor(evidenceLevel)}`}>
                      {evidenceLevel} Evidence
                    </span>
                    {properties?.map((prop, idx) => (
                      <span key={idx} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-3 rounded-full transition-colors ${
                      bookmarked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                    aria-label="Share this page"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="px-8 py-6 bg-gray-50 border-b">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Safety Level</p>
                  <p className="font-semibold text-gray-900">Generally Recognized as Safe (GRAS)</p>
                  <p className="text-xs text-gray-500">Safe for most adults in typical amounts</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FlaskConical className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Evidence Quality</p>
                  <p className="font-semibold text-gray-900">{evidenceLevel}</p>
                  <p className="text-xs text-gray-500">
                    {evidenceLevel === 'Strong' && 'Multiple clinical studies'}
                    {evidenceLevel === 'Moderate' && 'Some clinical evidence'}
                    {evidenceLevel === 'Limited' && 'Traditional use primarily'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Main Uses</p>
                  <p className="font-semibold text-gray-900">5 Science-Backed Benefits</p>
                  <p className="text-xs text-gray-500">Modern & traditional applications</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Important Notes</p>
                  <p className="font-semibold text-gray-900">4 Safety Considerations</p>
                  <p className="text-xs text-gray-500">Always consult healthcare provider</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: Eye, show: true },
                { id: 'benefits', label: 'Benefits & Uses', icon: Heart, show: true },
                { id: 'safety', label: 'Safety & Dosage', icon: Shield, show: true },
                { id: 'science', label: 'Scientific Evidence', icon: FlaskConical, show: !!science },
                { id: 'traditional', label: 'Traditional Use', icon: BookOpen, show: !!traditional },
                { id: 'faq', label: 'FAQ', icon: Users, show: !!faq }
              ].filter(tab => tab.show).map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="px-8 py-8">
            {activeTab === 'overview' && <div className="space-y-6">{overview}</div>}
            {activeTab === 'benefits' && <div className="space-y-6">{benefits}</div>}
            {activeTab === 'safety' && <div className="space-y-6">{safety}</div>}
            {activeTab === 'science' && science && <div className="space-y-6">{science}</div>}
            {activeTab === 'traditional' && traditional && <div className="space-y-6">{traditional}</div>}
            {activeTab === 'faq' && faq && <div className="space-y-4">{faq}</div>}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want Personalized Herb Recommendations?
          </h2>
          <p className="text-green-100 text-lg mb-6">
            Take our 3-minute TCM constitution test to find the best herbs for YOUR body type
          </p>
          <Link
            href="/constitution-test"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Take Free Constitution Test →
          </Link>
        </div>
      </main>
    </div>
  )
}

