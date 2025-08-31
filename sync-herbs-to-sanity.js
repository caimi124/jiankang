const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Sanity客户端配置
const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp', // 编辑权限token
  apiVersion: '2024-01-01',
  useCdn: false
})

// 读取草药数据库
const herbsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'herbs-database-completed.json'), 'utf8'))

// 数据映射函数
function mapHerbData(herb) {
  return {
    _type: 'herb',
    title: herb.english_name || herb.chinese_name,
    chineseName: herb.chinese_name,
    latinName: herb.latin_name,
    slug: {
      _type: 'slug',
      current: herb.english_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 
               herb.chinese_name?.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-') || 
               `herb-${Date.now()}`
    },
    category: mapCategory(herb.category),
    constitutionType: mapConstitutionType(herb.constitution_type),
    description: herb.description || `${herb.english_name || herb.chinese_name} is a traditional herbal medicine with various health benefits.`,
    traditionalUse: herb.traditional_use || herb.description,
    modernApplications: herb.modern_applications,
    primaryEffects: herb.primary_effects || [],
    secondaryEffects: herb.secondary_effects || [],
    efficacy: herb.efficacy || herb.primary_effects || [],
    dosage: herb.dosage || 'Please consult with a healthcare professional for proper dosage.',
    safetyLevel: mapSafetyLevel(herb.safety_level),
    contraindications: herb.contraindications || 'Consult with a healthcare professional before use.',
    priceRange: herb.price_range || 'moderate',
    activeCompounds: herb.ingredients || [],
    interactionWarnings: herb.interactions || 'No known interactions reported.',
    storageInstructions: herb.storage || 'Store in a cool, dry place away from direct sunlight.',
    preparationMethods: herb.preparation ? [herb.preparation] : [],
    qualityIndicators: herb.quality_score ? `Quality Score: ${herb.quality_score}/100` : '',
    seasonalAvailability: herb.harvest_season || 'Year-round',
    geographicDistribution: herb.growing_regions?.join(', ') || 'Various regions',
    cultivationNotes: herb.cultivation_notes || '',
    harvestProcessing: herb.harvest_processing || '',
    seoTitle: herb.seo_title || `${herb.english_name || herb.chinese_name} Benefits and Uses`,
    seoDescription: herb.seo_description || herb.description || `${herb.english_name || herb.chinese_name} - Traditional herbal medicine with modern health benefits.`,
    seoKeywords: herb.seo_keywords || [],
    status: 'published',
    publishedAt: herb.created_time || new Date().toISOString()
  }
}

// 分类映射
function mapCategory(category) {
  const categoryMap = {
    'qi-tonifying': 'qi-tonifying',
    'blood-tonifying': 'blood-tonifying',
    'yang-tonifying': 'yang-tonifying',
    'yin-tonifying': 'yin-tonifying',
    'blood-activating': 'blood-activating',
    'qi-regulating': 'qi-regulating',
    'heat-clearing': 'heat-clearing',
    'dampness-resolving': 'dampness-resolving',
    'digestive': 'digestive',
    'sedative': 'sedative',
    'general': 'qi-tonifying' // 默认分类
  }
  return categoryMap[category] || 'qi-tonifying'
}

// 体质类型映射
function mapConstitutionType(constitution) {
  const constitutionMap = {
    '平和质': 'balanced',
    '气虚质': 'qi-deficiency',
    '血虚质': 'blood-deficiency',
    '阳虚质': 'yang-deficiency',
    '阴虚质': 'yin-deficiency',
    '痰湿质': 'phlegm-dampness',
    '湿热质': 'damp-heat',
    '血瘀质': 'blood-stasis',
    '气郁质': 'qi-stagnation',
    '特禀质': 'special-constitution'
  }
  return constitutionMap[constitution] || 'balanced'
}

// 安全等级映射
function mapSafetyLevel(level) {
  const safetyMap = {
    '高': 'high',
    '中': 'medium',
    '低': 'low'
  }
  return safetyMap[level] || 'medium'
}

// 主同步函数
async function syncHerbsToSanity() {
  console.log('🌿 开始同步草药数据到Sanity CMS...')
  console.log(`📊 总共需要同步 ${herbsData.length} 个草药`)
  
  let successCount = 0
  let errorCount = 0
  let skippedCount = 0
  
  for (let i = 0; i < herbsData.length; i++) {
    const herb = herbsData[i]
    
    try {
      // 检查是否已存在 - 修复参数传递问题
      const existingHerbs = await client.fetch(
        `*[_type == "herb" && (title == $title || chineseName == $chineseName)]`,
        { 
          title: herb.english_name || '', 
          chineseName: herb.chinese_name || '' 
        }
      )
      
      if (existingHerbs.length > 0) {
        console.log(`⏭️  跳过已存在的草药: ${herb.english_name || herb.chinese_name}`)
        skippedCount++
        continue
      }
      
      // 创建新草药文档
      const herbDoc = mapHerbData(herb)
      const result = await client.create(herbDoc)
      
      console.log(`✅ 成功创建: ${herb.english_name || herb.chinese_name} (ID: ${result._id})`)
      successCount++
      
      // 添加延迟避免API限制
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (error) {
      console.error(`❌ 同步失败: ${herb.english_name || herb.chinese_name}`, error.message)
      errorCount++
    }
    
    // 显示进度
    if ((i + 1) % 10 === 0) {
      console.log(`📈 进度: ${i + 1}/${herbsData.length} (${Math.round((i + 1) / herbsData.length * 100)}%)`)
    }
  }
  
  console.log('\n🎉 同步完成!')
  console.log(`✅ 成功: ${successCount}`)
  console.log(`⏭️  跳过: ${skippedCount}`)
  console.log(`❌ 失败: ${errorCount}`)
  console.log(`📊 总计: ${herbsData.length}`)
}

// 运行同步
syncHerbsToSanity().catch(console.error)
