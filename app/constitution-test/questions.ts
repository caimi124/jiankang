// 中医体质测试题库 - 基于《中国居民中医体质分类与判定标准》
// 9种体质类型：平和、气虚、阳虚、阴虚、痰湿、湿热、血瘀、气郁、特禀

export type ConstitutionType = '平和' | '气虚' | '阳虚' | '阴虚' | '痰湿' | '湿热' | '血瘀' | '气郁' | '特禀';

export interface Question {
  id: number;
  text: string;
  category: string;
  affects: Partial<Record<ConstitutionType, number>>;
}

export const questions: Question[] = [
  {
    id: 1,
    category: "基本感觉",
    text: "你是否容易感到疲劳？",
    affects: { "气虚": 5 },
  },
  {
    id: 2,
    category: "基本感觉", 
    text: "你是否怕冷或手脚经常冰凉？",
    affects: { "阳虚": 5 },
  },
  {
    id: 3,
    category: "基本感觉",
    text: "你是否经常口干舌燥，喜欢喝水？",
    affects: { "阴虚": 5 },
  },
  {
    id: 4,
    category: "外貌体征",
    text: "你是否舌苔厚腻或口中有异味？",
    affects: { "痰湿": 3, "湿热": 2 },
  },
  {
    id: 5,
    category: "情绪",
    text: "你是否容易情绪低落、焦虑或郁闷？",
    affects: { "气郁": 5 },
  },
  {
    id: 6,
    category: "外貌体征",
    text: "你是否面色暗淡、有色斑或容易淤青？",
    affects: { "血瘀": 5 },
  },
  {
    id: 7,
    category: "基本感觉",
    text: "你是否容易出汗？即使轻微活动也会出汗？",
    affects: { "气虚": 3, "阳虚": 2 },
  },
  {
    id: 8,
    category: "大便小便",
    text: "你是否大便偏软，容易腹泻？",
    affects: { "阳虚": 5 },
  },
  {
    id: 9,
    category: "睡眠",
    text: "你是否夜间盗汗、烦躁、易醒？",
    affects: { "阴虚": 5 },
  },
  {
    id: 10,
    category: "外貌体征",
    text: "你是否体型偏胖、行动缓慢？",
    affects: { "痰湿": 5 },
  },
  {
    id: 11,
    category: "基本感觉",
    text: "你是否经常口苦或口干？",
    affects: { "湿热": 5 },
  },
  {
    id: 12,
    category: "外貌体征",
    text: "你是否易过敏，如皮肤瘙痒、打喷嚏？",
    affects: { "特禀": 5 },
  },
  {
    id: 13,
    category: "基本感觉",
    text: "你是否面色红润、精神饱满？",
    affects: { "平和": 5 },
  },
  {
    id: 14,
    category: "饮食",
    text: "你是否经常出现食欲不振、胃胀气？",
    affects: { "气虚": 3, "痰湿": 2 },
  },
  {
    id: 15,
    category: "情绪",
    text: "你是否容易失眠、心烦？",
    affects: { "气郁": 3, "阴虚": 2 },
  },
  {
    id: 16,
    category: "大便小便",
    text: "你是否经常觉得小便黄、大便粘腻？",
    affects: { "湿热": 5 },
  },
  {
    id: 17,
    category: "外貌体征",
    text: "你是否月经色暗、有血块或经期腹痛？（女性回答，男性选择\"不适用\"）",
    affects: { "血瘀": 5 },
  },
  {
    id: 18,
    category: "外貌体征",
    text: "你是否舌头常有齿痕、舌苔白滑？",
    affects: { "阳虚": 3, "痰湿": 2 },
  },
  {
    id: 19,
    category: "情绪",
    text: "你是否总觉得胸闷、郁结、常叹气？",
    affects: { "气郁": 5 },
  },
  {
    id: 20,
    category: "基本感觉",
    text: "你是否容易过敏性鼻炎、哮喘或有家族遗传病？",
    affects: { "特禀": 5 },
  },
];

// 体质类型详细信息
export interface ConstitutionInfo {
  id: ConstitutionType;
  name: string;
  englishName: string;
  keywords: string[];
  description: string;
  modernInterpretation: string;
  characteristics: string[];
  lifestyleAdvice: string[];
  dietaryRecommendations: {
    include: string[];
    avoid: string[];
  };
  recommendedHerbs: string[];
  warnings: string[];
  color: string;
  icon: string;
}

