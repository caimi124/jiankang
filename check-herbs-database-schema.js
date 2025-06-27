// Check Herbs Database Schema
const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: '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',
});

// Database ID for herbs
const DATABASE_ID = '2156f14b923c802c8d48d84247b6681a';

async function checkDatabaseSchema() {
  try {
    console.log('🔍 正在检查草药数据库结构...');
    
    const database = await notion.databases.retrieve({ 
      database_id: DATABASE_ID 
    });

    console.log('📊 数据库信息:');
    console.log('名称:', database.title[0]?.plain_text || 'Unknown');
    console.log('ID:', database.id);
    console.log('创建时间:', database.created_time);
    console.log('');

    console.log('📝 数据库字段:');
    const properties = database.properties;
    
    Object.keys(properties).forEach(propertyName => {
      const property = properties[propertyName];
      console.log(`- ${propertyName}: ${property.type}`);
      
      // 如果是 select 或 multi_select，显示选项
      if (property.type === 'select' && property.select?.options) {
        console.log(`  选项: ${property.select.options.map(opt => opt.name).join(', ')}`);
      }
      if (property.type === 'multi_select' && property.multi_select?.options) {
        console.log(`  选项: ${property.multi_select.options.map(opt => opt.name).join(', ')}`);
      }
    });

    console.log('');
    console.log('📖 正在获取第一个条目作为示例...');
    
    const pages = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: 1
    });

    if (pages.results.length > 0) {
      const firstPage = pages.results[0];
      console.log('示例条目属性:');
      Object.keys(firstPage.properties).forEach(propName => {
        console.log(`- ${propName}`);
      });
    } else {
      console.log('数据库中没有条目');
    }

    return database;
  } catch (error) {
    console.error('❌ 检查数据库结构失败:', error);
    throw error;
  }
}

// Run the function
checkDatabaseSchema()
  .then(() => {
    console.log('🎉 数据库结构检查完成!');
  })
  .catch((error) => {
    console.error('💥 检查失败:', error);
  }); 