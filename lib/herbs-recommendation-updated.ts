// Updated herb recommendation system for HerbScience.shop
// Using complete Notion database with 69 herbs

// Import complete herbs database from Notion
import { HERBS_DATABASE, herbs, Herb } from './herbs-data-complete';

// Re-export the Herb interface for compatibility
export type { Herb } from './herbs-data-complete';

// Constitution type mapping for herb recommendations
export const CONSTITUTION_HERB_MAPPING = {
  fire: {
    primaryConstitutions: ['yang_deficiency', 'balanced'],
    secondaryConstitutions: ['qi_deficiency', 'blood_stasis'],
    preferredEfficacy: ['镇静安神', '清热解毒', '情绪管理', '抗炎作用', '睡眠支持'],
    avoidEfficacy: ['能量提升'],
    safetyPreference: ['high', 'medium']
  },
  earth: {
    primaryConstitutions: ['qi_deficiency', 'balanced'],
    secondaryConstitutions: ['phlegm_dampness', 'yang_deficiency'],
    preferredEfficacy: ['消化健康', '健脾胃', '免疫支持', '补气养血'],
    avoidEfficacy: [],
    safetyPreference: ['high', 'medium']
  },
  metal: {
    primaryConstitutions: ['yin_deficiency', 'balanced'],
    secondaryConstitutions: ['qi_deficiency'],
    preferredEfficacy: ['呼吸系统', '止咳化痰', '抗病毒', '解毒支持'],
    avoidEfficacy: [],
    safetyPreference: ['high', 'medium']
  },
  water: {
    primaryConstitutions: ['balanced', 'yin_deficiency'],
    secondaryConstitutions: ['yang_deficiency'],
    preferredEfficacy: ['滋阴补肾', '肝脏健康', '益肝明目', '情绪管理'],
    avoidEfficacy: [],
    safetyPreference: ['high', 'medium']
  },
  wood: {
    primaryConstitutions: ['qi_stagnation', 'blood_stasis'],
    secondaryConstitutions: ['damp_heat'],
    preferredEfficacy: ['活血化瘀', '祛风湿', '肝脏健康', '解毒支持'],
    avoidEfficacy: [],
    safetyPreference: ['high', 'medium']
  }
};

// Enhanced herbs data service using complete database
export class HerbsDataService {
  private cache: Map<string, Herb[]> = new Map();
  private cacheExpiry: number = 10 * 60 * 1000; // 10 minutes
  private lastCacheUpdate: number = 0;

  // Fetch all herbs from complete database
  async fetchAllHerbs(): Promise<Herb[]> {
    try {
      // Use the complete database and convert to Herb interface
      return HERBS_DATABASE.map(herb => this.convertNotionHerbToHerb(herb));
    } catch (error) {
      console.error('Error fetching herbs:', error);
      return [];
    }
  }

  // Get personalized herb recommendations based on constitution
  async getRecommendationsForConstitution(
    constitutionType: string,
    preferredSafety: string[] = ['high', 'medium'],
    limit: number = 6
  ): Promise<Herb[]> {
    try {
      const allHerbs = await this.fetchAllHerbs();
      const mapping = CONSTITUTION_HERB_MAPPING[constitutionType as keyof typeof CONSTITUTION_HERB_MAPPING];
      
      if (!mapping) {
        return allHerbs.filter(herb => preferredSafety.includes(herb.safetyLevel)).slice(0, limit);
      }

      // Score herbs based on constitution compatibility
      const scoredHerbs = allHerbs.map(herb => {
        let score = 0;

        // Constitution match scoring
        if (mapping.primaryConstitutions.includes(herb.constitutionType)) {
          score += 10;
        } else if (mapping.secondaryConstitutions.includes(herb.constitutionType)) {
          score += 5;
        }

        // Efficacy match scoring
        const herbEfficacy = [...herb.efficacy];
        const matchingEfficacy = herbEfficacy.filter(eff => 
          mapping.preferredEfficacy.some(preferred => 
            eff.includes(preferred) || preferred.includes(eff)
          )
        );
        score += matchingEfficacy.length * 3;

        // Avoid negative efficacy
        const avoidMatches = herbEfficacy.filter(eff => 
          mapping.avoidEfficacy.some(avoid => 
            eff.includes(avoid) || avoid.includes(eff)
          )
        );
        score -= avoidMatches.length * 2;

        // Safety preference
        if (preferredSafety.includes(herb.safetyLevel)) {
          score += 2;
        }

        // Quality and popularity boost
        score += (herb.qualityScore || 0) / 25;
        score += (herb.popularityScore || 0) / 25;

        // Boost for high safety herbs
        if (herb.safetyLevel === 'high') {
          score += 3;
        }

        return { herb, score };
      });

      // Sort by score and return top results
      const recommendations = scoredHerbs
        .sort((a, b) => b.score - a.score)
        .filter(item => preferredSafety.includes(item.herb.safetyLevel))
        .slice(0, limit)
        .map(item => item.herb);

      return recommendations;
    } catch (error) {
      console.error('Error getting constitution recommendations:', error);
      return [];
    }
  }

