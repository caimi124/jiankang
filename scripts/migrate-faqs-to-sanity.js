require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const fs = require('fs');
const { Client: Notion } = require('@notionhq/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

// 示例：请替换为从 Notion API 读取的数据
async function loadFaqs() {
  // 优先使用 Notion API
  if (process.env.NOTION_TOKEN && process.env.NOTION_FAQ_DB_ID) {
    const notion = new Notion({ auth: process.env.NOTION_TOKEN })
    const dbId = process.env.NOTION_FAQ_DB_ID
    const results = []
    let cursor
    do {
      const resp = await notion.databases.query({ database_id: dbId, start_cursor: cursor })
      for (const page of resp.results) {
        const props = page.properties || {}
        const getText = (p) => (p?.rich_text || p?.title || []).map(t=>t.plain_text).join(' ').trim()
        const herbSlug = getText(props.HerbSlug || props.slug || props.Herb || {})
        const question = getText(props.Question || props.question || props.Q || {})
        const answer = getText(props.Answer || props.answer || props.A || {})
        if (question) results.push({ herbSlug, question, answer })
      }
      cursor = resp.has_more ? resp.next_cursor : undefined
    } while (cursor)
    return results
  }
  try {
    const raw = fs.readFileSync('notion-faq-export.json', 'utf8')
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    // fallback 示例数据
    return [
      { herbSlug: 'ginkgo-leaf', question: 'Is Ginkgo safe during pregnancy?', answer: 'Consult a healthcare provider; generally not recommended.' }
    ]
  }
}

async function resolveHerbIdBySlug(slug) {
  const doc = await client.fetch('*[_type=="herb" && slug.current==$slug][0]{ _id }', { slug })
  return doc?._id || null
}

async function migrateFaqs() {
  const faqs = await loadFaqs()
  let created=0, updated=0, failed=0

  for (const item of faqs) {
    try {
      const herbId = await resolveHerbIdBySlug(item.herbSlug)
      if (!herbId) throw new Error('Herb not found for slug: ' + item.herbSlug)

      const doc = { _type: 'faq', question: item.question, answer: item.answer, herb: { _type: 'reference', _ref: herbId } }
      const existing = await client.fetch('*[_type=="faq" && question==$q && references($hid)][0]{ _id }', { q: item.question, hid: herbId })
      if (existing?._id) {
        await client.patch(existing._id).set(doc).commit()
        updated++
      } else {
        await client.create(doc)
        created++
      }
      await new Promise(r=>setTimeout(r,150))
    } catch(e) {
      failed++
      console.error('FAQ migrate error:', e.message)
    }
  }
  console.log(`FAQs -> created:${created} updated:${updated} failed:${failed}`)
}

if (require.main === module) {
  migrateFaqs().catch(e=>{ console.error(e); process.exit(1) })
}
