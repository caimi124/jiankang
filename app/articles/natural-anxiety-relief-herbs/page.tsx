import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Natural Anxiety Relief: Evidence-Based Herbal Options | HerbScience',
  description: 'Discover scientifically-proven herbs for anxiety relief including ashwagandha, passionflower, and chamomile. Learn dosages, safety, and effectiveness.',
  keywords: 'natural anxiety relief, herbal anxiety remedies, ashwagandha anxiety, passionflower, chamomile, anxiety herbs',
  authors: [{ name: 'Dr. Lisa Park, PhD Psychology' }],
  openGraph: {
    title: 'Natural Anxiety Relief: Evidence-Based Herbal Options',
    description: 'Scientific review of herbs with proven anxiety-reducing effects and their mechanisms of action.',
    type: 'article',
    url: 'https://www.herbscience.shop/articles/natural-anxiety-relief-herbs',
    siteName: 'HerbScience'
  }
}

export default function NaturalAnxietyReliefGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Articles', href: '/articles' },
              { label: 'Natural Anxiety Relief Herbs', href: '/articles/natural-anxiety-relief-herbs' }
            ]} 
          />

          <div className="mb-6">
            <Link href="/articles">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Articles</span>
              </button>
            </Link>
          </div>

          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Mental Health</span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  January 1, 2024
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  12 min read
                </span>
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Dr. Lisa Park
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Natural Anxiety Relief: Evidence-Based Herbal Options
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Anxiety affects millions worldwide, and while conventional treatments are effective, many people seek natural alternatives. This comprehensive review examines herbs with scientific evidence for anxiety relief, their mechanisms, and safe usage guidelines.
              </p>

              <div className="prose prose-lg max-w-none">
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Top Evidence-Based Anxiety Herbs</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-green-900 mb-3">🌿 Ashwagandha</h3>
                    <p className="text-green-800 text-sm mb-3">Reduces cortisol levels by up to 30% and significantly improves anxiety scores in clinical trials.</p>
                    <div className="text-xs text-green-700">
                      <strong>Dose:</strong> 300-600mg daily<br />
                      <strong>Evidence:</strong> Multiple RCTs
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-blue-900 mb-3">🌿 Passionflower</h3>
                    <p className="text-blue-800 text-sm mb-3">Modulates GABA receptors and shows effectiveness comparable to prescription anti-anxiety medications.</p>
                    <div className="text-xs text-blue-700">
                      <strong>Dose:</strong> 90mg extract daily<br />
                      <strong>Evidence:</strong> Clinical trials vs. oxazepam
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-yellow-900 mb-3">🌿 Chamomile</h3>
                    <p className="text-yellow-800 text-sm mb-3">Gentle anxiolytic effects with excellent safety profile, effective for mild to moderate anxiety.</p>
                    <div className="text-xs text-yellow-700">
                      <strong>Dose:</strong> 1.2g extract or 3-4 cups tea<br />
                      <strong>Evidence:</strong> Systematic reviews
                    </div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-purple-900 mb-3">🌿 L-Theanine</h3>
                    <p className="text-purple-800 text-sm mb-3">Promotes relaxation without sedation, increases alpha brain waves associated with calm alertness.</p>
                    <div className="text-xs text-purple-700">
                      <strong>Dose:</strong> 100-200mg daily<br />
                      <strong>Evidence:</strong> EEG studies, clinical trials
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Scientific Mechanisms</h2>
                <p className="text-gray-700 mb-6">
                  Understanding how these herbs work helps explain their effectiveness and guides proper use:
                </p>

                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">How Anxiety Herbs Work</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>GABA Enhancement:</strong> Many herbs boost the brain's primary calming neurotransmitter</li>
                    <li>• <strong>Cortisol Reduction:</strong> Adaptogenic herbs help normalize stress hormone levels</li>
                    <li>• <strong>Inflammation Control:</strong> Chronic inflammation contributes to anxiety; anti-inflammatory herbs help</li>
                    <li>• <strong>Neurotransmitter Balance:</strong> Supporting healthy serotonin and dopamine function</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Safety Considerations</h2>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                  <h3 className="font-semibold text-yellow-900 mb-3">Important Safety Notes</h3>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Always consult healthcare providers before combining with anxiety medications</li>
                    <li>• Start with lowest effective doses</li>
                    <li>• Avoid during pregnancy/breastfeeding unless approved by doctor</li>
                    <li>• Monitor for excessive sedation when combining herbs</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Building Your Natural Anxiety Protocol</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🌅 Morning Support</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• L-Theanine (100mg)</li>
                      <li>• Ashwagandha (300mg)</li>
                      <li>• B-complex vitamin</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🌅 Afternoon Calm</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Chamomile tea</li>
                      <li>• Magnesium (200mg)</li>
                      <li>• Deep breathing practice</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🌙 Evening Wind-Down</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Passionflower (90mg)</li>
                      <li>• Chamomile (1.2g)</li>
                      <li>• Relaxation routine</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When to Seek Professional Help</h2>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                  <h3 className="font-semibold text-red-900 mb-3">Seek Immediate Help If:</h3>
                  <ul className="text-red-800 space-y-1">
                    <li>• Anxiety interferes with daily functioning</li>
                    <li>• Panic attacks occur frequently</li>
                    <li>• Thoughts of self-harm arise</li>
                    <li>• Physical symptoms are severe</li>
                  </ul>
                </div>

              </div>

              {/* Related Articles */}
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/articles/ashwagandha-complete-guide" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold text-gray-900 mb-2">Ashwagandha Complete Guide</h4>
                    <p className="text-gray-600 text-sm">Deep dive into this powerful adaptogenic herb for stress and anxiety.</p>
                  </Link>
                  <Link href="/constitution-test" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold text-gray-900 mb-2">Constitution Test</h4>
                    <p className="text-gray-600 text-sm">Discover your unique constitution for personalized herb recommendations.</p>
                  </Link>
                </div>
              </div>

            </div>
          </article>
        </div>
      </main>
    </div>
  )
} 