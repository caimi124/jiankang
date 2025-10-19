/**
 * 添加Turmeric博客文章到Sanity CMS
 * 
 * 使用方法：
 * 1. 确保已安装 @sanity/client
 * 2. 配置Sanity project ID和dataset
 * 3. 运行: node add-turmeric-blog-to-sanity.js
 */

const { createClient } = require('@sanity/client');

// Sanity配置 - 请根据你的项目配置修改
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // 需要写权限的token
  apiVersion: '2024-01-01'
});

// 将HTML/Markdown转换为Sanity Block Content
function createBlockContent(text, style = 'normal') {
  return {
    _type: 'block',
    style: style,
    children: [
      {
        _type: 'span',
        text: text,
        marks: []
      }
    ],
    markDefs: []
  };
}

// 创建带强调的block
function createBlockWithMarks(text, marks = []) {
  return {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: text,
        marks: marks
      }
    ],
    markDefs: []
  };
}

// 创建列表项
function createListItem(text, listItem = 'bullet') {
  return {
    _type: 'block',
    style: 'normal',
    listItem: listItem,
    children: [
      {
        _type: 'span',
        text: text,
        marks: []
      }
    ],
    markDefs: []
  };
}

// Turmeric博客文章完整内容
const turmericBlogPost = {
  _type: 'blogPost',
  title: 'How Much Turmeric Per Day? Safe Dosage Guide (2025 Update)',
  slug: {
    _type: 'slug',
    current: 'how-much-turmeric-per-day'
  },
  excerpt: 'Discover the safe turmeric dosage per day. Learn how much turmeric you should take for inflammation, what turmeric does for your body, and how to avoid side effects. Complete evidence-based guide with dosage tables and recipes.',
  
  // SEO字段
  seoTitle: 'How Much Turmeric Per Day? Safe Dosage Guide (2025)',
  seoDescription: 'Discover the safe turmeric dosage per day. Learn how much turmeric you should take for inflammation, what does turmeric do for your body, and avoid side effects. Evidence-based guide.',
  seoKeywords: [
    'how much turmeric per day',
    'turmeric dosage',
    'what does turmeric do for the body',
    'turmeric powder dosage',
    'recommended dosage of turmeric for inflammation',
    'how much turmeric daily',
    'turmeric supplement dose',
    'best way to take turmeric',
    'turmeric side effects',
    'best turmeric supplement'
  ],
  
  // 文章内容（Sanity Block Content格式）
  content: [
    createBlockContent('Before diving into dosage, let\'s answer the most common question: what does turmeric actually do for your body?', 'h2'),
    
    createBlockContent('Turmeric (Curcuma longa) is a golden-yellow spice that may help support your body\'s natural inflammatory response, promote digestive comfort, and provide antioxidant protection. The active compound — curcumin — is what gives turmeric its potential health-supporting properties.'),
    
    createBlockContent('But here\'s the catch: how much turmeric you take daily determines whether you\'ll experience benefits or just waste your money.'),
    
    createBlockContent('The Real Question: How Much Turmeric Should I Take?', 'h2'),
    
    createBlockContent('You\'ve probably heard your yoga instructor, wellness blogger, and maybe even your doctor mention turmeric. Everyone says it\'s amazing — but nobody tells you exactly how much to take.'),
    
    createBlockContent('Too little? You won\'t feel a thing. Too much? You might experience digestive upset, nausea, or other turmeric side effects.'),
    
    createBlockContent('So what\'s the safe turmeric dosage per day that actually works? Let\'s break it down based on what you\'re trying to achieve and how you plan to use it.'),
    
    createBlockContent('Option 1: Food Form — The Daily Wellness Way', 'h2'),
    
    createBlockContent('How Much Turmeric Powder Per Day?', 'h3'),
    
    createBlockWithMarks('Dosage: ½ to 1 teaspoon (approximately 1–3 grams) of turmeric powder daily', ['strong']),
    
    createBlockContent('How to take it:', 'h4'),
    createListItem('Add to smoothies, scrambled eggs, or oatmeal'),
    createListItem('Mix into golden milk (turmeric latte)'),
    createListItem('Stir into soups, curries, or rice dishes'),
    
    createBlockContent('The Secret Nobody Tells You: Add Fat + Black Pepper', 'h3'),
    
    createBlockContent('Here\'s why most people don\'t feel turmeric benefits: curcumin is poorly absorbed on its own.'),
    
    createBlockContent('The solution:', 'h4'),
    createListItem('Add a healthy fat (coconut oil, olive oil, avocado, nuts) — curcumin is lipophilic (fat-loving)'),
    createListItem('Add a pinch of black pepper — piperine in black pepper increases curcumin absorption by up to 2,000%'),
    
    createBlockContent('Try this: Golden milk before bed', 'h4'),
    createListItem('1 tsp turmeric powder'),
    createListItem('1 cup warm milk (dairy or plant-based)'),
    createListItem('1 tsp coconut oil or ghee'),
    createListItem('Pinch of black pepper'),
    createListItem('Honey to taste'),
    
    createBlockContent('Option 2: Supplement Form — The Targeted Support Way', 'h2'),
    
    createBlockContent('Best for: Supporting joint comfort, reducing exercise-induced soreness, or addressing specific health goals.'),
    
    createBlockContent('Recommended Dosage of Turmeric for Inflammation', 'h3'),
    
    createBlockWithMarks('Dosage: 500–1,500 mg turmeric extract per day, standardized to 95% curcuminoids', ['strong']),
    
    createBlockContent('What to look for:', 'h4'),
    createListItem('Standardized curcumin extract (not just ground turmeric root)'),
    createListItem('Piperine (BioPerine®) or ginger extract for enhanced absorption'),
    createListItem('Liposomal curcumin or phytosome curcumin for maximum bioavailability'),
    
    createBlockContent('How Much Turmeric Is Too Much?', 'h2'),
    
    createBlockContent('While turmeric is generally safe, more is NOT always better.'),
    
    createBlockContent('Maximum Safe Limits:', 'h3'),
    createListItem('Food form (powder): Up to 8 grams per day is considered safe'),
    createListItem('Supplement form (extract): Up to 3,000 mg curcumin per day (short-term use)'),
    
    createBlockContent('Signs You\'re Taking Too Much Turmeric:', 'h3'),
    createListItem('Digestive upset (nausea, diarrhea, stomach pain)'),
    createListItem('Headaches or dizziness'),
    createListItem('Skin rashes or itching'),
    createListItem('Yellowing of stool (harmless but means you\'re taking more than your body can absorb)'),
    createListItem('Increased bleeding risk (if combined with blood thinners)'),
    
    createBlockWithMarks('Pro tip: Start with half the recommended dose for the first week to assess tolerance, then gradually increase.', ['strong']),
    
    createBlockContent('Does Your Body Type Matter for Turmeric Dosage?', 'h2'),
    
    createBlockContent('Yes! In Traditional Chinese Medicine (TCM), turmeric works differently based on your constitution.'),
    
    createBlockContent('Best Turmeric Dosage for:', 'h3'),
    
    createBlockContent('Cold Constitution / Yang Deficiency', 'h4'),
    createListItem('Symptoms: Always cold, sluggish digestion, poor circulation'),
    createListItem('Dosage: 1–2 tsp powder daily OR 1,000 mg extract'),
    createListItem('Why it helps: Turmeric is warming and moves stagnant blood'),
    
    createBlockContent('Blood Stasis Constitution', 'h4'),
    createListItem('Symptoms: Poor circulation, muscle stiffness, chronic pain'),
    createListItem('Dosage: 1,000–1,500 mg extract with ginger'),
    createListItem('Why it helps: Turmeric helps support healthy circulation'),
    
    createBlockContent('Use Turmeric Cautiously If You Have:', 'h3'),
    
    createBlockContent('Yin Deficiency with Heat', 'h4'),
    createListItem('Symptoms: Hot flashes, night sweats, dry mouth, irritability'),
    createListItem('Why: Turmeric\'s warming nature may worsen heat symptoms'),
    createListItem('Alternative: Try chamomile or holy basil instead'),
    
    createBlockContent('Best Way to Take Turmeric: Timing Matters', 'h2'),
    
    createBlockContent('Morning (Best for Energy & Metabolism)', 'h3'),
    createBlockContent('Take turmeric with breakfast if you want all-day antioxidant support, digestive comfort throughout the day, and metabolic support.'),
    createBlockContent('How: Add ½ tsp turmeric powder to your morning smoothie or scrambled eggs with a drizzle of olive oil.'),
    
    createBlockContent('Before Meals (Best for Digestion)', 'h3'),
    createBlockContent('Take turmeric 30 minutes before eating if you want digestive enzyme stimulation, better nutrient absorption, and bloating prevention.'),
    createBlockContent('How: 500mg turmeric capsule with water before lunch or dinner.'),
    
    createBlockContent('After Workout (Best for Recovery)', 'h3'),
    createBlockContent('Take turmeric within 2 hours post-exercise if you want muscle soreness support, joint comfort after intense training, and faster recovery.'),
    createBlockContent('How: 1,000mg curcumin extract with a protein shake (the fat in the shake boosts absorption).'),
    
    createBlockContent('What Does Turmeric Do for Your Body? (Science-Backed)', 'h2'),
    
    createBlockContent('Let\'s look at what the research actually shows about turmeric\'s benefits:'),
    
    createBlockContent('1. May Help Support Healthy Inflammatory Response', 'h3'),
    createBlockContent('Research: A 2017 study in the Journal of Medicinal Food found that 500mg curcumin twice daily may help support joint comfort in adults with knee discomfort over 8 weeks.'),
    createBlockContent('How it works: Curcumin may help modulate inflammatory pathways (COX-2, NF-kB) without completely blocking them — supporting your body\'s natural balance.'),
    
    createBlockContent('2. May Support Digestive Comfort', 'h3'),
    createBlockContent('Research: Studies suggest curcumin may help stimulate bile production, which supports fat digestion and may reduce bloating.'),
    createBlockContent('How much: 500mg curcumin before meals.'),
    
    createBlockContent('3. May Provide Antioxidant Protection', 'h3'),
    createBlockContent('Research: Curcumin acts as a potent antioxidant, potentially helping neutralize free radicals and support cellular health.'),
    createBlockContent('How much: 500–1,000mg daily.'),
    
    createBlockContent('Important: Does Turmeric Help with Inflammation?', 'h2'),
    
    createBlockContent('Short answer: Yes, turmeric may help support your body\'s natural inflammatory response — but it\'s not a replacement for medical treatment.'),
    
    createBlockContent('What research shows:', 'h4'),
    createListItem('Curcumin may help support joint comfort in mild to moderate discomfort'),
    createListItem('It may help reduce exercise-induced muscle soreness'),
    createListItem('It may support cardiovascular health by promoting healthy inflammatory balance'),
    
    createBlockContent('What turmeric does NOT do:', 'h4'),
    createListItem('Cure diseases'),
    createListItem('Replace prescribed medications'),
    createListItem('Work instantly (benefits build over 2-4 weeks)'),
    
    createBlockContent('Turmeric Safety: Who Should NOT Take It?', 'h2'),
    
    createBlockContent('While turmeric is generally safe, some people should avoid high doses:'),
    
    createBlockContent('Avoid Turmeric Supplements If You:', 'h3'),
    createListItem('Take blood-thinning medications (warfarin, aspirin, clopidogrel) - May increase bleeding risk'),
    createListItem('Have gallstones or bile duct obstruction - Stimulates bile production'),
    createListItem('Are pregnant or breastfeeding - Safety not established in high doses'),
    createListItem('Have iron deficiency - May reduce iron absorption'),
    createListItem('Are scheduled for surgery within 2 weeks - May increase bleeding risk'),
    
    createBlockWithMarks('Always consult your healthcare provider before starting turmeric supplements, especially if you take medications or have chronic conditions.', ['strong']),
    
    createBlockContent('Best Turmeric Supplement: What to Look For', 'h2'),
    
    createBlockContent('Not all turmeric supplements are created equal. Here\'s what actually matters:'),
    
    createBlockContent('Quality Checklist:', 'h3'),
    createListItem('Standardized to 95% curcuminoids (not just "turmeric root powder")'),
    createListItem('Contains BioPerine® (black pepper extract) for absorption'),
    createListItem('Third-party tested (USP, NSF, or ConsumerLab verified)'),
    createListItem('Organic and non-GMO (reduces pesticide exposure)'),
    createListItem('Free from fillers and artificial ingredients'),
    
    createBlockContent('Advanced Absorption Technologies:', 'h3'),
    createBlockContent('If you want maximum bioavailability, look for:'),
    createListItem('Liposomal curcumin — 40x better absorption'),
    createListItem('Phytosome curcumin (Meriva®) — 29x better absorption'),
    createListItem('BCM-95® — contains natural turmeric oils for enhanced absorption'),
    
    createBlockContent('Turmeric Recipes: Delicious Ways to Get Your Daily Dose', 'h2'),
    
    createBlockContent('Golden Milk (Turmeric Latte)', 'h3'),
    createBlockContent('Ingredients:'),
    createListItem('1 cup milk (dairy or plant-based)'),
    createListItem('1 tsp turmeric powder'),
    createListItem('½ tsp cinnamon'),
    createListItem('1 tsp coconut oil or ghee'),
    createListItem('Pinch of black pepper'),
    createListItem('Honey to taste'),
    createBlockContent('Instructions: Warm all ingredients in a pot, whisk until smooth. Drink before bed for relaxation and overnight support.'),
    
    createBlockContent('Turmeric Ginger Shot', 'h3'),
    createBlockContent('Ingredients:'),
    createListItem('1-inch fresh turmeric root (or 1 tsp powder)'),
    createListItem('1-inch fresh ginger root'),
    createListItem('½ lemon (juiced)'),
    createListItem('Pinch of black pepper'),
    createBlockContent('Instructions: Blend all ingredients with ½ cup water, strain, and drink in the morning for an antioxidant boost.'),
    
    createBlockContent('Frequently Asked Questions', 'h2'),
    
    createBlockContent('Q: Can I take turmeric every day?', 'h3'),
    createBlockContent('A: Yes, daily turmeric in food amounts (½–1 tsp) or supplement form (500–1,000mg) is generally safe for most people. For long-term use, consider cycling: 8-12 weeks on, 1-2 weeks off.'),
    
    createBlockContent('Q: How much turmeric can you take a day?', 'h3'),
    createBlockContent('A: Safe limits: Food form: Up to 8 grams turmeric powder. Supplement form: Up to 3,000mg curcumin extract (short-term). Recommended daily: 500–1,500mg extract OR ½–1 tsp powder.'),
    
    createBlockContent('Q: Should I take turmeric with food?', 'h3'),
    createBlockContent('A: Yes, always. Turmeric absorption is significantly better when taken with a meal containing healthy fats (olive oil, avocado, nuts, fish) and black pepper (piperine increases absorption by 2,000%).'),
    
    createBlockContent('Q: How long does it take for turmeric to work?', 'h3'),
    createBlockContent('A: Most people notice effects within 2-4 weeks for joint comfort and inflammation support, 4-8 weeks for digestive benefits, and 8-12 weeks for long-term antioxidant protection. Consistency is key.'),
    
    createBlockContent('Q: What is turmeric and ginger good for?', 'h3'),
    createBlockContent('A: Turmeric and ginger work synergistically to support healthy inflammatory response, promote digestive comfort, provide antioxidant protection, and enhance circulation. Recommended combo: 500mg turmeric + 250mg ginger extract daily.'),
    
    createBlockContent('Q: Is turmeric bad for your liver?', 'h3'),
    createBlockContent('A: No, when used appropriately. In fact, turmeric may support liver health by promoting detoxification pathways. However, very high doses (>8,000mg) may cause liver enzyme elevation in rare cases. If you have pre-existing liver conditions, consult your doctor before supplementing.'),
    
    createBlockContent('Bottom Line: How Much Turmeric Per Day?', 'h2'),
    
    createBlockContent('The sweet spot for most people:'),
    createListItem('Food form: ½–1 teaspoon turmeric powder daily'),
    createListItem('Supplement form: 500–1,000mg curcumin extract daily'),
    
    createBlockContent('Remember:', 'h4'),
    createListItem('Always take with fat and black pepper for absorption'),
    createListItem('Be consistent — benefits build over 2-4 weeks'),
    createListItem('Start with half dose if you\'re new to turmeric'),
    createListItem('Cycle your use for long-term supplementation (8-12 weeks on, 1-2 weeks off)'),
    createListItem('Consult your doctor if you take medications or have health conditions'),
    
    createBlockContent('Turmeric won\'t replace medicine, but it can absolutely support your body\'s natural healing rhythm when used correctly.'),
  ],
  
  // 文章元数据
  readTime: 8,
  featured: true,
  publishedAt: new Date('2025-01-19').toISOString(),
  status: 'published'
};

