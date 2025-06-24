import { NextRequest, NextResponse } from 'next/server'
import { getAllHerbsFromNotion, searchHerbsFromNotion } from '@/lib/notion-herbs-api'

// 成分分析结果接口
interface IngredientAnalysis {
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
}

interface AnalysisResults {
  ingredients: IngredientAnalysis[]
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

// GET /api/ingredients/search - 搜索成分
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Query must be at least 2 characters long'
      }, { status: 400 })
    }

    console.log(`🔍 Searching ingredients for: "${query}"`)

    // 从Notion数据库搜索匹配的草药/成分
    const herbs = await searchHerbsFromNotion(query)

    // 计算分页
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedHerbs = herbs.slice(startIndex, endIndex)

    // 转换为成分格式
    const ingredients = paginatedHerbs.map(herb => ({
      id: herb.id,
      name_en: herb.name_en,
      name_cn: herb.name_cn,
      description_short: herb.description_short,
      safety_level: herb.safety_level,
      efficacy: herb.efficacy,
      image_url: herb.image_url || `/herbs/${herb.name_en.toLowerCase().replace(/\s+/g, '-')}.jpg`
    }))

    return NextResponse.json({
      success: true,
      data: ingredients,
      pagination: {
        page,
        pageSize,
        total: herbs.length,
        totalPages: Math.ceil(herbs.length / pageSize)
      },
      query: query
    })

  } catch (error) {
    console.error('❌ Error searching ingredients:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to search ingredients',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST /api/ingredients/search - 分析成分组合
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ingredients, action } = body

    if (action === 'analyze') {
      // 分析成分组合的安全性
      const analysisResults = await analyzeIngredientCombination(ingredients)
      
      return NextResponse.json({
        success: true,
        data: analysisResults
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 })

  } catch (error) {
    console.error('❌ Error analyzing ingredients:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to analyze ingredients',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// 分析成分组合的安全性
async function analyzeIngredientCombination(ingredientNames: string[]): Promise<AnalysisResults> {
  console.log(`🔬 Analyzing ingredient combination: ${ingredientNames.join(', ')}`)
  
  const analyzedIngredients: IngredientAnalysis[] = []
  let totalSafetyScore = 0
  
  // 从Notion数据库获取每个成分的信息
  for (const ingredientName of ingredientNames) {
    const herbs = await searchHerbsFromNotion(ingredientName)
    
    if (herbs.length > 0) {
      const herb = herbs[0] // 取第一个匹配的结果
      
      const safetyScore = getSafetyScore(herb.safety_level)
      totalSafetyScore += safetyScore
      
      const analysis: IngredientAnalysis = {
        name: herb.name_en,
        chineseName: herb.name_cn,
        latinName: herb.latin_name,
        safety: getSafetyLabel(herb.safety_level),
        safetyScore: safetyScore,
        interactions: extractInteractions(herb.safety_notes),
        benefits: herb.description_short,
        sideEffects: extractSideEffects(herb.safety_notes),
        dosage: herb.dosage,
        contraindications: extractContraindications(herb.safety_notes),
        pregnancySafety: getPregnancySafety(herb.safety_notes),
        qualityGrade: getQualityGrade(herb.quality_score),
        herbFinderLink: `/herb-finder?search=${encodeURIComponent(herb.name_en)}`,
        alternativeSuggestions: getSimilarHerbs(herb.efficacy)
      }
      
      analyzedIngredients.push(analysis)
    } else {
      // 如果在数据库中找不到，返回基本分析
      analyzedIngredients.push({
        name: ingredientName,
        safety: 'Unknown',
        safetyScore: 50,
        interactions: [],
        benefits: 'Information not available in our database',
        sideEffects: ['Unknown - consult healthcare provider'],
        dosage: 'Consult healthcare provider',
        contraindications: ['Consult healthcare provider before use'],
        pregnancySafety: 'Unknown - avoid during pregnancy',
        qualityGrade: 'N/A'
      })
      totalSafetyScore += 50
    }
  }
  
  const averageSafetyScore = Math.round(totalSafetyScore / ingredientNames.length)
  
  return {
    ingredients: analyzedIngredients,
    overallRisk: getOverallRisk(averageSafetyScore),
    riskScore: averageSafetyScore,
    recommendations: generateRecommendations(analyzedIngredients),
    warnings: generateWarnings(analyzedIngredients),
    drugInteractions: generateDrugInteractions(analyzedIngredients),
    alternativeRecommendations: generateAlternatives(analyzedIngredients)
  }
}

// 辅助函数
function getSafetyScore(safetyLevel: string): number {
  switch (safetyLevel) {
    case 'high': return 90
    case 'medium': return 70
    case 'low': return 40
    default: return 50
  }
}

function getSafetyLabel(safetyLevel: string): string {
  switch (safetyLevel) {
    case 'high': return 'Generally Safe'
    case 'medium': return 'Moderate Safety'
    case 'low': return 'Use with Caution'
    default: return 'Unknown'
  }
}

function getOverallRisk(score: number): string {
  if (score >= 80) return 'Low Risk'
  if (score >= 60) return 'Low-Moderate Risk'
  if (score >= 40) return 'Moderate Risk'
  return 'High Risk'
}

function extractInteractions(safetyNotes: string): string[] {
  const interactions = []
  if (safetyNotes.includes('血压') || safetyNotes.includes('blood pressure')) {
    interactions.push('Blood pressure medications')
  }
  if (safetyNotes.includes('血糖') || safetyNotes.includes('diabetes')) {
    interactions.push('Diabetes medications')
  }
  if (safetyNotes.includes('抗凝') || safetyNotes.includes('blood thinner')) {
    interactions.push('Blood thinning medications')
  }
  return interactions
}

function extractSideEffects(safetyNotes: string): string[] {
  const sideEffects = []
  if (safetyNotes.includes('胃')) sideEffects.push('Stomach upset')
  if (safetyNotes.includes('头痛')) sideEffects.push('Headache')
  if (safetyNotes.includes('失眠')) sideEffects.push('Insomnia')
  return sideEffects.length > 0 ? sideEffects : ['Consult healthcare provider for potential side effects']
}

function extractContraindications(safetyNotes: string): string[] {
  const contraindications = []
  if (safetyNotes.includes('孕妇') || safetyNotes.includes('pregnancy')) {
    contraindications.push('Pregnancy')
  }
  if (safetyNotes.includes('高血压')) {
    contraindications.push('High blood pressure')
  }
  if (safetyNotes.includes('胆结石')) {
    contraindications.push('Gallstones')
  }
  return contraindications
}

function getPregnancySafety(safetyNotes: string): string {
  if (safetyNotes.includes('孕妇禁用') || safetyNotes.includes('pregnancy avoid')) {
    return 'Avoid during pregnancy'
  }
  if (safetyNotes.includes('孕妇慎用')) {
    return 'Use with caution during pregnancy'
  }
  return 'Consult healthcare provider'
}

function getQualityGrade(score: number): string {
  if (score >= 90) return 'A+'
  if (score >= 80) return 'A'
  if (score >= 70) return 'B+'
  if (score >= 60) return 'B'
  return 'C'
}

function getSimilarHerbs(efficacy: string[]): string[] {
  // 基于功效推荐相似草药
  const alternatives = []
  if (efficacy.includes('消化健康')) alternatives.push('Peppermint', 'Chamomile')
  if (efficacy.includes('抗炎作用')) alternatives.push('Boswellia', 'Willow bark')
  if (efficacy.includes('免疫支持')) alternatives.push('Echinacea', 'Astragalus')
  return alternatives.slice(0, 3)
}

function generateRecommendations(ingredients: IngredientAnalysis[]): string[] {
  const recommendations = [
    'Consult your healthcare provider before starting any new supplement regimen',
    'Start with lower doses to assess individual tolerance',
    'Monitor for any unusual symptoms and discontinue if adverse reactions occur'
  ]
  
  // 基于具体成分添加建议
  if (ingredients.some(ing => ing.interactions.includes('Blood pressure medications'))) {
    recommendations.push('Special caution needed if taking blood pressure medications')
  }
  
  return recommendations
}

function generateWarnings(ingredients: IngredientAnalysis[]): string[] {
  const warnings = []
  
  if (ingredients.some(ing => ing.pregnancySafety.includes('Avoid'))) {
    warnings.push('This combination should be avoided during pregnancy and breastfeeding')
  }
  
  if (ingredients.some(ing => ing.interactions.includes('Blood thinning'))) {
    warnings.push('May increase bleeding risk - important if you take blood thinners')
  }
  
  return warnings
}

function generateDrugInteractions(ingredients: IngredientAnalysis[]): Array<{drug: string, severity: string, description: string}> {
  const interactions = []
  
  if (ingredients.some(ing => ing.interactions.includes('Blood pressure medications'))) {
    interactions.push({
      drug: 'Blood pressure medications',
      severity: 'Moderate',
      description: 'May affect blood pressure regulation'
    })
  }
  
  return interactions
}

function generateAlternatives(ingredients: IngredientAnalysis[]): Array<{name: string, reason: string, safetyScore: number, link: string}> {
  return [
    {
      name: 'Chamomile',
      reason: 'Gentler alternative for digestive support',
      safetyScore: 88,
      link: '/herb-finder?search=chamomile'
    },
    {
      name: 'Peppermint',
      reason: 'Safe option for digestive health',
      safetyScore: 85,
      link: '/herb-finder?search=peppermint'
    }
  ]
} 