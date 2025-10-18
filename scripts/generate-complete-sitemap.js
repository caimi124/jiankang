#!/usr/bin/env node

/**
 * 生成完整的sitemap.xml，包含所有页面
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://herbscience.shop';
const TODAY = new Date().toISOString().split('T')[0];

// 所有草药页面
const HERB_PAGES = [
  'ashwagandha', 'astragalus', 'bacopa', 'black-pepper', 'cayenne', 
  'chamomile', 'cinnamon', 'clove', 'cordyceps', 'echinacea', 
  'elderberry', 'fenugreek', 'ginseng', 'ginger', 'gotu-kola', 
  'holy-basil', 'kava', 'lemon-balm', 'licorice-root', 'lions-mane', 
  'maca-root', 'milk-thistle', 'nettle', 'onion', 'passionflower', 
  'peppermint', 'pumpkin-seeds', 'reishi', 'rhodiola', 'saw-palmetto', 
  'st-johns-wort', 'turmeric', 'valerian-root'
];

// 核心页面
const CORE_PAGES = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/zh', priority: 0.9, changefreq: 'weekly' },
  { url: '/constitution-test', priority: 0.9, changefreq: 'weekly' },
  { url: '/herb-finder', priority: 0.9, changefreq: 'weekly' },
  { url: '/blog', priority: 0.8, changefreq: 'weekly' },
  { url: '/about', priority: 0.7, changefreq: 'monthly' },
  { url: '/privacy', priority: 0.6, changefreq: 'monthly' }
];

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- 主页 - 最高优先级 -->
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${DOMAIN}/zh"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/"/>
  </url>
  
  <!-- 中文页面 -->
  <url>
    <loc>${DOMAIN}/zh</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${DOMAIN}/zh"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/"/>
  </url>
  
  <!-- 核心功能页面 -->
  <url>
    <loc>${DOMAIN}/constitution-test</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${DOMAIN}/herb-finder</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${DOMAIN}/about</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${DOMAIN}/privacy</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- 草药详情页面（${HERB_PAGES.length} 个） -->\n`;

  // 添加所有草药页面
  HERB_PAGES.forEach(herb => {
    xml += `  <url>
    <loc>${DOMAIN}/herbs/${herb}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
`;
  });

  xml += `</urlset>`;

  return xml;
}

// 生成并保存sitemap
const sitemap = generateSitemap();
const sitemapPath = path.join(__dirname, '../sitemap.xml');

fs.writeFileSync(sitemapPath, sitemap, 'utf8');

console.log('✅ Sitemap已生成！');
console.log(`📊 包含页面数: ${CORE_PAGES.length + HERB_PAGES.length + 2} 个`);
console.log(`   - 核心页面: ${CORE_PAGES.length} 个`);
console.log(`   - 草药页面: ${HERB_PAGES.length} 个`);
console.log(`   - 多语言页面: 2 个`);
console.log(`\n📍 文件路径: ${sitemapPath}`);
console.log(`\n🔗 下一步:`);
console.log(`   1. 提交到 Google Search Console`);
console.log(`   2. 请求重新抓取 constitution-test 页面`);
console.log(`   3. 等待1-3天让Google重新索引`);

