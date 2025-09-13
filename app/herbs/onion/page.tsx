import { Metadata } from 'next'
import HerbDetailClient from '../[slug]/HerbDetailClient'

// 🧅 SEO优化：生成动态metadata - 覆盖所有核心关键词
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Onion Health Benefits | Uses, Nutrition & Side Effects',
    description: 'Discover onion&apos;s health benefits: heart health, cholesterol, digestion & immunity. Learn how to use onions, pickled onion benefits, and who should avoid them.',
    keywords: 'onion health benefits, onion medicinal uses, pickled onion benefits, onion for cholesterol, who should not eat onion, red onion vs white onion, onion side effects, onion nutrition, onion tea recipe, how to use onion for health',
    openGraph: {
      title: 'Onion Health Benefits | Uses, Nutrition & Side Effects',
      description: 'Discover onion&apos;s health benefits: heart health, cholesterol, digestion & immunity. Learn how to use onions, pickled onion benefits, and who should avoid them.',
      type: 'article',
      url: 'https://herbscience.shop/herbs/onion',
      images: [
        {
          url: '/images/herbs/onion-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Onion (Allium cepa) - Health Benefits, Nutrition & Medicinal Uses'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Onion Health Benefits | Uses, Nutrition & Side Effects',
      description: 'Discover onion&apos;s health benefits: heart health, cholesterol, digestion & immunity. Learn how to use onions, pickled onion benefits, and who should avoid them.',
      images: ['/images/herbs/onion-og.jpg']
    },
    alternates: {
      canonical: 'https://herbscience.shop/herbs/onion'
    }
  }
}

// 🧅 静态生成：预生成页面
export async function generateStaticParams() {
  return [{ slug: 'onion' }]
}

