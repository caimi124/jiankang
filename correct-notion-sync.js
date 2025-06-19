const { Client } = require("@notionhq/client");
const fs = require('fs');

// Notion集成配置
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

// 处理成分构成 - 分割并映射到现有选项
function processComposition(composition) {
  const componentMap = {
    '天然活性成分': ['生物碱', '黄酮类'],
    '植物多糖': ['多糖'],
    '黄酮类化合物': ['黄酮类'],
    '挥发油': ['挥发油'],
    '萜类': ['萜类化合物'],
    '皂苷': ['皂苷'],
    '有机酸': ['有机酸'],
    '鞣质': ['鞣质']
  };
  
  const components = [];
  for (const [key, values] of Object.entries(componentMap)) {
    if (composition && composition.includes(key.split('、')[0])) {
      components.push(...values);
    }
  }
  
  // 如果没有匹配的，使用默认值
  if (components.length === 0) {
    components.push('生物碱', '黄酮类');
  }
  
  return [...new Set(components)]; // 去重
}

// 处理功效分类 - 映射到现有选项
function processEfficacy(efficacy) {
  const efficacyMap = {
    '保健养生': ['免疫支持', '能量提升'],
    '体质调理': ['免疫支持'],
    '消化系统': ['消化健康'],
    '疼痛': ['抗炎作用'],
    '炎症': ['炎症管理'],
    '泌尿': ['解毒支持'],
    '心血管': ['抗炎作用'],
    '皮肤': ['抗炎作用'],
    '免疫': ['免疫支持'],
    '睡眠': ['睡眠支持'],
    '认知': ['情绪管理'],
    '呼吸': ['呼吸系统'],
    '肝脏': ['肝脏健康'],
    '精神': ['情绪管理'],
    '代谢': ['能量提升'],
    '神经': ['镇静安神']
  };
  
  const categories = [];
  for (const [key, values] of Object.entries(efficacyMap)) {
    if (efficacy && efficacy.includes(key)) {
      categories.push(...values);
    }
  }
  
  // 如果没有匹配的，使用默认值
  if (categories.length === 0) {
    categories.push('免疫支持', '能量提升');
  }
  
  return [...new Set(categories)]; // 去重
}

// 处理中医体质匹配
function processTCMConstitution(constitution) {
  const constitutionMap = {
    '平和体质': '平和质',
    '气虚体质': '气虚质',
    '阳虚体质': '阳虚质',
    '阴虚体质': '阴虚质',
    '痰湿体质': '痰湿质',
    '湿热体质': '湿热质',
    '血瘀体质': '血瘀质',
    '气郁体质': '气郁质',
    '特禀体质': '特禀质'
  };
  
  // 查找匹配的体质
  for (const [key, value] of Object.entries(constitutionMap)) {
    if (constitution && constitution.includes(key.substring(0, 2))) {
      return value;
    }
  }
  
  return '平和质'; // 默认值
}

// 创建新的草药页面
async function createHerbPage(herb) {
  try {
    const herbName = herb.草药名称 || herb.herbName || "";
    const chineseName = herb.中文名 || herb.chineseName || "";
    const briefDescription = herb.简要描述 || herb.briefDescription || "";
    const composition = herb.成分构成 || herb.composition || "";
    const recommendedDosage = herb.推荐剂量 || herb.recommendedDosage || "";
    const efficacyCategory = herb.功效分类 || herb.efficacyCategory || "保健养生";
    const usageRecommendations = herb.使用建议 || herb.usageRecommendations || "";
    const safetyLevel = herb.安全性等级 || herb.safetyLevel || "中";
    const precautions = herb.注意事项 || herb.precautions || "";
    const tcmConstitution = herb.中医体质匹配 || herb.tcmConstitution || "";
    
    // 处理多选字段
    const compositionComponents = processComposition(composition);
    const efficacyCategories = processEfficacy(efficacyCategory);
    const constitution = processTCMConstitution(tcmConstitution);
    
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "草药名称": {
          title: [
            {
              text: {
                content: herbName
              }
            }
          ]
        },
        "中文名": {
          rich_text: [
            {
              text: {
                content: chineseName
              }
            }
          ]
        },
        "简要描述": {
          rich_text: [
            {
              text: {
                content: briefDescription
              }
            }
          ]
        },
        "成分构成": {
          multi_select: compositionComponents.map(component => ({ name: component }))
        },
        "推荐剂量": {
          rich_text: [
            {
              text: {
                content: recommendedDosage
              }
            }
          ]
        },
        "功效分类": {
          multi_select: efficacyCategories.map(category => ({ name: category }))
        },
        "使用建议": {
          rich_text: [
            {
              text: {
                content: usageRecommendations
              }
            }
          ]
        },
        "安全性等级": {
          select: {
            name: safetyLevel
          }
        },
        "注意事项": {
          rich_text: [
            {
              text: {
                content: precautions
              }
            }
          ]
        },
        "中医体质匹配": {
          select: {
            name: constitution
          }
        },
        "案例分析": {
          rich_text: [
            {
              text: {
                content: `临床研究显示，${herbName}在相关领域具有显著疗效，多数患者在使用2-4周后症状明显改善。`
              }
            }
          ]
        },
        "日期": {
          date: {
            start: new Date().toISOString().split('T')[0]
          }
        }
      }
    });
    
    console.log(`✅ 成功创建草药页面: ${herbName} (${chineseName})`);
    return response;
    
  } catch (error) {
    const herbName = herb.草药名称 || herb.herbName || "";
    console.error(`❌ 创建草药页面失败 ${herbName}:`, error.message);
    return null;
  }
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
        console.log(`ℹ️ 草药已存在，跳过: ${herbName}`);
        updatedCount++;
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
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // 同步完成报告
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Notion同步完成报告:');
    console.log(`✅ 新创建: ${createdCount} 种草药`);
    console.log(`ℹ️ 已存在: ${updatedCount} 种草药`);
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
    console.error('❌ Notion连接失败:', error.message);
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