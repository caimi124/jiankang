const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

async function analyzeBlogPosts() {
  try {
    console.log('🔍 正在检查Sanity数据库中的博客文章...\n');
    
    const allPosts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        status,
        publishedAt,
        language,
        excerpt
      }
    `);
    
    console.log(`✅ 找到 ${allPosts.length} 篇文章\n`);
    
    // 分类文章
    const postsWithZhSuffix = allPosts.filter(post => 
      post.slug?.current?.endsWith('-zh')
    );
    
    const normalPosts = allPosts.filter(post => 
      !post.slug?.current?.endsWith('-zh')
    );
    
    console.log('📊 文章分类统计：');
    console.log(`   - 正常文章（无-zh后缀）: ${normalPosts.length}篇`);
    console.log(`   - 带-zh后缀的文章: ${postsWithZhSuffix.length}篇\n`);
    
    if (postsWithZhSuffix.length > 0) {
      console.log('🚨 发现带-zh后缀的文章：\n');
      postsWithZhSuffix.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   Slug: ${post.slug.current}`);
        console.log(`   ID: ${post._id}`);
        console.log(`   Published: ${post.publishedAt}`);
        console.log('');
      });
    }
    
    console.log('📝 正常文章列表：\n');
    normalPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Slug: ${post.slug.current}`);
      console.log(`   Language: ${post.language || '未设置'}`);
      console.log('');
    });
    
    return { postsWithZhSuffix, normalPosts };
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    throw error;
  }
}

async function deletePostsWithZhSuffix() {
  const { postsWithZhSuffix } = await analyzeBlogPosts();
  
  if (postsWithZhSuffix.length === 0) {
    console.log('✅ 没有发现需要删除的文章！');
    return;
  }
  
  console.log('\n⚠️  准备删除以下文章：');
  postsWithZhSuffix.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title} (${post.slug.current})`);
  });
  
  console.log('\n⏳ 开始删除...\n');
  
  for (const post of postsWithZhSuffix) {
    try {
      await client.delete(post._id);
      console.log(`✅ 已删除: ${post.title} (${post.slug.current})`);
    } catch (error) {
      console.error(`❌ 删除失败: ${post.title} - ${error.message}`);
    }
  }
  
  console.log('\n🎉 清理完成！\n');
  
  // 再次检查
  console.log('🔍 重新检查数据库...\n');
  await analyzeBlogPosts();
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--delete')) {
    console.log('🚀 执行模式：删除带-zh后缀的文章\n');
    await deletePostsWithZhSuffix();
  } else {
    console.log('🚀 执行模式：仅查看（使用 --delete 参数执行删除）\n');
    await analyzeBlogPosts();
    console.log('\n💡 提示：确认无误后，运行 node fix-sanity-blog-posts.js --delete 执行删除\n');
  }
}

main().catch(error => {
  console.error('程序执行失败:', error);
  process.exit(1);
});

