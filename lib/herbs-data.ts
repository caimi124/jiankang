// 草药数据库 - 用于网站集成
export interface Herb {
  id: string;
  herbName: string;
  chineseName: string;
  briefDescription: string;
  composition: string;
  recommendedDosage: string;
  efficacyCategory: string[];
  usageRecommendations: string;
  safetyLevel: 'high' | 'medium' | 'low';
  precautions: string;
  tcmConstitution: string;
  caseStudy: string;
  detailedDescription: string;
  imageUrl?: string;
}

export const herbsDatabase: Herb[] = [
  {
    id: 'turmeric',
    herbName: 'Turmeric',
    chineseName: '姜黄',
    briefDescription: '抗炎、关节疼痛、肠胃调节',
    composition: '姜黄素、挥发油',
    recommendedDosage: '每日 300-500mg',
    efficacyCategory: ['消化健康', '炎症管理'],
    usageRecommendations: '饭后服用，避免空腹',
    safetyLevel: 'high',
    precautions: '孕妇禁用',
    tcmConstitution: '湿热体质',
    caseStudy: '用户A服用3个月，改善关节疼痛',
    detailedDescription: `姜黄的主要活性成分姜黄素(Curcumin)是一种强效的抗炎化合物，具有显著的抗氧化特性。
    
    **详细功效：**
    - 消化系统：促进胆汁分泌，改善消化功能，缓解肠胃不适
    - 炎症管理：天然抗炎作用，有助缓解关节疼痛和肌肉炎症
    - 抗氧化：清除自由基，延缓细胞老化
    - 肝脏保护：支持肝脏解毒功能，保护肝细胞
    
    **使用指导：**
    - 建议餐后30分钟内服用，以减少胃肠刺激
    - 可与黑胡椒或脂肪一起服用以提高吸收率
    - 连续使用不宜超过8周，建议间歇性使用`,
    imageUrl: '/herbs/turmeric.jpg'
  },
  {
    id: 'ginseng',
    herbName: 'Ginseng',
    chineseName: '人参',
    briefDescription: '补气养血、增强体质',
    composition: '人参皂苷、多糖',
    recommendedDosage: '每日 200-400mg',
    efficacyCategory: ['能量提升', '免疫支持'],
    usageRecommendations: '早晨服用，避免晚间',
    safetyLevel: 'high',
    precautions: '高血压患者慎用',
    tcmConstitution: '气虚体质',
    caseStudy: '用户B服用2个月，精力明显改善',
    detailedDescription: `人参皂苷是人参的核心活性成分，具有适应原作用，能帮助机体适应各种压力。
    
    **详细功效：**
    - 能量提升：提高体力和精神活力，对抗疲劳
    - 免疫支持：增强机体抵抗力，预防感冒
    - 认知改善：提高注意力和记忆力
    - 血糖调节：有助于稳定血糖水平
    
    **使用指导：**
    - 最好在早晨空腹服用，避免影响睡眠
    - 建议循环使用：使用2-3个月后休息1个月
    - 避免与咖啡因同时服用`,
    imageUrl: '/herbs/ginseng.jpg'
  },
  {
    id: 'licorice',
    herbName: 'Licorice',
    chineseName: '甘草',
    briefDescription: '缓解咳嗽、消炎抗菌',
    composition: '甘草酸、黄酮类',
    recommendedDosage: '每日 100-300mg',
    efficacyCategory: ['呼吸系统', '消化健康'],
    usageRecommendations: '饭后服用，避免过量',
    safetyLevel: 'medium',
    precautions: '长期服用需监测血压',
    tcmConstitution: '气虚体质',
    caseStudy: '用户C服用1个月，咳嗽明显缓解',
    detailedDescription: `甘草酸具有强效的抗炎和抗病毒特性，黄酮类化合物则提供额外的抗氧化保护。
    
    **详细功效：**
    - 呼吸系统：缓解咳嗽，清除痰液，保护呼吸道
    - 消化健康：保护胃黏膜，缓解胃部炎症
    - 抗病毒：对多种病毒具有抑制作用
    - 激素调节：支持肾上腺功能
    
    **使用指导：**
    - 建议餐后服用，减少胃肠刺激
    - 不宜与利尿剂同时使用
    - 定期监测血压和血钾水平`,
    imageUrl: '/herbs/licorice.jpg'
  },
  {
    id: 'echinacea',
    herbName: 'Echinacea',
    chineseName: '紫维菊',
    briefDescription: '增强免疫、抗病毒',
    composition: '多糖、烷基酰胺',
    recommendedDosage: '每日 400-900mg',
    efficacyCategory: ['免疫支持', '抗病毒'],
    usageRecommendations: '早晚服用，感冒初期使用',
    safetyLevel: 'high',
    precautions: '过敏体质慎用',
    tcmConstitution: '体质偏寒',
    caseStudy: '用户D在感冒季节服用，感冒次数减少',
    detailedDescription: `多糖成分是紫维菊增强免疫功能的关键，烷基酰胺则具有抗炎和抗菌作用。
    
    **详细功效：**
    - 免疫增强：刺激免疫细胞活性，提高抗病能力
    - 抗病毒：对流感和普通感冒病毒有效
    - 抗炎作用：减轻炎症反应
    - 伤口愈合：促进皮肤和黏膜修复
    
    **使用指导：**
    - 感冒初期服用效果最佳
    - 建议短期使用，不超过连续8周
    - 过敏体质者首次使用需小心观察`,
    imageUrl: '/herbs/echinacea.jpg'
  },
  {
    id: 'peppermint',
    herbName: 'Peppermint',
    chineseName: '薄荷',
    briefDescription: '缓解消化不良、清热解毒',
    composition: '薄荷脑、薄荷酮',
    recommendedDosage: '每日 150-300mg',
    efficacyCategory: ['消化健康', '呼吸系统'],
    usageRecommendations: '饭后服用，避免过量',
    safetyLevel: 'high',
    precautions: '儿童慎用',
    tcmConstitution: '湿热体质',
    caseStudy: '用户E服用2周，胃部不适减轻',
    detailedDescription: `薄荷脑是薄荷特有的清凉成分，具有镇痛和抗痉挛作用。
    
    **详细功效：**
    - 消化支持：缓解胃肠痉挛，促进消化
    - 呼吸清新：清洁口腔，缓解口臭
    - 镇痛作用：缓解头痛和肌肉疼痛
    - 清热解毒：清除体内热毒，降温退热
    
    **使用指导：**
    - 可餐前或餐后服用
    - 肠溶胶囊应整粒吞服，不要嚼碎
    - 避免与胃酸抑制剂同时服用`,
    imageUrl: '/herbs/peppermint.jpg'
  },
  {
    id: 'chamomile',
    herbName: 'Chamomile',
    chineseName: '洋甘菊',
    briefDescription: '促进睡眠、缓解焦虑',
    composition: '挥发油、黄酮类',
    recommendedDosage: '每日 200-400mg',
    efficacyCategory: ['睡眠支持', '情绪管理'],
    usageRecommendations: '睡前服用，可泡茶饮用',
    safetyLevel: 'high',
    precautions: '孕妇慎用',
    tcmConstitution: '气虚体质',
    caseStudy: '用户F服用1个月，睡眠质量提高',
    detailedDescription: `洋甘菊的挥发油含有多种镇静成分，黄酮类化合物则具有抗炎和抗焦虑特性。
    
    **详细功效：**
    - 睡眠改善：促进深度睡眠，缓解失眠
    - 抗焦虑：镇静神经，缓解紧张情绪
    - 消化支持：缓解胃肠不适，减少胀气
    - 皮肤护理：抗炎抗敏，舒缓皮肤
    
    **使用指导：**
    - 睡前30-60分钟服用效果最佳
    - 可制成茶饮，温热饮用
    - 可与薰衣草等其他镇静草药配合`,
    imageUrl: '/herbs/chamomile.jpg'
  },
  {
    id: 'ginger',
    herbName: 'Ginger',
    chineseName: '生姜',
    briefDescription: '抗炎、促消化、止呕',
    composition: '姜辣素、挥发油',
    recommendedDosage: '每日 250-1000mg',
    efficacyCategory: ['消化健康', '抗炎作用'],
    usageRecommendations: '饭后服用，可配合温水',
    safetyLevel: 'high',
    precautions: '胃溃疡患者慎用',
    tcmConstitution: '湿寒体质',
    caseStudy: '用户G服用3个月，消化功能改善',
    detailedDescription: `姜辣素是生姜的主要辛辣成分，具有强效的抗炎和抗恶心作用。
    
    **详细功效：**
    - 消化促进：刺激胃肠蠕动，改善消化不良
    - 抗恶心：缓解晕车、孕吐等恶心症状
    - 抗炎止痛：缓解关节和肌肉疼痛
    - 循环改善：促进血液循环，温暖身体
    
    **使用指导：**
    - 建议餐后服用，避免空腹
    - 可新鲜切片泡茶或加入食物中
    - 晕车前30分钟服用预防效果更佳`,
    imageUrl: '/herbs/ginger.jpg'
  },
  {
    id: 'ashwagandha',
    herbName: 'Ashwagandha',
    chineseName: '印度人参',
    briefDescription: '抗压力、适应原草药',
    composition: 'withanolides、生物碱',
    recommendedDosage: '每日 300-600mg',
    efficacyCategory: ['压力与焦虑', '能量提升'],
    usageRecommendations: '早晚服用，空腹或餐后均可',
    safetyLevel: 'high',
    precautions: '孕妇禁用',
    tcmConstitution: '气虚体质',
    caseStudy: '用户H服用2个月，焦虑感降低',
    detailedDescription: `Withanolides是印度人参的关键适应原成分，能帮助缓解压力和提高能量水平。
    
    **详细功效：**
    - 压力缓解：降低皮质醇水平，减少压力反应
    - 能量提升：提高体力和耐力，对抗疲劳
    - 认知支持：改善记忆力和注意力
    - 免疫平衡：调节免疫系统功能
    
    **使用指导：**
    - 可空腹或餐后服用
    - 建议分早晚两次服用
    - 建议连续使用至少4-6周才能见效`,
    imageUrl: '/herbs/ashwagandha.jpg'
  },
  {
    id: 'milk-thistle',
    herbName: 'Milk Thistle',
    chineseName: '奶蓟草',
    briefDescription: '保护肝脏、解毒排余',
    composition: '水飞蓟素、黄酮类',
    recommendedDosage: '每日 200-400mg',
    efficacyCategory: ['肝脏健康', '解毒支持'],
    usageRecommendations: '饭后服用，配合充足水分',
    safetyLevel: 'high',
    precautions: '过敏者慎用',
    tcmConstitution: '湿热体质',
    caseStudy: '用户I服用3个月，肝功能改善',
    detailedDescription: `水飞蓟素是奶蓟草的核心成分，专门用于肝脏保护和修复。
    
    **详细功效：**
    - 肝脏保护：保护肝细胞免受毒素损害
    - 肝脏修复：促进受损肝细胞再生
    - 解毒支持：增强肝脏解毒功能
    - 抗氧化：清除肝脏中的自由基
    
    **使用指导：**
    - 建议餐后服用，提高吸收率
    - 需配合充足的水分摄入
    - 可与其他护肝草药配合使用`,
    imageUrl: '/herbs/milk-thistle.jpg'
  },
  {
    id: 'valerian',
    herbName: 'Valerian',
    chineseName: '缬草',
    briefDescription: '促进睡眠、镇静安神',
    composition: '挥发油、缬草酸类',
    recommendedDosage: '每日 400-900mg',
    efficacyCategory: ['睡眠支持', '情绪管理'],
    usageRecommendations: '睡前服用，避免白天使用',
    safetyLevel: 'high',
    precautions: '孕妇慎用',
    tcmConstitution: '气虚体质',
    caseStudy: '用户J服用1个月，入睡时间缩短',
    detailedDescription: `缬草的挥发油含有多种镇静成分，缬草酸类化合物则直接作用于神经系统。
    
    **详细功效：**
    - 睡眠促进：缩短入睡时间，提高睡眠质量
    - 神经镇静：缓解神经紧张和焦虑
    - 肌肉放松：缓解肌肉紧张和痉挛
    - 情绪稳定：平复情绪波动，减少烦躁
    
    **使用指导：**
    - 睡前30-60分钟服用
    - 避免与酒精同时使用
    - 可与洋甘菊等其他镇静草药配合`,
    imageUrl: '/herbs/valerian.jpg'
  }
];

