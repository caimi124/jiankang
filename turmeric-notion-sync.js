const { Client } = require('@notionhq/client');

// 初始化 Notion 客户端
const notion = new Client({
  auth: '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',
});

// 数据库 ID
const databaseId = '2156f14b-923c-802c-8d48-d84247b6681a';

// 完整的姜黄(Turmeric)数据 - 基于用户提供的详细模板
const turmericData = {
  // 基本信息
  name: 'Turmeric',
  chinese_name: '姜黄',
  latin_name: 'Curcuma longa', 
  slug: 'turmeric',
  category: 'Anti-inflammatory & Antioxidant',
  evidence_level: 'Strong',
  safety_level: 'high',
  
  // SEO和基本描述
  overview: 'Turmeric (Curcuma longa) is a vibrant yellow spice and medicinal herb known worldwide for its potent anti-inflammatory and antioxidant effects. Traditionally used in Chinese and Ayurvedic medicine, turmeric helps support joint comfort, improve digestion, and promote overall wellness. The active ingredient, curcumin, is the key to its health benefits and is backed by numerous scientific studies.',
  
  // 主要功效
  primary_benefits: [
    'Helps reduce joint pain and inflammation',
    'Supports healthy digestion and liver function',
    'Provides antioxidant protection against cellular damage',
    'May boost mood and cognitive health',
    'Supports natural detoxification processes'
  ],
  
  // 活性成分详解
  active_compounds: 'Turmeric\'s primary active compound, curcumin, works by blocking inflammatory molecules and neutralizing harmful free radicals. Curcumin also supports digestive health by stimulating bile production and may improve brain function by increasing levels of brain-derived neurotrophic factor (BDNF).',
  
  // 传统用法
  traditional_uses: 'In Traditional Chinese Medicine (TCM), turmeric is seen as a warming herb that promotes blood flow and relieves pain caused by stagnation or cold. It is traditionally used to improve circulation and relieve muscle and joint stiffness, ease digestive discomfort and bloating, and support menstrual health by reducing cramps.',
  
  // 适用人群
  suitable_for: [
    'People with joint pain, arthritis, or muscle soreness',
    'Individuals experiencing digestive issues like bloating or indigestion',
    'Anyone looking to reduce inflammation naturally',
    'Those wanting to support brain and mood health'
  ],
  
  // 不适用人群
  not_suitable_for: [
    'People with gallstones or bile duct obstruction',
    'Those on blood-thinning medications (without medical supervision)',
    'Individuals with iron deficiency (may reduce iron absorption)',
    'Pregnant women (high doses may stimulate uterine contractions)'
  ],
  
  // 用法用量
  dosage_info: {
    powder: '500–2000mg daily, preferably with black pepper for better absorption',
    capsules: '500mg standardized curcumin extract, 2–3 times daily with meals',
    fresh_root: '1-3g daily, used in cooking or brewed as tea',
    herbal_blends: 'As directed, combined with ginger, cinnamon, or black pepper'
  },
  
  // 安全警告
  safety_warnings: [
    'Generally safe but may cause mild stomach upset in some people',
    'May interact with blood thinners or diabetes medications',
    'Consult your doctor before use if pregnant, breastfeeding, or taking medications',
    'Avoid if you have gallstones or bile duct obstruction'
  ],
  
  // 药物相互作用
  drug_interactions: [
    'Blood-thinning medications (warfarin)',
    'Diabetes medications (may affect blood sugar)',
    'Chemotherapy drugs (may interfere with some treatments)',
    'Iron supplements (may reduce absorption)'
  ],
  
  // 科学证据
  scientific_evidence: 'Research supports turmeric\'s role in reducing inflammation, easing arthritis symptoms, aiding digestion, and potentially improving brain function and mood. Curcumin is one of the most studied natural compounds for these benefits, with over 3,000 published studies.',
  
  // 中医体质匹配
  constitution_match: {
    blood_stasis: 'Excellent for improving circulation and reducing stagnation',
    phlegm_damp: 'Helps transform dampness and support digestion',
    cold_constitution: 'Warming properties support those with cold symptoms',
    heat_excess: 'Use moderately; monitor for increased heat symptoms'
  },
  
  // 搭配建议
  pairs_well_with: [
    'Black pepper (piperine) – to enhance absorption',
    'Ginger – to boost anti-inflammatory and digestive support',
    'Cinnamon and cardamom – in herbal formulas',
    'Healthy fats – to improve curcumin absorption'
  ],
  
  // 用户评价
  user_testimonials: [
    {
      quote: 'Turmeric capsules helped reduce my knee pain and gave me more mobility.',
      author: 'Anna W., Chicago'
    },
    {
      quote: 'I drink turmeric tea daily to support my digestion and energy.',
      author: 'Mark L., London'
    }
  ],
  
  // 常见问题
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
  
  // SEO相关
  seo_keywords: ['turmeric benefits', 'curcumin supplement', 'natural anti-inflammatory', 'turmeric dosage', 'turmeric for joint pain'],
  meta_title: 'Turmeric Benefits: Natural Anti-Inflammatory & Joint Support | HerbScience',
  meta_description: 'Discover the powerful benefits of Turmeric (Curcuma longa) for inflammation, joint health, and digestion. Science-backed natural remedy with curcumin.',
  
  // 分类属性
  properties: ['Anti-inflammatory', 'Antioxidant', 'Digestive Support', 'Joint Health'],
  
  // 元数据
  last_updated: new Date().toISOString(),
  content_status: 'Complete'
};

