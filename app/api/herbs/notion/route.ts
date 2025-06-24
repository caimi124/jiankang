import { NextRequest, NextResponse } from 'next/server'
import { getAllHerbsFromNotion, searchHerbsFromNotion, testNotionConnection } from '@/lib/notion-herbs-api'

// GET /api/herbs/notion - 获取所有草药或搜索草药
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const test = searchParams.get('test')

    // 测试连接
    if (test === 'true') {
      const isConnected = await testNotionConnection()
      return NextResponse.json({
        success: isConnected,
        message: isConnected ? 'Notion connection successful' : 'Notion connection failed'
      })
    }

    let herbs
    
    if (query) {
      // 搜索草药
      console.log(`🔍 Searching for herbs: "${query}"`)
      herbs = await searchHerbsFromNotion(query)
    } else {
      // 获取所有草药
      console.log('📋 Fetching all herbs from Notion')
      herbs = await getAllHerbsFromNotion()
    }

    // 限制返回数量
    const limitedHerbs = herbs.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: limitedHerbs,
      total: herbs.length,
      returned: limitedHerbs.length,
      query: query || 'all',
      source: 'notion'
    })

  } catch (error) {
    console.error('❌ Error in herbs/notion API:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch herbs from Notion',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST /api/herbs/notion - 批量操作或高级搜索
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, query, filters } = body

    switch (action) {
      case 'search':
        const searchResults = await searchHerbsFromNotion(query || '')
        return NextResponse.json({
          success: true,
          data: searchResults,
          total: searchResults.length
        })

      case 'test_connection':
        const isConnected = await testNotionConnection()
        return NextResponse.json({
          success: isConnected,
          message: isConnected ? 'Notion connection successful' : 'Connection failed'
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('❌ Error in herbs/notion POST:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process request',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 