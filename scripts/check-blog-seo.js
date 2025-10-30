const sanityClient = require('@sanity/client');

const client = sanityClient.default({
  projectId: '13rzzwgz',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN
});

async function checkBlogSEO() {
  try {
    // 获取所有博客文章
    const posts = await client.fetch(
      `*[_type == 'post']{
        title,
        'slug': slug.current,
        'seoTitle': seoTitle,
        'seoDescription': seoDescription,
        excerpt
      }`
    );
    
    console.log(`\n📊 检查 ${posts.length} 篇博客文章的 SEO...\n`);
    
    const issues = [];
    
    posts.forEach(post => {
      const titleForSEO = post.seoTitle || `${post.title} | HerbScience Blog`;
      const descForSEO = post.seoDescription || post.excerpt || '';
      
      const titleLength = titleForSEO.length;
      const descLength = descForSEO.length;
      
      let hasIssue = false;
      const postIssues = [];
      
      // 检查标题长度（建议 50-60 字符）
      if (titleLength > 60) {
        postIssues.push(`❌ Title 太长: ${titleLength} 字符 (建议 <60)`);
        hasIssue = true;
      } else if (titleLength > 70) {
        postIssues.push(`🔴 Title 严重超长: ${titleLength} 字符`);
        hasIssue = true;
      }
      
      // 检查描述长度（建议 120-160 字符）
      if (descLength < 120) {
        postIssues.push(`⚠️ Description 太短: ${descLength} 字符 (建议 120-160)`);
        hasIssue = true;
      } else if (descLength > 160) {
        postIssues.push(`❌ Description 太长: ${descLength} 字符 (建议 <160)`);
        hasIssue = true;
      }
      
      if (hasIssue) {
        issues.push({
          slug: post.slug,
          title: post.title,
          titleLength,
          descLength,
          issues: postIssues
        });
        
        console.log(`\n📄 ${post.slug}`);
        console.log(`   Title: ${titleForSEO}`);
        console.log(`   Title Length: ${titleLength}`);
        console.log(`   Desc Length: ${descLength}`);
        postIssues.forEach(issue => console.log(`   ${issue}`));
      }
    });
    
    console.log(`\n\n📊 总结:`);
    console.log(`✅ 无问题: ${posts.length - issues.length} 篇`);
    console.log(`⚠️ 有问题: ${issues.length} 篇`);
    
    if (issues.length > 0) {
      console.log(`\n需要修复的文章:`);
      issues.forEach(issue => {
        console.log(`  - ${issue.slug}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkBlogSEO();

