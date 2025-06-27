import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Shield, AlertTriangle, CheckCircle, Info, Thermometer, Droplets, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cinnamon (肉桂) - Complete Herbal Guide | HerbScience.shop',
  description: 'Comprehensive guide to Cinnamon (Cinnamomum cassia) - warming herb for blood sugar support, circulation, pain relief, and women\'s health. Traditional uses, dosage, and safety information.',
  keywords: 'cinnamon, 肉桂, Cinnamomum cassia, blood sugar, circulation, pain relief, women\'s health, warming herbs, TCM, traditional chinese medicine',
  openGraph: {
    title: 'Cinnamon (肉桂) - Complete Herbal Guide',
    description: 'Warming herb for blood sugar support, circulation, and pain relief. Complete guide with dosage, safety, and traditional uses.',
    type: 'article',
    images: [
      {
        url: '/herbs/cinnamon-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Cinnamon herbs and sticks',
      },
    ],
  },
}

export default function CinnamonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Thermometer className="w-8 h-8 text-amber-200" />
                <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm font-medium">
                  Warming Herbs
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-4">
                Cinnamon <span className="text-amber-200">(肉桂)</span>
              </h1>
              <p className="text-xl text-amber-100 mb-2">
                <em>Cinnamomum cassia</em>
              </p>
              <p className="text-lg leading-relaxed mb-8">
                A time-tested warming herb used across cultures to improve blood circulation, 
                regulate blood sugar, and support menstrual comfort. Valued in TCM for its ability 
                to "warm the yang" and dispel internal cold.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">血糖支持</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">Pain Relief</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">女性健康</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">Circulation</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="w-full h-full bg-gradient-to-br from-amber-300 to-orange-500 rounded-2xl flex items-center justify-center">
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
                Perfect for people who feel cold easily, have poor circulation, fatigue, 
                or digestive issues triggered by cold environments.
              </p>
              <ul className="space-y-2 text-green-700">
                <li>• Yang-deficient constitution</li>
                <li>• Cold-prone individuals</li>
                <li>• Qi-deficient types</li>
                <li>• Winter recovery</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Not Recommended For
              </h3>
              <p className="text-red-800 mb-4">
                Avoid if you have heat signs like red eyes, night sweats, 
                or skin flare-ups.
              </p>
              <ul className="space-y-2 text-red-700">
                <li>• Heat-excess constitution</li>
                <li>• Yin-deficient types</li>
                <li>• Yang-excess conditions</li>
                <li>• Pregnancy</li>
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
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Blood Sugar Support</h3>
                  <p className="text-gray-600">Improves insulin sensitivity and glucose metabolism for prediabetic and diabetic individuals.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Circulation & Warmth</h3>
                  <p className="text-gray-600">Enhances peripheral circulation, warming cold limbs and improving metabolic energy.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Pain Relief</h3>
                  <p className="text-gray-600">Especially effective for cold-type joint stiffness, back pain, and menstrual cramps.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Thermometer className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Digestive Health</h3>
                  <p className="text-gray-600">Stimulates gastric secretions and improves sluggish digestion caused by internal cold.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Compounds</h2>
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-2">Cinnamaldehyde</h3>
                <p className="text-amber-800 text-sm">Powerful anti-inflammatory and insulin-sensitizing compound</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h3 className="font-semibold text-orange-900 mb-2">Cinnamic Acid</h3>
                <p className="text-orange-800 text-sm">Antioxidant that enhances blood flow and metabolism</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-semibold text-red-900 mb-2">Polyphenols</h3>
                <p className="text-red-800 text-sm">Improve glucose metabolism and reduce oxidative stress</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">Essential Oils</h3>
                <p className="text-yellow-800 text-sm">Stimulate circulation and enhance digestion</p>
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
              <h3 className="font-semibold text-blue-900 mb-3">Cinnamon Bark Tea</h3>
              <p className="text-2xl font-bold text-blue-800 mb-2">1.5-3g</p>
              <p className="text-blue-700 text-sm">per day</p>
              <p className="text-blue-600 text-xs mt-2">Steep in hot water with honey</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-3">Cinnamon Powder</h3>
              <p className="text-2xl font-bold text-amber-800 mb-2">0.5-1g</p>
              <p className="text-amber-700 text-sm">per day</p>
              <p className="text-amber-600 text-xs mt-2">Mix with warm beverages</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">Capsules/Tincture</h3>
              <p className="text-2xl font-bold text-green-800 mb-2">250-500mg</p>
              <p className="text-green-700 text-sm">per day</p>
              <p className="text-green-600 text-xs mt-2">Follow product label</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-yellow-800 text-sm">
              <strong>Duration:</strong> 7-14 days per cycle. Avoid continuous long-term use without breaks.
            </p>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-semibold text-red-900 mb-2">Pain Relief Blend</h3>
                <p className="text-red-800 text-sm">Mix cinnamon powder with ginger tea for joint or back pain during cold weather</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                <h3 className="font-semibold text-pink-900 mb-2">Menstrual Support</h3>
                <p className="text-pink-800 text-sm">Boil cinnamon with rose and brown sugar; drink before your period to ease cramps</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-2">Daily Tea</h3>
                <p className="text-amber-800 text-sm">Steep 1-2g of cinnamon stick in hot water with honey for a metabolic boost</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Warming Foot Soak</h3>
                <p className="text-blue-800 text-sm">Cinnamon boiled with ginger makes a warming foot bath for cold feet and fatigue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Information */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">Safety Information</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">⚠️ Contraindications</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <span>Not suitable for hot-type conditions (mouth ulcers, dry throat, acne)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <span>Avoid during pregnancy due to stimulating uterine contractions</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <span>Not recommended for heavy menstruation or bleeding disorders</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <span>High doses may cause dizziness, dry mouth, or liver strain</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">✅ Safety Level: Medium</h3>
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 mb-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Drug Interactions:</strong> Avoid with anticoagulant medications. 
                  Monitor liver function with high-dose long-term use.
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-blue-800 text-sm">
                  <strong>Best Practice:</strong> Use in therapeutic cycles of 7-14 days with breaks between cycles. 
                  Always consult healthcare providers for blood sugar management.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Evidence */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Clinical Evidence</h2>
          <div className="space-y-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">Blood Sugar Research (2021)</h3>
              <p className="text-green-800 text-sm">
                A meta-analysis found cinnamon significantly improved fasting blood glucose and insulin sensitivity 
                in patients with type 2 diabetes.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Anti-inflammatory Studies</h3>
              <p className="text-blue-800 text-sm">
                Inflammation markers (CRP, IL-6) were reduced in patients taking 1-2 grams daily for 8 weeks.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">Traditional Formulas</h3>
              <p className="text-purple-800 text-sm">
                Traditional formulas using cinnamon have shown benefits in women with dysmenorrhea 
                and poor peripheral circulation.
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
                <p className="text-gray-700 text-sm">Male, 42, chronic low back pain for 2 years, worse in winter and after exertion</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Treatment</h3>
                <p className="text-gray-700 text-sm">Cinnamon powder (5g) mixed with warm wine, 3x daily</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Result</h3>
                <p className="text-gray-700 text-sm">Significant pain relief within 3 days. Improved mobility and energy levels</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>Doctor's Note:</strong> For cold-type pain without structural injury, 
                warming herbs like cinnamon offer fast and safe relief when combined with moderate rest and dietary support.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Can I use cinnamon to help with blood sugar?</h3>
              <p className="text-gray-700 text-sm">
                Yes. Cinnamon may support insulin sensitivity—ideal for prediabetic or insulin-resistant individuals. 
                Always consult your doctor first.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Can women use cinnamon during menstruation?</h3>
              <p className="text-gray-700 text-sm">
                Yes, if cramps are related to cold-type pain or delayed periods. Not suitable if bleeding is heavy.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">What kind of cinnamon should I use?</h3>
              <p className="text-gray-700 text-sm">
                Cinnamomum cassia is typically used in Traditional Chinese Medicine. It's more warming than 
                Ceylon cinnamon (C. verum), which is milder and often used in food.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use it daily?</h3>
              <p className="text-gray-700 text-sm">
                For therapeutic use, it's best taken in short cycles (7–14 days) with breaks in between.
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
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ← Back to Herb Finder
          </Link>
        </div>
      </div>
    </div>
  )
} 