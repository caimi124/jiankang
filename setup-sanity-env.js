/**
 * Sanity环境配置助手
 * 这个脚本会帮助你配置Sanity CMS环境变量
 */

const fs = require('fs');
const path = require('path');

console.log('\n🌿 HerbScience - Sanity CMS 配置助手\n');
console.log('这个脚本会帮助你创建 .env.local 文件\n');

// 检查.env.local是否存在
const envPath = path.join(__dirname, '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  .env.local 文件已存在');
  console.log('📁 位置:', envPath);
  console.log('\n如果需要更新配置，请手动编辑该文件\n');
  process.exit(0);
}

// 创建.env.local内容
const envContent = `# Sanity CMS 配置
NEXT_PUBLIC_SANITY_PROJECT_ID=13rzzwgz
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Token
# ⚠️ 重要：请替换下面的 'your-token-here' 为你的实际token
# 
# 获取Token步骤：
# 1. 访问：https://www.sanity.io/manage/personal/tokens
# 2. 点击 "Add API token"
# 3. 设置：
#    - Label: HerbScience Blog Deployment
#    - Permissions: Editor
# 4. 复制生成的token并替换下面的值
#
SANITY_API_TOKEN=your-token-here

# Next.js 配置
NEXT_PUBLIC_SITE_URL=https://herbscience.shop
`;

// 写入文件
try {
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('✅ .env.local 文件创建成功！');
  console.log('📁 位置:', envPath);
  console.log('\n📋 下一步：');
  console.log('1. 访问：https://www.sanity.io/manage/personal/tokens');
  console.log('2. 创建新的API Token (权限: Editor)');
  console.log('3. 打开 .env.local 文件');
  console.log('4. 替换 SANITY_API_TOKEN=your-token-here 为你的实际token');
  console.log('\n⚠️  注意：.env.local 文件不会被提交到Git（已在.gitignore中）\n');
  console.log('✅ 配置完成后，运行以下命令部署博客：');
  console.log('   node add-turmeric-blog-to-sanity.js');
  console.log('   node add-turmeric-side-effects-blog-to-sanity.js\n');
} catch (error) {
  console.error('❌ 创建文件失败:', error.message);
  console.log('\n请手动创建 .env.local 文件，内容如下：\n');
  console.log(envContent);
}

