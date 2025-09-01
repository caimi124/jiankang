import { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { HerbDetailTabs } from '../../../components/HerbDetailTabs'
import { HerbHero } from '../../../components/HerbHero'

// 🚀 SEO优化：生成动态metadata
export async function generateMetadata(): Promise<Metadata> {
  const herbData = await getCloveData()
  
  return {
    title: herbData.seoTitle || 'Clove Benefits for Dental Health, Digestive Support & Pain Relief | HerbScience',
    description: herbData.seoDescription || 'Discover the benefits of clove (Syzygium aromaticum) for dental health, digestive support, pain relief, and antimicrobial properties. Learn safe dosage and uses.',
    keywords: herbData.seoKeywords?.join(', ') || 'clove benefits, clove for toothache, clove for digestion, clove oil, clove antimicrobial, clove pain relief',
    openGraph: {
      title: herbData.seoTitle || 'Clove Benefits for Dental Health, Digestive Support & Pain Relief',
      description: herbData.seoDescription || 'Discover the benefits of clove (Syzygium aromaticum) for dental health, digestive support, pain relief, and antimicrobial properties.',
      type: 'article',
      url: 'https://herbscience.shop/herbs/clove',
      images: [
        {
          url: '/images/herbs/clove-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Clove (Syzygium aromaticum) - Dental Health, Digestive Support & Pain Relief'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: herbData.seoTitle || 'Clove Benefits for Dental Health, Digestive Support & Pain Relief',
      description: herbData.seoDescription || 'Discover the benefits of clove (Syzygium aromaticum) for dental health, digestive support, pain relief, and antimicrobial properties.',
      images: ['/images/herbs/clove-og.jpg']
    },
    alternates: {
      canonical: 'https://herbscience.shop/herbs/clove'
    }
  }
}

// 🚀 静态生成：预生成页面
export async function generateStaticParams() {
  return [{ slug: 'clove' }]
}

// 获取Clove草药数据
async function getCloveData() {
  try {
    const herb = await sanityFetch(`*[_type == "herb" && slug.current == "clove"][0]`)
    
    if (!herb) {
      // 如果Sanity中没有数据，返回默认数据
      return {
        title: 'Clove',
        chineseName: '丁香',
        latinName: 'Syzygium aromaticum',
        description: 'Clove (Syzygium aromaticum) is a powerful warming spice with exceptional antimicrobial and pain-relieving properties. Used in traditional medicine for dental health, digestive support, and pain management.',
        primaryEffects: ['Dental health and toothache relief', 'Digestive support and warming', 'Antimicrobial and antibacterial effects'],
        activeCompounds: ['Eugenol', 'Caryophyllene', 'Acetyl eugenol', 'Essential oils'],
        dosage: 'Whole cloves: 1-3 pieces/day. Powder: 0.5-1 gram/day. Essential oil: 1-2 drops diluted.',
        safetyLevel: 'medium',
        contraindications: ['Avoid during pregnancy', 'Not suitable for hot conditions', 'May irritate sensitive skin'],
        seoTitle: 'Clove Benefits for Dental Health, Digestive Support & Pain Relief | HerbScience',
        seoDescription: 'Discover the benefits of clove (Syzygium aromaticum) for dental health, digestive support, pain relief, and antimicrobial properties.',
        seoKeywords: ['clove benefits', 'clove for toothache', 'clove for digestion', 'clove oil']
      }
    }
    
    return herb
  } catch (error) {
    console.error('Error fetching clove data:', error)
    // 返回默认数据
    return {
      title: 'Clove',
      chineseName: '丁香',
      latinName: 'Syzygium aromaticum',
      description: 'Clove (Syzygium aromaticum) is a powerful warming spice with exceptional antimicrobial and pain-relieving properties. Used in traditional medicine for dental health, digestive support, and pain management.',
      primaryEffects: ['Dental health and toothache relief', 'Digestive support and warming', 'Antimicrobial and antibacterial effects'],
      activeCompounds: ['Eugenol', 'Caryophyllene', 'Acetyl eugenol', 'Essential oils'],
      dosage: 'Whole cloves: 1-3 pieces/day. Powder: 0.5-1 gram/day. Essential oil: 1-2 drops diluted.',
      safetyLevel: 'medium',
      contraindications: ['Avoid during pregnancy', 'Not suitable for hot conditions', 'May irritate sensitive skin'],
      seoTitle: 'Clove Benefits for Dental Health, Digestive Support & Pain Relief | HerbScience',
      seoDescription: 'Discover the benefits of clove (Syzygium aromaticum) for dental health, digestive support, pain relief, and antimicrobial properties.',
      seoKeywords: ['clove benefits', 'clove for toothache', 'clove for digestion', 'clove oil']
    }
  }
}

export default async function ClovePage() {
  const herbData = await getCloveData()
  
  // 🚀 结构化数据：JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: herbData.seoTitle || 'Clove Benefits for Dental Health, Digestive Support & Pain Relief',
    description: herbData.seoDescription || 'Discover the benefits of clove (Syzygium aromaticum) for dental health, digestive support, pain relief, and antimicrobial properties.',
    image: '/images/herbs/clove-og.jpg',
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
      name: 'Clove',
      alternateName: ['丁香', 'Syzygium aromaticum', 'Ding Xiang'],
      description: herbData.description,
      activeIngredient: herbData.activeCompounds,
      dosageForm: ['Whole cloves', 'Powder', 'Essential oil', 'Tincture'],
      indication: herbData.primaryEffects,
      contraindication: herbData.contraindications,
      drugClass: 'Herbal supplement',
      mechanismOfAction: 'Eugenol provides local anesthetic effects, antimicrobial activity, and anti-inflammatory properties',
      clinicalPharmacology: 'Clove contains eugenol, caryophyllene, and other compounds that provide dental health benefits, digestive support, and pain relief'
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
        name: 'Is clove good for toothache?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, clove oil is very effective for toothache relief due to its eugenol content which has local anesthetic properties.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can clove help with digestion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, clove is warming and helps stimulate digestive enzymes, making it useful for cold-type digestive issues.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is clove safe during pregnancy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, clove should be avoided during pregnancy as it may stimulate uterine contractions.'
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
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Herbs', href: '/herb-finder' },
              { label: 'Clove', href: '/herbs/clove' }
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
              traditionalUse: "In Traditional Chinese Medicine, clove (Ding Xiang) is considered a warming herb that dispels cold, stops pain, and warms the middle burner. It has been used for centuries to treat cold-type conditions, toothache, and digestive issues.",
              modernApplications: "Modern studies confirm clove's effectiveness for dental pain, digestive support, and antimicrobial properties. Research shows it has strong antibacterial, antifungal, and anti-inflammatory effects."
            }}
          />
        </div>
      </div>
    </>
  )
}
