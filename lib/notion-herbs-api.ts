import { Client } from '@notionhq/client'

// Notion客户端配置
const notion = new Client({
  auth: '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'
})

// 草药数据库ID - 需要确认正确的数据库ID
const HERBS_DATABASE_ID = '2156f14b-923c-802c-8d48-d84247b6681a'

// 草药接口定义
export interface NotionHerb {
  id: string
  name_en: string
  name_cn: string
  latin_name: string
  category: string
  description_short: string
  description_detail: string
  safety_notes: string
  safety_level: 'high' | 'medium' | 'low'
  efficacy: string[]
  constitution_type: string
  dosage: string
  contraindications: string
  modern_applications: string
  traditional_use: string
  image_url?: string
  price_range: string
  availability: string
  quality_score: number
  popularity_score: number
  usage_suggestions: string
  ingredients: string[]
}

// 从Notion获取所有草药
export async function getAllHerbsFromNotion(): Promise<NotionHerb[]> {
  try {
    console.log('📋 Fetching all herbs from Notion database...')
    
    const response = await notion.databases.query({
      database_id: HERBS_DATABASE_ID,
      page_size: 100
    })
    
    const herbs: NotionHerb[] = []
    
    for (const page of response.results) {
      if ('properties' in page) {
        const herb = parseNotionHerbPage(page)
        if (herb) herbs.push(herb)
      }
    }
    
    console.log(`✅ Successfully fetched ${herbs.length} herbs from Notion`)
    return herbs
    
  } catch (error) {
    console.error('❌ Error fetching herbs from Notion:', error)
    return []
  }
}

// 根据ID获取单个草药
export async function getHerbByIdFromNotion(herbId: string): Promise<NotionHerb | null> {
  try {
    console.log(`🔍 Fetching herb ${herbId} from Notion...`)
    
    const response = await notion.pages.retrieve({
      page_id: herbId
    })
    
    if ('properties' in response) {
      const herb = parseNotionHerbPage(response)
      console.log(`✅ Successfully fetched herb: ${herb?.name_en || 'Unknown'}`)
      return herb
    }
    
    return null
    
  } catch (error) {
    console.error(`❌ Error fetching herb ${herbId}:`, error)
    return null
  }
}

// 搜索草药
export async function searchHerbsFromNotion(query: string): Promise<NotionHerb[]> {
  try {
    console.log(`🔍 Searching herbs for: "${query}"`)
    
    const response = await notion.databases.query({
      database_id: HERBS_DATABASE_ID,
      filter: {
        or: [
          {
            property: '草药名称',
            title: {
              contains: query
            }
          },
          {
            property: '中文名',
            rich_text: {
              contains: query
            }
          },
          {
            property: '使用建议',
            rich_text: {
              contains: query
            }
          }
        ]
      }
    })
    
    const herbs: NotionHerb[] = []
    
    for (const page of response.results) {
      if ('properties' in page) {
        const herb = parseNotionHerbPage(page)
        if (herb) herbs.push(herb)
      }
    }
    
    console.log(`✅ Found ${herbs.length} herbs matching "${query}"`)
    return herbs
    
  } catch (error) {
    console.error(`❌ Error searching herbs for "${query}":`, error)
    return []
  }
}

// 解析Notion页面为草药对象
function parseNotionHerbPage(page: any): NotionHerb | null {
  try {
    const properties = page.properties
    
    // 提取基本信息
    const nameProperty = properties['草药名称'] || properties['Name'] || properties['name']
    const name_en = nameProperty?.title?.[0]?.text?.content || 'Unknown'
    
    const chineseNameProperty = properties['中文名'] || properties['Chinese Name']
    const name_cn = chineseNameProperty?.rich_text?.[0]?.text?.content || ''
    
    const usageProperty = properties['使用建议'] || properties['Usage']
    const description_detail = usageProperty?.rich_text?.[0]?.text?.content || ''
    
    const safetyProperty = properties['注意事项'] || properties['Safety']
    const safety_notes = safetyProperty?.rich_text?.[0]?.text?.content || ''
    
    const dosageProperty = properties['推荐剂量'] || properties['Dosage']
    const dosage = dosageProperty?.rich_text?.[0]?.text?.content || '请咨询专业医师'
    
    const efficacyProperty = properties['功效分类'] || properties['Efficacy']
    const efficacy = efficacyProperty?.multi_select?.map((item: any) => item.name) || []
    
    const safetyLevelProperty = properties['安全性等级'] || properties['Safety Level']
    const safetyLevelText = safetyLevelProperty?.select?.name || 'medium'
    let safety_level: 'high' | 'medium' | 'low' = 'medium'
    
    if (safetyLevelText?.includes('安全') || safetyLevelText?.includes('Safe')) {
      safety_level = 'high'
    } else if (safetyLevelText?.includes('慎用') || safetyLevelText?.includes('Caution')) {
      safety_level = 'low'
    }
    
    // 生成英文名的slug
    const slug = name_en.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    const herb: NotionHerb = {
      id: page.id,
      name_en: name_en,
      name_cn: name_cn,
      latin_name: name_en, // 如果没有拉丁名，使用英文名
      category: 'general',
      description_short: description_detail.substring(0, 200) + (description_detail.length > 200 ? '...' : ''),
      description_detail: description_detail,
      safety_notes: safety_notes,
      safety_level: safety_level,
      efficacy: efficacy,
      constitution_type: 'balanced',
      dosage: dosage,
      contraindications: safety_notes,
      modern_applications: description_detail,
      traditional_use: description_detail,
      price_range: 'moderate',
      availability: 'common',
      quality_score: 75,
      popularity_score: 70,
      usage_suggestions: description_detail,
      ingredients: ['待补充']
    }
    
    return herb
    
  } catch (error) {
    console.error('❌ Error parsing Notion herb page:', error)
    return null
  }
}

// 获取数据库结构信息
export async function getNotionDatabaseSchema() {
  try {
    const database = await notion.databases.retrieve({
      database_id: HERBS_DATABASE_ID
    })
    
    console.log('📊 Notion Database Schema:')
    Object.entries(database.properties).forEach(([key, property]) => {
      console.log(`  - ${key}: ${property.type}`)
    })
    
    return database.properties
    
  } catch (error) {
    console.error('❌ Error getting database schema:', error)
    return null
  }
}

// 测试连接
export async function testNotionConnection() {
  try {
    console.log('🧪 Testing Notion connection...')
    
    const response = await notion.databases.query({
      database_id: HERBS_DATABASE_ID,
      page_size: 1
    })
    
    console.log('✅ Notion connection successful!')
    console.log(`📊 Database contains ${response.results.length > 0 ? 'data' : 'no data'}`)
    
    return true
    
  } catch (error) {
    console.error('❌ Notion connection failed:', error)
    return false
  }
} 