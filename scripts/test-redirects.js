#!/usr/bin/env node

/**
 * 全面测试网站重定向问题诊断脚本
 * 检查可能导致Google未编入索引的重定向问题
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// 测试的URL列表
const testUrls = [
  'http://herbscience.shop/',
  'https://herbscience.shop/',
  'http://www.herbscience.shop/',
  'https://www.herbscience.shop/',
  'https://herbscience.shop/index.html',
  'http://herbscience.shop/index.html',
  'https://www.herbscience.shop/index.html',
  'https://herbscience.shop/blog',
  'https://herbscience.shop/constitution-test',
  'https://herbscience.shop/herb-finder'
];

class RedirectChecker {
  constructor() {
    this.results = [];
    this.issues = [];
  }

  async checkUrl(url, maxRedirects = 10) {
    return new Promise((resolve) => {
      const redirectChain = [];
      let currentUrl = url;
      let redirectCount = 0;

      const checkSingleUrl = (targetUrl) => {
        if (redirectCount >= maxRedirects) {
          resolve({
            originalUrl: url,
            finalUrl: targetUrl,
            redirectChain,
            status: 'TOO_MANY_REDIRECTS',
            redirectCount,
            issue: 'Redirect loop detected'
          });
          return;
        }

        const urlObj = new URL(targetUrl);
        const isHttps = urlObj.protocol === 'https:';
        const client = isHttps ? https : http;
        const port = urlObj.port || (isHttps ? 443 : 80);

        const options = {
          hostname: urlObj.hostname,
          port: port,
          path: urlObj.pathname + urlObj.search,
          method: 'HEAD',
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; RedirectChecker/1.0; +https://herbscience.shop/)'
          }
        };

        const req = client.request(options, (res) => {
          const statusCode = res.statusCode;
          const location = res.headers.location;

          redirectChain.push({
            url: targetUrl,
            statusCode,
            location,
            headers: {
              'content-type': res.headers['content-type'],
              'cache-control': res.headers['cache-control'],
              'x-robots-tag': res.headers['x-robots-tag']
            }
          });

          if (statusCode >= 300 && statusCode < 400 && location) {
            // 处理重定向
            redirectCount++;
            const nextUrl = new URL(location, targetUrl).href;
            checkSingleUrl(nextUrl);
          } else {
            // 最终响应
            resolve({
              originalUrl: url,
              finalUrl: targetUrl,
              redirectChain,
              status: statusCode >= 200 && statusCode < 300 ? 'SUCCESS' : 'ERROR',
              redirectCount,
              finalStatusCode: statusCode
            });
          }
        });

        req.on('error', (err) => {
          resolve({
            originalUrl: url,
            finalUrl: targetUrl,
            redirectChain,
            status: 'ERROR',
            redirectCount,
            error: err.message
          });
        });

        req.on('timeout', () => {
          req.destroy();
          resolve({
            originalUrl: url,
            finalUrl: targetUrl,
            redirectChain,
            status: 'TIMEOUT',
            redirectCount,
            error: 'Request timeout'
          });
        });

        req.end();
      };

      checkSingleUrl(currentUrl);
    });
  }

  analyzeRedirects(result) {
    const issues = [];

    // 检查重定向次数
    if (result.redirectCount > 3) {
      issues.push(`Too many redirects (${result.redirectCount})`);
    }

    // 检查重定向循环
    const urlsSeen = new Set();
    for (const redirect of result.redirectChain) {
      if (urlsSeen.has(redirect.url)) {
        issues.push('Redirect loop detected');
        break;
      }
      urlsSeen.add(redirect.url);
    }

    // 检查HTTP->HTTPS->HTTP循环
    let hasHttp = false;
    let hasHttps = false;
    for (const redirect of result.redirectChain) {
      if (redirect.url.startsWith('http://')) hasHttp = true;
      if (redirect.url.startsWith('https://')) hasHttps = true;
    }
    if (hasHttp && hasHttps && result.redirectCount > 1) {
      issues.push('Mixed HTTP/HTTPS redirects');
    }

    // 检查www子域名重定向
    let hasWww = false;
    let hasNonWww = false;
    for (const redirect of result.redirectChain) {
      const url = new URL(redirect.url);
      if (url.hostname.startsWith('www.')) hasWww = true;
      else hasNonWww = true;
    }
    if (hasWww && hasNonWww && result.redirectCount > 1) {
      issues.push('www subdomain redirect chain');
    }

    // 检查最终状态码
    if (result.finalStatusCode !== 200) {
      issues.push(`Final status code: ${result.finalStatusCode}`);
    }

    return issues;
  }

  async runTests() {
    console.log('🔍 开始全面重定向诊断...\n');

    for (const url of testUrls) {
      console.log(`Testing: ${url}`);
      const result = await this.checkUrl(url);
      const issues = this.analyzeRedirects(result);

      this.results.push(result);
      if (issues.length > 0) {
        this.issues.push({ url, issues });
      }

      // 显示重定向链
      if (result.redirectChain.length > 1) {
        console.log('  Redirect chain:');
        result.redirectChain.forEach((redirect, index) => {
          const isLast = index === result.redirectChain.length - 1;
          console.log(`    ${index + 1}. ${redirect.url} → ${redirect.statusCode}${isLast ? '' : ' → ' + redirect.location}`);
        });
      } else {
        console.log(`  Direct response: ${result.finalStatusCode || result.status}`);
      }

      if (issues.length > 0) {
        console.log(`  ⚠️  Issues: ${issues.join(', ')}`);
      } else {
        console.log('  ✅ No issues detected');
      }
      console.log();
    }

    this.generateReport();
  }

  generateReport() {
    console.log('\n📊 重定向问题诊断报告\n');
    console.log('=' .repeat(50));

    if (this.issues.length === 0) {
      console.log('✅ 未发现重定向问题');
      return;
    }

    console.log(`❌ 发现 ${this.issues.length} 个问题URL:\n`);

    this.issues.forEach(issue => {
      console.log(`URL: ${issue.url}`);
      console.log(`问题: ${issue.issues.join(', ')}\n`);
    });

    // 分析常见问题模式
    console.log('🔧 建议的修复方案:\n');

    const allIssues = this.issues.flatMap(issue => issue.issues);
    const issueCount = {};
    allIssues.forEach(issue => {
      issueCount[issue] = (issueCount[issue] || 0) + 1;
    });

    if (issueCount['Redirect loop detected']) {
      console.log('1. 修复重定向循环:');
      console.log('   - 检查 vercel.json 和 middleware.ts 中的重定向配置');
      console.log('   - 确保没有相互冲突的重定向规则');
      console.log();
    }

    if (issueCount['Too many redirects']) {
      console.log('2. 减少重定向次数:');
      console.log('   - 直接重定向到最终URL，避免多次跳转');
      console.log('   - 整合 vercel.json 和 next.config.js 中的重定向配置');
      console.log();
    }

    if (issueCount['Mixed HTTP/HTTPS redirects']) {
      console.log('3. 修复HTTP/HTTPS混合重定向:');
      console.log('   - 确保所有重定向都直接指向HTTPS版本');
      console.log('   - 添加HSTS头强制HTTPS');
      console.log();
    }

    if (issueCount['www subdomain redirect chain']) {
      console.log('4. 优化www子域名重定向:');
      console.log('   - 在DNS级别直接重定向www到非www');
      console.log('   - 或在服务器级别统一重定向策略');
      console.log();
    }

    console.log('5. Google Search Console 建议:');
    console.log('   - 在GSC中提交正确的sitemap.xml');
    console.log('   - 使用"网址检查"工具检查具体页面');
    console.log('   - 检查robots.txt是否正确');
    console.log('   - 确保canonical标签指向正确的URL');
  }
}

async function main() {
  const checker = new RedirectChecker();
  await checker.runTests();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = RedirectChecker;