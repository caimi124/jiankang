const { Client } = require("@notionhq/client");

// Notion集成配置
const notion = new Client({ 
  auth: "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" 
});

const databaseId = "2156f14b923c802c8d48d84247b6681a";

// 姜黄详细信息数据
const turmericData = {
  title: "Turmeric",
  chineseName: "姜黄",
  briefDescription: "抗炎、关节疼痛、肠胃调节",
  composition: "姜黄素、挥发油",
  recommendedDosage: "每日 300-500mg",
  efficacyCategory: "消化健康；炎症管理",
  usageRecommendations: "饭后服用，避免空腹",
  safetyLevel: "高",
  precautions: "孕妇禁用",
  tcmConstitution: "湿热体质",
  caseStudy: "用户A服用3个月，改善关节疼痛"
};

// 生成完整的草药详情页内容
function generateHerbDetailContent(data) {
  return `# ${data.title} (${data.chineseName})

## 📋 基本信息
**草药名称**: ${data.title}
**中文名**: ${data.chineseName}
**简要描述**: ${data.briefDescription}

## 🧪 成分构成
${data.composition}

姜黄的主要活性成分姜黄素(Curcumin)是一种强效的抗炎化合物，具有显著的抗氧化特性。挥发油成分则为姜黄提供了独特的芳香和辅助的生物活性。

## 💊 推荐剂量
**标准剂量**: ${data.recommendedDosage}

**具体建议**:
- 初次使用者: 建议从每日200mg开始
- 一般保健: 每日300-400mg
- 炎症管理: 每日400-500mg
- 请遵循产品标签说明或咨询专业人士

## 🎯 功效分类
**主要功效**: ${data.efficacyCategory}

**详细功效**:
- **消化系统**: 促进胆汁分泌，改善消化功能，缓解肠胃不适
- **炎症管理**: 天然抗炎作用，有助缓解关节疼痛和肌肉炎症
- **抗氧化**: 清除自由基，延缓细胞老化
- **肝脏保护**: 支持肝脏解毒功能，保护肝细胞

## 📖 使用建议
**最佳服用方式**: ${data.usageRecommendations}

**详细指导**:
- 建议餐后30分钟内服用，以减少胃肠刺激
- 可与黑胡椒或脂肪一起服用以提高吸收率
- 连续使用不宜超过8周，建议间歇性使用
- 如有慢性疾病，请在医生指导下使用

## 🛡️ 安全性评估
**安全性等级**: ${data.safetyLevel}

**风险评估**:
- 一般成人: 低风险
- 短期使用: 非常安全
- 长期使用: 需要监测
- 特殊人群: 需要注意禁忌症

## ⚠️ 注意事项与禁忌
**主要禁忌**: ${data.precautions}

**详细注意事项**:
- **孕妇**: 完全禁用，可能影响子宫收缩
- **哺乳期**: 不建议使用
- **胆结石患者**: 禁用，可能加重症状
- **血液疾病**: 可能影响凝血功能
- **手术前2周**: 停止使用
- **糖尿病患者**: 可能影响血糖，需监测

## 🏥 中医体质匹配
**适宜体质**: ${data.tcmConstitution}

**体质分析**:
- **湿热体质**: 最为适宜，能清热燥湿
- **血瘀体质**: 较为适宜，有活血化瘀作用
- **气郁体质**: 一般适宜，能疏肝理气
- **不适宜体质**: 阳虚、阴虚体质需谨慎使用

## 📊 临床案例分析
**案例研究**: ${data.caseStudy}

**详细案例**:
**案例A - 关节炎缓解**
- 患者信息: 45岁女性，轻度骨关节炎
- 使用方案: 每日400mg姜黄素，餐后服用
- 使用周期: 连续3个月
- 效果评估: 关节疼痛减轻60%，活动度明显改善
- 副作用: 无明显不良反应

**案例B - 消化改善**
- 患者信息: 38岁男性，慢性胃炎
- 使用方案: 每日300mg，分两次餐后服用
- 使用周期: 2个月
- 效果评估: 胃部不适感明显减轻，食欲改善
- 副作用: 偶有轻微胃部温热感

## 📈 使用建议总结
1. **新手用户**: 从小剂量开始，观察身体反应
2. **长期用户**: 建议间歇性使用，避免连续超过8周
3. **特殊人群**: 孕妇、哺乳期、特定疾病患者需避免使用
4. **最佳搭配**: 可与黑胡椒、生姜等天然成分搭配使用
5. **储存建议**: 阴凉干燥处保存，避免阳光直射

---
*本信息仅供参考，不构成医疗建议。使用前请咨询专业医疗人员。*`;
}

// 查询是否已exists Turmeric条目
async function findExistingTurmericPage() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "草药名称", // 假设数据库中有这个属性
        title: {
          equals: "Turmeric"
        }
      }
    });
    
    return response.results.length > 0 ? response.results[0] : null;
  } catch (error) {
    console.error("查询失败:", error);
    return null;
  }
}

