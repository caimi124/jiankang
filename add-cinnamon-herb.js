// Add Cinnamon to Notion Herbs Database
const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: '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',
});

// Database ID for herbs
const DATABASE_ID = '2156f14b923c802c8d48d84247b6681a';

async function addCinnamonToNotionDatabase() {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        '草药名称': {
          title: [
            {
              text: {
                content: '肉桂 (Cinnamon)',
              },
            },
          ],
        },
        'Latin Name': {
          rich_text: [
            {
              text: {
                content: 'Cinnamomum cassia',
              },
            },
          ],
        },
        '拉丁文': {
          rich_text: [
            {
              text: {
                content: 'Cinnamomum cassia (also known as C. aromaticum)',
              },
            },
          ],
        },
        '中医体质匹配': {
          select: {
            name: '阳虚质',
          },
        },
        '安全性等级': {
          select: {
            name: '中等',
          },
        },
        'Tags': {
          multi_select: [
            { name: '血糖支持' },
            { name: '抗炎作用' },
            { name: 'Pain Relief' },
            { name: '女性健康' },
            { name: 'Cardiovascular' },
            { name: 'Warming' },
            { name: 'Digestive' }
          ],
        },
        '功效分类': {
          multi_select: [
            { name: '活血化瘀' },
            { name: '补气养血' },
            { name: '健脾胃' },
            { name: '消化健康' },
            { name: '炎症管理' },
            { name: '免疫支持' }
          ],
        },
        '成分构成': {
          multi_select: [
            { name: '挥发油' },
            { name: '有机酸' },
            { name: '多糖' },
            { name: '萜类化合物' }
          ],
        },
        'Recommended Constitution': {
          multi_select: [
            { name: 'Yang-deficient' },
            { name: 'Cold-prone' },
            { name: 'Qi-deficient' }
          ],
        },
        'Not Recommended Constitution': {
          multi_select: [
            { name: 'Heat-excess' },
            { name: 'Yin-deficient' },
            { name: 'Yang-excess' },
            { name: 'Pregnancy' }
          ],
        },
        '推荐剂量': {
          rich_text: [
            {
              text: {
                content: '肉桂皮茶：1.5-3克/日；肉桂粉：0.5-1克/日；胶囊：250-500毫克/日',
              },
            },
          ],
        },
        'Daily Dose Guide': {
          rich_text: [
            {
              text: {
                content: 'Whole cinnamon bark (tea): 1.5–3 grams/day; Cinnamon powder: 0.5–1 gram/day; Tincture/Capsule: Follow product label; common range is 250–500 mg/day; Duration: 7–14 days per cycle; avoid continuous long-term use without breaks',
              },
            },
          ],
        },
        'Overview': {
          rich_text: [
            {
              text: {
                content: 'Cinnamon is not just a warming spice for your morning oatmeal—it\'s a time-tested herbal remedy used across cultures to improve blood circulation, relieve cold-induced pain, regulate blood sugar, and support menstrual comfort. In Traditional Chinese Medicine (TCM), cinnamon (Rou Gui) is valued for its ability to "warm the yang," dispel internal cold, and invigorate blood flow. Clinical evidence now supports its benefits in metabolic syndrome, arthritis, and digestive sluggishness.',
              },
            },
          ],
        },
        '简要描述': {
          rich_text: [
            {
              text: {
                content: '温阳散寒的经典草药，用于改善循环、调节血糖、缓解寒性疼痛，特别适合体质虚寒、四肢冰冷的人群。',
              },
            },
          ],
        },
        'Active Compounds': {
          rich_text: [
            {
              text: {
                content: 'Cinnamaldehyde – powerful anti-inflammatory and insulin-sensitizing compound; Cinnamic acid – antioxidant that enhances blood flow and metabolism; Polyphenols – improve glucose metabolism and reduce oxidative stress; Essential oils – stimulate circulation and digestion',
              },
            },
          ],
        },
        'Mechanism of Action': {
          rich_text: [
            {
              text: {
                content: 'Cinnamon enhances insulin sensitivity by improving glucose uptake in cells. It also increases peripheral circulation, helping to "warm" cold limbs and ease pain. Its polyphenols modulate inflammatory cytokines (like IL-6 and TNF-α), making it useful for chronic inflammation. Cinnamon also stimulates gastric secretions, aiding sluggish digestion and bloating caused by "cold" internal constitution.',
              },
            },
          ],
        },
        'Benefits & Conditions': {
          rich_text: [
            {
              text: {
                content: 'Low back pain & joint stiffness - especially when worse in cold, damp weather; Cold limbs & fatigue - useful for those who often feel chilled or have low metabolic energy; Painful menstruation (cold-type) - traditional warming remedy for cramps; Digestive sluggishness - enhances appetite and improves bloating; Blood sugar support - improves insulin sensitivity; Postpartum recovery - helps warm the body and restore circulation',
              },
            },
          ],
        },
        'Contraindications': {
          rich_text: [
            {
              text: {
                content: 'Not suitable for hot-type conditions (e.g., mouth ulcers, dry throat, acne). Avoid during pregnancy due to stimulating uterine contractions. Not recommended for individuals with heavy menstruation, bleeding disorders, or high fever. Do not combine with red clay (Ochra/Red stone) in traditional medicine. High doses may cause dizziness, dry mouth, or liver strain—stick to recommended limits.',
              },
            },
          ],
        },
        '注意事项': {
          rich_text: [
            {
              text: {
                content: '不适用于热性体质(如口疮、咽干、痤疮)；孕期避免使用；月经过多、出血性疾病或高热患者禁用；大剂量可能引起头晕、口干或肝脏负担。',
              },
            },
          ],
        },
        'Usage Tips': {
          rich_text: [
            {
              text: {
                content: 'Pain relief blend: Mix cinnamon powder with ginger tea for joint or back pain during cold weather. Menstrual support: Boil cinnamon with rose and brown sugar; drink before your period to ease cramps. Daily tea: Steep 1–2g of cinnamon stick in hot water with honey for a metabolic boost. Foot soak: Cinnamon boiled with ginger makes a warming foot bath for cold feet and fatigue.',
              },
            },
          ],
        },
        '使用建议': {
          rich_text: [
            {
              text: {
                content: '疼痛缓解：肉桂粉配生姜茶用于寒性关节或背痛；月经支持：肉桂配玫瑰和红糖煮水；日常茶饮：1-2克肉桂棒泡蜂蜜水；足浴：肉桂配生姜煮水泡脚。',
              },
            },
          ],
        },
        'Constitution Explanation': {
          rich_text: [
            {
              text: {
                content: 'Cinnamon is best for people who feel cold easily, have poor circulation, fatigue, or digestive issues triggered by cold or damp environments. It\'s ideal in winter or for individuals recovering from long-term illness. Not ideal for those with heat signs like red eyes, night sweats, or skin flare-ups.',
              },
            },
          ],
        },
        'Medical Studies Summary': {
          rich_text: [
            {
              text: {
                content: 'A 2021 meta-analysis found cinnamon significantly improved fasting blood glucose and insulin sensitivity in patients with type 2 diabetes. Inflammation markers (CRP, IL-6) were reduced in patients taking 1–2 grams daily for 8 weeks. Animal models show cinnamon reduces arthritis symptoms through its anti-inflammatory pathways. Traditional formulas using cinnamon have shown benefits in women with dysmenorrhea and poor peripheral circulation.',
              },
            },
          ],
        },
        '案例分析': {
          rich_text: [
            {
              text: {
                content: '患者：男性，42岁，慢性腰痛2年，冬季和劳累后加重。症状：深部酸痛，畏寒，舌质暗红苔厚白。诊断：寒湿型腰痛伴血瘀。治疗：肉桂粉5克配温酒，每日3次。结果：3天内疼痛显著缓解，活动能力和精力水平改善。医生注释：对于无结构性损伤的寒性疼痛，肉桂等温热草药提供快速安全的缓解。',
              },
            },
          ],
        },
        'FAQ': {
          rich_text: [
            {
              text: {
                content: 'Q: Can I use cinnamon to help with blood sugar? A: Yes. Cinnamon may support insulin sensitivity—ideal for prediabetic or insulin-resistant individuals. Always consult your doctor first. Q: Can women use cinnamon during menstruation? A: Yes, if cramps are related to cold-type pain or delayed periods. Not suitable if bleeding is heavy. Q: What kind of cinnamon should I use? A: Cinnamomum cassia is typically used in Traditional Chinese Medicine. It\'s more warming than Ceylon cinnamon.',
              },
            },
          ],
        },
        '日期': {
          date: {
            start: new Date().toISOString().split('T')[0]
          }
        }
      },
    });

    console.log('✅ Cinnamon successfully added to Notion database!');
    console.log('📄 Page ID:', response.id);
    console.log('🔗 URL:', response.url);
    
    return response;
  } catch (error) {
    console.error('❌ Error adding Cinnamon to Notion:', error);
    throw error;
  }
}

// Run the function
addCinnamonToNotionDatabase()
  .then(() => {
    console.log('🎉 Cinnamon herb addition completed successfully!');
  })
  .catch((error) => {
    console.error('💥 Failed to add Cinnamon:', error);
  }); 