  // Search herbs by efficacy
  async searchHerbsByEfficacy(efficacyTypes: string[], limit: number = 10): Promise<Herb[]> {
    try {
      const results = searchHerbs(efficacyTypes.join('|'));
      return results.map(herb => this.convertNotionHerbToHerb(herb)).slice(0, limit);
    } catch (error) {
      console.error('Error searching herbs by efficacy:', error);
      return [];
    }
  }

  // Search herbs by constitution
  async searchHerbsByConstitution(constitution: string, limit: number = 10): Promise<Herb[]> {
    try {
      const constitutionHerbs = herbsByConstitution(constitution);
      return constitutionHerbs.map(herb => this.convertNotionHerbToHerb(herb)).slice(0, limit);
    } catch (error) {
      console.error('Error searching herbs by constitution:', error);
      return [];
    }
  }

  // Filter herbs by safety level
  async filterHerbsBySafety(safetyLevel: string): Promise<Herb[]> {
    try {
      const allHerbs = await this.fetchAllHerbs();
      return allHerbs.filter(herb => herb.safetyLevel === safetyLevel);
    } catch (error) {
      console.error('Error filtering herbs by safety:', error);
      return [];
    }
  }

  // Convert Notion herb data to Herb interface
  private convertNotionHerbToHerb(notionHerb: any): Herb {
    return {
      id: notionHerb.id || '',
      herbName: notionHerb.herbName || '',
      englishName: notionHerb.englishName || '',
      latinName: notionHerb.latinName || '',
      category: notionHerb.category || '',
      description: notionHerb.description || '',
      efficacy: notionHerb.efficacy || [],
      safetyLevel: notionHerb.safetyLevel || 'medium',
      ingredients: notionHerb.ingredients || [],
      qualityScore: notionHerb.qualityScore || 70,
      popularityScore: notionHerb.popularityScore || 70,
      availability: notionHerb.availability || '',
      priceRange: notionHerb.priceRange || '',
      growingRegions: notionHerb.growingRegions || [],
      constitutionType: notionHerb.constitutionType || '',
      traditionalUse: notionHerb.traditionalUse || '',
      modernApplications: notionHerb.modernApplications || '',
      contraindications: notionHerb.contraindications || '',
      dosage: notionHerb.dosage || '',
      usageTips: notionHerb.usageTips || '',
      tags: notionHerb.tags || [],
      overview: notionHerb.overview || '',
      benefits: notionHerb.benefits || '',
      activeCompounds: notionHerb.activeCompounds || '',
      mechanismOfAction: notionHerb.mechanismOfAction || '',
      constitutionExplanation: notionHerb.constitutionExplanation || '',
      recommendedFor: notionHerb.recommendedFor || [],
      notRecommendedFor: notionHerb.notRecommendedFor || [],
      medicalStudies: notionHerb.medicalStudies || '',
      caseStudy: notionHerb.caseStudy || '',
      faq: notionHerb.faq || '',
      partUsed: notionHerb.partUsed || '',
      taste: notionHerb.taste || '',
      source: notionHerb.source || '',
      createdTime: notionHerb.createdTime || '',
      lastEditedTime: notionHerb.lastEditedTime || ''
    };
  }

  // Search herbs by name (Chinese or English)
  async searchHerbsByName(query: string, limit: number = 10): Promise<Herb[]> {
    try {
      const allHerbs = await this.fetchAllHerbs();
      const searchTerm = query.toLowerCase();
      
      const results = allHerbs.filter(herb => 
        herb.herbName.toLowerCase().includes(searchTerm) ||
        herb.englishName.toLowerCase().includes(searchTerm) ||
        herb.latinName.toLowerCase().includes(searchTerm)
      );
      
      return results.slice(0, limit);
    } catch (error) {
      console.error('Error searching herbs by name:', error);
      return [];
    }
  }

  clearCache(): void {
    this.cache.clear();
    this.lastCacheUpdate = 0;
  }
}

