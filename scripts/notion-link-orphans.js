#!/usr/bin/env node
// 自动将 Dosages/Studies/FAQs 中标题包含目标草药名的“孤儿记录”（无 Herb 关联）批量关联到指定 Herb
// 用法：node scripts/notion-link-orphans.js --herb=cinnamon

const { Client } = require('@notionhq/client')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

try { require('dotenv').config({ path: '.env.local' }) } catch (_) {}

const argv = yargs(hideBin(process.argv))
  .option('herb', { type: 'string', demandOption: true, desc: 'Herb slug, e.g., cinnamon' })
  .option('dry', { type: 'boolean', default: false, desc: 'Dry-run without updating' })
  .argv

const token = process.env.NOTION_TOKEN
const herbsDbId = process.env.NOTION_HERBS_DB_ID
const dosagesDbId = process.env.NOTION_DOSAGES_DB_ID
const studiesDbId = process.env.NOTION_STUDIES_DB_ID
const faqsDbId = process.env.NOTION_FAQS_DB_ID

if (!token || !herbsDbId) {
  console.error('Missing NOTION_TOKEN or NOTION_HERBS_DB_ID in env. Please set them or add to .env.local')
  process.exit(1)
}

const client = new Client({ auth: token })

async function findHerbBySlug(slug) {
  const res = await client.databases.query({
    database_id: herbsDbId,
    filter: {
      or: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'Slug', rich_text: { contains: slug } },
      ],
    },
    page_size: 1,
  })
  return res.results?.[0]
}

function getTitlePropName(page) {
  const props = page.properties || {}
  for (const [key, val] of Object.entries(props)) {
    if (val && val.type === 'title') return key
  }
  // 常见中文标题列名兜底
  return '名称'
}

function getTitleText(prop) {
  const rich = prop?.title || []
  return rich.map((r) => r?.plain_text || r?.text?.content || '').join('')
}

function hasHerbRelation(page) {
  const prop = page.properties?.Herb
  if (!prop) return false
  if (prop.type !== 'relation') return false
  return Array.isArray(prop.relation) && prop.relation.length > 0
}

async function listPages(dbId) {
  const results = []
  let cursor = undefined
  do {
    const res = await client.databases.query({ database_id: dbId, start_cursor: cursor, page_size: 100 })
    results.push(...res.results)
    cursor = res.has_more ? res.next_cursor : undefined
  } while (cursor)
  return results
}

async function linkOrphans(dbId, herbId, herbName) {
  if (!dbId) return { updated: 0, matched: 0 }
  const pages = await listPages(dbId)
  let matched = 0
  let updated = 0
  for (const p of pages) {
    const titleKey = getTitlePropName(p)
    const title = getTitleText(p.properties?.[titleKey])
    const isOrphan = !hasHerbRelation(p)
    // 采用标题前缀/包含规则匹配（如 "Cinnamon – ", "Cinnamon:")
    const normalized = (title || '').toLowerCase()
    const hit = normalized.startsWith(`${herbName.toLowerCase()} `) || normalized.startsWith(`${herbName.toLowerCase()} –`) || normalized.includes(`${herbName.toLowerCase()}`)
    if (isOrphan && hit) {
      matched++
      if (!argv.dry) {
        await client.pages.update({
          page_id: p.id,
          properties: { Herb: { relation: [{ id: herbId }] } },
        })
        updated++
      }
    }
  }
  return { matched, updated }
}

async function main() {
  const slug = argv.herb
  const herb = await findHerbBySlug(slug)
  if (!herb) {
    console.error(`Herb not found by slug: ${slug}`)
    process.exit(2)
  }
  const herbId = herb.id
  const herbNameProp = herb.properties?.['Herb Name'] || herb.properties?.['名称']
  const herbName = getTitleText(herbNameProp) || slug

  const results = {}
  results.dosages = await linkOrphans(dosagesDbId, herbId, herbName)
  results.studies = await linkOrphans(studiesDbId, herbId, herbName)
  results.faqs = await linkOrphans(faqsDbId, herbId, herbName)

  console.log(JSON.stringify({ herbId, herbName, results, dryRun: argv.dry }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


