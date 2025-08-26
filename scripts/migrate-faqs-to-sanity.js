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
const NOTION_FAQ_DB = process.env.NOTION_FAQ_DB

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
  if (!NOTION_FAQ_DB) { console.error('❌ 缺少 NOTION_FAQ_DB'); process.exit(1) }
  console.log('📥 从 Notion 拉取 FAQs...')
  const rows = await fetchAllPages(NOTION_FAQ_DB)
  console.log(`📋 共 ${rows.length} 条`)

  let created = 0, updated = 0, failed = 0
  for (const row of rows) {
    try {
      const p = row.properties
      const question = pickText(p.Question)
      const answer = pickText(p.Answer)
      const herbSlug = (p.Herb && p.Herb.rich_text?.[0]?.plain_text) || ''
      if (!question || !answer) { continue }

      // 关联 herb
      let herbRef
      if (herbSlug) {
        const herb = await sanity.fetch(`*[_type=="herb" && slug.current==$s][0]{_id}`, { s: herbSlug })
        if (herb?._id) herbRef = { _type: 'reference', _ref: herb._id }
      }

      // upsert by question+herb
      const existing = await sanity.fetch(`*[_type=="faq" && question==$q && defined(herb) && herb._ref==$h][0]{_id}`, { q: question, h: herbRef?._ref })
      const doc = { _type: 'faq', question, answer, ...(herbRef ? { herb: herbRef } : {}) }
      if (existing?._id) {
        await sanity.patch(existing._id).set(doc).commit()
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
  console.log('📊 FAQ 迁移完成')
  console.log(`✅ 新建: ${created}`)
  console.log(`🔄 更新: ${updated}`)
  console.log(`❌ 失败: ${failed}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━')
}

if (require.main === module) {
  main().catch(e => { console.error(e); process.exit(1) })
}


