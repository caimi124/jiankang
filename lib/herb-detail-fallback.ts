export type HerbDetail = {
  id: string
  name: string
  chinese_name: string
  latin_name: string
  slug: string
  category: string
  evidence_level: 'Moderate' | 'Strong' | 'Preliminary'
  safety_level: 'low' | 'medium' | 'high'
  overview: string
  benefits: string[]
  active_compounds: string
  traditional_uses: string
  suitable_for: string[]
  not_suitable_for: string[]
  dosage_forms: Array<{ form: string; dosage: string; usage: string }>
  safety_warnings: string[]
  interactions: string[]
  scientific_evidence: string
  constitution_match: Array<{ type: string; suitable: 'yes' | 'no' | 'warning'; description: string }>
  pairs_well_with: string[]
  user_stories: Array<{ quote: string; author?: string; location?: string }>
  faqs: Array<{ question: string; answer: string }>
  seo_keywords: string[]
  properties: string[]
}

export const HERB_DETAIL_FALLBACK: Record<string, HerbDetail> = {
  clove: {
    id: 'clove',
    name: 'Clove',
    chinese_name: '丁香',
    latin_name: 'Syzygium aromaticum',
    slug: 'clove',
    category: 'Digestive & Antimicrobial',
    evidence_level: 'Moderate',
    safety_level: 'medium',
    overview: 'Clove is a warming spice that supports oral health, digestive comfort, and provides natural antimicrobial benefits. Perfect for winter wellness and digestive support.',
    benefits: [
      'Natural oral health support - reduces tooth pain and freshens breath',
      'Digestive warming - helps with cold stomach and poor appetite',
      'Anti-nausea effects - great for motion sickness and morning discomfort',
      'Antimicrobial properties - supports immune system naturally'
    ],
    active_compounds: 'Eugenol (natural pain reliever), tannins, flavonoids',
    traditional_uses: 'Used in Traditional Chinese Medicine to warm the stomach and relieve digestive cold. In Ayurveda, clove helps balance Kapha and Vata.',
    suitable_for: [
      'People with cold hands and feet who need warming herbs',
      'Those with poor appetite and sluggish digestion',
      'Winter wellness support and seasonal immune boost',
      'Natural oral care and dental health maintenance',
      'Motion sickness and travel nausea relief'
    ],
    not_suitable_for: [
      'People with hot constitution who overheat easily',
      'Pregnant women (in medicinal doses)',
      'Those with stomach ulcers or acid reflux',
      'People taking blood thinning medications without supervision'
    ],
    dosage_forms: [
      { form: 'Clove Tea (whole cloves)', dosage: '2-3 whole cloves per cup', usage: 'Steep in hot water for 10 minutes, drink warm before meals for digestion' },
      { form: 'Clove Oil (diluted)', dosage: '1-2 drops in carrier oil', usage: 'Apply to tooth or gums for pain relief (avoid swallowing)' },
      { form: 'Ground Clove Powder', dosage: '1/4 teaspoon daily', usage: 'Add to warm milk, tea, or cooking for digestive support' }
    ],
    safety_warnings: [
      'Never use undiluted clove oil internally',
      'High doses may cause liver damage',
      'Can interact with blood thinning medications',
      'May cause allergic reactions in sensitive individuals'
    ],
    interactions: ['Anticoagulant medications (warfarin)', 'Diabetes medications'],
    scientific_evidence: 'Clinical studies show clove oil is effective for dental pain relief. In vitro studies confirm strong antimicrobial activity against oral bacteria.',
    constitution_match: [
      { type: 'Cold Constitution (Yang Deficient)', suitable: 'yes', description: 'Perfect for people who feel cold easily, have poor circulation, and sluggish digestion' },
      { type: 'Hot Constitution (Yang Excess)', suitable: 'no', description: 'Avoid if you overheat easily, have high blood pressure, or acid reflux' }
    ],
    pairs_well_with: ['Ginger (for digestive warming)', 'Cinnamon (for circulation)', 'Cardamom (for breath freshening)'],
    user_stories: [
      { quote: 'I use clove tea when I have stomach discomfort from eating cold foods. It warms me up and helps with digestion within 20 minutes.', author: 'Sarah M.', location: 'Vermont, USA' },
      { quote: 'Clove oil saved me during a dental emergency. Applied diluted oil to my tooth and the pain relief was immediate.', author: 'David L.', location: 'Toronto, Canada' }
    ],
    faqs: [
      { question: 'How quickly does clove work for tooth pain?', answer: 'Clove oil typically provides pain relief within 10-15 minutes when applied topically to the affected tooth. Always dilute with a carrier oil first.' },
      { question: 'Can I drink clove tea every day?', answer: 'Yes, 1-2 cups of mild clove tea daily is generally safe for most people. Avoid if you have hot constitution or take blood thinners.' },
      { question: 'Is clove safe during pregnancy?', answer: 'Culinary amounts are safe, but avoid medicinal doses during pregnancy. Consult your healthcare provider first.' },
      { question: 'What\'s the difference between clove oil and clove tea?', answer: 'Clove oil is concentrated and used externally for pain relief. Clove tea is milder and safe for internal use for digestive support.' }
    ],
    seo_keywords: ['clove benefits', 'clove oil tooth pain', 'clove tea digestion', 'natural oral health', 'eugenol benefits'],
    properties: ['Warming', 'Antibacterial', 'Pain-relieving', 'Digestive stimulant']
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
    overview: 'Cinnamon is a beloved warming spice that naturally supports healthy blood sugar levels, improves circulation, and aids digestion. Perfect for daily wellness and winter comfort.',
    benefits: [
      'Blood sugar support - helps maintain healthy glucose levels after meals',
      'Warming circulation - great for cold hands and feet',
      'Digestive comfort - reduces bloating and supports healthy digestion',
      'Antioxidant protection - fights free radicals and supports aging well'
    ],
    active_compounds: 'Cinnamaldehyde (warming compound), procyanidins (antioxidants), coumarin',
    traditional_uses: 'In Traditional Chinese Medicine, cinnamon warms the kidney yang and dispels cold. Ayurveda uses it to balance Kapha and improve circulation.',
    suitable_for: [
      'People with cold constitution who need warming support',
      'Those managing blood sugar levels naturally (with medical supervision)',
      'People with poor circulation and cold extremities',
      'Winter wellness and seasonal comfort',
      'Digestive support for cold-type stomach discomfort'
    ],
    not_suitable_for: [
      'People with hot constitution or inflammatory conditions',
      'Those with liver disease (avoid high doses of Cassia cinnamon)',
      'Pregnant women (in medicinal doses)',
      'People taking diabetes medications without medical supervision'
    ],
    dosage_forms: [
      { form: 'Ceylon Cinnamon Powder', dosage: '1/2 to 1 teaspoon daily', usage: 'Add to oatmeal, smoothies, or tea for blood sugar support' },
      { form: 'Cinnamon Capsules', dosage: '500-1000 mg daily', usage: 'Take with meals for metabolic support' },
      { form: 'Cinnamon Stick Tea', dosage: '1 stick per cup', usage: 'Simmer for 10 minutes, drink warm for circulation' }
    ],
    safety_warnings: [
      'Cassia cinnamon contains coumarin - limit to 1 tsp daily',
      'Ceylon cinnamon is safer for daily use',
      'Can enhance diabetes medication effects',
      'High doses may cause liver stress'
    ],
    interactions: ['Diabetes medications (may enhance effects)', 'Blood thinning medications'],
    scientific_evidence: 'Multiple clinical trials show cinnamon can help lower fasting blood glucose by 10-29%. Meta-analyses confirm modest but consistent blood sugar benefits.',
    constitution_match: [
      { type: 'Cold Constitution (Yang Deficient)', suitable: 'yes', description: 'Excellent for people who feel cold, have poor circulation, and need metabolic warming' },
      { type: 'Hot Constitution (Yin Deficient)', suitable: 'warning', description: 'Use small amounts only - may aggravate heat symptoms' }
    ],
    pairs_well_with: ['Ginger (for digestion)', 'Cardamom (for circulation)', 'Turmeric (for inflammation)'],
    user_stories: [
      { quote: 'Adding Ceylon cinnamon to my morning oatmeal helped stabilize my blood sugar naturally. My doctor was impressed with my lab results!', author: 'Maria R.', location: 'California, USA' },
      { quote: 'Cinnamon tea is my winter comfort drink. It warms me up from the inside and helps with my cold hands and feet.', author: 'James K.', location: 'Minnesota, USA' }
    ],
    faqs: [
      { question: 'What\'s the difference between Ceylon and Cassia cinnamon?', answer: 'Ceylon cinnamon is sweeter and safer for daily use. Cassia contains more coumarin which can be harmful in large amounts. Ceylon is better for regular consumption.' },
      { question: 'How long does it take to see blood sugar benefits?', answer: 'Some people notice effects within a few days, but consistent benefits typically develop over 2-6 weeks of regular use.' },
      { question: 'Can I use cinnamon if I take diabetes medication?', answer: 'Always consult your doctor first, as cinnamon can enhance medication effects and may require dosage adjustments.' },
      { question: 'How much cinnamon is safe daily?', answer: 'For Ceylon cinnamon: 1-2 teaspoons daily is safe. For Cassia cinnamon: limit to 1/2 teaspoon daily due to coumarin content.' }
    ],
    seo_keywords: ['cinnamon blood sugar', 'Ceylon vs Cassia cinnamon', 'cinnamon circulation', 'natural blood sugar support'],
    properties: ['Warming', 'Metabolic Support', 'Circulation enhancing', 'Antioxidant']
  },
  'pumpkin-seeds': {
    id: 'pumpkin-seeds',
    name: 'Pumpkin Seeds',
    chinese_name: '南瓜子',
    latin_name: 'Cucurbita pepo',
    slug: 'pumpkin-seeds',
    category: 'Men’s Health & Hormone Balance',
    evidence_level: 'Moderate',
    safety_level: 'high',
    overview: 'Pumpkin seeds are nutritional powerhouses packed with zinc, magnesium, and healthy fats. Traditionally valued for men\'s health, prostate support, and overall vitality.',
    benefits: [
      'Prostate health support - rich in zinc and compounds that support urinary flow',
      'Sleep quality improvement - magnesium helps with relaxation and better sleep',
      'Heart health support - healthy fats and magnesium support cardiovascular function',
      'Immune system boost - high zinc content supports immune function'
    ],
    active_compounds: 'Zinc (prostate health), magnesium (sleep/muscle), phytosterols (cholesterol), essential fatty acids (inflammation)',
    traditional_uses: 'Traditional folk medicine used pumpkin seeds for parasites, prostate health, and urinary support. Native Americans valued them for nutrition and vitality.',
    suitable_for: [
      'Men over 40 looking for natural prostate support',
      'People with sleep difficulties or restless nights',
      'Those needing immune system support (high zinc)',
      'Heart health and cholesterol management',
      'Athletes and active individuals (magnesium for muscle recovery)'
    ],
    not_suitable_for: [
      'People with seed or nut allergies',
      'Those on blood thinning medications (consult doctor)',
      'People with digestive sensitivity to high-fat foods'
    ],
    dosage_forms: [
      { form: 'Raw Pumpkin Seeds', dosage: '1-2 tablespoons (28g) daily', usage: 'Eat as snack or add to salads, yogurt, smoothies' },
      { form: 'Pumpkin Seed Oil', dosage: '1 tablespoon daily', usage: 'Take with meals or add to salad dressing' },
      { form: 'Roasted Seeds', dosage: '1/4 cup daily', usage: 'Light roasting preserves nutrients while improving taste' }
    ],
    safety_warnings: [
      'Start with small amounts to avoid digestive upset',
      'Store in cool, dry place to prevent rancidity',
      'Choose organic when possible to avoid pesticides'
    ],
    interactions: ['Blood thinning medications (mild effect)', 'Diabetes medications (may lower blood sugar slightly)'],
    scientific_evidence: 'Clinical studies show pumpkin seed oil can improve urinary symptoms in men with BPH. Research confirms high bioavailable zinc content supports prostate health.',
    constitution_match: [
      { type: 'All Constitutions', suitable: 'yes', description: 'Nutritive and balancing for most people - rich in essential minerals' },
      { type: 'Kidney Yang Deficiency', suitable: 'yes', description: 'Especially beneficial for kidney and reproductive health support' }
    ],
    pairs_well_with: ['Saw palmetto (prostate health)', 'Magnesium supplements (sleep)', 'Omega-3 rich foods (inflammation)'],
    user_stories: [
      { quote: 'Started eating a handful of pumpkin seeds daily for prostate health. Within 3 months, my nighttime bathroom trips decreased significantly.', author: 'Robert M.', location: 'Texas, USA' },
      { quote: 'Pumpkin seeds became my evening snack for better sleep. The magnesium really helps me relax and sleep more deeply.', author: 'Linda S.', location: 'Oregon, USA' }
    ],
    faqs: [
      { question: 'How long does it take to see prostate health benefits?', answer: 'Most men notice improvements in urinary flow and nighttime frequency within 6-12 weeks of consistent daily use.' },
      { question: 'Should I eat raw or roasted pumpkin seeds?', answer: 'Raw seeds retain all nutrients. Light roasting is fine and improves taste, but avoid heavily salted or over-roasted varieties.' },
      { question: 'Can women benefit from pumpkin seeds too?', answer: 'Absolutely! Women benefit from the zinc (immune support), magnesium (PMS relief), and healthy fats (heart health).' },
      { question: 'How should I store pumpkin seeds?', answer: 'Store in airtight container in refrigerator for up to 3 months, or freeze for longer storage. Fresh seeds should smell sweet, not rancid.' }
    ],
    seo_keywords: ['pumpkin seeds prostate health', 'pumpkin seeds benefits men', 'zinc rich foods', 'natural sleep support'],
    properties: ['Nourishing', 'Prostate Support', 'Sleep-promoting', 'Immune-boosting']
  },
  ginger: {
    id: 'ginger',
    name: 'Ginger',
    chinese_name: '生姜',
    latin_name: 'Zingiber officinale',
    slug: 'ginger',
    category: 'Digestive & Anti-Nausea',
    evidence_level: 'Strong',
    safety_level: 'high',
    overview: 'Ginger is one of the most researched herbs for nausea relief and digestive support. Perfect for motion sickness, pregnancy nausea, and daily digestive wellness.',
    benefits: [
      'Motion sickness and nausea relief - clinically proven for travel and pregnancy',
      'Digestive warming - stimulates digestion and reduces bloating',
      'Circulation support - warms cold hands and feet naturally',
      'Anti-inflammatory effects - may help reduce muscle soreness'
    ],
    active_compounds: 'Gingerols (anti-nausea), shogaols (warming), zingiberene (digestive)',
    traditional_uses: 'TCM uses ginger to warm the stomach and dispel cold. Ayurveda values it for improving digestive fire (Agni) and circulation.',
    suitable_for: [
      'Pregnant women experiencing morning sickness (consult doctor)',
      'Travelers prone to motion sickness and jet lag',
      'People with cold constitution and poor circulation',
      'Those with sluggish digestion and bloating after meals',
      'Winter wellness and seasonal immune support'
    ],
    not_suitable_for: [
      'People with hot constitution or inflammatory conditions',
      'Those with gallstones (may stimulate bile production)',
      'People taking blood thinning medications without supervision',
      'High doses during pregnancy (stick to food amounts)'
    ],
    dosage_forms: [
      { form: 'Fresh Ginger Tea', dosage: '1-2 slices per cup', usage: 'Steep in hot water for 10 minutes, drink for nausea or digestion' },
      { form: 'Ginger Capsules', dosage: '250-1000 mg daily', usage: 'Take before travel or with meals for digestive support' },
      { form: 'Crystallized Ginger', dosage: '2-3 pieces daily', usage: 'Chew for motion sickness or add to tea' }
    ],
    safety_warnings: [
      'May increase bleeding risk at high doses',
      'Can interact with blood thinning medications',
      'High doses may cause heartburn in sensitive individuals'
    ],
    interactions: ['Anticoagulant medications', 'Diabetes medications (may lower blood sugar)'],
    scientific_evidence: 'Over 100 clinical trials confirm ginger\'s effectiveness for nausea. Systematic reviews show it\'s as effective as anti-nausea medications with fewer side effects.',
    constitution_match: [
      { type: 'Cold Constitution (Yang Deficient)', suitable: 'yes', description: 'Perfect for people who feel cold, have poor digestion, and need warming support' },
      { type: 'Hot Constitution (Yin Deficient)', suitable: 'warning', description: 'Use fresh ginger in small amounts only - dried ginger may be too warming' }
    ],
    pairs_well_with: ['Lemon (for nausea)', 'Honey (for sore throat)', 'Turmeric (for inflammation)'],
    user_stories: [
      { quote: 'Ginger tea saved my pregnancy! Used it for morning sickness and it worked better than any medication with no side effects.', author: 'Emily R.', location: 'Seattle, USA' },
      { quote: 'I always pack ginger capsules when traveling. No more motion sickness on flights or long car rides!', author: 'Tom H.', location: 'Sydney, Australia' }
    ],
    faqs: [
      { question: 'How quickly does ginger work for nausea?', answer: 'Ginger typically works within 15-30 minutes for acute nausea. For motion sickness, take 30 minutes before travel for best results.' },
      { question: 'Is ginger safe during pregnancy?', answer: 'Yes, ginger is generally safe for pregnancy nausea. Use 1-2 grams daily maximum and consult your healthcare provider first.' },
      { question: 'Fresh vs. dried ginger - which is better?', answer: 'Fresh ginger is milder and better for nausea. Dried ginger is more warming and better for circulation and cold conditions.' },
      { question: 'Can I take ginger with blood thinners?', answer: 'Ginger may enhance blood thinning effects. Always consult your doctor before combining with anticoagulant medications.' }
    ],
    seo_keywords: ['ginger nausea relief', 'ginger motion sickness', 'ginger pregnancy morning sickness', 'natural digestive support'],
    properties: ['Warming', 'Anti-nausea', 'Digestive stimulant', 'Circulation enhancing']
  },
  turmeric: {
    id: 'turmeric',
    name: 'Turmeric',
    chinese_name: '姜黄',
    latin_name: 'Curcuma longa',
    slug: 'turmeric',
    category: 'Anti-Inflammatory & Pain Relief',
    evidence_level: 'Strong',
    safety_level: 'medium',
    overview: 'Turmeric is nature\'s most researched anti-inflammatory herb. Excellent for joint pain, digestive health, and overall wellness support.',
    benefits: [
      'Joint pain and arthritis relief - reduces inflammation naturally',
      'Digestive health support - soothes stomach and supports liver function',
      'Antioxidant protection - fights free radicals and supports healthy aging',
      'Heart health support - may help maintain healthy cholesterol levels'
    ],
    active_compounds: 'Curcumin (anti-inflammatory), turmerones (liver support), demethoxycurcumin (antioxidant)',
    traditional_uses: 'Ayurveda calls turmeric the "golden spice" for its healing properties. Used for wounds, digestion, and purification. TCM uses it to move blood and reduce pain.',
    suitable_for: [
      'People with joint pain and arthritis symptoms',
      'Those seeking natural anti-inflammatory support',
      'Digestive health and liver support',
      'Heart health and cholesterol management',
      'Active individuals for exercise recovery'
    ],
    not_suitable_for: [
      'People with gallstones or bile duct obstruction',
      'Those taking blood thinning medications without supervision',
      'People scheduled for surgery (stop 2 weeks before)',
      'Those with iron deficiency (may reduce iron absorption)'
    ],
    dosage_forms: [
      { form: 'Turmeric with Black Pepper', dosage: '500-1000 mg daily', usage: 'Take with meals - black pepper increases absorption by 2000%' },
      { form: 'Golden Milk (Turmeric Latte)', dosage: '1 tsp turmeric powder', usage: 'Mix with warm milk and spices, drink before bed for relaxation' },
      { form: 'Fresh Turmeric Root', dosage: '1-2 inches daily', usage: 'Grate into smoothies, cooking, or tea' }
    ],
    safety_warnings: [
      'May increase bleeding risk at high doses',
      'Can cause stomach upset on empty stomach',
      'May interact with diabetes and blood pressure medications'
    ],
    interactions: ['Anticoagulant medications', 'Diabetes medications', 'Iron supplements (reduces absorption)'],
    scientific_evidence: 'Over 3000 studies on curcumin. Clinical trials show significant benefits for osteoarthritis pain, comparable to NSAIDs but with fewer side effects.',
    constitution_match: [
      { type: 'Hot/Inflammatory Constitution', suitable: 'yes', description: 'Excellent cooling and anti-inflammatory properties for hot, inflamed conditions' },
      { type: 'Cold Constitution', suitable: 'warning', description: 'Use with warming spices like ginger to balance cooling nature' }
    ],
    pairs_well_with: ['Black pepper (absorption)', 'Ginger (warming)', 'Boswellia (joint health)'],
    user_stories: [
      { quote: 'After 3 months of daily turmeric with black pepper, my knee pain from arthritis decreased by 70%. No more daily pain pills!', author: 'Margaret K.', location: 'Florida, USA' },
      { quote: 'Golden milk with turmeric is my nightly ritual. Helps with muscle recovery after workouts and I sleep better.', author: 'Carlos M.', location: 'California, USA' }
    ],
    faqs: [
      { question: 'Why do I need black pepper with turmeric?', answer: 'Black pepper contains piperine which increases curcumin absorption by up to 2000%. Without it, most curcumin passes through unabsorbed.' },
      { question: 'How long before I see results from turmeric?', answer: 'Some people notice reduced inflammation within days, but significant joint pain relief typically takes 4-8 weeks of consistent use.' },
      { question: 'Can I take turmeric with other medications?', answer: 'Turmeric can interact with blood thinners and diabetes medications. Always consult your healthcare provider before starting.' },
      { question: 'What\'s the best way to absorb turmeric?', answer: 'Take with black pepper and healthy fats (like coconut oil) for maximum absorption. Heat also increases bioavailability.' }
    ],
    seo_keywords: ['turmeric curcumin benefits', 'turmeric joint pain', 'turmeric anti-inflammatory', 'golden milk recipe'],
    properties: ['Anti-inflammatory', 'Antioxidant', 'Pain-relieving', 'Liver-supporting']
  }
}

