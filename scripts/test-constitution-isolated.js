#!/usr/bin/env node

/**
 * Constitution Test 隔离测试脚本
 * 独立测试constitution计算和数据访问，不依赖UI组件
 */

console.log('🧪 Constitution Test 隔离测试开始');
console.log('=' .repeat(50));

try {
  // 导入必要的模块
  const { calculateConstitution, constitutionInfo, questions } = require('../app/constitution-test/questions.ts');
  
  console.log('✅ 成功导入constitution模块');
  
  // 测试数据完整性
  console.log('\n📊 数据完整性检查:');
  console.log(`- 问题数量: ${questions.length}`);
  console.log(`- 体质类型数量: ${Object.keys(constitutionInfo).length}`);
  console.log(`- 体质类型: ${Object.keys(constitutionInfo).join(', ')}`);
  
  // 生成测试答案 (模拟用户完成测试)
  const testAnswers = questions.map((_, index) => {
    // 随机答案 1-5
    return Math.floor(Math.random() * 5) + 1;
  });
  
  console.log(`\n🎯 生成测试答案: ${testAnswers.length}个答案`);
  console.log(`样本答案: [${testAnswers.slice(0, 10).join(', ')}...]`);
  
  // 测试constitution计算
  console.log('\n⚙️ 测试constitution计算...');
  const result = calculateConstitution(testAnswers);
  
  console.log('✅ 计算成功!');
  console.log(`- 主要体质: ${result.primary}`);
  console.log(`- 次要体质: ${result.secondary || '无'}`);
  console.log(`- 平衡状态: ${result.isBalanced ? '是' : '否'}`);
  
  // 测试体质信息访问
  console.log('\n🔍 测试体质信息访问...');
  const primaryInfo = constitutionInfo[result.primary];
  
  if (!primaryInfo) {
    throw new Error(`找不到体质信息: ${result.primary}`);
  }
  
  console.log('✅ 体质信息访问成功!');
  console.log(`- 英文名: ${primaryInfo.englishName}`);
  console.log(`- 中文名: ${primaryInfo.name}`);
  console.log(`- 描述: ${primaryInfo.description.substring(0, 100)}...`);
  console.log(`- 推荐草药: ${primaryInfo.recommendedHerbs?.slice(0, 3).join(', ') || '无'}`);
  
  // 测试所有体质类型
  console.log('\n🧬 测试所有体质类型...');
  let allTestsPassed = true;
  
  for (const [constitutionType, info] of Object.entries(constitutionInfo)) {
    try {
      if (!info.englishName || !info.name || !info.description) {
        console.error(`❌ ${constitutionType}: 缺少必要字段`);
        allTestsPassed = false;
      } else {
        console.log(`✅ ${constitutionType}: ${info.englishName}`);
      }
    } catch (error) {
      console.error(`❌ ${constitutionType}: ${error.message}`);
      allTestsPassed = false;
    }
  }
  
  if (allTestsPassed) {
    console.log('\n🎉 所有测试通过！Constitution Test数据和逻辑正常');
    console.log('\n💡 问题可能在于:');
    console.log('1. UI渲染组件 (Navigation, Breadcrumb)');
    console.log('2. Sanity配置问题');
    console.log('3. 浏览器端特定错误');
    console.log('4. 开发/生产环境差异');
  } else {
    console.log('\n❌ 部分测试失败！请检查constitution数据');
  }
  
} catch (error) {
  console.error('\n💥 测试失败:', error.message);
  console.error('详细错误:', error.stack);
  
  console.log('\n🔧 可能的解决方案:');
  console.log('1. 检查questions.ts文件是否正确导出');
  console.log('2. 验证calculateConstitution函数');
  console.log('3. 确认constitutionInfo数据完整');
  console.log('4. 检查TypeScript编译问题');
}

console.log('\n' + '=' .repeat(50));
console.log('Constitution Test 隔离测试完成');
