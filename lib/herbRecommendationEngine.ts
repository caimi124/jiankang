// 草药推荐引擎 - 基于体质和健康问题的智能匹配系统

export type ConstitutionType = '平和' | '气虚' | '阳虚' | '阴虚' | '痰湿' | '湿热' | '血瘀' | '气郁' | '特禀' | '脾虚'

export type HealthConcern = 
  | 'anxiety'
  | 'insomnia'
  | 'fatigue'
  | 'digestion'
  | 'cold_hands_feet'
  | 'night_sweats'
  | 'weight_gain'
  | 'poor_circulation'
  | 'stress'
  | 'allergies'
  | 'inflammation'
  | 'immune_support'

export type SafetyLevel = 'high' | 'medium' | 'low'

export interface HerbInfo {
  id: string
  name: string
  chineseName: string
  latinName: string
  description: string
  constitutionMatch: ConstitutionType[]
  healthConcerns: HealthConcern[]
  benefits: string[]
  dosage: {
    standard: string
    therapeutic: string
    maximum: string
  }
  safetyLevel: SafetyLevel
  safetyScore: number // 1-10
  precautions: string[]
  contraindications: string[]
  interactions: string[]
  researchEvidence: {
    title: string
    summary: string
    link?: string
  }[]
  userReviews: {
    averageRating: number
    totalReviews: number
  }
  price: {
    low: number
    high: number
  }
  availability: 'common' | 'moderate' | 'rare'
}

