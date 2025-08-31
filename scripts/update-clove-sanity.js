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

// 🚀 优化后的Clove草药数据 - 基于用户提供的新内容
const cloveData = {
  _type: 'herb',
  title: 'Clove',
  chineseName: '丁香',
  latinName: 'Syzygium aromaticum',
  slug: {
    _type: 'slug',
    current: 'clove'
  },
  category: 'Digestive & Oral Health',
  constitutionType: 'yang-deficiency',
  safetyLevel: 'medium',
  
  // SEO优化的概述
  description: 'Clove (Syzygium aromaticum) is a powerful aromatic spice native to Indonesia with exceptional medicinal properties. Traditionally used in both culinary and medicinal applications, clove excels in oral health, digestive support, and anti-inflammatory effects. Its primary bioactive compound, eugenol, provides strong antiseptic, analgesic, and antimicrobial activities. Clove is particularly effective for toothache relief, digestive discomfort, nausea, and men\'s reproductive health support.',
  
  // 主要功效 - 关键词优化
  primaryEffects: [
    'Oral health and toothache relief',
    'Digestive support and nausea relief',
    'Anti-inflammatory and pain relief',
    'Antibacterial and antimicrobial action',
    'Men\'s reproductive health support',
    'Cold-type abdominal pain relief'
  ],
  
  // 活性成分详解
  activeCompounds: [
    'Eugenol - Primary bioactive compound with strong antiseptic and analgesic effects',
    'Tannins - Help tighten tissues and reduce inflammation',
    'Flavonoids - Contribute to antioxidant capacity',
    'Volatile oils - Provide aromatic and antimicrobial properties'
  ],
  
  // 作用机制
  mechanismOfAction: 'Eugenol, clove\'s main compound, exerts local anesthetic effects by blocking nerve transmission, explaining its effectiveness in toothache relief. It inhibits inflammatory mediators like COX-2, reducing pain and swelling. Eugenol neutralizes free radicals through antioxidant activity and combats microbial overgrowth through direct antimicrobial action. These combined effects make clove effective for oral care, indigestion, pain relief, and infection control.',
  
  // 功效与适应症
  benefitsAndConditions: [
    'Oral health - Toothache relief, breath freshening, bacterial control',
    'Nausea and vomiting - Settles upset stomach, motion sickness relief',
    'Bloating and poor appetite - Stimulates digestive enzymes, reduces gas',
    'Cold-type abdominal pain - Warms stomach, soothes cramps',
    'Men\'s health - Supports low libido, impotence, cold-type infertility',
    'Anti-inflammatory - Arthritis, headaches, injury-related swelling',
    'Mild infections - Topical use for athlete\'s foot, cuts, acne'
  ],
  
  // 禁忌症
  contraindications: [
    'Not recommended for acid reflux, stomach ulcers, or "hot" conditions',
    'Avoid during pregnancy and for children under 12',
    'Overuse may irritate gastrointestinal tract',
    'Do not mix with turmeric or curcumin (TCM incompatibility)',
    'May cause nausea or dizziness with excessive use'
  ],
  
  // 传统用法
  traditionalUse: 'In Traditional Chinese Medicine, clove is known for warming the stomach, stopping vomiting, and boosting kidney yang energy. It has been used for centuries to relieve digestive discomfort, freshen breath, ease pain, and support men\'s reproductive health. Clove\'s warming nature makes it particularly effective for cold-type conditions and yang deficiency patterns.',
  
  // 现代应用
  modernApplications: 'Modern science confirms clove\'s strong antibacterial, anti-inflammatory, and antioxidant activities. Research supports its use in oral care, digestive health, pain management, and infection control. Clinical studies demonstrate effectiveness in reducing halitosis, managing digestive discomfort, and providing natural pain relief.',
  
  // 用法用量
  dosage: 'Whole Cloves (tea): 1-3 grams/day. Clove Powder: 0.5-1 gram/day. Clove Oil (external): Use diluted, 1-2 drops at a time. Maximum duration: Up to 2 weeks of daily use, then pause.',
  
  // 使用技巧
  usageTips: [
    'Clove tea: Steep 2-3 whole cloves with black or red tea before meals for better digestion',
    'Toothache relief: Apply diluted clove oil (1:5 with carrier oil) on cotton ball to affected tooth',
    'Aromatherapy: Inhale clove essential oil to lift mood and fight fatigue',
    'Digestive blend: Mix ground clove with dried ginger and fennel seed for warming tonic'
  ],
  
  // 医学研究摘要
  medicalStudies: [
    'A 2022 randomized trial found clove mouthwash significantly reduced halitosis and oral bacteria in patients with gingivitis',
    'In vitro studies confirm eugenol\'s antimicrobial effect against Streptococcus mutans and Candida albicans',
    'A meta-analysis in 2021 highlighted clove\'s anti-ulcer and anti-inflammatory actions via modulation of gastric enzymes and prostaglandins'
  ],
  
  // 病例研究
  caseStudy: 'Patient: Female, 32, frequent bloating, nausea after cold drinks, and chronic bad breath. Treatment: Clove and ginger tea twice daily before meals + clove mouth rinse once a day. Result (2 weeks): Improved appetite, reduced bloating, halitosis resolved. No side effects. Doctor\'s Note: Warm-natured herbs like clove can be highly effective in cases of cold-related indigestion and bacterial overgrowth when used short-term under guidance.',
  
  // FAQ
  faq: [
    {
      question: 'Is clove safe for daily use?',
      answer: 'Small culinary amounts are safe. Therapeutic doses (e.g., clove oil) should not be used long-term without supervision.'
    },
    {
      question: 'Can I use clove oil for gum pain?',
      answer: 'Yes, but always dilute it and avoid direct contact with sensitive tissue.'
    },
    {
      question: 'Does clove help with bad breath?',
      answer: 'Yes, its antimicrobial and aromatic compounds make it a powerful breath freshener.'
    },
    {
      question: 'Can clove help with fertility?',
      answer: 'Traditionally yes, especially in men with cold-type sexual weakness. Modern evidence is limited but promising.'
    }
  ],
  
  // 标签 - SEO关键词优化
  tags: [
    'Digestion',
    'Oral Health', 
    'Inflammation',
    'Men\'s Health',
    'Antibacterial',
    'Anti-nausea',
    'Toothache Relief',
    'Digestive Support',
    'Anti-inflammatory',
    'Antimicrobial',
    'Pain Relief',
    'Breath Freshener',
    'Cold Relief',
    'Stomach Health'
  ],
  
  // 功效分类
  efficacyCategory: [
    'Digestive Health',
    'Oral Care',
    'Anti-inflammatory',
    'Antimicrobial',
    'Pain Relief',
    'Men\'s Health'
  ],
  
  // 安全性等级
  safetyLevel: 'medium',
  
  // 妊娠期安全性
  pregnancySafety: 'Avoid',
  
  // 哺乳期安全性
  lactationSafety: 'Caution',
  
  // 儿童安全性
  childrenSafety: 'Avoid under 12',
  
  // 药物相互作用
  drugInteractions: [
    'Blood thinners (may increase bleeding risk)',
    'Diabetes medications (may lower blood sugar)',
    'NSAIDs (may increase stomach irritation)',
    'Anticoagulants (potential interaction)'
  ],
  
  // 内部链接
  internalLinks: [
    'Herb Finder - Digestive Health',
    'Oral Health Guide',
    'Men\'s Health Support',
    'Anti-inflammatory Herbs',
    'Safe Herbs During Pregnancy'
  ],
  
  // SEO字段
  seoTitle: 'Clove Benefits: Oral Health, Digestive Support & Anti-inflammatory Effects',
  seoDescription: 'Discover clove (Syzygium aromaticum) benefits for oral health, digestive support, and pain relief. Learn about eugenol\'s antimicrobial properties, usage tips, and safety guidelines.',
  seoKeywords: [
    'clove benefits',
    'clove oil toothache',
    'clove for bad breath',
    'clove digestive health',
    'eugenol benefits',
    'clove anti-inflammatory',
    'clove antimicrobial',
    'clove men\'s health'
  ]
};

