#!/usr/bin/env node

/**
 * 🔍 SEO检查工具 - acaboost.com
 * 用于诊断和监控网站SEO状态
 */

const https = require('https');
const http = require('http');

const DOMAIN = 'acaboost.com';
const URLS_TO_CHECK = [
  'https://www.acaboost.com/',
  'https://www.acaboost.com/en',
  'https://www.acaboost.com/zh',
  'https://acaboost.com/',
  'http://www.acaboost.com/',
  'http://acaboost.com/'
];

console.log('🔍 SEO状态检查器启动...\n');

// 检查单个URL
function checkUrl(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const protocol = url.startsWith('https') ? https : http;
    
    console.log(`🔗 检查: ${url}`);
    
    const req = protocol.get(url, (res) => {
      const { statusCode, headers } = res;
      const responseTime = Date.now() - startTime;
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const result = {
          url,
          statusCode,
          responseTime,
          contentLength: data.length,
          headers: {
            contentType: headers['content-type'],
            server: headers['server'],
            location: headers['location'],
            cacheControl: headers['cache-control']
          },
          seoChecks: analyzeSEO(data, url)
        };
        
        printResult(result);
        resolve(result);
      });
    });
    
    req.on('error', (error) => {
      console.log(`❌ 错误: ${url} - ${error.message}\n`);
      resolve({
        url,
        error: error.message,
        statusCode: 0
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      console.log(`⏱️ 超时: ${url}\n`);
      resolve({
        url,
        error: 'Timeout',
        statusCode: 0
      });
    });
  });
}

// 分析SEO元素
function analyzeSEO(html, url) {
  const checks = {
    hasTitle: /<title[^>]*>([^<]+)<\/title>/i.test(html),
    hasMetaDescription: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i.test(html),
    hasMetaKeywords: /<meta[^>]*name=["']keywords["'][^>]*>/i.test(html),
    hasH1: /<h1[^>]*>/i.test(html),
    hasMetaRobots: /<meta[^>]*name=["']robots["'][^>]*>/i.test(html),
    hasCanonical: /<link[^>]*rel=["']canonical["'][^>]*>/i.test(html),
    hasOgTags: /<meta[^>]*property=["']og:/i.test(html),
    hasHreflang: /<link[^>]*hreflang=/i.test(html),
    hasStructuredData: /application\/ld\+json/i.test(html)
  };
  
  // 提取标题
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  checks.title = titleMatch ? titleMatch[1].trim() : null;
  
  // 提取描述
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*/i);
  checks.description = descMatch ? descMatch[1].trim() : null;
  
  return checks;
}

// 打印结果
function printResult(result) {
  if (result.error) {
    console.log(`❌ 失败: ${result.statusCode === 0 ? result.error : `HTTP ${result.statusCode}`}`);
  } else {
    const statusIcon = result.statusCode === 200 ? '✅' : 
                     result.statusCode >= 300 && result.statusCode < 400 ? '🔄' : '❌';
    console.log(`${statusIcon} HTTP ${result.statusCode} (${result.responseTime}ms)`);
    
    if (result.headers.location) {
      console.log(`   🔄 重定向到: ${result.headers.location}`);
    }
    
    if (result.seoChecks) {
      console.log(`   📄 标题: ${result.seoChecks.title || '❌ 缺少'}`);
      console.log(`   📝 描述: ${result.seoChecks.hasMetaDescription ? '✅' : '❌'}`);
      console.log(`   🤖 Robots: ${result.seoChecks.hasMetaRobots ? '✅' : '❌'}`);
      console.log(`   🔗 Canonical: ${result.seoChecks.hasCanonical ? '✅' : '❌'}`);
      console.log(`   🌍 Hreflang: ${result.seoChecks.hasHreflang ? '✅' : '❌'}`);
      console.log(`   📊 结构化数据: ${result.seoChecks.hasStructuredData ? '✅' : '❌'}`);
    }
  }
  console.log('');
}

// 检查robots.txt
function checkRobotsTxt() {
  return new Promise((resolve) => {
    const url = `https://www.${DOMAIN}/robots.txt`;
    console.log(`🤖 检查 robots.txt: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✅ robots.txt 状态: HTTP ${res.statusCode}`);
        if (res.statusCode === 200) {
          console.log('📄 robots.txt 内容预览:');
          console.log(data.split('\n').slice(0, 10).join('\n'));
          console.log(data.length > 500 ? '...(内容较长，已截断)' : '');
        }
        console.log('');
        resolve(data);
      });
    }).on('error', (error) => {
      console.log(`❌ robots.txt 错误: ${error.message}\n`);
      resolve(null);
    });
  });
}

// 检查sitemap.xml
function checkSitemap() {
  return new Promise((resolve) => {
    const url = `https://www.${DOMAIN}/sitemap.xml`;
    console.log(`🗺️ 检查 sitemap.xml: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✅ sitemap.xml 状态: HTTP ${res.statusCode}`);
        if (res.statusCode === 200) {
          const urlCount = (data.match(/<url>/g) || []).length;
          console.log(`📄 发现 ${urlCount} 个URL条目`);
        }
        console.log('');
        resolve(data);
      });
    }).on('error', (error) => {
      console.log(`❌ sitemap.xml 错误: ${error.message}\n`);
      resolve(null);
    });
  });
}

// 主函数
async function main() {
  console.log(`🌐 正在检查域名: ${DOMAIN}`);
  console.log(`📅 检查时间: ${new Date().toLocaleString()}\n`);
  
  // 检查所有URL
  const results = [];
  for (const url of URLS_TO_CHECK) {
    const result = await checkUrl(url);
    results.push(result);
  }
  
  // 检查SEO文件
  await checkRobotsTxt();
  await checkSitemap();
  
  // 生成总结报告
  console.log('📊 检查总结:');
  console.log('==========================================');
  
  const successful = results.filter(r => r.statusCode === 200).length;
  const redirects = results.filter(r => r.statusCode >= 300 && r.statusCode < 400).length;
  const errors = results.filter(r => r.statusCode >= 400 || r.error).length;
  
  console.log(`✅ 成功访问: ${successful}/${results.length}`);
  console.log(`🔄 重定向: ${redirects}/${results.length}`);
  console.log(`❌ 错误: ${errors}/${results.length}`);
  
  if (errors > 0) {
    console.log('\n🚨 需要立即修复的问题:');
    results.filter(r => r.statusCode >= 400 || r.error).forEach(r => {
      console.log(`- ${r.url}: ${r.error || `HTTP ${r.statusCode}`}`);
    });
  }
  
  console.log('\n📝 建议操作:');
  if (errors > 0) {
    console.log('1. 🔥 立即修复404错误，确保网站可访问');
  }
  console.log('2. 📋 设置统一的域名重定向策略');
  console.log('3. 🗺️ 提交sitemap到Google Search Console');
  console.log('4. 📊 监控Google Search Console索引状态');
  
  console.log('\n✨ 检查完成！');
}

// 执行检查
main().catch(error => {
  console.error('❌ 检查过程中发生错误:', error);
  process.exit(1);
});
