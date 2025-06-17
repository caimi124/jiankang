// 国际化配置文件
export type Locale = 'en' | 'zh'

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'zh']

// 语言配置
export const languages = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr'
  },
  zh: {
    name: '中文',
    flag: '🇨🇳',
    dir: 'ltr'
  }
} as const

// 检测浏览器语言
export function detectLocale(): Locale {
  if (typeof window !== 'undefined') {
    const browserLang = window.navigator.language.split('-')[0]
    return locales.includes(browserLang as Locale) ? (browserLang as Locale) : defaultLocale
  }
  return defaultLocale
}

// 格式化数字（本地化）
export function formatNumber(num: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US').format(num)
}

// 格式化日期（本地化）
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// 格式化相对时间
export function formatRelativeTime(date: Date, locale: Locale): string {
  const rtf = new Intl.RelativeTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    numeric: 'auto'
  })
  
  const now = new Date()
  const diffInDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (Math.abs(diffInDays) < 1) {
    const diffInHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60))
    return rtf.format(diffInHours, 'hour')
  }
  
  return rtf.format(diffInDays, 'day')
}

// URL 本地化处理
export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path
  }
  return `/${locale}${path}`
}

// 从 URL 中提取 locale
export function getLocaleFromPath(path: string): { locale: Locale; pathname: string } {
  const segments = path.split('/').filter(Boolean)
  const maybeLocale = segments[0]
  
  if (locales.includes(maybeLocale as Locale)) {
    return {
      locale: maybeLocale as Locale,
      pathname: '/' + segments.slice(1).join('/')
    }
  }
  
  return {
    locale: defaultLocale,
    pathname: path
  }
}

export interface TranslationKeys {
  nav: {
    home: string
    herbFinder: string
    safetyChecker: string
    knowledgeCenter: string
    constitutionTest: string
    userReviews: string
    blog: string
    about: string
    language: string
  }
  home: {
    title: string
    subtitle: string
    description: string
    findHerbs: string
    checkSafety: string
    heroStats: {
      herbs: string
      users: string
      research: string
      database: string
    }
    heroSubtitle: string
    sectionTitle: string
    sectionDescription: string
    ctaTitle: string
    ctaDescription: string
    ctaButton: string
  }
  herbFinder: {
    title: string
    description: string
    searchPlaceholder: string
    searchTitle: string
    popularSearches: string
    browseCategories: string
    noResultsTitle: string
    noResultsDescription: string
    tryNewSearch: string
    foundResults: string
    sortedBy: string
    viewDetails: string
    checkSafety: string
    traditionalUses: string
    safety: {
      high: string
      medium: string
      low: string
    }
    evidence: {
      strong: string
      moderate: string
      limited: string
    }
  }
  common: {
    loading: string
    search: string
    home: string
    tools: string
    learn: string
    community: string
    about: string
    contact: string
    privacy: string
  }
}

