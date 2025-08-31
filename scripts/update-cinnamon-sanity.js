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

// 🚀 优化后的Cinnamon草药数据 - 基于用户提供的SEO优化内容
const cinnamonData = {
  _type: 'herb',
  title: 'Cinnamon',
  chineseName: '肉桂',
  latinName: 'Cinnamomum cassia',
  slug: {
    _type: 'slug',
    current: 'cinnamon'
  },
  category: 'Circulation & Blood Sugar Support',
  constitutionType: 'yang-deficiency',
  safetyLevel: 'medium',
  
  // SEO优化的概述
  description: 'Cinnamon (Cinnamomum cassia) is not just a warming kitchen spice—it\'s a traditional herbal medicine used for centuries to improve blood circulation, regulate blood sugar, relieve menstrual cramps, and ease cold-related pain. In Traditional Chinese Medicine (TCM), cinnamon (Rou Gui) is considered a warming herb that "warms the yang," dispels internal cold, and invigorates blood flow.',
  
  // 主要功效 - 关键词优化
  primaryEffects: [
    'Blood sugar regulation and diabetes support',
    'Menstrual cramps relief and women\'s health',
    'Cold limbs and poor circulation improvement',
    'Joint pain and arthritis relief',
    'Digestive support and bloating relief',
    'Postpartum recovery and warming support',
    'Anti-inflammatory and antioxidant effects'
  ],
  
  // 活性成分详解
  activeCompounds: [
    'Cinnamaldehyde - Anti-inflammatory, insulin-sensitizing',
    'Cinnamic acid - Antioxidant, boosts blood flow and metabolism',
    'Polyphenols - Improve glucose metabolism and reduce oxidative stress',
    'Essential oils - Stimulate circulation and digestion'
  ],
  
  // 作用机制
  mechanismOfAction: 'Blood Sugar Regulation: Improves insulin sensitivity and glucose uptake, helpful for type 2 diabetes and metabolic syndrome. Circulation Booster: Enhances peripheral blood flow, warming cold limbs and easing stiffness. Anti-Inflammatory Action: Polyphenols reduce cytokines like IL-6 and TNF-α, useful for arthritis and chronic inflammation. Digestive Support: Stimulates gastric juices, helping with bloating and sluggish digestion (especially in cold climates).',
  
  // 功效与适应症
  benefitsAndConditions: [
    'Cinnamon for Joint Pain & Arthritis - Relieves stiffness and pain that worsen in cold, damp weather',
    'Cinnamon for Cold Hands & Feet - Improves circulation and warms limbs for those with poor blood flow',
    'Cinnamon for Menstrual Cramps - Eases cold-type dysmenorrhea, clotting, and delayed periods',
    'Cinnamon for Digestion - Enhances appetite, relieves bloating, especially after heavy meals or in winter',
    'Cinnamon for Blood Sugar & Diabetes - Supports insulin sensitivity and helps regulate fasting glucose',
    'Cinnamon for Postpartum Recovery - Warms the body, restores circulation, reduces cold-induced uterine cramps'
  ],
  
  // 禁忌症
  contraindications: [
    'Not suitable for hot-type conditions (mouth ulcers, acne, dry throat)',
    'Avoid during pregnancy (may stimulate uterine contractions)',
    'Not recommended for heavy menstruation, bleeding disorders, or high fever',
    'May interact with certain liver medications or cause issues in high doses',
    'Long-term use without breaks can strain the liver—follow safe dosage guidelines'
  ],
  
  // 传统用法
  traditionalUse: 'In Traditional Chinese Medicine (TCM), cinnamon (Rou Gui) is considered a warming herb that "warms the yang," dispels internal cold, and invigorates blood flow. It has been used for centuries to treat cold-damp conditions, improve circulation, and support women\'s reproductive health.',
  
  // 现代应用
  modernApplications: 'Modern studies confirm cinnamon\'s role in diabetes support, arthritis relief, and digestive sluggishness. Research shows it improves insulin sensitivity, reduces inflammatory markers, and supports cardiovascular health through its warming and circulatory properties.',
  
  // 用法用量
  dosage: 'Whole bark (tea): 1.5-3 grams/day. Powder: 0.5-1 gram/day. Capsules/Tincture: 250-500 mg/day. Duration: 7-14 days per cycle; take breaks to avoid liver strain.',
  
  // 使用技巧
  usageTips: [
    'Cinnamon tea for daily health: Steep 1-2g of cinnamon stick in hot water with honey',
    'Menstrual support recipe: Boil cinnamon with rose and brown sugar; drink before period',
    'Pain relief blend: Mix cinnamon powder with ginger tea for cold-induced back or joint pain',
    'Capsules or tincture: For blood sugar support (250-500 mg/day, follow product label)',
    'Warming foot soak: Cinnamon + ginger boiled in water to ease cold feet and fatigue'
  ],
  
  // 医学研究摘要
  medicalStudies: [
    'A 2021 meta-analysis found cinnamon significantly improved fasting blood glucose and insulin sensitivity in type 2 diabetes',
    'Patients taking 1-2g daily for 8 weeks had lower inflammatory markers (CRP, IL-6)',
    'Animal studies show cinnamon reduces arthritis pain and swelling',
    'Traditional formulas with cinnamon improved dysmenorrhea (menstrual cramps) and poor peripheral circulation in women'
  ],
  
  // 病例研究
  caseStudy: 'Cinnamon for Back Pain. Patient: Male, 42, with chronic low back pain for 2 years, worse in winter. Symptoms: Dull aching pain, cold sensitivity, sluggish energy. Diagnosis: Cold-damp back pain with blood stagnation. Treatment: Cinnamon powder (5g) with warm wine, 3× daily. Result: Pain relief within 3 days, improved mobility and energy. Doctor\'s Note: Warming herbs like cinnamon are especially effective for cold-induced pain without structural damage.',
  
  // FAQ
  faq: [
    {
      question: 'Is cinnamon good for diabetes?',
      answer: 'Yes. Cinnamon supports insulin sensitivity and helps regulate blood sugar. Best for prediabetic or type 2 diabetes patients under medical supervision.'
    },
    {
      question: 'Can cinnamon help with menstrual cramps?',
      answer: 'Yes, cinnamon warms the uterus and relieves cold-type cramps. Avoid if bleeding is heavy.'
    },
    {
      question: 'Cassia vs Ceylon cinnamon – which is better?',
      answer: 'Cassia (C. cassia) is stronger and used in TCM for medicinal purposes. Ceylon (C. verum) is milder and more common in food.'
    },
    {
      question: 'How much cinnamon per day is safe?',
      answer: '1-3g bark or 0.5-1g powder daily is safe. Long-term high doses may harm the liver.'
    },
    {
      question: 'Can I take cinnamon every day?',
      answer: 'Short-term use (7-14 days) is fine. For long-term health, take breaks between cycles.'
    }
  ],
  
  // 标签 - SEO关键词优化
  tags: [
    'Cinnamon benefits',
    'Cinnamon for blood sugar',
    'Cinnamon for inflammation',
    'Cinnamon for menstrual cramps',
    'Cinnamon for arthritis',
    'Cinnamon for cold limbs',
    'Cinnamon side effects',
    'Cinnamon dosage',
    'Blood sugar control',
    'Diabetes support',
    'Women\'s health',
    'Circulation improvement',
    'Joint pain relief',
    'Digestive support'
  ],
  
  // 功效分类
  efficacyCategory: [
    'Blood Sugar Support',
    'Women\'s Health',
    'Circulation & Warming',
    'Joint & Pain Relief',
    'Digestive Health',
    'Anti-inflammatory',
    'Postpartum Support'
  ],
  
  // 安全性等级
  safetyLevel: 'medium',
  
  // 妊娠期安全性
  pregnancySafety: 'Avoid',
  
  // 哺乳期安全性
  lactationSafety: 'Caution',
  
  // 儿童安全性
  childrenSafety: 'Safe in small amounts',
  
  // 药物相互作用
  drugInteractions: [
    'Diabetes medications (may lower blood sugar further)',
    'Blood thinners (may increase bleeding risk)',
    'Liver medications (potential interaction)',
    'Anticoagulants (monitor closely)'
  ],
  
  // 内部链接
  internalLinks: [
    'Blood Sugar Support Guide',
    'Women\'s Health Supplements',
    'Circulation Improvement',
    'Joint Pain Solutions',
    'Digestive Health Support',
    'Traditional Chinese Medicine'
  ],
  
  // SEO字段
  seoTitle: 'Cinnamon Benefits for Blood Sugar, Menstrual Cramps & Cold Limbs | HerbScience',
  seoDescription: 'Discover the benefits of cinnamon (Cinnamomum cassia) for blood sugar, menstrual cramps, arthritis, and cold limbs. Learn safe dosage, side effects, and best uses.',
  seoKeywords: [
    'cinnamon benefits',
    'cinnamon for blood sugar',
    'cinnamon for menstrual cramps',
    'cinnamon for arthritis',
    'cinnamon for cold limbs',
    'cinnamon dosage',
    'cinnamon side effects',
    'cinnamon diabetes support'
  ]
};

