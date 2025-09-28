#!/usr/bin/env node

/**
 * 测试修复后的重定向配置
 * 验证问题是否已解决
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// 重点测试之前有问题的URL
const testUrls = [
  'http://herbscience.shop/',
  'https://herbscience.shop/',
  'http://www.herbscience.shop/', 
  'https://www.herbscience.shop/',
  'https://herbscience.shop/index.html',
  'http://herbscience.shop/index.html',
  'https://www.herbscience.shop/index.html'
];

async function testRedirect(url) {
  return new Promise((resolve) => {
    const redirectChain = [];
    let currentUrl = url;
    let redirectCount = 0;
    const maxRedirects = 5;

    const followRedirects = (targetUrl) => {
      if (redirectCount >= maxRedirects) {
        resolve({
          originalUrl: url,
          status: 'TOO_MANY_REDIRECTS',
          redirectChain,
          redirectCount
        });
        return;
      }

      const urlObj = new URL(targetUrl);
      const isHttps = urlObj.protocol === 'https:';
      const client = isHttps ? https : http;

      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'HEAD',
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RedirectTest/1.0)'
        }
      };

      const req = client.request(options, (res) => {
        const statusCode = res.statusCode;
        const location = res.headers.location;

        redirectChain.push({
          url: targetUrl,
          statusCode,
          location
        });

        if (statusCode >= 300 && statusCode < 400 && location) {
          redirectCount++;
          const nextUrl = new URL(location, targetUrl).href;
          followRedirects(nextUrl);
        } else {
          resolve({
            originalUrl: url,
            finalUrl: targetUrl,
            status: statusCode >= 200 && statusCode < 300 ? 'SUCCESS' : 'ERROR',
            redirectChain,
            redirectCount,
            finalStatusCode: statusCode
          });
        }
      });

      req.on('error', (err) => {
        resolve({
          originalUrl: url,
          status: 'CONNECTION_ERROR',
          error: err.message,
          redirectChain: redirectChain.length > 0 ? redirectChain : [{ url: targetUrl, error: err.message }]
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          originalUrl: url,
          status: 'TIMEOUT',
          redirectChain: redirectChain.length > 0 ? redirectChain : [{ url: targetUrl, error: 'Timeout' }]
        });
      });

      req.end();
    };

    followRedirects(currentUrl);
  });
}

async function runTests() {
  console.log('🔧 测试修复后的重定向配置...\n');

  const results = [];
  const issues = [];

  for (const url of testUrls) {
    console.log(`Testing: ${url}`);
    const result = await testRedirect(url);
    results.push(result);

    if (result.redirectChain.length > 1) {
      console.log('  Redirect chain:');
      result.redirectChain.forEach((redirect, index) => {
        const isLast = index === result.redirectChain.length - 1;
        console.log(`    ${index + 1}. ${redirect.url} → ${redirect.statusCode}${isLast ? '' : ' → ' + redirect.location}`);
      });
    } else {
      console.log(`  Direct response: ${result.finalStatusCode || result.status}`);
    }

    // 分析问题
    const urlIssues = [];
    if (result.status === 'CONNECTION_ERROR') {
      urlIssues.push('Connection failed');
    } else if (result.status === 'TIMEOUT') {
      urlIssues.push('Request timeout');
    } else if (result.redirectCount > 2) {
      urlIssues.push(`Too many redirects (${result.redirectCount})`);
    } else if (result.finalStatusCode && result.finalStatusCode !== 200) {
      urlIssues.push(`Final status: ${result.finalStatusCode}`);
    }

    if (urlIssues.length > 0) {
      console.log(`  ⚠️  Issues: ${urlIssues.join(', ')}`);
      issues.push({ url, issues: urlIssues });
    } else {
      console.log('  ✅ Fixed!');
    }
    console.log();
  }

  // 生成修复报告
  console.log('\n📊 修复结果报告\n');
  console.log('=' .repeat(50));

  if (issues.length === 0) {
    console.log('🎉 所有重定向问题已修复！');
    console.log('\n✅ 建议的后续步骤:');
    console.log('1. 部署到生产环境');
    console.log('2. 在Google Search Console中重新提交sitemap');
    console.log('3. 使用URL检查工具验证问题URL');
    console.log('4. 请求重新编入索引');
  } else {
    console.log(`❌ 仍有 ${issues.length} 个问题需要解决:\n`);
    issues.forEach(issue => {
      console.log(`URL: ${issue.url}`);
      console.log(`问题: ${issue.issues.join(', ')}\n`);
    });
  }

  // 分析重定向效率
  console.log('\n🎯 重定向效率分析:');
  const avgRedirects = results.reduce((sum, r) => sum + (r.redirectCount || 0), 0) / results.length;
  console.log(`平均重定向次数: ${avgRedirects.toFixed(1)}`);
  
  const successfulRedirects = results.filter(r => r.status === 'SUCCESS');
  console.log(`成功率: ${((successfulRedirects.length / results.length) * 100).toFixed(1)}%`);

  return issues.length === 0;
}

if (require.main === module) {
  runTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(console.error);
}

module.exports = { runTests };
