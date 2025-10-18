const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

const databaseId = process.env.NOTION_HERBS_DB_ID;

async function checkDuplicateTurmeric() {
  try {
    console.log('🔍 正在检查Turmeric重复记录...\n');
    
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: 'herbName',
            title: {
              contains: 'Turmeric'
            }
          },
          {
            property: 'chineseName',
            rich_text: {
              contains: '姜黄'
            }
          }
        ]
      }
    });

    console.log(`📊 找到 ${response.results.length} 条Turmeric记录：\n`);

    response.results.forEach((page, index) => {
      const herbName = page.properties.herbName?.title?.[0]?.plain_text || 'N/A';
      const chineseName = page.properties.chineseName?.rich_text?.[0]?.plain_text || 'N/A';
      const briefDescription = page.properties.briefDescription?.rich_text?.[0]?.plain_text || 'N/A';
      const efficacyCategory = page.properties.efficacyCategory?.multi_select?.map(s => s.name).join(', ') || 'N/A';
      const createdTime = new Date(page.created_time).toLocaleString('zh-CN');

      console.log(`--- 记录 ${index + 1} ---`);
      console.log(`ID: ${page.id}`);
      console.log(`英文名: ${herbName}`);
      console.log(`中文名: ${chineseName}`);
      console.log(`简介: ${briefDescription}`);
      console.log(`功效分类: ${efficacyCategory}`);
      console.log(`创建时间: ${createdTime}`);
      console.log('');
    });

    if (response.results.length > 1) {
      console.log('⚠️  发现重复记录！');
      console.log('\n请选择要保留的记录（推荐保留最新的或内容最完整的）');
      console.log('要删除某个记录，运行: node scripts/delete-notion-record.js <PAGE_ID>');
    } else {
      console.log('✅ 没有发现重复记录');
    }

  } catch (error) {
    console.error('❌ 查询失败:', error.message);
  }
}

checkDuplicateTurmeric();

