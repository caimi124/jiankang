const { createClient } = require('@sanity/client')

// Sanity客户端配置
const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp', // 编辑权限token
  apiVersion: '2024-01-01',
  useCdn: false
})

// SEO优化模板
const seoTemplates = {
  'qi-tonifying': {
    title: '{herb} Benefits: Natural Energy & Vitality Support | HerbScience',
    description: 'Discover {herb} benefits for energy, vitality, and immune support. Learn about traditional uses, modern research, and safe dosage guidelines.',
    keywords: ['{herb} benefits', 'energy herbs', 'vitality support', 'immune herbs', 'traditional medicine']
  },
  'blood-tonifying': {
    title: '{herb} Benefits: Natural Blood Health & Circulation Support | HerbScience',
    description: 'Explore {herb} benefits for blood health, circulation, and overall vitality. Expert guidance on traditional uses and modern applications.',
    keywords: ['{herb} benefits', 'blood health', 'circulation herbs', 'vitality herbs', 'traditional medicine']
  },
  'yang-tonifying': {
    title: '{herb} Benefits: Natural Yang Energy & Warmth Support | HerbScience',
    description: 'Learn about {herb} benefits for yang energy, warmth, and vitality. Traditional wisdom meets modern research for optimal health.',
    keywords: ['{herb} benefits', 'yang energy', 'warmth herbs', 'vitality herbs', 'traditional medicine']
  },
  'yin-tonifying': {
    title: '{herb} Benefits: Natural Yin Nourishment & Cooling Support | HerbScience',
    description: 'Discover {herb} benefits for yin nourishment, cooling effects, and internal balance. Expert insights on traditional and modern uses.',
    keywords: ['{herb} benefits', 'yin nourishment', 'cooling herbs', 'balance herbs', 'traditional medicine']
  },
  'blood-activating': {
    title: '{herb} Benefits: Natural Blood Circulation & Vitality Support | HerbScience',
    description: 'Explore {herb} benefits for blood circulation, vitality, and overall wellness. Traditional knowledge backed by modern research.',
    keywords: ['{herb} benefits', 'blood circulation', 'vitality herbs', 'wellness herbs', 'traditional medicine']
  },
  'qi-regulating': {
    title: '{herb} Benefits: Natural Qi Flow & Balance Support | HerbScience',
    description: 'Learn about {herb} benefits for qi flow, balance, and emotional wellness. Traditional wisdom for modern health challenges.',
    keywords: ['{herb} benefits', 'qi flow', 'balance herbs', 'emotional wellness', 'traditional medicine']
  },
  'heat-clearing': {
    title: '{herb} Benefits: Natural Cooling & Anti-inflammatory Support | HerbScience',
    description: 'Discover {herb} benefits for cooling effects, inflammation reduction, and immune support. Traditional remedies for modern health.',
    keywords: ['{herb} benefits', 'cooling herbs', 'anti-inflammatory', 'immune support', 'traditional medicine']
  },
  'dampness-resolving': {
    title: '{herb} Benefits: Natural Dampness Resolution & Digestive Support | HerbScience',
    description: 'Explore {herb} benefits for dampness resolution, digestive health, and overall wellness. Traditional wisdom for modern digestive challenges.',
    keywords: ['{herb} benefits', 'dampness resolution', 'digestive herbs', 'wellness herbs', 'traditional medicine']
  },
  'digestive': {
    title: '{herb} Benefits: Natural Digestive Health & Comfort Support | HerbScience',
    description: 'Learn about {herb} benefits for digestive health, comfort, and overall wellness. Traditional remedies for modern digestive issues.',
    keywords: ['{herb} benefits', 'digestive health', 'digestive herbs', 'wellness herbs', 'traditional medicine']
  },
  'sedative': {
    title: '{herb} Benefits: Natural Calming & Sleep Support | HerbScience',
    description: 'Discover {herb} benefits for calming effects, sleep support, and stress relief. Traditional wisdom for modern sleep challenges.',
    keywords: ['{herb} benefits', 'calming herbs', 'sleep support', 'stress relief', 'traditional medicine']
  },
  'anti-inflammatory': {
    title: '{herb} Benefits: Natural Anti-inflammatory & Pain Relief Support | HerbScience',
    description: 'Explore {herb} benefits for inflammation reduction, pain relief, and overall wellness. Traditional remedies for modern inflammatory conditions.',
    keywords: ['{herb} benefits', 'anti-inflammatory', 'pain relief', 'wellness herbs', 'traditional medicine']
  },
  'diuretic': {
    title: '{herb} Benefits: Natural Diuretic & Kidney Support | HerbScience',
    description: 'Learn about {herb} benefits for natural diuretic effects, kidney support, and fluid balance. Traditional wisdom for modern health.',
    keywords: ['{herb} benefits', 'diuretic herbs', 'kidney support', 'fluid balance', 'traditional medicine']
  },
  'cardiovascular': {
    title: '{herb} Benefits: Natural Heart Health & Circulation Support | HerbScience',
    description: 'Discover {herb} benefits for heart health, circulation, and cardiovascular wellness. Traditional knowledge for modern heart care.',
    keywords: ['{herb} benefits', 'heart health', 'circulation herbs', 'cardiovascular herbs', 'traditional medicine']
  },
  'dermatological': {
    title: '{herb} Benefits: Natural Skin Health & Beauty Support | HerbScience',
    description: 'Explore {herb} benefits for skin health, beauty, and dermatological wellness. Traditional remedies for modern skin care.',
    keywords: ['{herb} benefits', 'skin health', 'beauty herbs', 'dermatological herbs', 'traditional medicine']
  },
  'other': {
    title: '{herb} Benefits: Natural Health & Wellness Support | HerbScience',
    description: 'Learn about {herb} benefits for natural health and wellness support. Traditional wisdom meets modern research for optimal health.',
    keywords: ['{herb} benefits', 'natural health', 'wellness herbs', 'traditional medicine', 'herbal remedies']
  }
}

