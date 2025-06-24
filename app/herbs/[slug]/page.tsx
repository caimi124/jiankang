import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HerbDetailClient from './HerbDetailClient'

// 草药数据获取函数
async function getHerbData(slug: string) {
  try {
    // 优先使用生产环境URL，开发环境fallback到localhost
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://herbscience.shop' 
      : 'http://localhost:3000'
    
    console.log(`[DEBUG] Fetching herb data for slug: ${slug} from ${baseUrl}`)
    
    const response = await fetch(`${baseUrl}/api/herbs/${slug}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    console.log(`[DEBUG] Response status: ${response.status}`)
    
    if (!response.ok) {
      console.log(`[DEBUG] Response not ok: ${response.status} ${response.statusText}`)
      return null
    }
    
    const data = await response.json()
    console.log(`[DEBUG] API response success: ${data.success}`)
    
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching herb data:', error)
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

  const title = `${herbData.name} Benefits: ${herbData.properties?.slice(0, 2).join(' & ')} | HerbScience`
  const description = `Discover the powerful benefits of ${herbData.name} (${herbData.latin_name}). ${herbData.overview.substring(0, 120)}...`
  
  return {
    title,
    description,
    keywords: herbData.seo_keywords?.join(', '),
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
          alt: `${herbData.name} - Natural Herb Benefits`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/hero-bg.svg']
    },
    alternates: {
      canonical: `https://www.herbscience.shop/herbs/${slug}`,
    },
    other: {
      'article:author': 'HerbScience Team',
      'article:section': 'Natural Health',
      'article:tag': herbData.seo_keywords?.join(',')
    }
  }
}

// 生成静态参数
export async function generateStaticParams() {
  // 返回所有草药slugs，基于HERBS_DATABASE
  try {
    // 从完整数据库生成slug列表
    const herbs = await import('../../../lib/herbs-data-complete')
    return herbs.HERBS_DATABASE.map(herb => ({
      slug: herb.english_name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]/g, '')
        .replace(/--+/g, '-')
        .trim()
    })).slice(0, 20) // 限制静态生成数量，其他动态生成
  } catch (error) {
    // 备用方案
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
      clinicalPharmacology: herbData.scientific_evidence
    },
    faq: herbData.faqs?.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 客户端组件 */}
      <HerbDetailClient herbData={herbData} slug={slug} />
    </>
  )
} 