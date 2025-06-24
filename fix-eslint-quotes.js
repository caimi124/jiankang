const fs = require('fs');
const path = require('path');

// 需要修复的文件列表
const filesToFix = [
  'app/blog/turmeric-gut-relief-guide/page.tsx',
  'app/blog/[slug]/page.tsx', 
  'app/dosage-calculator/page.tsx',
  'app/herb-finder/page.tsx',
  'app/herbs/[slug]/HerbDetailClient.tsx',
  'app/ingredient-checker/page.tsx',
  'app/knowledge-center/page.tsx',
  'app/not-found.tsx',
  'app/page.tsx',
  'app/zh/ingredient-checker/page.tsx',
  'app/zh/user-experiences/page.tsx',
  'components/PersonalizedRecommendations.tsx',
  'components/TrustIndicators.tsx'
];

function fixQuotesInFile(filePath) {
  try {
    console.log(`🔧 修复文件: ${filePath}`);
    
    const fullPath = path.join(__dirname, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    let fixCount = 0;
    
    // 修复JSX文本内容中的单引号
    const singleQuoteMatches = content.match(/>\s*[^<]*'[^<]*</g);
    if (singleQuoteMatches) {
      content = content.replace(/(\>[^<]*)'([^<]*\<)/g, (match, before, after) => {
        fixCount++;
        return before + "&apos;" + after;
      });
    }
    
    // 修复JSX文本内容中的双引号
    const doubleQuoteMatches = content.match(/>\s*[^<]*"[^<]*</g);
    if (doubleQuoteMatches) {
      content = content.replace(/(\>[^<]*)"([^<]*\<)/g, (match, before, after) => {
        fixCount++;
        return before + "&quot;" + after;
      });
    }
    
    // 特殊修复一些常见的模式
    const patterns = [
      { search: /won't/g, replace: "won&apos;t" },
      { search: /don't/g, replace: "don&apos;t" }, 
      { search: /can't/g, replace: "can&apos;t" },
      { search: /isn't/g, replace: "isn&apos;t" },
      { search: /doesn't/g, replace: "doesn&apos;t" },
      { search: /haven't/g, replace: "haven&apos;t" },
      { search: /We're/g, replace: "We&apos;re" },
      { search: /you're/g, replace: "you&apos;re" },
      { search: /they're/g, replace: "they&apos;re" },
      { search: /it's/g, replace: "it&apos;s" },
      { search: /that's/g, replace: "that&apos;s" },
      { search: /what's/g, replace: "what&apos;s" },
      { search: /we'll/g, replace: "we&apos;ll" }
    ];
    
    patterns.forEach(pattern => {
      const matches = content.match(pattern.search);
      if (matches) {
        content = content.replace(pattern.search, pattern.replace);
        fixCount += matches.length;
      }
    });
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ ${filePath}: 修复了 ${fixCount} 个引号问题`);
    return fixCount;
    
  } catch (error) {
    console.error(`❌ 修复 ${filePath} 时出错:`, error.message);
    return 0;
  }
}

console.log('🚀 开始修复ESLint引号转义问题...\n');

let totalFixed = 0;
filesToFix.forEach(file => {
  totalFixed += fixQuotesInFile(file);
});

console.log(`\n🎉 修复完成！总共修复了 ${totalFixed} 个问题`);
console.log('💡 运行 "npm run lint" 来验证修复效果'); 