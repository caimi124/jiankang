const { Client } = require('@notionhq/client');

// 初始化 Notion 客户端
const notion = new Client({
  auth: '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',
});

// 数据库 ID
const databaseId = '2156f14b-923c-802c-8d48-d84247b6681a';

// 完整的生姜数据 - 基于用户提供的详细模板
const gingerData = {
  // 基本信息
  name: 'Ginger',
  chinese_name: '生姜',
  latin_name: 'Zingiber officinale', 
  slug: 'ginger',
  category: 'Digestive & Warming',
  evidence_level: 'Strong',
  safety_level: 'high',
  
  // SEO和基本描述
  overview: 'Ginger (Zingiber officinale) is a widely used natural root known for its warming properties and digestive support. Traditionally valued in Chinese medicine and many cultures worldwide, ginger helps relieve nausea, soothe digestive discomfort, and ease cold-related symptoms. Modern research confirms many of these benefits, making ginger a popular herbal remedy globally.',
  
  // 主要功效
  primary_benefits: [
    'Relieves nausea from motion sickness, pregnancy, or chemotherapy',
    'Supports healthy digestion and reduces bloating',
    'Provides warming relief for cold symptoms like chills and cough',
    'Offers natural anti-inflammatory and antioxidant effects',
    'May reduce muscle soreness and improve joint comfort'
  ],
  
  // 活性成分详解
  active_compounds: 'Ginger contains bioactive compounds called gingerols and shogaols, which contribute to its spicy flavor and therapeutic properties. These compounds stimulate digestion by increasing gastric juices and bile, inhibit inflammatory pathways to reduce pain and swelling, and relax intestinal muscles to relieve cramps and nausea.',
  
  // 传统用法
  traditional_uses: 'In Traditional Chinese Medicine (TCM), ginger is considered pungent and slightly warm, targeting the Lung, Spleen, and Stomach meridians. It is traditionally used to disperse cold and alleviate chills and body aches, warm the digestive system and stop vomiting, calm cough and reduce phlegm caused by cold conditions, and detoxify mild seafood poisoning.',
  
  // 适用人群
  suitable_for: [
    'Those experiencing nausea or digestive discomfort',
    'People with cold symptoms such as chills, cough, or congestion',
    'Individuals seeking natural anti-inflammatory support',
    'Athletes and active people needing muscle recovery aid'
  ],
  
  // 不适用人群
  not_suitable_for: [
    'People with conditions related to heat or Yin deficiency',
    'Those with symptoms like night sweats or irritability',
    'Individuals prone to acid reflux or stomach ulcers (excessive use)',
    'Those on blood-thinning medications (consult healthcare provider)'
  ],
  
  // 用法用量
  dosage_info: {
    fresh_root: '3–10g sliced, boiled in water as tea 2–3x daily',
    powder_capsule: '250–1000mg daily in divided doses with meals',
    juice: 'Fresh squeezed, diluted in water, small amounts daily',
    herbal_blends: 'As directed, combined with dates, honey, or black tea'
  },
  
  // 安全警告
  safety_warnings: [
    'May increase bleeding risk if combined with blood thinners',
    'Avoid excessive use if prone to acid reflux or stomach ulcers',
    'Not recommended for individuals with heat-related syndromes or Yin deficiency',
    'Pregnant women should consult healthcare providers before regular use'
  ],
  
  // 药物相互作用
  drug_interactions: [
    'Blood-thinning medications (warfarin)',
    'Antiplatelet drugs',
    'Diabetes medications (may affect blood sugar)',
    'Blood pressure medications'
  ],
  
  // 科学证据
  scientific_evidence: 'Clinical studies support ginger\'s effectiveness in reducing nausea, improving digestion, and lowering inflammation. It has been shown to alleviate motion sickness, morning sickness in pregnancy, and muscle pain in athletes. Multiple studies confirm its anti-inflammatory and antioxidant properties.',
  
  // 中医体质匹配
  constitution_match: {
    cold_constitution: 'Ideal for those with chills, cold hands/feet, and digestive coldness',
    phlegm_damp: 'Helps transform dampness and improve digestion',
    yin_deficient: 'Use cautiously; may increase heat symptoms',
    heat_constitution: 'Avoid if experiencing fever, night sweats, or irritability'
  },
  
  // 搭配建议
  pairs_well_with: [
    'Ginseng – for enhanced warming and energy support',
    'Honey – to soothe the throat and balance spice',
    'Lemon – to support digestion and add vitamin C',
    'Jujube dates – for gentle nourishment and sweetness'
  ],
  
  // 用户评价
  user_testimonials: [
    {
      quote: 'During pregnancy, ginger tea was a lifesaver for my morning sickness — natural and gentle.',
      author: 'Emily R., New York'
    },
    {
      quote: 'After workouts, ginger supplements help reduce my muscle soreness without side effects.',
      author: 'Jason M., Toronto'
    }
  ],
  
  // 常见问题
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
  
  // SEO相关
  seo_keywords: ['ginger benefits', 'ginger for nausea', 'natural cold remedy', 'ginger anti-inflammatory', 'how to use ginger'],
  meta_title: 'Ginger Benefits: Natural Digestive Support & Cold Relief | HerbScience',
  meta_description: 'Discover the powerful benefits of Ginger (Zingiber officinale) for nausea relief, digestion, and cold symptoms. Science-backed natural remedy.',
  
  // 分类属性
  properties: ['Warming', 'Digestive Support', 'Anti-nausea', 'Anti-inflammatory'],
  
  // 元数据
  last_updated: new Date().toISOString(),
  content_status: 'Complete'
};

