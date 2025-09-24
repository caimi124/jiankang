// 测试35题完整版体质计算系统
// 验证所有10种体质类型的准确识别

// 模拟题库映射 (基于你提供的35题标准)
const constitutionQuestionMap = {
  '气虚': [0, 1, 2, 3],        // 题目1-4: 疲倦, 易感冒, 面色苍白, 气短
  '阳虚': [4, 5, 6, 7],        // 题目5-8: 手脚冰凉, 怕冷, 吃冷食腹泻, 腰膝酸软
  '阴虚': [8, 9, 10, 11],      // 题目9-12: 夜间出汗, 失眠, 口渴, 皮肤干燥
  '痰湿': [12, 13, 14, 15],    // 题目13-16: 身体沉重, 餐后胀满, 嗜食甘腻, 痰多
  '气郁': [16, 17, 18, 19],    // 题目17-20: 情绪低落, 咽中梗阻, 叹息胸闷, 情绪波动
  '血瘀': [20, 21, 22, 23],    // 题目21-24: 易淤青, 刺痛, 唇舌紫暗, 月经异常
  '湿热': [24, 25, 26, 27],    // 题目25-28: 皮肤油腻, 口渴喜冷, 口苦, 身体异味
  '特禀': [28, 29, 30],        // 题目29-31: 过敏, 湿疹, 食物不耐受
  '脾虚': [31, 32, 33, 34]     // 题目32-35: 消化不良, 餐后疲倦, 浮肿, 能量转化差
};

const constitutionMaxScores = {
  '气虚': 20, '阳虚': 20, '阴虚': 20, '痰湿': 20, '气郁': 20,
  '血瘀': 20, '湿热': 20, '特禀': 15, '脾虚': 20
};

function calculateConstitution35(answers) {
  // 初始化分数
  const scores = {
    "平和": 0, "气虚": 0, "阳虚": 0, "阴虚": 0, "痰湿": 0,
    "湿热": 0, "血瘀": 0, "气郁": 0, "特禀": 0, "脾虚": 0
  };

  // 计算各体质原始分数
  Object.entries(constitutionQuestionMap).forEach(([constitution, questionIndices]) => {
    questionIndices.forEach(index => {
      const answer = answers[index];
      if (answer >= 1 && answer <= 5) {
        scores[constitution] += answer;
      }
    });
  });

  // 计算百分比
  const percentages = {};
  Object.entries(scores).forEach(([type, score]) => {
    const maxScore = constitutionMaxScores[type] || 20;
    if (maxScore > 0) {
      percentages[type] = (score / maxScore) * 100;
    } else {
      percentages[type] = 0;
    }
  });

  // 排序（排除平和）
  const sortedByPercentage = Object.entries(percentages)
    .filter(([type]) => type !== '平和')
    .sort((a, b) => b[1] - a[1]);

  const validAnswerCount = answers.filter(answer => answer >= 1 && answer <= 5).length;
  const averageAnswerScore = answers.filter(a => a >= 1 && a <= 5)
    .reduce((sum, a) => sum + a, 0) / validAnswerCount;

  // 判定逻辑
  const maxPercentage = sortedByPercentage[0]?.[1] || 0;
  const isBalanced = maxPercentage < 50 && averageAnswerScore < 2.5;

  let primaryType, secondaryType;

  if (isBalanced) {
    primaryType = '平和';
  } else {
    primaryType = sortedByPercentage[0][0];

    // 次要体质判定
    if (sortedByPercentage.length > 1) {
      const secondaryPercentage = sortedByPercentage[1][1];
      const primaryPercentage = sortedByPercentage[0][1];

      if (secondaryPercentage >= primaryPercentage * 0.7 && secondaryPercentage >= 40) {
        secondaryType = sortedByPercentage[1][0];
      }
    }
  }

  return {
    primary: primaryType,
    secondary: secondaryType,
    scores,
    percentages,
    isBalanced,
    averageScore: averageAnswerScore
  };
}

