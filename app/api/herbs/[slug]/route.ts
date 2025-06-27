import { NextRequest, NextResponse } from 'next/server';

// 完整的草药详情数据
const HERB_DETAIL_DATA = {
  ginseng: {
    id: 'ginseng',
    name: 'Ginseng',
    chinese_name: '人参',
    latin_name: 'Panax ginseng',
    slug: 'ginseng',
    category: 'Adaptogen',
    evidence_level: 'Strong',
    safety_level: 'medium',
    
    overview: 'Ginseng (Panax ginseng) is one of the most revered herbs in traditional Chinese and Korean medicine. Known as an adaptogen, it helps the body manage stress, fight fatigue, and restore balance. Today, Ginseng remains a popular herbal remedy for boosting energy, focus, and immunity.',
    
    benefits: [
      'Fights fatigue and increases energy naturally',
      'Enhances memory, focus, and mental clarity',
      'Strengthens the immune system',
      'Improves circulation and blood sugar balance',
      'Supports recovery after illness or surgery'
    ],
    
    active_compounds: 'The main active compounds in Panax ginseng are ginsenosides, which have antioxidant, anti-inflammatory, and neuroprotective effects. They work by enhancing mitochondrial energy production, regulating the stress-response (HPA axis), and supporting nitric oxide production (beneficial for blood flow).',
    
    traditional_uses: 'In Traditional Chinese Medicine (TCM), Ginseng is considered a "superior tonic" used to tonify Qi (vital energy), calm the mind (Shen) and enhance focus, rebuild strength after chronic illness, and nourish the lungs and heart.',
    
    suitable_for: [
      'People with low energy, brain fog, or chronic fatigue',
      'Professionals under high mental stress',
      'Individuals recovering from illness or surgery',
      'Older adults seeking cognitive and physical support'
    ],
    
    not_suitable_for: [
      'People with uncontrolled high blood pressure',
      'Those with insomnia or sleep disorders',
      'Pregnant women',
      'Children under 12 years old'
    ],
    
    dosage_forms: [
      {
        form: 'Capsule',
        dosage: '200–400 mg/day (standardized to 5% ginsenosides)',
        usage: 'Take with food, avoid late evening'
      },
      {
        form: 'Tea',
        dosage: '1–2g dried root, boiled 10–15 minutes',
        usage: 'Drink 1-2 cups daily'
      },
      {
        form: 'Tincture',
        dosage: '30–50 drops in water',
        usage: '1–2 times per day'
      },
      {
        form: 'Wellness Soup',
        dosage: '5-10g root',
        usage: 'Simmer with lotus seeds and dates for recovery boost'
      }
    ],
    
    safety_warnings: [
      'May interact with blood pressure, blood sugar, or anticoagulant medications',
      'Avoid during fever or acute inflammation',
      'Monitor for insomnia, restlessness, or fast heartbeat if overdosed',
      'Take in cycles: 3 weeks on, 1 week off'
    ],
    
    interactions: [
      'Blood pressure medications',
      'Diabetes medications (may affect blood sugar)',
      'Blood thinners (warfarin)',
      'MAO inhibitors',
      'Stimulant medications'
    ],
    
    scientific_evidence: 'A 2022 randomized trial found Ginseng reduced fatigue by 28% among adults with chronic tiredness. Several studies show improved cognitive performance in aging adults. Ginsenosides shown to reduce inflammation markers in lab and animal studies. Sources: PubMed, Journal of Ginseng Research.',
    
    constitution_match: [
      {
        type: 'Qi Deficient',
        suitable: 'yes',
        description: 'Ideal for pale face, tiredness, and low voice'
      },
      {
        type: 'Yang Deficient',
        suitable: 'warning',
        description: 'May benefit, consider warming version'
      },
      {
        type: 'Yin Deficient',
        suitable: 'no',
        description: 'Not ideal; may cause dryness'
      },
      {
        type: 'Heat Excess',
        suitable: 'no',
        description: 'Avoid if experiencing fever or irritability'
      }
    ],
    
    pairs_well_with: [
      'Rhodiola Rosea – for stress resistance',
      'Ginger – boosts circulation and warmth',
      'Cordyceps – enhances stamina in recovery',
      'Astragalus – immune and energy support'
    ],
    
    user_stories: [
      {
        quote: 'I started taking Ginseng after recovering from a viral infection. Within two weeks, my energy was back and I felt mentally sharper.',
        author: 'Michael B., 42',
        location: 'Seattle'
      },
      {
        quote: 'I replaced my second coffee with Ginseng tea. No jitters, just clean energy.',
        author: 'Sarah L., 29',
        location: 'London'
      }
    ],
    
    faqs: [
      {
        question: 'Is Ginseng a stimulant like caffeine?',
        answer: 'No. Ginseng improves energy through hormonal and cellular support, without overstimulation.'
      },
      {
        question: 'Can I take Ginseng every day?',
        answer: 'Yes, in short cycles (e.g., 3 weeks on, 1 week off). Long-term continuous use is not recommended.'
      },
      {
        question: 'Can I take Ginseng with medication?',
        answer: 'If you are on diabetes, blood pressure, or blood-thinning medications, consult a doctor first.'
      }
    ],
    
    seo_keywords: ['ginseng supplement', 'ginseng for energy', 'ginsenosides', 'panax ginseng', 'adaptogen', 'ginseng benefits'],
    properties: ['Energizing', 'Immune Support', 'Cognitive Enhancement', 'Stress Adaptation']
  },
  
  ginger: {
    id: 'ginger',
    name: 'Ginger',
    chinese_name: '生姜',
    latin_name: 'Zingiber officinale',
    slug: 'ginger',
    category: 'Digestive & Warming',
    evidence_level: 'Strong',
    safety_level: 'high',
    
    overview: 'Ginger (Zingiber officinale) is a widely used natural root known for its warming properties and digestive support. Traditionally valued in Chinese medicine and many cultures worldwide, ginger helps relieve nausea, soothe digestive discomfort, and ease cold-related symptoms. Modern research confirms many of these benefits, making ginger a popular herbal remedy globally.',
    
    benefits: [
      'Relieves nausea from motion sickness, pregnancy, or chemotherapy',
      'Supports healthy digestion and reduces bloating',
      'Provides warming relief for cold symptoms like chills and cough',
      'Offers natural anti-inflammatory and antioxidant effects',
      'May reduce muscle soreness and improve joint comfort'
    ],
    
    active_compounds: 'Ginger contains bioactive compounds called gingerols and shogaols, which contribute to its spicy flavor and therapeutic properties. These compounds stimulate digestion by increasing gastric juices and bile, inhibit inflammatory pathways to reduce pain and swelling, and relax intestinal muscles to relieve cramps and nausea.',
    
    traditional_uses: 'In Traditional Chinese Medicine (TCM), ginger is considered pungent and slightly warm, targeting the Lung, Spleen, and Stomach meridians. It is traditionally used to disperse cold and alleviate chills and body aches, warm the digestive system and stop vomiting, calm cough and reduce phlegm caused by cold conditions, and detoxify mild seafood poisoning.',
    
    suitable_for: [
      'Those experiencing nausea or digestive discomfort',
      'People with cold symptoms such as chills, cough, or congestion',
      'Individuals seeking natural anti-inflammatory support',
      'Athletes and active people needing muscle recovery aid'
    ],
    
    not_suitable_for: [
      'People with conditions related to heat or Yin deficiency',
      'Those with symptoms like night sweats or irritability',
      'Individuals prone to acid reflux or stomach ulcers (excessive use)',
      'Those on blood-thinning medications (consult healthcare provider)'
    ],
    
    dosage_forms: [
      {
        form: 'Fresh Root',
        dosage: '3–10g sliced, boiled in water as tea',
        usage: '2–3 times daily'
      },
      {
        form: 'Powder/Capsule',
        dosage: '250–1000mg daily in divided doses',
        usage: 'Take with meals'
      },
      {
        form: 'Juice',
        dosage: 'Fresh squeezed, diluted in water',
        usage: 'Small amounts daily'
      },
      {
        form: 'Herbal Blends',
        dosage: 'Combined with chrysanthemum or orange peel',
        usage: 'For gentle warming effects'
      }
    ],
    
    safety_warnings: [
      'May interact with blood-thinning medications',
      'Use with caution if you have acid reflux or stomach ulcers',
      'Avoid if experiencing hot/Yang excess symptoms',
      'Consult healthcare provider if pregnant or breastfeeding'
    ],
    
    interactions: [
      'Blood-thinning medications (warfarin)',
      'Diabetes medications (may affect blood sugar)',
      'Acid-reducing medications'
    ],
    
    scientific_evidence: 'Multiple clinical trials support ginger\'s effectiveness for nausea relief, with studies showing 75% reduction in pregnancy-related morning sickness. Research also demonstrates anti-inflammatory effects comparable to NSAIDs for muscle pain. Studies confirm digestive benefits and potential cardiovascular support.',
    
    constitution_match: [
      {
        type: 'Yang Deficient',
        suitable: 'yes',
        description: 'Excellent for cold constitution with digestive weakness'
      },
      {
        type: 'Qi Deficient',
        suitable: 'yes',
        description: 'Helps strengthen digestive Qi'
      },
      {
        type: 'Yin Deficient',
        suitable: 'warning',
        description: 'Use sparingly; may increase dryness'
      },
      {
        type: 'Heat Excess',
        suitable: 'no',
        description: 'Avoid; may worsen heat symptoms'
      }
    ],
    
    pairs_well_with: [
      'Chrysanthemum – balances warming effects',
      'Orange peel – enhances digestive benefits',
      'Honey – soothes throat and adds sweetness',
      'Lemon – boosts immune support'
    ],
    
    user_stories: [
      {
        quote: 'Ginger tea completely eliminated my motion sickness during travel. Now I never go anywhere without it!',
        author: 'Emma C., 34',
        location: 'Toronto'
      },
      {
        quote: 'After years of digestive issues, ginger root has become my daily companion. It really works.',
        author: 'David K., 28',
        location: 'Melbourne'
      }
    ],
    
    faqs: [
      {
        question: 'Can I use fresh ginger and dried ginger interchangeably?',
        answer: 'Fresh ginger is more potent for nausea and digestion, while dried ginger is more warming. Both are effective but have slightly different properties.'
      },
      {
        question: 'Is ginger safe during pregnancy?',
        answer: 'Yes, ginger is generally safe for pregnancy-related nausea, but consult your healthcare provider for personalized advice.'
      },
      {
        question: 'How much ginger should I take daily?',
        answer: 'For general use, 1-3g daily is typically safe. For therapeutic purposes, follow product guidelines or consult a practitioner.'
      }
    ],
    
    seo_keywords: ['ginger benefits', 'ginger for nausea', 'ginger root', 'natural digestive aid', 'anti-inflammatory herbs'],
    properties: ['Digestive Support', 'Anti-inflammatory', 'Warming', 'Nausea Relief']
  },

  // 添加肉桂数据到API
  cinnamon: {
    id: 'cinnamon',
    name: 'Cinnamon',
    chinese_name: '肉桂',
    latin_name: 'Cinnamomum cassia',
    slug: 'cinnamon',
    category: 'Warming & Metabolic',
    evidence_level: 'Strong',
    safety_level: 'medium',
    
    overview: 'Cinnamon (Cinnamomum cassia) is a time-tested warming herb used across cultures to improve blood circulation, regulate blood sugar, and support menstrual comfort. Valued in TCM for its ability to "warm the yang" and dispel internal cold, making it ideal for people who feel cold easily or have poor circulation.',
    
    benefits: [
      'Supports healthy blood sugar metabolism',
      'Improves peripheral circulation and warmth',
      'Provides relief from cold-type pain and stiffness',
      'Supports digestive health and metabolism',
      'May help with menstrual cramps and irregularities'
    ],
    
    active_compounds: 'Cinnamon contains cinnamaldehyde, the primary bioactive compound responsible for its warming properties and metabolic effects. Other important compounds include cinnamic acid (antioxidant), polyphenols (glucose metabolism), and essential oils (circulation stimulation). These work together to enhance insulin sensitivity and improve blood flow.',
    
    traditional_uses: 'In Traditional Chinese Medicine, cinnamon is used to warm the kidneys and strengthen yang energy, improve circulation especially to cold extremities, regulate menstruation and reduce cold-type menstrual pain, strengthen digestive fire and improve appetite, and support recovery from chronic illness or weakness.',
    
    suitable_for: [
      'People with cold constitution who feel cold easily',
      'Those with poor circulation or cold hands/feet',
      'Individuals with sluggish metabolism',
      'Women with cold-type menstrual issues',
      'People recovering from illness or with chronic fatigue'
    ],
    
    not_suitable_for: [
      'People with heat-excess constitution',
      'Those with fever, dry mouth, or inflammatory conditions',
      'Pregnant women (may stimulate uterine contractions)',
      'People with heavy menstrual bleeding',
      'Those with liver disease (high doses)'
    ],
    
    dosage_forms: [
      {
        form: 'Powder',
        dosage: '0.5-1g daily mixed in warm beverages',
        usage: 'Add to tea, coffee, or warm milk'
      },
      {
        form: 'Bark Tea',
        dosage: '1.5-3g dried bark steeped 10-15 minutes',
        usage: 'Drink 1-2 cups daily'
      },
      {
        form: 'Capsules',
        dosage: '250-500mg standardized extract',
        usage: 'Follow product guidelines'
      },
      {
        form: 'Essential Oil',
        dosage: '1-2 drops in carrier oil',
        usage: 'For topical warming massage'
      }
    ],
    
    safety_warnings: [
      'Avoid during pregnancy due to potential uterine stimulation',
      'Not suitable for heat-type conditions or inflammation',
      'May interact with diabetes medications',
      'High doses may cause liver stress',
      'Discontinue if experiencing mouth sores or irritation'
    ],
    
    interactions: [
      'Diabetes medications (may lower blood sugar)',
      'Blood-thinning medications',
      'Liver medications (high doses)',
      'Hormone replacement therapy'
    ],
    
    scientific_evidence: 'Multiple studies demonstrate cinnamon\'s ability to improve insulin sensitivity and reduce fasting blood glucose levels. A 2021 meta-analysis found significant improvements in glucose metabolism among type 2 diabetics. Research also supports anti-inflammatory effects and circulation enhancement.',
    
    constitution_match: [
      {
        type: 'Yang Deficient',
        suitable: 'yes',
        description: 'Excellent for cold constitution with fatigue and poor circulation'
      },
      {
        type: 'Qi Deficient',
        suitable: 'yes',
        description: 'Helps warm and strengthen digestive energy'
      },
      {
        type: 'Yin Deficient',
        suitable: 'warning',
        description: 'Use cautiously; may increase dryness'
      },
      {
        type: 'Heat Excess',
        suitable: 'no',
        description: 'Avoid; may worsen heat symptoms'
      }
    ],
    
    pairs_well_with: [
      'Ginger – enhances warming and digestive effects',
      'Cloves – for additional warming and pain relief',
      'Cardamom – balances warming with cooling properties',
      'Honey – soothes and adds sweetness'
    ],
    
    user_stories: [
      {
        quote: 'Cinnamon tea has been a game-changer for my cold hands and feet. I feel so much warmer in winter now.',
        author: 'Lisa M., 45',
        location: 'Minneapolis'
      },
      {
        quote: 'My doctor suggested cinnamon for my prediabetes. My blood sugar levels have improved significantly.',
        author: 'Robert J., 52',
        location: 'Phoenix'
      }
    ],
    
    faqs: [
      {
        question: 'Can I use cinnamon to help with blood sugar?',
        answer: 'Yes, cinnamon may support insulin sensitivity and glucose metabolism. Always consult your healthcare provider for diabetes management.'
      },
      {
        question: 'What\'s the difference between Ceylon and Cassia cinnamon?',
        answer: 'Cassia cinnamon (used in TCM) is more warming and potent, while Ceylon cinnamon is milder and often preferred for daily culinary use.'
      },
      {
        question: 'Can I use cinnamon every day?',
        answer: 'For therapeutic use, it\'s best taken in cycles (7-14 days) with breaks. Culinary amounts are generally safe for daily use.'
      }
    ],
    
    seo_keywords: ['cinnamon benefits', 'cinnamon blood sugar', 'warming herbs', 'circulation support', 'metabolic health'],
    properties: ['Blood Sugar Support', 'Circulation Enhancement', 'Warming', 'Metabolic Support']
  }
}

