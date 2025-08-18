const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Sanity客户端配置
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

// 从现有的草药数据源读取数据
function loadExistingHerbsData() {
  const sampleHerbs = [
    {
      id: 'turmeric',
      chinese_name: '姜黄',
      english_name: 'Turmeric',
      latin_name: 'Curcuma longa',
      category: 'blood-activating',
      constitution_type: 'blood-stasis',
      primary_effects: ['抗炎', '抗氧化', '保护肝脏'],
      secondary_effects: ['促进消化', '改善关节健康'],
      efficacy: ['消炎镇痛', '活血化瘀', '保肝利胆'],
      dosage: '每日500-1000mg标准化提取物',
      safety_level: 'high',
      contraindications: '孕妇慎用，胆结石患者避免',
      description: '姜黄是一种多年生草本植物，其根茎含有丰富的姜黄素，具有强大的抗炎和抗氧化作用。在传统印度医学和中医中都有广泛应用。',
      traditional_use: '中医认为姜黄味辛、苦，性温，归肝、脾经，具有活血化瘀、通经止痛的功效。常用于胸腹胀痛、经闭腹痛、风湿痹痛等症。',
      modern_applications: '现代研究证实姜黄素对关节炎、心血管疾病、肝病、消化不良等有显著疗效。被广泛用于功能性食品和膳食补充剂。',
      price_range: '50-200元/公斤',
      active_compounds: ['姜黄素', '去甲氧基姜黄素', '双去甲氧基姜黄素'],
      interaction_warnings: '可能增强抗凝血药物效果，与胆道阻塞药物有相互作用',
      storage_instructions: '密封保存，避光防潮，置于阴凉干燥处',
      preparation_methods: ['煎汤', '研粉冲服', '制成胶囊', '泡茶'],
      quality_indicators: '姜黄素含量≥3%，色泽鲜黄，气香特异',
      seasonal_availability: '秋冬季采收',
      geographic_distribution: '主产于四川、广西、云南，印度、缅甸也有分布',
      cultivation_notes: '喜温暖湿润气候，忌强光直射，适宜疏松肥沃的砂质壤土',
      harvest_processing: '秋末冬初采挖，洗净晒干或烘干，去须根切片'
    },
    {
      id: 'ginseng',
      chinese_name: '人参',
      english_name: 'Ginseng',
      latin_name: 'Panax ginseng',
      category: 'qi-tonifying',
      constitution_type: 'qi-deficiency',
      primary_effects: ['大补元气', '复脉固脱', '补脾益肺'],
      secondary_effects: ['安神益智', '生津止渴'],
      efficacy: ['体虚欲脱', '肢冷脉微', '脾虚食少'],
      dosage: '3-9g，另煎兑服',
      safety_level: 'medium',
      contraindications: '实热证、湿热证者忌服，不宜与藜芦同用',
      description: '人参是五加科植物人参的干燥根和根茎，被誉为"百草之王"，是珍贵的滋补药材。',
      traditional_use: '中医认为人参大补元气，是拯危救脱的要药。主治大病、久病、失血、脱液所致元气欲脱、神疲脉微。',
      modern_applications: '现代研究表明人参具有抗疲劳、抗衰老、增强免疫力、改善心脑血管功能等多种药理作用。',
      price_range: '500-5000元/公斤',
      active_compounds: ['人参皂苷', '人参多糖', '人参多肽'],
      interaction_warnings: '不宜与萝卜、茶叶同服，可能影响某些抗凝药物',
      storage_instructions: '密闭，置阴凉干燥处，防蛀',
      preparation_methods: ['另煎兑服', '研粉冲服', '泡酒', '炖汤'],
      quality_indicators: '根条粗壮，质坚实，皮细纹密，有芦头和须根',
      seasonal_availability: '秋季采挖',
      geographic_distribution: '主产于辽宁、吉林、黑龙江',
      cultivation_notes: '喜冷凉湿润气候，忌强光，需要遮阴栽培',
      harvest_processing: '秋季采挖6年以上的根，洗净晒干或烘干'
    },
    {
      id: 'ginkgo-leaf',
      chinese_name: '银杏叶',
      english_name: 'Ginkgo Leaf',
      latin_name: 'Ginkgo biloba',
      category: 'blood-activating',
      constitution_type: 'blood-stasis',
      primary_effects: ['活血化瘀', '通络止痛', '敛肺平喘'],
      secondary_effects: ['化浊降脂', '改善记忆'],
      efficacy: ['胸痹心痛', '中风偏瘫', '肺虚咳喘'],
      dosage: '9-12g',
      safety_level: 'high',
      contraindications: '孕妇慎用',
      description: '银杏叶是银杏科植物银杏的干燥叶，具有活血化瘀、通络止痛、敛肺平喘、化浊降脂的功效。',
      traditional_use: '传统用于胸痹心痛、中风偏瘫、肺虚咳喘、高脂血症等症。现代广泛用于心脑血管疾病的治疗。',
      modern_applications: '银杏叶提取物被广泛用于改善脑血管循环、增强记忆力、治疗痴呆症等。是重要的心脑血管保健产品原料。',
      price_range: '20-50元/公斤',
      active_compounds: ['银杏黄酮', '银杏内酯', '白果酸'],
      interaction_warnings: '可能增强抗凝药物作用，与某些抗癫痫药物有相互作用',
      storage_instructions: '置通风干燥处，防霉，防蛀',
      preparation_methods: ['煎汤', '制成提取物', '泡茶'],
      quality_indicators: '叶片完整，色泽黄绿，有效成分含量高',
      seasonal_availability: '秋季叶片变黄时采收',
      geographic_distribution: '全国各地均有栽培',
      cultivation_notes: '适应性强，耐寒耐旱，喜阳光充足环境',
      harvest_processing: '秋季采收叶片，及时干燥，保持色泽'
    },
    {
      id: 'angelica',
      chinese_name: '当归',
      english_name: 'Angelica',
      latin_name: 'Angelica sinensis',
      category: 'blood-tonifying',
      constitution_type: 'blood-deficiency',
      primary_effects: ['补血活血', '调经止痛', '润肠通便'],
      secondary_effects: ['温通经脉', '散寒止痛'],
      efficacy: ['血虚萎黄', '月经不调', '经闭痛经'],
      dosage: '6-12g',
      safety_level: 'high',
      contraindications: '湿盛中满及大便溏泄者慎服',
      description: '当归是伞形科植物当归的干燥根，素有"血家圣药"之称，是补血活血的重要药材。',
      traditional_use: '中医认为当归甘、辛、温，归肝、心、脾经。主治血虚诸证、月经不调、经闭痛经、虚寒腹痛、风湿痹痛等。',
      modern_applications: '现代研究证实当归具有造血、调节免疫、抗炎、抗氧化等作用，广泛用于妇科疾病和血液系统疾病的治疗。',
      price_range: '80-300元/公斤',
      active_compounds: ['当归多糖', '阿魏酸', '当归内酯'],
      interaction_warnings: '可能增强抗凝药物作用，与某些激素类药物需注意配伍',
      storage_instructions: '置通风干燥处，防蛀',
      preparation_methods: ['煎汤', '炖汤', '泡酒', '研粉'],
      quality_indicators: '根条粗壮，油润，断面黄白色，气浓香',
      seasonal_availability: '秋末采挖',
      geographic_distribution: '主产于甘肃、云南、四川、陕西',
      cultivation_notes: '喜冷凉湿润气候，忌高温，需要深厚肥沃的土壤',
      harvest_processing: '秋末采挖，除去须根和泥沙，待水分稍蒸发后捆成小把，上棚，用烟火慢慢熏干'
    },
    {
      id: 'astragalus',
      chinese_name: '黄芪',
      english_name: 'Astragalus',
      latin_name: 'Astragalus membranaceus',
      category: 'qi-tonifying',
      constitution_type: 'qi-deficiency',
      primary_effects: ['补气升阳', '固表止汗', '利水消肿'],
      secondary_effects: ['托疮生肌', '益卫固表'],
      efficacy: ['气虚乏力', '中气下陷', '自汗盗汗'],
      dosage: '9-30g',
      safety_level: 'high',
      contraindications: '表实邪盛，气滞湿阻，食积停滞，痈疽初起或溃后热毒尚盛等实证，以及阴虚阳亢者，均须禁服',
      description: '黄芪是豆科植物蒙古黄芪或膜荚黄芪的干燥根，是常用的补气药，被誉为"补药之长"。',
      traditional_use: '中医认为黄芪甘、微温，归肺、脾经。主治脾肺气虚、中气下陷、气虚自汗、气虚水肿、气血不足、便血崩漏等症。',
      modern_applications: '现代研究表明黄芪具有增强免疫力、抗疲劳、保护心脏、降血糖、抗衰老等多种药理作用，是重要的免疫调节剂。',
      price_range: '30-100元/公斤',
      active_compounds: ['黄芪甲苷', '黄芪多糖', '异黄酮类'],
      interaction_warnings: '可能影响某些免疫抑制剂的效果',
      storage_instructions: '置通风干燥处，防蛀',
      preparation_methods: ['煎汤', '炖汤', '泡茶', '研粉'],
      quality_indicators: '根条粗长，少分叉，表面浅棕黄色，质硬而韧，气微，味微甜',
      seasonal_availability: '春秋两季采挖',
      geographic_distribution: '主产于内蒙古、山西、甘肃、黑龙江',
      cultivation_notes: '喜凉爽气候，耐寒耐旱，忌涝，宜在排水良好的砂质壤土中生长',
      harvest_processing: '春秋两季采挖，除去须根及根头，晒干'
    }
  ];

  console.log(`📊 加载了 ${sampleHerbs.length} 种草药数据用于迁移`);
  return sampleHerbs;
}

