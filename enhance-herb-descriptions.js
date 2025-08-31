const { createClient } = require('@sanity/client')

// Sanity客户端配置
const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp', // 编辑权限token
  apiVersion: '2024-01-01',
  useCdn: false
})

// 草药功效增强数据
const herbEnhancements = {
  'Ginseng': {
    description: 'Ginseng is one of the most popular and well-researched herbs in traditional Chinese medicine. It is known as a powerful adaptogen that helps the body cope with stress and fatigue.',
    modernApplications: 'Modern research shows ginseng may support immune function, improve cognitive performance, reduce fatigue, and help manage blood sugar levels.',
    primaryEffects: ['Energy Boost', 'Stress Relief', 'Immune Support', 'Cognitive Enhancement'],
    activeCompounds: ['Ginsenosides', 'Polysaccharides', 'Peptides', 'Flavonoids'],
    dosage: '200-400mg standardized extract daily, or 1-2g dried root powder',
    safetyLevel: 'high',
    contraindications: 'Avoid during pregnancy, with blood pressure medications, or if you have bleeding disorders.'
  },
  
  'Ginger': {
    description: 'Ginger is a versatile root herb that has been used for thousands of years in both culinary and medicinal applications. It is particularly renowned for its digestive and anti-inflammatory properties.',
    modernApplications: 'Modern studies confirm ginger\'s effectiveness for nausea, motion sickness, morning sickness, and inflammatory conditions like osteoarthritis.',
    primaryEffects: ['Digestive Support', 'Anti-inflammatory', 'Nausea Relief', 'Pain Management'],
    activeCompounds: ['Gingerol', 'Shogaol', 'Zingerone', 'Essential Oils'],
    dosage: '1-2g dried powder daily, or 2-4g fresh root',
    safetyLevel: 'high',
    contraindications: 'Generally safe, but may interact with blood thinners. Use with caution if you have gallstones.'
  },
  
  'Turmeric': {
    description: 'Turmeric, often called the "golden spice," is a bright yellow-orange root that has been a cornerstone of Ayurvedic medicine for over 4,000 years.',
    modernApplications: 'Contemporary research highlights turmeric\'s potent anti-inflammatory and antioxidant properties, making it valuable for joint health, brain function, and overall wellness.',
    primaryEffects: ['Anti-inflammatory', 'Antioxidant', 'Joint Health', 'Brain Support'],
    activeCompounds: ['Curcumin', 'Turmerone', 'Demethoxycurcumin', 'Bisdemethoxycurcumin'],
    dosage: '500-2000mg curcumin extract daily, or 1-3g dried powder',
    safetyLevel: 'high',
    contraindications: 'May slow blood clotting. Avoid before surgery or with blood thinners.'
  },
  
  'Ginkgo biloba': {
    description: 'Ginkgo biloba is one of the oldest living tree species and has been used in traditional medicine for thousands of years to support brain health and circulation.',
    modernApplications: 'Modern research supports ginkgo\'s benefits for cognitive function, memory enhancement, and peripheral circulation, particularly in older adults.',
    primaryEffects: ['Cognitive Enhancement', 'Memory Support', 'Circulation Improvement', 'Antioxidant'],
    activeCompounds: ['Ginkgolides', 'Bilobalide', 'Flavonoids', 'Terpenes'],
    dosage: '120-240mg standardized extract daily',
    safetyLevel: 'medium',
    contraindications: 'May increase bleeding risk. Avoid with blood thinners or before surgery.'
  },
  
  'Echinacea': {
    description: 'Echinacea is a popular immune-supporting herb native to North America. It has been used by Native Americans for centuries to support overall health and wellness.',
    modernApplications: 'Contemporary studies suggest echinacea may help reduce the duration and severity of cold symptoms and support immune system function.',
    primaryEffects: ['Immune Support', 'Cold Relief', 'Anti-inflammatory', 'Antioxidant'],
    activeCompounds: ['Alkamides', 'Polysaccharides', 'Caffeic Acid Derivatives', 'Essential Oils'],
    dosage: '300-500mg extract 3 times daily at first sign of symptoms',
    safetyLevel: 'high',
    contraindications: 'Generally safe, but avoid if you have autoimmune conditions or are taking immunosuppressants.'
  },
  
  'Valerian': {
    description: 'Valerian is a perennial flowering plant that has been used as a natural sleep aid and anxiety reliever since ancient Greek and Roman times.',
    modernApplications: 'Modern research supports valerian\'s effectiveness for improving sleep quality, reducing sleep latency, and managing mild anxiety and stress.',
    primaryEffects: ['Sleep Support', 'Anxiety Relief', 'Stress Management', 'Muscle Relaxation'],
    activeCompounds: ['Valerenic Acid', 'Valeranone', 'Essential Oils', 'Iridoids'],
    dosage: '300-600mg extract 30-60 minutes before bedtime',
    safetyLevel: 'medium',
    contraindications: 'May cause drowsiness. Avoid with alcohol or sedative medications. Not recommended during pregnancy.'
  },
  
  'Chamomile': {
    description: 'Chamomile is a gentle, daisy-like flower that has been cherished for its calming and soothing properties for thousands of years across many cultures.',
    modernApplications: 'Contemporary research confirms chamomile\'s benefits for sleep quality, digestive comfort, and mild anxiety relief.',
    primaryEffects: ['Calming', 'Sleep Support', 'Digestive Comfort', 'Anti-inflammatory'],
    activeCompounds: ['Apigenin', 'Bisabolol', 'Chamazulene', 'Essential Oils'],
    dosage: '1-4 cups of tea daily, or 220-1100mg extract',
    safetyLevel: 'high',
    contraindications: 'May cause allergic reactions in people sensitive to ragweed. Generally safe for most people.'
  },
  
  'Cinnamon': {
    description: 'Cinnamon is a warm, aromatic spice derived from the inner bark of several tree species. It has been valued for both its flavor and medicinal properties for millennia.',
    modernApplications: 'Modern studies suggest cinnamon may help regulate blood sugar levels, support heart health, and provide antioxidant benefits.',
    primaryEffects: ['Blood Sugar Support', 'Antioxidant', 'Anti-inflammatory', 'Heart Health'],
    activeCompounds: ['Cinnamaldehyde', 'Cinnamic Acid', 'Eugenol', 'Proanthocyanidins'],
    dosage: '1-6g daily powder, or 500-1000mg extract',
    safetyLevel: 'high',
    contraindications: 'High doses may cause liver issues. Choose Ceylon cinnamon over cassia for long-term use.'
  }
}