async function syncTurmericToNotion() {
  try {
    console.log('🌿 Creating Turmeric herb page in Notion...');
    console.log(`📝 Using database: ${databaseId}`);

    // 创建页面
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        '草药名称': {
          title: [
            {
              text: {
                content: `${turmericData.name} (${turmericData.chinese_name})`,
              },
            },
          ],
        },
        '中文名': {
          rich_text: [
            {
              text: {
                content: turmericData.chinese_name,
              },
            },
          ],
        },
        '功效分类': {
          multi_select: [
            { name: '抗炎作用' },
            { name: '抗氧化' },
            { name: '消化健康' },
            { name: '关节健康' }
          ],
        },
        '安全性等级': {
          select: {
            name: '安全',
          },
        },
        '推荐剂量': {
          rich_text: [
            {
              text: {
                content: JSON.stringify(turmericData.dosage_info, null, 2),
              },
            },
          ],
        },
        '使用建议': {
          rich_text: [
            {
              text: {
                content: `${turmericData.overview}\n\n主要功效:\n• ${turmericData.primary_benefits.join('\n• ')}\n\n传统用途:\n${turmericData.traditional_uses}\n\nSEO关键词: ${turmericData.seo_keywords.join(', ')}`,
              },
            },
          ],
        },
        '注意事项': {
          rich_text: [
            {
              text: {
                content: `安全警告:\n• ${turmericData.safety_warnings.join('\n• ')}\n\n药物相互作用:\n• ${turmericData.drug_interactions.join('\n• ')}`,
              },
            },
          ],
        },
        '中医体质匹配': {
          select: {
            name: '血瘀体质',
          },
        },
      },
      children: [
        {
          object: 'block',
          type: 'heading_1',
          heading_1: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: `🌿 ${turmericData.name} (${turmericData.chinese_name}) - 详细信息`,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: turmericData.latin_name,
                },
                annotations: {
                  italic: true,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '🧠 Overview',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: turmericData.overview,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '✅ Top Health Benefits',
                },
              },
            ],
          },
        },
        ...turmericData.primary_benefits.map(benefit => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: benefit,
                },
              },
            ],
          },
        })),
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '🌿 How It Works (Active Compounds)',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: turmericData.active_compounds,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '📜 Traditional Uses in Chinese Medicine',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: turmericData.traditional_uses,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '👤 Who Should Consider Turmeric?',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '✅ Suitable For:',
                },
              },
            ],
          },
        },
        ...turmericData.suitable_for.map(item => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: item,
                },
              },
            ],
          },
        })),
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '❌ Not Recommended For:',
                },
              },
            ],
          },
        },
        ...turmericData.not_suitable_for.map(item => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: item,
                },
              },
            ],
          },
        })),
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '💊 How to Use & Dosage',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: `Powder: ${turmericData.dosage_info.powder}\nCapsules: ${turmericData.dosage_info.capsules}\nFresh Root: ${turmericData.dosage_info.fresh_root}\nHerbal Blends: ${turmericData.dosage_info.herbal_blends}`,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '⚠️ Safety & Interactions',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: 'Safety Warnings:',
                },
              },
            ],
          },
        },
        ...turmericData.safety_warnings.map(warning => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: warning,
                },
              },
            ],
          },
        })),
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: 'Drug Interactions:',
                },
              },
            ],
          },
        },
        ...turmericData.drug_interactions.map(interaction => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: interaction,
                },
              },
            ],
          },
        })),
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '🧪 Scientific Evidence Snapshot',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: turmericData.scientific_evidence,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '🤝 Pairs Well With',
                },
              },
            ],
          },
        },
        ...turmericData.pairs_well_with.map(pairing => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: pairing,
                },
              },
            ],
          },
        })),
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '🧑‍⚕️ Real User Stories',
                },
              },
            ],
          },
        },
        ...turmericData.user_testimonials.map(story => ({
          object: 'block',
          type: 'quote',
          quote: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: `"${story.quote}" — ${story.author}`,
                },
              },
            ],
          },
        })),
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '❓ Frequently Asked Questions',
                },
              },
            ],
          },
        },
        ...turmericData.faqs.map(faq => ([
          {
            object: 'block',
            type: 'heading_3',
            heading_3: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `Q: ${faq.question}`,
                  },
                },
              ],
            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `A: ${faq.answer}`,
                  },
                },
              ],
            },
          },
        ])).flat(),
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '🔗 SEO Information',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: `Meta Title: ${turmericData.meta_title}\nMeta Description: ${turmericData.meta_description}\nKeywords: ${turmericData.seo_keywords.join(', ')}`,
                },
              },
            ],
          },
        },
      ],
    });

    console.log('✅ Turmeric herb page created successfully!');
    console.log(`📄 Page ID: ${response.id}`);
    console.log(`🔗 Page URL: ${response.url}`);
    
    return response;
  } catch (error) {
    console.error('❌ Error creating Turmeric page:', error.message);
    if (error.body) {
      console.error('Error details:', JSON.stringify(error.body, null, 2));
    }
    throw error;
  }
}

// 运行同步函数
if (require.main === module) {
  syncTurmericToNotion()
    .then(() => {
      console.log('🎉 Turmeric sync completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Sync failed:', error);
      process.exit(1);
    });
}

module.exports = { syncTurmericToNotion, turmericData }; 