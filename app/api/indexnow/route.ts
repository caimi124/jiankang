import { NextRequest, NextResponse } from 'next/server'
import { submitUrlToIndexNow, submitBatchToIndexNow } from '@/lib/indexnow'

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
      const success = await submitUrlToIndexNow(body.url)
      return NextResponse.json({
        success,
        message: success ? 'URL submitted successfully' : 'Failed to submit URL',
        url: body.url,
      })
    }

    // 批量 URL 提交
    if (body.urls && Array.isArray(body.urls)) {
      const successCount = await submitBatchToIndexNow(body.urls)
      return NextResponse.json({
        success: successCount > 0,
        message: `Successfully submitted ${successCount} of ${body.urls.length} URLs`,
        successCount,
        totalCount: body.urls.length,
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

