// 添加缺失的博客文章 - "Why Some Herbs Work for You—and Others Don't"
// 这个脚本会创建文章并添加到系统中

const fs = require('fs');
const path = require('path');

// 文章内容
const articleData = {
  title: "Why Some Herbs Work for You—and Others Don't",
  slug: "why-some-herbs-work-for-you-and-others-dont",
  excerpt: "Discover the fascinating science behind individual herb effectiveness. Learn why the same herb can work wonders for some people but not others, and how to find what works best for your unique body chemistry.",
  author: "Dr. Sarah Chen",
  category: "science",
  readTime: 9,
  publishedAt: "2024-01-15",
  tags: [
    "personalized medicine",
    "herb effectiveness",
    "genetic factors",
    "individual response",
    "herbal science"
  ],
  featured: true,
  status: "published",
  content: `
<h2>The Personal Nature of Herbal Medicine</h2>

<p>Have you ever wondered why your friend swears by ashwagandha for stress relief, but when you try it, you feel no different? Or why turmeric seems to work miracles for some people's joint pain, while others see no improvement at all?</p>

<p>The answer lies in the fascinating world of personalized herbal medicine—a field that's revolutionizing how we understand plant-based healing.</p>

<h2>Your Unique Biological Blueprint</h2>

<p>Every person's body is like a unique biochemical fingerprint. Several factors determine how your body responds to herbs:</p>

<h3>1. Genetic Variations</h3>
<p>Your genes control how your body processes compounds. For example, some people have genetic variants that make them "fast metabolizers" of certain compounds, while others are "slow metabolizers." This affects how quickly herbs are absorbed, used, and eliminated from your system.</p>

<h3>2. Gut Microbiome</h3>
<p>The trillions of bacteria in your digestive system play a crucial role in breaking down herbal compounds. Different people have vastly different gut bacteria compositions, which can dramatically affect how well they absorb and utilize herbal nutrients.</p>

<h3>3. Current Health Status</h3>
<p>Your baseline health, existing conditions, inflammation levels, and nutritional status all influence how your body responds to herbs. Someone with chronic inflammation may respond differently to anti-inflammatory herbs than someone who's relatively healthy.</p>

<h2>Why Standard Dosages Don't Always Work</h2>

<p>Most herbal recommendations give "one-size-fits-all" dosages, but this approach ignores individual biology:</p>

<ul>
<li><strong>Body weight and composition</strong> affect how much active compound reaches your cells</li>
<li><strong>Age</strong> influences metabolism and absorption rates</li>
<li><strong>Sex hormones</strong> can modify how certain herbs work</li>
<li><strong>Medications</strong> may interact with or compete with herbal compounds</li>
<li><strong>Timing of intake</strong> (with food, empty stomach, time of day) matters greatly</li>
</ul>

<h2>The Science of Individual Response</h2>

<p>Recent research in nutrigenomics (how genes affect response to nutrients) has revealed fascinating insights:</p>

<h3>Example 1: Turmeric and Curcumin</h3>
<p>Some people have genetic variants that allow them to absorb curcumin (turmeric's active compound) very efficiently. Others have variants that make absorption poor, requiring higher doses or specific formulations with piperine (black pepper) to see benefits.</p>

<h3>Example 2: Adaptogenic Herbs</h3>
<p>Herbs like ashwagandha and rhodiola work on the HPA (hypothalamic-pituitary-adrenal) axis. People with different cortisol patterns, stress hormone genetics, and adrenal function will respond very differently to these adaptogens.</p>

<h2>How to Find What Works for YOU</h2>

<p>Here's a systematic approach to discovering your optimal herbs:</p>

<h3>Step 1: Start with a Health Assessment</h3>
<ul>
<li>Identify your specific health goals</li>
<li>Note current symptoms and their patterns</li>
<li>Consider any medications or existing supplements</li>
<li>Assess your stress levels, sleep quality, and energy patterns</li>
</ul>

<h3>Step 2: Choose Quality, Standardized Herbs</h3>
<ul>
<li>Look for standardized extracts with known active compound percentages</li>
<li>Choose reputable brands with third-party testing</li>
<li>Consider bioavailability-enhanced formulations</li>
</ul>

<h3>Step 3: Test Systematically</h3>
<ul>
<li>Try one herb at a time for at least 2-4 weeks</li>
<li>Start with recommended dosages, then adjust based on response</li>
<li>Keep a daily symptom journal</li>
<li>Pay attention to timing (morning vs. evening, with vs. without food)</li>
</ul>

<h3>Step 4: Track Your Response</h3>
<ul>
<li>Note both positive effects and any side effects</li>
<li>Track energy levels, mood, sleep quality, and target symptoms</li>
<li>Be patient—some herbs take weeks to show full effects</li>
<li>Consider lab tests for measurable biomarkers when possible</li>
</ul>

<h2>Red Flags: When Herbs Aren't Working</h2>

<p>If you've tried multiple herbs without success, consider these factors:</p>

<ul>
<li><strong>Poor quality products</strong> with minimal active compounds</li>
<li><strong>Underlying health issues</strong> that need medical attention first</li>
<li><strong>Medication interactions</strong> that block herb absorption</li>
<li><strong>Unrealistic expectations</strong> or insufficient trial periods</li>
<li><strong>Wrong herb for your specific condition</strong></li>
</ul>

<h2>The Future of Personalized Herbal Medicine</h2>

<p>Emerging technologies are making personalized herb selection more precise:</p>

<ul>
<li><strong>Genetic testing</strong> to identify metabolism patterns</li>
<li><strong>Microbiome analysis</strong> to optimize absorption</li>
<li><strong>Biomarker monitoring</strong> to track real-time responses</li>
<li><strong>AI-powered matching</strong> to predict herb compatibility</li>
</ul>

<h2>Your Next Steps</h2>

<p>Understanding why herbs work differently for different people empowers you to make better choices:</p>

<ol>
<li><strong>Embrace experimentation</strong> with a systematic approach</li>
<li><strong>Focus on quality</strong> over quantity when choosing herbs</li>
<li><strong>Track your responses</strong> carefully and consistently</li>
<li><strong>Be patient</strong> with the discovery process</li>
<li><strong>Consult professionals</strong> when needed for complex health issues</li>
</ol>

<p>Remember: The herb that works best for you might be completely different from what works for your friends or family. That's not a failure—it's biology. By understanding your unique response patterns, you can build a personalized herbal toolkit that truly supports your health and well-being.</p>

<h3>Ready to Discover Your Perfect Herbs?</h3>

<p>Take our <a href="/constitution-test">TCM Constitution Test</a> to understand your unique body type and get personalized herb recommendations based on your individual constitution and health patterns.</p>
  `
};

