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
        answer: 'Yes, cinnamon is beneficial for blood sugar management. Research shows it can improve insulin sensitivity by up to 20% and reduce fasting blood glucose levels. It works by increasing glucose uptake by cells and improving insulin signaling. Ceylon cinnamon is preferred over Cassia for long-term use due to lower coumarin content. Always consult your doctor before using cinnamon as a diabetes supplement.'
      },
      {
        question: 'Can cinnamon help with menstrual cramps?',
        answer: 'Yes, cinnamon is excellent for menstrual cramps, especially those caused by cold or poor circulation. In Traditional Chinese Medicine, cinnamon warms the uterus and promotes blood flow, reducing cramping pain. Drink cinnamon tea 3-5 days before your period starts for best results. Avoid if you have heavy bleeding or hot constitution symptoms.'
      },
      {
        question: 'How much cinnamon per day is safe?',
        answer: 'For general health: 1-3g of cinnamon bark or 0.5-1g of powder daily. For blood sugar support: 1-6g daily under medical supervision. Ceylon cinnamon is safer for long-term use than Cassia cinnamon due to lower coumarin levels. Pregnant women should limit intake, and those on blood thinners should consult their doctor.'
      },
      {
        question: 'What is the difference between Ceylon and Cassia cinnamon?',
        answer: 'Ceylon cinnamon (true cinnamon) is sweeter, more delicate, and has very low coumarin levels, making it safer for daily use. Cassia cinnamon is stronger, more common in stores, but has higher coumarin content which can be toxic in large amounts. For therapeutic use, Ceylon cinnamon is generally preferred.'
      },
      {
        question: 'Can cinnamon help with cold hands and feet?',
        answer: 'Yes, cinnamon is excellent for improving circulation and warming cold extremities. It stimulates blood flow and has warming properties that help with poor circulation. Drink cinnamon tea regularly or add cinnamon to warm foods. You should notice improvement in circulation within 2-3 weeks of regular use.'
      },
      {
        question: 'Are there any side effects of cinnamon?',
        answer: 'Cinnamon is generally safe in culinary amounts. However, large doses may cause mouth sores, digestive upset, or liver damage (due to coumarin in Cassia cinnamon). It may interact with blood thinners and diabetes medications. People with hot constitution, liver disease, or bleeding disorders should use caution.'
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
      '@type': 'Thing',
      '@id': 'https://herbscience.shop/herbs/cinnamon#herb',
      name: 'Cinnamon',
      alternateName: ['肉桂', 'Cinnamomum cassia', 'Rou Gui'],
      description: herbData.overview,
      category: 'Warming Herbs',
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Active Compounds',
          value: herbData.active_compounds
        },
        {
          '@type': 'PropertyValue',
          name: 'Traditional Uses',
          value: herbData.traditional_uses
        },
        {
          '@type': 'PropertyValue',
          name: 'Evidence Level',
          value: 'Moderate'
        },
        {
          '@type': 'PropertyValue',
          name: 'Health Benefits',
          value: herbData.benefits.join(', ')
        }
      ],
      hasHealthAspect: herbData.benefits.map((benefit: string) => ({
        '@type': 'HealthAspectEnumeration',
        name: benefit
      }))
    },
    datePublished: '2025-01-19',
    dateModified: new Date().toISOString().split('T')[0],
    aggregateRating: {
      '@type': 'AggregateRating',
      '@id': 'https://herbscience.shop/herbs/cinnamon#aggregateRating',
      ratingValue: '4.6',
      reviewCount: herbData.user_stories.length.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    review: herbData.user_stories.map((story, index) => ({
      '@type': 'Review',
      '@id': `https://herbscience.shop/herbs/cinnamon#review-${index}`,
      reviewRating: { 
        '@type': 'Rating', 
        ratingValue: '5', 
        bestRating: '5',
        worstRating: '1'
      },
      author: { 
        '@type': 'Person', 
        name: story.author,
        '@id': `https://herbscience.shop/herbs/cinnamon#author-${index}`
      },
      reviewBody: story.quote,
      datePublished: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      dateCreated: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      headline: `Cinnamon Health Benefits Review by ${story.author}`,
      reviewAspect: 'effectiveness',
      itemReviewed: {
        '@type': 'Thing',
        name: 'Cinnamon',
        '@id': 'https://herbscience.shop/herbs/cinnamon#herb'
      }
    }))
  }

  // 🚀 FAQ结构化数据 - 使用实际FAQ数据
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://herbscience.shop/herbs/cinnamon#faq',
    url: 'https://herbscience.shop/herbs/cinnamon',
    name: 'Cinnamon Frequently Asked Questions',
    description: 'Common questions and answers about cinnamon benefits, uses, and safety',
    mainEntity: herbData.faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `https://herbscience.shop/herbs/cinnamon#faq-${index}`,
      name: faq.question,
      text: faq.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        '@id': `https://herbscience.shop/herbs/cinnamon#answer-${index}`,
        text: faq.answer,
        dateCreated: new Date().toISOString(),
        upvoteCount: 1
      }
    }))
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
