// Enhanced Herb Search System
// Supports symptom search, contraindication checking, and constitution matching

export interface EnhancedHerbData {
  id: string;
  name: string;
  chineseName: string;
  latinName: string;
  briefDescription: string;
  dosage: string;
  usage: string;
  safetyLevel: 'high' | 'medium' | 'low';
  precautions: string;
  
  // Enhanced fields
  medicalCaseAnalysis: string;
  wellnessRecipes: string;
  practicalTips: string;
  applicableSymptoms: string[];
  applicableDiseases: string[];
  contraindicationGroups: string[];
  contraindicationDetails: string;
  tcmConstitution: string[];
  effectCategories: string[];
}

// Symptom-Herb Mapping Database
export const symptomHerbMapping: Record<string, string[]> = {
  // Digestive System
  'nausea': ['ginger', 'peppermint', 'chamomile'],
  'vomiting': ['ginger', 'peppermint'],
  'indigestion': ['ginger', 'peppermint', 'licorice'],
  'bloating': ['ginger', 'peppermint', 'fennel'],
  'stomachache': ['ginger', 'chamomile', 'licorice'],
  
  // Respiratory System  
  'cold': ['echinacea', 'ginger', 'elderberry'],
  'flu': ['echinacea', 'elderberry'],
  'cough': ['ginger', 'thyme', 'licorice'],
  'sore-throat': ['echinacea', 'sage', 'licorice'],
  
  // Nervous System
  'insomnia': ['valerian', 'chamomile', 'passionflower'],
  'anxiety': ['valerian', 'chamomile', 'lavender'],
  'stress': ['valerian', 'passionflower', 'lemon-balm'],
  'headache': ['willow-bark', 'feverfew'],
  
  // Immune System
  'low-immunity': ['echinacea', 'ginseng', 'astragalus'],
  'frequent-infections': ['echinacea', 'garlic', 'elderberry'],
  
  // Liver System
  'fatty-liver': ['milk-thistle', 'dandelion'],
  'liver-detox': ['milk-thistle', 'burdock', 'dandelion'],
  
  // Joint/Muscle
  'arthritis': ['turmeric', 'ginger', 'boswellia'],
  'joint-pain': ['turmeric', 'ginger', 'willow-bark'],
  'inflammation': ['turmeric', 'ginger', 'boswellia']
};

// TCM Keyword Mapping
export const tcmKeywordMapping: Record<string, string[]> = {
  '胃胀': ['nausea', 'bloating', 'indigestion'],
  '食欲不振': ['indigestion', 'poor-appetite'],
  '恶心': ['nausea', 'vomiting'],
  '消化不良': ['indigestion', 'bloating'],
  '睡不着': ['insomnia', 'sleep-disorder'],
  '入睡困难': ['insomnia', 'sleep-onset'],
  '焦虑': ['anxiety', 'stress'],
  '感冒': ['cold', 'flu'],
  '关节炎': ['arthritis', 'joint-pain'],
  '脂肪肝': ['fatty-liver', 'liver-detox'],
  '易感冒': ['low-immunity', 'frequent-infections'],
  '体质虚弱': ['low-immunity', 'fatigue']
};

// Contraindication Database
export const contraindicationDatabase: Record<string, any> = {
  'pregnancy': {
    forbidden: ['angelica', 'black-cohosh', 'blue-cohosh'],
    caution: ['ginger', 'echinacea', 'garlic'],
    safe: ['ginger-small-dose', 'chamomile-tea']
  },
  'hypertension': {
    forbidden: ['ginseng', 'licorice-large-dose'],
    caution: ['ginger', 'garlic'],
    safe: ['hawthorn', 'american-ginseng']
  },
  'diabetes': {
    monitor: ['ginseng', 'licorice', 'cinnamon'],
    beneficial: ['bitter-melon', 'gymnema', 'fenugreek']
  },
  'liver-disease': {
    forbidden: ['comfrey', 'kava', 'chaparral'],
    beneficial: ['milk-thistle', 'dandelion', 'schisandra']
  },
  'autoimmune-disease': {
    forbidden: ['echinacea', 'astragalus'],
    beneficial: ['turmeric', 'ginger']
  },
  'gallstones': {
    forbidden: ['turmeric-high-dose', 'peppermint-oil'],
    beneficial: ['milk-thistle', 'corn-silk']
  }
};

// Enhanced Herb Search Class
export class EnhancedHerbSearch {
  private herbs: EnhancedHerbData[] = [];

  constructor(herbsData: EnhancedHerbData[]) {
    this.herbs = herbsData;
  }