// 根据ID获取草药信息
export function getHerbById(id: string): Herb | undefined {
  return herbsDatabase.find(herb => herb.id === id);
}

// 根据中文名搜索草药
export function searchHerbsByChineseName(name: string): Herb[] {
  return herbsDatabase.filter(herb => 
    herb.chineseName.includes(name) || herb.herbName.toLowerCase().includes(name.toLowerCase())
  );
}

// 根据功效分类搜索草药
export function getHerbsByCategory(category: string): Herb[] {
  return herbsDatabase.filter(herb => 
    herb.efficacyCategory.includes(category)
  );
}

// 根据体质匹配搜索草药
export function getHerbsByConstitution(constitution: string): Herb[] {
  return herbsDatabase.filter(herb => 
    herb.tcmConstitution.includes(constitution)
  );
}

// 根据安全等级搜索草药
export function getHerbsBySafetyLevel(level: 'high' | 'medium' | 'low'): Herb[] {
  return herbsDatabase.filter(herb => herb.safetyLevel === level);
}

// 获取所有功效分类
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  herbsDatabase.forEach(herb => {
    herb.efficacyCategory.forEach(category => categories.add(category));
  });
  return Array.from(categories);
}

// 获取所有体质类型
export function getAllConstitutions(): string[] {
  const constitutions = new Set<string>();
  herbsDatabase.forEach(herb => {
    constitutions.add(herb.tcmConstitution);
  });
  return Array.from(constitutions);
}

