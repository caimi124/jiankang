const { Client } = require("@notionhq/client");
const fs = require('fs');

// Notion集成配置
const notion = new Client({ 
  auth: "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" 
});

// 从URL https://www.notion.so/2156f14b923c802c8d48d84247b6681a?v=2156f14b923c8057aa40000cd7f2e0cb 
// 提取正确的数据库ID
const databaseId = "2156f14b923c802c8d48d84247b6681a";

// 从CSV文件读取完整的50种草药数据
function loadAllHerbsData() {
  try {
    // 读取我们之前生成的完整草药CSV数据
    const csvContent = fs.readFileSync('./complete-herbs-csv.txt', 'utf8');
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
    
    const herbs = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length >= 5) {
        const herbName = values[1]?.replace(/"/g, '').trim();
        const chineseName = translateToChineseName(herbName);
        const therapeuticArea = values[3]?.replace(/"/g, '').trim();
        const botanicalName = values[2]?.replace(/"/g, '').trim();
        const referenceUrl = values[4]?.replace(/"/g, '').trim();
        
        if (herbName && herbName !== 'English Name') {
          herbs.push({
            herbName: herbName,
            chineseName: chineseName,
            briefDescription: mapTherapeuticAreaToDescription(therapeuticArea),
            composition: generateCompositionForHerb(herbName),
            recommendedDosage: generateDosageForHerb(herbName),
            efficacyCategory: mapTherapeuticAreaToCategory(therapeuticArea),
            usageRecommendations: generateUsageRecommendations(therapeuticArea),
            safetyLevel: assignSafetyLevel(herbName),
            precautions: generatePrecautions(herbName, therapeuticArea),
            tcmConstitution: mapToTCMConstitution(therapeuticArea),
            botanicalName: botanicalName,
            referenceUrl: referenceUrl
          });
        }
      }
    }
    
    return herbs;
  } catch (error) {
    console.error('读取草药数据失败:', error);
    return getBackupHerbsData(); // 使用备用数据
  }
}

// 备用草药数据（以防CSV读取失败）
function getBackupHerbsData() {
  return [
    {
      herbName: 'Citrus peel',
      chineseName: '陈皮',
      briefDescription: '利尿通淋、清热解毒',
      composition: '挥发油、柠檬苦素、橙皮苷',
      recommendedDosage: '每日 200-400mg',
      efficacyCategory: ['泌尿系统', '生殖健康'],
      usageRecommendations: '多饮水，餐后服用',
      safetyLevel: 'medium',
      precautions: '孕妇慎用，过敏体质注意',
      tcmConstitution: '湿热体质',
      botanicalName: 'Citrus reticulata Blanco.',
      referenceUrl: 'https://www.anna-europa.eu/en/medicines/herbal/chenpi-radix'
    },
    {
      herbName: 'Bear-berry Leaf',
      chineseName: '熊果叶',
      briefDescription: '利尿通淋、清热解毒',
      composition: '熊果苷、鞣质、黄酮类化合物',
      recommendedDosage: '每日 200-400mg',
      efficacyCategory: ['泌尿系统', '生殖健康'],
      usageRecommendations: '多饮水，餐后服用',
      safetyLevel: 'medium',
      precautions: '孕妇慎用，过敏体质注意',
      tcmConstitution: '湿热体质',
      botanicalName: 'Arctostaphylos uva-ursi (L.) Spreng.',
      referenceUrl: 'https://www.anna-europa.eu/en/medicines/herbal/uvae-ursi-folium'
    },
    {
      herbName: 'Green Tea',
      chineseName: '绿茶',
      briefDescription: '调节代谢、平衡内分泌',
      composition: '儿茶素、茶多酚、维生素C',
      recommendedDosage: '每日 300-400mg',
      efficacyCategory: ['代谢调节', '血糖管理'],
      usageRecommendations: '餐后服用，定期检查',
      safetyLevel: 'high',
      precautions: '孕妇慎用，过敏体质注意',
      tcmConstitution: '痰湿体质',
      botanicalName: 'Camellia sinensis (L.) Kuntze',
      referenceUrl: 'https://www.anna-europa.eu/en/medicines/herbal/theae-folium-viride'
    },
    {
      herbName: 'St. John\'s Wort',
      chineseName: '贯叶连翘',
      briefDescription: '安神定志、疏肝解郁',
      composition: '金丝桃素、假金丝桃素、黄酮类',
      recommendedDosage: '每日 300-900mg',
      efficacyCategory: ['神经系统', '情绪管理'],
      usageRecommendations: '睡前服用，避免白天',
      safetyLevel: 'medium',
      precautions: '可能与多种药物相互作用，孕妇禁用',
      tcmConstitution: '气郁体质',
      botanicalName: 'Hypericum perforatum L.',
      referenceUrl: 'https://www.anna-europa.eu/en/medicines/herbal/hyperici-herba'
    }
  ];
}

// 中文名称翻译映射
function translateToChineseName(englishName) {
  const translations = {
    'Citrus peel': '陈皮',
    'Bear-berry Leaf': '熊果叶',
    'Green Tea': '绿茶',
    'St. John\'s Wort': '贯叶连翘',
    'Ginkgo Leaf': '银杏叶',
    'Echinacea': '紫锥花',
    'Ginseng': '人参',
    'Turmeric': '姜黄',
    'Valerian Root': '缬草根',
    'Milk Thistle': '水飞蓟',
    'Saw Palmetto': '锯棕榈',
    'Ginger Root': '生姜',
    'Garlic': '大蒜',
    'Aloe Vera': '芦荟',
    'Chamomile': '洋甘菊',
    'Lavender': '薰衣草',
    'Peppermint': '薄荷',
    'Rosemary': '迷迭香',
    'Thyme': '百里香',
    'Sage': '鼠尾草',
    'Oregano': '牛至',
    'Basil': '罗勒',
    'Calendula': '金盏花',
    'Echinacea purpurea': '紫锥花',
    'Hawthorn': '山楂',
    'Dandelion': '蒲公英',
    'Nettle': '荨麻',
    'Plantain': '车前草',
    'Willow Bark': '白柳皮',
    'Horse Chestnut': '七叶树',
    'Gentian Root': '龙胆根',
    'Artichoke': '朝鲜蓟',
    'Fennel': '茴香',
    'Caraway': '葛缕子',
    'Coriander': '芫荽',
    'Fenugreek': '胡芦巴',
    'Licorice Root': '甘草',
    'Marshmallow Root': '药蜀葵根',
    'Slippery Elm': '榆树皮',
    'Elderberry': '接骨木果',
    'Cranberry': '蔓越莓',
    'Bilberry': '越橘',
    'Goji Berry': '枸杞',
    'Schisandra': '五味子',
    'Astragalus': '黄芪',
    'Reishi Mushroom': '灵芝',
    'Cordyceps': '冬虫夏草',
    'Rhodiola': '红景天',
    'Ashwagandha': '印度人参',
    'Brahmi': '假马齿苋'
  };
  
  return translations[englishName] || englishName + '(待翻译)';
}

// 将治疗区域映射为中文描述
function mapTherapeuticAreaToDescription(therapeuticArea) {
  const descriptions = {
    'Urinary tract disorders': '利尿通淋、清热解毒',
    'Diabetes': '调节代谢、平衡内分泌',
    'Depression': '安神定志、疏肝解郁',
    'Memory enhancement': '益智健脑、改善记忆',
    'Immune system': '增强免疫、扶正固本',
    'Cardiovascular': '养心安神、活血化瘀',
    'Digestive disorders': '健脾和胃、助消化',
    'Respiratory': '宣肺止咳、化痰平喘',
    'Liver health': '疏肝理气、保肝护肝',
    'Anti-inflammatory': '清热解毒、消炎止痛',
    'Anxiety': '安神定志、舒缓情绪',
    'Sleep disorders': '安神助眠、调节睡眠',
    'Skin conditions': '清热解毒、润肤养颜',
    'Menopause': '调节内分泌、缓解更年期',
    'Prostate health': '补肾益精、保护前列腺'
  };
  
  return descriptions[therapeuticArea] || '调理身体、增进健康';
}

// 将治疗区域映射为功效分类
function mapTherapeuticAreaToCategory(therapeuticArea) {
  const categoryMap = {
    'Urinary tract disorders': ['泌尿系统', '生殖健康'],
    'Diabetes': ['代谢调节', '血糖管理'],
    'Depression': ['神经系统', '情绪管理'],
    'Memory enhancement': ['认知功能', '脑部健康'],
    'Immune system': ['免疫调节', '体质增强'],
    'Cardiovascular': ['心血管', '循环系统'],
    'Digestive disorders': ['消化系统', '肠胃健康'],
    'Respiratory': ['呼吸系统', '肺部健康'],
    'Liver health': ['肝脏健康', '解毒功能'],
    'Anti-inflammatory': ['抗炎', '疼痛管理'],
    'Anxiety': ['情绪调节', '压力管理'],
    'Sleep disorders': ['睡眠调节', '神经系统'],
    'Skin conditions': ['皮肤健康', '美容养颜'],
    'Menopause': ['女性健康', '内分泌调节'],
    'Prostate health': ['男性健康', '前列腺保健']
  };
  
  return categoryMap[therapeuticArea] || ['保健养生', '体质调理'];
}

// 为草药生成成分信息
function generateCompositionForHerb(herbName) {
  const compositions = {
    'Citrus peel': '挥发油、柠檬苦素、橙皮苷、类黄酮',
    'Bear-berry Leaf': '熊果苷、鞣质、黄酮类化合物、有机酸',
    'Green Tea': '儿茶素、茶多酚、维生素C、咖啡因',
    'St. John\'s Wort': '金丝桃素、假金丝桃素、黄酮类、酚酸',
    'Ginkgo Leaf': '黄酮类、萜类、有机酸、银杏内酯',
    'Echinacea': '多糖、酚酸、烷基酰胺、挥发油',
    'Ginseng': '人参皂苷、多糖、氨基酸、维生素',
    'Turmeric': '姜黄素、挥发油、多糖、蛋白质',
    'Valerian Root': '缬草酸、异缬草酸、挥发油、生物碱',
    'Milk Thistle': '水飞蓟素、黄酮类、脂肪酸、蛋白质'
  };
  
  return compositions[herbName] || '天然活性成分、植物多糖、黄酮类化合物';
}

// 生成推荐剂量
function generateDosageForHerb(herbName) {
  const dosages = {
    'Citrus peel': '每日 200-400mg',
    'Bear-berry Leaf': '每日 200-400mg',
    'Green Tea': '每日 300-400mg',
    'St. John\'s Wort': '每日 300-900mg',
    'Ginkgo Leaf': '每日 120-240mg',
    'Echinacea': '每日 300-500mg',
    'Ginseng': '每日 200-600mg',
    'Turmeric': '每日 300-500mg',
    'Valerian Root': '每日 300-600mg',
    'Milk Thistle': '每日 200-400mg'
  };
  
  return dosages[herbName] || '每日 200-500mg（请遵循产品标签）';
}

// 生成使用建议
function generateUsageRecommendations(therapeuticArea) {
  const recommendations = {
    'Urinary tract disorders': '多饮水，餐后服用',
    'Diabetes': '餐后服用，定期检查血糖',
    'Depression': '睡前服用，避免白天嗜睡',
    'Memory enhancement': '餐后服用，分次服用',
    'Immune system': '饭前服用，连续使用不超过8周',
    'Cardiovascular': '餐后服用，避免空腹',
    'Digestive disorders': '饭前或饭后服用，温水送服',
    'Respiratory': '餐后服用，可配合蜂蜜',
    'Liver health': '餐后服用，避免酒精',
    'Anti-inflammatory': '餐后服用，避免空腹'
  };
  
  return recommendations[therapeuticArea] || '餐后服用，请遵循医嘱';
}

// 分配安全等级
function assignSafetyLevel(herbName) {
  const highSafety = ['Green Tea', 'Ginger Root', 'Garlic', 'Chamomile', 'Peppermint'];
  const lowSafety = ['St. John\'s Wort', 'Ephedra', 'Kava'];
  
  if (highSafety.includes(herbName)) return 'high';
  if (lowSafety.includes(herbName)) return 'low';
  return 'medium';
}

// 生成注意事项
function generatePrecautions(herbName, therapeuticArea) {
  const specificPrecautions = {
    'St. John\'s Wort': '可能与多种药物相互作用，孕妇禁用',
    'Ginkgo Leaf': '抗凝血药物使用者慎用',
    'Valerian Root': '可能引起嗜睡，驾驶前避免使用',
    'Echinacea': '自身免疫疾病患者慎用'
  };
  
  const generalPrecautions = {
    'Depression': '严重抑郁症患者请咨询医生',
    'Diabetes': '糖尿病患者需监测血糖变化',
    'Cardiovascular': '心脏病患者使用前请咨询医生'
  };
  
  return specificPrecautions[herbName] || 
         generalPrecautions[therapeuticArea] || 
         '孕妇慎用，过敏体质注意，请咨询专业医生';
}

// 映射到中医体质
function mapToTCMConstitution(therapeuticArea) {
  const constitutionMap = {
    'Urinary tract disorders': '湿热体质',
    'Diabetes': '痰湿体质',
    'Depression': '气郁体质',
    'Memory enhancement': '肾虚体质',
    'Immune system': '气虚体质',
    'Cardiovascular': '血瘀体质',
    'Digestive disorders': '脾虚体质',
    'Respiratory': '肺虚体质',
    'Liver health': '肝郁体质',
    'Anti-inflammatory': '湿热体质',
    'Anxiety': '气郁体质',
    'Sleep disorders': '心肾不交',
    'Skin conditions': '血热体质',
    'Menopause': '肝肾阴虚',
    'Prostate health': '肾阳虚'
  };
  
  return constitutionMap[therapeuticArea] || '平和体质';
}

// 检查Notion数据库中是否已存在某个草药
async function findExistingHerb(herbName) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "草药名称",
        title: {
          equals: herbName
        }
      }
    });
    
    return response.results.length > 0 ? response.results[0] : null;
  } catch (error) {
    console.error(`查询草药 ${herbName} 失败:`, error);
    return null;
  }
}

