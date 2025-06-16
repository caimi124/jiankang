'use client'

import { useState } from 'react'

export default function HerbFinderPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSymptom, setSelectedSymptom] = useState('')

  const symptoms = [
    'Anxiety & Stress',
    'Insomnia',
    'Digestive Issues',
    'Low Energy',
    'Joint Pain',
    'High Blood Pressure',
    'Depression',
    'Memory Problems',
    'Skin Conditions',
    'Respiratory Issues'
  ]

  const herbRecommendations: Record<string, Array<{name: string, dosage: string, evidence: string}>> = {
    'Anxiety & Stress': [
      { name: 'Reishi Mushroom', dosage: '500-1000mg daily', evidence: 'Multiple clinical studies' },
      { name: 'Schisandra Berry', dosage: '250-500mg daily', evidence: 'Traditional + modern research' },
      { name: 'Jujube Seed', dosage: '300-600mg daily', evidence: 'TCM classic formula' }
    ],
    'Insomnia': [
      { name: 'Jujube Seed (Suan Zao Ren)', dosage: '500-1000mg daily', evidence: 'Clinical trials' },
      { name: 'Polygala Root', dosage: '200-400mg daily', evidence: 'Traditional use + studies' },
      { name: 'Dragon Bone', dosage: '300-600mg daily', evidence: 'TCM formulas' }
    ]
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            🔍 Symptom-Based Herb Finder
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Find the right herbs for your specific symptoms based on Traditional Chinese Medicine and modern research
          </p>
        </div>
      </section>

      {/* Search Interface */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center">What symptoms would you like to address?</h2>
            
            {/* Search Input */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search symptoms (e.g., anxiety, insomnia, digestion)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-green-500 focus:outline-none"
              />
            </div>

            {/* Symptom Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {symptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => setSelectedSymptom(symptom)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedSymptom === symptom
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>

            {/* Results */}
            {selectedSymptom && herbRecommendations[selectedSymptom] && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold mb-6">Recommended Herbs for {selectedSymptom}:</h3>
                <div className="space-y-4">
                  {herbRecommendations[selectedSymptom].map((herb, index) => (
                    <div key={index} className="bg-green-50 p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-green-800">{herb.name}</h4>
                        <span className="text-sm bg-green-200 text-green-800 px-3 py-1 rounded-full">
                          {herb.evidence}
                        </span>
                      </div>
                      <p className="text-green-700 mb-2">
                        <strong>Recommended Dosage:</strong> {herb.dosage}
                      </p>
                      <p className="text-sm text-green-600">
                        ⚠️ Always consult with a healthcare professional before starting any herbal regimen
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">Important Safety Information</h3>
          <p className="text-gray-700 leading-relaxed">
            This tool provides educational information based on Traditional Chinese Medicine theory and available research. 
            It is not intended to diagnose, treat, cure, or prevent any disease. Always consult with qualified healthcare 
            professionals before starting any herbal treatment, especially if you have existing health conditions or take medications.
          </p>
        </div>
      </section>
    </main>
  )
} 