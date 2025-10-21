import { NextRequest, NextResponse } from 'next/server'
import { 
  getHerbRecommendations, 
  getQuickRecommendations,
  type RecommendationCriteria,
  type HealthConcern,
  type ConstitutionType,
  type SafetyLevel
} from '@/lib/herbRecommendationEngine'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      constitutionType,
      secondaryConstitution,
      healthConcerns = [],
      safetyPreference = ['high', 'medium'],
      budget,
      experienceLevel = 'beginner'
    } = body

    if (!constitutionType) {
      return NextResponse.json(
        { error: 'Constitution type is required' },
        { status: 400 }
      )
    }

    // 构建推荐条件
    const criteria: RecommendationCriteria = {
      constitutionType: constitutionType as ConstitutionType,
      secondaryConstitution: secondaryConstitution as ConstitutionType | undefined,
      healthConcerns: healthConcerns as HealthConcern[],
      safetyPreference: safetyPreference as SafetyLevel[],
      budget: budget as 'low' | 'medium' | 'high' | undefined,
      experienceLevel: experienceLevel as 'beginner' | 'intermediate' | 'advanced'
    }

    // 获取智能推荐
    const recommendations = getHerbRecommendations(criteria)

    // 分类推荐结果
    const highPriority = recommendations.filter(r => r.priority === 'high')
    const mediumPriority = recommendations.filter(r => r.priority === 'medium')
    const lowPriority = recommendations.filter(r => r.priority === 'low')

    return NextResponse.json({
      success: true,
      data: {
        primary: highPriority.slice(0, 3),
        secondary: mediumPriority.slice(0, 3),
        additional: lowPriority.slice(0, 2),
        all: recommendations,
        totalCount: recommendations.length
      },
      criteria: {
        constitutionType,
        secondaryConstitution,
        healthConcerns,
        safetyPreference
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error generating herb recommendations:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate recommendations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const concern = searchParams.get('concern')
    const limit = parseInt(searchParams.get('limit') || '6')

    if (!concern) {
      return NextResponse.json(
        { error: 'Health concern parameter is required' },
        { status: 400 }
      )
    }

    // 根据健康问题快速推荐
    const recommendations = getQuickRecommendations(concern as HealthConcern, limit)

    return NextResponse.json({
      success: true,
      data: recommendations,
      type: 'concern-based',
      concern,
      count: recommendations.length
    })

  } catch (error) {
    console.error('Error fetching herb recommendations:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch recommendations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 