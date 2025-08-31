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
            tabs={[
              {
                id: 'overview',
                label: 'Overview',
                content: (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Traditional Use</h3>
                      <p className="text-gray-700 leading-relaxed">
                        In Traditional Chinese Medicine, clove is known for warming the stomach, stopping vomiting, and boosting kidney yang energy. It has been used for centuries to relieve digestive discomfort, freshen breath, ease pain, and support men's reproductive health. Clove's warming nature makes it particularly effective for cold-type conditions and yang deficiency patterns.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Modern Applications</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Modern science confirms clove's strong antibacterial, anti-inflammatory, and antioxidant activities. Research supports its use in oral care, digestive health, pain management, and infection control. Clinical studies demonstrate effectiveness in reducing halitosis, managing digestive discomfort, and providing natural pain relief.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Mechanism of Action</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Eugenol, clove's main compound, exerts local anesthetic effects by blocking nerve transmission, explaining its effectiveness in toothache relief. It inhibits inflammatory mediators like COX-2, reducing pain and swelling. Eugenol neutralizes free radicals through antioxidant activity and combats microbial overgrowth through direct antimicrobial action.
                      </p>
                    </div>
                  </div>
                )
              },
              {
                id: 'benefits',
                label: 'Benefits & Uses',
                content: <HerbBenefits benefits={herbData.primaryEffects} />
              },
              {
                id: 'safety',
                label: 'Safety & Dosage',
                content: (
                  <HerbSafety
                    dosage={herbData.dosage}
                    safetyLevel={herbData.safetyLevel}
                    contraindications={herbData.contraindications}
                    pregnancySafety="Avoid"
                    lactationSafety="Caution"
                    childrenSafety="Avoid under 12"
                  />
                )
              },
              {
                id: 'usage',
                label: 'Usage Tips',
                content: (
                  <HerbUsage
                    tips={[
                      'Clove tea: Steep 2-3 whole cloves with black or red tea before meals for better digestion',
                      'Toothache relief: Apply diluted clove oil (1:5 with carrier oil) on cotton ball to affected tooth',
                      'Aromatherapy: Inhale clove essential oil to lift mood and fight fatigue',
                      'Digestive blend: Mix ground clove with dried ginger and fennel seed for warming tonic'
                    ]}
                  />
                )
              },
              {
                id: 'research',
                label: 'Research & Studies',
                content: (
                  <HerbResearch
                    studies={[
                      'A 2022 randomized trial found clove mouthwash significantly reduced halitosis and oral bacteria in patients with gingivitis',
                      'In vitro studies confirm eugenol\'s antimicrobial effect against Streptococcus mutans and Candida albicans',
                      'A meta-analysis in 2021 highlighted clove\'s anti-ulcer and anti-inflammatory actions via modulation of gastric enzymes and prostaglandins'
                    ]}
                  />
                )
              },
              {
                id: 'faq',
                label: 'FAQ',
                content: (
                  <HerbFAQ
                    faqs={[
                      {
                        question: 'Is clove safe for daily use?',
                        answer: 'Small culinary amounts are safe. Therapeutic doses (e.g., clove oil) should not be used long-term without supervision.'
                      },
                      {
                        question: 'Can I use clove oil for gum pain?',
                        answer: 'Yes, but always dilute it and avoid direct contact with sensitive tissue.'
                      },
                      {
                        question: 'Does clove help with bad breath?',
                        answer: 'Yes, its antimicrobial and aromatic compounds make it a powerful breath freshener.'
                      },
                      {
                        question: 'Can clove help with fertility?',
                        answer: 'Traditionally yes, especially in men with cold-type sexual weakness. Modern evidence is limited but promising.'
                      }
                    ]}
                  />
                )
              }
            ]}
          />
        </div>
      </div>
    </>
  )
}
