import { Client } from '@notionhq/client'

export interface NotionEnv {
  token?: string
  herbsDbId?: string
  dosagesDbId?: string
  studiesDbId?: string
  faqsDbId?: string
}

function getEnv(): NotionEnv {
  return {
    token: process.env.NOTION_TOKEN,
    herbsDbId: process.env.NOTION_HERBS_DB_ID,
    dosagesDbId: process.env.NOTION_DOSAGES_DB_ID,
    studiesDbId: process.env.NOTION_STUDIES_DB_ID,
    faqsDbId: process.env.NOTION_FAQS_DB_ID,
  }
}

function ensureClient(): Client | null {
  const { token } = getEnv()
  if (!token) return null
  return new Client({ auth: token })
}

function textFromRich(rich?: any[]): string {
  if (!Array.isArray(rich)) return ''
  return rich.map((r) => r?.plain_text || r?.text?.content || '').join('')
}

function getTitle(prop: any): string {
  return textFromRich(prop?.title)
}

function getRichText(prop: any): string {
  return textFromRich(prop?.rich_text)
}

function getMultiSelect(prop: any): string[] {
  return Array.isArray(prop?.multi_select) ? prop.multi_select.map((o: any) => o?.name).filter(Boolean) : []
}

function getSelect(prop: any): string | null {
  return prop?.select?.name || null
}

export interface MappedHerbData {
  id: string
  name: string
  latin_name?: string
  slug: string
  category?: string
  overview?: string
  benefits?: string[]
  active_compounds?: string[]
  suitable_for?: string[]
  not_suitable_for?: string[]
  dosage_forms?: Array<{ form: string; dosage?: string; usage?: string; standardization?: string; frequency?: string; duration?: string }>
  safety_warnings?: string[]
  interactions?: string[]
  scientific_evidence?: string
  faqs?: Array<{ question: string; answer: string }>
  seo_keywords?: string[]
}

