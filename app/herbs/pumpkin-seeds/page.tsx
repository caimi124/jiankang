import { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { HerbDetailTabs } from '../../../components/HerbDetailTabs'
import { HerbHero } from '../../../components/HerbHero'

// 🚀 SEO优化：生成动态metadata
export async function generateMetadata(): Promise<Metadata> {
  const herbData = await getPumpkinSeedsData()
  
  return {
    title: herbData.seoTitle || 'Pumpkin Seeds Benefits for Prostate Health, Hair Loss & Hormone Balance | HerbScience',
    description: herbData.seoDescription || 'Discover the benefits of pumpkin seeds for prostate health, hair loss prevention, hormone balance, and sleep support. Learn safe dosage and uses.',
    keywords: herbData.seoKeywords?.join(', ') || 'pumpkin seeds benefits, pumpkin seeds for prostate, pumpkin seeds for hair loss, pumpkin seeds hormone balance, pumpkin seeds sleep',
    openGraph: {
      title: herbData.seoTitle || 'Pumpkin Seeds Benefits for Prostate Health, Hair Loss & Hormone Balance',
      description: herbData.seoDescription || 'Discover the benefits of pumpkin seeds for prostate health, hair loss prevention, hormone balance, and sleep support.',
      type: 'article',
      url: 'https://herbscience.shop/herbs/pumpkin-seeds',
      images: [
        {
          url: '/images/herbs/pumpkin-seeds-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Pumpkin Seeds - Prostate Health, Hair Loss & Hormone Balance'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: herbData.seoTitle || 'Pumpkin Seeds Benefits for Prostate Health, Hair Loss & Hormone Balance',
      description: herbData.seoDescription || 'Discover the benefits of pumpkin seeds for prostate health, hair loss prevention, hormone balance, and sleep support.',
      images: ['/images/herbs/pumpkin-seeds-og.jpg']
    },
    alternates: {
      canonical: 'https://herbscience.shop/herbs/pumpkin-seeds'
    }
  }
}

// 🚀 静态生成：预生成页面
export async function generateStaticParams() {
  return [{ slug: 'pumpkin-seeds' }]
}

// 获取Pumpkin Seeds草药数据
async function getPumpkinSeedsData() {
  try {
    const herb = await sanityFetch(`*[_type == "herb" && slug.current == "pumpkin-seeds"][0]`)
    
    if (!herb) {
      // 如果Sanity中没有数据，返回默认数据
      return {
        title: 'Pumpkin Seeds',
        chineseName: '南瓜子',
        latinName: 'Cucurbita pepo',
        description: 'Pumpkin seeds (Cucurbita pepo) are nutrient-dense superfoods rich in zinc, magnesium, and essential fatty acids. Used in traditional medicine for prostate health, hair loss prevention, and hormone balance.',
        primaryEffects: ['Prostate health and BPH support', 'Hair loss prevention and regrowth', 'Hormone balance and menopause relief'],
        activeCompounds: ['Zinc', 'Magnesium', 'Phytosterols', 'Essential fatty acids', 'Tryptophan'],
        dosage: 'Raw seeds: 1-2 tablespoons/day. Oil: 1-2 teaspoons/day. Powder: 1-2 grams/day.',
        safetyLevel: 'high',
        contraindications: ['Allergic reactions rare', 'May cause digestive upset in large amounts'],
        seoTitle: 'Pumpkin Seeds Benefits for Prostate Health, Hair Loss & Hormone Balance | HerbScience',
        seoDescription: 'Discover the benefits of pumpkin seeds for prostate health, hair loss prevention, hormone balance, and sleep support.',
        seoKeywords: ['pumpkin seeds benefits', 'pumpkin seeds for prostate', 'pumpkin seeds for hair loss']
      }
    }
    
    return herb
  } catch (error) {
    console.error('Error fetching pumpkin seeds data:', error)
    // 返回默认数据
    return {
      title: 'Pumpkin Seeds',
      chineseName: '南瓜子',
      latinName: 'Cucurbita pepo',
      description: 'Pumpkin seeds (Cucurbita pepo) are nutrient-dense superfoods rich in zinc, magnesium, and essential fatty acids. Used in traditional medicine for prostate health, hair loss prevention, and hormone balance.',
      primaryEffects: ['Prostate health and BPH support', 'Hair loss prevention and regrowth', 'Hormone balance and menopause relief'],
      activeCompounds: ['Zinc', 'Magnesium', 'Phytosterols', 'Essential fatty acids', 'Tryptophan'],
      dosage: 'Raw seeds: 1-2 tablespoons/day. Oil: 1-2 teaspoons/day. Powder: 1-2 grams/day.',
      safetyLevel: 'high',
      contraindications: ['Allergic reactions rare', 'May cause digestive upset in large amounts'],
      seoTitle: 'Pumpkin Seeds Benefits for Prostate Health, Hair Loss & Hormone Balance | HerbScience',
      seoDescription: 'Discover the benefits of pumpkin seeds for prostate health, hair loss prevention, hormone balance, and sleep support.',
      seoKeywords: ['pumpkin seeds benefits', 'pumpkin seeds for prostate', 'pumpkin seeds for hair loss']
    }
  }
}

export default async function PumpkinSeedsPage() {
  const herbData = await getPumpkinSeedsData()
  
  // 🚀 结构化数据：JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: herbData.seoTitle || 'Pumpkin Seeds Benefits for Prostate Health, Hair Loss & Hormone Balance',
    description: herbData.seoDescription || 'Discover the benefits of pumpkin seeds for prostate health, hair loss prevention, hormone balance, and sleep support.',
    image: '/images/herbs/pumpkin-seeds-og.jpg',
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
    mainEntity: {
      '@type': 'Drug',
      name: 'Pumpkin Seeds',
      alternateName: ['南瓜子', 'Cucurbita pepo', 'Pepitas'],
      description: herbData.description,
      activeIngredient: herbData.activeCompounds,
      dosageForm: ['Raw seeds', 'Oil', 'Powder', 'Extract'],
      indication: herbData.primaryEffects,
      contraindication: herbData.contraindications,
      drugClass: 'Herbal supplement',
      mechanismOfAction: 'Zinc supports prostate function, phytosterols block DHT, tryptophan converts to serotonin and melatonin',
      clinicalPharmacology: 'Pumpkin seeds contain zinc, magnesium, phytosterols, and essential fatty acids that support prostate health, hair growth, and hormone balance'
    },
    datePublished: '2025-01-19',
    dateModified: new Date().toISOString().split('T')[0]
  }

  // 🚀 FAQ结构化数据
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are pumpkin seeds good for prostate health?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, pumpkin seeds are excellent for prostate health due to their high zinc content and phytosterols that help reduce BPH symptoms.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can pumpkin seeds help with hair loss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, pumpkin seeds contain zinc and phytosterols that can help prevent hair loss and promote hair regrowth.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much pumpkin seeds should I eat daily?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '1-2 tablespoons of raw pumpkin seeds daily is recommended for health benefits.'
        }
      }
    ]
  }

  return (
    <>
      {/* 🚀 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 🚀 FAQ结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Herbs', href: '/herb-finder' },
              { label: 'Pumpkin Seeds', href: '/herbs/pumpkin-seeds' }
            ]} 
          />
          
          {/* 草药英雄区域 */}
          <HerbHero
            herbData={{
              title: herbData.title,
              chineseName: herbData.chineseName,
              latinName: herbData.latinName,
              description: herbData.description,
              safetyLevel: herbData.safetyLevel
            }}
          />
          
          {/* 草药详情标签页 */}
          <HerbDetailTabs
            herbData={{
              title: herbData.title,
              chineseName: herbData.chineseName,
              latinName: herbData.latinName,
              description: herbData.description,
              primaryEffects: herbData.primaryEffects,
              activeCompounds: herbData.activeCompounds,
              dosage: herbData.dosage,
              safetyLevel: herbData.safetyLevel,
              contraindications: herbData.contraindications,
              traditionalUse: "In Traditional Chinese Medicine, pumpkin seeds are warm and tonifying, suitable for people with fatigue, frequent urination, or hormonal imbalance. They have been traditionally used for prostate support, intestinal parasites, and women's hormonal balance, particularly during menopause.",
              modernApplications: "Modern studies confirm pumpkin seeds' effectiveness for prostate health (BPH), hair loss prevention, menopause relief, and parasite treatment. Clinical trials show positive results for urinary symptoms, hair regrowth, hot flash reduction, and sleep quality improvement."
            }}
          />
        </div>
      </div>
    </>
  )
}
