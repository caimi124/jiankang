// 快速测试迁移连接和数据
// 验证Notion和Sanity配置是否正确

require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');
const { createClient } = require('@sanity/client');

async function testMigrationSetup() {
  console.log('🧪 Testing HerbScience Migration Setup\n');

  // 配置信息
  const config = {
    notion: {
      token: process.env.NOTION_TOKEN || 'YOUR_NOTION_TOKEN_HERE',
      herbsDb: process.env.NOTION_HERBS_DB_ID || 'YOUR_HERBS_DB_ID_HERE'
    },
    sanity: {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '13rzzwgz',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
    }
  };

  // 1. 测试Notion连接
  console.log('🔍 Testing Notion connection...');
  try {
    const notion = new Client({ auth: config.notion.token });
    
    // 测试基本连接
    const user = await notion.users.me();
    console.log(`✅ Notion user: ${user.name || user.id}`);
    
    // 测试数据库访问
    const herbsQuery = await notion.databases.query({
      database_id: config.notion.herbsDb,
      page_size: 3
    });
    
    console.log(`✅ Found ${herbsQuery.results.length} herbs in database`);
    
    // 显示找到的草药
    herbsQuery.results.forEach((page, index) => {
      const name = page.properties?.['Herb Name']?.title?.[0]?.plain_text || 'Unknown';
      console.log(`   ${index + 1}. ${name}`);
    });
    
  } catch (error) {
    console.log('❌ Notion connection failed:');
    console.log(`   Error: ${error.message}`);
    return false;
  }

  console.log('');

  // 2. 测试Sanity连接
  console.log('🔍 Testing Sanity connection...');
  try {
    const sanity = createClient({
      projectId: config.sanity.projectId,
      dataset: config.sanity.dataset,
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false
    });

    // 测试基本查询
    const result = await sanity.fetch('*[_type == "herb"][0..2]');
    console.log(`✅ Sanity connection successful`);
    console.log(`✅ Found ${result.length} existing herbs in Sanity`);
    
    if (result.length > 0) {
      result.forEach((herb, index) => {
        console.log(`   ${index + 1}. ${herb.title || herb._id}`);
      });
    }

  } catch (error) {
    console.log('❌ Sanity connection failed:');
    console.log(`   Error: ${error.message}`);
    
    if (error.message.includes('Unauthorized')) {
      console.log('   💡 Please check SANITY_API_TOKEN in .env.local');
      console.log('   💡 Create token at: https://www.sanity.io/manage/project/13rzzwgz');
    }
    return false;
  }

  console.log('');

  // 3. 生成示例SEO内容
  console.log('🎯 Generating sample SEO content...');
  
  const sampleHerb = {
    name: 'Clove',
    latinName: 'Syzygium aromaticum',
    benefits: ['oral health', 'digestive support', 'pain relief']
  };

  const seoTitle = `${sampleHerb.name} (${sampleHerb.latinName}): Benefits, Dosage, Safety & Uses | HerbScience`;
  const metaDescription = `Discover ${sampleHerb.name} benefits for ${sampleHerb.benefits[0]}. Evidence-based dosage, safety information, and expert guidance. Learn how to use ${sampleHerb.name} safely.`;
  const keywords = [
    `${sampleHerb.name.toLowerCase()} benefits`,
    `${sampleHerb.name.toLowerCase()} dosage`,
    `${sampleHerb.name.toLowerCase()} uses`,
    `${sampleHerb.name.toLowerCase()} side effects`
  ];

  console.log(`✅ SEO Title: ${seoTitle}`);
  console.log(`✅ Meta Description: ${metaDescription}`);
  console.log(`✅ Keywords: ${keywords.join(', ')}`);

  console.log('');

  // 4. 检查环境变量
  console.log('⚙️  Environment Variables Check:');
  const envVars = {
    'NOTION_TOKEN': config.notion.token ? '✅ Set' : '❌ Missing',
    'NOTION_HERBS_DB_ID': config.notion.herbsDb ? '✅ Set' : '❌ Missing',
    'NEXT_PUBLIC_SANITY_PROJECT_ID': config.sanity.projectId ? '✅ Set' : '❌ Missing',
    'SANITY_API_TOKEN': process.env.SANITY_API_TOKEN ? '✅ Set' : '❌ Missing'
  };

  Object.entries(envVars).forEach(([key, status]) => {
    console.log(`   ${key}: ${status}`);
  });

  console.log('');

  // 5. 生成迁移建议
  console.log('📋 Migration Recommendations:');
  
  if (!process.env.SANITY_API_TOKEN) {
    console.log('1. ⚠️  Create Sanity API token:');
    console.log('   - Visit: https://www.sanity.io/manage/project/13rzzwgz');
    console.log('   - Go to Settings → API → Tokens');
    console.log('   - Create new token with Editor permissions');
    console.log('   - Add to .env.local as SANITY_API_TOKEN');
    console.log('');
  }

  console.log('2. 🚀 Ready to migrate? Run:');
  console.log('   node scripts/complete-migration.js');
  console.log('');

  console.log('3. 📈 Expected results:');
  console.log('   - All published herbs migrated to Sanity');
  console.log('   - SEO-optimized titles and descriptions');
  console.log('   - 4-20 target keywords per herb');
  console.log('   - 8 blog article outlines per herb');
  console.log('   - Complete FAQs, dosages, and studies data');

  return true;
}

// 运行测试
testMigrationSetup().then(success => {
  if (success) {
    console.log('\n🎉 Migration setup test completed successfully!');
    console.log('Ready to proceed with full migration.');
  } else {
    console.log('\n❌ Please fix the connection issues before proceeding.');
  }
}).catch(error => {
  console.error('\n💥 Test failed:', error.message);
});