// 完整草药数据库
const herbDatabase: HerbInfo[] = [
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    chineseName: '睡茄',
    latinName: 'Withania somnifera',
    description: 'Adaptogenic herb that helps manage stress, anxiety, and supports energy levels.',
    constitutionMatch: ['气虚', '阴虚', '气郁'],
    healthConcerns: ['anxiety', 'stress', 'insomnia', 'fatigue'],
    benefits: [
      'Reduces cortisol levels by up to 30%',
      'Improves sleep quality',
      'Boosts energy and stamina',
      'Supports thyroid function',
      'Enhances cognitive function'
    ],
    dosage: {
      standard: '300-500mg daily',
      therapeutic: '500-600mg daily',
      maximum: '1000mg daily'
    },
    safetyLevel: 'high',
    safetyScore: 9,
    precautions: [
      'Take with food to avoid stomach upset',
      'Start with lower dose',
      'May cause drowsiness'
    ],
    contraindications: [
      'Pregnancy and breastfeeding',
      'Autoimmune disorders',
      'Thyroid medication users (consult doctor)',
      'Surgery (stop 2 weeks before)'
    ],
    interactions: [
      'Thyroid medications',
      'Immunosuppressants',
      'Sedatives',
      'Diabetes medications'
    ],
    researchEvidence: [
      {
        title: 'Ashwagandha reduces stress and anxiety (2019)',
        summary: 'Double-blind study showing 30% reduction in cortisol levels',
        link: 'https://pubmed.ncbi.nlm.nih.gov/31517876/'
      }
    ],
    userReviews: {
      averageRating: 4.7,
      totalReviews: 12450
    },
    price: { low: 15, high: 40 },
    availability: 'common'
  },
  {
    id: 'astragalus',
    name: 'Astragalus',
    chineseName: '黄芪',
    latinName: 'Astragalus membranaceus',
    description: 'Powerful immune-boosting herb that increases energy and supports Qi.',
    constitutionMatch: ['气虚', '阳虚'],
    healthConcerns: ['fatigue', 'immune_support', 'digestion'],
    benefits: [
      'Boosts immune system',
      'Increases energy levels',
      'Supports heart health',
      'Anti-aging properties',
      'Improves kidney function'
    ],
    dosage: {
      standard: '250-500mg daily',
      therapeutic: '500-1000mg daily',
      maximum: '2000mg daily'
    },
    safetyLevel: 'high',
    safetyScore: 9,
    precautions: [
      'Best taken in morning',
      'May increase blood pressure slightly'
    ],
    contraindications: [
      'Autoimmune disorders',
      'Fever or active infection',
      'Pregnancy (consult doctor)'
    ],
    interactions: [
      'Immunosuppressants',
      'Blood pressure medications'
    ],
    researchEvidence: [
      {
        title: 'Astragalus enhances immune function (2020)',
        summary: 'Systematic review showing significant immune-boosting effects'
      }
    ],
    userReviews: {
      averageRating: 4.6,
      totalReviews: 8320
    },
    price: { low: 12, high: 30 },
    availability: 'common'
  },
  {
    id: 'ginseng-korean',
    name: 'Korean Ginseng',
    chineseName: '人参',
    latinName: 'Panax ginseng',
    description: 'Premium energy-boosting herb that warms the body and supports Yang energy.',
    constitutionMatch: ['气虚', '阳虚'],
    healthConcerns: ['fatigue', 'cold_hands_feet', 'immune_support'],
    benefits: [
      'Powerful energy boost',
      'Improves cognitive function',
      'Supports sexual health',
      'Boosts immunity',
      'Warms the body'
    ],
    dosage: {
      standard: '200-400mg daily',
      therapeutic: '400-800mg daily',
      maximum: '2000mg daily'
    },
    safetyLevel: 'medium',
    safetyScore: 7,
    precautions: [
      'May cause insomnia if taken late',
      'Can increase blood pressure',
      'Not for long-term continuous use (cycle 2 weeks on, 1 week off)'
    ],
    contraindications: [
      'High blood pressure',
      'Heart conditions',
      'Pregnancy and breastfeeding',
      'Hormone-sensitive conditions'
    ],
    interactions: [
      'Blood thinners',
      'Diabetes medications',
      'Immunosuppressants',
      'Stimulants'
    ],
    researchEvidence: [
      {
        title: 'Ginseng improves energy and cognition (2018)',
        summary: 'Meta-analysis showing significant improvements in fatigue and mental performance'
      }
    ],
    userReviews: {
      averageRating: 4.8,
      totalReviews: 15670
    },
    price: { low: 25, high: 100 },
    availability: 'common'
  },
  {
    id: 'rhodiola',
    name: 'Rhodiola',
    chineseName: '红景天',
    latinName: 'Rhodiola rosea',
    description: 'Adaptogenic herb excellent for stress, mood, and mental clarity.',
    constitutionMatch: ['气郁', '气虚', '阴虚'],
    healthConcerns: ['stress', 'anxiety', 'fatigue', 'insomnia'],
    benefits: [
      'Reduces stress and burnout',
      'Improves mood and focus',
      'Combats fatigue',
      'Supports mental performance',
      'Balances cortisol'
    ],
    dosage: {
      standard: '200-400mg daily',
      therapeutic: '400-600mg daily',
      maximum: '680mg daily'
    },
    safetyLevel: 'high',
    safetyScore: 8,
    precautions: [
      'Take early in day (stimulating)',
      'Start with lower dose',
      'May cause jitteriness in sensitive individuals'
    ],
    contraindications: [
      'Bipolar disorder',
      'Pregnancy and breastfeeding'
    ],
    interactions: [
      'Antidepressants',
      'Stimulants',
      'Diabetes medications'
    ],
    researchEvidence: [
      {
        title: 'Rhodiola reduces stress-related fatigue (2017)',
        summary: 'Clinical trial showing significant reduction in burnout symptoms'
      }
    ],
    userReviews: {
      averageRating: 4.5,
      totalReviews: 9850
    },
    price: { low: 18, high: 45 },
    availability: 'common'
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    chineseName: '姜黄',
    latinName: 'Curcuma longa',
    description: 'Powerful anti-inflammatory herb that promotes circulation and reduces pain.',
    constitutionMatch: ['血瘀', '湿热', '痰湿'],
    healthConcerns: ['inflammation', 'poor_circulation', 'digestion'],
    benefits: [
      'Powerful anti-inflammatory',
      'Supports joint health',
      'Improves circulation',
      'Antioxidant properties',
      'Supports liver health'
    ],
    dosage: {
      standard: '500-1000mg daily',
      therapeutic: '1000-1500mg daily (with black pepper)',
      maximum: '3000mg daily'
    },
    safetyLevel: 'high',
    safetyScore: 8,
    precautions: [
      'Take with black pepper for absorption',
      'Take with food',
      'May stain teeth/clothes'
    ],
    contraindications: [
      'Gallbladder problems',
      'Blood clotting disorders',
      'Iron deficiency',
      'Surgery (stop 2 weeks before)'
    ],
    interactions: [
      'Blood thinners',
      'Diabetes medications',
      'Stomach acid reducers'
    ],
    researchEvidence: [
      {
        title: 'Curcumin reduces inflammation (2019)',
        summary: 'Systematic review confirming anti-inflammatory effects comparable to NSAIDs'
      }
    ],
    userReviews: {
      averageRating: 4.6,
      totalReviews: 18230
    },
    price: { low: 10, high: 35 },
    availability: 'common'
  },
  {
    id: 'ginger',
    name: 'Ginger',
    chineseName: '生姜',
    latinName: 'Zingiber officinale',
    description: 'Warming herb that aids digestion, circulation, and reduces nausea.',
    constitutionMatch: ['阳虚', '痰湿', '脾虚'],
    healthConcerns: ['digestion', 'cold_hands_feet', 'inflammation'],
    benefits: [
      'Improves digestion',
      'Reduces nausea',
      'Warms the body',
      'Anti-inflammatory',
      'Boosts circulation'
    ],
    dosage: {
      standard: '250-500mg daily',
      therapeutic: '1-2g daily',
      maximum: '4g daily'
    },
    safetyLevel: 'high',
    safetyScore: 9,
    precautions: [
      'May cause heartburn in high doses',
      'Blood thinning effects'
    ],
    contraindications: [
      'Gallstones',
      'Bleeding disorders',
      'Surgery (stop 1 week before)'
    ],
    interactions: [
      'Blood thinners',
      'Diabetes medications',
      'Blood pressure medications'
    ],
    researchEvidence: [
      {
        title: 'Ginger reduces nausea and inflammation (2020)',
        summary: 'Meta-analysis confirming effectiveness for digestive issues'
      }
    ],
    userReviews: {
      averageRating: 4.7,
      totalReviews: 11400
    },
    price: { low: 8, high: 20 },
    availability: 'common'
  },
  {
    id: 'american-ginseng',
    name: 'American Ginseng',
    chineseName: '西洋参',
    latinName: 'Panax quinquefolius',
    description: 'Cooling ginseng that nourishes Yin, reduces heat, and calms the mind.',
    constitutionMatch: ['阴虚', '湿热'],
    healthConcerns: ['insomnia', 'night_sweats', 'stress', 'immune_support'],
    benefits: [
      'Cools the body',
      'Reduces night sweats',
      'Calms the mind',
      'Boosts immunity gently',
      'Supports blood sugar'
    ],
    dosage: {
      standard: '200-400mg daily',
      therapeutic: '400-800mg daily',
      maximum: '3000mg daily'
    },
    safetyLevel: 'high',
    safetyScore: 9,
    precautions: [
      'May cause digestive upset',
      'Avoid with cold/flu'
    ],
    contraindications: [
      'Pregnancy and breastfeeding',
      'Hormone-sensitive conditions'
    ],
    interactions: [
      'Blood thinners',
      'Diabetes medications',
      'Immunosuppressants'
    ],
    researchEvidence: [
      {
        title: 'American Ginseng improves immune function (2018)',
        summary: 'Clinical study showing reduced severity of cold symptoms'
      }
    ],
    userReviews: {
      averageRating: 4.5,
      totalReviews: 7230
    },
    price: { low: 20, high: 60 },
    availability: 'moderate'
  },
  {
    id: 'poria',
    name: 'Poria',
    chineseName: '茯苓',
    latinName: 'Poria cocos',
    description: 'Drains dampness, supports spleen function, and calms the spirit.',
    constitutionMatch: ['痰湿', '脾虚'],
    healthConcerns: ['digestion', 'weight_gain', 'anxiety'],
    benefits: [
      'Drains excess fluid',
      'Supports digestion',
      'Calms anxiety',
      'Supports weight management',
      'Improves sleep'
    ],
    dosage: {
      standard: '500-1000mg daily',
      therapeutic: '1000-2000mg daily',
      maximum: '3000mg daily'
    },
    safetyLevel: 'high',
    safetyScore: 9,
    precautions: [
      'Generally very safe',
      'May increase urination'
    ],
    contraindications: [
      'Dehydration',
      'Kidney disease (consult doctor)'
    ],
    interactions: [
      'Diuretics'
    ],
    researchEvidence: [
      {
        title: 'Poria improves metabolic function (2019)',
        summary: 'Study showing benefits for digestive health and fluid balance'
      }
    ],
    userReviews: {
      averageRating: 4.4,
      totalReviews: 4120
    },
    price: { low: 12, high: 30 },
    availability: 'moderate'
  },
  {
    id: 'rhodiola-crenulata',
    name: 'Rhodiola Crenulata',
    chineseName: '红景天',
    latinName: 'Rhodiola crenulata',
    description: 'Powerful adaptogen for energy, stress relief, and mental clarity. Also known as Arctic Root and Golden Root.',
    constitutionMatch: ['气虚', '痰湿', '气郁'],
    healthConcerns: ['fatigue', 'stress', 'anxiety', 'weight_gain', 'immune_support'],
    benefits: [
      'Calm focus without caffeine jitters',
      'Natural sustained energy boost',
      'Reduces stress and balances cortisol',
      'Supports metabolism and weight management',
      'Improves mental clarity under pressure'
    ],
    dosage: {
      standard: '200-400mg daily (3% salidroside)',
      therapeutic: '400-600mg daily',
      maximum: '600mg daily'
    },
    safetyLevel: 'high',
    safetyScore: 8,
    precautions: [
      'Take in morning to avoid sleep disruption',
      'Start with low dose',
      'Cycle usage: 6-8 weeks on, 1 week off',
      'May cause mild restlessness in sensitive individuals'
    ],
    contraindications: [
      'Pregnancy and breastfeeding',
      'Yang-excess or Heat-type constitution',
      'Bipolar disorder',
      'Taking antidepressants (consult doctor)'
    ],
    interactions: [
      'Antidepressants (SSRIs)',
      'Stimulants',
      'Blood pressure medications'
    ],
    researchEvidence: [
      {
        title: 'Rhodiola improves mental performance under stress (2012)',
        summary: 'Clinical study showing significant improvements in focus and stress resilience',
        link: 'https://pubmed.ncbi.nlm.nih.gov/22228617/'
      },
      {
        title: 'Rhodiola reduces fatigue and supports metabolism (2018)',
        summary: 'Research demonstrating effects on oxygen metabolism and energy production'
      }
    ],
    userReviews: {
      averageRating: 4.6,
      totalReviews: 8950
    },
    price: { low: 18, high: 45 },
    availability: 'common'
  }
]

