#!/usr/bin/env node
const { Client } = require('@notionhq/client')

const token = process.env.NOTION_TOKEN
const HERBS_DB = process.env.NOTION_HERBS_DB_ID
const DOSAGES_DB = process.env.NOTION_DOSAGES_DB_ID
const STUDIES_DB = process.env.NOTION_STUDIES_DB_ID
const FAQS_DB = process.env.NOTION_FAQS_DB_ID

if (!token) {
  console.error('Missing NOTION_TOKEN')
  process.exit(1)
}

const notion = new Client({ auth: token })

async function createHerbsTemplate() {
  if (!HERBS_DB) return
  await notion.pages.create({
    parent: { database_id: HERBS_DB },
    properties: {
      'Herb Name': { title: [{ text: { content: 'TEMPLATE - Herb Name' } }] },
      'LatinName': { rich_text: [{ text: { content: 'Latin binomial' } }] },
      'Slug': { rich_text: [{ text: { content: 'herb-slug' } }] },
      'Category': { select: { name: 'Category' } },
      'Overview': { rich_text: [{ text: { content: 'Who it helps, what problems it solves, brief mechanism, key safety notes.' } }] },
      'ActiveCompounds': { multi_select: ['Compound A','Compound B'].map((n)=>({ name: n })) },
      'Benefits': { multi_select: ['Benefit 1','Benefit 2'].map((n)=>({ name: n })) },
      'RecommendedFor': { multi_select: ['Persona 1','Persona 2'].map((n)=>({ name: n })) },
      'NotRecommendedFor': { multi_select: ['Avoid 1','Avoid 2'].map((n)=>({ name: n })) },
      'InteractsWithDrugs': { multi_select: ['Drug class 1','Drug class 2'].map((n)=>({ name: n })) },
      'SafetyRating': { select: { name: 'Yellow' } },
      'Contraindications': { multi_select: ['Contra 1','Contra 2'].map((n)=>({ name: n })) },
      'Pregnancy': { select: { name: 'Caution' } },
      'Lactation': { select: { name: 'Caution' } },
      'Tags': { multi_select: ['Tag 1','Tag 2'].map((n)=>({ name: n })) },
      'Publish': { checkbox: false },
    },
    children: [
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: 'Overview' } }] } },
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: 'Audience | Problems solved | Expected effect | Brief mechanism | Key safety' } }] } },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: 'Mechanism' } }] } },
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: '2–3 sentences; keep it plain language.' } }] } },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: 'Key Safety Notes' } }] } },
      { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: 'Interactions: ...' } }] } },
      { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: 'Avoid if: ...' } }] } },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: 'What to Expect' } }] } },
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: 'Onset, cycle, when to stop & seek care.' } }] } },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: 'References' } }] } },
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: 'Add 2–3 authoritative links (PubMed/NCCIH/WHO).' } }] } },
      { object: 'block', type: 'to_do', to_do: { rich_text: [{ type: 'text', text: { content: 'Fill Benefits/RecommendedFor/NotRecommendedFor' } }] } },
      { object: 'block', type: 'to_do', to_do: { rich_text: [{ type: 'text', text: { content: 'Set SafetyRating, Pregnancy, Lactation, InteractsWithDrugs' } }] } },
      { object: 'block', type: 'to_do', to_do: { rich_text: [{ type: 'text', text: { content: 'Check LastReviewed & MedicalReviewer, then Publish' } }] } },
    ],
  })
  console.log('Created Herbs template page')
}

async function createDosagesTemplate() {
  if (!DOSAGES_DB) return
  await notion.pages.create({
    parent: { database_id: DOSAGES_DB },
    properties: {
      'Form': { select: { name: 'Bark tea' } },
      'TypicalDose': { rich_text: [{ text: { content: '1.5–3 g/day' } }] },
      'Frequency': { rich_text: [{ text: { content: '1–2 times/day' } }] },
      'Duration': { rich_text: [{ text: { content: '7–14 days/cycle' } }] },
      'Standardization': { rich_text: [{ text: { content: '' } }] },
      'Notes': { rich_text: [{ text: { content: 'Kitchen measure / pairing / cautions' } }] },
    },
    children: [
      { object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: 'Dosing Notes' } }] } },
      { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: 'Form or FormText must be filled' } }] } },
      { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: 'Provide TypicalDose + Frequency + Duration' } }] } },
    ],
  })
  console.log('Created Dosages template page')
}

async function createStudiesTemplate() {
  if (!STUDIES_DB) return
  await notion.pages.create({
    parent: { database_id: STUDIES_DB },
    properties: {
      'Title': { title: [{ text: { content: 'TEMPLATE - Study Title' } }] },
      'Year': { number: new Date().getFullYear() },
      'StudyType': { select: { name: 'Meta-analysis' } },
      'Outcomes': { multi_select: ['FPG','HOMA-IR'].map((n)=>({ name: n })) },
      'EffectDirection': { select: { name: 'Positive' } },
      'RiskOfBias': { select: { name: 'Low' } },
      'Link': { url: 'https://pubmed.ncbi.nlm.nih.gov/' },
      'Takeaway': { rich_text: [{ text: { content: 'One-sentence conclusion' } }] },
      'EvidenceWeight': { number: 5 },
    },
    children: [
      { object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: 'Outcome Summary' } }] } },
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: 'Population, dosage, duration, outcomes, direction.' } }] } },
    ],
  })
  console.log('Created Studies template page')
}

async function createFaqsTemplate() {
  if (!FAQS_DB) return
  await notion.pages.create({
    parent: { database_id: FAQS_DB },
    properties: {
      'Question': { title: [{ text: { content: 'TEMPLATE - Question?' } }] },
      'Answer': { rich_text: [{ text: { content: 'Direct and concise answer in the first sentence.' } }] },
    },
    children: [
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: 'Add additional clarifications if needed.' } }] } },
    ],
  })
  console.log('Created FAQs template page')
}

async function main() {
  await createHerbsTemplate()
  await createDosagesTemplate()
  await createStudiesTemplate()
  await createFaqsTemplate()
  console.log('All templates created (as pages named TEMPLATE-*)')
}

main().catch((e)=>{ console.error(e); process.exit(1) })


