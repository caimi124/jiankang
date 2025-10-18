#!/usr/bin/env node

/**
 * 回滚到动态路由 - 删除简化的静态页面
 * 保留: turmeric (详细SEO优化), ashwagandha (详细内容)
 */

const fs = require('fs');
const path = require('path');

// 需要删除的简化页面（让它们走动态路由）
const PAGES_TO_DELETE = [
  'astragalus', 'bacopa', 'black-pepper', 'cayenne', 'chamomile',
  'cinnamon',  // 删除简化版，走动态路由
  'clove', 'cordyceps', 'echinacea', 'elderberry', 'fenugreek',
  'ginseng', 'gotu-kola', 'holy-basil', 'kava', 'lemon-balm',
  'licorice-root', 'lions-mane', 'maca-root', 'milk-thistle',
  'nettle', 'onion', 'passionflower', 'peppermint', 'pumpkin-seeds',
  'reishi', 'rhodiola', 'saw-palmetto', 'st-johns-wort', 'valerian-root'
];

const herbsDir = path.join(__dirname, '../app/herbs');

console.log('🔄 回滚到动态路由...\n');
console.log(`📋 将删除 ${PAGES_TO_DELETE.length} 个简化的静态页面`);
console.log('✅ 保留: turmeric (2800+字SEO内容), ashwagandha (详细优化)\n');

let deletedCount = 0;
let errorCount = 0;

PAGES_TO_DELETE.forEach((herbSlug) => {
  const herbDir = path.join(herbsDir, herbSlug);
  
  if (fs.existsSync(herbDir)) {
    try {
      fs.rmSync(herbDir, { recursive: true, force: true });
      console.log(`✅ 已删除: app/herbs/${herbSlug}/`);
      deletedCount++;
    } catch (error) {
      console.error(`❌ 删除失败: app/herbs/${herbSlug}/`, error.message);
      errorCount++;
    }
  } else {
    console.log(`⚠️  不存在: app/herbs/${herbSlug}/`);
  }
});

console.log(`\n📊 统计:`);
console.log(`   ✅ 已删除: ${deletedCount} 个简化页面`);
console.log(`   ❌ 失败: ${errorCount} 个`);
console.log(`   ✅ 保留: 2 个优化页面 (turmeric, ashwagandha)`);

console.log(`\n🔧 现在的结构:`);
console.log(`   - turmeric: 静态页面 (详细SEO内容)`);
console.log(`   - ashwagandha: 静态页面 (详细内容)`);
console.log(`   - 其他草药: 动态路由 [slug]/HerbDetailClient.tsx`);

console.log(`\n✨ 动态路由的优势:`);
console.log(`   ✅ 6个完整Tab (Overview, Benefits, Safety, Science, Traditional, FAQ)`);
console.log(`   ✅ 完整内容 (用户评论, 相关工具, CTA区域)`);
console.log(`   ✅ 从数据库读取内容，易于维护`);
console.log(`   ✅ 统一的用户体验`);

console.log(`\n🔗 下一步:`);
console.log(`   1. 确认删除无误`);
console.log(`   2. 提交到Git`);
console.log(`   3. 部署后测试 https://herbscience.shop/herbs/cinnamon`);