export function getFallbackHerb(slug: string): HerbDetail | null {
  let key = slug.toLowerCase().trim()
  
  // Handle URL aliases for fallback herbs
  const aliases: Record<string, string> = {
    'pumpkin-seed': 'pumpkin-seeds',
    'pumpkinseeds': 'pumpkin-seeds',
    'pumpkin_seed': 'pumpkin-seeds',
    'pumpkin seeds': 'pumpkin-seeds',
    'cloves': 'clove'
  }
  
  // Apply alias mapping
  if (aliases[key]) {
    key = aliases[key]
  }
  
  return HERB_DETAIL_FALLBACK[key] || null
}

// Add Rhodiola Crenulata to fallback
HERB_DETAIL_FALLBACK['rhodiola-crenulata'] = {
  id: 'rhodiola-crenulata-herb-005',
  name: 'Rhodiola Crenulata',
  chinese_name: '红景天',
  latin_name: 'Rhodiola crenulata',
  slug: 'rhodiola-crenulata',
  category: 'Adaptogen & Energy Support',
  evidence_level: 'Moderate',
  safety_level: 'high',
  overview: 'Rhodiola Crenulata (also called Arctic Root or Golden Root) is a powerful adaptogen herb that provides natural sustained energy without caffeine crash, reduces stress and anxiety, enhances mental clarity and focus, and supports metabolism and weight management. This rhodiola supplement is particularly effective for chronic fatigue, work-related stress, athletic performance, and altitude sickness prevention.',
  benefits: [
    'Natural sustained energy boost - No caffeine jitters or crash',
    'Stress and anxiety relief - Balances cortisol levels naturally',
    'Mental clarity and focus - Improves cognitive performance under pressure',
    'Weight management support - Helps with stress-related weight gain and fat loss',
    'Physical stamina enhancement - Boosts endurance and reduces fatigue',
    'Altitude sickness prevention - Traditional use for high-altitude adaptation',
    'Mood stability - Supports emotional balance and resilience'
  ],
  active_compounds: 'Salidroside (3% standardized) - primary adaptogenic compound; Rosavin (1%) - enhances mental clarity; Tyrosol - antioxidant; Flavonoids - cardiovascular support; Organic acids - cellular energy metabolism',
  traditional_uses: 'In Traditional Chinese Medicine and Tibetan medicine, Rhodiola (Hong Jing Tian) has been used for centuries by high-altitude dwellers to combat fatigue, improve stamina, and enhance mental clarity. Traditionally prescribed for Qi-deficient, Phlegm-Damp, and Qi-Stagnation constitutions to tonify Qi, invigorate blood circulation, and calm the mind.',
  suitable_for: [
    'People with chronic fatigue and low energy (Qi deficiency)',
    'Those experiencing work-related stress and burnout',
    'Athletes seeking enhanced endurance and performance',
    'Individuals with stress-related weight gain or slow metabolism',
    'People traveling to high altitudes (altitude sickness prevention)',
    'Those with anxiety and mood instability',
    'Individuals needing better focus and mental clarity'
  ],
  not_suitable_for: [
    'Pregnant or breastfeeding women',
    'People with Yang-excess or Heat-type constitution (easily irritated, red face, very hot body)',
    'Those with bipolar disorder or severe anxiety disorders',
    'People taking antidepressants (SSRIs, MAOIs) without doctor supervision',
    'Individuals with autoimmune conditions (may stimulate immune system)'
  ],
  dosage_forms: [
    { form: 'Rhodiola Extract (3% salidroside)', dosage: '200-400mg daily', usage: 'Take with breakfast. Start at 200mg for 1 week, increase gradually. Cycle usage: 6-8 weeks on, 1 week off' },
    { form: 'Rhodiola Root Powder', dosage: '1/2-1 teaspoon daily', usage: 'Mix in smoothies or warm beverages. Best taken in morning' },
    { form: 'Rhodiola Tea', dosage: '3-6g dried root', usage: 'Simmer in 250ml water for 10-15 minutes. Drink once daily, preferably morning' },
    { form: 'Rhodiola Tincture', dosage: '1-3ml daily', usage: 'Take in morning with water. Follow label instructions for best results' }
  ],
  safety_warnings: [
    'Take only in morning to avoid sleep disruption (mild stimulating effect)',
    'Start with low dose to assess tolerance',
    'Always cycle usage (6-8 weeks on, 1 week off) to maintain effectiveness',
    'May interact with antidepressants - consult doctor first',
    'Not recommended with blood thinners or immunosuppressants',
    'May cause mild restlessness in sensitive individuals'
  ],
  interactions: [
    'Antidepressants (SSRIs, MAOIs) - may enhance effects',
    'Blood pressure medications - may have additive effects',
    'Diabetes medications - may affect blood sugar levels',
    'Stimulants (caffeine) - may increase overstimulation',
    'Immunosuppressants - may counteract effects'
  ],
  scientific_evidence: 'Clinical studies demonstrate rhodiola extract benefits for mental performance under stress, fatigue reduction, and cortisol balance. Research shows significant improvements in focus (2012 study), stress resilience, physical endurance, and mood stability. Particularly effective for chronic fatigue, work-related stress, and athletic performance.',
  constitution_match: [
    { type: 'Qi-Deficient (Always tired, low energy, frequent colds)', suitable: 'yes', description: 'Perfect match - Rhodiola tonifies Qi and boosts energy naturally' },
    { type: 'Phlegm-Damp (Slow metabolism, weight gain, fatigue)', suitable: 'yes', description: 'Excellent - Helps with metabolism and stress-related weight gain' },
    { type: 'Qi-Stagnation (Stress, anxiety, mood swings)', suitable: 'yes', description: 'Helpful - Balances stress hormones and improves mood' },
    { type: 'Yin-Deficient (Insomnia, night sweats, hot flashes)', suitable: 'warning', description: 'Use caution - Take only in morning with low dose' },
    { type: 'Yang-Excess / Heat Type (Easily irritated, red face, very hot body)', suitable: 'no', description: 'Not suitable - May cause overstimulation' }
  ],
  pairs_well_with: [
    'Ashwagandha (for enhanced adaptogenic and stress support)',
    'Ginseng (for energy and vitality - rhodiola vs ginseng comparison)',
    'Goji berries (for immune support and energy)',
    'Cordyceps (for athletic performance)',
    'Holy Basil (for stress and anxiety relief)'
  ],
  user_stories: [
    { quote: 'Rhodiola helped me power through my work deadlines without the caffeine crash. My focus improved dramatically within 2 weeks.', author: 'Jennifer K.', location: 'Seattle, USA' },
    { quote: 'I take rhodiola before my morning runs and notice better endurance and faster recovery. Game changer for my training.', author: 'Marcus T.', location: 'Denver, USA' },
    { quote: 'As someone with chronic fatigue, rhodiola gave me my energy back. I cycle it 6 weeks on, 1 week off, and it works great.', author: 'Sarah L.', location: 'Toronto, Canada' }
  ],
  faqs: [
    { 
      question: 'How long does it take for rhodiola to work?', 
      answer: 'Most people notice rhodiola benefits within 1-2 weeks of consistent use. For energy and focus, effects may be felt within a few days. For stress resilience and mood stability, allow 2-4 weeks for full benefits.' 
    },
    { 
      question: 'Can I take rhodiola every day?', 
      answer: 'Yes, but it\'s best to cycle rhodiola usage. Take it for 6-8 weeks, then take a 1-week break to maintain effectiveness and prevent tolerance. This cycling pattern is recommended for all adaptogen herbs.' 
    },
    { 
      question: 'Does rhodiola help with weight loss?', 
      answer: 'Rhodiola may support weight management by reducing stress-related eating, balancing cortisol levels, and supporting metabolism. It\'s particularly effective for stress-related weight gain when combined with healthy diet and exercise.' 
    },
    { 
      question: 'What is the best time to take rhodiola?', 
      answer: 'The best time to take rhodiola is in the morning with breakfast. Taking it later in the day may cause sleep disruption in sensitive individuals due to its mild stimulating effects.' 
    },
    { 
      question: 'Rhodiola vs Ginseng: Which is better?', 
      answer: 'Both are excellent adaptogens but work differently. Rhodiola is better for mental clarity, stress resilience, and avoiding overstimulation. Ginseng is stronger for physical energy and vitality. Many people combine both for enhanced benefits.' 
    },
    { 
      question: 'Is rhodiola safe to take daily?', 
      answer: 'Yes, rhodiola is generally safe for daily use when cycled properly (6-8 weeks on, 1 week off). It has high safety level with minimal side effects. However, avoid if pregnant, breastfeeding, or taking antidepressants without doctor consultation.' 
    },
    { 
      question: 'What are rhodiola supplement benefits for energy?', 
      answer: 'Rhodiola provides natural sustained energy by improving cellular ATP production and oxygen utilization. Unlike caffeine, it doesn\'t cause jitters or crashes. Perfect for chronic fatigue, athletic performance, and work productivity.' 
    },
    { 
      question: 'Best rhodiola supplement: What to look for?', 
      answer: 'Look for rhodiola extract standardized to 3% salidroside and 1% rosavins. Choose reputable brands with third-party testing. Rhodiola rosea and rhodiola crenulata are both effective species. Typical dosage: 200-600mg daily.' 
    },
    { 
      question: 'What are rhodiola side effects?', 
      answer: 'Rhodiola side effects are rare and mild. May include restlessness, dry mouth, or sleep disruption if taken late in day. Start with low dose (200mg) to assess tolerance. Generally very safe with high safety profile.' 
    },
    { 
      question: 'How to take rhodiola for stress and anxiety?', 
      answer: 'For stress and anxiety relief, take 200-400mg rhodiola extract in the morning. You can split the dose (200mg morning + 200mg midday). Combine with mindfulness practices for best results. Allow 2-3 weeks for full effects.' 
    }
  ],
  seo_keywords: [
    'rhodiola', 'rhodiola rosea', 'rhodiola crenulata', 'rhodiola supplement', 'rhodiola extract',
    'rhodiola benefits', 'rhodiola rosea benefits', 'rhodiola extract benefits', 'rhodiola root benefits',
    'rhodiola weight loss', 'rhodiola rosea weight loss', 'rhodiola and weight loss', 'rhodiola fat loss',
    'rhodiola side effects', 'rhodiola rosea side effects', 'rhodiola extract side effects',
    'rhodiola dosage', 'rhodiola rosea dosage', 'best time to take rhodiola',
    'rhodiola vs ginseng', 'best rhodiola supplement', 'rhodiola tea', 'rhodiola powder',
    'arctic root supplement', 'adaptogen herbs', 'rhodiola for fatigue', 'rhodiola for stress and anxiety',
    'how long does it take for rhodiola to work', 'is rhodiola safe to take daily'
  ],
  properties: [
    'Natural sustained energy boost',
    'Stress resilience and cortisol balance',
    'Mental clarity under pressure',
    'Metabolism and weight management support',
    'Physical stamina and endurance',
    'Mood and emotional stability'
  ]
}

// Add aliases
HERB_DETAIL_FALLBACK['rhodiola'] = HERB_DETAIL_FALLBACK['rhodiola-crenulata']
HERB_DETAIL_FALLBACK['rhodiola-rosea'] = HERB_DETAIL_FALLBACK['rhodiola-crenulata']