async function updateCinnamonHerb() {
  try {
    console.log('🔍 搜索现有的Cinnamon草药条目...');
    
    // 搜索现有的Cinnamon条目
    const query = `*[_type == "herb" && (title == "Cinnamon" || chineseName == "肉桂")]`;
    const existingHerbs = await client.fetch(query);
    
    if (existingHerbs.length > 0) {
      // 更新现有条目
      const existingHerb = existingHerbs[0];
      console.log('✅ 找到现有Cinnamon条目，正在更新...');
      
      const updatedHerb = await client
        .patch(existingHerb._id)
        .set(cinnamonData)
        .commit();
      
      console.log('✅ Cinnamon草药数据更新成功！');
      console.log('📊 更新内容：');
      console.log(`   - 概述：${cinnamonData.description.length} 字符`);
      console.log(`   - 功效：${cinnamonData.primaryEffects.length} 项`);
      console.log(`   - 禁忌：${cinnamonData.contraindications.length} 项`);
      console.log(`   - 标签：${cinnamonData.tags.length} 个关键词`);
      console.log(`   - FAQ：${cinnamonData.faq.length} 个问题`);
      
    } else {
      // 创建新条目
      console.log('🆕 未找到现有Cinnamon条目，正在创建新条目...');
      
      const newHerb = await client.create(cinnamonData);
      
      console.log('✅ Cinnamon草药新条目创建成功！');
      console.log(`📝 新条目ID: ${newHerb._id}`);
    }
    
    console.log('\n🎯 SEO关键词优化完成：');
    console.log('   - 主要关键词：Blood Sugar, Menstrual Cramps, Cold Limbs, Arthritis');
    console.log('   - 长尾关键词：Cinnamon for Diabetes, Cinnamon for Women\'s Health');
    console.log('   - 症状关键词：Diabetes Support, Pain Relief, Circulation Improvement');
    console.log('   - 功效关键词：Anti-inflammatory, Warming, Blood Sugar Control');
    
    console.log('\n🚀 数据已同步到Sanity CMS，将在1小时内自动更新到网站！');
    
  } catch (error) {
    console.error('❌ 更新Cinnamon草药数据时出错:', error);
    process.exit(1);
  }
}

// 运行更新
updateCinnamonHerb();
