'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { Upload, AlertTriangle, Shield, Info, CheckCircle, X, Camera, FileText } from 'lucide-react'

interface AnalysisResults {
  ingredients: Array<{
    name: string
    chineseName?: string
    safety: string
    safetyScore: number
    interactions: string[]
    benefits: string
    sideEffects: string[]
    dosage: string
    contraindications: string[]
    pregnancySafety: string
    qualityGrade: string
  }>
  overallRisk: string
  riskScore: number
  recommendations: string[]
  warnings: string[]
  drugInteractions: Array<{
    drug: string
    severity: string
    description: string
  }>
}

export default function IngredientCheckerPage() {
  const [ingredientText, setIngredientText] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [inputMethod, setInputMethod] = useState<'text' | 'photo'>('text')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setInputMethod('photo')
    }
  }

  const analyzeIngredients = () => {
    setIsAnalyzing(true)
    
    // 模拟AI分析过程
    setTimeout(() => {
      const mockResults: AnalysisResults = {
        ingredients: [
          {
            name: 'Ginseng Root Extract (Panax ginseng)',
            chineseName: '人参 (Ren Shen)',
            safety: 'Generally Safe',
            safetyScore: 85,
            interactions: ['Blood thinners (Warfarin)', 'Diabetes medications', 'Blood pressure medications'],
            benefits: 'Increases energy, improves cognitive function, boosts immune system, reduces stress',
            sideEffects: ['Insomnia', 'Headache', 'Digestive upset', 'Nervousness'],
            dosage: '100-400mg daily (standardized extract)',
            contraindications: ['Pregnancy', 'High blood pressure (uncontrolled)', 'Insomnia'],
            pregnancySafety: 'Avoid - insufficient safety data',
            qualityGrade: 'A'
          },
          {
            name: 'Ginkgo Biloba Leaf Extract',
            chineseName: '银杏叶 (Yin Xing Ye)',
            safety: 'Moderate Risk',
            safetyScore: 75,
            interactions: ['Blood thinners', 'Seizure medications', 'NSAID pain relievers'],
            benefits: 'Improves memory and circulation, supports brain health, may help with tinnitus',
            sideEffects: ['Bleeding risk', 'Stomach upset', 'Headache', 'Skin reactions'],
            dosage: '120-240mg daily (24% flavone glycosides)',
            contraindications: ['Bleeding disorders', 'Surgery (stop 2 weeks before)', 'Epilepsy'],
            pregnancySafety: 'Avoid - may cause bleeding',
            qualityGrade: 'B+'
          },
          {
            name: 'Turmeric Extract (Curcumin)',
            chineseName: '姜黄 (Jiang Huang)',
            safety: 'Safe',
            safetyScore: 90,
            interactions: ['Blood thinners', 'Diabetes medications', 'Chemotherapy drugs'],
            benefits: 'Anti-inflammatory, antioxidant, supports joint health, may improve brain function',
            sideEffects: ['Stomach upset', 'Increased bleeding risk (high doses)', 'Kidney stones (rare)'],
            dosage: '500-1000mg daily (with black pepper for absorption)',
            contraindications: ['Gallstones', 'Kidney stones', 'Bleeding disorders'],
            pregnancySafety: 'Safe in food amounts, avoid supplements',
            qualityGrade: 'A+'
          }
        ],
        overallRisk: 'Low-Moderate',
        riskScore: 78,
        recommendations: [
          'Consult your healthcare provider before starting, especially if taking blood thinners',
          'Start with lower doses to assess individual tolerance',
          'Monitor for any unusual symptoms and discontinue if adverse reactions occur',
          'Take ginseng in the morning to avoid sleep interference',
          'Consider timing: take turmeric with food to reduce stomach upset'
        ],
        warnings: [
          'This combination may increase bleeding risk - important if you take blood thinners',
          'Ginkgo should be stopped 2 weeks before any surgery',
          'Avoid this combination during pregnancy and breastfeeding'
        ],
        drugInteractions: [
          {
            drug: 'Warfarin (Coumadin)',
            severity: 'High',
            description: 'May significantly increase bleeding risk when combined with ginseng and ginkgo'
          },
          {
            drug: 'Diabetes medications',
            severity: 'Moderate',
            description: 'Ginseng may lower blood sugar and require medication adjustment'
          },
          {
            drug: 'Blood pressure medications',
            severity: 'Moderate',
            description: 'Ginseng may interfere with blood pressure control'
          }
        ]
      }
      setAnalysisResults(mockResults)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getRiskColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'moderate': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Safety Checker', href: '/ingredient-checker' }
            ]} 
          />

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Ingredient Safety Checker
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upload your supplement label or paste ingredients to get detailed safety analysis, interaction warnings, and personalized recommendations
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Analyze Your Supplement</h2>
            
            {/* Input Method Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setInputMethod('text')}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                    inputMethod === 'text'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Type Ingredients</span>
                </button>
                <button
                  onClick={() => setInputMethod('photo')}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                    inputMethod === 'photo'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>Upload Photo</span>
                </button>
              </div>
            </div>

            {/* Input Methods */}
            {inputMethod === 'text' ? (
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">📝 Enter Supplement Ingredients</label>
                <textarea
                  placeholder="Paste your supplement ingredients here...

Example:
Ginseng Root Extract (500mg)
Ginkgo Biloba Leaf Extract (120mg) 
Turmeric Extract (Curcumin 95%) (500mg)
Vitamin B12 (100mcg)
Black Pepper Extract (5mg)"
                  value={ingredientText}
                  onChange={(e) => setIngredientText(e.target.value)}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl h-48 resize-none focus:border-blue-500 focus:outline-none text-gray-700"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Include dosages when possible for more accurate analysis
                </p>
              </div>
            ) : (
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">📷 Upload Supplement Label</label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  {selectedFile ? (
                    <div>
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <p className="text-gray-700 font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500 mt-2">AI will read ingredients from this image</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedFile(null)
                        }}
                        className="mt-4 text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5 inline mr-1" />
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Drag & drop a photo of your supplement label</p>
                      <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                      <div className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors inline-block">
                        Choose File
                      </div>
                    </div>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <div className="text-center">
              <button
                onClick={analyzeIngredients}
                disabled={(!ingredientText.trim() && !selectedFile) || isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-12 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <>🔍 Analyze Safety & Interactions</>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          {analysisResults && (
            <div className="space-y-8">
              {/* Overall Assessment */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  Overall Safety Assessment
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 px-4 py-2 rounded-xl ${getRiskColor(analysisResults.riskScore)}`}>
                      {analysisResults.riskScore}/100
                    </div>
                    <p className="text-gray-600">Safety Score</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-xl font-bold mb-2 px-4 py-2 rounded-xl ${
                      analysisResults.overallRisk === 'Low' ? 'text-green-600 bg-green-100' :
                      analysisResults.overallRisk === 'Low-Moderate' ? 'text-yellow-600 bg-yellow-100' :
                      'text-red-600 bg-red-100'
                    }`}>
                      {analysisResults.overallRisk}
                    </div>
                    <p className="text-gray-600">Risk Level</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold mb-2 px-4 py-2 rounded-xl text-blue-600 bg-blue-100">
                      {analysisResults.ingredients.length}
                    </div>
                    <p className="text-gray-600">Ingredients Analyzed</p>
                  </div>
                </div>

                {/* Warnings */}
                {analysisResults.warnings.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Important Warnings
                    </h4>
                    <ul className="space-y-2">
                      {analysisResults.warnings.map((warning, index) => (
                        <li key={index} className="flex items-start text-red-700">
                          <span className="text-red-600 mr-2 mt-0.5">⚠️</span>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {analysisResults.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-blue-700">
                        <span className="text-blue-600 mr-2 mt-0.5">💡</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Drug Interactions */}
              {analysisResults.drugInteractions.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                    Drug Interactions Alert
                  </h3>
                  <div className="space-y-4">
                    {analysisResults.drugInteractions.map((interaction, index) => (
                      <div key={index} className="border border-gray-200 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">{interaction.drug}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(interaction.severity)}`}>
                            {interaction.severity} Risk
                          </span>
                        </div>
                        <p className="text-gray-700">{interaction.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Individual Ingredients */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Detailed Ingredient Analysis</h3>
                <div className="space-y-6">
                  {analysisResults.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{ingredient.name}</h4>
                          {ingredient.chineseName && (
                            <p className="text-gray-600 italic">{ingredient.chineseName}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            ingredient.safety === 'Safe' ? 'bg-green-100 text-green-800' :
                            ingredient.safety === 'Generally Safe' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {ingredient.safety}
                          </span>
                          <div className="text-sm text-gray-600 mt-1">
                            Grade: {ingredient.qualityGrade}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                        <div>
                          <strong className="text-green-700 block mb-2">Benefits:</strong>
                          <p className="text-gray-700">{ingredient.benefits}</p>
                        </div>
                        <div>
                          <strong className="text-blue-700 block mb-2">Recommended Dosage:</strong>
                          <p className="text-gray-700">{ingredient.dosage}</p>
                        </div>
                        <div>
                          <strong className="text-purple-700 block mb-2">Pregnancy Safety:</strong>
                          <p className="text-gray-700">{ingredient.pregnancySafety}</p>
                        </div>
                        <div>
                          <strong className="text-orange-700 block mb-2">Side Effects:</strong>
                          <ul className="text-gray-700 space-y-1">
                            {ingredient.sideEffects.map((effect, idx) => (
                              <li key={idx}>• {effect}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-red-700 block mb-2">Drug Interactions:</strong>
                          <ul className="text-gray-700 space-y-1">
                            {ingredient.interactions.map((interaction, idx) => (
                              <li key={idx}>• {interaction}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-gray-700 block mb-2">Contraindications:</strong>
                          <ul className="text-gray-700 space-y-1">
                            {ingredient.contraindications.map((contra, idx) => (
                              <li key={idx}>• {contra}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-center mb-8">Understanding Supplement Safety</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Drug Interactions</h3>
                <p className="text-gray-600">
                  Many herbs can interact with prescription medications, affecting their effectiveness or causing adverse reactions.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Dosage Matters</h3>
                <p className="text-gray-600">
                  The same herb can be beneficial at therapeutic doses but harmful at excessive amounts. Always follow recommended dosages.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Professional Guidance</h3>
                <p className="text-gray-600">
                  Consult with healthcare providers, especially if you have medical conditions or take medications.
                </p>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Medical Disclaimer</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  This safety analysis is for educational purposes only and should not replace professional medical advice. 
                  Results are based on available research and traditional use. Always consult with qualified healthcare 
                  practitioners before starting any herbal supplement regimen, especially if you have health conditions, 
                  take medications, or are pregnant or breastfeeding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 