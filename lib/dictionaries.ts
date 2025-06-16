import type { Locale } from './i18n'

// 翻译接口定义
interface Dictionary {
  // 导航
  nav: {
    home: string
    herbFinder: string
    safetyChecker: string
    knowledgeCenter: string
    constitutionTest: string
    userReviews: string
    blog: string
    about: string
    contact: string
    skipToContent: string
  }
  
  // 首页
  home: {
    title: string
    subtitle: string
    heroTitle: string
    heroSubtitle: string
    heroDescription: string
    findYourHerbs: string
    checkSafety: string
    trustedBy: string
    users: string
    // 统计数据
    stats: {
      herbsAnalyzed: string
      usersHelped: string
      researchCitations: string
      updatedDatabase: string
    }
    // 功能介绍
    features: {
      title: string
      description: string
      symptomFinder: {
        title: string
        description: string
        cta: string
      }
      safetyChecker: {
        title: string
        description: string
        cta: string
      }
      knowledgeBase: {
        title: string
        description: string
        cta: string
      }
      constitutionQuiz: {
        title: string
        description: string
        cta: string
      }
    }
    // 用户推荐
    testimonials: {
      title: string
      subtitle: string
      sarah: {
        name: string
        role: string
        content: string
      }
      david: {
        name: string
        role: string
        content: string
      }
      maria: {
        name: string
        role: string
        content: string
      }
    }
    // Newsletter
    newsletter: {
      title: string
      description: string
      benefits: {
        assessment: string
        recommendations: string
        updates: string
      }
      placeholder: string
      buttonText: string
      privacy: string
      socialProof: {
        subscribers: string
        rating: string
        helpful: string
      }
    }
  }
  
  // 通用
  common: {
    loading: string
    error: string
    tryAgain: string
    learnMore: string
    getStarted: string
    readMore: string
    viewAll: string
    backToTop: string
    // 可访问性
    accessibility: {
      openMenu: string
      closeMenu: string
      menuExpanded: string
      menuCollapsed: string
      imageNotAvailable: string
      loading: string
    }
  }
  
  // 表单
  forms: {
    email: string
    search: string
    submit: string
    cancel: string
    required: string
    optional: string
    searchPlaceholder: string
  }
  
  // 错误和成功信息
  messages: {
    success: string
    error: string
    networkError: string
    validationError: string
    subscribeSuccess: string
    subscribeError: string
  }
  
  // Footer
  footer: {
    company: string
    description: string
    tools: string
    resources: string
    legal: string
    copyright: string
    disclaimer: string
  }
}

