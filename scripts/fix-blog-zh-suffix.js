const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

async function fixBlogSuffixIssue() {
  try {
    console.log('🔍 步骤1：查找所有博客文章...\n');
    
    // 查找所有博客文章
    const allPosts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        language,
        status,
        publishedAt
      }
    `);
    
    console.log(`📊 找到 ${allPosts.length} 篇文章\n`);
    
    // 分类文章
    const zhSuffixPosts = allPosts.filter(post => post.slug?.current?.endsWith('-zh'));
    const normalPosts = allPosts.filter(post => !post.slug?.current?.endsWith('-zh'));
    
    console.log('📋 文章分类：');
    console.log(`   - 带-zh后缀的文章: ${zhSuffixPosts.length} 篇`);
    console.log(`   - 正常文章: ${normalPosts.length} 篇\n`);
    
    if (zhSuffixPosts.length > 0) {
      console.log('🗑️  步骤2：准备删除带-zh后缀的文章...\n');
      console.log('以下文章将被删除：');
      zhSuffixPosts.forEach((post, index) => {
        console.log(`   ${index + 1}. ${post.title}`);
        console.log(`      - ID: ${post._id}`);
        console.log(`      - Slug: ${post.slug.current}`);
        console.log(`      - Language: ${post.language || '未设置'}`);
        console.log('');
      });
      
      console.log('⚠️  请确认是否删除这些文章？');
      console.log('   执行删除请运行: node scripts/fix-blog-zh-suffix.js --delete\n');
    }
    
    console.log('✅ 步骤3：检查正常文章...\n');
    console.log('以下是保留的正常文章：');
    normalPosts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
      console.log(`      - Slug: ${post.slug.current}`);
      console.log(`      - Language: ${post.language || '未设置'}`);
      console.log(`      - Status: ${post.status || '未设置'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    if (error.response) {
      console.error('详细错误:', error.response);
    }
  }
}

async function deleteSuffixPosts() {
  try {
    console.log('🗑️  开始删除带-zh后缀的文章...\n');
    
    const zhSuffixPosts = await client.fetch(`
      *[_type == "blogPost" && slug.current match "*-zh"] {
        _id,
        title,
        slug
      }
    `);
    
    if (zhSuffixPosts.length === 0) {
      console.log('✅ 没有找到需要删除的文章');
      return;
    }
    
    console.log(`找到 ${zhSuffixPosts.length} 篇需要删除的文章\n`);
    
    for (const post of zhSuffixPosts) {
      console.log(`正在删除: ${post.title} (${post.slug.current})`);
      await client.delete(post._id);
      console.log(`✅ 已删除: ${post._id}\n`);
    }
    
    console.log('🎉 所有带-zh后缀的文章已删除！');
    
  } catch (error) {
    console.error('❌ 删除失败:', error.message);
  }
}

// 检查命令行参数
const args = process.argv.slice(2);
if (args.includes('--delete')) {
  deleteSuffixPosts();
} else {
  fixBlogSuffixIssue();
}

