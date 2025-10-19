const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});

async function checkPosts() {
  try {
    console.log('🔍 检查Sanity数据库中的博客文章...\n');
    
    const posts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        status,
        publishedAt,
        featured
      }
    `);
    
    console.log(`✅ 找到 ${posts.length} 篇文章:\n`);
    
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   ID: ${post._id}`);
      console.log(`   Slug: ${post.slug.current}`);
      console.log(`   Status: ${post.status}`);
      console.log(`   Published: ${post.publishedAt}`);
      console.log(`   Featured: ${post.featured || false}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
  }
}

checkPosts();

