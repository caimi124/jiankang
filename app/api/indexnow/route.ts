import { NextRequest, NextResponse } from 'next/server'
import { submitToIndexNow, submitHerbPagesToIndexNow } from '@/lib/utils'

/**
 * POST /api/indexnow
 * 接收 URL 并提交到 IndexNow API
 * 
 * Body:
 * {
 *   "url": "https://herbscience.shop/blog/new-post"  // 单个URL
 * }
 * 或
 * {
 *   "urls": ["url1", "url2", ...]  // 批量URL
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 验证请求来源（可选，增加安全性）
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.INDEXNOW_WEBHOOK_SECRET

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 单个 URL 提交
    if (body.url) {
      const success = await submitToIndexNow([body.url])
      return NextResponse.json({
        success,
        message: success ? 'URL submitted to IndexNow successfully' : 'Failed to submit URL to IndexNow',
        url: body.url,
        timestamp: new Date().toISOString()
      })
    }

    // 批量 URL 提交
    if (body.urls && Array.isArray(body.urls)) {
      const success = await submitToIndexNow(body.urls)
      return NextResponse.json({
        success,
        message: success ? `Successfully submitted ${body.urls.length} URLs to IndexNow` : 'Failed to submit URLs to IndexNow',
        urlCount: body.urls.length,
        timestamp: new Date().toISOString()
      })
    }
    
    // 🌿 特定草药页面批量提交
    if (body.herbSlugs && Array.isArray(body.herbSlugs)) {
      const success = await submitHerbPagesToIndexNow(body.herbSlugs)
      return NextResponse.json({
        success,
        message: success ? `Successfully submitted ${body.herbSlugs.length} herb pages to IndexNow` : 'Failed to submit herb pages to IndexNow',
        herbCount: body.herbSlugs.length,
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request body. Provide "url" or "urls".' },
      { status: 400 }
    )
  } catch (error) {
    console.error('IndexNow API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/indexnow
 * 返回 API 使用说明
 */
export async function GET() {
  return NextResponse.json({
    name: 'IndexNow API',
    description: 'Submit URLs to search engines (Bing, Yandex, etc.) for instant indexing',
    endpoints: {
      POST: {
        url: '/api/indexnow',
        body: {
          single: { url: 'https://herbscience.shop/blog/new-post' },
          batch: { urls: ['url1', 'url2', '...'] },
          herbs: { herbSlugs: ['ginseng', 'turmeric', 'chamomile'] },
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_WEBHOOK_SECRET (optional)',
        },
      },
    },
    documentation: 'https://www.indexnow.org/documentation',
  })
}

