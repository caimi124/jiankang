/**
 * 验证博客多语言路由的脚本
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

async function verifyRoutes() {
  console.log('🔍 验证博客多语言路由...\n');
  
  try {
    // 1. 检查英文文章
    console.log('📖 检查英文文章：');
    const enPosts = await client.fetch(`
      *[_type == "blogPost" && status == "published" && (!defined(language) || language == "en")] | order(publishedAt desc) {
        _id,
        title,
        slug,
        language,
        status
      }
    `);
    
    console.log(`   找到 ${enPosts.length} 篇英文文章\n`);
    enPosts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
      console.log(`      Slug: ${post.slug.current}`);
      console.log(`      Language: ${post.language || '未设置（默认英文）'}`);
      console.log(`      URL: https://herbscience.shop/blog/${post.slug.current}`);
      console.log('');
    });
    
    // 2. 检查中文文章
    console.log('📖 检查中文文章：');
    const zhPosts = await client.fetch(`
      *[_type == "blogPost" && status == "published" && language == "zh"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        language,
        status
      }
    `);
    
    if (zhPosts.length === 0) {
      console.log(`   ⚠️  没有找到中文文章`);
      console.log(`   💡 提示：使用以下命令添加中文文章：`);
      console.log(`      node scripts/translate-article-to-zh.js\n`);
    } else {
      console.log(`   找到 ${zhPosts.length} 篇中文文章\n`);
      zhPosts.forEach((post, index) => {
        console.log(`   ${index + 1}. ${post.title}`);
        console.log(`      Slug: ${post.slug.current}`);
        console.log(`      Language: ${post.language}`);
        console.log(`      URL: https://herbscience.shop/zh/blog/${post.slug.current}`);
        console.log('');
      });
    }
    
    // 3. 检查是否有重复的slug
    console.log('🔍 检查slug冲突：');
    const allPosts = [...enPosts, ...zhPosts];
    const slugGroups = {};
    
    allPosts.forEach(post => {
      const slug = post.slug.current;
      if (!slugGroups[slug]) {
        slugGroups[slug] = [];
      }
      slugGroups[slug].push({ title: post.title, language: post.language || 'en' });
    });
    
    let hasConflict = false;
    Object.entries(slugGroups).forEach(([slug, posts]) => {
      const sameLanguage = posts.filter(p => p.language === posts[0].language).length;
      if (sameLanguage > 1) {
        hasConflict = true;
        console.log(`   ❌ 发现同语言重复slug: ${slug}`);
        posts.forEach(p => console.log(`      - ${p.title} (${p.language})`));
      }
    });
    
    if (!hasConflict) {
      console.log(`   ✅ 没有发现slug冲突\n`);
    } else {
      console.log('');
    }
    
    // 4. 检查是否有带-zh后缀的slug
    console.log('🚨 检查异常slug（带-zh后缀）：');
    const badSlugs = allPosts.filter(post => post.slug.current.endsWith('-zh'));
    
    if (badSlugs.length === 0) {
      console.log(`   ✅ 没有发现带-zh后缀的slug\n`);
    } else {
      console.log(`   ❌ 发现 ${badSlugs.length} 个带-zh后缀的slug：\n`);
      badSlugs.forEach(post => {
        console.log(`   - ${post.title}`);
        console.log(`     Slug: ${post.slug.current}`);
        console.log(`     建议修改为: ${post.slug.current.replace('-zh', '')}`);
        console.log('');
      });
    }
    
    // 5. 生成总结报告
    console.log('='.repeat(70));
    console.log('📊 路由验证总结：');
    console.log('='.repeat(70));
    console.log(`英文文章数量：${enPosts.length} 篇`);
    console.log(`中文文章数量：${zhPosts.length} 篇`);
    console.log(`总计：${allPosts.length} 篇`);
    console.log('');
    console.log(`✅ 英文博客首页：https://herbscience.shop/blog`);
    console.log(`✅ 中文博客首页：https://herbscience.shop/zh/blog`);
    console.log('');
    
    if (badSlugs.length > 0) {
      console.log(`⚠️  警告：发现 ${badSlugs.length} 个异常slug需要修复`);
    } else if (hasConflict) {
      console.log(`⚠️  警告：发现slug冲突需要解决`);
    } else {
      console.log(`✅ 所有路由配置正确！`);
    }
    console.log('='.repeat(70) + '\n');
    
    // 6. 提供下一步操作建议
    if (zhPosts.length === 0) {
      console.log('💡 下一步建议：');
      console.log('   1. 添加中文翻译文章：');
      console.log('      编辑 scripts/translate-article-to-zh.js');
      console.log('      然后运行：node scripts/translate-article-to-zh.js');
      console.log('');
      console.log('   2. 或者在Sanity Studio中手动创建：');
      console.log('      cd sanity && npm run dev');
      console.log('      访问 http://localhost:3333\n');
    }
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    throw error;
  }
}

verifyRoutes();

