/**
 * 添加"10 Serious Side Effects of Turmeric"博客文章到Sanity CMS
 * 
 * 使用方法：
 * 1. 确保已安装 @sanity/client
 * 2. 配置Sanity project ID和dataset
 * 3. 运行: node add-turmeric-side-effects-blog-to-sanity.js
 */

const { createClient } = require('@sanity/client');

// Sanity配置
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
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

// 博客文章完整内容
const turmericSideEffectsBlog = {
  _type: 'blogPost',
  title: '10 Serious Side Effects of Turmeric You Should Know (2025)',
  slug: {
    _type: 'slug',
    current: '10-serious-side-effects-of-turmeric'
  },
  excerpt: 'Discover the 10 serious side effects of turmeric and curcumin supplements. Learn about turmeric liver toxicity, medication interactions, and safe dosage guidelines backed by science. Essential reading before you start supplementing.',
  
  // SEO字段
  seoTitle: '10 Serious Side Effects of Turmeric You Should Know (2025)',
  seoDescription: 'Discover the 10 serious side effects of turmeric and curcumin supplements. Learn about turmeric liver toxicity, medication interactions, and safe dosage guidelines backed by science.',
  seoKeywords: [
    '10 serious side effects of turmeric',
    'turmeric side effects',
    'curcumin side effects',
    'turmeric supplement side effects',
    'is turmeric bad for your liver',
    'turmeric liver toxicity',
    'side effects of curcumin',
    'turmeric curcumin side effects',
    'turmeric safety',
    'turmeric medication interactions'
  ],
  
  // 文章内容（Sanity Block Content格式）
  content: [
    // 引言
    createBlockContent('The Golden Spice Has a Dark Side', 'h2'),
    
    createBlockContent('Turmeric may be the golden darling of the wellness world—but even the brightest stars cast shadows. This ancient spice, famous for its bright yellow color and potential health benefits, has become a staple in smoothies, lattes, and supplement cabinets worldwide.'),
    
    createBlockContent('But here\'s what they\'re not telling you: Like any powerful herb, turmeric comes with real risks—especially when taken in high doses or combined with certain medications.'),
    
    createBlockContent('Before you down that third turmeric latte today or start mega-dosing curcumin supplements, you need to know about these 10 serious side effects of turmeric that could affect your health.'),
    
    // Quick Safety Check
    createBlockContent('Quick Safety Check: Should You Be Reading This?', 'h2'),
    
    createBlockContent('You NEED to read this article if you:', 'h3'),
    createListItem('Take turmeric or curcumin supplements daily'),
    createListItem('Are considering starting turmeric supplementation'),
    createListItem('Take any prescription medications'),
    createListItem('Have a history of digestive issues, gallstones, or liver problems'),
    createListItem('Are pregnant, breastfeeding, or planning surgery'),
    
    // 副作用 #1: 消化不适
    createBlockContent('1. Digestive Upset: When Your Gut Says "No Thanks"', 'h2'),
    
    createBlockContent('What Happens', 'h3'),
    createBlockContent('Turmeric is a powerful digestive stimulant. It increases bile production and stimulates digestive enzymes—which sounds great in theory. But for many people, this means acid reflux, nausea, bloating, stomach cramps, or diarrhea.'),
    
    createBlockContent('The Science', 'h3'),
    createBlockContent('According to the National Center for Complementary and Integrative Health (NCCIH, 2023), turmeric can cause gastrointestinal discomfort, especially at doses above 2 grams per day. A 2022 study published in the Journal of Clinical Gastroenterology found that 16% of participants experienced digestive side effects when taking 1,000 mg curcumin supplements twice daily.'),
    
    createBlockContent('Who\'s Most at Risk?', 'h3'),
    createListItem('People with IBS (irritable bowel syndrome)'),
    createListItem('Those with acid reflux or GERD'),
    createListItem('Anyone with a history of stomach ulcers'),
    createListItem('People taking turmeric on an empty stomach'),
    
    createBlockContent('What to Do', 'h3'),
    createListItem('Always take turmeric with food (preferably with healthy fats)'),
    createListItem('Start with half the recommended dose to test tolerance'),
    createListItem('Reduce dosage if you experience stomach upset'),
    
    // 副作用 #2: 血液稀释
    createBlockContent('2. Blood Thinning: The Hidden Bleeding Risk', 'h2'),
    
    createBlockContent('What Happens', 'h3'),
    createBlockContent('This is one of the most serious side effects of turmeric that many people don\'t know about. Curcumin has natural anticoagulant (blood-thinning) properties. While mild, these effects can become dangerous when combined with blood-thinning medications or before surgery.'),
    
    createBlockContent('The Science', 'h3'),
    createBlockContent('A 2019 study in the Journal of Clinical Pharmacology demonstrated that curcumin can inhibit platelet aggregation—meaning your blood doesn\'t clot as easily. If you\'re already taking blood thinners (warfarin, Coumadin, Plavix, aspirin, heparin), adding turmeric supplements could increase bleeding risk significantly.'),
    
    createBlockContent('Who Should Avoid Turmeric Supplements?', 'h3'),
    createListItem('People taking blood-thinning medications'),
    createListItem('Anyone scheduled for surgery (stop 2-3 weeks before)'),
    createListItem('Those with bleeding disorders (hemophilia, von Willebrand disease)'),
    createListItem('People taking NSAIDs regularly (ibuprofen, naproxen)'),
    
    // 副作用 #3: 低血糖
    createBlockContent('3. Low Blood Sugar: The Hypoglycemia Trap', 'h2'),
    
    createBlockContent('What Happens', 'h3'),
    createBlockContent('Curcumin can improve insulin sensitivity and help support healthy blood sugar levels—which sounds like a good thing. But for people already taking diabetes medications, turmeric supplements can cause blood sugar to drop too low (hypoglycemia).'),
    
    createBlockContent('Symptoms of low blood sugar include dizziness and shakiness, confusion or irritability, sweating and rapid heartbeat, extreme hunger, and in severe cases: loss of consciousness.'),
    
    createBlockContent('The Science', 'h3'),
    createBlockContent('A 2021 study published in Evidence-Based Complementary and Alternative Medicine found that curcumin supplementation (1,500 mg/day) lowered fasting blood glucose by 18-23% in diabetic patients. While this can be beneficial, it becomes dangerous when combined with medications like metformin, insulin, or sulfonylureas.'),
    
    createBlockContent('What to Do', 'h3'),
    createListItem('Monitor blood sugar closely if you start turmeric'),
    createListItem('Consult your doctor before combining with diabetes meds'),
    createListItem('Never replace prescribed medication with turmeric'),
    createListItem('Be prepared to adjust medication dosages with medical supervision'),
    
    // 副作用 #4: 铁吸收
    createBlockContent('4. Iron Deficiency: The Absorption Blocker', 'h2'),
    
    createBlockContent('What Happens', 'h3'),
    createBlockContent('Regular, high-dose turmeric intake may reduce iron absorption in your intestines. If you\'re already prone to anemia or have low iron levels, this could make the problem worse. Women with heavy periods, vegetarians, and people with absorption issues are particularly vulnerable.'),
    
    createBlockContent('The Science', 'h3'),
    createBlockContent('According to a 2015 study in the Journal of Agricultural and Food Chemistry, curcumin can bind to iron in the digestive tract, forming complexes that are harder for your body to absorb.'),
    
    createBlockContent('What to Do', 'h3'),
    createListItem('Separate timing: Take turmeric and iron supplements at least 2-3 hours apart'),
    createListItem('Get regular blood work if you\'re at risk for anemia'),
    createListItem('Increase vitamin C intake (helps counteract the effect)'),
    createListItem('Choose food-form turmeric over high-dose supplements'),
    
    // 副作用 #5: 肝毒性
    createBlockContent('5. Liver Toxicity: When "Healthy" Hurts Your Liver', 'h2'),
    
    createBlockContent('What Happens', 'h3'),
    createBlockContent('This is perhaps the most controversial and concerning turmeric side effect. While turmeric in food amounts is safe, some concentrated supplements—especially those mixed with other herbs or contaminated with additives—have been linked to serious liver damage.'),
    
    createBlockContent('The Science', 'h3'),
    createBlockContent('The Drug-Induced Liver Injury Network (DILIN) published a 2020 report identifying turmeric/curcumin supplements as an emerging cause of drug-induced liver injury in the United States. Between 2004-2020, they documented dozens of cases of turmeric-related hepatotoxicity.'),
    
    createBlockContent('A 2019 case study in BMJ Case Reports described a 71-year-old woman who developed acute liver failure after taking turmeric supplements for 8 months. Her liver enzymes were over 1,000 times normal levels. Fortunately, she recovered after stopping the supplement.'),
    
    createBlockContent('Is Turmeric Bad for Your Liver?', 'h3'),
    createBlockContent('Short answer: Not in normal food amounts. The liver issues arise from very high doses (over 2,000 mg curcumin daily), poor-quality supplements, pre-existing liver conditions, and combination with alcohol or other hepatotoxic drugs.'),
    
    createBlockContent('Who Should Avoid High-Dose Turmeric?', 'h3'),
    createListItem('People with existing liver disease (hepatitis, cirrhosis, fatty liver)'),
    createListItem('Those who drink alcohol regularly'),
    createListItem('Anyone taking hepatotoxic medications (acetaminophen, statins, antibiotics)'),
    createListItem('People with Gilbert\'s syndrome or other metabolic liver conditions'),
    
    createBlockContent('Safe Practice', 'h3'),
    createListItem('Stick to reputable brands (USP, NSF, ConsumerLab certified)'),
    createListItem('Keep doses moderate (500-1,000 mg/day max)'),
    createListItem('Get liver function tests if you\'re a long-term user'),
    createListItem('Stop immediately if you notice symptoms'),
    
    // 副作用 #6: 过敏反应
    createBlockContent('6. Allergic Reactions: Rare But Real', 'h2'),
    
    createBlockContent('What Happens', 'h3'),
    createBlockContent('While uncommon, some people experience allergic reactions to turmeric, ranging from mild skin rashes to severe respiratory issues. Contact dermatitis (skin irritation) is more common when applying turmeric topically.'),
    
    createBlockContent('The Science', 'h3'),
    createBlockContent('According to the American Academy of Allergy, Asthma & Immunology (2018), documented turmeric allergies include contact dermatitis (red, itchy skin), hives or rash, shortness of breath or wheezing, and anaphylaxis (extremely rare but possible).'),
    
    createBlockContent('What to Do', 'h3'),
    createListItem('Do a patch test before using turmeric topically'),
    createListItem('Start with tiny amounts if trying for the first time'),
    createListItem('Stop immediately if you notice itching, swelling, or breathing issues'),
    createListItem('Seek medical attention for severe reactions'),
    
    // 副作用 #7: 药物相互作用
    createBlockContent('7. Medication Interactions: The Drug Interference Problem', 'h2'),
    
    createBlockContent('What Happens', 'h3'),
    createBlockContent('Turmeric doesn\'t just work on its own—it can alter how your liver metabolizes other medications, potentially making them more or less effective. This is one of the most underestimated turmeric supplement side effects.'),
    
    createBlockContent('The Science', 'h3'),
    createBlockContent('Curcumin affects cytochrome P450 enzymes in your liver—the same enzymes responsible for breaking down most prescription drugs. According to a 2019 review in Pharmacognosy Reviews, turmeric can interfere with blood thinners, diabetes medications, antidepressants, stomach acid reducers, chemotherapy drugs, blood pressure medications, and NSAIDs.'),
    
    createBlockContent('What to Do', 'h3'),
    createListItem('Tell your doctor and pharmacist about ALL supplements'),
    createListItem('Never start turmeric without medical clearance if you\'re on medications'),
    createListItem('Monitor for unusual effects after starting turmeric'),
    createListItem('Space out timing: Take turmeric at least 2 hours apart from medications when possible'),
    
    createBlockWithMarks('Golden Rule: If you take prescription medications regularly, turmeric supplements are NOT risk-free. Always get medical advice first.', ['strong']),
    
    // 副作用 #8: 胆囊问题
    createBlockContent('8. Gallbladder Problems: When Bile Stimulation Backfires', 'h2'),
    
    createBlockContent('What Happens', 'h3'),
    createBlockContent('Turmeric is a cholagogue—meaning it stimulates bile production in the liver and gallbladder. For healthy people, this aids digestion. But for those with gallstones or bile duct obstruction, this can trigger painful gallbladder attacks or even medical emergencies.'),
    
    createBlockContent('The Science', 'h3'),
    createBlockContent('According to the Mayo Clinic (2022), turmeric should be avoided by anyone with gallbladder disease because the increased bile flow can cause severe gallbladder pain, nausea and vomiting, blockage of bile ducts, and acute cholecystitis (gallbladder inflammation).'),
    
    createBlockContent('Who Should Avoid Turmeric?', 'h3'),
    createListItem('Anyone with gallstones (diagnosed or suspected)'),
    createListItem('People with bile duct obstruction'),
    createListItem('Those with a history of cholecystitis'),
    createListItem('Anyone who\'s been told to avoid fatty or spicy foods for gallbladder reasons'),
    
    // 副作用 #9: 补充剂质量问题
    createBlockContent('9. Contamination and Quality Issues: The Supplement Industry\'s Dirty Secret', 'h2'),
    
    createBlockContent('What Happens', 'h3'),
    createBlockContent('Here\'s an uncomfortable truth: Not all turmeric supplements are safe. Third-party testing has revealed that some products contain heavy metals (lead, mercury, cadmium), synthetic dyes, fillers and adulterants, pesticide residues, and mold and bacteria.'),
    
    createBlockContent('The Science', 'h3'),
    createBlockContent('ConsumerLab (2023) tested 27 popular turmeric/curcumin supplements. The results were shocking: 30% failed quality testing, 15% had lead contamination above safe limits, several products contained synthetic dyes not listed on labels, and some brands had excessive levels of heavy metals.'),
    
    createBlockContent('How to Protect Yourself', 'h3'),
    createBlockContent('Buy only from certified brands: Look for these seals:'),
    createListItem('USP Verified'),
    createListItem('NSF Certified'),
    createListItem('ConsumerLab Approved'),
    createListItem('GMP Certified'),
    createListItem('Organic certified'),
    
    createBlockContent('Additional tips:'),
    createListItem('Check third-party test results: Reputable brands publish their lab results'),
    createListItem('Avoid suspiciously cheap products: Quality testing costs money'),
    createListItem('Choose standardized extracts: "Standardized to 95% curcuminoids" means consistent potency'),
    createListItem('Avoid bright orange powders: Natural turmeric is dull yellow-orange, not neon'),
    
    // 副作用 #10: 延误治疗
    createBlockContent('10. The False Hope Problem: When Supplements Delay Real Treatment', 'h2'),
    
    createBlockContent('What Happens', 'h3'),
    createBlockContent('This isn\'t a direct physical side effect—but it might be the most dangerous consequence of all. Turmeric is not medicine. Relying on it to treat serious conditions can delay proper diagnosis and treatment, sometimes with fatal consequences.'),
    
    createBlockContent('The Reality Check', 'h3'),
    createBlockContent('Turmeric may help support certain health aspects, but it does NOT cure cancer, treat arthritis, eliminate infections, replace antibiotics or antivirals, heal autoimmune diseases, or reverse chronic conditions.'),
    
    createBlockContent('The Science', 'h3'),
    createBlockContent('According to the National Institutes of Health, Office of Dietary Supplements (2024), while curcumin shows promise in research settings, there is insufficient evidence to recommend it as a primary treatment for any disease. The FDA has not approved turmeric for treating or preventing any medical condition.'),
    
    createBlockContent('A sobering 2021 study in JAMA Oncology examined cancer patients who chose "alternative" treatments (including turmeric and other supplements) instead of conventional therapy. The results showed 2.5 times higher risk of death within 5 years and significantly delayed diagnosis of progression.'),
    
    createBlockContent('The Balanced Perspective', 'h3'),
    createBlockContent('Turmeric CAN be part of a wellness routine, but:'),
    createListItem('Use it as a complement to medical treatment, not a replacement'),
    createListItem('Get proper diagnosis for persistent symptoms'),
    createListItem('Work with healthcare providers who understand both conventional and complementary approaches'),
    createListItem('Be skeptical of miraculous cure claims'),
    
    createBlockWithMarks('Remember: Herbs support health. Medicine treats disease. Know the difference.', ['strong']),
    
    // 谁不应该服用
    createBlockContent('Who Should NEVER Take Turmeric Supplements?', 'h2'),
    
    createBlockContent('Absolute Contraindications (DO NOT TAKE)', 'h3'),
    createListItem('Are scheduled for surgery within 2-3 weeks (bleeding risk)'),
    createListItem('Take blood-thinning medications (warfarin, heparin, Plavix)'),
    createListItem('Have gallstones or bile duct problems'),
    createListItem('Have active liver disease (hepatitis, cirrhosis)'),
    createListItem('Are pregnant or breastfeeding (safety not established)'),
    createListItem('Have a history of kidney stones (turmeric is high in oxalates)'),
    createListItem('Have iron deficiency or anemia'),
    
    // 安全使用指南
    createBlockContent('Safe Turmeric Use: The Science-Backed Guidelines', 'h2'),
    
    createBlockContent('Dosage Guidelines', 'h3'),
    createBlockContent('For general wellness:'),
    createListItem('Food form: ½-1 teaspoon turmeric powder daily in meals'),
    createListItem('Supplement form: 500 mg standardized extract daily'),
    createListItem('Maximum safe dose: 1,500 mg/day (divided doses)'),
    
    createBlockContent('How to Take Turmeric Safely', 'h3'),
    createListItem('Always with food and fat (enhances absorption, reduces stomach upset)'),
    createListItem('Add black pepper (but not if you have reflux)'),
    createListItem('Start with half the recommended dose (test tolerance first)'),
    createListItem('Choose certified brands (USP, NSF, ConsumerLab)'),
    createListItem('Tell your doctor (especially if you take any medications)'),
    createListItem('Get regular blood work (if you\'re a long-term user)'),
    createListItem('Stop 2-3 weeks before surgery'),
    
    // 何时寻求医疗帮助
    createBlockContent('When to Seek Medical Help', 'h2'),
    
    createBlockContent('Stop taking turmeric immediately and contact a healthcare provider if you experience:'),
    createListItem('Yellowing of skin or eyes (jaundice)'),
    createListItem('Severe stomach pain or persistent nausea'),
    createListItem('Unexplained bleeding or excessive bruising'),
    createListItem('Dark-colored urine'),
    createListItem('Extreme fatigue or weakness'),
    createListItem('Allergic reaction symptoms (rash, swelling, difficulty breathing)'),
    createListItem('Any unusual symptoms that started after beginning turmeric'),
    
    // 总结
    createBlockContent('The Bottom Line: Balance is Everything', 'h2'),
    
    createBlockContent('Turmeric is a powerful herb with real benefits—and real risks.'),
    
    createBlockContent('The truth is:'),
    createListItem('It\'s safe and beneficial when used wisely'),
    createListItem('Food-form turmeric is almost always safe'),
    createListItem('Moderate supplementation (500-1,000 mg) is fine for most people'),
    createListItem('High doses (over 2,000 mg) carry significant risks'),
    createListItem('It\'s not a cure-all or medicine replacement'),
    
    createBlockContent('To use turmeric safely:'),
    createListItem('Start low, go slow — Begin with half the recommended dose'),
    createListItem('Choose quality — Only use third-party certified brands'),
    createListItem('Tell your doctor — Especially if you take any medications'),
    createListItem('Listen to your body — Stop if you experience side effects'),
    createListItem('Prefer food over supplements — When in doubt, cook with it'),
    createListItem('Cycle your use — Take breaks if using long-term'),
    createListItem('Don\'t delay medical care — Supplements support health, they don\'t treat disease'),
    
    createBlockWithMarks('Remember: Too much of a good thing can become a bad thing. Even golden turmeric has its limits.', ['strong']),
  ],
  
  // 元数据
  readTime: 10,
  featured: true,
  publishedAt: new Date('2025-01-19').toISOString(),
  status: 'published'
};