  // Search by symptoms
  searchBySymptoms(symptoms: string[]): EnhancedHerbData[] {
    const relevantHerbs = new Set<string>();
    
    symptoms.forEach(symptom => {
      const normalizedSymptom = symptom.toLowerCase().trim();
      
      // Direct English symptom matching
      if (symptomHerbMapping[normalizedSymptom]) {
        symptomHerbMapping[normalizedSymptom].forEach(herb => relevantHerbs.add(herb));
      }
      
      // TCM keyword matching
      if (tcmKeywordMapping[symptom]) {
        tcmKeywordMapping[symptom].forEach(englishSymptom => {
          if (symptomHerbMapping[englishSymptom]) {
            symptomHerbMapping[englishSymptom].forEach(herb => relevantHerbs.add(herb));
          }
        });
      }
      
      // Fuzzy matching
      Object.keys(symptomHerbMapping).forEach(key => {
        if (key.includes(normalizedSymptom) || normalizedSymptom.includes(key)) {
          symptomHerbMapping[key].forEach(herb => relevantHerbs.add(herb));
        }
      });
    });

    return this.herbs.filter(herb => 
      relevantHerbs.has(herb.id) || 
      herb.applicableSymptoms.some(s => 
        symptoms.some(symptom => 
          s.toLowerCase().includes(symptom.toLowerCase()) ||
          symptom.toLowerCase().includes(s.toLowerCase())
        )
      )
    );
  }

  // Check contraindications
  checkContraindications(conditions: string[]): {
    forbidden: EnhancedHerbData[];
    caution: EnhancedHerbData[];
    safe: EnhancedHerbData[];
  } {
    const forbidden: EnhancedHerbData[] = [];
    const caution: EnhancedHerbData[] = [];
    const safe: EnhancedHerbData[] = [];

    this.herbs.forEach(herb => {
      let isForbidden = false;
      let needsCaution = false;

      conditions.forEach(condition => {
        const contraindicationData = contraindicationDatabase[condition.toLowerCase()];
        if (contraindicationData) {
          if (contraindicationData.forbidden?.includes(herb.id)) {
            isForbidden = true;
          } else if (contraindicationData.caution?.includes(herb.id) || 
                     contraindicationData.monitor?.includes(herb.id)) {
            needsCaution = true;
          }
        }

        if (herb.contraindicationGroups.some(group => 
          group.toLowerCase().includes(condition.toLowerCase())
        )) {
          isForbidden = true;
        }
      });

      if (isForbidden) {
        forbidden.push(herb);
      } else if (needsCaution) {
        caution.push(herb);
      } else {
        safe.push(herb);
      }
    });

    return { forbidden, caution, safe };
  }

  // Personalized recommendations
  getPersonalizedRecommendations(params: {
    symptoms?: string[];
    conditions?: string[];
    age?: number;
    gender?: 'male' | 'female';
  }): {
    recommended: EnhancedHerbData[];
    warnings: string[];
    suggestions: string[];
  } {
    const recommendations: EnhancedHerbData[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Search by symptoms
    if (params.symptoms && params.symptoms.length > 0) {
      const symptomResults = this.searchBySymptoms(params.symptoms);
      recommendations.push(...symptomResults);
    }

    // Check contraindications
    if (params.conditions && params.conditions.length > 0) {
      const contraindicationResults = this.checkContraindications(params.conditions);
      
      const forbiddenIds = contraindicationResults.forbidden.map(h => h.id);
      const filteredRecommendations = recommendations.filter(h => !forbiddenIds.includes(h.id));
      
      contraindicationResults.caution.forEach(herb => {
        if (recommendations.some(r => r.id === herb.id)) {
          warnings.push(`${herb.name} requires caution, please consult a doctor`);
        }
      });

      recommendations.length = 0;
      recommendations.push(...filteredRecommendations);
    }

    // Age-related suggestions
    if (params.age) {
      if (params.age < 18) {
        warnings.push('Children should use herbs under medical supervision');
      } else if (params.age > 65) {
        warnings.push('Elderly should adjust dosage and monitor reactions');
      }
    }

    return {
      recommended: recommendations.slice(0, 10),
      warnings,
      suggestions
    };
  }
}

// Export utility functions
export function createHerbSearchEngine(herbsData: EnhancedHerbData[]) {
  return new EnhancedHerbSearch(herbsData);
}

export function extractSymptomKeywords(text: string): string[] {
  const keywords: string[] = [];
  const lowerText = text.toLowerCase();

  Object.keys(symptomHerbMapping).forEach(symptom => {
    if (lowerText.includes(symptom)) {
      keywords.push(symptom);
    }
  });

  Object.keys(tcmKeywordMapping).forEach(tcmKeyword => {
    if (text.includes(tcmKeyword)) {
      keywords.push(tcmKeyword);
      tcmKeywordMapping[tcmKeyword].forEach(englishKeyword => {
        if (!keywords.includes(englishKeyword)) {
          keywords.push(englishKeyword);
        }
      });
    }
  });

  return Array.from(new Set(keywords));
} 