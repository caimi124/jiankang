import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HerbDetailClient from '../../../herbs/[slug]/HerbDetailClient'
import { sanityFetch } from '@/lib/sanity'
import { getFallbackHerb } from '@/lib/herb-detail-fallback'
import { headers } from 'next/headers'
import { generateHerbSlug, normalizeSlug } from '@/lib/herb-slug-utils'
import { translateHerbData } from '@/lib/herb-translations-zh'
import { generateHerbProductSchema, generateMedicalContentSchema, generateMedicalFAQSchema, truncateDescription } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

interface HerbPageProps {
  params: Promise<{
    slug: string
  }>
}

// 从多个数据源获取草药数据
async function getHerbData(slug: string) {
  let normalizedSlug = normalizeSlug(slug)

  // URL别名和映射
  const aliases: Record<string, string> = {
    'pumpkin-seed': 'pumpkin-seeds',
    'cloves': 'clove',
    'licorice': 'licorice-root',
    'rhodiola': 'rhodiola-crenulata',
    'rhodiola-rosea': 'rhodiola-crenulata',
    '红景天': 'rhodiola-crenulata',
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
    '南非醉茄': 'ashwagandha'
  }
  
  if (aliases[normalizedSlug]) {
    normalizedSlug = aliases[normalizedSlug]
  }
  
  // 检查Sanity配置
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const isValidSanityConfig = projectId && 
    projectId !== 'your-project-id' && 
    projectId.length > 8
  
  // 1. 尝试从Sanity获取
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
          "faqs": *[_type == "faq" && references(^._id)]{question,answer}
        }
      `
      const herb = await sanityFetch<any>(query, { slug: normalizedSlug }, { next: { revalidate: 300 } })
      if (herb) {
        return mapSanityHerbData(herb)
      }
    } catch (error) {
      console.warn('Sanity查询失败，回退到静态数据:', error)
    }
  }

  // 2. 回退到API
  try {
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
    console.warn('API回退失败:', error)
  }

  // 3. 回退到静态数据库
  try {
    const { HERBS_DATABASE } = await import('@/lib/herbs-data-complete')
    const staticHerb = HERBS_DATABASE.find(herb => {
      const herbSlug = generateHerbSlug(herb.chinese_name, herb.english_name, herb.id)
      return herbSlug === normalizedSlug
    })
    
    if (staticHerb) {
      return mapStaticHerbData(staticHerb, normalizedSlug)
    }
  } catch (error) {
    console.error('静态数据查询失败:', error)
  }

  // 4. 最终兜底
  const fallback = getFallbackHerb(normalizedSlug)
  if (fallback) {
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
    dosage_forms: herb.dosage ? [{ form: 'extract', dosage: herb.dosage, usage: '遵循标签或医师指导' }] : [],
    safety_warnings: herb.contraindications ? String(herb.contraindications).split(/，|,|；|;|\n/).filter(Boolean) : [],
    interactions: [],
    scientific_evidence: '',
    constitution_match: [],
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
  const fallbackData = getFallbackHerb(slug)
  
  const isRhodiola = slug === 'rhodiola-crenulata' || slug === 'rhodiola'
  if (isRhodiola && fallbackData) {
    return { ...fallbackData, id: herb.id, slug }
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
    dosage_forms: fallbackData?.dosage_forms || [],
    safety_warnings: fallbackData?.safety_warnings || [],
    interactions: fallbackData?.interactions || [],
    scientific_evidence: fallbackData?.scientific_evidence || '',
    constitution_match: fallbackData?.constitution_match || [],
    pairs_well_with: fallbackData?.pairs_well_with || [],
    user_stories: fallbackData?.user_stories || [],
    faqs: fallbackData?.faqs || [],
    seo_keywords: Array.isArray(herb.efficacy) ? herb.efficacy : (fallbackData?.seo_keywords || []),
    evidence_level: (herb.evidence_level || fallbackData?.evidence_level || 'Moderate') as 'Strong' | 'Moderate' | 'Limited',
    category: herb.category || fallbackData?.category || '',
    properties: Array.isArray(herb.primary_effects) ? herb.primary_effects : (fallbackData?.properties || [])
  }
}

// 生成元数据
export async function generateMetadata({ params }: HerbPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const herb = await getHerbData(resolvedParams.slug)
  
  if (!herb) {
    return {
      title: '草药未找到',
      description: '请求的草药信息未找到。'
    }
  }

  const title = `${herb.name} - 功效、用法与安全性 | HerbScience`
  
  // ✅ 优化中文 Meta Description（Bing/Google：120-155 字符）
  const rawDescription = herb.overview || `了解${herb.name}的传统用途、现代应用、剂量建议和安全性信息。基于科学证据的草药指南。`
  const description = truncateDescription(rawDescription, 155, 120)

  return {
    title,
    description,
    keywords: Array.isArray(herb.seo_keywords) ? herb.seo_keywords.join(', ') : '',
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://herbscience.shop/zh/herbs/${resolvedParams.slug}`,
      siteName: 'HerbScience',
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://herbscience.shop/zh/herbs/${resolvedParams.slug}`,
      languages: {
        'zh': `https://herbscience.shop/zh/herbs/${resolvedParams.slug}`,
        'en': `https://herbscience.shop/herbs/${resolvedParams.slug}`,
        'x-default': `https://herbscience.shop/herbs/${resolvedParams.slug}`,
      }
    }
  }
}

