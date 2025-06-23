import { NextRequest, NextResponse } from 'next/server'

interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

interface PerformanceData {
  metrics: PerformanceMetric[]
  timestamp: string
  userAgent: string
  url: string
}

export async function POST(request: NextRequest) {
  try {
    const { metrics } = await request.json()
    
    if (!metrics || !Array.isArray(metrics)) {
      return NextResponse.json(
        { error: 'Invalid metrics data' },
        { status: 400 }
      )
    }

    const performanceData: PerformanceData = {
      metrics,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      url: request.headers.get('referer') || 'unknown'
    }

    // 在这里可以将数据发送到你的分析服务
    // 例如：发送到数据库、第三方分析服务等
    console.log('Performance metrics received:', performanceData)

    // 如果需要发送到外部服务，可以在这里添加代码
    // await sendToAnalyticsService(performanceData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing performance metrics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Performance analytics endpoint is active',
    timestamp: new Date().toISOString()
  })
} 