export const constitutionInfo: Record<ConstitutionType, ConstitutionInfo> = {
  "平和": {
    id: "平和",
    name: "平和体质",
    englishName: "Balanced Constitution",
    keywords: ["健康", "精神好", "吃得香"],
    description: "恭喜！你拥有平衡的体质，表明整体健康状况良好，能量充沛，适应能力强。",
    modernInterpretation: "基础代谢正常，免疫力强，内分泌平衡。",
    characteristics: [
      "精力充沛，心情积极",
      "食欲好，消化正常",
      "睡眠稳定，免疫力强",
      "适应环境能力强"
    ],
    lifestyleAdvice: [
      "保持规律的生活作息和健康饮食",
      "适度运动：散步、瑜伽、游泳",
      "季节变化时注意预防失衡"
    ],
    dietaryRecommendations: {
      include: ["均衡营养", "时令食物", "清淡饮食"],
      avoid: ["过度偏食", "暴饮暴食"]
    },
    recommendedHerbs: ["党参", "枸杞", "黄芪"],
    warnings: [],
    color: "green",
    icon: "🌿"
  },
  "气虚": {
    id: "气虚",
    name: "气虚体质", 
    englishName: "Qi Deficiency Constitution",
    keywords: ["易疲劳", "感冒", "出汗多"],
    description: "你的气虚体质表明能量不足，脏器功能偏弱，特别影响免疫力和消化功能。",
    modernInterpretation: "基础代谢低，免疫力弱，容易疲劳。",
    characteristics: [
      "容易疲劳，精力不足",
      "经常感冒或过敏",
      "气短、声音小或消化弱",
      "轻微活动就出汗"
    ],
    lifestyleAdvice: [
      "避免过度劳累，保证充足休息",
      "温和运动：太极、八段锦",
      "规律作息，避免熬夜"
    ],
    dietaryRecommendations: {
      include: ["温热熟食", "健脾益气食物", "小米粥", "山药"],
      avoid: ["生冷食物", "过度节食", "辛辣刺激"]
    },
    recommendedHerbs: ["黄芪", "党参", "人参", "白术"],
    warnings: ["避免剧烈运动", "注意保暖"],
    color: "yellow",
    icon: "💨"
  },
  "阳虚": {
    id: "阳虚",
    name: "阳虚体质",
    englishName: "Yang Deficiency Constitution", 
    keywords: ["怕冷", "手脚凉", "夜尿多"],
    description: "你的阳虚体质说明阳气不足，身体代谢机能偏弱，容易手脚冰凉、怕冷。",
    modernInterpretation: "基础代谢低，循环差，体温调节能力弱。",
    characteristics: [
      "怕冷，手脚经常冰凉",
      "容易腹泻或夜尿频繁", 
      "精神不振，喜欢安静",
      "舌淡苔白，脉沉迟"
    ],
    lifestyleAdvice: [
      "注意保暖，避免受寒",
      "适度运动增强阳气",
      "艾灸、泡脚等温阳方法"
    ],
    dietaryRecommendations: {
      include: ["温热食物", "桂圆", "干姜", "肉桂", "羊肉"],
      avoid: ["生冷饮食", "寒凉水果", "冰饮"]
    },
    recommendedHerbs: ["附子", "干姜", "肉桂", "鹿茸"],
    warnings: ["避免寒凉环境", "注意腹部保暖"],
    color: "orange",
    icon: "🔥"
  },
  "阴虚": {
    id: "阴虚",
    name: "阴虚体质",
    englishName: "Yin Deficiency Constitution",
    keywords: ["口干", "心烦", "失眠"],
    description: "你的阴虚体质表明体内津液不足，容易出现口干、心烦、失眠等症状。",
    modernInterpretation: "内分泌失调，自主神经功能紊乱，容易上火。",
    characteristics: [
      "口干舌燥，喜欢喝水",
      "夜间盗汗，烦躁易醒",
      "手脚心热，面部潮红",
      "大便干结，小便黄"
    ],
    lifestyleAdvice: [
      "避免熬夜，保证充足睡眠",
      "心理调节，减少焦虑",
      "适当午休，避免过度用脑"
    ],
    dietaryRecommendations: {
      include: ["滋阴润燥食物", "梨", "银耳", "百合", "蜂蜜"],
      avoid: ["辛辣燥热", "烟酒", "油炸食品"]
    },
    recommendedHerbs: ["麦冬", "沙参", "玉竹", "百合"],
    warnings: ["避免过度劳累", "控制情绪波动"],
    color: "blue",
    icon: "💧"
  },
  "痰湿": {
    id: "痰湿",
    name: "痰湿体质",
    englishName: "Phlegm-Dampness Constitution",
    keywords: ["体胖", "油腻", "痰多"],
    description: "你的痰湿体质表明体内水液代谢失调，容易肥胖，痰湿内生。",
    modernInterpretation: "新陈代谢慢，脂质代谢异常，容易水肿肥胖。",
    characteristics: [
      "体型肥胖，腹部松软",
      "容易困倦，头重如裹",
      "痰多，胸闷",
      "舌苔白腻，口中粘腻"
    ],
    lifestyleAdvice: [
      "加强运动，控制体重",
      "环境除湿，避免潮湿",
      "规律作息，避免久坐"
    ],
    dietaryRecommendations: {
      include: ["清淡少油", "冬瓜", "薏米", "红豆", "茯苓"],
      avoid: ["油腻甜食", "生冷食物", "酒精"]
    },
    recommendedHerbs: ["陈皮", "半夏", "茯苓", "薏苡仁"],
    warnings: ["控制饮食", "避免过度进补"],
    color: "brown",
    icon: "🌫️"
  },
  "湿热": {
    id: "湿热",
    name: "湿热体质",
    englishName: "Damp-Heat Constitution",
    keywords: ["口苦", "长痘", "大便粘"],
    description: "你的湿热体质表明体内湿气和热气并存，容易口苦、长痘、大便粘腻。",
    modernInterpretation: "炎症反应活跃，解毒功能负担重，容易皮肤问题。",
    characteristics: [
      "面部油腻，容易长痘",
      "口苦口干，口臭",
      "大便粘腻，小便黄",
      "情绪急躁，身体沉重"
    ],
    lifestyleAdvice: [
      "清热利湿，避免闷热环境",
      "适当运动出汗排毒",
      "保持心情舒畅"
    ],
    dietaryRecommendations: {
      include: ["清热利湿食物", "绿豆", "苦瓜", "芹菜", "冬瓜"],
      avoid: ["辛辣油腻", "烟酒", "甜腻食品"]
    },
    recommendedHerbs: ["黄连", "栀子", "龙胆草", "车前子"],
    warnings: ["避免热性食物", "控制情绪"],
    color: "red",
    icon: "🌶️"
  },
  "血瘀": {
    id: "血瘀",
    name: "血瘀体质",
    englishName: "Blood Stasis Constitution",
    keywords: ["面色暗", "痛经", "刺痛"],
    description: "你的血瘀体质表明血液循环不畅，容易出现面色暗淡、疼痛等症状。",
    modernInterpretation: "微循环障碍，血液粘稠度高，容易血栓形成。",
    characteristics: [
      "面色暗沉，有色斑",
      "容易出现瘀青",
      "月经色暗有血块（女性）",
      "身体某处刺痛"
    ],
    lifestyleAdvice: [
      "适当运动促进血循环",
      "避免久坐不动",
      "保持心情愉快"
    ],
    dietaryRecommendations: {
      include: ["活血化瘀食物", "黑木耳", "山楂", "红花", "桃仁"],
      avoid: ["寒凉食物", "油腻食品"]
    },
    recommendedHerbs: ["当归", "川芎", "红花", "桃仁"],
    warnings: ["避免外伤", "定期体检"],
    color: "purple",
    icon: "🩸"
  },
  "气郁": {
    id: "气郁",
    name: "气郁体质",
    englishName: "Qi Stagnation Constitution",
    keywords: ["情绪低落", "爱叹气"],
    description: "你的气郁体质表明情志不畅，气机郁滞，容易情绪低落、胸闷。",
    modernInterpretation: "精神压力大，自主神经功能失调，容易抑郁焦虑。",
    characteristics: [
      "情绪低落，容易抑郁",
      "胸闷，经常叹气",
      "咽部异物感",
      "月经不调（女性）"
    ],
    lifestyleAdvice: [
      "心理疏导，释放压力",
      "培养兴趣爱好",
      "社交活动，避免独处"
    ],
    dietaryRecommendations: {
      include: ["理气解郁食物", "玫瑰花", "柑橘", "佛手", "香橼"],
      avoid: ["过度饮酒", "辛辣刺激"]
    },
    recommendedHerbs: ["柴胡", "香附", "郁金", "玫瑰花"],
    warnings: ["避免情绪刺激", "寻求心理支持"],
    color: "gray",
    icon: "😔"
  },
  "特禀": {
    id: "特禀",
    name: "特禀体质",
    englishName: "Special Constitution",
    keywords: ["过敏", "哮喘", "遗传体质"],
    description: "你的特禀体质表明先天禀赋不足或有遗传倾向，容易过敏反应。",
    modernInterpretation: "免疫系统异常，容易过敏反应，有遗传倾向。",
    characteristics: [
      "容易过敏性鼻炎、哮喘",
      "皮肤容易过敏起疹",
      "对某些食物、药物过敏",
      "有家族遗传病史"
    ],
    lifestyleAdvice: [
      "避免接触过敏原",
      "增强体质，规律锻炼",
      "保持环境清洁"
    ],
    dietaryRecommendations: {
      include: ["清淡营养食物", "益气固表食物"],
      avoid: ["已知过敏食物", "海鲜", "牛奶等易过敏食品"]
    },
    recommendedHerbs: ["黄芪", "防风", "白术", "玉屏风散"],
    warnings: ["避免过敏原", "随身携带抗过敏药物"],
    color: "pink",
    icon: "⚠️"
  }
};

