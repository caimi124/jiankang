// 🌿 智能草药推荐引擎
// 基于中医体质理论，为用户推荐最适合的草药

import type { ConstitutionType } from '../app/constitution-test/questions-35'

export interface HerbRecommendation {
  name: string;
  slug: string;
  primaryBenefit: string;
  constitutionMatch: ConstitutionType[];
  confidenceScore: number; // 1-100，推荐置信度
  commonIssues: string[]; // 这个草药解决的常见问题
  safetyRating: 'high' | 'medium' | 'caution'; // 安全等级
  ageAppropriate: boolean; // 是否适合中老年人
  interactionWarning?: string; // 药物相互作用警告
  dosageRange: string;
  timingRecommendation: string; // 最佳服用时间
  scientificEvidence: 'strong' | 'moderate' | 'preliminary';
}

// 🗄️ 草药数据库（按体质分类）
export const herbDatabase: HerbRecommendation[] = [
  // 气虚体质推荐
  {
    name: "Astragalus (Huang Qi)",
    slug: "astragalus",
    primaryBenefit: "Boosts energy and strengthens immune system",
    constitutionMatch: ["气虚"],
    confidenceScore: 95,
    commonIssues: ["chronic fatigue", "frequent colds", "low immunity", "shortness of breath"],
    safetyRating: "high",
    ageAppropriate: true,
    dosageRange: "500-1000mg twice daily",
    timingRecommendation: "Morning and afternoon with meals",
    scientificEvidence: "strong"
  },
  {
    name: "Ginseng (Ren Shen)",
    slug: "ginseng",
    primaryBenefit: "Powerful energy tonic and adaptogen",
    constitutionMatch: ["气虚"],
    confidenceScore: 90,
    commonIssues: ["fatigue", "mental fog", "weak digestion", "low stamina"],
    safetyRating: "medium",
    ageAppropriate: true,
    interactionWarning: "Avoid with blood thinners and diabetes medications",
    dosageRange: "200-400mg daily",
    timingRecommendation: "Morning, avoid after 3pm",
    scientificEvidence: "strong"
  },
  {
    name: "Codonopsis (Dang Shen)",
    slug: "codonopsis",
    primaryBenefit: "Gentle energy booster, safer than ginseng",
    constitutionMatch: ["气虚", "脾虚"],
    confidenceScore: 88,
    commonIssues: ["mild fatigue", "poor appetite", "weak digestion"],
    safetyRating: "high",
    ageAppropriate: true,
    dosageRange: "1000-3000mg daily",
    timingRecommendation: "With meals",
    scientificEvidence: "moderate"
  },

  // 阳虚体质推荐
  {
    name: "Cinnamon (Rou Gui)",
    slug: "cinnamon",
    primaryBenefit: "Warms the body and improves circulation",
    constitutionMatch: ["阳虚"],
    confidenceScore: 92,
    commonIssues: ["cold hands and feet", "poor circulation", "digestive issues", "low energy"],
    safetyRating: "high",
    ageAppropriate: true,
    dosageRange: "1-2g daily (1/2 teaspoon)",
    timingRecommendation: "Morning with warm beverages",
    scientificEvidence: "strong"
  },
  {
    name: "Ginger (Sheng Jiang)",
    slug: "ginger",
    primaryBenefit: "Warming herb for digestion and circulation",
    constitutionMatch: ["阳虚", "脾虚"],
    confidenceScore: 90,
    commonIssues: ["nausea", "cold sensitivity", "poor digestion", "joint pain"],
    safetyRating: "high",
    ageAppropriate: true,
    dosageRange: "1-3g daily (fresh or powder)",
    timingRecommendation: "Morning or with meals",
    scientificEvidence: "strong"
  },

  // 阴虚体质推荐
  {
    name: "Ashwagandha (Indian Ginseng)",
    slug: "ashwagandha",
    primaryBenefit: "Reduces stress and improves sleep quality",
    constitutionMatch: ["阴虚", "气郁"],
    confidenceScore: 95,
    commonIssues: ["insomnia", "anxiety", "stress", "night sweats", "hormonal imbalance"],
    safetyRating: "high",
    ageAppropriate: true,
    interactionWarning: "Avoid with thyroid medications",
    dosageRange: "300-600mg daily",
    timingRecommendation: "Evening, 1-2 hours before bed",
    scientificEvidence: "strong"
  },
  {
    name: "Lily Bulb (Bai He)",
    slug: "lily-bulb",
    primaryBenefit: "Moistens lungs and calms the mind",
    constitutionMatch: ["阴虚"],
    confidenceScore: 85,
    commonIssues: ["dry cough", "insomnia", "anxiety", "dry skin"],
    safetyRating: "high",
    ageAppropriate: true,
    dosageRange: "10-30g daily (cooked)",
    timingRecommendation: "Evening in soups or teas",
    scientificEvidence: "moderate"
  },

  // 痰湿体质推荐
  {
    name: "Poria (Fu Ling)",
    slug: "poria",
    primaryBenefit: "Drains dampness and aids weight management",
    constitutionMatch: ["痰湿", "脾虚"],
    confidenceScore: 88,
    commonIssues: ["water retention", "bloating", "sluggish metabolism", "brain fog"],
    safetyRating: "high",
    ageAppropriate: true,
    dosageRange: "9-15g daily",
    timingRecommendation: "Morning and afternoon",
    scientificEvidence: "moderate"
  },

  // 湿热体质推荐
  {
    name: "Turmeric (Curcumin)",
    slug: "turmeric",
    primaryBenefit: "Anti-inflammatory and detoxifying",
    constitutionMatch: ["湿热", "血瘀"],
    confidenceScore: 93,
    commonIssues: ["inflammation", "joint pain", "skin issues", "digestive problems"],
    safetyRating: "high",
    ageAppropriate: true,
    interactionWarning: "Avoid with blood thinners",
    dosageRange: "500-1500mg daily with black pepper",
    timingRecommendation: "With meals",
    scientificEvidence: "strong"
  },

  // 血瘀体质推荐
  {
    name: "Angelica (Dang Gui)",
    slug: "angelica",
    primaryBenefit: "Improves blood circulation and nourishes blood",
    constitutionMatch: ["血瘀"],
    confidenceScore: 90,
    commonIssues: ["poor circulation", "menstrual pain", "bruising", "stiff joints"],
    safetyRating: "medium",
    ageAppropriate: true,
    interactionWarning: "Avoid with blood thinners",
    dosageRange: "3-9g daily",
    timingRecommendation: "With meals",
    scientificEvidence: "moderate"
  },

  // 气郁体质推荐
  {
    name: "Rhodiola Rosea",
    slug: "rhodiola",
    primaryBenefit: "Adaptogen for stress and mood support",
    constitutionMatch: ["气郁", "阴虚"],
    confidenceScore: 92,
    commonIssues: ["anxiety", "depression", "stress", "mental fatigue", "mood swings"],
    safetyRating: "high",
    ageAppropriate: true,
    dosageRange: "200-400mg daily",
    timingRecommendation: "Morning, avoid evening",
    scientificEvidence: "strong"
  },
  {
    name: "Rose Petals (Mei Gui Hua)",
    slug: "rose-petals",
    primaryBenefit: "Regulates Qi and calms emotions",
    constitutionMatch: ["气郁"],
    confidenceScore: 85,
    commonIssues: ["stress", "mood swings", "PMS", "digestive upset from stress"],
    safetyRating: "high",
    ageAppropriate: true,
    dosageRange: "3-6g daily as tea",
    timingRecommendation: "Afternoon or evening",
    scientificEvidence: "preliminary"
  },

  // 特禀体质推荐
  {
    name: "Astragalus + Reishi Combo",
    slug: "immune-support-combo",
    primaryBenefit: "Strengthens immune system and reduces allergies",
    constitutionMatch: ["特禀", "气虚"],
    confidenceScore: 87,
    commonIssues: ["allergies", "frequent infections", "weak immunity", "autoimmune issues"],
    safetyRating: "high",
    ageAppropriate: true,
    dosageRange: "Follow product instructions",
    timingRecommendation: "Morning",
    scientificEvidence: "moderate"
  },

  // 脾虚体质推荐
  {
    name: "White Atractylodes (Bai Zhu)",
    slug: "white-atractylodes",
    primaryBenefit: "Strengthens digestion and reduces bloating",
    constitutionMatch: ["脾虚"],
    confidenceScore: 88,
    commonIssues: ["weak digestion", "bloating", "fatigue after meals", "loose stools"],
    safetyRating: "high",
    ageAppropriate: true,
    dosageRange: "6-12g daily",
    timingRecommendation: "Before meals",
    scientificEvidence: "moderate"
  }
];

