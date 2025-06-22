const { Client } = require('@notionhq/client');

// 初始化 Notion 客户端
const notion = new Client({
  auth: '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',
});

// 数据库 ID
const databaseId = '2156f14b-923c-802c-8d48-d84247b6681a';

// Ginger 数据
const gingerData = {
  草药名称: 'Ginger (生姜)',
  中文名: '生姜',
  功效分类: ['消化健康', '呼吸系统', '抗炎作用', '止咳化痰'],
  成分构成: ['姜辣素', '挥发油', '有机酸'],
  安全性等级: '低风险',
  推荐剂量: '3-10g 鲜品煎汤，250-1000mg 胶囊',
  使用建议: '适用于恶心呕吐、消化不良、感冒发热者；不适用于热性体质、阴虚火旺者',
  注意事项: '孕妇慎用，服用抗凝血药物者注意，胃溃疡患者勿过量',
  中医体质匹配: '阳虚体质',
  简要描述: 'Ginger (Zingiber officinale) is a widely used natural root known for its warming properties and digestive support.',
  
  // 详细内容
  概述: 'Ginger (Zingiber officinale) is a widely used natural root known for its warming properties and digestive support. Traditionally valued in Chinese medicine and many cultures worldwide, ginger helps relieve nausea, soothe digestive discomfort, and ease cold-related symptoms. Modern research confirms many of these benefits, making ginger a popular herbal remedy globally.',
  
  主要功效: [
    'Relieves nausea from motion sickness, pregnancy, or chemotherapy',
    'Supports healthy digestion and reduces bloating',
    'Provides warming relief for cold symptoms like chills and cough',
    'Offers natural anti-inflammatory and antioxidant effects',
    'May reduce muscle soreness and improve joint comfort'
  ].join('\n'),
  
  活性成分: 'Ginger contains bioactive compounds called gingerols and shogaols, which contribute to its spicy flavor and therapeutic properties. These compounds stimulate digestion by increasing gastric juices and bile, inhibit inflammatory pathways to reduce pain and swelling, and relax intestinal muscles to relieve cramps and nausea.',
  
  传统用法: 'In Traditional Chinese Medicine (TCM), ginger is considered pungent and slightly warm, targeting the Lung, Spleen, and Stomach meridians. It is traditionally used to disperse cold and alleviate chills and body aches, warm the digestive system and stop vomiting, calm cough and reduce phlegm caused by cold conditions, and detoxify mild seafood poisoning.',
  
  适用人群: [
    'Those experiencing nausea or digestive discomfort',
    'People with cold symptoms such as chills, cough, or congestion',
    'Individuals seeking natural anti-inflammatory support',
    'Athletes and active people needing muscle recovery aid'
  ].join('\n'),
  
  禁忌人群: [
    'People with conditions related to heat or Yin deficiency',
    'Those with symptoms like night sweats or irritability',
    'Individuals prone to acid reflux or stomach ulcers (excessive use)',
    'Those on blood-thinning medications (consult healthcare provider)'
  ].join('\n'),
  
  用法用量: [
    'Fresh Root: 3–10g sliced, boiled in water as tea 2–3x daily',
    'Powder/Capsule: 250–1000mg daily in divided doses with meals',
    'Juice: Fresh squeezed, diluted in water, small amounts daily',
    'Herbal Blends: As directed, combined with dates, honey, or black tea'
  ].join('\n'),
  
  安全警告: [
    'May increase bleeding risk if combined with blood thinners',
    'Avoid excessive use if prone to acid reflux or stomach ulcers',
    'Not recommended for individuals with heat-related syndromes or Yin deficiency',
    'Pregnant women should consult healthcare providers before regular use'
  ].join('\n'),
  
  药物相互作用: [
    'Blood-thinning medications (warfarin)',
    'Antiplatelet drugs',
    'Diabetes medications (may affect blood sugar)',
    'Blood pressure medications'
  ].join('\n'),
  
  科学证据: 'Clinical studies support ginger\'s effectiveness in reducing nausea, improving digestion, and lowering inflammation. It has been shown to alleviate motion sickness, morning sickness in pregnancy, and muscle pain in athletes. Multiple studies confirm its anti-inflammatory and antioxidant properties.',
  
  体质匹配: [
    'Cold Constitution: YES - Ideal for those with chills, cold hands/feet, and digestive coldness',
    'Phlegm-Damp: YES - Helps transform dampness and improve digestion',
    'Yin Deficient: WARNING - Use cautiously; may increase heat symptoms',
    'Heat Constitution: NO - Avoid if experiencing fever, night sweats, or irritability'
  ].join('\n'),
  
  搭配建议: [
    'Ginseng – for enhanced warming and energy support',
    'Honey – to soothe the throat and balance spice',
    'Lemon – to support digestion and add vitamin C',
    'Jujube dates – for gentle nourishment and sweetness'
  ].join('\n'),
  
  用户评价: [
    '"During pregnancy, ginger tea was a lifesaver for my morning sickness — natural and gentle." — Emily R., New York',
    '"After workouts, ginger supplements help reduce my muscle soreness without side effects." — Jason M., Toronto'
  ].join('\n'),
  
  常见问题: [
    'Q: Can I drink ginger tea daily?\nA: Yes, moderate daily consumption is generally safe and beneficial for most people.',
    'Q: Does ginger help with colds?\nA: Ginger\'s warming properties can help relieve chills and cough associated with colds.',
    'Q: Can ginger interact with medications?\nA: Ginger may increase bleeding risk with blood thinners. Consult your doctor if unsure.',
    'Q: Is ginger safe during pregnancy?\nA: Small amounts are generally safe, but pregnant women should consult healthcare providers before regular use.'
  ].join('\n\n'),
  
  SEO关键词: 'ginger benefits, ginger for nausea, natural cold remedy, ginger anti-inflammatory, how to use ginger',
  证据等级: 'Strong',
  分类: 'Digestive & Warming',
  特性: 'Warming, Digestive Support, Anti-nausea, Anti-inflammatory'
};