// 创建新的草药页面
async function createHerbPage(herb) {
  try {
    const detailContent = generateHerbDetailContent(herb);
    
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "草药名称": {
          title: [
            {
              text: {
                content: herb.herbName
              }
            }
          ]
        },
        "中文名": {
          rich_text: [
            {
              text: {
                content: herb.chineseName
              }
            }
          ]
        },
        "简要描述": {
          rich_text: [
            {
              text: {
                content: herb.briefDescription
              }
            }
          ]
        },
        "成分构成": {
          rich_text: [
            {
              text: {
                content: herb.composition
              }
            }
          ]
        },
        "推荐剂量": {
          rich_text: [
            {
              text: {
                content: herb.recommendedDosage
              }
            }
          ]
        },
        "功效分类": {
          multi_select: herb.efficacyCategory.map(category => ({ name: category }))
        },
        "使用建议": {
          rich_text: [
            {
              text: {
                content: herb.usageRecommendations
              }
            }
          ]
        },
        "安全性等级": {
          select: {
            name: herb.safetyLevel === 'high' ? '高' : herb.safetyLevel === 'medium' ? '中' : '低'
          }
        },
        "注意事项": {
          rich_text: [
            {
              text: {
                content: herb.precautions
              }
            }
          ]
        },
        "中医体质匹配": {
          rich_text: [
            {
              text: {
                content: herb.tcmConstitution
              }
            }
          ]
        },
        "植物学名": {
          rich_text: [
            {
              text: {
                content: herb.botanicalName || '待补充'
              }
            }
          ]
        },
        "参考链接": {
          url: herb.referenceUrl || null
        }
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: detailContent
                }
              }
            ]
          }
        }
      ]
    });
    
    console.log(`✅ 成功创建草药页面: ${herb.herbName} (${herb.chineseName})`);
    return response;
    
  } catch (error) {
    console.error(`❌ 创建草药页面失败 ${herb.herbName}:`, error.message);
    return null;
  }
}

