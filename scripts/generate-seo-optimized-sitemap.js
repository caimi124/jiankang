/**
 * 生成SEO优化的Sitemap
 * 支持多语言、优先级设置、自动分类
 */

const fs = require('fs');
const path = require('path');

// 网站基础URL
const BASE_URL = 'https://herbscience.shop';

// 页面类型和优先级配置
const PAGE_TYPES = {
  HOME: { priority: 1.0, changefreq: 'daily' },
  CONSTITUTION_TEST: { priority: 0.9, changefreq: 'weekly' },
  HERB_FINDER: { priority: 0.9, changefreq: 'weekly' },
  BLOG_HOME: { priority: 0.8, changefreq: 'daily' },
  HERB_DETAIL: { priority: 0.8, changefreq: 'monthly' },
  BLOG_POST: { priority: 0.7, changefreq: 'monthly' },
  SYMPTOM_PAGE: { priority: 0.7, changefreq: 'monthly' },
  ABOUT: { priority: 0.6, changefreq: 'yearly' }
};

// 核心页面
const CORE_PAGES = [
  { url: '/', ...PAGE_TYPES.HOME, multilang: true },
  { url: '/constitution-test', ...PAGE_TYPES.CONSTITUTION_TEST, multilang: true },
  { url: '/herb-finder', ...PAGE_TYPES.HERB_FINDER, multilang: true },
  { url: '/blog', ...PAGE_TYPES.BLOG_HOME, multilang: true },
  { url: '/about', ...PAGE_TYPES.ABOUT, multilang: true }
];

// 草药页面（从数据库或文件系统读取）
const HERB_PAGES = [
  'ashwagandha', 'turmeric', 'ginseng', 'valerian-root', 'chamomile',
  'elderberry', 'echinacea', 'st-johns-wort', 'rhodiola', 'holy-basil',
  'maca-root', 'milk-thistle', 'saw-palmetto', 'passionflower', 'lemon-balm',
  'licorice-root', 'astragalus', 'cordyceps', 'reishi', 'lions-mane',
  'bacopa', 'gotu-kola', 'kava', 'nettle', 'peppermint',
  'fenugreek', 'cinnamon', 'clove', 'black-pepper', 'cayenne',
  'ginger', 'garlic', 'onion', 'pumpkin-seeds', 'turmeric'
];

// 症状页面
const SYMPTOM_PAGES = [
  'insomnia', 'anxiety', 'depression', 'chronic-pain', 'high-blood-pressure',
  'diabetes', 'arthritis', 'adhd', 'menopause', 'migraine',
  'ibs', 'eczema', 'acne', 'hair-loss', 'weight-loss'
];

// 博客文章（示例 - 实际应从CMS获取）
const BLOG_POSTS = [
  'best-herbs-for-sleep',
  'stress-relief-herbs',
  'immune-boosting-herbs',
  'natural-energy-boosters',
  'herbs-for-anxiety'
];

/**
 * 生成URL条目
 */