async function optimizeHerbSEO() {
  try {
    console.log('🔍 开始优化草药SEO信息...')
    
    // 获取所有草药
    const herbs = await client.fetch('*[_type == "herb"]')
    
    console.log(`📊 发现 ${herbs.length} 个草药需要SEO优化`)
    
    let optimizedCount = 0
    let skippedCount = 0
    
    for (const herb of herbs) {
      try {
        const category = herb.category || 'other'
        const title = herb.title || herb.chineseName || 'Herb'
        const template = seoTemplates[category] || seoTemplates['other']
        
        // 检查是否需要更新
        const needsUpdate = !herb.seoTitle || 
                           !herb.seoDescription || 
                           !herb.seoKeywords ||
                           herb.seoKeywords.length === 0
        
        if (!needsUpdate) {
          console.log(`⏭️  跳过已优化的草药: ${title}`)
          skippedCount++
          continue
        }
        
        // 生成SEO内容
        const seoTitle = template.title.replace(/{herb}/g, title)
        const seoDescription = template.description.replace(/{herb}/g, title)
        const seoKeywords = template.keywords.map(keyword => keyword.replace(/{herb}/g, title))
        
        // 更新SEO信息
        await client.patch(herb._id)
          .set({
            seoTitle: seoTitle,
            seoDescription: seoDescription,
            seoKeywords: seoKeywords
          })
          .commit()
        
        console.log(`✅ SEO优化: ${title}`)
        optimizedCount++
        
        // 添加延迟
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (error) {
        console.error(`❌ SEO优化失败: ${herb.title || herb.chineseName}`, error.message)
      }
    }
    
    console.log('\n🎉 SEO优化完成!')
    console.log(`✅ 成功优化: ${optimizedCount}`)
    console.log(`⏭️  跳过: ${skippedCount}`)
    console.log(`📊 总计处理: ${herbs.length}`)
    
  } catch (error) {
    console.error('❌ SEO优化失败:', error.message)
  }
}

optimizeHerbSEO()
