import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { ArrowLeft, Clock, User, Calendar, AlertTriangle, Shield, Pill } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Herb-Drug Interactions: Essential Safety Guide | HerbScience',
  description: 'Critical safety information about herbal supplement and prescription drug interactions. Learn which combinations to avoid and how to use herbs safely with medications.',
  keywords: 'herb drug interactions, medication interactions, herbal safety, prescription drugs, supplement safety',
  authors: [{ name: 'Dr. Jennifer Liu, PharmD' }],
  openGraph: {
    title: 'Herb-Drug Interactions: Essential Safety Guide',
    description: 'Essential safety information about common herbal supplements and prescription medications that could interact dangerously.',
    type: 'article',
    url: 'https://www.herbscience.shop/articles/herb-drug-interactions-guide',
    siteName: 'HerbScience',
    images: [{
      url: '/hero-bg.svg',
      width: 1200,
      height: 630,
      alt: 'Herb-Drug Interactions Safety Guide'
    }]
  },
  alternates: {
    canonical: 'https://www.herbscience.shop/articles/herb-drug-interactions-guide'
  }
}

export default function HerbDrugInteractionsGuide() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Herb-Drug Interactions: Essential Safety Guide',
    description: 'Critical safety information about herbal supplement and prescription drug interactions for safe complementary medicine use.',
    author: {
      '@type': 'Person',
      name: 'Dr. Jennifer Liu',
      credentials: 'PharmD, Clinical Pharmacist'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.herbscience.shop/logo.png'
      }
    },
    datePublished: '2024-01-08',
    dateModified: '2024-01-08',
    keywords: 'herb drug interactions, medication safety, herbal medicine',
    url: 'https://www.herbscience.shop/articles/herb-drug-interactions-guide'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Articles', href: '/articles' },
                { label: 'Herb-Drug Interactions Guide', href: '/articles/herb-drug-interactions-guide' }
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
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">Safety</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    January 8, 2024
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    10 min read
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Dr. Jennifer Liu
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Herb-Drug Interactions: What You Need to Know
                </h1>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-red-900 mb-2">Critical Safety Warning</h3>
                      <p className="text-red-800">Always consult your healthcare provider before combining herbal supplements with prescription medications. Some interactions can be life-threatening.</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  While herbal supplements can be valuable additions to your health routine, they can interact dangerously with prescription medications. This comprehensive guide covers the most important herb-drug interactions every patient should know.
                </p>

                <div className="prose prose-lg max-w-none">
                  
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Herb-Drug Interactions</h2>
                  <p className="text-gray-700 mb-6">
                    Herb-drug interactions occur when herbal supplements alter the way prescription medications work in your body. These interactions can increase or decrease drug effectiveness, cause dangerous side effects, or lead to treatment failure.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-red-50 p-6 rounded-xl text-center">
                      <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-red-900 mb-2">Increased Risk</h3>
                      <p className="text-red-800 text-sm">Herbs may enhance drug effects, leading to toxicity</p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-xl text-center">
                      <Shield className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-yellow-900 mb-2">Reduced Effectiveness</h3>
                      <p className="text-yellow-800 text-sm">Herbs may decrease drug absorption or metabolism</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-xl text-center">
                      <Pill className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-purple-900 mb-2">Altered Timing</h3>
                      <p className="text-purple-800 text-sm">Herbs may change how quickly drugs work</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">High-Risk Medication Categories</h2>
                  
                  <div className="space-y-6 mb-8">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h3 className="font-semibold text-red-900 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Blood Thinners (Anticoagulants)
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-red-800 mb-2">Medications:</h4>
                          <ul className="text-red-700 text-sm space-y-1">
                            <li>• Warfarin (Coumadin)</li>
                            <li>• Heparin</li>
                            <li>• Apixaban (Eliquis)</li>
                            <li>• Rivaroxaban (Xarelto)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-800 mb-2">Avoid These Herbs:</h4>
                          <ul className="text-red-700 text-sm space-y-1">
                            <li>• Ginkgo biloba</li>
                            <li>• Garlic (high doses)</li>
                            <li>• Ginger (high doses)</li>
                            <li>• Turmeric/Curcumin (high doses)</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-red-800 text-sm mt-4 bg-red-100 p-3 rounded-lg">
                        <strong>Risk:</strong> Increased bleeding, potentially life-threatening hemorrhage
                      </p>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                      <h3 className="font-semibold text-orange-900 mb-4">Diabetes Medications</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-orange-800 mb-2">Medications:</h4>
                          <ul className="text-orange-700 text-sm space-y-1">
                            <li>• Metformin</li>
                            <li>• Insulin</li>
                            <li>• Glyburide</li>
                            <li>• Glipizide</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-orange-800 mb-2">Monitor with These Herbs:</h4>
                          <ul className="text-orange-700 text-sm space-y-1">
                            <li>• Ginseng</li>
                            <li>• Cinnamon</li>
                            <li>• Fenugreek</li>
                            <li>• Bitter Melon</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-orange-800 text-sm mt-4 bg-orange-100 p-3 rounded-lg">
                        <strong>Risk:</strong> Dangerously low blood sugar (hypoglycemia)
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h3 className="font-semibold text-blue-900 mb-4">Blood Pressure Medications</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-blue-800 mb-2">Medications:</h4>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• ACE inhibitors</li>
                            <li>• Beta blockers</li>
                            <li>• Calcium channel blockers</li>
                            <li>• Diuretics</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800 mb-2">Use Caution with:</h4>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Hawthorn</li>
                            <li>• Garlic</li>
                            <li>• Ginseng</li>
                            <li>• Licorice</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-blue-800 text-sm mt-4 bg-blue-100 p-3 rounded-lg">
                        <strong>Risk:</strong> Dangerous blood pressure changes, cardiac events
                      </p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                      <h3 className="font-semibold text-purple-900 mb-4">Antidepressants & Psychiatric Medications</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-purple-800 mb-2">Medications:</h4>
                          <ul className="text-purple-700 text-sm space-y-1">
                            <li>• SSRIs (Prozac, Zoloft)</li>
                            <li>• MAO inhibitors</li>
                            <li>• Benzodiazepines</li>
                            <li>• Lithium</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-800 mb-2">Dangerous Combinations:</h4>
                          <ul className="text-purple-700 text-sm space-y-1">
                            <li>• St. John's Wort</li>
                            <li>• Kava</li>
                            <li>• Valerian</li>
                            <li>• Passionflower</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-purple-800 text-sm mt-4 bg-purple-100 p-3 rounded-lg">
                        <strong>Risk:</strong> Serotonin syndrome, excessive sedation, mood changes
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Specific Herb Warnings</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">🌿 St. John's Wort</h4>
                      <p className="text-gray-700 text-sm mb-3">One of the most problematic herbs for drug interactions</p>
                      <div className="text-xs text-red-600 bg-red-50 p-3 rounded">
                        <strong>Interactions:</strong> Birth control pills, antidepressants, blood thinners, immunosuppressants, many others
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">🌿 Ginkgo Biloba</h4>
                      <p className="text-gray-700 text-sm mb-3">Significantly increases bleeding risk</p>
                      <div className="text-xs text-red-600 bg-red-50 p-3 rounded">
                        <strong>Interactions:</strong> Blood thinners, NSAIDs, antidepressants, seizure medications
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">🌿 Ginseng</h4>
                      <p className="text-gray-700 text-sm mb-3">Can affect blood sugar and blood pressure</p>
                      <div className="text-xs text-orange-600 bg-orange-50 p-3 rounded">
                        <strong>Interactions:</strong> Diabetes medications, blood pressure drugs, blood thinners
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">🌿 Kava</h4>
                      <p className="text-gray-700 text-sm mb-3">Liver toxicity and sedation concerns</p>
                      <div className="text-xs text-red-600 bg-red-50 p-3 rounded">
                        <strong>Interactions:</strong> Sedatives, alcohol, liver medications, acetaminophen
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Safe Practices for Combined Use</h2>
                  
                  <div className="bg-green-50 p-6 rounded-xl mb-6">
                    <h3 className="font-semibold text-green-900 mb-4">✅ Safety Checklist</h3>
                    <ul className="text-green-800 space-y-2">
                      <li>• Always inform all healthcare providers about every supplement you take</li>
                      <li>• Bring supplement bottles to medical appointments</li>
                      <li>• Start new herbs one at a time</li>
                      <li>• Monitor for unusual symptoms when starting herbs</li>
                      <li>• Keep a medication and supplement diary</li>
                      <li>• Use a reputable drug interaction checker</li>
                      <li>• Work with a pharmacist familiar with herb-drug interactions</li>
                    </ul>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When to Seek Immediate Help</h2>
                  
                  <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                    <h3 className="font-semibold text-red-900 mb-3">🚨 Emergency Warning Signs</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-red-800 mb-2">Bleeding-Related:</h4>
                        <ul className="text-red-700 text-sm space-y-1">
                          <li>• Unusual bruising</li>
                          <li>• Blood in urine or stool</li>
                          <li>• Severe nosebleeds</li>
                          <li>• Excessive bleeding from cuts</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-800 mb-2">Other Symptoms:</h4>
                        <ul className="text-red-700 text-sm space-y-1">
                          <li>• Severe dizziness or fainting</li>
                          <li>• Rapid heartbeat or palpitations</li>
                          <li>• Severe nausea or vomiting</li>
                          <li>• Confusion or altered mental state</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Working with Healthcare Providers</h2>
                  
                  <div className="bg-blue-50 p-6 rounded-xl mb-6">
                    <h3 className="font-semibold text-blue-900 mb-4">Building Your Healthcare Team</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Primary Care Doctor</h4>
                        <p className="text-blue-700 text-sm">Oversees overall health and medication management</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Pharmacist</h4>
                        <p className="text-blue-700 text-sm">Expert in drug interactions and supplement safety</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Integrative Medicine Specialist</h4>
                        <p className="text-blue-700 text-sm">Trained in both conventional and complementary medicine</p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">How long should I wait between taking herbs and medications?</h4>
                      <p className="text-gray-700 text-sm">Generally 2-4 hours apart, but this varies by specific herb and medication. Always consult your pharmacist for specific timing recommendations.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Are "natural" supplements safer than medications?</h4>
                      <p className="text-gray-700 text-sm">No. Natural doesn't mean safe. Many herbs are potent medicines that can cause serious side effects and interactions just like prescription drugs.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Should I stop all herbs before surgery?</h4>
                      <p className="text-gray-700 text-sm">Most herbs should be discontinued 1-2 weeks before surgery due to bleeding and anesthesia interaction risks. Always inform your surgical team about all supplements.</p>
                    </div>
                  </div>

                </div>

                {/* Related Articles */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Related Safety Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/articles/beginners-herbal-supplement-guide" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-semibold text-gray-900 mb-2">Beginner's Guide to Herbal Supplements</h4>
                      <p className="text-gray-600 text-sm">Learn how to start using herbs safely and effectively.</p>
                    </Link>
                    <Link href="/ingredient-checker" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-semibold text-gray-900 mb-2">Ingredient Safety Checker</h4>
                      <p className="text-gray-600 text-sm">Check your supplements for potential interactions.</p>
                    </Link>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Dr. Jennifer Liu, PharmD</h4>
                      <p className="text-gray-600 text-sm mb-2">Clinical Pharmacist & Drug Safety Specialist</p>
                      <p className="text-gray-700 text-sm">Dr. Liu specializes in herb-drug interactions and has consulted for major healthcare systems on supplement safety protocols. She holds board certifications in pharmacotherapy and geriatric pharmacy.</p>
                    </div>
                  </div>
                </div>

              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  )
} 