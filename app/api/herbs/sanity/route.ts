import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity'

// Skip this API route during build if Sanity is not configured
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.VERCEL_ENV) {
  console.warn('⚠️ Skipping Sanity API route during build - no projectId')
}

// 🚀 性能优化：增加缓存时间，减少重复查询
export async function GET(request: NextRequest) {
	try {
		// Return early if Sanity is not properly configured during build
		if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
			return NextResponse.json({
				success: false,
				error: 'Sanity not configured',
				data: [],
				meta: { total: 0, page: 1, limit: 0, totalPages: 0 }
			}, { status: 503 })
		}
		const { searchParams } = new URL(request.url)
		const limitParam = searchParams.get('limit')
		const pageParam = searchParams.get('page')
		const q = (searchParams.get('q') || '').trim().toLowerCase()
		const safety = searchParams.get('safety') || ''
		const constitution = searchParams.get('constitution') || ''
		const limit = Math.min(Number(limitParam) || 24, 100)
		const page = Math.max(Number(pageParam) || 1, 1)
		const start = (page - 1) * limit
		const end = start + limit

		// 🚀 优化：构建更高效的查询
		const baseFilter = `*[_type == "herb"${constitution ? ' && constitutionType == $constitution' : ''}${safety ? ' && safetyLevel == $safety' : ''}]`
		const searchFilter = q ? ` && (
		  title match $q ||
		  chineseName match $q ||
		  latinName match $q ||
		  description match $q ||
		  count(primaryEffects[@ match $q]) > 0
		)` : ''
		const fullFilter = `${baseFilter}${searchFilter}`
		
		// 🚀 优化：单次查询获取数据和总数，减少网络往返
		const optimizedQuery = `{
		  "items": ${fullFilter} | order(_createdAt desc) [${start}...${end}] {
		    _id,
		    "id": _id,
		    "slug": slug.current,
		    title,
		    chineseName,
		    latinName,
		    category,
		    constitutionType,
		    primaryEffects,
		    activeCompounds,
		    dosage,
		    safetyLevel,
		    contraindications,
		    description,
		    traditionalUse,
		    modernApplications,
		    featuredImage,
		    gallery
		  },
		  "total": count(${fullFilter})
		}`
		
		const result = await sanityFetch<{items: any[], total: number}>(
			optimizedQuery, 
			{ q: q ? `*${q}*` : undefined, safety: safety || undefined, constitution: constitution || undefined }, 
			{ next: { revalidate: 300 } } // 🚀 增加缓存时间到5分钟
		)
		
		const herbsRaw = result?.items || []
		const totalItems = result?.total || 0

		const herbs = (herbsRaw || []).map((herb: any) => ({
			id: herb._id,
			chinese_name: herb.chineseName || herb.title,
			english_name: herb.title,
			latin_name: herb.latinName || herb.title,
			description: herb.description || '',
			efficacy: herb.primaryEffects || [],
			primary_effects: herb.primaryEffects || [],
			safety_level: herb.safetyLevel || 'medium',
			constitution_type: herb.constitutionType || '平和质',
			traditional_use: herb.traditionalUse || herb.description || '',
			modern_applications: herb.modernApplications || herb.description || '',
			dosage: herb.dosage || '请咨询专业医师',
			contraindications: herb.contraindications || '',
			quality_score: 85, // 默认高质量
			popularity_score: 80,
			ingredients: herb.activeCompounds || ['待补充'],
			category: herb.category || '',
			part_used: '',
			taste: '',
			meridians: [],
			source: 'sanity',
			price_range: 'moderate',
			availability: 'common',
			slug: herb.slug
		}))

		// 🚀 优化：添加性能监控headers
		const response = NextResponse.json({
			success: true,
			data: herbs,
			meta: {
				total: totalItems,
				page,
				limit,
				totalPages: Math.ceil(totalItems / limit)
			},
			query: { q, safety, constitution, page, limit }
		})

		// 🚀 优化：设置缓存headers
		response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
		response.headers.set('X-Cache-Status', 'MISS')
		
		return response

	} catch (error) {
		console.error('❌ Sanity API Error:', error)
		
		return NextResponse.json({
			success: false,
			error: 'Failed to fetch herbs from Sanity',
			message: error instanceof Error ? error.message : 'Unknown error'
		}, { 
			status: 500,
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate'
			}
		})
	}
}
