/**
 * 结构化数据验证脚本
 * 用于验证草药页面的Drug schema是否符合Google富媒体搜索结果要求
 */

const https = require('https');

// 测试URL列表
const testUrls = [
  'https://www.herbscience.shop/herbs/ginger',
  'https://www.herbscience.shop/herbs/turmeric',
  'https://www.herbscience.shop/herbs/ginseng'
];

/**
 * 获取页面HTML内容
 */
function fetchPageContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * 提取JSON-LD结构化数据
 */
function extractJsonLd(html) {
  const jsonLdMatches = html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs);
  
  if (!jsonLdMatches) {
    return [];
  }
  
  return jsonLdMatches.map(match => {
    const jsonContent = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      return JSON.parse(jsonContent);
    } catch (error) {
      console.error('JSON解析错误:', error);
      return null;
    }
  }).filter(Boolean);
}

/**
 * 验证Drug schema是否包含必需字段
 */
function validateDrugSchema(jsonLd) {
  const results = {
    isValid: false,
    hasMainEntity: false,
    isDrugType: false,
    hasRequiredFields: false,
    requiredFieldsFound: [],
    errors: [],
    warnings: []
  };
  
  // 检查mainEntity
  if (!jsonLd.mainEntity) {
    results.errors.push('缺少mainEntity字段');
    return results;
  }
  
  results.hasMainEntity = true;
  const drug = jsonLd.mainEntity;
  
  // 检查@type是否为Drug
  if (drug['@type'] !== 'Drug') {
    results.errors.push(`mainEntity类型应为Drug，当前为: ${drug['@type']}`);
    return results;
  }
  
  results.isDrugType = true;
  
  // 检查必需字段
  const requiredFields = ['offers', 'review', 'aggregateRating'];
  const foundRequiredFields = requiredFields.filter(field => drug[field]);
  
  if (foundRequiredFields.length === 0) {
    results.errors.push('Drug schema必须包含至少一个字段: offers, review, 或 aggregateRating');
    return results;
  }
  
  results.hasRequiredFields = true;
  results.requiredFieldsFound = foundRequiredFields;
  
  // 验证各个字段的完整性
  if (drug.aggregateRating) {
    const rating = drug.aggregateRating;
    if (!rating.ratingValue || !rating.reviewCount) {
      results.warnings.push('aggregateRating缺少ratingValue或reviewCount');
    }
  }
  
  if (drug.review) {
    if (!Array.isArray(drug.review) || drug.review.length === 0) {
      results.warnings.push('review字段应为非空数组');
    } else {
      drug.review.forEach((review, index) => {
        if (!review.reviewRating || !review.author) {
          results.warnings.push(`review[${index}]缺少reviewRating或author`);
        }
      });
    }
  }
  
  if (drug.offers) {
    if (!drug.offers.availability || !drug.offers.seller) {
      results.warnings.push('offers缺少availability或seller');
    }
  }
  
  results.isValid = true;
  return results;
}

/**
 * 主验证函数
 */
async function validateStructuredData() {
  console.log('🔍 开始验证结构化数据...\n');
  
  for (const url of testUrls) {
    console.log(`📋 验证页面: ${url}`);
    
    try {
      const html = await fetchPageContent(url);
      const jsonLdData = extractJsonLd(html);
      
      if (jsonLdData.length === 0) {
        console.log('❌ 未找到JSON-LD结构化数据\n');
        continue;
      }
      
      console.log(`✅ 找到 ${jsonLdData.length} 个JSON-LD对象`);
      
      jsonLdData.forEach((data, index) => {
        console.log(`\n📊 验证JSON-LD对象 #${index + 1}:`);
        
        if (data['@type'] === 'Article' && data.mainEntity) {
          const validation = validateDrugSchema(data);
          
          if (validation.isValid) {
            console.log('✅ Drug schema验证通过');
            console.log(`   📈 包含必需字段: ${validation.requiredFieldsFound.join(', ')}`);
            
            if (validation.warnings.length > 0) {
              console.log('⚠️  警告:');
              validation.warnings.forEach(warning => {
                console.log(`   - ${warning}`);
              });
            }
          } else {
            console.log('❌ Drug schema验证失败');
            validation.errors.forEach(error => {
              console.log(`   - ${error}`);
            });
          }
        } else {
          console.log('ℹ️  非Article类型或无mainEntity，跳过Drug schema验证');
        }
      });
      
      console.log('\n' + '─'.repeat(60) + '\n');
      
    } catch (error) {
      console.error(`❌ 验证失败: ${error.message}\n`);
    }
  }
  
  console.log('🎉 验证完成！\n');
  console.log('📋 下一步操作:');
  console.log('1. 使用Google结构化数据测试工具验证: https://search.google.com/test/rich-results');
  console.log('2. 在Google Search Console中重新提交sitemap');
  console.log('3. 24-48小时后检查富媒体搜索结果状态');
}

// 运行验证
if (require.main === module) {
  validateStructuredData().catch(console.error);
}

module.exports = { validateStructuredData, validateDrugSchema }; 