#!/usr/bin/env node

/**
 * Constitution Test 深度调试脚本
 * 模拟真实的测试流程，定位具体错误原因
 */

const { exec } = require('child_process');

console.log('🔬 Constitution Test 深度调试工具');
console.log('=' .repeat(50));

// 创建测试用的答案数组（模拟用户完成20题）
const mockAnswers = [
  4, 3, 2, 4, 3,  // Energy & Vitality (5题)
  3, 4, 2, 3, 4,  // Digestion & Appetite (5题)  
  2, 3, 4, 3, 2,  // Sleep & Emotions (5题)
  3, 2, 4, 3, 2   // Skin & Appearance + Physical (5题)
];

console.log('📊 模拟测试数据:');
console.log(`- 答案数组长度: ${mockAnswers.length}`);
console.log(`- 有效答案数量: ${mockAnswers.filter(a => a >= 1 && a <= 5).length}`);
console.log(`- 答案内容: [${mockAnswers.join(', ')}]`);

// 测试calculateConstitution函数
console.log('\n🧪 测试 calculateConstitution 函数...');

const testScript = `
const { questions, calculateConstitution, constitutionInfo } = require('./app/constitution-test/questions.ts');

console.log('\\n=== 调试信息 ===');
console.log('Questions length:', questions?.length || 'undefined');
console.log('ConstitutionInfo keys:', Object.keys(constitutionInfo || {}));

try {
  const answers = [${mockAnswers.join(', ')}];
  console.log('\\n📊 输入数据验证:');
  console.log('- answers是数组:', Array.isArray(answers));
  console.log('- answers长度:', answers.length);
  console.log('- 有效答案数:', answers.filter(a => a >= 1 && a <= 5).length);
  
  console.log('\\n🔄 开始计算...');
  const result = calculateConstitution(answers);
  
  console.log('\\n✅ 计算结果:');
  console.log('- Primary:', result.primary);
  console.log('- Secondary:', result.secondary);
  console.log('- Is Balanced:', result.isBalanced);
  console.log('- Scores:', JSON.stringify(result.scores, null, 2));
  
  console.log('\\n🔍 数据验证:');
  console.log('- result存在:', !!result);
  console.log('- result.primary存在:', !!result.primary);
  console.log('- constitutionInfo存在:', !!constitutionInfo);
  console.log('- constitutionInfo有该类型:', !!constitutionInfo[result.primary]);
  
  if (constitutionInfo[result.primary]) {
    const info = constitutionInfo[result.primary];
    console.log('\\n📋 体质信息完整性:');
    console.log('- name:', !!info.name);
    console.log('- englishName:', !!info.englishName);
    console.log('- description:', !!info.description);
    console.log('- recommendedHerbs:', !!info.recommendedHerbs);
    console.log('- recommendedHerbs length:', info.recommendedHerbs?.length || 0);
  }
  
  console.log('\\n🎉 测试成功完成!');
  
} catch (error) {
  console.error('\\n❌ 错误详情:');
  console.error('- 错误类型:', error.constructor.name);
  console.error('- 错误消息:', error.message);
  console.error('- 错误堆栈:', error.stack);
  
  console.log('\\n🔧 可能的解决方案:');
  console.log('1. 检查 questions.ts 是否正确导入');
  console.log('2. 验证 constitutionInfo 数据完整性');
  console.log('3. 检查 calculateConstitution 函数逻辑');
  console.log('4. 验证输入数据格式');
}
`;

// 由于questions.ts是TypeScript文件，我们需要用Node.js直接测试
console.log('\n🏃‍♂️ 运行计算测试...');

// 创建临时测试文件
const fs = require('fs');
const testFilePath = './temp-constitution-test.js';

// 创建JavaScript版本的测试
const jsTestScript = `
// 模拟 questions.ts 的关键部分进行测试
console.log('\\n🔬 JavaScript版本测试');

// 测试calculateConstitution的核心逻辑
function testCalculateConstitution(answers) {
  console.log('测试输入:', {
    isArray: Array.isArray(answers),
    length: answers.length,
    validCount: answers.filter(a => a >= 1 && a <= 5).length
  });
  
  // 模拟计算逻辑
  const scores = {
    "平和": 0, "气虚": 0, "阳虚": 0, "阴虚": 0,
    "痰湿": 0, "湿热": 0, "血瘀": 0, "气郁": 0, "特禀": 0
  };
  
  // 简化的计算逻辑
  answers.forEach((answer, index) => {
    if (answer >= 1 && answer <= 5) {
      // 简单分配权重进行测试
      if (index < 5) scores["气虚"] += answer * 2;
      else if (index < 10) scores["阳虚"] += answer * 2;
      else if (index < 15) scores["阴虚"] += answer * 2;
      else scores["平和"] += answer * 2;
    }
  });
  
  const sortedScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, score]) => score > 0);
  
  const primaryType = sortedScores[0]?.[0] || '平和';
  
  console.log('✅ 测试计算结果:', {
    primary: primaryType,
    scores: scores,
    sortedScores: sortedScores.slice(0, 3)
  });
  
  return { primary: primaryType, scores };
}

try {
  const answers = [${mockAnswers.join(', ')}];
  const result = testCalculateConstitution(answers);
  console.log('\\n🎯 模拟测试成功！');
} catch (error) {
  console.error('\\n❌ 模拟测试失败:', error);
}
`;

fs.writeFileSync(testFilePath, jsTestScript);

exec(`node ${testFilePath}`, (error, stdout, stderr) => {
  // 清理临时文件
  try {
    fs.unlinkSync(testFilePath);
  } catch(e) {}
  
  if (error) {
    console.error('❌ 测试执行失败:', error);
    return;
  }
  
  if (stderr) {
    console.error('⚠️ 测试警告:', stderr);
  }
  
  console.log(stdout);
  
  console.log('\n📋 调试总结:');
  console.log('1. ✅ 模拟计算逻辑测试完成');
  console.log('2. 🔍 需要检查实际TypeScript模块加载');
  console.log('3. 🎯 需要在浏览器环境中测试');
  
  console.log('\n🔧 建议的调试步骤:');
  console.log('1. 在浏览器中打开开发者工具');
  console.log('2. 访问 http://localhost:3002/constitution-test');
  console.log('3. 完成测试并查看控制台错误');
  console.log('4. 查看Network选项卡是否有加载失败');
  console.log('5. 检查Console中的具体错误信息');
});

console.log('\n⏰ 测试运行中...');
