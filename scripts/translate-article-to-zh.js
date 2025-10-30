/**
 * 翻译英文博客文章到中文的脚本
 * 使用方法：node scripts/translate-article-to-zh.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

// ===== 翻译模板 =====
// 在这里添加您要翻译的文章
const translations = {
  // 示例：红洋葱vs白洋葱
  'red-onion-vs-white-onion-health-benefits': {
    title: '红洋葱 vs 白洋葱：哪个更健康？（科学对比）',
    excerpt: '红洋葱和白洋葱，哪个更健康？发现抗氧化剂、槲皮素、花青素、消化益处的关键差异，以及如何使用它们以获得最大健康效益。基于证据的中文指南。',
    readTime: 8,
    featured: true,
    category: '科学研究',  // 需要在Sanity中创建对应的中文分类
    tags: ['红洋葱vs白洋葱', '洋葱健康益处', '腌洋葱益处', '谁不应该吃洋葱', '洋葱降胆固醇', '洋葱抗氧化剂', '槲皮素', '花青素', '洋葱助消化', '自然疗法'],
    // 内容块（简化示例）
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{_type: 'span', text: '快速答案：红洋葱在抗氧化剂方面胜出，白洋葱在消化性方面胜出'}]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{_type: 'span', text: '两者都很健康——只是在不同方面表现出色。如果您曾经站在杂货店的洋葱货架前，想知道哪个实际上对您更好，本指南将为您提供答案。'}]
      },
      // 添加更多内容块...
    ]
  }
  
  // 您可以在这里添加更多翻译...
};

async function findCategory(title) {
  try {
    const category = await client.fetch(`*[_type == "category" && title == $title][0]`, { title });
    if (category) {
      return { _ref: category._id, _type: 'reference' };
    }
    // 如果分类不存在，创建一个新的
    const newCategory = await client.create({
      _type: 'category',
      title: title,
      slug: { _type: 'slug', current: title.toLowerCase().replace(/\s+/g, '-') },
      language: 'zh'
    });
    console.log(`  ✅ 创建了新分类: ${title}`);
    return { _ref: newCategory._id, _type: 'reference' };
  } catch (error) {
    console.error(`  ❌ 分类错误: ${error.message}`);
    return null;
  }
}

async function findOrCreateTags(tagTitles) {
  const tagRefs = [];
  
  for (const tagTitle of tagTitles) {
    try {
      let tag = await client.fetch(`*[_type == "tag" && title == $title][0]`, { title: tagTitle });
      
      if (!tag) {
        // 创建新标签
        tag = await client.create({
          _type: 'tag',
          title: tagTitle,
          slug: { _type: 'slug', current: tagTitle.toLowerCase().replace(/\s+/g, '-') }
        });
        console.log(`    ✅ 创建了新标签: ${tagTitle}`);
      }
      
      tagRefs.push({ _ref: tag._id, _type: 'reference' });
    } catch (error) {
      console.error(`    ❌ 标签错误 (${tagTitle}): ${error.message}`);
    }
  }
  
  return tagRefs;
}

async function translateArticle(slug, translation) {
  try {
    console.log(`\n📝 翻译文章: ${slug}`);
    
    // 1. 检查英文原文是否存在
    const enPost = await client.fetch(`*[_type == "blogPost" && slug.current == $slug && language == "en"][0]`, { slug });
    
    if (!enPost) {
      console.log(`  ⚠️ 未找到英文原文，将创建独立的中文文章`);
    } else {
      console.log(`  ✅ 找到英文原文: ${enPost.title}`);
    }
    
    // 2. 检查中文版本是否已存在
    const zhPost = await client.fetch(`*[_type == "blogPost" && slug.current == $slug && language == "zh"][0]`, { slug });
    
    if (zhPost) {
      console.log(`  ⚠️ 中文版本已存在，将跳过`);
      return;
    }
    
    // 3. 处理分类和标签
    console.log(`  🏷️ 处理分类和标签...`);
    const categoryRef = await findCategory(translation.category);
    const tagRefs = await findOrCreateTags(translation.tags);
    
    // 4. 创建中文文章
    console.log(`  🔨 创建中文文章...`);
    const newPost = await client.create({
      _type: 'blogPost',
      title: translation.title,
      slug: {
        _type: 'slug',
        current: slug  // 使用与英文相同的slug
      },
      language: 'zh',
      excerpt: translation.excerpt,
      content: translation.content || [],
      publishedAt: new Date().toISOString(),
      readTime: translation.readTime,
      featured: translation.featured || false,
      status: 'published',
      author: enPost?.author || null,
      category: categoryRef,
      tags: tagRefs
    });
    
    console.log(`  ✅ 成功创建中文文章!`);
    console.log(`     ID: ${newPost._id}`);
    console.log(`     英文URL: https://herbscience.shop/blog/${slug}`);
    console.log(`     中文URL: https://herbscience.shop/zh/blog/${slug}`);
    
  } catch (error) {
    console.error(`  ❌ 错误: ${error.message}`);
    throw error;
  }
}

async function translateAll() {
  console.log('🌍 开始翻译文章到中文...\n');
  console.log(`📊 共有 ${Object.keys(translations).length} 篇文章需要翻译\n`);
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  for (const [slug, translation] of Object.entries(translations)) {
    try {
      await translateArticle(slug, translation);
      successCount++;
    } catch (error) {
      if (error.message.includes('已存在')) {
        skipCount++;
      } else {
        errorCount++;
      }
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 翻译完成统计：');
  console.log(`   ✅ 成功: ${successCount} 篇`);
  console.log(`   ⏭️  跳过: ${skipCount} 篇（已存在）`);
  console.log(`   ❌ 失败: ${errorCount} 篇`);
  console.log('='.repeat(60) + '\n');
  
  if (successCount > 0) {
    console.log('🎉 请访问以下链接验证：');
    console.log('   英文博客: https://herbscience.shop/blog');
    console.log('   中文博客: https://herbscience.shop/zh/blog\n');
  }
}

// 执行翻译
translateAll().catch(error => {
  console.error('❌ 致命错误:', error);
  process.exit(1);
});

