const { createClient } = require('@sanity/client')

// Sanity客户端配置
const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  token: 'sk5Qin9vh6rLwgcgZCoBa8RRbaNBXZbSZD5rn31wquTd993G7sFb7LbUeqe8P3jyb3BpmRhWhEe69UrnzZVwaIVmfMdAWrAYYBpfSs29YhMHVJWKjA49XpTQtgKd5lq7IjXPx6VmkgbfuT66Qk2JNapwup3KtSy8jNmCANRZsYzLKcfniWS6', // 只读权限token
  apiVersion: '2024-01-01',
  useCdn: false
})

async function checkSanityHerbs() {
  try {
    console.log('🔍 检查Sanity CMS中的草药数据...')
    
    // 获取所有草药
    const herbs = await client.fetch('*[_type == "herb"]')
    
    console.log(`📊 草药总数: ${herbs.length}`)
    
    // 按状态分组
    const publishedHerbs = herbs.filter(h => h.status === 'published')
    const draftHerbs = herbs.filter(h => h.status === 'draft')
    
    console.log(`✅ 已发布: ${publishedHerbs.length}`)
    console.log(`📝 草稿: ${draftHerbs.length}`)
    
    // 按分类分组
    const categoryStats = {}
    herbs.forEach(herb => {
      const category = herb.category || '未分类'
      categoryStats[category] = (categoryStats[category] || 0) + 1
    })
    
    console.log('\n🏷️  按分类统计:')
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`)
    })
    
    // 显示前10个草药
    console.log('\n🌿 前10个草药:')
    herbs.slice(0, 10).forEach((herb, index) => {
      console.log(`  ${index + 1}. ${herb.title} (${herb.chineseName}) - ${herb.status}`)
    })
    
    // 检查是否有重复
    const titles = herbs.map(h => h.title).filter(Boolean)
    const chineseNames = herbs.map(h => h.chineseName).filter(Boolean)
    
    const duplicateTitles = titles.filter((title, index) => titles.indexOf(title) !== index)
    const duplicateChineseNames = chineseNames.filter((name, index) => chineseNames.indexOf(name) !== index)
    
    if (duplicateTitles.length > 0) {
      console.log('\n⚠️  发现重复的英文名称:')
      duplicateTitles.forEach(title => console.log(`  ${title}`))
    }
    
    if (duplicateChineseNames.length > 0) {
      console.log('\n⚠️  发现重复的中文名称:')
      duplicateChineseNames.forEach(name => console.log(`  ${name}`))
    }
    
    if (duplicateTitles.length === 0 && duplicateChineseNames.length === 0) {
      console.log('\n✅ 没有发现重复数据')
    }
    
  } catch (error) {
    console.error('❌ 检查失败:', error.message)
  }
}

checkSanityHerbs()
