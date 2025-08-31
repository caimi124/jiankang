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
  const herbData = await getPumpkinSeedData()
  
  return {
    title: herbData.seoTitle || 'Pumpkin Seeds Benefits: Prostate Health, Hair Growth & Hormonal Balance | HerbScience',
    description: herbData.seoDescription || 'Discover pumpkin seeds (Cucurbita pepo) benefits for prostate health, hair loss prevention, menopause relief, and natural parasite treatment. Rich in zinc, magnesium, and antioxidants.',
    keywords: herbData.seoKeywords?.join(', ') || 'pumpkin seeds benefits, pumpkin seeds for prostate health, pumpkin seeds for hair loss, pumpkin seeds for menopause, pumpkin seeds for parasites, pumpkin seed oil benefits',
    openGraph: {
      title: herbData.seoTitle || 'Pumpkin Seeds Benefits: Prostate Health, Hair Growth & Hormonal Balance',
      description: herbData.seoDescription || 'Discover pumpkin seeds (Cucurbita pepo) benefits for prostate health, hair loss prevention, menopause relief, and natural parasite treatment.',
      type: 'article',
      url: 'https://herbscience.shop/herbs/pumpkin-seeds',
      images: [
        {
          url: '/images/herbs/pumpkin-seeds-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Pumpkin Seeds (Cucurbita pepo) - Prostate Health, Hair Growth & Hormonal Balance'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: herbData.seoTitle || 'Pumpkin Seeds Benefits: Prostate Health, Hair Growth & Hormonal Balance',
      description: herbData.seoDescription || 'Discover pumpkin seeds (Cucurbita pepo) benefits for prostate health, hair loss prevention, menopause relief, and natural parasite treatment.',
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
async function getPumpkinSeedData() {
  try {
    const herb = await sanityFetch(`*[_type == "herb" && slug.current == "pumpkin-seeds"][0]`)
    
    if (!herb) {
      // 如果Sanity中没有数据，返回默认数据
      return {
        title: 'Pumpkin Seeds',
        chineseName: '南瓜籽',
        latinName: 'Cucurbita pepo',
        description: 'Pumpkin seeds (Cucurbita pepo), also called pepitas, are nutrient-packed edible seeds rich in zinc, magnesium, healthy fats, and antioxidants.',
        primaryEffects: ['Prostate health and BPH support', 'Hair loss prevention and regrowth', 'Hormonal balance for men and women'],
        activeCompounds: ['Phytosterols (β-sitosterol)', 'Zinc', 'Magnesium', 'Tryptophan', 'Cucurbitin'],
        dosage: 'General Health: 10-30 g daily (1-2 handfuls). Parasite Cleanse: 30-50 g daily × 7-10 days.',
        safetyLevel: 'high',
        contraindications: ['Avoid if allergic to seeds/nuts', 'Use caution with diuretics or blood pressure medication'],
        seoTitle: 'Pumpkin Seeds Benefits: Prostate Health, Hair Growth & Hormonal Balance | HerbScience',
        seoDescription: 'Discover pumpkin seeds (Cucurbita pepo) benefits for prostate health, hair loss prevention, menopause relief, and natural parasite treatment.',
        seoKeywords: ['pumpkin seeds benefits', 'pumpkin seeds for prostate health', 'pumpkin seeds for hair loss']
      }
    }
    
    return herb
  } catch (error) {
    console.error('Error fetching pumpkin seeds data:', error)
    // 返回默认数据
    return {
      title: 'Pumpkin Seeds',
      chineseName: '南瓜籽',
      latinName: 'Cucurbita pepo',
      description: 'Pumpkin seeds (Cucurbita pepo), also called pepitas, are nutrient-packed edible seeds rich in zinc, magnesium, healthy fats, and antioxidants.',
      primaryEffects: ['Prostate health and BPH support', 'Hair loss prevention and regrowth', 'Hormonal balance for men and women'],
      activeCompounds: ['Phytosterols (β-sitosterol)', 'Zinc', 'Magnesium', 'Tryptophan', 'Cucurbitin'],
      dosage: 'General Health: 10-30 g daily (1-2 handfuls). Parasite Cleanse: 30-50 g daily × 7-10 days.',
      safetyLevel: 'high',
      contraindications: ['Avoid if allergic to seeds/nuts', 'Use caution with diuretics or blood pressure medication'],
      seoTitle: 'Pumpkin Seeds Benefits: Prostate Health, Hair Growth & Hormonal Balance | HerbScience',
      seoDescription: 'Discover pumpkin seeds (Cucurbita pepo) benefits for prostate health, hair loss prevention, menopause relief, and natural parasite treatment.',
      seoKeywords: ['pumpkin seeds benefits', 'pumpkin seeds for prostate health', 'pumpkin seeds for hair loss']
    }
  }
}

export default async function PumpkinSeedsPage() {
  const herbData = await getPumpkinSeedData()
  
  // 🚀 结构化数据：JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: herbData.seoTitle || 'Pumpkin Seeds Benefits: Prostate Health, Hair Growth & Hormonal Balance',
    description: herbData.seoDescription || 'Discover pumpkin seeds (Cucurbita pepo) benefits for prostate health, hair loss prevention, menopause relief, and natural parasite treatment.',
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
      alternateName: ['南瓜籽', 'Cucurbita pepo', 'Pepitas'],
      description: herbData.description,
      activeIngredient: herbData.activeCompounds,
      dosageForm: ['Raw seeds', 'Roasted seeds', 'Seed oil', 'Ground powder'],
      indication: herbData.primaryEffects,
      contraindication: herbData.contraindications,
      drugClass: 'Herbal supplement',
      mechanismOfAction: 'Phytosterols block 5-alpha-reductase, zinc boosts fertility, magnesium relaxes blood vessels, cucurbitin paralyzes intestinal worms',
      clinicalPharmacology: 'Pumpkin seeds contain phytosterols, zinc, magnesium, tryptophan, and cucurbitin, providing prostate support, hormonal balance, and anti-parasitic effects'
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
                        In Traditional Chinese Medicine, pumpkin seeds are warm and tonifying, suitable for people with fatigue, frequent urination, or hormonal imbalance. They have been traditionally used for prostate support, intestinal parasites, and women's hormonal balance, particularly during menopause.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Modern Applications</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Modern studies confirm pumpkin seeds' effectiveness for prostate health (BPH), hair loss prevention, menopause relief, and parasite treatment. Clinical trials show positive results for urinary symptoms, hair regrowth, hot flash reduction, and sleep quality improvement.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Mechanism of Action</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Hormone Modulation: Phytosterols may block 5-alpha-reductase, protecting the prostate and reducing hair loss. Antioxidant Defense: Vitamin E, selenium, and carotenoids fight oxidative stress and aging. Anti-Parasitic: Cucurbitin paralyzes intestinal worms, making them easier to expel. Cardiovascular Support: Magnesium + unsaturated fats help relax vessels and lower cholesterol. Sleep Enhancement: Tryptophan → serotonin → melatonin, supporting restful sleep.
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
                    pregnancySafety="Safe"
                    lactationSafety="Safe"
                    childrenSafety="Safe in moderation"
                  />
                )
              },
              {
                id: 'usage',
                label: 'Usage Tips',
                content: (
                  <HerbUsage
                    tips={[
                      'Snack: Eat raw or lightly roasted seeds to preserve nutrients',
                      'Smoothie Boost: Blend into shakes for zinc and protein',
                      'Prostate Support: Take pumpkin seed oil daily',
                      'Parasite Cleanse: Grind raw seeds into powder, consume on empty stomach',
                      'Hormone Balance: Combine with flaxseeds or sesame'
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
                      'Prostate Health: Pumpkin seed oil reduced urinary symptoms in men with BPH',
                      'Hair Loss: 40% hair regrowth after 6 months of pumpkin seed extract (clinical trial)',
                      'Menopause Relief: Women taking pumpkin seed oil had fewer hot flashes & better HDL cholesterol',
                      'Parasite Treatment: Cucurbitin confirmed effective against hookworms & tapeworms',
                      'Sleep Quality: Tryptophan-rich pumpkin seeds improved sleep onset and duration'
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
                        question: 'Can pumpkin seeds help with hair loss?',
                        answer: 'Yes, they block 5-alpha-reductase and support hormone balance, reducing thinning hair.'
                      },
                      {
                        question: 'How do I use pumpkin seeds for parasites?',
                        answer: 'Take 30-50 g of ground raw seeds daily for about a week, ideally on an empty stomach.'
                      },
                      {
                        question: 'Are pumpkin seeds good for women in menopause?',
                        answer: 'Absolutely. They reduce hot flashes, improve sleep, and support healthy cholesterol.'
                      },
                      {
                        question: 'Can kids eat pumpkin seeds for worms?',
                        answer: 'Yes, in small amounts. Mix ground seeds with honey or porridge for safe deworming.'
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
