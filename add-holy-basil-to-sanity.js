#!/usr/bin/env node

/**
 * 将 Holy Basil (圣罗勒) 数据添加到 Sanity CMS
 * 这是解决前端看不到 Holy Basil 页面的关键脚本
 */

const { createClient } = require('@sanity/client');

// 使用您提供的 Sanity 凭据
const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

// Holy Basil 完整数据（基于 herb-detail-fallback.ts）
const holyBasilData = {
  _type: 'herb',
  title: 'Holy Basil',
  chineseName: '圣罗勒',
  latinName: 'Ocimum tenuiflorum (Ocimum sanctum)',
  slug: {
    _type: 'slug',
    current: 'holy-basil'
  },
  
  // 分类和体质
  category: 'qi-tonifying', // Adaptogen & Stress Relief
  constitutionType: 'qi-deficiency', // 适合气虚体质
  
  // 描述和用途
  description: `Holy Basil, also known as Tulsi, is one of the most sacred herbs in Ayurvedic medicine. Revered for over 3,000 years, it's celebrated as an "adaptogen" — a natural compound that helps the body restore balance and cope with physical, mental, and emotional stress. Traditionally used to promote longevity and vitality, Tulsi supports the immune system, hormone balance, and mental clarity, making it a go-to herb for those feeling burnt out, anxious, or constantly "on edge." Today, it's widely consumed as Holy Basil tea, tincture, or capsule — prized for its ability to reduce anxiety, regulate blood sugar, and protect against environmental toxins.`,
  
  traditionalUse: `In Ayurvedic medicine, Holy Basil is known as the "Queen of Herbs" and has been used for over 3,000 years to promote physical, mental, emotional, and spiritual well-being. It's traditionally prescribed for reducing stress, supporting immunity, balancing hormones, and promoting longevity. In TCM perspective, Holy Basil helps those who feel tired yet anxious, with mental fog, irregular sleep, or hormonal imbalances. Its warm, aromatic nature uplifts Qi and clears emotional stagnation.`,
  
  modernApplications: 'Used widely in modern integrative medicine as an adaptogen for stress management, anxiety relief, blood sugar regulation, immune support, and hormone balance. Popular forms include standardized extracts (300-600mg), tea, tinctures, and essential oils.',
  
  // 主要功效（数组格式）
  primaryEffects: [
    'Reduces Stress & Anxiety',
    'Balances Hormones & Enhances Energy',
    'Supports Heart & Blood Sugar Health',
    'Boosts Immunity & Fights Infections',
    'Improves Skin Clarity',
    'Supports Respiratory & Oral Health',
    'May Protect Against Cancer & Radiation'
  ],
  
  efficacy: [
    'Stress Relief',
    'Hormone Balance',
    'Blood Sugar Regulation',
    'Immune Support',
    'Skin Health',
    'Respiratory Support'
  ],
  
  // 活性成分
  activeCompounds: [
    'Eugenol',
    'Ursolic acid',
    'Oleanolic acid',
    'Rosmarinic acid',
    'Carvacrol',
    'Ocimumosides A & B',
    'Vitamin K'
  ],
  
  // 剂量和安全性
  dosage: 'Tea: 1-2 cups daily (2-3 tsp dried leaves). Extract: 300-600mg twice daily with meals. Essential oil: 2-3 drops in diffuser for aromatherapy. Fresh leaves: 5-10 leaves daily on empty stomach.',
  
  safetyLevel: 'medium',
  
  contraindications: `Avoid during pregnancy and breastfeeding unless supervised. Discontinue 2 weeks before surgery (may slow blood clotting). Use caution if trying to conceive (high doses reduced sperm count in animal studies). May interact with anticoagulants (Warfarin), diabetes medications, and thyroid drugs. Not recommended for severe Yin deficiency or excessive heat symptoms.`,
  
  interactionWarnings: 'May enhance effects of anticoagulants (Warfarin, Aspirin), diabetes medications (Metformin, Insulin), thyroid medications, blood pressure medications, and Cytochrome P450 substrates.',
  
  // 制备和储存
  preparationMethods: [
    'Holy Basil Tea: Steep 2-3 tsp dried leaves in hot water for 5-10 minutes',
    'Extract Capsules: Take 300-600mg twice daily with meals',
    'Essential Oil: Diffuse 2-3 drops or dilute 1-2% in carrier oil',
    'Fresh Leaves: Chew 5-10 leaves on empty stomach or add to meals',
    'Tincture: 2-4 mL (40-80 drops) 2-3 times daily in water'
  ],
  
  storageInstructions: 'Store dried leaves in airtight container in cool, dry place away from light. Fresh leaves best used immediately or refrigerated for 2-3 days. Capsules and tinctures should be kept at room temperature away from moisture.',
  
  // 价格范围
  priceRange: 'moderate',
  
  // 季节和地理
  seasonalAvailability: 'Year-round (cultivated)',
  geographicDistribution: 'Native to India and Southeast Asia, now cultivated worldwide in tropical and subtropical regions',
  
  // SEO 优化字段
  seoTitle: 'Holy Basil Benefits: Stress Relief, Hormone Balance & Sleep Support | HerbScience',
  seoDescription: 'Discover holy basil supplement benefits for stress relief, cortisol balance, and sleep support. Learn safe dosage, tulsi tea benefits, side effects & how to take holy basil safely. Evidence-based guide.',
  seoKeywords: [
    'holy basil benefits',
    'tulsi tea benefits',
    'holy basil tea benefits',
    'tulsi benefits',
    'holy basil supplement benefits',
    'tulsi tea health benefits',
    'tulsi tea side effects',
    'holy basil for stress',
    'holy basil for sleep',
    'cortisol holy basil',
    'holy basil and cortisol',
    'holy basil and sleep',
    'holy basil cortisol',
    'how to take holy basil safely',
    'tulsi hormone balance',
    'holy basil side effects',
    'ocimum sanctum',
    'tulsi adaptogen',
    'adaptogenic tulsi tea',
    'ashwagandha tulsi',
    'holy basil essential oil benefits'
  ],
  
  // 状态和发布时间
  status: 'published',
  publishedAt: new Date().toISOString()
};