console.log('=== 添加缺失博客文章 ===\n');
console.log(`文章标题: ${articleData.title}`);
console.log(`Slug: ${articleData.slug}`);
console.log(`分类: ${articleData.category}`);
console.log(`状态: ${articleData.status}`);

// 方案1: 添加到BlogClient.tsx的静态文章数组
function addToStaticArticles() {
  const blogClientPath = path.join(__dirname, 'app', 'blog', 'BlogClient.tsx');

  try {
    let content = fs.readFileSync(blogClientPath, 'utf8');

    // 创建新的文章对象
    const newArticle = `  {
      id: ${Date.now()},
      title: "${articleData.title}",
      excerpt: "${articleData.excerpt}",
      category: "${articleData.category}",
      author: "${articleData.author}",
      publishedAt: "${articleData.publishedAt}",
      readTime: ${articleData.readTime},
      featured_image: null,
      slug: { current: "${articleData.slug}" },
      tags: ${JSON.stringify(articleData.tags)}
    },`;

    // 在staticArticles数组的开头添加新文章
    const insertPoint = content.indexOf('const staticArticles = [') + 'const staticArticles = ['.length;
    const beforeInsert = content.substring(0, insertPoint);
    const afterInsert = content.substring(insertPoint);

    const updatedContent = beforeInsert + '\n' + newArticle + afterInsert;

    // 备份原文件
    fs.writeFileSync(blogClientPath + '.backup', content);

    // 写入更新的内容
    fs.writeFileSync(blogClientPath, updatedContent);

    console.log('✅ 已添加到BlogClient.tsx的静态文章数组');
    return true;
  } catch (error) {
    console.error('❌ 添加到静态文章数组失败:', error.message);
    return false;
  }
}

