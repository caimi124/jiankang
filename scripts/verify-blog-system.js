const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

async function verifyBlogSystem() {
  console.log('🔍 验证博客系统配置...\n');
  console.log('='.repeat(70) + '\n');
  
  try {
    // 1. 检查所有文章
    const allPosts = await client.fetch(`
      *[_type == "blogPost"] {
        _id,
        title,
        slug,
        language,
        status,
        publishedAt
      } | order(publishedAt desc)
    `);
    
    console.log('📊 文章总览:\n');
    console.log(`   总文章数: ${allPosts.length}篇\n`);
    
    // 2. 按语言分类
    const englishPosts = allPosts.filter(p => !p.language || p.language === 'en');
    const chinesePosts = allPosts.filter(p => p.language === 'zh');
    const withoutLanguage = allPosts.filter(p => !p.language);
    const withZhSuffix = allPosts.filter(p => p.slug?.current?.endsWith('-zh'));
    
    console.log('📈 语言统计:\n');
    console.log(`   ✅ 英文文章: ${englishPosts.length}篇`);
    console.log(`   ✅ 中文文章: ${chinesePosts.length}篇`);
    console.log(`   ⚠️  未设置语言: ${withoutLanguage.length}篇`);
    console.log(`   ❌ 带-zh后缀: ${withZhSuffix.length}篇\n`);
    
    // 3. 检查问题
    let issues = [];
    
    if (withZhSuffix.length > 0) {
      issues.push({
        type: 'error',
        message: `发现${withZhSuffix.length}篇文章的slug包含-zh后缀`,
        articles: withZhSuffix.map(p => `"${p.title}" (${p.slug.current})`)
      });
    }
    
    if (withoutLanguage.length > 0) {
      issues.push({
        type: 'warning',
        message: `发现${withoutLanguage.length}篇文章未设置language字段`,
        articles: withoutLanguage.map(p => `"${p.title}" (${p.slug.current})`)
      });
    }
    
    // 4. 显示英文文章列表
    console.log('📝 英文文章列表:\n');
    if (englishPosts.length === 0) {
      console.log('   ⚠️  没有英文文章\n');
    } else {
      englishPosts.forEach((post, index) => {
        const langLabel = post.language ? `[${post.language}]` : '[默认]';
        console.log(`   ${index + 1}. ${langLabel} "${post.title}"`);
        console.log(`      Slug: ${post.slug.current}`);
        console.log(`      状态: ${post.status || 'unknown'}`);
        console.log(`      URL: https://herbscience.shop/blog/${post.slug.current}`);
        console.log('');
      });
    }
    
    // 5. 显示中文文章列表
    console.log('📝 中文文章列表:\n');
    if (chinesePosts.length === 0) {
      console.log('   ℹ️  还没有中文文章\n');
    } else {
      chinesePosts.forEach((post, index) => {
        console.log(`   ${index + 1}. [zh] "${post.title}"`);
        console.log(`      Slug: ${post.slug.current}`);
        console.log(`      状态: ${post.status || 'unknown'}`);
        console.log(`      URL: https://herbscience.shop/zh/blog/${post.slug.current}`);
        console.log('');
      });
    }
    
    // 6. 显示问题报告
    console.log('='.repeat(70) + '\n');
    console.log('🔍 问题检查结果:\n');
    
    if (issues.length === 0) {
      console.log('   ✅ 没有发现问题！系统配置正确。\n');
    } else {
      console.log(`   ⚠️  发现 ${issues.length} 个问题:\n`);
      issues.forEach((issue, index) => {
        const icon = issue.type === 'error' ? '❌' : '⚠️';
        console.log(`   ${index + 1}. ${icon} ${issue.message}`);
        if (issue.articles && issue.articles.length > 0) {
          issue.articles.forEach(article => {
            console.log(`      - ${article}`);
          });
        }
        console.log('');
      });
    }
    
    // 7. 显示建议
    console.log('='.repeat(70) + '\n');
    console.log('💡 建议:\n');
    
    if (withoutLanguage.length > 0) {
      console.log('   1. 为未设置language字段的文章添加 language: "en"');
    }
    
    if (withZhSuffix.length > 0) {
      console.log('   2. 移除slug中的-zh后缀，并设置 language: "zh"');
      console.log('      运行: node scripts/fix-sanity-blog-posts.js --delete');
    }
    
    if (englishPosts.length > 0) {
      console.log('   3. ✅ 英文博客系统正常运行');
    }
    
    if (chinesePosts.length === 0) {
      console.log('   4. 准备好创建中文文章时，记得设置 language: "zh"');
    }
    
    console.log('\n   详细管理指南: BLOG_MANAGEMENT_GUIDE_中英文博客管理指南.md\n');
    
    // 8. 系统状态总结
    console.log('='.repeat(70) + '\n');
    console.log('📊 系统状态:\n');
    
    const hasErrors = issues.some(i => i.type === 'error');
    const hasWarnings = issues.some(i => i.type === 'warning');
    
    if (!hasErrors && !hasWarnings) {
      console.log('   ✅ 状态: 健康');
      console.log('   ✅ 英文博客: 正常');
      console.log('   ✅ 中文博客: 正常');
      console.log('   ✅ 数据质量: 优秀\n');
    } else if (hasErrors) {
      console.log('   ❌ 状态: 需要修复');
      console.log('   ⚠️  请按照上述建议修复问题\n');
    } else {
      console.log('   ⚠️  状态: 正常但有警告');
      console.log('   💡 建议按照上述建议优化\n');
    }
    
    return { allPosts, englishPosts, chinesePosts, issues };
    
  } catch (error) {
    console.error('❌ 验证失败:', error.message);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    await verifyBlogSystem();
  } catch (error) {
    console.error('\n❌ 脚本执行失败:', error);
    process.exit(1);
  }
}

main();

