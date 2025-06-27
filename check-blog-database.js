const { Client } = require('@notionhq/client');

// 使用提供的博客数据库API密钥
const notion = new Client({
  auth: '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'
});

// 博客数据库ID
const BLOG_DATABASE_ID = '21b6f14b-923c-80e5-a851-dc0e82f8f349';

async function getBlogDatabaseSchema() {
  try {
    console.log('🔍 正在获取博客数据库结构...');
    
    const response = await notion.databases.retrieve({
      database_id: BLOG_DATABASE_ID
    });
    
    console.log('📊 数据库信息:');
    console.log('名称:', response.title?.[0]?.text?.content || '未命名');
    console.log('ID:', response.id);
    console.log('创建时间:', response.created_time);
    
    console.log('\n📝 数据库字段:');
    const properties = response.properties;
    Object.keys(properties).forEach(key => {
      const prop = properties[key];
      console.log(`- ${key}: ${prop.type}`);
      if (prop.type === 'select' && prop.select?.options) {
        console.log(`  选项: ${prop.select.options.map(opt => opt.name).join(', ')}`);
      }
      if (prop.type === 'multi_select' && prop.multi_select?.options) {
        console.log(`  多选项: ${prop.multi_select.options.map(opt => opt.name).join(', ')}`);
      }
    });
    
    return properties;
  } catch (error) {
    console.error('❌ 获取数据库结构失败:', error.message);
    return null;
  }
}

async function getBlogPosts() {
  try {
    console.log('\n📖 正在获取博客文章...');
    
    const response = await notion.databases.query({
      database_id: BLOG_DATABASE_ID
    });
    
    console.log(`找到 ${response.results.length} 篇文章`);
    
    response.results.forEach((page, index) => {
      console.log(`\n${index + 1}. 页面ID: ${page.id}`);
      console.log('   属性:');
      Object.keys(page.properties).forEach(key => {
        const prop = page.properties[key];
        let value = '';
        
        switch (prop.type) {
          case 'title':
            value = prop.title?.[0]?.text?.content || '';
            break;
          case 'rich_text':
            value = prop.rich_text?.[0]?.text?.content || '';
            break;
          case 'select':
            value = prop.select?.name || '';
            break;
          case 'multi_select':
            value = prop.multi_select?.map(item => item.name).join(', ') || '';
            break;
          case 'date':
            value = prop.date?.start || '';
            break;
          case 'number':
            value = prop.number || '';
            break;
          default:
            value = JSON.stringify(prop);
        }
        
        if (value) {
          console.log(`   ${key}: ${value}`);
        }
      });
    });
    
    return response.results;
  } catch (error) {
    console.error('❌ 获取博客文章失败:', error.message);
    return [];
  }
}

async function main() {
  console.log('🚀 开始检查博客数据库...');
  
  const schema = await getBlogDatabaseSchema();
  if (schema) {
    const posts = await getBlogPosts();
    
    // 保存结果
    const fs = require('fs');
    const output = {
      databaseId: BLOG_DATABASE_ID,
      schema,
      posts: posts.map(page => ({
        id: page.id,
        properties: page.properties
      })),
      checkTime: new Date().toISOString()
    };
    
    fs.writeFileSync('blog-database-check.json', JSON.stringify(output, null, 2));
    console.log('\n💾 检查结果已保存到 blog-database-check.json');
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  getBlogDatabaseSchema,
  getBlogPosts,
  BLOG_DATABASE_ID
}; 