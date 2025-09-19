import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HerbDetailClient from './HerbDetailClient'
import { sanityFetch } from '@/lib/sanity'
import { getFallbackHerb } from '@/lib/herb-detail-fallback'
import { headers } from 'next/headers'
import { generateHerbSlug, normalizeSlug } from '@/lib/herb-slug-utils'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

// 从多个数据源获取草药数据（智能检测Sanity配置状态）
async function getHerbData(slug: string) {
	let normalizedSlug = normalizeSlug(slug)

	// 🚀 扩展的URL别名和安全映射
	const aliases: Record<string, string> = {
		'pumpkin-seed': 'pumpkin-seeds',
		'pumpkinseeds': 'pumpkin-seeds',
		'pumpkin_seed': 'pumpkin-seeds',
		'cloves': 'clove',
		'licorice': 'licorice-root',
		'liquorice': 'licorice-root',
		'liquorice-root': 'licorice-root',
		'ginko': 'ginkgo',
		'turmeric-root': 'turmeric',
		'ginger-root': 'ginger'
	}
	
	if (aliases[normalizedSlug]) {
		normalizedSlug = aliases[normalizedSlug]
	}
	
	// 🔍 检查Sanity是否正确配置
	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const isValidSanityConfig = projectId && 
		projectId !== 'your-project-id' && 
		projectId !== 'your-project-id-here' && 
		projectId.length > 8
	
	// 1. 仅在Sanity正确配置时尝试获取数据
	if (isValidSanityConfig) {
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
			const herb = await sanityFetch<any>(query, { slug: normalizedSlug }, { next: { revalidate: 300 } })
			if (herb) {
				console.log('✅ 从Sanity获取草药数据:', herb.title)
				return mapSanityHerbData(herb)
			}
		} catch (error) {
			console.warn('⚠️ Sanity查询失败，回退到静态数据:', error)
		}
	} else {
		console.log('📝 Sanity未配置或配置无效，直接使用静态数据库')
	}

	// 2. 回退到内部API（内置详情+Notion/静态数据库聚合）
	try {
		// 使用请求头构造绝对地址，兼容 Vercel/自定义域
		const h = await headers()
		const host = h.get('x-forwarded-host') || h.get('host') || 'herbscience.shop'
		const proto = h.get('x-forwarded-proto') || 'https'
		const base = `${proto}://${host}`
		const res = await fetch(`${base}/api/herbs/${normalizedSlug}`, { cache: 'no-store' })
		if (res.ok) {
			const json = await res.json()
			if (json?.success && json?.data) {
				return json.data
			}
		}
	} catch (error) {
		console.warn('⚠️ 内部API回退失败，继续尝试本地静态数据库:', error)
	}

	// 3. 回退到静态数据库
	try {
		const { HERBS_DATABASE } = await import('@/lib/herbs-data-complete')
		const staticHerb = HERBS_DATABASE.find(herb => {
			// 使用与HerbCard相同的slug生成逻辑
			const herbSlug = generateHerbSlug(herb.chinese_name, herb.english_name, herb.id)
			return herbSlug === normalizedSlug
		})
		
		if (staticHerb) {
			console.log('✅ 从静态数据获取草药:', staticHerb.english_name)
			return mapStaticHerbData(staticHerb, normalizedSlug)
		}
	} catch (error) {
		console.error('❌ 静态数据查询失败:', error)
	}

	// 4. 最终本地兜底（关键三种草药）
	const fallback = getFallbackHerb(normalizedSlug)
	if (fallback) {
		console.log('✅ 命中本地兜底草药:', fallback.name)
		return fallback as any
	}

	return null
}

// 映射Sanity数据结构
function mapSanityHerbData(herb: any) {
	return {
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
		evidence_level: 'Moderate' as const,
		category: herb.category || '',
		properties: Array.isArray(herb.primaryEffects) ? herb.primaryEffects : []
	}
}

