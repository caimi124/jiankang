const { Client } = require('@notionhq/client');

// 使用提供的博客数据库API密钥
const notion = new Client({
  auth: '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'
});

// 博客数据库ID
const BLOG_DATABASE_ID = '21b6f14b-923c-80e5-a851-dc0e82f8f349';

async function updateDatabaseSchema() {
  try {
    console.log('🔧 正在更新博客数据库字段...');
    
    const response = await notion.databases.update({
      database_id: BLOG_DATABASE_ID,
      properties: {
        'content': {
          rich_text: {}
        },
        'excerpt': {
          rich_text: {}
        },
        'author': {
          rich_text: {}
        },
        'category': {
          select: {
            options: [
              { name: '科学研究', color: 'blue' },
              { name: '季节养生', color: 'green' },
              { name: '草药科普', color: 'purple' },
              { name: '购买指南', color: 'orange' },
              { name: '用药安全', color: 'red' },
              { name: '体质养生', color: 'yellow' },
              { name: 'lifestyle', color: 'gray' },
              { name: 'research', color: 'brown' },
              { name: 'safety', color: 'pink' },
              { name: 'traditional', color: 'default' }
            ]
          }
        },
        'tags': {
          multi_select: {
            options: [
              { name: '姜黄', color: 'yellow' },
              { name: '人参', color: 'red' },
              { name: '抗炎', color: 'blue' },
              { name: '养生', color: 'green' },
              { name: '安全', color: 'orange' },
              { name: 'turmeric benefits', color: 'yellow' },
              { name: 'gut health', color: 'green' },
              { name: 'natural pain relief', color: 'blue' },
              { name: 'inflammation', color: 'red' },
              { name: 'digestive health', color: 'purple' },
              { name: '中药现代化', color: 'default' },
              { name: '科学研究', color: 'blue' },
              { name: '传统医学', color: 'brown' },
              { name: '冬季养生', color: 'gray' },
              { name: '免疫力', color: 'pink' },
              { name: '温补', color: 'orange' }
            ]
          }
        },
        'slug': {
          rich_text: {}
        },
        'published_date': {
          date: {}
        },
        'read_time': {
          rich_text: {}
        },
        'seo_keywords': {
          multi_select: {
            options: []
          }
        },
        'status': {
          select: {
            options: [
              { name: '已发布', color: 'green' },
              { name: 'published', color: 'green' },
              { name: '草稿', color: 'yellow' },
              { name: 'draft', color: 'yellow' },
              { name: '待审核', color: 'orange' },
              { name: 'review', color: 'orange' }
            ]
          }
        }
      }
    });
    
    console.log('✅ 数据库字段更新成功');
    return response;
  } catch (error) {
    console.error('❌ 更新数据库字段失败:', error.message);
    return null;
  }
}

async function addBlogPost(blogData) {
  try {
    console.log(`📝 正在添加博客文章: ${blogData.title}`);
    
    const response = await notion.pages.create({
      parent: {
        database_id: BLOG_DATABASE_ID
      },
      properties: {
        '名称': {
          title: [
            {
              text: {
                content: blogData.title
              }
            }
          ]
        },
        'content': {
          rich_text: [
            {
              text: {
                content: blogData.content.substring(0, 2000) // Notion有字符限制
              }
            }
          ]
        },
        'excerpt': {
          rich_text: [
            {
              text: {
                content: blogData.excerpt
              }
            }
          ]
        },
        'author': {
          rich_text: [
            {
              text: {
                content: blogData.author
              }
            }
          ]
        },
        'category': {
          select: {
            name: blogData.category
          }
        },
        'tags': {
          multi_select: blogData.tags.map(tag => ({ name: tag }))
        },
        'slug': {
          rich_text: [
            {
              text: {
                content: blogData.slug
              }
            }
          ]
        },
        'published_date': {
          date: {
            start: blogData.publishDate
          }
        },
        'read_time': {
          rich_text: [
            {
              text: {
                content: blogData.readTime
              }
            }
          ]
        },
        'status': {
          select: {
            name: blogData.status || '已发布'
          }
        }
      }
    });
    
    console.log('✅ 博客文章添加成功!');
    console.log('🆔 页面ID:', response.id);
    return response;
  } catch (error) {
    console.error('❌ 添加博客文章失败:', error.message);
    console.error('详细错误:', error);
    return null;
  }
}

