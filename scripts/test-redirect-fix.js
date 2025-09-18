#!/usr/bin/env node

/**
 * 重定向配置测试脚本
 * 测试修复后的重定向是否正确工作
 */

const https = require('https');
const http = require('http');

const testUrls = [
  // Google Search Console 报告的问题页面
  'https://www.herbscience.shop/user-experiences',
  'https://www.herbscience.shop/herb-finder', 
  'https://www.herbscience.shop/herbs/ginger',
  'https://www.herbscience.shop/blog',
  'https://www.herbscience.shop/constitution-test',
  'https://www.herbscience.shop/about',
  'http://www.herbscience.shop/', // HTTP 测试
  
  // 重定向测试
  'https://herbscience.shop/', // non-www -> www
  'https://herbscience.shop/herb-finder',
  'https://herbscience.shop/about',
  
  // 草药重定向测试
  'https://www.herbscience.shop/herbs/cloves', // -> clove
  'https://www.herbscience.shop/herbs/pumpkin-seed', // -> pumpkin-seeds
];

async function testUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const options = {
      method: 'HEAD',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HerbScience-Test/1.0)'
      }
    };

    const req = client.request(url, options, (res) => {
      resolve({
        url,
        status: res.statusCode,
        location: res.headers.location,
        success: res.statusCode < 400
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

async function runTests() {
  console.log('🔍 测试重定向配置修复...\n');
  
  const results = [];
  
  for (const url of testUrls) {
    process.stdout.write(`测试: ${url} ... `);
    const result = await testUrl(url);
    results.push(result);
    
    if (result.success) {
      if (result.status >= 300 && result.status < 400) {
        console.log(`✅ ${result.status} -> ${result.location}`);
      } else {
        console.log(`✅ ${result.status}`);
      }
    } else {
      console.log(`❌ ${result.status} ${result.error || ''}`);
    }
  }

  // 分析结果
  console.log('\n📊 测试结果分析:');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const redirects = results.filter(r => r.status >= 300 && r.status < 400).length;
  
  console.log(`✅ 成功: ${successful}/${results.length}`);
  console.log(`❌ 失败: ${failed}/${results.length}`);
  console.log(`🔄 重定向: ${redirects}/${results.length}`);
  
  // 检查关键重定向
  console.log('\n🎯 关键重定向检查:');
  
  const nonWwwTest = results.find(r => r.url === 'https://herbscience.shop/');
  if (nonWwwTest && nonWwwTest.location === 'https://www.herbscience.shop/') {
    console.log('✅ non-www -> www 重定向正常');
  } else {
    console.log('❌ non-www -> www 重定向异常');
  }
  
  const httpTest = results.find(r => r.url === 'http://www.herbscience.shop/');
  if (httpTest && httpTest.location && httpTest.location.startsWith('https://')) {
    console.log('✅ HTTP -> HTTPS 重定向正常');
  } else {
    console.log('❌ HTTP -> HTTPS 重定向异常');
  }

  // 草药重定向检查
  const cloveTest = results.find(r => r.url === 'https://www.herbscience.shop/herbs/cloves');
  if (cloveTest && cloveTest.location === 'https://www.herbscience.shop/herbs/clove') {
    console.log('✅ cloves -> clove 重定向正常');
  } else {
    console.log('❌ cloves -> clove 重定向异常');
  }

  if (failed === 0) {
    console.log('\n🎉 所有测试通过！重定向配置修复成功！');
    return true;
  } else {
    console.log(`\n⚠️  还有 ${failed} 个问题需要解决`);
    return false;
  }
}

// 运行测试
if (require.main === module) {
  runTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { runTests, testUrl };