// 执行添加
async function addTurmericSideEffectsBlog() {
  try {
    console.log('🌿 开始添加"10 Serious Side Effects of Turmeric"博客文章到Sanity CMS...\n');
    
    // 步骤1：检查或创建Author
    console.log('步骤1: 检查作者...');
    let author = await client.fetch(`*[_type == "author" && slug.current == "herbscience-team"][0]`);
    
    if (!author) {
      console.log('创建默认作者...');
      author = await client.create({
        _type: 'author',
        name: 'HerbScience Team',
        slug: { _type: 'slug', current: 'herbscience-team' },
        bio: 'HerbScience editorial team specializing in evidence-based herbal medicine, safety research, and Traditional Chinese Medicine.',
        expertise: ['Herbal Medicine', 'Traditional Chinese Medicine', 'Safety Research', 'Pharmacology']
      });
      console.log('✅ 作者创建成功:', author.name);
    } else {
      console.log('✅ 作者已存在:', author.name);
    }
    
    // 步骤2：检查或创建Category
    console.log('\n步骤2: 检查分类...');
    let category = await client.fetch(`*[_type == "category" && slug.current == "herb-safety"][0]`);
    
    if (!category) {
      console.log('创建Herb Safety分类...');
      category = await client.create({
        _type: 'category',
        title: 'Herb Safety',
        slug: { _type: 'slug', current: 'herb-safety' },
        description: 'Essential safety information, side effects, and contraindications for herbal supplements'
      });
      console.log('✅ 分类创建成功:', category.title);
    } else {
      console.log('✅ 分类已存在:', category.title);
    }
    
    // 步骤3：创建Tags
    console.log('\n步骤3: 创建标签...');
    const tagNames = ['Turmeric', 'Safety', 'Side Effects', 'Curcumin', 'Medication Interactions'];
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
      ...turmericSideEffectsBlog,
      author: { _type: 'reference', _ref: author._id },
      category: { _type: 'reference', _ref: category._id },
      tags: tags
    };
    
    const result = await client.create(blogPostWithRefs);
    
    console.log('\n🎉 成功！"10 Serious Side Effects of Turmeric"博客文章已添加到Sanity CMS');
    console.log('\n📊 文章详情:');
    console.log(`   ID: ${result._id}`);
    console.log(`   标题: ${result.title}`);
    console.log(`   Slug: ${result.slug.current}`);
    console.log(`   状态: ${result.status}`);
    console.log(`   阅读时间: ${result.readTime}分钟`);
    console.log(`   Featured: ${result.featured}`);
    console.log(`\n✅ 现在你可以在Sanity Studio中编辑这篇文章:`);
    console.log(`   URL: https://herbscience.sanity.studio/desk/blogPost;${result._id}`);
    
    console.log('\n🎯 预期SEO效果:');
    console.log('   - 核心关键词KGR: 0.0226 (超级金矿!)');
    console.log('   - 月搜索量: 10,000次');
    console.log('   - 预计2-4周进入前20位');
    console.log('   - 预计3个月进入前10位');
    console.log('   - 预计月流量: 15,000-25,000次访问');
    
    console.log('\n📌 下一步:');
    console.log('   1. 访问你的网站检查文章显示');
    console.log('   2. 提交到Google Search Console');
    console.log('   3. 查看详细SEO分析: TURMERIC_SIDE_EFFECTS_SEO_ANALYSIS.md');
    console.log('   4. 创建配套文章: "Is Turmeric Bad for Your Liver?"');
    
  } catch (error) {
    console.error('❌ 添加失败:', error.message);
    if (error.response) {
      console.error('   错误详情:', error.response);
    }
    process.exit(1);
  }
}

// 运行脚本
addTurmericSideEffectsBlog();

