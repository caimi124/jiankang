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
  const herbData = await getCinnamonData()
  
  return {
    title: herbData.seoTitle || 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs | HerbScience',
    description: herbData.seoDescription || 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs. Learn safe dosage, side effects, and best uses.',
    keywords: herbData.seoKeywords?.join(', ') || 'cinnamon benefits, cinnamon for blood sugar, cinnamon for menstrual cramps, cinnamon for arthritis, cinnamon for cold limbs, cinnamon dosage, cinnamon side effects',
    openGraph: {
      title: herbData.seoTitle || 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs',
      description: herbData.seoDescription || 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs.',
      type: 'article',
      url: 'https://herbscience.shop/herbs/cinnamon',
      images: [
        {
          url: '/images/herbs/cinnamon-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Cinnamon (Cinnamomum cassia) - Blood Sugar, Menstrual Cramps & Cold Limbs'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: herbData.seoTitle || 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs',
      description: herbData.seoDescription || 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs.',
      images: ['/images/herbs/cinnamon-og.jpg']
    },
    alternates: {
      canonical: 'https://herbscience.shop/herbs/cinnamon'
    }
  }
}

// 🚀 静态生成：预生成页面
export async function generateStaticParams() {
  return [{ slug: 'cinnamon' }]
}

// 获取Cinnamon草药数据
async function getCinnamonData() {
  try {
    const herb = await sanityFetch(`*[_type == "herb" && slug.current == "cinnamon"][0]`)
    
    if (!herb) {
      // 如果Sanity中没有数据，返回默认数据
      return {
        title: 'Cinnamon',
        chineseName: '肉桂',
        latinName: 'Cinnamomum cassia',
        description: 'Cinnamon (Cinnamomum cassia) is not just a warming kitchen spice—it\'s a traditional herbal medicine used for centuries to improve blood circulation, regulate blood sugar, relieve menstrual cramps, and ease cold-related pain.',
        primaryEffects: ['Blood sugar regulation and diabetes support', 'Menstrual cramps relief and women\'s health', 'Cold limbs and poor circulation improvement'],
        activeCompounds: ['Cinnamaldehyde', 'Cinnamic acid', 'Polyphenols', 'Essential oils'],
        dosage: 'Whole bark (tea): 1.5-3 grams/day. Powder: 0.5-1 gram/day. Capsules/Tincture: 250-500 mg/day.',
        safetyLevel: 'medium',
        contraindications: ['Not suitable for hot-type conditions', 'Avoid during pregnancy', 'Not recommended for heavy menstruation'],
        seoTitle: 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs | HerbScience',
        seoDescription: 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs.',
        seoKeywords: ['cinnamon benefits', 'cinnamon for blood sugar', 'cinnamon for menstrual cramps']
      }
    }
    
    return herb
  } catch (error) {
    console.error('Error fetching cinnamon data:', error)
    // 返回默认数据
    return {
      title: 'Cinnamon',
      chineseName: '肉桂',
      latinName: 'Cinnamomum cassia',
      description: 'Cinnamon (Cinnamomum cassia) is not just a warming kitchen spice—it\'s a traditional herbal medicine used for centuries to improve blood circulation, regulate blood sugar, relieve menstrual cramps, and ease cold-related pain.',
      primaryEffects: ['Blood sugar regulation and diabetes support', 'Menstrual cramps relief and women\'s health', 'Cold limbs and poor circulation improvement'],
      activeCompounds: ['Cinnamaldehyde', 'Cinnamic acid', 'Polyphenols', 'Essential oils'],
      dosage: 'Whole bark (tea): 1.5-3 grams/day. Powder: 0.5-1 gram/day. Capsules/Tincture: 250-500 mg/day.',
      safetyLevel: 'medium',
      contraindications: ['Not suitable for hot-type conditions', 'Avoid during pregnancy', 'Not recommended for heavy menstruation'],
      seoTitle: 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs | HerbScience',
      seoDescription: 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs.',
      seoKeywords: ['cinnamon benefits', 'cinnamon for blood sugar', 'cinnamon for menstrual cramps']
    }
  }
}

export default async function CinnamonPage() {
  const herbData = await getCinnamonData()
  
  // 🚀 结构化数据：JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: herbData.seoTitle || 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs',
    description: herbData.seoDescription || 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs.',
    image: '/images/herbs/cinnamon-og.jpg',
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
      name: 'Cinnamon',
      alternateName: ['肉桂', 'Cinnamomum cassia', 'Rou Gui'],
      description: herbData.description,
      activeIngredient: herbData.activeCompounds,
      dosageForm: ['Bark', 'Powder', 'Capsules', 'Tincture', 'Essential oil'],
      indication: herbData.primaryEffects,
      contraindication: herbData.contraindications,
      drugClass: 'Herbal supplement',
      mechanismOfAction: 'Cinnamaldehyde improves insulin sensitivity, cinnamic acid boosts blood flow, polyphenols reduce inflammation, essential oils stimulate circulation',
      clinicalPharmacology: 'Cinnamon contains cinnamaldehyde, cinnamic acid, polyphenols, and essential oils, providing blood sugar support, anti-inflammatory effects, and circulatory benefits'
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
        name: 'Is cinnamon good for diabetes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Cinnamon supports insulin sensitivity and helps regulate blood sugar. Best for prediabetic or type 2 diabetes patients under medical supervision.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can cinnamon help with menstrual cramps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, cinnamon warms the uterus and relieves cold-type cramps. Avoid if bleeding is heavy.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much cinnamon per day is safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '1-3g bark or 0.5-1g powder daily is safe. Long-term high doses may harm the liver.'
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
              { label: 'Cinnamon', href: '/herbs/cinnamon' }
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
                        In Traditional Chinese Medicine (TCM), cinnamon (Rou Gui) is considered a warming herb that "warms the yang," dispels internal cold, and invigorates blood flow. It has been used for centuries to treat cold-damp conditions, improve circulation, and support women\'s reproductive health.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Modern Applications</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Modern studies confirm cinnamon\'s role in diabetes support, arthritis relief, and digestive sluggishness. Research shows it improves insulin sensitivity, reduces inflammatory markers, and supports cardiovascular health through its warming and circulatory properties.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Mechanism of Action</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Blood Sugar Regulation: Improves insulin sensitivity and glucose uptake, helpful for type 2 diabetes and metabolic syndrome. Circulation Booster: Enhances peripheral blood flow, warming cold limbs and easing stiffness. Anti-Inflammatory Action: Polyphenols reduce cytokines like IL-6 and TNF-α, useful for arthritis and chronic inflammation. Digestive Support: Stimulates gastric juices, helping with bloating and sluggish digestion (especially in cold climates).
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
                    childrenSafety="Safe in small amounts"
                  />
                )
              },
              {
                id: 'usage',
                label: 'Usage Tips',
                content: (
                  <HerbUsage
                    tips={[
                      'Cinnamon tea for daily health: Steep 1-2g of cinnamon stick in hot water with honey',
                      'Menstrual support recipe: Boil cinnamon with rose and brown sugar; drink before period',
                      'Pain relief blend: Mix cinnamon powder with ginger tea for cold-induced back or joint pain',
                      'Capsules or tincture: For blood sugar support (250-500 mg/day, follow product label)',
                      'Warming foot soak: Cinnamon + ginger boiled in water to ease cold feet and fatigue'
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
                      'A 2021 meta-analysis found cinnamon significantly improved fasting blood glucose and insulin sensitivity in type 2 diabetes',
                      'Patients taking 1-2g daily for 8 weeks had lower inflammatory markers (CRP, IL-6)',
                      'Animal studies show cinnamon reduces arthritis pain and swelling',
                      'Traditional formulas with cinnamon improved dysmenorrhea (menstrual cramps) and poor peripheral circulation in women'
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
                        question: 'Is cinnamon good for diabetes?',
                        answer: 'Yes. Cinnamon supports insulin sensitivity and helps regulate blood sugar. Best for prediabetic or type 2 diabetes patients under medical supervision.'
                      },
                      {
                        question: 'Can cinnamon help with menstrual cramps?',
                        answer: 'Yes, cinnamon warms the uterus and relieves cold-type cramps. Avoid if bleeding is heavy.'
                      },
                      {
                        question: 'Cassia vs Ceylon cinnamon – which is better?',
                        answer: 'Cassia (C. cassia) is stronger and used in TCM for medicinal purposes. Ceylon (C. verum) is milder and more common in food.'
                      },
                      {
                        question: 'How much cinnamon per day is safe?',
                        answer: '1-3g bark or 0.5-1g powder daily is safe. Long-term high doses may harm the liver.'
                      },
                      {
                        question: 'Can I take cinnamon every day?',
                        answer: 'Short-term use (7-14 days) is fine. For long-term health, take breaks between cycles.'
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
