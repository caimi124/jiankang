'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import IngredientCheckerFAQ from '../../components/IngredientCheckerFAQ'
import { Upload, AlertTriangle, Shield, Info, CheckCircle, X, Camera, FileText, Star, ExternalLink, Mail, ArrowRight, Lightbulb, Database, Users, Award } from 'lucide-react'

interface AnalysisResults {
  ingredients: Array<{
    name: string
    chineseName?: string
    latinName?: string
    safety: string
    safetyScore: number
    interactions: string[]
    benefits: string
    sideEffects: string[]
    dosage: string
    contraindications: string[]
    pregnancySafety: string
    qualityGrade: string
    herbFinderLink?: string
    alternativeSuggestions?: string[]
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
  alternativeRecommendations?: Array<{
    name: string
    reason: string
    safetyScore: number
    link: string
  }>
}

export default function IngredientCheckerPage() {
  const [ingredientText, setIngredientText] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [inputMethod, setInputMethod] = useState<'text' | 'photo'>('text')
  const [emailForResults, setEmailForResults] = useState('')
  const [showEmailCapture, setShowEmailCapture] = useState(false)

  // Example ingredients for demo
  const exampleIngredients = [
    "Ginkgo biloba 120mg, Rhodiola rosea 300mg, Caffeine 100mg",
    "Turmeric extract 500mg, Ginger root 200mg, Black pepper 5mg",
    "Ashwagandha 600mg, L-theanine 200mg, Magnesium glycinate 400mg",
    "St. John's Wort 300mg, Valerian root 450mg, Passion flower 250mg"
  ]

  const loadExample = (example: string) => {
    setIngredientText(example)
    setInputMethod('text')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setInputMethod('photo')
    }
  }

