#!/usr/bin/env node
// 为三个子库（Dosages/Studies/FAQs）添加名为 `Herb` 的 Relation 字段，指向 Herbs 主库
// 用法：node scripts/notion-add-herb-relation.js

const { Client } = require('@notionhq/client')

try { require('dotenv').config({ path: '.env.local' }) } catch (_) {}

const token = process.env.NOTION_TOKEN
const herbsDbId = process.env.NOTION_HERBS_DB_ID
const dosagesDbId = process.env.NOTION_DOSAGES_DB_ID
const studiesDbId = process.env.NOTION_STUDIES_DB_ID
const faqsDbId = process.env.NOTION_FAQS_DB_ID

if (!token || !herbsDbId) {
  console.error('Missing NOTION_TOKEN or NOTION_HERBS_DB_ID in env.')
  process.exit(1)
}

const client = new Client({ auth: token })

async function addRelation(dbId, herbDbId) {
  if (!dbId) return
  try {
    await client.databases.update({
      database_id: dbId,
      properties: {
        Herb: { relation: { database_id: herbDbId, single_property: {} } },
      },
    })
    console.log('Added relation Herb to DB:', dbId)
  } catch (e) {
    console.error('Failed to add relation for DB:', dbId)
    console.error(e)
    process.exitCode = 2
  }
}

async function main() {
  await addRelation(dosagesDbId, herbsDbId)
  await addRelation(studiesDbId, herbsDbId)
  await addRelation(faqsDbId, herbsDbId)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