// 创建草药文档的Sanity格式
function createHerbDocument(herb) {
  return {
    _type: 'herb',
    _id: `herb-${herb.id}`,
    title: herb.english_name,
    chineseName: herb.chinese_name,
    latinName: herb.latin_name,
    slug: {
      _type: 'slug',
      current: herb.id
    },
    category: herb.category,
    constitutionType: herb.constitution_type,
    description: herb.description,
    traditionalUse: herb.traditional_use,
    modernApplications: herb.modern_applications,
    primaryEffects: herb.primary_effects || [],
    secondaryEffects: herb.secondary_effects || [],
    efficacy: herb.efficacy || [],
    dosage: herb.dosage,
    safetyLevel: herb.safety_level,
    contraindications: herb.contraindications,
    priceRange: herb.price_range || '',
    activeCompounds: herb.active_compounds || [],
    interactionWarnings: herb.interaction_warnings || '',
    storageInstructions: herb.storage_instructions || '',
    preparationMethods: herb.preparation_methods || [],
    qualityIndicators: herb.quality_indicators || '',
    seasonalAvailability: herb.seasonal_availability || '',
    geographicDistribution: herb.geographic_distribution || '',
    cultivationNotes: herb.cultivation_notes || '',
    harvestProcessing: herb.harvest_processing || '',
    // SEO字段
    seoTitle: `${herb.english_name} (${herb.chinese_name}) - Benefits, Dosage & Safety | HerbScience`,
    seoDescription: `Learn about ${herb.english_name} benefits, proper dosage, safety information and traditional uses. Evidence-based herbal medicine guide.`,
    seoKeywords: [
      herb.english_name.toLowerCase(),
      herb.chinese_name,
      ...(herb.primary_effects || []).map(effect => effect.toLowerCase()),
      'herbal medicine',
      'traditional chinese medicine'
    ],
    // 状态字段
    status: 'published',
    publishedAt: new Date().toISOString()
  };
}

