#!/usr/bin/env node

/**
 * SEO健康检查脚本
 * 自动检测网站的SEO配置状态
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 配置
const SITE_URL = 'https://www.herbscience.shop';
const SITE_DOMAIN = 'herbscience.shop';

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  log(`\n${'='.repeat(50)}`, 'bright');
  log(title, 'bright');
  log(`${'='.repeat(50)}`, 'bright');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// HTTP请求工具
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    const req = protocol.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => req.destroy());
    req.end();
  });
}

// 检查robots.txt
async function checkRobotsTxt() {
  logHeader('检查 robots.txt');
  
  try {
    const robotsUrl = `${SITE_URL}/robots.txt`;
    const response = await makeRequest(robotsUrl);
    
    if (response.status === 200) {
      logSuccess('robots.txt 可访问');
      
      // 检查内容
      const content = response.data;
      if (content.includes(SITE_DOMAIN)) {
        logSuccess('robots.txt 域名配置正确');
      } else {
        logError('robots.txt 域名配置错误');
      }
      
      if (content.includes('Sitemap:')) {
        logSuccess('robots.txt 包含站点地图引用');
      } else {
        logWarning('robots.txt 缺少站点地图引用');
      }
      
      console.log('\nrobots.txt 内容预览:');
      console.log(content.split('\n').slice(0, 10).join('\n'));
      if (content.split('\n').length > 10) {
        console.log('...');
      }
    } else {
      logError(`robots.txt 返回状态码: ${response.status}`);
    }
  } catch (error) {
    logError(`robots.txt 检查失败: ${error.message}`);
  }
}

// 检查sitemap.xml
async function checkSitemap() {
  logHeader('检查 sitemap.xml');
  
  try {
    const sitemapUrl = `${SITE_URL}/sitemap.xml`;
    const response = await makeRequest(sitemapUrl);
    
    if (response.status === 200) {
      logSuccess('sitemap.xml 可访问');
      
      // 检查内容
      const content = response.data;
      if (content.includes(SITE_DOMAIN)) {
        logSuccess('sitemap.xml 域名配置正确');
      } else {
        logError('sitemap.xml 域名配置错误');
      }
      
      // 统计URL数量
      const urlCount = (content.match(/<url>/g) || []).length;
      logInfo(`sitemap.xml 包含 ${urlCount} 个URL`);
      
      // 检查关键页面
      const keyPages = ['/', '/constitution-test', '/herb-finder', '/herbs/ginseng'];
      keyPages.forEach(page => {
        if (content.includes(`${SITE_URL}${page}`)) {
          logSuccess(`关键页面已包含: ${page}`);
        } else {
          logWarning(`关键页面缺失: ${page}`);
        }
      });
      
    } else {
      logError(`sitemap.xml 返回状态码: ${response.status}`);
    }
  } catch (error) {
    logError(`sitemap.xml 检查失败: ${error.message}`);
  }
}

// 检查页面SEO
async function checkPageSEO(pagePath) {
  try {
    const pageUrl = `${SITE_URL}${pagePath}`;
    const response = await makeRequest(pageUrl);
    
    if (response.status === 200) {
      const content = response.data;
      
      // 检查title标签
      const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch) {
        const title = titleMatch[1].trim();
        if (title.length > 10 && title.length < 60) {
          logSuccess(`${pagePath}: title 长度合适 (${title.length}字符)`);
        } else {
          logWarning(`${pagePath}: title 长度不合适 (${title.length}字符)`);
        }
        logInfo(`  Title: ${title}`);
      } else {
        logError(`${pagePath}: 缺少 title 标签`);
      }
      
      // 检查meta description
      const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
      if (descMatch) {
        const desc = descMatch[1].trim();
        if (desc.length > 50 && desc.length < 160) {
          logSuccess(`${pagePath}: meta description 长度合适 (${desc.length}字符)`);
        } else {
          logWarning(`${pagePath}: meta description 长度不合适 (${desc.length}字符)`);
        }
      } else {
        logWarning(`${pagePath}: 缺少 meta description`);
      }
      
      // 检查结构化数据
      if (content.includes('application/ld+json')) {
        logSuccess(`${pagePath}: 包含结构化数据`);
      } else {
        logWarning(`${pagePath}: 缺少结构化数据`);
      }
      
      // 检查OpenGraph
      if (content.includes('og:title') || content.includes('og:description')) {
        logSuccess(`${pagePath}: 包含OpenGraph标签`);
      } else {
        logWarning(`${pagePath}: 缺少OpenGraph标签`);
      }
      
    } else {
      logError(`${pagePath}: 返回状态码 ${response.status}`);
    }
  } catch (error) {
    logError(`${pagePath}: 检查失败 - ${error.message}`);
  }
}

// 检查页面性能
async function checkPagePerformance(pagePath) {
  try {
    const pageUrl = `${SITE_URL}${pagePath}`;
    const startTime = Date.now();
    const response = await makeRequest(pageUrl);
    const loadTime = Date.now() - startTime;
    
    if (response.status === 200) {
      if (loadTime < 1000) {
        logSuccess(`${pagePath}: 加载时间优秀 (${loadTime}ms)`);
      } else if (loadTime < 3000) {
        logWarning(`${pagePath}: 加载时间一般 (${loadTime}ms)`);
      } else {
        logError(`${pagePath}: 加载时间过慢 (${loadTime}ms)`);
      }
    }
  } catch (error) {
    logError(`${pagePath}: 性能检查失败 - ${error.message}`);
  }
}

// 检查SSL证书
async function checkSSL() {
  logHeader('检查 SSL 证书');
  
  try {
    const response = await makeRequest(SITE_URL, {
      method: 'HEAD'
    });
    
    if (response.status === 200 || response.status === 301 || response.status === 302) {
      logSuccess('HTTPS 连接正常');
      
      // 检查重定向
      if (response.status === 301 || response.status === 302) {
        const location = response.headers.location;
        if (location && location.startsWith('https://')) {
          logSuccess('HTTP 到 HTTPS 重定向正常');
        } else {
          logWarning('重定向目标不是 HTTPS');
        }
      }
    }
  } catch (error) {
    logError(`SSL 检查失败: ${error.message}`);
  }
}

// 检查移动端友好性
async function checkMobileFriendly(pagePath) {
  try {
    const pageUrl = `${SITE_URL}${pagePath}`;
    const response = await makeRequest(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      }
    });
    
    if (response.status === 200) {
      const content = response.data;
      
      // 检查viewport meta标签
      if (content.includes('viewport')) {
        logSuccess(`${pagePath}: 包含移动端 viewport 配置`);
      } else {
        logWarning(`${pagePath}: 缺少移动端 viewport 配置`);
      }
      
      // 检查响应式设计
      if (content.includes('media=') || content.includes('@media')) {
        logSuccess(`${pagePath}: 包含响应式设计`);
      } else {
        logWarning(`${pagePath}: 可能缺少响应式设计`);
      }
    }
  } catch (error) {
    logError(`${pagePath}: 移动端检查失败 - ${error.message}`);
  }
}

// 主检查函数
async function runSEOHealthCheck() {
  logHeader('HerbScience.shop SEO 健康检查');
  logInfo(`检查时间: ${new Date().toLocaleString()}`);
  logInfo(`目标网站: ${SITE_URL}`);
  
  // 基础检查
  await checkSSL();
  await checkRobotsTxt();
  await checkSitemap();
  
  // 页面SEO检查
  logHeader('检查页面 SEO');
  const keyPages = ['/', '/constitution-test', '/herb-finder', '/herbs/ginseng', '/herbs/ginger'];
  
  for (const page of keyPages) {
    await checkPageSEO(page);
    await checkPagePerformance(page);
    await checkMobileFriendly(page);
    console.log(''); // 空行分隔
  }
  
  // 总结报告
  logHeader('SEO 检查总结');
  logInfo('请根据上述检查结果进行相应优化');
  logInfo('建议优先解决标记为 ❌ 的问题');
  logInfo('标记为 ⚠️ 的问题建议在时间允许时优化');
  
  logInfo('\n下一步行动:');
  logInfo('1. 设置 Google Search Console');
  logInfo('2. 提交站点地图');
  logInfo('3. 请求页面索引');
  logInfo('4. 监控索引状态');
}

// 运行检查
if (require.main === module) {
  runSEOHealthCheck().catch(error => {
    logError(`检查过程中发生错误: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  runSEOHealthCheck,
  checkRobotsTxt,
  checkSitemap,
  checkPageSEO,
  checkSSL
};
