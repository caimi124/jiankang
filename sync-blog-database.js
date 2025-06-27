const { Client } = require('@notionhq/client');

// 使用提供的博客数据库API密钥
const notion = new Client({
  auth: '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'
});

// 博客数据库ID需要通过API密钥获取
const BLOG_DATABASE_ID = 'blog-database-id'; // 这里需要实际的数据库ID

async function getBlogDatabaseId() {
  try {
    console.log('🔍 正在查找博客数据库...');
    
    // 搜索数据库
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'database'
      }
    });
    
    console.log('📊 找到的数据库:', response.results.length);
    
    // 显示所有数据库
    response.results.forEach((db, index) => {
      console.log(`${index + 1}. 数据库名称: ${db.title?.[0]?.text?.content || '未命名'}`);
      console.log(`   数据库ID: ${db.id}`);
      console.log(`   创建时间: ${db.created_time}`);
      console.log('---');
    });
    
    return response.results;
  } catch (error) {
    console.error('❌ 获取数据库列表失败:', error.message);
    return [];
  }
}

async function createBlogDatabase() {
  try {
    console.log('🔨 正在创建博客数据库...');
    
    const response = await notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: 'root' // 需要一个父页面ID
      },
      title: [
        {
          type: 'text',
          text: {
            content: 'HerbScience Blog Database'
          }
        }
      ],
      properties: {
        '标题': {
          title: {}
        },
        '内容': {
          rich_text: {}
        },
        '摘要': {
          rich_text: {}
        },
        '作者': {
          rich_text: {}
        },
        '分类': {
          select: {
            options: [
              { name: '科学研究', color: 'blue' },
              { name: '季节养生', color: 'green' },
              { name: '草药科普', color: 'purple' },
              { name: '购买指南', color: 'orange' },
              { name: '用药安全', color: 'red' },
              { name: '体质养生', color: 'yellow' }
            ]
          }
        },
        '标签': {
          multi_select: {
            options: [
              { name: '姜黄', color: 'yellow' },
              { name: '人参', color: 'red' },
              { name: '抗炎', color: 'blue' },
              { name: '养生', color: 'green' },
              { name: '安全', color: 'orange' }
            ]
          }
        },
        'slug': {
          rich_text: {}
        },
        '发布日期': {
          date: {}
        },
        '阅读时长': {
          rich_text: {}
        },
        'SEO关键词': {
          multi_select: {
            options: []
          }
        },
        '状态': {
          select: {
            options: [
              { name: '已发布', color: 'green' },
              { name: '草稿', color: 'yellow' },
              { name: '待审核', color: 'orange' }
            ]
          }
        }
      }
    });
    
    console.log('✅ 博客数据库创建成功!');
    console.log('🆔 数据库ID:', response.id);
    return response.id;
  } catch (error) {
    console.error('❌ 创建博客数据库失败:', error.message);
    return null;
  }
}

async function addBlogPost(databaseId, blogData) {
  try {
    console.log(`📝 正在添加博客文章: ${blogData.title}`);
    
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId
      },
      properties: {
        '标题': {
          title: [
            {
              text: {
                content: blogData.title
              }
            }
          ]
        },
        '内容': {
          rich_text: [
            {
              text: {
                content: blogData.content
              }
            }
          ]
        },
        '摘要': {
          rich_text: [
            {
              text: {
                content: blogData.excerpt
              }
            }
          ]
        },
        '作者': {
          rich_text: [
            {
              text: {
                content: blogData.author
              }
            }
          ]
        },
        '分类': {
          select: {
            name: blogData.category
          }
        },
        '标签': {
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
        '发布日期': {
          date: {
            start: blogData.publishDate
          }
        },
        '阅读时长': {
          rich_text: [
            {
              text: {
                content: blogData.readTime
              }
            }
          ]
        },
        '状态': {
          select: {
            name: '已发布'
          }
        }
      }
    });
    
    console.log('✅ 博客文章添加成功!');
    console.log('🆔 页面ID:', response.id);
    return response;
  } catch (error) {
    console.error('❌ 添加博客文章失败:', error.message);
    return null;
  }
}

async function getBlogPosts(databaseId) {
  try {
    console.log('📖 正在获取博客文章...');
    
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: '发布日期',
          direction: 'descending'
        }
      ]
    });
    
    const posts = response.results.map(page => {
      const properties = page.properties;
      return {
        id: page.id,
        title: properties['标题']?.title?.[0]?.text?.content || '',
        content: properties['内容']?.rich_text?.[0]?.text?.content || '',
        excerpt: properties['摘要']?.rich_text?.[0]?.text?.content || '',
        author: properties['作者']?.rich_text?.[0]?.text?.content || '',
        category: properties['分类']?.select?.name || '',
        tags: properties['标签']?.multi_select?.map(tag => tag.name) || [],
        slug: properties['slug']?.rich_text?.[0]?.text?.content || '',
        publishDate: properties['发布日期']?.date?.start || '',
        readTime: properties['阅读时长']?.rich_text?.[0]?.text?.content || '',
        status: properties['状态']?.select?.name || ''
      };
    });
    
    console.log(`✅ 获取到 ${posts.length} 篇博客文章`);
    return posts;
  } catch (error) {
    console.error('❌ 获取博客文章失败:', error.message);
    return [];
  }
}

