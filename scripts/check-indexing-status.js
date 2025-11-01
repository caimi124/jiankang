/**
 * 检查网站索引状态
 * 
 * 使用方法:
 * node scripts/check-indexing-status.js
 * 
 * 功能:
 * - 检查哪些页面已被Google索引
 * - 生成详细报告
 * - 显示进度
 */

const https = require('https');
const { URL } = require('url');

const BASE_URL = 'https://herbscience.shop';

// 需要检查的URL列表
const urlsToCheck = [
  // 核心页面
  '',
  '/zh',
  '/constitution-test',
  '/constitution-test/quick',
  '/herb-finder',
  '/dosage-calculator',
  '/blog',
  '/about',
  
  // 草药页面
  '/herbs/turmeric',
  '/herbs/ashwagandha',
  '/herbs/ginger',
  '/herbs/ginseng',
  '/herbs/rhodiola',
  '/herbs/cinnamon',
  '/herbs/peppermint',
  '/herbs/chamomile',
  '/herbs/echinacea',
  '/herbs/valerian-root',
  
  // 博客文章
  '/blog/red-onion-vs-white-onion-health-benefits',
  '/blog/ginger-tablets-chews-nausea-bloating-guide',
  '/blog/ashwagandha-for-women-hormone-balance',
  '/blog/turmeric-gut-relief-guide',
];

console.log('\n🔍 开始检查网站索引状态...\n');
console.log('=' .repeat(60));

// 使用site:搜索检查是否被索引
function checkGoogleIndex(url) {
  return new Promise((resolve, reject) => {
    const fullUrl = url.startsWith('http') ? url : BASE_URL + url;
    const searchQuery = `site:${fullUrl}`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    
    // 注意: 由于Google的反爬虫机制,这个方法不太可靠
    // 建议手动在Google搜索: site:herbscience.shop/your-page
    
    console.log(`检查: ${fullUrl}`);
    
    // 简化版: 只输出检查命令,不实际请求
    resolve({
      url: fullUrl,
      checkCommand: `site:${fullUrl}`,
      status: 'unknown' // 需要手动检查
    });
  });
}

async function runIndexCheck() {
  const results = [];
  
  console.log('\n📋 生成检查清单...\n');
  
  for (const url of urlsToCheck) {
    const result = await checkGoogleIndex(url);
    results.push(result);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 检查报告:\n');
  
  console.log('⚠️  由于Google的限制,需要手动检查索引状态\n');
  console.log('手动检查方法:\n');
  console.log('1. 打开 Google.com');
  console.log('2. 在搜索框输入下面的命令');
  console.log('3. 如果有结果 = 已索引 ✅');
  console.log('4. 如果无结果 = 未索引 ❌\n');
  console.log('=' .repeat(60));
  
  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.url}`);
    console.log(`   Google搜索: ${result.checkCommand}`);
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('\n💡 快速检查方法:\n');
  console.log('在Google搜索框输入: site:herbscience.shop');
  console.log('会显示所有已索引的页面\n');
  
  console.log('📈 监控指标:\n');
  console.log('- 目标: 57个页面全部索引');
  console.log('- 当前: 需要手动检查 (使用上面的命令)');
  console.log('- 预期: 4周内达到40+页面索引\n');
  
  // 生成详细报告文件
  const fs = require('fs');
  const path = require('path');
  
  const reportFile = path.join(__dirname, '..', 'indexing-status-report.md');
  let reportContent = `# HerbScience.shop 索引状态检查报告\n\n`;
  reportContent += `**检查时间:** ${new Date().toLocaleString('zh-CN')}\n\n`;
  reportContent += `**总URL数:** ${urlsToCheck.length}\n\n`;
  reportContent += `## 检查清单\n\n`;
  
  results.forEach((result, index) => {
    reportContent += `### ${index + 1}. ${result.url}\n`;
    reportContent += `- **Google搜索命令:** \`${result.checkCommand}\`\n`;
    reportContent += `- **状态:** [ ] 已索引  [ ] 未索引  [ ] 未检查\n\n`;
  });
  
  reportContent += `\n## 如何检查\n\n`;
  reportContent += `1. 复制上面的Google搜索命令\n`;
  reportContent += `2. 在Google.com搜索框粘贴\n`;
  reportContent += `3. 如果有结果 → 勾选"已索引"\n`;
  reportContent += `4. 如果无结果 → 勾选"未索引"\n\n`;
  reportContent += `## 快速总览检查\n\n`;
  reportContent += `在Google搜索: \`site:herbscience.shop\`\n\n`;
  reportContent += `这会显示所有已被索引的页面数量。\n\n`;
  reportContent += `**目标:** 57个页面\n`;
  reportContent += `**当前:** (需要手动检查)\n`;
  
  fs.writeFileSync(reportFile, reportContent, 'utf8');
  
  console.log(`📄 详细报告已保存到: ${reportFile}\n`);
  console.log('   您可以在这个文件中手动记录检查结果\n');
  
  // 生成每日监控表格
  const trackingFile = path.join(__dirname, '..', 'daily-indexing-tracker.md');
  let trackingContent = `# 每日索引状态追踪表\n\n`;
  trackingContent += `记录每天的索引进度,监控增长趋势。\n\n`;
  trackingContent += `## 如何使用\n\n`;
  trackingContent += `1. 每天在Google搜索: \`site:herbscience.shop\`\n`;
  trackingContent += `2. 记录显示的结果数量\n`;
  trackingContent += `3. 填入下表\n\n`;
  trackingContent += `| 日期 | 索引页面数 | 新增 | 备注 |\n`;
  trackingContent += `|------|----------|------|------|\n`;
  
  // 生成30天的追踪表格
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    trackingContent += `| ${dateStr} |  |  |  |\n`;
  }
  
  trackingContent += `\n## 目标\n\n`;
  trackingContent += `- **第1周:** 5-10个页面\n`;
  trackingContent += `- **第2周:** 10-20个页面\n`;
  trackingContent += `- **第3周:** 20-40个页面\n`;
  trackingContent += `- **第4周:** 40-57个页面 (全部)\n`;
  
  fs.writeFileSync(trackingFile, trackingContent, 'utf8');
  
  console.log(`📊 每日追踪表已生成: ${trackingFile}\n`);
  console.log('   每天更新这个表格,监控索引进度\n');
  
  console.log('✅ 检查完成!\n');
}

// 运行检查
runIndexCheck().catch(console.error);