// 🎯 智能推荐算法
export interface RecommendationResult {
  topHerbs: HerbRecommendation[];
  secondaryHerbs: HerbRecommendation[];
  cautionHerbs: HerbRecommendation[];
  lifestyleAdvice: string[];
}

export function getHerbRecommendations(
  primaryConstitution: ConstitutionType,
  secondaryConstitution?: ConstitutionType,
  userIssues?: string[] // 用户选择的健康问题
): RecommendationResult {
  
  // 1. 筛选匹配主要体质的草药
  const primaryMatches = herbDatabase.filter(herb => 
    herb.constitutionMatch.includes(primaryConstitution)
  ).sort((a, b) => b.confidenceScore - a.confidenceScore);

  // 2. 筛选匹配次要体质的草药
  const secondaryMatches = secondaryConstitution
    ? herbDatabase.filter(herb => 
        herb.constitutionMatch.includes(secondaryConstitution) &&
        !herb.constitutionMatch.includes(primaryConstitution)
      ).sort((a, b) => b.confidenceScore - a.confidenceScore)
    : [];

  // 3. 如果用户提供了具体健康问题，进一步优化推荐
  let topHerbs = primaryMatches;
  if (userIssues && userIssues.length > 0) {
    topHerbs = primaryMatches.map(herb => {
      const issueMatchCount = herb.commonIssues.filter(issue =>
        userIssues.some(userIssue => 
          issue.toLowerCase().includes(userIssue.toLowerCase())
        )
      ).length;
      
      return {
        ...herb,
        confidenceScore: herb.confidenceScore + (issueMatchCount * 5) // 提升匹配度
      };
    }).sort((a, b) => b.confidenceScore - a.confidenceScore);
  }

  // 4. 分类推荐
  return {
    topHerbs: topHerbs.slice(0, 3), // 前3个最推荐
    secondaryHerbs: [...topHerbs.slice(3, 5), ...secondaryMatches.slice(0, 2)], // 次要推荐
    cautionHerbs: topHerbs.filter(herb => 
      herb.safetyRating === 'caution' || herb.interactionWarning
    ),
    lifestyleAdvice: getLifestyleAdvice(primaryConstitution)
  };
}

