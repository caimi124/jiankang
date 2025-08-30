#!/usr/bin/env node

/**
 * 🌿 草药路由测试脚本
 * 测试详情页面是否能正常访问
 */

const { HERBS_DATABASE } = require('../lib/herbs-data-complete.js')

console.log('🧪 测试草药详情页面路由...\n')

// 生成前10个草药的slug
const testHerbs = HERBS_DATABASE.slice(0, 10).map(herb => {
  const slug = herb.english_name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  
  return {
    name: herb.english_name,
    chinese_name: herb.chinese_name,
    slug: slug,
    url: `http://localhost:3000/herbs/${slug}`
  }
})

console.log('📋 可用的草药详情页面:')
console.log('==========================================')
testHerbs.forEach((herb, index) => {
  console.log(`${index + 1}. ${herb.name} (${herb.chinese_name})`)
  console.log(`   路由: /herbs/${herb.slug}`)
  console.log(`   完整URL: ${herb.url}`)
  console.log('')
})

console.log('\n🚀 测试步骤:')
console.log('1. 确保开发服务器运行: npm run dev')
console.log('2. 访问上述任一URL测试详情页面')
console.log('3. 如果仍然404，请检查环境变量配置')

console.log('\n📝 配置Sanity CMS:')
console.log('1. 复制 .env.example 到 .env.local')
console.log('2. 访问 https://sanity.io 创建项目')
console.log('3. 填写项目ID和API Token')
console.log('4. 重启开发服务器')

process.exit(0)
