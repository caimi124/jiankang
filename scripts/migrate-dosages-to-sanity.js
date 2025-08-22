require('dotenv').config({ path: '.env.local' })
const { Client } = require('@notionhq/client')
const { createClient } = require('@sanity/client')

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const DOSAGE_DATABASE_ID = process.env.NOTION_DOSAGE_DB_ID

function getPlainText(rich = []) { return rich.map(r => r.plain_text).join('').trim() }

async function fetchAll() {
  const res = []
  let cursor
  while (true) {
    const resp = await notion.databases.query({ database_id: DOSAGE_DATABASE_ID, start_cursor: cursor })
    res.push(...resp.results)
    if (!resp.has_more) break
    cursor = resp.next_cursor
  }
  return res
}

async function migrate() {
  if (!DOSAGE_DATABASE_ID) { console.error('❌ 缺少 NOTION_DOSAGE_DB_ID'); process.exit(1) }
  console.log('🌿 开始迁移 Notion Dosages 到 Sanity...')
  const items = await fetchAll()
  let created=0, updated=0, failed=0

  for (const page of items) {
    try {
      const p = page.properties
      const herbSlug = p.Herb?.rich_text?.[0]?.plain_text?.trim() || ''
      const form = getPlainText(p.Form?.rich_text) || 'extract'
      const dosage = getPlainText(p.Dosage?.rich_text)
      const usage = getPlainText(p.Usage?.rich_text)
      const notes = getPlainText(p.Notes?.rich_text)

      let herbRefId
      if (herbSlug) {
        const herb = await sanity.fetch('*[_type=="herb" && slug.current==$s][0]{_id}', { s: herbSlug })
        herbRefId = herb?._id
      }

      const doc = {
        _type: 'dosage',
        form, dosage, usage, notes,
        ...(herbRefId ? { herb: { _type: 'reference', _ref: herbRefId } } : {})
      }

      const existing = await sanity.fetch('*[_type=="dosage" && form==$f && dosage==$d && usage==$u][0]{_id}', { f: form, d: dosage, u: usage })
      if (existing) { await sanity.patch(existing._id).set(doc).commit(); updated++; console.log(`🔄 更新 Dosage: ${form}`) }
      else { await sanity.create(doc); created++; console.log(`✅ 创建 Dosage: ${form}`) }
      await new Promise(r=>setTimeout(r,150))
    } catch(e) {
      failed++; console.error('❌ 迁移Dosage失败:', e.message)
    }
  }
  console.log(`\n📊 Dosage 迁移完成: 新建 ${created}, 更新 ${updated}, 失败 ${failed}`)
}

if (require.main === module) migrate().catch(e=>{ console.error(e); process.exit(1) })