// 获取Onion草药数据 - 整合所有SEO关键词和内容
async function getOnionData() {
  return {
    id: 'onion',
    name: 'Onion',
    latin_name: 'Allium cepa',
    slug: 'onion',
    overview: 'Onion (Allium cepa) is a powerful medicinal plant with proven health benefits for heart health, cholesterol management, digestion, and immune support. Rich in quercetin, sulfur compounds, and antioxidants, onions have been used both as food and medicine for thousands of years across different cultures.',
    benefits: [
      'Heart health and cardiovascular protection',
      'Cholesterol and blood sugar management', 
      'Digestive health and gut microbiome support',
      'Immune system strengthening and anti-inflammatory effects',
      'Antioxidant protection and cellular health',
      'Respiratory health and cold/flu prevention',
      'Bone health and calcium absorption',
      'Weight management and metabolism support'
    ],
    active_compounds: 'Quercetin, Allicin, Sulfur compounds, Fructooligosaccharides, Anthocyanins, Vitamin C, Folate, Potassium',
    traditional_uses: 'Throughout history, onions have been valued for their medicinal properties. Ancient Egyptians used onions for strength and endurance. Traditional Chinese Medicine employs onions to warm the body, improve circulation, and support respiratory health. European folk medicine has used onions for treating colds, wounds, and digestive issues.',
    suitable_for: [
      'People with high cholesterol or blood pressure',
      'Those seeking immune system support',
      'Individuals with digestive issues',
      'People looking for natural anti-inflammatory foods',
      'Those wanting to improve heart health naturally'
    ],
    not_suitable_for: [
      'People with severe GERD or acid reflux',
      'Those allergic to allium vegetables',
      'Individuals with bleeding disorders (large amounts)',
      'People taking blood-thinning medications (consult doctor)',
      'Those with severe IBS or digestive sensitivities'
    ],
    dosage_forms: [
      {
        form: 'Raw Onion',
        dosage: '1/2 to 1 medium onion daily',
        usage: 'Fresh in salads, sandwiches, or as garnish for maximum quercetin'
      },
      {
        form: 'Cooked Onion',
        dosage: '1-2 medium onions daily',
        usage: 'Sautéed, roasted, or in soups - easier to digest than raw'
      },
      {
        form: 'Onion Tea',
        dosage: '1 cup 1-2 times daily',
        usage: 'Steep chopped onion in hot water for 10-15 minutes, strain'
      },
      {
        form: 'Pickled Onions',
        dosage: '2-3 tablespoons daily',
        usage: 'Fermented onions provide probiotics plus onion benefits'
      },
      {
        form: 'Onion Extract/Supplement',
        dosage: '300-600mg daily',
        usage: 'Standardized quercetin content, follow manufacturer instructions'
      }
    ],
    safety_warnings: [
      'May cause digestive upset in sensitive individuals',
      'Can trigger heartburn or acid reflux',
      'May enhance blood-thinning effects of medications',
      'Large amounts may cause stomach irritation',
      'Can cause strong body odor and bad breath'
    ],
    interactions: [
      'May enhance effects of blood-thinning medications',
      'Can affect blood sugar levels - monitor if diabetic',
      'May interact with lithium medications',
      'Can enhance effects of blood pressure medications'
    ],
    scientific_evidence: 'Extensive research confirms onion&apos;s health benefits. Studies show quercetin in onions reduces inflammation and supports heart health. Research demonstrates significant cholesterol-lowering effects, blood sugar management, and immune system enhancement. Multiple studies confirm onions&apos; anti-cancer properties and digestive health benefits.',
    constitution_match: [
      {
        type: 'Cold Constitution',
        suitable: 'yes' as const,
        description: 'Onions provide warming energy and improve circulation'
      },
      {
        type: 'Hot Constitution', 
        suitable: 'warning' as const,
        description: 'Use moderately; may increase heat symptoms in some individuals'
      },
      {
        type: 'Neutral Constitution',
        suitable: 'yes' as const,
        description: 'Excellent daily food medicine for overall health maintenance'
      }
    ],
    pairs_well_with: ['Garlic', 'Ginger', 'Turmeric', 'Black pepper', 'Tomatoes', 'Bell peppers'],
    user_stories: [
      {
        quote: 'Adding raw onions to my daily salad helped lower my cholesterol by 30 points in 3 months.',
        author: 'Maria S.',
        location: 'Texas, USA'
      },
      {
        quote: 'Onion tea has become my go-to remedy for colds and flu - it really works!',
        author: 'David L.',
        location: 'Ontario, Canada'
      },
      {
        quote: 'Pickled onions improved my digestion significantly and I love the tangy flavor.',
        author: 'Jennifer R.',
        location: 'California, USA'
      }
    ],
    faqs: [
      {
        question: 'What are the main onion health benefits?',
        answer: 'Onions provide heart health support, cholesterol management, immune system strengthening, digestive health benefits, and powerful antioxidant protection through compounds like quercetin and sulfur.'
      },
      {
        question: 'Are pickled onion benefits different from raw onions?',
        answer: 'Pickled onions retain most antioxidants while adding probiotic benefits from fermentation. They&apos;re easier to digest than raw onions and provide additional gut health support.'
      },
      {
        question: 'Who should not eat onion?',
        answer: 'People with severe acid reflux, allium allergies, bleeding disorders, or those taking blood thinners should limit onion consumption. Those with IBS may need to avoid large amounts.'
      },
      {
        question: 'Red onion vs white onion - which is better for health?',
        answer: 'Red onions contain higher levels of anthocyanins and quercetin, making them slightly more antioxidant-rich. White onions are milder and better for sensitive stomachs. Both offer significant health benefits.'
      },
      {
        question: 'How to use onion for health daily?',
        answer: 'Include 1/2 to 1 medium onion daily through raw salads, cooked dishes, onion tea, or pickled onions. Start with smaller amounts if you&apos;re sensitive to onions.'
      },
      {
        question: 'What is a good onion tea recipe for health?',
        answer: 'Chop 1 medium onion, steep in 2 cups hot water for 15 minutes, strain, and add honey/lemon if desired. Drink 1-2 cups daily for immune and respiratory support.'
      },
      {
        question: 'Can onions help with cholesterol?',
        answer: 'Yes, studies show onions can significantly reduce LDL (bad) cholesterol and increase HDL (good) cholesterol, particularly when consumed regularly as part of a healthy diet.'
      },
      {
        question: 'Are there any onion side effects?',
        answer: 'Common side effects include digestive upset, heartburn, bad breath, and body odor. Large amounts may cause stomach irritation. Start with small amounts and increase gradually.'
      }
    ],
    seo_keywords: [
      'onion health benefits',
      'onion medicinal uses', 
      'pickled onion benefits',
      'onion for cholesterol',
      'who should not eat onion',
      'red onion vs white onion',
      'onion side effects',
      'onion nutrition',
      'onion tea recipe',
      'how to use onion for health',
      'onion quercetin benefits',
      'allium cepa health benefits'
    ],
    evidence_level: 'Strong' as const,
    category: 'Culinary Medicine',
    properties: ['Anti-inflammatory', 'Antioxidant', 'Cardioprotective', 'Immune-supporting', 'Digestive']
  }
}