// 更新现有草药页面
async function updateHerbPage(pageId, herb) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        "中文名": {
          rich_text: [
            {
              text: {
                content: herb.chineseName
              }
            }
          ]
        },
        "简要描述": {
          rich_text: [
            {
              text: {
                content: herb.briefDescription
              }
            }
          ]
        },
        "成分构成": {
          rich_text: [
            {
              text: {
                content: herb.composition
              }
            }
          ]
        },
        "推荐剂量": {
          rich_text: [
            {
              text: {
                content: herb.recommendedDosage
              }
            }
          ]
        },
        "功效分类": {
          multi_select: herb.efficacyCategory.map(category => ({ name: category }))
        },
        "使用建议": {
          rich_text: [
            {
              text: {
                content: herb.usageRecommendations
              }
            }
          ]
        },
        "安全性等级": {
          select: {
            name: herb.safetyLevel === 'high' ? '高' : herb.safetyLevel === 'medium' ? '中' : '低'
          }
        },
        "注意事项": {
          rich_text: [
            {
              text: {
                content: herb.precautions
              }
            }
          ]
        },
        "中医体质匹配": {
          rich_text: [
            {
              text: {
                content: herb.tcmConstitution
              }
            }
          ]
        },
        "植物学名": {
          rich_text: [
            {
              text: {
                content: herb.botanicalName || '待补充'
              }
            }
          ]
        },
        "参考链接": {
          url: herb.referenceUrl || null
        }
      }
    });
    
    console.log(`🔄 成功更新草药页面: ${herb.herbName} (${herb.chineseName})`);
    return response;
    
  } catch (error) {
    console.error(`❌ 更新草药页面失败 ${herb.herbName}:`, error.message);
    return null;
  }
}

