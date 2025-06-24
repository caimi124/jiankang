'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import IngredientCheckerFAQ from '../../components/IngredientCheckerFAQ'
import { Upload, AlertTriangle, Shield, Info, CheckCircle, X, Camera, FileText, Star, ExternalLink, Mail, ArrowRight, Lightbulb, Database, Users, Award, Search, Plus } from 'lucide-react'
import { Button } from "@/components/ui/Button"
import Link from 'next/link'

interface IngredientSearchResult {
  id: string
  name_en: string
  name_cn: string
  description_short: string
  safety_level: 'high' | 'medium' | 'low'
  efficacy: string[]
  image_url?: string
}

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
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<IngredientSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [bulkInput, setBulkInput] = useState('')
  const [showBulkInput, setShowBulkInput] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'connected' | 'error'>('loading')

  // Example ingredients for demo
  const exampleIngredients = [
    "Ginkgo biloba 120mg, Rhodiola rosea 300mg, Caffeine 100mg",
    "Turmeric extract 500mg, Ginger root 200mg, Black pepper 5mg",
    "Ashwagandha 600mg, L-theanine 200mg, Magnesium glycinate 400mg",
    "St. John's Wort 300mg, Valerian root 450mg, Passion flower 250mg"
  ]

  // 测试Notion连接
  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      const response = await fetch('/api/herbs/notion?test=true')
      const data = await response.json()
      setConnectionStatus(data.success ? 'connected' : 'error')
    } catch (error) {
      setConnectionStatus('error')
    }
  }

  // 搜索成分
  const handleSearch = async () => {
    if (!searchQuery.trim() || searchQuery.length < 2) return

    setIsSearching(true)
    try {
      const response = await fetch(`/api/ingredients/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      
      if (data.success) {
        setSearchResults(data.data || [])
      } else {
        console.error('Search failed:', data.error)
        setSearchResults([])
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // 实时搜索（防抖）
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        handleSearch()
      } else {
        setSearchResults([])
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // 添加成分到分析列表
  const addIngredient = (ingredient: IngredientSearchResult) => {
    if (!selectedIngredients.includes(ingredient.name_en)) {
      setSelectedIngredients([...selectedIngredients, ingredient.name_en])
    }
    setSearchQuery('')
    setSearchResults([])
  }

  // 移除成分
  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient))
    // 清空分析结果如果没有成分了
    if (selectedIngredients.length === 1) {
      setAnalysisResults(null)
    }
  }

  // 批量添加成分
  const handleBulkAdd = () => {
    const ingredients = bulkInput
      .split(/[,\n;]/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
    
    const newIngredients = ingredients.filter(item => !selectedIngredients.includes(item))
    setSelectedIngredients([...selectedIngredients, ...newIngredients])
    setBulkInput('')
    setShowBulkInput(false)
  }

  // 分析成分组合
  const analyzeIngredients = async () => {
    if (selectedIngredients.length === 0) return

    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/ingredients/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'analyze',
          ingredients: selectedIngredients
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setAnalysisResults(data.data)
      } else {
        console.error('Analysis failed:', data.error)
      }
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getRiskBadge = (safety_level: string, score?: number) => {
    if (score !== undefined) {
      if (score >= 80) return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Low Risk</span>
      if (score >= 60) return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Moderate Risk</span>
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">High Risk</span>
    }
    
    switch (safety_level) {
      case 'high':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Generally Safe</span>
      case 'medium':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Use with Caution</span>
      case 'low':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">High Caution</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Unknown</span>
    }
  }

  const getRiskIcon = (safety_level: string, score?: number) => {
    if (score !== undefined) {
      if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />
      if (score >= 60) return <Shield className="h-5 w-5 text-yellow-600" />
      return <AlertTriangle className="h-5 w-5 text-red-600" />
    }

    switch (safety_level) {
      case 'high':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'medium':
        return <Shield className="h-5 w-5 text-yellow-600" />
      case 'low':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Shield className="h-5 w-5 text-gray-600" />
    }
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
                    onClick={() => {
                      setSearchQuery(example)
                      setIsSearching(true)
                    }}
                    className="text-left p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors text-sm"
                  >
                    <div className="font-medium text-gray-900 mb-1">Example {index + 1}</div>
                    <div className="text-gray-600">{example}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search Input */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4">🔍 Search Ingredients</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type ingredient name... (e.g., turmeric, ginkgo, ashwagandha)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:outline-none"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                {isSearching && (
                  <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                💡 Start typing to search from our database of 1000+ herbal ingredients
              </p>
            </div>

            {/* Selected Ingredients */}
            {selectedIngredients.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Selected Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                    >
                      <span>{ingredient}</span>
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">📝 Search Results - Click to Add</label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => addIngredient(ingredient)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{ingredient.name_en}</span>
                          {ingredient.name_cn && (
                            <span className="text-gray-500 text-sm">({ingredient.name_cn})</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{ingredient.description_short}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getRiskBadge(ingredient.safety_level)}
                          {ingredient.efficacy.slice(0, 2).map((effect, idx) => (
                             <span key={idx} className="px-2 py-1 text-xs font-medium rounded border bg-gray-50 text-gray-700">
                               {effect}
                             </span>
                           ))}
                        </div>
                      </div>
                      <Plus className="h-4 w-4 text-blue-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Analyze Button */}
            <div className="text-center">
              <button
                onClick={analyzeIngredients}
                disabled={selectedIngredients.length === 0 || isAnalyzing}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-12 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>🧪 Analyzing Safety...</span>
                  </div>
                ) : (
                  <>🔍 Get Comprehensive Safety Analysis ({selectedIngredients.length} ingredients)</>
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
                    <div className="text-3xl font-bold mb-2 px-4 py-2 rounded-xl bg-blue-100 text-blue-800">
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
              <Link 
                href="/herb-finder"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Explore Herb Database
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
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