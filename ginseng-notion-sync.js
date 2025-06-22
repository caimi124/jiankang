const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: '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'
});

// 完整的人参数据 - 基于用户提供的详细模板
const ginsengData = {
  // 基本信息
  name: 'Ginseng',
  chinese_name: '人参',
  latin_name: 'Panax ginseng',
  slug: 'ginseng',
  category: 'Adaptogen',
  evidence_level: 'Strong',
  safety_level: 'medium',
  
  // SEO和基本描述
  overview: 'Ginseng (Panax ginseng) is one of the most revered herbs in traditional Chinese and Korean medicine. Known as an adaptogen, it helps the body manage stress, fight fatigue, and restore balance. Today, Ginseng remains a popular herbal remedy for boosting energy, focus, and immunity.',
  
  // 主要功效
  primary_benefits: [
    'Fights fatigue and increases energy naturally',
    'Enhances memory, focus, and mental clarity',
    'Strengthens the immune system',
    'Improves circulation and blood sugar balance',
    'Supports recovery after illness or surgery'
  ],
  
  // 活性成分详解
  active_compounds: 'The main active compounds in Panax ginseng are ginsenosides, which have antioxidant, anti-inflammatory, and neuroprotective effects. They work by enhancing mitochondrial energy production, regulating the stress-response (HPA axis), and supporting nitric oxide production (beneficial for blood flow).',
  
  // 传统用法
  traditional_uses: 'In Traditional Chinese Medicine (TCM), Ginseng is considered a "superior tonic" used to tonify Qi (vital energy), calm the mind (Shen) and enhance focus, rebuild strength after chronic illness, and nourish the lungs and heart.',
  
  // 适用人群
  suitable_for: [
    'People with low energy, brain fog, or chronic fatigue',
    'Professionals under high mental stress',
    'Individuals recovering from illness or surgery',
    'Older adults seeking cognitive and physical support'
  ],
  
  // 不适用人群
  not_suitable_for: [
    'People with uncontrolled high blood pressure',
    'Those with insomnia or sleep disorders',
    'Pregnant women',
    'Children under 12 years old'
  ],
  
  // 用法用量
  dosage_info: {
    capsule: '200–400 mg/day (standardized to 5% ginsenosides, take with food)',
    tea: '1–2g dried root, boiled 10–15 minutes, drink 1-2 cups daily',
    tincture: '30–50 drops in water, 1–2 times per day',
    soup: '5-10g root, simmer with lotus seeds and dates for recovery boost'
  },
  
  // 安全警告
  safety_warnings: [
    'May interact with blood pressure, blood sugar, or anticoagulant medications',
    'Avoid during fever or acute inflammation',
    'Monitor for insomnia, restlessness, or fast heartbeat if overdosed',
    'Take in cycles: 3 weeks on, 1 week off'
  ],
  
  // 药物相互作用
  drug_interactions: [
    'Blood pressure medications',
    'Diabetes medications (may affect blood sugar)',
    'Blood thinners (warfarin)',
    'MAO inhibitors',
    'Stimulant medications'
  ],
  
  // 科学证据
  scientific_evidence: 'A 2022 randomized trial found Ginseng reduced fatigue by 28% among adults with chronic tiredness. Several studies show improved cognitive performance in aging adults. Ginsenosides shown to reduce inflammation markers in lab and animal studies. Sources: PubMed, Journal of Ginseng Research.',
  
  // 中医体质匹配
  constitution_match: {
    qi_deficient: 'Ideal for pale face, tiredness, and low voice',
    yang_deficient: 'May benefit, consider warming version',
    yin_deficient: 'Not ideal; may cause dryness',
    heat_excess: 'Avoid if experiencing fever or irritability'
  },
  
  // 搭配建议
  pairs_well_with: [
    'Rhodiola Rosea – for stress resistance',
    'Ginger – boosts circulation and warmth',
    'Cordyceps – enhances stamina in recovery',
    'Astragalus – immune and energy support'
  ],
  
  // 用户评价
  user_testimonials: [
    {
      quote: 'I started taking Ginseng after recovering from a viral infection. Within two weeks, my energy was back and I felt mentally sharper.',
      author: 'Michael B., 42, Seattle'
    },
    {
      quote: 'I replaced my second coffee with Ginseng tea. No jitters, just clean energy.',
      author: 'Sarah L., 29, London'
    }
  ],
  
  // 常见问题
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
  
  // SEO相关
  seo_keywords: ['ginseng supplement', 'ginseng for energy', 'ginsenosides', 'panax ginseng', 'adaptogen', 'ginseng benefits'],
  meta_title: 'Ginseng Benefits: Energy, Focus, and Immunity | HerbScience',
  meta_description: 'Discover how Ginseng (Panax ginseng) helps fight fatigue and boosts focus. Science-backed herb for energy and immune support.',
  
  // 分类属性
  properties: ['Energizing', 'Immune Support', 'Cognitive Enhancement', 'Stress Adaptation'],
  
  // 元数据
  last_updated: new Date().toISOString(),
  content_status: 'Complete'
};