async function syncGingerToNotion() {
  try {
    console.log('🚀 开始同步 Ginger 数据到 Notion...');

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
                content: gingerData.草药名称,
              },
            },
          ],
        },
        '中文名': {
          rich_text: [
            {
              text: {
                content: gingerData.中文名,
              },
            },
          ],
        },
        '功效分类': {
          multi_select: gingerData.功效分类.map(category => ({ name: category })),
        },
        '成分构成': {
          multi_select: gingerData.成分构成.map(component => ({ name: component })),
        },
        '安全性等级': {
          select: {
            name: gingerData.安全性等级,
          },
        },
        '推荐剂量': {
          rich_text: [
            {
              text: {
                content: gingerData.推荐剂量,
              },
            },
          ],
        },
        '使用建议': {
          rich_text: [
            {
              text: {
                content: gingerData.使用建议,
              },
            },
          ],
        },
        '注意事项': {
          rich_text: [
            {
              text: {
                content: gingerData.注意事项,
              },
            },
          ],
        },
        '中医体质匹配': {
          select: {
            name: gingerData.中医体质匹配,
          },
        },
        '简要描述': {
          rich_text: [
            {
              text: {
                content: gingerData.简要描述,
              },
            },
          ],
        },
        '日期': {
          date: {
            start: new Date().toISOString().split('T')[0],
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
                  content: '🌿 Ginger (生姜) 详细信息',
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
                  content: '🧠 概述',
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
                  content: gingerData.概述,
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
                  content: '✅ 主要功效',
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
                  content: gingerData.主要功效,
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
                  content: '🌿 活性成分',
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
                  content: gingerData.活性成分,
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
                  content: '📜 传统中医用法',
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
                  content: gingerData.传统用法,
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
                  content: '👤 适用人群',
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
                  content: gingerData.适用人群,
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
                  content: '💊 用法用量',
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
                  content: gingerData.用法用量,
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
                  content: '⚠️ 安全警告',
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
                  content: gingerData.安全警告,
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
                  content: '🧪 科学证据',
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
                  content: gingerData.科学证据,
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
                  content: '🏥 体质匹配',
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
                  content: gingerData.体质匹配,
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
                  content: '🤝 搭配建议',
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
                  content: gingerData.搭配建议,
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
                  content: '🧑‍⚕️ 用户评价',
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
                  content: gingerData.用户评价,
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
                  content: '❓ 常见问题',
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
                  content: gingerData.常见问题,
                },
              },
            ],
          },
        }
      ],
    });

    console.log('✅ Ginger 数据同步成功!');
    console.log(`📄 页面 ID: ${response.id}`);
    console.log(`🔗 页面 URL: ${response.url}`);
    
    return response;
  } catch (error) {
    console.error('❌ 同步失败:', error);
    throw error;
  }
}

// 运行同步函数
if (require.main === module) {
  syncGingerToNotion()
    .then(() => {
      console.log('🎉 同步完成！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 同步过程中出错:', error);
      process.exit(1);
    });
}

module.exports = { syncGingerToNotion }; 