import React from 'react'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Metadata } from 'next'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Star, 
  Leaf, 
  Heart, 
  Target,
  Clock,
  Scale,
  Info,
  ExternalLink,
  ArrowLeft,
  Pill,
  Users,
  Baby,
  TrendingUp
} from 'lucide-react'

interface IngredientDetailPageProps {
  params: {
    id: string
  }
}

// 生成元数据
export async function generateMetadata({ params }: IngredientDetailPageProps): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://herbscience.shop' : 'http://localhost:3000'}/api/ingredients/${params.id}`)
    const data = await response.json()
    
    if (!data.success) {
      return {
        title: 'Ingredient Not Found - HerbScience',
        description: 'The requested ingredient could not be found in our database.'
      }
    }

    const ingredient = data.data

    return {
      title: `${ingredient.name_en} Safety Profile & Benefits | HerbScience`,
      description: ingredient.description_short || `Complete safety analysis and benefits of ${ingredient.name_en}. Drug interactions, dosage, and side effects.`,
      keywords: [
        ingredient.name_en,
        ingredient.name_cn,
        'safety analysis',
        'drug interactions',
        'supplement safety',
        'natural health'
      ].join(', ')
    }
  } catch (error) {
    return {
      title: 'Ingredient Details - HerbScience'
    }
  }
}

export default async function IngredientDetailPage({ params }: IngredientDetailPageProps) {
  let ingredient
  
  try {
    const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://herbscience.shop' : 'http://localhost:3000'}/api/ingredients/${params.id}`)
    const data = await response.json()
    
    if (!data.success) {
      notFound()
    }
    
    ingredient = data.data
  } catch (error) {
    notFound()
  }

  const getSafetyBadge = (score: number) => {
    if (score >= 80) {
      return (
        <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Low Risk</span>
        </div>
      )
    } else if (score >= 60) {
      return (
        <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
          <Shield className="h-5 w-5" />
          <span className="font-medium">Moderate Risk</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-800 rounded-full">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">High Risk</span>
        </div>
      )
    }
  }

  const getQualityStars = (grade: string) => {
    const gradeMap = { 'A+': 5, 'A': 4, 'B+': 3, 'B': 2, 'C': 1 }
    const stars = gradeMap[grade as keyof typeof gradeMap] || 3
    
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'moderate': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPregnancyIcon = (status: string) => {
    switch (status) {
      case 'avoid': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'caution': return <Shield className="h-4 w-4 text-yellow-600" />
      default: return <Info className="h-4 w-4 text-gray-600" />
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
              { label: 'Ingredient Checker', href: '/ingredient-checker' },
              { label: ingredient.name_en, href: `/ingredient-checker/${params.id}` }
            ]}
          />

          {/* 返回按钮 */}
          <div className="mb-6">
            <Link href="/ingredient-checker">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Ingredient Checker</span>
              </Button>
            </Link>
          </div>

          {/* 头部信息 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 左侧：基本信息 */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{ingredient.name_en}</h1>
                  {ingredient.name_cn && (
                    <h2 className="text-xl text-gray-600 mb-1">{ingredient.name_cn}</h2>
                  )}
                  {ingredient.latin_name && (
                    <p className="text-lg text-gray-500 italic">{ingredient.latin_name}</p>
                  )}
                </div>

                {/* 安全评分 */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Safety Score</h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-3xl font-bold text-blue-600">{ingredient.safety_score}</span>
                      <span className="text-gray-500">/100</span>
                      {getSafetyBadge(ingredient.safety_score)}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Grade</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">{ingredient.quality_grade.grade}</span>
                      <div className="flex">{getQualityStars(ingredient.quality_grade.grade)}</div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{ingredient.quality_grade.description}</p>
                  </div>
                </div>

                {/* 主要效益 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary Benefits</h3>
                  <p className="text-gray-700 leading-relaxed">{ingredient.description_detail}</p>
                </div>
              </div>

              {/* 右侧：快速信息 */}
              <div className="space-y-4">
                {/* 图片 */}
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={ingredient.image_url}
                    alt={ingredient.name_en}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/herbs/default-herb.jpg'
                    }}
                  />
                </div>

                {/* 快速信息卡片 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <Pill className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-blue-600 font-medium">Dosage</p>
                    <p className="text-sm font-semibold text-blue-800">{ingredient.dosage}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-green-600 font-medium">Popularity</p>
                    <p className="text-sm font-semibold text-green-800">{ingredient.popularity_score}/100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 详细信息区域 */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 孕期安全性 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Baby className="h-5 w-5 text-pink-600 mr-2" />
                  Pregnancy & Breastfeeding Safety
                </h3>
                <div className="flex items-start space-x-3">
                  {getPregnancyIcon(ingredient.pregnancy_safety.status)}
                  <div>
                    <h4 className="font-semibold text-gray-800">{ingredient.pregnancy_safety.description}</h4>
                    <p className="text-gray-600 mt-1">{ingredient.pregnancy_safety.recommendation}</p>
                  </div>
                </div>
              </div>

              {/* 药物相互作用 */}
              {ingredient.drug_interactions.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    Drug Interactions
                  </h3>
                  <div className="space-y-4">
                    {ingredient.drug_interactions.map((interaction: any, index: number) => (
                      <div key={index} className="border-l-4 border-orange-400 pl-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{interaction.category}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(interaction.severity)}`}>
                            {interaction.severity} risk
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{interaction.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 副作用 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Potential Side Effects</h3>
                <div className="space-y-3">
                  {ingredient.side_effects.map((effect: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{effect.effect}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">Frequency: {effect.frequency}</span>
                          <span className="text-xs text-gray-500">Severity: {effect.severity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 相似成分推荐 */}
              {ingredient.similar_ingredients.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Similar Ingredients</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {ingredient.similar_ingredients.map((similar: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <h4 className="font-semibold text-gray-800">{similar.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">{similar.reason}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">Safety: {similar.safety_score}/100</span>
                          <Link href={`/herb-finder?search=${encodeURIComponent(similar.name)}`}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 侧边栏 */}
            <div className="space-y-6">
              {/* 质量因素 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Factors</h3>
                <div className="space-y-3">
                  {ingredient.quality_grade.factors.map((factor: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700 text-sm">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 更安全的替代品 */}
              {ingredient.alternative_options.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Safer Alternatives
                  </h3>
                  <div className="space-y-4">
                    {ingredient.alternative_options.map((alternative: any, index: number) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-green-800">{alternative.name}</h4>
                        <p className="text-green-700 text-sm mt-1">{alternative.why_alternative}</p>
                        <p className="text-green-600 text-xs mt-2">{alternative.safety_advantage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 相关链接 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
                <div className="space-y-3">
                  <Link 
                    href={ingredient.herb_finder_link}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Leaf className="h-4 w-4" />
                    <span>View in Herb Finder</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  <Link 
                    href={ingredient.constitution_link}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    <span>Constitution Test</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  <Link 
                    href="/ingredient-checker"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Check More Ingredients</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* 免责声明 */}
              <div className="bg-gray-100 rounded-xl p-4">
                <h4 className="font-medium text-gray-700 mb-2">Medical Disclaimer</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  This information is for educational purposes only. Always consult with a qualified 
                  healthcare provider before using any supplements, especially if you have medical 
                  conditions or take medications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 