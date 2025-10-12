#!/usr/bin/env node

/**
 * Google Search Console URL 提交工具
 * 用于手动提交特定URL到Google索引
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 需要提交的URL列表
const urlsToSubmit = [
  'https://herbscience.shop/about',
  'https://herbscience.shop/constitution-test',
  'https://herbscience.shop/herb-finder',
  'https://herbscience.shop/herbs/ginseng',
  'https://herbscience.shop/herbs/ginger',
  'https://herbscience.shop/herbs/turmeric',
  'https://herbscience.shop/blog',
  'https://herbscience.shop/knowledge-center'
];

// 检查环境变量
function checkEnvironmentVariables() {
  const requiredVars = [
    'GOOGLE_SEARCH_CONSOLE_API_KEY',
    'GOOGLE_SEARCH_CONSOLE_SITE_URL'
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ 缺少必要的环境变量:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error('\n请设置以下环境变量:');
    console.error('export GOOGLE_SEARCH_CONSOLE_API_KEY="your-api-key"');
    console.error('export GOOGLE_SEARCH_CONSOLE_SITE_URL="https://herbscience.shop/"');
    process.exit(1);
  }
}

// 提交URL到Google Search Console
async function submitUrlToGoogle(url) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      url: url,
      type: 'URL_UPDATED'
    });

    const options = {
      hostname: 'indexing.googleapis.com',
      port: 443,
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${process.env.GOOGLE_SEARCH_CONSOLE_API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ 成功提交: ${url}`);
          resolve({ success: true, url, statusCode: res.statusCode });
        } else {
          console.error(`❌ 提交失败: ${url} (状态码: ${res.statusCode})`);
          console.error(`   响应: ${data}`);
          reject({ success: false, url, statusCode: res.statusCode, response: data });
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ 请求错误: ${url}`, error.message);
      reject({ success: false, url, error: error.message });
    });

    req.write(postData);
    req.end();
  });
}

// 生成Google Search Console手动提交指令
function generateManualSubmissionInstructions() {
  console.log('\n📋 Google Search Console 手动提交指令:');
  console.log('=' .repeat(60));
  
  urlsToSubmit.forEach((url, index) => {
    console.log(`${index + 1}. 访问: ${url}`);
    console.log(`   提交方式: Google Search Console > URL检查 > 请求编入索引`);
    console.log('');
  });
  
  console.log('🔧 详细步骤:');
  console.log('1. 登录 Google Search Console (https://search.google.com/search-console)');
  console.log('2. 选择网站: herbscience.shop');
  console.log('3. 点击左侧菜单 "URL检查"');
  console.log('4. 在搜索框中输入要提交的URL');
  console.log('5. 点击 "请求编入索引" 按钮');
  console.log('6. 等待Google处理（通常需要几小时到几天）');
  console.log('');
  
  console.log('📊 监控索引状态:');
  console.log('- 在 "网页索引编制" 部分查看进度');
  console.log('- 检查 "已发现 - 尚未编入索引" 列表');
  console.log('- 关注 "编入索引" 数量变化');
}

// 生成sitemap重新提交指令
function generateSitemapResubmissionInstructions() {
  console.log('\n🗺️  Sitemap 重新提交指令:');
  console.log('=' .repeat(60));
  console.log('1. 登录 Google Search Console');
  console.log('2. 选择网站: herbscience.shop');
  console.log('3. 点击左侧菜单 "站点地图"');
  console.log('4. 删除现有的 sitemap.xml 条目');
  console.log('5. 重新添加: https://herbscience.shop/sitemap.xml');
  console.log('6. 点击 "提交"');
  console.log('');
  console.log('📈 预期结果:');
  console.log('- 发现的新页面数量应该增加');
  console.log('- lastmod 日期应该更新为最新');
  console.log('- 索引成功率应该提升');
}

// 主函数
async function main() {
  console.log('🚀 Google Search Console URL 提交工具');
  console.log('=' .repeat(60));
  
  // 检查环境变量
  checkEnvironmentVariables();
  
  console.log(`📝 准备提交 ${urlsToSubmit.length} 个URL到Google索引...`);
  console.log('');
  
  let successCount = 0;
  let failureCount = 0;
  
  // 批量提交URL
  for (const url of urlsToSubmit) {
    try {
      await submitUrlToGoogle(url);
      successCount++;
      
      // 避免请求过于频繁
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      failureCount++;
    }
  }
  
  console.log('\n📊 提交结果统计:');
  console.log(`✅ 成功: ${successCount} 个URL`);
  console.log(`❌ 失败: ${failureCount} 个URL`);
  
  // 生成手动提交指令
  generateManualSubmissionInstructions();
  
  // 生成sitemap重新提交指令
  generateSitemapResubmissionInstructions();
  
  console.log('\n💡 额外建议:');
  console.log('1. 确保网站内容质量高，有独特价值');
  console.log('2. 添加更多内部链接指向about页面');
  console.log('3. 在社交媒体分享about页面链接');
  console.log('4. 定期更新页面内容以保持新鲜度');
  console.log('5. 监控Core Web Vitals性能指标');
  
  console.log('\n⏰ 预计索引时间:');
  console.log('- 手动提交: 几小时到2-3天');
  console.log('- Sitemap更新: 1-7天');
  console.log('- 自然发现: 1-4周');
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  submitUrlToGoogle,
  generateManualSubmissionInstructions,
  generateSitemapResubmissionInstructions
};
