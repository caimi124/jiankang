// 测试Sanity博客数据获取
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
});

console.log('=== Sanity博客连接测试 ===\n');

console.log('环境变量检查:');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '❌ 未设置');
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production (默认)');
console.log('Token:', process.env.NEXT_PUBLIC_SANITY_READ_TOKEN ? '✅ 已设置' : '❌ 未设置');

async function testSanityConnection() {
  try {
    console.log('\n=== 测试基本连接 ===');

    // 测试基本连接
    const result = await client.fetch('*[_type == "blogPost"][0...5]');
    console.log(`✅ 连接成功! 找到 ${result.length} 篇文章`);

    // 显示所有文章标题
    console.log('\n=== 所有博客文章 ===');
    const allPosts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        status,
        featured
      }
    `);

    console.log(`总共找到 ${allPosts.length} 篇文章:`);
    allPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Slug: ${post.slug?.current || '无slug'}`);
      console.log(`   状态: ${post.status || '未设置'}`);
      console.log(`   发布时间: ${post.publishedAt || '未设置'}`);
      console.log(`   精选: ${post.featured ? '是' : '否'}`);
      console.log('   ---');
    });

    // 专门搜索"Why Some Herbs Work"文章
    console.log('\n=== 搜索目标文章 ===');
    const targetArticle = await client.fetch(`
      *[_type == "blogPost" && title match "*Herbs Work*"] {
        _id,
        title,
        slug,
        publishedAt,
        status,
        excerpt,
        category,
        author,
        tags
      }
    `);

    if (targetArticle.length > 0) {
      console.log('🎉 找到匹配文章:');
      targetArticle.forEach(article => {
        console.log(`标题: ${article.title}`);
        console.log(`ID: ${article._id}`);
        console.log(`Slug: ${article.slug?.current || '无slug'}`);
        console.log(`状态: ${article.status || '未设置'}`);
        console.log(`类别: ${article.category || '未设置'}`);
        console.log(`作者: ${article.author || '未设置'}`);
        console.log(`摘要: ${article.excerpt || '无摘要'}`);
      });
    } else {
      console.log('❌ 未找到标题包含"Herbs Work"的文章');
    }

    // 模糊搜索
    const fuzzySearch = await client.fetch(`
      *[_type == "blogPost" && (
        title match "*Why*" ||
        title match "*Some*" ||
        title match "*Work*" ||
        title match "*Others*"
      )] {
        _id,
        title,
        slug,
        status
      }
    `);

    console.log('\n=== 模糊搜索结果 ===');
    if (fuzzySearch.length > 0) {
      console.log(`找到 ${fuzzySearch.length} 篇可能相关的文章:`);
      fuzzySearch.forEach(article => {
        console.log(`- ${article.title} (${article.status || '未发布'})`);
      });
    } else {
      console.log('❌ 模糊搜索也未找到相关文章');
    }

    // 检查文章状态分布
    console.log('\n=== 文章状态分析 ===');
    const statusStats = await client.fetch(`
      {
        "published": count(*[_type == "blogPost" && status == "published"]),
        "draft": count(*[_type == "blogPost" && status == "draft"]),
        "undefined": count(*[_type == "blogPost" && !defined(status)])
      }
    `);

    console.log('文章状态统计:');
    console.log(`已发布: ${statusStats.published}`);
    console.log(`草稿: ${statusStats.draft}`);
    console.log(`未设置状态: ${statusStats.undefined}`);

  } catch (error) {
    console.error('❌ Sanity连接失败:', error.message);
    if (error.details) {
      console.error('错误详情:', error.details);
    }
  }
}

testSanityConnection();