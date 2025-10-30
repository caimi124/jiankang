const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

async function addLanguageField() {
  try {
    console.log('🔄 为所有现有博客文章添加 language="en" 字段...\n');
    
    // 获取所有没有language字段的文章
    const posts = await client.fetch(`
      *[_type == "blogPost" && !defined(language)] {
        _id,
        title,
        slug
      }
    `);
    
    console.log(`📝 找到 ${posts.length} 篇需要更新的文章\n`);
    
    if (posts.length === 0) {
      console.log('✅ 所有文章都已经有language字段！');
      return;
    }
    
    // 批量更新
    const transaction = client.transaction();
    
    posts.forEach(post => {
      console.log(`  - 更新: ${post.title}`);
      transaction.patch(post._id, {
        set: { language: 'en' }
      });
    });
    
    await transaction.commit();
    
    console.log('\n✅ 成功更新所有文章！');
    console.log('   所有英文文章现在都有 language="en" 字段\n');
    
    // 验证更新
    const updatedPosts = await client.fetch(`
      *[_type == "blogPost"] {
        _id,
        title,
        slug,
        language
      }
    `);
    
    console.log('📊 更新后的文章列表：\n');
    updatedPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Slug: ${post.slug.current}`);
      console.log(`   Language: ${post.language}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    throw error;
  }
}

addLanguageField();

