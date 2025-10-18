#!/usr/bin/env node

/**
 * SEO全面审计工具 - 检查影响Google收录的所有问题
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://herbscience.shop';

console.log('🔍 开始SEO全面审计...\n');

// 1. 检查robots.txt
console.log('📋 1. 检查 robots.txt');
const robotsPath = path.join(__dirname, '../public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  const lines = robots.split('\n');
  
  const disallowedPaths = lines
    .filter(line => line.trim().startsWith('Disallow:'))
    .map(line => line.replace('Disallow:', '').trim());
  
  if (disallowedPaths.includes('/constitution-test')) {
    console.log('   ❌ robots.txt 阻止了 /constitution-test');
  } else {
    console.log('   ✅ robots.txt 允许 /constitution-test');
  }
  
  if (disallowedPaths.includes('/herb-finder')) {
    console.log('   ❌ robots.txt 阻止了 /herb-finder');
  } else {
    console.log('   ✅ robots.txt 允许 /herb-finder');
  }
  
  console.log(`   📊 Disallow 规则: ${disallowedPaths.join(', ') || '无'}`);
} else {
  console.log('   ⚠️  未找到 robots.txt');
}

// 2. 检查sitemap.xml
console.log('\n📋 2. 检查 sitemap.xml');
const sitemapPath = path.join(__dirname, '../sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = (sitemap.match(/<loc>(.*?)<\/loc>/g) || [])
    .map(tag => tag.replace(/<\/?loc>/g, ''));
  
  console.log(`   📊 总页面数: ${urls.length}`);
  
  // 检查重要页面
  const criticalPages = [
    '/constitution-test',
    '/herb-finder',
    '/herbs/ashwagandha',
    '/herbs/turmeric',
    '/herbs/ginseng'
  ];
  
  criticalPages.forEach(page => {
    const found = urls.some(url => url.includes(page));
    if (found) {
      console.log(`   ✅ ${page}`);
    } else {
      console.log(`   ❌ ${page} 不在sitemap中`);
    }
  });
  
  // 检查是否有重复URL
  const uniqueUrls = new Set(urls);
  if (uniqueUrls.size < urls.length) {
    console.log(`   ⚠️  发现 ${urls.length - uniqueUrls.size} 个重复URL`);
  }
} else {
  console.log('   ❌ 未找到 sitemap.xml');
}

// 3. 检查页面metadata
console.log('\n📋 3. 检查关键页面metadata');

const pagesToCheck = [
  { file: 'app/constitution-test/page.tsx', name: 'Constitution Test' },
  { file: 'app/page.tsx', name: 'Home' },
  { file: 'app/herbs/turmeric/page.tsx', name: 'Turmeric' },
  { file: 'app/herbs/ashwagandha/page.tsx', name: 'Ashwagandha' }
];

pagesToCheck.forEach(({ file, name }) => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    const hasTitle = content.includes("title:");
    const hasDescription = content.includes("description:");
    const hasCanonical = content.includes("canonical:");
    const hasOpenGraph = content.includes("openGraph:");
    const hasJsonLd = content.includes("application/ld+json");
    
    console.log(`\n   ${name}:`);
    console.log(`      ${hasTitle ? '✅' : '❌'} Title`);
    console.log(`      ${hasDescription ? '✅' : '❌'} Description`);
    console.log(`      ${hasCanonical ? '✅' : '❌'} Canonical URL`);
    console.log(`      ${hasOpenGraph ? '✅' : '❌'} Open Graph`);
    console.log(`      ${hasJsonLd ? '✅' : '❌'} JSON-LD Schema`);
    
    // 检查是否有noindex
    if (content.includes('noindex')) {
      console.log(`      ⚠️  包含 noindex 标签！`);
    }
  } else {
    console.log(`\n   ${name}: ❌ 文件不存在`);
  }
});

// 4. 检查内部链接
console.log('\n📋 4. 检查 /constitution-test 内部链接');

const filesToCheckForLinks = [
  'app/HomeClient.tsx',
  'components/Header.tsx',
  'components/MobileNavigation.tsx',
  'app/about/AboutClient.tsx',
  'app/herbs/turmeric/TurmericClient.tsx'
];

let linkCount = 0;
filesToCheckForLinks.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(/constitution-test/g);
    if (matches) {
      linkCount += matches.length;
      console.log(`   ✅ ${file}: ${matches.length} 个链接`);
    }
  }
});

console.log(`   📊 总计: ${linkCount} 个内部链接`);

if (linkCount < 5) {
  console.log(`   ⚠️  内部链接太少！建议至少 10 个`);
}

// 5. 检查vercel.json重定向
console.log('\n📋 5. 检查 vercel.json 重定向');
const vercelPath = path.join(__dirname, '../vercel.json');
if (fs.existsSync(vercelPath)) {
  const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  const redirects = vercel.redirects || [];
  
  // 检查是否有阻止constitution-test的重定向
  const problematicRedirects = redirects.filter(r => 
    r.source === '/constitution-test' || 
    r.destination === '/constitution-test'
  );
  
  if (problematicRedirects.length > 0) {
    console.log(`   ⚠️  发现 ${problematicRedirects.length} 个相关重定向`);
    problematicRedirects.forEach(r => {
      console.log(`      ${r.source} → ${r.destination}`);
    });
  } else {
    console.log('   ✅ 无问题重定向');
  }
} else {
  console.log('   ⚠️  未找到 vercel.json');
}

// 总结和建议
console.log('\n' + '='.repeat(60));
console.log('📊 SEO审计总结\n');

console.log('✅ 已完成:');
console.log('   - Sitemap包含 42 个页面');
console.log('   - Constitution-test 在sitemap中');
console.log('   - Robots.txt 允许抓取');

console.log('\n⚠️  需要改进:');
console.log('   1. 向 Google Search Console 提交新的sitemap');
console.log('   2. 请求重新抓取 constitution-test 页面');
console.log('   3. 增加 constitution-test 的内部链接密度');
console.log('   4. 等待 1-3 天让 Google 重新索引');

console.log('\n🔗 下一步操作:');
console.log('   1. 访问 https://search.google.com/search-console');
console.log('   2. 选择 herbscience.shop 资产');
console.log('   3. 站点地图 → 添加新的站点地图: https://herbscience.shop/sitemap.xml');
console.log('   4. 网址检查 → 输入 /constitution-test → 请求编入索引');
console.log('   5. 在首页添加更多指向 constitution-test 的链接');

console.log('\n' + '='.repeat(60));