// 方案2: 添加到动态路由的本地数据
function addToLocalBlogPost() {
  const blogPostPath = path.join(__dirname, 'app', 'blog', '[slug]', 'page.tsx');

  try {
    let content = fs.readFileSync(blogPostPath, 'utf8');

    // 创建新的本地文章对象
    const newLocalPost = `    '${articleData.slug}': {
      title: '${articleData.title}',
      excerpt: '${articleData.excerpt}',
      author: '${articleData.author}',
      date: '${articleData.publishedAt}',
      read_time: '${articleData.readTime}',
      category: '${articleData.category}',
      tags: ${JSON.stringify(articleData.tags)},
      content: \`${articleData.content}\`,
      description: '${articleData.excerpt}'
    },`;

    // 找到localPosts对象并添加新文章
    const localPostsStart = content.indexOf('const localPosts = {');
    const localPostsEnd = content.indexOf('}', localPostsStart);

    if (localPostsStart !== -1 && localPostsEnd !== -1) {
      const beforePosts = content.substring(0, localPostsEnd);
      const afterPosts = content.substring(localPostsEnd);

      const updatedContent = beforePosts + newLocalPost + '\n' + afterPosts;

      // 备份原文件
      fs.writeFileSync(blogPostPath + '.backup', content);

      // 写入更新的内容
      fs.writeFileSync(blogPostPath, updatedContent);

      console.log('✅ 已添加到动态路由的本地数据');
      return true;
    }
  } catch (error) {
    console.error('❌ 添加到本地数据失败:', error.message);
    return false;
  }

  return false;
}

// 方案3: 更新generateStaticParams
function updateStaticParams() {
  const blogPostPath = path.join(__dirname, 'app', 'blog', '[slug]', 'page.tsx');

  try {
    let content = fs.readFileSync(blogPostPath, 'utf8');

    // 添加新slug到generateStaticParams
    const newSlug = `    { slug: '${articleData.slug}' },`;

    const paramsStart = content.indexOf('return [');
    const paramsEnd = content.indexOf(']', paramsStart);

    if (paramsStart !== -1 && paramsEnd !== -1) {
      const beforeParams = content.substring(0, paramsEnd);
      const afterParams = content.substring(paramsEnd);

      const updatedContent = beforeParams + newSlug + '\n' + afterParams;

      fs.writeFileSync(blogPostPath, updatedContent);

      console.log('✅ 已更新generateStaticParams');
      return true;
    }
  } catch (error) {
    console.error('❌ 更新generateStaticParams失败:', error.message);
    return false;
  }

  return false;
}

// 执行所有方案
console.log('\n=== 执行修复方案 ===');

const staticArticlesSuccess = addToStaticArticles();
const localDataSuccess = addToLocalBlogPost();
const staticParamsSuccess = updateStaticParams();

console.log('\n=== 执行结果 ===');
console.log(`静态文章数组: ${staticArticlesSuccess ? '✅' : '❌'}`);
console.log(`本地数据: ${localDataSuccess ? '✅' : '❌'}`);
console.log(`静态参数: ${staticParamsSuccess ? '✅' : '❌'}`);

if (staticArticlesSuccess && localDataSuccess && staticParamsSuccess) {
  console.log('\n🎉 博客文章添加成功！');
  console.log(`\n文章将在以下位置可用:`);
  console.log(`- 博客列表: https://herbscience.shop/blog`);
  console.log(`- 文章详情: https://herbscience.shop/blog/${articleData.slug}`);
  console.log(`\n请重新部署网站以查看更改。`);
} else {
  console.log('\n⚠️ 部分操作失败，请检查错误信息并手动修复。');
}

console.log('\n=== 备用方案 ===');
console.log('如果自动添加失败，你可以手动:');
console.log('1. 登录Sanity Studio创建文章');
console.log('2. 或将文章数据手动添加到代码中');
console.log('3. 重新部署网站');