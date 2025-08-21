import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HerbDetailClient from './HerbDetailClient'
import { sanityFetch } from '@/lib/sanity'

// 从Sanity获取并映射草药数据到客户端所需结构
async function getHerbData(slug: string) {
	try {
		const query = `
		  *[_type == "herb" && slug.current == $slug][0] {
		    _id,
		    title,
		    "slug": slug.current,
		    latinName,
		    description,
		    modernApplications,
		    traditionalUse,
		    primaryEffects,
		    activeCompounds,
		    dosage,
		    safetyLevel,
		    contraindications,
		    seoKeywords,
		    category,
		    constitutionType,
		    "faqs": *[_type == "faq" && references(^._id)]{question,answer},
		    "dosages": *[_type == "dosage" && references(^._id)]{form,dosage,usage},
		    "studies": *[_type == "study" && references(^._id)]{title,summary,link,evidenceLevel}
		  }
		`
		const herb = await sanityFetch<any>(query, { slug }, { next: { revalidate: 300 } })
		if (!herb) return null

		// 字段映射到 HerbDetailClient 期望的数据结构
		const mapped = {
			id: herb._id,
			name: herb.title,
			latin_name: herb.latinName || '',
			slug: herb.slug,
			overview: herb.description || herb.modernApplications || '',
			benefits: Array.isArray(herb.primaryEffects) ? herb.primaryEffects : [],
			active_compounds: Array.isArray(herb.activeCompounds) ? herb.activeCompounds.join(', ') : (herb.activeCompounds || ''),
			traditional_uses: herb.traditionalUse || '',
			suitable_for: [],
			not_suitable_for: [],
			dosage_forms: Array.isArray(herb.dosages) && herb.dosages.length > 0
				? herb.dosages.map((d: any) => ({ form: d.form || 'extract', dosage: d.dosage || '', usage: d.usage || '' }))
				: (herb.dosage ? [{ form: 'extract', dosage: herb.dosage, usage: 'Follow label or practitioner guidance' }] : []),
			safety_warnings: herb.contraindications ? String(herb.contraindications).split(/，|,|；|;|\n/).map((s: string) => s.trim()).filter(Boolean) : [],
			interactions: [],
			scientific_evidence: Array.isArray(herb.studies) && herb.studies.length > 0
				? herb.studies.map((s: any) => `[${s.evidenceLevel || 'Moderate'}] ${s.title}${s.link ? ` (${s.link})` : ''}`).join('\n')
				: '',
			constitution_match: herb.constitutionType ? [{ type: herb.constitutionType, suitable: 'warning', description: 'Suitability varies by individual condition' }] : [],
			pairs_well_with: [],
			user_stories: [],
			faqs: Array.isArray(herb.faqs) ? herb.faqs : [],
			seo_keywords: Array.isArray(herb.seoKeywords) ? herb.seoKeywords : [],
			evidence_level: 'Moderate',
			category: herb.category || '',
			properties: Array.isArray(herb.primaryEffects) ? herb.primaryEffects : []
		}
		return mapped
	} catch (error) {
		console.error('Error fetching herb data from Sanity:', error)
		return null
	}
}