export async function fetchHerbFromNotionBySlug(slug: string): Promise<MappedHerbData | null> {
  const env = getEnv()
  const client = ensureClient()
  if (!client || !env.herbsDbId) {
    console.log('❌ Notion client or herbsDbId not configured')
    return null
  }

  console.log(`🔍 Searching for herb with slug: ${slug}`)
  console.log(`🗄️ Using database ID: ${env.herbsDbId}`)

  try {
    // 查询 Herbs 主库：优先 Slug 属性，退化到 Name 包含
    const herbsQuery = await client.databases.query({
      database_id: env.herbsDbId,
      filter: {
        or: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Slug', rich_text: { contains: slug } },
          { property: 'Herb Name', title: { equals: slug.replace(/-/g, ' ') } },
          { property: 'Herb Name', title: { contains: slug.replace(/-/g, ' ') } },
        ],
      },
      page_size: 1,
    })

    console.log(`📊 Query returned ${herbsQuery.results.length} results`)
    
    const page = herbsQuery.results?.[0] as any
    if (!page) {
      console.log(`❌ No herb found for slug: ${slug}`)
      return null
    }

    console.log(`✅ Found herb: ${page.properties?.['Herb Name']?.title?.[0]?.plain_text || 'Unknown'}`)

    const props = page.properties || {}
    const pageId = page.id

    const name = getTitle(props['Herb Name']) || getRichText(props['Name'])
    const latin = getRichText(props['LatinName'])
    const category = getSelect(props['Category']) || getSelect(props['CategoryEn']) || null
    const overview = getRichText(props['Overview'])
    const activeCompounds = getMultiSelect(props['ActiveCompounds'])
    const benefits = getMultiSelect(props['Benefits'])
    const recommendedFor = getMultiSelect(props['RecommendedFor'])
    const notRecommendedFor = getMultiSelect(props['NotRecommendedFor'])
    const seoKeywords = Array.from(new Set([...(getMultiSelect(props['Tags']) || []), ...(benefits || [])]))

    // 关联读取：Dosages / Studies / FAQs
    const dosage_forms: MappedHerbData['dosage_forms'] = []
    if (env.dosagesDbId) {
      const dQuery = await client.databases.query({
        database_id: env.dosagesDbId,
        filter: { property: 'Herb', relation: { contains: pageId } },
        page_size: 50,
      })
      for (const d of dQuery.results as any[]) {
        const dp = d.properties || {}
        dosage_forms.push({
          form: getSelect(dp['Form']) || getRichText(dp['FormText']) || 'Custom',
          dosage: getRichText(dp['TypicalDose']) || undefined,
          usage: getRichText(dp['Notes']) || undefined,
          standardization: getRichText(dp['Standardization']) || undefined,
          frequency: getRichText(dp['Frequency']) || undefined,
          duration: getRichText(dp['Duration']) || undefined,
        })
      }
    }

    const faqs: MappedHerbData['faqs'] = []
    if (env.faqsDbId) {
      const fQuery = await client.databases.query({
        database_id: env.faqsDbId,
        filter: { property: 'Herb', relation: { contains: pageId } },
        page_size: 50,
      })
      for (const f of fQuery.results as any[]) {
        const fp = f.properties || {}
        faqs.push({ question: getRichText(fp['Question']), answer: getRichText(fp['Answer']) })
      }
    }

    let evidenceSummary = ''
    if (env.studiesDbId) {
      const sQuery = await client.databases.query({
        database_id: env.studiesDbId,
        filter: { property: 'Herb', relation: { contains: pageId } },
        sorts: [{ property: 'Year', direction: 'descending' }],
        page_size: 10,
      })
      const bullets: string[] = []
      for (const s of sQuery.results as any[]) {
        const sp = s.properties || {}
        const title = getTitle(sp['Title']) || getRichText(sp['Title']) || 'Study'
        const year = sp['Year']?.number ? ` (${sp['Year'].number})` : ''
        const type = getSelect(sp['StudyType'])
        const outcome = getMultiSelect(sp['Outcomes']).join('/')
        const dir = getSelect(sp['EffectDirection'])
        bullets.push(`- ${title}${year} [${type}] – ${outcome} ${dir ? `(${dir})` : ''}`)
      }
      evidenceSummary = bullets.join('\n')
    }

    const interactions: string[] = getMultiSelect(props['InteractsWithDrugs'])
    const safetyWarnings: string[] = []
    const safetyRating = getSelect(props['SafetyRating'])
    if (safetyRating) safetyWarnings.push(`Safety rating: ${safetyRating}`)
    const contra = getMultiSelect(props['Contraindications'])
    if (contra?.length) safetyWarnings.push(`Contraindications: ${contra.join(', ')}`)
    const pregnancy = getSelect(props['Pregnancy'])
    if (pregnancy) safetyWarnings.push(`Pregnancy: ${pregnancy}`)
    const lactation = getSelect(props['Lactation'])
    if (lactation) safetyWarnings.push(`Lactation: ${lactation}`)

    const mapped: MappedHerbData = {
      id: pageId,
      name: name,
      latin_name: latin || undefined,
      slug: slug,
      category: category || undefined,
      overview: overview || undefined,
      benefits: benefits && benefits.length ? benefits : undefined,
      active_compounds: activeCompounds && activeCompounds.length ? activeCompounds : undefined,
      suitable_for: recommendedFor && recommendedFor.length ? recommendedFor : undefined,
      not_suitable_for: notRecommendedFor && notRecommendedFor.length ? notRecommendedFor : undefined,
      dosage_forms: dosage_forms.length ? dosage_forms : undefined,
      safety_warnings: safetyWarnings.length ? safetyWarnings : undefined,
      interactions: interactions.length ? interactions : undefined,
      scientific_evidence: evidenceSummary || undefined,
      faqs: faqs.length ? faqs : undefined,
      seo_keywords: seoKeywords && seoKeywords.length ? seoKeywords : undefined,
    }

    console.log(`🎉 Successfully mapped herb data for: ${name}`)
    return mapped
  } catch (error) {
    console.error('❌ Error processing herb data:', error)
    return null
  }
}


