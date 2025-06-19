// Simplified herb recommendation system for HerbScience.shop

// Herb interface matching our Notion database structure
export interface Herb {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  composition: string[];
  dosage: string;
  efficacy: string[];
  usage: string;
  safetyLevel: 'high' | 'medium' | 'low';
  precautions: string;
  tcmConstitution: string;
  caseStudy?: string;
  createdDate?: string;
}

// Constitution type mapping for herb recommendations
export const CONSTITUTION_HERB_MAPPING = {
  fire: {
    primaryConstitutions: ['平和质', '气虚质'],
    secondaryConstitutions: ['阳虚质', '血瘀质'],
    preferredEfficacy: ['镇静安神', '清热解毒', '情绪管理', '抗炎作用'],
    avoidEfficacy: ['能量提升'],
    safetyPreference: ['high', 'medium']
  },
  earth: {
    primaryConstitutions: ['平和质', '气虚质', '痰湿质'],
    secondaryConstitutions: ['阳虚质'],
    preferredEfficacy: ['消化健康', '健脾胃', '免疫支持', '补气养血'],
    avoidEfficacy: [],
    safetyPreference: ['high', 'medium']
  },
  metal: {
    primaryConstitutions: ['平和质', '阴虚质'],
    secondaryConstitutions: ['气虚质'],
    preferredEfficacy: ['呼吸系统', '止咳化痰', '抗病毒', '解毒支持'],
    avoidEfficacy: [],
    safetyPreference: ['high', 'medium']
  },
  water: {
    primaryConstitutions: ['平和质', '阴虚质', '阳虚质'],
    secondaryConstitutions: ['气虚质'],
    preferredEfficacy: ['滋阴补肾', '肝脏健康', '益肝明目', '情绪管理'],
    avoidEfficacy: ['能量提升'],
    safetyPreference: ['high', 'medium']
  },
  wood: {
    primaryConstitutions: ['平和质', '气郁质', '血瘀质'],
    secondaryConstitutions: ['湿热质'],
    preferredEfficacy: ['活血化瘀', '祛风湿', '肝脏健康', '解毒支持'],
    avoidEfficacy: [],
    safetyPreference: ['high', 'medium']
  }
};

// Mock herb database for demonstration
const MOCK_HERBS: Herb[] = [
  {
    id: 'ginseng',
    name: 'Ginseng',
    chineseName: '人参',
    description: '补气养血，增强免疫力的传统草药',
    composition: ['人参皂苷', '多糖', '氨基酸'],
    dosage: '每日 200-400mg',
    efficacy: ['免疫支持', '能量提升', '补气养血'],
    usage: '早餐后服用，避免晚上使用',
    safetyLevel: 'high',
    precautions: '孕妇慎用，高血压患者需谨慎',
    tcmConstitution: '平和质',
    caseStudy: '多项临床研究显示在提升免疫力方面有显著效果'
  },
  {
    id: 'echinacea',
    name: 'Echinacea',
    chineseName: '紫锥花',
    description: '增强免疫系统，预防感冒',
    composition: ['多酚类', '烷基酰胺', '多糖'],
    dosage: '每日 300-500mg',
    efficacy: ['免疫支持', '抗病毒', '呼吸系统'],
    usage: '感冒季节服用，连续使用不超过8周',
    safetyLevel: 'high',
    precautions: '自身免疫性疾病患者不宜使用',
    tcmConstitution: '平和质',
    caseStudy: '研究显示可缩短感冒持续时间'
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    chineseName: '姜黄',
    description: '强效天然抗炎剂，保护关节健康',
    composition: ['姜黄素', '挥发油', '姜黄酮'],
    dosage: '每日 500-1000mg',
    efficacy: ['抗炎作用', '关节健康', '消化健康'],
    usage: '餐后服用，与黑胡椒同服增强吸收',
    safetyLevel: 'high',
    precautions: '胆结石患者慎用',
    tcmConstitution: '痰湿质',
    caseStudy: '大量研究证实其抗炎功效'
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    chineseName: '南非醉茄',
    description: '适应原草药，帮助身体应对压力',
    composition: ['醉茄内酯', '生物碱', '皂苷'],
    dosage: '每日 300-600mg',
    efficacy: ['压力与焦虑', '睡眠支持', '情绪管理'],
    usage: '睡前服用效果最佳',
    safetyLevel: 'medium',
    precautions: '孕妇、哺乳期妇女禁用',
    tcmConstitution: '气虚质',
    caseStudy: '临床试验显示能显著降低皮质醇水平'
  },
  {
    id: 'milk-thistle',
    name: 'Milk Thistle',
    chineseName: '水飞蓟',
    description: '保护肝脏，促进肝脏解毒功能',
    composition: ['水飞蓟素', '黄酮类', '脂肪油'],
    dosage: '每日 200-400mg',
    efficacy: ['肝脏健康', '解毒支持'],
    usage: '空腹服用，建议分2-3次服用',
    safetyLevel: 'high',
    precautions: '对菊科植物过敏者慎用',
    tcmConstitution: '湿热质',
    caseStudy: '多项研究证实对肝脏保护作用'
  }
];

// Simplified herbs data service
export class HerbsDataService {
  private cache: Map<string, Herb[]> = new Map();
  private cacheExpiry: number = 5 * 60 * 1000; // 5 minutes
  private lastCacheUpdate: number = 0;

