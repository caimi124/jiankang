/**
 * 验证Sanity中的草药数据
 */

const sanityClient = require('@sanity/client').createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp',
  useCdn: false
})

const slugsToCheck = [
  'rhodiola-crenulata',
  'rhodiola',
  'ginseng',
  'turmeric',
  'ginger',
  'ashwagandha'
]

async function checkHerbs() {
  console.log('\n=================================================')
  console.log('  检查Sanity草药数据')
  console.log('=================================================\n')

  try {
    // 1. 检查所有草药
    const allHerbs = await sanityClient.fetch(
      `*[_type == "herb"] {_id, title, "slug": slug.current}`
    )
    
    console.log(`✅ 找到 ${allHerbs.length} 种草药:\n`)
    allHerbs.forEach((herb, i) => {
      console.log(`${i + 1}. ${herb.title}`)
      console.log(`   Slug: ${herb.slug}`)
      console.log(`   ID: ${herb._id}\n`)
    })

    console.log('=================================================')
    console.log('  检查特定草药是否存在')
    console.log('=================================================\n')

    const results = []
    for (const slug of slugsToCheck) {
      const herb = await sanityClient.fetch(
        `*[_type == "herb" && slug.current == $slug][0] {
          _id,
          title,
          "slug": slug.current,
          latinName,
          _createdAt
        }`,
        { slug }
      )

      if (herb) {
        console.log(`✅ ${slug}`)
        console.log(`   标题: ${herb.title}`)
        console.log(`   拉丁名: ${herb.latinName || 'N/A'}`)
        results.push({ slug, found: true, title: herb.title })
      } else {
        console.log(`❌ ${slug} - 未找到`)
        results.push({ slug, found: false })
      }
      console.log('')
    }

    console.log('=================================================')
    console.log('  总结')
    console.log('=================================================\n')

    const found = results.filter(r => r.found).length
    const missing = results.filter(r => !r.found).length

    console.log(`✅ 找到: ${found}/${slugsToCheck.length}`)
    console.log(`❌ 缺失: ${missing}/${slugsToCheck.length}\n`)

    if (missing > 0) {
      console.log('缺失的草药:')
      results.filter(r => !r.found).forEach(r => {
        console.log(`  - ${r.slug}`)
      })
    }

  } catch (error) {
    console.error('❌ 错误:', error.message)
  }
}

checkHerbs().catch(console.error)

