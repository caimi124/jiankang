#!/usr/bin/env node
const { Client } = require('@notionhq/client')

const {
  NOTION_TOKEN,
  NOTION_HERBS_DB_ID,
  NOTION_DOSAGES_DB_ID,
  NOTION_STUDIES_DB_ID,
  NOTION_FAQS_DB_ID,
} = process.env

if (!NOTION_TOKEN) {
  console.error('❌ Missing NOTION_TOKEN')
  process.exit(1)
}

const notion = new Client({ auth: NOTION_TOKEN })

async function createHerbTemplate() {
  if (!NOTION_HERBS_DB_ID) return
  await notion.pages.create({
    parent: { database_id: NOTION_HERBS_DB_ID },
    properties: {
      'Herb Name': { title: [{ text: { content: 'Template — Herb (EN)' } }] },
      'LatinName': { rich_text: [{ text: { content: 'Latin binomial' } }] },
      'Slug': { rich_text: [{ text: { content: 'your-herb-slug' } }] },
      'Category': { select: { name: 'Circulation' } },
      'Overview': { rich_text: [{ text: { content: 'Who it helps; what it solves; key safety; brief mechanism in 1–2 lines.' } }] },
      'ActiveCompounds': { multi_select: ['Compound A','Compound B'].map((n)=>({ name: n })) },
      'Benefits': { multi_select: ['Use case 1','Use case 2'].map((n)=>({ name: n })) },
      'RecommendedFor': { multi_select: ['Persona 1','Persona 2'].map((n)=>({ name: n })) },
      'NotRecommendedFor': { multi_select: ['Avoid group 1','Avoid group 2'].map((n)=>({ name: n })) },
      'InteractsWithDrugs': { multi_select: ['Warfarin/Anticoagulants'].map((n)=>({ name: n })) },
      'SafetyRating': { select: { name: 'Yellow' } },
      'Contraindications': { multi_select: ['Pregnancy'].map((n)=>({ name: n })) },
      'Pregnancy': { select: { name: 'Caution' } },
      'Lactation': { select: { name: 'Caution' } },
      'Tags': { multi_select: ['Tag A','Tag B'].map((n)=>({ name: n })) },
      'Publish': { checkbox: false },
    },
    children: [
      { object: 'block', heading_2: { rich_text: [{ text: { content: 'Overview' } }] } },
      { object: 'block', paragraph: { rich_text: [{ text: { content: 'Short, user-first summary (who it helps, what to expect).' } }] } },
      { object: 'block', heading_2: { rich_text: [{ text: { content: 'Mechanism (brief)' } }] } },
      { object: 'block', paragraph: { rich_text: [{ text: { content: '2–3 sentences: insulin sensitivity, circulation, inflammation, digestion (example).' } }] } },
      { object: 'block', heading_2: { rich_text: [{ text: { content: 'Key Safety Notes' } }] } },
      { object: 'block', bulleted_list_item: { rich_text: [{ text: { content: 'Safety rating; contraindications; interactions' } }] } },
      { object: 'block', heading_2: { rich_text: [{ text: { content: 'What to Expect' } }] } },
      { object: 'block', paragraph: { rich_text: [{ text: { content: 'Time-to-benefit, cycles (e.g., 7–14 days), when to stop/seek care.' } }] } },
      { object: 'block', heading_2: { rich_text: [{ text: { content: 'References' } }] } },
      { object: 'block', bulleted_list_item: { rich_text: [{ text: { content: 'PubMed/NCCIH/WHO links' } }] } },
    ],
  })
  console.log('✅ Herb template created')
}

async function createDosageTemplate() {
  if (!NOTION_DOSAGES_DB_ID) return
  await notion.pages.create({
    parent: { database_id: NOTION_DOSAGES_DB_ID },
    properties: {
      'Form': { select: { name: 'Bark tea' } },
      'TypicalDose': { rich_text: [{ text: { content: '1.5–3 g/day' } }] },
      'Frequency': { rich_text: [{ text: { content: '1–2 times/day' } }] },
      'Duration': { rich_text: [{ text: { content: '7–14 days/cycle' } }] },
      'Standardization': { rich_text: [{ text: { content: '' } }] },
      'Notes': { rich_text: [{ text: { content: 'Kitchen unit / pairing suggestions' } }] },
    },
    children: [
      { object: 'block', heading_2: { rich_text: [{ text: { content: 'Dosing Notes' } }] } },
      { object: 'block', paragraph: { rich_text: [{ text: { content: 'How to take; with meals; pairing; cautions for special groups.' } }] } },
    ],
  })
  console.log('✅ Dosage template created')
}

async function createStudyTemplate() {
  if (!NOTION_STUDIES_DB_ID) return
  await notion.pages.create({
    parent: { database_id: NOTION_STUDIES_DB_ID },
    properties: {
      'Title': { title: [{ text: { content: 'Template — Study' } }] },
      'Year': { number: 2024 },
      'StudyType': { select: { name: 'Meta-analysis' } },
      'Population': { rich_text: [{ text: { content: 'Adults with condition X, n=...' } }] },
      'DosageAndDuration': { rich_text: [{ text: { content: 'Dose range; duration' } }] },
      'Outcomes': { multi_select: ['FPG','CRP'].map((n)=>({ name: n })) },
      'EffectDirection': { select: { name: 'Positive' } },
      'RiskOfBias': { select: { name: 'Low' } },
      'Link': { url: 'https://pubmed.ncbi.nlm.nih.gov' },
      'Takeaway': { rich_text: [{ text: { content: 'One-line conclusion for lay readers.' } }] },
      'EvidenceWeight': { number: 4 },
    },
    children: [
      { object: 'block', heading_2: { rich_text: [{ text: { content: 'Outcome Summary' } }] } },
      { object: 'block', bulleted_list_item: { rich_text: [{ text: { content: 'Effect size; key endpoints; applicable population' } }] } },
    ],
  })
  console.log('✅ Study template created')
}

async function createFaqTemplate() {
  if (!NOTION_FAQS_DB_ID) return
  await notion.pages.create({
    parent: { database_id: NOTION_FAQS_DB_ID },
    properties: {
      'Question': { title: [{ text: { content: 'Template — Question?' } }] },
      'Answer': { rich_text: [{ text: { content: 'Short, direct answer in one sentence.' } }] },
    },
  })
  console.log('✅ FAQ template created')
}

async function main() {
  await createHerbTemplate()
  await createDosageTemplate()
  await createStudyTemplate()
  await createFaqTemplate()
  console.log('🎉 All templates created')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