// 执行添加
async function addTurmericBlogPost() {
  try {
    console.log('🌿 开始添加Turmeric博客文章到Sanity CMS...\n');
    
    // 步骤1：检查或创建Author
    console.log('步骤1: 检查作者...');
    let author = await client.fetch(`*[_type == "author" && slug.current == "herbscience-team"][0]`);
    
    if (!author) {
      console.log('创建默认作者...');
      author = await client.create({
        _type: 'author',
        name: 'HerbScience Team',
        slug: { _type: 'slug', current: 'herbscience-team' },
        bio: 'HerbScience editorial team specializing in evidence-based herbal medicine and Traditional Chinese Medicine.',
        expertise: ['Herbal Medicine', 'Traditional Chinese Medicine', 'Nutrition', 'Wellness']
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
        description: 'Comprehensive guides on how to use herbs safely and effectively'
      });
      console.log('✅ 分类创建成功:', category.title);
    } else {
      console.log('✅ 分类已存在:', category.title);
    }
    
    // 步骤3：检查或创建Tags
    console.log('\n步骤3: 创建标签...');
    const tagNames = ['Turmeric', 'Dosage Guide', 'Inflammation', 'TCM Constitution'];
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
    
    // 步骤4：创建博客文章
    console.log('\n步骤4: 创建博客文章...');
    
    const blogPostWithRefs = {
      ...turmericBlogPost,
      author: { _type: 'reference', _ref: author._id },
      category: { _type: 'reference', _ref: category._id },
      tags: tags
    };
    
    const result = await client.create(blogPostWithRefs);
    
    console.log('\n🎉 成功！Turmeric博客文章已添加到Sanity CMS');
    console.log('\n📊 文章详情:');
    console.log(`   ID: ${result._id}`);
    console.log(`   标题: ${result.title}`);
    console.log(`   Slug: ${result.slug.current}`);
    console.log(`   状态: ${result.status}`);
    console.log(`   阅读时间: ${result.readTime}分钟`);
    console.log(`\n✅ 现在你可以在Sanity Studio中编辑这篇文章:`);
    console.log(`   URL: https://herbscience.sanity.studio/desk/blogPost;${result._id}`);
    
  } catch (error) {
    console.error('❌ 添加失败:', error.message);
    if (error.response) {
      console.error('   错误详情:', error.response);
    }
    process.exit(1);
  }
}

// 运行脚本
addTurmericBlogPost();

