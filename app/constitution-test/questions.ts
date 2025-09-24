// 中医体质测试题库 - 35题完整版
// 10种体质类型：平和、气虚、阳虚、阴虚、痰湿、湿热、血瘀、气郁、特禀、脾虚
// 基于《中国居民中医体质分类与判定标准》优化版

export type ConstitutionType = '平和' | '气虚' | '阳虚' | '阴虚' | '痰湿' | '湿热' | '血瘀' | '气郁' | '特禀' | '脾虚';

export interface Question {
  id: number;
  text: string;
  category: string;
  affects: ConstitutionType;
}

// 🧪 TCM Constitution Test - 35 Questions Complete Version
// Based on official Chinese Medicine Constitution Classification Standards
// Optimized for Western users with lifestyle-focused questions

export const questions: Question[] = [
  // 气虚体质 (Qi Deficiency) - Questions 1-4
  {
    id: 1,
    category: "Energy & Vitality",
    text: "Do you often feel tired or lack energy?",
    affects: "气虚",
  },
  {
    id: 2,
    category: "Immunity",
    text: "Do you frequently catch colds or get sick easily?",
    affects: "气虚",
  },
  {
    id: 3,
    category: "Appearance",
    text: "Is your face usually pale compared to others?",
    affects: "气虚",
  },
  {
    id: 4,
    category: "Physical Capacity",
    text: "Do you experience shortness of breath during mild activity?",
    affects: "气虚",
  },

  // 阳虚体质 (Yang Deficiency) - Questions 5-8
  {
    id: 5,
    category: "Temperature Regulation",
    text: "Do you often feel cold in your hands and feet?",
    affects: "阳虚",
  },
  {
    id: 6,
    category: "Environmental Sensitivity",
    text: "Do you dislike cold weather and prefer warmth?",
    affects: "阳虚",
  },
  {
    id: 7,
    category: "Digestion",
    text: "Do you get diarrhea or loose stools after eating cold/raw foods?",
    affects: "阳虚",
  },
  {
    id: 8,
    category: "Physical Strength",
    text: "Do you feel sore or weak in your lower back and knees?",
    affects: "阳虚",
  },

  // 阴虚体质 (Yin Deficiency) - Questions 9-12
  {
    id: 9,
    category: "Temperature & Night Symptoms",
    text: "Do you often feel warm at night or sweat easily without activity?",
    affects: "阴虚",
  },
  {
    id: 10,
    category: "Sleep Quality",
    text: "Do you have trouble falling asleep or wake up frequently?",
    affects: "阴虚",
  },
  {
    id: 11,
    category: "Hydration",
    text: "Do you often feel thirsty and prefer cool drinks?",
    affects: "阴虚",
  },
  {
    id: 12,
    category: "Skin & Dryness",
    text: "Is your skin dry or prone to fine lines and itching?",
    affects: "阴虚",
  },

  // 痰湿体质 (Phlegm-Dampness) - Questions 13-16
  {
    id: 13,
    category: "Body Weight & Heaviness",
    text: "Do you feel heavy in your body, like carrying extra weight?",
    affects: "痰湿",
  },
  {
    id: 14,
    category: "Digestive Discomfort",
    text: "Do you experience bloating or fullness after meals?",
    affects: "痰湿",
  },
  {
    id: 15,
    category: "Food Cravings",
    text: "Do you crave or eat a lot of oily/sweet foods?",
    affects: "痰湿",
  },
  {
    id: 16,
    category: "Mucus & Congestion",
    text: "Do you have excess mucus, phlegm, or nasal congestion?",
    affects: "痰湿",
  },

  // 气郁体质 (Qi Stagnation) - Questions 17-20
  {
    id: 17,
    category: "Emotional State",
    text: "Do you often feel upset, anxious, or depressed?",
    affects: "气郁",
  },
  {
    id: 18,
    category: "Stress Response",
    text: "Do you get a \"lump in the throat\" feeling when stressed?",
    affects: "气郁",
  },
  {
    id: 19,
    category: "Respiratory & Emotional",
    text: "Do you sigh frequently or feel chest tightness?",
    affects: "气郁",
  },
  {
    id: 20,
    category: "Mood Stability",
    text: "Do you have mood swings that come and go easily?",
    affects: "气郁",
  },

  // 血瘀体质 (Blood Stasis) - Questions 21-24
  {
    id: 21,
    category: "Circulation & Bruising",
    text: "Do you bruise easily or have dark spots under your skin?",
    affects: "血瘀",
  },
  {
    id: 22,
    category: "Pain Patterns",
    text: "Do you have sharp or fixed pain in certain areas?",
    affects: "血瘀",
  },
  {
    id: 23,
    category: "Physical Appearance",
    text: "Do you have dark lips, gums, or purple tongue color?",
    affects: "血瘀",
  },
  {
    id: 24,
    category: "Reproductive Health",
    text: "Do you experience irregular or painful menstruation (if applicable)?",
    affects: "血瘀",
  },

  // 湿热体质 (Damp-Heat) - Questions 25-28
  {
    id: 25,
    category: "Skin Issues",
    text: "Do you have oily skin, pimples, or acne breakouts?",
    affects: "湿热",
  },
  {
    id: 26,
    category: "Temperature Preference",
    text: "Do you feel thirsty and prefer cold drinks, especially in summer?",
    affects: "湿热",
  },
  {
    id: 27,
    category: "Oral Symptoms",
    text: "Do you often have a bitter taste in your mouth or bad breath?",
    affects: "湿热",
  },
  {
    id: 28,
    category: "Body Signs",
    text: "Do you have a tendency for yellowish skin/eyes or body odor?",
    affects: "湿热",
  },

  // 特禀体质 (Special Constitution) - Questions 29-31
  {
    id: 29,
    category: "Allergic Reactions",
    text: "Do you have allergies (skin rash, asthma, sneezing)?",
    affects: "特禀",
  },
  {
    id: 30,
    category: "Skin Sensitivity",
    text: "Do you get itchy skin, eczema, or hives easily?",
    affects: "特禀",
  },
  {
    id: 31,
    category: "Food & Environmental Sensitivity",
    text: "Do you have food intolerances or seasonal allergies?",
    affects: "特禀",
  },

  // 脾虚体质 (Spleen Deficiency) - Questions 32-35
  {
    id: 32,
    category: "Digestive Function",
    text: "Do you often feel weak digestion (loss of appetite, loose stools)?",
    affects: "脾虚",
  },
  {
    id: 33,
    category: "Post-Meal Energy",
    text: "Do you get tired easily after meals?",
    affects: "脾虚",
  },
  {
    id: 34,
    category: "Fluid Retention",
    text: "Do you notice puffiness or swelling around the eyes or limbs?",
    affects: "脾虚",
  },
  {
    id: 35,
    category: "Energy Transformation",
    text: "Do you feel your body lacks strength to \"transform food into energy\"?",
    affects: "脾虚",
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
  maxScore: number; // Maximum possible score for this constitution type
}

export const constitutionInfo: Record<ConstitutionType, ConstitutionInfo> = {
  "平和": {
    id: "平和",
    name: "平和体质",
    englishName: "Balanced Constitution",
    keywords: ["optimal health", "high energy", "good appetite"],
    description: "Congratulations! You have a balanced constitution, indicating excellent overall health with high energy and strong adaptability.",
    modernInterpretation: "Normal metabolism, strong immune system, balanced hormones - your body functions optimally.",
    characteristics: [
      "High energy levels with positive mood",
      "Good appetite and healthy digestion",
      "Stable sleep patterns and strong immunity",
      "Excellent adaptation to environmental changes"
    ],
    lifestyleAdvice: [
      "Maintain regular sleep schedule and balanced nutrition",
      "Moderate exercise: walking, yoga, swimming",
      "Stay mindful during seasonal changes to prevent imbalance"
    ],
    dietaryRecommendations: {
      include: ["balanced nutrition", "seasonal foods", "whole grains", "fresh vegetables"],
      avoid: ["excessive eating", "extreme diets", "too much processed food"]
    },
    recommendedHerbs: ["Codonopsis", "Goji Berry", "Astragalus"],
    warnings: [],
    color: "green",
    icon: "🌿",
    maxScore: 0
  },
  "气虚": {
    id: "气虚",
    name: "气虚体质",
    englishName: "Qi Deficiency Constitution",
    keywords: ["low energy", "frequent colds", "shortness of breath"],
    description: "Your Qi Deficiency constitution indicates insufficient energy and weakened organ function, particularly affecting immunity and digestion.",
    modernInterpretation: "Low basal metabolism, weakened immune system, chronic fatigue syndrome tendencies.",
    characteristics: [
      "Frequent fatigue and low energy levels",
      "Prone to colds and infections",
      "Shortness of breath, weak voice, poor digestion",
      "Pale complexion and quiet personality"
    ],
    lifestyleAdvice: [
      "Avoid overexertion and ensure adequate rest",
      "Gentle exercise: tai chi, qigong, light yoga",
      "Regular sleep schedule, avoid staying up late"
    ],
    dietaryRecommendations: {
      include: ["warm cooked foods", "energy-boosting foods", "oats", "sweet potato", "chicken soup"],
      avoid: ["raw cold foods", "excessive dieting", "spicy stimulating foods"]
    },
    recommendedHerbs: ["Astragalus", "Codonopsis", "Ginseng", "White Atractylodes"],
    warnings: ["Avoid intense exercise", "Stay warm and avoid drafts"],
    color: "yellow",
    icon: "💨",
    maxScore: 20
  },
  "阳虚": {
    id: "阳虚",
    name: "阳虚体质",
    englishName: "Yang Deficiency Constitution",
    keywords: ["cold sensitivity", "cold hands/feet", "loose stools"],
    description: "Your Yang Deficiency constitution indicates insufficient warming energy, weak metabolic function, and poor circulation.",
    modernInterpretation: "Low basal metabolism, poor circulation, weak temperature regulation and thyroid function.",
    characteristics: [
      "Cold sensitivity, especially in hands and feet",
      "Frequent diarrhea after eating cold foods",
      "Low energy, preference for quiet activities",
      "Sore lower back and knees"
    ],
    lifestyleAdvice: [
      "Stay warm and avoid cold environments",
      "Moderate warming exercise to boost circulation",
      "Warm baths, heating pads for comfort"
    ],
    dietaryRecommendations: {
      include: ["warm foods", "ginger tea", "cinnamon", "lamb", "warming spices"],
      avoid: ["cold raw foods", "ice drinks", "cold fruits"]
    },
    recommendedHerbs: ["Dried Ginger", "Cinnamon", "Aconite", "Deer Antler"],
    warnings: ["Avoid cold environments", "Keep abdomen warm"],
    color: "orange",
    icon: "🔥",
    maxScore: 20
  },
  "阴虚": {
    id: "阴虚",
    name: "阴虚体质",
    englishName: "Yin Deficiency Constitution",
    keywords: ["night sweats", "insomnia", "dry skin", "thirsty"],
    description: "Your Yin Deficiency constitution indicates insufficient body fluids, leading to dryness, restlessness, and sleep issues.",
    modernInterpretation: "Hormonal imbalance, overactive nervous system, tendency toward inflammation and stress.",
    characteristics: [
      "Night sweats and feeling warm without activity",
      "Trouble falling asleep, frequent waking",
      "Often thirsty, prefer cool drinks",
      "Dry skin prone to fine lines and itching"
    ],
    lifestyleAdvice: [
      "Avoid staying up late, ensure adequate sleep",
      "Stress management and relaxation techniques",
      "Take afternoon naps, avoid mental overwork"
    ],
    dietaryRecommendations: {
      include: ["moistening foods", "pears", "white fungus", "lily bulbs", "honey"],
      avoid: ["spicy hot foods", "alcohol", "fried foods", "caffeine"]
    },
    recommendedHerbs: ["Ophiopogon", "Adenophora", "Solomon's Seal", "Lily Bulb"],
    warnings: ["Avoid overwork", "Manage emotional stress"],
    color: "blue",
    icon: "💧",
    maxScore: 20
  },
  "痰湿": {
    id: "痰湿",
    name: "痰湿体质",
    englishName: "Phlegm-Dampness Constitution",
    keywords: ["heavy body", "bloating", "mucus", "sweet cravings"],
    description: "Your Phlegm-Dampness constitution indicates poor fluid metabolism, tendency toward weight gain and mucus accumulation.",
    modernInterpretation: "Slow metabolism, abnormal lipid metabolism, tendency toward obesity and water retention.",
    characteristics: [
      "Heavy body feeling, like carrying extra weight",
      "Bloating or fullness after meals",
      "Craving oily and sweet foods",
      "Excess mucus, phlegm, or nasal congestion"
    ],
    lifestyleAdvice: [
      "Increase exercise and maintain healthy weight",
      "Stay in dry environments, avoid humidity",
      "Regular schedule, avoid prolonged sitting"
    ],
    dietaryRecommendations: {
      include: ["light low-fat foods", "winter melon", "barley", "adzuki beans", "poria"],
      avoid: ["oily sweet foods", "cold raw foods", "alcohol", "dairy products"]
    },
    recommendedHerbs: ["Tangerine Peel", "Pinellia", "Poria", "Job's Tears"],
    warnings: ["Control diet portions", "Avoid excessive supplementation"],
    color: "brown",
    icon: "🌫️",
    maxScore: 20
  },
  "湿热": {
    id: "湿热",
    name: "湿热体质",
    englishName: "Damp-Heat Constitution",
    keywords: ["oily skin", "bitter taste", "acne", "body odor"],
    description: "Your Damp-Heat constitution indicates both dampness and heat in the body, leading to skin issues, bitter taste, and inflammatory symptoms.",
    modernInterpretation: "Active inflammatory response, overburdened detox function, prone to skin and digestive issues.",
    characteristics: [
      "Oily skin, pimples, or acne breakouts",
      "Thirsty, prefer cold drinks especially in summer",
      "Bitter taste in mouth or bad breath",
      "Tendency for yellowish skin/eyes or body odor"
    ],
    lifestyleAdvice: [
      "Clear heat and drain dampness, avoid stuffy environments",
      "Moderate exercise to sweat and detoxify",
      "Maintain calm and positive mood"
    ],
    dietaryRecommendations: {
      include: ["cooling detox foods", "mung beans", "bitter melon", "celery", "cucumber"],
      avoid: ["spicy oily foods", "alcohol", "sweet sticky foods", "fried foods"]
    },
    recommendedHerbs: ["Coptis", "Gardenia", "Gentian", "Plantain Seed"],
    warnings: ["Avoid heating foods", "Manage stress and anger"],
    color: "red",
    icon: "🌶️",
    maxScore: 20
  },
  "血瘀": {
    id: "血瘀",
    name: "血瘀体质",
    englishName: "Blood Stasis Constitution",
    keywords: ["easy bruising", "sharp pain", "dark lips", "irregular periods"],
    description: "Your Blood Stasis constitution indicates poor blood circulation, leading to bruising, pain, and circulation-related symptoms.",
    modernInterpretation: "Microcirculation disorders, high blood viscosity, increased risk of clot formation.",
    characteristics: [
      "Bruise easily or have dark spots under skin",
      "Sharp or fixed pain in certain areas",
      "Dark lips, gums, or purple tongue color",
      "Irregular or painful menstruation (if applicable)"
    ],
    lifestyleAdvice: [
      "Regular exercise to promote blood circulation",
      "Avoid prolonged sitting or standing",
      "Maintain positive and cheerful mood"
    ],
    dietaryRecommendations: {
      include: ["circulation-promoting foods", "black fungus", "hawthorn", "turmeric", "cherries"],
      avoid: ["cold foods", "fatty foods", "excessive salt"]
    },
    recommendedHerbs: ["Angelica", "Ligusticum", "Safflower", "Peach Kernel"],
    warnings: ["Avoid trauma", "Regular health checkups"],
    color: "purple",
    icon: "🩸",
    maxScore: 20
  },
  "气郁": {
    id: "气郁",
    name: "气郁体质",
    englishName: "Qi Stagnation Constitution",
    keywords: ["mood swings", "anxiety", "chest tightness", "sighing"],
    description: "Your Qi Stagnation constitution indicates blocked energy flow, leading to emotional issues, stress, and mood-related symptoms.",
    modernInterpretation: "High stress levels, autonomic nervous system dysfunction, tendency toward depression and anxiety.",
    characteristics: [
      "Often feel upset, anxious, or depressed",
      "\"Lump in throat\" feeling when stressed",
      "Frequent sighing or chest tightness",
      "Mood swings that come and go easily"
    ],
    lifestyleAdvice: [
      "Psychological counseling and stress release",
      "Develop hobbies and creative outlets",
      "Social activities, avoid isolation"
    ],
    dietaryRecommendations: {
      include: ["mood-regulating foods", "rose tea", "citrus fruits", "fennel", "mint"],
      avoid: ["excessive alcohol", "spicy stimulating foods", "caffeine before bed"]
    },
    recommendedHerbs: ["Bupleurum", "Cyperus", "Turmeric", "Rose Petals"],
    warnings: ["Avoid emotional triggers", "Seek psychological support when needed"],
    color: "gray",
    icon: "😔",
    maxScore: 20
  },
  "特禀": {
    id: "特禀",
    name: "特禀体质",
    englishName: "Special Constitution",
    keywords: ["allergies", "eczema", "food intolerances", "sensitive"],
    description: "Your Special constitution indicates inherited sensitivities or genetic predispositions, making you prone to allergic reactions and sensitivities.",
    modernInterpretation: "Abnormal immune system response, genetic predisposition to allergies and autoimmune conditions.",
    characteristics: [
      "Allergies (skin rash, asthma, sneezing)",
      "Itchy skin, eczema, or hives easily",
      "Food intolerances or seasonal allergies"
    ],
    lifestyleAdvice: [
      "Avoid known allergens and triggers",
      "Strengthen constitution with regular gentle exercise",
      "Maintain clean, allergen-free environment"
    ],
    dietaryRecommendations: {
      include: ["light nutritious foods", "immune-supporting foods", "organic produce"],
      avoid: ["known allergenic foods", "shellfish", "dairy", "common allergens"]
    },
    recommendedHerbs: ["Astragalus", "Saposhnikovia", "White Atractylodes", "Jade Screen Formula"],
    warnings: ["Avoid allergens", "Carry antihistamines", "Medical alert bracelet recommended"],
    color: "pink",
    icon: "⚠️",
    maxScore: 15
  },
  "脾虚": {
    id: "脾虚",
    name: "脾虚体质",
    englishName: "Spleen Deficiency Constitution",
    keywords: ["weak digestion", "tired after meals", "puffiness", "energy transformation"],
    description: "Your Spleen Deficiency constitution indicates weakened digestive function and poor energy transformation from food.",
    modernInterpretation: "Digestive system dysfunction, poor nutrient absorption, metabolic inefficiency.",
    characteristics: [
      "Weak digestion (loss of appetite, loose stools)",
      "Get tired easily after meals",
      "Puffiness or swelling around eyes or limbs",
      "Body lacks strength to transform food into energy"
    ],
    lifestyleAdvice: [
      "Eat smaller, frequent meals",
      "Gentle exercise before meals",
      "Avoid mental work immediately after eating"
    ],
    dietaryRecommendations: {
      include: ["easily digestible foods", "warm cooked grains", "sweet potato", "dates", "ginger"],
      avoid: ["raw cold foods", "excessive fluids with meals", "greasy foods"]
    },
    recommendedHerbs: ["White Atractylodes", "Poria", "Codonopsis", "Licorice"],
    warnings: ["Avoid overeating", "Don't skip meals"],
    color: "goldenrod",
    icon: "🌾",
    maxScore: 20
  }
};

// 📊 Likert 5-Point Scoring Scale (Western Version)
export const scoreOptions = [
  { value: 1, label: "Never", description: "This never applies to me" },
  { value: 2, label: "Rarely", description: "This rarely happens" },
  { value: 3, label: "Sometimes", description: "This sometimes occurs" },
  { value: 4, label: "Often", description: "This happens frequently" },
  { value: 5, label: "Always", description: "This almost always applies" },
];

// 🧮 Constitution Calculation Algorithm - 35 Questions Version
// Uses percentage-based scoring system for accurate results

export interface ScoreMap {
  [key: string]: number;
}

export function calculateConstitution(answers: number[]): {
  primary: ConstitutionType;
  secondary?: ConstitutionType;
  scores: ScoreMap;
  percentages: ScoreMap;
  isBalanced: boolean;
} {
  try {
    // Input validation
    if (!answers || !Array.isArray(answers)) {
      throw new Error('Invalid answers array');
    }

    // Initialize scores for each constitution type
    const scores: ScoreMap = {
      "平和": 0, "气虚": 0, "阳虚": 0, "阴虚": 0, "痰湿": 0,
      "湿热": 0, "血瘀": 0, "气郁": 0, "特禀": 0, "脾虚": 0
    };

    // Calculate raw scores
    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer >= 1 && answer <= 5) {
        scores[question.affects] = (scores[question.affects] || 0) + answer;
      }
    });

    // Calculate percentages based on max possible scores
    const percentages: ScoreMap = {};
    Object.entries(scores).forEach(([type, score]) => {
      const maxScore = constitutionInfo[type as ConstitutionType]?.maxScore || 20;
      if (maxScore > 0) {
        percentages[type] = (score / maxScore) * 100;
      } else {
        percentages[type] = 0;
      }
    });

    // Sort by percentage scores (excluding 平和)
    const sortedByPercentage = Object.entries(percentages)
      .filter(([type]) => type !== '平和')
      .sort((a, b) => b[1] - a[1]);

    const validAnswerCount = answers.filter(answer => answer >= 1 && answer <= 5).length;

    if (validAnswerCount < 10) {
      console.warn(`Too few answers: ${validAnswerCount}/35`);
    }

    // Determine primary constitution
    let primaryType: ConstitutionType;
    let secondaryType: ConstitutionType | undefined;

    // Check if balanced (all percentages are low)
    const maxPercentage = sortedByPercentage[0]?.[1] || 0;
    const averageAnswerScore = answers.filter(a => a >= 1 && a <= 5)
      .reduce((sum, a) => sum + a, 0) / validAnswerCount;

    // Balanced constitution criteria: low average score and no dominant pattern
    const isBalanced = maxPercentage < 50 && averageAnswerScore < 2.5;

    if (isBalanced) {
      primaryType = '平和';
    } else {
      // Use the highest percentage constitution
      primaryType = sortedByPercentage[0][0] as ConstitutionType;

      // Check for secondary constitution (≥70% of primary and ≥40% absolute)
      if (sortedByPercentage.length > 1) {
        const secondaryPercentage = sortedByPercentage[1][1];
        const primaryPercentage = sortedByPercentage[0][1];

        if (secondaryPercentage >= primaryPercentage * 0.7 && secondaryPercentage >= 40) {
          secondaryType = sortedByPercentage[1][0] as ConstitutionType;
        }
      }
    }

    return {
      primary: primaryType,
      secondary: secondaryType,
      scores,
      percentages,
      isBalanced
    };

  } catch (error) {
    console.error('Error in calculateConstitution:', error);

    // Fallback calculation
    const fallbackScores: ScoreMap = {
      "平和": 0, "气虚": 0, "阳虚": 0, "阴虚": 0, "痰湿": 0,
      "湿热": 0, "血瘀": 0, "气郁": 0, "特禀": 0, "脾虚": 0
    };

    return {
      primary: '气虚',
      secondary: undefined,
      scores: fallbackScores,
      percentages: fallbackScores,
      isBalanced: false
    };
  }
}