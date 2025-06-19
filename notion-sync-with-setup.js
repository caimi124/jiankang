const { Client } = require("@notionhq/client");
const fs = require('fs');

// Notion集成配置
const notion = new Client({ 
  auth: "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" 
});

// 数据库ID（如果数据库不存在，将创建新的）
let databaseId = "2156f14b923c802c8d48d84247b6681a";

// 创建数据库的函数
async function createHerbsDatabase() {
  try {
    console.log('🔧 创建新的草药数据库...');
    
    const response = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: "2156f14b923c802c8d48d84247b6681a" // 使用您提供的页面ID
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
        "草药名称": {
          title: {}
        },
        "中文名": {
          rich_text: {}
        },
        "植物学名": {
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
              { name: "泌尿系统", color: "blue" },
              { name: "生殖健康", color: "green" },
              { name: "代谢调节", color: "yellow" },
              { name: "血糖管理", color: "orange" },
              { name: "神经系统", color: "red" },
              { name: "情绪管理", color: "purple" },
              { name: "认知功能", color: "pink" },
              { name: "脑部健康", color: "brown" },
              { name: "免疫调节", color: "gray" },
              { name: "体质增强", color: "default" }
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
        "参考链接": {
          url: {}
        },
        "创建时间": {
          created_time: {}
        },
        "更新时间": {
          last_edited_time: {}
        }
      }
    });
    
    console.log('✅ 数据库创建成功！');
    console.log(`📋 数据库ID: ${response.id}`);
    
    return response.id;
  } catch (error) {
    console.error('❌ 创建数据库失败:', error.message);
    return null;
  }
}

// 简化的草药数据（示例）
const sampleHerbs = [
  {
    herbName: 'Turmeric',
    chineseName: '姜黄',
    botanicalName: 'Curcuma longa L.',
    briefDescription: '抗炎、关节疼痛、肠胃调节',
    composition: '姜黄素、挥发油、多糖、蛋白质',
    recommendedDosage: '每日 300-500mg',
    efficacyCategory: ['抗炎', '疼痛管理'],
    usageRecommendations: '餐后服用，避免空腹',
    safetyLevel: 'high',
    precautions: '孕妇慎用，胆结石患者禁用',
    tcmConstitution: '湿热体质',
    referenceUrl: 'https://www.anna-europa.eu/en/medicines/herbal/curcumae-rhizoma'
  },
  {
    herbName: 'Ginseng',
    chineseName: '人参',
    botanicalName: 'Panax ginseng C.A.Mey.',
    briefDescription: '增强免疫、扶正固本',
    composition: '人参皂苷、多糖、氨基酸、维生素',
    recommendedDosage: '每日 200-600mg',
    efficacyCategory: ['免疫调节', '体质增强'],
    usageRecommendations: '空腹服用，早晨最佳',
    safetyLevel: 'medium',
    precautions: '高血压患者慎用，避免与咖啡因同服',
    tcmConstitution: '气虚体质',
    referenceUrl: 'https://www.anna-europa.eu/en/medicines/herbal/ginseng-radix'
  },
  {
    herbName: 'Green Tea',
    chineseName: '绿茶',
    botanicalName: 'Camellia sinensis (L.) Kuntze',
    briefDescription: '调节代谢、平衡内分泌',
    composition: '儿茶素、茶多酚、维生素C、咖啡因',
    recommendedDosage: '每日 300-400mg',
    efficacyCategory: ['代谢调节', '血糖管理'],
    usageRecommendations: '餐后服用，避免空腹',
    safetyLevel: 'high',
    precautions: '孕妇适量，失眠者晚上避免',
    tcmConstitution: '痰湿体质',
    referenceUrl: 'https://www.anna-europa.eu/en/medicines/herbal/theae-folium-viride'
  }
];

// 测试Notion连接
async function testNotionConnection() {
  try {
    console.log('🔍 测试Notion连接...');
    
    // 首先尝试访问现有数据库
    try {
      const response = await notion.databases.retrieve({ database_id: databaseId });
      console.log('✅ 找到现有数据库！');
      console.log(`📋 数据库名称: ${response.title[0]?.plain_text || '草药科学数据库'}`);
      return { success: true, databaseId: databaseId };
    } catch (dbError) {
      console.log('⚠️ 现有数据库不可访问，将创建新数据库...');
      
      // 尝试创建新数据库
      const newDatabaseId = await createHerbsDatabase();
      if (newDatabaseId) {
        databaseId = newDatabaseId;
        return { success: true, databaseId: newDatabaseId };
      } else {
        return { success: false, error: '无法创建数据库' };
      }
    }
  } catch (error) {
    console.error('❌ Notion连接失败:', error.message);
    return { success: false, error: error.message };
  }
}

// 创建草药页面
async function createHerbPage(herb, dbId) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        "草药名称": {
          title: [
            {
              text: {
                content: herb.herbName
              }
            }
          ]
        },
        "中文名": {
          rich_text: [
            {
              text: {
                content: herb.chineseName
              }
            }
          ]
        },
        "植物学名": {
          rich_text: [
            {
              text: {
                content: herb.botanicalName || '待补充'
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
        },
        "参考链接": {
          url: herb.referenceUrl || null
        }
      }
    });
    
    console.log(`✅ 成功创建: ${herb.herbName} (${herb.chineseName})`);
    return response;
    
  } catch (error) {
    console.error(`❌ 创建失败 ${herb.herbName}:`, error.message);
    return null;
  }
}

// 主同步函数
async function syncHerbsToNotion() {
  console.log('🌿 开始同步草药数据到Notion数据库...\n');
  
  try {
    // 测试连接
    const connectionResult = await testNotionConnection();
    if (!connectionResult.success) {
      console.log('❌ 无法建立Notion连接:', connectionResult.error);
      return;
    }
    
    const dbId = connectionResult.databaseId;
    console.log(`\n📊 将同步 ${sampleHerbs.length} 种草药数据到数据库: ${dbId}`);
    
    let createdCount = 0;
    let errorCount = 0;
    
    // 同步每种草药
    for (let i = 0; i < sampleHerbs.length; i++) {
      const herb = sampleHerbs[i];
      console.log(`\n🔄 处理 (${i + 1}/${sampleHerbs.length}): ${herb.herbName} (${herb.chineseName})`);
      
      const result = await createHerbPage(herb, dbId);
      if (result) {
        createdCount++;
      } else {
        errorCount++;
      }
      
      // 添加延时避免API限制
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 同步完成报告
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 同步完成报告:');
    console.log(`✅ 成功创建: ${createdCount} 种草药`);
    console.log(`❌ 创建失败: ${errorCount} 种草药`);
    console.log(`📋 总计处理: ${sampleHerbs.length} 种草药`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (errorCount === 0) {
      console.log('🎉 所有草药数据已成功同步到Notion数据库！');
      console.log(`🔗 查看数据库: https://www.notion.so/${dbId.replace(/-/g, '')}`);
    } else {
      console.log('⚠️ 部分草药同步过程中出现错误');
    }
    
  } catch (error) {
    console.error('❌ 同步过程失败:', error);
  }
}

// 主执行函数
async function main() {
  console.log('🚀 HerbScience.shop 草药数据Notion同步工具');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('📋 此脚本将：');
  console.log('1. 测试Notion连接');
  console.log('2. 如需要则创建新的草药数据库');
  console.log('3. 同步示例草药数据');
  console.log('4. 提供完整的数据库访问链接\n');
  
  await syncHerbsToNotion();
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { syncHerbsToNotion, testNotionConnection, createHerbsDatabase }; 