// 英文翻译
const en: Dictionary = {
  nav: {
    home: 'Home',
    herbFinder: 'Herb Finder',
    safetyChecker: 'Safety Checker',
    knowledgeCenter: 'Knowledge Center',
    constitutionTest: 'Constitution Test',
    userReviews: 'User Reviews',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    skipToContent: 'Skip to main content'
  },
  
  home: {
    title: 'HerbScience.shop - Evidence-Based Herbal Supplement Guidance',
    subtitle: 'Discover safe and effective herbal supplements with science-backed insights',
    heroTitle: 'Herbal Supplements, Demystified',
    heroSubtitle: 'Trusted by 50,000+ Users',
    heroDescription: 'Understand what you take. Discover what works. Make informed decisions about herbal supplements with science-backed insights and personalized recommendations.',
    findYourHerbs: '🔍 Find Your Herbs',
    checkSafety: '🛡️ Check Safety',
    trustedBy: 'Trusted by',
    users: 'users',
    
    stats: {
      herbsAnalyzed: 'Herbs Analyzed',
      usersHelped: 'Users Helped',
      researchCitations: 'Research Citations',
      updatedDatabase: 'Updated Database'
    },
    
    features: {
      title: 'Everything You Need to Navigate Herbal Supplements',
      description: 'From safety checking to personalized recommendations, our evidence-based tools guide you every step of the way.',
      symptomFinder: {
        title: 'Symptom-Based Finder',
        description: 'Enter your symptoms and discover which herbs might help, backed by traditional use and modern research.',
        cta: 'Try it now'
      },
      safetyChecker: {
        title: 'Safety Checker',
        description: 'Upload your supplement label and get detailed safety analysis of each ingredient and potential interactions.',
        cta: 'Check safety'
      },
      knowledgeBase: {
        title: 'Knowledge Base',
        description: 'Browse comprehensive guides on herbs, research studies, and traditional medicine principles.',
        cta: 'Explore now'
      },
      constitutionQuiz: {
        title: 'Body Constitution Quiz',
        description: 'Discover your unique body type through Traditional Chinese Medicine assessment for personalized recommendations.',
        cta: 'Take quiz'
      }
    },
    
    testimonials: {
      title: 'What Our Users Say',
      subtitle: 'Real stories from people who\'ve transformed their herbal supplement journey',
      sarah: {
        name: 'Sarah M.',
        role: 'Wellness Enthusiast',
        content: 'Finally found a reliable source for herbal information. The safety checker saved me from a potentially dangerous interaction!'
      },
      david: {
        name: 'David L.',
        role: 'Chronic Pain Sufferer',
        content: 'The symptom-based finder helped me discover turmeric and boswellia. My joint pain has improved significantly.'
      },
      maria: {
        name: 'Maria J.',
        role: 'Anxiety Management',
        content: 'The constitution quiz revealed I\'m a \'heat\' type. The cooling herbs recommended work perfectly for my anxiety.'
      }
    },
    
    newsletter: {
      title: 'Get Your Free Herbal Guide',
      description: 'Download our comprehensive "Traditional Chinese Medicine Body Constitution Guide" and weekly evidence-based herbal insights.',
      benefits: {
        assessment: 'TCM Constitution Assessment',
        recommendations: 'Personalized Herb Recommendations',
        updates: 'Weekly Research Updates'
      },
      placeholder: 'Enter your email address',
      buttonText: 'Get Free Guide',
      privacy: 'No spam. Unsubscribe anytime. 📧 Join 15,000+ herb enthusiasts.',
      socialProof: {
        subscribers: '15,000+ subscribers',
        rating: '4.9/5 rating',
        helpful: '98% find it helpful'
      }
    }
  },
  
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    tryAgain: 'Try again',
    learnMore: 'Learn more',
    getStarted: 'Get started',
    readMore: 'Read more',
    viewAll: 'View all',
    backToTop: 'Back to top',
    accessibility: {
      openMenu: 'Open main menu',
      closeMenu: 'Close main menu',
      menuExpanded: 'Menu expanded',
      menuCollapsed: 'Menu collapsed',
      imageNotAvailable: 'Image not available',
      loading: 'Loading content'
    }
  },
  
  forms: {
    email: 'Email',
    search: 'Search',
    submit: 'Submit',
    cancel: 'Cancel',
    required: 'Required',
    optional: 'Optional',
    searchPlaceholder: 'Search herbs, symptoms, or get safety information...'
  },
  
  messages: {
    success: 'Success!',
    error: 'An error occurred',
    networkError: 'Network connection error',
    validationError: 'Please check your input',
    subscribeSuccess: 'Successfully subscribed to newsletter!',
    subscribeError: 'Failed to subscribe. Please try again.'
  },
  
  footer: {
    company: 'HerbScience.shop',
    description: 'Evidence-based herbal supplement information for informed health decisions.',
    tools: 'Tools',
    resources: 'Resources',
    legal: 'Company',
    copyright: '© 2025 HerbScience.shop - All Rights Reserved',
    disclaimer: 'This website provides educational information only and is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before starting any herbal supplement regimen.'
  }
}

