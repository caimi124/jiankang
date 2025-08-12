#!/usr/bin/env node
const { Client } = require('@notionhq/client')

const token = process.env.NOTION_TOKEN
const parentPageId = process.env.NOTION_PARENT_PAGE_ID // 作为父页面

if (!token || !parentPageId) {
  console.error('Missing NOTION_TOKEN or NOTION_PARENT_PAGE_ID')
  process.exit(1)
}

const notion = new Client({ auth: token })

async function createDb(title, properties) {
  const res = await notion.databases.create({
    parent: { type: 'page_id', page_id: parentPageId },
    title: [{ type: 'text', text: { content: title } }],
    properties,
  })
  console.log(`Created DB: ${title} → ${res.id}`)
  return res.id
}

async function main() {
  // Herbs 主库
  const herbsDbId = await createDb('Herbs', {
    'Herb Name': { title: {} },
    'LatinName': { rich_text: {} },
    'Slug': { rich_text: {} },
    'Category': { select: {} },
    'Overview': { rich_text: {} },
    'ActiveCompounds': { multi_select: {} },
    'Benefits': { multi_select: {} },
    'RecommendedFor': { multi_select: {} },
    'NotRecommendedFor': { multi_select: {} },
    'InteractsWithDrugs': { multi_select: {} },
    'SafetyRating': { select: {} },
    'Contraindications': { multi_select: {} },
    'Pregnancy': { select: {} },
    'Lactation': { select: {} },
    'Tags': { multi_select: {} },
    'Publish': { checkbox: {} },
    'LastReviewed': { date: {} },
    'MedicalReviewer': { people: {} },
  })

  // Dosages 子库
  const dosagesDbId = await createDb('Dosages', {
    'Herb': { relation: { database_id: herbsDbId } },
    'Form': { select: {} },
    'FormText': { rich_text: {} },
    'TypicalDose': { rich_text: {} },
    'Frequency': { rich_text: {} },
    'Duration': { rich_text: {} },
    'Standardization': { rich_text: {} },
    'Notes': { rich_text: {} },
  })

  // Studies 子库
  const studiesDbId = await createDb('Studies', {
    'Herb': { relation: { database_id: herbsDbId } },
    'Title': { title: {} },
    'Year': { number: {} },
    'StudyType': { select: {} },
    'Population': { rich_text: {} },
    'DosageAndDuration': { rich_text: {} },
    'Outcomes': { multi_select: {} },
    'EffectDirection': { select: {} },
    'RiskOfBias': { select: {} },
    'Link': { url: {} },
    'Takeaway': { rich_text: {} },
    'EvidenceWeight': { number: {} },
  })

  // FAQs 子库
  const faqsDbId = await createDb('FAQs', {
    'Herb': { relation: { database_id: herbsDbId } },
    'Question': { title: {} },
    'Answer': { rich_text: {} },
  })

  console.log('\nExport and set these envs:')
  console.log('NOTION_HERBS_DB_ID=', herbsDbId)
  console.log('NOTION_DOSAGES_DB_ID=', dosagesDbId)
  console.log('NOTION_STUDIES_DB_ID=', studiesDbId)
  console.log('NOTION_FAQS_DB_ID=', faqsDbId)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


