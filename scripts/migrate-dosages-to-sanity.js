require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')
const { Client } = require('@notionhq/client')

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const NOTION_DOSAGE_DB = process.env.NOTION_DOSAGE_DB

async function fetchAllPages(databaseId) {
  const pages = []
  let cursor
  do {
    const res = await notion.databases.query({ database_id: databaseId, start_cursor: cursor })
    pages.push(...res.results)
    cursor = res.has_more ? res.next_cursor : undefined
  } while (cursor)
  return pages
}

function pickText(prop) {
  if (!prop) return ''
  const rich = prop.rich_text || prop.title || []
  return rich.map(t => t.plain_text).join(' ').trim()
}

async function main() {
  if (!NOTION_DOSAGE_DB) { console.error('❌ 缺少 NOTION_DOSAGE_DB'); process.exit(1) }
  console.log('📥 从 Notion 拉取 Dosages...')
  const rows = await fetchAllPages(NOTION_DOSAGE_DB)
  console.log(`📋 共 ${rows.length} 条`)

  let created = 0, updated = 0, failed = 0
  for (const row of rows) {
    try {
      const p = row.properties
      const herbSlug = pickText(p.Herb)
      const form = pickText(p.Form) || 'extract'
      const dosage = pickText(p.Dosage)
      const usage = pickText(p.Usage)
      const notes = pickText(p.Notes)
      if (!herbSlug || !dosage) { continue }

      const herb = await sanity.fetch(`*[_type=="herb" && slug.current==$s][0]{_id}`, { s: herbSlug })
      if (!herb?._id) { continue }

      const exists = await sanity.fetch(`*[_type=="dosage" && herb._ref==$h && form==$f && dosage==$d][0]{_id}`, { h: herb._id, f: form, d: dosage })
      const doc = { _type: 'dosage', herb: { _type: 'reference', _ref: herb._id }, form, dosage, usage, notes }
      if (exists?._id) {
        await sanity.patch(exists._id).set(doc).commit()
        updated++
      } else {
        await sanity.create(doc)
        created++
      }
      await new Promise(r => setTimeout(r, 150))
    } catch (e) {
      console.error('❌ 迁移失败:', e.message)
      failed++
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 Dosages 迁移完成')
  console.log(`✅ 新建: ${created}`)
  console.log(`🔄 更新: ${updated}`)
  console.log(`❌ 失败: ${failed}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━')
}

if (require.main === module) {
  main().catch(e => { console.error(e); process.exit(1) })
}


