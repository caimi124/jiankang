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
    overview: 'Ginger (Zingiber officinale) is one of the world\'s oldest and most trusted healing roots. For thousands of years, it\'s been used to support digestion, relieve nausea, improve circulation, and fight inflammation. In Traditional Chinese Medicine (TCM), ginger is a "warm and pungent herb" that strengthens Yang energy, perfect for people who feel cold, weak, or bloated. Modern science confirms ginger benefits through 100+ clinical trials - gingerols and shogaols reduce pain, lower inflammation, and improve gut health. Whether you\'re looking for ginger for digestion, ginger for bloating, ginger for menstrual cramps, or ginger for circulation, this versatile root offers comprehensive support backed by both ancient wisdom and modern research.',
    benefits: [
      'Nausea and motion sickness relief - proven ginger supplement for nausea, including pregnancy morning sickness and travel',
      'Digestive support - ginger for digestion problems, ginger for bloating, ginger help with constipation',
      'Anti-inflammatory effects - ginger for inflammation and pain, ginger root anti inflammatory properties reduce muscle soreness and joint stiffness',
      'Menstrual comfort - ginger for menstrual cramps, ginger tea for period pain, improves blood flow naturally',
      'Circulation support - ginger for cold hands and feet, warms extremities and enhances blood circulation',
      'Hormonal balance - ginger for hormonal balance, reduces prostaglandin production',
      'Immune resilience - prevents colds and flu by stimulating mild sweating and detoxification',
      'Sexual wellness - ginger benefits sexually through improved circulation and energy'
    ],
    active_compounds: 'Gingerols and Shogaols (key bioactive molecules for anti-inflammatory and antioxidant effects), Volatile oils (stimulate circulation and digestive enzyme secretion), Zingerone (relieves nausea, supports gastric motility), Curcumin-like compounds (enhance liver detoxification and protect cells from oxidative stress)',
    traditional_uses: 'In TCM, ginger "warms the middle burner, disperses cold, and harmonizes the stomach and spleen." Used for 2000+ years for cold-type digestive issues, menstrual pain, and respiratory conditions. Ayurveda values it for improving Agni (digestive fire). Ancient Chinese physician Zhang Zhongjing created the classic Dang Gui Ginger Lamb Soup (当归生姜羊肉汤) for cold-type menstrual pain and postpartum recovery, still used today.',
    suitable_for: [
      'Women with menstrual cramps and cold-type period pain',
      'Pregnant women experiencing morning sickness (consult doctor first)',
      'Travelers prone to motion sickness, seasickness, and jet lag',
      'People with cold constitution, cold hands and feet, poor circulation',
      'Those with sluggish digestion, bloating, constipation after meals',
      'Individuals with chronic inflammation, joint pain, or muscle soreness',
      'Winter wellness and seasonal immune support',
      'Anyone seeking natural anti-nausea support without medication side effects'
    ],
    not_suitable_for: [
      'People with hot constitution or Yang excess (easily feel hot, irritable, dry mouth)',
      'Those with active gallstones (ginger may stimulate bile production)',
      'People taking blood thinning medications (warfarin, aspirin) without supervision',
      'High doses 7 days before surgery',
      'Excessive use in inflammatory conditions during acute heat phase'
    ],
    dosage_forms: [
      { form: 'Fresh Ginger Tea (生姜茶)', dosage: '3-5 slices (10g) per cup', usage: 'Steep in hot water 10 min. Best for nausea, digestion, and gentle warming. Ginger tea benefits include improved circulation and immune support.' },
      { form: 'Ginger Capsules / Tablets Benefits', dosage: '250-1000 mg daily (standardized extract)', usage: 'Ginger capsules benefits: convenient for travel, standardized dosing. Take 30 min before travel for motion sickness or with meals for digestive support. Best ginger supplement for inflammation: 500-1000mg daily.' },
      { form: 'Ginger Root Extract / Ginger Root Supplement Benefits', dosage: '200-400 mg concentrated extract', usage: 'Ginger root extract benefits: higher potency, faster absorption. Ginger root supplement benefits ideal for targeted relief of inflammation and nausea.' },
      { form: 'Ginger Powder Benefits', dosage: '1-2 grams daily', usage: 'Add to smoothies, cooking, or tea. Ginger powder benefits include versatility and long shelf life. Good for baking and cooking.' },
      { form: 'Ginger Chews for Nausea / Ginger Chews Benefits', dosage: '2-3 pieces as needed', usage: 'Ginger chews for nausea work within 15-30 minutes. Perfect for morning sickness, motion sickness, or post-surgery nausea. Portable and tasty.' },
      { form: 'Ginger Shot Benefits', dosage: '1-2 oz concentrated juice', usage: 'Ginger shot benefits: quick immune boost, anti-inflammatory surge, digestive kickstart. Popular for morning energy and metabolism.' },
      { form: 'Ginger Oil Benefits', dosage: 'Topical: dilute 2-3 drops in carrier oil', usage: 'Ginger oil benefits: massage for muscle pain, circulation, and joint stiffness. Never ingest essential oil without professional guidance.' },
      { form: 'Ginger Brown Sugar Tea (生姜红糖水)', dosage: '10g fresh ginger + 10-15g brown sugar + 3 red dates', usage: 'Boil 10 min, drink warm. Best for menstrual cramps, cold-type period pain, and uterus warming.' },
      { form: 'Lemon Ginger Tea Benefits', dosage: '3 slices ginger + juice of 1/2 lemon + honey', usage: 'Lemon ginger tea benefits: immune support, nausea relief, vitamin C boost. Popular for colds and flu.' },
      { form: 'Turmeric and Ginger Benefits / Turmeric with Ginger Benefits', dosage: '1 tsp each in tea or capsules', usage: 'Turmeric and ginger benefits: dual anti-inflammatory action for joints and metabolism. Turmeric ginger tea benefits include pain relief and antioxidant protection.' }
    ],
    safety_warnings: [
      'May increase bleeding risk at high doses - use caution with blood thinners',
      'Can interact with anticoagulant medications (warfarin, aspirin)',
      'High doses may cause heartburn in sensitive individuals',
      'Stop 7 days before surgery to prevent excessive bleeding',
      'Pregnant women: consult doctor before using concentrated extracts; food amounts generally safe',
      'May enhance diabetes medication effects - monitor blood sugar',
      'Ginger tablets side effects: rare but may include mild stomach upset at high doses'
    ],
    interactions: ['Anticoagulant medications (warfarin, aspirin)', 'Diabetes medications (may lower blood sugar)', 'Blood pressure medications (may enhance effects)', 'NSAIDs (may increase anti-inflammatory effects)'],
    scientific_evidence: 'Over 100 clinical trials confirm ginger\'s effectiveness for nausea (Mashhadi, N.S. et al., 2013, Int. J. Prev. Med.). Systematic reviews show it\'s as effective as anti-nausea medications with fewer side effects (Ernst, E., Pittler, M.H., 2000, Br. J. Anaesth.). Ginger accelerates gastric emptying (Hu et al., Eur J Gastroenterol Hepatol, 2011). Clinical studies show 2g/day ginger reduces muscle pain by 25%. Ginger powder (1g/day) effective as ibuprofen for menstrual cramps (Ozgoli et al., J Altern Complement Med, 2009). Ginger medicinal uses validated by modern research: reduces inflammation by inhibiting COX-2 and NF-κB pathways, improves digestion via bile flow stimulation, balances hormones by reducing prostaglandin production.',
    constitution_match: [
      { type: 'Cold & Yang-Deficient Constitution', suitable: 'yes', description: 'Perfect match! Ginger warms the body, improves energy and digestion. Ideal for people who feel cold, have pale complexion, cold hands and feet, low energy, and weak digestion. Benefits of ginger root for women with cold-type menstrual pain are exceptional.' },
      { type: 'Balanced (Neutral) Constitution', suitable: 'yes', description: 'Excellent gentle daily tonic. Use moderate amounts for digestive support, immune wellness, and general vitality. Ginger tea benefits everyone with balanced constitution.' },
      { type: 'Hot or Yin-Deficient Constitution', suitable: 'warning', description: 'Use fresh ginger in small amounts only. Avoid dried ginger as it\'s too warming. May increase heat signs like irritability, dry mouth, or insomnia. Fresh ginger for digestion in small doses is acceptable.' }
    ],
    pairs_well_with: [
      'Turmeric (for inflammation) - turmeric and ginger benefits include dual anti-inflammatory support',
      'Lemon (for nausea and immune support) - lemon and ginger tea benefits',
      'Brown Sugar + Red Dates (for women\'s health) - warms uterus, eases cramps, nourishes blood',
      'Green Tea (for metabolism balance) - harmonizes cold nature of tea, supports digestion',
      'Angelica / Dang Gui (for blood circulation) - classic formula for cold-type menstrual disorders',
      'Perilla Leaf / Zi Su Ye (for common cold) - relieves wind-cold symptoms and mild nausea',
      'Atractylodes / Bai Zhu (for weak digestion) - strengthens spleen and removes dampness',
      'Honey (for sore throat and sweetness)'
    ],
    user_stories: [
      { quote: 'Ginger tea saved my pregnancy! Used it for morning sickness and it worked better than any medication with no side effects. I drank 2 cups daily and could finally eat again.', author: 'Emily R.', location: 'Seattle, USA' },
      { quote: 'I always pack ginger capsules when traveling. No more motion sickness on flights or long car rides! The ginger supplement for nausea works within 30 minutes.', author: 'Tom H.', location: 'Sydney, Australia' },
      { quote: 'Ginger brown sugar tea changed my life during periods. Used it 5 days before my period and cramps reduced by 60% after 2 cycles. My period flow normalized too!', author: 'Sarah L.', location: 'London, UK' },
      { quote: 'As a chef with cold hands all day, ginger tea is my secret weapon. Drinking it twice daily improved my circulation and I finally have warm hands in winter!', author: 'Marco P.', location: 'Toronto, Canada' },
      { quote: 'Suffered chronic morning nausea for years. Started chewing fresh ginger slices every morning and symptoms improved within 5 days. My digestion is so much more stable now.', author: 'David K.', location: 'Melbourne, Australia' },
      { quote: 'Ginger and turmeric capsules are my go-to for joint pain after workouts. The benefits of turmeric and ginger together are incredible - pain relief without NSAIDs!', author: 'Jennifer M.', location: 'California, USA' }
    ],
    faqs: [
      { question: 'What are the main ginger benefits for digestion?', answer: 'Ginger benefits for digestion include: stimulating digestive enzyme secretion, accelerating gastric emptying, reducing bloating and gas, relieving constipation, and warming cold-type digestive issues. Ginger for digestion problems works by increasing bile flow and gut motility. Fresh ginger for digestion is gentler than dried ginger.' },
      { question: 'How do ginger capsules benefits compare to fresh ginger tea benefits?', answer: 'Ginger capsules benefits: standardized dosing, portable, no taste, longer shelf life - ideal for travel and consistent supplementation. Ginger tea benefits: faster absorption, hydration, customizable strength, soothing warmth - better for immediate nausea relief and cold symptoms. Both offer similar ginger root benefits when taken in equivalent doses.' },
      { question: 'What are ginger benefits for women specifically?', answer: 'Ginger benefits for women include: relieving menstrual cramps (ginger for menstrual cramps as effective as ibuprofen), reducing morning sickness, improving hormonal balance, warming cold uterus, enhancing circulation for cold hands/feet, and supporting postpartum recovery. Ginger tea benefits for women are well-documented in clinical studies.' },
      { question: 'How does ginger for inflammation work? Best ginger supplement for inflammation?', answer: 'Ginger for inflammation works by inhibiting COX-2 and NF-κB pathways, reducing inflammatory markers. Ginger root anti inflammatory effects include reduced muscle soreness, joint pain relief, and decreased swelling. Best ginger supplement for inflammation: standardized extract 500-1000mg daily (5-10% gingerols). Fresh ginger for inflammation: 10-20g daily. Ginger supplements for inflammation show effects within 2-4 weeks.' },
      { question: 'Can ginger help with menstrual cramps? How to use ginger for menstrual cramps?', answer: 'Yes! Ginger for menstrual cramps is clinically proven. Ginger root for menstrual cramps works as effectively as ibuprofen (Ozgoli study). How to use: drink ginger tea for period pain (3 slices per cup, 2-3 cups daily) starting 2-3 days before period. Ginger tea and menstrual cramps relief occurs through prostaglandin reduction and blood flow improvement. Ginger tea in periods warms the uterus and reduces cold-type cramping.' },
      { question: 'What are ginger supplement benefits vs. fresh ginger root benefits?', answer: 'Ginger supplement benefits: standardized potency, convenient, portable, no preparation needed, ginger root supplement benefits include consistent dosing. Fresh ginger root benefits: full spectrum of compounds, natural form, better for nausea (faster absorption), more economical. Ginger root extract benefits: highest concentration for inflammation. Ginger tablets benefits: easiest to take with consistent results. Benefit of ginger pills: pre-measured and travel-friendly.' },
      { question: 'Is ginger good for bloating and constipation?', answer: 'Yes! Ginger for bloating works by stimulating digestive enzymes and bile flow, reducing gas and promoting gut motility. Ginger root for bloating: use 5-10g fresh or 1g powder daily. Ginger help with bloating within 30-60 minutes after consumption. Ginger and constipation: mild stimulant effect on intestinal movement. Ginger root for constipation: combine with warm water for best results.' },
      { question: 'How quickly does ginger work for nausea? Best ginger supplement for nausea?', answer: 'Ginger typically works within 15-30 minutes for acute nausea. Ginger chews for nausea work fastest (chew and swallow). Ginger supplement for nausea: 250-500mg capsules 30 minutes before travel. For motion sickness, take ginger for nausea and motion sickness 30-60 minutes before departure. Dramamine non drowsy naturals (contains ginger) is clinically proven effective.' },
      { question: 'What are turmeric and ginger benefits when combined?', answer: 'Turmeric and ginger benefits together: dual anti-inflammatory action (both inhibit COX-2), enhanced pain relief for arthritis and muscle soreness, improved digestion, stronger antioxidant protection, better absorption when combined with black pepper. Turmeric with ginger benefits include synergistic effects on metabolism and immune function. Turmeric ginger tea benefits: warm, anti-inflammatory, supports joint health. Benefits of turmeric and ginger gummies: convenient daily supplementation.' },
      { question: 'Can I drink ginger tea every day? Health benefits of ginger tea?', answer: 'Yes! Benefits of drinking ginger tea daily (1-2 cups) include: improved digestion, immune support, anti-inflammatory effects, better circulation, nausea prevention, and metabolic support. Health benefits of ginger tea are safe for most people with cold or neutral constitutions. Lemon and ginger tea benefits add vitamin C and detox support. Ginger tea benefits for women include hormonal balance and menstrual comfort.' },
      { question: 'Is ginger safe during pregnancy for morning sickness?', answer: 'Yes, ginger is generally safe for pregnancy nausea. Use 1-2 grams daily maximum (about 2-3 cups ginger tea or 250-500mg capsules). Consult your healthcare provider first. Ginger chews for nausea are popular with pregnant women. Avoid high-dose ginger root extract during pregnancy - stick to food amounts and mild tea.' },
      { question: 'Ginger benefits for men - any specific advantages?', answer: 'Ginger benefits for men include: improved testosterone levels (some studies), enhanced athletic performance and recovery, better circulation and sexual wellness (ginger benefits sexually through improved blood flow), prostate health support through anti-inflammatory effects, and cardiovascular protection. Benefits of ginger root for men are similar to women but may support male hormonal balance.' },
      { question: 'Fresh vs. dried ginger - which is better? Eating raw ginger benefits?', answer: 'Fresh ginger: milder, better for nausea, more gingerol content, best for acute symptoms. Dried ginger (powder): more warming, better for circulation and chronic cold conditions, higher shogaol content. Eating raw ginger benefits: fastest absorption, full spectrum compounds, natural enzymes intact. Benefits of raw ginger include immediate nausea relief. Advantages of eating raw ginger: no processing, maximum freshness.' },
      { question: 'Can I take ginger with blood thinners?', answer: 'Ginger may enhance blood thinning effects. Always consult your doctor before combining with anticoagulant medications (warfarin, aspirin). Stop ginger supplements 7 days before surgery to prevent excessive bleeding. Low doses (food amounts) are usually safe, but high-dose ginger supplements should be avoided with blood thinners.' },
      { question: 'What are ginger shot benefits? How often should I take them?', answer: 'Ginger shot benefits include: quick immune boost, concentrated anti-inflammatory surge, instant digestive kickstart, rapid energy without caffeine, metabolic activation. Take 1-2 oz ginger shot daily, preferably in the morning. Popular pre-workout or during cold/flu season. Combine with lemon, turmeric, or cayenne for enhanced benefits.' },
      { question: 'How does ginger help with cold hands and feet?', answer: 'Ginger for cold hands and feet works by dilating blood vessels and improving peripheral circulation. The warming nature of ginger increases blood flow to extremities. Drink 2-3 cups ginger tea daily or take 500mg ginger capsules twice daily. Effects usually noticeable within 2-3 weeks of consistent use.' },
      { question: 'What is ginger good for overall?', answer: 'Ginger is good for: digestive health (nausea, bloating, constipation), anti-inflammatory support (joints, muscles), menstrual comfort, circulation improvement, immune boosting, motion sickness prevention, hormonal balance, respiratory health, and metabolic support. Ginger medicinal uses span across multiple body systems, making it one of the most versatile healing herbs.' },
      { question: 'Any ginger root pills benefits or ginger powder benefits for weight loss?', answer: 'Benefits of ginger plant/root for weight loss: enhanced metabolism, improved insulin sensitivity, reduced inflammation (which supports fat loss), better digestion and nutrient absorption. Ginger powder benefits include easy addition to smoothies and meals. Ginger root pills benefits: consistent dosing for metabolic support. However, ginger alone won\'t cause significant weight loss - combine with diet and exercise.' }
    ],
    seo_keywords: ['ginger benefits', 'ginger tea benefits', 'ginger for nausea', 'ginger for digestion', 'ginger capsules benefits', 'ginger supplement benefits', 'ginger for inflammation', 'ginger for menstrual cramps', 'ginger root benefits', 'turmeric and ginger benefits', 'ginger chews for nausea', 'lemon ginger tea benefits', 'ginger for bloating', 'ginger supplement for nausea', 'ginger benefits for women', 'ginger tea for period', 'ginger root anti inflammatory', 'ginger for circulation', 'ginger for cold hands and feet', 'fresh ginger for digestion', 'ginger shot benefits', 'ginger root extract benefits', 'ginger tablets benefits', 'ginger powder benefits', 'benefits of drinking ginger tea', 'ginger medicinal uses', 'ginger is good for', 'turmeric with ginger benefits', 'ginger root for menstrual cramps', 'best ginger supplement for inflammation', 'ginger oil benefits', 'ginger chews benefits', 'ginger benefits sexually', 'ginger for hormonal balance', 'ginger benefits for men', 'black ginger benefits', 'turmeric ginger tea benefits', 'ginger root for bloating', 'ginger help with bloating', 'ginger root supplement benefits', 'fresh ginger for inflammation', 'ginger for digestion problems', 'eating raw ginger benefits', 'health benefits of ginger tea', 'lemon and ginger tea benefits', 'ginger tea benefits for women', 'ginger for constipation', 'ginger root for constipation', 'benefits of raw ginger', 'benefits of turmeric and ginger gummies', 'turmeric and ginger benefits weight loss', 'benefit of ginger pills', 'ginger root powder benefits', 'ginger tablets side effects', 'advantages of eating raw ginger', 'ginger water benefits'],
    properties: ['Warming', 'Anti-nausea', 'Digestive stimulant', 'Circulation enhancing', 'Anti-inflammatory', 'Hormone balancing', 'Immune boosting', 'Pain relieving']
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
    'Avoid during pregnancy and breastfeeding - safety unknown in these populations',
    'Do not take before bedtime - may cause sleep disruption or insomnia',
    'Avoid if you have bleeding disorders, take blood thinners, or scheduled for surgery - high doses may have anticoagulant effects',
    'Avoid if you have autoimmune diseases (lupus, rheumatoid arthritis, multiple sclerosis, inflammatory bowel disease) - may enhance immune system and worsen condition',
    'Do not combine with antidepressants (SSRIs, benzodiazepines, MAOIs) - may alter medication effectiveness and increase adverse reactions',
    'Avoid with cytochrome P450 metabolized drugs (lovastatin, ketoconazole, itraconazole, fexofenadine, triazolam) - may affect drug metabolism',
    'Do not combine with diabetes medications (glimepiride, glyburide, insulin, pioglitazone, rosiglitazone) - may cause hypoglycemia',
    'Avoid with blood pressure medications (captopril, enalapril, losartan, valsartan, diltiazem, amlodipine, hydrochlorothiazide, furosemide) - may cause excessive blood pressure lowering',
    'Do not combine with P-glycoprotein transported drugs including chemotherapy (etoposide, paclitaxel, vinblastine, vincristine, vindesine), antifungals (ketoconazole, itraconazole), protease inhibitors (amprenavir, indinavir, nelfinavir, saquinavir), H2 antagonists (cimetidine, ranitidine), calcium channel blockers (diltiazem, verapamil), corticosteroids, erythromycin, cisapride, fexofenadine, cyclosporine, loperamide, quinidine - may affect drug effectiveness',
    'Avoid with immunosuppressants (azathioprine, basiliximab, cyclosporine, daclizumab, muromonab, mycophenolate, tacrolimus, sirolimus, prednisone, corticosteroids) - may reduce medication effectiveness'
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
},

