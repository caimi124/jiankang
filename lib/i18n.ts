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
    constitutionTest: string
    blog: string
    about: string
    language: string
  }
  home: {
    title: string
    subtitle: string
    description: string
    urgencyAlert: string
    painPointsTitle: string
    painPoints: {
      sleep: {
        title: string
        description: string
      }
      safety: {
        title: string
        description: string
      }
      guesswork: {
        title: string
        description: string
      }
    }
    painPointsFooter: string
    primaryCta: {
      title: string
      subtitle: string
    }
    secondaryCta: string
    trustIndicators: {
      safe: {
        title: string
        subtitle: string
      }
      evidenceBased: {
        title: string
        subtitle: string
      }
      users: {
        title: string
        subtitle: string
      }
      noSideEffects: {
        title: string
        subtitle: string
      }
    }
    healthGoalsSection: {
      title: string
      description: string
    }
    healthGoals: {
      sleep: {
        title: string
        description: string
        herbs: string[]
      }
      stress: {
        title: string
        description: string
        herbs: string[]
      }
      energy: {
        title: string
        description: string
        herbs: string[]
      }
      immunity: {
        title: string
        description: string
        herbs: string[]
      }
    }
    personalizedCta: {
      title: string
      description: string
      button: string
    }
    noSelectionCta: {
      title: string
      description: string
      button: string
    }
    userStoriesSection: {
      title: string
      description: string
    }
    userStories: {
      sarah: {
        name: string
        location: string
        herb: string
        condition: string
        result: string
        avatar: string
      }
      michael: {
        name: string
        location: string
        herb: string
        condition: string
        result: string
        avatar: string
      }
      jennifer: {
        name: string
        location: string
        herb: string
        condition: string
        result: string
        avatar: string
      }
    }
    successMetrics: {
      positiveResults: string
      timeToResults: string
      recommend: string
      activeUsers: string
    }
    communityJoin: string
    blogSection: {
      title: string
      description: string
    }
    featuredArticles: {
      sleep: {
        title: string
        excerpt: string
        category: string
        readTime: string
        icon: string
      }
      stress: {
        title: string
        excerpt: string
        category: string
        readTime: string
        icon: string
      }
      immunity: {
        title: string
        excerpt: string
        category: string
        readTime: string
        icon: string
      }
    }
    viewAllArticles: string
    finalCta: {
      title: string
      description: string
      button: string
    }
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
    recommendedFor: string
    getPersonalPlan: string
    readMore: string
  }
}

