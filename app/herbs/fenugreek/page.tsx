import { Metadata } from 'next'
import FenugreekClient from './FenugreekClient'
import { FENUGREEK_DETAIL } from '@/lib/herb-detail-fenugreek'
import { 
  generateMedicalContentSchema, 
  generateHerbProductSchema, 
  generateMedicalFAQSchema,
  generateHerbMetaDescription
} from '@/lib/utils'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

// ===== SEO优化的Metadata（基于KGR数据） =====
export const metadata: Metadata = {
  title: 'Fenugreek Benefits for Men & Women: Testosterone, Lactation & Blood Sugar | HerbScience',
  description: 'Discover fenugreek benefits for testosterone boosting (men), breastfeeding milk supply (women), blood sugar control, and weight loss. Science-backed dosage guide + TCM body type matching. 600+ studies reviewed.',
  
  keywords: [
    // 最佳KGR关键词 (<0.25)
    'advantage of fenugreek',
    'benefits of fenugreek for males',
    'benefits of fenugreek seeds for men',
    'fenugreek benefits for females',
    'fenugreek benefits for women',
    'fenugreek dosage for testosterone',
    
    // 高价值关键词
    'fenugreek benefits',
    'fenugreek benefits for men',
    'fenugreek testosterone',
    'fenugreek for breastfeeding',
    'fenugreek milk supply',
    'fenugreek for blood sugar',
    'fenugreek weight loss',
    'fenugreek hair growth',
    'fenugreek dosage',
    'fenugreek side effects',
    'fenugreek how to use',
    
    // 中医关键词
    'fenugreek TCM',
    'fenugreek body type',
    'fenugreek yang deficiency',
    'trigonella foenum-graecum'
  ].join(', '),
  
  authors: [{ name: 'HerbScience Team' }, { name: 'Zeng Chuping, Licensed Pharmacist & TCM Expert' }],
  
  openGraph: {
    title: 'Fenugreek: Complete Guide for Men, Women & Blood Sugar Control',
    description: 'Evidence-based fenugreek guide: testosterone support for men, lactation boost for women, blood sugar regulation, weight loss. Find your ideal dosage based on TCM body type.',
    type: 'article',
    url: 'https://herbscience.shop/herbs/fenugreek',
    siteName: 'HerbScience',
    images: [
      {
        url: 'https://herbscience.shop/herbs/fenugreek/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Fenugreek Benefits for Men, Women & Blood Sugar Control'
      }
    ],
    locale: 'en_US'
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Fenugreek: Testosterone, Lactation & Blood Sugar Benefits',
    description: 'Science-backed guide to fenugreek for men\'s health, breastfeeding, blood sugar control. Personalized dosage by TCM body type.',
    images: ['https://herbscience.shop/herbs/fenugreek/opengraph-image']
  },
  
  alternates: {
    canonical: 'https://herbscience.shop/herbs/fenugreek',
    languages: {
      'en': 'https://herbscience.shop/herbs/fenugreek',
      'x-default': 'https://herbscience.shop/herbs/fenugreek',
    },
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  other: {
    'article:published_time': '2024-11-29T00:00:00Z',
    'article:modified_time': new Date().toISOString(),
    'article:author': 'Zeng Chuping',
    'article:section': 'Natural Health',
    'article:tag': 'fenugreek, testosterone, lactation, blood sugar, TCM',
  }
}

export default function FenugreekPage() {
  const herbUrl = 'https://herbscience.shop/herbs/fenugreek'
  
  // ===== 医疗内容Schema（E-A-T优化） =====
  const medicalContentSchema = generateMedicalContentSchema(
    FENUGREEK_DETAIL.name,
    FENUGREEK_DETAIL.latin_name,
    FENUGREEK_DETAIL.benefits,
    FENUGREEK_DETAIL.safety_warnings,
    herbUrl,
    'tcm-expert'
  )
  
  // ===== 产品Schema =====
  const productSchema = generateHerbProductSchema(
    FENUGREEK_DETAIL.name,
    FENUGREEK_DETAIL.latin_name,
    FENUGREEK_DETAIL.benefits,
    herbUrl
  )
  
  // ===== FAQ Schema =====
  const faqSchema = generateMedicalFAQSchema(
    FENUGREEK_DETAIL.faqs,
    FENUGREEK_DETAIL.name,
    herbUrl
  )
  
  // ===== Breadcrumb Schema =====
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${herbUrl}#breadcrumb`,
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
        name: 'Herb Database', 
        item: 'https://herbscience.shop/herb-finder'
      },
      { 
        '@type': 'ListItem', 
        position: 3, 
        name: 'Fenugreek', 
        item: herbUrl
      }
    ]
  }
  
  // ===== HowTo Schema（如何使用Fenugreek） =====
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use Fenugreek for Maximum Benefits',
    description: 'Step-by-step guide to using fenugreek for testosterone, lactation, blood sugar control, and weight loss',
    image: 'https://herbscience.shop/herbs/fenugreek/opengraph-image',
    totalTime: 'PT10M',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Determine Your Health Goal',
        text: 'Identify if you want testosterone support (men), lactation boost (women), blood sugar control, or weight loss. Each goal requires different dosages.',
        position: 1
      },
      {
        '@type': 'HowToStep',
        name: 'Choose the Right Form',
        text: 'For testosterone: 600mg extract capsules daily. For lactation: 900mg three times daily (2,700mg total). For blood sugar: 15-25g seeds or 300mg extract before meals.',
        position: 2
      },
      {
        '@type': 'HowToStep',
        name: 'Check Your TCM Body Type',
        text: 'Fenugreek is best for Yang Deficiency (cold type). Not suitable for Yin Deficiency (heat type) or Damp-Heat conditions. Take our free Constitution Test.',
        position: 3
      },
      {
        '@type': 'HowToStep',
        name: 'Start with Lower Dose',
        text: 'Begin with 300mg extract or 5g seeds daily to assess tolerance. Gradually increase to therapeutic dose over 3-5 days.',
        position: 4
      },
      {
        '@type': 'HowToStep',
        name: 'Take with Meals',
        text: 'Take fenugreek with meals to enhance absorption and reduce digestive upset. For blood sugar control, take 15-30 minutes before meals.',
        position: 5
      },
      {
        '@type': 'HowToStep',
        name: 'Monitor Results',
        text: 'Lactation: 24-72 hours. Testosterone: 2-4 weeks. Blood sugar: 1-2 weeks. Hair growth: 2-3 months. Track progress and adjust dosage if needed.',
        position: 6
      }
    ]
  }
  
  // ===== Video Object Schema（未来可添加视频内容） =====
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Fenugreek Benefits: Complete Guide for Men & Women',
    description: 'Learn how fenugreek boosts testosterone, increases milk supply, regulates blood sugar, and promotes weight loss',
    thumbnailUrl: 'https://herbscience.shop/herbs/fenugreek/opengraph-image',
    uploadDate: '2024-11-29T00:00:00Z',
    duration: 'PT8M30S',
    contentUrl: 'https://herbscience.shop/herbs/fenugreek#video',
    embedUrl: 'https://herbscience.shop/herbs/fenugreek#video'
  }

  return (
    <>
      {/* ===== 结构化数据 ===== */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalContentSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} 
      />
      
      {/* 客户端组件 - 使用Fenugreek专用组件 */}
      <FenugreekClient herbData={FENUGREEK_DETAIL} />
    </>
  )
}