// 示例博客文章数据
const sampleBlogPosts = [
  {
    title: '中药现代化：传统智慧与科学研究的完美结合',
    content: '中药现代化是当前中医药发展的重要趋势。通过现代科学技术的验证，传统中药的疗效得到了科学的证实。本文将探讨中药现代化的发展历程、现状和未来趋势...',
    excerpt: '探索中药如何在现代科学的验证下，继续为人类健康服务，以及最新的研究发现。',
    author: '李博士',
    category: '科学研究',
    tags: ['中药现代化', '科学研究', '传统医学'],
    slug: 'tcm-modernization-science',
    publishDate: '2024-12-15',
    readTime: '8分钟阅读'
  },
  {
    title: '冬季养生：5种草药助您温暖过冬',
    content: '冬季是养生的重要季节，选择合适的草药可以帮助我们增强免疫力，温暖度过寒冷的冬天。本文将介绍5种适合冬季使用的草药：当归、黄芪、肉桂、生姜、枸杞...',
    excerpt: '冬季是养生的重要季节，了解这5种草药如何帮助您增强免疫力，温暖度过寒冷的冬天。',
    author: '张中医',
    category: '季节养生',
    tags: ['冬季养生', '免疫力', '温补'],
    slug: 'winter-herbs-guide',
    publishDate: '2024-12-10',
    readTime: '6分钟阅读'
  },
  {
    title: '姜黄的神奇功效：不仅仅是调料那么简单',
    content: '姜黄是一种常见的香料，但它的功效远不止于此。姜黄含有丰富的姜黄素，具有强大的抗炎、抗氧化功效。研究表明，姜黄对肝脏保护、心血管健康、关节炎等都有积极作用...',
    excerpt: '深入了解姜黄的多种健康益处，从抗炎到护肝，这个黄金香料的价值远超想象。',
    author: '王营养师',
    category: '草药科普',
    tags: ['姜黄', '抗炎', '营养科普'],
    slug: 'turmeric-benefits-guide',
    publishDate: '2024-12-05',
    readTime: '10分钟阅读'
  },
  {
    title: '人参的选择指南：如何挑选适合您的人参产品',
    content: '人参是名贵的中药材，市场上人参产品种类繁多，如何选择适合自己的人参产品呢？本文将从人参的种类、等级、功效等方面为您详细介绍...',
    excerpt: '全面指导如何根据个人体质和需求，选择最适合的人参产品。',
    author: '陈专家',
    category: '购买指南',
    tags: ['人参', '选购指南', '体质'],
    slug: 'ginseng-buying-guide',
    publishDate: '2024-12-01',
    readTime: '5分钟阅读'
  },
  {
    title: '草药与现代药物的相互作用：您需要知道的安全知识',
    content: '随着草药使用的普及，草药与现代药物的相互作用问题越来越受到关注。本文将详细介绍常见的草药与药物相互作用，以及如何安全使用草药...',
    excerpt: '了解草药与现代药物可能发生的相互作用，确保用药安全。',
    author: '刘药师',
    category: '用药安全',
    tags: ['药物相互作用', '用药安全', '草药安全'],
    slug: 'herb-drug-interactions',
    publishDate: '2024-11-28',
    readTime: '7分钟阅读'
  }
];

async function main() {
  try {
    console.log('🚀 开始同步博客数据库...');
    
    // 首先获取现有数据库
    const databases = await getBlogDatabaseId();
    
    let databaseId;
    if (databases.length === 0) {
      console.log('📝 未找到博客数据库，创建新的数据库...');
      databaseId = await createBlogDatabase();
      if (!databaseId) {
        console.error('❌ 创建数据库失败，退出程序');
        return;
      }
    } else {
      // 使用第一个找到的数据库
      databaseId = databases[0].id;
      console.log('✅ 使用现有数据库:', databaseId);
    }
    
    // 添加示例博客文章
    console.log('📝 开始添加博客文章...');
    for (const post of sampleBlogPosts) {
      await addBlogPost(databaseId, post);
      // 添加延迟避免API限制
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // 获取所有博客文章
    const posts = await getBlogPosts(databaseId);
    
    // 输出结果
    console.log('\n📊 同步完成统计:');
    console.log(`✅ 数据库ID: ${databaseId}`);
    console.log(`📚 博客文章数量: ${posts.length}`);
    
    // 保存数据到JSON文件
    const fs = require('fs');
    const output = {
      databaseId,
      posts,
      syncTime: new Date().toISOString()
    };
    
    fs.writeFileSync('blog-database-sync.json', JSON.stringify(output, null, 2));
    console.log('💾 博客数据已保存到 blog-database-sync.json');
    
    return { databaseId, posts };
  } catch (error) {
    console.error('❌ 同步过程中发生错误:', error.message);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  getBlogDatabaseId,
  createBlogDatabase,
  addBlogPost,
  getBlogPosts,
  main
}; 