// 评分选项
export const scoreOptions = [
  { value: 1, label: "从不", description: "完全不符合" },
  { value: 2, label: "偶尔", description: "很少出现" },
  { value: 3, label: "有时", description: "偶尔出现" },
  { value: 4, label: "经常", description: "大部分时候" },
  { value: 5, label: "总是", description: "几乎总是" },
];

// 判定算法
export interface ScoreMap {
  [key: string]: number;
}

export function calculateConstitution(answers: number[]): {
  primary: ConstitutionType;
  secondary?: ConstitutionType;
  scores: ScoreMap;
  isBalanced: boolean;
} {
  const scores: ScoreMap = {
    "平和": 0, "气虚": 0, "阳虚": 0, "阴虚": 0,
    "痰湿": 0, "湿热": 0, "血瘀": 0, "气郁": 0, "特禀": 0
  };

  // 计算各体质得分 - 只计算有效答案 (1-5)
  questions.forEach((question, index) => {
    const answer = answers[index];
    // 只处理有效答案，忽略未回答的题目(0)
    if (answer >= 1 && answer <= 5) {
      Object.entries(question.affects).forEach(([type, weight]) => {
        scores[type] = (scores[type] || 0) + answer * weight;
      });
    }
  });

  // 检查有效答案数量
  const validAnswerCount = answers.filter(answer => answer >= 1 && answer <= 5).length;
  const minRequiredAnswers = Math.max(3, Math.floor(questions.length * 0.3)); // 至少30%的问题

  // 如果回答的问题太少，提供默认结果
  if (validAnswerCount < minRequiredAnswers) {
    return {
      primary: '平和',
      secondary: undefined,
      scores: {
        "平和": 50, "气虚": 0, "阳虚": 0, "阴虚": 0,
        "痰湿": 0, "湿热": 0, "血瘀": 0, "气郁": 0, "特禀": 0
      },
      isBalanced: false
    };
  }

  // 排序得分
  const sortedScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, score]) => score > 0);

  // 处理没有正分的情况，默认为平和体质
  const [primaryType, primaryScore] = sortedScores[0] || ['平和', 0];
  const [secondaryType, secondaryScore] = sortedScores[1] || ['', 0];

  // 判定逻辑
  const isBalanced = primaryType === '平和' && primaryScore >= 60 && 
    sortedScores.slice(1).every(([_, score]) => score < 30);

  const hasSecondary = secondaryScore >= 40 && secondaryType !== '平和';

  return {
    primary: primaryType as ConstitutionType,
    secondary: hasSecondary ? secondaryType as ConstitutionType : undefined,
    scores,
    isBalanced
  };
} 