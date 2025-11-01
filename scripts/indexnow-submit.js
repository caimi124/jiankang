/**
 * IndexNow 自动提交脚本
 * 
 * 使用方法:
 * node scripts/indexnow-submit.js
 * 
 * 或添加到部署流程:
 * npm run deploy (会自动通知搜索引擎)
 */

const https = require('https');

// ⚠️ 这是示例key,已创建在 public/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.txt
const INDEXNOW_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
const HOST = 'herbscience.shop';

// 🎯 重点提交未被索引的页面
const priorityUrls = [
  // 首页
  'https://herbscience.shop/',
  'https://herbscience.shop/zh',
  
  // ⚠️ 未被索引的页面（优先！）
  'https://herbscience.shop/herbs/elderberry',
  'https://herbscience.shop/herbs/rosae-caninae-fructus',
  'https://herbscience.shop/herbs/foeniculi-vulgaris-fructus',
  
  // 核心功能页面
  'https://herbscience.shop/constitution-test',
  'https://herbscience.shop/constitution-test/quick',
  'https://herbscience.shop/herb-finder',
  'https://herbscience.shop/dosage-calculator',
  'https://herbscience.shop/blog',
  
  // 热门草药
  'https://herbscience.shop/herbs/turmeric',
  'https://herbscience.shop/herbs/ashwagandha',
  'https://herbscience.shop/herbs/ginger',
  'https://herbscience.shop/herbs/ginseng',
  'https://herbscience.shop/herbs/rhodiola',
  
  // 热门博客
  'https://herbscience.shop/blog/red-onion-vs-white-onion-health-benefits',
  'https://herbscience.shop/blog/ginger-tablets-chews-nausea-bloating-guide',
  'https://herbscience.shop/blog/ashwagandha-for-women-hormone-balance',
  'https://herbscience.shop/blog/turmeric-gut-relief-guide',
  
  // 其他重要页面
  'https://herbscience.shop/about',
];

function submitToIndexNow(urlList) {
  const data = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urlList
  });

  const options = {
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  console.log('🚀 开始提交到IndexNow API...\n');
  console.log(`📊 提交 ${urlList.length} 个URL到以下搜索引擎:`);
  console.log('   • Bing');
  console.log('   • Yandex');
  console.log('   • Naver');
  console.log('   • Seznam.cz\n');

  const req = https.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    
    if (res.statusCode === 200) {
      console.log('\n✅ 提交成功!');
      console.log('🎉 搜索引擎已收到通知，将在24小时内重新抓取这些页面。\n');
    } else if (res.statusCode === 202) {
      console.log('\n✅ 提交已接受!');
      console.log('⏳ 请求已加入队列，将很快处理。\n');
    } else {
      console.log('\n⚠️  提交状态:', res.statusCode);
    }
    
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error('\n❌ 提交失败:', error.message);
    console.log('\n💡 可能的原因:');
    console.log('   1. 网络连接问题');
    console.log('   2. key文件未正确创建');
    console.log('   3. URL格式不正确\n');
  });

  req.write(data);
  req.end();
}

// 显示提交的URL列表
console.log('\n📋 将要提交的URL列表:\n');
priorityUrls.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});
console.log('\n' + '='.repeat(60) + '\n');

// 执行提交
submitToIndexNow(priorityUrls);

// 显示下一步操作
setTimeout(() => {
  console.log('\n📝 下一步操作:\n');
  console.log('1. 验证key文件可访问:');
  console.log(`   访问: https://${HOST}/${INDEXNOW_KEY}.txt`);
  console.log('   应该显示: ' + INDEXNOW_KEY);
  console.log('\n2. 每次更新内容后运行此脚本:');
  console.log('   npm run indexnow');
  console.log('\n3. 添加到部署流程 (package.json):');
  console.log('   "deploy": "git push && npm run indexnow"\n');
}, 2000);

