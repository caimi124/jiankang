import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Shield, AlertTriangle, CheckCircle, Info, Heart, Droplets, Thermometer } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Clove (丁香) - Complete Herbal Guide | HerbScience.shop',
  description: 'Comprehensive guide to Clove (Syzygium aromaticum) - powerful aromatic spice for digestion, oral health, inflammation, and men\'s health.',
  keywords: 'clove, 丁香, Syzygium aromaticum, digestion, oral health, inflammation, men\'s health, antibacterial',
}

export default function ClovePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-brown-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-700 via-brown-600 to-orange-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Thermometer className="w-8 h-8 text-amber-200" />
                <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm font-medium">
                  Aromatic Spices
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-4">
                Clove <span className="text-amber-200">(丁香)</span>
              </h1>
              <p className="text-xl text-amber-100 mb-2">
                <em>Syzygium aromaticum</em>
              </p>
              <p className="text-lg leading-relaxed mb-8">
                A powerful aromatic spice with a long history in both culinary and medicinal traditions. 
                Native to Indonesia, clove buds are used to relieve digestive discomfort, freshen breath, 
                ease pain, and support men's reproductive health through warming stomach energy.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">消化支持</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">Oral Health</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">男性健康</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">Antibacterial</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="w-full h-full bg-gradient-to-br from-amber-300 to-brown-500 rounded-2xl flex items-center justify-center">
                  <Thermometer className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Constitution Match */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">Constitutional Match</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Recommended For (阳虚质)
              </h3>
              <p className="text-green-800 mb-4">
                Perfect for people with yang deficiency, cold stomach, poor digestion, and weak circulation 
                who need warming and stimulating support.
              </p>
              <ul className="space-y-2 text-green-700">
                <li>• Yang deficiency constitution</li>
                <li>• Cold stomach conditions</li>
                <li>• Poor digestion</li>
                <li>• Weak circulation</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Not Recommended For
              </h3>
              <p className="text-red-800 mb-4">
                Avoid if you have yin deficiency, internal heat, or high blood pressure conditions.
              </p>
              <ul className="space-y-2 text-red-700">
                <li>• Yin deficiency constitution</li>
                <li>• Internal heat conditions</li>
                <li>• High blood pressure</li>
                <li>• Acid reflux or stomach ulcers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Oral Health & Fresh Breath</h3>
                  <p className="text-gray-600">Relieves toothaches, freshens breath, and kills bacteria in the mouth with powerful antiseptic properties.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Digestive Support</h3>
                  <p className="text-gray-600">Settles upset stomach, reduces bloating, stimulates appetite, and soothes cold-type abdominal pain.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Anti-Inflammatory Action</h3>
                  <p className="text-gray-600">Reduces inflammation in arthritis, headaches, and injury-related swelling through COX-2 inhibition.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Thermometer className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Men's Reproductive Health</h3>
                  <p className="text-gray-600">Traditionally supports low libido, impotence, and cold-type infertility through kidney yang warming.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Compounds</h2>
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-2">Eugenol</h3>
                <p className="text-amber-800 text-sm">Primary bioactive compound with strong antiseptic and analgesic effects</p>
              </div>
              <div className="bg-brown-50 rounded-xl p-4 border border-brown-200">
                <h3 className="font-semibold text-brown-900 mb-2">Tannins</h3>
                <p className="text-brown-800 text-sm">Help tighten tissues and reduce inflammation</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Flavonoids</h3>
                <p className="text-green-800 text-sm">Contribute to antioxidant capacity and cellular protection</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h3 className="font-semibold text-orange-900 mb-2">Volatile Oils</h3>
                <p className="text-orange-800 text-sm">Provide aromatic and antimicrobial properties</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dosage Guide */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">Dosage Guide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Whole Cloves (Tea)</h3>
              <p className="text-2xl font-bold text-blue-800 mb-2">1-3g</p>
              <p className="text-blue-700 text-sm">per day</p>
              <p className="text-blue-600 text-xs mt-2">Steep with black or red tea</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-3">Clove Powder</h3>
              <p className="text-2xl font-bold text-amber-800 mb-2">0.5-1g</p>
              <p className="text-amber-700 text-sm">per day</p>
              <p className="text-amber-600 text-xs mt-2">Mix with warm beverages</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="font-semibold text-red-900 mb-3">Clove Oil (External)</h3>
              <p className="text-2xl font-bold text-red-800 mb-2">1-2 drops</p>
              <p className="text-red-700 text-sm">diluted</p>
              <p className="text-red-600 text-xs mt-2">1:5 with carrier oil</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-yellow-800 text-sm">
              <strong>Duration:</strong> Maximum 2 weeks of daily therapeutic use, then pause. Culinary amounts are safe for regular use.
            </p>
          </div>
        </div>

        {/* Clinical Evidence */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Clinical Evidence</h2>
          <div className="space-y-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">Oral Health Research (2022)</h3>
              <p className="text-green-800 text-sm">
                A randomized trial found clove mouthwash significantly reduced halitosis and oral bacteria 
                in patients with gingivitis compared to conventional mouthwash.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Antimicrobial Studies</h3>
              <p className="text-blue-800 text-sm">
                In vitro studies confirm eugenol's antimicrobial effect against Streptococcus mutans 
                and Candida albicans, key pathogens in oral infections.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">Anti-Inflammatory Research (2021)</h3>
              <p className="text-purple-800 text-sm">
                Meta-analysis highlighted clove's anti-ulcer and anti-inflammatory actions 
                via modulation of gastric enzymes and prostaglandins.
              </p>
            </div>
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Case Study</h2>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Patient</h3>
                <p className="text-gray-700 text-sm">Female, 32, frequent bloating, nausea after cold drinks, and chronic bad breath</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Treatment</h3>
                <p className="text-gray-700 text-sm">Clove and ginger tea twice daily before meals + clove mouth rinse once daily</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Result</h3>
                <p className="text-gray-700 text-sm">Improved appetite, reduced bloating, halitosis resolved within 2 weeks. No side effects</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-green-800 text-sm">
                <strong>Doctor's Note:</strong> Warm-natured herbs like clove can be highly effective 
                in cases of cold-related indigestion and bacterial overgrowth when used short-term under guidance.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Is clove safe for daily use?</h3>
              <p className="text-gray-700 text-sm">
                Small culinary amounts are safe for daily use. Therapeutic doses (like clove oil) 
                should not be used long-term without healthcare supervision.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Can I use clove oil for gum pain?</h3>
              <p className="text-gray-700 text-sm">
                Yes, but always dilute it (1:5 with carrier oil) and avoid direct contact with sensitive tissue. 
                Apply with a cotton ball to the affected area.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Does clove help with bad breath?</h3>
              <p className="text-gray-700 text-sm">
                Yes, its antimicrobial and aromatic compounds make it a powerful breath freshener. 
                Clove tea or diluted clove mouthwash can be very effective.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can clove help with fertility?</h3>
              <p className="text-gray-700 text-sm">
                Traditionally yes, especially in men with cold-type sexual weakness. 
                Modern evidence is limited but promising for reproductive health support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-center">
          <Link 
            href="/herb-finder" 
            className="bg-gradient-to-r from-amber-700 to-brown-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-800 hover:to-brown-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ← Back to Herb Finder
          </Link>
        </div>
      </div>
    </div>
  )
} 