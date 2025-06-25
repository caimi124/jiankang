import { NextRequest, NextResponse } from 'next/server'
import { EnhancedHerbSearch, EnhancedHerbData, createHerbSearchEngine } from '../../../../lib/enhanced-herbs-search'

// 模拟草药数据 - 在实际应用中应该从数据库获取
const mockHerbsData: EnhancedHerbData[] = [
  {
    id: 'ginger',
    name: 'Ginger',
    chineseName: '生姜',
    latinName: 'Zingiber officinale',
    briefDescription: '温胃散寒、降逆止呕、化痰止咳',
    dosage: '3-10g',
    usage: '煎汤内服',
    safetyLevel: 'high',
    precautions: '胃溃疡患者慎用',
    medicalCaseAnalysis: '案例分析内容...',
    wellnessRecipes: '养生食谱内容...',
    practicalTips: '实用小贴士内容...',
    applicableSymptoms: ['nausea', 'indigestion', 'cold'],
    applicableDiseases: ['消化不良', '晕车', '感冒'],
    contraindicationGroups: ['胃溃疡'],
    contraindicationDetails: '胃溃疡患者慎用',
    tcmConstitution: ['寒性体质'],
    effectCategories: ['消化', '温中']
  },
  {
    id: 'valerian',
    name: 'Valerian',
    chineseName: '缬草',
    latinName: 'Valeriana officinalis',
    briefDescription: '镇静安神、改善睡眠质量',
    dosage: '2-6g',
    usage: '睡前服用',
    safetyLevel: 'high',
    precautions: '孕妇禁用',
    medicalCaseAnalysis: '案例分析内容...',
    wellnessRecipes: '养生食谱内容...',
    practicalTips: '实用小贴士内容...',
    applicableSymptoms: ['insomnia', 'anxiety', 'stress'],
    applicableDiseases: ['失眠', '焦虑症', '神经衰弱'],
    contraindicationGroups: ['孕妇', '哺乳期'],
    contraindicationDetails: '孕妇及哺乳期妇女禁用',
    tcmConstitution: ['热性体质'],
    effectCategories: ['安神', '镇静']
  }
]

const searchEngine = new EnhancedHerbSearch(mockHerbsData)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    const symptoms = searchParams.get('symptoms')?.split(',').filter(Boolean) || []
    const conditions = searchParams.get('conditions')?.split(',').filter(Boolean) || []
    const ageParam = searchParams.get('age')
    const gender = searchParams.get('gender') as 'male' | 'female' | undefined

    let results: EnhancedHerbData[] = []

    // 根据搜索类型执行不同的搜索
    if (symptoms.length > 0) {
      // 症状搜索
      results = searchEngine.searchBySymptoms(symptoms)
    } else if (query) {
      // 文本搜索 - 搜索所有相关字段
      results = mockHerbsData.filter(herb => 
        herb.name.toLowerCase().includes(query.toLowerCase()) ||
        herb.chineseName.includes(query) ||
        herb.briefDescription.includes(query) ||
        herb.applicableSymptoms.some(symptom => symptom.includes(query.toLowerCase())) ||
        herb.applicableDiseases.some(disease => disease.includes(query))
      )
    } else {
      // 获取所有草药
      results = mockHerbsData
    }

    // 如果用户提供了健康状况，进行安全检查
    let safetyResults: any = null
    if (conditions.length > 0) {
      safetyResults = searchEngine.checkContraindications(conditions)
      
      // 为每个结果添加安全状态
      results = results.map(herb => {
        let safetyStatus = 'safe'
        if (safetyResults.forbidden.some((h: EnhancedHerbData) => h.id === herb.id)) {
          safetyStatus = 'forbidden'
        } else if (safetyResults.caution.some((h: EnhancedHerbData) => h.id === herb.id)) {
          safetyStatus = 'caution'
        }
        
        return {
          ...herb,
          safetyStatus
        }
      })
    }

    // 如果提供了用户信息，进行个性化推荐
    if (symptoms.length > 0 || conditions.length > 0) {
      const personalizedResults = searchEngine.getPersonalizedRecommendations({
        symptoms,
        conditions,
        age: ageParam ? parseInt(ageParam) : undefined,
        gender
      })
      
      // 添加推荐信息
      const recommendedIds = personalizedResults.recommended.map(h => h.id)
      results = results.map(herb => ({
        ...herb,
        isRecommended: recommendedIds.includes(herb.id),
        warnings: personalizedResults.warnings,
        suggestions: personalizedResults.suggestions
      }))

      // 将推荐的草药排在前面
      results.sort((a: any, b: any) => {
        if (a.isRecommended && !b.isRecommended) return -1
        if (!a.isRecommended && b.isRecommended) return 1
        return 0
      })
    }

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
      safetyInfo: safetyResults,
      searchParams: {
        query,
        symptoms,
        conditions,
        age: ageParam,
        gender
      }
    })

  } catch (error) {
    console.error('Enhanced search error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Search failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      symptoms = [], 
      conditions = [], 
      age,
      gender
    } = body

    // 获取个性化推荐
    const recommendations = searchEngine.getPersonalizedRecommendations({
      symptoms,
      conditions,
      age,
      gender: gender as 'male' | 'female' | undefined
    })

    // 获取安全检查结果
    let safetyResults = null
    if (conditions.length > 0) {
      safetyResults = searchEngine.checkContraindications(conditions)
    }

    return NextResponse.json({
      success: true,
      data: recommendations,
      safetyInfo: safetyResults
    })

  } catch (error) {
    console.error('Personalized search error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Personalized search failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 