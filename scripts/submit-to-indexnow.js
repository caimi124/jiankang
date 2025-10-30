#!/usr/bin/env node

/**
 * IndexNow 自动提交脚本
 * 
 * 用途：将网站的所有重要 URL 提交到 IndexNow API，加速 Bing/Yandex 等搜索引擎收录
 * 
 * 使用方法：
 * 1. 单个 URL: node scripts/submit-to-indexnow.js https://herbscience.shop/herbs/cinnamon
 * 2. 批量提交: node scripts/submit-to-indexnow.js --batch
 * 3. 提交最新内容: node scripts/submit-to-indexnow.js --latest
 */

const https = require('https');
const http = require('http');

// 配置
const SITE_URL = 'https://herbscience.shop';
const INDEXNOW_KEY = 'd9cef75a7df241d5aeffb8c21006c151';
const KEY_LOCATION = `${SITE_URL}/d9cef75a7df241d5aeffb8c21006c151.txt`;

// 核心 URL 列表（高优先级）
const PRIORITY_URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/about`,
  `${SITE_URL}/herb-finder`,
  `${SITE_URL}/constitution-test`,
  `${SITE_URL}/blog`,
];

// 草药详情页
const HERB_URLS = [
  'turmeric', 'ashwagandha', 'ginger', 'ginseng', 'rhodiola', 'cinnamon',
  'peppermint', 'chamomile', 'echinacea', 'valerian-root', 'st-johns-wort',
  'milk-thistle', 'holy-basil', 'licorice-root', 'elderberry', 'fenugreek',
  'black-pepper', 'cayenne', 'clove', 'pumpkin-seeds', 'onion'
].map(slug => `${SITE_URL}/herbs/${slug}`);

// 博客文章
const BLOG_URLS = [
  'red-onion-vs-white-onion-health-benefits',
  'ginger-tablets-chews-nausea-bloating-guide',
  'ginger-tea-menstrual-cramps-natural-relief',
  'ashwagandha-for-women-hormone-balance',
  'turmeric-gut-relief-guide',
  'rhodiola-tea-recipes-energy-focus',
  'why-rhodiola-works-body-type',
  'rhodiola-smart-way-daily-rituals'
].map(slug => `${SITE_URL}/blog/${slug}`);

/**
 * 提交单个 URL 到 IndexNow
 */
async function submitSingleUrl(url) {
  const data = JSON.stringify({
    host: 'herbscience.shop',
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: [url]
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ 成功提交: ${url}`);
          resolve({ success: true, url, statusCode: res.statusCode });
        } else {
          console.error(`❌ 提交失败 (${res.statusCode}): ${url}`);
          resolve({ success: false, url, statusCode: res.statusCode });
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ 网络错误: ${url}`, error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

/**
 * 批量提交 URL（每次最多 10000 个）
 */
async function submitBatchUrls(urls) {
  console.log(`\n🚀 准备批量提交 ${urls.length} 个 URL...\n`);

  // 分批提交（每批 100 个）
  const batchSize = 100;
  const batches = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`📦 批次 ${i + 1}/${batches.length} (${batch.length} URLs)`);

    const data = JSON.stringify({
      host: 'herbscience.shop',
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch
    });

    try {
      const result = await new Promise((resolve, reject) => {
        const options = {
          hostname: 'api.indexnow.org',
          port: 443,
          path: '/indexnow',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(data)
          }
        };

        const req = https.request(options, (res) => {
          let responseData = '';
          res.on('data', (chunk) => { responseData += chunk; });
          res.on('end', () => {
            resolve({ statusCode: res.statusCode, data: responseData });
          });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
      });

      if (result.statusCode === 200) {
        successCount += batch.length;
        console.log(`  ✅ 成功提交 ${batch.length} 个 URL`);
      } else {
        failCount += batch.length;
        console.error(`  ❌ 提交失败 (${result.statusCode})`);
      }

      // 延迟以避免速率限制
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      failCount += batch.length;
      console.error(`  ❌ 网络错误:`, error.message);
    }
  }

  console.log(`\n📊 提交完成:`);
  console.log(`  ✅ 成功: ${successCount} 个`);
  console.log(`  ❌ 失败: ${failCount} 个`);
  console.log(`  📈 成功率: ${((successCount / urls.length) * 100).toFixed(1)}%\n`);

  return { successCount, failCount };
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);

  // 帮助信息
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📚 IndexNow 提交脚本使用指南

用法:
  node scripts/submit-to-indexnow.js [选项] [URL]

选项:
  --batch, -b         批量提交所有重要页面
  --latest, -l        只提交最新内容（首页、博客、最新草药）
  --priority, -p      只提交高优先级页面
  --help, -h          显示此帮助信息

示例:
  # 提交单个 URL
  node scripts/submit-to-indexnow.js https://herbscience.shop/herbs/cinnamon

  # 批量提交所有页面
  node scripts/submit-to-indexnow.js --batch

  # 只提交最新内容
  node scripts/submit-to-indexnow.js --latest

  # 只提交高优先级页面
  node scripts/submit-to-indexnow.js --priority
    `);
    return;
  }

  // 批量提交
  if (args.includes('--batch') || args.includes('-b')) {
    const allUrls = [...PRIORITY_URLS, ...HERB_URLS, ...BLOG_URLS];
    await submitBatchUrls(allUrls);
    return;
  }

  // 只提交最新内容
  if (args.includes('--latest') || args.includes('-l')) {
    const latestUrls = [
      ...PRIORITY_URLS,
      ...BLOG_URLS.slice(0, 5), // 最新 5 篇博客
      ...HERB_URLS.slice(0, 10)  // 最新 10 个草药
    ];
    await submitBatchUrls(latestUrls);
    return;
  }

  // 只提交高优先级
  if (args.includes('--priority') || args.includes('-p')) {
    await submitBatchUrls(PRIORITY_URLS);
    return;
  }

  // 单个 URL 提交
  if (args.length > 0 && args[0].startsWith('http')) {
    const url = args[0];
    await submitSingleUrl(url);
    return;
  }

  // 默认：显示使用说明
  console.log(`
⚠️  请提供 URL 或选项

使用示例:
  node scripts/submit-to-indexnow.js https://herbscience.shop/herbs/cinnamon
  node scripts/submit-to-indexnow.js --batch
  node scripts/submit-to-indexnow.js --help
  `);
}

// 执行
main().catch(console.error);