function generateUrlEntry(url, priority, changefreq, lastmod, multilang = false) {
  const fullUrl = `${BASE_URL}${url}`;
  const currentDate = lastmod || new Date().toISOString().split('T')[0];
  
  let entry = `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;
  
  // 多语言支持
  if (multilang) {
    entry += `
    <xhtml:link rel="alternate" hreflang="en" href="${fullUrl}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${BASE_URL}/zh${url}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${fullUrl}"/>`;
  }
  
  entry += `
  </url>`;
  
  return entry;
}

/**
 * 生成主sitemap
 */
function generateMainSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- ========================================
       核心页面 (Priority: 0.9-1.0)
       ======================================== -->
`;

  // 添加核心页面
  CORE_PAGES.forEach(page => {
    sitemap += generateUrlEntry(
      page.url,
      page.priority,
      page.changefreq,
      null,
      page.multilang
    );
  });

  sitemap += `
  
  <!-- ========================================
       草药详情页 (Priority: 0.8)
       ======================================== -->
`;

  // 添加草药页面
  HERB_PAGES.forEach(herbSlug => {
    sitemap += generateUrlEntry(
      `/herbs/${herbSlug}`,
      PAGE_TYPES.HERB_DETAIL.priority,
      PAGE_TYPES.HERB_DETAIL.changefreq
    );
  });

  sitemap += `
  
  <!-- ========================================
       症状对应页 (Priority: 0.7)
       ======================================== -->
`;

  // 添加症状页面
  SYMPTOM_PAGES.forEach(symptomSlug => {
    sitemap += generateUrlEntry(
      `/symptoms/${symptomSlug}`,
      PAGE_TYPES.SYMPTOM_PAGE.priority,
      PAGE_TYPES.SYMPTOM_PAGE.changefreq
    );
  });

  sitemap += `
  
  <!-- ========================================
       博客文章 (Priority: 0.7)
       ======================================== -->
`;

  // 添加博客文章
  BLOG_POSTS.forEach(postSlug => {
    sitemap += generateUrlEntry(
      `/blog/${postSlug}`,
      PAGE_TYPES.BLOG_POST.priority,
      PAGE_TYPES.BLOG_POST.changefreq
    );
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

/**
 * 生成sitemap索引文件
 */
function generateSitemapIndex() {
  const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-main.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-herbs.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-symptoms.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

  return index;
}

/**
 * 生成草药专用sitemap
 */
function generateHerbsSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  HERB_PAGES.forEach(herbSlug => {
    sitemap += generateUrlEntry(
      `/herbs/${herbSlug}`,
      PAGE_TYPES.HERB_DETAIL.priority,
      PAGE_TYPES.HERB_DETAIL.changefreq
    );
  });

  sitemap += `</urlset>`;
  return sitemap;
}

/**
 * 生成博客专用sitemap
 */
function generateBlogSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  BLOG_POSTS.forEach(postSlug => {
    sitemap += generateUrlEntry(
      `/blog/${postSlug}`,
      PAGE_TYPES.BLOG_POST.priority,
      PAGE_TYPES.BLOG_POST.changefreq
    );
  });

  sitemap += `</urlset>`;
  return sitemap;
}

/**
 * 生成症状专用sitemap
 */
function generateSymptomsSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  SYMPTOM_PAGES.forEach(symptomSlug => {
    sitemap += generateUrlEntry(
      `/symptoms/${symptomSlug}`,
      PAGE_TYPES.SYMPTOM_PAGE.priority,
      PAGE_TYPES.SYMPTOM_PAGE.changefreq
    );
  });

  sitemap += `</urlset>`;
  return sitemap;
}

/**
 * 保存sitemap文件
 */
function saveSitemaps() {
  const publicDir = path.join(__dirname, '../public');
  
  console.log('🗺️  开始生成SEO优化的Sitemap...\n');

  // 生成并保存主sitemap
  const mainSitemap = generateMainSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), mainSitemap, 'utf8');
  console.log('✅ 主Sitemap已生成: sitemap.xml');
  console.log(`   包含 ${CORE_PAGES.length + HERB_PAGES.length + SYMPTOM_PAGES.length + BLOG_POSTS.length} 个URL`);

  // 生成并保存sitemap索引
  const sitemapIndex = generateSitemapIndex();
  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex, 'utf8');
  console.log('✅ Sitemap索引已生成: sitemap-index.xml');

  // 生成并保存分类sitemap
  const herbsSitemap = generateHerbsSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-herbs.xml'), herbsSitemap, 'utf8');
  console.log(`✅ 草药Sitemap已生成: sitemap-herbs.xml (${HERB_PAGES.length} 个草药)`);

  const blogSitemap = generateBlogSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-blog.xml'), blogSitemap, 'utf8');
  console.log(`✅ 博客Sitemap已生成: sitemap-blog.xml (${BLOG_POSTS.length} 篇文章)`);

  const symptomsSitemap = generateSymptomsSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-symptoms.xml'), symptomsSitemap, 'utf8');
  console.log(`✅ 症状Sitemap已生成: sitemap-symptoms.xml (${SYMPTOM_PAGES.length} 个症状页)`);

  console.log('\n🎉 所有Sitemap生成完成！');
  console.log('\n📝 下一步操作：');
  console.log('1. 访问 Google Search Console');
  console.log('2. 提交主sitemap: https://herbscience.shop/sitemap.xml');
  console.log('3. 或提交索引文件: https://herbscience.shop/sitemap-index.xml');
  console.log('4. 监控索引状态和爬取错误');
}

// 执行生成
if (require.main === module) {
  saveSitemaps();
}

module.exports = {
  generateMainSitemap,
  generateSitemapIndex,
  generateHerbsSitemap,
  generateBlogSitemap,
  generateSymptomsSitemap
};

