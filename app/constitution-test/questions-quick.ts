// 简化版中医体质测试 - 10题快速版
// 专为忙碌的中年用户设计（35-50岁+）
// 聚焦核心症状：焦虑、失眠、消化问题、慢性疲劳

export type QuickConstitutionType = '气虚' | '阳虚' | '阴虚' | '痰湿' | '湿热' | '血瘀' | '气郁' | '平和';

export interface QuickQuestion {
  id: number;
  text: string;
  category: string;
  affects: QuickConstitutionType[];
  weight: number; // 权重：1=普通, 2=重要
}

// 🎯 10题快速体质测试
// 每个问题设计为多体质指向，提高准确性
export const quickQuestions: QuickQuestion[] = [
  // Q1: 能量水平（核心指标）
  {
    id: 1,
    category: "Energy & Vitality",
    text: "How often do you feel tired or lack energy during the day?",
    affects: ['气虚', '阳虚', '痰湿'],
    weight: 2
  },
  
  // Q2: 睡眠质量（核心指标）
  {
    id: 2,
    category: "Sleep Quality",
    text: "Do you have trouble falling asleep or staying asleep at night?",
    affects: ['阴虚', '气郁'],
    weight: 2
  },
  
  // Q3: 消化系统（核心指标）
  {
    id: 3,
    category: "Digestive Health",
    text: "Do you experience bloating, loose stools, or digestive discomfort?",
    affects: ['痰湿', '阳虚'],
    weight: 2
  },
  
  // Q4: 情绪状态（核心指标）
  {
    id: 4,
    category: "Emotional Well-being",
    text: "Do you often feel anxious, stressed, or emotionally overwhelmed?",
    affects: ['气郁', '阴虚'],
    weight: 2
  },
  
  // Q5: 体温调节
  {
    id: 5,
    category: "Temperature Regulation",
    text: "Do you often feel cold (especially hands/feet) or prefer warm environments?",
    affects: ['阳虚', '气虚'],
    weight: 1
  },
  
  // Q6: 炎症和湿热
  {
    id: 6,
    category: "Inflammation Signs",
    text: "Do you have oily skin, acne, or a bitter taste in your mouth?",
    affects: ['湿热'],
    weight: 1
  },
  
  // Q7: 血液循环
  {
    id: 7,
    category: "Circulation",
    text: "Do you bruise easily or experience sharp, fixed pain in certain areas?",
    affects: ['血瘀'],
    weight: 1
  },
  
  // Q8: 体重和湿气
  {
    id: 8,
    category: "Body Weight",
    text: "Do you feel heavy in your body or struggle with excess mucus/phlegm?",
    affects: ['痰湿'],
    weight: 1
  },
  
  // Q9: 口渴和体液
  {
    id: 9,
    category: "Hydration & Dryness",
    text: "Do you feel hot, thirsty often, or experience night sweats?",
    affects: ['阴虚', '湿热'],
    weight: 1
  },
  
  // Q10: 免疫力
  {
    id: 10,
    category: "Immune Function",
    text: "Do you catch colds easily or get sick more often than others?",
    affects: ['气虚'],
    weight: 1
  }
];

// 📊 简化评分系统（5分制）
// UI/UX优化：使用中性设计，避免评判感，鼓励诚实回答
export const quickScoreOptions = [
  { value: 1, label: "Never", description: "Not at all" },
  { value: 2, label: "Rarely", description: "Once in a while" },
  { value: 3, label: "Sometimes", description: "Occasionally" },
  { value: 4, label: "Often", description: "Frequently" },
  { value: 5, label: "Always", description: "All the time" },
];

// 🧮 快速体质计算算法
export interface QuickScoreMap {
  [key: string]: number;
}