// 中文翻译
const zh: Dictionary = {
  nav: {
    home: '首页',
    herbFinder: '草药查找',
    safetyChecker: '安全检查',
    knowledgeCenter: '知识中心',
    constitutionTest: '体质测试',
    userReviews: '用户评价',
    blog: '博客',
    about: '关于我们',
    contact: '联系我们',
    skipToContent: '跳转到主要内容'
  },
  
  home: {
    title: 'HerbScience.shop - 基于科学证据的草药补充剂指导',
    subtitle: '通过科学支持的见解发现安全有效的草药补充剂',
    heroTitle: '草药补充剂，科学解读',
    heroSubtitle: '50,000+ 用户信赖',
    heroDescription: '了解你所服用的草药。发现真正有效的产品。通过科学支持的见解和个性化建议，做出明智的草药补充剂决策。',
    findYourHerbs: '🔍 查找草药',
    checkSafety: '🛡️ 安全检查',
    trustedBy: '受到信赖',
    users: '用户',
    
    stats: {
      herbsAnalyzed: '草药分析',
      usersHelped: '用户帮助',
      researchCitations: '研究引用',
      updatedDatabase: '更新数据库'
    },
    
    features: {
      title: '导航草药补充剂所需的一切',
      description: '从安全检查到个性化推荐，我们基于证据的工具在每一步都为您提供指导。',
      symptomFinder: {
        title: '症状查找器',
        description: '输入您的症状，发现可能有帮助的草药，基于传统使用和现代研究支持。',
        cta: '立即尝试'
      },
      safetyChecker: {
        title: '安全检查器',
        description: '上传您的补充剂标签，获取每种成分的详细安全分析和潜在相互作用。',
        cta: '检查安全性'
      },
      knowledgeBase: {
        title: '知识库',
        description: '浏览关于草药、研究研究和传统医学原理的综合指南。',
        cta: '立即探索'
      },
      constitutionQuiz: {
        title: '体质测试',
        description: '通过中医体质评估发现您独特的体质类型，获得个性化建议。',
        cta: '开始测试'
      }
    },
    
    testimonials: {
      title: '用户反馈',
      subtitle: '来自用户的真实故事，他们已经改变了自己的草药补充剂之旅',
      sarah: {
        name: '莎拉 M.',
        role: '健康爱好者',
        content: '终于找到了可靠的草药信息来源。安全检查器让我避免了潜在的危险相互作用！'
      },
      david: {
        name: '大卫 L.',
        role: '慢性疼痛患者',
        content: '症状查找器帮助我发现了姜黄和乳香。我的关节疼痛有了显著改善。'
      },
      maria: {
        name: '玛丽亚 J.',
        role: '焦虑管理',
        content: '体质测试显示我是"热性"体质。推荐的凉性草药对我的焦虑很有效。'
      }
    },
    
    newsletter: {
      title: '获取免费草药指南',
      description: '下载我们的综合"中医体质指南"和每周基于证据的草药见解。',
      benefits: {
        assessment: '中医体质评估',
        recommendations: '个性化草药推荐',
        updates: '每周研究更新'
      },
      placeholder: '输入您的邮箱地址',
      buttonText: '获取免费指南',
      privacy: '无垃圾邮件。随时取消订阅。📧 加入15,000+草药爱好者。',
      socialProof: {
        subscribers: '15,000+ 订阅者',
        rating: '4.9/5 评分',
        helpful: '98% 认为有帮助'
      }
    }
  },
  
  common: {
    loading: '加载中...',
    error: '出现了错误',
    tryAgain: '重试',
    learnMore: '了解更多',
    getStarted: '开始使用',
    readMore: '阅读更多',
    viewAll: '查看全部',
    backToTop: '返回顶部',
    accessibility: {
      openMenu: '打开主菜单',
      closeMenu: '关闭主菜单',
      menuExpanded: '菜单已展开',
      menuCollapsed: '菜单已收缩',
      imageNotAvailable: '图片不可用',
      loading: '正在加载内容'
    }
  },
  
  forms: {
    email: '邮箱',
    search: '搜索',
    submit: '提交',
    cancel: '取消',
    required: '必填',
    optional: '可选',
    searchPlaceholder: '搜索草药、症状或获取安全信息...'
  },
  
  messages: {
    success: '成功！',
    error: '发生了错误',
    networkError: '网络连接错误',
    validationError: '请检查您的输入',
    subscribeSuccess: '成功订阅通讯！',
    subscribeError: '订阅失败。请重试。'
  },
  
  footer: {
    company: 'HerbScience.shop',
    description: '基于证据的草药补充剂信息，帮助您做出明智的健康决策。',
    tools: '工具',
    resources: '资源',
    legal: '公司',
    copyright: '© 2025 HerbScience.shop - 保留所有权利',
    disclaimer: '本网站仅提供教育信息，不用于诊断、治疗、治愈或预防任何疾病。在开始任何草药补充剂方案之前，请务必咨询合格的医疗保健专业人员。'
  }
}

// 词典映射
const dictionaries = {
  en,
  zh
}

// 获取词典的异步函数（为未来的动态加载做准备）
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] || dictionaries.en
}

export type { Dictionary } 