'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'

export default function HerbFinderPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSymptom, setSelectedSymptom] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])

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

  const herbRecommendations: Record<string, Array<{name: string, dosage: string, evidence: string, description: string}>> = {
    'Anxiety & Stress': [
      { 
        name: 'Ashwagandha (Withania somnifera)', 
        dosage: '300-600mg daily', 
        evidence: 'Multiple clinical studies',
        description: 'Adaptogenic herb that helps reduce cortisol levels and stress response. Studies show significant reduction in anxiety and stress scores.'
      },
      { 
        name: 'Reishi Mushroom (Ganoderma lucidum)', 
        dosage: '500-1000mg daily', 
        evidence: 'Traditional + modern research',
        description: 'Known as the "mushroom of immortality" in TCM. Helps calm the mind and support sleep quality.'
      },
      { 
        name: 'Jujube Seed (Suan Zao Ren)', 
        dosage: '300-600mg daily', 
        evidence: 'TCM classic formula',
        description: 'Traditional Chinese herb for nourishing the heart and calming the spirit. Often used in formulas for anxiety and insomnia.'
      }
    ],
    'Insomnia': [
      { 
        name: 'Jujube Seed (Suan Zao Ren)', 
        dosage: '500-1000mg daily', 
        evidence: 'Clinical trials',
        description: 'Primary herb in TCM for treating insomnia. Clinical studies show improved sleep quality and duration.'
      },
      { 
        name: 'Valerian Root', 
        dosage: '300-600mg before bed', 
        evidence: 'Extensive research',
        description: 'Well-studied Western herb for sleep disorders. Reduces time to fall asleep and improves sleep quality.'
      },
      { 
        name: 'Polygala Root (Yuan Zhi)', 
        dosage: '200-400mg daily', 
        evidence: 'Traditional use + studies',
        description: 'TCM herb that calms the spirit and opens the heart orifices. Used for insomnia with anxiety or restless mind.'
      }
    ],
    'Digestive Issues': [
      { 
        name: 'Ginger Root', 
        dosage: '250-1000mg daily', 
        evidence: 'Extensive clinical research',
        description: 'Powerful digestive aid that reduces nausea, improves gastric motility, and has anti-inflammatory properties.'
      },
      { 
        name: 'Licorice Root (Gan Cao)', 
        dosage: '200-500mg daily', 
        evidence: 'Traditional + modern studies',
        description: 'Harmonizing herb in TCM that soothes the digestive tract and supports gut health. Caution with hypertension.'
      },
      { 
        name: 'Fennel Seed', 
        dosage: '300-600mg daily', 
        evidence: 'Traditional use + research',
        description: 'Carminative herb that reduces bloating, gas, and digestive discomfort. Safe for long-term use.'
      }
    ]
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) return
    
    // Simple search logic - find symptoms that match the search term
    const results = symptoms.filter(symptom => 
      symptom.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
    
    // If only one result, auto-select it
    if (results.length === 1) {
      setSelectedSymptom(results[0])
    }
  }

  const handleSymptomClick = (symptom: string) => {
    setSelectedSymptom(symptom)
    setSearchResults([])
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Herb Finder', href: '/herb-finder' }
            ]} 
          />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🔍 Symptom-Based Herb Finder
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the right herbs for your specific symptoms based on Traditional Chinese Medicine and modern research
            </p>
          </div>

          {/* Search Interface */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">What symptoms would you like to address?</h2>
            
            {/* Search Input */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search symptoms (e.g., anxiety, insomnia, digestion)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-green-500 focus:outline-none pr-12"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Search
                </button>
              </div>
              
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold mb-2">Search Results:</h4>
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <button
                        key={result}
                        onClick={() => handleSymptomClick(result)}
                        className="block w-full text-left p-2 bg-white rounded-lg hover:bg-green-50 transition-colors"
                      >
                        {result}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Symptom Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Or select from common symptoms:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomClick(symptom)}
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
            </div>

            {/* Results */}
            {selectedSymptom && herbRecommendations[selectedSymptom] && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold mb-6">Recommended Herbs for {selectedSymptom}:</h3>
                <div className="space-y-6">
                  {herbRecommendations[selectedSymptom].map((herb, index) => (
                    <div key={index} className="bg-green-50 p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-green-800">{herb.name}</h4>
                        <span className="text-sm bg-green-200 text-green-800 px-3 py-1 rounded-full">
                          {herb.evidence}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{herb.description}</p>
                      <p className="text-green-700 mb-2">
                        <strong>Recommended Dosage:</strong> {herb.dosage}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-green-600">
                          ⚠️ Always consult with a healthcare professional before starting any herbal regimen
                        </p>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-yellow-800">Important Safety Information</h3>
            <p className="text-yellow-700 leading-relaxed">
              This tool provides educational information based on Traditional Chinese Medicine theory and available research. 
              It is not intended to diagnose, treat, cure, or prevent any disease. Always consult with qualified healthcare 
              professionals before starting any herbal treatment, especially if you have existing health conditions or take medications.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 