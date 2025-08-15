#!/usr/bin/env node
const { Client } = require('@notionhq/client')
try { require('dotenv').config({ path: '.env.local' }) } catch (_) {}

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

async function upsertTemplateHerb() {
  const title = 'TEMPLATE — Do not delete'
  const exists = await notion.databases.query({
    database_id: herbsDbId,
    filter: { property: 'Herb Name', title: { equals: title } },
    page_size: 1,
  })
  if (exists.results.length) return exists.results[0].id
  const res = await notion.pages.create({
    parent: { database_id: herbsDbId },
    properties: {
      'Herb Name': { title: [{ text: { content: title } }] },
      'LatinName': { rich_text: [{ text: { content: 'Latin binomial' } }] },
      'Slug': { rich_text: [{ text: { content: 'slug-here' } }] },
      'Category': { select: { name: 'Circulation' } },
      'Overview': { rich_text: [{ text: { content: '1-2 sentences: who it helps, primary effects.' } }] },
      'ActiveCompounds': { multi_select: ['Compound A','Compound B'].map((n)=>({name:n})) },
      'Benefits': { multi_select: ['Use case A','Use case B'].map((n)=>({name:n})) },
      'RecommendedFor': { multi_select: ['Persona A','Persona B'].map((n)=>({name:n})) },
      'NotRecommendedFor': { multi_select: ['Contra A','Contra B'].map((n)=>({name:n})) },
      'InteractsWithDrugs': { multi_select: ['Anticoagulants','Antidiabetics'].map((n)=>({name:n})) },
      'SafetyRating': { select: { name: 'Yellow' } },
      'Contraindications': { multi_select: ['Pregnancy'].map((n)=>({name:n})) },
      'Pregnancy': { select: { name: 'Caution' } },
      'Lactation': { select: { name: 'Caution' } },
      'Tags': { multi_select: ['Category','Symptom'].map((n)=>({name:n})) },
      'Publish': { checkbox: false },
    }
  })
  return res.id
}

async function upsertTemplateDosage(herbId) {
  if (!dosagesDbId) return
  const title = 'TEMPLATE — Do not delete'
  const res = await notion.pages.create({
    parent: { database_id: dosagesDbId },
    properties: {
      'Herb': { relation: [{ id: herbId }] },
      'Form': { select: { name: 'Powder' } },
      'TypicalDose': { rich_text: [{ text: { content: 'e.g., 500 mg' } }] },
      'Frequency': { rich_text: [{ text: { content: '1–2 times/day' } }] },
      'Duration': { rich_text: [{ text: { content: '2–8 weeks' } }] },
      'Notes': { rich_text: [{ text: { content: 'Optional notes' } }] },
    }
  })
  return res.id
}

async function upsertTemplateStudy(herbId) {
  if (!studiesDbId) return
  const res = await notion.pages.create({
    parent: { database_id: studiesDbId },
    properties: {
      'Herb': { relation: [{ id: herbId }] },
      'Title': { title: [{ text: { content: 'TEMPLATE — RCT/Meta-analysis title' } }] },
      'Year': { number: 2024 },
      'StudyType': { select: { name: 'RCT' } },
      'Outcomes': { multi_select: ['Outcome A'].map((n)=>({name:n})) },
      'EffectDirection': { select: { name: 'Positive' } },
    }
  })
  return res.id
}

async function upsertTemplateFaq(herbId) {
  if (!faqsDbId) return
  const res = await notion.pages.create({
    parent: { database_id: faqsDbId },
    properties: {
      'Herb': { relation: [{ id: herbId }] },
      'Question': { title: [{ text: { content: 'TEMPLATE — Frequently asked question?' } }] },
      'Answer': { rich_text: [{ text: { content: 'Short, clear answer users need.' } }] },
    }
  })
  return res.id
}

async function main() {
  const herbTemplateId = await upsertTemplateHerb()
  await Promise.all([
    upsertTemplateDosage(herbTemplateId),
    upsertTemplateStudy(herbTemplateId),
    upsertTemplateFaq(herbTemplateId),
  ])
  console.log('Template entries created for all four databases.')
}

main().catch((e)=>{ console.error(e); process.exit(1) })


