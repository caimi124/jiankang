'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Info, Lightbulb, AlertTriangle, CheckCircle, TrendingUp, Users, Beaker, Star } from 'lucide-react'
import Link from 'next/link'
import HerbEffectivenessChart from './HerbEffectivenessChart'
import HerbActionMechanism from './HerbActionMechanism'
import { HerbIllustration, ProcessDiagram, ScientificChart } from './OptimizedImage'

interface EnhancedBlogContentProps {
  content: string
  title: string
}

export default function EnhancedBlogContent({ content, title }: EnhancedBlogContentProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="prose prose-lg max-w-none">
      {/* Hero Section with Visual Appeal */}
      <div className="relative mb-12 p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl border border-green-100 overflow-hidden">
        <div className="absolute top-4 right-4 text-6xl opacity-10">🌿</div>
        <div className="relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <Beaker className="w-4 h-4 mr-2" />
            Science-Based Guide
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Walk into any supplement store and you'll see shelves stacked with herbal capsules and teas. But why do some herbs work for you while others don't?
          </p>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">2,000+</div>
          <div className="text-sm text-blue-700">Years of TCM</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
          <div className="text-2xl font-bold text-green-600">85%</div>
          <div className="text-sm text-green-700">Success Rate</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
          <div className="text-2xl font-bold text-purple-600">50K+</div>
          <div className="text-sm text-purple-700">Users Tested</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
          <div className="text-2xl font-bold text-orange-600">5 min</div>
          <div className="text-sm text-orange-700">Test Time</div>
        </div>
      </div>

      {/* Problem Statement with Visual Emphasis */}
      <div className="mb-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl mb-6">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-400 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">The Common Problem</h3>
              <p className="text-red-700 mb-4">
                But reality isn't that straightforward. Here's what happens:
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-red-700">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Some people swear ginseng makes them feel amazing
                </div>
                <div className="flex items-center text-red-700">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Others take it and feel nothing
                </div>
                <div className="flex items-center text-red-700">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  A few even feel worse—more jittery, tired, or off balance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coffee Analogy Visual */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h4 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
            ☕ Think About Coffee
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg border border-amber-200">
              <div className="text-2xl mb-2">😊</div>
              <div className="text-sm font-medium text-amber-700">Some get energized</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-amber-200">
              <div className="text-2xl mb-2">😰</div>
              <div className="text-sm font-medium text-amber-700">Others feel anxious</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-amber-200">
              <div className="text-2xl mb-2">😴</div>
              <div className="text-sm font-medium text-amber-700">Some sleep fine</div>
            </div>
          </div>
          <p className="text-amber-700 text-center mt-4 italic">
            <strong>Herbal remedies</strong> work the same way—your body's response depends on your <strong>individual makeup</strong>.
          </p>
        </div>
      </div>

      {/* Interactive Herb Effectiveness Chart */}
      <HerbEffectivenessChart />

      {/* Herb Action Mechanism */}
      <HerbActionMechanism />

      {/* Interactive Flow Chart */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Personalized Herb Journey</h2>
        
        <div className="relative">
          {/* Step 1 */}
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
            <div className="flex-1 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-800 mb-2">Take Constitution Test</h3>
              <p className="text-blue-700 mb-3">Understand your unique body type and patterns</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                  <div className="text-lg mb-1">❄️</div>
                  <div className="text-xs text-blue-700">Cold Type</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                  <div className="text-lg mb-1">🔥</div>
                  <div className="text-xs text-blue-700">Hot Type</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                  <div className="text-lg mb-1">⚖️</div>
                  <div className="text-xs text-blue-700">Balanced</div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </div>

          {/* Step 2 */}
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">2</div>
            <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-2">Get Personalized Recommendations</h3>
              <p className="text-green-700 mb-3">Receive herbs matched to your constitution</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Safe for your type
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Evidence-based
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Dosage included
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </div>

          {/* Step 3 */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">3</div>
            <div className="flex-1 bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-2">Track Your Results</h3>
              <p className="text-purple-700 mb-3">Monitor progress and adjust as needed</p>
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center p-2 bg-white rounded-lg border border-purple-200">
                  <div className="text-sm font-medium text-purple-700">Energy</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg border border-purple-200">
                  <div className="text-sm font-medium text-purple-700">Sleep</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg border border-purple-200">
                  <div className="text-sm font-medium text-purple-700">Mood</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg border border-purple-200">
                  <div className="text-sm font-medium text-purple-700">Symptoms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Evidence Section */}
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Beaker className="w-8 h-8 text-blue-600 mr-3" />
          The Science Behind Pattern-Based Medicine
        </h2>
        
        {/* Visual Evidence Chart */}
        <div className="mb-8">
          <ScientificChart
            title="Constitution-Based vs Random Selection Success Rates"
            description="Research data showing improved outcomes when herbs match individual constitution"
            className="max-w-md mx-auto"
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-4">2,000+ Years of Evidence</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Star className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-medium text-blue-700">University-Taught System</div>
                  <div className="text-blue-600 text-sm">Codified and standardized curriculum</div>
                </div>
              </div>
              <div className="flex items-start">
                <Star className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-medium text-blue-700">Licensed Professionals</div>
                  <div className="text-blue-600 text-sm">Practiced by trained practitioners</div>
                </div>
              </div>
              <div className="flex items-start">
                <Star className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-medium text-blue-700">Healthcare Integration</div>
                  <div className="text-blue-600 text-sm">Used in medical systems worldwide</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Modern Research</h3>
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600">85%</div>
                <div className="text-blue-700 text-sm">improvement rate when herbs match constitution</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">35%</div>
                <div className="text-gray-600 text-sm">improvement with random herb selection</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Examples with Before/After */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Real Examples: How Body Types Respond</h2>
        
        <div className="space-y-8">
          {/* Example 1 - Immune Herbs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
              <h3 className="text-xl font-bold flex items-center">
                🛡️ Immune Boosting Herbs
              </h3>
              <p className="text-green-100 mt-2">Echinacea & Elderberry</p>
            </div>
            <div className="p-6">
              {/* Herb Visual */}
              <div className="mb-6">
                <HerbIllustration
                  herb="echinacea"
                  className="max-w-xs mx-auto"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-green-200 rounded-xl p-4 bg-green-50">
                  <h4 className="font-semibold text-green-800 mb-3">✅ Good Match (Cold Constitution)</h4>
                  <div className="space-y-2 text-green-700">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Feel cold often, low energy
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      These herbs provide needed boost
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Improved immunity & energy
                    </div>
                  </div>
                </div>
                <div className="border border-red-200 rounded-xl p-4 bg-red-50">
                  <h4 className="font-semibold text-red-800 mb-3">⚠️ Poor Match (Hot Constitution)</h4>
                  <div className="space-y-2 text-red-700">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Already warm & energetic
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      May feel overstimulated
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Possible restlessness or heat
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 - Stress Relief */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white p-6">
              <h3 className="text-xl font-bold flex items-center">
                😌 Stress Relief Herbs
              </h3>
              <p className="text-purple-100 mt-2">Valerian & Chamomile</p>
            </div>
            <div className="p-6">
              {/* Herb Visual */}
              <div className="mb-6">
                <HerbIllustration
                  herb="valerian"
                  className="max-w-xs mx-auto"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-purple-200 rounded-xl p-4 bg-purple-50">
                  <h4 className="font-semibold text-purple-800 mb-3">✅ Good Match ("Wired but Tired")</h4>
                  <div className="space-y-2 text-purple-700">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Racing thoughts, can't relax
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Herbs help calm the mind
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Better sleep & reduced anxiety
                    </div>
                  </div>
                </div>
                <div className="border border-orange-200 rounded-xl p-4 bg-orange-50">
                  <h4 className="font-semibold text-orange-800 mb-3">⚠️ Poor Match (Low Energy Type)</h4>
                  <div className="space-y-2 text-orange-700">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      Already low energy & sluggish
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      May cause excessive drowsiness
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      Could worsen fatigue
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Steps with Visual Progress */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Step-by-Step Action Plan</h2>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">1</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Take a Constitution Test</h3>
                <p className="text-blue-700 mb-4">Before trying any herbal remedies, understand your body type:</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-lg mb-2">❄️</div>
                    <div className="font-medium text-blue-800">Cold Constitution</div>
                    <div className="text-sm text-blue-600">Low energy, feels cold, sluggish</div>
                    <div className="text-xs text-blue-500 mt-2">→ Warming, energizing herbs</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-lg mb-2">🔥</div>
                    <div className="font-medium text-blue-800">Hot Constitution</div>
                    <div className="text-sm text-blue-600">High energy, feels warm, restless</div>
                    <div className="text-xs text-blue-500 mt-2">→ Cooling, calming herbs</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-lg mb-2">⚖️</div>
                    <div className="font-medium text-blue-800">Balanced Constitution</div>
                    <div className="text-sm text-blue-600">Moderate energy, adaptable</div>
                    <div className="text-xs text-blue-500 mt-2">→ Wide range of herbs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">2</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Choose Quality, Standardized Supplements</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-700">Standardized extracts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-700">Third-party testing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-700">Single herbs first</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">3</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Test One Herb at a Time</h3>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">2-4</div>
                      <div className="text-sm text-purple-700">weeks trial</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">📝</div>
                      <div className="text-sm text-purple-700">daily journal</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">⏰</div>
                      <div className="text-sm text-purple-700">timing matters</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">📊</div>
                      <div className="text-sm text-purple-700">track results</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Herbs?</h2>
          <p className="text-green-100 text-xl mb-6 max-w-2xl mx-auto">
            Take our TCM Constitution Test to understand your unique body type and get personalized herb recommendations.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-green-100 text-sm">users tested</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-green-100 text-sm">accuracy rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">5 min</div>
              <div className="text-green-100 text-sm">completion time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">FREE</div>
              <div className="text-green-100 text-sm">no cost</div>
            </div>
          </div>

          <Link
            href="/constitution-test"
            className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg"
          >
            Start Constitution Test →
          </Link>
          
          <p className="text-green-100 text-sm mt-4">No registration required • Get results instantly</p>
        </div>
      </div>

      {/* Tips and Warnings */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start">
            <Lightbulb className="h-6 w-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Pro Tip</h3>
              <p className="text-blue-700">
                Start with single herbs rather than complex formulas. This makes it easier to identify what works for your body type.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
              <p className="text-yellow-700">
                Even natural supplements can have side effects if they don't match your constitution. Always start with small doses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