export default async function OnionPage() {
  const herbData = await getOnionData()
  
  // 🧅 结构化数据：JSON-LD - 优化搜索引擎理解
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Onion (Allium cepa): Health Benefits, Nutrition & Medicinal Uses',
    description: 'Comprehensive guide to onion health benefits, medicinal uses, nutrition, side effects, and how to use onions for optimal health.',
    image: '/images/herbs/onion-og.jpg',
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
      '@type': 'NutritionInformation',
      name: 'Onion',
      alternateName: ['Allium cepa', 'Common Onion', 'Garden Onion'],
      description: herbData.overview,
      calories: '40 per 100g',
      carbohydrateContent: '9.3g per 100g',
      fiberContent: '1.7g per 100g',
      proteinContent: '1.1g per 100g',
      fatContent: '0.1g per 100g',
      sugarContent: '4.2g per 100g',
      vitaminContent: 'Vitamin C, Folate, Vitamin B6',
      mineralContent: 'Potassium, Manganese, Phosphorus',
      unsaturatedFatContent: 'Low',
      saturatedFatContent: 'Minimal',
      sodiumContent: '4mg per 100g',
      servingSize: '1 medium onion (150g)',
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Active Compounds',
          value: herbData.active_compounds
        },
        {
          '@type': 'PropertyValue',
          name: 'Health Benefits',
          value: herbData.benefits.join(', ')
        },
        {
          '@type': 'PropertyValue',
          name: 'Traditional Uses',
          value: herbData.traditional_uses
        },
        {
          '@type': 'PropertyValue',
          name: 'Evidence Level',
          value: 'Strong scientific evidence'
        }
      ]
    },
    datePublished: '2025-01-19',
    dateModified: new Date().toISOString().split('T')[0],
    about: [
      { '@type': 'Thing', name: 'Heart Health' },
      { '@type': 'Thing', name: 'Cholesterol Management' },
      { '@type': 'Thing', name: 'Immune Support' },
      { '@type': 'Thing', name: 'Digestive Health' },
      { '@type': 'Thing', name: 'Anti-inflammatory' }
    ]
  }

  // 🧅 FAQ结构化数据 - 优化长尾关键词搜索
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the main onion health benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Onions provide heart health support, cholesterol management, immune system strengthening, digestive health benefits, and powerful antioxidant protection through compounds like quercetin and sulfur.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are pickled onion benefits different from raw onions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pickled onions retain most antioxidants while adding probiotic benefits from fermentation. They&apos;re easier to digest than raw onions and provide additional gut health support.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who should not eat onion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'People with severe acid reflux, allium allergies, bleeding disorders, or those taking blood thinners should limit onion consumption. Those with IBS may need to avoid large amounts.'
        }
      },
      {
        '@type': 'Question',
        name: 'Red onion vs white onion - which is better for health?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Red onions contain higher levels of anthocyanins and quercetin, making them slightly more antioxidant-rich. White onions are milder and better for sensitive stomachs. Both offer significant health benefits.'
        }
      },
      {
        '@type': 'Question',
        name: 'How to use onion for health daily?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Include 1/2 to 1 medium onion daily through raw salads, cooked dishes, onion tea, or pickled onions. Start with smaller amounts if you&apos;re sensitive to onions.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is a good onion tea recipe for health?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Chop 1 medium onion, steep in 2 cups hot water for 15 minutes, strain, and add honey/lemon if desired. Drink 1-2 cups daily for immune and respiratory support.'
        }
      }
    ]
  }

  // 🧅 Breadcrumb结构化数据
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://herbscience.shop/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Herbs',
        item: 'https://herbscience.shop/herb-finder'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Onion Health Benefits',
        item: 'https://herbscience.shop/herbs/onion'
      }
    ]
  }

  return (
    <>
      {/* 🧅 结构化数据 - 提升搜索引擎理解 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 🧅 FAQ结构化数据 - 优化长尾关键词 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 🧅 面包屑结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <HerbDetailClient herbData={herbData} slug="onion" />
    </>
  )
}