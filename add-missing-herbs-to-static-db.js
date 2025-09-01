#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 读取现有的静态数据库
const herbsDataPath = path.join(__dirname, 'lib', 'herbs-data-complete.ts');
const herbsDataContent = fs.readFileSync(herbsDataPath, 'utf8');

// 提取现有的HERBS_DATABASE数组
const databaseMatch = herbsDataContent.match(/export const HERBS_DATABASE: Herb\[\] = (\[[\s\S]*?\]);/);
if (!databaseMatch) {
  console.error('❌ 无法找到HERBS_DATABASE数组');
  process.exit(1);
}

const existingDatabase = eval(databaseMatch[1]);

// 新增的草药数据
const newHerbs = [
  {
    "id": "clove-herb-001",
    "chinese_name": "丁香",
    "english_name": "Clove",
    "latin_name": "Syzygium aromaticum",
    "category": "Digestive & Oral Health",
    "constitution_type": "yang-deficiency",
    "primary_effects": [
      "Oral health and toothache relief",
      "Digestive support and nausea relief",
      "Anti-inflammatory and pain relief",
      "Antibacterial and antimicrobial action",
      "Men's reproductive health support",
      "Cold-type abdominal pain relief"
    ],
    "secondary_effects": [
      "Breath freshening",
      "Motion sickness relief",
      "Appetite stimulation"
    ],
    "efficacy": [
      "Oral health and toothache relief",
      "Digestive support and nausea relief",
      "Anti-inflammatory and pain relief",
      "Antibacterial and antimicrobial action"
    ],
    "dosage": "Whole Cloves (tea): 1-3 grams/day. Clove Powder: 0.5-1 gram/day. Clove Oil (external): Use diluted, 1-2 drops at a time.",
    "safety_level": "medium",
    "contraindications": "Not recommended for acid reflux, stomach ulcers, or hot conditions. Avoid during pregnancy and for children under 12. Overuse may irritate gastrointestinal tract.",
    "description": "Clove (Syzygium aromaticum) is a powerful aromatic spice native to Indonesia with exceptional medicinal properties. Traditionally used in both culinary and medicinal applications, clove excels in oral health, digestive support, and anti-inflammatory effects.",
    "traditional_use": "In Traditional Chinese Medicine, clove is known for warming the stomach, stopping vomiting, and boosting kidney yang energy. It has been used for centuries to relieve digestive discomfort, freshen breath, ease pain, and support men's reproductive health.",
    "modern_applications": "Modern science confirms clove's strong antibacterial, anti-inflammatory, and antioxidant activities. Research supports its use in oral care, digestive health, pain management, and infection control.",
    "taste": "Warming, pungent",
    "meridians": ["Stomach", "Kidney"],
    "part_used": "Flower buds",
    "source": "Indonesia, Madagascar, Zanzibar",
    "growing_regions": ["Indonesia", "Madagascar", "Zanzibar", "Sri Lanka"],
    "price_range": "moderate",
    "availability": "common",
    "quality_score": 85,
    "popularity_score": 80,
    "usage_suggestions": "Clove tea: Steep 2-3 whole cloves with black or red tea before meals for better digestion. Toothache relief: Apply diluted clove oil (1:5 with carrier oil) on cotton ball to affected tooth.",
    "ingredients": [
      "Eugenol - Primary bioactive compound with strong antiseptic and analgesic effects",
      "Tannins - Help tighten tissues and reduce inflammation",
      "Flavonoids - Contribute to antioxidant capacity",
      "Volatile oils - Provide aromatic and antimicrobial properties"
    ]
  },
  {
    "id": "pumpkin-seeds-herb-002",
    "chinese_name": "南瓜籽",
    "english_name": "Pumpkin Seeds",
    "latin_name": "Cucurbita pepo",
    "category": "Men's Health & Hormonal Balance",
    "constitution_type": "qi-deficiency",
    "primary_effects": [
      "Prostate health and BPH support",
      "Hair loss prevention and regrowth",
      "Hormonal balance for men and women",
      "Natural anti-parasitic treatment",
      "Menopause symptom relief",
      "Heart health and blood pressure regulation"
    ],
    "secondary_effects": [
      "Sleep quality improvement",
      "Immune system support",
      "Skin and aging support",
      "Bone health strengthening"
    ],
    "efficacy": [
      "Prostate health and BPH support",
      "Hair loss prevention and regrowth",
      "Hormonal balance for men and women",
      "Natural anti-parasitic treatment"
    ],
    "dosage": "General Health: 10-30 g daily (1-2 handfuls). Parasite Cleanse: 30-50 g daily × 7-10 days. Menopause / Hair Loss: 1 tbsp pumpkin seed oil OR 20-30 g seeds daily.",
    "safety_level": "high",
    "contraindications": "Avoid if allergic to seeds/nuts. Use caution with diuretics or blood pressure medication. People with weak digestion or loose stools should eat in moderation.",
    "description": "Pumpkin seeds (Cucurbita pepo), also called pepitas, are nutrient-packed edible seeds rich in zinc, magnesium, healthy fats, and antioxidants. Traditionally used for prostate support, intestinal parasites, and women's hormonal balance.",
    "traditional_use": "In Traditional Chinese Medicine, pumpkin seeds are warm and tonifying, suitable for people with fatigue, frequent urination, or hormonal imbalance. They have been traditionally used for prostate support, intestinal parasites, and women's hormonal balance.",
    "modern_applications": "Modern studies confirm pumpkin seeds' effectiveness for prostate health (BPH), hair loss prevention, menopause relief, and parasite treatment. Clinical trials show positive results for urinary symptoms, hair regrowth, hot flash reduction, and sleep quality improvement.",
    "taste": "Nutty, slightly sweet",
    "meridians": ["Kidney", "Bladder"],
    "part_used": "Seeds",
    "source": "Global cultivation",
    "growing_regions": ["China", "India", "Mexico", "United States", "Russia"],
    "price_range": "moderate",
    "availability": "common",
    "quality_score": 90,
    "popularity_score": 85,
    "usage_suggestions": "Snack: Eat raw or lightly roasted seeds to preserve nutrients. Smoothie Boost: Blend into shakes for zinc and protein. Prostate Support: Take pumpkin seed oil daily.",
    "ingredients": [
      "Phytosterols (β-sitosterol) - Supports prostate health & hormone balance",
      "Zinc - Boosts fertility, immunity, and hair strength",
      "Magnesium - Relaxes blood vessels, reduces blood pressure",
      "Tryptophan - Promotes melatonin for better sleep",
      "Cucurbitin - Natural anti-parasitic compound",
      "Vitamin E & Selenium - Antioxidant defense against aging"
    ]
  },
  {
    "id": "cinnamon-herb-003",
    "chinese_name": "肉桂",
    "english_name": "Cinnamon",
    "latin_name": "Cinnamomum cassia",
    "category": "Circulation & Blood Sugar Support",
    "constitution_type": "yang-deficiency",
    "primary_effects": [
      "Blood sugar regulation and diabetes support",
      "Menstrual cramps relief and women's health",
      "Cold limbs and poor circulation improvement",
      "Joint pain and arthritis relief",
      "Digestive support and bloating relief",
      "Postpartum recovery and warming support"
    ],
    "secondary_effects": [
      "Anti-inflammatory and antioxidant effects",
      "Cardiovascular health support",
      "Immune system enhancement"
    ],
    "efficacy": [
      "Blood sugar regulation and diabetes support",
      "Menstrual cramps relief and women's health",
      "Cold limbs and poor circulation improvement",
      "Joint pain and arthritis relief"
    ],
    "dosage": "Whole bark (tea): 1.5-3 grams/day. Powder: 0.5-1 gram/day. Capsules/Tincture: 250-500 mg/day. Duration: 7-14 days per cycle; take breaks to avoid liver strain.",
    "safety_level": "medium",
    "contraindications": "Not suitable for hot-type conditions (mouth ulcers, acne, dry throat). Avoid during pregnancy (may stimulate uterine contractions). Not recommended for heavy menstruation, bleeding disorders, or high fever.",
    "description": "Cinnamon (Cinnamomum cassia) is not just a warming kitchen spice—it's a traditional herbal medicine used for centuries to improve blood circulation, regulate blood sugar, relieve menstrual cramps, and ease cold-related pain.",
    "traditional_use": "In Traditional Chinese Medicine (TCM), cinnamon (Rou Gui) is considered a warming herb that warms the yang, dispels internal cold, and invigorates blood flow. It has been used for centuries to treat cold-damp conditions, improve circulation, and support women's reproductive health.",
    "modern_applications": "Modern studies confirm cinnamon's role in diabetes support, arthritis relief, and digestive sluggishness. Research shows it improves insulin sensitivity, reduces inflammatory markers, and supports cardiovascular health through its warming and circulatory properties.",
    "taste": "Warming, sweet, pungent",
    "meridians": ["Heart", "Kidney", "Spleen"],
    "part_used": "Inner bark",
    "source": "China, Sri Lanka, Indonesia",
    "growing_regions": ["China", "Sri Lanka", "Indonesia", "Vietnam", "Madagascar"],
    "price_range": "moderate",
    "availability": "common",
    "quality_score": 88,
    "popularity_score": 92,
    "usage_suggestions": "Cinnamon tea for daily health: Steep 1-2g of cinnamon stick in hot water with honey. Menstrual support recipe: Boil cinnamon with rose and brown sugar; drink before period.",
    "ingredients": [
      "Cinnamaldehyde - Anti-inflammatory, insulin-sensitizing",
      "Cinnamic acid - Antioxidant, boosts blood flow and metabolism",
      "Polyphenols - Improve glucose metabolism and reduce oxidative stress",
      "Essential oils - Stimulate circulation and digestion"
    ]
  },
  {
    "id": "rhubarb-herb-004",
    "chinese_name": "大黄",
    "english_name": "Rhubarb",
    "latin_name": "Rheum palmatum",
    "category": "Digestive & Detoxification",
    "constitution_type": "heat-excess",
    "primary_effects": [
      "Constipation relief and bowel regulation",
      "Liver detoxification and bile flow",
      "Anti-inflammatory and pain relief",
      "Blood purification and skin health",
      "Digestive fire stimulation",
      "Fever reduction and cooling"
    ],
    "secondary_effects": [
      "Antimicrobial and antiviral action",
      "Bone health support",
      "Cardiovascular health",
      "Immune system modulation"
    ],
    "efficacy": [
      "Constipation relief and bowel regulation",
      "Liver detoxification and bile flow",
      "Anti-inflammatory and pain relief",
      "Blood purification and skin health"
    ],
    "dosage": "Powder: 0.5-2 grams/day. Tincture: 1-3 ml/day. Decoction: 3-6 grams/day. Duration: 3-7 days maximum, then take a break.",
    "safety_level": "medium",
    "contraindications": "Avoid during pregnancy and menstruation. Not suitable for chronic diarrhea, inflammatory bowel disease, or kidney problems. May cause dependency with long-term use. Avoid with blood thinners.",
    "description": "Rhubarb (Rheum palmatum) is a powerful cooling herb used in Traditional Chinese Medicine for its purgative, anti-inflammatory, and detoxifying properties. It's particularly effective for constipation, liver health, and clearing heat from the body.",
    "traditional_use": "In Traditional Chinese Medicine, rhubarb (Da Huang) is considered a cold, bitter herb that clears heat, purges fire, and promotes bowel movements. It has been used for centuries to treat constipation, fever, inflammation, and blood stagnation.",
    "modern_applications": "Modern research confirms rhubarb's effectiveness for constipation, liver health, and anti-inflammatory effects. Studies show it improves bowel function, supports liver detoxification, and has antimicrobial properties.",
    "taste": "Bitter, cold",
    "meridians": ["Large Intestine", "Stomach", "Liver"],
    "part_used": "Root and rhizome",
    "source": "China, Tibet",
    "growing_regions": ["China", "Tibet", "Nepal", "Bhutan"],
    "price_range": "moderate",
    "availability": "common",
    "quality_score": 82,
    "popularity_score": 75,
    "usage_suggestions": "Constipation relief: Take 0.5-1g powder with warm water before bed. Liver detox: Combine with other cooling herbs like dandelion root. Skin health: Use in formulas for acne and inflammatory skin conditions.",
    "ingredients": [
      "Anthraquinones (rhein, emodin) - Stimulate bowel movements and liver function",
      "Tannins - Astringent and anti-inflammatory effects",
      "Flavonoids - Antioxidant and anti-inflammatory properties",
      "Polysaccharides - Immune-modulating effects"
    ]
  }
];