async function getAllBlogPosts() {
  try {
    console.log('📖 正在获取所有博客文章...');
    
    const response = await notion.databases.query({
      database_id: BLOG_DATABASE_ID,
      sorts: [
        {
          property: 'published_date',
          direction: 'descending'
        }
      ]
    });
    
    const posts = response.results.map(page => {
      const properties = page.properties;
      return {
        id: page.id,
        title: properties['名称']?.title?.[0]?.text?.content || '',
        content: properties['content']?.rich_text?.[0]?.text?.content || '',
        excerpt: properties['excerpt']?.rich_text?.[0]?.text?.content || '',
        author: properties['author']?.rich_text?.[0]?.text?.content || '',
        category: properties['category']?.select?.name || '',
        tags: properties['tags']?.multi_select?.map(tag => tag.name) || [],
        slug: properties['slug']?.rich_text?.[0]?.text?.content || '',
        publishDate: properties['published_date']?.date?.start || '',
        readTime: properties['read_time']?.rich_text?.[0]?.text?.content || '',
        status: properties['status']?.select?.name || '',
        url: `https://www.notion.so/${page.id.replace(/-/g, '')}`
      };
    });
    
    console.log(`✅ 获取到 ${posts.length} 篇博客文章`);
    return posts;
  } catch (error) {
    console.error('❌ 获取博客文章失败:', error.message);
    return [];
  }
}

// 示例博客文章数据（中英文混合）
const blogPosts = [
  {
    title: '中药现代化：传统智慧与科学研究的完美结合',
    content: '中药现代化是当前中医药发展的重要趋势。通过现代科学技术的验证，传统中药的疗效得到了科学的证实。本文将探讨中药现代化的发展历程、现状和未来趋势。\n\n在现代医学的发展过程中，传统中医药以其独特的理论体系和丰富的临床经验，为人类健康事业做出了重要贡献。随着科学技术的不断进步，中药现代化已成为中医药发展的必然趋势。',
    excerpt: '探索中药如何在现代科学的验证下，继续为人类健康服务，以及最新的研究发现。',
    author: '李博士',
    category: '科学研究',
    tags: ['中药现代化', '科学研究', '传统医学'],
    slug: 'tcm-modernization-science',
    publishDate: '2024-12-15',
    readTime: '8分钟阅读',
    status: '已发布'
  },
  {
    title: '冬季养生：5种草药助您温暖过冬',
    content: '冬季是养生的重要季节，选择合适的草药可以帮助我们增强免疫力，温暖度过寒冷的冬天。本文将介绍5种适合冬季使用的草药：\n\n1. 当归 - 补血活血，调经止痛\n2. 黄芪 - 补气固表，托毒排脓\n3. 肉桂 - 温肾阳，散寒气\n4. 生姜 - 温中散寒，化痰止咳\n5. 枸杞 - 滋补肝肾，明目润肺',
    excerpt: '冬季是养生的重要季节，了解这5种草药如何帮助您增强免疫力，温暖度过寒冷的冬天。',
    author: '张中医',
    category: '季节养生',
    tags: ['冬季养生', '免疫力', '温补'],
    slug: 'winter-herbs-guide',
    publishDate: '2024-12-10',
    readTime: '6分钟阅读',
    status: '已发布'
  },
  {
    title: 'Turmeric Made Simple: How to Use It Today for Real Gut Relief and Pain Reduction',
    content: 'Turmeric is a bright yellow root used for thousands of years in cooking and traditional medicine, especially in Asia. Its main active compound, curcumin, is known for powerful anti-inflammatory and antioxidant effects.\n\nIn simple terms, turmeric helps reduce "inflammation fires" in your body—those hidden causes behind bloating, joint pain, and sluggish digestion.\n\nHow Turmeric Can Help You Feel Better:\n- Soothes bloating and digestive discomfort by calming irritated gut tissues\n- Reduces joint pain and stiffness, helping you move more comfortably\n- Supports your immune system and promotes overall wellness',
    excerpt: 'Feeling bloated, achy, or tired? Discover how turmeric can help calm your gut, reduce inflammation, and boost your energy.',
    author: 'HerbScience Team',
    category: 'lifestyle',
    tags: ['turmeric benefits', 'gut health', 'natural pain relief', 'inflammation'],
    slug: 'turmeric-gut-relief-guide',
    publishDate: '2025-01-19',
    readTime: '8 min read',
    status: 'published'
  },
  {
    title: '姜黄的神奇功效：不仅仅是调料那么简单',
    content: '姜黄是一种常见的香料，但它的功效远不止于此。姜黄含有丰富的姜黄素，具有强大的抗炎、抗氧化功效。\n\n现代研究表明，姜黄对以下方面都有积极作用：\n- 肝脏保护：姜黄素能够保护肝细胞，预防肝损伤\n- 心血管健康：降低胆固醇，改善血液循环\n- 关节炎：减轻关节炎症状，缓解疼痛\n- 消化系统：促进消化，减少胃肠道炎症\n- 神经保护：可能有助于预防阿尔茨海默病',
    excerpt: '深入了解姜黄的多种健康益处，从抗炎到护肝，这个黄金香料的价值远超想象。',
    author: '王营养师',
    category: '草药科普',
    tags: ['姜黄', '抗炎', '营养科普'],
    slug: 'turmeric-benefits-guide-chinese',
    publishDate: '2024-12-05',
    readTime: '10分钟阅读',
    status: '已发布'
  },
  {
    title: '人参的选择指南：如何挑选适合您的人参产品',
    content: '人参是名贵的中药材，市场上人参产品种类繁多，如何选择适合自己的人参产品呢？\n\n人参的种类：\n1. 野山参 - 最珍贵，功效最强\n2. 园参 - 人工种植，性价比高\n3. 红参 - 蒸制加工，温补性强\n4. 白参 - 晒干加工，性质平和\n5. 西洋参 - 补气养阴，适合体热者\n\n选择要点：\n- 根据体质选择：阳虚选红参，阴虚选西洋参\n- 看产地：东北人参品质佳\n- 观外形：形体完整，纹理清晰\n- 闻气味：具有特有的人参香味',
    excerpt: '全面指导如何根据个人体质和需求，选择最适合的人参产品。',
    author: '陈专家',
    category: '购买指南',
    tags: ['人参', '选购指南', '体质'],
    slug: 'ginseng-buying-guide',
    publishDate: '2024-12-01',
    readTime: '5分钟阅读',
    status: '已发布'
  }
];

