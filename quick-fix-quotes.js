const fs = require('fs');
const glob = require('glob');

// 查找所有tsx文件
const files = glob.sync('{app,components}/**/*.tsx');

let totalFixed = 0;

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // 替换常见的收缩形式
    const replacements = [
      [/(\>[^<]*?)don't([^<]*?\<)/g, "$1don&apos;t$2"],
      [/(\>[^<]*?)can't([^<]*?\<)/g, "$1can&apos;t$2"],
      [/(\>[^<]*?)won't([^<]*?\<)/g, "$1won&apos;t$2"],
      [/(\>[^<]*?)isn't([^<]*?\<)/g, "$1isn&apos;t$2"],
      [/(\>[^<]*?)doesn't([^<]*?\<)/g, "$1doesn&apos;t$2"],
      [/(\>[^<]*?)haven't([^<]*?\<)/g, "$1haven&apos;t$2"],
      [/(\>[^<]*?)we're([^<]*?\<)/gi, "$1we&apos;re$2"],
      [/(\>[^<]*?)you're([^<]*?\<)/gi, "$1you&apos;re$2"],
      [/(\>[^<]*?)they're([^<]*?\<)/gi, "$1they&apos;re$2"],
      [/(\>[^<]*?)it's([^<]*?\<)/gi, "$1it&apos;s$2"],
      [/(\>[^<]*?)that's([^<]*?\<)/gi, "$1that&apos;s$2"],
      [/(\>[^<]*?)what's([^<]*?\<)/gi, "$1what&apos;s$2"],
      [/(\>[^<]*?)we'll([^<]*?\<)/gi, "$1we&apos;ll$2"],
      [/(\>[^<]*?)"([^"<]*?)"([^<]*?\<)/g, "$1&quot;$2&quot;$3"]
    ];
    
    replacements.forEach(([pattern, replacement]) => {
      content = content.replace(pattern, replacement);
    });
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log(`✅ Fixed: ${file}`);
      totalFixed++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

console.log(`\n🎉 Total files fixed: ${totalFixed}`); 