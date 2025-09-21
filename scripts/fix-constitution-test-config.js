#!/usr/bin/env node

/**
 * Constitution Test 配置修复脚本
 * 解决Sanity配置问题和环境变量缺失问题
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Constitution Test 配置修复工具');
console.log('=' .repeat(50));

// 检查是否存在.env.local文件
const envLocalPath = path.join(process.cwd(), '.env.local');
const envLocalExists = fs.existsSync(envLocalPath);

console.log(`📁 检查 .env.local 文件: ${envLocalExists ? '✅ 存在' : '❌ 缺失'}`);

if (!envLocalExists) {
  console.log('\n🚨 问题诊断: 缺少Sanity环境变量配置');
  console.log('📋 解决方案: 创建 .env.local 文件');
  
  const envContent = `# Sanity Configuration for HerbScience.shop
# 已为您配置用户提供的正确Sanity项目信息

# Sanity项目配置
NEXT_PUBLIC_SANITY_PROJECT_ID=13rzzwgz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity编辑器权限Token (用户提供)
SANITY_API_TOKEN=sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp

# Google Analytics (可选)
NEXT_PUBLIC_GA_ID=

# 其他配置
NODE_ENV=development`;

  try {
    fs.writeFileSync(envLocalPath, envContent);
    console.log('✅ .env.local 文件创建成功!');
    console.log(`📍 位置: ${envLocalPath}`);
  } catch (error) {
    console.log('❌ 创建 .env.local 失败:', error.message);
    console.log('\n📝 手动创建步骤:');
    console.log('1. 在项目根目录创建 .env.local 文件');
    console.log('2. 复制以下内容到文件中:');
    console.log('\n' + '='.repeat(40));
    console.log(envContent);
    console.log('='.repeat(40));
  }
} else {
  console.log('✅ .env.local 文件已存在');
  
  // 检查关键配置
  try {
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    const hasProjectId = envContent.includes('NEXT_PUBLIC_SANITY_PROJECT_ID=13rzzwgz');
    const hasToken = envContent.includes('SANITY_API_TOKEN=sk7J8ol');
    
    console.log(`🔍 项目ID配置: ${hasProjectId ? '✅ 正确' : '⚠️  需要更新'}`);
    console.log(`🔑 API Token配置: ${hasToken ? '✅ 正确' : '⚠️  需要更新'}`);
    
    if (!hasProjectId || !hasToken) {
      console.log('\n⚠️  建议更新 .env.local 文件内容');
    }
  } catch (error) {
    console.log('⚠️  无法读取 .env.local 文件内容');
  }
}

// 检查lib/sanity.ts中的配置验证逻辑
const sanityLibPath = path.join(process.cwd(), 'lib/sanity.ts');
if (fs.existsSync(sanityLibPath)) {
  try {
    const sanityContent = fs.readFileSync(sanityLibPath, 'utf8');
    const hasCorrectValidation = sanityContent.includes('projectId.length >= 8');
    
    console.log(`🔧 Sanity验证逻辑: ${hasCorrectValidation ? '✅ 已修复' : '❌ 需要修复'}`);
    
    if (!hasCorrectValidation) {
      console.log('🔧 修复 lib/sanity.ts 验证逻辑...');
      const fixedContent = sanityContent.replace(
        'projectId.length > 8',
        'projectId.length >= 8'
      );
      
      if (fixedContent !== sanityContent) {
        fs.writeFileSync(sanityLibPath, fixedContent);
        console.log('✅ lib/sanity.ts 修复成功!');
      }
    }
  } catch (error) {
    console.log('❌ 修复 lib/sanity.ts 失败:', error.message);
  }
}

console.log('\n📋 配置验证完成!');
console.log('\n🔄 接下来的步骤:');
console.log('1. 重启开发服务器: npm run dev');
console.log('2. 访问: http://localhost:3000/constitution-test');
console.log('3. 完成测试并检查结果页面');

console.log('\n🎯 预期结果:');
console.log('- ✅ 测试完成后显示详细的体质分析结果');
console.log('- ✅ 不再显示 "Something went wrong!" 错误');
console.log('- ✅ Sanity配置验证通过');

console.log('\n📞 如果问题仍然存在:');
console.log('1. 检查浏览器控制台错误信息');
console.log('2. 验证 .env.local 文件是否正确加载');
console.log('3. 确认Sanity项目ID和Token是否有效');
