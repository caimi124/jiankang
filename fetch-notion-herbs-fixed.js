const { Client } = require('@notionhq/client');
const fs = require('fs');

// 初始化Notion客户端
const notion = new Client({
  auth: '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'
});

// 数据库ID
const databaseId = '2156f14b923c802c8d48d84247b6681a';

async function fetchAllHerbs() {
  try {
    console.log('正在获取Notion数据库中的草药信息...');
    
    let allHerbs = [];
    let nextCursor = undefined;
    
    do {
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: nextCursor,
        page_size: 100
      });
      
      const herbs = response.results.map(page => {
        const properties = page.properties;
        
        // 提取属性值的辅助函数
        const extractTitle = (prop) => {
          if (prop && prop.title && prop.title.length > 0) {
            return prop.title[0].plain_text;
          }
          return '';
        };
        
        const extractRichText = (prop) => {
          if (prop && prop.rich_text && prop.rich_text.length > 0) {
            return prop.rich_text[0].plain_text;
          }
          return '';
        };
        
        const extractSelect = (prop) => {
          if (prop && prop.select && prop.select.name) {
            return prop.select.name;
          }
          return '';
        };
        
        const extractMultiSelect = (prop) => {
          if (prop && prop.multi_select) {
            return prop.multi_select.map(item => item.name);
          }
          return [];
        };
        
        const extractNumber = (prop) => {
          if (prop && prop.number !== null && prop.number !== undefined) {
            return prop.number;
          }
          return null;
        };
        
        // 构建草药对象（使用正确的中文字段名）
        const herb = {
          id: page.id,
          chinese_name: extractTitle(properties['草药名称']),
          english_name: extractRichText(properties['中文名']),
          latin_name: extractTitle(properties['草药名称']), // 草药名称包含了拉丁名
          category: 'general',
          constitution_type: extractSelect(properties['中医体质匹配']),
          primary_effects: extractMultiSelect(properties['功效分类']),
          secondary_effects: [],
          efficacy: extractMultiSelect(properties['功效分类']),
          dosage: extractRichText(properties['推荐剂量']),
          safety_level: extractSelect(properties['安全性等级']),
          contraindications: extractRichText(properties['注意事项']),
          interactions: '',
          description: extractRichText(properties['简要描述']),
          source: '',
          preparation: '',
          storage: '',
          price_range: 'moderate',
          availability: 'common',
          quality_score: 75,
          popularity_score: 70,
          research_status: '',
          traditional_use: extractRichText(properties['简要描述']),
          modern_applications: extractRichText(properties['案例分析']),
          growing_regions: [],
          harvest_season: '',
          part_used: '',
          taste: '',
          meridians: [],
          toxicity: extractSelect(properties['安全性等级']),
          pregnancy_safe: extractRichText(properties['注意事项']),
          children_safe: extractRichText(properties['注意事项']),
          elderly_safe: extractRichText(properties['注意事项']),
          usage_suggestions: extractRichText(properties['使用建议']),
          ingredients: extractMultiSelect(properties['成分构成']),
          created_time: page.created_time,
          last_edited_time: page.last_edited_time
        };
        
        return herb;
      });
      
      allHerbs = allHerbs.concat(herbs);
      nextCursor = response.next_cursor;
      
      console.log(`已获取 ${allHerbs.length} 种草药...`);
      
    } while (nextCursor);
    
    console.log(`\n成功获取 ${allHerbs.length} 种草药信息`);
    
    // 保存到文件
    const fileName = `herbs-database-fixed-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(fileName, JSON.stringify(allHerbs, null, 2));
    console.log(`数据已保存到: ${fileName}`);
    
    // 生成统计信息
    generateStatistics(allHerbs);
    
    // 生成TypeScript接口文件
    generateTypescriptData(allHerbs);
    
    return allHerbs;
    
  } catch (error) {
    console.error('获取Notion数据时出错:', error);
    throw error;
  }
}

function generateStatistics(herbs) {
  console.log('\n=== 草药数据库统计信息 ===');
  console.log(`总草药数量: ${herbs.length}`);
  
  // 体质类型分布
  const constitutionTypes = {};
  herbs.forEach(herb => {
    if (herb.constitution_type) {
      constitutionTypes[herb.constitution_type] = (constitutionTypes[herb.constitution_type] || 0) + 1;
    }
  });
  console.log('\n体质类型分布:');
  Object.entries(constitutionTypes).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}种`);
  });
  
  // 安全级别分布
  const safetyLevels = {};
  herbs.forEach(herb => {
    if (herb.safety_level) {
      safetyLevels[herb.safety_level] = (safetyLevels[herb.safety_level] || 0) + 1;
    }
  });
  console.log('\n安全级别分布:');
  Object.entries(safetyLevels).forEach(([level, count]) => {
    console.log(`  ${level}: ${count}种`);
  });
  
  // 主要功效统计
  const effectsCount = {};
  herbs.forEach(herb => {
    if (herb.primary_effects) {
      herb.primary_effects.forEach(effect => {
        effectsCount[effect] = (effectsCount[effect] || 0) + 1;
      });
    }
  });
  console.log('\n主要功效统计（前10）:');
  const topEffects = Object.entries(effectsCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
  topEffects.forEach(([effect, count]) => {
    console.log(`  ${effect}: ${count}种`);
  });
}

