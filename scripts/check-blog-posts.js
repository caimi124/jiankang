const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

async function checkBlogPosts() {
  try {
    console.log('🔍 检查Sanity数据库中的博客文章...\n');
    
    const posts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        language,
        status,
        publishedAt,
        featured,
        excerpt
      }
    `);
    
    console.log(`✅ 找到 ${posts.length} 篇文章\n`);
    
    // 分类文章
    const zhSuffixPosts = posts.filter(p => p.slug?.current?.endsWith('-zh'));
    const normalPosts = posts.filter(p => !p.slug?.current?.endsWith('-zh'));
    
    console.log('📊 文章分类统计：');
    console.log(`   - 带 -zh 后缀的文章: ${zhSuffixPosts.length} 篇`);
    console.log(`   - 正常的文章: ${normalPosts.length} 篇\n`);
    
    if (zhSuffixPosts.length > 0) {
      console.log('🚨 发现带 -zh 后缀的文章：\n');
      zhSuffixPosts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   ID: ${post._id}`);
        console.log(`   Slug: ${post.slug.current}`);
        console.log(`   Language: ${post.language || '未设置'}`);
        console.log(`   Status: ${post.status}`);
        console.log(`   Published: ${post.publishedAt}`);
        console.log('');
      });
    }
    
    console.log('\n✅ 正常的英文文章：\n');
    normalPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   ID: ${post._id}`);
      console.log(`   Slug: ${post.slug.current}`);
      console.log(`   Language: ${post.language || '未设置'}`);
      console.log(`   Status: ${post.status}`);
      console.log(`   Excerpt: ${post.excerpt?.substring(0, 80)}...`);
      console.log('');
    });
    
    return { zhSuffixPosts, normalPosts };
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    throw error;
  }
}

checkBlogPosts();

