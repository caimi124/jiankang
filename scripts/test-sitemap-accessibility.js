#!/usr/bin/env node

/**
 * Google Search Console Sitemap 可访问性测试
 * 模拟Google爬虫访问sitemap的方式
 */

const https = require('https');
const http = require('http');

const testUrls = [
  'https://herbscience.shop/sitemap.xml',
  'https://herbscience.shop/sitemap-0.xml',
  'https://herbscience.shop/robots.txt'
];

async function testSitemapAccess(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;

    const options = {
      method: 'GET',
      timeout: 10000,
      headers: {
        'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
        'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
        'Accept-Encoding': 'gzip,deflate'
      }
    };

    const req = client.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          contentLength: res.headers['content-length'],
          cacheControl: res.headers['cache-control'],
          lastModified: res.headers['last-modified'],
          etag: res.headers['etag'],
          server: res.headers['server'],
          success: res.statusCode === 200,
          dataPreview: data.substring(0, 200) + (data.length > 200 ? '...' : ''),
          isXML: data.includes('<?xml') && data.includes('xmlns'),
          urlCount: (data.match(/<loc>/g) || []).length
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        error: err.message,
        success: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false
      });
    });

    req.end();
  });
}

async function runSitemapTests() {
  console.log('🔍 测试 Google Search Console Sitemap 可访问性...\n');

  const results = [];

  for (const url of testUrls) {
    process.stdout.write(`测试: ${url} ... `);
    const result = await testSitemapAccess(url);
    results.push(result);

    if (result.success) {
      console.log(`✅ ${result.status} (${result.contentType})`);
      if (result.urlCount) {
        console.log(`   📄 包含 ${result.urlCount} 个URL`);
      }
    } else {
      console.log(`❌ ${result.status} ${result.error || ''}`);
    }

    // 添加延迟避免请求过快
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // 详细分析
  console.log('\n📊 详细分析:');

  const mainSitemap = results.find(r => r.url.endsWith('/sitemap.xml'));
  const detailedSitemap = results.find(r => r.url.endsWith('/sitemap-0.xml'));
  const robotsTxt = results.find(r => r.url.endsWith('/robots.txt'));

  if (mainSitemap && mainSitemap.success) {
    console.log('✅ 主sitemap可访问');
    console.log(`   - Content-Type: ${mainSitemap.contentType}`);
    console.log(`   - 大小: ${mainSitemap.contentLength} bytes`);
    console.log(`   - 缓存: ${mainSitemap.cacheControl}`);
    console.log(`   - 是否XML格式: ${mainSitemap.isXML ? '是' : '否'}`);

    if (mainSitemap.dataPreview.includes('<sitemapindex')) {
      console.log('   📋 类型: Sitemap Index (索引文件)');
    } else if (mainSitemap.dataPreview.includes('<urlset')) {
      console.log('   📋 类型: URL Set (直接包含URL)');
    }
  }

  if (detailedSitemap && detailedSitemap.success) {
    console.log('✅ 详细sitemap可访问');
    console.log(`   - 包含URL数量: ${detailedSitemap.urlCount}`);
    console.log(`   - 大小: ${detailedSitemap.contentLength} bytes`);
  }

  if (robotsTxt && robotsTxt.success) {
    console.log('✅ robots.txt可访问');
    if (robotsTxt.dataPreview.includes('Sitemap:')) {
      console.log('   - 包含Sitemap指向');
    }
  }

  // Google Search Console 建议
  console.log('\n🎯 Google Search Console 提交建议:');

  if (mainSitemap && mainSitemap.success) {
    if (mainSitemap.dataPreview.includes('<sitemapindex')) {
      console.log('📋 推荐提交方式 1 (sitemap index):');
      console.log('   输入: sitemap.xml');
      console.log('   或: https://herbscience.shop/sitemap.xml');
    }

    if (detailedSitemap && detailedSitemap.success) {
      console.log('📋 推荐提交方式 2 (直接sitemap):');
      console.log('   输入: sitemap-0.xml');
      console.log('   或: https://herbscience.shop/sitemap-0.xml');
    }
  }

  console.log('\n💡 故障排除建议:');
  console.log('1. 如果相对路径失败，使用完整URL');
  console.log('2. 等待5-10分钟后重试（缓存更新）');
  console.log('3. 检查Google Search Console站点验证状态');
  console.log('4. 确认提交到正确的站点属性 (herbscience.shop)');

  const successful = results.filter(r => r.success).length;
  const total = results.length;

  if (successful === total) {
    console.log('\n🎉 所有测试通过！sitemap配置完美！');
  } else {
    console.log(`\n⚠️  ${total - successful} 个问题需要解决`);
  }

  return successful === total;
}

// 运行测试
if (require.main === module) {
  runSitemapTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { runSitemapTests, testSitemapAccess };