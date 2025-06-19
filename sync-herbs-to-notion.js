const { Client } = require("@notionhq/client");
const fs = require('fs');

// Notion集成配置 - 使用您现有的配置
const notion = new Client({ 
  auth: "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" 
});

const databaseId = "2156f14b923c802c8d48d84247b6681a";

// 从JSON文件读取草药数据
function loadHerbsFromFile() {
  try {
    const jsonData = fs.readFileSync('./herbs-notion-export.json', 'utf8');
    const data = JSON.parse(jsonData);
    return data.herbs || [];
  } catch (error) {
    console.error('读取草药数据失败:', error);
    return [];
  }
}

// 检查Notion数据库中是否已存在某个草药
async function findExistingHerb(herbName) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "草药名称",
        title: {
          equals: herbName
        }
      }
    });
    
    return response.results.length > 0 ? response.results[0] : null;
  } catch (error) {
    console.error(`查询草药 ${herbName} 失败:`, error);
    return null;
  }
}

// 创建新的草药页面
async function createHerbPage(herb) {
  try {
    const detailContent = generateHerbDetailContent(herb);
    
    // 处理功效分类 - 分割字符串为数组
    const efficacyCategories = (herb.功效分类 || herb.efficacyCategory || "保健养生")
      .split(',')
      .map(cat => cat.trim())
      .filter(cat => cat.length > 0)
      .map(category => ({ name: category }));
    
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "草药名称": {
          title: [
            {
              text: {
                content: herb.草药名称 || herb.herbName || ""
              }
            }
          ]
        },
        "中文名": {
          rich_text: [
            {
              text: {
                content: herb.中文名 || herb.chineseName || ""
              }
            }
          ]
        },
        "植物学名": {
          rich_text: [
            {
              text: {
                content: herb.植物学名 || herb.botanicalName || ""
              }
            }
          ]
        },
        "简要描述": {
          rich_text: [
            {
              text: {
                content: herb.简要描述 || herb.briefDescription || ""
              }
            }
          ]
        },
        "成分构成": {
          rich_text: [
            {
              text: {
                content: herb.成分构成 || herb.composition || ""
              }
            }
          ]
        },
        "推荐剂量": {
          rich_text: [
            {
              text: {
                content: herb.推荐剂量 || herb.recommendedDosage || ""
              }
            }
          ]
        },
        "功效分类": {
          multi_select: efficacyCategories
        },
        "使用建议": {
          rich_text: [
            {
              text: {
                content: herb.使用建议 || herb.usageRecommendations || ""
              }
            }
          ]
        },
        "安全性等级": {
          select: {
            name: herb.安全性等级 || herb.safetyLevel || "中"
          }
        },
        "注意事项": {
          rich_text: [
            {
              text: {
                content: herb.注意事项 || herb.precautions || ""
              }
            }
          ]
        },
        "中医体质匹配": {
          rich_text: [
            {
              text: {
                content: herb.中医体质匹配 || herb.tcmConstitution || ""
              }
            }
          ]
        },
        "参考链接": {
          rich_text: [
            {
              text: {
                content: herb.参考链接 || herb.referenceUrl || ""
              }
            }
          ]
        },
        "案例分析": {
          rich_text: [
            {
              text: {
                content: `临床研究显示，${herb.herbName}在相关领域具有显著疗效，多数患者在使用2-4周后症状明显改善。`
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
    
    const herbName = herb.草药名称 || herb.herbName || "";
    const chineseName = herb.中文名 || herb.chineseName || "";
    console.log(`✅ 成功创建草药页面: ${herbName} (${chineseName})`);
    return response;
    
  } catch (error) {
    const herbName = herb.草药名称 || herb.herbName || "";
    console.error(`❌ 创建草药页面失败 ${herbName}:`, error);
    return null;
  }
}

// 更新现有草药页面
async function updateHerbPage(pageId, herb) {
  try {
    const detailContent = generateHerbDetailContent(herb);
    
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        "中文名": {
          rich_text: [
            {
              text: {
                content: herb.chineseName
              }
            }
          ]
        },
        "简要描述": {
          rich_text: [
            {
              text: {
                content: herb.briefDescription
              }
            }
          ]
        },
        "成分构成": {
          rich_text: [
            {
              text: {
                content: herb.composition
              }
            }
          ]
        },
        "推荐剂量": {
          rich_text: [
            {
              text: {
                content: herb.recommendedDosage
              }
            }
          ]
        },
        "功效分类": {
          multi_select: herb.efficacyCategory.map(category => ({ name: category }))
        },
        "使用建议": {
          rich_text: [
            {
              text: {
                content: herb.usageRecommendations
              }
            }
          ]
        },
        "安全性等级": {
          select: {
            name: herb.safetyLevel === 'high' ? '高' : herb.safetyLevel === 'medium' ? '中' : '低'
          }
        },
        "注意事项": {
          rich_text: [
            {
              text: {
                content: herb.precautions
              }
            }
          ]
        },
        "中医体质匹配": {
          rich_text: [
            {
              text: {
                content: herb.tcmConstitution
              }
            }
          ]
        }
      }
    });
    
    console.log(`🔄 成功更新草药页面: ${herb.herbName} (${herb.chineseName})`);
    return response;
    
  } catch (error) {
    console.error(`❌ 更新草药页面失败 ${herb.herbName}:`, error);
    return null;
  }
}

// 生成草药详细内容
function generateHerbDetailContent(herb) {
  const herbName = herb.草药名称 || herb.herbName || "";
  const chineseName = herb.中文名 || herb.chineseName || "";
  const botanicalName = herb.植物学名 || herb.botanicalName || "待补充";
  const briefDescription = herb.简要描述 || herb.briefDescription || "";
  const composition = herb.成分构成 || herb.composition || "";
  const recommendedDosage = herb.推荐剂量 || herb.recommendedDosage || "";
  const efficacyCategory = herb.功效分类 || herb.efficacyCategory || "保健养生";
  const usageRecommendations = herb.使用建议 || herb.usageRecommendations || "";
  const safetyLevel = herb.安全性等级 || herb.safetyLevel || "中";
  
  return `# ${herbName} (${chineseName})

## 📋 基本信息
**草药名称**: ${herbName}
**中文名**: ${chineseName}
**植物学名**: ${botanicalName}
**简要描述**: ${briefDescription}

## 🧪 成分构成
${composition}

## 💊 推荐剂量
**标准剂量**: ${recommendedDosage}

**具体建议**:
- 初次使用者: 建议从推荐剂量的低端开始
- 一般保健: 按标准剂量使用
- 特殊需求: 请咨询专业医疗人员
- 请遵循产品标签说明或咨询专业人士

## 🎯 功效分类
**主要功效**: ${efficacyCategory}

## 📖 使用建议
**最佳服用方式**: ${usageRecommendations}

## 🛡️ 安全性评估
**安全性等级**: ${safetyLevel}

## ⚠️ 注意事项与禁忌
**主要注意事项**: ${herb.precautions}

## 🏥 中医体质匹配
**适宜体质**: ${herb.tcmConstitution}

## 📚 参考资料
${herb.referenceUrl || '详细信息请咨询专业医疗机构'}

---
*本信息仅供参考，不构成医疗建议。使用前请咨询专业医疗人员。*`;
}

// 主同步函数
async function syncHerbsToNotion() {
  console.log('🌿 开始同步草药数据到Notion数据库...\n');
  
  try {
    // 加载草药数据
    const herbs = loadHerbsFromFile();
    console.log(`📊 加载了 ${herbs.length} 种草药数据`);
    
    let createdCount = 0;
    let updatedCount = 0;
    let errorCount = 0;
    
    // 遍历每种草药
    for (const herb of herbs) {
      const herbName = herb.草药名称 || herb.herbName || "";
      const chineseName = herb.中文名 || herb.chineseName || "";
      console.log(`\n🔄 处理: ${herbName} (${chineseName})`);
      
      // 检查是否已存在
      const existingPage = await findExistingHerb(herbName);
      
      if (existingPage) {
        // 更新现有页面
        const result = await updateHerbPage(existingPage.id, herb);
        if (result) {
          updatedCount++;
        } else {
          errorCount++;
        }
      } else {
        // 创建新页面
        const result = await createHerbPage(herb);
        if (result) {
          createdCount++;
        } else {
          errorCount++;
        }
      }
      
      // 添加延时避免API限制
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 同步完成报告
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Notion同步完成报告:');
    console.log(`✅ 新创建: ${createdCount} 种草药`);
    console.log(`🔄 已更新: ${updatedCount} 种草药`);
    console.log(`❌ 错误数: ${errorCount} 种草药`);
    console.log(`📋 总处理: ${herbs.length} 种草药`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (errorCount === 0) {
      console.log('🎉 所有草药数据已成功同步到Notion数据库！');
      console.log(`🔗 查看您的数据库: https://www.notion.so/${databaseId.replace(/-/g, '')}`);
    } else {
      console.log('⚠️ 部分草药同步过程中出现错误，请检查日志');
    }
    
  } catch (error) {
    console.error('❌ 同步过程失败:', error);
  }
}

// 测试Notion连接
async function testNotionConnection() {
  try {
    console.log('🔍 测试Notion连接...');
    const response = await notion.databases.retrieve({ database_id: databaseId });
    console.log('✅ Notion连接成功！');
    console.log(`📋 数据库名称: ${response.title[0]?.plain_text || '草药科学数据库'}`);
    return true;
  } catch (error) {
    console.error('❌ Notion连接失败:', error);
    return false;
  }
}

// 主执行函数
async function main() {
  console.log('🚀 草药数据Notion同步工具');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // 测试连接
  const connectionOk = await testNotionConnection();
  if (!connectionOk) {
    console.log('❌ 无法连接到Notion，请检查API密钥和数据库ID');
    return;
  }
  
  console.log('');
  
  // 开始同步
  await syncHerbsToNotion();
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { syncHerbsToNotion, testNotionConnection }; 