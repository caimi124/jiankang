import { NextRequest, NextResponse } from 'next/server'
import { herbsDataService } from '../../../../lib/herbs-recommendation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const efficacy = searchParams.get('efficacy')
    const constitution = searchParams.get('constitution')
    const safety = searchParams.get('safety')
    const limit = parseInt(searchParams.get('limit') || '50')

    if (efficacy) {
      const herbs = await herbsDataService.searchHerbsByEfficacy([efficacy], limit)
      return NextResponse.json({
        success: true,
        data: herbs,
        filter: { type: 'efficacy', value: efficacy },
        count: herbs.length
      })
    }

    if (constitution) {
      const herbs = await herbsDataService.searchHerbsByConstitution(constitution, limit)
      return NextResponse.json({
        success: true,
        data: herbs,
        filter: { type: 'constitution', value: constitution },
        count: herbs.length
      })
    }

    // Get all herbs
    const allHerbs = await herbsDataService.fetchAllHerbs()
    let filteredHerbs = allHerbs

    if (safety) {
      filteredHerbs = allHerbs.filter(herb => herb.safetyLevel === safety)
    }

    const paginatedHerbs = filteredHerbs.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: paginatedHerbs,
      filter: safety ? { type: 'safety', value: safety } : null,
      count: paginatedHerbs.length,
      total: allHerbs.length
    })

  } catch (error) {
    console.error('Error fetching herbs data:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch herbs data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
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