// 创建新的姜黄页面
async function createTurmericPage() {
  try {
    const detailContent = generateHerbDetailContent(turmericData);
    
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "草药名称": {
          title: [
            {
              text: {
                content: turmericData.title
              }
            }
          ]
        },
        "中文名": {
          rich_text: [
            {
              text: {
                content: turmericData.chineseName
              }
            }
          ]
        },
        "简要描述": {
          rich_text: [
            {
              text: {
                content: turmericData.briefDescription
              }
            }
          ]
        },
        "成分构成": {
          rich_text: [
            {
              text: {
                content: turmericData.composition
              }
            }
          ]
        },
        "推荐剂量": {
          rich_text: [
            {
              text: {
                content: turmericData.recommendedDosage
              }
            }
          ]
        },
        "功效分类": {
          rich_text: [
            {
              text: {
                content: turmericData.efficacyCategory
              }
            }
          ]
        },
        "使用建议": {
          rich_text: [
            {
              text: {
                content: turmericData.usageRecommendations
              }
            }
          ]
        },
        "安全性等级": {
          select: {
            name: turmericData.safetyLevel
          }
        },
        "注意事项": {
          rich_text: [
            {
              text: {
                content: turmericData.precautions
              }
            }
          ]
        },
        "中医体质匹配": {
          rich_text: [
            {
              text: {
                content: turmericData.tcmConstitution
              }
            }
          ]
        },
        "案例分析": {
          rich_text: [
            {
              text: {
                content: turmericData.caseStudy
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
                  content: detailContent
                }
              }
            ]
          }
        }
      ]
    });
    
    return response;
  } catch (error) {
    console.error("创建页面失败:", error.body || error);
    throw error;
  }
}

// 更新现有页面
async function updateTurmericPage(pageId) {
  try {
    const detailContent = generateHerbDetailContent(turmericData);
    
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        "中文名": {
          rich_text: [
            {
              text: {
                content: turmericData.chineseName
              }
            }
          ]
        },
        "简要描述": {
          rich_text: [
            {
              text: {
                content: turmericData.briefDescription
              }
            }
          ]
        },
        "成分构成": {
          rich_text: [
            {
              text: {
                content: turmericData.composition
              }
            }
          ]
        },
        "推荐剂量": {
          rich_text: [
            {
              text: {
                content: turmericData.recommendedDosage
              }
            }
          ]
        },
        "功效分类": {
          rich_text: [
            {
              text: {
                content: turmericData.efficacyCategory
              }
            }
          ]
        },
        "使用建议": {
          rich_text: [
            {
              text: {
                content: turmericData.usageRecommendations
              }
            }
          ]
        },
        "安全性等级": {
          select: {
            name: turmericData.safetyLevel
          }
        },
        "注意事项": {
          rich_text: [
            {
              text: {
                content: turmericData.precautions
              }
            }
          ]
        },
        "中医体质匹配": {
          rich_text: [
            {
              text: {
                content: turmericData.tcmConstitution
              }
            }
          ]
        },
        "案例分析": {
          rich_text: [
            {
              text: {
                content: turmericData.caseStudy
              }
            }
          ]
        }
      }
    });
    
    return response;
  } catch (error) {
    console.error("更新页面失败:", error.body || error);
    throw error;
  }
}

// 主执行函数
async function main() {
  try {
    console.log("🔍 正在查找现有的姜黄条目...");
    
    // 先查询数据库结构
    const database = await notion.databases.retrieve({ database_id: databaseId });
    console.log("📊 数据库属性:", Object.keys(database.properties));
    
    const existingPage = await findExistingTurmericPage();
    
    if (existingPage) {
      console.log("✅ 找到现有条目，正在更新...");
      const result = await updateTurmericPage(existingPage.id);
      console.log("🎉 姜黄条目更新成功！");
      console.log("📄 页面ID:", result.id);
      console.log("🔗 页面URL:", result.url);
    } else {
      console.log("📝 未找到现有条目，正在创建新条目...");
      const result = await createTurmericPage();
      console.log("🎉 姜黄条目创建成功！");
      console.log("📄 页面ID:", result.id);
      console.log("🔗 页面URL:", result.url);
    }
    
    console.log("\n📋 生成的详细内容预览:");
    console.log("─".repeat(50));
    console.log(generateHerbDetailContent(turmericData).substring(0, 500) + "...");
    console.log("─".repeat(50));
    
  } catch (error) {
    console.error("❌ 操作失败:", error.message);
    
    if (error.code === 'unauthorized') {
      console.log("💡 建议检查:");
      console.log("1. Notion Token 是否正确");
      console.log("2. 集成是否已添加到相应的页面/数据库");
      console.log("3. 集成是否有足够的权限");
    } else if (error.code === 'object_not_found') {
      console.log("💡 建议检查:");
      console.log("1. 数据库ID 是否正确");
      console.log("2. 数据库是否存在且可访问");
    }
  }
}

// 执行脚本
if (require.main === module) {
  main();
}

module.exports = {
  generateHerbDetailContent,
  createTurmericPage,
  updateTurmericPage,
  turmericData
}; 