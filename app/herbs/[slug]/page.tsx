import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HerbDetailClient from './HerbDetailClient'

// 草药数据获取函数
async function getHerbData(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/herbs/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
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
  // 返回已知的草药slugs
  return [
    { slug: 'ginseng' },
    { slug: 'ginger' },
    { slug: 'turmeric' }
  ]
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