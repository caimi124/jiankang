'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import SmartSearch from '../../components/SmartSearch'

export default function KnowledgeCenter() {
  const [activeTab, setActiveTab] = useState('faq')
  const [searchTerm, setSearchTerm] = useState('')

  const faqCategories = [
    {
      title: "Safety & Interactions",
      questions: [
        {
          q: "Are herbal supplements safe to take with prescription medications?",
          a: "Some herbs can interact with medications. Always consult your healthcare provider before combining herbs with prescription drugs. Our safety checker tool identifies potential interactions."
        },
        {
          q: "Do herbal supplements have side effects?",
          a: "Yes, herbs can have side effects. Common ones include digestive upset, allergic reactions, and interactions with medications. We provide detailed side effect profiles for each herb."
        },
        {
          q: "Who should avoid herbal supplements?",
          a: "Pregnant women, nursing mothers, children, and people with chronic conditions should be especially cautious. Always consult healthcare providers before use."
        }
      ]
    },
    {
      title: "FDA & Regulation",
      questions: [
        {
          q: "Are herbal supplements approved by the FDA?",
          a: "Most herbal supplements are regulated as dietary supplements, not drugs. The FDA doesn't approve them for safety and effectiveness before marketing, but they do regulate manufacturing and labeling."
        },
        {
          q: "Are herbal supplements considered drugs?",
          a: "No, in the US, herbal supplements are classified as dietary supplements unless they make drug claims. They cannot claim to diagnose, treat, cure, or prevent diseases."
        },
        {
          q: "How can I verify if a supplement is legitimate?",
          a: "Look for third-party testing, GMP certification, and avoid products making unrealistic health claims. Check our safety guidelines for more tips."
        }
      ]
    },
    {
      title: "Effectiveness & Evidence",
      questions: [
        {
          q: "Do herbal supplements really work?",
          a: "Some herbs have strong scientific evidence, others have traditional use but limited research. We rate each herb's evidence level based on clinical studies and research quality."
        },
        {
          q: "Is there science behind herbalism?",
          a: "Yes, many herbs contain active compounds that have been studied scientifically. However, evidence quality varies greatly between different herbs and conditions."
        },
        {
          q: "How long does it take for herbs to work?",
          a: "This varies by herb and condition. Some effects may be felt within days, others may take weeks or months. We provide typical timeframes for each herb in our database."
        }
      ]
    }
  ]

  const herbCategories = [
    {
      name: "Stress & Anxiety",
      herbs: [
        { name: "Ashwagandha", latin: "Withania somnifera", evidence: "Strong", uses: "Stress, anxiety, cortisol reduction" },
        { name: "Reishi Mushroom", latin: "Ganoderma lucidum", evidence: "Moderate", uses: "Stress, sleep, immune support" },
        { name: "L-theanine", latin: "From Camellia sinensis", evidence: "Strong", uses: "Anxiety, focus, relaxation" }
      ]
    },
    {
      name: "Sleep & Insomnia",
      herbs: [
        { name: "Valerian Root", latin: "Valeriana officinalis", evidence: "Moderate", uses: "Insomnia, sleep quality" },
        { name: "Passionflower", latin: "Passiflora incarnata", evidence: "Limited", uses: "Anxiety, sleep disorders" },
        { name: "Melatonin", latin: "Naturally occurring hormone", evidence: "Strong", uses: "Sleep regulation, jet lag" }
      ]
    },
    {
      name: "Digestive Health",
      herbs: [
        { name: "Ginger", latin: "Zingiber officinale", evidence: "Strong", uses: "Nausea, digestive upset" },
        { name: "Peppermint", latin: "Mentha piperita", evidence: "Strong", uses: "IBS, digestive comfort" },
        { name: "Turmeric", latin: "Curcuma longa", evidence: "Strong", uses: "Inflammation, digestive health" }
      ]
    }
  ]

  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Knowledge Center' }
        ]} 
      />

      <main className="bg-white min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              📖 Herbal Knowledge Center
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Science-backed answers to all your herbal supplement questions. From safety to effectiveness, we've got you covered.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SmartSearch 
                placeholder="Search herbs, conditions, safety info, or research..."
                onSearch={(query, filters) => {
                  setSearchTerm(query)
                  // Handle filtered search results
                }}
              />
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-8 px-6 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { id: 'faq', label: '❓ FAQ', desc: 'Common Questions' },
                { id: 'herbs', label: '🌿 Herb Database', desc: 'Browse by Category' },
                { id: 'safety', label: '🛡️ Safety Guide', desc: 'Usage Guidelines' },
                { id: 'research', label: '🔬 Research', desc: 'Scientific Evidence' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-2xl text-center transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <div className="font-semibold">{tab.label}</div>
                  <div className="text-sm opacity-80">{tab.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* FAQ Section */}
            {activeTab === 'faq' && (
              <div>
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-8">
                  {faqCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="bg-white rounded-3xl shadow-lg p-8">
                      <h3 className="text-2xl font-bold mb-6 text-purple-600">{category.title}</h3>
                      <div className="space-y-6">
                        {category.questions.map((item, index) => (
                          <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                            <h4 className="text-lg font-semibold mb-3 text-gray-900">{item.q}</h4>
                            <p className="text-gray-700 leading-relaxed">{item.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Herb Database Section */}
            {activeTab === 'herbs' && (
              <div>
                <h2 className="text-3xl font-bold text-center mb-12">Herb Database by Category</h2>
                <div className="space-y-8">
                  {herbCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="bg-white rounded-3xl shadow-lg p-8">
                      <h3 className="text-2xl font-bold mb-6 text-green-600">{category.name}</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.herbs.map((herb, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                            <h4 className="text-lg font-bold mb-2">{herb.name}</h4>
                            <p className="text-sm text-gray-600 italic mb-3">{herb.latin}</p>
                            <div className="mb-3">
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                herb.evidence === 'Strong' ? 'bg-green-100 text-green-800' :
                                herb.evidence === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {herb.evidence} Evidence
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">{herb.uses}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety Guide Section */}
            {activeTab === 'safety' && (
              <div>
                <h2 className="text-3xl font-bold text-center mb-12">Herbal Safety Guidelines</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-red-50 border border-red-200 p-8 rounded-3xl">
                    <h3 className="text-2xl font-bold mb-6 text-red-600">⚠️ Important Warnings</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li>• Always consult healthcare providers before starting herbs</li>
                      <li>• Inform your doctor about all supplements you take</li>
                      <li>• Stop use if you experience adverse reactions</li>
                      <li>• Be extra cautious during pregnancy and breastfeeding</li>
                      <li>• Check for drug interactions before combining with medications</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-8 rounded-3xl">
                    <h3 className="text-2xl font-bold mb-6 text-green-600">✅ Best Practices</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li>• Start with the lowest recommended dose</li>
                      <li>• Keep a health diary to track effects</li>
                      <li>• Buy from reputable, third-party tested sources</li>
                      <li>• Follow dosage instructions carefully</li>
                      <li>• Give herbs adequate time to work (usually 2-8 weeks)</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-12 bg-blue-50 p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-6 text-blue-600">🚨 When to Stop and Seek Help</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Allergic Reactions</h4>
                      <p className="text-sm text-gray-700">Rash, itching, swelling, difficulty breathing</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Severe Side Effects</h4>
                      <p className="text-sm text-gray-700">Persistent nausea, liver problems, severe headaches</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Drug Interactions</h4>
                      <p className="text-sm text-gray-700">Changes in medication effectiveness, unexpected symptoms</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Research Section */}
            {activeTab === 'research' && (
              <div>
                <h2 className="text-3xl font-bold text-center mb-12">Scientific Research & Evidence</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-8 rounded-3xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">🔬 How We Rate Evidence</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">Strong</span>
                        <span className="text-gray-700 text-sm">Multiple high-quality clinical trials</span>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mr-3">Moderate</span>
                        <span className="text-gray-700 text-sm">Some clinical evidence, traditional use</span>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium mr-3">Limited</span>
                        <span className="text-gray-700 text-sm">Preliminary studies, traditional use only</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">📊 Research Sources</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• PubMed/MEDLINE databases</li>
                      <li>• Cochrane systematic reviews</li>
                      <li>• Clinical trial registries</li>
                      <li>• Traditional medicine literature</li>
                      <li>• FDA safety databases</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-6 text-center">Understanding Research Quality</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl mb-3">🏆</div>
                      <h4 className="font-semibold mb-2">Gold Standard</h4>
                      <p className="text-sm text-gray-600">Randomized controlled trials (RCTs)</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">🥈</div>
                      <h4 className="font-semibold mb-2">Good Evidence</h4>
                      <p className="text-sm text-gray-600">Cohort studies, case-control studies</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">🥉</div>
                      <h4 className="font-semibold mb-2">Preliminary</h4>
                      <p className="text-sm text-gray-600">Laboratory studies, animal studies</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">📚</div>
                      <h4 className="font-semibold mb-2">Traditional</h4>
                      <p className="text-sm text-gray-600">Historical use, anecdotal reports</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 bg-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl mb-8 opacity-90">
              Use our personalized tools to get specific recommendations for your health goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/herb-finder"
                className="bg-white text-purple-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-2xl text-lg transition-colors"
              >
                Find Herbs by Symptom
              </a>
              <a 
                href="/ingredient-checker"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200"
              >
                Check Herb Safety
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 