// 检查是否已经存在这些草药
const existingSlugs = existingDatabase.map(herb => 
  herb.english_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
);

const newHerbsToAdd = newHerbs.filter(herb => {
  const slug = herb.english_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return !existingSlugs.includes(slug);
});

if (newHerbsToAdd.length === 0) {
  console.log('✅ 所有草药已经存在于数据库中');
  process.exit(0);
}

// 合并数据库
const updatedDatabase = [...existingDatabase, ...newHerbsToAdd];

// 生成新的数据库内容
const newDatabaseContent = herbsDataContent.replace(
  /export const HERBS_DATABASE: Herb\[\] = (\[[\s\S]*?\]);/,
  `export const HERBS_DATABASE: Herb[] = ${JSON.stringify(updatedDatabase, null, 2)};`
);

// 写入文件
fs.writeFileSync(herbsDataPath, newDatabaseContent, 'utf8');

console.log(`✅ 成功添加 ${newHerbsToAdd.length} 种草药到静态数据库:`);
newHerbsToAdd.forEach(herb => {
  console.log(`   - ${herb.english_name} (${herb.chinese_name})`);
});

console.log(`\n📊 数据库统计:`);
console.log(`   - 总草药数量: ${updatedDatabase.length}`);
console.log(`   - 新增草药: ${newHerbsToAdd.length}`);
console.log(`   - 原有草药: ${existingDatabase.length}`);

console.log('\n🚀 现在可以访问以下草药详情页:');
newHerbsToAdd.forEach(herb => {
  const slug = herb.english_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  console.log(`   - /herbs/${slug}`);
});
