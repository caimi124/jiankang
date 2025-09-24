// 测试体质计算修复后的逻辑
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

  // 计算每个体质的得分
  questions.forEach((question, index) => {
    const answer = answers[index];
    if (answer >= 1 && answer <= 5) {
      Object.entries(question.affects).forEach(([type, weight]) => {
        scores[type] = (scores[type] || 0) + answer * weight;
      });
    }
  });

  // 排序得分
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

  // 检查是否平和体质（所有分数都相对较低）
  const maxScore = Math.max(...Object.values(scores));
  const validAnswerCount = answers.filter(answer => answer >= 1 && answer <= 5).length;
  const averageAnswerScore = answers.filter(a => a >= 1 && a <= 5).reduce((sum, a) => sum + a, 0) / validAnswerCount;

  // If average answer is low (1-2.5) and no single constitution dominates, it's balanced
  const isBalanced = averageAnswerScore <= 2.5 && maxScore < (validAnswerCount * 3.5);

  if (isBalanced) {
    primaryType = '平和';
    primaryScore = validAnswerCount * 2;
  }

  return {
    primary: primaryType,
    scores,
    sortedScores
  };
}

// 测试案例 1: 所有题目都选"Always"(5分) - 应该分出不同体质
console.log('=== 测试案例1: 所有题目都选5分 ===');
const allFives = new Array(20).fill(5);
const result1 = calculateConstitution(allFives);
console.log('结果:', result1.primary);
console.log('详细分数:', result1.scores);

// 测试案例 2: 只对气虚相关题目选高分 - 应该是气虚
console.log('\n=== 测试案例2: 只有气虚题目高分 ===');
const qiDeficiency = new Array(20).fill(1);
qiDeficiency[0] = 5; // 题目1 - 气虚
qiDeficiency[5] = 5; // 题目6 - 气虚
qiDeficiency[6] = 5; // 题目7 - 气虚
qiDeficiency[15] = 5; // 题目16 - 气虚
qiDeficiency[16] = 5; // 题目17 - 气虚
const result2 = calculateConstitution(qiDeficiency);
console.log('结果:', result2.primary);
console.log('详细分数:', result2.scores);

// 测试案例 3: 只对阳虚相关题目选高分 - 应该是阳虚
console.log('\n=== 测试案例3: 只有阳虚题目高分 ===');
const yangDeficiency = new Array(20).fill(1);
yangDeficiency[1] = 5; // 题目2 - 阳虚
yangDeficiency[19] = 5; // 题目20 - 阳虚
const result3 = calculateConstitution(yangDeficiency);
console.log('结果:', result3.primary);
console.log('详细分数:', result3.scores);

// 测试案例 4: 只对阴虚相关题目选高分 - 应该是阴虚
console.log('\n=== 测试案例4: 只有阴虚题目高分 ===');
const yinDeficiency = new Array(20).fill(1);
yinDeficiency[2] = 5; // 题目3 - 阴虚
yinDeficiency[8] = 5; // 题目9 - 阴虚
yinDeficiency[9] = 5; // 题目10 - 阴虚
yinDeficiency[12] = 5; // 题目13 - 阴虚
const result4 = calculateConstitution(yinDeficiency);
console.log('结果:', result4.primary);
console.log('详细分数:', result4.scores);

// 测试案例 5: 只对痰湿相关题目选高分 - 应该是痰湿
console.log('\n=== 测试案例5: 只有痰湿题目高分 ===');
const tanshi = new Array(20).fill(1);
tanshi[3] = 5; // 题目4 - 痰湿
tanshi[4] = 5; // 题目5 - 痰湿
tanshi[7] = 5; // 题目8 - 痰湿
tanshi[18] = 5; // 题目19 - 痰湿
const result5 = calculateConstitution(tanshi);
console.log('结果:', result5.primary);
console.log('详细分数:', result5.scores);

// 测试案例 6: 所有题目都选低分 - 应该是平和
console.log('\n=== 测试案例6: 所有题目都选低分 ===');
const balanced = new Array(20).fill(2);
const result6 = calculateConstitution(balanced);
console.log('结果:', result6.primary);
console.log('详细分数:', result6.scores);