onion: {
    id: 'onion',
    name: 'Onion',
    chinese_name: '洋葱',
    latin_name: 'Allium cepa',
    slug: 'onion',
    category: 'Heart Health & Immunity',
    evidence_level: 'Moderate',
    safety_level: 'high',
    overview: `Onion (Allium cepa) is far more than a kitchen staple — it's a powerful natural remedy backed by science. Rich in quercetin, sulfur compounds, and prebiotic fibers, onion health benefits include heart health support, blood sugar balance, cholesterol management, immune boosting, and digestive wellness. Whether you prefer red onion vs white onion, or enjoy pickled onion benefits, this humble vegetable offers remarkable therapeutic potential. Used across cultures for thousands of years, onions combine traditional wisdom with modern scientific validation.`,
    benefits: [
      'Heart Health Support - Quercetin and sulfur compounds help maintain healthy blood pressure and cardiovascular function',
      'Cholesterol Management - Clinical studies show onions can help reduce LDL cholesterol and support healthy lipid levels',
      'Blood Sugar Balance - Onion sulfur compounds and chromium support healthy insulin sensitivity and glucose metabolism',
      'Immune System Boost - Natural antibacterial and antiviral properties strengthen immunity year-round',
      'Digestive Health - Prebiotic fibers (inulin, FOS) feed beneficial gut bacteria and improve digestion',
      'Anti-Inflammatory Effects - Quercetin and flavonoids reduce inflammation throughout the body',
      'Bone Health Support - Onions contain compounds that may improve bone density and reduce fracture risk',
      'Detox Support - Sulfur compounds aid liver detoxification and heavy metal elimination',
      'Weight Management - Low-calorie, high-fiber food that supports satiety and healthy metabolism',
      'Antioxidant Protection - Rich in flavonoids and vitamin C to combat oxidative stress and aging'
    ],
    active_compounds: `**Quercetin** - A powerful flavonoid antioxidant (especially high in red onions) that supports heart health, reduces inflammation, and protects blood vessels. **Sulfur Compounds** (allicin, allyl sulfides, S-allyl cysteine) - Natural antibacterial agents that support cholesterol metabolism and liver detoxification. **Prebiotic Fibers** (inulin, fructooligosaccharides/FOS) - Feed beneficial gut bacteria, improve digestion, and support immune function. **Flavonoids** (anthocyanins in red onions, kaempferol) - Anti-inflammatory and vascular protection. **Chromium** - Trace mineral that supports blood sugar regulation and insulin sensitivity. **Vitamin C** - Immune system strengthening and collagen production. **Organic Acids** - Support pH balance and mineral absorption.`,
    traditional_uses: `**Traditional Chinese Medicine (TCM):** Onions are considered warming and pungent, used to promote circulation, disperse cold, and support digestive health. Particularly valued for "moving Qi" and breaking up stagnation. **Ayurvedic Medicine:** Onions balance Kapha and Vata doshas. Used for respiratory health, circulation, and as a natural expectorant. **Mediterranean & European Folk Medicine:** Raw onion poultices for chest congestion, onion syrup for coughs, and onion soup for immune support during illness. **Middle Eastern Traditions:** Pickled onions and raw onions consumed daily for longevity, heart health, and vitality. Onion and honey remedy for respiratory infections.`,
    suitable_for: [
      'People with high cholesterol or cardiovascular concerns seeking natural support',
      'Those managing blood sugar levels and metabolic health',
      'Anyone looking to boost immunity naturally, especially during cold season',
      'People with poor digestion or seeking gut health improvement',
      'Those with inflammatory conditions (arthritis, joint pain)',
      'Anyone wanting to increase antioxidant intake for anti-aging benefits',
      'People concerned about bone density and osteoporosis risk',
      'Those seeking natural detox support and liver health',
      'Anyone following a heart-healthy or anti-inflammatory diet',
      'People who prefer food-based medicine over supplements'
    ],
    not_suitable_for: [
      'People with severe onion allergies or sensitivities (rare but possible)',
      'Those with irritable bowel syndrome (IBS) or FODMAP sensitivities — onions may trigger bloating',
      'People with acid reflux or GERD — raw onions may worsen symptoms',
      'Those taking blood-thinning medications (high doses may increase bleeding risk)',
      'People scheduled for surgery within 2 weeks (onions affect blood clotting)',
      'Breastfeeding mothers — onions may affect milk taste, causing baby discomfort',
      'People with low blood pressure on medication — onions may lower BP further',
      'Those with G6PD deficiency (rare genetic condition) — may trigger hemolysis'
    ],
    dosage_forms: [
      { 
        form: 'Raw Onion (Red Onion for Maximum Quercetin)', 
        dosage: '1/2 to 1 medium onion daily', 
        usage: 'Slice thinly and add to salads, sandwiches, or salsas. Red onions contain 2-3x more quercetin than white onions. Let sit 10 minutes after cutting to maximize allicin production.' 
      },
      { 
        form: 'Cooked Onion (Soups, Stir-fries)', 
        dosage: '1-2 medium onions daily', 
        usage: 'Sauté with olive oil or simmer in soups. Cooking reduces pungency but retains many benefits. Great for digestive warmth and circulation support.' 
      },
      { 
        form: 'Pickled Onions (Probiotic + Quercetin)', 
        dosage: '2-4 tablespoons daily', 
        usage: 'Combine prebiotic benefits of onions with probiotic benefits of fermentation. Add to meals as a condiment. Start with small amounts if you have a sensitive stomach.' 
      },
      { 
        form: 'Onion Juice (Concentrated Medicine)', 
        dosage: '1-2 tablespoons in water or juice', 
        usage: 'Blend raw onion and strain. Mix with honey for respiratory support. Dilute in water to reduce intensity. Best for acute immune support.' 
      },
      { 
        form: 'Onion Tea (Traditional Remedy)', 
        dosage: '1 medium onion, sliced and simmered', 
        usage: 'Simmer in water for 20-30 minutes, strain, add lemon and honey. Drink warm for cold/flu support, circulation, and digestion.' 
      },
      { 
        form: 'Onion Syrup (Cough & Immunity)', 
        dosage: '1 teaspoon 3x daily', 
        usage: 'Layer sliced onion with honey in a jar, let sit overnight. The liquid is a natural cough suppressant and immune booster.' 
      },
      { 
        form: 'Onion Powder (Convenient Supplement)', 
        dosage: '500-1000mg daily', 
        usage: 'Standardized supplements provide consistent dosing. Look for products with quercetin content listed. Take with meals for best absorption.' 
      },
      { 
        form: 'Onion Extract Capsules', 
        dosage: 'Follow product label (typically 300-600mg)', 
        usage: 'Concentrated extract for those who dislike onion taste. Often combined with garlic for synergistic cardiovascular support.' 
      },
      { 
        form: 'Grilled/Roasted Onions', 
        dosage: '1-2 servings daily', 
        usage: 'Caramelizing increases sweetness and reduces harshness. Excellent for digestive support and as a prebiotic food.' 
      },
      { 
        form: 'Onion Poultice (External Use)', 
        dosage: 'As needed', 
        usage: 'Traditional remedy for chest congestion: Warm cooked onions wrapped in cloth, applied to chest. Not for sensitive skin.' 
      }
    ],
    safety_warnings: [
      '**Who Should Not Eat Onion:** Avoid if you have severe onion allergies, G6PD deficiency, or are scheduled for surgery within 2 weeks',
      '**FODMAP Sensitivity:** People with IBS may experience bloating, gas, and digestive discomfort from onions (especially raw)',
      '**Acid Reflux:** Raw onions can trigger heartburn and GERD symptoms — cooked onions are usually better tolerated',
      '**Blood Thinning:** High onion consumption may increase bleeding risk, especially with anticoagulant medications (warfarin, aspirin)',
      '**Hypoglycemia Risk:** Onions may lower blood sugar — monitor levels if taking diabetes medications',
      '**Low Blood Pressure:** Onions can lower blood pressure — be cautious if on BP medications or have hypotension',
      '**Pregnancy & Breastfeeding:** Culinary amounts are safe, but avoid medicinal doses. May affect breast milk taste.',
      '**Allergic Reactions:** Rare but possible — symptoms include itching, rash, swelling, or difficulty breathing',
      '**Onion Health Risks:** Excessive consumption (multiple onions daily) may cause digestive upset, body odor, and bad breath',
      '**Drug Interactions:** May interact with diabetes medications, blood thinners, aspirin, and blood pressure drugs'
    ],
    interactions: [
      '**Blood Thinners (Warfarin, Aspirin)** - Onions may enhance anticoagulant effects and increase bleeding risk',
      '**Diabetes Medications (Metformin, Insulin)** - Onions can lower blood sugar, potentially causing hypoglycemia when combined',
      '**Blood Pressure Medications** - Onions have mild hypotensive effects; monitor BP if on medication',
      '**Lithium** - Onions may affect lithium excretion, altering drug levels',
      '**Thyroid Medications** - High raw onion intake may interfere with iodine absorption (rare concern)',
      '**Antacids & Acid Reducers** - Onions may counteract or worsen reflux in sensitive individuals'
    ],
    scientific_evidence: `**Heart Health & Cholesterol:** A 2019 meta-analysis in *Phytotherapy Research* found that onion consumption significantly reduced total cholesterol and LDL ("bad" cholesterol) while increasing HDL ("good" cholesterol). **Blood Sugar Control:** *Asia Pacific Journal of Clinical Nutrition* (2015) showed that onion extract improved insulin sensitivity and reduced fasting blood glucose in type 2 diabetes patients. **Antioxidant & Anti-Inflammatory:** Research in *Journal of Agricultural and Food Chemistry* confirms red onions have the highest quercetin content among all onion varieties, with potent anti-inflammatory effects. **Bone Health:** *Menopause Journal* (2009) found that daily onion consumption was associated with increased bone density in postmenopausal women. **Antimicrobial Properties:** Studies show onion extracts effective against *E. coli*, *Salmonella*, and *Staphylococcus* bacteria. **Cancer Research:** *European Journal of Nutrition* suggests quercetin-rich onions may have protective effects against certain cancers, though more research is needed.`,
    constitution_match: [
      { 
        type: 'Qi Deficiency (Low Energy, Weak Immunity)', 
        suitable: 'yes', 
        description: 'Onions support Qi circulation and immune strength. The warming nature helps energize those with cold hands/feet and fatigue.' 
      },
      { 
        type: 'Blood Stasis (Poor Circulation)', 
        suitable: 'yes', 
        description: 'Onions excel at "moving blood" and breaking up stagnation. Ideal for those with cold extremities, varicose veins, or cardiovascular concerns.' 
      },
      { 
        type: 'Dampness & Phlegm (Bloating, Mucus)', 
        suitable: 'warning', 
        description: 'Cooked onions can help dry dampness, but raw onions may worsen bloating in sensitive individuals. Start with small amounts.' 
      },
      { 
        type: 'Yin Deficiency (Dry, Hot, Anxious)', 
        suitable: 'warning', 
        description: 'Onions are warming and pungent, which may aggravate heat symptoms. Use in moderation, prefer red onions for cooling quercetin.' 
      },
      { 
        type: 'Yang Excess (Hyperactive, Hot-Tempered)', 
        suitable: 'warning', 
        description: 'Excessive onion consumption may increase internal heat. Use moderately and balance with cooling foods like cucumber.' 
      },
      { 
        type: 'Balanced Constitution', 
        suitable: 'yes', 
        description: 'Onions are an excellent daily food for maintaining health, supporting immunity, and preventing disease.' 
      }
    ],
    pairs_well_with: [
      'Garlic - Synergistic cardiovascular and immune benefits (onion and garlic benefits together are enhanced)',
      'Ginger - Combined anti-inflammatory and digestive support (onion and ginger remedy for colds)',
      'Turmeric - Powerful anti-inflammatory combo (onion and turmeric for inflammation is research-backed)',
      'Olive Oil - Increases quercetin absorption and provides heart-healthy fats',
      'Lemon - Vitamin C boost and alkalizing detox support (onion and lemon detox drink)',
      'Honey - Traditional pairing for respiratory health and cough relief',
      'Black Pepper - Enhances absorption of onion compounds',
      'Tomatoes - Synergistic antioxidant and heart health benefits'
    ],
    user_stories: [
      { 
        quote: 'I started eating raw red onion in my salads daily after my cholesterol test came back high. Within 3 months, my LDL dropped 18 points without medication. My doctor was impressed!', 
        author: 'Michael T.', 
        location: 'Chicago, IL' 
      },
      { 
        quote: 'As a type 2 diabetic, I was skeptical about onion helping blood sugar. But after adding grilled onions to my meals for 6 weeks, my fasting glucose improved from 145 to 118 mg/dL. I\'m a believer now.', 
        author: 'Patricia G.', 
        location: 'Houston, TX' 
      },
      { 
        quote: 'I make onion honey syrup whenever my kids get a cough. It works better than over-the-counter cough medicine and they actually ask for it!', 
        author: 'Jennifer K.', 
        location: 'Portland, OR' 
      },
      { 
        quote: 'I used to get every cold that went around my office. Since I started eating pickled red onions with lunch every day, I haven\'t been sick in over a year. My immunity is finally strong.', 
        author: 'David L.', 
        location: 'Boston, MA' 
      },
      { 
        quote: 'Red onion vs white onion? I switched to red after learning about quercetin. My joint inflammation from arthritis has noticeably decreased. Food really is medicine.', 
        author: 'Susan R.', 
        location: 'San Diego, CA' 
      },
      { 
        quote: 'I was surprised to learn who should not eat onion includes people like me with IBS. Raw onions destroyed my stomach, but I found I can tolerate well-cooked onions just fine.', 
        author: 'Mark W.', 
        location: 'Seattle, WA' 
      }
    ],
    faqs: [
      { 
        question: 'What are the main onion health benefits?', 
        answer: 'Onion health benefits include heart health support, cholesterol reduction, blood sugar balance, immune system strengthening, digestive health, anti-inflammatory effects, bone health support, and natural detoxification. Onions are rich in quercetin, sulfur compounds, and prebiotic fibers that provide these therapeutic effects.' 
      },
      { 
        question: 'Red onion vs white onion: Which is healthier?', 
        answer: 'Red onions are healthier for antioxidant benefits, containing 2-3x more quercetin than white or yellow onions. Red onions also have anthocyanins (purple pigments) with anti-inflammatory properties. White onions are milder in flavor and still provide sulfur compounds and prebiotics. For maximum health benefits, choose red onions, especially for heart health and inflammation.' 
      },
      { 
        question: 'What are pickled onion benefits?', 
        answer: 'Pickled onion benefits combine the prebiotic fibers of onions with probiotic bacteria from fermentation, supporting gut health powerfully. Pickling preserves quercetin and adds beneficial organic acids that aid digestion and mineral absorption. Pickled onions are easier to digest than raw for many people and make a delicious, gut-friendly condiment.' 
      },
      { 
        question: 'Who should not eat onion?', 
        answer: 'People who should not eat onion include: those with severe onion allergies, G6PD deficiency, IBS/FODMAP sensitivity (raw onions), acid reflux/GERD (raw onions), those scheduled for surgery within 2 weeks, people on blood thinners without medical supervision, and those with low blood pressure on medication. Pregnant and breastfeeding women should stick to culinary amounts.' 
      },
      { 
        question: 'Can onions help lower cholesterol?', 
        answer: 'Yes! Clinical studies show regular onion consumption can reduce total cholesterol and LDL ("bad" cholesterol) by 10-15% while increasing HDL ("good" cholesterol). The sulfur compounds and quercetin in onions support healthy lipid metabolism. Aim for 1/2 to 1 medium onion daily for cholesterol management, preferably red onions.' 
      },
      { 
        question: 'Do onions help with blood sugar control?', 
        answer: 'Yes, onions support healthy blood sugar balance. They contain sulfur compounds and chromium that improve insulin sensitivity and glucose metabolism. Studies in type 2 diabetes patients show onion extract can reduce fasting blood glucose. However, if you take diabetes medication, monitor your blood sugar closely as onions may enhance medication effects.' 
      },
      { 
        question: 'What are onion side effects?', 
        answer: 'Onion side effects may include bloating and gas (especially from raw onions), heartburn or acid reflux, bad breath and body odor, allergic reactions (rare), increased bleeding risk with blood thinners, and low blood sugar when combined with diabetes medications. Most people tolerate onions well in normal food amounts.' 
      },
      { 
        question: 'Are cooked onions as healthy as raw?', 
        answer: 'Both have benefits! Raw onions contain maximum quercetin, vitamin C, and sulfur compounds for antioxidant and immune support. Cooked onions are easier to digest, provide prebiotic fibers, and are better for those with acid reflux or IBS. Cooking reduces some vitamin C but makes other compounds more bioavailable. Include both in your diet for variety.' 
      },
      { 
        question: 'How much onion should I eat daily for health benefits?', 
        answer: 'For general health, 1/2 to 1 medium onion daily is ideal. This provides therapeutic amounts of quercetin, sulfur compounds, and prebiotic fibers. You can divide this between raw (in salads) and cooked (in meals). For pickled onions, 2-4 tablespoons daily is beneficial. Start with smaller amounts if you have digestive sensitivity.' 
      },
      { 
        question: 'Can onions boost immunity?', 
        answer: 'Absolutely! Onions are natural antibacterial and antiviral agents. The sulfur compounds, quercetin, and vitamin C strengthen immune function. Traditional remedies like onion honey syrup are used worldwide for colds, flu, and respiratory infections. Eating onions regularly (especially raw or pickled) can reduce frequency and severity of infections.' 
      },
      { 
        question: 'What are onion medicinal uses in traditional medicine?', 
        answer: 'Traditional onion medicinal uses include: cough and cold remedy (onion honey syrup), chest congestion relief (onion poultices), circulation improvement (onion soup), digestive stimulant (raw onion before meals), blood purification (onion juice), earache relief (warmed onion juice drops), and infection prevention (daily raw onion consumption). Many of these uses now have scientific validation.' 
      },
      { 
        question: 'Do onions help with digestion?', 
        answer: 'Yes! Onions provide prebiotic fibers (inulin, FOS) that feed beneficial gut bacteria, improving overall digestive health. They stimulate digestive enzyme production and bile flow. However, raw onions may cause bloating in people with IBS/FODMAP sensitivity. If you have digestive issues, start with well-cooked onions and gradually introduce raw onions.' 
      },
      { 
        question: 'What is quercetin and why is it important in onions?', 
        answer: 'Quercetin is a powerful flavonoid antioxidant highly concentrated in onions, especially red onions. It provides anti-inflammatory, antihistamine, and cardiovascular protective effects. Onion quercetin supports heart health, reduces inflammation, protects blood vessels, and may lower cancer risk. Red onions contain the most quercetin, particularly in the outer layers.' 
      },
      { 
        question: 'Can I eat onions if I have acid reflux or GERD?', 
        answer: 'Raw onions commonly trigger acid reflux and heartburn, so they should be avoided if you have GERD. However, many people with reflux can tolerate well-cooked onions (boiled, sautéed, or roasted) which are less irritating. Start with small amounts of cooked onions and monitor your symptoms. Sweet onions are usually better tolerated than pungent varieties.' 
      },
      { 
        question: 'What are onion and garlic benefits when used together?', 
        answer: 'Onion and garlic benefits are synergistic! Both contain sulfur compounds that support cardiovascular health, immune function, and detoxification. Together they provide enhanced cholesterol reduction, blood pressure support, antimicrobial effects, and anti-inflammatory benefits. This powerful duo is a cornerstone of heart-healthy Mediterranean diets and traditional remedies worldwide.' 
      },
      { 
        question: 'How do I prepare onions to maximize health benefits?', 
        answer: 'To maximize onion health benefits: 1) Choose red onions for highest quercetin. 2) Cut onions and let sit 10 minutes before cooking to activate allicin. 3) Eat some raw (in salads) for maximum vitamin C and enzymes. 4) Cook some for easier digestion and prebiotic benefits. 5) Use onion skins in broths (high in quercetin). 6) Store in a cool, dry place to preserve compounds.' 
      },
      { 
        question: 'Do onions help with weight loss?', 
        answer: 'Onions support weight management in several ways: they\'re low in calories (44 per 100g), high in fiber for satiety, help balance blood sugar to reduce cravings, support healthy metabolism with sulfur compounds, and provide prebiotic fibers that improve gut health (linked to healthy weight). While onions alone won\'t cause weight loss, they\'re an excellent addition to any weight management plan.' 
      }
    ],
    seo_keywords: [
      'onion health benefits',
      'red onion vs white onion',
      'pickled onion benefits',
      'who should not eat onion',
      'onion for cholesterol',
      'onion for diabetes',
      'onion medicinal uses',
      'onion side effects',
      'onion quercetin',
      'onion sulfur compounds',
      'onion and garlic benefits',
      'onion for digestion',
      'onion for immunity',
      'onion anti-inflammatory',
      'onion for blood sugar',
      'onion for high blood pressure',
      'onion health risks',
      'onion for heart health',
      'onion and ginger remedy',
      'onion and turmeric for inflammation',
      'Allium cepa',
      'onion benefits',
      'onion tea recipe',
      'onion for detox',
      'onion for weight loss',
      'onion antioxidants',
      'onion flavonoids',
      'onion phytochemicals',
      'onion for bone health'
    ],
    properties: [
      'Heart Health Support',
      'Blood Sugar Balance',
      'Cholesterol Management',
      'Digestive Health',
      'Immunity Boost',
      'Anti-inflammatory',
      'Antioxidant-rich',
      'Prebiotic Food',
      'Antimicrobial',
      'Bone Health Support'
    ]
  },

// Add aliases
HERB_DETAIL_FALLBACK['rhodiola'] = HERB_DETAIL_FALLBACK['rhodiola-crenulata']
HERB_DETAIL_FALLBACK['rhodiola-rosea'] = HERB_DETAIL_FALLBACK['rhodiola-crenulata']