export const translations: Record<string, TranslationKeys> = {
  en: {
    nav: {
      home: 'Home',
      herbFinder: 'Herb Finder',
      safetyChecker: 'Safety Checker',
      knowledgeCenter: 'Knowledge Center',
      constitutionTest: 'Constitution Test',
      userReviews: 'User Reviews',
      blog: 'Blog',
      about: 'About',
      language: 'Language'
    },
    home: {
      title: 'Herbal Supplements,',
      subtitle: 'Demystified',
      description: 'Understand what you take. Discover what works. Make informed decisions about herbal supplements with science-backed insights and personalized recommendations.',
      findHerbs: 'Find Your Herbs',
      checkSafety: 'Check Safety',
      heroStats: {
        herbs: 'Herbs Analyzed',
        users: 'Users Helped',
        research: 'Research Citations',
        database: 'Updated Database'
      },
      heroSubtitle: 'Trusted by 50,000+ Users',
      sectionTitle: 'Everything You Need to Navigate Herbal Supplements',
      sectionDescription: 'From safety checking to personalized recommendations, our evidence-based tools guide you every step of the way.',
      ctaTitle: 'Not Sure Where to Start?',
      ctaDescription: 'Take our quick 2-minute assessment to get personalized recommendations based on your health goals and concerns.',
      ctaButton: 'Get Personalized Recommendations'
    },
    herbFinder: {
      title: 'Herb Finder',
      description: 'Enter your symptoms or health goals to discover herbs that might help. All recommendations are backed by traditional use and modern scientific research.',
      searchPlaceholder: 'Enter symptoms, health goals, or herb names...',
      searchTitle: 'What are you looking to address?',
      popularSearches: 'Popular searches:',
      browseCategories: 'Browse by Category',
      noResultsTitle: 'No herbs found',
      noResultsDescription: 'Try adjusting your search terms or browse our categories below.',
      tryNewSearch: 'Try New Search',
      foundResults: 'Found {count} herbs for you',
      sortedBy: 'Sorted by relevance',
      viewDetails: 'View Details',
      checkSafety: 'Check Safety',
      traditionalUses: 'Traditional uses:',
      safety: {
        high: 'high safety',
        medium: 'medium safety',
        low: 'low safety'
      },
      evidence: {
        strong: 'strong evidence',
        moderate: 'moderate evidence',
        limited: 'limited evidence'
      }
    },
    common: {
      loading: 'Loading...',
      search: 'Search',
      home: 'Home',
      tools: 'Tools',
      learn: 'Learn',
      community: 'Community',
      about: 'About Us',
      contact: 'Contact',
      privacy: 'Privacy Policy'
    }
  },
  zh: {
    nav: {
      home: '首页',
      herbFinder: '草药搜索器',
      safetyChecker: '安全检查器',
      knowledgeCenter: '知识中心',
      constitutionTest: '体质测试',
      userReviews: '用户评论',
      blog: '博客',
      about: '关于我们',
      language: '语言'
    },
    home: {
      title: '中草药补充剂，',
      subtitle: '专业解读',
      description: '了解您服用的草药。发现有效的方案。基于科学依据和个性化推荐，做出明智的中草药补充剂决策。',
      findHerbs: '查找草药',
      checkSafety: '安全检查',
      heroStats: {
        herbs: '已分析草药',
        users: '帮助用户',
        research: '研究引用',
        database: '数据库更新'
      },
      heroSubtitle: '50,000+ 用户信赖',
      sectionTitle: '您需要的所有中草药补充剂导航工具',
      sectionDescription: '从安全检查到个性化推荐，我们的循证工具为您提供全方位指导。',
      ctaTitle: '不知道从哪里开始？',
      ctaDescription: '参与我们的2分钟快速评估，根据您的健康目标和关注点获得个性化推荐。',
      ctaButton: '获取个性化推荐'
    },
    herbFinder: {
      title: '草药查找器',
      description: '输入您的症状或健康目标，发现可能有帮助的草药。所有推荐都基于传统使用和现代科学研究。',
      searchPlaceholder: '输入症状、健康目标或草药名称...',
      searchTitle: '您希望解决什么问题？',
      popularSearches: '热门搜索：',
      browseCategories: '按类别浏览',
      noResultsTitle: '未找到草药',
      noResultsDescription: '请尝试调整搜索词或浏览下面的类别。',
      tryNewSearch: '尝试新搜索',
      foundResults: '为您找到 {count} 种草药',
      sortedBy: '按相关性排序',
      viewDetails: '查看详情',
      checkSafety: '安全检查',
      traditionalUses: '传统用途：',
      safety: {
        high: '高安全性',
        medium: '中等安全性',
        low: '低安全性'
      },
      evidence: {
        strong: '强有力证据',
        moderate: '中等证据',
        limited: '有限证据'
      }
    },
    common: {
      loading: '加载中...',
      search: '搜索',
      home: '首页',
      tools: '工具',
      learn: '学习',
      community: '社区',
      about: '关于我们',
      contact: '联系我们',
      privacy: '隐私政策'
    }
  }
}

export const getTranslation = (language: string): TranslationKeys => {
  return translations[language] || translations.en
}

export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
] 