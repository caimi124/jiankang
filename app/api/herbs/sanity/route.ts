import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity'

export async function GET(request: NextRequest) {
	try {
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

		const baseFilter = `*[_type == "herb"${constitution ? ' && constitutionType == $constitution' : ''}${safety ? ' && safetyLevel == $safety' : ''}]`
		const searchFilter = q ? ` && (
		  title match $q ||
		  chineseName match $q ||
		  latinName match $q ||
		  description match $q ||
		  count(primaryEffects[@ match $q]) > 0
		)` : ''
		const fullFilter = `${baseFilter}${searchFilter}`
		const countQuery = `${fullFilter} | order(publishedAt desc)`
		const pageQuery = `${fullFilter} | order(publishedAt desc) [${start}...${end}] {
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
		  }`
		const totalItems = await sanityFetch<any[]>(countQuery, { q: q ? `*${q}*` : undefined, safety: safety || undefined, constitution: constitution || undefined }, { next: { revalidate: 30 } })
		const herbsRaw = await sanityFetch<any[]>(pageQuery, { q: q ? `*${q}*` : undefined, safety: safety || undefined, constitution: constitution || undefined }, { next: { revalidate: 30 } })

		const herbs = (herbsRaw || []).map((h) => ({
			id: h.id || h.slug || h._id,
			slug: h.slug,
			chinese_name: h.chineseName || h.title || '',
			english_name: h.title || '',
			latin_name: h.latinName || '',
			category: h.category || '',
			constitution_type: h.constitutionType || '',
			primary_effects: Array.isArray(h.primaryEffects) ? h.primaryEffects : [],
			secondary_effects: [],
			efficacy: Array.isArray(h.primaryEffects) ? h.primaryEffects : [],
			dosage: h.dosage || '',
			safety_level: h.safetyLevel || 'medium',
			contraindications: h.contraindications || '',
			description: h.description || h.modernApplications || '',
			traditional_use: h.traditionalUse || '',
			modern_applications: h.modernApplications || '',
			taste: '',
			meridians: [],
			part_used: '',
			source: 'sanity',
			growing_regions: [],
			price_range: '',
			availability: 'common',
			quality_score: 75,
			popularity_score: 70,
			usage_suggestions: '',
			ingredients: Array.isArray(h.activeCompounds)
				? h.activeCompounds
				: h.activeCompounds
				? [h.activeCompounds]
				: [],
			image_url: h.featuredImage?.asset?._ref || null,
			gallery: Array.isArray(h.gallery) ? h.gallery.map((g:any)=>g.asset?._ref).filter(Boolean) : []
		}))

		return NextResponse.json({ success: true, data: herbs, meta: { page, limit, total: (totalItems || []).length } })
	} catch (error: any) {
		console.error('Sanity herbs API error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch herbs from Sanity' },
			{ status: 500 }
		)
	}
}