async function main() {
  try {
    console.log('🚀 开始设置博客数据库...');
    
    // 更新数据库字段
    await updateDatabaseSchema();
    
    // 等待一下确保字段更新完成
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 添加博客文章
    console.log('\n📝 开始添加博客文章...');
    for (const post of blogPosts) {
      await addBlogPost(post);
      // 添加延迟避免API限制
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 获取所有博客文章
    const allPosts = await getAllBlogPosts();
    
    // 输出结果
    console.log('\n📊 同步完成统计:');
    console.log(`✅ 数据库ID: ${BLOG_DATABASE_ID}`);
    console.log(`📚 博客文章数量: ${allPosts.length}`);
    
    // 保存数据到JSON文件
    const fs = require('fs');
    const output = {
      databaseId: BLOG_DATABASE_ID,
      posts: allPosts,
      syncTime: new Date().toISOString()
    };
    
    fs.writeFileSync('blog-posts-data.json', JSON.stringify(output, null, 2));
    console.log('💾 博客数据已保存到 blog-posts-data.json');
    
    // 生成前端数据文件
    const frontendData = `// 博客文章数据 - 自动生成于 ${new Date().toISOString()}
export const blogPosts = ${JSON.stringify(allPosts, null, 2)};

export const getBlogPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string) => {
  return blogPosts.filter(post => post.category === category);
};

export const getBlogPostsByTag = (tag: string) => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

export default blogPosts;
`;
    
    fs.writeFileSync('lib/blog-data.ts', frontendData);
    console.log('💾 前端博客数据已保存到 lib/blog-data.ts');
    
    return { databaseId: BLOG_DATABASE_ID, posts: allPosts };
  } catch (error) {
    console.error('❌ 设置过程中发生错误:', error.message);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  updateDatabaseSchema,
  addBlogPost,
  getAllBlogPosts,
  BLOG_DATABASE_ID,
  main
}; 