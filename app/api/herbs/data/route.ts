import { NextRequest, NextResponse } from 'next/server'
import { herbsDataService } from '../../../../lib/herbs-recommendation'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { HERBS_DATABASE } from '@/lib/herbs-data-complete'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 1000 // 提高速率限制
})

// Input validation schema
const QuerySchema = z.object({
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).optional(),
  search: z.string().min(1).max(100).optional(),
  category: z.string().min(1).max(50).optional(),
  safety: z.enum(['high', 'medium', 'low']).optional()
})

export async function GET(request: NextRequest) {
  try {
    // Rate limiting (更宽松)
    try {
      await limiter.check(20, 'HERBS_API_CACHE') // 20 requests per minute per token
    } catch {
      return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60'
        }
      })
    }

    const { searchParams } = new URL(request.url)
    const rawParams = Object.fromEntries(searchParams.entries())
    
    // Validate input
    const validatedParams = QuerySchema.safeParse(rawParams)
    if (!validatedParams.success) {
      return new NextResponse(JSON.stringify({ 
        error: 'Invalid parameters',
        details: validatedParams.error.errors
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const { limit = 100, search, category, safety } = validatedParams.data

    let filteredHerbs = [...HERBS_DATABASE]

    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase()
      filteredHerbs = filteredHerbs.filter(herb => 
        herb.chinese_name.toLowerCase().includes(searchLower) ||
        herb.english_name.toLowerCase().includes(searchLower) ||
        herb.description.toLowerCase().includes(searchLower) ||
        herb.efficacy.some((effect: string) => effect.toLowerCase().includes(searchLower))
      )
    }

    if (category) {
      filteredHerbs = filteredHerbs.filter(herb => 
        herb.category === category
      )
    }

    if (safety) {
      filteredHerbs = filteredHerbs.filter(herb => 
        herb.safety_level === safety
      )
    }

    // Limit results
    filteredHerbs = filteredHerbs.slice(0, limit)

    return new NextResponse(JSON.stringify({
      herbs: filteredHerbs,
      total: filteredHerbs.length,
      limit
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600, max-age=300'
      }
    })

  } catch (error) {
    console.error('Herbs API Error:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

// Clear cache endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'clear-cache') {
      herbsDataService.clearCache()
      return NextResponse.json({
        success: true,
        message: 'Cache cleared successfully'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Error processing DELETE request:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 