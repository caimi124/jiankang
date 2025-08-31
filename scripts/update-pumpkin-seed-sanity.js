#!/usr/bin/env node

const { createClient } = require('@sanity/client');

// Sanity客户端配置
const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp',
  apiVersion: '2024-01-01',
  useCdn: false
});

// 🚀 优化后的Pumpkin Seed草药数据 - 基于用户提供的新内容
const pumpkinSeedData = {
  _type: 'herb',
  title: 'Pumpkin Seeds',
  chineseName: '南瓜籽',
  latinName: 'Cucurbita pepo',
  slug: {
    _type: 'slug',
    current: 'pumpkin-seeds'
  },
  category: 'Men\'s Health & Hormonal Balance',
  constitutionType: 'qi-deficiency',
  safetyLevel: 'high',
  
  // SEO优化的概述
  description: 'Pumpkin seeds (Cucurbita pepo), also called pepitas, are nutrient-packed edible seeds rich in zinc, magnesium, healthy fats, and antioxidants. Traditionally used for prostate support, intestinal parasites, and women\'s hormonal balance, pumpkin seeds are now backed by modern studies showing positive effects on men\'s fertility, hair growth, menopause relief, heart health, and sleep quality.',
  
  // 主要功效 - 关键词优化
  primaryEffects: [
    'Prostate health and BPH support',
    'Hair loss prevention and regrowth',
    'Hormonal balance for men and women',
    'Natural anti-parasitic treatment',
    'Menopause symptom relief',
    'Heart health and blood pressure regulation',
    'Sleep quality improvement',
    'Immune system support'
  ],
  
  // 活性成分详解
  activeCompounds: [
    'Phytosterols (β-sitosterol) - Supports prostate health & hormone balance',
    'Zinc - Boosts fertility, immunity, and hair strength',
    'Magnesium - Relaxes blood vessels, reduces blood pressure',
    'Tryptophan - Promotes melatonin for better sleep',
    'Cucurbitin - Natural anti-parasitic compound',
    'Vitamin E & Selenium - Antioxidant defense against aging',
    'Omega-6 fatty acids & CoQ10 - Support heart health & skin vitality'
  ],
  
  // 作用机制
  mechanismOfAction: 'Hormone Modulation: Phytosterols may block 5-alpha-reductase, protecting the prostate and reducing hair loss. Antioxidant Defense: Vitamin E, selenium, and carotenoids fight oxidative stress and aging. Anti-Parasitic: Cucurbitin paralyzes intestinal worms, making them easier to expel. Cardiovascular Support: Magnesium + unsaturated fats help relax vessels and lower cholesterol. Sleep Enhancement: Tryptophan → serotonin → melatonin, supporting restful sleep.',
  
  // 功效与适应症
  benefitsAndConditions: [
    'Prostate Health (BPH) - Reduces urinary symptoms and supports normal prostate size',
    'Male Fertility & Libido - Zinc boosts testosterone and sperm quality',
    'Hair Loss (Androgenic Alopecia) - Supports hair regrowth via hormonal balance',
    'Menopause Support - Relieves hot flashes, mood swings, and insomnia',
    'Skin & Aging - Antioxidants improve elasticity and slow skin aging',
    'Bone Health - Magnesium and zinc strengthen bones after menopause',
    'Anti-Parasitic - Safe traditional remedy for hookworm and tapeworm infections',
    'Immune Boost - Strengthens resistance against colds and infections',
    'Blood Pressure & Cholesterol Regulation',
    'Sleep Quality Improvement',
    'Inflammation & Oxidative Stress Reduction'
  ],
  
  // 禁忌症
  contraindications: [
    'Avoid if allergic to seeds/nuts',
    'Use caution with diuretics or blood pressure medication',
    'People with weak digestion or loose stools should eat in moderation',
    'Not ideal for damp-heat constitutions in TCM terms'
  ],
  
  // 传统用法
  traditionalUse: 'In Traditional Chinese Medicine, pumpkin seeds are warm and tonifying, suitable for people with fatigue, frequent urination, or hormonal imbalance. They have been traditionally used for prostate support, intestinal parasites, and women\'s hormonal balance, particularly during menopause.',
  
  // 现代应用
  modernApplications: 'Modern studies confirm pumpkin seeds\' effectiveness for prostate health (BPH), hair loss prevention, menopause relief, and parasite treatment. Clinical trials show positive results for urinary symptoms, hair regrowth, hot flash reduction, and sleep quality improvement.',
  
  // 用法用量
  dosage: 'General Health: 10-30 g daily (1-2 handfuls). Parasite Cleanse: 30-50 g daily × 7-10 days. Menopause / Hair Loss: 1 tbsp pumpkin seed oil OR 20-30 g seeds daily. Children (deworming): 1 tsp ground seeds mixed with honey or porridge.',
  
  // 使用技巧
  usageTips: [
    'Snack: Eat raw or lightly roasted seeds to preserve nutrients',
    'Smoothie Boost: Blend into shakes for zinc and protein',
    'Prostate Support: Take pumpkin seed oil daily',
    'Parasite Cleanse: Grind raw seeds into powder, consume on empty stomach',
    'Hormone Balance: Combine with flaxseeds or sesame'
  ],
  
  // 医学研究摘要
  medicalStudies: [
    'Prostate Health: Pumpkin seed oil reduced urinary symptoms in men with BPH',
    'Hair Loss: 40% hair regrowth after 6 months of pumpkin seed extract (clinical trial)',
    'Menopause Relief: Women taking pumpkin seed oil had fewer hot flashes & better HDL cholesterol',
    'Parasite Treatment: Cucurbitin confirmed effective against hookworms & tapeworms',
    'Sleep Quality: Tryptophan-rich pumpkin seeds improved sleep onset and duration'
  ],
  
  // 病例研究
  caseStudy: 'Pumpkin Seeds for Pediatric Hookworm Infection. Patient: Female, 4 years old, fatigue, pica, bloating. Treatment: 90-150 g raw pumpkin seeds/day (divided doses) × 4 weeks. Results: Appetite improved, bloating gone, no more hookworm eggs in stool test. Clinical Note: Safe, effective traditional therapy for children – should complement, not replace, medical care.',
  
  // FAQ
  faq: [
    {
      question: 'Can pumpkin seeds help with hair loss?',
      answer: 'Yes, they block 5-alpha-reductase and support hormone balance, reducing thinning hair.'
    },
    {
      question: 'How do I use pumpkin seeds for parasites?',
      answer: 'Take 30-50 g of ground raw seeds daily for about a week, ideally on an empty stomach.'
    },
    {
      question: 'Are pumpkin seeds good for women in menopause?',
      answer: 'Absolutely. They reduce hot flashes, improve sleep, and support healthy cholesterol.'
    },
    {
      question: 'Can kids eat pumpkin seeds for worms?',
      answer: 'Yes, in small amounts. Mix ground seeds with honey or porridge for safe deworming.'
    }
  ],
  
  // 标签 - SEO关键词优化
  tags: [
    'Prostate Health',
    'Hormonal Balance',
    'Heart Health',
    'Antioxidant',
    'Anti-Parasitic',
    'Men\'s Health',
    'Women\'s Health',
    'Immune Support',
    'Hair Loss Treatment',
    'Menopause Relief',
    'Fertility Support',
    'Sleep Improvement',
    'Blood Pressure',
    'Cholesterol Control'
  ],
  
  // 功效分类
  efficacyCategory: [
    'Men\'s Health',
    'Women\'s Health',
    'Hormonal Balance',
    'Prostate Support',
    'Hair Health',
    'Anti-Parasitic',
    'Cardiovascular Health',
    'Sleep Support'
  ],
  
  // 安全性等级
  safetyLevel: 'high',
  
  // 妊娠期安全性
  pregnancySafety: 'Safe',
  
  // 哺乳期安全性
  lactationSafety: 'Safe',
  
  // 儿童安全性
  childrenSafety: 'Safe in moderation',
  
  // 药物相互作用
  drugInteractions: [
    'Diuretics (may increase effect)',
    'Blood pressure medications (monitor closely)',
    'Anticoagulants (potential interaction)',
    'Diabetes medications (may affect blood sugar)'
  ],
  
  // 内部链接
  internalLinks: [
    'Prostate Health Guide',
    'Hair Loss Solutions',
    'Menopause Support',
    'Natural Parasite Remedies',
    'Men\'s Health Supplements',
    'Women\'s Health Support'
  ],
  
  // SEO字段
  seoTitle: 'Pumpkin Seeds Benefits: Prostate Health, Hair Growth & Hormonal Balance | HerbScience',
  seoDescription: 'Discover pumpkin seeds (Cucurbita pepo) benefits for prostate health, hair loss prevention, menopause relief, and natural parasite treatment. Rich in zinc, magnesium, and antioxidants.',
  seoKeywords: [
    'pumpkin seeds benefits',
    'pumpkin seeds for prostate health',
    'pumpkin seeds for hair loss',
    'pumpkin seeds for menopause',
    'pumpkin seeds for parasites',
    'pumpkin seed oil benefits',
    'pumpkin seeds hormonal balance',
    'pumpkin seeds fertility'
  ]
};

