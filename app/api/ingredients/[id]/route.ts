import { NextRequest, NextResponse } from 'next/server'
import { getHerbByIdFromNotion } from '@/lib/notion-herbs-api'

// GET /api/ingredients/[id] - 获取单个成分详情
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { id } = params

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Ingredient ID is required'
      }, { status: 400 })
    }

    console.log(`🔍 Fetching ingredient details for ID: ${id}`)

    // 从Notion获取草药/成分详情
    const herb = await getHerbByIdFromNotion(id)

    if (!herb) {
      return NextResponse.json({
        success: false,
        error: 'Ingredient not found'
      }, { status: 404 })
    }

    // 转换为标准成分格式
    const ingredient = {
      id: herb.id,
      name_en: herb.name_en,
      name_cn: herb.name_cn,
      latin_name: herb.latin_name,
      description_short: herb.description_short,
      description_detail: herb.description_detail,
      safety_notes: herb.safety_notes,
      safety_level: herb.safety_level,
      safety_score: getSafetyScore(herb.safety_level),
      efficacy: herb.efficacy,
      dosage: herb.dosage,
      contraindications: herb.contraindications,
      modern_applications: herb.modern_applications,
      traditional_use: herb.traditional_use,
      quality_score: herb.quality_score,
      popularity_score: herb.popularity_score,
      usage_suggestions: herb.usage_suggestions,
      image_url: herb.image_url || `/herbs/${herb.name_en.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      
      // 分析数据
      pregnancy_safety: getPregnancySafety(herb.safety_notes),
      drug_interactions: extractDrugInteractions(herb.safety_notes),
      side_effects: extractSideEffects(herb.safety_notes),
      quality_grade: getQualityGrade(herb.quality_score),
      
      // 相关链接
      herb_finder_link: `/herb-finder?search=${encodeURIComponent(herb.name_en)}`,
      constitution_link: `/constitution-test`,
      
      // 推荐
      similar_ingredients: getSimilarIngredients(herb.efficacy),
      alternative_options: getAlternativeOptions(herb.safety_level, herb.efficacy)
    }

    return NextResponse.json({
      success: true,
      data: ingredient
    })

  } catch (error) {
    const params = await context.params
    console.error(`❌ Error fetching ingredient ${params.id}:`, error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch ingredient details',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
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

function getPregnancySafety(safetyNotes: string): {
  status: string
  description: string
  recommendation: string
} {
  if (safetyNotes.includes('孕妇禁用') || safetyNotes.includes('pregnancy avoid')) {
    return {
      status: 'avoid',
      description: 'Should be avoided during pregnancy',
      recommendation: 'Do not use during pregnancy or breastfeeding'
    }
  }
  
  if (safetyNotes.includes('孕妇慎用') || safetyNotes.includes('pregnancy caution')) {
    return {
      status: 'caution',
      description: 'Use with extreme caution during pregnancy',
      recommendation: 'Only use under professional medical supervision'
    }
  }
  
  return {
    status: 'unknown',
    description: 'Safety during pregnancy is not well established',
    recommendation: 'Consult healthcare provider before use during pregnancy'
  }
}

function extractDrugInteractions(safetyNotes: string): Array<{
  category: string
  description: string
  severity: 'low' | 'moderate' | 'high'
}> {
  const interactions = []
  
  if (safetyNotes.includes('血压') || safetyNotes.includes('blood pressure')) {
    interactions.push({
      category: 'Blood Pressure Medications',
      description: 'May affect blood pressure regulation and interact with antihypertensive drugs',
      severity: 'moderate' as const
    })
  }
  
  if (safetyNotes.includes('血糖') || safetyNotes.includes('diabetes') || safetyNotes.includes('insulin')) {
    interactions.push({
      category: 'Diabetes Medications',
      description: 'May affect blood sugar levels and interact with diabetes medications',
      severity: 'moderate' as const
    })
  }
  
  if (safetyNotes.includes('抗凝') || safetyNotes.includes('blood thinner') || safetyNotes.includes('warfarin')) {
    interactions.push({
      category: 'Blood Thinning Medications',
      description: 'May increase bleeding risk when used with anticoagulant medications',
      severity: 'high' as const
    })
  }
  
  if (safetyNotes.includes('肝') || safetyNotes.includes('liver')) {
    interactions.push({
      category: 'Liver-Processed Medications',
      description: 'May affect liver enzyme activity and drug metabolism',
      severity: 'moderate' as const
    })
  }
  
  return interactions
}

function extractSideEffects(safetyNotes: string): Array<{
  effect: string
  frequency: string
  severity: string
}> {
  const sideEffects = []
  
  if (safetyNotes.includes('胃') || safetyNotes.includes('stomach')) {
    sideEffects.push({
      effect: 'Stomach upset or digestive discomfort',
      frequency: 'Occasional',
      severity: 'Mild'
    })
  }
  
  if (safetyNotes.includes('头痛') || safetyNotes.includes('headache')) {
    sideEffects.push({
      effect: 'Headache',
      frequency: 'Rare',
      severity: 'Mild to Moderate'
    })
  }
  
  if (safetyNotes.includes('失眠') || safetyNotes.includes('insomnia')) {
    sideEffects.push({
      effect: 'Sleep disturbances or insomnia',
      frequency: 'Occasional',
      severity: 'Mild'
    })
  }
  
  if (safetyNotes.includes('皮疹') || safetyNotes.includes('allergic') || safetyNotes.includes('rash')) {
    sideEffects.push({
      effect: 'Allergic skin reactions',
      frequency: 'Rare',
      severity: 'Mild to Severe'
    })
  }
  
  return sideEffects.length > 0 ? sideEffects : [{
    effect: 'Individual responses may vary',
    frequency: 'Variable',
    severity: 'Consult healthcare provider'
  }]
}

function getQualityGrade(score: number): {
  grade: string
  description: string
  factors: string[]
} {
  if (score >= 90) {
    return {
      grade: 'A+',
      description: 'Excellent quality with strong research backing',
      factors: ['High purity', 'Third-party tested', 'Strong clinical evidence']
    }
  }
  
  if (score >= 80) {
    return {
      grade: 'A',
      description: 'Very good quality with good research support',
      factors: ['Good purity', 'Quality tested', 'Clinical studies available']
    }
  }
  
  if (score >= 70) {
    return {
      grade: 'B+',
      description: 'Good quality with adequate research',
      factors: ['Acceptable purity', 'Some testing', 'Limited studies']
    }
  }
  
  if (score >= 60) {
    return {
      grade: 'B',
      description: 'Fair quality with basic research',
      factors: ['Basic quality standards', 'Minimal testing', 'Traditional use evidence']
    }
  }
  
  return {
    grade: 'C',
    description: 'Limited quality information available',
    factors: ['Quality unknown', 'No standardized testing', 'Limited evidence']
  }
}

function getSimilarIngredients(efficacy: string[]): Array<{
  name: string
  reason: string
  safety_score: number
}> {
  const similar = []
  
  if (efficacy.includes('消化健康') || efficacy.includes('digestive')) {
    similar.push(
      { name: 'Peppermint', reason: 'Also supports digestive health', safety_score: 88 },
      { name: 'Chamomile', reason: 'Gentle digestive support', safety_score: 92 },
      { name: 'Fennel', reason: 'Traditional digestive aid', safety_score: 85 }
    )
  }
  
  if (efficacy.includes('抗炎') || efficacy.includes('anti-inflammatory')) {
    similar.push(
      { name: 'Turmeric', reason: 'Powerful anti-inflammatory', safety_score: 78 },
      { name: 'Boswellia', reason: 'Natural anti-inflammatory', safety_score: 82 },
      { name: 'Willow Bark', reason: 'Traditional pain relief', safety_score: 75 }
    )
  }
  
  if (efficacy.includes('免疫') || efficacy.includes('immune')) {
    similar.push(
      { name: 'Echinacea', reason: 'Immune system support', safety_score: 80 },
      { name: 'Astragalus', reason: 'Traditional immune tonic', safety_score: 88 },
      { name: 'Elderberry', reason: 'Natural immune booster', safety_score: 90 }
    )
  }
  
  return similar.slice(0, 4)
}

function getAlternativeOptions(safetyLevel: string, efficacy: string[]): Array<{
  name: string
  why_alternative: string
  safety_advantage: string
  efficacy_comparison: string
}> {
  const alternatives = []
  
  // 如果当前成分安全性较低，推荐更安全的替代品
  if (safetyLevel === 'low') {
    alternatives.push({
      name: 'Chamomile',
      why_alternative: 'Much safer option with similar benefits',
      safety_advantage: 'Very high safety profile, suitable for most people',
      efficacy_comparison: 'Gentler but effective for relaxation and mild digestive issues'
    })
    
    alternatives.push({
      name: 'Peppermint',
      why_alternative: 'Safer choice for digestive support',
      safety_advantage: 'Generally recognized as safe, minimal interactions',
      efficacy_comparison: 'Effective for digestive issues with better safety margin'
    })
  }
  
  return alternatives
} 