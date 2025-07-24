#!/usr/bin/env node

// 手动URL提交脚本
const urls = [
  'https://www.herbscience.shop/',
  'https://www.herbscience.shop/zh',
  'https://www.herbscience.shop/herbs/ginseng',
  'https://www.herbscience.shop/herbs/turmeric', 
  'https://www.herbscience.shop/constitution-test',
  'https://www.herbscience.shop/herb-finder',
  'https://www.herbscience.shop/blog'
];

console.log('🚀 开始提交URL到搜索引擎...');

// IndexNow API (Bing)
async function submitToIndexNow() {
  const indexNowData = {
    host: 'www.herbscience.shop',
    key: 'generate-your-key',
    keyLocation: 'https://www.herbscience.shop/indexnow-key.txt',
    urlList: urls
  };
  
  console.log('📤 准备提交到IndexNow API (Bing)');
  console.log('💡 提示：需要设置IndexNow密钥才能自动提交');
}

// 手动提交指引
console.log('\n📋 手动提交清单：');
console.log('1. Google Search Console: 使用URL检查工具逐个提交');
console.log('2. Bing Webmaster Tools: 提交sitemap'); 
console.log('3. 等待24-48小时查看收录状态');

submitToIndexNow();
