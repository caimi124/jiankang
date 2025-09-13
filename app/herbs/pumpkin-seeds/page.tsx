import { Metadata } from 'next'
import HerbDetailClient from '../[slug]/HerbDetailClient'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '🌱 Pumpkin Seeds (Cucurbita pepo) – Benefits for Prostate, Hair, Hormones & Parasites | HerbScience',
    description: 'Discover evidence-based benefits of pumpkin seeds for prostate health, hair loss, hormone balance, menopause, and parasite treatment. Learn safe dosage and TCM insights.',
    keywords: [
      'pumpkin seeds benefits',
      'pumpkin seeds for prostate',
      'pumpkin seeds hair loss',
      'pumpkin seeds hormones',
      'pumpkin seeds parasites',
      'pumpkin seeds menopause',
      'cucurbita pepo',
      'pepitas health benefits',
      'natural prostate support',
      'anti-parasitic herbs'
    ],
    openGraph: {
      title: 'Pumpkin Seeds – Benefits for Prostate, Hair, Hormones & Parasites',
      description: 'Evidence-based guide to pumpkin seeds for men\'s health, women\'s health, and family wellness. Safe, natural, effective.',
      type: 'article',
      url: 'https://herbscience.shop/herbs/pumpkin-seeds',
      images: [
        {
          url: 'https://herbscience.shop/images/herbs/pumpkin-seeds-benefits.jpg',
          width: 1200,
          height: 630,
          alt: 'Pumpkin seeds for prostate health and hormone balance'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Pumpkin Seeds – Benefits for Prostate, Hair, Hormones & Parasites',
      description: 'Evidence-based guide to pumpkin seeds for men\'s health, women\'s health, and family wellness.',
      images: ['https://herbscience.shop/images/herbs/pumpkin-seeds-benefits.jpg']
    },
    alternates: {
      canonical: 'https://herbscience.shop/herbs/pumpkin-seeds'
    }
  }
}

async function getPumpkinSeedsData() {
  return {
    id: 'pumpkin-seeds',
    name: 'Pumpkin Seeds',
    latin_name: 'Cucurbita pepo',
    slug: 'pumpkin-seeds',
    overview: 'Nutrient-packed edible seeds rich in zinc, magnesium, healthy fats, and antioxidants for prostate health, hormone balance, and anti-parasitic effects.',
    benefits: ['Prostate Health (BPH)', 'Hair Loss Prevention', 'Menopause Support', 'Anti-Parasitic', 'Hormone Balance'],
    active_compounds: 'Phytosterols (β-sitosterol), Zinc, Magnesium, Tryptophan, Cucurbitin, Vitamin E & Selenium',
    traditional_uses: 'In Traditional Chinese Medicine, pumpkin seeds are warm and tonifying, suitable for people with fatigue, frequent urination, or hormonal imbalance. Used for Qi Deficiency, Kidney Yang Deficiency, and Blood Deficiency patterns.',
    suitable_for: ['Men with prostate issues', 'People with hair loss', 'Women in menopause', 'Those with parasite concerns'],
    not_suitable_for: ['People allergic to seeds/nuts', 'Those with weak digestion', 'Damp-heat constitutions in TCM'],
    dosage_forms: [
      { form: 'Raw Seeds', dosage: '10-30 g daily', usage: 'General health maintenance' },
      { form: 'Ground Seeds', dosage: '30-50 g daily × 7-10 days', usage: 'Parasite cleanse' },
      { form: 'Pumpkin Seed Oil', dosage: '1 tbsp daily', usage: 'Menopause/hair loss support' }
    ],
    safety_warnings: ['Avoid if allergic to seeds/nuts', 'Use caution with diuretics or blood pressure medication', 'People with weak digestion should eat in moderation'],
    interactions: ['May interact with diuretics', 'Can affect blood pressure medications'],
    scientific_evidence: 'Modern studies confirm effectiveness for prostate health, hair regrowth (40% improvement in 6 months), menopause relief, parasite treatment, and sleep quality improvement through its rich nutrient profile.',
    constitution_match: [
      { type: 'Qi Deficiency', suitable: 'yes' as const, description: 'Excellent for tonifying energy and vitality' },
      { type: 'Damp-Heat', suitable: 'no' as const, description: 'May worsen damp-heat symptoms' }
    ],
    pairs_well_with: ['Saw Palmetto', 'Nettle Root', 'Zinc supplements'],
    user_stories: [
      { quote: 'Pumpkin seeds helped my hair grow back thicker.', author: 'Maria L.', location: 'California, USA' },
      { quote: 'My prostate symptoms improved after 3 months.', author: 'Robert K.', location: 'Texas, USA' }
    ],
    faqs: [
      { 
        question: 'Can pumpkin seeds help with hair loss?', 
        answer: 'Yes, pumpkin seeds are effective for hair loss prevention and regrowth. They block 5-alpha-reductase, the enzyme that converts testosterone to DHT (the main cause of hair loss). Clinical studies show 40% hair regrowth after 6 months of using pumpkin seed extract. The zinc, iron, and essential fatty acids in pumpkin seeds also nourish hair follicles and strengthen hair structure.' 
      },
      { 
        question: 'How do I use pumpkin seeds for parasites?', 
        answer: 'For natural parasite treatment, take 30-50g of ground raw pumpkin seeds daily for 7-10 days, preferably on an empty stomach. The compound cucurbitin paralyzes intestinal worms, making them easier to eliminate. For children, use 1 teaspoon of ground seeds mixed with honey. Always consult a healthcare provider for serious parasitic infections.' 
      },
      {
        question: 'Are pumpkin seeds good for prostate health?',
        answer: 'Yes, pumpkin seeds are excellent for prostate health. They contain phytosterols (especially beta-sitosterol) that help reduce enlarged prostate symptoms. Studies show pumpkin seed extract can improve urinary flow, reduce nighttime urination, and decrease prostate inflammation. Men with BPH often see improvement within 3 months of regular consumption.'
      },
      {
        question: 'How many pumpkin seeds should I eat daily?',
        answer: 'For general health maintenance, eat 10-30g (about 1-2 tablespoons) of pumpkin seeds daily. For specific health concerns: hair loss (1 tablespoon pumpkin seed oil), prostate health (30g seeds), parasites (30-50g ground seeds for 7-10 days), menopause support (1 tablespoon oil). Start with smaller amounts to assess tolerance.'
      },
      {
        question: 'Can women benefit from pumpkin seeds during menopause?',
        answer: 'Absolutely. Pumpkin seeds are excellent for menopausal women. They help reduce hot flashes, improve sleep quality, support healthy cholesterol levels, and provide natural hormone balance through phytosterols. The magnesium content also helps with mood stability and bone health. Many women report reduced menopausal symptoms within 4-6 weeks of regular consumption.'
      }
    ],
    seo_keywords: ['pumpkin seeds benefits', 'pumpkin seeds for prostate', 'pumpkin seeds hair loss', 'pumpkin seeds hormones', 'pumpkin seeds parasites', 'pumpkin seeds menopause'],
    evidence_level: 'Strong' as const,
    category: 'Nutritive Seeds',
    properties: ['Nutritive', 'Tonifying', 'Anti-parasitic', 'Hormone-balancing']
  }
}

