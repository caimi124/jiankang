const fs = require('fs');

console.log('🌿 开始导出草药数据...\n');

// 从CSV文件读取草药数据
function loadHerbsFromCSV() {
  try {
    const csvContent = fs.readFileSync('./complete-herbs-csv.txt', 'utf8');
    const lines = csvContent.trim().split('\n');
    
    const herbs = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length >= 5) {
        const herbName = values[1]?.replace(/"/g, '').trim();
        const therapeuticArea = values[3]?.replace(/"/g, '').trim();
        const botanicalName = values[2]?.replace(/"/g, '').trim();
        const referenceUrl = values[4]?.replace(/"/g, '').trim();
        
        if (herbName && herbName !== 'English Name') {
          herbs.push({
            '草药名称': herbName,
            '中文名': translateToChineseName(herbName),
            '植物学名': botanicalName,
            '简要描述': mapToDescription(therapeuticArea),
            '成分构成': getComposition(herbName),
            '推荐剂量': getDosage(herbName),
            '功效分类': getCategories(therapeuticArea),
            '使用建议': getUsageRecommendations(therapeuticArea),
            '安全性等级': getSafetyLevel(herbName),
            '注意事项': getPrecautions(herbName),
            '中医体质匹配': getTCMConstitution(therapeuticArea),
            '参考链接': referenceUrl,
            '治疗领域': therapeuticArea
          });
        }
      }
    }
    
    return herbs;
  } catch (error) {
    console.error('读取CSV失败:', error);
    return [];
  }
}

// 中文名称翻译
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
    'Sage': '鼠尾草'
  };
  
  return translations[englishName] || englishName + '(待翻译)';
}

// 描述映射
function mapToDescription(therapeuticArea) {
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
    'Anti-inflammatory': '清热解毒、消炎止痛'
  };
  
  return descriptions[therapeuticArea] || '调理身体、增进健康';
}

// 成分构成
function getComposition(herbName) {
  return '天然活性成分、植物多糖、黄酮类化合物';
}

// 推荐剂量
function getDosage(herbName) {
  return '每日 200-500mg（请遵循产品标签）';
}

// 功效分类
function getCategories(therapeuticArea) {
  const categoryMap = {
    'Urinary tract disorders': '泌尿系统,生殖健康',
    'Diabetes': '代谢调节,血糖管理',
    'Depression': '神经系统,情绪管理',
    'Memory enhancement': '认知功能,脑部健康',
    'Immune system': '免疫调节,体质增强',
    'Cardiovascular': '心血管,循环系统',
    'Digestive disorders': '消化系统,肠胃健康',
    'Respiratory': '呼吸系统,肺部健康',
    'Liver health': '肝脏健康,解毒功能',
    'Anti-inflammatory': '抗炎,疼痛管理'
  };
  
  return categoryMap[therapeuticArea] || '保健养生,体质调理';
}

// 使用建议
function getUsageRecommendations(therapeuticArea) {
  return '餐后服用，请遵循医嘱';
}

// 安全等级
function getSafetyLevel(herbName) {
  const highSafety = ['Green Tea', 'Ginger Root', 'Garlic', 'Chamomile', 'Peppermint'];
  if (highSafety.includes(herbName)) return '高';
  return '中';
}

// 注意事项
function getPrecautions(herbName) {
  return '孕妇慎用，过敏体质注意，请咨询专业医生';
}

// 中医体质
function getTCMConstitution(therapeuticArea) {
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
    'Anti-inflammatory': '湿热体质'
  };
  
  return constitutionMap[therapeuticArea] || '平和体质';
}

// 生成CSV
function generateCSV(herbs) {
  const headers = [
    '草药名称',
    '中文名',
    '植物学名',
    '简要描述',
    '成分构成',
    '推荐剂量',
    '功效分类',
    '使用建议',
    '安全性等级',
    '注意事项',
    '中医体质匹配',
    '参考链接'
  ];
  
  let csvContent = headers.join(',') + '\n';
  
  herbs.forEach(herb => {
    const row = [
      `"${herb.草药名称}"`,
      `"${herb.中文名}"`,
      `"${herb.植物学名}"`,
      `"${herb.简要描述}"`,
      `"${herb.成分构成}"`,
      `"${herb.推荐剂量}"`,
      `"${herb.功效分类}"`,
      `"${herb.使用建议}"`,
      `"${herb.安全性等级}"`,
      `"${herb.注意事项}"`,
      `"${herb.中医体质匹配}"`,
      `"${herb.参考链接}"`
    ];
    csvContent += row.join(',') + '\n';
  });
  
  return csvContent;
}

// 主函数
function main() {
  console.log('📊 正在加载草药数据...');
  
  const herbs = loadHerbsFromCSV();
  console.log(`✅ 成功加载 ${herbs.length} 种草药数据`);
  
  if (herbs.length === 0) {
    console.log('❌ 没有找到草药数据');
    return;
  }
  
  // 生成JSON文件
  const jsonData = {
    metadata: {
      title: 'HerbScience.shop 草药数据库',
      description: '包含多种草药的完整信息数据库',
      version: '1.0',
      created: new Date().toISOString(),
      totalCount: herbs.length
    },
    herbs: herbs
  };
  
  try {
    fs.writeFileSync('./herbs-notion-export.json', JSON.stringify(jsonData, null, 2), 'utf8');
    console.log('✅ JSON导出完成: herbs-notion-export.json');
    
    // 生成CSV文件
    const csvContent = generateCSV(herbs);
    fs.writeFileSync('./herbs-notion-import.csv', csvContent, 'utf8');
    console.log('✅ CSV导出完成: herbs-notion-import.csv');
    
    // 显示预览
    console.log('\n📋 草药数据预览:');
    herbs.slice(0, 5).forEach((herb, index) => {
      console.log(`${index + 1}. ${herb.草药名称} (${herb.中文名}) - ${herb.简要描述}`);
    });
    
    if (herbs.length > 5) {
      console.log(`... 以及其他 ${herbs.length - 5} 种草药`);
    }
    
    console.log('\n🎯 导入到Notion的步骤:');
    console.log('1. 在Notion中创建新的数据库');
    console.log('2. 点击右上角的"..."菜单');
    console.log('3. 选择"Import"');
    console.log('4. 上传 herbs-notion-import.csv 文件');
    console.log('5. 确认字段映射并完成导入');
    
  } catch (error) {
    console.error('❌ 文件写入失败:', error);
  }
}

// 运行主函数
main(); 