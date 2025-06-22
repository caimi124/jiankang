const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: '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'
});

const ginsengData = {
  name: 'Ginseng',
  chinese_name: '人参',
  latin_name: 'Panax ginseng',
  category: 'Adaptogen',
  evidence_level: 'Strong',
  safety_rating: 'Generally Safe',
  overview: 'Ginseng (Panax ginseng) is one of the most revered herbs in traditional Chinese and Korean medicine. Known as an adaptogen, it helps the body manage stress, fight fatigue, and restore balance. Today, Ginseng remains a popular herbal remedy for boosting energy, focus, and immunity.',
  primary_benefits: [
    'Fights fatigue and increases energy naturally',
    'Enhances memory, focus, and mental clarity',
    'Strengthens the immune system',
    'Improves circulation and blood sugar balance',
    'Supports recovery after illness or surgery'
  ],
  active_compounds: 'The main active compounds in Panax ginseng are ginsenosides, which have antioxidant, anti-inflammatory, and neuroprotective effects. They work by enhancing mitochondrial energy production, regulating the stress-response (HPA axis), and supporting nitric oxide production (beneficial for blood flow).',
  traditional_uses: 'In Traditional Chinese Medicine (TCM), Ginseng is considered a "superior tonic" used to tonify Qi (vital energy), calm the mind (Shen) and enhance focus, rebuild strength after chronic illness, and nourish the lungs and heart.',
  dosage_info: {
    capsule: '200–400 mg/day (standardized to 5% ginsenosides, take with food)',
    tea: '1–2g dried root, boiled 10–15 minutes, drink 1-2 cups daily',
    tincture: '30–50 drops in water, 1–2 times per day',
    soup: '5-10g root, simmer with lotus seeds and dates for recovery boost'
  },
  safety_warnings: [
    'May interact with blood pressure, blood sugar, or anticoagulant medications',
    'Avoid during fever or acute inflammation',
    'Monitor for insomnia, restlessness, or fast heartbeat if overdosed',
    'Take in cycles: 3 weeks on, 1 week off'
  ],
  drug_interactions: [
    'Blood pressure medications',
    'Diabetes medications (may affect blood sugar)',
    'Blood thinners (warfarin)',
    'MAO inhibitors',
    'Stimulant medications'
  ],
  scientific_evidence: 'A 2022 randomized trial found Ginseng reduced fatigue by 28% among adults with chronic tiredness. Several studies show improved cognitive performance in aging adults. Ginsenosides shown to reduce inflammation markers in lab and animal studies. Sources: PubMed, Journal of Ginseng Research.',
  constitution_match: {
    qi_deficient: 'Ideal for pale face, tiredness, and low voice',
    yang_deficient: 'May benefit, consider warming version',
    yin_deficient: 'Not ideal; may cause dryness',
    heat_excess: 'Avoid if experiencing fever or irritability'
  },
  pairs_well_with: [
    'Rhodiola Rosea – for stress resistance',
    'Ginger – boosts circulation and warmth',
    'Cordyceps – enhances stamina in recovery',
    'Astragalus – immune and energy support'
  ],
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
  seo_keywords: ['ginseng supplement', 'ginseng for energy', 'ginsenosides', 'panax ginseng', 'adaptogen', 'ginseng benefits'],
  meta_title: 'Ginseng Benefits: Energy, Focus, and Immunity | HerbScience',
  meta_description: 'Discover how Ginseng (Panax ginseng) helps fight fatigue and boosts focus. Science-backed herb for energy and immune support.',
  properties: ['Energizing', 'Immune Support', 'Cognitive Enhancement', 'Stress Adaptation'],
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
            { name: '镇静安神' }
          ]
        },
        '安全性等级': {
          select: {
            name: '安全'
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
                content: `🌿 ${ginsengData.name} (${ginsengData.chinese_name})`
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
        ...ginsengData.primary_benefits.map(benefit => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{
              type: 'text',
              text: {
                content: benefit
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
                content: '🧪 Active Compounds'
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
                content: '📜 Traditional Chinese Medicine Uses'
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
                content: '💊 Dosage & Usage'
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
                content: `Capsule: ${ginsengData.dosage_info.capsule}\nTea: ${ginsengData.dosage_info.tea}\nTincture: ${ginsengData.dosage_info.tincture}\nSoup: ${ginsengData.dosage_info.soup}`
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
                content: '⚠️ Safety Information'
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
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '🔬 Scientific Evidence'
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
                content: '🫀 Constitution Match'
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
                content: `Qi Deficient: ${ginsengData.constitution_match.qi_deficient}\nYang Deficient: ${ginsengData.constitution_match.yang_deficient}\nYin Deficient: ${ginsengData.constitution_match.yin_deficient}\nHeat Excess: ${ginsengData.constitution_match.heat_excess}`
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
                content: '🤝 Pairs Well With'
              }
            }]
          }
        },
        ...ginsengData.pairs_well_with.map(herb => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{
              type: 'text',
              text: {
                content: herb
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
                content: '💬 User Testimonials'
              }
            }]
          }
        },
        ...ginsengData.user_testimonials.map(testimonial => ({
          object: 'block',
          type: 'quote',
          quote: {
            rich_text: [{
              type: 'text',
              text: {
                content: `"${testimonial.quote}" — ${testimonial.author}`
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
                content: '❓ Frequently Asked Questions'
              }
            }]
          }
        },
        ...ginsengData.faqs.map(faq => ({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: `Q: ${faq.question}\nA: ${faq.answer}\n`
              }
            }]
          }
        })),
        {
          object: 'block',
          type: 'divider',
          divider: {}
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: {
                content: '🎯 SEO Optimization'
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
                content: `Meta Title: ${ginsengData.meta_title}\n\nMeta Description: ${ginsengData.meta_description}\n\nKeywords: ${ginsengData.seo_keywords.join(', ')}`
              }
            }]
          }
        }
      ]
    });
    
    console.log('🎉 Ginseng page created successfully!');
    console.log(`📄 Page ID: ${response.id}`);
    console.log(`🔗 Page URL: https://notion.so/${response.id.replace(/-/g, '')}`);
    
    return response;
    
  } catch (error) {
    console.error('❌ Error creating Ginseng page:', error);
    
    if (error.code === 'unauthorized') {
      console.log('🔑 Please check if the Notion API key is correct');
    } else if (error.code === 'object_not_found') {
      console.log('📊 Please check database permissions');
    } else {
      console.log('Error details:', error.message);
    }
  }
}

// Run the script
createGinsengInNotion()
  .then(() => {
    console.log('✅ Script completed successfully');
  })
  .catch(error => {
    console.error('❌ Script failed:', error);
  });
