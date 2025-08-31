const { createClient } = require('@sanity/client')

// Sanity客户端配置
const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp', // 编辑权限token
  apiVersion: '2024-01-01',
  useCdn: false
})

// 草药分类映射规则
const categoryMapping = {
  // 补气药
  'qi-tonifying': [
    '人参', 'Ginseng', '西洋参', '太子参', '党参', '黄芪', '白术', '山药', '大枣', '甘草',
    'Ginkgo folium', 'Ginkgo biloba', '银杏叶', '银杏'
  ],
  
  // 补血药
  'blood-tonifying': [
    '当归', '熟地黄', '白芍', '阿胶', '何首乌', '龙眼肉', '桑椹', '枸杞子'
  ],
  
  // 补阳药
  'yang-tonifying': [
    '鹿茸', '肉苁蓉', '巴戟天', '淫羊藿', '杜仲', '续断', '菟丝子', '沙苑子'
  ],
  
  // 补阴药
  'yin-tonifying': [
    '北沙参', '南沙参', '麦冬', '天冬', '石斛', '玉竹', '黄精', '女贞子', '墨旱莲'
  ],
  
  // 活血化瘀药
  'blood-activating': [
    '川芎', '丹参', '红花', '桃仁', '益母草', '牛膝', '鸡血藤', '月季花'
  ],
  
  // 理气药
  'qi-regulating': [
    '陈皮', '青皮', '枳实', '枳壳', '木香', '香附', '乌药', '沉香', '川楝子'
  ],
  
  // 清热药
  'heat-clearing': [
    '金银花', '连翘', '板蓝根', '大青叶', '青黛', '贯众', '蒲公英', '紫花地丁',
    'Echinaceae purpureae radix', 'Echinacea', '紫锥菊', 'Echinaceae angustifoliae radix',
    'Echinacea purpurea herba', 'Calendulae flos', '金盏花', 'Calendula'
  ],
  
  // 祛湿药
  'dampness-resolving': [
    '茯苓', '薏苡仁', '泽泻', '猪苓', '车前子', '滑石', '木通', '通草'
  ],
  
  // 消化药
  'digestive': [
    '生姜', 'Ginger', '干姜', '高良姜', '砂仁', '白豆蔻', '草豆蔻', '草果',
    'Foeniculi vulgaris fructus', 'Foeniculi dulcis fructus', '茴香', 'Fennel',
    'Sennae folium', '番泻叶', 'Senna', 'Gentianae radix', '龙胆'
  ],
  
  // 安神药
  'sedative': [
    '酸枣仁', '柏子仁', '远志', '合欢皮', '夜交藤', '灵芝', '缬草', 'Valerianae radix',
    'Valerian', 'Passiflorae herba', '西番莲', 'Passionflower', 'Hyperici herba', '贯叶连翘'
  ]
}

// 反向映射：从草药名到分类
const herbToCategory = {}
Object.entries(categoryMapping).forEach(([category, herbs]) => {
  herbs.forEach(herb => {
    herbToCategory[herb.toLowerCase()] = category
  })
})

async function improveHerbCategories() {
  try {
    console.log('🔍 开始改善草药分类信息...')
    
    // 获取所有未分类的草药
    const uncategorizedHerbs = await client.fetch(
      `*[_type == "herb" && (!defined(category) || category == "未分类" || category == "")]`
    )
    
    console.log(`📊 发现 ${uncategorizedHerbs.length} 个未分类的草药`)
    
    let updatedCount = 0
    let noMatchCount = 0
    
    for (const herb of uncategorizedHerbs) {
      const title = herb.title || ''
      const chineseName = herb.chineseName || ''
      
      // 尝试匹配分类
      let matchedCategory = null
      
      // 先检查英文名称
      if (title) {
        matchedCategory = herbToCategory[title.toLowerCase()]
      }
      
      // 再检查中文名称
      if (!matchedCategory && chineseName) {
        matchedCategory = herbToCategory[chineseName.toLowerCase()]
      }
      
      // 检查部分匹配
      if (!matchedCategory) {
        for (const [category, herbs] of Object.entries(categoryMapping)) {
          const hasMatch = herbs.some(herbName => 
            title.toLowerCase().includes(herbName.toLowerCase()) ||
            chineseName.toLowerCase().includes(herbName.toLowerCase())
          )
          if (hasMatch) {
            matchedCategory = category
            break
          }
        }
      }
      
      if (matchedCategory) {
        try {
          // 更新分类
          await client.patch(herb._id)
            .set({ category: matchedCategory })
            .commit()
          
          console.log(`✅ 更新分类: ${title} (${chineseName}) → ${matchedCategory}`)
          updatedCount++
          
          // 添加延迟
          await new Promise(resolve => setTimeout(resolve, 100))
          
        } catch (error) {
          console.error(`❌ 更新失败: ${title}`, error.message)
        }
      } else {
        console.log(`❓ 无法匹配分类: ${title} (${chineseName})`)
        noMatchCount++
      }
    }
    
    console.log('\n🎉 分类改善完成!')
    console.log(`✅ 成功更新: ${updatedCount}`)
    console.log(`❓ 无法匹配: ${noMatchCount}`)
    console.log(`📊 总计处理: ${uncategorizedHerbs.length}`)
    
  } catch (error) {
    console.error('❌ 分类改善失败:', error.message)
  }
}

improveHerbCategories()
