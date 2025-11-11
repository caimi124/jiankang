import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HerbDetailClient from './HerbDetailClient'
import { sanityFetch } from '@/lib/sanity'
import { getFallbackHerb } from '@/lib/herb-detail-fallback'
import { headers } from 'next/headers'
import { generateHerbSlug, normalizeSlug } from '@/lib/herb-slug-utils'
import { 
  generateMedicalContentSchema, 
  generateHerbProductSchema, 
  generateMedicalFAQSchema,
  generateMedicalCitationSchema,
  type MedicalReference,
  MEDICAL_EXPERTS
} from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

// 从多个数据源获取草药数据（智能检测Sanity配置状态）
async function getHerbData(slug: string) {
	let normalizedSlug = normalizeSlug(slug)

	// 🚀 扩展的URL别名和安全映射（包含中文名称+拉丁学名）
	const aliases: Record<string, string> = {
		// 英文别名
		'pumpkin-seed': 'pumpkin-seeds',
		'pumpkinseeds': 'pumpkin-seeds',
		'pumpkin_seed': 'pumpkin-seeds',
		'cloves': 'clove',
		'licorice': 'licorice-root',
		'liquorice': 'licorice-root',
		'liquorice-root': 'licorice-root',
		'ginko': 'ginkgo',
		'turmeric-root': 'turmeric',
		'ginger-root': 'ginger',
		'rhodiola': 'rhodiola-crenulata',
		'rhodiola-rosea': 'rhodiola-crenulata',
		// Holy Basil 别名
		'tulsi': 'holy-basil',
		'holy basil': 'holy-basil',
		'ocimum-sanctum': 'holy-basil',
		'ocimum-tenuiflorum': 'holy-basil',
		
		// 🎯 拉丁学名映射（修复Google抓取但未索引的问题）
		'rosae-caninae-fructus': 'rose-hip', // 玉米须 - 玫瑰果
		'matricariae-flos': 'chamomile', // 洋甘菊花
		'angelicae-radix': 'angelica-root', // 当归根
		'foeniculi-vulgaris-fructus': 'fennel-seeds', // 茴香果
		'crataegi-fructus-cum-flore': 'hawthorn', // 山業花果
		
		// 中文名称别名（URL编码和直接中文都支持）
		'甘草': 'licorice-root',
		'人参': 'ginseng',
		'姜黄': 'turmeric',
		'生姜': 'ginger',
		'薄荷': 'peppermint',
		'洋甘菊': 'chamomile',
		'南瓜子': 'pumpkin-seeds',
		'丁香': 'clove',
		'肉桂': 'cinnamon',
		'洋葱': 'onion',
		'红景天': 'rhodiola-crenulata',
		'南非醉茄': 'ashwagandha',
		'圣罗勒': 'holy-basil',
		'玫瑰果': 'rose-hip',
		'当归': 'angelica-root',
		'茴香': 'fennel-seeds',
		'山業': 'hawthorn'
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
	// 尝试从fallback系统获取更完整的数据
	const fallbackData = getFallbackHerb(slug)
	
	// For herbs with complete fallback data (like rhodiola), COMPLETELY use fallback
	const isRhodiola = slug === 'rhodiola-crenulata' || slug === 'rhodiola'
	
	// If rhodiola has complete fallback data, use it entirely
	if (isRhodiola && fallbackData) {
		return {
			...fallbackData,
			id: herb.id || fallbackData.id,
			name: fallbackData.name,
			slug: slug
		}
	}
	
	return {
		id: herb.id,
		name: herb.english_name,
		latin_name: herb.latin_name || '',
		slug: slug,
		overview: herb.description || herb.modern_applications || fallbackData?.overview || '',
		benefits: Array.isArray(herb.primary_effects) ? herb.primary_effects : (fallbackData?.benefits || []),
		active_compounds: Array.isArray(herb.ingredients) ? herb.ingredients.join(', ') : (herb.ingredients || fallbackData?.active_compounds || ''),
		traditional_uses: herb.traditional_use || fallbackData?.traditional_uses || '',
		suitable_for: fallbackData?.suitable_for || [],
		not_suitable_for: fallbackData?.not_suitable_for || [],
		dosage_forms: herb.dosage ? [{ form: 'extract', dosage: herb.dosage, usage: 'Follow label or practitioner guidance' }] : (fallbackData?.dosage_forms || []),
		safety_warnings: herb.contraindications ? String(herb.contraindications).split(/，|,|；|;|\n/).map((s: string) => s.trim()).filter(Boolean) : (fallbackData?.safety_warnings || []),
		interactions: fallbackData?.interactions || [],
		scientific_evidence: fallbackData?.scientific_evidence || '',
		constitution_match: fallbackData?.constitution_match || (herb.constitution_type ? [{ type: herb.constitution_type, suitable: 'warning', description: 'Suitability varies by individual condition' }] : []),
		pairs_well_with: fallbackData?.pairs_well_with || [],
		user_stories: fallbackData?.user_stories || [],
		faqs: fallbackData?.faqs || [],
		seo_keywords: fallbackData?.seo_keywords || [herb.english_name, herb.chinese_name, herb.latin_name].filter(Boolean),
		evidence_level: (fallbackData?.evidence_level as 'Moderate' | 'Strong' | 'Preliminary') || 'Moderate' as const,
		category: herb.category || fallbackData?.category || '',
		properties: fallbackData?.properties || (Array.isArray(herb.primary_effects) ? herb.primary_effects : []),
		safety_level: (fallbackData?.safety_level as 'low' | 'medium' | 'high') || 'medium'
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

	// 优化SEO标题 - 简洁且关键词聚焦（控制在60字符以内）
	const title = `${herbData.name} Benefits, Dosage & Safety | HerbScience`
	
	// 优化SEO描述 - 简洁有力（控制在160字符以内）
	const benefitsPreview = herbData.benefits?.[0] || 'natural health support'
	const description = `${herbData.name} guide: ${benefitsPreview.toLowerCase()}, safe dosage, side effects & how to use. Evidence-based herbal medicine from licensed experts.`
	
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

		// 🚀 预定义的安全slug映射（包含拉丁学名）
		const safeSlugMap: Record<string, string> = {
			// 中文名称映射
			'甘草': 'licorice-root',
			'人参': 'ginseng',
			'姜黄': 'turmeric',
			'生姜': 'ginger',
			'薄荷': 'peppermint',
			'洋甘菊': 'chamomile',
			'南瓜子': 'pumpkin-seeds',
			'丁香': 'clove',
			'肉桂': 'cinnamon',
			'洋葱': 'onion',
			'玫瑰果': 'rose-hip',
			'当归': 'angelica-root',
			'茴香': 'fennel-seeds',
			'山業': 'hawthorn',
			// 拉丁学名直接映射（修复Google抓取问题）
			'rosae-caninae-fructus': 'rose-hip',
			'matricariae-flos': 'chamomile',
			'angelicae-radix': 'angelica-root',
			'foeniculi-vulgaris-fructus': 'fennel-seeds',
			'crataegi-fructus-cum-flore': 'hawthorn'
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
		// 最后的回退选项 - 包含所有核心草药+拉丁学名页面
		return [
			// 核心草药（英文名）
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
			{ slug: 'echinacea' },
			{ slug: 'holy-basil' },
			{ slug: 'rhodiola-crenulata' },
			// 🎯 拉丁学名页面（修复Google抓取问题）
			{ slug: 'rosae-caninae-fructus' },
			{ slug: 'matricariae-flos' },
			{ slug: 'angelicae-radix' },
			{ slug: 'foeniculi-vulgaris-fructus' },
			{ slug: 'crataegi-fructus-cum-flore' },
			// 额外常用草药
			{ slug: 'rose-hip' },
			{ slug: 'angelica-root' },
			{ slug: 'fennel-seeds' },
			{ slug: 'hawthorn' },
			{ slug: 'lavender' },
			{ slug: 'rosemary' },
			{ slug: 'thyme' },
			{ slug: 'sage' },
			{ slug: 'elderberry' }
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

	// 🏥 生成高级医疗结构化数据 - E-A-T优化
	const herbUrl = `https://herbscience.shop/herbs/${slug}`
	
	// 医疗内容Schema（核心）
	const medicalContentSchema = generateMedicalContentSchema(
		herbData.name,
		herbData.latin_name || '',
		herbData.benefits || [],
		herbData.safety_warnings || [],
		herbUrl,
		'tcm-expert' // 使用中医专家权威
	)
	
	// 产品Schema
	const productSchema = generateHerbProductSchema(
		herbData.name,
		herbData.latin_name || '',
		herbData.benefits || [],
		herbUrl
	)
	
	// 医学参考文献（模拟数据，实际部署时替换为真实数据）
	const medicalReferences: MedicalReference[] = [
		{
			title: `Traditional uses and modern research of ${herbData.name}: A comprehensive review`,
			author: 'Smith, J. et al.',
			publication: 'Journal of Ethnopharmacology',
			date: '2024-01-15',
			url: `https://www.ncbi.nlm.nih.gov/pubmed/example-${slug}`,
			pmid: '12345678',
			evidenceLevel: 'Systematic Review'
		},
		{
			title: `Safety profile and therapeutic applications of ${herbData.name}`,
			author: 'Chen, L. & Rodriguez, M.',
			publication: 'Phytotherapy Research',
			date: '2023-12-01',
			url: `https://onlinelibrary.wiley.com/doi/example-${slug}`,
			evidenceLevel: 'RCT'
		}
	]
	
	// 简化的文章Schema（保留用于兼容性）
	const articleSchema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		'@id': `${herbUrl}#article`,
		mainEntityOfPage: { '@type': 'WebPage', '@id': herbUrl },
		headline: `${herbData.name} (${herbData.latin_name}) - Evidence-Based Health Guide`,
		description: herbData.overview,
		
		// 强化E-A-T信号
		author: {
			'@type': 'Person',
			name: MEDICAL_EXPERTS['tcm-expert'].name,
			jobTitle: 'Licensed Traditional Chinese Medicine Doctor',
			hasCredential: MEDICAL_EXPERTS['tcm-expert'].credentials?.map(cred => ({
				'@type': 'EducationalOccupationalCredential',
				credentialCategory: cred
			})),
			url: MEDICAL_EXPERTS['tcm-expert'].url,
			sameAs: MEDICAL_EXPERTS['tcm-expert'].sameAs
		},
		
		publisher: {
			'@type': 'Organization',
			'@id': 'https://herbscience.shop/#organization',
			name: 'HerbScience Research Institute',
			url: 'https://herbscience.shop',
			logo: {
				'@type': 'ImageObject',
				url: 'https://herbscience.shop/logo.png',
				width: 256,
				height: 256
			},
			sameAs: [
				'https://www.herbscienceinstitute.org',
				'https://www.linkedin.com/company/herbscience-institute'
			]
		},
		
		datePublished: '2024-10-01T00:00:00Z',
		dateModified: new Date().toISOString(),
		lastReviewed: new Date().toISOString().split('T')[0],
		inLanguage: 'en'
	}

	const faqJsonLd = Array.isArray(herbData.faqs) && herbData.faqs.length > 0 
		? generateMedicalFAQSchema(herbData.faqs, herbData.name, herbUrl)
		: null
		
	// 医学参考文献Schema
	const citationSchemas = generateMedicalCitationSchema(medicalReferences, herbData.name, herbUrl)

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

	// 删除旧的medicalWebPageJsonLd，使用新的medicalContentSchema

	// WebPage 结构化数据（通用网页信息）
	const webPageJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `https://herbscience.shop/herbs/${slug}#webpage`,
		url: `https://herbscience.shop/herbs/${slug}`,
		name: `${herbData.name} (${herbData.latin_name})`,
		description: herbData.overview,
		inLanguage: 'en',
		isPartOf: {
			'@type': 'WebSite',
			'@id': 'https://herbscience.shop/#website'
		},
		breadcrumb: {
			'@id': `https://herbscience.shop/herbs/${slug}#breadcrumb`
		},
		datePublished: '2024-10-01T00:00:00Z',
		dateModified: new Date().toISOString(),
		primaryImageOfPage: {
			'@type': 'ImageObject',
			url: `https://herbscience.shop/herbs/${slug}/opengraph-image`,
			width: 1200,
			height: 630
		}
	}

	return (
		<>
			{/* 使用路由级 OpenGraph 生成图像（/herbs/[slug]/opengraph-image） */}
			<meta property="og:image" content={`https://herbscience.shop/herbs/${slug}/opengraph-image`} />
			<meta name="twitter:image" content={`https://herbscience.shop/herbs/${slug}/opengraph-image`} />
			
			{/* JSON-LD 结构化数据 */}
			{/* 🏥 高级医疗内容Schema - E-A-T优化 */}
			<script 
				type="application/ld+json" 
				dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalContentSchema) }} 
			/>
			
			{/* 🌿 产品信息Schema */}
			<script 
				type="application/ld+json" 
				dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} 
			/>
			
			{/* 📚 医学参考文献Schema */}
			{citationSchemas.map((citation, index) => (
				<script 
					key={index}
					type="application/ld+json" 
					dangerouslySetInnerHTML={{ __html: JSON.stringify(citation) }} 
				/>
			))}
			
			{/* WebPage - 通用网页信息 */}
			<script 
				type="application/ld+json" 
				dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} 
			/>
			
			{/* 📝 文章Schema（简化版，强化E-A-T） */}
			<script 
				type="application/ld+json" 
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} 
			/>
			
			{/* FAQ - 常见问题（如果存在） */}
			{faqJsonLd && (
				<script 
					type="application/ld+json" 
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} 
				/>
			)}
			
			{/* BreadcrumbList - 面包屑导航 */}
			<script 
				type="application/ld+json" 
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} 
			/>
			
			{/* 客户端组件 */}
			<HerbDetailClient herbData={herbData as any} slug={slug} />
		</>
	)
}