import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Shield, AlertTriangle, CheckCircle, Info, Heart, Droplets, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pumpkin Seed (南瓜子) - Complete Herbal Guide | HerbScience.shop',
  description: 'Comprehensive guide to Pumpkin Seed (Cucurbita pepo) - nutrient-packed superfood for prostate health, hormonal balance, heart health, and anti-parasitic support.',
  keywords: 'pumpkin seed, 南瓜子, Cucurbita pepo, prostate health, hormonal balance, heart health, anti-parasitic',
}

export default function PumpkinSeedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-yellow-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-green-200" />
                <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm font-medium">
                  Superfood Seeds
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-4">
                Pumpkin Seed <span className="text-green-200">(南瓜子)</span>
              </h1>
              <p className="text-xl text-green-100 mb-2">
                <em>Cucurbita pepo</em>
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Nutrient-packed edible seeds valued in both culinary and medicinal traditions. 
                Rich in zinc, phytosterols, and essential fatty acids, offering comprehensive 
                support for prostate health, hormonal balance, and anti-parasitic benefits.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">前列腺健康</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">Hormonal Balance</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">心脏健康</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">Anti-Parasitic</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="w-full h-full bg-gradient-to-br from-green-300 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-32 h-32 text-white" />
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
            <Users className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">Constitutional Match</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Recommended For (气虚质/肾阳虚)
              </h3>
              <p className="text-green-800 mb-4">
                Perfect for people with fatigue, hormonal imbalances, frequent urination, 
                or signs of kidney yang deficiency requiring tonification.
              </p>
              <ul className="space-y-2 text-green-700">
                <li>• Qi deficiency constitution</li>
                <li>• Kidney yang deficiency</li>
                <li>• Blood deficiency types</li>
                <li>• Spleen deficiency</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Not Recommended For
              </h3>
              <p className="text-red-800 mb-4">
                Avoid if you have excess dampness, bloating, or loose stools.
              </p>
              <ul className="space-y-2 text-red-700">
                <li>• Damp-heat constitution</li>
                <li>• Loose stools/weak digestion</li>
                <li>• Digestive stagnation</li>
                <li>• Nut/seed allergies</li>
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
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prostate & Men's Health</h3>
                  <p className="text-gray-600">Supports prostate health, helps manage BPH, improves male fertility and reduces hair loss.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Women's Hormonal Support</h3>
                  <p className="text-gray-600">Eases menopause symptoms like hot flashes and mood swings through phytosterol content.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Anti-Parasitic Action</h3>
                  <p className="text-gray-600">Cucurbitin paralyzes intestinal worms including hookworms and tapeworms for natural deworming.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cardiovascular Health</h3>
                  <p className="text-gray-600">Magnesium and unsaturated fats promote healthy blood pressure and cholesterol levels.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Compounds</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Phytosterols (Beta-sitosterol)</h3>
                <p className="text-blue-800 text-sm">Inhibits 5-alpha-reductase for prostate and hair health</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Zinc</h3>
                <p className="text-green-800 text-sm">Essential mineral for immune function and hormone production</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h3 className="font-semibold text-orange-900 mb-2">Cucurbitin</h3>
                <p className="text-orange-800 text-sm">Amino acid that paralyzes intestinal parasites</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2">Tryptophan</h3>
                <p className="text-purple-800 text-sm">Supports melatonin production for better sleep</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">Vitamin E & Selenium</h3>
                <p className="text-yellow-800 text-sm">Powerful antioxidants that protect cells from damage</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">General Health</h3>
              <p className="text-2xl font-bold text-blue-800 mb-2">10-30g</p>
              <p className="text-blue-700 text-sm">per day</p>
              <p className="text-blue-600 text-xs mt-2">1-2 handfuls daily</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="font-semibold text-red-900 mb-3">Parasite Cleanse</h3>
              <p className="text-2xl font-bold text-red-800 mb-2">30-50g</p>
              <p className="text-red-700 text-sm">per day</p>
              <p className="text-red-600 text-xs mt-2">7-10 days</p>
            </div>
            <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200">
              <h3 className="font-semibold text-pink-900 mb-3">Menopause Support</h3>
              <p className="text-2xl font-bold text-pink-800 mb-2">20-30g</p>
              <p className="text-pink-700 text-sm">per day</p>
              <p className="text-pink-600 text-xs mt-2">Or 1 tbsp seed oil</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">Children (Deworming)</h3>
              <p className="text-2xl font-bold text-green-800 mb-2">1 tsp</p>
              <p className="text-green-700 text-sm">ground seeds</p>
              <p className="text-green-600 text-xs mt-2">With honey/porridge</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-yellow-800 text-sm">
              <strong>Best Practice:</strong> Consume raw or lightly roasted to preserve nutrients. Take on empty stomach for anti-parasitic effects.
            </p>
          </div>
        </div>

        {/* Clinical Evidence */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Clinical Evidence</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Prostate Health Study</h3>
              <p className="text-blue-800 text-sm">
                Daily pumpkin seed oil significantly reduced urinary symptoms in men with BPH, 
                showing improvement in quality of life scores.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">Hair Loss Research</h3>
              <p className="text-green-800 text-sm">
                6-month trial showed 40% hair regrowth in men with androgenic alopecia 
                taking pumpkin seed extract daily.
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
              <h3 className="font-semibold text-pink-900 mb-3">Menopause Support</h3>
              <p className="text-pink-800 text-sm">
                Postmenopausal women taking pumpkin seed oil showed improved HDL cholesterol 
                and reduced hot flash frequency.
              </p>
            </div>
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Case Study</h2>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Pediatric Hookworm Infection</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Patient</h4>
                <p className="text-gray-700 text-sm">Female, 4 years old with severe hookworm infection, fatigue, poor appetite, and developmental delay</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Treatment</h4>
                <p className="text-gray-700 text-sm">Raw pumpkin seeds 90-150g/day in 3 divided doses before meals for 4 weeks</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Results</h4>
                <p className="text-gray-700 text-sm">Complete resolution of symptoms within 2 weeks, negative stool test at 4 weeks</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-green-800 text-sm">
                <strong>Long-term Follow-up:</strong> At age 7, patient showed normal growth and development. 
                This case highlights the traditional anthelmintic use of pumpkin seeds.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Can pumpkin seeds really help with hair loss?</h3>
              <p className="text-gray-700 text-sm">
                Yes, due to their ability to inhibit the 5-alpha-reductase enzyme and support hormonal balance, 
                they may reduce hair thinning in men with androgenic alopecia.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Is it safe to give pumpkin seeds to children?</h3>
              <p className="text-gray-700 text-sm">
                Yes, in moderate amounts. They're often used in traditional remedies to treat worms in children, 
                but should be supervised by a healthcare provider.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">How do I use pumpkin seeds for parasites?</h3>
              <p className="text-gray-700 text-sm">
                Take 30-50g of ground raw seeds daily on an empty stomach for about a week. 
                Combine with honey or take before a mild laxative for best results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can women take pumpkin seeds for hormone support?</h3>
              <p className="text-gray-700 text-sm">
                Absolutely. The phytosterols can help relieve menopause symptoms like hot flashes and mood swings.
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
            className="bg-gradient-to-r from-green-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ← Back to Herb Finder
          </Link>
        </div>
      </div>
    </div>
  )
} 