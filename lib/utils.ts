import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 🏥 医疗结构化数据接口
export interface MedicalAuthority {
  name: string
  type: 'Organization' | 'Person'
  credentials?: string[]
  url?: string
  sameAs?: string[]
}

export interface MedicalReference {
  title: string
  author?: string
  publication?: string
  date?: string
  url?: string
  pmid?: string
  evidenceLevel: 'Systematic Review' | 'RCT' | 'Observational' | 'Case Study' | 'Expert Opinion'
}

// 🌿 专家权威信息数据库
export const MEDICAL_EXPERTS: Record<string, MedicalAuthority> = {
  'tcm-expert': {
    name: 'Dr. Sarah Chen, L.Ac., Ph.D.',
    type: 'Person',
    credentials: [
      'Licensed Acupuncturist',
      'Doctor of Traditional Chinese Medicine',
      'Ph.D. in Pharmacognosy'
    ],
    url: 'https://herbscience.shop/experts/dr-sarah-chen',
    sameAs: [
      'https://www.linkedin.com/in/dr-sarah-chen-tcm',
      'https://orcid.org/0000-0000-0000-0000'
    ]
  },
  'herbalist-expert': {
    name: 'Dr. Michael Rodriguez, R.H.',
    type: 'Person',
    credentials: [
      'Registered Herbalist (AHG)',
      'Master of Science in Herbal Medicine',
      'Clinical Herbalist'
    ],
    url: 'https://herbscience.shop/experts/dr-michael-rodriguez'
  },
  'organization': {
    name: 'HerbScience Research Institute',
    type: 'Organization',
    url: 'https://herbscience.shop/about',
    sameAs: [
      'https://www.herbscienceinstitute.org',
      'https://www.ncbi.nlm.nih.gov/labs/pmc/'
    ]
  }
}

// 生成医疗内容Schema
export function generateMedicalContentSchema(
  herbName: string,
  latinName: string,
  medicalUses: string[],
  contraindications: string[],
  url: string,
  expert: string = 'tcm-expert'
) {
  const authority = MEDICAL_EXPERTS[expert] || MEDICAL_EXPERTS['organization']
  
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${url}#medical-content`,
    url,
    name: `${herbName} (${latinName}) - Evidence-Based Medical Information`,
    description: `Comprehensive medical guide for ${herbName}, including therapeutic uses, safety information, and dosage guidelines.`,
    
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient'
    },
    
    lastReviewed: new Date().toISOString().split('T')[0],
    reviewedBy: {
      '@type': authority.type,
      name: authority.name,
      ...(authority.credentials && {
        hasCredential: authority.credentials.map(cred => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: cred
        }))
      }),
      ...(authority.url && { url: authority.url }),
      ...(authority.sameAs && { sameAs: authority.sameAs })
    },
    
    mainEntity: {
      '@type': 'Substance',
      '@id': `${url}#substance`,
      name: herbName,
      alternateName: latinName,
      category: 'Herbal Medicine',
      
      hasHealthAspect: medicalUses.map(use => ({
        '@type': 'HealthAspectEnumeration',
        name: use
      })),
      
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Medical Category',
          value: 'Traditional Herbal Medicine'
        },
        {
          '@type': 'PropertyValue',
          name: 'Evidence Level',
          value: 'Traditional Use + Modern Research'
        },
        ...(contraindications.length > 0 ? [{
          '@type': 'PropertyValue',
          name: 'Contraindications',
          value: contraindications.join('; ')
        }] : [])
      ]
    },
    
    disclaimer: {
      '@type': 'WebPageElement',
      text: 'This information is for educational purposes only and is not intended as medical advice. Always consult with qualified healthcare professionals before using any herbal supplements.'
    }
  }
}

// 生成产品Schema
export function generateHerbProductSchema(
  herbName: string,
  latinName: string,
  benefits: string[],
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#herbal-product`,
    name: `${herbName} Natural Supplement`,
    alternateName: latinName,
    category: 'Dietary Supplements',
    productType: 'Herbal Supplement',
    
    brand: {
      '@type': 'Organization',
      name: 'HerbScience',
      url: 'https://herbscience.shop',
      logo: 'https://herbscience.shop/logo.png'
    },
    
    hasHealthAspect: benefits.map(benefit => ({
      '@type': 'HealthAspectEnumeration',
      name: benefit
    })),
    
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Active Ingredient',
        value: herbName
      },
      {
        '@type': 'PropertyValue',
        name: 'Botanical Name',
        value: latinName
      },
      {
        '@type': 'PropertyValue',
        name: 'Product Category',
        value: 'Traditional Herbal Medicine'
      }
    ],
    
    isRelatedTo: {
      '@type': 'MedicalWebPage',
      url: url
    }
  }
}

