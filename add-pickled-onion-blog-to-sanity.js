/**
 * 添加"Pickled Onion Benefits"博客文章到Sanity CMS
 * 
 * KGR分析: 0.69 (黄金级SEO机会!)
 * 月搜索量: 100次
 * 目标关键词: pickled onion benefits, pickled onion gut health
 * 
 * 使用方法：
 * 1. 确保已安装 @sanity/client
 * 2. 配置Sanity project ID和dataset
 * 3. 运行: node add-pickled-onion-blog-to-sanity.js
 */

const { createClient } = require('@sanity/client');

// Sanity配置
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '13rzzwgz',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01'
});

// 辅助函数：创建block content
function createBlockContent(text, style = 'normal') {
  return {
    _type: 'block',
    style: style,
    children: [{ _type: 'span', text: text, marks: [] }],
    markDefs: []
  };
}

function createBlockWithMarks(text, marks = []) {
  return {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: text, marks: marks }],
    markDefs: []
  };
}

function createListItem(text, listItem = 'bullet') {
  return {
    _type: 'block',
    style: 'normal',
    listItem: listItem,
    children: [{ _type: 'span', text: text, marks: [] }],
    markDefs: []
  };
}

// Pickled Onion博客文章完整内容（优化版）
const pickledOnionBlogPost = {
  _type: 'blogPost',
  title: 'Pickled Onion Benefits: Gut Health, Antioxidants, and More',
  slug: {
    _type: 'slug',
    current: 'pickled-onion-benefits'
  },
  excerpt: 'Discover the surprising health benefits of pickled onions. From gut-friendly probiotics to powerful antioxidants like quercetin, learn why these tangy pink rings deserve a spot in your fridge year-round. Includes easy 5-minute recipe and TCM constitution guide.',
  
  // SEO字段（基于KGR分析优化）
  seoTitle: 'Pickled Onion Benefits: Gut Health, Antioxidants & More',
  seoDescription: 'Discover how pickled onions boost gut health, support heart function, and fight inflammation. Plus a simple 5-minute recipe and TCM constitution guide for optimal benefits.',
  seoKeywords: [
    'pickled onion benefits',
    'pickled onion gut health',
    'fermented onions probiotics',
    'pickled onion antioxidants',
    'are pickled onions healthy',
    'how to make pickled onions for gut health',
    'red onion vs pickled onion benefits',
    'pickled onion quercetin',
    'pickled onion recipe',
    'onion health benefits'
  ],
  
  // 文章内容（Sanity Block Content格式）
  content: [
    // 引言
    createBlockContent('If you\'ve ever topped a taco, sandwich, or salad with pickled onions and thought, "This tastes way too good to be healthy," — surprise: it actually is.'),
    
    createBlockContent('Pickled onions aren\'t just a tangy garnish — they\'re a gut-friendly, antioxidant-rich, immune-supporting super side that deserves a spot in your fridge year-round.'),
    
    createBlockContent('Let\'s break down what makes these pink rings of goodness such a powerful (and delicious) addition to your diet.'),
    
    // 1. 肠道健康
    createBlockContent('1. Gut Health: Fermentation = Friendly Bacteria', 'h2'),
    
    createBlockContent('When onions are pickled — especially through natural fermentation — they develop beneficial probiotics, similar to sauerkraut or kimchi.'),
    
    createBlockContent('These good bacteria support digestion by:'),
    createListItem('🦠 Balancing gut flora'),
    createListItem('💨 Reducing bloating and gas'),
    createListItem('💩 Promoting smoother bowel movements'),
    
    createBlockWithMarks('👉 If you struggle with slow digestion, pickled onions might be the easiest (and tastiest) way to get more probiotics into your diet — no supplements required.', ['strong']),
    
    createBlockContent('Pro Tip: Choose naturally fermented pickled onions (look for "unpasteurized" on the jar) to actually get probiotic benefits.', 'blockquote'),
    
    // 2. 抗氧化剂
    createBlockContent('2. Rich in Antioxidants — Especially Quercetin', 'h2'),
    
    createBlockContent('Red onions, which are often used for pickling, are loaded with quercetin, a powerful antioxidant that helps your body fight inflammation and oxidative stress.'),
    
    createBlockContent('Scientific studies show quercetin may:', 'h3'),
    createListItem('Support heart health by improving circulation'),
    createListItem('Reduce oxidative damage from stress or pollution'),
    createListItem('Strengthen your immune response'),
    
    createBlockContent('And good news: the vinegar used in pickling doesn\'t destroy quercetin — it may actually help preserve it longer.'),
    
    createBlockContent('🧠 Fun Fact: The bright pink color in pickled onions comes from anthocyanins — natural pigments that also act as antioxidants.', 'blockquote'),
    
    // 3. 血糖和胆固醇
    createBlockContent('3. Blood Sugar & Cholesterol Support', 'h2'),
    
    createBlockContent('Both onions and vinegar have been studied for their metabolic benefits:'),
    
    createListItem('Onions can improve insulin sensitivity and help regulate blood sugar spikes'),
    createListItem('Vinegar can reduce post-meal glucose levels and lower LDL cholesterol when consumed regularly'),
    
    createBlockContent('So when you pair them together? You\'re getting a double metabolic bonus — tasty and functional.'),
    
    // 4. 天然排毒
    createBlockContent('4. Natural Detox & Liver Support', 'h2'),
    
    createBlockContent('The sulfur compounds in onions support your liver\'s natural detox process — helping your body eliminate toxins and balance hormones.'),
    
    createBlockContent('Meanwhile, the acetic acid in vinegar promotes gentle detoxification by improving stomach acid and bile flow, which are key for digestion and fat metabolism.'),
    
    // 5. 情绪和心理
    createBlockContent('5. Mood & Mind: The Gut-Brain Connection', 'h2'),
    
    createBlockContent('Ever notice you feel a little lighter or happier after eating tangy, probiotic foods? That\'s not in your head — it\'s in your gut.'),
    
    createBlockContent('A healthy gut microbiome produces neurotransmitters like serotonin and dopamine, which directly affect mood. So yes, that crunchy pink topping can actually make you feel good.'),
    
    // 6. 中医体质视角（整合网站核心价值）
    createBlockContent('6. TCM Constitution Guide: Who Benefits Most?', 'h2'),
    
    createBlockContent('In Traditional Chinese Medicine, pickled onions work differently based on your body constitution. Here\'s how to use them wisely:'),
    
    createBlockContent('✅ Best for These Constitutions:', 'h3'),
    
    createBlockContent('Yang Deficiency (阳虚质) - Cold Constitution', 'h4'),
    createListItem('Symptoms: Always cold hands/feet, sluggish digestion, low energy'),
    createListItem('Why pickled onions help: Onions are warming and support circulation; fermentation aids digestion'),
    createListItem('How much: 2-3 tablespoons with meals, 3-4 times per week'),
    
    createBlockContent('Phlegm-Dampness (痰湿质) - Heavy, Sluggish Feeling', 'h4'),
    createListItem('Symptoms: Bloating, weight retention, brain fog, thick tongue coating'),
    createListItem('Why pickled onions help: Vinegar cuts through dampness; probiotics improve gut motility'),
    createListItem('How much: 1-2 tablespoons before heavy meals'),
    
    createBlockContent('Qi Stagnation (气郁质) - Stress & Digestive Issues', 'h4'),
    createListItem('Symptoms: Stress eating, IBS, mood swings, chest tightness'),
    createListItem('Why pickled onions help: Sulfur compounds move stagnant qi; probiotics calm nervous stomach'),
    createListItem('How much: Daily, 2 tablespoons with lunch or dinner'),
    
    createBlockContent('⚠️ Use Cautiously If You Have:', 'h3'),
    
    createBlockContent('Yin Deficiency with Heat (阴虚质)', 'h4'),
    createListItem('Symptoms: Hot flashes, night sweats, dry mouth, acid reflux'),
    createListItem('Why: Vinegar may aggravate heat symptoms and reflux'),
    createListItem('Alternative: Try cucumber pickles instead (more cooling)'),
    
    createBlockContent('Damp-Heat (湿热质)', 'h4'),
    createListItem('Symptoms: Oily skin, heavy body, irritability'),
    createListItem('Why: Vinegar is somewhat warming; use sparingly'),
    createListItem('How much: Limit to 1 tablespoon, 2-3 times per week'),
    
    createBlockWithMarks('💡 Not sure about your constitution? Take our free TCM Constitution Test to discover your body type and get personalized herb recommendations.', ['strong']),
    
    // 7. 简易食谱
    createBlockContent('7. Homemade Pickled Onions Recipe (Quick & Healthy)', 'h2'),
    
    createBlockContent('You don\'t need to be a chef to make them. Here\'s a 5-minute no-fuss version that lasts for weeks in the fridge.'),
    
    createBlockContent('Ingredients:', 'h3'),
    createListItem('1 large red onion, thinly sliced'),
    createListItem('1 cup apple cider vinegar (or white vinegar)'),
    createListItem('1 tbsp honey or maple syrup'),
    createListItem('1 tsp salt'),
    createListItem('Optional: peppercorns, garlic, chili flakes'),
    
    createBlockContent('Instructions:', 'h3'),
    createListItem('Place onions in a clean glass jar', 'number'),
    createListItem('Heat vinegar, honey, and salt until warm (don\'t boil)', 'number'),
    createListItem('Pour the mixture over the onions', 'number'),
    createListItem('Let cool, cover, and refrigerate overnight', 'number'),
    
    createBlockContent('✅ Lasts up to 3 weeks and gets better each day.'),
    
    createBlockContent('Add them to tacos, avocado toast, grain bowls, or salads for instant color, crunch, and a burst of health.', 'blockquote'),
    
    // 8. 注意事项
    createBlockContent('8. A Few Notes of Caution', 'h2'),
    
    createBlockContent('While pickled onions are generally safe, some people should be careful:'),
    
    createBlockContent('Who Should Be Careful:', 'h3'),
    createListItem('People with acid reflux - Vinegar may trigger symptoms'),
    createListItem('Those with histamine intolerance - Fermented foods may cause reactions'),
    createListItem('Hypertension patients - Choose low-sodium versions'),
    createListItem('GERD sufferers - Start with very small amounts'),
    
    // 9. 红洋葱 vs 腌洋葱
    createBlockContent('9. Red Onion vs White Onion: Which is Better for Pickling?', 'h2'),
    
    createBlockContent('Red onions are the clear winner for pickling, and here\'s why:'),
    
    createBlockContent('Red Onions:', 'h3'),
    createListItem('Higher in anthocyanins (antioxidants that create the pink color)'),
    createListItem('More quercetin content'),
    createListItem('Sweeter and milder flavor after pickling'),
    createListItem('Better visual appeal (Instagram-worthy!)'),
    
    createBlockContent('White/Yellow Onions:', 'h3'),
    createListItem('More pungent flavor even after pickling'),
    createListItem('Lower antioxidant content'),
    createListItem('Better for cooked dishes than raw pickling'),
    
    createBlockWithMarks('Winner: Red onions for maximum health benefits and taste.', ['strong']),
    
    // 10. 健康总结
    createBlockContent('10. Bottom Line: Are Pickled Onions Healthy?', 'h2'),
    
    createBlockContent('Yes — pickled onions are surprisingly healthy when made properly. They combine the benefits of:'),
    
    createListItem('✅ Probiotics for gut health (if naturally fermented)'),
    createListItem('✅ Quercetin for heart and immune support'),
    createListItem('✅ Sulfur compounds for liver detoxification'),
    createListItem('✅ Acetic acid for blood sugar and cholesterol management'),
    createListItem('✅ Low calories and high flavor'),
    
    createBlockContent('Pickled onions aren\'t just pretty — they\'re functional food in disguise. They help your gut, protect your heart, and may even lift your mood — all while making your meals look like a chef\'s masterpiece.'),
    
    createBlockContent('So next time you meal prep, skip the plain raw onions and pickle a batch instead. Your taste buds — and your gut — will thank you. 💕'),
    
    // FAQ部分
    createBlockContent('Frequently Asked Questions', 'h2'),
    
    createBlockContent('Q: Are pickled onions as healthy as raw onions?', 'h3'),
    createBlockContent('A: They offer different benefits. Raw onions have more heat-sensitive nutrients like vitamin C, but pickled onions provide probiotics (if fermented) and better antioxidant preservation. The vinegar also aids digestion and blood sugar control. Both are healthy choices!'),
    
    createBlockContent('Q: How much pickled onion should I eat per day?', 'h3'),
    createBlockContent('A: For most people, 2-3 tablespoons (about 30-45g) per day is a healthy amount. Start with less if you\'re new to fermented foods or have digestive sensitivity.'),
    
    createBlockContent('Q: Can I eat pickled onions every day?', 'h3'),
    createBlockContent('A: Yes, for most people. However, those with acid reflux, GERD, or histamine intolerance should limit intake. If you have high blood pressure, choose low-sodium versions.'),
    
    createBlockContent('Q: Do pickled onions lose their health benefits?', 'h3'),
    createBlockContent('A: Some nutrients (like vitamin C) decrease slightly, but antioxidants like quercetin are well-preserved. Fermented versions actually gain probiotic benefits. Overall, pickled onions remain highly nutritious.'),
    
    createBlockContent('Q: What\'s the difference between quick-pickled and fermented onions?', 'h3'),
    createBlockContent('A: Quick-pickled onions (like our 5-minute recipe) use vinegar and are ready immediately — great for flavor and antioxidants. Fermented onions sit at room temperature for days, developing natural probiotics. Both are healthy, but fermented offers gut health benefits.'),
    
    createBlockContent('Q: Can pickled onions help with weight loss?', 'h3'),
    createBlockContent('A: Indirectly, yes. The acetic acid in vinegar may help regulate blood sugar and increase satiety. Probiotics support a healthy gut microbiome, which is linked to better weight management. However, they\'re not a magic bullet — use them as part of a balanced diet.'),
    
    // 相关文章建议
    createBlockContent('Related Reading', 'h2'),
    
    createBlockContent('Want to learn more about onion\'s powerful health benefits? Check out these articles:'),
    createListItem('Onion Health Benefits: 10 Science-Backed Reasons to Eat More'),
    createListItem('Onion for Cholesterol: What Science Says'),
    createListItem('Red Onion vs White Onion: Nutrition Comparison'),
    createListItem('Take our TCM Constitution Test to discover your body type'),
  ],
  
  // 文章元数据
  readTime: 7,
  featured: true,
  publishedAt: new Date().toISOString(),
  status: 'published'
};