async function addHolyBasilToSanity() {
  try {
    console.log('=== 将 Holy Basil (圣罗勒) 添加到 Sanity CMS ===\n');
    
    // 1. 检查是否已存在
    console.log('🔍 检查 Sanity 中是否已存在 Holy Basil...');
    const existingHerb = await client.fetch(
      `*[_type == "herb" && (slug.current == "holy-basil" || title == "Holy Basil" || chineseName == "圣罗勒")][0]`
    );
    
    if (existingHerb) {
      console.log('⚠️  Holy Basil 已存在于 Sanity 中');
      console.log('草药名称:', existingHerb.title);
      console.log('草药 ID:', existingHerb._id);
      console.log('Slug:', existingHerb.slug?.current);
      console.log('状态:', existingHerb.status);
      
      console.log('\n📝 如需更新数据，请手动在 Sanity Studio 中编辑');
      console.log('   或删除现有记录后重新运行此脚本');
      return existingHerb;
    }
    
    // 2. 创建 Holy Basil 文档
    console.log('✅ Holy Basil 不存在，开始创建...\n');
    console.log('正在上传数据到 Sanity CMS...');
    
    const result = await client.create(holyBasilData);
    
    console.log('\n🎉 Holy Basil 成功添加到 Sanity CMS！\n');
    console.log('草药 ID:', result._id);
    console.log('草药名称:', result.title);
    console.log('中文名称:', result.chineseName);
    console.log('拉丁名称:', result.latinName);
    console.log('Slug:', result.slug.current);
    console.log('状态:', result.status);
    console.log('分类:', result.category);
    console.log('体质类型:', result.constitutionType);
    
    console.log('\n🌐 前端访问 URL:');
    console.log('   主 URL: https://herbscience.shop/herbs/holy-basil');
    console.log('   别名 1: https://herbscience.shop/herbs/tulsi');
    console.log('   别名 2: https://herbscience.shop/herbs/ocimum-sanctum');
    console.log('   别名 3: https://herbscience.shop/herbs/ocimum-tenuiflorum');
    console.log('   别名 4: https://herbscience.shop/herbs/圣罗勒');
    
    console.log('\n🚀 下一步操作:');
    console.log('1. ✅ 数据已成功上传到 Sanity CMS');
    console.log('2. 🔄 Vercel 会自动重新构建网站（如已配置 webhook）');
    console.log('3. ⏱️  等待 2-5 分钟让部署完成');
    console.log('4. 🌐 访问 https://herbscience.shop/herbs/holy-basil 查看页面');
    console.log('5. 📊 如页面仍未显示，手动触发重新部署：');
    console.log('       vercel --prod  或在 Vercel Dashboard 点击 "Redeploy"');
    
    return result;
    
  } catch (error) {
    console.error('\n❌ 添加 Holy Basil 到 Sanity 失败:', error.message);
    
    if (error.statusCode === 401) {
      console.error('🔐 认证失败 - API token 无效或已过期');
      console.error('   请检查 token 是否正确');
    } else if (error.statusCode === 403) {
      console.error('🚫 权限不足 - token 没有写入权限');
      console.error('   请确保使用的是"编辑权限" token');
    } else if (error.details) {
      console.error('📋 详细错误信息:', JSON.stringify(error.details, null, 2));
    }
    
    console.error('\n💡 解决建议:');
    console.error('1. 确认 Sanity 项目 ID 正确: 13rzzwgz');
    console.error('2. 确认 API token 有效且具有写入权限');
    console.error('3. 检查网络连接');
    console.error('4. 确认 Sanity schema 中存在 "herb" 类型');
    
    return null;
  }
}

// 主函数
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   Holy Basil (圣罗勒) - Sanity CMS 上传脚本              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  const result = await addHolyBasilToSanity();
  
  if (result) {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║              ✅ 上传成功！页面即将可用                    ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
  } else {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║              ❌ 上传失败，请查看错误信息                  ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { addHolyBasilToSanity, holyBasilData };