// Enhanced herb recommendation engine
export class HerbRecommendationEngine {
  private dataService: HerbsDataService;

  constructor(dataService: HerbsDataService = new HerbsDataService()) {
    this.dataService = dataService;
  }

  async generatePersonalizedRecommendations(
    primaryConstitution: string,
    secondaryConstitutions: string[] = [],
    healthGoals: string[] = [],
    safetyPreference: string[] = ['high', 'medium']
  ) {
    try {
      console.log('Generating personalized recommendations for:', {
        primaryConstitution,
        secondaryConstitutions,
        healthGoals,
        safetyPreference
      });

      // Get herbs for primary constitution
      const primaryHerbs = await this.dataService.getRecommendationsForConstitution(
        primaryConstitution,
        safetyPreference,
        8
      );

      // Get herbs for secondary constitutions
      let secondaryHerbs: Herb[] = [];
      for (const constitution of secondaryConstitutions) {
        const herbs = await this.dataService.getRecommendationsForConstitution(
          constitution,
          safetyPreference,
          4
        );
        secondaryHerbs = [...secondaryHerbs, ...herbs];
      }

      // Get herbs based on health goals
      let goalHerbs: Herb[] = [];
      if (healthGoals.length > 0) {
        goalHerbs = await this.dataService.searchHerbsByEfficacy(healthGoals, 6);
      }

      // Combine and deduplicate results
      const allRecommendations = [...primaryHerbs, ...secondaryHerbs, ...goalHerbs];
      const uniqueHerbs = Array.from(
        new Map(allRecommendations.map(herb => [herb.id, herb])).values()
      );

      // Score and sort final recommendations
      const scoredHerbs = uniqueHerbs.map(herb => {
        let score = 0;

        // Primary constitution match gets highest score
        if (primaryHerbs.find(h => h.id === herb.id)) {
          score += 10;
        }

        // Secondary constitution match
        if (secondaryHerbs.find(h => h.id === herb.id)) {
          score += 5;
        }

        // Health goal match
        if (goalHerbs.find(h => h.id === herb.id)) {
          score += 3;
        }

        // Safety level preference
        if (herb.safetyLevel === 'high') {
          score += 2;
        } else if (herb.safetyLevel === 'medium') {
          score += 1;
        }

        // Quality scores
        score += (herb.qualityScore || 0) / 20;
        score += (herb.popularityScore || 0) / 20;

        return { herb, score };
      });

      const sortedHerbs = scoredHerbs
        .sort((a, b) => b.score - a.score)
        .map(item => item.herb);

      return {
        primary: sortedHerbs.slice(0, 6),
        secondary: sortedHerbs.slice(6, 12),
        all: sortedHerbs.slice(0, 12)
      };

    } catch (error) {
      console.error('Error generating personalized recommendations:', error);
      return {
        primary: [],
        secondary: [],
        all: []
      };
    }
  }

  async getHerbsForHealthConcern(concern: string): Promise<Herb[]> {
    try {
      const concernMapping = {
        'stress': ['压力与焦虑', '情绪管理', '镇静安神'],
        'immunity': ['免疫支持', '抗病毒', '抗炎作用'],
        'energy': ['能量提升', '补气养血'],
        'digestion': ['消化健康', '健脾胃'],
        'sleep': ['睡眠支持', '镇静安神'],
        'liver': ['肝脏健康', '解毒支持'],
        'respiratory': ['呼吸系统', '止咳化痰']
      };

      const efficacyTerms = concernMapping[concern as keyof typeof concernMapping] || [concern];
      return await this.dataService.searchHerbsByEfficacy(efficacyTerms, 8);
    } catch (error) {
      console.error('Error getting herbs for health concern:', error);
      return [];
    }
  }
}

// Export singleton instance
export const herbRecommendationEngine = new HerbRecommendationEngine();

// Helper functions
const searchHerbs = (query: string): Herb[] => {
  const searchLower = query.toLowerCase();
  return herbs.filter((herb: Herb) => 
    herb.herbName.toLowerCase().includes(searchLower) ||
    herb.englishName.toLowerCase().includes(searchLower) ||
    herb.description.toLowerCase().includes(searchLower) ||
    herb.efficacy.some((effect: string) => effect.toLowerCase().includes(searchLower))
  );
};

const herbsByConstitution = (constitution: string): Herb[] => {
  return herbs.filter((herb: Herb) => 
    herb.constitutionType === constitution ||
    herb.recommendedFor.includes(constitution)
  );
}; 