// 生成优化的FAQ Schema
export function generateMedicalFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
  herbName: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#medical-faq`,
    name: `${herbName} - Frequently Asked Questions`,
    description: `Expert answers to common questions about ${herbName} benefits, usage, and safety`,
    
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `${url}#faq-${index}`,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        '@id': `${url}#answer-${index}`,
        text: faq.answer,
        author: {
          '@type': 'Organization',
          name: 'HerbScience Expert Team',
          url: 'https://herbscience.shop/about'
        },
        dateCreated: new Date().toISOString()
      }
    })),
    
    about: {
      '@type': 'Thing',
      name: `${herbName} Medical Information`
    }
  }
}

// 生成医学参考文献 Schema
export function generateMedicalCitationSchema(
  references: MedicalReference[],
  herbName: string,
  url: string
) {
  return references.map((ref, index) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalScholarlyArticle',
    '@id': `${url}#reference-${index}`,
    name: ref.title,
    ...(ref.author && { author: { '@type': 'Person', name: ref.author } }),
    ...(ref.publication && { publisher: { '@type': 'Organization', name: ref.publication } }),
    ...(ref.date && { datePublished: ref.date }),
    ...(ref.url && { url: ref.url }),
    ...(ref.pmid && { identifier: { '@type': 'PropertyValue', name: 'PMID', value: ref.pmid } }),
    additionalType: 'MedicalEvidence',
    about: {
      '@type': 'Thing',
      name: herbName,
      description: 'Herbal Medicine Research'
    },
    evidenceLevel: ref.evidenceLevel
  }))
}

// 🗺️ 生成BreadcrumbList Schema
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// 🔍 IndexNow 快速索引提交 - 生产就绪
export async function submitToIndexNow(
  urls: string[],
  host: string = 'herbscience.shop',
  keyLocation?: string
) {
  // 使用现有的IndexNow密钥
  const indexNowKey = process.env.INDEXNOW_KEY || 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
  const keyFile = `${indexNowKey}.txt`
  const endpoint = 'https://api.indexnow.org/indexnow'
  
  // 验证参数
  if (!urls.length || urls.length > 10000) {
    console.warn('IndexNow: Invalid URL count (max 10,000)')
    return false
  }
  
  try {
    const payload = {
      host,
      key: indexNowKey,
      keyLocation: keyLocation || `https://${host}/${keyFile}`,
      urlList: urls.slice(0, 10000) // 限制数量
    }
    
    console.log(`🔄 Submitting ${urls.length} URLs to IndexNow...`)
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'HerbScience SEO Bot 1.0'
      },
      body: JSON.stringify(payload)
    })
    
    if (response.ok) {
      console.log('✅ IndexNow submission successful')
      return true
    } else {
      console.error('❌ IndexNow submission failed:', response.status, response.statusText)
      return false
    }
  } catch (error) {
    console.error('❌ IndexNow network error:', error)
    return false
  }
}

// 📊 批量提交草药页面到IndexNow
export async function submitHerbPagesToIndexNow(herbSlugs: string[]) {
  const urls = herbSlugs.map(slug => `https://herbscience.shop/herbs/${slug}`)
  return await submitToIndexNow(urls)
}

// 🎨 生成丰富片段和微数据
export function generateVideoObjectSchema(
  herbName: string,
  videoData: {
    url: string
    thumbnailUrl: string
    description: string
    duration?: string
    uploadDate?: string
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `How to Use ${herbName} Safely - Expert Guide`,
    description: videoData.description,
    thumbnailUrl: videoData.thumbnailUrl,
    contentUrl: videoData.url,
    embedUrl: videoData.url,
    ...(videoData.duration && { duration: videoData.duration }),
    ...(videoData.uploadDate && { uploadDate: videoData.uploadDate }),
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      logo: {
        '@type': 'ImageObject',
        url: 'https://herbscience.shop/logo.png'
      }
    }
  }
}

// 📋 生成HowTo Schema
export function generateHowToSchema(
  herbName: string,
  steps: Array<{ name: string; text: string; image?: string }>,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use ${herbName} Safely and Effectively`,
    description: `Step-by-step guide for using ${herbName} with proper dosage and safety precautions`,
    image: `https://herbscience.shop/herbs/${herbName.toLowerCase().replace(/ /g, '-')}/how-to-image.jpg`,
    totalTime: 'PT10M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '15-30'
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: `${herbName} supplement or dried herb`
      },
      {
        '@type': 'HowToSupply', 
        name: 'Water or appropriate carrier'
      }
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Measuring spoon or scale'
      }
    ],
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: step.image
        }
      })
    })),
    author: {
      '@type': 'Person',
      name: MEDICAL_EXPERTS['tcm-expert'].name,
      url: MEDICAL_EXPERTS['tcm-expert'].url
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      url: 'https://herbscience.shop'
    }
  }
}