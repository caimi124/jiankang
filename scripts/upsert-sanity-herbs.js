// Upsert selected herbs into Sanity (Clove, Cinnamon, Pumpkin Seeds)
// Usage (PowerShell):
//   $env:SANITY_PROJECT_ID="13rzzwgz"; $env:SANITY_DATASET="production"; $env:SANITY_EDITOR_TOKEN="<TOKEN>"; node scripts/upsert-sanity-herbs.js | cat

const { createClient } = require('@sanity/client')

function requiredEnv(name) {
  const v = process.env[name]
  if (!v) {
    throw new Error(`Missing env ${name}`)
  }
  return v
}

const projectId = process.env.SANITY_PROJECT_ID || '13rzzwgz'
const dataset = process.env.SANITY_DATASET || 'production'
const token = requiredEnv('SANITY_EDITOR_TOKEN')

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false })

function nowIso() { return new Date().toISOString() }

const seoClove = {
  seoTitle: 'Clove (Syzygium aromaticum) Benefits, Uses, Tea, Oil, Dosage | HerbScience',
  seoDescription: 'Evidence-based guide to clove benefits and uses: oral health, digestion, anti-inflammatory effects, clove tea, clove oil, eugenol, safety and dosage.',
  seoKeywords: [
    'clove benefits','clove uses','clove tea','clove oil benefits','clove for digestion','clove for oral health',
    'eugenol in clove','clove contraindications','clove daily dosage'
  ]
}

const herbs = [
  {
    slug: 'clove',
    doc: {
      _type: 'herb',
      title: 'Clove',
      chineseName: '丁香',
      latinName: 'Syzygium aromaticum',
      slug: { _type: 'slug', current: 'clove' },
      category: '消化健康',
      constitutionType: '通用',
      description: 'Clove supports oral health, warms digestion, and provides antibacterial and antioxidant effects.',
      traditionalUse: 'Warms the stomach, stops vomiting, supports kidney yang (TCM).',
      primaryEffects: ['Oral health','Digestive support','Anti-nausea','Antimicrobial'],
      activeCompounds: ['Eugenol','Tannins','Flavonoids'],
      dosage: 'Whole cloves (tea): 1–3 g/day; Powder: 0.5–1 g/day; Oil (external) 1–2 diluted drops',
      contraindications: 'Avoid long-term high-dose oil; caution with heat-type conditions and pregnancy/children.',
      ...seoClove,
      status: 'published',
      publishedAt: nowIso()
    }
  },
  {
    slug: 'cinnamon',
    doc: {
      _type: 'herb',
      title: 'Cinnamon',
      chineseName: '肉桂',
      latinName: 'Cinnamomum verum',
      slug: { _type: 'slug', current: 'cinnamon' },
      category: '消化健康',
      constitutionType: '通用',
      description: 'Cinnamon is a warming spice that supports circulation, digestion, and metabolic balance.',
      traditionalUse: 'Warms channels and dispels cold (TCM).',
      primaryEffects: ['Metabolic support','Digestive comfort','Warming'],
      activeCompounds: ['Cinnamaldehyde','Procyanidins'],
      dosage: 'Powder/Capsule 500–2000 mg/day with meals',
      contraindications: 'Cassia coumarin caution; monitor with antidiabetic medications.',
      seoTitle: 'Cinnamon Benefits & Uses | HerbScience',
      seoDescription: 'Evidence-based cinnamon guide: warming digestive support, metabolic balance, compounds, dosage and safety.',
      seoKeywords: ['cinnamon benefits','cinnamon blood sugar','warming spice','digestive support'],
      status: 'published',
      publishedAt: nowIso()
    }
  },
  {
    slug: 'pumpkin-seeds',
    doc: {
      _type: 'herb',
      title: 'Pumpkin Seeds',
      chineseName: '南瓜子',
      latinName: 'Cucurbita pepo',
      slug: { _type: 'slug', current: 'pumpkin-seeds' },
      category: '男性健康',
      constitutionType: '通用',
      description: 'Nutrient-dense seeds traditionally used for prostate health and hormone balance.',
      traditionalUse: 'Prostate support and hair health.',
      primaryEffects: ['Prostate support','Hormone balance','Sleep support'],
      activeCompounds: ['Zinc','Phytosterols','Essential fatty acids'],
      dosage: 'Raw seeds 1–2 tbsp/day; Oil 1–2 tsp/day',
      contraindications: 'Large amounts may cause digestive upset; seed/nut allergy.',
      seoTitle: 'Pumpkin Seeds Benefits & Uses | HerbScience',
      seoDescription: 'Evidence-based pumpkin seeds guide: prostate support, hormone balance, dosage and safety.',
      seoKeywords: ['pumpkin seeds benefits','pumpkin seeds prostate','cucurbita pepo'],
      status: 'published',
      publishedAt: nowIso()
    }
  }
]

async function upsertHerb(entry) {
  const { slug, doc } = entry
  const existing = await client.fetch(`*[_type=="herb" && slug.current==$slug][0]{_id}`, { slug })
  if (existing?._id) {
    console.log(`🔄 Updating herb: ${slug} (${existing._id})`)
    return client
      .patch(existing._id)
      .set(doc)
      .commit()
  }
  console.log(`✨ Creating herb: ${slug}`)
  return client.create(doc)
}

async function main() {
  for (const h of herbs) {
    await upsertHerb(h)
  }
  console.log('✅ Upsert completed')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})


