'use client'

import { useState } from 'react'

interface AnalysisResults {
  ingredients: Array<{
    name: string
    safety: string
    interactions: string
    benefits: string
    dosage: string
  }>
  overallRisk: string
  recommendations: string[]
}

export default function IngredientCheckerPage() {
  const [ingredientText, setIngredientText] = useState('')
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)

  const analyzeIngredients = () => {
    // 模拟分析结果
    const mockResults = {
      ingredients: [
        {
          name: 'Ginseng Root Extract',
          safety: 'Safe',
          interactions: 'May interact with blood thinners',
          benefits: 'Energy boost, cognitive function',
          dosage: '100-400mg daily'
        },
        {
          name: 'Ginkgo Biloba',
          safety: 'Generally Safe',
          interactions: 'Avoid with blood thinners, seizure medications',
          benefits: 'Memory support, circulation',
          dosage: '120-240mg daily'
        }
      ],
      overallRisk: 'Low-Moderate',
      recommendations: [
        'Consult healthcare provider if taking blood thinners',
        'Start with lower doses to assess tolerance',
        'Monitor for any adverse reactions'
      ]
    }
    setAnalysisResults(mockResults)
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            🛡️ Ingredient Safety Checker
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Upload your supplement label or paste ingredients to get detailed safety analysis and interaction warnings
          </p>
        </div>
      </section>

      {/* Analysis Tool */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center">Enter Your Supplement Ingredients</h2>
            
            {/* Input Methods */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Text Input */}
              <div>
                <h3 className="text-lg font-semibold mb-4">📝 Paste Ingredient List</h3>
                <textarea
                  placeholder="Paste your supplement ingredients here...&#10;&#10;Example:&#10;Ginseng Root Extract (500mg)&#10;Ginkgo Biloba Leaf (120mg)&#10;Vitamin B12 (100mcg)"
                  value={ingredientText}
                  onChange={(e) => setIngredientText(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl h-40 resize-none focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <h3 className="text-lg font-semibold mb-4">📷 Upload Label Photo</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                  <div className="text-4xl mb-4">📸</div>
                  <p className="text-gray-600 mb-4">Drag & drop a photo of your supplement label</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                    Choose File
                  </button>
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="text-center mb-8">
              <button
                onClick={analyzeIngredients}
                disabled={!ingredientText.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                🔍 Analyze Ingredients
              </button>
            </div>

            {/* Results */}
            {analysisResults && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold mb-6">Safety Analysis Results</h3>
                
                {/* Overall Risk Assessment */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                    Overall Risk Level: {analysisResults.overallRisk}
                  </h4>
                  <div className="space-y-2">
                    {analysisResults.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span className="text-yellow-700">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Ingredients */}
                <div className="space-y-4">
                  {analysisResults.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold">{ingredient.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          ingredient.safety === 'Safe' ? 'bg-green-100 text-green-800' :
                          ingredient.safety === 'Generally Safe' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {ingredient.safety}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <strong className="text-green-700">Benefits:</strong>
                          <p className="text-gray-700">{ingredient.benefits}</p>
                        </div>
                        <div>
                          <strong className="text-blue-700">Dosage:</strong>
                          <p className="text-gray-700">{ingredient.dosage}</p>
                        </div>
                        <div>
                          <strong className="text-red-700">Interactions:</strong>
                          <p className="text-gray-700">{ingredient.interactions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Understanding Supplement Safety</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold mb-3">Drug Interactions</h3>
              <p className="text-gray-600">
                Many herbs can interact with prescription medications, affecting their effectiveness or causing adverse reactions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Dosage Matters</h3>
              <p className="text-gray-600">
                The same herb can be beneficial at therapeutic doses but harmful at excessive amounts. Always follow recommended dosages.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl mb-4">👩‍⚕️</div>
              <h3 className="text-xl font-semibold mb-3">Professional Guidance</h3>
              <p className="text-gray-600">
                Consult with healthcare providers, especially if you have medical conditions or take medications.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 