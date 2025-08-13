#!/usr/bin/env node
const { Client } = require('@notionhq/client')

const token = process.env.NOTION_TOKEN
const herbsDbId = process.env.NOTION_HERBS_DB_ID
const dosagesDbId = process.env.NOTION_DOSAGES_DB_ID
const studiesDbId = process.env.NOTION_STUDIES_DB_ID
const faqsDbId = process.env.NOTION_FAQS_DB_ID

if (!token || !herbsDbId || !dosagesDbId || !studiesDbId || !faqsDbId) {
  console.error('Missing NOTION_TOKEN or one of DB IDs (HERBS/DOSAGES/STUDIES/FAQS)')
  process.exit(1)
}

const notion = new Client({ auth: token })

async function createHerbsTemplate() {
  const res = await notion.pages.create({
    parent: { database_id: herbsDbId },
    properties: {
      'Herb Name': { title: [{ text: { content: 'TEMPLATE - Herb Name' } }] },
      'LatinName': { rich_text: [{ text: { content: 'Latin name here' } }] },
      'Slug': { rich_text: [{ text: { content: 'herb-slug-here' } }] },
      'Category': { select: { name: 'Circulation' } },
      'Overview': { rich_text: [{ text: { content: '1) Who benefits 2) What to expect 3) Safety head-up 4) Short mechanism (2–3 sentences).' } }] },
      'ActiveCompounds': { multi_select: ['Compound A','Compound B'].map((n)=>({name:n})) },
      'Benefits': { multi_select: ['Benefit A','Benefit B'].map((n)=>({name:n})) },
      'RecommendedFor': { multi_select: ['Cold sensitivity','Low energy'].map((n)=>({name:n})) },
      'NotRecommendedFor': { multi_select: ['Heat signs'].map((n)=>({name:n})) },
      'InteractsWithDrugs': { multi_select: ['Warfarin/Anticoagulants'].map((n)=>({name:n})) },
      'SafetyRating': { select: { name: 'Yellow' } },
      'Contraindications': { multi_select: ['Pregnancy'].map((n)=>({name:n})) },
      'Pregnancy': { select: { name: 'Caution' } },
      'Lactation': { select: { name: 'Caution' } },
      'Tags': { multi_select: ['Tag A','Tag B'].map((n)=>({name:n})) },
      'Publish': { checkbox: false },
    },
    children: [
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: 'Overview' } }] } },
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: 'Short intro tailored to user pain points and safety.' } }] } },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: 'Mechanism (Brief)' } }] } },
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: '2–3 sentences about why it may work.' } }] } },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: 'Key Safety Notes' } }] } },
      { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: 'Safety rating & top contraindications.' } }] } },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: 'What to expect' } }] } },
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: 'Expected effects and time window; cycle usage if needed.' } }] } },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: 'References' } }] } },
      { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: 'Key meta-analysis / RCT links (add in Studies DB).' } }] } },
      { object: 'block', type: 'toggle', toggle: { rich_text: [{ type: 'text', text: { content: 'Checklist before Publish' } }], children: [
        { object: 'block', type: 'to_do', to_do: { rich_text: [{ type: 'text', text: { content: 'Benefits/RecommendedFor/NotRecommendedFor filled' } }] } },
        { object: 'block', type: 'to_do', to_do: { rich_text: [{ type: 'text', text: { content: 'InteractsWithDrugs/SafetyRating/Pregnancy/Lactation set' } }] } },
        { object: 'block', type: 'to_do', to_do: { rich_text: [{ type: 'text', text: { content: 'Dosages / Studies / FAQs added via related DBs' } }] } },
      ] } },
    ],
  })
  console.log('Created Herbs template:', res.id)
}

async function createDosagesTemplate() {
  const res = await notion.pages.create({
    parent: { database_id: dosagesDbId },
    properties: {
      'Form': { select: { name: 'Bark tea' } },
      'TypicalDose': { rich_text: [{ text: { content: '1.5–3 g/day' } }] },
      'Frequency': { rich_text: [{ text: { content: '1–2 times/day' } }] },
      'Duration': { rich_text: [{ text: { content: '7–14 days/cycle' } }] },
      'Standardization': { rich_text: [{ text: { content: '' } }] },
      'Notes': { rich_text: [{ text: { content: 'Kitchen measure, pairings, timing, with/without food.' } }] },
    },
    children: [
      { object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: 'Dosing Notes' } }] } },
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: 'Add alternative forms as separate rows (Powder, Standardized extract, Foot soak...).'} }] } },
    ],
  })
  console.log('Created Dosages template:', res.id)
}

async function createStudiesTemplate() {
  const res = await notion.pages.create({
    parent: { database_id: studiesDbId },
    properties: {
      'Title': { title: [{ text: { content: 'TEMPLATE - Study Title' } }] },
      'Year': { number: 2021 },
      'StudyType': { select: { name: 'Meta-analysis' } },
      'Population': { rich_text: [{ text: { content: 'Adults with condition X, n=120' } }] },
      'DosageAndDuration': { rich_text: [{ text: { content: '1–2 g/day for 8 weeks' } }] },
      'Outcomes': { multi_select: ['FPG','HOMA-IR'].map((n)=>({name:n})) },
      'EffectDirection': { select: { name: 'Positive' } },
      'RiskOfBias': { select: { name: 'Low' } },
      'Link': { url: 'https://pubmed.ncbi.nlm.nih.gov/' },
      'Takeaway': { rich_text: [{ text: { content: 'One-sentence conclusion for non-expert readers.' } }] },
      'EvidenceWeight': { number: 5 },
    },
    children: [
      { object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: 'Outcome Summary' } }] } },
      { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: 'Primary outcomes:' } }] } },
      { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: 'Population and limitations:' } }] } },
    ],
  })
  console.log('Created Studies template:', res.id)
}

async function createFaqsTemplate() {
  const res = await notion.pages.create({
    parent: { database_id: faqsDbId },
    properties: {
      'Question': { title: [{ text: { content: 'TEMPLATE - Common question?' } }] },
      'Answer': { rich_text: [{ text: { content: 'Short, direct answer that can stand alone.' } }] },
    },
  })
  console.log('Created FAQs template:', res.id)
}

async function main() {
  await createHerbsTemplate()
  await createDosagesTemplate()
  await createStudiesTemplate()
  await createFaqsTemplate()
  console.log('All templates created.')
}

main().catch((e) => { console.error(e); process.exit(1) })


