#!/usr/bin/env node

/**
 * 脚本：重新提交修复后的URL到Google Search Console
 * 用途：手动提交之前出现索引问题的URL
 */

// 之前有问题的URL (现已修复为正确的slug)
const FIXED_URLS = [
  'https://herbscience.shop/herbs/rose-hip',      // 原: rosae-caninae-fructus
  'https://herbscience.shop/herbs/chamomile-flower', // 原: matricariae-flos
  'https://herbscience.shop/herb-finder/rose-hip',
  'https://herbscience.shop/herb-finder/chamomile-flower',
]

// 新增的高优先级URL
const PRIORITY_URLS = [
  'https://herbscience.shop/herbs/ginseng',
  'https://herbscience.shop/herbs/turmeric',
  'https://herbscience.shop/herbs/ginger',
  'https://herbscience.shop/herbs/cinnamon',
  'https://herbscience.shop/herbs/clove',
  'https://herbscience.shop/herb-finder',
  'https://herbscience.shop/constitution-test',
  'https://herbscience.shop/knowledge-center',
]

const ALL_URLS = [...FIXED_URLS, ...PRIORITY_URLS]

console.log('🔧 Google Search Console URL提交指南')
console.log('=' .repeat(50))
console.log()
console.log('已修复的问题URL (需要重新提交):')
FIXED_URLS.forEach((url, i) => console.log(`${i + 1}. ${url}`))
console.log()
console.log('优先提交的URL:')
PRIORITY_URLS.forEach((url, i) => console.log(`${i + 1}. ${url}`))
console.log()

console.log('📋 手动提交步骤:')
console.log('1. 访问 https://search.google.com/search-console/')
console.log('2. 选择 herbscience.shop 属性')
console.log('3. 使用 "URL检查" 工具')
console.log('4. 逐一输入上述URL并点击"请求编入索引"')
console.log()

console.log('🗺️ Sitemap提交:')
console.log('- 主站点地图: https://herbscience.shop/sitemap.xml')
console.log('- 详细站点地图: https://herbscience.shop/sitemap-0.xml')
console.log()

console.log('⚠️  注意事项:')
console.log('- Google每日URL提交限制约100-200个')
console.log('- 优先提交修复后的问题URL')
console.log('- 预计1-3天内完成重新索引')
console.log('- 监控GSC中的"覆盖率"报告查看进展')
console.log()

// 生成GSC批量URL检查的格式
console.log('💾 批量检查URL列表 (可复制粘贴):')
console.log('-'.repeat(50))
ALL_URLS.forEach(url => console.log(url))
console.log('-'.repeat(50))

process.exit(0)