async function enhanceHerbDescriptions() {
  try {
    console.log('🔍 开始增强草药描述信息...')
    
    let enhancedCount = 0
    let skippedCount = 0
    
    for (const [herbName, enhancement] of Object.entries(herbEnhancements)) {
      try {
        // 查找草药
        const herbs = await client.fetch(
          `*[_type == "herb" && (title == $title || title match $title)]`,
          { title: herbName }
        )
        
        if (herbs.length === 0) {
          console.log(`❓ 未找到草药: ${herbName}`)
          continue
        }
        
        const herb = herbs[0]
        
        // 检查是否需要更新
        const needsUpdate = !herb.description || 
                           herb.description.length < 100 || 
                           !herb.modernApplications ||
                           !herb.primaryEffects ||
                           herb.primaryEffects.length === 0
        
        if (!needsUpdate) {
          console.log(`⏭️  跳过已完善的草药: ${herbName}`)
          skippedCount++
          continue
        }
        
        // 更新草药信息
        const updateData = {
          description: enhancement.description,
          modernApplications: enhancement.modernApplications,
          primaryEffects: enhancement.primaryEffects,
          activeCompounds: enhancement.activeCompounds || herb.activeCompounds,
          dosage: enhancement.dosage || herb.dosage,
          safetyLevel: enhancement.safetyLevel || herb.safetyLevel,
          contraindications: enhancement.contraindications || herb.contraindications
        }
        
        await client.patch(herb._id)
          .set(updateData)
          .commit()
        
        console.log(`✅ 增强描述: ${herbName}`)
        enhancedCount++
        
        // 添加延迟
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (error) {
        console.error(`❌ 更新失败: ${herbName}`, error.message)
      }
    }
    
    console.log('\n🎉 描述增强完成!')
    console.log(`✅ 成功增强: ${enhancedCount}`)
    console.log(`⏭️  跳过: ${skippedCount}`)
    console.log(`📊 总计处理: ${Object.keys(herbEnhancements).length}`)
    
  } catch (error) {
    console.error('❌ 描述增强失败:', error.message)
  }
}

enhanceHerbDescriptions()