// 动态生成metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params
	const herbData = await getHerbData(slug)
	
	if (!herbData) {
		return {
			title: 'Herb Not Found | HerbScience',
			description: 'The requested herb information could not be found.'
		}
	}

	// 优化SEO标题 - 更具描述性和关键词丰富
	const title = `${herbData.name} (${herbData.latin_name}): Benefits, Dosage, Safety & Modern Uses | HerbScience`
	
	// 优化SEO描述 - 更吸引人且场景化
	const benefitsPreview = herbData.benefits?.slice(0, 2).join(', ') || 'multiple health benefits'
	const description = `Discover the science-backed benefits of ${herbData.name} — from ${benefitsPreview.toLowerCase()} — and learn how to use it safely in daily wellness. Evidence-based herbal medicine guide with dosage recommendations.`
	
	return {
		title,
		description,
		keywords: [
			...(herbData.seo_keywords || []),
			`${herbData.name} benefits`,
			`${herbData.name} dosage`,
			`${herbData.name} safety`,
			'herbal medicine',
			'natural remedies',
			'traditional chinese medicine',
			herbData.latin_name
		].join(', '),
		authors: [{ name: 'HerbScience Team' }],
		openGraph: {
			title,
			description,
			type: 'article',
			url: `https://www.herbscience.shop/herbs/${slug}`,
			siteName: 'HerbScience',
			images: [
				{
					url: '/hero-bg.svg',
					width: 1200,
					height: 630,
					alt: `${herbData.name} - Natural Herb Benefits & Uses`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['/hero-bg.svg']
		},
		// 仅在详情页设置 canonical，其他页避免全局覆盖
		alternates: {
			canonical: `https://www.herbscience.shop/herbs/${slug}`,
			languages: {
				'en': `https://www.herbscience.shop/herbs/${slug}`,
				'x-default': `https://www.herbscience.shop/herbs/${slug}`,
			},
		},
		other: {
			'article:author': 'HerbScience Team',
			'article:section': 'Natural Health',
			'article:tag': herbData.seo_keywords?.join(','),
			'og:article:published_time': new Date().toISOString(),
			'og:article:modified_time': new Date().toISOString(),
		}
	}
}

// 生成静态参数（从Sanity获取slug）
export async function generateStaticParams() {
	try {
		const slugs = await sanityFetch<Array<{ slug: string }>>(
			`*[_type == "herb" && defined(slug.current)]{ "slug": slug.current }`,
			{},
			{ next: { revalidate: 3600 } }
		)
		return (slugs || []).map((s) => ({ slug: s.slug }))
	} catch (error) {
		return [
			{ slug: 'ginseng' },
			{ slug: 'ginger' },
			{ slug: 'turmeric' }
		]
	}
}

// 服务器端组件
export default async function HerbDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const herbData = await getHerbData(slug)
	
	if (!herbData) {
		notFound()
	}

	// 生成JSON-LD结构化数据
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: `${herbData.name} Benefits and Uses`,
		description: herbData.overview,
		author: {
			'@type': 'Organization',
			name: 'HerbScience',
			url: 'https://www.herbscience.shop'
		},
		publisher: {
			'@type': 'Organization',
			name: 'HerbScience',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.herbscience.shop/logo.png'
			}
		},
		datePublished: new Date().toISOString(),
		dateModified: new Date().toISOString(),
		mainEntity: {
			'@type': 'Drug',
			name: herbData.name,
			description: herbData.overview,
			activeIngredient: herbData.active_compounds,
			indication: herbData.benefits,
			contraindication: herbData.not_suitable_for,
			warning: herbData.safety_warnings,
			administrationRoute: herbData.dosage_forms?.map((form: any) => form.form),
			clinicalPharmacology: herbData.scientific_evidence,
			aggregateRating: {
				'@type': 'AggregateRating',
				ratingValue: '4.5',
				reviewCount: '156',
				bestRating: '5',
				worstRating: '1'
			},
			review: (herbData.user_stories || []).map((story: any, index: number) => ({
				'@type': 'Review',
				reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
				author: { '@type': 'Person', name: story.author || `User ${index + 1}` },
				reviewBody: story.quote
			}))
		}
	}

	const faqJsonLd = Array.isArray(herbData.faqs) && herbData.faqs.length > 0 ? {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: herbData.faqs.map((faq: any) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer }
		}))
	} : null

	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.herbscience.shop/' },
			{ '@type': 'ListItem', position: 2, name: 'Herbs', item: 'https://www.herbscience.shop/herb-finder' },
			{ '@type': 'ListItem', position: 3, name: herbData.name, item: `https://www.herbscience.shop/herbs/${slug}` }
		]
	}

	return (
		<>
			{/* 使用路由级 OpenGraph 生成图像（/herbs/[slug]/opengraph-image） */}
			<meta property="og:image" content={`https://www.herbscience.shop/herbs/${slug}/opengraph-image`} />
			<meta name="twitter:image" content={`https://www.herbscience.shop/herbs/${slug}/opengraph-image`} />
			{/* JSON-LD 结构化数据 */}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			{faqJsonLd && (
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
			)}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
			{/* 客户端组件 */}
			<HerbDetailClient herbData={herbData as any} slug={slug} />
		</>
	)
} 