// 静态参数生成
export async function generateStaticParams() {
  return [
    { slug: 'rhodiola-crenulata' },
    { slug: 'ginseng' },
    { slug: 'turmeric' },
    { slug: 'ginger' },
    { slug: 'ashwagandha' },
    { slug: 'licorice-root' },
    { slug: 'pumpkin-seeds' },
    { slug: 'clove' },
    { slug: 'cinnamon' },
    { slug: 'chamomile' },
  ]
}

export default async function HerbPage({ params }: HerbPageProps) {
  const resolvedParams = await params
  const herb = await getHerbData(resolvedParams.slug)

  if (!herb) {
    notFound()
  }

  // 应用中文翻译
  const translatedHerb = translateHerbData(herb)
  
  // 生成中文页面的 URL
  const herbUrl = `https://herbscience.shop/zh/herbs/${resolvedParams.slug}`
  
  // 生成产品 Schema（Google 要求的必需字段）
  const productSchema = generateHerbProductSchema(
    herb.name,
    herb.latin_name || '',
    herb.benefits || [],
    herbUrl
  )
  
  // 生成医疗内容 Schema
  const medicalContentSchema = generateMedicalContentSchema(
    herb.name,
    herb.latin_name || '',
    herb.benefits || [],
    herb.safety_warnings || [],
    herbUrl,
    'tcm-expert'
  )
  
  // 生成 FAQ Schema（如果有）
  const faqJsonLd = Array.isArray(herb.faqs) && herb.faqs.length > 0
    ? generateMedicalFAQSchema(herb.faqs, herb.name, herbUrl)
    : null
  
  // 生成面包屑 Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${herbUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: {
          '@type': 'WebPage',
          '@id': 'https://herbscience.shop/zh/',
          name: 'HerbScience - 天然健康与草药医学'
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '草药查询',
        item: {
          '@type': 'WebPage',
          '@id': 'https://herbscience.shop/zh/herb-finder',
          name: '草药查询 - 浏览天然草药与疗法'
        }
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: herb.name,
        item: {
          '@type': 'WebPage',
          '@id': herbUrl,
          name: `${herb.name}的功效与用途`
        }
      }
    ]
  }
  
  // 生成文章 Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${herbUrl}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': herbUrl },
    headline: `${herb.name} (${herb.latin_name}) - 循证健康指南`,
    description: herb.overview,
    inLanguage: 'zh',
    datePublished: '2024-10-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      '@id': 'https://herbscience.shop/#organization',
      name: 'HerbScience',
      url: 'https://herbscience.shop'
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://herbscience.shop/#organization',
      name: 'HerbScience',
      url: 'https://herbscience.shop',
      logo: {
        '@type': 'ImageObject',
        url: 'https://herbscience.shop/logo.png',
        width: 256,
        height: 256
      }
    }
  }

  // 使用中文版的ZhHerbDetailClient
  const ZhHerbDetailClient = (await import('./ZhHerbDetailClient')).default
  
  return (
    <>
      {/* JSON-LD 结构化数据 */}
      {/* 产品信息Schema - Google 必需的 offers & aggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      {/* 医疗内容Schema - E-A-T优化 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalContentSchema) }}
      />
      
      {/* 文章Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      {/* FAQ Schema（如果存在） */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      
      {/* 面包屑Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <ZhHerbDetailClient herbData={translatedHerb} slug={resolvedParams.slug} />
    </>
  )
}

