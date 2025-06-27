// Update Frontend with Latest Herbs including Cinnamon
const { Client } = require('@notionhq/client');
const fs = require('fs').promises;

// Initialize Notion client
const notion = new Client({
  auth: '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',
});

// Database ID for herbs
const DATABASE_ID = '2156f14b923c802c8d48d84247b6681a';

async function fetchAllHerbs() {
  try {
    console.log('🔍 正在获取所有草药数据...');
    
    let allHerbs = [];
    let hasMore = true;
    let startCursor = undefined;

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        start_cursor: startCursor,
        page_size: 100,
      });

      allHerbs = allHerbs.concat(response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }

    console.log(`📊 获取到 ${allHerbs.length} 个草药条目`);
    return allHerbs;
  } catch (error) {
    console.error('❌ 获取草药数据失败:', error);
    throw error;
  }
}

function convertNotionToHerbData(notionPages) {
  return notionPages.map(page => {
    const props = page.properties;
    
    // Helper function to extract text from rich_text or title
    const getText = (prop) => {
      if (!prop) return '';
      if (prop.title && prop.title.length > 0) {
        return prop.title[0].plain_text || '';
      }
      if (prop.rich_text && prop.rich_text.length > 0) {
        return prop.rich_text[0].plain_text || '';
      }
      return '';
    };

    // Helper function to extract select value
    const getSelect = (prop) => {
      return prop?.select?.name || '';
    };

    // Helper function to extract multi-select values
    const getMultiSelect = (prop) => {
      return prop?.multi_select?.map(item => item.name) || [];
    };

    // Extract herb name, handling both Chinese and English
    const herbName = getText(props['草药名称']) || '';
    const [chineseName, englishName] = herbName.includes('(') 
      ? [herbName.split('(')[0].trim(), herbName.split('(')[1]?.replace(')', '').trim()]
      : [herbName, ''];

    const herb = {
      id: page.id.replace(/-/g, ''),
      herbName: chineseName || herbName,
      englishName: englishName || getText(props['Name (EN)']),
      latinName: getText(props['Latin Name']) || getText(props['拉丁文']),
      category: getSelect(props['Category']) || '中药',
      
      // Description fields
      overview: getText(props['Overview']),
      description: getText(props['简要描述']),
      benefits: getText(props['Benefits & Conditions']),
      
      // Usage and dosage
      dosage: getText(props['推荐剂量']) || getText(props['Daily Dose Guide']),
      usageTips: getText(props['使用建议']) || getText(props['Usage Tips']),
      
      // Safety information
      contraindications: getText(props['Contraindications']) || getText(props['注意事项']),
      safetyLevel: getSelect(props['安全性等级']) || getSelect(props['Safety Level']),
      
      // Traditional and modern use
      traditionalUse: getText(props['Traditional Use']),
      modernApplications: getText(props['Modern Applications']),
      
      // Active compounds and mechanism
      activeCompounds: getText(props['Active Compounds']),
      mechanismOfAction: getText(props['Mechanism of Action']),
      
      // Constitution and recommendations
      constitutionType: getSelect(props['中医体质匹配']),
      constitutionExplanation: getText(props['Constitution Explanation']),
      recommendedFor: getMultiSelect(props['Recommended Constitution']),
      notRecommendedFor: getMultiSelect(props['Not Recommended Constitution']),
      
      // Categories and tags
      efficacy: getMultiSelect(props['功效分类']).concat(getMultiSelect(props['Efficacy'])),
      ingredients: getMultiSelect(props['成分构成']),
      tags: getMultiSelect(props['Tags']),
      
      // Studies and cases
      medicalStudies: getText(props['Medical Studies Summary']),
      caseStudy: getText(props['案例分析']),
      faq: getText(props['FAQ']),
      
      // Additional fields for frontend compatibility
      availability: 'Common',
      priceRange: 'Moderate',
      qualityScore: 85,
      popularityScore: 80,
      growingRegions: ['China', 'Asia'],
      partUsed: 'Bark',
      taste: 'Sweet, Spicy, Warm',
      source: getText(props['Source']) || 'Traditional Chinese Medicine',
      
      // Dates
      createdTime: page.created_time,
      lastEditedTime: page.last_edited_time
    };

    return herb;
  });
}

async function updateFrontendFiles(herbs) {
  try {
    console.log('📝 正在更新前端数据文件...');
    
    // Generate the herbs data file
    const herbsDataContent = `// Auto-generated herbs data from Notion
// Last updated: ${new Date().toISOString()}

export interface Herb {
  id: string;
  herbName: string;
  englishName: string;
  latinName: string;
  category: string;
  overview: string;
  description: string;
  benefits: string;
  dosage: string;
  usageTips: string;
  contraindications: string;
  safetyLevel: string;
  traditionalUse: string;
  modernApplications: string;
  activeCompounds: string;
  mechanismOfAction: string;
  constitutionType: string;
  constitutionExplanation: string;
  recommendedFor: string[];
  notRecommendedFor: string[];
  efficacy: string[];
  ingredients: string[];
  tags: string[];
  medicalStudies: string;
  caseStudy: string;
  faq: string;
  availability: string;
  priceRange: string;
  qualityScore: number;
  popularityScore: number;
  growingRegions: string[];
  partUsed: string;
  taste: string;
  source: string;
  createdTime: string;
  lastEditedTime: string;
}

export const herbs: Herb[] = ${JSON.stringify(herbs, null, 2)};

// For backward compatibility
export const HERBS_DATABASE = herbs;

export default herbs;
`;

    // Write to the main herbs data file
    await fs.writeFile('lib/herbs-data-complete.ts', herbsDataContent, 'utf8');
    console.log('✅ 已更新 lib/herbs-data-complete.ts');

    // Also create a backup
    const backupFilename = `herbs-database-with-cinnamon-${new Date().toISOString().split('T')[0]}.json`;
    await fs.writeFile(backupFilename, JSON.stringify(herbs, null, 2), 'utf8');
    console.log(`✅ 已创建备份文件 ${backupFilename}`);

    return herbs;
  } catch (error) {
    console.error('❌ 更新前端文件失败:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 开始同步Notion草药数据到前端...');
    
    // Fetch all herbs from Notion
    const notionHerbs = await fetchAllHerbs();
    
    // Convert to frontend format
    const herbs = convertNotionToHerbData(notionHerbs);
    
    // Find Cinnamon to verify it was added
    const cinnamon = herbs.find(herb => 
      herb.herbName.includes('肉桂') || 
      herb.englishName?.toLowerCase().includes('cinnamon')
    );
    
    if (cinnamon) {
      console.log('🎉 确认Cinnamon已添加:');
      console.log(`- 中文名: ${cinnamon.herbName}`);
      console.log(`- 英文名: ${cinnamon.englishName}`);
      console.log(`- 拉丁名: ${cinnamon.latinName}`);
      console.log(`- 体质类型: ${cinnamon.constitutionType}`);
    } else {
      console.log('⚠️ 未找到Cinnamon条目');
    }
    
    // Update frontend files
    await updateFrontendFiles(herbs);
    
    console.log(`📊 同步完成统计:`);
    console.log(`- 总草药数量: ${herbs.length}`);
    console.log(`- 包含Cinnamon: ${cinnamon ? '是' : '否'}`);
    console.log(`- 更新时间: ${new Date().toLocaleString()}`);
    
  } catch (error) {
    console.error('💥 同步失败:', error);
    process.exit(1);
  }
}

// Run the main function
main(); 