/**
 * 批量提交所有页面到 IndexNow
 * 用于初次设置或大规模更新后
 * 
 * 使用方法:
 * node scripts/submit-all-pages-indexnow.js
 */

require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const path = require('path')

const INDEXNOW_API_KEY = process.env.INDEXNOW_API_KEY
const SITE_URL = 'https://herbscience.shop'

if (!INDEXNOW_API_KEY) {
  console.error('❌ 错误: 未找到 INDEXNOW_API_KEY')
  console.log('请先运行: node scripts/setup-indexnow.js')
  process.exit(1)
}

// 提交 URL 到 IndexNow
async function submitToIndexNow(urls) {
  const payload = {
    host: 'herbscience.shop',
    key: INDEXNOW_API_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_API_KEY}.txt`,
    urlList: urls,
  }

  try {
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok || response.status === 200 || response.status === 202) {
      return { success: true, count: urls.length }
    } else {
      const text = await response.text()
      return { success: false, error: `Status ${response.status}: ${text}` }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// 收集所有需要提交的 URL
function collectAllUrls() {
  const urls = []

  // 1. 主要页面
  const mainPages = [
    '/',
    '/constitution-test',
    '/herb-finder',
    '/blog',
    '/about',
    '/ingredient-checker',
  ]
  urls.push(...mainPages.map(page => `${SITE_URL}${page}`))

  // 2. 博客文章（从 Sanity 或本地数据获取）
  const blogSlugs = [
    'onion-for-digestion-bloating',
    'onion-for-cholesterol-heart-health',
    'pickled-onion-benefits',
    'how-much-turmeric-per-day',
    '10-serious-side-effects-of-turmeric',
    'turmeric-gut-relief-guide',
    'why-some-herbs-work-for-you-and-others-dont',
    'herb-drug-interaction-safety',
  ]
  urls.push(...blogSlugs.map(slug => `${SITE_URL}/blog/${slug}`))

  // 3. 草药页面
  const herbSlugs = [
    'rhodiola-crenulata',
    'ginseng',
    'turmeric',
    'ashwagandha',
    'ginger',
    'echinacea',
    'valerian',
    'chamomile',
    'lavender',
    'peppermint',
  ]
  urls.push(...herbSlugs.map(slug => `${SITE_URL}/herbs/${slug}`))

  return urls
}

// 批量提交（每批最多100个URL）
async function submitInBatches(urls, batchSize = 100) {
  let totalSuccess = 0
  let totalFailed = 0

  console.log(`📤 准备提交 ${urls.length} 个 URL 到 IndexNow...\n`)

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize)
    const batchNumber = Math.floor(i / batchSize) + 1
    const totalBatches = Math.ceil(urls.length / batchSize)

    console.log(`📦 批次 ${batchNumber}/${totalBatches}: 提交 ${batch.length} 个 URL...`)

    const result = await submitToIndexNow(batch)

    if (result.success) {
      totalSuccess += result.count
      console.log(`✅ 成功提交 ${result.count} 个 URL`)
    } else {
      totalFailed += batch.length
      console.error(`❌ 提交失败: ${result.error}`)
    }

    // 批次之间等待1秒，避免请求过快
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  return { totalSuccess, totalFailed }
}

// 主函数
async function main() {
  console.log('🚀 IndexNow 批量提交工具\n')
  console.log(`🔑 API Key: ${INDEXNOW_API_KEY}`)
  console.log(`🌐 网站: ${SITE_URL}\n`)

  // 收集所有 URL
  const urls = collectAllUrls()
  console.log(`📋 收集到 ${urls.length} 个页面\n`)

  // 显示前5个URL作为示例
  console.log('示例 URL:')
  urls.slice(0, 5).forEach(url => console.log(`  - ${url}`))
  if (urls.length > 5) {
    console.log(`  ... 还有 ${urls.length - 5} 个\n`)
  }

  // 批量提交
  const startTime = Date.now()
  const { totalSuccess, totalFailed } = await submitInBatches(urls)
  const duration = ((Date.now() - startTime) / 1000).toFixed(2)

  // 结果总结
  console.log('\n' + '='.repeat(50))
  console.log('📊 提交结果总结')
  console.log('='.repeat(50))
  console.log(`✅ 成功: ${totalSuccess} 个`)
  console.log(`❌ 失败: ${totalFailed} 个`)
  console.log(`⏱️  耗时: ${duration} 秒`)
  console.log('='.repeat(50))

  if (totalSuccess > 0) {
    console.log('\n✅ 提交完成！搜索引擎将在 24-48 小时内开始索引这些页面。')
    console.log('\n📋 后续步骤:')
    console.log('1. 在 Bing Webmaster Tools 中检查索引状态')
    console.log('2. 每次发布新内容时，使用 POST /api/indexnow 自动通知')
    console.log('3. 定期运行此脚本以确保所有页面都被索引')
  }

  if (totalFailed > 0) {
    console.log('\n⚠️  部分 URL 提交失败，请检查:')
    console.log('1. API Key 是否正确')
    console.log('2. Key 验证文件是否可访问')
    console.log('3. 网络连接是否正常')
  }
}

// 运行脚本
main().catch(error => {
  console.error('❌ 脚本执行失败:', error)
  process.exit(1)
})

