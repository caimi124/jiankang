const fs = require('fs');
const path = require('path');

console.log('🚀 开始部署检查...\n');

// 检查关键文件是否存在
const criticalFiles = [
  'package.json',
  'next.config.js',
  'app/layout.tsx',
  'app/page.tsx',
  'app/herbs/[slug]/page.tsx',
  'app/api/herbs/[slug]/route.ts',
  'app/api/herbs/data/route.ts',
  'app/api/herbs/recommendations/route.ts',
  'ginger-notion-sync.js',
  'ginseng-notion-sync.js',
  'check-notion-database.js'
];

console.log('📁 检查关键文件...');
let missingFiles = [];

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - 缺失`);
    missingFiles.push(file);
  }
});

// 检查package.json配置
console.log('\n📦 检查package.json配置...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const requiredDependencies = [
  '@notionhq/client',
  'next',
  'react',
  'react-dom',
  'lucide-react',
  'tailwindcss'
];

const missingDeps = requiredDependencies.filter(dep => 
  !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
);

if (missingDeps.length === 0) {
  console.log('  ✅ 所有必需依赖已安装');
} else {
  console.log(`  ❌ 缺失依赖: ${missingDeps.join(', ')}`);
}

// 检查构建脚本
const requiredScripts = ['dev', 'build', 'start'];
const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);

if (missingScripts.length === 0) {
  console.log('  ✅ 所有必需脚本已配置');
} else {
  console.log(`  ❌ 缺失脚本: ${missingScripts.join(', ')}`);
}

// 检查环境配置
console.log('\n🔧 检查环境配置...');
if (fs.existsSync('vercel.json')) {
  console.log('  ✅ Vercel配置文件存在');
} else {
  console.log('  ⚠️  Vercel配置文件不存在');
}

if (fs.existsSync('next.config.js')) {
  console.log('  ✅ Next.js配置文件存在');
} else {
  console.log('  ❌ Next.js配置文件缺失');
}

// 检查API路由结构
console.log('\n🔌 检查API路由结构...');
const apiRoutes = [
  'app/api/herbs/[slug]/route.ts',
  'app/api/herbs/data/route.ts',
  'app/api/herbs/recommendations/route.ts'
];

apiRoutes.forEach(route => {
  if (fs.existsSync(route)) {
    console.log(`  ✅ ${route}`);
  } else {
    console.log(`  ❌ ${route} - 缺失`);
  }
});

// 检查页面路由
console.log('\n📄 检查页面路由...');
const pageRoutes = [
  'app/page.tsx',
  'app/herbs/[slug]/page.tsx',
  'app/layout.tsx'
];

pageRoutes.forEach(route => {
  if (fs.existsSync(route)) {
    console.log(`  ✅ ${route}`);
  } else {
    console.log(`  ❌ ${route} - 缺失`);
  }
});

// 总结
console.log('\n📊 部署检查总结:');
if (missingFiles.length === 0 && missingDeps.length === 0 && missingScripts.length === 0) {
  console.log('  🎉 所有检查通过！项目已准备好部署。');
} else {
  console.log('  ⚠️  发现以下问题需要解决:');
  if (missingFiles.length > 0) {
    console.log(`    - 缺失文件: ${missingFiles.join(', ')}`);
  }
  if (missingDeps.length > 0) {
    console.log(`    - 缺失依赖: ${missingDeps.join(', ')}`);
  }
  if (missingScripts.length > 0) {
    console.log(`    - 缺失脚本: ${missingScripts.join(', ')}`);
  }
}

console.log('\n🔗 下一步:');
console.log('  1. 运行 npm run build 验证构建');
console.log('  2. 运行 npm run dev 测试本地开发');
console.log('  3. 提交并推送到Git仓库');
console.log('  4. 在Vercel或其他平台部署'); 