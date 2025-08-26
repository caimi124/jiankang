require('dotenv').config()
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '13rzzwgz',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN || 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp',
  apiVersion: '2024-01-01',
  useCdn: false
})

console.log('🔧 使用配置:')
console.log(`Project ID: ${client.config().projectId}`)
console.log(`Dataset: ${client.config().dataset}`)
console.log(`Token: ${client.config().token ? '***已配置***' : '❌未配置'}`)
console.log('')

async function checkHerbs() {
  try {
    console.log('🔍 检查 Sanity 中的草药数据...\n')
    
    // 1. 检查总数
    const total = await client.fetch('count(*[_type == "herb"])')
    console.log(`📊 总草药数量: ${total}`)
    
    if (total === 0) {
      console.log('❌ Sanity中没有草药数据！需要重新迁移。')
      return
    }
    
    // 2. 检查最近的几个草药
    const herbs = await client.fetch(`
      *[_type == "herb"] | order(_createdAt desc) [0...10] {
        _id,
        title,
        "slug": slug.current,
        _createdAt,
        chineseName
      }
    `)
    
    console.log('\n📋 最近的草药记录:')
    herbs.forEach((herb, i) => {
      console.log(`${i+1}. ${herb.title} (${herb.chineseName})`)
      console.log(`   Slug: ${herb.slug}`)
      console.log(`   URL: /herbs/${herb.slug}`)
      console.log(`   创建时间: ${new Date(herb._createdAt).toLocaleString('zh-CN')}`)
      console.log('')
    })
    
    // 3. 检查常见的草药slug
    const commonSlugs = ['turmeric', 'ginger', 'ginseng', 'chamomile', 'echinacea']
    console.log('🔍 检查常见草药slug是否存在:')
    for (const slug of commonSlugs) {
      const herb = await client.fetch('*[_type == "herb" && slug.current == $slug][0]', { slug })
      console.log(`${slug}: ${herb ? '✅ 存在' : '❌ 不存在'}`)
    }
    
    // 4. 检查API返回的数据格式
    console.log('\n🔍 检查API数据格式 (模拟 /api/herbs/sanity):')
    const apiData = await client.fetch(`
      *[_type == "herb"] | order(_createdAt desc) [0...3] {
        _id,
        title,
        "slug": slug.current,
        chineseName,
        latinName,
        featuredImage,
        gallery
      }
    `)
    
    console.log('API返回数据样例:')
    apiData.forEach(herb => {
      console.log(`- ${herb.title} (${herb.chineseName})`)
      console.log(`  slug: "${herb.slug}"`)
      console.log(`  期待的英文slug: "${herb.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')}"`)
      console.log('')
    })
    
    // 5. 测试具体页面访问
    console.log('🧪 测试具体页面访问:')
    const testSlugs = ['turmeric', 'myrrh', 'lemon-balm']
    for (const slug of testSlugs) {
      const herb = await client.fetch(`
        *[_type == "herb" && slug.current == $slug][0] {
          _id,
          title,
          "slug": slug.current,
          description,
          modernApplications
        }
      `, { slug })
      
      if (herb) {
        console.log(`✅ ${slug} - 可访问`)
        console.log(`   标题: ${herb.title}`)
        console.log(`   描述: ${(herb.description || herb.modernApplications || '').substring(0, 50)}...`)
      } else {
        console.log(`❌ ${slug} - 404错误`)
      }
    }
    
  } catch (error) {
    console.error('❌ 检查失败:', error.message)
    if (error.message.includes('Insufficient permissions')) {
      console.log('\n💡 提示: 请检查 SANITY_API_TOKEN 是否有读取权限')
    }
  }
}

checkHerbs()
