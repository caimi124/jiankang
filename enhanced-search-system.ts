// Enhanced Herb Search System for HerbScience
export interface HerbData {
  id: string;
  name: string;
  chineseName: string;
  symptoms: string[];
  contraindications: string[];
  benefits: string[];
}

// Symptom mapping for intelligent search
export const symptomMapping = {
  // Chinese symptoms mapped to English
  '胃胀': ['bloating', 'indigestion'],
  '失眠': ['insomnia', 'sleep-problems'],
  '感冒': ['cold', 'flu'],
  '关节痛': ['joint-pain', 'arthritis'],
  '肝脏': ['liver', 'detox'],
  
  // English symptoms
  'nausea': ['ginger', 'peppermint'],
  'insomnia': ['valerian', 'chamomile'],
  'cold': ['echinacea', 'ginger'],
  'pain': ['turmeric', 'willow-bark'],
  'liver': ['milk-thistle', 'dandelion']
};

// Safety checking system
export const safetyDatabase = {
  pregnancy: {
    forbidden: ['angelica', 'blue-cohosh'],
    safe: ['ginger-small-dose', 'chamomile']
  },
  diabetes: {
    monitor: ['ginseng', 'cinnamon'],
    beneficial: ['bitter-melon', 'gymnema']
  },
  hypertension: {
    avoid: ['ginseng', 'licorice'],
    beneficial: ['hawthorn', 'garlic']
  }
};

export class HerbSearchEngine {
  searchBySymptom(symptom: string): string[] {
    const results: string[] = [];
    
    // Check direct mapping
    if (symptomMapping[symptom.toLowerCase()]) {
      results.push(...symptomMapping[symptom.toLowerCase()]);
    }
    
    // Check Chinese keywords
    Object.keys(symptomMapping).forEach(key => {
      if (symptom.includes(key) || key.includes(symptom)) {
        results.push(...symptomMapping[key]);
      }
    });
    
    return [...new Set(results)];
  }

  checkSafety(herb: string, conditions: string[]): {
    safe: boolean;
    warnings: string[];
  } {
    const warnings: string[] = [];
    let safe = true;

    conditions.forEach(condition => {
      const safetyData = safetyDatabase[condition.toLowerCase()];
      if (safetyData) {
        if (safetyData.forbidden?.includes(herb)) {
          safe = false;
          warnings.push(`${herb} is contraindicated for ${condition}`);
        } else if (safetyData.monitor?.includes(herb)) {
          warnings.push(`Monitor ${herb} use with ${condition}`);
        }
      }
    });

    return { safe, warnings };
  }
} 