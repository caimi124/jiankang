const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// 完整的草药数据，根据实际数据库结构调整
const herbsData = [
  {
    herbName: "Turmeric",
    chineseName: "姜黄", 
    briefDescription: "抗炎、关节疼痛、肠胃调节",
    composition: ["姜黄素", "挥发油"],
    efficacyCategory: ["消化健康", "炎症管理"],
    usageRecommendations: "饭后服用，避免空腹。建议餐后30分钟内服用，可与黑胡椒配合提高吸收率",
    safetyLevel: "高",
    precautions: "孕妇禁用、胆结石患者禁用、血液疾病患者慎用、手术前2周停止使用",
    tcmConstitution: "湿热体质",
    caseStudy: "案例A：45岁女性，轻度骨关节炎，每日400mg姜黄素餐后服用，连续3个月，关节疼痛减轻60%，活动度明显改善，无明显不良反应"
  },
  {
    herbName: "Ginseng",
    chineseName: "人参",
    briefDescription: "补气养血、增强体质",
    composition: ["人参皂苷", "多糖"],
    efficacyCategory: ["能量提升", "免疫支持"],
    usageRecommendations: "早晨服用，避免晚间。最好空腹服用，建议循环使用：2-3个月后休息1个月",
    safetyLevel: "高",
    precautions: "高血压患者慎用、糖尿病患者需监测血糖、失眠患者避免晚间服用、儿童不建议使用",
    tcmConstitution: "气虚体质",
    caseStudy: "案例A：42岁男性，慢性疲劳，每日300mg早晨空腹服用，6周后精力明显提升，工作效率提高，初期轻微失眠2周后适应"
  },
  {
    herbName: "Licorice", 
    chineseName: "甘草",
    briefDescription: "缓解咳嗽、消炎抗菌",
    composition: ["甘草酸", "黄酮类"],
    efficacyCategory: ["呼吸系统", "消化健康"],
    usageRecommendations: "饭后服用，避免过量。可制成茶饮，不宜与利尿剂同时使用",
    safetyLevel: "中",
    precautions: "长期服用需监测血压、高血压患者可能加重病情、心脏病患者可能影响心律、肾脏疾病可能影响电解质平衡",
    tcmConstitution: "气虚体质", 
    caseStudy: "案例A：用户服用1个月后咳嗽明显缓解，痰液减少，呼吸道炎症改善，需注意血压监测"
  },
  {
    herbName: "Echinacea",
    chineseName: "紫维菊",
    briefDescription: "增强免疫、抗病毒", 
    composition: ["多糖", "烷基酰胺"],
    efficacyCategory: ["免疫支持", "抗病毒"],
    usageRecommendations: "早晚服用，感冒初期使用。建议短期使用，不超过连续8周",
    safetyLevel: "高",
    precautions: "过敏体质慎用、自身免疫疾病可能加重症状、免疫抑制剂使用者可能影响药效、长期使用可能降低免疫效果",
    tcmConstitution: "阳虚体质",
    caseStudy: "案例A：用户在感冒季节预防性服用，感冒次数减少70%，症状持续时间缩短，未出现明显副作用"
  },
  {
    herbName: "Peppermint",
    chineseName: "薄荷", 
    briefDescription: "缓解消化不良、清热解毒",
    composition: ["薄荷脑", "薄荷酮"],
    efficacyCategory: ["消化健康", "呼吸系统"],
    usageRecommendations: "饭后服用，避免过量。肠溶胶囊应整粒吞服，可制成茶饮温热饮用",
    safetyLevel: "高", 
    precautions: "儿童薄荷脑可能引起呼吸困难、胃食管反流可能加重症状、胆囊疾病可能诱发胆绞痛、过敏体质可能引起皮肤过敏",
    tcmConstitution: "湿热体质",
    caseStudy: "案例A：用户服用2周后胃部不适减轻，消化改善，口气清新，偶有轻微胃部温热感"
  },
  {
    herbName: "Chamomile",
    chineseName: "洋甘菊",
    briefDescription: "促进睡眠、缓解焦虑",
    composition: ["挥发油", "黄酮类"],
    efficacyCategory: ["睡眠支持", "情绪管理"],
    usageRecommendations: "睡前服用，可泡茶饮用。睡前30-60分钟服用效果最佳，可与薰衣草配合",
    safetyLevel: "高",
    precautions: "孕妇可能引起子宫收缩、菊花过敏可能交叉过敏、哺乳期可能影响乳汁分泌、低血压可能进一步降血压",
    tcmConstitution: "气虚体质",
    caseStudy: "案例A：用户服用1个月后睡眠质量提高，入睡时间缩短，焦虑症状缓解，未出现明显副作用"
  },
  {
    herbName: "Ginger",
    chineseName: "生姜",
    briefDescription: "抗炎、促消化、止呕",
    composition: ["姜辣素", "挥发油"],
    efficacyCategory: ["消化健康", "抗炎作用"],
    usageRecommendations: "饭后服用，可配合温水。可新鲜切片泡茶，晕车前30分钟服用预防效果更佳",
    safetyLevel: "高",
    precautions: "胃溃疡患者可能刺激胃黏膜、胆结石可能诱发胆绞痛、血液疾病可能影响凝血、手术前停止使用避免出血风险",
    tcmConstitution: "寒湿体质", 
    caseStudy: "案例A：用户服用3个月后消化功能改善，胃肠蠕动增强，恶心症状减轻，关节疼痛有所缓解"
  },
  {
    herbName: "Ashwagandha",
    chineseName: "印度人参",
    briefDescription: "抗压力、适应原草药",
    composition: ["Withanolides", "生物碱"],
    efficacyCategory: ["压力与焦虑", "能量提升"],
    usageRecommendations: "早晚服用，空腹或餐后均可。建议分早晚两次，连续使用至少4-6周才能见效",
    safetyLevel: "高",
    precautions: "孕妇哺乳期完全禁用、自身免疫疾病可能刺激免疫系统、甲状腺疾病可能影响甲状腺功能、血糖异常可能影响血糖水平",
    tcmConstitution: "气虚体质",
    caseStudy: "案例A：用户服用2个月后焦虑感降低，皮质醇水平下降，压力反应减少，体力和耐力明显提升"
  },
  {
    herbName: "Milk Thistle",
    chineseName: "奶蓟草",
    briefDescription: "保护肝脏、解毒排毒",
    composition: ["水飞蓟素", "黄酮类"],
    efficacyCategory: ["肝脏健康", "解毒支持"],
    usageRecommendations: "饭后服用，配合充足水分。建议餐后服用提高吸收率，可与其他护肝草药配合",
    safetyLevel: "高",
    precautions: "过敏体质可能引起过敏反应、激素敏感疾病可能有轻微雌激素样作用、糖尿病可能影响血糖、药物相互作用可能影响肝脏代谢药物",
    tcmConstitution: "湿热体质",
    caseStudy: "案例A：用户服用3个月后肝功能指标改善，解毒能力增强，肝细胞修复明显，定期检查显示肝脏健康状况良好"
  },
  {
    herbName: "Valerian", 
    chineseName: "缬草",
    briefDescription: "促进睡眠、镇静安神",
    composition: ["挥发油", "缬草酸类"],
    efficacyCategory: ["睡眠支持", "情绪管理"],
    usageRecommendations: "睡前服用，避免白天使用。睡前30-60分钟服用，可与洋甘菊配合使用",
    safetyLevel: "高",
    precautions: "孕妇哺乳期安全性未完全确定、肝脏疾病可能加重肝脏负担、手术前可能增强麻醉效果、驾驶操作可能影响反应能力",
    tcmConstitution: "气虚体质",
    caseStudy: "案例A：用户服用1个月后入睡时间缩短，睡眠深度提高，神经紧张缓解，情绪更加稳定"
  }
];

