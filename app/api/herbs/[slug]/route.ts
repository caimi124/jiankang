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

  cinnamon: {
    id: 'cinnamon',
    name: 'Cinnamon',
    chinese_name: '肉桂',
    latin_name: 'Cinnamomum verum',
    slug: 'cinnamon',
    category: 'Digestive & Metabolic Support',
    evidence_level: 'Moderate',
    safety_level: 'medium',

    overview: 'Cinnamon is a warming spice traditionally used to support circulation, digestive comfort, and metabolic balance. It may help regulate blood sugar and ease cold-type abdominal discomfort.',

    benefits: [
      'Supports healthy blood sugar balance',
      'Warming digestive support',
      'May reduce bloating and discomfort',
      'Antioxidant and antimicrobial properties'
    ],

    active_compounds: 'Cinnamaldehyde, cinnamic acid, procyanidins, and essential oils with metabolic and antimicrobial effects.',

    traditional_uses: 'In TCM, cinnamon (Rou Gui/Gui Zhi variety context-dependent) warms the channels, supports yang, moves blood, and alleviates cold pain.',

    suitable_for: [
      'Cold-type digestive discomfort',
      'Mild blood sugar balance support',
      'Cold hands and feet with sluggish circulation'
    ],

    not_suitable_for: [
      'Heat signs or Yin deficiency with internal heat',
      'Pregnancy in high doses (culinary amounts generally safe)',
      'Ulcer or severe reflux (use cautiously)'
    ],

    dosage_forms: [
      { form: 'Powder/Capsule', dosage: '500–2000 mg/day', usage: 'Split doses with meals' },
      { form: 'Tea/Decoction', dosage: '1–3 g/day', usage: 'Simmer gently; drink warm' }
    ],

    safety_warnings: [
      'Cassia cinnamon may be higher in coumarin—avoid excessive use if liver concerns',
      'May interact with blood sugar medications'
    ],

    interactions: [
      'Antidiabetic medications (monitor glucose)',
      'Anticoagulants (high-dose cassia, theoretical risk)'
    ],

    scientific_evidence: 'Meta-analyses suggest modest improvements in fasting glucose and lipids with cinnamon supplementation; warming effects observed in traditional practice.',

    constitution_match: [
      { type: 'Cold Constitution', suitable: 'yes', description: 'Warming action helps dispel cold and support digestion' },
      { type: 'Yin Deficient/Heat', suitable: 'no', description: 'May aggravate heat and dryness' }
    ],

    pairs_well_with: ['Ginger', 'Cardamom', 'Black pepper (for thermogenic support)'],

    user_stories: [
      { quote: 'Adding cinnamon with meals helped stabilize my afternoon energy.', author: 'Verified User', location: 'Case Note' }
    ],

    faqs: [
      { question: 'Does cinnamon help with blood sugar?', answer: 'It may support healthy glucose metabolism; monitor if using medications.' },
      { question: 'Is daily cinnamon safe?', answer: 'Culinary amounts are generally safe; avoid high-dose cassia long-term.' }
    ],

    seo_keywords: [
      'cinnamon benefits','cinnamon blood sugar','cinnamaldehyde','warming spice','digestive support'
    ],
    properties: ['Warming','Metabolic Support','Digestive Comfort','Antioxidant']
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
  },

  'pumpkin-seeds': {
    id: 'pumpkin-seeds',
    name: 'Pumpkin Seeds',
    chinese_name: '南瓜子',
    latin_name: 'Cucurbita pepo',
    slug: 'pumpkin-seeds',
    category: "Men's Health & Hormone Balance",
    evidence_level: 'Moderate',
    safety_level: 'high',

    overview: 'Pumpkin seeds are nutrient-dense (zinc, magnesium, essential fatty acids) and traditionally used for prostate health, hair loss prevention, and hormone balance.',

    benefits: [
      'Prostate health and BPH symptom relief',
      'Hair loss prevention and regrowth support',
      'Hormone balance and menopause relief',
      'Sleep support (tryptophan)'
    ],

    active_compounds: 'Zinc, magnesium, phytosterols, essential fatty acids, tryptophan',

    traditional_uses: 'Used for prostate support, intestinal parasites, and women's hormonal balance.',

    suitable_for: [
      'Men with BPH symptoms',
      'Individuals with hair loss concerns',
      'Menopause-related symptoms or sleep issues'
    ],

    not_suitable_for: [
      'Seed/nut allergy',
      'Digestive upset at large amounts'
    ],

    dosage_forms: [
      { form: 'Raw seeds', dosage: '1–2 tbsp/day', usage: 'Snack or add to meals' },
      { form: 'Oil', dosage: '1–2 tsp/day', usage: 'Straight or with food' },
      { form: 'Powder/Extract', dosage: '1–2 g/day', usage: 'Follow label guidance' }
    ],

    safety_warnings: [
      'Allergic reactions are rare but possible',
      'Large amounts may cause digestive discomfort'
    ],

    interactions: [
      'Generally safe; monitor with prostate medications as needed'
    ],

    scientific_evidence: 'Phytosterols may modulate DHT; zinc supports prostate function; trials report urinary symptom improvements and hair regrowth signals.',

    constitution_match: [
      { type: 'Balanced or Deficient', suitable: 'yes', description: 'Nutritive and supportive' }
    ],

    pairs_well_with: ['Zinc-rich diet', 'Saw palmetto (for men's health)'],

    user_stories: [
      { quote: 'Daily pumpkin seeds reduced nighttime urination and improved sleep.', author: 'Verified User', location: 'Case Note' }
    ],

    faqs: [
      { question: 'Are pumpkin seeds good for prostate?', answer: 'Yes, due to zinc and phytosterols; clinical data support BPH symptom relief.' },
      { question: 'Can they help with hair loss?', answer: 'Zinc and phytosterols can support hair regrowth in some cases.' }
    ],

    seo_keywords: [
      'pumpkin seeds benefits','pumpkin seeds prostate','pumpkin seeds hair loss','cucurbita pepo'
    ],
    properties: ['Prostate Support','Hormone Balance','Nourishing','Sleep Support']
  },

  ashwagandha: {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    chinese_name: '印度人参',
    latin_name: 'Withania somnifera',
    slug: 'ashwagandha',
    category: 'Adaptogen & Stress Relief',
    evidence_level: 'Strong',
    safety_level: 'medium',
    
    overview: `Ashwagandha (Withania somnifera), also known as Indian ginseng or winter cherry, is one of the most powerful adaptogenic herbs in Ayurvedic medicine. For over 3,000 years, it has been used to help the body adapt to stress, restore energy, and support overall wellness.

Although not related to true ginseng, ashwagandha shares similar adaptogenic properties that help combat physical and mental fatigue, enhance resilience to stress, and support hormonal balance naturally.

Modern studies show that ashwagandha can lower cortisol levels (the stress hormone) by up to 27%, enhance mental focus, and promote calm energy without causing drowsiness. It's particularly effective for people dealing with chronic stress, poor sleep quality, burnout, or hormonal imbalances.

However, ashwagandha isn't for everyone. Your body type (constitution) matters. While it works amazingly for people with cold, deficient constitutions (always tired, cold hands/feet, pale complexion), it may cause overstimulation or insomnia in people with heat constitutions (hot-tempered, flushed face, night sweats).`,
    
    benefits: [
      'Reduces stress and anxiety by lowering cortisol levels naturally',
      'Improves sleep quality and supports deeper, more restful sleep',
      'Enhances physical energy and fights chronic fatigue and burnout',
      'Supports hormone balance including testosterone, thyroid, and cortisol',
      'Improves focus and mental clarity, especially during high stress or burnout',
      'Strengthens immune system function and resilience',
      'Supports healthy blood sugar metabolism and insulin sensitivity',
      'Enhances muscle strength, endurance, and post-workout recovery',
      'Supports reproductive health and libido in both men and women'
    ],
    
    active_compounds: `Ashwagandha's key bioactive constituents include withanolides, alkaloids, saponins, and withaferin A.

**Withanolides** are the main adaptogenic compounds that help regulate stress responses by modulating the HPA (hypothalamic-pituitary-adrenal) axis. They reduce cortisol production under chronic stress and help the body maintain homeostasis.

**Withaferin A** shows strong antioxidant and anti-inflammatory effects, protecting cells from oxidative damage and reducing inflammatory markers like COX-2 and TNF-alpha.

**Saponins** contribute to energy metabolism, immune modulation, and the herb's adaptogenic properties by supporting mitochondrial function.

**Alkaloids** support nervous system calming and enhance GABA (gamma-aminobutyric acid) activity in the brain, promoting relaxation without sedation.

Together, these compounds make ashwagandha a multi-functional herb that influences the endocrine, immune, and nervous systems simultaneously.`,
    
    traditional_uses: `In Ayurvedic medicine, ashwagandha is classified as a "Rasayana" — a rejuvenating tonic that nourishes both body and mind. It has been traditionally used for over 3,000 years to:

• **Restore vitality after illness or exhaustion** - Known as a recovery tonic for people recovering from chronic illness, surgery, or prolonged stress

• **Calm the mind and improve mental clarity** - Used by students and scholars to enhance memory, focus, and cognitive function

• **Support reproductive health and fertility** - Traditionally given to both men and women to enhance sexual vitality, improve sperm quality, and support healthy conception

• **Strengthen immunity and longevity** - Considered a longevity tonic that strengthens the body's resistance to disease and aging

• **Balance Vata dosha** - In Ayurvedic terms, it pacifies Vata (cold, anxious, depleted constitution) by providing warmth, stability, and grounding energy

In Traditional Chinese Medicine terms, ashwagandha would be categorized as a Qi and Yang tonic herb that warms and strengthens the body while calming the mind (Shen).`,
    
    suitable_for: [
      'People with chronic stress, anxiety, or persistently high cortisol levels',
      'Those experiencing poor sleep quality, stress-induced insomnia, or difficulty staying asleep',
      'Individuals with low energy, burnout, chronic fatigue, or adrenal fatigue',
      'Men and women seeking natural hormone balance support (thyroid, testosterone, cortisol)',
      'Athletes and active individuals looking for enhanced recovery and performance',
      'People recovering from illness, surgery, or prolonged physical/mental stress',
      'Qi Deficiency constitution: pale complexion, tired easily, weak voice, low immunity',
      'Yang Deficiency constitution: cold hands and feet, low body temperature, sluggish metabolism, poor circulation',
      'Blood Deficiency constitution: anxiety, insomnia, pale complexion, dizziness, heart palpitations',
      'People seeking a natural alternative to caffeine for sustained energy without jitters'
    ],
    
    not_suitable_for: [
      'Pregnant women (may cause uterine contractions or affect hormonal balance)',
      'Breastfeeding mothers (safety not established; may affect milk production)',
      'People with autoimmune disorders such as lupus, rheumatoid arthritis, or multiple sclerosis (may stimulate immune system activity)',
      'Those with hyperthyroidism or overactive thyroid (can increase thyroid hormone levels)',
      'Individuals with hormone-sensitive conditions including breast cancer, ovarian cancer, uterine cancer, or endometriosis (use only under medical supervision)',
      'People scheduled for surgery within 2 weeks (may interact with anesthesia or affect blood pressure)',
      'Yin Deficiency with Heat constitution: hot flashes, night sweats, irritability, flushed face, dry mouth, insomnia from feeling too hot',
      'Excess Heat constitution: strong temper, flushed red face, inflammatory conditions, prefers cold drinks',
      'People taking sedatives, immunosuppressants, or thyroid medications without medical supervision'
    ],
    
    dosage_forms: [
      {
        form: 'Root Powder',
        dosage: '3–6g daily (split into 2 doses)',
        usage: 'Traditional form; mix with warm milk, honey, or water; take with meals for best absorption'
      },
      {
        form: 'Standardized Extract (5% withanolides)',
        dosage: '300–600mg per day',
        usage: 'Most common supplement form; take with food; evening use for sleep support, morning for sustained energy'
      },
      {
        form: 'KSM-66® Extract',
        dosage: '300–500mg daily',
        usage: 'Clinically studied, full-spectrum root extract; best absorption when taken with healthy fats like nuts, avocado, or coconut oil'
      },
      {
        form: 'Sensoril® Extract',
        dosage: '125–250mg twice daily',
        usage: 'Contains both root and leaf; higher withaferin A content; particularly effective for stress and sleep'
      },
      {
        form: 'Gummies',
        dosage: 'Follow label (usually 300-500mg per serving)',
        usage: 'Convenient option; check sugar content and withanolide standardization'
      },
      {
        form: 'Tincture/Liquid Extract',
        dosage: '2–4ml (1:2 ratio) twice daily',
        usage: 'Fast absorption; mix with water or juice; alcohol-free options available'
      }
    ],
    
    safety_warnings: [
      'Start with half the recommended dose for 3-5 days to assess individual tolerance',
      'May cause mild digestive upset (nausea, diarrhea, stomach discomfort) in sensitive individuals — always take with food',
      'Can cause drowsiness or sedation — avoid driving or operating machinery if taken during the day until you know how it affects you',
      'May interact with sedatives, sleep medications, anti-anxiety medications, and thyroid medications',
      'Stop use at least 2 weeks before any scheduled surgery due to potential effects on blood pressure and anesthesia',
      'Use in cycles: 8-12 weeks on, then take 1-2 week break to prevent tolerance and maintain effectiveness',
      'Pregnant women should completely avoid use — may cause uterine contractions or affect fetal development',
      'If you have thyroid conditions, monitor thyroid function regularly as ashwagandha may alter thyroid hormone levels',
      'People with autoimmune conditions should consult a healthcare provider before use',
      'May increase body temperature slightly — not suitable for those who are always hot or have heat-related conditions'
    ],
    
    interactions: [
      'Sedatives and sleep medications (benzodiazepines, barbiturates, Ambien) — may increase drowsiness and sedative effects',
      'Thyroid medications (levothyroxine, Synthroid) — may increase thyroid hormone levels; monitor TSH regularly',
      'Immunosuppressants (prednisone, azathioprine, biologics) — may counteract immunosuppressive effects',
      'Blood sugar medications (metformin, insulin) — may cause hypoglycemia; monitor blood glucose levels closely',
      'Blood pressure medications — may lower blood pressure; monitor BP regularly',
      'Antidepressants and anti-anxiety medications (SSRIs, benzodiazepines) — may enhance or alter effects',
      'Alcohol — may increase sedative effects and drowsiness'
    ],
    
    scientific_evidence: `Ashwagandha is one of the most well-researched adaptogenic herbs, with over 3,000 published studies supporting its therapeutic benefits:

**Stress & Cortisol Reduction:**
• A 2019 study published in the *Journal of Alternative and Complementary Medicine* found that ashwagandha root extract (300mg twice daily) reduced cortisol levels by up to **27%** in chronically stressed adults over 8 weeks
• The *Indian Journal of Psychological Medicine* (2012) reported an **88% reduction in anxiety scores** after 60 days of ashwagandha supplementation (300mg twice daily)
• Multiple randomized controlled trials confirm significant improvements in perceived stress levels, anxiety symptoms, and overall quality of life

**Sleep Quality:**
• A 2020 study in *Nutrients* showed ashwagandha significantly improved sleep quality, sleep latency (time to fall asleep), and total sleep time in adults with insomnia
• *PLoS One* (2020) demonstrated that ashwagandha root extract improved sleep efficiency and reduced nighttime awakenings

**Hormone & Reproductive Health:**
• *Fertility and Sterility* (2010) found ashwagandha supplementation increased testosterone levels by **10-15%** in men with low T
• *Evidence-Based Complementary Medicine* (2015) reported a **167% increase in sperm count** and 53% increase in semen volume in infertile men
• *Journal of Evidence-Based Integrative Medicine* (2019) showed improved thyroid function in people with subclinical hypothyroidism

**Physical Performance & Muscle:**
• *Journal of Sports Medicine and Physical Fitness* (2015) demonstrated a **30% increase in muscle strength** over 8 weeks in resistance-trained men
• *Journal of Ayurveda and Integrative Medicine* (2015) found improved VO2 max and cardiorespiratory endurance in healthy athletic adults

**Mechanism of Action:**
Ashwagandha works primarily by regulating the HPA (hypothalamic-pituitary-adrenal) axis, which controls the body's stress response. It reduces excessive cortisol production, supports GABA and serotonin neurotransmitter activity, enhances mitochondrial energy production, and modulates inflammatory pathways.`,
    
    constitution_match: [
      {
        type: 'Qi Deficient (气虚)',
        suitable: 'yes',
        description: 'Ideal for those with pale complexion, chronic fatigue, weak voice, shortness of breath, and low immunity. Ashwagandha replenishes Qi (vital energy), strengthens the immune system, and restores vitality without overstimulation.'
      },
      {
        type: 'Yang Deficient (阳虚)',
        suitable: 'yes',
        description: 'Excellent for cold hands and feet, low body temperature, sluggish metabolism, poor circulation, and low libido. Ashwagandha\'s gentle warming properties tonify Yang energy, improve circulation, and support metabolic function.'
      },
      {
        type: 'Blood Deficient (血虚)',
        suitable: 'yes',
        description: 'Supports those with anxiety, insomnia, pale complexion, dizziness, heart palpitations, and dry skin. Nourishes Blood, calms the mind (Shen), and reduces anxiety-related sleep disturbances.'
      },
      {
        type: 'Balanced Constitution (平和质)',
        suitable: 'yes',
        description: 'Generally safe for balanced types experiencing temporary stress or fatigue. Supports healthy stress adaptation and immune function.'
      },
      {
        type: 'Yin Deficient with Heat (阴虚)',
        suitable: 'warning',
        description: 'Use with extreme caution. May worsen symptoms like hot flashes, night sweats, irritability, dry mouth, and heat sensations. Ashwagandha\'s warming nature can aggravate Yin deficiency heat. Consider cooling alternatives like Holy Basil or Chamomile instead.'
      },
      {
        type: 'Excess Heat Constitution (湿热质)',
        suitable: 'no',
        description: 'Avoid completely. If you have flushed red face, strong temper, inflammatory conditions, prefer cold drinks, or feel overheated frequently, ashwagandha will likely worsen these symptoms. Choose cooling, calming herbs like Holy Basil, Chamomile, or Passionflower.'
      },
      {
        type: 'Phlegm-Damp (痰湿质)',
        suitable: 'warning',
        description: 'May be suitable in small doses if combined with digestive herbs. Those with heavy body feeling, sluggish digestion, or excessive mucus should use cautiously and monitor for any worsening of dampness symptoms.'
      }
    ],
    
    pairs_well_with: [
      'Rhodiola Rosea — enhanced stress resilience and mental clarity without overstimulation',
      'Holy Basil (Tulsi) — deeper calming effects and immune support; balances ashwagandha\'s warming nature',
      'L-Theanine — relaxed focus without drowsiness; excellent for daytime stress management',
      'Magnesium Glycinate — improved sleep quality, muscle relaxation, and stress reduction',
      'Black Pepper (Piperine) — significantly increases absorption and bioavailability of withanolides',
      'Ginger — warming digestive support; enhances circulation and absorption',
      'Cordyceps — athletic performance enhancement and stamina building',
      'Reishi Mushroom — immune support and deeper sleep quality',
      'Schisandra Berry — liver support and additional adaptogenic benefits'
    ],
    
    user_stories: [
      {
        quote: 'After taking ashwagandha before bed for 3 weeks, my sleep quality improved dramatically. I wake up feeling actually refreshed now, not groggy like I used to. My stress levels during the day are also much more manageable.',
        author: 'Sarah M., 34',
        location: 'Portland, OR'
      },
      {
        quote: 'I replaced my second cup of coffee with ashwagandha in the morning. The difference is amazing — I have steady energy all day without the jitters or afternoon crash. My anxiety is also way down.',
        author: 'Michael T., 42',
        location: 'London, UK'
      },
      {
        quote: 'As someone dealing with adrenal fatigue and hormone imbalance, ashwagandha has been a complete game-changer. My energy is back, my periods are regular again, and I just feel like myself for the first time in years.',
        author: 'Jessica L., 29',
        location: 'Toronto, Canada'
      },
      {
        quote: 'I was skeptical at first, but after doing the constitution test and learning I\'m a Qi Deficient type, I tried ashwagandha. It\'s been 6 weeks and my immune system is stronger — I haven\'t gotten sick once this winter.',
        author: 'David K., 38',
        location: 'Sydney, Australia'
      }
    ],
    
    faqs: [
      {
        question: 'Can ashwagandha help with anxiety and stress?',
        answer: 'Yes, absolutely. Multiple clinical studies show ashwagandha significantly reduces anxiety and stress by lowering cortisol levels and supporting neurotransmitter balance (especially GABA and serotonin). A 2012 study found up to 88% improvement in anxiety scores after 60 days of consistent use. It works best for people with anxiety related to chronic stress, overthinking, or burnout.'
      },
      {
        question: 'How long does it take to feel results from ashwagandha?',
        answer: 'Most users notice initial improvements within 2-4 weeks of consistent daily use, with maximum benefits typically seen at 8-12 weeks. Some people feel calming effects within the first week, while energy and hormonal benefits take longer. Consistency is key — taking it daily at the same time yields the best results.'
      },
      {
        question: 'Can I take ashwagandha with coffee or caffeine?',
        answer: 'It\'s safe to take together, but not ideal for everyone. Caffeine may reduce ashwagandha\'s calming benefits. For best results, take ashwagandha in the evening (for sleep and stress) and coffee in the morning (for alertness), keeping them separated by several hours. Some people successfully replace their second cup of coffee with morning ashwagandha for sustained energy without jitters.'
      },
      {
        question: 'Is ashwagandha safe for daily long-term use?',
        answer: 'Generally yes, when taken in recommended doses (300-600mg extract or 3-6g powder daily). However, best practice is to use ashwagandha in cycles: 8-12 weeks on, then take a 1-2 week break to prevent tolerance and maintain effectiveness. Always consult your healthcare provider if you have medical conditions, take medications, or plan to use it long-term.'
      },
      {
        question: 'Does ashwagandha cause weight gain?',
        answer: 'No, ashwagandha does not cause weight gain. In fact, it may support healthy weight loss by reducing stress-related eating and balancing cortisol levels (high cortisol promotes belly fat storage). Some studies show modest weight reduction in chronically stressed individuals. Any weight changes are likely due to improved stress management, better sleep, and reduced emotional eating.'
      },
      {
        question: 'Can ashwagandha help with hormonal imbalance?',
        answer: 'Yes, ashwagandha is excellent for hormone balance. It supports healthy hormone levels by regulating the HPA (hypothalamic-pituitary-adrenal) axis, which controls stress hormones, thyroid function, and reproductive hormones. Studies show improvements in thyroid function (especially subclinical hypothyroidism), testosterone levels in men (10-15% increase), and menstrual regularity in women. It works particularly well for hormone imbalances caused by chronic stress.'
      },
      {
        question: 'What\'s the difference between ashwagandha and ginseng?',
        answer: 'Both are adaptogens, but they work differently: Ashwagandha is more calming and grounding — better for stress, anxiety, and sleep. It has a warming but not overly stimulating effect. Ginseng (especially Panax ginseng) is more energizing and stimulating — better for physical performance, mental focus, and fatigue. Ginseng is more "yang" while ashwagandha is more balanced. Choose based on your needs: ashwagandha for calm energy, ginseng for active energy.'
      },
      {
        question: 'When should I NOT take ashwagandha?',
        answer: 'Avoid ashwagandha if you are pregnant, have autoimmune disorders (lupus, RA, MS), hyperthyroidism, or are scheduled for surgery within 2 weeks. Also, people with "heat constitution" (hot flashes, night sweats, flushed face, irritability, always hot) should avoid it as the warming properties may worsen symptoms. Always consult your healthcare provider if you have medical conditions or take medications (especially thyroid meds, immunosuppressants, or sedatives).'
      },
      {
        question: 'Can ashwagandha help with muscle growth and athletic performance?',
        answer: 'Yes! Clinical studies show ashwagandha can significantly enhance muscle strength, size, and recovery — especially when combined with resistance training. An 8-week study found a 30% increase in muscle strength in men taking ashwagandha while weight training. It works by reducing exercise-induced muscle damage, lowering cortisol (which breaks down muscle), and potentially supporting testosterone levels.'
      },
      {
        question: 'Are there different types of ashwagandha supplements?',
        answer: 'Yes. The most common are: (1) KSM-66® — full-spectrum root extract, most clinically studied, 5% withanolides; (2) Sensoril® — contains both root and leaf, higher withaferin A, good for stress and sleep; (3) Generic root powder — traditional form, variable potency; (4) Root extract standardized to 5% withanolides — good quality-to-price ratio. KSM-66 and Sensoril are premium options with consistent results.'
      }
    ],
    
    seo_keywords: [
      'ashwagandha benefits',
      'ashwagandha side effects',
      'how to take ashwagandha safely',
      'ashwagandha for stress and anxiety',
      'ashwagandha sleep support',
      'ashwagandha hormone balance',
      'ashwagandha for hormonal imbalance',
      'Indian ginseng',
      'winter cherry',
      'withania somnifera benefits',
      'ashwagandha dosage guide',
      'ashwagandha before bed',
      'when not to take ashwagandha',
      'ashwagandha side effects for male',
      'ashwagandha side effects for female',
      'side effects of ashwagandha on females',
      'ashwagandha negative side effects',
      'natural stress relief herbs',
      'adaptogen herbs',
      'best herbs for stress and anxiety',
      'ashwagandha and weight loss',
      'ashwagandha muscle growth',
      'ashwagandha testosterone',
      'ashwagandha cortisol',
      'how to safely take ashwagandha',
      'ashwagandha benefits for men',
      'ashwagandha benefits for women',
      'ashwagandha constitution type',
      'best time to take ashwagandha',
      'ashwagandha vs ginseng',
      'KSM-66 ashwagandha',
      'ashwagandha for burnout',
      'adaptogen for beginners',
      'herbal stress relief'
    ],
    
    properties: [
      'Adaptogenic',
      'Stress Relief',
      'Sleep Support',
      'Hormone Balance',
      'Energy Restoration',
      'Immune Support',
      'Anti-anxiety',
      'Neuroprotective',
      'Anti-inflammatory',
      'Antioxidant'
    ]
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
    // 别名与常见变体归一
    const aliasMap: Record<string, string> = {
      'pumpkin-seed': 'pumpkin-seeds',
      'pumpkinseeds': 'pumpkin-seeds',
      'pumpkin seeds': 'pumpkin-seeds',
      'pumpkin_seed': 'pumpkin-seeds',
      'cinnamomum': 'cinnamon',
      'cloves': 'clove'
    }
    const canonicalSlug = aliasMap[normalizedSlug] || normalizedSlug
    
    console.log(`[API] 查询草药详情: ${canonicalSlug}`)
    
    // 优先从 Notion 读取
    let herbData = await fetchHerbFromNotionBySlug(canonicalSlug)
      .catch(() => null) as any
    
    // 兼容旧数据：未命中 Notion 时回退到内置常量
    if (!herbData) {
      herbData = HERB_DETAIL_DATA[canonicalSlug as keyof typeof HERB_DETAIL_DATA]
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
        return herbSlug === canonicalSlug || 
               herb.english_name.toLowerCase().includes(canonicalSlug) ||
               herb.chinese_name.includes(canonicalSlug)
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