// 中医体质类型映射到英文
function mapConstitutionType(chineseType) {
  const mapping = {
    '平和质': 'balanced',
    '气虚质': 'qi_deficiency',
    '阳虚质': 'yang_deficiency', 
    '阴虚质': 'yin_deficiency',
    '痰湿质': 'phlegm_dampness',
    '湿热质': 'damp_heat',
    '血瘀质': 'blood_stasis',
    '气郁质': 'qi_stagnation',
    '特禀质': 'special_constitution',
    '湿热体质': 'damp_heat',
    '气虚体质': 'qi_deficiency',
    '阳虚体质': 'yang_deficiency',
    '寒湿体质': 'cold_dampness'
  };
  return mapping[chineseType] || 'balanced';
}

// 安全等级映射
function mapSafetyLevel(chineseLevel) {
  const mapping = {
    '安全': 'high',
    '高': 'high',
    '低风险': 'high',
    '中': 'medium',
    '中度风险': 'medium',
    '高风险': 'low',
    '禁用': 'low'
  };
  return mapping[chineseLevel] || 'medium';
}

function generateTypescriptData(herbs) {
  console.log('\n正在生成TypeScript数据文件...');
  
  // 转换为适合前端使用的格式
  const formattedHerbs = herbs.map(herb => ({
    id: herb.id,
    chinese_name: herb.chinese_name || '',
    english_name: herb.english_name || herb.chinese_name || '',
    latin_name: herb.latin_name || '',
    category: herb.category || 'general',
    constitution_type: mapConstitutionType(herb.constitution_type),
    primary_effects: herb.primary_effects || [],
    secondary_effects: herb.secondary_effects || [],
    efficacy: herb.primary_effects || [],
    dosage: herb.dosage || '请咨询专业医师',
    safety_level: mapSafetyLevel(herb.safety_level),
    contraindications: herb.contraindications || '',
    description: herb.description || '',
    traditional_use: herb.traditional_use || '',
    modern_applications: herb.modern_applications || '',
    taste: herb.taste || '',
    meridians: herb.meridians || [],
    part_used: herb.part_used || '',
    source: herb.source || '',
    growing_regions: herb.growing_regions || [],
    price_range: herb.price_range || 'moderate',
    availability: herb.availability || 'common',
    quality_score: herb.quality_score || 75,
    popularity_score: herb.popularity_score || 70,
    usage_suggestions: herb.usage_suggestions || '',
    ingredients: herb.ingredients || []
  }));
  
  // 过滤掉名称为空的草药
  const validHerbs = formattedHerbs.filter(herb => herb.chinese_name);
  
  console.log(`有效草药数量: ${validHerbs.length}`);
  
  // 按体质类型分组
  const constitutionGroups = {
    balanced: validHerbs.filter(h => h.constitution_type === 'balanced'),
    qi_deficiency: validHerbs.filter(h => h.constitution_type === 'qi_deficiency'),
    yang_deficiency: validHerbs.filter(h => h.constitution_type === 'yang_deficiency'),
    yin_deficiency: validHerbs.filter(h => h.constitution_type === 'yin_deficiency'),
    phlegm_dampness: validHerbs.filter(h => h.constitution_type === 'phlegm_dampness'),
    damp_heat: validHerbs.filter(h => h.constitution_type === 'damp_heat'),
    blood_stasis: validHerbs.filter(h => h.constitution_type === 'blood_stasis'),
    qi_stagnation: validHerbs.filter(h => h.constitution_type === 'qi_stagnation'),
    special_constitution: validHerbs.filter(h => h.constitution_type === 'special_constitution'),
    cold_dampness: validHerbs.filter(h => h.constitution_type === 'cold_dampness')
  };
  
  // 生成TypeScript文件
  const tsContent = `// 自动生成的草药数据 - ${new Date().toISOString()}
// 来源: Notion数据库 (${validHerbs.length}种草药)

export interface Herb {
  id: string;
  chinese_name: string;
  english_name: string;
  latin_name: string;
  category: string;
  constitution_type: string;
  primary_effects: string[];
  secondary_effects: string[];
  efficacy: string[];
  dosage: string;
  safety_level: 'high' | 'medium' | 'low';
  contraindications: string;
  description: string;
  traditional_use: string;
  modern_applications: string;
  taste: string;
  meridians: string[];
  part_used: string;
  source: string;
  growing_regions: string[];
  price_range: string;
  availability: string;
  quality_score: number;
  popularity_score: number;
  usage_suggestions: string;
  ingredients: string[];
}

export const HERBS_DATABASE: Herb[] = ${JSON.stringify(validHerbs, null, 2)};

// 按中医体质类型分组的草药数据
export const CONSTITUTION_HERB_MAPPING = {
  balanced: ${JSON.stringify(constitutionGroups.balanced, null, 2)},
  qi_deficiency: ${JSON.stringify(constitutionGroups.qi_deficiency, null, 2)},
  yang_deficiency: ${JSON.stringify(constitutionGroups.yang_deficiency, null, 2)},
  yin_deficiency: ${JSON.stringify(constitutionGroups.yin_deficiency, null, 2)},
  phlegm_dampness: ${JSON.stringify(constitutionGroups.phlegm_dampness, null, 2)},
  damp_heat: ${JSON.stringify(constitutionGroups.damp_heat, null, 2)},
  blood_stasis: ${JSON.stringify(constitutionGroups.blood_stasis, null, 2)},
  qi_stagnation: ${JSON.stringify(constitutionGroups.qi_stagnation, null, 2)},
  special_constitution: ${JSON.stringify(constitutionGroups.special_constitution, null, 2)},
  cold_dampness: ${JSON.stringify(constitutionGroups.cold_dampness, null, 2)}
};

// 体质类型映射（为了与现有系统兼容）
export const CONSTITUTION_MAPPING = {
  fire: 'yang_deficiency', // 火质对应阳虚质特点
  earth: 'qi_deficiency',  // 土质对应气虚质特点
  metal: 'yin_deficiency', // 金质对应阴虚质特点
  water: 'balanced',       // 水质对应平和质特点
  wood: 'qi_stagnation'    // 木质对应气郁质特点
};

// 获取体质对应的草药
export function getHerbsForConstitution(constitutionType: string): Herb[] {
  // 如果是英文体质类型，先映射到中医体质
  const mappedType = CONSTITUTION_MAPPING[constitutionType] || constitutionType;
  return CONSTITUTION_HERB_MAPPING[mappedType] || [];
}

// 根据功效搜索草药
export function searchHerbsByEfficacy(efficacy: string): Herb[] {
  return HERBS_DATABASE.filter(herb => 
    herb.efficacy.some(e => e.includes(efficacy)) ||
    herb.primary_effects.some(e => e.includes(efficacy))
  );
}

// 根据安全级别筛选草药
export function filterHerbsBySafety(safetyLevel: 'high' | 'medium' | 'low'): Herb[] {
  return HERBS_DATABASE.filter(herb => herb.safety_level === safetyLevel);
}
`;
  
  fs.writeFileSync('lib/herbs-data-complete.ts', tsContent);
  console.log('TypeScript数据文件已保存到: lib/herbs-data-complete.ts');
}

// 运行主函数
if (require.main === module) {
  fetchAllHerbs()
    .then(() => {
      console.log('\n✅ 草药数据获取完成！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 草药数据获取失败:', error);
      process.exit(1);
    });
}

module.exports = { fetchAllHerbs }; 