// 📋 生活方式建议
function getLifestyleAdvice(constitution: ConstitutionType): string[] {
  const adviceMap: Record<ConstitutionType, string[]> = {
    "气虚": [
      "Get 7-8 hours of sleep nightly",
      "Eat warm, cooked meals (avoid raw/cold foods)",
      "Practice gentle exercise like walking or tai chi",
      "Avoid overexertion and chronic stress"
    ],
    "阳虚": [
      "Keep your body warm, especially lower back and feet",
      "Drink warm beverages throughout the day",
      "Use heating pads or warm baths for comfort",
      "Eat warming foods like ginger, cinnamon, lamb"
    ],
    "阴虚": [
      "Prioritize sleep hygiene (cool, dark room)",
      "Practice stress-reduction techniques (meditation, yoga)",
      "Stay hydrated with room-temperature water",
      "Avoid spicy, fried, and heating foods"
    ],
    "痰湿": [
      "Increase physical activity (30+ min daily)",
      "Reduce sugar, dairy, and processed foods",
      "Eat smaller, more frequent meals",
      "Stay in dry environments, use dehumidifier if needed"
    ],
    "湿热": [
      "Eat cooling foods (cucumber, watermelon, mung beans)",
      "Avoid alcohol, spicy, and greasy foods",
      "Exercise regularly to promote sweating and detox",
      "Manage stress and practice anger management"
    ],
    "血瘀": [
      "Engage in regular cardiovascular exercise",
      "Avoid prolonged sitting or standing",
      "Consider massage or acupuncture",
      "Eat circulation-promoting foods (berries, dark chocolate)"
    ],
    "气郁": [
      "Practice daily stress-relief (journaling, therapy, hobbies)",
      "Social connection and community involvement",
      "Aerobic exercise to release endorphins",
      "Spend time in nature and sunlight"
    ],
    "特禀": [
      "Identify and avoid personal allergens",
      "Keep living spaces clean and allergen-free",
      "Consider allergy testing",
      "Build immune strength gradually"
    ],
    "脾虚": [
      "Eat smaller, frequent meals (5-6 times daily)",
      "Chew food thoroughly",
      "Avoid mental work immediately after eating",
      "Choose easily digestible foods (soups, stews)"
    ],
    "平和": [
      "Maintain balanced lifestyle and nutrition",
      "Continue regular exercise routine",
      "Practice stress management",
      "Get adequate sleep (7-8 hours)"
    ]
  };

  return adviceMap[constitution] || adviceMap["平和"];
}

// 🔍 按症状查找草药
export function findHerbsBySymptom(symptom: string): HerbRecommendation[] {
  const normalizedSymptom = symptom.toLowerCase();
  
  return herbDatabase.filter(herb =>
    herb.commonIssues.some(issue => 
      issue.toLowerCase().includes(normalizedSymptom)
    )
  ).sort((a, b) => b.confidenceScore - a.confidenceScore);
}

// ⚠️ 安全性检查
export interface SafetyCheck {
  isSafe: boolean;
  warnings: string[];
  suggestions: string[];
}

export function checkHerbSafety(
  herbs: HerbRecommendation[],
  userConditions?: string[] // 用户的健康状况（如"diabetes", "high blood pressure"）
): SafetyCheck {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  // 检查药物相互作用
  const herbsWithWarnings = herbs.filter(h => h.interactionWarning);
  if (herbsWithWarnings.length > 0) {
    herbsWithWarnings.forEach(herb => {
      warnings.push(`${herb.name}: ${herb.interactionWarning}`);
    });
  }

  // 检查是否有多个需谨慎的草药
  const cautionHerbs = herbs.filter(h => h.safetyRating === 'caution');
  if (cautionHerbs.length > 1) {
    warnings.push("You're considering multiple herbs requiring extra caution. Consult a healthcare provider before combining them.");
  }

  // 给出建议
  suggestions.push("Start with one herb at a time to observe your body's response");
  suggestions.push("Always inform your doctor about any supplements you're taking");
  suggestions.push("Purchase herbs from reputable, third-party tested brands");
  
  if (userConditions && userConditions.length > 0) {
    suggestions.push("Given your health conditions, please consult your doctor before starting any new supplements");
  }

  return {
    isSafe: warnings.length === 0,
    warnings,
    suggestions
  };
}

