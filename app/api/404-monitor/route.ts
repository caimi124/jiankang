import { NextRequest, NextResponse } from 'next/server'

interface NotFoundLog {
  timestamp: string
  path: string
  referrer?: string
  userAgent?: string
  ip?: string
  searchParams?: string
}

// 在实际应用中，你可能会想要将这些数据存储到数据库中
let notFoundLogs: NotFoundLog[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, referrer, userAgent } = body

    // 记录404错误
    const log: NotFoundLog = {
      timestamp: new Date().toISOString(),
      path: path || 'unknown',
      referrer: referrer || request.headers.get('referer') || undefined,
      userAgent: userAgent || request.headers.get('user-agent') || undefined,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      searchParams: request.nextUrl.searchParams.toString() || undefined
    }

    notFoundLogs.push(log)
    
    // 保持日志数量在合理范围内（最近1000条）
    if (notFoundLogs.length > 1000) {
      notFoundLogs = notFoundLogs.slice(-1000)
    }

    console.log('404 Error logged:', log)

    return NextResponse.json({ 
      success: true, 
      message: '404 error logged successfully' 
    })
  } catch (error) {
    console.error('Error logging 404:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to log 404 error' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // 简单的授权检查（在生产环境中应该使用更安全的方法）
    const authHeader = request.headers.get('authorization')
    if (authHeader !== 'Bearer admin-access-token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 分析404错误数据
    const analysis = analyze404Logs()
    
    return NextResponse.json({
      success: true,
      totalErrors: notFoundLogs.length,
      recentErrors: notFoundLogs.slice(-50),
      analysis
    })
  } catch (error) {
    console.error('Error retrieving 404 logs:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to retrieve 404 logs' 
    }, { status: 500 })
  }
}

function analyze404Logs() {
  if (notFoundLogs.length === 0) {
    return {
      mostCommonPaths: [],
      mostCommonReferrers: [],
      hourlyDistribution: {},
      recommendations: []
    }
  }

  // 分析最常见的404路径
  const pathCounts: Record<string, number> = {}
  const referrerCounts: Record<string, number> = {}
  const hourlyDistribution: Record<string, number> = {}

  notFoundLogs.forEach(log => {
    // 路径分析
    pathCounts[log.path] = (pathCounts[log.path] || 0) + 1
    
    // 来源分析
    if (log.referrer) {
      referrerCounts[log.referrer] = (referrerCounts[log.referrer] || 0) + 1
    }
    
    // 时间分布分析
    const hour = new Date(log.timestamp).getHours()
    hourlyDistribution[hour] = (hourlyDistribution[hour] || 0) + 1
  })

  // 排序并获取top 10
  const mostCommonPaths = Object.entries(pathCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }))

  const mostCommonReferrers = Object.entries(referrerCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([referrer, count]) => ({ referrer, count }))

  // 生成修复建议
  const recommendations = generateRecommendations(mostCommonPaths)

  return {
    mostCommonPaths,
    mostCommonReferrers,
    hourlyDistribution,
    recommendations
  }
}

function generateRecommendations(commonPaths: Array<{path: string, count: number}>) {
  const recommendations: string[] = []

  commonPaths.forEach(({ path, count }) => {
    if (count > 10) { // 如果某个路径错误超过10次
      if (path.includes('/herbs/')) {
        recommendations.push(`Create redirect for ${path} to /herb-finder or create the missing herb page`)
      } else if (path.includes('/blog/')) {
        recommendations.push(`Create redirect for ${path} to /blog or restore the missing article`)
      } else if (path.includes('/articles/')) {
        recommendations.push(`Create redirect for ${path} to /articles or restore the missing article`)
      } else {
        recommendations.push(`Investigate high-frequency 404 for ${path} (${count} occurrences)`)
      }
    }
  })

  return recommendations
} 