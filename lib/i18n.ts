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