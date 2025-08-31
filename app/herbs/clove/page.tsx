import { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { HerbDetailTabs } from '../../../components/HerbDetailTabs'
import { HerbHero } from '../../../components/HerbHero'
import { HerbBenefits } from '../../../components/HerbBenefits'
import { HerbSafety } from '../../../components/HerbSafety'
import { HerbUsage } from '../../../components/HerbUsage'
import { HerbResearch } from '../../../components/HerbResearch'
import { HerbFAQ } from '../../../components/HerbFAQ'

// 🚀 SEO优化：生成动态metadata
export async function generateMetadata(): Promise<Metadata> {
  const herbData = await getCloveData()
  
  return {
    title: herbData.seoTitle || 'Clove Benefits: Oral Health, Digestive Support & Anti-inflammatory Effects | HerbScience',
    description: herbData.seoDescription || 'Discover clove (Syzygium aromaticum) benefits for oral health, digestive support, and pain relief. Learn about eugenol\'s antimicrobial properties, usage tips, and safety guidelines.',
    keywords: herbData.seoKeywords?.join(', ') || 'clove benefits, clove oil toothache, clove for bad breath, clove digestive health, eugenol benefits, clove anti-inflammatory, clove antimicrobial, clove men\'s health',
    openGraph: {
      title: herbData.seoTitle || 'Clove Benefits: Oral Health, Digestive Support & Anti-inflammatory Effects',
      description: herbData.seoDescription || 'Discover clove (Syzygium aromaticum) benefits for oral health, digestive support, and pain relief.',
      type: 'article',
      url: 'https://herbscience.shop/herbs/clove',
      images: [
        {
          url: '/images/herbs/clove-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Clove (Syzygium aromaticum) - Oral Health and Digestive Support'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: herbData.seoTitle || 'Clove Benefits: Oral Health, Digestive Support & Anti-inflammatory Effects',
      description: herbData.seoDescription || 'Discover clove (Syzygium aromaticum) benefits for oral health, digestive support, and pain relief.',
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
        description: 'Clove (Syzygium aromaticum) is a powerful aromatic spice native to Indonesia with exceptional medicinal properties.',
        primaryEffects: ['Oral health and toothache relief', 'Digestive support and nausea relief', 'Anti-inflammatory and pain relief'],
        activeCompounds: ['Eugenol', 'Tannins', 'Flavonoids', 'Volatile oils'],
        dosage: 'Whole Cloves (tea): 1-3 grams/day. Clove Powder: 0.5-1 gram/day.',
        safetyLevel: 'medium',
        contraindications: ['Not recommended for acid reflux, stomach ulcers, or "hot" conditions', 'Avoid during pregnancy and for children under 12'],
        seoTitle: 'Clove Benefits: Oral Health, Digestive Support & Anti-inflammatory Effects',
        seoDescription: 'Discover clove (Syzygium aromaticum) benefits for oral health, digestive support, and pain relief.',
        seoKeywords: ['clove benefits', 'clove oil toothache', 'clove for bad breath', 'clove digestive health']
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
      description: 'Clove (Syzygium aromaticum) is a powerful aromatic spice native to Indonesia with exceptional medicinal properties.',
      primaryEffects: ['Oral health and toothache relief', 'Digestive support and nausea relief', 'Anti-inflammatory and pain relief'],
      activeCompounds: ['Eugenol', 'Tannins', 'Flavonoids', 'Volatile oils'],
      dosage: 'Whole Cloves (tea): 1-3 grams/day. Clove Powder: 0.5-1 gram/day.',
      safetyLevel: 'medium',
      contraindications: ['Not recommended for acid reflux, stomach ulcers, or "hot" conditions', 'Avoid during pregnancy and for children under 12'],
      seoTitle: 'Clove Benefits: Oral Health, Digestive Support & Anti-inflammatory Effects',
      seoDescription: 'Discover clove (Syzygium aromaticum) benefits for oral health, digestive support, and pain relief.',
      seoKeywords: ['clove benefits', 'clove oil toothache', 'clove for bad breath', 'clove digestive health']
    }
  }
}

export default async function ClovePage() {
  const herbData = await getCloveData()
  
  // 🚀 结构化数据：JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: herbData.seoTitle || 'Clove Benefits: Oral Health, Digestive Support & Anti-inflammatory Effects',
    description: herbData.seoDescription || 'Discover clove (Syzygium aromaticum) benefits for oral health, digestive support, and pain relief.',
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
      alternateName: ['丁香', 'Syzygium aromaticum'],
      description: herbData.description,
      activeIngredient: herbData.activeCompounds,
      dosageForm: ['Whole cloves', 'Powder', 'Essential oil'],
      indication: herbData.primaryEffects,
      contraindication: herbData.contraindications,
      drugClass: 'Herbal supplement',
      mechanismOfAction: 'Eugenol exerts local anesthetic effects by blocking nerve transmission and inhibits inflammatory mediators like COX-2',
      clinicalPharmacology: 'Clove contains eugenol as the primary bioactive compound, providing antiseptic, analgesic, and antimicrobial activities'
    },
    datePublished: '2025-01-19',
    dateModified: new Date().toISOString().split('T')[0]
  }

  return (
    <>
      {/* 🚀 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
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
            title={herbData.title}
            chineseName={herbData.chineseName}
            latinName={herbData.latinName}
            description={herbData.description}
            primaryEffects={herbData.primaryEffects}
            activeCompounds={herbData.activeCompounds}
            safetyLevel={herbData.safetyLevel}
          />
          
          {/* 草药详情标签页 */}
          <HerbDetailTabs
            herbData={herbData}
          />
        </div>
      </div>
    </>
  )
}