// 智能推荐算法
export interface RecommendationCriteria {
  constitutionType: ConstitutionType
  secondaryConstitution?: ConstitutionType
  healthConcerns: HealthConcern[]
  safetyPreference: SafetyLevel[]
  budget?: 'low' | 'medium' | 'high'
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced'
}

export interface HerbRecommendation extends HerbInfo {
  matchScore: number
  matchReasons: string[]
  priority: 'high' | 'medium' | 'low'
}

export function getHerbRecommendations(
  criteria: RecommendationCriteria
): HerbRecommendation[] {
  const recommendations: HerbRecommendation[] = []

  herbDatabase.forEach((herb) => {
    let matchScore = 0
    const matchReasons: string[] = []

    // 1. 体质匹配（40分）
    if (herb.constitutionMatch.includes(criteria.constitutionType)) {
      matchScore += 40
      matchReasons.push(`Perfect match for ${criteria.constitutionType} constitution`)
    }
    if (criteria.secondaryConstitution && herb.constitutionMatch.includes(criteria.secondaryConstitution)) {
      matchScore += 20
      matchReasons.push(`Also matches secondary constitution`)
    }

    // 2. 健康问题匹配（40分）
    const concernMatches = criteria.healthConcerns.filter(concern => 
      herb.healthConcerns.includes(concern)
    )
    if (concernMatches.length > 0) {
      matchScore += (concernMatches.length / criteria.healthConcerns.length) * 40
      matchReasons.push(`Addresses ${concernMatches.length} of your health concerns`)
    }

    // 3. 安全等级匹配（10分）
    if (criteria.safetyPreference.includes(herb.safetyLevel)) {
      matchScore += 10
      matchReasons.push(`Meets your safety preference`)
    }

    // 4. 新手友好度（10分）
    if (criteria.experienceLevel === 'beginner' && herb.safetyScore >= 8) {
      matchScore += 10
      matchReasons.push(`Beginner-friendly herb`)
    }

    // 5. 预算匹配（加分项）
    if (criteria.budget) {
      if (criteria.budget === 'low' && herb.price.low <= 15) {
        matchScore += 5
        matchReasons.push(`Budget-friendly option`)
      } else if (criteria.budget === 'high' && herb.price.high >= 50) {
        matchScore += 5
        matchReasons.push(`Premium quality option`)
      }
    }

    // 只推荐匹配度>=40分的草药
    if (matchScore >= 40) {
      recommendations.push({
        ...herb,
        matchScore,
        matchReasons,
        priority: matchScore >= 70 ? 'high' : matchScore >= 50 ? 'medium' : 'low'
      })
    }
  })

  // 按匹配分数排序
  return recommendations.sort((a, b) => b.matchScore - a.matchScore)
}

// 根据健康问题快速推荐
export function getQuickRecommendations(concern: HealthConcern, limit: number = 3): HerbInfo[] {
  return herbDatabase
    .filter(herb => herb.healthConcerns.includes(concern))
    .sort((a, b) => b.safetyScore - a.safetyScore)
    .slice(0, limit)
}

// 导出草药数据库（用于搜索功能）
export function getAllHerbs(): HerbInfo[] {
  return herbDatabase
}

// 根据ID获取单个草药信息
export function getHerbById(id: string): HerbInfo | undefined {
  return herbDatabase.find(herb => herb.id === id)
}