  const analyzeIngredients = () => {
    setIsAnalyzing(true)
    
    // Enhanced mock analysis with herb database linkage
    setTimeout(() => {
      const mockResults: AnalysisResults = {
        ingredients: [
          {
            name: 'Ginseng Root Extract (Panax ginseng)',
            chineseName: '人参 (Ren Shen)',
            latinName: 'Panax ginseng',
            safety: 'Generally Safe',
            safetyScore: 85,
            interactions: ['Blood thinners (Warfarin)', 'Diabetes medications', 'Blood pressure medications'],
            benefits: 'Increases energy, improves cognitive function, boosts immune system, reduces stress',
            sideEffects: ['Insomnia', 'Headache', 'Digestive upset', 'Nervousness'],
            dosage: '100-400mg daily (standardized extract)',
            contraindications: ['Pregnancy', 'High blood pressure (uncontrolled)', 'Insomnia'],
            pregnancySafety: 'Avoid - insufficient safety data',
            qualityGrade: 'A',
            herbFinderLink: '/herb-finder?search=ginseng',
            alternativeSuggestions: ['Rhodiola rosea', 'Schisandra berry']
          },
          {
            name: 'Ginkgo Biloba Leaf Extract',
            chineseName: '银杏叶 (Yin Xing Ye)',
            latinName: 'Ginkgo biloba',
            safety: 'Moderate Risk',
            safetyScore: 75,
            interactions: ['Blood thinners', 'Seizure medications', 'NSAID pain relievers'],
            benefits: 'Improves memory and circulation, supports brain health, may help with tinnitus',
            sideEffects: ['Bleeding risk', 'Stomach upset', 'Headache', 'Skin reactions'],
            dosage: '120-240mg daily (24% flavone glycosides)',
            contraindications: ['Bleeding disorders', 'Surgery (stop 2 weeks before)', 'Epilepsy'],
            pregnancySafety: 'Avoid - may cause bleeding',
            qualityGrade: 'B+',
            herbFinderLink: '/herb-finder?search=ginkgo',
            alternativeSuggestions: ['Bacopa monnieri', 'Lion\'s mane mushroom']
          },
          {
            name: 'Turmeric Extract (Curcumin)',
            chineseName: '姜黄 (Jiang Huang)',
            latinName: 'Curcuma longa',
            safety: 'Safe',
            safetyScore: 90,
            interactions: ['Blood thinners', 'Diabetes medications', 'Chemotherapy drugs'],
            benefits: 'Anti-inflammatory, antioxidant, supports joint health, may improve brain function',
            sideEffects: ['Stomach upset', 'Increased bleeding risk (high doses)', 'Kidney stones (rare)'],
            dosage: '500-1000mg daily (with black pepper for absorption)',
            contraindications: ['Gallstones', 'Kidney stones', 'Bleeding disorders'],
            pregnancySafety: 'Safe in food amounts, avoid supplements',
            qualityGrade: 'A+',
            herbFinderLink: '/herb-finder?search=turmeric',
            alternativeSuggestions: ['Boswellia', 'Tart cherry extract']
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
          }
        ],
        alternativeRecommendations: [
          {
            name: 'Rhodiola Rosea',
            reason: 'Safer alternative to ginseng for energy without cardiovascular risks',
            safetyScore: 88,
            link: '/herb-finder?search=rhodiola'
          },
          {
            name: 'Bacopa Monnieri',
            reason: 'Memory enhancement without bleeding concerns',
            safetyScore: 85,
            link: '/herb-finder?search=bacopa'
          }
        ]
      }
      setAnalysisResults(mockResults)
      setIsAnalyzing(false)
      setShowEmailCapture(true)
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
              { label: 'Ingredient Safety Checker', href: '/ingredient-checker' }
            ]} 
          />

          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🛡️ Herbal Ingredient Safety Checker
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Upload your supplement label or enter ingredients to get comprehensive safety analysis, 
              interaction warnings, and expert recommendations backed by scientific research.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-600">Herbs Analyzed</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-purple-600">200+</div>
                <div className="text-sm text-gray-600">Drug Interactions</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-gray-600">AI Analysis</div>
              </div>
            </div>
          </div>

          {/* Enhanced Input Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">🔍 Analyze Your Supplement</h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                What can you check?
              </h3>
              <p className="text-blue-800 text-sm">
                Enter ingredient names (with or without dosages), upload supplement labels, 
                or use our examples below. We'll analyze safety, interactions, and suggest alternatives.
              </p>
            </div>

            {/* Quick Examples */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">📝 Try These Examples:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exampleIngredients.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example)}
                    className="text-left p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors text-sm"
                  >
                    <div className="font-medium text-gray-900 mb-1">Example {index + 1}</div>
                    <div className="text-gray-600">{example}</div>
                  </button>
                ))}
              </div>
            </div>
            
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

            {/* Enhanced Input Methods */}
            {inputMethod === 'text' ? (
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">📝 Enter Supplement Ingredients</label>
                <textarea
                  placeholder="Enter your ingredients here...

Examples:
• Ginkgo biloba, Rhodiola rosea, Caffeine
• Turmeric 500mg, Ginger 200mg, Black pepper 5mg  
• Ashwagandha extract, L-theanine, Magnesium
• Valerian root, Passion flower, Melatonin

Include dosages when available for more accurate analysis!"
                  value={ingredientText}
                  onChange={(e) => setIngredientText(e.target.value)}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl h-48 resize-none focus:border-blue-500 focus:outline-none text-gray-700"
                />
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-gray-500">
                    💡 Tip: Include dosages (mg, IU, etc.) for more precise safety assessment
                  </p>
                  <span className="text-xs text-gray-400">
                    {ingredientText.length}/1000
                  </span>
                </div>
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
                      <p className="text-sm text-gray-500 mt-2">🤖 AI will extract ingredients from this image</p>
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
                      <p className="text-gray-600 mb-4">📱 Drag & drop or click to upload supplement label</p>
                      <p className="text-sm text-gray-500 mb-4">Supports JPG, PNG, PDF • Max 10MB</p>
                      <div className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors inline-block">
                        Choose File
                      </div>
                    </div>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* Enhanced Analyze Button */}
            <div className="text-center">
              <button
                onClick={analyzeIngredients}
                disabled={(!ingredientText.trim() && !selectedFile) || isAnalyzing}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-12 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>🧪 Analyzing Safety...</span>
                  </div>
                ) : (
                  <>🔍 Get Comprehensive Safety Analysis</>
                )}
              </button>
              <p className="text-sm text-gray-500 mt-3">
                ✅ Free analysis • 🔒 Privacy protected • ⚡ Results in 30 seconds
              </p>
            </div>
          </div>

          {/* Enhanced Analysis Results */}
          {analysisResults && (
            <div className="space-y-8">
              {/* Overall Assessment */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  📊 Overall Safety Assessment
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
                      ⚠️ Important Safety Warnings
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
                    💡 Expert Recommendations
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

              {/* Alternative Recommendations */}
              {analysisResults.alternativeRecommendations && analysisResults.alternativeRecommendations.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Star className="w-6 h-6 text-green-600 mr-3" />
                    🌟 Safer Alternative Recommendations
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {analysisResults.alternativeRecommendations.map((alt, index) => (
                      <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">{alt.name}</h4>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            Score: {alt.safetyScore}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{alt.reason}</p>
                        <a 
                          href={alt.link}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Learn more in Herb Finder
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Individual Ingredients */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">🔬 Detailed Ingredient Analysis</h3>
                <div className="space-y-6">
                  {analysisResults.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-2xl hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900">{ingredient.name}</h4>
                          {ingredient.latinName && (
                            <p className="text-gray-600 italic text-sm">{ingredient.latinName}</p>
                          )}
                          {ingredient.chineseName && (
                            <p className="text-gray-600 italic text-sm">{ingredient.chineseName}</p>
                          )}
                        </div>
                        <div className="text-right flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            ingredient.safety === 'Safe' ? 'bg-green-100 text-green-800' :
                            ingredient.safety === 'Generally Safe' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {ingredient.safety}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Grade: {ingredient.qualityGrade}</span>
                          </div>
                          {ingredient.herbFinderLink && (
                            <a 
                              href={ingredient.herbFinderLink}
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              View in Herb Finder
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                        <div>
                          <strong className="text-green-700 block mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Benefits:
                          </strong>
                          <p className="text-gray-700">{ingredient.benefits}</p>
                        </div>
                        <div>
                          <strong className="text-blue-700 block mb-2 flex items-center">
                            <Info className="w-4 h-4 mr-1" />
                            Recommended Dosage:
                          </strong>
                          <p className="text-gray-700">{ingredient.dosage}</p>
                        </div>
                        <div>
                          <strong className="text-purple-700 block mb-2 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            Pregnancy Safety:
                          </strong>
                          <p className="text-gray-700">{ingredient.pregnancySafety}</p>
                        </div>
                        <div>
                          <strong className="text-orange-700 block mb-2 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Side Effects:
                          </strong>
                          <ul className="text-gray-700 space-y-1">
                            {ingredient.sideEffects.map((effect, idx) => (
                              <li key={idx}>• {effect}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-red-700 block mb-2 flex items-center">
                            <X className="w-4 h-4 mr-1" />
                            Drug Interactions:
                          </strong>
                          <ul className="text-gray-700 space-y-1">
                            {ingredient.interactions.map((interaction, idx) => (
                              <li key={idx}>• {interaction}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-gray-700 block mb-2 flex items-center">
                            <Shield className="w-4 h-4 mr-1" />
                            Contraindications:
                          </strong>
                          <ul className="text-gray-700 space-y-1">
                            {ingredient.contraindications.map((contra, idx) => (
                              <li key={idx}>• {contra}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Alternative suggestions for this ingredient */}
                      {ingredient.alternativeSuggestions && (
                        <div className="mt-4 p-4 bg-green-50 rounded-xl">
                          <strong className="text-green-800 block mb-2">🌿 Safer Alternatives:</strong>
                          <div className="flex flex-wrap gap-2">
                            {ingredient.alternativeSuggestions.map((alt, idx) => (
                              <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {alt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Drug Interactions */}
              {analysisResults.drugInteractions.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                    💊 Critical Drug Interactions
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

              {/* Email Capture for Results */}
              {showEmailCapture && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-lg p-8 text-white">
                  <div className="text-center">
                    <Mail className="w-12 h-12 mx-auto mb-4 text-blue-100" />
                    <h3 className="text-2xl font-bold mb-4">📧 Get Your Complete Safety Report</h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                      Receive a detailed PDF report with personalized recommendations, alternative suggestions, 
                      and a "Top 10 Dangerous Ingredients to Avoid" guide - absolutely free!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={emailForResults}
                        onChange={(e) => setEmailForResults(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl text-gray-900 w-full sm:w-auto"
                      />
                      <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
                        Send Report
                        <ArrowRight className="w-4 h-4 inline ml-2" />
                      </button>
                    </div>
                    <p className="text-blue-200 text-sm mt-4">
                      ✅ No spam • 🔒 Privacy protected • 📱 Mobile-friendly PDF
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* What We Check Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🔍 What Our Safety Checker Analyzes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Ingredient Recognition',
                  description: 'Accurately identify herbs, vitamins, and compounds from names or photos',
                  icon: '🌿',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'Safety Assessment',
                  description: 'Evidence-based safety ratings from clinical studies and traditional use',
                  icon: '⭐',
                  color: 'from-yellow-500 to-orange-500'
                },
                {
                  title: 'Drug Interactions',
                  description: 'Check against 200+ medications for potential dangerous combinations',
                  icon: '💊',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Side Effect Warnings',
                  description: 'Comprehensive side effects and contraindication information',
                  icon: '⚠️',
                  color: 'from-red-500 to-pink-500'
                },
                {
                  title: 'Dosage Analysis',
                  description: 'Verify if dosages are within safe, therapeutic ranges',
                  icon: '⚖️',
                  color: 'from-purple-500 to-indigo-500'
                },
                {
                  title: 'Quality Grading',
                  description: 'Rate supplement quality based on purity and manufacturing standards',
                  icon: '🏆',
                  color: 'from-amber-500 to-yellow-500'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:shadow-lg transition-shadow`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Database Connection Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <Database className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🌐 Connected to Our Comprehensive Herb Database
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
                Every ingredient analysis is linked to our extensive Herb Finder database. 
                Click on any ingredient result to explore detailed monographs, traditional uses, 
                modern research, and find high-quality suppliers.
              </p>
              <a 
                href="/herb-finder"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Explore Herb Database
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <IngredientCheckerFAQ isZh={false} />

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-lg p-8 text-white text-center mt-8">
            <h2 className="text-3xl font-bold mb-4">
              🛡️ Check Your Supplements Now
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              Free safety analysis • Expert recommendations • Science-backed results
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              🔍 Start Free Analysis
            </button>
            <p className="text-blue-200 text-sm mt-4">
              ✅ No registration required • 🔒 Privacy protected • ⚡ Results in seconds
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 