async function updatePumpkinSeedHerb() {
  try {
    console.log('🔍 搜索现有的Pumpkin Seeds草药条目...');
    
    // 搜索现有的Pumpkin Seeds条目
    const query = `*[_type == "herb" && (title == "Pumpkin Seeds" || chineseName == "南瓜籽")]`;
    const existingHerbs = await client.fetch(query);
    
    if (existingHerbs.length > 0) {
      // 更新现有条目
      const existingHerb = existingHerbs[0];
      console.log('✅ 找到现有Pumpkin Seeds条目，正在更新...');
      
      const updatedHerb = await client
        .patch(existingHerb._id)
        .set(pumpkinSeedData)
        .commit();
      
      console.log('✅ Pumpkin Seeds草药数据更新成功！');
      console.log('📊 更新内容：');
      console.log(`   - 概述：${pumpkinSeedData.description.length} 字符`);
      console.log(`   - 功效：${pumpkinSeedData.primaryEffects.length} 项`);
      console.log(`   - 禁忌：${pumpkinSeedData.contraindications.length} 项`);
      console.log(`   - 标签：${pumpkinSeedData.tags.length} 个关键词`);
      console.log(`   - FAQ：${pumpkinSeedData.faq.length} 个问题`);
      
    } else {
      // 创建新条目
      console.log('🆕 未找到现有Pumpkin Seeds条目，正在创建新条目...');
      
      const newHerb = await client.create(pumpkinSeedData);
      
      console.log('✅ Pumpkin Seeds草药新条目创建成功！');
      console.log(`📝 新条目ID: ${newHerb._id}`);
    }
    
    console.log('\n🎯 SEO关键词优化完成：');
    console.log('   - 主要关键词：Prostate Health, Hair Growth, Hormonal Balance');
    console.log('   - 长尾关键词：Pumpkin Seeds for Menopause, Anti-Parasitic Treatment');
    console.log('   - 症状关键词：Hair Loss, Hot Flashes, Prostate Issues');
    console.log('   - 功效关键词：Antioxidant, Anti-Parasitic, Fertility Support');
    
    console.log('\n🚀 数据已同步到Sanity CMS，将在1小时内自动更新到网站！');
    
  } catch (error) {
    console.error('❌ 更新Pumpkin Seeds草药数据时出错:', error);
    process.exit(1);
  }
}

// 运行更新
updatePumpkinSeedHerb();
