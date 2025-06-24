import { NextRequest, NextResponse } from 'next/server'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// GET /api/blog/[slug] - 获取单篇博客文章
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params
    const { slug } = params
    
    console.log(`[API] 获取博客文章: ${slug}`)

    // 调用Notion同步API获取文章
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://herbscience.shop' 
      : 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/blog/sync-to-notion?action=get_post&slug=${slug}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      console.log(`[API] 博客API响应错误: ${response.status}`)
      return NextResponse.json(
        {
          success: false,
          error: 'Blog post not found',
          message: `No blog post found for slug: ${slug}`
        },
        { status: 404 }
      )
    }

    const data = await response.json()
    
    if (!data.success || !data.data) {
      console.log(`[API] 未找到博客文章: ${slug}`)
      return NextResponse.json(
        {
          success: false,
          error: 'Blog post not found',
          message: `No blog post found for slug: ${slug}`
        },
        { status: 404 }
      )
    }

    console.log(`[API] 成功返回博客文章: ${data.data.title}`)
    
    return NextResponse.json({
      success: true,
      data: data.data,
      meta: {
        slug,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }
    })
    
  } catch (error) {
    console.error('[API] 博客文章查询错误:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch blog post details'
      },
      { status: 500 }
    )
  }
} 