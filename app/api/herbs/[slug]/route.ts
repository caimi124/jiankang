import { NextRequest, NextResponse } from 'next/server';
import { fetchHerbFromNotionBySlug } from '../../../../lib/notion-herbs'

// 完整的草药详情数据
const HERB_DETAIL_DATA = {
  clove: {
    id: 'clove',
    name: 'Clove',
    chinese_name: '丁香',
    latin_name: 'Syzygium aromaticum',
    slug: 'clove',
    category: 'Digestive & Antimicrobial',
    evidence_level: 'Moderate',
    safety_level: 'medium',
    
    overview: 'Clove is a powerful aromatic spice with a long history in culinary and medicinal use. It supports oral health, eases pain, warms the stomach to relieve cold-type indigestion and nausea, and exhibits antibacterial, antifungal, and antioxidant effects.',
    
    benefits: [
      'Oral health and toothache relief',
      'Anti-nausea and vomiting relief',
      'Digestive support (bloating, poor appetite)',
      'Relief of cold-type abdominal pain',
      "Men's health support (traditional use)",
      'Anti-inflammatory support',
      'Helps with mild topical infections'
    ],
    
    active_compounds: 'Eugenol (primary), tannins, flavonoids, and volatile oils providing antimicrobial and analgesic properties.',
    
    traditional_uses: 'In TCM, clove (Ding Xiang) warms the middle, stops vomiting, dispels cold, relieves pain, and supports kidney yang.',
    
    suitable_for: [
      'Yang deficiency with cold stomach and poor digestion',
      'Weak circulation and fatigue',
      'Cold-type nausea or motion sickness'
    ],
    
    not_suitable_for: [
      'Yin deficiency with internal heat',
      'High blood pressure (use cautiously)',
      'Pregnancy and children under 12 (unless advised by a provider)'
    ],
    
    dosage_forms: [
      { form: 'Whole Cloves (tea)', dosage: '1–3 g/day', usage: 'Steep 2–3 whole cloves; drink before meals' },
      { form: 'Clove Powder', dosage: '0.5–1 g/day', usage: 'Use with warm water or in food' },
      { form: 'Clove Oil (external)', dosage: '1–2 drops diluted (≥1:5)', usage: 'Topical use for tooth/gum discomfort; avoid mucosa contact' }
    ],
    
    safety_warnings: [
      'May irritate the GI tract if overused',
      'Avoid during pregnancy and in children unless supervised',
      'Do not combine with turmeric/curcumin per traditional incompatibility rule',
      'Possible dizziness or nausea with excess use'
    ],
    
    interactions: [
      'Use caution with anticoagulants and antiplatelet agents',
      'May irritate sensitive oral tissue when used undiluted'
    ],
    
    scientific_evidence: 'Eugenol provides local anesthetic effects by blocking nerve transmission and inhibits inflammatory mediators (e.g., COX-2). In vitro studies show antimicrobial effects against Streptococcus mutans and Candida. Clinical evidence supports halitosis reduction with clove-containing mouthwash.',
    
    constitution_match: [
      { type: 'Yang Deficient / Cold Stomach', suitable: 'yes', description: 'Warming and stimulating; supports digestion' },
      { type: 'Yin Deficient / Internal Heat', suitable: 'no', description: 'May aggravate heat signs (dry mouth, irritability)' }
    ],
    
    pairs_well_with: ['Ginger', 'Fennel seed', 'Black or red tea (for warming tonic)'],
    
    user_stories: [
      { quote: 'Clove and ginger tea before meals improved my appetite and reduced bloating.', author: 'Verified User', location: 'Case Note' }
    ],
    
    faqs: [
      { question: 'Is clove safe for daily use?', answer: 'Small culinary amounts are safe; avoid long-term use of concentrated oil without supervision.' },
      { question: 'Can I use clove oil for gum pain?', answer: 'Yes, but always dilute and avoid direct contact with sensitive tissue.' },
      { question: 'Does clove help with bad breath?', answer: 'Yes. Antimicrobial and aromatic compounds freshen breath and reduce oral bacteria.' }
    ],
    
    seo_keywords: [
      'clove benefits', 'clove dosage', 'clove safety', 'Syzygium aromaticum',
      'clove for toothache', 'clove antimicrobial', 'clove for digestion',
      "clove men's health", 'eugenol', 'traditional chinese medicine clove'
    ],
    properties: ['Warming', 'Antibacterial', 'Anti-nausea', 'Analgesic', 'Digestive Support']
  },
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
        dosage: 'As directed',
        usage: 'Combined with dates, honey, or black tea'
      }
    ],
    
    safety_warnings: [
      'May increase bleeding risk if combined with blood thinners',
      'Avoid excessive use if prone to acid reflux or stomach ulcers',
      'Not recommended for individuals with heat-related syndromes or Yin deficiency',
      'Pregnant women should consult healthcare providers before regular use'
    ],
    
    interactions: [
      'Blood-thinning medications (warfarin)',
      'Antiplatelet drugs',
      'Diabetes medications (may affect blood sugar)',
      'Blood pressure medications'
    ],
    
    scientific_evidence: 'Clinical studies support ginger\'s effectiveness in reducing nausea, improving digestion, and lowering inflammation. It has been shown to alleviate motion sickness, morning sickness in pregnancy, and muscle pain in athletes. Multiple studies confirm its anti-inflammatory and antioxidant properties.',
    
    constitution_match: [
      {
        type: 'Cold Constitution',
        suitable: 'yes',
        description: 'Ideal for those with chills, cold hands/feet, and digestive coldness'
      },
      {
        type: 'Phlegm-Damp',
        suitable: 'yes',
        description: 'Helps transform dampness and improve digestion'
      },
      {
        type: 'Yin Deficient',
        suitable: 'warning',
        description: 'Use cautiously; may increase heat symptoms'
      },
      {
        type: 'Heat Constitution',
        suitable: 'no',
        description: 'Avoid if experiencing fever, night sweats, or irritability'
      }
    ],
    
    pairs_well_with: [
      'Ginseng – for enhanced warming and energy support',
      'Honey – to soothe the throat and balance spice',
      'Lemon – to support digestion and add vitamin C',
      'Jujube dates – for gentle nourishment and sweetness'
    ],
    
    user_stories: [
      {
        quote: 'During pregnancy, ginger tea was a lifesaver for my morning sickness — natural and gentle.',
        author: 'Emily R.',
        location: 'New York'
      },
      {
        quote: 'After workouts, ginger supplements help reduce my muscle soreness without side effects.',
        author: 'Jason M.',
        location: 'Toronto'
      }
    ],
    
    faqs: [
      {
        question: 'Can I drink ginger tea daily?',
        answer: 'Yes, moderate daily consumption is generally safe and beneficial for most people.'
      },
      {
        question: 'Does ginger help with colds?',
        answer: 'Ginger\'s warming properties can help relieve chills and cough associated with colds.'
      },
      {
        question: 'Can ginger interact with medications?',
        answer: 'Ginger may increase bleeding risk with blood thinners. Consult your doctor if unsure.'
      },
      {
        question: 'Is ginger safe during pregnancy?',
        answer: 'Small amounts are generally safe, but pregnant women should consult healthcare providers before regular use.'
      }
    ],
    
    seo_keywords: ['ginger benefits', 'ginger for nausea', 'natural cold remedy', 'ginger anti-inflammatory', 'how to use ginger'],
    properties: ['Warming', 'Digestive Support', 'Anti-nausea', 'Anti-inflammatory']
  },

  turmeric: {
    id: 'turmeric',
    name: 'Turmeric',
    chinese_name: '姜黄',
    latin_name: 'Curcuma longa',
    slug: 'turmeric',
    category: 'Anti-inflammatory & Antioxidant',
    evidence_level: 'Strong',
    safety_level: 'high',
    
    overview: 'Turmeric (Curcuma longa) is a vibrant yellow spice and medicinal herb known worldwide for its potent anti-inflammatory and antioxidant effects. Traditionally used in Chinese and Ayurvedic medicine, turmeric helps support joint comfort, improve digestion, and promote overall wellness. The active ingredient, curcumin, is the key to its health benefits and is backed by numerous scientific studies.',
    
    benefits: [
      'Helps reduce joint pain and inflammation',
      'Supports healthy digestion and liver function',
      'Provides antioxidant protection against cellular damage',
      'May boost mood and cognitive health',
      'Supports natural detoxification processes'
    ],
    
    active_compounds: 'Turmeric\'s primary active compound, curcumin, works by blocking inflammatory molecules and neutralizing harmful free radicals. Curcumin also supports digestive health by stimulating bile production and may improve brain function by increasing levels of brain-derived neurotrophic factor (BDNF).',
    
    traditional_uses: 'In Traditional Chinese Medicine (TCM), turmeric is seen as a warming herb that promotes blood flow and relieves pain caused by stagnation or cold. It is traditionally used to improve circulation and relieve muscle and joint stiffness, ease digestive discomfort and bloating, and support menstrual health by reducing cramps.',
    
    suitable_for: [
      'People with joint pain, arthritis, or muscle soreness',
      'Individuals experiencing digestive issues like bloating or indigestion',
      'Anyone looking to reduce inflammation naturally',
      'Those wanting to support brain and mood health'
    ],
    
    not_suitable_for: [
      'People with gallstones or bile duct obstruction',
      'Those on blood-thinning medications (without medical supervision)',
      'Individuals with iron deficiency (may reduce iron absorption)',
      'Pregnant women (high doses may stimulate uterine contractions)'
    ],
    
    dosage_forms: [
      {
        form: 'Powder',
        dosage: '500–2000mg daily',
        usage: 'Preferably with black pepper for better absorption'
      },
      {
        form: 'Capsules',
        dosage: '500mg standardized curcumin extract',
        usage: '2–3 times daily with meals'
      },
      {
        form: 'Fresh Root',
        dosage: '1-3g daily',
        usage: 'Used in cooking or brewed as tea'
      },
      {
        form: 'Herbal Blends',
        dosage: 'As directed',
        usage: 'Combined with ginger, cinnamon, or black pepper'
      }
    ],
    
    safety_warnings: [
      'Generally safe but may cause mild stomach upset in some people',
      'May interact with blood thinners or diabetes medications',
      'Consult your doctor before use if pregnant, breastfeeding, or taking medications',
      'Avoid if you have gallstones or bile duct obstruction'
    ],
    
    interactions: [
      'Blood-thinning medications (warfarin)',
      'Diabetes medications (may affect blood sugar)',
      'Chemotherapy drugs (may interfere with some treatments)',
      'Iron supplements (may reduce absorption)'
    ],
    
    scientific_evidence: 'Research supports turmeric\'s role in reducing inflammation, easing arthritis symptoms, aiding digestion, and potentially improving brain function and mood. Curcumin is one of the most studied natural compounds for these benefits, with over 3,000 published studies.',
    
    constitution_match: [
      {
        type: 'Blood Stasis',
        suitable: 'yes',
        description: 'Excellent for improving circulation and reducing stagnation'
      },
      {
        type: 'Phlegm-Damp',
        suitable: 'yes',
        description: 'Helps transform dampness and support digestion'
      },
      {
        type: 'Cold Constitution',
        suitable: 'yes',
        description: 'Warming properties support those with cold symptoms'
      },
      {
        type: 'Heat Excess',
        suitable: 'warning',
        description: 'Use moderately; monitor for increased heat symptoms'
      }
    ],
    
    pairs_well_with: [
      'Black pepper (piperine) – to enhance absorption',
      'Ginger – to boost anti-inflammatory and digestive support',
      'Cinnamon and cardamom – in herbal formulas',
      'Healthy fats – to improve curcumin absorption'
    ],
    
    user_stories: [
      {
        quote: 'Turmeric capsules helped reduce my knee pain and gave me more mobility.',
        author: 'Anna W.',
        location: 'Chicago'
      },
      {
        quote: 'I drink turmeric tea daily to support my digestion and energy.',
        author: 'Mark L.',
        location: 'London'
      }
    ],
    
    faqs: [
      {
        question: 'Can turmeric replace my arthritis medication?',
        answer: 'Turmeric can complement treatment but should not replace prescribed medicines without doctor advice.'
      },
      {
        question: 'How can I improve turmeric absorption?',
        answer: 'Taking turmeric with black pepper or healthy fats enhances absorption significantly.'
      },
      {
        question: 'Is turmeric safe to use every day?',
        answer: 'Generally yes for most people, but consult your healthcare provider for personalized advice.'
      },
      {
        question: 'What\'s the difference between turmeric and curcumin?',
        answer: 'Turmeric is the whole spice, while curcumin is the active compound. Curcumin supplements are more concentrated.'
      }
    ],
    
    seo_keywords: ['turmeric benefits', 'curcumin supplement', 'natural anti-inflammatory', 'turmeric dosage', 'turmeric for joint pain'],
    properties: ['Anti-inflammatory', 'Antioxidant', 'Digestive Support', 'Joint Health']
  }
  ,
  cinnamon: {
    id: 'cinnamon',
    name: 'Cinnamon',
    chinese_name: '肉桂',
    latin_name: 'Cinnamomum verum',
    slug: 'cinnamon',
    category: 'Warming & Metabolic Support',
    evidence_level: 'Moderate',
    safety_level: 'medium',

    overview: 'Cinnamon is a warming spice traditionally used to support circulation, digestion, and blood sugar balance. Modern research suggests benefits for glycemic control and inflammation.',

    benefits: [
      'Supports healthy blood sugar balance',
      'Warming digestive support',
      'Circulation and comfort',
      'Antioxidant and anti-inflammatory effects'
    ],

    active_compounds: 'Cinnamaldehyde, cinnamic acid, procyanidins, and essential oils contributing to metabolic and antimicrobial actions.',

    traditional_uses: 'In TCM, Rou Gui warms the interior, dispels cold, unblocks channels, and supports yang.',

    suitable_for: [
      'Cold-type digestion with bloating',
      'Cold extremities and sluggish circulation'
    ],
    not_suitable_for: [
      'Heat conditions or yin deficiency with heat signs',
      'Pregnancy in high doses'
    ],

    dosage_forms: [
      { form: 'Powder/Capsule', dosage: '500–2000 mg/day', usage: 'With meals' },
      { form: 'Tea', dosage: '1–3 g bark simmered', usage: '1–2 times daily' }
    ],

    safety_warnings: [
      'High coumarin content in cassia types may affect liver in excess',
      'Monitor with anticoagulants and diabetes meds'
    ],

    interactions: [
      'Anticoagulants', 'Antidiabetic medications'
    ],

    scientific_evidence: 'Meta-analyses show modest improvements in fasting glucose and lipids; anti-inflammatory and antioxidant activities are reported.',

    constitution_match: [
      { type: 'Cold Constitution', suitable: 'yes', description: 'Warming and circulation support' },
      { type: 'Heat Excess', suitable: 'no', description: 'May aggravate heat symptoms' }
    ],

    pairs_well_with: ['Ginger', 'Cardamom', 'Black tea'],
    user_stories: [],
    faqs: [],
    seo_keywords: ['cinnamon benefits', 'cinnamon blood sugar', 'Cinnamomum verum', 'warming spice'],
    properties: ['Warming', 'Metabolic Support', 'Digestive Support']
  },
  'pumpkin-seeds': {
    id: 'pumpkin-seeds',
    name: 'Pumpkin Seeds',
    chinese_name: '南瓜子',
    latin_name: 'Cucurbita pepo (semen)',
    slug: 'pumpkin-seeds',
    category: 'Men’s Health & Nutritional Support',
    evidence_level: 'Moderate',
    safety_level: 'high',

    overview: 'Pumpkin seeds are rich in zinc, healthy fats, and phytosterols, supporting prostate health, urinary comfort, and general nutrition. They also provide antioxidants and magnesium for metabolic and cardiovascular support.',

    benefits: [
      'Prostate and urinary health support',
      'Nutrient-dense (zinc, magnesium, healthy fats)',
      'Anti-inflammatory and antioxidant effects',
      'Sleep and mood support via magnesium'
    ],

    active_compounds: 'Phytosterols (beta-sitosterol), zinc, vitamin E, omega-6 and omega-9 fatty acids.',

    traditional_uses: 'Used as a nourishing food in traditional diets; seeds sometimes used for parasitic concerns.',

    suitable_for: ['Men’s health support', 'Nutritional replenishment'],
    not_suitable_for: ['Seed allergies', 'High-calorie restriction (use in moderation)'],

    dosage_forms: [
      { form: 'Whole seeds', dosage: '15–30 g/day', usage: 'As snack or topping' },
      { form: 'Oil', dosage: '1–2 tsp/day', usage: 'Cold use preferred' }
    ],

    safety_warnings: ['Generally safe; caloric density high; watch for allergies'],
    interactions: [],
    scientific_evidence: 'Studies suggest pumpkin seed oil may improve urinary symptoms in BPH and provide lipid profile benefits; antioxidant properties documented.',
    constitution_match: [
      { type: 'Deficiency with dryness', suitable: 'yes', description: 'Nourishing fats and minerals' }
    ],
    pairs_well_with: ['Saw palmetto (for men’s health)', 'Whole grains', 'Leafy greens'],
    user_stories: [],
    faqs: [],
    seo_keywords: ['pumpkin seeds benefits', 'beta-sitosterol', 'pumpkin seed oil prostate', 'zinc rich food'],
    properties: ['Nourishing', 'Anti-inflammatory', 'Antioxidant']
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // 标准化slug（移除可能的额外字符）
    const normalizedSlug = slug.toLowerCase().trim()
    
    console.log(`[API] 查询草药详情: ${normalizedSlug}`)
    
    // 优先从 Notion 读取
    let herbData = await fetchHerbFromNotionBySlug(normalizedSlug)
      .catch(() => null) as any
    
    // 兼容旧数据：未命中 Notion 时回退到内置常量
    if (!herbData) {
      herbData = HERB_DETAIL_DATA[normalizedSlug as keyof typeof HERB_DETAIL_DATA]
    }
    
    // 如果没找到，尝试从完整数据库中查找并生成基础数据
    if (!herbData) {
      const { HERBS_DATABASE } = await import('../../../../lib/herbs-data-complete')
      
      // 尝试匹配slug
      const matchedHerb = HERBS_DATABASE.find(herb => {
        const herbSlug = herb.english_name.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]/g, '')
          .replace(/--+/g, '-')
          .trim()
        return herbSlug === normalizedSlug || 
               herb.english_name.toLowerCase().includes(normalizedSlug) ||
               herb.chinese_name.includes(normalizedSlug)
      })
      
      if (!herbData && matchedHerb) {
        // 为数据库中的草药生成基础详情页数据
        herbData = {
          id: matchedHerb.id,
          name: matchedHerb.english_name.replace(/\(.*?\)/g, '').trim(),
          chinese_name: matchedHerb.chinese_name.replace(/\s*\/\s*.*/g, '').trim(),
          latin_name: matchedHerb.latin_name.replace(/\s*\/\s*.*/g, '').trim(),
          slug: normalizedSlug,
          category: matchedHerb.category,
          evidence_level: 'Moderate' as const,
          safety_level: matchedHerb.safety_level,
          
          overview: matchedHerb.description || `${matchedHerb.english_name} is a traditional herb known for its therapeutic properties. ${matchedHerb.traditional_use}`,
          
          benefits: matchedHerb.primary_effects || matchedHerb.efficacy || ['General wellness support'],
          
          active_compounds: `Active compounds in ${matchedHerb.english_name} include ${matchedHerb.ingredients?.join(', ') || 'various bioactive compounds'} that contribute to its therapeutic effects.`,
          
          traditional_uses: matchedHerb.traditional_use || `Traditionally used in herbal medicine for various health purposes.`,
          
          suitable_for: [`People seeking ${matchedHerb.primary_effects?.[0] || 'natural health support'}`],
          
          not_suitable_for: [
            matchedHerb.contraindications || 'People with known allergies to this herb',
            'Pregnant or breastfeeding women (consult healthcare provider)',
            'Children under 12 years old'
          ],
          
          dosage_forms: [
            {
              form: 'Capsule',
              dosage: matchedHerb.dosage || '根据产品标签服用',
              usage: matchedHerb.usage_suggestions || '随餐服用'
            }
          ],
          
          safety_warnings: [
            matchedHerb.contraindications || '请遵循推荐剂量',
            '如有疑问请咨询医疗专业人士',
            '可能与某些药物相互作用'
          ],
          
          interactions: ['请咨询医生关于可能的药物相互作用'],
          
          scientific_evidence: matchedHerb.modern_applications || 'Research is ongoing to better understand the therapeutic benefits of this herb.',
          
          constitution_match: [
            {
              type: matchedHerb.constitution_type,
              suitable: 'yes' as const,
              description: `适合${matchedHerb.constitution_type}体质`
            }
          ],
          
          pairs_well_with: ['其他相应草药', '均衡饮食', '健康生活方式'],
          
          user_stories: [
            {
              quote: `I found ${matchedHerb.english_name} helpful for my wellness routine.`,
              author: 'Verified User',
              location: 'User Review'
            }
          ],
          
          faqs: [
            {
              question: `What is ${matchedHerb.english_name} used for?`,
              answer: `${matchedHerb.english_name} is traditionally used for ${matchedHerb.primary_effects?.[0] || 'various health purposes'}.`
            },
            {
              question: 'Is it safe to use daily?',
              answer: 'Please follow the recommended dosage and consult with a healthcare provider for personalized advice.'
            }
          ],
          
          seo_keywords: [matchedHerb.english_name.toLowerCase(), ...(matchedHerb.efficacy || [])],
          properties: matchedHerb.primary_effects || ['Natural Health Support']
        }
      }
    }
    
    if (!herbData) {
      console.log(`[API] 未找到草药: ${normalizedSlug}`)
      return NextResponse.json(
        {
          success: false,
          error: 'Herb not found',
          message: `No herb data found for slug: ${slug}`
        },
        { status: 404 }
      )
    }
    
    console.log(`[API] 成功返回草药数据: ${herbData.name}`)
    
    return NextResponse.json({
      success: true,
      data: herbData,
      meta: {
        slug,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }
    })
    
  } catch (error) {
    console.error('[API] 草药详情查询错误:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch herb details'
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
        overview: herb.overview.substring(0, 200) + '...'
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
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
} 