// 检查Sanity连接
async function testSanityConnection() {
  try {
    console.log('🔗 测试Sanity连接...');
    
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN环境变量未设置');
    }
    
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'your-project-id') {
      throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID环境变量未正确设置');
    }
    
    // 测试基本查询
    await client.fetch('*[_type == "herb"][0...1]');
    console.log('✅ Sanity连接成功');
    console.log(`📊 项目ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`📊 数据集: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
    
    return true;
  } catch (error) {
    console.error('❌ Sanity连接失败:', error.message);
    console.log('\n🔧 解决方案:');
    console.log('1. 确保已设置 SANITY_API_TOKEN 环境变量');
    console.log('2. 确保已设置 NEXT_PUBLIC_SANITY_PROJECT_ID 环境变量');
    console.log('3. Token需要具有Editor或Admin权限');
    console.log('4. 项目ID和数据集配置正确');
    console.log('\n📝 参考: SANITY_SETUP_GUIDE.md');
    return false;
  }
}

// 创建或更新草药记录
async function createOrUpdateHerb(herb) {
  try {
    const herbDoc = createHerbDocument(herb);
    
    // 检查是否已存在
    const existing = await client.fetch('*[_type == "herb" && slug.current == $slug][0]', {
      slug: herb.id
    });
    
    if (existing) {
      // 更新现有记录
      await client
        .patch(existing._id)
        .set(herbDoc)
        .commit();
      console.log(`🔄 更新: ${herb.english_name} (${herb.chinese_name})`);
      return 'updated';
    } else {
      // 创建新记录
      await client.create(herbDoc);
      console.log(`✅ 创建: ${herb.english_name} (${herb.chinese_name})`);
      return 'created';
    }
    
  } catch (error) {
    console.error(`❌ 处理失败 ${herb.english_name}:`, error.message);
    return 'error';
  }
}