async function updateCloveHerb() {
  try {
    console.log('🔍 搜索现有的Clove草药条目...');
    
    // 搜索现有的Clove条目
    const query = `*[_type == "herb" && (title == "Clove" || chineseName == "丁香")]`;
    const existingHerbs = await client.fetch(query);
    
    if (existingHerbs.length > 0) {
      // 更新现有条目
      const existingHerb = existingHerbs[0];
      console.log('✅ 找到现有Clove条目，正在更新...');
      
      const updatedHerb = await client
        .patch(existingHerb._id)
        .set(cloveData)
        .commit();
      
      console.log('✅ Clove草药数据更新成功！');
      console.log('📊 更新内容：');
      console.log(`   - 概述：${cloveData.description.length} 字符`);
      console.log(`   - 功效：${cloveData.primaryEffects.length} 项`);
      console.log(`   - 禁忌：${cloveData.contraindications.length} 项`);
      console.log(`   - 标签：${cloveData.tags.length} 个关键词`);
      console.log(`   - FAQ：${cloveData.faq.length} 个问题`);
      
    } else {
      // 创建新条目
      console.log('🆕 未找到现有Clove条目，正在创建新条目...');
      
      const newHerb = await client.create(cloveData);
      
      console.log('✅ Clove草药新条目创建成功！');
      console.log(`📝 新条目ID: ${newHerb._id}`);
    }
    
    console.log('\n🎯 SEO关键词优化完成：');
    console.log('   - 主要关键词：Oral Health, Digestive Support, Anti-inflammatory');
    console.log('   - 长尾关键词：Toothache Relief, Men\'s Health, Anti-nausea');
    console.log('   - 症状关键词：Bad Breath, Digestive Discomfort, Cold Pain');
    console.log('   - 功效关键词：Antibacterial, Antimicrobial, Pain Relief');
    
    console.log('\n🚀 数据已同步到Sanity CMS，将在1小时内自动更新到网站！');
    
  } catch (error) {
    console.error('❌ 更新Clove草药数据时出错:', error);
    process.exit(1);
  }
}

// 运行更新
updateCloveHerb();
