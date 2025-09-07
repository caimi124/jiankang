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
    title: 'Pumpkin Seeds',
    chineseName: '南瓜子',
    latinName: 'Cucurbita pepo',
    description: 'Nutrient-packed edible seeds rich in zinc, magnesium, healthy fats, and antioxidants for prostate health, hormone balance, and anti-parasitic effects.',
    primaryEffects: ['Prostate Health (BPH)', 'Hair Loss Prevention', 'Menopause Support', 'Anti-Parasitic', 'Hormone Balance'],
    activeCompounds: ['Phytosterols (β-sitosterol)', 'Zinc', 'Magnesium', 'Tryptophan', 'Cucurbitin', 'Vitamin E & Selenium'],
    dosage: 'General health: 10-30 g daily. Parasite cleanse: 30-50 g daily × 7-10 days. Menopause/hair loss: 1 tbsp oil or 20-30 g seeds daily.',
    safetyLevel: 'high',
    contraindications: ['Avoid if allergic to seeds/nuts', 'Use caution with diuretics or blood pressure medication', 'People with weak digestion should eat in moderation', 'Not ideal for damp-heat constitutions in TCM'],
    traditionalUse: 'In Traditional Chinese Medicine, pumpkin seeds are warm and tonifying, suitable for people with fatigue, frequent urination, or hormonal imbalance. Used for Qi Deficiency, Kidney Yang Deficiency, and Blood Deficiency patterns.',
    modernApplications: 'Modern studies confirm effectiveness for prostate health, hair regrowth (40% improvement in 6 months), menopause relief, parasite treatment, and sleep quality improvement through its rich nutrient profile.',
    slug: 'pumpkin-seeds',
    seoTitle: '🌱 Pumpkin Seeds (Cucurbita pepo) – Benefits for Prostate, Hair, Hormones & Parasites | HerbScience',
    seoDescription: 'Evidence-based guide to pumpkin seeds for prostate health, hair loss, hormone balance, menopause, and parasite treatment. Safe, natural, effective.',
    seoKeywords: ['pumpkin seeds benefits', 'pumpkin seeds for prostate', 'pumpkin seeds hair loss', 'pumpkin seeds hormones', 'pumpkin seeds parasites', 'pumpkin seeds menopause']
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
      '@type': 'Drug',
      name: 'Pumpkin Seeds',
      alternateName: ['南瓜子', 'Cucurbita pepo', 'Pepitas'],
      description: herbData.description,
      activeIngredient: herbData.activeCompounds,
      dosageForm: ['Raw seeds', 'Oil', 'Powder', 'Extract'],
      indication: herbData.primaryEffects,
      mechanismOfAction: 'Phytosterols block 5-alpha-reductase, zinc supports hormone production, cucurbitin paralyzes intestinal worms, tryptophan converts to melatonin',
      clinicalPharmacology: 'Studies show 40% hair regrowth after 6 months, reduced urinary symptoms in BPH, fewer hot flashes in menopause, and effective parasite treatment'
    },
    datePublished: '2025-01-19',
    dateModified: new Date().toISOString().split('T')[0]
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can pumpkin seeds help with hair loss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, they block 5-alpha-reductase and support hormone balance, reducing thinning hair. Studies show 40% hair regrowth after 6 months of pumpkin seed extract.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I use pumpkin seeds for parasites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Take 30–50 g of ground raw seeds daily for about a week, ideally on an empty stomach. The cucurbitin paralyzes intestinal worms naturally.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are pumpkin seeds good for women in menopause?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. They reduce hot flashes, improve sleep, and support healthy cholesterol levels through phytosterols and essential fatty acids.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can kids eat pumpkin seeds for worms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, in small amounts. Mix ground seeds with honey or porridge for safe deworming. Use 1 tsp ground seeds for children.'
        }
      }
    ]
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
      
      <HerbDetailClient herbData={herbData} />
    </>
  )
}
