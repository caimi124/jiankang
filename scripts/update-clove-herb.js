#!/usr/bin/env node

const { Client } = require('@notionhq/client');

// 使用环境变量的Notion秘钥
const notion = new Client({
  auth: process.env.NOTION_API_TOKEN || 'your-notion-api-token-here'
});

// 草药数据库ID
const databaseId = '2156f14b923c802c8d48d84247b6681a';

// 🚀 优化后的Clove草药数据 - 基于用户提供的新内容
const cloveData = {
  // 基本信息
  name: 'Clove',
  chinese_name: '丁香',
  latin_name: 'Syzygium aromaticum',
  slug: 'clove',
  category: 'Digestive & Oral Health',
  evidence_level: 'Strong',
  safety_level: 'medium',
  
  // SEO优化的概述
  overview: 'Clove (Syzygium aromaticum) is a powerful aromatic spice native to Indonesia with exceptional medicinal properties. Traditionally used in both culinary and medicinal applications, clove excels in oral health, digestive support, and anti-inflammatory effects. Its primary bioactive compound, eugenol, provides strong antiseptic, analgesic, and antimicrobial activities. Clove is particularly effective for toothache relief, digestive discomfort, nausea, and men\'s reproductive health support.',
  
  // 主要功效 - 关键词优化
  primary_benefits: [
    'Oral health and toothache relief',
    'Digestive support and nausea relief',
    'Anti-inflammatory and pain relief',
    'Antibacterial and antimicrobial action',
    'Men\'s reproductive health support',
    'Cold-type abdominal pain relief'
  ],
  
  // 活性成分详解
  active_compounds: 'Clove contains several bioactive compounds that contribute to its therapeutic effects. Eugenol is the primary bioactive compound, accounting for 70-90% of clove essential oil, providing strong antiseptic and analgesic properties. Tannins help tighten tissues and reduce inflammation, while flavonoids contribute to antioxidant capacity. Volatile oils provide aromatic and antimicrobial properties, making clove effective against various pathogens.',
  
  // 作用机制
  mechanism_of_action: 'Eugenol, clove\'s main compound, exerts local anesthetic effects by blocking nerve transmission, explaining its effectiveness in toothache relief. It inhibits inflammatory mediators like COX-2, reducing pain and swelling. Eugenol neutralizes free radicals through antioxidant activity and combats microbial overgrowth through direct antimicrobial action. These combined effects make clove effective for oral care, indigestion, pain relief, and infection control.',
  
  // 功效与适应症
  benefits_conditions: [
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
  
  // 推荐体质
  recommended_constitution: [
    'Yang deficiency',
    'Cold stomach',
    'Poor digestion',
    'Weak circulation'
  ],
  
  // 不推荐体质
  not_recommended_constitution: [
    'Yin deficiency',
    'Internal heat',
    'High blood pressure'
  ],
  
  // 体质解释
  constitution_explanation: 'Clove is warming and stimulating, making it suitable for people who often feel cold, fatigued, or have sluggish digestion. It\'s not suitable for those prone to irritability, insomnia, or heat-related symptoms like ulcers or dry mouth. The warming nature helps balance cold conditions but may exacerbate heat patterns.',
  
  // 使用技巧
  usage_tips: [
    'Clove tea: Steep 2-3 whole cloves with black or red tea before meals for better digestion',
    'Toothache relief: Apply diluted clove oil (1:5 with carrier oil) on cotton ball to affected tooth',
    'Aromatherapy: Inhale clove essential oil to lift mood and fight fatigue',
    'Digestive blend: Mix ground clove with dried ginger and fennel seed for warming tonic'
  ],
  
  // 每日剂量指南
  daily_dose_guide: [
    'Whole Cloves (tea): 1-3 grams/day',
    'Clove Powder: 0.5-1 gram/day',
    'Clove Oil (external): Use diluted, 1-2 drops at a time',
    'Maximum duration: Up to 2 weeks of daily use, then pause'
  ],
  
  // 医学研究摘要
  medical_studies_summary: [
    'A 2022 randomized trial found clove mouthwash significantly reduced halitosis and oral bacteria in patients with gingivitis',
    'In vitro studies confirm eugenol\'s antimicrobial effect against Streptococcus mutans and Candida albicans',
    'A meta-analysis in 2021 highlighted clove\'s anti-ulcer and anti-inflammatory actions via modulation of gastric enzymes and prostaglandins'
  ],
  
  // 病例研究
  case_study: 'Patient: Female, 32, frequent bloating, nausea after cold drinks, and chronic bad breath. Treatment: Clove and ginger tea twice daily before meals + clove mouth rinse once a day. Result (2 weeks): Improved appetite, reduced bloating, halitosis resolved. No side effects. Doctor\'s Note: Warm-natured herbs like clove can be highly effective in cases of cold-related indigestion and bacterial overgrowth when used short-term under guidance.',
  
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
  efficacy_category: [
    'Digestive Health',
    'Oral Care',
    'Anti-inflammatory',
    'Antimicrobial',
    'Pain Relief',
    'Men\'s Health'
  ],
  
  // 安全性等级
  safety_rating: 'Medium',
  
  // 妊娠期安全性
  pregnancy: 'Avoid',
  
  // 哺乳期安全性
  lactation: 'Caution',
  
  // 儿童安全性
  children: 'Avoid under 12',
  
  // 药物相互作用
  interacts_with_drugs: [
    'Blood thinners (may increase bleeding risk)',
    'Diabetes medications (may lower blood sugar)',
    'NSAIDs (may increase stomach irritation)',
    'Anticoagulants (potential interaction)'
  ],
  
  // 内部链接
  internal_links: [
    'Herb Finder - Digestive Health',
    'Oral Health Guide',
    'Men\'s Health Support',
    'Anti-inflammatory Herbs',
    'Safe Herbs During Pregnancy'
  ]
};

async function updateCloveHerb() {
  try {
    console.log('🔍 搜索现有的Clove草药条目...');
    
    // 搜索现有的Clove条目
    const searchResponse = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Herb Name',
        title: {
          contains: 'Clove'
        }
      }
    });
    
    if (searchResponse.results.length > 0) {
      // 更新现有条目
      const existingPage = searchResponse.results[0];
      console.log('✅ 找到现有Clove条目，正在更新...');
      
      await notion.pages.update({
        page_id: existingPage.id,
        properties: {
          'Herb Name': { title: [{ text: { content: cloveData.name } }] },
          'LatinName': { rich_text: [{ text: { content: cloveData.latin_name } }] },
          'Slug': { rich_text: [{ text: { content: cloveData.slug } }] },
          'Category': { select: { name: cloveData.category } },
          'Overview': { rich_text: [{ text: { content: cloveData.overview } }] },
          'ActiveCompounds': { rich_text: [{ text: { content: cloveData.active_compounds } }] },
          'Mechanism of Action': { rich_text: [{ text: { content: cloveData.mechanism_of_action } }] },
          'Benefits & Conditions': { rich_text: [{ text: { content: cloveData.benefits_conditions.join('\n') } }] },
          'Contraindications': { rich_text: [{ text: { content: cloveData.contraindications.join('\n') } }] },
          'Recommended Constitution': { multi_select: cloveData.recommended_constitution.map(name => ({ name })) },
          'Not Recommended Constitution': { multi_select: cloveData.not_recommended_constitution.map(name => ({ name })) },
          'Constitution Explanation': { rich_text: [{ text: { content: cloveData.constitution_explanation } }] },
          'Usage Tips': { rich_text: [{ text: { content: cloveData.usage_tips.join('\n') } }] },
          'Daily Dose Guide': { rich_text: [{ text: { content: cloveData.daily_dose_guide.join('\n') } }] },
          'Medical Studies Summary': { rich_text: [{ text: { content: cloveData.medical_studies_summary.join('\n') } }] },
          'Case Study': { rich_text: [{ text: { content: cloveData.case_study } }] },
          'FAQ': { rich_text: [{ text: { content: cloveData.faq.map(qa => `Q: ${qa.question}\nA: ${qa.answer}`).join('\n\n') } }] },
          'Tags': { multi_select: cloveData.tags.map(name => ({ name })) },
          'Benefits': { multi_select: cloveData.primary_benefits.map(name => ({ name })) },
          'RecommendedFor': { multi_select: cloveData.recommended_constitution.map(name => ({ name })) },
          'NotRecommendedFor': { multi_select: cloveData.not_recommended_constitution.map(name => ({ name })) },
          'InteractsWithDrugs': { multi_select: cloveData.interacts_with_drugs.map(name => ({ name })) },
          'SafetyRating': { select: { name: cloveData.safety_rating } },
          'Pregnancy': { select: { name: cloveData.pregnancy } },
          'Lactation': { select: { name: cloveData.lactation } },
          'Children': { select: { name: cloveData.children } },
          'Internal Links': { rich_text: [{ text: { content: cloveData.internal_links.join('\n') } }] }
        }
      });
      
      console.log('✅ Clove草药数据更新成功！');
      console.log('📊 更新内容：');
      console.log(`   - 概述：${cloveData.overview.length} 字符`);
      console.log(`   - 功效：${cloveData.primary_benefits.length} 项`);
      console.log(`   - 禁忌：${cloveData.contraindications.length} 项`);
      console.log(`   - 标签：${cloveData.tags.length} 个关键词`);
      console.log(`   - FAQ：${cloveData.faq.length} 个问题`);
      
    } else {
      // 创建新条目
      console.log('🆕 未找到现有Clove条目，正在创建新条目...');
      
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          'Herb Name': { title: [{ text: { content: cloveData.name } }] },
          'LatinName': { rich_text: [{ text: { content: cloveData.latin_name } }] },
          'Slug': { rich_text: [{ text: { content: cloveData.slug } }] },
          'Category': { select: { name: cloveData.category } },
          'Overview': { rich_text: [{ text: { content: cloveData.overview } }] },
          'ActiveCompounds': { rich_text: [{ text: { content: cloveData.active_compounds } }] },
          'Mechanism of Action': { rich_text: [{ text: { content: cloveData.mechanism_of_action } }] },
          'Benefits & Conditions': { rich_text: [{ text: { content: cloveData.benefits_conditions.join('\n') } }] },
          'Contraindications': { rich_text: [{ text: { content: cloveData.contraindications.join('\n') } }] },
          'Recommended Constitution': { multi_select: cloveData.recommended_constitution.map(name => ({ name })) },
          'Not Recommended Constitution': { multi_select: cloveData.not_recommended_constitution.map(name => ({ name })) },
          'Constitution Explanation': { rich_text: [{ text: { content: cloveData.constitution_explanation } }] },
          'Usage Tips': { rich_text: [{ text: { content: cloveData.usage_tips.join('\n') } }] },
          'Daily Dose Guide': { rich_text: [{ text: { content: cloveData.daily_dose_guide.join('\n') } }] },
          'Medical Studies Summary': { rich_text: [{ text: { content: cloveData.medical_studies_summary.join('\n') } }] },
          'Case Study': { rich_text: [{ text: { content: cloveData.case_study } }] },
          'FAQ': { rich_text: [{ text: { content: cloveData.faq.map(qa => `Q: ${qa.question}\nA: ${qa.answer}`).join('\n\n') } }] },
          'Tags': { multi_select: cloveData.tags.map(name => ({ name })) },
          'Benefits': { multi_select: cloveData.primary_benefits.map(name => ({ name })) },
          'RecommendedFor': { multi_select: cloveData.recommended_constitution.map(name => ({ name })) },
          'NotRecommendedFor': { multi_select: cloveData.not_recommended_constitution.map(name => ({ name })) },
          'InteractsWithDrugs': { multi_select: cloveData.interacts_with_drugs.map(name => ({ name })) },
          'SafetyRating': { select: { name: cloveData.safety_rating } },
          'Pregnancy': { select: { name: cloveData.pregnancy } },
          'Lactation': { select: { name: cloveData.lactation } },
          'Children': { select: { name: cloveData.children } },
          'Internal Links': { rich_text: [{ text: { content: cloveData.internal_links.join('\n') } }] }
        }
      });
      
      console.log('✅ Clove草药新条目创建成功！');
    }
    
    console.log('\n🎯 SEO关键词优化完成：');
    console.log('   - 主要关键词：Oral Health, Digestive Support, Anti-inflammatory');
    console.log('   - 长尾关键词：Toothache Relief, Men\'s Health, Anti-nausea');
    console.log('   - 症状关键词：Bad Breath, Digestive Discomfort, Cold Pain');
    console.log('   - 功效关键词：Antibacterial, Antimicrobial, Pain Relief');
    
  } catch (error) {
    console.error('❌ 更新Clove草药数据时出错:', error);
    process.exit(1);
  }
}

// 运行更新
updateCloveHerb();
