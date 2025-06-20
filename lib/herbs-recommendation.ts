// Updated herb recommendation system for HerbScience.shop
// Using complete Notion database with 58 herbs

// Import complete herbs database from Notion
import { HERBS_DATABASE } from './herbs-data-complete';

// Updated Herb interface matching Notion database structure
export interface Herb {
  id: string;
  chinese_name: string;
  english_name: string;
  latin_name: string;
  category: string;
  constitution_type: string;
  primary_effects: string[];
  secondary_effects: string[];
  efficacy: string[];
  dosage: string;
  safety_level: 'high' | 'medium' | 'low';
  contraindications: string;
  description: string;
  traditional_use: string;
  modern_applications: string;
  taste: string;
  meridians: string[];
  part_used: string;
  source: string;
  growing_regions: string[];
  price_range: string;
  availability: string;
  quality_score: number;
  popularity_score: number;
  usage_suggestions: string;
  ingredients: string[];
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

// Use complete herbs database from Notion

// Simplified herbs data service
export class HerbsDataService {
  private cache: Map<string, Herb[]> = new Map();
  private cacheExpiry: number = 5 * 60 * 1000; // 5 minutes
  private lastCacheUpdate: number = 0;

  // Fetch all herbs from complete database
  async fetchAllHerbs(): Promise<Herb[]> {
    try {
      // Use the complete database from Notion
      return HERBS_DATABASE;
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
        if (mapping.primaryConstitutions.includes(herb.constitution_type)) {
          score += 10;
        } else if (mapping.secondaryConstitutions.includes(herb.constitution_type)) {
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
        if (preferredSafety.includes(herb.safety_level)) {
          score += 2;
        }

        // Boost for high safety herbs
        if (herb.safety_level === 'high') {
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
        .filter(herb => herb.constitution_type === constitution)
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