// 测试用例
const testCases = [
  {
    name: '平和体质',
    expected: '平和',
    answers: new Array(35).fill(2), // 所有题目都选2分(Rarely)
    description: '所有症状都很轻微'
  },
  {
    name: '气虚体质',
    expected: '气虚',
    answers: (() => {
      const arr = new Array(35).fill(1);
      // 气虚相关题目选高分 (题目1-4)
      arr[0] = 5; // 经常疲倦
      arr[1] = 5; // 易感冒
      arr[2] = 5; // 面色苍白
      arr[3] = 5; // 气短
      return arr;
    })(),
    description: '气虚症状明显：疲倦、易感冒、面色苍白、气短'
  },
  {
    name: '阳虚体质',
    expected: '阳虚',
    answers: (() => {
      const arr = new Array(35).fill(1);
      // 阳虚相关题目选高分 (题目5-8)
      arr[4] = 5; // 手脚冰凉
      arr[5] = 5; // 怕冷
      arr[6] = 5; // 吃冷食腹泻
      arr[7] = 5; // 腰膝酸软
      return arr;
    })(),
    description: '阳虚症状明显：手脚冰凉、怕冷、腹泻、腰膝酸软'
  },
  {
    name: '阴虚体质',
    expected: '阴虚',
    answers: (() => {
      const arr = new Array(35).fill(1);
      // 阴虚相关题目选高分 (题目9-12)
      arr[8] = 5;  // 夜间出汗
      arr[9] = 5;  // 失眠
      arr[10] = 5; // 口渴
      arr[11] = 5; // 皮肤干燥
      return arr;
    })(),
    description: '阴虚症状明显：夜汗、失眠、口渴、皮肤干燥'
  },
  {
    name: '痰湿体质',
    expected: '痰湿',
    answers: (() => {
      const arr = new Array(35).fill(1);
      // 痰湿相关题目选高分 (题目13-16)
      arr[12] = 5; // 身体沉重
      arr[13] = 5; // 餐后胀满
      arr[14] = 5; // 嗜食甘腻
      arr[15] = 5; // 痰多
      return arr;
    })(),
    description: '痰湿症状明显：身体沉重、胀满、嗜甜、痰多'
  },
  {
    name: '气郁体质',
    expected: '气郁',
    answers: (() => {
      const arr = new Array(35).fill(1);
      // 气郁相关题目选高分 (题目17-20)
      arr[16] = 5; // 情绪低落
      arr[17] = 5; // 咽中梗阻
      arr[18] = 5; // 叹息胸闷
      arr[19] = 5; // 情绪波动
      return arr;
    })(),
    description: '气郁症状明显：情绪低落、胸闷、叹息、情绪波动'
  },
  {
    name: '血瘀体质',
    expected: '血瘀',
    answers: (() => {
      const arr = new Array(35).fill(1);
      // 血瘀相关题目选高分 (题目21-24)
      arr[20] = 5; // 易淤青
      arr[21] = 5; // 刺痛
      arr[22] = 5; // 唇舌紫暗
      arr[23] = 5; // 月经异常
      return arr;
    })(),
    description: '血瘀症状明显：易淤青、刺痛、唇暗、月经异常'
  },
  {
    name: '湿热体质',
    expected: '湿热',
    answers: (() => {
      const arr = new Array(35).fill(1);
      // 湿热相关题目选高分 (题目25-28)
      arr[24] = 5; // 皮肤油腻
      arr[25] = 5; // 口渴喜冷
      arr[26] = 5; // 口苦
      arr[27] = 5; // 身体异味
      return arr;
    })(),
    description: '湿热症状明显：皮肤油腻、口苦、喜冷饮、体味'
  },
  {
    name: '特禀体质',
    expected: '特禀',
    answers: (() => {
      const arr = new Array(35).fill(1);
      // 特禀相关题目选高分 (题目29-31)
      arr[28] = 5; // 过敏
      arr[29] = 5; // 湿疹
      arr[30] = 5; // 食物不耐受
      return arr;
    })(),
    description: '特禀症状明显：过敏、湿疹、食物不耐受'
  },
  {
    name: '脾虚体质',
    expected: '脾虚',
    answers: (() => {
      const arr = new Array(35).fill(1);
      // 脾虚相关题目选高分 (题目32-35)
      arr[31] = 5; // 消化不良
      arr[32] = 5; // 餐后疲倦
      arr[33] = 5; // 浮肿
      arr[34] = 5; // 能量转化差
      return arr;
    })(),
    description: '脾虚症状明显：消化不良、餐后疲倦、浮肿、能量转化差'
  }
];

console.log('=== 35题完整版体质测试验证 ===\n');

let passedTests = 0;
let totalTests = testCases.length;

testCases.forEach((testCase, index) => {
  console.log(`测试 ${index + 1}: ${testCase.name}`);
  console.log(`描述: ${testCase.description}`);

  const result = calculateConstitution35(testCase.answers);
  const passed = result.primary === testCase.expected;

  console.log(`期望结果: ${testCase.expected}`);
  console.log(`实际结果: ${result.primary}`);
  console.log(`测试结果: ${passed ? '✅ 通过' : '❌ 失败'}`);
  console.log(`平均分数: ${result.averageScore.toFixed(2)}`);

  // 显示前3名体质分数
  const topScores = Object.entries(result.percentages)
    .filter(([_, percentage]) => percentage > 0)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  console.log('前三名体质得分:');
  topScores.forEach(([constitution, percentage]) => {
    console.log(`  ${constitution}: ${percentage.toFixed(1)}%`);
  });

  if (result.secondary) {
    console.log(`次要体质: ${result.secondary}`);
  }

  console.log('---');

  if (passed) passedTests++;
});

console.log(`\n=== 测试总结 ===`);
console.log(`通过测试: ${passedTests}/${totalTests}`);
console.log(`成功率: ${((passedTests/totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log('🎉 所有测试通过！35题体质判定系统工作完美！');
} else {
  console.log('⚠️ 部分测试失败，需要进一步调整算法');
}

// 混合体质测试
console.log('\n=== 混合体质测试 ===');

const mixedTest = (() => {
  const arr = new Array(35).fill(1);
  // 气虚 + 阳虚混合体质
  arr[0] = 5; arr[1] = 5; // 气虚症状
  arr[4] = 5; arr[5] = 5; // 阳虚症状
  return arr;
})();

const mixedResult = calculateConstitution35(mixedTest);
console.log('气虚+阳虚混合测试:');
console.log(`主要体质: ${mixedResult.primary}`);
console.log(`次要体质: ${mixedResult.secondary || '无'}`);
console.log('详细得分:');
Object.entries(mixedResult.percentages)
  .filter(([_, percentage]) => percentage > 10)
  .sort(([,a], [,b]) => b - a)
  .forEach(([constitution, percentage]) => {
    console.log(`  ${constitution}: ${percentage.toFixed(1)}%`);
  });