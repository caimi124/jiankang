'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Heart, Shield, Brain, Zap, AlertTriangle, Clock, 
  Star, Users, BookOpen, FlaskConical, Pill, Leaf,
  CheckCircle, XCircle, AlertCircle, ArrowRight,
  Share2, Bookmark, Eye
} from 'lucide-react'

export default function TurmericClient() {
  const [activeTab, setActiveTab] = useState('overview')
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-green-600 hover:underline">🏠 Home</Link>
          <span className="text-gray-400">›</span>
          <Link href="/herb-finder" className="text-green-600 hover:underline">Herb Database</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-700">Turmeric</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative bg-gradient-to-r from-green-600 to-green-700 px-8 py-12">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Turmeric</h1>
                  <p className="text-green-100 text-lg italic mb-4">Curcuma longa</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Warming Herbs</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">Moderate Evidence</span>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Warming</span>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Circulatory</span>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Anti-inflammatory</span>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Antioxidant</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-3 rounded-full transition-colors ${
                      bookmarked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
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
                  <p className="font-semibold text-gray-900">Moderate</p>
                  <p className="text-xs text-gray-500">Some clinical evidence</p>
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
                { id: 'overview', label: 'Overview', icon: Eye },
                { id: 'benefits', label: 'Benefits & Uses', icon: Heart },
                { id: 'safety', label: 'Safety & Dosage', icon: Shield },
                { id: 'science', label: 'Scientific Evidence', icon: FlaskConical },
                { id: 'traditional', label: 'Traditional Use', icon: BookOpen },
                { id: 'faq', label: 'FAQ', icon: Users }
              ].map(tab => {
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
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Turmeric?</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Turmeric (<em>Curcuma longa</em>) is a golden spice long prized for its <strong>anti-inflammatory and antioxidant properties</strong>. Its star active compound, <strong>curcumin</strong>, supports joint comfort, liver detox, and metabolic balance. Many people ask, <em>"what is turmeric good for?"</em> — the benefits go beyond just flavor in cooking, blending ancient Ayurvedic tradition with modern science.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Curcumin benefits</strong> are particularly well-studied. This compound works through multiple mechanisms: it downregulates inflammatory pathways (NF-κB, COX-2), acts as a powerful antioxidant scavenging free radicals, supports liver & bile secretion for detoxification, and even modulates the gut microbiome by promoting beneficial bacteria like <em>Lactobacillus</em> and <em>Bifidobacterium</em>.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">🔬 Key Active Compounds</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Curcumin (Diferuloylmethane):</strong> Primary anti-inflammatory & antioxidant compound (2-5% of turmeric root)</li>
                    <li>• <strong>Demethoxycurcumin & Bisdemethoxycurcumin:</strong> Curcuminoid analogs with complementary effects</li>
                    <li>• <strong>Turmerones (ar-turmerone, α-turmerone, β-turmerone):</strong> Volatile oils that support liver function and neuroprotection</li>
                    <li>• <strong>Essential Oils:</strong> Contribute to digestive support and bioavailability</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Benefits Tab */}
            {activeTab === 'benefits' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Turmeric Benefits: What Does Turmeric Do for the Body?</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500">
                    <h4 className="font-semibold text-amber-900 mb-3">🔥 Inflammation & Joint Pain Relief</h4>
                    <p className="text-gray-700 mb-3">
                      <strong>Does turmeric help with inflammation?</strong> Yes! Curcumin has been shown to reduce inflammatory markers (CRP, IL-6) significantly in clinical trials.
                    </p>
                    <p className="text-sm text-amber-700">Evidence: ⭐⭐⭐⭐⭐ (Meta-analysis, Phytotherapy Research 2019)</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-3">🍃 Liver Support & Metabolic Health</h4>
                    <p className="text-gray-700 mb-3">
                      Turmeric's volatile oils (turmerones) and curcumin <strong>stimulate bile secretion</strong>, supporting liver detox pathways.
                    </p>
                    <p className="text-sm text-green-700">Evidence: ⭐⭐⭐⭐ (RCT, Diabetes Care 2021)</p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-900 mb-3">❤️ Heart & Circulation Support</h4>
                    <p className="text-gray-700 mb-3">
                      Curcumin helps <strong>reduce triglycerides</strong>, supports endothelial function (blood vessel health), and moderates platelet aggregation.
                    </p>
                    <p className="text-sm text-red-700">Evidence: ⭐⭐⭐⭐ (Clinical studies)</p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-3">🦠 Gut Health & Digestion</h4>
                    <p className="text-gray-700 mb-3">
                      Turmeric helps <strong>modulate gut flora</strong>, promoting beneficial strains and suppressing harmful bacteria.
                    </p>
                    <p className="text-sm text-blue-700">Evidence: ⭐⭐⭐⭐ (Microbiome studies)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Safety & Dosage Tab */}
            {activeTab === 'safety' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How Much Turmeric Can I Take a Day?</h2>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Recommended Dosage</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-amber-300">
                        <th className="text-left py-3">Form</th>
                        <th className="text-left py-3">Dosage</th>
                        <th className="text-left py-3">Frequency</th>
                        <th className="text-left py-3">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-amber-100">
                        <td className="py-3"><strong>Whole Turmeric Powder</strong></td>
                        <td className="py-3">≤ 3 g/day</td>
                        <td className="py-3">1-2x daily</td>
                        <td className="py-3">General wellness</td>
                      </tr>
                      <tr className="border-b border-amber-100">
                        <td className="py-3"><strong>Curcumin Extract</strong></td>
                        <td className="py-3">≤ 1,000 mg/day</td>
                        <td className="py-3">2x daily</td>
                        <td className="py-3">Inflammation, joint pain</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-red-50 border-2 border-red-300 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-red-900 mb-3">⚠️ 10 Serious Side Effects of Turmeric</h3>
                  <ol className="space-y-2 text-gray-800 list-decimal ml-6">
                    <li><strong>Liver Enzyme Elevation:</strong> High-dose curcumin supplements may trigger elevated liver enzymes (ALT, AST)</li>
                    <li><strong>Increased Bleeding Risk:</strong> Mild antiplatelet effects may increase bleeding risk with blood thinners</li>
                    <li><strong>Gallbladder Contractions:</strong> Avoid if you have gallstones or bile duct obstruction</li>
                    <li><strong>Kidney Stones:</strong> High in oxalates, may increase kidney stone risk</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Scientific Evidence Tab */}
            {activeTab === 'science' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Scientific References & Clinical Studies</h2>
                <ol className="space-y-4 text-gray-700 list-decimal ml-6">
                  <li>
                    <strong>Hewlings SJ, Kalman DS.</strong> (2017). "Curcumin: A Review of Its Effects on Human Health." <em>Foods.</em> 6(10):92.
                    <br/><span className="text-green-700">⭐ Comprehensive review of curcumin's anti-inflammatory properties</span>
                  </li>
                  <li>
                    <strong>Sahebkar A, et al.</strong> (2019). "Effect of curcuminoids on oxidative stress." <em>J Funct Foods.</em>
                    <br/><span className="text-green-700">⭐ Meta-analysis showing significant reduction in inflammatory markers</span>
                  </li>
                </ol>
              </div>
            )}

            {/* Traditional Use Tab */}
            {activeTab === 'traditional' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Traditional Chinese Medicine Perspective</h2>
                <p className="text-gray-700 mb-6">
                  In both Ayurvedic and Traditional Chinese Medicine, turmeric is considered a <strong>warming, blood-moving herb</strong> that supports circulation, digestion, and vitality.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-amber-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-amber-900 mb-2">🔥 Energy Properties</h4>
                    <p className="text-gray-700">
                      <strong>Warming herb</strong> with pungent and bitter taste. Moves Qi and Blood.
                    </p>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-orange-900 mb-2">🌊 Meridians</h4>
                    <p className="text-gray-700">
                      Primarily affects <strong>Liver and Spleen meridians</strong>.
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-yellow-900 mb-2">👤 Best Body Type</h4>
                    <p className="text-gray-700">
                      <strong>Qi Stagnation, Blood Stasis, Cold-Womb</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                
                <details className="bg-gray-50 p-6 rounded-xl">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Q: What does turmeric do for the body?
                  </summary>
                  <p className="mt-4 text-gray-700">
                    <strong>Turmeric supports inflammation control, liver detox, gut health, and circulation.</strong> Curcumin downregulates inflammatory pathways, acts as a powerful antioxidant, and modulates gut flora.
                  </p>
                </details>

                <details className="bg-gray-50 p-6 rounded-xl">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Q: How much turmeric can I take a day?
                  </summary>
                  <p className="mt-4 text-gray-700">
                    <strong>Safe dosage:</strong><br/>
                    • Whole turmeric powder: <strong>≤ 3 g/day</strong><br/>
                    • Curcumin extract: <strong>≤ 1,000 mg/day</strong>
                  </p>
                </details>

                <details className="bg-gray-50 p-6 rounded-xl">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Q: Is turmeric bad for your liver?
                  </summary>
                  <p className="mt-4 text-gray-700">
                    <strong>In rare cases, yes</strong> — high-dose curcumin supplements have triggered liver enzyme rises. Monitor liver function if using &gt;1,000mg curcumin daily for extended periods.
                  </p>
                </details>
              </div>
            )}
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