// 高级搜索函数 - 用于智能搜索
export function searchHerbsBySymptom(query: string): Herb[] {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return herbsDatabase;

  return herbsDatabase.filter(herb => {
    // 搜索草药名称
    if (herb.herbName.toLowerCase().includes(searchTerm) || 
        herb.chineseName.includes(searchTerm)) {
      return true;
    }
    
    // 搜索简要描述
    if (herb.briefDescription.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // 搜索功效分类
    if (herb.efficacyCategory.some(cat => 
        cat.toLowerCase().includes(searchTerm)
    )) {
      return true;
    }
    
    // 搜索详细描述
    if (herb.detailedDescription && 
        herb.detailedDescription.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // 搜索使用建议
    if (herb.usageRecommendations.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    return false;
  });
}

// 将内部数据格式转换为前端期望的格式
export function convertToHerbResult(herb: Herb) {
  return {
    id: herb.id,
    name: herb.herbName,
    chineseName: herb.chineseName,
    scientificName: getScientificName(herb.herbName),
    category: herb.efficacyCategory[0] || 'General Health',
    uses: herb.efficacyCategory,
    briefDescription: herb.briefDescription,
    safety: herb.safetyLevel,
    evidence: getEvidenceLevel(herb.herbName),
    composition: herb.composition,
    dosage: herb.recommendedDosage,
    precautions: herb.precautions,
    tcmConstitution: herb.tcmConstitution,
    caseStudy: herb.caseStudy,
    usageRecommendations: herb.usageRecommendations,
    detailedDescription: herb.detailedDescription,
    imageUrl: herb.imageUrl
  };
}

// 批量转换搜索结果
export function convertHerbsToResults(herbs: Herb[]) {
  return herbs.map(convertToHerbResult);
}

// 辅助函数：获取学名
function getScientificName(herbName: string): string {
  const scientificNames: Record<string, string> = {
    'Turmeric': 'Curcuma longa',
    'Ginseng': 'Panax ginseng',
    'Licorice': 'Glycyrrhiza glabra', 
    'Echinacea': 'Echinacea purpurea',
    'Peppermint': 'Mentha piperita',
    'Chamomile': 'Matricaria chamomilla',
    'Ginger': 'Zingiber officinale',
    'Ashwagandha': 'Withania somnifera',
    'Milk Thistle': 'Silybum marianum',
    'Valerian': 'Valeriana officinalis'
  };
  return scientificNames[herbName] || herbName;
}

// 辅助函数：获取证据等级
function getEvidenceLevel(herbName: string): 'strong' | 'moderate' | 'limited' {
  const evidenceLevels: Record<string, 'strong' | 'moderate' | 'limited'> = {
    'Turmeric': 'strong',
    'Ginseng': 'strong', 
    'Licorice': 'moderate',
    'Echinacea': 'moderate',
    'Peppermint': 'strong',
    'Chamomile': 'strong',
    'Ginger': 'strong',
    'Ashwagandha': 'strong',
    'Milk Thistle': 'strong',
    'Valerian': 'moderate'
  };
  return evidenceLevels[herbName] || 'limited';
}

// 高级搜索选项
export interface SearchOptions {
  query?: string;
  category?: string;
  safetyLevel?: 'high' | 'medium' | 'low';
  constitution?: string;
  limit?: number;
}

// 高级搜索功能
export function advancedSearch(options: SearchOptions): Herb[] {
  let results = herbsDatabase;
  
  // 按关键词搜索
  if (options.query) {
    results = searchHerbsBySymptom(options.query);
  }
  
  // 按分类过滤
  if (options.category) {
    results = results.filter(herb => 
      herb.efficacyCategory.includes(options.category!)
    );
  }
  
  // 按安全等级过滤
  if (options.safetyLevel) {
    results = results.filter(herb => 
      herb.safetyLevel === options.safetyLevel
    );
  }
  
  // 按体质过滤
  if (options.constitution) {
    results = results.filter(herb => 
      herb.tcmConstitution.includes(options.constitution!)
    );
  }
  
  // 限制结果数量
  if (options.limit) {
    results = results.slice(0, options.limit);
  }
  
  return results;
}

// 导出所有草药数据供其他组件使用
export { herbsDatabase as allHerbs }; 