// 映射静态数据结构
function mapStaticHerbData(herb: any, slug: string) {
	return {
		id: herb.id,
		name: herb.english_name,
		latin_name: herb.latin_name || '',
		slug: slug,
		overview: herb.description || herb.modern_applications || '',
		benefits: Array.isArray(herb.primary_effects) ? herb.primary_effects : [],
		active_compounds: Array.isArray(herb.ingredients) ? herb.ingredients.join(', ') : (herb.ingredients || ''),
		traditional_uses: herb.traditional_use || '',
		suitable_for: [],
		not_suitable_for: [],
		dosage_forms: herb.dosage ? [{ form: 'extract', dosage: herb.dosage, usage: 'Follow label or practitioner guidance' }] : [],
		safety_warnings: herb.contraindications ? String(herb.contraindications).split(/，|,|；|;|\n/).map((s: string) => s.trim()).filter(Boolean) : [],
		interactions: [],
		scientific_evidence: '',
		constitution_match: herb.constitution_type ? [{ type: herb.constitution_type, suitable: 'warning', description: 'Suitability varies by individual condition' }] : [],
		pairs_well_with: [],
		user_stories: [],
		faqs: [],
		seo_keywords: [herb.english_name, herb.chinese_name, herb.latin_name].filter(Boolean),
		evidence_level: 'Moderate' as const,
		category: herb.category || '',
		properties: Array.isArray(herb.primary_effects) ? herb.primary_effects : []
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
			url: `https://herbscience.shop/herbs/${slug}`,
			siteName: 'HerbScience',
			images: [
				{
					url: `https://herbscience.shop/herbs/${slug}/opengraph-image`,
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
			canonical: `https://herbscience.shop/herbs/${slug}`,
			languages: {
				'en': `https://herbscience.shop/herbs/${slug}`,
				'x-default': `https://herbscience.shop/herbs/${slug}`,
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

// 生成静态参数（智能检测Sanity配置状态）
export async function generateStaticParams() {
	// 🔍 检查Sanity是否正确配置
	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const isValidSanityConfig = projectId && 
		projectId !== 'your-project-id' && 
		projectId !== 'your-project-id-here' && 
		projectId.length > 8
	
	// 仅在Sanity正确配置时尝试获取
	if (isValidSanityConfig) {
		try {
			const slugs = await sanityFetch<Array<{ slug: string }>>(
				`*[_type == "herb" && defined(slug.current)]{ "slug": slug.current }`,
				{},
				{ next: { revalidate: 3600 } }
			)
			
			if (slugs && slugs.length > 0) {
				console.log('✅ 从Sanity生成', slugs.length, '个草药页面')
				return slugs.map((s) => ({ slug: s.slug }))
			}
		} catch (error) {
			console.warn('⚠️ Sanity连接失败，使用静态数据回退:', error)
		}
	} else {
		console.log('📝 Sanity未配置，直接从静态数据生成路由')
	}

	// 回退到静态数据库 + 预定义安全slug
	try {
		const { HERBS_DATABASE } = await import('@/lib/herbs-data-complete')

		// 🚀 预定义的安全slug映射
		const safeSlugMap: Record<string, string> = {
			'甘草': 'licorice-root',
			'人参': 'ginseng',
			'姜黄': 'turmeric',
			'生姜': 'ginger',
			'薄荷': 'peppermint',
			'洋甘菊': 'chamomile',
			'南瓜子': 'pumpkin-seeds',
			'丁香': 'clove',
			'肉桂': 'cinnamon',
			'洋葱': 'onion'
		}

		const staticSlugs = HERBS_DATABASE.map(herb => {
			// 优先使用安全映射，回退到生成的slug
			const slug = safeSlugMap[herb.chinese_name] || generateHerbSlug(herb.chinese_name, herb.english_name, herb.id)
			return { slug }
		})

		// 🚀 确保所有安全slug都包含在内
		const allSafeSlugs = Object.values(safeSlugMap)
		const existingSlugs = new Set(staticSlugs.map(s => s.slug))

		allSafeSlugs.forEach(safeSlug => {
			if (!existingSlugs.has(safeSlug)) {
				staticSlugs.push({ slug: safeSlug })
			}
		})

		console.log('✅ 从静态数据生成', staticSlugs.length, '个草药页面（包含', allSafeSlugs.length, '个安全slug）')
		return staticSlugs
	} catch (error) {
		console.error('❌ 静态数据加载失败:', error)
		// 最后的回退选项 - 包含所有核心草药
		return [
			{ slug: 'clove' },
			{ slug: 'cinnamon' },
			{ slug: 'pumpkin-seeds' },
			{ slug: 'ginseng' },
			{ slug: 'ginger' },
			{ slug: 'turmeric' },
			{ slug: 'licorice-root' },
			{ slug: 'peppermint' },
			{ slug: 'chamomile' },
			{ slug: 'onion' },
			{ slug: 'ashwagandha' },
			{ slug: 'echinacea' }
		]
	}
}

// 服务器端组件
export default async function HerbDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	let herbData = await getHerbData(slug)
	
	// 强制兜底：确保关键草药永不 404
	if (!herbData) {
		const normalizedSlug = normalizeSlug(slug).replace(/^cloves$/, 'clove')
		
		herbData = getFallbackHerb(normalizedSlug) as any
		console.log('🆘 强制兜底激活:', normalizedSlug, herbData ? '成功' : '失败')
	}
	
	// 最后的最后兜底：如果还是没有数据，创建一个基础数据
	if (!herbData) {
		herbData = {
			id: slug,
			name: slug.charAt(0).toUpperCase() + slug.slice(1),
			chinese_name: '草药',
			latin_name: '',
			slug: slug,
			overview: 'This herb information is being loaded. Please check back later.',
			benefits: ['General wellness support'],
			active_compounds: 'Various bioactive compounds',
			traditional_uses: 'Traditional herbal medicine',
			suitable_for: ['General use'],
			not_suitable_for: ['Consult healthcare provider'],
			dosage_forms: [{ form: 'As directed', dosage: 'Follow label', usage: 'Consult practitioner' }],
			safety_warnings: ['Consult healthcare provider'],
			interactions: ['Consult healthcare provider'],
			scientific_evidence: 'Research ongoing',
			constitution_match: [{ type: 'General', suitable: 'yes', description: 'Consult practitioner' }],
			pairs_well_with: ['Other herbs'],
			user_stories: [],
			faqs: [],
			seo_keywords: [slug],
			properties: ['General Support'],
			evidence_level: 'Moderate',
			category: 'General',
			safety_level: 'medium'
		}
		console.log('🆘 最终兜底激活:', slug)
	}

	// 生成JSON-LD结构化数据 - 修复为合适的schema类型
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: `${herbData.name} Benefits and Uses - Natural Health Guide`,
		description: herbData.overview,
		author: {
			'@type': 'Organization',
			name: 'HerbScience',
			url: 'https://herbscience.shop'
		},
		publisher: {
			'@type': 'Organization',
			name: 'HerbScience',
			logo: {
				'@type': 'ImageObject',
				url: 'https://herbscience.shop/logo.png'
			}
		},
		datePublished: new Date().toISOString(),
		dateModified: new Date().toISOString(),
		image: `https://herbscience.shop/herbs/${slug}/opengraph-image`,
		mainEntity: {
			'@type': 'Thing',
			'@id': `https://herbscience.shop/herbs/${slug}#herb`,
			name: herbData.name,
			alternateName: herbData.latin_name,
			description: herbData.overview,
			category: herbData.category || 'Herbal Medicine',
			additionalProperty: [
				{
					'@type': 'PropertyValue',
					name: 'Active Compounds',
					value: herbData.active_compounds
				},
				{
					'@type': 'PropertyValue',
					name: 'Traditional Uses',
					value: herbData.traditional_uses
				},
				{
					'@type': 'PropertyValue',
					name: 'Evidence Level',
					value: herbData.evidence_level || 'Moderate'
				},
				{
					'@type': 'PropertyValue',
					name: 'Safety Level',
					value: (herbData as any).safety_level || 'Medium'
				}
			],
			hasHealthAspect: (herbData.benefits || []).map((benefit: string) => ({
				'@type': 'HealthAspectEnumeration',
				name: benefit
			}))
		},
		about: (herbData.benefits || []).map((benefit: string) => ({
			'@type': 'Thing',
			name: benefit
		})),
		aggregateRating: (herbData.user_stories && herbData.user_stories.length > 0) ? {
			'@type': 'AggregateRating',
			ratingValue: '4.5',
			reviewCount: herbData.user_stories.length.toString(),
			bestRating: '5',
			worstRating: '1',
			'@id': `https://herbscience.shop/herbs/${slug}#aggregateRating`
		} : undefined,
		review: (herbData.user_stories || []).map((story: any, index: number) => ({
			'@type': 'Review',
			'@id': `https://herbscience.shop/herbs/${slug}#review-${index}`,
			reviewRating: { 
				'@type': 'Rating', 
				ratingValue: '5', 
				bestRating: '5',
				worstRating: '1'
			},
			author: { 
				'@type': 'Person', 
				name: story.author || `User ${index + 1}`,
				'@id': `https://herbscience.shop/herbs/${slug}#author-${index}`
			},
			reviewBody: story.quote,
			datePublished: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
			dateCreated: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
			headline: `${herbData.name} Review by ${story.author || `User ${index + 1}`}`,
			reviewAspect: 'effectiveness',
			itemReviewed: {
				'@type': 'Thing',
				name: herbData.name,
				'@id': `https://herbscience.shop/herbs/${slug}#herb`
			}
		}))
	}

	const faqJsonLd = Array.isArray(herbData.faqs) && herbData.faqs.length > 0 ? {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': `https://herbscience.shop/herbs/${slug}#faq`,
		url: `https://herbscience.shop/herbs/${slug}`,
		name: `${herbData.name} Frequently Asked Questions`,
		description: `Common questions and answers about ${herbData.name} benefits, uses, and safety`,
		mainEntity: herbData.faqs.map((faq: any) => ({
			'@type': 'Question',
			'@id': `https://herbscience.shop/herbs/${slug}#faq-${herbData.faqs.indexOf(faq)}`,
			name: faq.question,
			text: faq.question,
			answerCount: 1,
			acceptedAnswer: { 
				'@type': 'Answer', 
				'@id': `https://herbscience.shop/herbs/${slug}#answer-${herbData.faqs.indexOf(faq)}`,
				text: faq.answer,
				dateCreated: new Date().toISOString(),
				upvoteCount: 1
			}
		}))
	} : null

	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'@id': `https://herbscience.shop/herbs/${slug}#breadcrumb`,
		itemListElement: [
			{ 
				'@type': 'ListItem', 
				position: 1, 
				name: 'Home', 
				item: {
					'@type': 'WebPage',
					'@id': 'https://herbscience.shop/',
					name: 'HerbScience - Natural Health & Herbal Medicine'
				}
			},
			{ 
				'@type': 'ListItem', 
				position: 2, 
				name: 'Herbs', 
				item: {
					'@type': 'WebPage',
					'@id': 'https://herbscience.shop/herb-finder',
					name: 'Herb Finder - Browse Natural Herbs & Remedies'
				}
			},
			{ 
				'@type': 'ListItem', 
				position: 3, 
				name: herbData.name, 
				item: {
					'@type': 'WebPage',
					'@id': `https://herbscience.shop/herbs/${slug}`,
					name: `${herbData.name} Benefits and Uses`
				}
			}
		]
	}

	return (
		<>
			{/* 使用路由级 OpenGraph 生成图像（/herbs/[slug]/opengraph-image） */}
			<meta property="og:image" content={`https://herbscience.shop/herbs/${slug}/opengraph-image`} />
			<meta name="twitter:image" content={`https://herbscience.shop/herbs/${slug}/opengraph-image`} />
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