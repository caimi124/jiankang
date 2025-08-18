// 批量添加重要草药到Notion数据库
// 运行前请确保 .env.local 已正确配置

require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// 重要草药数据
const importantHerbs = [
  {
    name: "Echinacea",
    latin: "Echinacea purpurea",
    category: "Immune",
    overview: "Echinacea is a popular immune-supporting herb traditionally used to prevent and reduce the duration of cold and flu symptoms.",
    slug: "echinacea",
    faqs: [
      {
        question: "How long can I take Echinacea?",
        answer: "It's recommended to take Echinacea for short periods (8-10 weeks maximum), then take a break to prevent tolerance."
      }
    ],
    dosages: ["Capsule", "Tincture"]
  },
  {
    name: "Garlic",
    latin: "Allium sativum", 
    category: "Circulation",
    overview: "Garlic is a powerful cardiovascular herb with antimicrobial properties. Used traditionally for heart health and circulation.",
    slug: "garlic",
    faqs: [
      {
        question: "Should I take garlic with food?",
        answer: "Yes, taking garlic with food can help reduce stomach irritation and improve absorption."
      }
    ],
    dosages: ["Capsule", "Powder"]
  },
  {
    name: "Green Tea",
    latin: "Camellia sinensis",
    category: "Metabolic", 
    overview: "Green tea is rich in antioxidants and catechins, particularly EGCG. Known for metabolism-boosting properties.",
    slug: "green-tea",
    faqs: [
      {
        question: "When is the best time to drink green tea?",
        answer: "Best consumed between meals to avoid interference with iron absorption. Morning or early afternoon is ideal."
      }
    ],
    dosages: ["Infusion", "Capsule"]
  },
  {
    name: "Ashwagandha", 
    latin: "Withania somnifera",
    category: "Sleep/Calm",
    overview: "Ashwagandha is an adaptogenic herb that helps the body manage stress and supports energy levels.",
    slug: "ashwagandha",
    faqs: [
      {
        question: "Can Ashwagandha help with sleep?",
        answer: "Yes, Ashwagandha can help improve sleep quality by reducing stress and promoting relaxation."
      }
    ],
    dosages: ["Capsule", "Powder"]
  },
  {
    name: "Chamomile",
    latin: "Matricaria chamomilla",
    category: "Sleep/Calm", 
    overview: "Chamomile is a gentle herb known for its calming and anti-inflammatory properties. Commonly used for relaxation.",
    slug: "chamomile",
    faqs: [
      {
        question: "Is Chamomile safe for children?",
        answer: "Chamomile is generally safe for children over 6 months, but consult a pediatrician before use."
      }
    ],
    dosages: ["Infusion", "Capsule"]
  }
];

async function addHerb(herbData) {
  try {
    console.log(`\n🌿 Adding ${herbData.name}...`);
    
    // 1. 添加主要草药信息
    const herbPage = await notion.pages.create({
      parent: { database_id: process.env.NOTION_HERBS_DB_ID },
      properties: {
        'Herb Name': { title: [{ text: { content: herbData.name } }] },
        'LatinName': { rich_text: [{ text: { content: herbData.latin } }] },
        'Category': { select: { name: herbData.category } },
        'Overview': { rich_text: [{ text: { content: herbData.overview } }] },
        'ActiveCompounds': { multi_select: [{ name: "Essential oils" }, { name: "Polyphenols" }] },
        'Benefits': { multi_select: [{ name: "Cold limbs & low energy" }] },
        'RecommendedFor': { multi_select: [{ name: "Low energy" }] },
        'NotRecommendedFor': { multi_select: [{ name: "Heat signs" }] },
        'Contraindications': { multi_select: [{ name: "Pregnancy" }] },
        'SafetyRating': { select: { name: "Green" } },
        'Slug': { rich_text: [{ text: { content: herbData.slug } }] },
        'Publish': { checkbox: true }
      }
    });
    
    console.log(`✅ Created herb: ${herbData.name}`);
    
    // 2. 添加FAQs
    for (const faq of herbData.faqs) {
      await notion.pages.create({
        parent: { database_id: process.env.NOTION_FAQS_DB_ID },
        properties: {
          '名称': { title: [{ text: { content: `${herbData.slug} - ${faq.question}` } }] },
          'Question': { rich_text: [{ text: { content: faq.question } }] },
          'Answer': { rich_text: [{ text: { content: faq.answer } }] },
          'Herb': { relation: [{ id: herbPage.id }] }
        }
      });
    }
    
    console.log(`✅ Added ${herbData.faqs.length} FAQs`);
    
    // 3. 添加用量信息
    for (const dosage of herbData.dosages) {
      await notion.pages.create({
        parent: { database_id: process.env.NOTION_DOSAGES_DB_ID },
        properties: {
          '名称': { title: [{ text: { content: `${herbData.slug} - ${dosage}` } }] },
          'Form': { select: { name: dosage } },
          'Herb': { relation: [{ id: herbPage.id }] }
        }
      });
    }
    
    console.log(`✅ Added ${herbData.dosages.length} dosage forms`);
    
    // 添加延迟避免API限制
    await new Promise(resolve => setTimeout(resolve, 1000));
    
  } catch (error) {
    console.error(`❌ Error adding ${herbData.name}:`, error.message);
  }
}

async function batchAddHerbs() {
  console.log('🚀 开始批量添加草药数据...\n');
  
  // 检查环境变量
  if (!process.env.NOTION_TOKEN) {
    console.error('❌ NOTION_TOKEN 未配置');
    return;
  }
  
  for (const herb of importantHerbs) {
    await addHerb(herb);
  }
  
  console.log('\n🎉 批量添加完成！');
  console.log('\n📊 添加的草药:');
  importantHerbs.forEach((herb, index) => {
    console.log(`${index + 1}. ${herb.name} (${herb.latin})`);
  });
  
  console.log('\n🔗 可以访问以下页面验证:');
  importantHerbs.forEach(herb => {
    console.log(`- http://localhost:3000/herbs/${herb.slug}`);
  });
}

// 运行脚本
batchAddHerbs().catch(console.error);