async function syncGingerToNotion() {
  try {
    console.log('🌿 Creating Ginger herb page in Notion...');
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
                content: `${gingerData.name} (${gingerData.chinese_name})`,
              },
            },
          ],
        },
        '中文名': {
          rich_text: [
            {
              text: {
                content: gingerData.chinese_name,
              },
            },
          ],
        },
        '功效分类': {
          multi_select: [
            { name: '消化健康' },
            { name: '呼吸系统' },
            { name: '抗炎作用' },
            { name: '止咳化痰' }
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
                content: JSON.stringify(gingerData.dosage_info, null, 2),
              },
            },
          ],
        },
        '使用建议': {
          rich_text: [
            {
              text: {
                content: `${gingerData.overview}\n\n主要功效:\n• ${gingerData.primary_benefits.join('\n• ')}\n\n传统用途:\n${gingerData.traditional_uses}\n\nSEO关键词: ${gingerData.seo_keywords.join(', ')}`,
              },
            },
          ],
        },
        '注意事项': {
          rich_text: [
            {
              text: {
                content: `安全警告:\n• ${gingerData.safety_warnings.join('\n• ')}\n\n药物相互作用:\n• ${gingerData.drug_interactions.join('\n• ')}`,
              },
            },
          ],
        },
        '中医体质匹配': {
          select: {
            name: '阳虚体质',
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
                  content: `🌿 ${gingerData.name} (${gingerData.chinese_name}) - 详细信息`,
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
                  content: gingerData.latin_name,
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
                  content: '📖 Overview',
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
                  content: gingerData.overview,
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
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: gingerData.primary_benefits.map(benefit => ({
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
                  content: gingerData.active_compounds,
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
                  content: gingerData.traditional_uses,
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
                  content: '👤 Who Should Consider Ginger?',
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
        ...gingerData.suitable_for.map(item => ({
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
        ...gingerData.not_suitable_for.map(item => ({
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
                  content: `Fresh Root: ${gingerData.dosage_info.fresh_root}\nPowder/Capsule: ${gingerData.dosage_info.powder_capsule}\nJuice: ${gingerData.dosage_info.juice}\nHerbal Blends: ${gingerData.dosage_info.herbal_blends}`,
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
        ...gingerData.safety_warnings.map(warning => ({
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
        ...gingerData.drug_interactions.map(interaction => ({
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
                  content: gingerData.scientific_evidence,
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
                  content: '🧑‍⚕️ Real User Stories',
                },
              },
            ],
          },
        },
        ...gingerData.user_testimonials.map(story => ({
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
                  content: '❓ Common Questions (FAQ)',
                },
              },
            ],
          },
        },
        ...gingerData.faqs.map(faq => ([
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
                  content: `Meta Title: ${gingerData.meta_title}\nMeta Description: ${gingerData.meta_description}\nKeywords: ${gingerData.seo_keywords.join(', ')}`,
                },
              },
            ],
          },
        },
      ],
    });

    console.log('✅ Ginger herb page created successfully!');
    console.log(`📄 Page ID: ${response.id}`);
    console.log(`🔗 Page URL: ${response.url}`);
    
    return response;
  } catch (error) {
    console.error('❌ Error creating Ginger page:', error.message);
    if (error.body) {
      console.error('Error details:', JSON.stringify(error.body, null, 2));
    }
    throw error;
  }
}

// 运行同步函数
if (require.main === module) {
  syncGingerToNotion()
    .then(() => {
      console.log('🎉 Ginger sync completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Sync failed:', error);
      process.exit(1);
    });
}

module.exports = { syncGingerToNotion, gingerData }; 