async function createGinsengInNotion() {
  try {
    console.log('🌿 Creating Ginseng herb page in Notion...');
    
    // Use the known database ID
    const databaseId = '2156f14b-923c-802c-8d48-d84247b6681a';
    
    console.log(`📝 Using database: ${databaseId}`);
    
    // Create Ginseng page with Chinese property names
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId
      },
      properties: {
        '草药名称': {
          title: [
            {
              text: {
                content: `${ginsengData.name} (${ginsengData.chinese_name})`
              }
            }
          ]
        },
        '中文名': {
          rich_text: [
            {
              text: {
                content: ginsengData.chinese_name
              }
            }
          ]
        },
        '功效分类': {
          multi_select: [
            { name: '补气养血' },
            { name: '镇静安神' },
            { name: '免疫支持' },
            { name: '认知增强' }
          ]
        },
        '安全性等级': {
          select: {
            name: '中等安全'
          }
        },
        '推荐剂量': {
          rich_text: [
            {
              text: {
                content: JSON.stringify(ginsengData.dosage_info, null, 2)
              }
            }
          ]
        },
        '使用建议': {
          rich_text: [
            {
              text: {
                content: `${ginsengData.overview}\n\n主要功效:\n• ${ginsengData.primary_benefits.join('\n• ')}\n\n传统用途:\n${ginsengData.traditional_uses}\n\nSEO关键词: ${ginsengData.seo_keywords.join(', ')}`
              }
            }
          ]
        },
        '注意事项': {
          rich_text: [
            {
              text: {
                content: `安全警告:\n• ${ginsengData.safety_warnings.join('\n• ')}\n\n药物相互作用:\n• ${ginsengData.drug_interactions.join('\n• ')}`
              }
            }
          ]
        },
        '中医体质匹配': {
          select: {
            name: '气虚质'
          }
        }
      },
      children: [
        {
          object: 'block',
          type: 'heading_1',
          heading_1: {
            rich_text: [{
              type: 'text',
              text: {
                content: `🌿 ${ginsengData.name} (${ginsengData.chinese_name}) - 详细信息`
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: ginsengData.latin_name
              },
              annotations: {
                italic: true
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '📖 Overview'
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: ginsengData.overview
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '✅ Top Health Benefits'
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: ginsengData.primary_benefits.map(benefit => ({
              type: 'text',
              text: {
                content: benefit
              }
            }))
          }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '🌿 How It Works (Active Compounds)'
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: ginsengData.active_compounds
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '📜 Traditional Uses in Chinese Medicine'
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: ginsengData.traditional_uses
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '👤 Who Should Consider Ginseng?'
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [{
              type: 'text',
              text: {
                content: '✅ Suitable For:'
              }
            }]
          }
        },
        ...ginsengData.suitable_for.map(item => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{
              type: 'text',
              text: {
                content: item
              }
            }]
          }
        })),
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [{
              type: 'text',
              text: {
                content: '❌ Not Recommended For:'
              }
            }]
          }
        },
        ...ginsengData.not_suitable_for.map(item => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{
              type: 'text',
              text: {
                content: item
              }
            }]
          }
        })),
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '💊 How to Use & Dosage'
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: `Capsule: ${ginsengData.dosage_info.capsule}\nTea: ${ginsengData.dosage_info.tea}\nTincture: ${ginsengData.dosage_info.tincture}\nWellness Soup: ${ginsengData.dosage_info.soup}`
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '⚠️ Safety & Interactions'
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [{
              type: 'text',
              text: {
                content: 'Safety Warnings:'
              }
            }]
          }
        },
        ...ginsengData.safety_warnings.map(warning => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{
              type: 'text',
              text: {
                content: warning
              }
            }]
          }
        })),
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [{
              type: 'text',
              text: {
                content: 'Drug Interactions:'
              }
            }]
          }
        },
        ...ginsengData.drug_interactions.map(interaction => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{
              type: 'text',
              text: {
                content: interaction
              }
            }]
          }
        })),
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '🧪 Scientific Evidence Snapshot'
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: ginsengData.scientific_evidence
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '🧑‍⚕️ Real User Stories'
              }
            }]
          }
        },
        ...ginsengData.user_testimonials.map(story => ({
          object: 'block',
          type: 'quote',
          quote: {
            rich_text: [{
              type: 'text',
              text: {
                content: `"${story.quote}" — ${story.author}`
              }
            }]
          }
        })),
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '❓ Common Questions (FAQ)'
              }
            }]
          }
        },
        ...ginsengData.faqs.map(faq => ([
          {
            object: 'block',
            type: 'heading_3',
            heading_3: {
              rich_text: [{
                type: 'text',
                text: {
                  content: `Q: ${faq.question}`
                }
              }]
            }
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{
                type: 'text',
                text: {
                  content: `A: ${faq.answer}`
                }
              }]
            }
          }
        ])).flat(),
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '🔗 SEO Information'
              }
            }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: `Meta Title: ${ginsengData.meta_title}\nMeta Description: ${ginsengData.meta_description}\nKeywords: ${ginsengData.seo_keywords.join(', ')}`
              }
            }]
          }
        }
      ]
    });

    console.log('✅ Ginseng herb page created successfully!');
    console.log(`📄 Page ID: ${response.id}`);
    console.log(`🔗 Page URL: ${response.url}`);
    
    return response;
  } catch (error) {
    console.error('❌ Error creating Ginseng page:', error.message);
    if (error.body) {
      console.error('Error details:', JSON.stringify(error.body, null, 2));
    }
    throw error;
  }
}

// Run the script
if (require.main === module) {
  createGinsengInNotion()
    .then(() => {
      console.log('🎉 Ginseng sync completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Sync failed:', error);
      process.exit(1);
    });
}

module.exports = { createGinsengInNotion, ginsengData };
