/**
 * 手动提交URL到Google Search Console
 * 
 * 使用方法:
 * node scripts/submit-to-google-manual.js
 * 
 * 注意: 这个脚本会生成需要手动提交的URL列表
 * Google不允许通过API自动提交索引请求 (需要手动在GSC操作)
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://herbscience.shop';

// 优先级URL列表
const priorityUrls = {
  '核心功能页面': [
    BASE_URL,
    `${BASE_URL}/zh`,
    `${BASE_URL}/constitution-test`,
    `${BASE_URL}/constitution-test/quick`,
    `${BASE_URL}/herb-finder`,
    `${BASE_URL}/dosage-calculator`,
    `${BASE_URL}/blog`,
  ],
  
  '热门草药页面': [
    `${BASE_URL}/herbs/turmeric`,
    `${BASE_URL}/herbs/ashwagandha`,
    `${BASE_URL}/herbs/ginger`,
    `${BASE_URL}/herbs/ginseng`,
    `${BASE_URL}/herbs/rhodiola`,
    `${BASE_URL}/herbs/cinnamon`,
  ],
  
  '热门博客文章': [
    `${BASE_URL}/blog/red-onion-vs-white-onion-health-benefits`,
    `${BASE_URL}/blog/ginger-tablets-chews-nausea-bloating-guide`,
    `${BASE_URL}/blog/ashwagandha-for-women-hormone-balance`,
    `${BASE_URL}/blog/turmeric-gut-relief-guide`,
  ],
  
  '其他重要页面': [
    `${BASE_URL}/about`,
    `${BASE_URL}/privacy`,
    `${BASE_URL}/zh/about`,
  ]
};

console.log('\n🎯 Google Search Console 手动提交指南\n');
console.log('=' .repeat(60));
console.log('\n📋 步骤说明:\n');
console.log('1. 打开 Google Search Console: https://search.google.com/search-console/');
console.log('2. 选择您的网站属性');
console.log('3. 在顶部搜索框输入下面的URL');
console.log('4. 点击"请求编入索引"按钮');
console.log('5. 等待确认消息\n');
console.log('⚠️  每天最多提交10个URL (Google限制)\n');
console.log('=' .repeat(60));

let totalUrls = 0;
let currentDay = 1;
let urlsToday = 0;

Object.entries(priorityUrls).forEach(([category, urls]) => {
  console.log(`\n📌 ${category}:\n`);
  
  urls.forEach((url, index) => {
    if (urlsToday >= 10) {
      currentDay++;
      urlsToday = 0;
      console.log(`\n--- 第${currentDay}天 (明天继续) ---\n`);
    }
    
    console.log(`${totalUrls + 1}. ${url}`);
    totalUrls++;
    urlsToday++;
  });
});

console.log('\n' + '='.repeat(60));
console.log(`\n📊 总计: ${totalUrls}个URL`);
console.log(`⏱️  预计需要: ${Math.ceil(totalUrls / 10)}天完成\n`);

// 生成文本文件供用户复制
const outputFile = path.join(__dirname, '..', 'urls-to-submit.txt');
let fileContent = '# HerbScience.shop - URLs需要提交到Google Search Console\n\n';
fileContent += `总计: ${totalUrls}个URL\n`;
fileContent += `建议: 每天提交10个URL\n\n`;

let dayCounter = 1;
let urlCounter = 0;

Object.entries(priorityUrls).forEach(([category, urls]) => {
  fileContent += `\n## ${category}\n\n`;
  urls.forEach(url => {
    if (urlCounter > 0 && urlCounter % 10 === 0) {
      dayCounter++;
      fileContent += `\n### --- 第${dayCounter}天 ---\n\n`;
    }
    fileContent += `${url}\n`;
    urlCounter++;
  });
});

fs.writeFileSync(outputFile, fileContent, 'utf8');

console.log(`✅ URL列表已保存到: ${outputFile}\n`);
console.log('💡 提示: 您可以打开这个文件,每天复制10个URL到GSC\n');

// 生成Chrome书签HTML (可以导入到浏览器)
const bookmarkFile = path.join(__dirname, '..', 'gsc-urls-bookmarks.html');
let bookmarkHtml = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n';
bookmarkHtml += '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n';
bookmarkHtml += '<TITLE>Bookmarks</TITLE>\n';
bookmarkHtml += '<H1>Bookmarks</H1>\n';
bookmarkHtml += '<DT><H3>HerbScience GSC 提交列表</H3>\n<DL><p>\n';

Object.entries(priorityUrls).forEach(([category, urls]) => {
  bookmarkHtml += `<DT><H3>${category}</H3>\n<DL><p>\n`;
  urls.forEach(url => {
    const gscUrl = `https://search.google.com/search-console/inspect?resource_id=sc-domain:herbscience.shop&url=${encodeURIComponent(url)}`;
    bookmarkHtml += `<DT><A HREF="${gscUrl}">${url}</A>\n`;
  });
  bookmarkHtml += '</DL><p>\n';
});

bookmarkHtml += '</DL><p>\n';

fs.writeFileSync(bookmarkFile, bookmarkHtml, 'utf8');

console.log(`🔖 Chrome书签已生成: ${bookmarkFile}`);
console.log('   导入方法: Chrome → 书签 → 导入书签和设置 → 选择文件\n');

console.log('🚀 现在就开始提交吧! Good luck!\n');