// 生成草药详细内容
function generateHerbDetailContent(herb) {
  return `# ${herb.herbName} (${herb.chineseName})

## 📋 基本信息
**草药名称**: ${herb.herbName}
**中文名**: ${herb.chineseName}
**植物学名**: ${herb.botanicalName || '待补充'}
**简要描述**: ${herb.briefDescription}

## 🧪 成分构成
${herb.composition}

## 💊 推荐剂量
**标准剂量**: ${herb.recommendedDosage}

**具体建议**:
- 初次使用者: 建议从推荐剂量的低端开始
- 一般保健: 按标准剂量使用
- 特殊需求: 请咨询专业医疗人员
- 请遵循产品标签说明或咨询专业人士

## 🎯 功效分类
**主要功效**: ${herb.efficacyCategory.join('、')}

## 📖 使用建议
**最佳服用方式**: ${herb.usageRecommendations}

## 🛡️ 安全性评估
**安全性等级**: ${herb.safetyLevel === 'high' ? '高' : herb.safetyLevel === 'medium' ? '中' : '低'}

## ⚠️ 注意事项与禁忌
**主要注意事项**: ${herb.precautions}

## 🏥 中医体质匹配
**适宜体质**: ${herb.tcmConstitution}

## 📚 参考资料
${herb.referenceUrl || '详细信息请咨询专业医疗机构'}

---
*本信息仅供参考，不构成医疗建议。使用前请咨询专业医疗人员。*`;
}

