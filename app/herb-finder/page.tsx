import { Metadata } from 'next'
import HerbFinderClient from './HerbFinderClient'

export const metadata: Metadata = {
  title: "Herbal Remedy Database | Symptom-Based Herb Finder - HerbScience.shop",
  description: "Discover natural remedies with our intelligent herb finder. Search 500+ herbs by symptoms, conditions, or constitution type. Evidence-based recommendations backed by Traditional Chinese Medicine and modern research.",
  keywords: [
    "herb finder", "herbal remedies", "natural medicine database", "symptom matcher", 
    "TCM herbs", "traditional Chinese medicine", "herbal supplements", "natural health",
    "herb search", "plant medicine", "alternative medicine", "holistic health",
    "herbal treatment", "botanical medicine", "medicinal herbs", "herb recommendations"
  ],
  authors: [{ name: 'HerbScience Team' }],
  openGraph: {
    title: "Herbal Remedy Database | Find Natural Solutions - HerbScience.shop",
    description: "Search our comprehensive database of 500+ herbs to find natural remedies for your health concerns. Evidence-based guidance from Traditional Chinese Medicine experts.",
    type: 'website',
    url: 'https://www.herbscience.shop/herb-finder',
    siteName: 'HerbScience.shop',
    images: [
      {
        url: '/hero-bg.svg',
        width: 1200,
        height: 630,
        alt: 'HerbScience Herb Finder - Natural Remedy Database'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Herbal Remedy Database | Find Natural Solutions",
    description: "Search our comprehensive database of 500+ herbs to find natural remedies for your health concerns.",
    images: ['/hero-bg.svg']
  },
  alternates: {
    canonical: 'https://www.herbscience.shop/herb-finder',
    languages: {
      'en': 'https://www.herbscience.shop/herb-finder',
      'zh': 'https://www.herbscience.shop/zh/herb-finder',
    },
  },
}

export default function HerbFinderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* SEO结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Herb Finder - Natural Remedy Database',
            url: 'https://herbscience.shop/herb-finder',
            description: 'Comprehensive herbal medicine database for finding natural remedies by symptoms, conditions, or constitution type.',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            featureList: [
              'Symptom-based herb search',
              'Safety analysis and interactions',
              'Traditional usage patterns',
              'Dosage recommendations',
              'Constitution-based matching'
            ],
            provider: {
              '@type': 'Organization',
              name: 'HerbScience.shop'
            }
          })
        }}
      />
      
      {/* SEO Content Header */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Herbal Remedy Database
              <span className="block text-green-600">Find Natural Solutions for Your Health</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover evidence-based herbal remedies from our comprehensive database of 500+ medicinal herbs. 
              Search by symptoms, health conditions, or Traditional Chinese Medicine constitution type to find 
              natural solutions backed by centuries of traditional wisdom and modern scientific research.
            </p>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Search by Symptoms</h3>
              <p className="text-gray-600">Enter your health concerns or symptoms to discover herbs that have been traditionally used for similar conditions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Safety Analysis</h3>
              <p className="text-gray-600">Get detailed safety information including potential interactions, contraindications, and appropriate dosages.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personalized Results</h3>
              <p className="text-gray-600">Receive recommendations tailored to your TCM constitution and individual health profile for optimal results.</p>
            </div>
          </div>

          {/* Popular Search Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Popular Health Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: "Sleep & Insomnia", icon: "😴", herbs: "Valerian, Chamomile, Passionflower" },
                { name: "Stress & Anxiety", icon: "🧘", herbs: "Ashwagandha, Rhodiola, L-theanine" },
                { name: "Digestive Health", icon: "🌿", herbs: "Ginger, Turmeric, Fennel" },
                { name: "Immune Support", icon: "🛡️", herbs: "Echinacea, Elderberry, Astragalus" },
                { name: "Energy & Fatigue", icon: "⚡", herbs: "Ginseng, Cordyceps, Schisandra" },
                { name: "Women's Health", icon: "🌸", herbs: "Dong Quai, Red Clover, Vitex" }
              ].map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2 text-center">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-sm text-center mb-2">{category.name}</h3>
                  <p className="text-xs text-gray-600 text-center">{category.herbs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence-Based Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔬 Evidence-Based Recommendations</h3>
              <p className="text-gray-600 mb-4">
                Every herb in our database is backed by peer-reviewed research and traditional usage patterns. 
                We combine ancient wisdom from Traditional Chinese Medicine with modern scientific validation 
                to provide you with reliable, safe, and effective herbal guidance.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Over 2,000 scientific studies referenced</li>
                <li>• Traditional usage patterns documented</li>
                <li>• Safety profiles regularly updated</li>
                <li>• Interaction warnings included</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🌱 Traditional Chinese Medicine Integration</h3>
              <p className="text-gray-600 mb-4">
                Our recommendations consider TCM principles including constitution types, organ systems, 
                and energy patterns. This holistic approach ensures that herb recommendations align with 
                your individual body type and health patterns for optimal therapeutic results.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Constitution-based matching</li>
                <li>• Organ system considerations</li>
                <li>• Energy pattern analysis</li>
                <li>• Synergistic herb combinations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Herb Finder Component */}
      <HerbFinderClient />

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How does the Herb Finder work?</h3>
              <p className="text-gray-600 leading-relaxed">
                Our Herb Finder uses an intelligent matching system that combines symptom keywords with Traditional Chinese Medicine principles. 
                Simply enter your health concerns, and our database will suggest herbs based on traditional usage patterns, 
                modern research, and your constitution type if known.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Are the herb recommendations safe?</h3>
              <p className="text-gray-600 leading-relaxed">
                Each herb comes with detailed safety information including potential interactions, contraindications, 
                and appropriate dosages. However, we always recommend consulting with qualified healthcare providers 
                before starting any herbal regimen, especially if you have existing conditions or take medications.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What makes your database different?</h3>
              <p className="text-gray-600 leading-relaxed">
                Our database uniquely combines Traditional Chinese Medicine wisdom with modern scientific research. 
                Each herb entry includes traditional usage patterns, constitution matching, modern studies, 
                safety profiles, and quality sourcing information - providing a comprehensive view you won't find elsewhere.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I search for specific herbs or just symptoms?</h3>
              <p className="text-gray-600 leading-relaxed">
                You can search both ways! Enter specific herb names to learn about their properties, or describe your symptoms 
                to discover which herbs might help. Our search system understands both common names and Latin botanical names, 
                plus it recognizes health conditions and symptom descriptions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 