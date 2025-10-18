import { Metadata } from 'next'
import Header from '@/components/Header'
import HerbDetailTabUI from '@/components/HerbDetailTabUI'

// SEO优化的元数据
export const metadata: Metadata = {
  title: 'Saw Palmetto: Benefits, Dosage, Side Effects & Reviews | HerbScience',
  description: 'Complete guide to Saw Palmetto: scientific evidence, traditional use, dosage recommendations, safety information, and real user reviews. Evidence-based herbal medicine.',
  keywords: [
    'saw-palmetto',
    'saw-palmetto benefits',
    'saw-palmetto side effects',
    'saw-palmetto dosage',
    'saw-palmetto reviews',
    'what is saw-palmetto',
    'saw-palmetto supplements'
  ],
  openGraph: {
    title: 'Saw Palmetto: Complete Evidence-Based Guide',
    description: 'Scientific benefits, safe dosage, and real user experiences with Saw Palmetto',
    images: ['/images/herbs/saw-palmetto.jpg'],
    type: 'article'
  },
  alternates: {
    canonical: 'https://herbscience.shop/herbs/saw-palmetto'
  }
}

// 结构化数据
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  'name': 'Saw Palmetto Guide',
  'description': 'Complete guide to Saw Palmetto benefits, dosage, and safety',
  'about': {
    '@type': 'Drug',
    'name': 'Saw Palmetto',
    'description': 'Herbal supplement',
    'proprietaryName': 'Saw Palmetto'
  },
  'lastReviewed': new Date().toISOString().split('T')[0]
}

export default function sawpalmettoPage() {
  return (
    <>
      <Header />
      
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <HerbDetailTabUI
        name="Saw Palmetto"
        latinName="Serenoa repens"
        slug="saw-palmetto"
        category="Men's Health"
        properties={['Warming', 'Traditional Use']}
        evidenceLevel="Moderate"
        overview={
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Saw Palmetto?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Saw Palmetto (Serenoa repens) is a traditional herbal medicine with a rich history of use in various healing systems. 
              Modern research has begun to validate many of its traditional applications, revealing its potential for supporting overall health and wellness.
            </p>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🔬 Key Active Compounds</h3>
              <p className="text-gray-700">
                Saw Palmetto contains various bioactive compounds that contribute to its therapeutic properties. 
                Research continues to explore these constituents and their mechanisms of action.
              </p>
            </div>
          </>
        }
        benefits={
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Saw Palmetto Benefits & Uses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900 mb-3">Traditional Uses</h4>
                <p className="text-gray-700">
                  Saw Palmetto has been used traditionally for various health conditions. Modern research is exploring these traditional applications.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 mb-3">Modern Applications</h4>
                <p className="text-gray-700">
                  Contemporary studies are investigating the potential benefits of Saw Palmetto for modern health concerns.
                </p>
              </div>
            </div>
          </>
        }
        safety={
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety & Dosage Guide</h2>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl mb-6">
              <h3 className="text-xl font-semibold mb-4">Recommended Dosage</h3>
              <p className="text-gray-700 mb-4">
                Consult with a qualified healthcare provider for personalized dosage recommendations.
                Typical dosages vary based on the form and intended use.
              </p>
            </div>
            <div className="bg-red-50 border-2 border-red-300 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-red-900 mb-3">⚠️ Safety Considerations</h3>
              <ul className="space-y-2 text-gray-800">
                <li>• Consult a healthcare provider before use, especially if pregnant or breastfeeding</li>
                <li>• May interact with certain medications</li>
                <li>• Follow recommended dosages</li>
                <li>• Discontinue use if adverse reactions occur</li>
              </ul>
            </div>
          </>
        }
        faq={
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <details className="bg-gray-50 p-6 rounded-xl">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Q: What is Saw Palmetto used for?
              </summary>
              <p className="mt-4 text-gray-700">
                Saw Palmetto has been traditionally used for various health purposes. Modern research continues to explore its potential applications.
              </p>
            </details>
          </>
        }
      />
    </>
  )
}
