require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .slice(0, 96)
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN 未设置')
    process.exit(1)
  }

  console.log('🌿 批量补图开始...')
  const herbs = await client.fetch(`*[_type == "herb"]{ _id, title, chineseName, "slug": slug.current, featuredImage }`)
  let uploaded = 0, skipped = 0, failed = 0

  for (const herb of herbs) {
    try {
      if (herb.featuredImage?.asset?._ref) { skipped++; continue }
      const slug = herb.slug || slugify(herb.title || herb.chineseName)
      const candidates = [
        path.join(process.cwd(), 'public', 'herbs', `${slug}.jpg`),
        path.join(process.cwd(), 'public', 'herbs', `${slug}.png`),
        path.join(process.cwd(), 'public', 'herbs', `${slug}.webp`),
      ]
      const filePath = candidates.find((p) => fs.existsSync(p))
      if (!filePath) { skipped++; continue }

      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: path.basename(filePath),
      })
      await client.patch(herb._id)
        .set({ featuredImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
        .commit()
      console.log(`✅ 补图: ${slug}`)
      uploaded++
      await new Promise(r => setTimeout(r, 200))
    } catch (e) {
      console.error('❌ 失败:', herb.slug || herb._id, e.message)
      failed++
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 批量补图完成')
  console.log(`✅ 已上传: ${uploaded}`)
  console.log(`⏭️ 跳过: ${skipped}`)
  console.log(`❌ 失败: ${failed}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━')
}

if (require.main === module) {
  main().catch((e) => { console.error(e); process.exit(1) })
}


