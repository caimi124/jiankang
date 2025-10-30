const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

async function checkCategories() {
  try {
    console.log('🔍 检查所有分类...\n');
    
    const categories = await client.fetch(`
      *[_type == "category"] {
        _id,
        title,
        slug,
        description,
        language,
        "postCount": count(*[_type == "blogPost" && status == "published" && references(^._id)])
      } | order(title asc)
    `);
    
    console.log(`📊 找到 ${categories.length} 个分类\n`);
    
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.title}`);
      console.log(`   ID: ${cat._id}`);
      console.log(`   Slug: ${cat.slug?.current || '未设置'}`);
      console.log(`   Language: ${cat.language || '未设置'}`);
      console.log(`   Post Count: ${cat.postCount}`);
      console.log(`   Description: ${cat.description || '无'}`);
      console.log('');
    });
    
    // 检查哪些是中文分类
    const chineseCategories = categories.filter(cat => 
      /[\u4e00-\u9fa5]/.test(cat.title)
    );
    
    if (chineseCategories.length > 0) {
      console.log(`\n⚠️  发现 ${chineseCategories.length} 个中文分类：`);
      chineseCategories.forEach(cat => {
        console.log(`   - ${cat.title} (${cat._id})`);
      });
      console.log('\n建议：为这些分类添加 language: "zh" 字段');
    }
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
  }
}

checkCategories();