// 主迁移函数
async function migrateHerbsToSanity() {
  console.log('🌿 开始迁移草药数据到Sanity CMS...\n');
  
  try {
    // 1. 测试连接
    const connectionOk = await testSanityConnection();
    if (!connectionOk) {
      return;
    }

    // 2. 加载草药数据
    console.log('\n📊 加载草药数据...');
    const herbs = loadExistingHerbsData();

    if (herbs.length === 0) {
      console.log('⚠️ 未找到草药数据');
      return;
    }

    // 3. 迁移草药数据
    console.log(`\n🔄 开始迁移 ${herbs.length} 种草药...\n`);
    
    let createdCount = 0;
    let updatedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < herbs.length; i++) {
      const herb = herbs[i];
      console.log(`\n🔄 处理 (${i + 1}/${herbs.length}): ${herb.english_name} (${herb.chinese_name})`);
      
      const result = await createOrUpdateHerb(herb);
      
      switch (result) {
        case 'created':
          createdCount++;
          break;
        case 'updated':
          updatedCount++;
          break;
        case 'error':
          errorCount++;
          break;
      }
      
      // 避免API速率限制
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 4. 迁移完成报告
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Sanity CMS迁移完成报告:');
    console.log(`✅ 新创建: ${createdCount} 种草药`);
    console.log(`🔄 已更新: ${updatedCount} 种草药`);
    console.log(`❌ 失败数量: ${errorCount} 种草药`);
    console.log(`📋 总计处理: ${herbs.length} 种草药`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    if (errorCount === 0) {
      console.log('\n🎉 所有草药数据已成功迁移到Sanity CMS！');
      console.log('\n🔗 下一步:');
      console.log('1. 访问管理界面: http://localhost:3000/admin');
      console.log('2. 查看草药数据库: 点击 "Herbs Database"');
      console.log('3. 编辑或添加更多草药信息');
      console.log('4. 配置图片和更多详细信息');
    } else {
      console.log(`\n⚠️ ${errorCount} 种草药迁移失败，请检查错误信息`);
    }

  } catch (error) {
    console.error('\n❌ 迁移过程失败:', error);
  }
}

// 执行迁移
if (require.main === module) {
  // 检查环境变量
  if (!process.env.SANITY_API_TOKEN) {
    console.log('❌ 请先设置SANITY_API_TOKEN环境变量');
    console.log('📝 参考: SANITY_SETUP_GUIDE.md');
    process.exit(1);
  }
  
  migrateHerbsToSanity().catch(console.error);
}

module.exports = { migrateHerbsToSanity };
