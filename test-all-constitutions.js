// 验证所有9种体质都能被正确识别的完整测试
const questions = [
  { id: 1, affects: { "气虚": 5 } },        // 经常疲倦 - 气虚
  { id: 2, affects: { "阳虚": 5 } },        // 手脚冰凉 - 阳虚
  { id: 3, affects: { "阴虚": 5 } },        // 容易出汗 - 阴虚
  { id: 4, affects: { "痰湿": 5 } },        // 运动后恢复慢 - 痰湿
  { id: 5, affects: { "痰湿": 5 } },        // 胃胀 - 痰湿
  { id: 6, affects: { "气虚": 5 } },        // 食欲不振 - 气虚
  { id: 7, affects: { "气虚": 5 } },        // 排便不规律 - 气虚
  { id: 8, affects: { "痰湿": 5 } },        // 喜欢油腻甜食 - 痰湿
  { id: 9, affects: { "阴虚": 5 } },        // 难以入睡 - 阴虚
  { id: 10, affects: { "阴虚": 5 } },       // 多梦/睡眠浅 - 阴虚
  { id: 11, affects: { "气郁": 5 } },       // 焦虑紧张 - 气郁
  { id: 12, affects: { "气郁": 5 } },       // 情绪低落 - 气郁
  { id: 13, affects: { "阴虚": 5 } },       // 皮肤干燥 - 阴虚
  { id: 14, affects: { "湿热": 5 } },       // 湿疹痤疮 - 湿热
  { id: 15, affects: { "血瘀": 5 } },       // 容易淤青 - 血瘀
  { id: 16, affects: { "气虚": 5 } },       // 面色苍白 - 气虚
  { id: 17, affects: { "气虚": 5 } },       // 易感冒 - 气虚
  { id: 18, affects: { "特禀": 5 } },       // 过敏 - 特禀
  { id: 19, affects: { "痰湿": 5 } },       // 水肿 - 痰湿
  { id: 20, affects: { "阳虚": 5 } },       // 对寒湿敏感 - 阳虚
];

function calculateConstitution(answers) {
  const scores = {
    "平和": 0, "气虚": 0, "阳虚": 0, "阴虚": 0,
    "痰湿": 0, "湿热": 0, "血瘀": 0, "气郁": 0, "特禀": 0
  };

  questions.forEach((question, index) => {
    const answer = answers[index];
    if (answer >= 1 && answer <= 5) {
      Object.entries(question.affects).forEach(([type, weight]) => {
        scores[type] = (scores[type] || 0) + answer * weight;
      });
    }
  });

  const sortedScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, score]) => score > 0);

  let primaryType, primaryScore;
  if (sortedScores.length === 0) {
    primaryType = '平和';
    primaryScore = answers.filter(a => a >= 1 && a <= 5).length * 1.5;
  } else {
    [primaryType, primaryScore] = sortedScores[0];
  }

  const maxScore = Math.max(...Object.values(scores));
  const validAnswerCount = answers.filter(answer => answer >= 1 && answer <= 5).length;
  const averageAnswerScore = answers.filter(a => a >= 1 && a <= 5).reduce((sum, a) => sum + a, 0) / validAnswerCount;

  const hasStrongSymptom = primaryScore >= 20; // Any score >= 20 indicates a clear symptom
  const isBalanced = !hasStrongSymptom && averageAnswerScore <= 2.2 && maxScore <= (validAnswerCount * 2.5);

  if (isBalanced) {
    primaryType = '平和';
    primaryScore = validAnswerCount * 2;
  }

  return {
    primary: primaryType,
    scores,
    averageScore: averageAnswerScore
  };
}

