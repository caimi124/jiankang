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

async function loadStudies() {
  if (process.env.NOTION_TOKEN && process.env.NOTION_STUDIES_DB_ID) {
    const notion = new Notion({ auth: process.env.NOTION_TOKEN })
    const dbId = process.env.NOTION_STUDIES_DB_ID
    const items = []
    let cursor
    do {
      const resp = await notion.databases.query({ database_id: dbId, start_cursor: cursor })
      for (const page of resp.results) {
        const props = page.properties || {}
        const getText = (p) => (p?.rich_text || p?.title || []).map(t=>t.plain_text).join(' ').trim()
        items.push({
          herbSlug: getText(props.HerbSlug || props.slug || props.Herb || {}),
          title: getText(props.Title || props.title || {}),
          summary: getText(props.Summary || props.summary || {}),
          link: (props.Link?.url) || '',
          evidenceLevel: getText(props.Evidence || props.evidenceLevel || {}),
        })
      }
      cursor = resp.has_more ? resp.next_cursor : undefined
    } while (cursor)
    return items
  }
  try {
    const raw = fs.readFileSync('notion-studies-export.json', 'utf8')
    return JSON.parse(raw)
  } catch {
    return [
      { herbSlug: 'ginkgo-leaf', title: 'Ginkgo and cognitive function', summary: 'Improved memory scores in elderly subjects', link: 'https://example.com/study', evidenceLevel: 'Moderate' }
    ]
  }
}

async function resolveHerbIdBySlug(slug) {
  const doc = await client.fetch('*[_type=="herb" && slug.current==$slug][0]{ _id }', { slug })
  return doc?._id || null
}

async function migrateStudies() {
  const items = await loadStudies()
  let created=0, updated=0, failed=0

  for (const item of items) {
    try {
      const herbId = await resolveHerbIdBySlug(item.herbSlug)
      if (!herbId) throw new Error('Herb not found for slug: ' + item.herbSlug)

      const doc = { _type: 'study', herb: { _type: 'reference', _ref: herbId }, title: item.title, summary: item.summary, link: item.link, evidenceLevel: item.evidenceLevel || 'Moderate' }
      const existing = await client.fetch('*[_type=="study" && title==$t && references($hid)][0]{ _id }', { t: item.title, hid: herbId })
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
      console.error('Study migrate error:', e.message)
    }
  }
  console.log(`Studies -> created:${created} updated:${updated} failed:${failed}`)
}

if (require.main === module) {
  migrateStudies().catch(e=>{ console.error(e); process.exit(1) })
}
