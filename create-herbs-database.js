const { Client } = require("@notionhq/client");

const notion = new Client({ auth: "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" });

// 完整的草药数据
const herbsData = [
  {
    herbName: "Turmeric",
    chineseName: "姜黄",
    briefDescription: "抗炎、关节疼痛、肠胃调节",
    composition: "姜黄素、挥发油",
    recommendedDosage: "每日 300-500mg",
    efficacyCategory: ["消化健康", "炎症管理"],
    usageRecommendations: "饭后服用，避免空腹",
    safetyLevel: "高",
    precautions: "孕妇禁用",
    tcmConstitution: "湿热体质",
    caseStudy: "用户A服用3个月，改善关节疼痛"
  },
  {
    herbName: "Ginseng",
    chineseName: "人参",
    briefDescription: "补气养血、增强体质",
    composition: "人参皂苷、多糖",
    recommendedDosage: "每日 200-400mg",
    efficacyCategory: ["能量提升", "免疫支持"],
    usageRecommendations: "早晨服用，避免晚间",
    safetyLevel: "高",
    precautions: "高血压患者慎用",
    tcmConstitution: "气虚体质",
    caseStudy: "用户B服用2个月，精力明显改善"
  },
  {
    herbName: "Licorice",
    chineseName: "甘草",
    briefDescription: "缓解咳嗽、消炎抗菌",
    composition: "甘草酸、黄酮类",
    recommendedDosage: "每日 100-300mg",
    efficacyCategory: ["呼吸系统", "消化健康"],
    usageRecommendations: "饭后服用，避免过量",
    safetyLevel: "中",
    precautions: "长期服用需监测血压",
    tcmConstitution: "气虚体质",
    caseStudy: "用户C服用1个月，咳嗽明显缓解"
  },
  {
    herbName: "Echinacea",
    chineseName: "紫维菊",
    briefDescription: "增强免疫、抗病毒",
    composition: "多糖、烷基酰胺",
    recommendedDosage: "每日 400-900mg",
    efficacyCategory: ["免疫支持", "抗病毒"],
    usageRecommendations: "早晚服用，感冒初期使用",
    safetyLevel: "高",
    precautions: "过敏体质慎用",
    tcmConstitution: "体质偏寒",
    caseStudy: "用户D在感冒季节服用，感冒次数减少"
  },
  {
    herbName: "Peppermint",
    chineseName: "薄荷",
    briefDescription: "缓解消化不良、清热解毒",
    composition: "薄荷脑、薄荷酮",
    recommendedDosage: "每日 150-300mg",
    efficacyCategory: ["消化健康", "呼吸系统"],
    usageRecommendations: "饭后服用，避免过量",
    safetyLevel: "高",
    precautions: "儿童慎用",
    tcmConstitution: "湿热体质",
    caseStudy: "用户E服用2周，胃部不适减轻"
  },
  {
    herbName: "Chamomile",
    chineseName: "洋甘菊",
    briefDescription: "促进睡眠、缓解焦虑",
    composition: "挥发油、黄酮类",
    recommendedDosage: "每日 200-400mg",
    efficacyCategory: ["睡眠支持", "情绪管理"],
    usageRecommendations: "睡前服用，可泡茶饮用",
    safetyLevel: "高",
    precautions: "孕妇慎用",
    tcmConstitution: "气虚体质",
    caseStudy: "用户F服用1个月，睡眠质量提高"
  },
  {
    herbName: "Ginger",
    chineseName: "生姜",
    briefDescription: "抗炎、促消化、止呕",
    composition: "姜辣素、挥发油",
    recommendedDosage: "每日 250-1000mg",
    efficacyCategory: ["消化健康", "抗炎作用"],
    usageRecommendations: "饭后服用，可配合温水",
    safetyLevel: "高",
    precautions: "胃溃疡患者慎用",
    tcmConstitution: "湿寒体质",
    caseStudy: "用户G服用3个月，消化功能改善"
  },
  {
    herbName: "Ashwagandha",
    chineseName: "印度人参",
    briefDescription: "抗压力、适应原草药",
    composition: "withanolides、生物碱",
    recommendedDosage: "每日 300-600mg",
    efficacyCategory: ["压力与焦虑", "能量提升"],
    usageRecommendations: "早晚服用，空腹或餐后均可",
    safetyLevel: "高",
    precautions: "孕妇禁用",
    tcmConstitution: "气虚体质",
    caseStudy: "用户H服用2个月，焦虑感降低"
  },
  {
    herbName: "Milk Thistle",
    chineseName: "奶蓟草",
    briefDescription: "保护肝脏、解毒排余",
    composition: "水飞蓟素、黄酮类",
    recommendedDosage: "每日 200-400mg",
    efficacyCategory: ["肝脏健康", "解毒支持"],
    usageRecommendations: "饭后服用，配合充足水分",
    safetyLevel: "高",
    precautions: "过敏者慎用",
    tcmConstitution: "湿热体质",
    caseStudy: "用户I服用3个月，肝功能改善"
  },
  {
    herbName: "Valerian",
    chineseName: "缬草",
    briefDescription: "促进睡眠、镇静安神",
    composition: "挥发油、缬草酸类",
    recommendedDosage: "每日 400-900mg",
    efficacyCategory: ["睡眠支持", "情绪管理"],
    usageRecommendations: "睡前服用，避免白天使用",
    safetyLevel: "高",
    precautions: "孕妇慎用",
    tcmConstitution: "气虚体质",
    caseStudy: "用户J服用1个月，入睡时间缩短"
  }
];

