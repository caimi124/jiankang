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
        
        // 构建草药对象
        const herb = {
          id: page.id,
          chinese_name: extractTitle(properties['中文名']),
          english_name: extractRichText(properties['英文名']),
          latin_name: extractRichText(properties['拉丁名']),
          category: extractSelect(properties['类别']),
          constitution_type: extractSelect(properties['体质类型']),
          primary_effects: extractMultiSelect(properties['主要功效']),
          secondary_effects: extractMultiSelect(properties['次要功效']),
          dosage: extractRichText(properties['用量']),
          safety_level: extractSelect(properties['安全级别']),
          contraindications: extractRichText(properties['禁忌']),
          interactions: extractRichText(properties['相互作用']),
          description: extractRichText(properties['描述']),
          source: extractRichText(properties['来源']),
          preparation: extractRichText(properties['制备方法']),
          storage: extractRichText(properties['储存方法']),
          price_range: extractSelect(properties['价格范围']),
          availability: extractSelect(properties['可获得性']),
          quality_score: extractNumber(properties['质量评分']),
          popularity_score: extractNumber(properties['受欢迎度']),
          research_status: extractSelect(properties['研究状态']),
          traditional_use: extractRichText(properties['传统用途']),
          modern_applications: extractRichText(properties['现代应用']),
          growing_regions: extractMultiSelect(properties['产地']),
          harvest_season: extractSelect(properties['采收季节']),
          part_used: extractSelect(properties['药用部位']),
          taste: extractSelect(properties['性味']),
          meridians: extractMultiSelect(properties['归经']),
          toxicity: extractSelect(properties['毒性']),
          pregnancy_safe: extractSelect(properties['孕期安全']),
          children_safe: extractSelect(properties['儿童安全']),
          elderly_safe: extractSelect(properties['老人安全']),
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
    const fileName = `herbs-database-${new Date().toISOString().split('T')[0]}.json`;
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

function generateTypescriptData(herbs) {
  console.log('\n正在生成TypeScript数据文件...');
  
  // 转换为适合前端使用的格式
  const formattedHerbs = herbs.map(herb => ({
    id: herb.id,
    chinese_name: herb.chinese_name || '',
    english_name: herb.english_name || '',
    latin_name: herb.latin_name || '',
    category: herb.category || 'general',
    constitution_type: herb.constitution_type || 'balanced',
    primary_effects: herb.primary_effects || [],
    secondary_effects: herb.secondary_effects || [],
    efficacy: [...(herb.primary_effects || []), ...(herb.secondary_effects || [])].slice(0, 5),
    dosage: herb.dosage || '请咨询专业医师',
    safety_level: herb.safety_level || 'medium',
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
    popularity_score: herb.popularity_score || 70
  }));
  
  // 生成TypeScript文件
  const tsContent = `// 自动生成的草药数据 - ${new Date().toISOString()}
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
}

export const HERBS_DATABASE: Herb[] = ${JSON.stringify(formattedHerbs, null, 2)};

export const CONSTITUTION_HERB_MAPPING = {
  fire: ${JSON.stringify(formattedHerbs.filter(h => h.constitution_type === 'fire' || h.constitution_type === '火质'), null, 2)},
  earth: ${JSON.stringify(formattedHerbs.filter(h => h.constitution_type === 'earth' || h.constitution_type === '土质'), null, 2)},
  metal: ${JSON.stringify(formattedHerbs.filter(h => h.constitution_type === 'metal' || h.constitution_type === '金质'), null, 2)},
  water: ${JSON.stringify(formattedHerbs.filter(h => h.constitution_type === 'water' || h.constitution_type === '水质'), null, 2)},
  wood: ${JSON.stringify(formattedHerbs.filter(h => h.constitution_type === 'wood' || h.constitution_type === '木质'), null, 2)},
  balanced: ${JSON.stringify(formattedHerbs.filter(h => h.constitution_type === 'balanced' || h.constitution_type === '平和质'), null, 2)}
};
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