#!/usr/bin/env node

/**
 * 重定向测试脚本 - 验证所有重定向规则是否正确工作
 * 修复Google Search Console重定向错误
 */

const https = require('https');
const http = require('http');

// 测试URL列表 - 基于Google Search Console报告的错误页面
const testUrls = [
  // 基础重定向测试
  'http://herbscience.shop/',
  'http://www.herbscience.shop/',
  'https://herbscience.shop/',
  'https://www.herbscience.shop/',
  
  // Google Search Console错误页面
  'https://www.herbscience.shop/user-experiences',
  'https://www.herbscience.shop/herb-finder', 
  'https://www.herbscience.shop/herbs/ginger',
  'https://www.herbscience.shop/blog',
  'https://www.herbscience.shop/constitution-test',
  'https://www.herbscience.shop/about',
  
  // 对应的non-www版本（应该重定向到www）
  'https://herbscience.shop/user-experiences',
  'https://herbscience.shop/herb-finder',
  'https://herbscience.shop/herbs/ginger', 
  'https://herbscience.shop/blog',
  'https://herbscience.shop/constitution-test',
  'https://herbscience.shop/about',
  
  // 草药别名重定向
  'https://www.herbscience.shop/herbs/pumpkin-seed',
  'https://www.herbscience.shop/herbs/cloves',
  'https://herbscience.shop/herbs/pumpkin-seed',
  'https://herbscience.shop/herbs/cloves',
];

/**
 * 发送HTTP请求并返回重定向信息
 */
function testRedirect(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'HEAD',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RedirectTester/1.0)'
      }
    };

    const req = client.request(options, (res) => {
      resolve({
        url,
        statusCode: res.statusCode,
        location: res.headers.location || null,
        isRedirect: res.statusCode >= 300 && res.statusCode < 400,
        isFinal: res.statusCode === 200
      });
    });

    req.on('error', (error) => {
      resolve({
        url,
        statusCode: 'ERROR',
        location: null,
        isRedirect: false,
        isFinal: false,
        error: error.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        statusCode: 'TIMEOUT', 
        location: null,
        isRedirect: false,
        isFinal: false,
        error: 'Request timeout'
      });
    });

    req.end();
  });
}

/**
 * 主测试函数
 */
async function runRedirectTests() {
  console.log('🔍 开始测试重定向配置...\n');
  console.log('📋 测试目标：修复Google Search Console重定向错误\n');
  
  const results = [];
  let passCount = 0;
  let failCount = 0;

  for (const url of testUrls) {
    const result = await testRedirect(url);
    results.push(result);
    
    // 分析结果
    let status = '❌ FAIL';
    let message = '';

    if (result.error) {
      message = `错误: ${result.error}`;
      failCount++;
    } else if (result.statusCode === 200) {
      // 最终页面，检查是否是正确的www域名
      if (url.includes('www.herbscience.shop')) {
        status = '✅ PASS';
        message = '最终页面正确访问';
        passCount++;
      } else {
        status = '⚠️  WARN'; 
        message = '应该重定向到www版本';
        failCount++;
      }
    } else if (result.isRedirect) {
      // 重定向，检查目标是否正确
      if (result.location && result.location.includes('www.herbscience.shop')) {
        status = '✅ PASS';
        message = `正确重定向到: ${result.location}`;
        passCount++;
      } else {
        message = `重定向目标错误: ${result.location}`;
        failCount++;
      }
    } else {
      message = `状态码: ${result.statusCode}`;
      failCount++;
    }

    console.log(`${status} ${url}`);
    console.log(`   状态: ${result.statusCode} | ${message}`);
    if (result.location) {
      console.log(`   重定向到: ${result.location}`);
    }
    console.log('');
  }

  // 总结报告
  console.log('📊 测试总结:');
  console.log(`✅ 通过: ${passCount}`);
  console.log(`❌ 失败: ${failCount}`);
  console.log(`📈 成功率: ${Math.round((passCount / (passCount + failCount)) * 100)}%\n`);

  // 预期重定向链分析
  console.log('🎯 预期重定向链:');
  console.log('   http://herbscience.shop/ → https://www.herbscience.shop/');
  console.log('   https://herbscience.shop/ → https://www.herbscience.shop/');
  console.log('   https://www.herbscience.shop/ → 200 OK (最终页面)');
  
  if (failCount === 0) {
    console.log('\n🎉 所有重定向测试通过！Google Search Console错误应该得到解决。');
  } else {
    console.log('\n⚠️  发现问题，需要进一步检查配置文件。');
  }

  return { passCount, failCount, results };
}

// 运行测试
if (require.main === module) {
  runRedirectTests().catch(console.error);
}

module.exports = { runRedirectTests, testRedirect };
