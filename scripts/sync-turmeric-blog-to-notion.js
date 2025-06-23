// 同步姜黄博客文章到Notion数据库
// 运行命令: node scripts/sync-turmeric-blog-to-notion.js

const { simpleNotionBlogSync } = require('../lib/notion-blog-sync-simple.js')

// 辅助函数：从HTML内容提取纯文本
function extractTextFromHTML(html) {
  return html
    .replace(/<[^>]*>/g, '') // 移除HTML标签
    .replace(/\s+/g, ' ') // 标准化空格
    .trim()
}

// 辅助函数：生成blog post对象
function createBlogPostFromContent(title, htmlContent, metadata) {
  const textContent = extractTextFromHTML(htmlContent)
  const excerpt = textContent.substring(0, 200) + '...'

  return {
    title,
    content: textContent,
    excerpt,
    author: metadata.author,
    category: metadata.category,
    tags: metadata.tags,
    published_date: metadata.publishDate,
    slug: metadata.slug,
    seo_keywords: metadata.seoKeywords,
    read_time: metadata.readTime,
    status: 'published'
  }
}

async function syncTurmericBlogPost() {
  console.log('🌿 开始同步姜黄博客文章到Notion...')

  // 姜黄文章的内容和元数据
  const turmericContent = `
    <h2>What Is Turmeric — Explained Simply</h2>
    <p>Turmeric is a bright yellow root used for thousands of years in cooking and traditional medicine, especially in Asia. Its main active compound, <strong>curcumin</strong>, is known for powerful anti-inflammatory and antioxidant effects.</p>
    <p>In simple terms, turmeric helps reduce "inflammation fires" in your body—those hidden causes behind bloating, joint pain, and sluggish digestion.</p>

    <h2>How Turmeric Can Help You Feel Better</h2>
    <ul>
      <li><strong>Soothes bloating and digestive discomfort</strong> by calming irritated gut tissues.</li>
      <li><strong>Reduces joint pain and stiffness</strong>, helping you move more comfortably.</li>
      <li><strong>Supports your immune system</strong> and promotes overall wellness.</li>
    </ul>
    <p>Many people report feeling lighter, less achy, and more energetic after adding turmeric to their daily routine.</p>

    <h2>How to Start Using Turmeric Right Now</h2>
    <h3>1. Add Turmeric Powder to Your Meals</h3>
    <p>Start by mixing <strong>½ to 1 teaspoon</strong> of turmeric powder into your soups, scrambled eggs, rice, or smoothies daily. It adds a mild earthy flavor and a golden color.</p>

    <h3>2. Make Turmeric Tea</h3>
    <p>Boil 1 teaspoon of turmeric powder with a pinch of black pepper (this helps your body absorb turmeric better) in water. Add lemon or honey for taste. Drink 1-2 cups a day for gut comfort.</p>

    <h3>3. Take Turmeric Capsules</h3>
    <p>Look for supplements with <strong>standardized curcumin extract</strong> and black pepper (piperine). Recommended dosage is <strong>500-1000 mg daily</strong>, split into 1-2 doses. Capsules are convenient and ensure consistent intake.</p>

    <h2>Why Black Pepper and Healthy Fats Matter</h2>
    <p>Curcumin on its own isn't absorbed well by the body. Black pepper contains <strong>piperine</strong>, which boosts curcumin absorption by up to 20 times! Also, consuming turmeric with healthy fats like olive oil or avocado helps your body take in the nutrients better.</p>

    <h2>What to Expect: Real Effects You Can Feel</h2>
    <ul>
      <li><strong>Within a few days:</strong> Reduced bloating and smoother digestion.</li>
      <li><strong>2-3 weeks:</strong> Noticeable decrease in joint stiffness and overall inflammation.</li>
      <li><strong>1 month and beyond:</strong> Improved energy levels and better gut comfort when taken consistently.</li>
    </ul>
    <p>Remember, turmeric works best when taken regularly over time.</p>

    <h2>Who Should Use Turmeric?</h2>
    <ul>
      <li>People experiencing <strong>bloating, gas, or mild digestive upset</strong>.</li>
      <li>Those with <strong>joint discomfort or early-stage arthritis</strong> looking for natural relief.</li>
      <li>Anyone wanting to <strong>reduce chronic inflammation</strong> and support their immune system.</li>
    </ul>

    <h2>When to Be Careful</h2>
    <ul>
      <li>If you have <strong>gallstones or bile duct issues</strong>, talk to your doctor first.</li>
      <li>If you're on <strong>blood-thinning medications</strong>, consult your healthcare provider.</li>
      <li>Pregnant or breastfeeding women should seek medical advice before starting turmeric supplements.</li>
    </ul>

    <h2>Real Stories From Real Users</h2>
    <blockquote>"I started making turmeric tea every morning, and within a week, my bloating disappeared. It's now my daily ritual!" — Emily, 29, Seattle</blockquote>
    <blockquote>"Turmeric capsules helped ease my knee pain so I could get back to jogging pain-free." — John, 48, Austin</blockquote>

    <h2>Tips for Getting the Most From Turmeric</h2>
    <ul>
      <li>Always <strong>combine turmeric with black pepper or healthy fats</strong> for best absorption.</li>
      <li>Start with a small amount to avoid stomach upset, then gradually increase.</li>
      <li>Stick with it daily—turmeric's benefits build up over time.</li>
      <li>Use fresh or high-quality organic turmeric powder when possible.</li>
    </ul>

    <h2>Frequently Asked Questions (FAQs)</h2>
    <h4>Q: Can turmeric replace my medications?</h4>
    <p>A: No, turmeric is a supplement to support your health, not a substitute for prescribed treatments.</p>
    
    <h4>Q: How long does it take to work?</h4>
    <p>A: Many notice changes within a couple of weeks, but consistent use over months is ideal.</p>
    
    <h4>Q: Are there any side effects?</h4>
    <p>A: Turmeric is generally safe; some people may experience mild stomach discomfort if taken in large doses.</p>

    <h2>Final Thoughts: A Simple Step Toward Better Health</h2>
    <p>Turmeric is an affordable, natural, and easy-to-use herb that can calm your gut, reduce inflammation, and boost your energy. Adding it to your diet or supplement routine might just be the small change that makes a big difference.</p>
    <p><strong>Try turmeric today—your body will thank you!</strong></p>
  `

  // 创建博客文章对象
  const blogPost = createBlogPostFromContent(
    'Turmeric Made Simple: How to Use It Today for Real Gut Relief and Pain Reduction',
    turmericContent,
    {
      author: 'HerbScience Team',
      category: 'lifestyle',
      tags: ['turmeric benefits', 'gut health', 'natural pain relief', 'inflammation', 'digestive health'],
      slug: 'turmeric-gut-relief-guide',
      publishDate: '2025-01-19',
      readTime: '8 min read',
      seoKeywords: [
        'turmeric benefits',
        'turmeric for gut health', 
        'turmeric dosage',
        'turmeric for inflammation',
        'curcumin supplement',
        'natural anti-inflammatory'
      ]
    }
  )

  try {
    // 测试连接
    console.log('🔗 测试Notion连接...')
    const testResult = await simpleNotionBlogSync.testConnection()
    
    if (!testResult.success) {
      console.log('❌ Notion连接失败:', testResult.error)
      return
    }
    
    console.log(`✅ 连接成功! 数据库: ${testResult.databaseTitle}`)
    
    // 同步到Notion
    const result = await simpleNotionBlogSync.syncBlogPost(blogPost)
    
    if (result.success) {
      console.log('✅ 姜黄博客文章同步成功!')
      console.log(`📝 文章标题: ${blogPost.title}`)
      console.log(`🔗 Slug: ${blogPost.slug}`)
      console.log(`📅 发布日期: ${blogPost.published_date}`)
      console.log(`🏷️ 标签: ${blogPost.tags.join(', ')}`)
      console.log(`🔍 SEO关键词: ${blogPost.seo_keywords.join(', ')}`)
      console.log(`📄 Notion页面ID: ${result.pageId}`)
      console.log(`🌐 Notion页面URL: ${result.pageUrl}`)
    } else {
      console.log('❌ 同步失败:', result.error)
    }

  } catch (error) {
    console.error('💥 同步过程中出现错误:', error)
  }
}

// 实时监控功能 - 每5分钟检查一次更新
function startRealTimeSync() {
  console.log('🔄 启动实时同步监控...')
  
  // 立即执行一次
  syncTurmericBlogPost()
  
  // 每5分钟检查一次
  setInterval(async () => {
    console.log('⏰ 执行定时同步检查...')
    await syncTurmericBlogPost()
  }, 5 * 60 * 1000) // 5分钟
}

// 如果直接运行此脚本
if (require.main === module) {
  console.log('🚀 启动姜黄博客文章Notion同步服务')
  
  // 选择运行模式
  const args = process.argv.slice(2)
  if (args.includes('--watch') || args.includes('-w')) {
    startRealTimeSync()
  } else {
    syncTurmericBlogPost()
  }
}

module.exports = {
  syncTurmericBlogPost,
  startRealTimeSync
} 