import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity'

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const limitParam = searchParams.get('limit')
		const limit = Math.min(Number(limitParam) || 100, 500)

		const query = `
		  *[_type == "herb"] | order(publishedAt desc) [0...$limit] {
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
		    modernApplications
		  }
		`
		const herbsRaw = await sanityFetch<any[]>(query, { limit }, { next: { revalidate: 60 } })

		const herbs = (herbsRaw || []).map((h) => ({
			id: h.id || h.slug || h._id,
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
				: []
		}))

		return NextResponse.json({ success: true, data: herbs })
	} catch (error: any) {
		console.error('Sanity herbs API error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch herbs from Sanity' },
			{ status: 500 }
		)
	}
}
