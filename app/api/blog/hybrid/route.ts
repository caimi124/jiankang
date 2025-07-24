/**
 * 混合博客 CMS API
 * 统一处理 Sanity + Notion + 本地备份的博客内容
 */

import { NextRequest, NextResponse } from 'next/server'
import { hybridBlogCMS } from '../../../../lib/blog-hybrid'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const slug = searchParams.get('slug')
    const category = searchParams.get('category')

    switch (action) {
      case 'all':
        // 获取所有文章
        const allPosts = await hybridBlogCMS.getAllPosts()
        return NextResponse.json({
          success: true,
          data: allPosts,
          count: allPosts.length,
          sources: {
            sanity: allPosts.filter(p => p.source === 'sanity').length,
            notion: allPosts.filter(p => p.source === 'notion').length,
            local: allPosts.filter(p => p.source === 'local').length
          }
        })

      case 'post':
        // 获取单篇文章
        if (!slug) {
          return NextResponse.json({
            success: false,
            error: 'Slug parameter is required'
          }, { status: 400 })
        }

        const post = await hybridBlogCMS.getPostBySlug(slug)
        if (!post) {
          return NextResponse.json({
            success: false,
            error: 'Post not found',
            message: `No blog post found for slug: ${slug}`
          }, { status: 404 })
        }

        return NextResponse.json({
          success: true,
          data: post,
          source: post.source
        })

      case 'featured':
        // 获取特色文章
        const featuredPosts = await hybridBlogCMS.getFeaturedPosts()
        return NextResponse.json({
          success: true,
          data: featuredPosts,
          count: featuredPosts.length
        })

      case 'category':
        // 按分类获取文章
        if (!category) {
          return NextResponse.json({
            success: false,
            error: 'Category parameter is required'
          }, { status: 400 })
        }

        const categoryPosts = await hybridBlogCMS.getPostsByCategory(category)
        return NextResponse.json({
          success: true,
          data: categoryPosts,
          count: categoryPosts.length,
          category
        })

      case 'health':
        // 健康检查
        const healthCheck = {
          sanity: false,
          notion: false,
          local: true
        }

        try {
          const testPosts = await hybridBlogCMS.getAllPosts()
          const sources = testPosts.reduce((acc, post) => {
            acc[post.source] = true
            return acc
          }, healthCheck)

          return NextResponse.json({
            success: true,
            health: sources,
            message: 'Hybrid CMS health check completed',
            availableSources: Object.keys(sources).filter(key => sources[key as keyof typeof sources])
          })
        } catch (error) {
          return NextResponse.json({
            success: false,
            health: healthCheck,
            error: 'Health check failed',
            details: error instanceof Error ? error.message : 'Unknown error'
          })
        }

      default:
        // 默认返回API信息
        return NextResponse.json({
          success: true,
          message: 'HerbScience 混合博客 CMS API',
          version: '1.0',
          endpoints: {
            'GET /api/blog/hybrid?action=all': '获取所有文章',
            'GET /api/blog/hybrid?action=post&slug={slug}': '获取单篇文章',
            'GET /api/blog/hybrid?action=featured': '获取特色文章',
            'GET /api/blog/hybrid?action=category&category={slug}': '按分类获取文章',
            'GET /api/blog/hybrid?action=health': '系统健康检查'
          },
          sources: ['sanity', 'notion', 'local']
        })
    }
  } catch (error) {
    console.error('[API] Hybrid blog error:', error)

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process hybrid blog request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 