#!/usr/bin/env node
const { Client } = require('@notionhq/client')
// 允许从 .env.local 载入环境变量（本地开发更方便）
try {
  require('dotenv').config({ path: '.env.local' })
} catch (_) {}

const token = process.env.NOTION_TOKEN
const herbsDbId = process.env.NOTION_HERBS_DB_ID
const dosagesDbId = process.env.NOTION_DOSAGES_DB_ID
const studiesDbId = process.env.NOTION_STUDIES_DB_ID
const faqsDbId = process.env.NOTION_FAQS_DB_ID

if (!token || !herbsDbId) {
  console.error('Missing NOTION_TOKEN or NOTION_HERBS_DB_ID')
  process.exit(1)
}

const notion = new Client({ auth: token })

async function createHerb() {
  const res = await notion.pages.create({
    parent: { database_id: herbsDbId },
    properties: {
      'Herb Name': { title: [{ text: { content: 'Cinnamon' } }] },
      'LatinName': { rich_text: [{ text: { content: 'Cinnamomum cassia' } }] },
      'Slug': { rich_text: [{ text: { content: 'cinnamon' } }] },
      'Category': { select: { name: 'Circulation' } },
      'Overview': { rich_text: [{ text: { content: 'Warming herb supporting circulation, cold-induced pain, and blood sugar; best for people with cold limbs, low energy, and cramps worse in cold.' } }] },
      'ActiveCompounds': { multi_select: ['Cinnamaldehyde','Cinnamic acid','Polyphenols','Essential oils'].map((n)=>({name:n})) },
      'Benefits': { multi_select: [
        'Cold-induced back/joint discomfort',
        'Cold limbs, low energy',
        'Menstrual cramps (cold pattern)',
        'Sluggish digestion (cold type)',
        'Blood sugar support (prediabetes/T2D)'
      ].map((n)=>({name:n})) },
      'RecommendedFor': { multi_select: ['Cold sensitivity','Poor peripheral circulation','Cramps worse in cold'].map((n)=>({name:n})) },
      'NotRecommendedFor': { multi_select: ['Heat signs','Heavy menstruation','Pregnancy','High fever'].map((n)=>({name:n})) },
      'InteractsWithDrugs': { multi_select: ['Warfarin/Anticoagulants','Antidiabetics','Hepatotoxic agents'].map((n)=>({name:n})) },
      'SafetyRating': { select: { name: 'Yellow' } },
      'Contraindications': { multi_select: ['Pregnancy','Heavy bleeding','Bleeding disorders','Febrile conditions'].map((n)=>({name:n})) },
      'Pregnancy': { select: { name: 'Avoid' } },
      'Lactation': { select: { name: 'Caution' } },
      'Tags': { multi_select: ['Blood Sugar','Inflammation','Pain Relief','Women’s Health','Circulation','Cold Limbs'].map((n)=>({name:n})) },
      'Publish': { checkbox: true },
    }
  })
  return res.id
}

async function createDosages(herbPageId) {
  if (!dosagesDbId) return
  const rows = [
    { Form: 'Bark tea', TypicalDose: '1.5–3 g/day', Frequency: '1–2 times/day', Duration: '7–14 days/cycle' },
    { Form: 'Powder', TypicalDose: '0.5–1 g/day', Notes: 'With warm drink' },
    { Form: 'Standardized extract', TypicalDose: '250–500 mg/day', Notes: 'Prefer standardized to cinnamaldehyde' },
    { Form: 'Foot soak', TypicalDose: 'Decoction with ginger', Duration: '20–30 min' },
  ]
  for (const r of rows) {
    await notion.pages.create({
      parent: { database_id: dosagesDbId },
      properties: {
        'Herb': { relation: [{ id: herbPageId }] },
        'Form': { select: { name: r.Form } },
        'TypicalDose': { rich_text: [{ text: { content: r.TypicalDose } }] },
        'Frequency': r.Frequency ? { rich_text: [{ text: { content: r.Frequency } }] } : undefined,
        'Duration': r.Duration ? { rich_text: [{ text: { content: r.Duration } }] } : undefined,
        'Notes': r.Notes ? { rich_text: [{ text: { content: r.Notes } }] } : undefined,
      }
    })
  }
}

async function createStudies(herbPageId) {
  if (!studiesDbId) return
  const items = [
    { Title: 'Meta-analysis: Cinnamon improves fasting glucose in T2D', Year: 2021, StudyType: 'Meta-analysis', Outcomes: ['FPG','HOMA-IR'], EffectDirection: 'Positive' },
    { Title: 'Cinnamon lowers CRP and IL-6 (8 weeks, 1–2 g/day)', Year: 2020, StudyType: 'RCT', Outcomes: ['CRP','IL-6'], EffectDirection: 'Positive' },
  ]
  for (const s of items) {
    await notion.pages.create({
      parent: { database_id: studiesDbId },
      properties: {
        'Herb': { relation: [{ id: herbPageId }] },
        'Title': { title: [{ text: { content: s.Title } }] },
        'Year': { number: s.Year },
        'StudyType': { select: { name: s.StudyType } },
        'Outcomes': { multi_select: s.Outcomes.map((n)=>({name:n})) },
        'EffectDirection': { select: { name: s.EffectDirection } },
      }
    })
  }
}

async function createFaqs(herbPageId) {
  if (!faqsDbId) return
  const items = [
    { q: 'Can cinnamon help with blood sugar?', a: 'May support insulin sensitivity — monitor if on antidiabetics.' },
    { q: 'Is it good for menstrual cramps?', a: 'Useful for cold-type cramps; avoid if bleeding is heavy.' },
    { q: 'Cassia vs Ceylon?', a: 'Cassia is more warming but higher in coumarin; Ceylon preferred for long-term.' },
  ]
  for (const f of items) {
    await notion.pages.create({
      parent: { database_id: faqsDbId },
      properties: {
        'Herb': { relation: [{ id: herbPageId }] },
        'Question': { title: [{ text: { content: f.q } }] },
        'Answer': { rich_text: [{ text: { content: f.a } }] },
      }
    })
  }
}

async function main() {
  const herbId = await createHerb()
  await createDosages(herbId)
  await createStudies(herbId)
  await createFaqs(herbId)
  console.log('Cinnamon seeded successfully.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


