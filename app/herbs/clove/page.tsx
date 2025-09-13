import { Metadata } from 'next'
import HerbDetailClient from '../[slug]/HerbDetailClient'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Clove Benefits and Uses | HerbScience',
    description: 'Explore the benefits of clove (Syzygium aromaticum) for digestion, oral health, and inflammation. Learn about its active compounds, uses, and contraindications.',
    keywords: 'Clove benefits, Clove uses, Clove tea, Clove oil benefits, Clove for digestion, Clove for oral health',
  };
}

async function getCloveData() {
  return {
    id: 'clove',
    name: 'Clove',
    latin_name: 'Syzygium aromaticum',
    slug: 'clove',
    overview: 'Clove is a powerful aromatic spice with both culinary and medicinal uses. Native to Indonesia, clove buds have been valued for centuries to relieve digestive discomfort, freshen breath, ease tooth pain, and support men\'s reproductive health.',
    benefits: ['Oral health and dental care', 'Digestive support and nausea relief', 'Anti-inflammatory pain relief'],
    active_compounds: 'Eugenol, Tannins, Flavonoids, Volatile oils',
    traditional_uses: 'In Traditional Chinese Medicine, clove (Ding Xiang) is considered a warming herb that strengthens the spleen and kidneys, warms the middle burner, and stops nausea. It has been used to treat digestive weakness, impotence, and cold-related abdominal pain.',
    suitable_for: ['People with digestive issues', 'Dental problems', 'Cold constitution'],
    not_suitable_for: ['Acid reflux or stomach ulcers', 'Pregnancy', 'Children under 12 unless supervised'],
    dosage_forms: [
      { form: 'Whole cloves (tea)', dosage: '1-3 g/day', usage: 'Steep in hot water' },
      { form: 'Powder', dosage: '0.5-1 g/day', usage: 'Mix with food or water' },
      { form: 'Oil (external)', dosage: '1-2 diluted drops', usage: 'Apply topically' }
    ],
    safety_warnings: ['Not for acid reflux or stomach ulcers', 'Avoid during pregnancy', 'Not for children under 12 unless supervised'],
    interactions: ['May interact with blood thinning medications'],
    scientific_evidence: 'Modern research confirms clove\'s antimicrobial, analgesic, and anti-inflammatory properties. Studies show effectiveness for dental pain, digestive issues, and as a natural preservative with strong antioxidant activity.',
    constitution_match: [
      { type: 'Cold Constitution', suitable: 'yes' as const, description: 'Warming properties help cold conditions' },
      { type: 'Hot Constitution', suitable: 'warning' as const, description: 'Use with caution as it may aggravate heat symptoms' }
    ],
    pairs_well_with: ['Ginger', 'Cinnamon', 'Cardamom'],
    user_stories: [
      { quote: 'Clove oil helped my toothache immediately.', author: 'John D.', location: 'New York, USA' }
    ],
    faqs: [
      { 
        question: 'Is clove oil safe for toothache?', 
        answer: 'Yes, clove oil can be effective for toothache relief, but it must always be diluted with a carrier oil. Apply 1-2 drops mixed with coconut or olive oil directly to the affected tooth. Never use undiluted clove oil as it can cause irritation.' 
      },
      {
        question: 'What are the main health benefits of cloves?',
        answer: 'Cloves offer several health benefits including natural pain relief, antimicrobial properties for oral health, digestive support, anti-inflammatory effects, and antioxidant protection. They are particularly effective for dental pain and digestive issues.'
      },
      {
        question: 'How should I use cloves for digestive health?',
        answer: 'For digestive support, you can chew 1-2 whole cloves after meals, drink clove tea (steep 1-2 cloves in hot water for 10 minutes), or add ground cloves to your cooking. Start with small amounts as cloves are potent.'
      },
      {
        question: 'Are there any side effects of using cloves?',
        answer: 'Cloves are generally safe when used in culinary amounts. However, large doses may cause stomach upset, heartburn, or interact with blood-thinning medications. Avoid during pregnancy and don\'t give to children under 12 without supervision.'
      },
      {
        question: 'Can I use cloves if I have a hot constitution in TCM?',
        answer: 'People with hot constitution should use cloves cautiously as they are warming in nature and may aggravate heat symptoms. If you have hot constitution, use small amounts and monitor your body\'s response, or consult a TCM practitioner.'
      }
    ],
    seo_keywords: ['clove benefits', 'clove uses', 'clove tea', 'clove oil benefits'],
    evidence_level: 'Moderate' as const,
    category: 'Warming Herbs',
    properties: ['Warming', 'Antimicrobial', 'Analgesic', 'Anti-inflammatory']
  }
}

export default async function ClovePage() {
  const herbData = await getCloveData()
  
  // JSON-LD structured data for better SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Clove (Syzygium aromaticum): Benefits, Uses & Safety Guide',
    description: herbData.overview,
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
    datePublished: '2025-01-19',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntity: {
      '@type': 'Thing',
      '@id': 'https://herbscience.shop/herbs/clove#herb',
      name: 'Clove',
      alternateName: 'Syzygium aromaticum',
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
        }
      ]
    }
  }

  // FAQ structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://herbscience.shop/herbs/clove#faq',
    mainEntity: herbData.faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `https://herbscience.shop/herbs/clove#faq-${index}`,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        '@id': `https://herbscience.shop/herbs/clove#answer-${index}`,
        text: faq.answer
      }
    }))
  }

  // Breadcrumb structured data
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
        name: 'Clove Benefits',
        item: 'https://herbscience.shop/herbs/clove'
      }
    ]
  }

  return (
    <>
      {/* Structured data scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <HerbDetailClient herbData={herbData} slug="clove" />
    </>
  )
}
