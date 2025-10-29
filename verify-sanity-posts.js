/**
 * 验证Sanity中的博客文章数据
 */

const sanityClient = require('@sanity/client').createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp',
  useCdn: false
})

const slugsToCheck = [
  'red-onion-vs-white-onion-health-benefits',
  'ginger-tablets-chews-nausea-bloating-guide',
  'ginger-tea-menstrual-cramps-natural-relief',
  'turmeric-gut-relief-guide',
  'ashwagandha-for-women-hormone-balance',
  'rhodiola-smart-way-daily-rituals',
  'rhodiola-tea-recipes-energy-focus',
  'why-rhodiola-works-body-type'
]

async function checkBlogPosts() {
  console.log('\n=================================================')
  console.log('  检查Sanity博客文章数据')
  console.log('=================================================\n')
  console.log(`项目ID: 13rzzwgz`)
  console.log(`数据集: production\n`)

  try {
    // 1. 检查所有博客文章
    const allPosts = await sanityClient.fetch(
      `*[_type == "post"] {_id, title, "slug": slug.current}`
    )
    
    console.log(`✅ 找到 ${allPosts.length} 篇博客文章:\n`)
    allPosts.forEach((post, i) => {
      console.log(`${i + 1}. ${post.title}`)
      console.log(`   Slug: ${post.slug}`)
      console.log(`   ID: ${post._id}\n`)
    })

    console.log('=================================================')
    console.log('  检查特定文章是否存在')
    console.log('=================================================\n')

    const results = []
    for (const slug of slugsToCheck) {
      const post = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          "slug": slug.current,
          excerpt,
          _createdAt
        }`,
        { slug }
      )

      if (post) {
        console.log(`✅ ${slug}`)
        console.log(`   标题: ${post.title}`)
        console.log(`   创建时间: ${new Date(post._createdAt).toLocaleString('zh-CN')}`)
        results.push({ slug, found: true, title: post.title })
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
      console.log('缺失的文章:')
      results.filter(r => !r.found).forEach(r => {
        console.log(`  - ${r.slug}`)
      })
      console.log('\n⚠️ 这些文章需要添加到Sanity CMS中')
      console.log('   或者在代码中添加本地备用数据\n')
    } else {
      console.log('🎉 所有文章都已在Sanity中!\n')
    }

  } catch (error) {
    console.error('❌ 错误:', error.message)
    if (error.response) {
      console.error('响应数据:', error.response)
    }
  }
}

checkBlogPosts().catch(console.error)

