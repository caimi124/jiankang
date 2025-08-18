// 测试Notion连接的简单脚本
// 在配置好 .env.local 后运行：node test-notion-connection.js

require('dotenv').config({ path: '.env.local' });

async function testNotionConnection() {
  console.log('🔍 测试Notion连接配置...\n');

  // 检查环境变量
  console.log('📋 环境变量检查:');
  console.log(`NOTION_TOKEN: ${process.env.NOTION_TOKEN ? '✅ 已配置' : '❌ 未配置'}`);
  console.log(`NOTION_HERBS_DB_ID: ${process.env.NOTION_HERBS_DB_ID || '❌ 未配置'}`);
  console.log(`NOTION_FAQS_DB_ID: ${process.env.NOTION_FAQS_DB_ID || '❌ 未配置'}`);
  console.log(`NOTION_DOSAGES_DB_ID: ${process.env.NOTION_DOSAGES_DB_ID || '❌ 未配置'}`);
  console.log(`NOTION_STUDIES_DB_ID: ${process.env.NOTION_STUDIES_DB_ID || '❌ 未配置'}\n`);

  if (!process.env.NOTION_TOKEN) {
    console.log('⚠️  请先配置 NOTION_TOKEN');
    console.log('1. 访问 https://www.notion.so/my-integrations');
    console.log('2. 创建新的集成');
    console.log('3. 复制Token到 .env.local 文件');
    return;
  }

  try {
    const { Client } = require('@notionhq/client');
    const notion = new Client({ auth: process.env.NOTION_TOKEN });

    // 测试基本连接
    console.log('🔗 测试API连接...');
    await notion.users.me();
    console.log('✅ API连接成功\n');

    // 测试数据库访问
    if (process.env.NOTION_HERBS_DB_ID) {
      console.log('🌿 测试Herbs数据库访问...');
      try {
        const response = await notion.databases.query({
          database_id: process.env.NOTION_HERBS_DB_ID,
          page_size: 3
        });
        console.log(`✅ 找到 ${response.results.length} 个草药条目`);
        
        // 显示找到的草药
        response.results.forEach((page, index) => {
          const name = page.properties?.['Herb Name']?.title?.[0]?.plain_text || 'Unknown';
          console.log(`  ${index + 1}. ${name}`);
        });
        console.log('');
      } catch (error) {
        console.log('❌ 无法访问Herbs数据库');
        console.log('   请确保集成有数据库访问权限');
        console.log('   在数据库页面右上角点击 "..." → "Connections" → 添加集成\n');
      }
    }

    // 测试特定草药查询
    console.log('🔍 测试特定草药查询 (Clove)...');
    try {
      const cloveQuery = await notion.databases.query({
        database_id: process.env.NOTION_HERBS_DB_ID,
        filter: {
          or: [
            { property: 'Herb Name', title: { contains: 'Clove' } },
            { property: 'Herb Name', title: { contains: 'clove' } },
          ]
        }
      });

      if (cloveQuery.results.length > 0) {
        console.log('✅ 找到Clove数据！');
        const clove = cloveQuery.results[0];
        const name = clove.properties?.['Herb Name']?.title?.[0]?.plain_text;
        const slug = clove.properties?.['Slug']?.rich_text?.[0]?.plain_text;
        console.log(`   名称: ${name}`);
        console.log(`   Slug: ${slug || '未设置'}`);
      } else {
        console.log('❌ 未找到Clove数据');
        console.log('   请检查Notion数据库中是否有Clove条目');
      }
    } catch (error) {
      console.log('❌ Clove查询失败:', error.message);
    }

  } catch (error) {
    console.log('❌ 连接失败:', error.message);
    console.log('\n可能的解决方案:');
    console.log('1. 检查NOTION_TOKEN是否正确');
    console.log('2. 确保集成有相应权限');
    console.log('3. 检查数据库ID是否正确');
  }
}

testNotionConnection().catch(console.error);
