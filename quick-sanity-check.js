// 快速Sanity连接测试
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
});

async function quickTest() {
  try {
    console.log('连接Sanity...');

    // 简单查询
    const result = await client.fetch('*[_type == "blogPost"][0...3]{title, slug, status}');
    console.log('查询成功！');
    console.log('结果:', result);

    // 搜索特定文章
    const searchResult = await client.fetch(`
      *[_type == "blogPost" && title match "*Herbs*" && title match "*Work*"]
    `);
    console.log('搜索结果:', searchResult);

  } catch (error) {
    console.error('连接失败:', error.message);
  }
}

quickTest();