#!/usr/bin/env node

/**
 * Constitution Test 错误诊断工具
 * 快速测试和诊断"Something went wrong!"错误的根本原因
 */

const fs = require('fs');
const path = require('path');

console.log('🔬 Constitution Test 错误诊断工具');
console.log('=' .repeat(60));

// 检查关键文件
const checkFile = (filePath, description) => {
  const fullPath = path.join(process.cwd(), filePath);
  const exists = fs.existsSync(fullPath);
  console.log(`📁 ${description}: ${exists ? '✅ 存在' : '❌ 缺失'} (${filePath})`);
  
  if (exists) {
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n').length;
      console.log(`   📊 文件大小: ${lines} 行`);
      
      // 检查特定内容
      if (filePath.includes('questions.ts')) {
        const hasConstitutionInfo = content.includes('export const constitutionInfo');
        const hasCalculateFunc = content.includes('export function calculateConstitution');
        console.log(`   🧮 constitutionInfo: ${hasConstitutionInfo ? '✅' : '❌'}`);
        console.log(`   🧮 calculateConstitution: ${hasCalculateFunc ? '✅' : '❌'}`);
      }
      
      if (filePath.includes('ConstitutionTestClient')) {
        const hasSomethingWrong = content.includes('Something went wrong!');
        const hasTryBlock = content.includes('if (currentStep === \'results\') {\n    try {');
        console.log(`   ⚠️  "Something went wrong!": ${hasSomethingWrong ? '✅ 发现' : '❌ 未发现'}`);
        console.log(`   🔧 主要try块: ${hasTryBlock ? '✅ 发现' : '❌ 未发现'}`);
      }
    } catch (error) {
      console.log(`   ❌ 读取文件失败: ${error.message}`);
    }
  }
  
  return exists;
};

console.log('\n📋 1. 检查关键文件完整性');
console.log('-'.repeat(40));

const keyFiles = [
  ['app/constitution-test/questions.ts', 'TCM Questions Database'],
  ['app/constitution-test/ConstitutionTestClient.tsx', 'Main Test Component'],
  ['app/constitution-test/ConstitutionTestClientDebug.tsx', 'Debug Test Component'],
  ['app/constitution-test/page.tsx', 'Page Entry Point'],
  ['lib/sanity.ts', 'Sanity Configuration'],
  ['.env.local', 'Environment Variables']
];

const missingFiles = [];
keyFiles.forEach(([filePath, description]) => {
  if (!checkFile(filePath, description)) {
    missingFiles.push(filePath);
  }
});

console.log('\n📋 2. 检查环境配置');
console.log('-'.repeat(40));

// 检查环境变量
try {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const hasProjectId = envContent.includes('NEXT_PUBLIC_SANITY_PROJECT_ID=13rzzwgz');
    const hasToken = envContent.includes('SANITY_API_TOKEN=sk7J8ol');
    
    console.log(`🔑 Sanity Project ID: ${hasProjectId ? '✅ 正确配置' : '❌ 配置错误'}`);
    console.log(`🔐 Sanity API Token: ${hasToken ? '✅ 已配置' : '❌ 未配置'}`);
  } else {
    console.log('❌ .env.local 文件不存在');
  }
} catch (error) {
  console.log('❌ 环境变量检查失败:', error.message);
}

console.log('\n📋 3. 错误类型分析');
console.log('-'.repeat(40));

// 分析可能的错误类型
console.log('🔍 可能的错误原因:');
console.log('   1️⃣ Sanity配置验证失败');
console.log('   2️⃣ constitutionInfo数据访问错误');
console.log('   3️⃣ calculateConstitution函数执行失败');
console.log('   4️⃣ localStorage操作权限问题');
console.log('   5️⃣ React组件渲染错误');
console.log('   6️⃣ 网络请求失败');

console.log('\n📋 4. 建议的调试步骤');
console.log('-'.repeat(40));

console.log('🔧 立即执行的调试步骤:');
console.log('   ✅ 已启用调试版本 (ConstitutionTestClientDebug)');
console.log('   🌐 访问: https://herbscience.shop/constitution-test');
console.log('   📱 完成测试并查看控制台错误信息');
console.log('   🔍 查看浏览器开发者工具 (F12)');

console.log('\n📋 5. 快速测试本地环境');
console.log('-'.repeat(40));

// 快速测试数据完整性
try {
  const questionsPath = path.join(process.cwd(), 'app/constitution-test/questions.ts');
  if (fs.existsSync(questionsPath)) {
    const questionsContent = fs.readFileSync(questionsPath, 'utf8');
    
    // 统计体质类型
    const constitutionTypes = ['平和', '气虚', '阳虚', '阴虚', '痰湿', '湿热', '血瘀', '气郁', '特禀'];
    const foundTypes = constitutionTypes.filter(type => 
      questionsContent.includes(`"${type}": {`)
    );
    
    console.log(`📊 体质类型定义: ${foundTypes.length}/9`);
    if (foundTypes.length < 9) {
      const missingTypes = constitutionTypes.filter(type => !foundTypes.includes(type));
      console.log(`   ❌ 缺失类型: ${missingTypes.join(', ')}`);
    } else {
      console.log('   ✅ 所有9种体质类型都已定义');
    }
  }
} catch (error) {
  console.log('❌ 数据完整性检查失败:', error.message);
}

console.log('\n🎯 下一步行动:');
console.log('=' .repeat(60));
console.log('1. 🌐 立即访问: https://herbscience.shop/constitution-test');
console.log('2. 📱 完成体质测试 (任意回答即可)');
console.log('3. 🔍 查看浏览器控制台的详细错误信息');
console.log('4. 📋 将错误信息提供给开发团队');
console.log('5. 🔧 基于具体错误制定修复方案');

console.log('\n💡 调试版本特点:');
console.log('   • 详细的步骤追踪');
console.log('   • 完整的错误堆栈信息');
console.log('   • 数据验证结果');
console.log('   • 实时调试日志');

console.log('\n📞 如需支持:');
console.log('   • 截图浏览器控制台错误');
console.log('   • 记录具体的操作步骤');
console.log('   • 提供错误发生的时间');

if (missingFiles.length > 0) {
  console.log('\n⚠️  警告: 发现缺失文件');
  console.log('   缺失文件:', missingFiles.join(', '));
  console.log('   建议: 首先修复文件缺失问题');
}