export const translations: Record<string, TranslationKeys> = {
  en: {
    nav: {
      home: 'Home',
      herbFinder: 'Herb Finder',
      constitutionTest: 'Constitution Test',
      blog: 'Blog',
      about: 'About',
      language: 'Language'
    },
    home: {
      title: 'Stop Guessing — Find Herbs That',
      subtitle: 'Actually Work for Your Body',
      description: 'Take our constitution test to get safe, evidence-based herbal recommendations tailored to your body type and health needs.',
      urgencyAlert: "Don't waste another month on herbs that don't work for YOUR body type!",
      painPointsTitle: 'Sound Familiar? You\'re Not Alone...',
      painPoints: {
        sleep: {
          title: '😴 Sleep Issues',
          description: '"Tried chamomile, valerian... nothing helps my insomnia"'
        },
        safety: {
          title: '🧪 Safety Concerns',
          description: '"Will this herb interact with my blood pressure meds?"'
        },
        guesswork: {
          title: '🤷 Guesswork',
          description: '"Every website says different things - what actually works?"'
        }
      },
      painPointsFooter: '👆 Stop wasting time and money on herbs that don\'t match your body!',
      primaryCta: {
        title: 'Get Your Personal Herb Plan',
        subtitle: 'Quick 3-minute test • Results instantly'
      },
      secondaryCta: 'Browse Herbs by Goal',
      trustIndicators: {
        safe: {
          title: 'Safe Herbal Use',
          subtitle: 'Drug interaction checks'
        },
        evidenceBased: {
          title: 'Evidence-Based',
          subtitle: 'Research-backed recommendations'
        },
        users: {
          title: '10K+ Users',
          subtitle: 'Trusted by thousands'
        },
        noSideEffects: {
          title: 'No Side Effects',
          subtitle: 'Natural, gentle solutions'
        }
      },
      healthGoalsSection: {
        title: 'Your Health Goals — Herbs That Help',
        description: 'Choose your main goal and discover targeted herbs with real results:'
      },
      healthGoals: {
        sleep: {
          title: 'Sleep Support Herbs',
          description: 'Sleep herb valerian, chamomile tea for better rest',
          herbs: ['Valerian Root', 'Chamomile Tea', 'Passionflower']
        },
        stress: {
          title: 'Stress Relief Herbs',
          description: 'Best herbs for stress and anxiety without side effects',
          herbs: ['Ashwagandha', 'Holy Basil', 'Lemon Balm']
        },
        energy: {
          title: 'Energy & Focus Herbs',
          description: 'Herbal teas for energy and focus, mental clarity',
          herbs: ['Ginseng', 'Rhodiola', 'Green Tea']
        },
        immunity: {
          title: 'Immune Boosting Herbs',
          description: 'Immune boosting herbs for flu season protection',
          herbs: ['Echinacea', 'Elderberry', 'Astragalus']
        }
      },
      personalizedCta: {
        title: 'Want Personalized Recommendations?',
        description: 'Take our TCM constitution assessment to get recommendations tailored to your unique body type.',
        button: '🧠 Take Constitution Test →'
      },
      noSelectionCta: {
        title: 'Get Personal Plan →',
        description: '',
        button: ''
      },
      userStoriesSection: {
        title: 'Real User Results',
        description: 'See how others found safe herbal solutions with our personalized herbal recommendations.'
      },
      userStories: {
        sarah: {
          name: 'Sarah M.',
          location: 'California, USA',
          herb: 'Sleep Herb Valerian',
          condition: 'Sleep Problems',
          result: 'Finally sleeping through the night after 2 weeks!',
          avatar: '👩‍💼'
        },
        michael: {
          name: 'Michael R.',
          location: 'London, UK',
          herb: 'Ginseng & Rhodiola',
          condition: 'Low Energy',
          result: 'Full of energy without caffeine crashes',
          avatar: '🏃‍♂️'
        },
        jennifer: {
          name: 'Dr. Jennifer L.',
          location: 'Toronto, Canada',
          herb: 'Stress Relief Herbs',
          condition: 'Work Stress',
          result: 'Calm mind and clear focus for workdays',
          avatar: '👩‍⚕️'
        }
      },
      successMetrics: {
        positiveResults: '89% Report Positive Results',
        timeToResults: '2-4 Weeks to See Benefits',
        recommend: '94% Would Recommend',
        activeUsers: '10K+ Active Users'
      },
      communityJoin: 'Join Our Community - Start Your Test →',
      blogSection: {
        title: 'Latest Herbal Guides',
        description: 'Stay safe and informed with science-backed herbal guides:'
      },
      featuredArticles: {
        sleep: {
          title: 'Best Herbs for Sleep Support: Natural Ways to Rest Better',
          excerpt: 'Sleep herb valerian, chamomile tea, and other natural ways to improve sleep quality.',
          category: 'Lifestyle',
          readTime: '8 min read',
          icon: '😴'
        },
        stress: {
          title: 'Stress Relief Herbs Without Side Effects',
          excerpt: 'Safe, natural herbs for stress management that work without harmful side effects.',
          category: 'Lifestyle',
          readTime: '7 min read',
          icon: '😌'
        },
        immunity: {
          title: 'Immune Boosting Herbs for Flu Season',
          excerpt: 'Strengthen your immune system naturally with proven herbs that protect against illness.',
          category: 'Science',
          readTime: '6 min read',
          icon: '🛡️'
        }
      },
      viewAllArticles: 'View All Articles →',
      finalCta: {
        title: 'Stop guessing. Start using the right herbs for your body.',
        description: 'Take our constitution test and get safe, evidence-based herbal guidance today.',
        button: 'Start My Test Now'
      }
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
      privacy: 'Privacy Policy',
      recommendedFor: 'Recommended for',
      getPersonalPlan: 'Get Personal Plan →',
      readMore: 'Read More →'
    }
  },
  zh: {
    nav: {
      home: '首页',
      herbFinder: '草药搜索器',
      constitutionTest: '体质测试',
      blog: '博客',
      about: '关于我们',
      language: '语言'
    },
    home: {
      title: '停止猜测——找到真正',
      subtitle: '适合您体质的草药',
      description: '通过我们的体质测试，获得根据您的体质类型和健康需求量身定制的安全、循证草药建议。',
      urgencyAlert: '不要再浪费一个月的时间在不适合您体质的草药上！',
      painPointsTitle: '听起来很熟悉？您并不孤单...',
      painPoints: {
        sleep: {
          title: '😴 睡眠问题',
          description: '"试过洋甘菊、缬草...但都无法帮助我的失眠"'
        },
        safety: {
          title: '🧪 安全担忧',
          description: '"这种草药会与我的降压药产生相互作用吗？"'
        },
        guesswork: {
          title: '🤷 盲目猜测',
          description: '"每个网站说的都不一样——什么真正有效？"'
        }
      },
      painPointsFooter: '👆 停止浪费时间和金钱在不适合您体质的草药上！',
      primaryCta: {
        title: '获取您的个人草药方案',
        subtitle: '3分钟快速测试 • 立即获得结果'
      },
      secondaryCta: '按目标浏览草药',
      trustIndicators: {
        safe: {
          title: '安全草药使用',
          subtitle: '药物相互作用检查'
        },
        evidenceBased: {
          title: '循证医学',
          subtitle: '研究支持的建议'
        },
        users: {
          title: '1万+ 用户',
          subtitle: '受到数千人信赖'
        },
        noSideEffects: {
          title: '无副作用',
          subtitle: '天然温和的解决方案'
        }
      },
      healthGoalsSection: {
        title: '您的健康目标——有效的草药',
        description: '选择您的主要目标，发现有真实效果的针对性草药：'
      },
      healthGoals: {
        sleep: {
          title: '助眠草药',
          description: '助眠草药缬草、洋甘菊茶改善休息',
          herbs: ['缬草根', '洋甘菊茶', '西番莲']
        },
        stress: {
          title: '缓解压力草药',
          description: '最佳抗压力和焦虑草药，无副作用',
          herbs: ['南非醉茄', '圣罗勒', '柠檬香蜂草']
        },
        energy: {
          title: '精力与专注草药',
          description: '提神益智的草药茶，增强精神清晰度',
          herbs: ['人参', '红景天', '绿茶']
        },
        immunity: {
          title: '增强免疫力草药',
          description: '流感季节的免疫增强草药',
          herbs: ['紫锥菊', '接骨木浆果', '黄芪']
        }
      },
      personalizedCta: {
        title: '想要个性化建议？',
        description: '参加我们的中医体质评估，获得针对您独特体质的定制建议。',
        button: '🧠 参加体质测试 →'
      },
      noSelectionCta: {
        title: '获取个人方案 →',
        description: '',
        button: ''
      },
      userStoriesSection: {
        title: '真实用户成果',
        description: '看看其他人如何通过我们的个性化草药建议找到安全的草药解决方案。'
      },
      userStories: {
        sarah: {
          name: '莎拉·M',
          location: '美国加利福尼亚',
          herb: '助眠草药缬草',
          condition: '睡眠问题',
          result: '两周后终于能一觉睡到天亮！',
          avatar: '👩‍💼'
        },
        michael: {
          name: '迈克尔·R',
          location: '英国伦敦',
          herb: '人参和红景天',
          condition: '精力不足',
          result: '精力充沛，不再有咖啡因崩溃',
          avatar: '🏃‍♂️'
        },
        jennifer: {
          name: '詹妮弗·L博士',
          location: '加拿大多伦多',
          herb: '缓解压力草药',
          condition: '工作压力',
          result: '工作日心境平和，思路清晰',
          avatar: '👩‍⚕️'
        }
      },
      successMetrics: {
        positiveResults: '89% 的用户报告积极效果',
        timeToResults: '2-4 周内看到效果',
        recommend: '94% 愿意推荐',
        activeUsers: '1万+ 活跃用户'
      },
      communityJoin: '加入我们的社区 - 开始您的测试 →',
      blogSection: {
        title: '最新草药指南',
        description: '通过科学支持的草药指南保持安全和知情：'
      },
      featuredArticles: {
        sleep: {
          title: '最佳助眠草药：改善睡眠的天然方法',
          excerpt: '助眠草药缬草、洋甘菊茶以及其他改善睡眠质量的天然方法。',
          category: '生活方式',
          readTime: '8分钟阅读',
          icon: '😴'
        },
        stress: {
          title: '无副作用的缓解压力草药',
          excerpt: '安全、天然的压力管理草药，有效且无害副作用。',
          category: '生活方式',
          readTime: '7分钟阅读',
          icon: '😌'
        },
        immunity: {
          title: '流感季节的免疫增强草药',
          excerpt: '用经过验证的草药自然增强您的免疫系统，预防疾病。',
          category: '科学',
          readTime: '6分钟阅读',
          icon: '🛡️'
        }
      },
      viewAllArticles: '查看所有文章 →',
      finalCta: {
        title: '停止猜测。开始使用适合您体质的正确草药。',
        description: '参加我们的体质测试，今天就获得安全、循证的草药指导。',
        button: '立即开始我的测试'
      }
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
      privacy: '隐私政策',
      recommendedFor: '推荐用于',
      getPersonalPlan: '获取个人方案 →',
      readMore: '阅读更多 →'
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