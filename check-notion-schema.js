const { Client } = require('@notionhq/client');

// 初始化Notion客户端
const notion = new Client({
  auth: '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'
});

// 数据库ID
const databaseId = '2156f14b923c802c8d48d84247b6681a';

async function checkDatabaseSchema() {
  try {
    console.log('正在检查Notion数据库结构...');
    
    // 获取数据库信息
    const database = await notion.databases.retrieve({ database_id: databaseId });
    
    console.log('\n=== 数据库基本信息 ===');
    console.log('数据库标题:', database.title[0]?.plain_text || '未命名');
    console.log('数据库ID:', database.id);
    
    console.log('\n=== 字段结构 ===');
    const properties = database.properties;
    
    Object.entries(properties).forEach(([name, prop]) => {
      console.log(`字段名: "${name}"`);
      console.log(`  类型: ${prop.type}`);
      if (prop.type === 'select' && prop.select?.options) {
        console.log(`  选项: ${prop.select.options.map(opt => opt.name).join(', ')}`);
      }
      if (prop.type === 'multi_select' && prop.multi_select?.options) {
        console.log(`  选项: ${prop.multi_select.options.map(opt => opt.name).join(', ')}`);
      }
      console.log('');
    });
    
    // 获取一些示例数据
    console.log('\n=== 示例数据（前3条记录）===');
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 3
    });
    
    response.results.forEach((page, index) => {
      console.log(`\n--- 记录 ${index + 1} ---`);
      Object.entries(page.properties).forEach(([name, prop]) => {
        let value = '未设置';
        
        switch (prop.type) {
          case 'title':
            if (prop.title && prop.title.length > 0) {
              value = prop.title[0].plain_text;
            }
            break;
          case 'rich_text':
            if (prop.rich_text && prop.rich_text.length > 0) {
              value = prop.rich_text[0].plain_text;
            }
            break;
          case 'select':
            if (prop.select && prop.select.name) {
              value = prop.select.name;
            }
            break;
          case 'multi_select':
            if (prop.multi_select && prop.multi_select.length > 0) {
              value = prop.multi_select.map(item => item.name).join(', ');
            }
            break;
          case 'number':
            if (prop.number !== null && prop.number !== undefined) {
              value = prop.number.toString();
            }
            break;
        }
        
        console.log(`  ${name}: ${value}`);
      });
    });
    
  } catch (error) {
    console.error('检查数据库结构时出错:', error);
    throw error;
  }
}

// 运行检查
if (require.main === module) {
  checkDatabaseSchema()
    .then(() => {
      console.log('\n✅ 数据库结构检查完成！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 数据库结构检查失败:', error);
      process.exit(1);
    });
}

module.exports = { checkDatabaseSchema }; 