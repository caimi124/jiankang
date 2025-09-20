// 中医体质测试题库 - 基于《中国居民中医体质分类与判定标准》
// 9种体质类型：平和、气虚、阳虚、阴虚、痰湿、湿热、血瘀、气郁、特禀

export type ConstitutionType = '平和' | '气虚' | '阳虚' | '阴虚' | '痰湿' | '湿热' | '血瘀' | '气郁' | '特禀';

export interface Question {
  id: number;
  text: string;
  category: string;
  affects: Partial<Record<ConstitutionType, number>>;
}

// 🧪 TCM Constitution Test - Western Version (20 Questions)
// Based on official Chinese Medicine Constitution Classification Standards
// Optimized for Western users with lifestyle-focused questions

export const questions: Question[] = [
  // 🌿 Energy & Vitality (4 questions)
  {
    id: 1,
    category: "Energy & Vitality",
    text: "Do you often feel tired or lack energy, even after adequate rest?",
    affects: { "气虚": 5 },
  },
  {
    id: 2,
    category: "Energy & Vitality",
    text: "Do you often feel cold, especially in your hands and feet?",
    affects: { "阳虚": 5 },
  },
  {
    id: 3,
    category: "Energy & Vitality",
    text: "Do you sweat easily, even without exercise or in cool weather?",
    affects: { "阴虚": 3, "气虚": 2 },
  },
  {
    id: 4,
    category: "Energy & Vitality",
    text: "Do you recover slowly after exercise, feeling heavy or uncomfortable?",
    affects: { "痰湿": 5 },
  },

  // 🥗 Digestion & Appetite (4 questions)
  {
    id: 5,
    category: "Digestion & Appetite",
    text: "Do you often experience stomach bloating or discomfort, especially after eating?",
    affects: { "痰湿": 4, "气虚": 2 },
  },
  {
    id: 6,
    category: "Digestion & Appetite",
    text: "Do you have poor appetite or frequent indigestion?",
    affects: { "气虚": 5 },
  },
  {
    id: 7,
    category: "Digestion & Appetite",
    text: "Do you experience constipation or diarrhea, with irregular bowel movements?",
    affects: { "阳虚": 4, "湿热": 2 },
  },
  {
    id: 8,
    category: "Digestion & Appetite",
    text: "Do you often crave oily foods or sweets?",
    affects: { "痰湿": 5 },
  },

  // 😴 Sleep & Emotions (4 questions)
  {
    id: 9,
    category: "Sleep & Emotions",
    text: "Do you often have trouble falling asleep or poor sleep quality, waking up frequently?",
    affects: { "阴虚": 5 },
  },
  {
    id: 10,
    category: "Sleep & Emotions",
    text: "Do you often dream a lot, or sleep lightly, waking up tired in the morning?",
    affects: { "阴虚": 4, "气郁": 2 },
  },
  {
    id: 11,
    category: "Sleep & Emotions",
    text: "Do you often feel anxious, tense, or have significant mood swings?",
    affects: { "气郁": 5 },
  },
  {
    id: 12,
    category: "Sleep & Emotions",
    text: "Do you easily feel depressed or have low moods?",
    affects: { "气郁": 5 },
  },

  // 🩸 Skin & Appearance (4 questions)
  {
    id: 13,
    category: "Skin & Appearance",
    text: "Do you often experience dry skin, flaking, or itching?",
    affects: { "阴虚": 5 },
  },
  {
    id: 14,
    category: "Skin & Appearance",
    text: "Do you often have skin issues like eczema, acne, or other inflammatory skin problems?",
    affects: { "湿热": 5 },
  },
  {
    id: 15,
    category: "Skin & Appearance",
    text: "Do you bruise easily or have slow wound healing?",
    affects: { "血瘀": 5 },
  },
  {
    id: 16,
    category: "Skin & Appearance",
    text: "Do you have a pale complexion, or pale lip color?",
    affects: { "气虚": 4, "血瘀": 2 },
  },

  // 💧 Immunity & Allergies (4 questions)
  {
    id: 17,
    category: "Immunity & Allergies",
    text: "Do you catch colds frequently, or are you sensitive to seasonal changes, getting sick easily?",
    affects: { "气虚": 5 },
  },
  {
    id: 18,
    category: "Immunity & Allergies",
    text: "Do you have allergic reactions to certain foods, pollen, or environmental factors?",
    affects: { "特禀": 5 },
  },
  {
    id: 19,
    category: "Immunity & Allergies",
    text: "Do you often experience swelling, especially in your legs or around your eyes?",
    affects: { "痰湿": 5 },
  },
  {
    id: 20,
    category: "Immunity & Allergies",
    text: "Are you sensitive to cold or damp weather, feeling uncomfortable easily?",
    affects: { "阳虚": 5, "痰湿": 2 },
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
    icon: "🌿"
  },
  "气虚": {
    id: "气虚",
    name: "气虚体质",
    englishName: "Qi Deficiency Constitution",
    keywords: ["low energy", "frequent colds", "excessive sweating"],
    description: "Your Qi Deficiency constitution indicates insufficient energy and weakened organ function, particularly affecting immunity and digestion.",
    modernInterpretation: "Low basal metabolism, weakened immune system, chronic fatigue syndrome tendencies.",
    characteristics: [
      "Frequent fatigue and low energy levels",
      "Prone to colds and infections",
      "Shortness of breath, weak voice, poor digestion",
      "Sweating easily with minimal activity"
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
    icon: "💨"
  },
  "阳虚": {
    id: "阳虚",
    name: "阳虚体质",
    englishName: "Yang Deficiency Constitution",
    keywords: ["cold sensitivity", "cold hands/feet", "frequent urination"],
    description: "Your Yang Deficiency constitution indicates insufficient warming energy, weak metabolic function, and poor circulation.",
    modernInterpretation: "Low basal metabolism, poor circulation, weak temperature regulation and thyroid function.",
    characteristics: [
      "Cold sensitivity, especially in hands and feet",
      "Frequent diarrhea or nighttime urination",
      "Low energy, preference for quiet activities",
      "Pale complexion and slow pulse"
    ],
    lifestyleAdvice: [
      "Stay warm and avoid cold environments",
      "Moderate warming exercise to boost energy",
      "Warm baths, heating pads for circulation"
    ],
    dietaryRecommendations: {
      include: ["warm foods", "ginger tea", "cinnamon", "lamb", "warming spices"],
      avoid: ["cold raw foods", "ice drinks", "cold fruits"]
    },
    recommendedHerbs: ["Dried Ginger", "Cinnamon", "Aconite", "Deer Antler"],
    warnings: ["Avoid cold environments", "Keep abdomen warm"],
    color: "orange",
    icon: "🔥"
  },
  "阴虚": {
    id: "阴虚",
    name: "阴虚体质",
    englishName: "Yin Deficiency Constitution",
    keywords: ["dry mouth", "restlessness", "insomnia"],
    description: "Your Yin Deficiency constitution indicates insufficient body fluids, leading to dryness, restlessness, and sleep issues.",
    modernInterpretation: "Hormonal imbalance, overactive nervous system, tendency toward inflammation and stress.",
    characteristics: [
      "Dry mouth and throat, increased thirst",
      "Night sweats, restlessness, frequent waking",
      "Hot hands and feet, facial flushing",
      "Constipation and concentrated urine"
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
    icon: "💧"
  },
  "痰湿": {
    id: "痰湿",
    name: "痰湿体质",
    englishName: "Phlegm-Dampness Constitution",
    keywords: ["overweight", "sluggish", "excess mucus"],
    description: "Your Phlegm-Dampness constitution indicates poor fluid metabolism, tendency toward weight gain and mucus accumulation.",
    modernInterpretation: "Slow metabolism, abnormal lipid metabolism, tendency toward obesity and water retention.",
    characteristics: [
      "Overweight body type with soft abdomen",
      "Easy to feel drowsy, heavy-headed feeling",
      "Excess phlegm and chest congestion",
      "Thick tongue coating, sticky mouth feeling"
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
    icon: "🌫️"
  },
  "湿热": {
    id: "湿热",
    name: "湿热体质",
    englishName: "Damp-Heat Constitution",
    keywords: ["bitter taste", "acne", "sticky stools"],
    description: "Your Damp-Heat constitution indicates both dampness and heat in the body, leading to bitter taste, acne, and sticky bowel movements.",
    modernInterpretation: "Active inflammatory response, overburdened detox function, prone to skin and digestive issues.",
    characteristics: [
      "Oily facial skin prone to acne breakouts",
      "Bitter taste in mouth, bad breath",
      "Sticky bowel movements, dark yellow urine",
      "Irritable mood, heavy body feeling"
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
    icon: "🌶️"
  },
  "血瘀": {
    id: "血瘀",
    name: "血瘀体质",
    englishName: "Blood Stasis Constitution",
    keywords: ["dark complexion", "menstrual pain", "sharp pains"],
    description: "Your Blood Stasis constitution indicates poor blood circulation, leading to dark complexion and various pain symptoms.",
    modernInterpretation: "Microcirculation disorders, high blood viscosity, increased risk of clot formation.",
    characteristics: [
      "Dark complexion with age spots or pigmentation",
      "Easy bruising from minor bumps",
      "Dark menstrual blood with clots (for women)",
      "Sharp or stabbing pains in specific body areas"
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
    icon: "🩸"
  },
  "气郁": {
    id: "气郁",
    name: "气郁体质",
    englishName: "Qi Stagnation Constitution",
    keywords: ["mood swings", "frequent sighing", "stress"],
    description: "Your Qi Stagnation constitution indicates blocked energy flow, leading to mood issues and chest tightness.",
    modernInterpretation: "High stress levels, autonomic nervous system dysfunction, tendency toward depression and anxiety.",
    characteristics: [
      "Mood swings and tendency toward depression",
      "Chest tightness with frequent sighing",
      "Throat tightness or lump feeling",
      "Irregular menstruation (for women)"
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
    icon: "😔"
  },
  "特禀": {
    id: "特禀",
    name: "特禀体质",
    englishName: "Special Constitution",
    keywords: ["allergies", "asthma", "genetic sensitivities"],
    description: "Your Special constitution indicates inherited sensitivities or genetic predispositions, making you prone to allergic reactions.",
    modernInterpretation: "Abnormal immune system response, genetic predisposition to allergies and autoimmune conditions.",
    characteristics: [
      "Prone to allergic rhinitis and asthma",
      "Skin easily develops allergic rashes",
      "Allergic to certain foods or medications",
      "Family history of genetic conditions"
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
    icon: "⚠️"
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

// 🧮 Improved Constitution Calculation Algorithm
// Uses weighted scoring system based on question relevance

export interface ScoreMap {
  [key: string]: number;
}

export function calculateConstitution(answers: number[]): {
  primary: ConstitutionType;
  secondary?: ConstitutionType;
  scores: ScoreMap;
  isBalanced: boolean;
} {
  try {
    // Input validation
    if (!answers || !Array.isArray(answers)) {
      throw new Error('Invalid answers array');
    }

    const scores: ScoreMap = {
      "平和": 0, "气虚": 0, "阳虚": 0, "阴虚": 0,
      "痰湿": 0, "湿热": 0, "血瘀": 0, "气郁": 0, "特禀": 0
    };

  // Calculate constitution scores - only valid answers (1-5)
  questions.forEach((question, index) => {
    const answer = answers[index];
    // Only process valid answers, ignore unanswered questions (0)
    if (answer >= 1 && answer <= 5) {
      Object.entries(question.affects).forEach(([type, weight]) => {
        scores[type] = (scores[type] || 0) + answer * weight;
      });
    }
  });

  // Check valid answer count
  const validAnswerCount = answers.filter(answer => answer >= 1 && answer <= 5).length;
  const minRequiredAnswers = Math.max(6, Math.floor(questions.length * 0.3)); // At least 30% of questions

  // If too few questions answered, provide default result
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

  // Sort scores
  const sortedScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, score]) => score > 0);

  // Handle case with no positive scores, default to balanced
  const [primaryType, primaryScore] = sortedScores[0] || ['平和', 0];
  const [secondaryType, secondaryScore] = sortedScores[1] || ['', 0];

  // Determination logic
  const isBalanced = primaryType === '平和' && primaryScore >= 50 &&
    sortedScores.slice(1).every(([_, score]) => score < 25);

  const hasSecondary = secondaryScore >= 30 && secondaryType !== '平和';

    // Final validation - check if it's a valid constitution type
    const validTypes: ConstitutionType[] = ['平和', '气虚', '阳虚', '阴虚', '痰湿', '湿热', '血瘀', '气郁', '特禀'];
    const finalPrimaryType = primaryType as ConstitutionType;
    if (!validTypes.includes(finalPrimaryType)) {
      throw new Error(`Invalid constitution type: ${primaryType}`);
    }

    return {
      primary: finalPrimaryType,
      secondary: hasSecondary ? secondaryType as ConstitutionType : undefined,
      scores,
      isBalanced
    };
  } catch (error) {
    console.error('Error in calculateConstitution:', error);
    // Return safe default
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
} 