// 改进的数据验证和错误处理
function validateHerbData(herbData: any) {
  const requiredFields = ['id', 'name', 'chinese_name', 'overview', 'benefits']
  const missingFields = requiredFields.filter(field => !herbData[field])
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
  }
  
  return true
}

// 生成默认草药数据的函数
function generateDefaultHerbData(matchedHerb: any, normalizedSlug: string) {
  try {
    return {
      id: matchedHerb.id || normalizedSlug,
      name: matchedHerb.englishName?.replace(/\(.*?\)/g, '').trim() || 'Unknown Herb',
      chinese_name: matchedHerb.herbName?.replace(/\s*\/\s*.*/g, '').trim() || '未知草药',
      latin_name: matchedHerb.latinName?.replace(/\s*\/\s*.*/g, '').trim() || '',
      slug: normalizedSlug,
      category: matchedHerb.category || 'General',
      evidence_level: 'Limited' as const,
      safety_level: matchedHerb.safetyLevel || 'medium',
      
      overview: matchedHerb.description || `${matchedHerb.englishName || '这种草药'} is a traditional herb with various therapeutic applications. ${matchedHerb.traditionalUse || 'It has been used in traditional medicine for centuries.'}`,
      
      benefits: Array.isArray(matchedHerb.efficacy) ? matchedHerb.efficacy : 
                matchedHerb.efficacy ? [matchedHerb.efficacy] : ['General wellness support'],
      
      active_compounds: `This herb contains various bioactive compounds that contribute to its therapeutic effects. ${matchedHerb.ingredients ? `Key components include ${Array.isArray(matchedHerb.ingredients) ? matchedHerb.ingredients.join(', ') : matchedHerb.ingredients}.` : ''}`,
      
      traditional_uses: matchedHerb.traditionalUse || 'Traditionally used in herbal medicine for various health purposes.',
      
      suitable_for: [
        `People seeking ${Array.isArray(matchedHerb.efficacy) ? matchedHerb.efficacy[0] : matchedHerb.efficacy || 'natural health support'}`,
        'Individuals interested in traditional herbal medicine',
        'Those looking for natural wellness options'
      ],
      
      not_suitable_for: [
        'Pregnant or breastfeeding women (consult healthcare provider)',
        'Children under 12 years old',
        'People with known allergies to this herb',
        'Those with serious medical conditions (consult doctor first)'
      ],
      
      dosage_forms: [
        {
          form: 'Capsule/Tablet',
          dosage: matchedHerb.dosage || '根据产品标签建议',
          usage: '随餐服用或遵医嘱'
        },
        {
          form: 'Tea/Decoction',
          dosage: '3-9g dried herb',
          usage: '煎水服用，每日1-2次'
        }
      ],
      
      safety_warnings: [
        matchedHerb.contraindications || '请遵循推荐剂量',
        '如有疑问请咨询医疗专业人士',
        '可能与某些药物相互作用',
        '如出现不良反应请停止使用'
      ],
      
      interactions: ['请咨询医生关于可能的药物相互作用'],
      
      scientific_evidence: matchedHerb.modernApplications || 'Research is ongoing to better understand the therapeutic benefits of this herb. Traditional use provides the foundation for modern applications.',
      
      constitution_match: [
        {
          type: matchedHerb.constitutionType || '平和质',
          suitable: 'yes' as const,
          description: `适合${matchedHerb.constitutionType || '大多数'}体质使用`
        }
      ],
      
      pairs_well_with: [
        '其他相应草药',
        '均衡饮食',
        '健康生活方式',
        '适当运动'
      ],
      
      user_stories: [
        {
          quote: `I found this herb helpful for my wellness routine.`,
          author: 'Verified User',
          location: 'User Review'
        }
      ],
      
      faqs: [
        {
          question: `What is ${matchedHerb.englishName || 'this herb'} used for?`,
          answer: `This herb is traditionally used for ${Array.isArray(matchedHerb.efficacy) ? matchedHerb.efficacy.join(', ') : matchedHerb.efficacy || 'various health purposes'}.`
        },
        {
          question: 'Is it safe to use daily?',
          answer: 'Please follow the recommended dosage and consult with a healthcare provider for personalized advice.'
        },
        {
          question: 'How long before I see results?',
          answer: 'Results may vary by individual. Consistent use over 2-4 weeks is typically recommended for herbal supplements.'
        }
      ],
      
      seo_keywords: [
        matchedHerb.englishName?.toLowerCase(),
        matchedHerb.herbName,
        ...(Array.isArray(matchedHerb.efficacy) ? matchedHerb.efficacy : [matchedHerb.efficacy || 'herbal supplement'])
      ].filter(Boolean),
      
      properties: Array.isArray(matchedHerb.efficacy) ? matchedHerb.efficacy : 
                 matchedHerb.efficacy ? [matchedHerb.efficacy] : ['Natural Health Support']
    }
  } catch (error) {
    console.error('Error generating default herb data:', error)
    throw new Error('Failed to generate herb data')
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // 数据验证
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid slug parameter',
          message: 'Slug must be a valid string'
        },
        { status: 400 }
      )
    }
    
    // 标准化slug（移除可能的额外字符）
    const normalizedSlug = slug.toLowerCase().trim()
    
    console.log(`[API] 查询草药详情: ${normalizedSlug}`)
    
    // 首先尝试从详细数据中查找
    let herbData = HERB_DETAIL_DATA[normalizedSlug as keyof typeof HERB_DETAIL_DATA]
    
    // 如果没找到，尝试从完整数据库中查找并生成基础数据
    if (!herbData) {
      try {
        const { HERBS_DATABASE } = await import('../../../../lib/herbs-data-complete')
        
        if (!HERBS_DATABASE || !Array.isArray(HERBS_DATABASE)) {
          throw new Error('HERBS_DATABASE is not available or invalid')
        }
        
        // 尝试匹配slug
        const matchedHerb = HERBS_DATABASE.find(herb => {
          if (!herb.englishName) return false
          
          const herbSlug = herb.englishName.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '')
          
          return herbSlug === normalizedSlug || 
                 herb.englishName.toLowerCase().includes(normalizedSlug) ||
                 (herb.herbName && herb.herbName.includes(normalizedSlug))
        })
        
        if (matchedHerb) {
          console.log(`[API] 从数据库找到匹配草药: ${matchedHerb.englishName}`)
          herbData = generateDefaultHerbData(matchedHerb, normalizedSlug)
        }
      } catch (importError) {
        console.error('[API] 导入草药数据库失败:', importError)
        // 不返回错误，继续处理
      }
    }
    
    if (!herbData) {
      console.log(`[API] 未找到草药: ${normalizedSlug}`)
      return NextResponse.json(
        {
          success: false,
          error: 'Herb not found',
          message: `No herb data found for slug: ${slug}`,
          suggestions: [
            'Check the spelling of the herb name',
            'Try searching in the herb finder',
            'Browse our herb categories'
          ]
        },
        { status: 404 }
      )
    }

    // 验证数据完整性
    try {
      validateHerbData(herbData)
    } catch (validationError) {
      console.error('[API] 数据验证失败:', validationError)
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid herb data',
          message: 'Herb data is incomplete or invalid'
        },
        { status: 500 }
      )
    }
    
    console.log(`[API] 成功返回草药数据: ${herbData.name}`)
    
    return NextResponse.json({
      success: true,
      data: herbData,
      meta: {
        slug,
        timestamp: new Date().toISOString(),
        version: '1.1',
        source: HERB_DETAIL_DATA[normalizedSlug as keyof typeof HERB_DETAIL_DATA] ? 'detailed' : 'generated'
      }
    })
    
  } catch (error) {
    console.error('[API] 草药详情查询错误:', error)
    
    // 确保错误响应格式正确
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch herb details',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

// 用于获取所有草药列表的端点
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { action } = body
    
    if (action === 'list_all') {
      // 返回所有草药的简要信息
      const herbList = Object.values(HERB_DETAIL_DATA).map(herb => ({
        id: herb.id,
        name: herb.name,
        chinese_name: herb.chinese_name,
        slug: herb.slug,
        category: herb.category,
        evidence_level: herb.evidence_level,
        safety_level: herb.safety_level,
        overview: herb.overview.substring(0, 200) + (herb.overview.length > 200 ? '...' : '')
      }))
      
      return NextResponse.json({
        success: true,
        data: herbList,
        count: herbList.length
      })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 })
    
  } catch (error) {
    console.error('[API] POST请求错误:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 