// 创建单个草药条目
async function createHerbEntry(herb) {
  try {
    console.log(`📝 正在创建 ${herb.herbName} (${herb.chineseName}) 条目...`);
    
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        "草药名称": { 
          title: [{ text: { content: `${herb.herbName} / ${herb.chineseName}` } }] 
        },
        "中文名": { 
          rich_text: [{ text: { content: herb.chineseName } }] 
        },
        "简要描述": { 
          rich_text: [{ text: { content: herb.briefDescription } }] 
        },
        "成分构成": { 
          multi_select: herb.composition.map(comp => ({ name: comp }))
        },
        "功效分类": { 
          multi_select: herb.efficacyCategory.map(cat => ({ name: cat }))
        },
        "使用建议": { 
          rich_text: [{ text: { content: herb.usageRecommendations } }] 
        },
        "安全性等级": { 
          select: { name: herb.safetyLevel } 
        },
        "注意事项": { 
          rich_text: [{ text: { content: herb.precautions } }] 
        },
        "中医体质匹配": { 
          select: { name: herb.tcmConstitution } 
        },
        "案例分析": { 
          rich_text: [{ text: { content: herb.caseStudy } }] 
        }
      }
    });

    console.log(`✅ ${herb.herbName} 创建成功! ID: ${response.id}`);
    return { success: true, herb: herb.herbName, id: response.id };
    
  } catch (error) {
    console.error(`❌ 创建 ${herb.herbName} 失败:`, error.body || error.message);
    return { success: false, herb: herb.herbName, error: error.message };
  }
}

// 批量创建所有草药
async function createAllHerbs() {
  console.log("🌿 开始批量创建草药数据库条目...\n");
  
  const results = [];
  const errors = [];
  
  for (let i = 0; i < herbsData.length; i++) {
    const herb = herbsData[i];
    const result = await createHerbEntry(herb);
    
    if (result.success) {
      results.push(result);
    } else {
      errors.push(result);
    }
    
    // 添加延迟避免API限制
    if (i < herbsData.length - 1) {
      console.log("⏳ 等待1秒...\n");
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // 输出结果统计
  console.log("\n" + "=".repeat(60));
  console.log("📊 批量创建结果统计:");
  console.log("=".repeat(60));
  console.log(`✅ 成功创建: ${results.length} 个草药条目`);
  console.log(`❌ 创建失败: ${errors.length} 个草药条目`);
  
  if (results.length > 0) {
    console.log("\n🎉 成功创建的草药条目:");
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.herb} - ID: ${result.id}`);
    });
  }
  
  if (errors.length > 0) {
    console.log("\n⚠️ 创建失败的草药:");
    errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.herb} - 错误: ${error.error}`);
    });
  }
  
  console.log("\n🔗 您可以在Notion中查看所有新创建的草药页面");
  console.log("📈 下一步: 考虑将这些数据集成到您的网站中");
  
  return { success: results, failed: errors };
}

// 执行批量创建
async function main() {
  console.log("🌿 草药数据库批量创建工具\n");
  
  try {
    // 先测试连接
    const testResponse = await notion.databases.retrieve({ 
      database_id: process.env.NOTION_DATABASE_ID 
    });
    
    console.log("✅ 数据库连接成功！");
    console.log(`📊 数据库名称: ${testResponse.title?.[0]?.plain_text || '无标题'}`);
    console.log(`📋 将创建 ${herbsData.length} 个草药条目\n`);
    
    // 开始批量创建
    await createAllHerbs();
    
  } catch (error) {
    console.error("❌ 连接失败:", error.message);
    console.log("请检查环境变量和数据库权限设置");
  }
}

main(); 