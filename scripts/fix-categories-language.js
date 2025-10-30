const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp'
});

async function fixCategoryLanguages() {
  try {
    console.log('🔧 开始修复分类的语言设置...\n');
    
    // 1. 为中文分类添加language字段
    const chineseCategories = [
      { id: '1tNFA3JjDDxFpUt90EzDfZ', title: '生活方式', slug: 'lifestyle' },
      { id: 'Grvt83VBWYs5sIFexSWY67', title: '科学研究', slug: 'science' }
    ];
    
    console.log('📝 步骤1：为中文分类添加language字段和slug...\n');
    
    for (const cat of chineseCategories) {
      console.log(`更新分类: ${cat.title}`);
      await client
        .patch(cat.id)
        .set({ 
          language: 'zh',
          slug: { current: cat.slug, _type: 'slug' }
        })
        .commit();
      console.log(`✅ 已更新: ${cat.title} → language: 'zh', slug: ${cat.slug}\n`);
    }
    
    // 2. 为英文分类添加language字段
    const englishCategories = [
      { id: 'gxyxv316c0oeG6AdOKIz4H', title: 'Herb Safety' },
      { id: 'gxyxv316c0oeG6AdOKIyaM', title: 'Herbal Guides' }
    ];
    
    console.log('📝 步骤2：为英文分类添加language字段...\n');
    
    for (const cat of englishCategories) {
      console.log(`更新分类: ${cat.title}`);
      await client
        .patch(cat.id)
        .set({ language: 'en' })
        .commit();
      console.log(`✅ 已更新: ${cat.title} → language: 'en'\n`);
    }
    
    console.log('🎉 所有分类的语言设置已更新！\n');
    
    // 3. 验证更新
    console.log('🔍 验证更新结果...\n');
    const allCategories = await client.fetch(`
      *[_type == "category"] {
        _id,
        title,
        slug,
        language
      } | order(title asc)
    `);
    
    allCategories.forEach(cat => {
      console.log(`${cat.title}: language="${cat.language || '未设置'}", slug="${cat.slug?.current || '未设置'}"`);
    });
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    if (error.response) {
      console.error('详细错误:', error.response);
    }
  }
}

fixCategoryLanguages();