  // Fetch all herbs (mock implementation)
  async fetchAllHerbs(): Promise<Herb[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_HERBS;
    } catch (error) {
      console.error('Error fetching herbs:', error);
      return [];
    }
  }

  // Get personalized herb recommendations based on constitution
  async getRecommendationsForConstitution(
    constitutionType: string,
    preferredSafety: ('high' | 'medium' | 'low')[] = ['high', 'medium'],
    limit: number = 6
  ): Promise<Herb[]> {
    try {
      const allHerbs = await this.fetchAllHerbs();
      const mapping = CONSTITUTION_HERB_MAPPING[constitutionType as keyof typeof CONSTITUTION_HERB_MAPPING];
      
      if (!mapping) {
        return allHerbs.slice(0, limit);
      }

      // Score herbs based on constitution compatibility
      const scoredHerbs = allHerbs.map(herb => {
        let score = 0;

        // Constitution match scoring
        if (mapping.primaryConstitutions.includes(herb.tcmConstitution)) {
          score += 10;
        } else if (mapping.secondaryConstitutions.includes(herb.tcmConstitution)) {
          score += 5;
        }

        // Efficacy match scoring
        const herbEfficacy = herb.efficacy || [];
        const matchingEfficacy = herbEfficacy.filter(eff => 
          mapping.preferredEfficacy.includes(eff)
        );
        score += matchingEfficacy.length * 3;

        // Avoid negative efficacy (simplified)
        if (mapping.avoidEfficacy.length > 0) {
          score -= 2; // Simple penalty for avoid items
        }

        // Safety preference
        if (preferredSafety.includes(herb.safetyLevel)) {
          score += 2;
        }

        // Boost for high safety herbs
        if (herb.safetyLevel === 'high') {
          score += 1;
        }

        return { herb, score };
      });

      // Sort by score and return top recommendations
      return scoredHerbs
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.herb);

    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  // Search herbs by efficacy
  async searchHerbsByEfficacy(efficacyTypes: string[], limit: number = 10): Promise<Herb[]> {
    try {
      const allHerbs = await this.fetchAllHerbs();
      
      return allHerbs
        .filter(herb => 
          herb.efficacy.some(eff => efficacyTypes.includes(eff))
        )
        .slice(0, limit);
    } catch (error) {
      console.error('Error searching herbs by efficacy:', error);
      return [];
    }
  }

  // Search herbs by constitution
  async searchHerbsByConstitution(constitution: string, limit: number = 10): Promise<Herb[]> {
    try {
      const allHerbs = await this.fetchAllHerbs();
      
      return allHerbs
        .filter(herb => herb.tcmConstitution === constitution)
        .slice(0, limit);
    } catch (error) {
      console.error('Error searching herbs by constitution:', error);
      return [];
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
    this.lastCacheUpdate = 0;
  }
}

// Singleton instance
export const herbsDataService = new HerbsDataService();

// Recommendation engine
export class HerbRecommendationEngine {
  private dataService: HerbsDataService;

  constructor(dataService: HerbsDataService) {
    this.dataService = dataService;
  }

  // Generate comprehensive recommendations for constitution test results
  async generatePersonalizedRecommendations(
    primaryConstitution: string,
    secondaryConstitutions: string[] = [],
    healthGoals: string[] = [],
    safetyPreference: ('high' | 'medium' | 'low')[] = ['high', 'medium']
  ) {
    try {
      // Get primary recommendations
      const primaryRecommendations = await this.dataService.getRecommendationsForConstitution(
        primaryConstitution,
        safetyPreference,
        4
      );

      // Get secondary recommendations if available
      let secondaryRecommendations: Herb[] = [];
      if (secondaryConstitutions.length > 0) {
        for (const constitution of secondaryConstitutions) {
          const recs = await this.dataService.getRecommendationsForConstitution(
            constitution,
            safetyPreference,
            2
          );
          secondaryRecommendations.push(...recs);
        }
      }

      // Get health goal specific recommendations
      let goalBasedRecommendations: Herb[] = [];
      if (healthGoals.length > 0) {
        goalBasedRecommendations = await this.dataService.searchHerbsByEfficacy(
          healthGoals,
          3
        );
      }

      // Combine and deduplicate recommendations
      const allRecommendations = [
        ...primaryRecommendations,
        ...secondaryRecommendations,
        ...goalBasedRecommendations
      ];

      const uniqueRecommendations = Array.from(
        new Map(allRecommendations.map(herb => [herb.id, herb])).values()
      );

      // Group recommendations by category
      return {
        primary: primaryRecommendations,
        secondary: secondaryRecommendations.slice(0, 3),
        goalBased: goalBasedRecommendations,
        all: uniqueRecommendations.slice(0, 8),
        totalCount: uniqueRecommendations.length
      };

    } catch (error) {
      console.error('Error generating personalized recommendations:', error);
      return {
        primary: [],
        secondary: [],
        goalBased: [],
        all: [],
        totalCount: 0
      };
    }
  }

  // Get herbs for specific health concerns
  async getHerbsForHealthConcern(concern: string): Promise<Herb[]> {
    const efficacyMapping: { [key: string]: string[] } = {
      'stress': ['镇静安神', '情绪管理', '压力与焦虑'],
      'digestion': ['消化健康', '健脾胃'],
      'immunity': ['免疫支持', '抗病毒'],
      'energy': ['能量提升', '补气养血'],
      'sleep': ['睡眠支持', '镇静安神'],
      'inflammation': ['抗炎作用', '炎症管理'],
      'liver': ['肝脏健康', '解毒支持'],
      'respiratory': ['呼吸系统', '止咳化痰']
    };

    const efficacyTypes = efficacyMapping[concern] || [];
    return await this.dataService.searchHerbsByEfficacy(efficacyTypes, 6);
  }
}

// Export recommendation engine instance
export const herbRecommendationEngine = new HerbRecommendationEngine(herbsDataService); 