// 主同步函数
async function syncHerbsToNotion() {
  console.log('🌿 开始同步草药数据到Notion数据库...\n');
  
  try {
    // 加载草药数据
    const herbs = loadAllHerbsData();
    console.log(`📊 加载了 ${herbs.length} 种草药数据`);
    
    let createdCount = 0;
    let updatedCount = 0;
    let errorCount = 0;
    
    // 遍历每种草药
    for (let i = 0; i < herbs.length; i++) {
      const herb = herbs[i];
      console.log(`\n🔄 处理 (${i + 1}/${herbs.length}): ${herb.herbName} (${herb.chineseName})`);
      
      // 检查是否已存在
      const existingPage = await findExistingHerb(herb.herbName);
      
      if (existingPage) {
        // 更新现有页面
        const result = await updateHerbPage(existingPage.id, herb);
        if (result) {
          updatedCount++;
        } else {
          errorCount++;
        }
      } else {
        // 创建新页面
        const result = await createHerbPage(herb);
        if (result) {
          createdCount++;
        } else {
          errorCount++;
        }
      }
      
      // 添加延时避免API限制
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // 同步完成报告
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Notion同步完成报告:');
    console.log(`✅ 新创建: ${createdCount} 种草药`);
    console.log(`🔄 已更新: ${updatedCount} 种草药`);
    console.log(`❌ 错误数: ${errorCount} 种草药`);
    console.log(`📋 总处理: ${herbs.length} 种草药`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (errorCount === 0) {
      console.log('🎉 所有草药数据已成功同步到Notion数据库！');
      console.log(`🔗 查看您的数据库: https://www.notion.so/${databaseId.replace(/-/g, '')}`);
    } else {
      console.log('⚠️ 部分草药同步过程中出现错误，请检查日志');
    }
    
  } catch (error) {
    console.error('❌ 同步过程失败:', error);
  }
}

// 测试Notion连接
async function testNotionConnection() {
  try {
    console.log('🔍 测试Notion连接...');
    const response = await notion.databases.retrieve({ database_id: databaseId });
    console.log('✅ Notion连接成功！');
    console.log(`📋 数据库名称: ${response.title[0]?.plain_text || '草药科学数据库'}`);
    return true;
  } catch (error) {
    console.error('❌ Notion连接失败:', error.message);
    console.log('请检查:');
    console.log('1. Notion API密钥是否正确');
    console.log('2. 数据库ID是否正确');
    console.log('3. 集成是否已被添加到数据库');
    return false;
  }
}

// 主执行函数
async function main() {
  console.log('🚀 HerbScience.shop 草药数据Notion同步工具');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // 测试连接
  const connectionOk = await testNotionConnection();
  if (!connectionOk) {
    console.log('\n❌ 无法连接到Notion，请检查配置后重试');
    return;
  }
  
  console.log('\n📋 即将同步以下数据到Notion:');
  console.log('• 草药英文名称和中文名称');
  console.log('• 植物学名称');
  console.log('• 成分构成和推荐剂量');
  console.log('• 功效分类和使用建议');
  console.log('• 安全性等级和注意事项');
  console.log('• 中医体质匹配');
  console.log('• 参考链接和详细描述\n');
  
  // 开始同步
  await syncHerbsToNotion();
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { syncHerbsToNotion, testNotionConnection, loadAllHerbsData }; 