// 创建草药数据库
async function createHerbsDatabase() {
  console.log("🌿 正在创建草药数据库...\n");
  
  try {
    // 首先需要找到一个页面作为父级
    // 我们需要创建一个页面来包含数据库
    console.log("📄 正在创建父页面...");
    
    const parentPage = await notion.pages.create({
      parent: {
        type: "page_id",
        page_id: "root" // 这需要一个实际的页面ID
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: "草药科学数据库系统"
              }
            }
          ]
        }
      }
    });
    
    console.log("✅ 父页面创建成功");
    
  } catch (error) {
    console.log("⚠️ 无法创建页面，尝试直接创建数据库...");
  }
  
  // 尝试创建数据库
  try {
    const database = await notion.databases.create({
      parent: {
        type: "page_id", 
        page_id: "root" // 需要替换为实际的页面ID
      },
      title: [
        {
          type: "text",
          text: {
            content: "草药科学数据库"
          }
        }
      ],
      properties: {
        "Herb Name": {
          title: {}
        },
        "中文名": {
          rich_text: {}
        },
        "简要描述": {
          rich_text: {}
        },
        "成分构成": {
          rich_text: {}
        },
        "推荐剂量": {
          rich_text: {}
        },
        "功效分类": {
          multi_select: {
            options: [
              { name: "消化健康", color: "green" },
              { name: "炎症管理", color: "red" },
              { name: "能量提升", color: "yellow" },
              { name: "免疫支持", color: "blue" },
              { name: "呼吸系统", color: "purple" },
              { name: "睡眠支持", color: "pink" },
              { name: "情绪管理", color: "orange" },
              { name: "抗病毒", color: "gray" },
              { name: "抗炎作用", color: "brown" },
              { name: "压力与焦虑", color: "default" },
              { name: "肝脏健康", color: "green" },
              { name: "解毒支持", color: "blue" }
            ]
          }
        },
        "使用建议": {
          rich_text: {}
        },
        "安全性等级": {
          select: {
            options: [
              { name: "高", color: "green" },
              { name: "中", color: "yellow" },
              { name: "低", color: "red" }
            ]
          }
        },
        "注意事项": {
          rich_text: {}
        },
        "中医体质匹配": {
          rich_text: {}
        },
        "案例分析": {
          rich_text: {}
        }
      }
    });
    
    console.log("✅ 草药数据库创建成功！");
    console.log(`📊 数据库ID: ${database.id}`);
    console.log(`🔗 数据库URL: ${database.url}`);
    
    return database.id;
    
  } catch (error) {
    console.error("❌ 数据库创建失败:", error.body || error.message);
    return null;
  }
}

// 由于Notion API的限制，我们使用一个更简单的方法
// 创建一个简单的页面并提供手动创建数据库的指导
async function createGuidePage() {
  console.log("📋 创建设置指导页面...\n");
  
  const guidanceContent = `# 🌿 草药科学数据库设置指南

## 📊 数据库结构

请在Notion中创建一个新的数据库，包含以下字段：

### 必需字段：
1. **Herb Name** (标题) - 草药英文名
2. **中文名** (文本) - 草药中文名
3. **简要描述** (文本) - 功效简述
4. **成分构成** (文本) - 主要成分
5. **推荐剂量** (文本) - 建议用量
6. **功效分类** (多选) - 功效类别
7. **使用建议** (文本) - 使用方法
8. **安全性等级** (选择) - 安全程度
9. **注意事项** (文本) - 禁忌说明
10. **中医体质匹配** (文本) - 适宜体质
11. **案例分析** (文本) - 临床案例

### 功效分类选项：
- 消化健康
- 炎症管理
- 能量提升
- 免疫支持
- 呼吸系统
- 睡眠支持
- 情绪管理
- 抗病毒
- 抗炎作用
- 压力与焦虑
- 肝脏健康
- 解毒支持

### 安全性等级选项：
- 高 (绿色)
- 中 (黄色)
- 低 (红色)

## 🔧 设置步骤

1. **创建数据库**
   - 在Notion中创建新页面
   - 添加数据库模块
   - 按照上述结构设置字段

2. **添加集成**
   - 点击数据库右上角的 "..." 菜单
   - 选择 "添加连接"
   - 选择您的集成

3. **获取数据库ID**
   - 复制数据库页面的URL
   - 提取32字符的ID部分

4. **运行脚本**
   - 更新脚本中的数据库ID
   - 运行 node create-herbs-database.js

## 📋 将要创建的草药列表

1. Turmeric (姜黄) - 抗炎、关节疼痛、肠胃调节
2. Ginseng (人参) - 补气养血、增强体质
3. Licorice (甘草) - 缓解咳嗽、消炎抗菌
4. Echinacea (紫维菊) - 增强免疫、抗病毒
5. Peppermint (薄荷) - 缓解消化不良、清热解毒
6. Chamomile (洋甘菊) - 促进睡眠、缓解焦虑
7. Ginger (生姜) - 抗炎、促消化、止呕
8. Ashwagandha (印度人参) - 抗压力、适应原草药
9. Milk Thistle (奶蓟草) - 保护肝脏、解毒排余
10. Valerian (缬草) - 促进睡眠、镇静安神

每个草药都包含详细的：
- 成分分析
- 剂量建议
- 安全性评估
- 中医体质匹配
- 临床案例研究
- 使用指导

设置完成后，运行脚本将自动创建所有草药条目！`;

  try {
    // 尝试创建指导页面
    const response = await notion.pages.create({
      parent: {
        type: "page_id",
        page_id: "root"
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: "🌿 草药数据库设置指南"
              }
            }
          ]
        }
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: guidanceContent
                }
              }
            ]
          }
        }
      ]
    });
    
    console.log("✅ 设置指南页面创建成功！");
    console.log(`🔗 页面URL: ${response.url}`);
    
  } catch (error) {
    console.log("⚠️ 无法自动创建页面，请手动设置");
    console.log("\n" + "=".repeat(60));
    console.log("📋 手动设置指南:");
    console.log("=".repeat(60));
    console.log(guidanceContent);
  }
}

