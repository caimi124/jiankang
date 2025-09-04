export type HerbDetail = {
  id: string
  name: string
  chinese_name: string
  latin_name: string
  slug: string
  category: string
  evidence_level: 'Moderate' | 'Strong' | 'Preliminary'
  safety_level: 'low' | 'medium' | 'high'
  overview: string
  benefits: string[]
  active_compounds: string
  traditional_uses: string
  suitable_for: string[]
  not_suitable_for: string[]
  dosage_forms: Array<{ form: string; dosage: string; usage: string }>
  safety_warnings: string[]
  interactions: string[]
  scientific_evidence: string
  constitution_match: Array<{ type: string; suitable: 'yes' | 'no' | 'warning'; description: string }>
  pairs_well_with: string[]
  user_stories: Array<{ quote: string; author?: string; location?: string }>
  faqs: Array<{ question: string; answer: string }>
  seo_keywords: string[]
  properties: string[]
}

export const HERB_DETAIL_FALLBACK: Record<string, HerbDetail> = {
  clove: {
    id: 'clove',
    name: 'Clove',
    chinese_name: '丁香',
    latin_name: 'Syzygium aromaticum',
    slug: 'clove',
    category: 'Digestive & Antimicrobial',
    evidence_level: 'Moderate',
    safety_level: 'medium',
    overview: 'Clove supports oral health, warms digestion, and provides antibacterial and antioxidant effects.',
    benefits: [
      'Digestive support',
      'Anti-nausea',
      'Antimicrobial'
    ],
    active_compounds: 'Eugenol, tannins, flavonoids',
    traditional_uses: 'Warms the middle and relieves pain (TCM).',
    suitable_for: ['Cold stomach with poor appetite'],
    not_suitable_for: ['Yin deficiency with internal heat'],
    dosage_forms: [
      { form: 'Whole Cloves (tea)', dosage: '1–3 g/day', usage: 'Steep 2–3 whole cloves; drink before meals' }
    ],
    safety_warnings: ['Avoid long-term high-dose oil use'],
    interactions: ['Caution with anticoagulants'],
    scientific_evidence: 'In vitro antimicrobial; clinical oral health support.',
    constitution_match: [
      { type: 'Yang Deficient / Cold', suitable: 'yes', description: 'Warming and stimulating' }
    ],
    pairs_well_with: ['Ginger', 'Fennel'],
    user_stories: [],
    faqs: [],
    seo_keywords: ['clove benefits', 'eugenol'],
    properties: ['Warming', 'Antibacterial']
  },
  cinnamon: {
    id: 'cinnamon',
    name: 'Cinnamon',
    chinese_name: '肉桂',
    latin_name: 'Cinnamomum verum',
    slug: 'cinnamon',
    category: 'Digestive & Metabolic Support',
    evidence_level: 'Moderate',
    safety_level: 'medium',
    overview: 'Cinnamon is a warming spice that supports circulation, digestion, and metabolic balance.',
    benefits: ['Blood sugar balance', 'Warming digestive support'],
    active_compounds: 'Cinnamaldehyde, procyanidins',
    traditional_uses: 'Warms channels and dispels cold (TCM).',
    suitable_for: ['Cold-type digestive discomfort'],
    not_suitable_for: ['Heat or Yin deficiency'],
    dosage_forms: [
      { form: 'Powder/Capsule', dosage: '500–2000 mg/day', usage: 'With meals' }
    ],
    safety_warnings: ['Cassia coumarin caution at high doses'],
    interactions: ['Antidiabetic medications'],
    scientific_evidence: 'Meta-analyses show modest fasting glucose improvements.',
    constitution_match: [
      { type: 'Cold Constitution', suitable: 'yes', description: 'Warming action' }
    ],
    pairs_well_with: ['Ginger', 'Cardamom'],
    user_stories: [],
    faqs: [],
    seo_keywords: ['cinnamon blood sugar'],
    properties: ['Warming', 'Metabolic Support']
  },
  'pumpkin-seeds': {
    id: 'pumpkin-seeds',
    name: 'Pumpkin Seeds',
    chinese_name: '南瓜子',
    latin_name: 'Cucurbita pepo',
    slug: 'pumpkin-seeds',
    category: 'Men’s Health & Hormone Balance',
    evidence_level: 'Moderate',
    safety_level: 'high',
    overview: 'Nutrient-dense seeds traditionally used for prostate health and hormone balance.',
    benefits: ['Prostate support', 'Hormone balance', 'Sleep support'],
    active_compounds: 'Zinc, phytosterols, essential fatty acids',
    traditional_uses: 'Prostate and hair support.',
    suitable_for: ['BPH symptoms'],
    not_suitable_for: ['Seed/nut allergy'],
    dosage_forms: [
      { form: 'Raw seeds', dosage: '1–2 tbsp/day', usage: 'Snack or add to meals' }
    ],
    safety_warnings: ['Large amounts may cause digestive upset'],
    interactions: [],
    scientific_evidence: 'Trials report urinary symptom improvements.',
    constitution_match: [
      { type: 'Balanced or Deficient', suitable: 'yes', description: 'Nutritive' }
    ],
    pairs_well_with: ['Saw palmetto'],
    user_stories: [],
    faqs: [],
    seo_keywords: ['pumpkin seeds prostate'],
    properties: ['Prostate Support', 'Nourishing']
  }
}

export function getFallbackHerb(slug: string): HerbDetail | null {
  const key = slug.toLowerCase().trim()
  return HERB_DETAIL_FALLBACK[key] || null
}


