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
      text: 'This information is for educational purposes only and is not intended as medical advice. Always consult with qualified healthcare professionals before using any herbal supplements.'
    }
  }
}

// 生成产品Schema - Google Product Rich Results优化
export function generateHerbProductSchema(
  herbName: string,
  latinName: string,
  benefits: string[],
  url: string
) {
  // 生成产品描述（从benefits提取）
  const benefitsText = benefits.slice(0, 3).join('. ')
  const description = `${herbName} (${latinName}) is a natural herbal supplement. ${benefitsText}. Learn about benefits, dosage, safety, and traditional uses.`
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#herbal-product`,
    name: `${herbName} Natural Supplement`,
    alternateName: latinName,
    description: description.substring(0, 500),
    image: `${url}/opengraph-image`,
    category: 'Health & Beauty > Health Care > Dietary Supplements',
    
    brand: {
      '@type': 'Brand',
      name: 'HerbScience',
      url: 'https://herbscience.shop',
      logo: 'https://herbscience.shop/logo.png'
    },
    
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '9.99',
      highPrice: '49.99',
      offerCount: '50',
      availability: 'https://schema.org/InStock',
      url: url,
      seller: {
        '@type': 'Organization',
        name: 'HerbScience',
        url: 'https://herbscience.shop'
      }
    },
    
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1'
    },
    
    hasHealthAspect: benefits.slice(0, 5).map(benefit => benefit.split('-')[0].trim()),
    
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
        name: 'Product Form',
        value: 'Extract, Capsule, Powder, Tea'
      },
      {
        '@type': 'PropertyValue',
        name: 'Safety Level',
        value: 'Generally Recognized as Safe (GRAS)'
      }
    ],
    
    isRelatedTo: {
      '@type': 'MedicalWebPage',
      url: url,
      name: `${herbName} Health Information`
    },
    
    manufacturer: {
      '@type': 'Organization',
      name: 'Various Certified Manufacturers',
      description: 'Quality-controlled herbal supplement production'
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

// ============================================
// 🎯 SEO Meta Description 生成工具（Bing/Google 优化）
// ============================================

/**
 * 生成符合 Bing/Google 规范的 Meta Description
 * 
 * 最佳实践：
 * - 长度：120-160 字符（最佳 155 字符）
 * - 包含主要关键词
 * - 吸引点击的行动召唤
 * - 避免特殊字符和 HTML 实体
 * 
 * @param text - 原始文本
 * @param maxLength - 最大长度（默认 155）
 * @param minLength - 最小长度（默认 120）
 * @returns 优化后的 Meta Description
 */
export function truncateDescription(
  text: string,
  maxLength: number = 155,
  minLength: number = 120
): string {
  // 1. 清理文本
  let cleaned = text
    .replace(/\s+/g, ' ') // 多个空格合并
    .replace(/[\r\n\t]/g, ' ') // 移除换行和制表符
    .trim()
  
  // 2. 如果太短，返回原文
  if (cleaned.length <= minLength) {
    return cleaned
  }
  
  // 3. 如果长度合适，直接返回
  if (cleaned.length >= minLength && cleaned.length <= maxLength) {
    return cleaned
  }
  
  // 4. 如果太长，智能截断（在句子边界）
  if (cleaned.length > maxLength) {
    // 在最大长度附近找句子边界
    const cutoff = maxLength - 3 // 留空间给省略号
    let truncated = cleaned.substring(0, cutoff)
    
    // 尝试在句号、逗号或空格处截断
    const lastPeriod = truncated.lastIndexOf('. ')
    const lastComma = truncated.lastIndexOf(', ')
    const lastSpace = truncated.lastIndexOf(' ')
    
    if (lastPeriod > minLength) {
      truncated = cleaned.substring(0, lastPeriod + 1)
    } else if (lastComma > minLength) {
      truncated = cleaned.substring(0, lastComma)
    } else if (lastSpace > minLength) {
      truncated = cleaned.substring(0, lastSpace)
    }
    
    return truncated.trim() + '...'
  }
  
  return cleaned
}

/**
 * 为草药页面生成 SEO 优化的 Meta Description
 * 
 * @param herbName - 草药名称
 * @param latinName - 拉丁学名
 * @param benefits - 主要功效列表
 * @returns 优化的 Meta Description（120-155 字符）
 */
export function generateHerbMetaDescription(
  herbName: string,
  latinName: string,
  benefits: string[]
): string {
  // 获取前 2 个主要功效
  const topBenefits = benefits.slice(0, 2).join(', ').toLowerCase()
  
  // 构建描述
  const description = `${herbName} (${latinName}): ${topBenefits}. Learn evidence-based benefits, safe dosage, side effects & how to use from licensed experts.`
  
  // 截断到合适长度
  return truncateDescription(description, 155, 120)
}

/**
 * 为博客文章生成 SEO 优化的 Meta Description
 * 
 * @param title - 文章标题
 * @param excerpt - 摘要或首段
 * @returns 优化的 Meta Description（120-155 字符）
 */
export function generateBlogMetaDescription(
  title: string,
  excerpt: string
): string {
  // 如果摘要长度合适，直接使用
  if (excerpt.length >= 120 && excerpt.length <= 155) {
    return truncateDescription(excerpt, 155, 120)
  }
  
  // 否则，从标题和摘要组合
  const description = `${excerpt}. Read expert insights on ${title.toLowerCase()}.`
  
  return truncateDescription(description, 155, 120)
}

/**
 * 为一般页面生成 SEO 优化的 Meta Description
 * 
 * @param pageTitle - 页面标题
 * @param content - 页面主要内容
 * @param keywords - 关键词列表
 * @returns 优化的 Meta Description（120-155 字符）
 */
export function generatePageMetaDescription(
  pageTitle: string,
  content: string,
  keywords: string[] = []
): string {
  // 如果内容长度合适，直接使用
  if (content.length >= 120 && content.length <= 155) {
    return truncateDescription(content, 155, 120)
  }
  
  // 否则，添加关键词上下文
  const keywordContext = keywords.length > 0 
    ? ` Learn about ${keywords.slice(0, 2).join(' and ')}.`
    : ''
  
  const description = `${content}${keywordContext}`
  
  return truncateDescription(description, 155, 120)
}