// 在现有数据库中创建草药条目
async function populateExistingDatabase(databaseId) {
  console.log(`🌿 开始在数据库 ${databaseId} 中创建草药条目...\n`);
  
  const results = [];
  const errors = [];
  
  for (let i = 0; i < herbsData.length; i++) {
    const herb = herbsData[i];
    
    try {
      console.log(`📝 正在创建 ${herb.herbName} (${herb.chineseName}) 条目...`);
      
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          "Herb Name": {
            title: [{ text: { content: herb.herbName } }]
          },
          "中文名": {
            rich_text: [{ text: { content: herb.chineseName } }]
          },
          "简要描述": {
            rich_text: [{ text: { content: herb.briefDescription } }]
          },
          "成分构成": {
            rich_text: [{ text: { content: herb.composition } }]
          },
          "推荐剂量": {
            rich_text: [{ text: { content: herb.recommendedDosage } }]
          },
          "功效分类": {
            multi_select: herb.efficacyCategory.map(category => ({ name: category }))
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
            rich_text: [{ text: { content: herb.tcmConstitution } }]
          },
          "案例分析": {
            rich_text: [{ text: { content: herb.caseStudy } }]
          }
        }
      });
      
      console.log(`✅ ${herb.herbName} 创建成功! ID: ${response.id}`);
      results.push({ herb: herb.herbName, id: response.id });
      
      // 添加延迟避免API限制
      if (i < herbsData.length - 1) {
        console.log("⏳ 等待1秒...\n");
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      console.error(`❌ 创建 ${herb.herbName} 失败:`, error.body || error.message);
      errors.push(herb.herbName);
    }
  }
  
  // 输出结果统计
  console.log("\n" + "=".repeat(60));
  console.log("📊 创建结果统计:");
  console.log("=".repeat(60));
  console.log(`✅ 成功创建: ${results.length} 个草药条目`);
  console.log(`❌ 创建失败: ${errors.length} 个草药条目`);
  
  if (results.length > 0) {
    console.log("\n🎉 成功创建的草药条目:");
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.herb} - ID: ${result.id}`);
    });
  }
  
  return { success: results, failed: errors };
}

// 主函数
async function main() {
  console.log("🌿 草药数据库创建和填充工具\n");
  
  // 首先尝试搜索是否有可访问的数据库
  try {
    const searchResponse = await notion.search({
      filter: {
        value: "database",
        property: "object"
      }
    });
    
    if (searchResponse.results.length > 0) {
      console.log("✅ 找到可访问的数据库:");
      searchResponse.results.forEach((db, index) => {
        console.log(`${index + 1}. ${db.title?.[0]?.plain_text || '无标题'} - ID: ${db.id}`);
      });
      
      // 使用第一个找到的数据库
      const databaseId = searchResponse.results[0].id;
      console.log(`\n🎯 使用数据库: ${databaseId}\n`);
      await populateExistingDatabase(databaseId);
      
    } else {
      console.log("⚠️ 未找到可访问的数据库");
      await createGuidePage();
    }
    
  } catch (error) {
    console.error("❌ 搜索数据库失败:", error.message);
    await createGuidePage();
  }
}

// 如果提供了数据库ID作为参数，直接使用
const databaseIdArg = process.argv[2];
if (databaseIdArg) {
  console.log(`🎯 使用提供的数据库ID: ${databaseIdArg}\n`);
  populateExistingDatabase(databaseIdArg);
} else {
  main();
}

module.exports = {
  herbsData,
  populateExistingDatabase,
  createGuidePage
}; 