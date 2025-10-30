const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

async function analyzeBlogPosts() {
  console.log('🔍 正在检查Sanity数据库中的博客文章...\n');
  
  try {
    // 获取所有博客文章
    const posts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        status,
        publishedAt,
        featured,
        language,
        _createdAt,
        _updatedAt
      }
    `);
    
    console.log(`✅ 找到 ${posts.length} 篇文章\n`);
    
    // 分类统计
    const withZhSuffix = posts.filter(p => p.slug?.current?.endsWith('-zh'));
    const englishPosts = posts.filter(p => !p.slug?.current?.endsWith('-zh') && (!p.language || p.language === 'en'));
    const chinesePosts = posts.filter(p => p.language === 'zh' && !p.slug?.current?.endsWith('-zh'));
    
    console.log('📊 统计信息:');
    console.log(`   - 带-zh后缀的文章: ${withZhSuffix.length}篇`);
    console.log(`   - 英文文章: ${englishPosts.length}篇`);
    console.log(`   - 中文文章（正确格式）: ${chinesePosts.length}篇\n`);
    
    if (withZhSuffix.length > 0) {
      console.log('⚠️  需要删除的文章（带-zh后缀）:\n');
      withZhSuffix.forEach((post, index) => {
        console.log(`${index + 1}. "${post.title}"`);
        console.log(`   ID: ${post._id}`);
        console.log(`   Slug: ${post.slug.current}`);
        console.log(`   创建时间: ${new Date(post._createdAt).toLocaleString('zh-CN')}`);
        console.log(`   更新时间: ${new Date(post._updatedAt).toLocaleString('zh-CN')}`);
        console.log('');
      });
    }
    
    console.log('\n✅ 英文文章列表:\n');
    englishPosts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}"`);
      console.log(`   Slug: ${post.slug.current}`);
      console.log(`   状态: ${post.status || 'unknown'}`);
      console.log('');
    });
    
    if (chinesePosts.length > 0) {
      console.log('\n✅ 中文文章列表:\n');
      chinesePosts.forEach((post, index) => {
        console.log(`${index + 1}. "${post.title}"`);
        console.log(`   Slug: ${post.slug.current}`);
        console.log(`   状态: ${post.status || 'unknown'}`);
        console.log('');
      });
    }
    
    return { posts, withZhSuffix, englishPosts, chinesePosts };
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    throw error;
  }
}

async function deleteZhSuffixPosts() {
  console.log('\n🗑️  开始删除带-zh后缀的文章...\n');
  
  try {
    const { withZhSuffix } = await analyzeBlogPosts();
    
    if (withZhSuffix.length === 0) {
      console.log('✅ 没有需要删除的文章');
      return;
    }
    
    console.log(`\n⚠️  准备删除 ${withZhSuffix.length} 篇文章\n`);
    
    for (const post of withZhSuffix) {
      try {
        await client.delete(post._id);
        console.log(`✅ 已删除: "${post.title}" (${post.slug.current})`);
      } catch (error) {
        console.error(`❌ 删除失败: "${post.title}" - ${error.message}`);
      }
    }
    
    console.log('\n✅ 删除操作完成！\n');
    
    // 重新检查
    console.log('🔍 重新检查数据库...\n');
    await analyzeBlogPosts();
    
  } catch (error) {
    console.error('❌ 删除操作失败:', error.message);
    throw error;
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--delete')) {
    await deleteZhSuffixPosts();
  } else {
    console.log('📋 运行分析模式（只查看，不删除）\n');
    console.log('💡 提示: 使用 --delete 参数执行删除操作\n');
    console.log('=' .repeat(60) + '\n');
    await analyzeBlogPosts();
    console.log('\n' + '='.repeat(60));
    console.log('\n💡 如果确认要删除带-zh后缀的文章，请运行:');
    console.log('   node scripts/fix-sanity-blog-posts.js --delete\n');
  }
}

main().catch(console.error);

