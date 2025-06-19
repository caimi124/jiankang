import { Client } from "@notionhq/client";

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

// Herbs data service
export class HerbsDataService {
  private notion: Client;
  private databaseId: string;
  private cache: Map<string, Herb[]> = new Map();
  private cacheExpiry: number = 5 * 60 * 1000; // 5 minutes
  private lastCacheUpdate: number = 0;

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_API_KEY || "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"
    });
    this.databaseId = "2156f14b923c802c8d48d84247b6681a";
  }

  // Fetch all herbs from Notion database
  async fetchAllHerbs(): Promise<Herb[]> {
    try {
      // Check cache first
      if (this.shouldUseCache()) {
        const cached = this.cache.get('all_herbs');
        if (cached) {
          return cached;
        }
      }

      const response = await this.notion.databases.query({
        database_id: this.databaseId,
        page_size: 100
      });

      const herbs: Herb[] = response.results.map((page: any) => {
        const props = page.properties;
        return {
          id: page.id,
          name: this.extractText(props['草药名称']?.title),
          chineseName: this.extractText(props['中文名']?.rich_text),
          description: this.extractText(props['简要描述']?.rich_text),
          composition: this.extractMultiSelect(props['成分构成']?.multi_select),
          dosage: this.extractText(props['推荐剂量']?.rich_text),
          efficacy: this.extractMultiSelect(props['功效分类']?.multi_select),
          usage: this.extractText(props['使用建议']?.rich_text),
          safetyLevel: this.mapSafetyLevel(props['安全性等级']?.select?.name),
          precautions: this.extractText(props['注意事项']?.rich_text),
          tcmConstitution: props['中医体质匹配']?.select?.name || '',
          caseStudy: this.extractText(props['案例分析']?.rich_text),
          createdDate: props['日期']?.date?.start
        };
      });

      // Update cache
      this.cache.set('all_herbs', herbs);
      this.lastCacheUpdate = Date.now();

      return herbs;
    } catch (error) {
      console.error('Error fetching herbs from Notion:', error);
      // Return cached data if available, otherwise empty array
      return this.cache.get('all_herbs') || [];
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

        // Avoid negative efficacy
        const avoidingEfficacy = herbEfficacy.filter(eff => 
          mapping.avoidEfficacy.includes(eff)
        );
        score -= avoidingEfficacy.length * 5;

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

  // Utility methods
  private extractText(textProperty: any): string {
    if (!textProperty || !Array.isArray(textProperty)) return '';
    return textProperty.map((item: any) => item.text?.content || item.plain_text || '').join('');
  }

  private extractMultiSelect(multiSelectProperty: any): string[] {
    if (!multiSelectProperty || !Array.isArray(multiSelectProperty)) return [];
    return multiSelectProperty.map((item: any) => item.name || '');
  }

  private mapSafetyLevel(safetyText: string): 'high' | 'medium' | 'low' {
    const safety = safetyText?.toLowerCase() || '';
    if (safety.includes('高') || safety.includes('high') || safety === '安全') return 'high';
    if (safety.includes('中') || safety.includes('medium') || safety === '低风险') return 'medium';
    return 'low';
  }

  private shouldUseCache(): boolean {
    return Date.now() - this.lastCacheUpdate < this.cacheExpiry;
  }

  // Clear cache (useful for testing or forced refresh)
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