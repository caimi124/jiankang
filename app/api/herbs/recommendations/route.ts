import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      primaryConstitution, 
      secondaryConstitutions = [], 
      healthGoals = [],
      safetyPreference = ['high', 'medium']
    } = body

    if (!primaryConstitution) {
      return NextResponse.json(
        { error: 'Primary constitution type is required' },
        { status: 400 }
      )
    }

    // 简化的推荐逻辑
    const mockRecommendations = {
      primary: [
        {
          id: 'ginseng',
          name: 'Ginseng',
          chineseName: '人参',
          description: '补气养血，增强免疫力',
          composition: ['人参皂苷', '多糖'],
          dosage: '每日 200-400mg',
          efficacy: ['免疫支持', '能量提升'],
          usage: '早餐后服用',
          safetyLevel: 'high' as const,
          precautions: '孕妇慎用',
          tcmConstitution: '平和质',
          caseStudy: '临床研究显示有效'
        }
      ],
      secondary: [],
      goalBased: [],
      all: [
        {
          id: 'ginseng',
          name: 'Ginseng',
          chineseName: '人参',
          description: '补气养血，增强免疫力',
          composition: ['人参皂苷', '多糖'],
          dosage: '每日 200-400mg',
          efficacy: ['免疫支持', '能量提升'],
          usage: '早餐后服用',
          safetyLevel: 'high' as const,
          precautions: '孕妇慎用',
          tcmConstitution: '平和质',
          caseStudy: '临床研究显示有效'
        }
      ],
      totalCount: 1
    }

    return NextResponse.json({
      success: true,
      data: mockRecommendations,
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
    const constitution = searchParams.get('constitution')
    const concern = searchParams.get('concern')
    const limit = parseInt(searchParams.get('limit') || '6')

    // 简化的mock数据
    const mockHerbs = [
      {
        id: 'ginseng',
        name: 'Ginseng',
        chineseName: '人参',
        description: '补气养血，增强免疫力',
        composition: ['人参皂苷', '多糖'],
        dosage: '每日 200-400mg',
        efficacy: ['免疫支持', '能量提升'],
        usage: '早餐后服用',
        safetyLevel: 'high' as const,
        precautions: '孕妇慎用',
        tcmConstitution: '平和质',
        caseStudy: '临床研究显示有效'
      }
    ]

    return NextResponse.json({
      success: true,
      data: mockHerbs.slice(0, limit),
      type: concern ? 'concern-based' : 'constitution-based',
      ...(concern && { concern }),
      ...(constitution && { constitution })
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