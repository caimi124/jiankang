const { createClient } = require('@sanity/client')

// Sanity客户端配置
const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp', // 编辑权限token
  apiVersion: '2024-01-01',
  useCdn: false
})

// 扩展的草药分类映射
const extendedCategoryMapping = {
  // 补气药
  'qi-tonifying': [
    '人参', 'Ginseng', '西洋参', '太子参', '党参', '黄芪', '白术', '山药', '大枣', '甘草',
    'Ginkgo folium', 'Ginkgo biloba', '银杏叶', '银杏', 'Ginger', '生姜'
  ],
  
  // 补血药
  'blood-tonifying': [
    '当归', '熟地黄', '白芍', '阿胶', '何首乌', '龙眼肉', '桑椹', '枸杞子',
    'Rose Hip', 'Rosae caninae fructus', '玫瑰果'
  ],
  
  // 补阳药
  'yang-tonifying': [
    '鹿茸', '肉苁蓉', '巴戟天', '淫羊藿', '杜仲', '续断', '菟丝子', '沙苑子',
    'Cinnamon', 'Cinnamon Bark', 'Calli cortex', '肉桂'
  ],
  
  // 补阴药
  'yin-tonifying': [
    '北沙参', '南沙参', '麦冬', '天冬', '石斛', '玉竹', '黄精', '女贞子', '墨旱莲',
    'Sweet Almond', 'Pruni dulcis radix', '甜杏仁'
  ],
  
  // 活血化瘀药
  'blood-activating': [
    '川芎', '丹参', '红花', '桃仁', '益母草', '牛膝', '鸡血藤', '月季花',
    'Hawthorn Fruit and Flower', 'Crataegi fructus cum flore', '山楂'
  ],
  
  // 理气药
  'qi-regulating': [
    '陈皮', '青皮', '枳实', '枳壳', '木香', '香附', '乌药', '沉香', '川楝子',
    'Star Anise', 'Anisi stellati fructus', '八角茴香'
  ],
  
  // 清热药
  'heat-clearing': [
    '金银花', '连翘', '板蓝根', '大青叶', '青黛', '贯众', '蒲公英', '紫花地丁',
    'Echinaceae purpureae radix', 'Echinacea', '紫锥菊', 'Echinaceae angustifoliae radix',
    'Echinacea purpurea herba', 'Calendulae flos', '金盏花', 'Calendula',
    'Green Tea', 'Theae folium viride', '绿茶', 'Black Tea', 'Theae folium', '红茶',
    'Lemon Balm', 'Melissae folium', '柠檬香蜂草', 'Sage Leaf', 'Salviae officinalis folium', '鼠尾草'
  ],
  
  // 祛湿药
  'dampness-resolving': [
    '茯苓', '薏苡仁', '泽泻', '猪苓', '车前子', '滑石', '木通', '通草',
    'Psyllium Husk', 'Plantaginis ovatae testa', '车前子壳', 'Psyllium Seed', 'Plantaginis ovatae semen',
    'Ribwort Plantain', 'Plantaginis lanceolatae herba', '车前草'
  ],
  
  // 消化药
  'digestive': [
    '生姜', 'Ginger', '干姜', '高良姜', '砂仁', '白豆蔻', '草豆蔻', '草果',
    'Foeniculi vulgaris fructus', 'Foeniculi dulcis fructus', '茴香', 'Fennel',
    'Sennae folium', '番泻叶', 'Senna', 'Gentianae radix', '龙胆',
    'Angelica Root', 'Angelicae radix', '当归根'
  ],
  
  // 安神药
  'sedative': [
    '酸枣仁', '柏子仁', '远志', '合欢皮', '夜交藤', '灵芝', '缬草', 'Valerianae radix',
    'Valerian', 'Passiflorae herba', '西番莲', 'Passionflower', 'Hyperici herba', '贯叶连翘',
    'Chamomile Flower', 'Matricariae flos', '洋甘菊', 'Elder Flower', 'Sambuci flos', '接骨木花'
  ],
  
  // 新增：消炎药
  'anti-inflammatory': [
    'Arnicae herba', 'Arnicae flos', '山金车', 'Witch Hazel', 'Hamamelidis folium', '金缕梅叶',
    'Witch Hazel Bark', 'Hamamelidis cortex', '金缕梅皮', 'Marshmallow Herb', 'Altheae herba', '药蜀葵',
    'Marshmallow Root', 'Altheae radix', '药蜀葵根', 'Nettle Herb', 'Urticae herba', '荨麻',
    'Nettle Root', 'Urticae radix', '荨麻根'
  ],
  
  // 新增：利尿药
  'diuretic': [
    'Bear-berry Leaf', 'Uvae ursi folium', '熊果叶', 'Birch Leaf', 'Betulae folium', '桦树叶',
    'Centaurii herba', '百金花'
  ],
  
  // 新增：心血管药
  'cardiovascular': [
    'Horse Chestnut Seed', 'Hippocastani semen', '马栗子', 'Willow Bark', 'Salicis cortex', '柳树皮'
  ],
  
  // 新增：皮肤药
  'dermatological': [
    'Heartsease', 'Violae tricoloris herba', '三色堇', 'Heather', 'Ericae herba', '石楠'
  ],
  
  // 新增：其他
  'other': [
    'Refined Soy Oil', 'Sojae oleum raffinatum', '精制大豆油', 'Myrrh', 'Myrrha', '没药',
    'Wild Mint Herbs', 'Melted herba', '野薄荷', 'Alder Buckthorn Bark', 'Frangulae cortex', '鼠李皮',
    'Milk Thistle Fruit', 'Cardui mariae fructus', '奶蓟果'
  ]
}

// 反向映射：从草药名到分类
const herbToCategory = {}
Object.entries(extendedCategoryMapping).forEach(([category, herbs]) => {
  herbs.forEach(herb => {
    herbToCategory[herb.toLowerCase()] = category
  })
})

async function completeHerbCategories() {
  try {
    console.log('🔍 开始完善草药分类信息...')
    
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
        for (const [category, herbs] of Object.entries(extendedCategoryMapping)) {
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
    
    console.log('\n🎉 分类完善完成!')
    console.log(`✅ 成功更新: ${updatedCount}`)
    console.log(`❓ 无法匹配: ${noMatchCount}`)
    console.log(`📊 总计处理: ${uncategorizedHerbs.length}`)
    
  } catch (error) {
    console.error('❌ 分类完善失败:', error.message)
  }
}

completeHerbCategories()
