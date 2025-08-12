#!/usr/bin/env node
// 将现有 JSON/CSV 草药数据转换为四个 Notion 导入 CSV（Herbs/Dosages/Studies/FAQs）
const fs = require('fs')
const path = require('path')

function safe(v) {
  if (v === undefined || v === null) return ''
  if (Array.isArray(v)) return v.join(';')
  return String(v).replace(/\r?\n/g, ' ').trim()
}

function slugify(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

function writeCSV(target, rows) {
  fs.writeFileSync(target, rows.join('\n'), 'utf8')
  console.log('Wrote', target)
}

function migrate(jsonPath) {
  const raw = fs.readFileSync(jsonPath, 'utf8')
  const data = JSON.parse(raw)
  // 兼容：若是数组或对象 map
  const items = Array.isArray(data) ? data : (Array.isArray(data.HERBS_DATABASE) ? data.HERBS_DATABASE : Object.values(data))

  const herbsHeader = 'Herb Name,LatinName,Slug,Category,Overview,ActiveCompounds,Benefits,RecommendedFor,NotRecommendedFor,InteractsWithDrugs,SafetyRating,Contraindications,Pregnancy,Lactation,Tags,Publish'
  const herbsRows = [herbsHeader]

  const dosagesHeader = 'Herb(Title or ID),Form,TypicalDose,Frequency,Duration,Standardization,Notes'
  const dosagesRows = [dosagesHeader]

  const studiesHeader = 'Herb(Title or ID),Title,Year,StudyType,Outcomes,EffectDirection,RiskOfBias,Link,Takeaway,EvidenceWeight'
  const studiesRows = [studiesHeader]

  const faqsHeader = 'Herb(Title or ID),Question,Answer'
  const faqsRows = [faqsHeader]

  for (const it of items) {
    const name = it.english_name || it.name
    if (!name) continue
    const latin = it.latin_name || ''
    const slug = it.slug || slugify(name)
    const category = it.category || ''
    const overview = it.description || it.overview || ''
    const active = it.ingredients || it.active_compounds || []
    const benefits = it.primary_effects || it.benefits || []
    const recFor = it.recommended_for || []
    const notRec = it.contraindications || it.not_suitable_for || []
    const interacts = it.interactions || []
    const safety = it.safety_level || it.safety_rating || ''
    const contras = it.contraindications || []
    const preg = it.pregnancy || ''
    const lact = it.lactation || ''
    const tags = Array.from(new Set([...(it.tags || []), ...(benefits || [])]))
    const publish = true

    herbsRows.push([
      safe(name), safe(latin), safe(slug), safe(category), safe(overview), safe(active), safe(benefits), safe(recFor), safe(notRec), safe(interacts), safe(safety), safe(contras), safe(preg), safe(lact), safe(tags), publish
    ].join(','))

    // Dosages
    if (Array.isArray(it.dosage_forms)) {
      for (const d of it.dosage_forms) {
        dosagesRows.push([
          safe(name), safe(d.form || d.form_label || 'Custom'), safe(d.dosage || d.typicalDose || ''), safe(d.frequency || ''), safe(d.duration || ''), safe(d.standardization || ''), safe(d.usage || d.notes || '')
        ].join(','))
      }
    }

    // Studies（若原数据含结构）
    if (Array.isArray(it.studies)) {
      for (const s of it.studies) {
        studiesRows.push([
          safe(name), safe(s.title), safe(s.year || ''), safe(s.type || ''), safe(s.outcomes || []), safe(s.direction || ''), safe(s.risk || ''), safe(s.link || ''), safe(s.takeaway || ''), safe(s.weight || '')
        ].join(','))
      }
    }

    // FAQs
    if (Array.isArray(it.faqs)) {
      for (const f of it.faqs) {
        faqsRows.push([
          safe(name), safe(f.question), safe(f.answer)
        ].join(','))
      }
    }
  }

  const outDir = path.join('scripts', 'notion-export-templates', 'generated')
  fs.mkdirSync(outDir, { recursive: true })
  writeCSV(path.join(outDir, 'herbs.csv'), herbsRows)
  writeCSV(path.join(outDir, 'dosages.csv'), dosagesRows)
  writeCSV(path.join(outDir, 'studies.csv'), studiesRows)
  writeCSV(path.join(outDir, 'faqs.csv'), faqsRows)
}

const input = process.argv[2] || 'herbs-database-2025-06-19.json'
if (!fs.existsSync(input)) {
  console.error('Input file not found:', input)
  process.exit(1)
}
migrate(input)


