const { Client } = require("@notionhq/client");

// Notion集成配置
const notion = new Client({ 
  auth: "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" 
});

const databaseId = "2156f14b923c802c8d48d84247b6681a";

async function getNotionDatabaseSchema() {
  try {
    console.log('🔍 获取Notion数据库结构...');
    const response = await notion.databases.retrieve({ database_id: databaseId });
    
    console.log('✅ 数据库信息获取成功！');
    console.log(`📋 数据库名称: ${response.title[0]?.plain_text || '草药科学数据库'}`);
    console.log('\n📊 数据库字段结构:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    Object.entries(response.properties).forEach(([key, prop]) => {
      console.log(`🔸 字段名: "${key}"`);
      console.log(`   类型: ${prop.type}`);
      if (prop.type === 'select' && prop.select?.options) {
        console.log(`   选项: ${prop.select.options.map(opt => opt.name).join(', ')}`);
      }
      if (prop.type === 'multi_select' && prop.multi_select?.options) {
        console.log(`   多选项: ${prop.multi_select.options.map(opt => opt.name).join(', ')}`);
      }
      console.log('');
    });
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // 生成建议的字段映射
    console.log('\n💡 建议的字段映射:');
    const fieldMapping = {};
    Object.keys(response.properties).forEach(key => {
      fieldMapping[key] = response.properties[key].type;
    });
    console.log(JSON.stringify(fieldMapping, null, 2));
    
  } catch (error) {
    console.error('❌ 获取数据库结构失败:', error);
  }
}

// 运行脚本
getNotionDatabaseSchema().catch(console.error); 