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

const FAQ_DATABASE_ID = process.env.NOTION_FAQ_DB_ID // 请在环境变量中配置

function getPlainText(richText = []) {
  return richText.map(rt => rt.plain_text).join('').trim()
}

async function fetchAllNotionFAQs() {
  const results = []
  let cursor
  while (true) {
    const resp = await notion.databases.query({ database_id: FAQ_DATABASE_ID, start_cursor: cursor })
    results.push(...resp.results)
    if (!resp.has_more) break
    cursor = resp.next_cursor
  }
  return results
}

async function migrate() {
  if (!FAQ_DATABASE_ID) {
    console.error('❌ 缺少 NOTION_FAQ_DB_ID 环境变量')
    process.exit(1)
  }
  console.log('🌿 开始迁移 Notion FAQs 到 Sanity...')
  const items = await fetchAllNotionFAQs()
  let created = 0, updated = 0, failed = 0

  for (const page of items) {
    try {
      const props = page.properties || {}
      const question = getPlainText(props.Question?.title)
      const answer = getPlainText(props.Answer?.rich_text)
      const herbSlug = props.Herb?.rich_text?.[0]?.plain_text?.trim() || ''

      let herbRefId = undefined
      if (herbSlug) {
        const herb = await sanity.fetch('*[_type=="herb" && slug.current==$slug][0]{_id}', { slug: herbSlug })
        herbRefId = herb?._id
      }

      const doc = {
        _type: 'faq',
        question,
        answer,
        ...(herbRefId ? { herb: { _type: 'reference', _ref: herbRefId } } : {}),
        language: 'en'
      }

      const existing = await sanity.fetch('*[_type=="faq" && question==$q && answer==$a][0]{_id}', { q: question, a: answer })
      if (existing) {
        await sanity.patch(existing._id).set(doc).commit()
        updated++
        console.log(`🔄 更新 FAQ: ${question}`)
      } else {
        await sanity.create(doc)
        created++
        console.log(`✅ 创建 FAQ: ${question}`)
      }
      await new Promise(r => setTimeout(r, 150))
    } catch (e) {
      failed++
      console.error('❌ 迁移FAQ失败:', e.message)
    }
  }
  console.log(`\n📊 FAQ 迁移完成: 新建 ${created}, 更新 ${updated}, 失败 ${failed}`)
}

if (require.main === module) {
  migrate().catch(err => { console.error(err); process.exit(1) })
}