// 测试所有9种体质类型
const testCases = [
  {
    name: '平和体质',
    expected: '平和',
    answers: new Array(20).fill(2), // 所有题目都选低分
    description: '所有症状都很轻微或没有'
  },
  {
    name: '气虚体质',
    expected: '气虚',
    answers: (() => {
      const arr = new Array(20).fill(1);
      arr[0] = 5; // 疲倦
      arr[5] = 5; // 食欲不振
      arr[6] = 5; // 排便不规律
      arr[15] = 5; // 面色苍白
      arr[16] = 5; // 易感冒
      return arr;
    })(),
    description: '气虚相关症状明显'
  },
  {
    name: '阳虚体质',
    expected: '阳虚',
    answers: (() => {
      const arr = new Array(20).fill(1);
      arr[1] = 5; // 手脚冰凉
      arr[19] = 5; // 对寒湿敏感
      return arr;
    })(),
    description: '畏寒怕冷症状突出'
  },
  {
    name: '阴虚体质',
    expected: '阴虚',
    answers: (() => {
      const arr = new Array(20).fill(1);
      arr[2] = 5; // 容易出汗
      arr[8] = 5; // 难以入睡
      arr[9] = 5; // 多梦
      arr[12] = 5; // 皮肤干燥
      return arr;
    })(),
    description: '阴虚火旺症状明显'
  },
  {
    name: '痰湿体质',
    expected: '痰湿',
    answers: (() => {
      const arr = new Array(20).fill(1);
      arr[3] = 5; // 运动后恢复慢
      arr[4] = 5; // 胃胀
      arr[7] = 5; // 喜欢油腻甜食
      arr[18] = 5; // 水肿
      return arr;
    })(),
    description: '痰湿困脾症状突出'
  },
  {
    name: '湿热体质',
    expected: '湿热',
    answers: (() => {
      const arr = new Array(20).fill(1);
      arr[13] = 5; // 湿疹痤疮
      // Add a secondary symptom for better detection
      arr[13] = 5; // 湿疹痤疮 - need to increase score weight
      return arr;
    })(),
    description: '湿热内蕴症状明显'
  },
  {
    name: '血瘀体质',
    expected: '血瘀',
    answers: (() => {
      const arr = new Array(20).fill(1);
      arr[14] = 5; // 容易淤青
      return arr;
    })(),
    description: '血液循环不畅症状突出'
  },
  {
    name: '气郁体质',
    expected: '气郁',
    answers: (() => {
      const arr = new Array(20).fill(1);
      arr[10] = 5; // 焦虑紧张
      arr[11] = 5; // 情绪低落
      return arr;
    })(),
    description: '情志不舒症状明显'
  },
  {
    name: '特禀体质',
    expected: '特禀',
    answers: (() => {
      const arr = new Array(20).fill(1);
      arr[17] = 5; // 过敏
      return arr;
    })(),
    description: '过敏体质症状突出'
  }
];

console.log('=== 全体质类型验证测试 ===\n');

let passedTests = 0;
let totalTests = testCases.length;

testCases.forEach((testCase, index) => {
  console.log(`测试 ${index + 1}: ${testCase.name}`);
  console.log(`描述: ${testCase.description}`);

  const result = calculateConstitution(testCase.answers);
  const passed = result.primary === testCase.expected;

  console.log(`期望结果: ${testCase.expected}`);
  console.log(`实际结果: ${result.primary}`);
  console.log(`测试结果: ${passed ? '✅ 通过' : '❌ 失败'}`);
  console.log(`平均分数: ${result.averageScore.toFixed(2)}`);
  console.log(`详细分数:`, Object.fromEntries(
    Object.entries(result.scores)
      .filter(([_, score]) => score > 0)
      .sort(([,a], [,b]) => b - a)
  ));
  console.log('---');

  if (passed) passedTests++;
});

console.log(`\n=== 测试总结 ===`);
console.log(`通过测试: ${passedTests}/${totalTests}`);
console.log(`成功率: ${((passedTests/totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log('🎉 所有测试通过！体质判定逻辑工作正常！');
} else {
  console.log('⚠️ 部分测试失败，需要进一步调整算法');
}