import { Metadata } from 'next'
import HerbDetailClient from '../[slug]/HerbDetailClient'

// 🚀 SEO优化：生成动态metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs | HerbScience',
    description: 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs. Learn safe dosage, side effects, and best uses.',
    keywords: 'cinnamon benefits, cinnamon for blood sugar, cinnamon for menstrual cramps, cinnamon for arthritis, cinnamon for cold limbs, cinnamon dosage, cinnamon side effects',
    openGraph: {
      title: 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs',
      description: 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs.',
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
      title: 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs',
      description: 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs.',
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
  return {
    id: 'cinnamon',
    name: 'Cinnamon',
    latin_name: 'Cinnamomum cassia',
    slug: 'cinnamon',
    overview: 'Cinnamon (Cinnamomum cassia) is not just a warming kitchen spice—it\'s a traditional herbal medicine used for centuries to improve blood circulation, regulate blood sugar, relieve menstrual cramps, and ease cold-related pain.',
    benefits: [
      'Blood sugar regulation and diabetes support',
      'Menstrual cramps relief and women\'s health', 
      'Cold limbs and poor circulation improvement',
      'Anti-inflammatory and antioxidant effects',
      'Digestive support and nausea relief'
    ],
    active_compounds: 'Cinnamaldehyde, Cinnamic acid, Polyphenols, Essential oils',
    traditional_uses: 'In Traditional Chinese Medicine (TCM), cinnamon (Rou Gui) is considered a warming herb that "warms the yang," dispels internal cold, and invigorates blood flow. It has been used for centuries to treat cold-damp conditions, improve circulation, and support women\'s reproductive health.',
    suitable_for: ['People with cold constitution', 'Those with poor circulation', 'Women with menstrual issues'],
    not_suitable_for: ['Hot constitution types', 'Pregnant women', 'Heavy menstrual bleeding'],
    dosage_forms: [
      {
        form: 'Bark Tea',
        dosage: '1.5-3 grams daily',
        usage: 'Steep dried bark in hot water for 10-15 minutes'
      },
      {
        form: 'Powder',
        dosage: '0.5-1 gram daily',
        usage: 'Mix with warm water or food'
      },
      {
        form: 'Capsules/Tincture',
        dosage: '250-500 mg daily',
        usage: 'Follow manufacturer instructions'
      }
    ],
    safety_warnings: [
      'Not suitable for hot-type conditions',
      'Avoid during pregnancy',
      'Not recommended for heavy menstruation',
      'May interact with blood thinning medications'
    ],
    interactions: ['May enhance effects of blood thinning medications', 'Can affect blood sugar levels'],
    scientific_evidence: 'Modern studies confirm cinnamon\'s role in diabetes support, arthritis relief, and digestive sluggishness. Research shows it improves insulin sensitivity, reduces inflammatory markers, and supports cardiovascular health through its warming and circulatory properties.',
    constitution_match: [
      {
        type: 'Cold Constitution',
        suitable: 'yes' as const,
        description: 'Excellent for warming the body and improving circulation'
      },
      {
        type: 'Hot Constitution', 
        suitable: 'no' as const,
        description: 'May worsen heat symptoms and cause irritation'
      }
    ],
    pairs_well_with: ['Ginger', 'Cardamom', 'Cloves', 'Turmeric'],
    user_stories: [
      {
        quote: 'Cinnamon tea has helped regulate my blood sugar levels naturally.',
        author: 'Sarah M.',
        location: 'California, USA'
      },
      {
        quote: 'My menstrual cramps are much better since I started drinking cinnamon tea.',
        author: 'Lisa K.',
        location: 'Toronto, Canada'
      }
    ],
    faqs: [
      {
        question: 'Is cinnamon good for diabetes?',
        answer: 'Yes. Cinnamon supports insulin sensitivity and helps regulate blood sugar. Best for prediabetic or type 2 diabetes patients under medical supervision.'
      },
      {
        question: 'Can cinnamon help with menstrual cramps?',
        answer: 'Yes, cinnamon warms the uterus and relieves cold-type cramps. Avoid if bleeding is heavy.'
      },
      {
        question: 'How much cinnamon per day is safe?',
        answer: '1-3g bark or 0.5-1g powder daily is safe. Long-term high doses may harm the liver.'
      }
    ],
    seo_keywords: ['cinnamon benefits', 'cinnamon for blood sugar', 'cinnamon for menstrual cramps', 'cinnamon tea', 'traditional chinese medicine'],
    evidence_level: 'Moderate' as const,
    category: 'Warming Herbs',
    properties: ['Warming', 'Circulatory', 'Anti-inflammatory', 'Antioxidant']
  }
}

export default async function CinnamonPage() {
  const herbData = await getCinnamonData()
  
  // 🚀 结构化数据：JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs',
    description: 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs.',
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
      description: herbData.overview,
      activeIngredient: herbData.active_compounds,
      dosageForm: ['Bark', 'Powder', 'Capsules', 'Tincture', 'Essential oil'],
      indication: herbData.benefits,
      contraindication: herbData.not_suitable_for,
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
      
      <HerbDetailClient herbData={herbData} slug="cinnamon" />
    </>
  )
}