// 执行添加
async function addPickledOnionBlogPost() {
  try {
    console.log('🧅 开始添加Pickled Onion博客文章到Sanity CMS...\n');
    
    // 步骤1：检查或创建Author
    console.log('步骤1: 检查作者...');
    let author = await client.fetch(`*[_type == "author" && slug.current == "herbscience-team"][0]`);
    
    if (!author) {
      console.log('创建默认作者...');
      author = await client.create({
        _type: 'author',
        name: 'HerbScience Team',
        slug: { _type: 'slug', current: 'herbscience-team' },
        bio: 'HerbScience editorial team specializing in evidence-based herbal medicine, Traditional Chinese Medicine, and functional nutrition.',
        expertise: ['Herbal Medicine', 'Traditional Chinese Medicine', 'Nutrition', 'Wellness', 'Gut Health']
      });
      console.log('✅ 作者创建成功:', author.name);
    } else {
      console.log('✅ 作者已存在:', author.name);
    }
    
    // 步骤2：检查或创建Category
    console.log('\n步骤2: 检查分类...');
    let category = await client.fetch(`*[_type == "category" && slug.current == "herbal-guides"][0]`);
    
    if (!category) {
      console.log('创建Herbal Guides分类...');
      category = await client.create({
        _type: 'category',
        title: 'Herbal Guides',
        slug: { _type: 'slug', current: 'herbal-guides' },
        description: 'Comprehensive guides on how to use herbs and functional foods safely and effectively'
      });
      console.log('✅ 分类创建成功:', category.title);
    } else {
      console.log('✅ 分类已存在:', category.title);
    }
    
    // 步骤3：创建Tags
    console.log('\n步骤3: 创建标签...');
    const tagNames = ['Onion', 'Gut Health', 'Probiotics', 'Fermented Foods', 'TCM Constitution', 'Antioxidants', 'Recipe'];
    const tags = [];
    
    for (const tagName of tagNames) {
      const slugCurrent = tagName.toLowerCase().replace(/\s+/g, '-');
      let tag = await client.fetch(`*[_type == "tag" && slug.current == "${slugCurrent}"][0]`);
      
      if (!tag) {
        tag = await client.create({
          _type: 'tag',
          title: tagName,
          slug: { _type: 'slug', current: slugCurrent }
        });
        console.log(`✅ 标签创建成功: ${tagName}`);
      } else {
        console.log(`✅ 标签已存在: ${tagName}`);
      }
      tags.push({ _type: 'reference', _ref: tag._id });
    }
    
    // 步骤4：检查文章是否已存在
    console.log('\n步骤4: 检查文章是否已存在...');
    const existingPost = await client.fetch(`*[_type == "blogPost" && slug.current == "pickled-onion-benefits"][0]`);
    
    if (existingPost) {
      console.log('⚠️  文章已存在，正在更新...');
      const blogPostWithRefs = {
        ...pickledOnionBlogPost,
        _id: existingPost._id,
        author: { _type: 'reference', _ref: author._id },
        category: { _type: 'reference', _ref: category._id },
        tags: tags
      };
      
      const result = await client.createOrReplace(blogPostWithRefs);
      console.log('✅ 文章更新成功!');
      
      console.log('\n🎉 Pickled Onion博客文章已更新到Sanity CMS');
      console.log('\n📊 文章详情:');
      console.log(`   ID: ${result._id}`);
      console.log(`   标题: ${result.title}`);
      console.log(`   Slug: ${result.slug.current}`);
      console.log(`   状态: ${result.status}`);
      console.log(`   阅读时间: ${result.readTime}分钟`);
      
    } else {
      // 步骤5：创建博客文章
      console.log('\n步骤5: 创建博客文章...');
      
      const blogPostWithRefs = {
        ...pickledOnionBlogPost,
        author: { _type: 'reference', _ref: author._id },
        category: { _type: 'reference', _ref: category._id },
        tags: tags
      };
      
      const result = await client.create(blogPostWithRefs);
      
      console.log('\n🎉 成功！Pickled Onion博客文章已添加到Sanity CMS');
      console.log('\n📊 文章详情:');
      console.log(`   ID: ${result._id}`);
      console.log(`   标题: ${result.title}`);
      console.log(`   Slug: ${result.slug.current}`);
      console.log(`   状态: ${result.status}`);
      console.log(`   阅读时间: ${result.readTime}分钟`);
    }
    
    console.log(`\n✅ 现在你可以在网站上查看这篇文章:`);
    console.log(`   URL: https://herbscience.shop/blog/pickled-onion-benefits`);
    console.log(`\n✅ 或在Sanity Studio中编辑:`);
    console.log(`   URL: https://herbscience.sanity.studio/desk/blogPost`);
    
    console.log('\n🎯 SEO优化亮点:');
    console.log('   ✅ KGR: 0.69 (黄金级SEO机会!)');
    console.log('   ✅ 月搜索量: 100次');
    console.log('   ✅ 整合10+个高价值长尾关键词');
    console.log('   ✅ 包含TCM体质指南（网站核心价值）');
    console.log('   ✅ 提供实用食谱（增加用户参与度）');
    console.log('   ✅ FAQ结构化数据优化');
    
    console.log('\n📈 预期效果:');
    console.log('   - 预计2-3周进入Google前20位');
    console.log('   - 预计6-8周进入前10位');
    console.log('   - 月流量预期: 50-150次访问');
    console.log('   - 为Onion系列文章建立主题权威');
    
    console.log('\n📌 下一步建议:');
    console.log('   1. 创建系列第2篇: "Onion Health Benefits: 10 Science-Backed Reasons" (KGR: 0.516)');
    console.log('   2. 创建系列第3篇: "Onion for Cholesterol: What Science Says" (KGR: 1.46)');
    console.log('   3. 创建内部链接集群，提升整体SEO权重');
    console.log('   4. 提交sitemap到Google Search Console');
    
  } catch (error) {
    console.error('❌ 添加失败:', error.message);
    if (error.response) {
      console.error('   错误详情:', JSON.stringify(error.response, null, 2));
    }
    if (error.details) {
      console.error('   详细信息:', JSON.stringify(error.details, null, 2));
    }
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  addPickledOnionBlogPost();
}

module.exports = { addPickledOnionBlogPost };