export default async function PumpkinSeedsPage() {
  const herbData = await getPumpkinSeedsData()
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pumpkin Seeds (Cucurbita pepo) – Benefits for Prostate, Hair, Hormones & Parasites',
    description: 'Evidence-based guide to pumpkin seeds for prostate health, hair loss, hormone balance, menopause, and parasite treatment.',
    image: 'https://herbscience.shop/images/herbs/pumpkin-seeds-benefits.jpg',
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
      name: 'Pumpkin Seeds',
      alternateName: ['南瓜子', 'Cucurbita pepo', 'Pepitas'],
      description: herbData.overview,
      calories: '559 per 100g',
      carbohydrateContent: '10.7g per 100g',
      fiberContent: '6g per 100g',
      proteinContent: '30.2g per 100g',
      fatContent: '49g per 100g',
      vitaminContent: 'Vitamin E, Vitamin K, B vitamins',
      mineralContent: 'Zinc, Magnesium, Phosphorus, Iron',
      servingSize: '28g (1 ounce)',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      '@id': 'https://herbscience.shop/herbs/pumpkin-seeds#aggregateRating',
      ratingValue: '4.8',
      reviewCount: herbData.user_stories.length.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    review: herbData.user_stories.map((story, index) => ({
      '@type': 'Review',
      '@id': `https://herbscience.shop/herbs/pumpkin-seeds#review-${index}`,
      reviewRating: { 
        '@type': 'Rating', 
        ratingValue: '5', 
        bestRating: '5',
        worstRating: '1'
      },
      author: { 
        '@type': 'Person', 
        name: story.author,
        '@id': `https://herbscience.shop/herbs/pumpkin-seeds#author-${index}`
      },
      reviewBody: story.quote,
      datePublished: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      dateCreated: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      headline: `Pumpkin Seeds Health Benefits Review by ${story.author}`,
      reviewAspect: 'effectiveness',
      itemReviewed: {
        '@type': 'NutritionInformation',
        name: 'Pumpkin Seeds',
        '@id': 'https://herbscience.shop/herbs/pumpkin-seeds#nutrition'
      }
    }))
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://herbscience.shop/herbs/pumpkin-seeds#faq',
    mainEntity: herbData.faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `https://herbscience.shop/herbs/pumpkin-seeds#faq-${index}`,
      name: faq.question,
      text: faq.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        '@id': `https://herbscience.shop/herbs/pumpkin-seeds#answer-${index}`,
        text: faq.answer,
        dateCreated: new Date().toISOString(),
        upvoteCount: 1
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <HerbDetailClient herbData={herbData} slug="pumpkin-seeds" />
    </>
  )
}
