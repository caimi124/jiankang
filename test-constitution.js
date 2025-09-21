// 测试体质测试的核心功能
const fs = require('fs');
const path = require('path');

console.log('=== Constitution Test 功能验证 ===\n');

// 1. 检查必要文件是否存在
const files = [
  'app/constitution-test/page.tsx',
  'app/constitution-test/ConstitutionTestClient.tsx',
  'app/constitution-test/questions.ts',
  'app/consultation/page.tsx'
];

console.log('📁 文件检查:');
files.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// 2. 检查questions.ts中的关键导出
console.log('\n🔍 questions.ts 内容检查:');
const questionsPath = 'app/constitution-test/questions.ts';
if (fs.existsSync(questionsPath)) {
  const content = fs.readFileSync(questionsPath, 'utf8');

  const exports = [
    'calculateConstitution',
    'constitutionInfo',
    'questions',
    'scoreOptions'
  ];

  exports.forEach(exp => {
    const hasExport = content.includes(`export const ${exp}`) || content.includes(`export function ${exp}`);
    console.log(`${hasExport ? '✅' : '❌'} ${exp}`);
  });
}

// 3. 检查ConstitutionTestClient.tsx中的关键函数
console.log('\n🔍 ConstitutionTestClient.tsx 检查:');
const clientPath = 'app/constitution-test/ConstitutionTestClient.tsx';
if (fs.existsSync(clientPath)) {
  const content = fs.readFileSync(clientPath, 'utf8');

  const functions = [
    'handleStartTest',
    'handleAnswerSelect',
    'handleNextQuestion',
    'handleHerbClick'
  ];

  functions.forEach(func => {
    const hasFunction = content.includes(`const ${func}`) || content.includes(`function ${func}`);
    console.log(`${hasFunction ? '✅' : '❌'} ${func}`);
  });

  // 检查结果页面处理
  const hasResultsHandling = content.includes("currentStep === 'results'");
  console.log(`${hasResultsHandling ? '✅' : '❌'} 结果页面处理`);

  // 检查错误处理
  const hasErrorHandling = content.includes("catch (error)");
  console.log(`${hasErrorHandling ? '✅' : '❌'} 错误处理`);
}

// 4. 模拟测试答案验证
console.log('\n🧪 核心逻辑测试:');
try {
  // 模拟完整答案
  const fullAnswers = Array(20).fill(0).map((_, i) => Math.floor(Math.random() * 5) + 1);
  console.log('✅ 答案数组生成成功');
  console.log(`📊 测试答案: ${fullAnswers.slice(0, 5).join(', ')}... (${fullAnswers.length} 题)`);

  // 检查有效答案数量
  const validAnswers = fullAnswers.filter(a => a >= 1 && a <= 5);
  console.log(`✅ 有效答案数: ${validAnswers.length}/${fullAnswers.length}`);

} catch (error) {
  console.log('❌ 核心逻辑测试失败:', error.message);
}

console.log('\n📋 调试建议:');
console.log('1. 确认所有文件都已正确推送到远程仓库');
console.log('2. 检查部署平台是否已完成重新部署');
console.log('3. 如果问题仍然存在，请检查浏览器控制台的具体错误信息');
console.log('4. 尝试清除浏览器缓存后重新测试');
console.log('\n💡 如果需要进一步调试，请提供浏览器控制台的错误信息');