export function calculateQuickConstitution(answers: number[]): {
  primary: QuickConstitutionType;
  secondary?: QuickConstitutionType;
  scores: QuickScoreMap;
  percentages: QuickScoreMap;
  confidence: 'high' | 'medium' | 'low';
  recommendFullTest: boolean;
} {
  try {
    // 输入验证
    if (!answers || answers.length !== 10) {
      throw new Error('需要回答所有10个问题');
    }

    // 初始化分数
    const scores: QuickScoreMap = {
      "平和": 0,
      "气虚": 0,
      "阳虚": 0,
      "阴虚": 0,
      "痰湿": 0,
      "湿热": 0,
      "血瘀": 0,
      "气郁": 0
    };

    // 计算加权分数
    quickQuestions.forEach((question, index) => {
      const answer = answers[index];
      if (answer >= 1 && answer <= 5) {
        question.affects.forEach(constitution => {
          scores[constitution] = (scores[constitution] || 0) + (answer * question.weight);
        });
      }
    });

    // 计算最大可能分数（用于百分比计算）
    const maxPossibleScores: QuickScoreMap = {
      "平和": 0,
      "气虚": 8,  // Q1(2) + Q5(1) + Q10(1) = 4题 × 最高分5 = 20分，权重 = 8
      "阳虚": 8,  // Q1(2) + Q3(2) + Q5(1) = 3题，权重 = 8
      "阴虚": 8,  // Q2(2) + Q4(2) + Q9(1) = 3题，权重 = 8
      "痰湿": 8,  // Q1(2) + Q3(2) + Q8(1) = 3题，权重 = 8
      "湿热": 6,  // Q6(1) + Q9(1) = 2题，权重 = 6
      "血瘀": 5,  // Q7(1) = 1题，权重 = 5
      "气郁": 8   // Q2(2) + Q4(2) = 2题，权重 = 8
    };

    // 计算百分比
    const percentages: QuickScoreMap = {};
    Object.entries(scores).forEach(([type, score]) => {
      const maxScore = maxPossibleScores[type] || 1;
      percentages[type] = (score / (maxScore * 5)) * 100; // 乘以5因为最高分是5
    });

    // 排序体质类型
    const sortedByPercentage = Object.entries(percentages)
      .filter(([type]) => type !== '平和')
      .sort((a, b) => b[1] - a[1]);

    // 计算平均答案分数（判断是否平和）
    const averageAnswerScore = answers.reduce((sum, a) => sum + a, 0) / answers.length;

    // 判断是否为平和体质
    const maxPercentage = sortedByPercentage[0]?.[1] || 0;
    const isBalanced = maxPercentage < 40 && averageAnswerScore < 2.5;

    let primaryType: QuickConstitutionType;
    let secondaryType: QuickConstitutionType | undefined;

    if (isBalanced) {
      primaryType = '平和';
    } else {
      primaryType = sortedByPercentage[0][0] as QuickConstitutionType;
      
      // 次要体质判断
      if (sortedByPercentage.length > 1) {
        const secondaryPercentage = sortedByPercentage[1][1];
        const primaryPercentage = sortedByPercentage[0][1];
        
        if (secondaryPercentage >= primaryPercentage * 0.7 && secondaryPercentage >= 35) {
          secondaryType = sortedByPercentage[1][0] as QuickConstitutionType;
        }
      }
    }

    // 置信度评估
    let confidence: 'high' | 'medium' | 'low';
    const secondBestPercentage = sortedByPercentage[1]?.[1] || 0;
    const percentageDiff = maxPercentage - secondBestPercentage;

    if (percentageDiff > 20 && maxPercentage > 60) {
      confidence = 'high';
    } else if (percentageDiff > 10 && maxPercentage > 50) {
      confidence = 'medium';
    } else {
      confidence = 'low';
    }

    // 是否推荐完整测试
    const recommendFullTest = confidence === 'low' || secondaryType !== undefined;

    return {
      primary: primaryType,
      secondary: secondaryType,
      scores,
      percentages,
      confidence,
      recommendFullTest
    };

  } catch (error) {
    console.error('快速体质计算错误:', error);
    
    // 降级返回
    return {
      primary: '气虚',
      secondary: undefined,
      scores: {},
      percentages: {},
      confidence: 'low',
      recommendFullTest: true
    };
  }
}

// 📝 体质简化描述（针对忙碌用户）
export const quickConstitutionInfo: Record<QuickConstitutionType, {
  name: string;
  emoji: string;
  tagline: string;
  quickFix: string[];
  topHerbs: string[];
}> = {
  "平和": {
    name: "Balanced Constitution",
    emoji: "✨",
    tagline: "You're doing great! Your body is in harmony.",
    quickFix: [
      "Maintain your current healthy habits",
      "Stay consistent with sleep and diet",
      "Keep stress levels low"
    ],
    topHerbs: ["Goji Berry", "Astragalus", "Codonopsis"]
  },
  "气虚": {
    name: "Qi Deficiency",
    emoji: "😴",
    tagline: "You need an energy boost and immune support.",
    quickFix: [
      "Prioritize 7-8 hours of sleep nightly",
      "Eat warm, nourishing foods",
      "Gentle exercise like walking or yoga"
    ],
    topHerbs: ["Ginseng", "Astragalus", "Codonopsis"]
  },
  "阳虚": {
    name: "Yang Deficiency",
    emoji: "🥶",
    tagline: "You need warmth and metabolic support.",
    quickFix: [
      "Stay warm, especially hands and feet",
      "Drink ginger tea daily",
      "Avoid cold foods and drinks"
    ],
    topHerbs: ["Cinnamon", "Ginger", "Korean Ginseng"]
  },
  "阴虚": {
    name: "Yin Deficiency",
    emoji: "🔥",
    tagline: "You need cooling and calming support.",
    quickFix: [
      "Avoid staying up late",
      "Practice stress-relief techniques",
      "Eat moistening foods like pears"
    ],
    topHerbs: ["Rehmannia", "Lily Bulb", "American Ginseng"]
  },
  "痰湿": {
    name: "Phlegm-Dampness",
    emoji: "💧",
    tagline: "You need drainage and metabolic activation.",
    quickFix: [
      "Reduce sugar and dairy intake",
      "Exercise regularly to boost metabolism",
      "Eat light, warm foods"
    ],
    topHerbs: ["Poria", "Tangerine Peel", "Job's Tears"]
  },
  "湿热": {
    name: "Damp-Heat",
    emoji: "🌶️",
    tagline: "You need cooling and detoxifying support.",
    quickFix: [
      "Avoid spicy, fried foods",
      "Drink plenty of water",
      "Manage stress and anger"
    ],
    topHerbs: ["Dandelion", "Chrysanthemum", "Gentian"]
  },
  "血瘀": {
    name: "Blood Stasis",
    emoji: "🩸",
    tagline: "You need circulation support and movement.",
    quickFix: [
      "Stay active, avoid prolonged sitting",
      "Consider gentle massage",
      "Eat circulation-promoting foods"
    ],
    topHerbs: ["Turmeric", "Safflower", "Hawthorn"]
  },
  "气郁": {
    name: "Qi Stagnation",
    emoji: "😰",
    tagline: "You need stress relief and emotional balance.",
    quickFix: [
      "Practice deep breathing exercises",
      "Engage in hobbies you enjoy",
      "Talk to friends or counselor"
    ],
    topHerbs: ["Rhodiola", "Lavender", "Rose Petals"]
  }
};
