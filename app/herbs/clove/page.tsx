import { Metadata } from 'next'
import HerbDetailClient from '../[slug]/HerbDetailClient'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Clove Benefits and Uses | HerbScience',
    description: 'Explore the benefits of clove (Syzygium aromaticum) for digestion, oral health, and inflammation. Learn about its active compounds, uses, and contraindications.',
    keywords: 'Clove benefits, Clove uses, Clove tea, Clove oil benefits, Clove for digestion, Clove for oral health',
  };
}

async function getCloveData() {
  return {
    id: 'clove',
    name: 'Clove',
    latin_name: 'Syzygium aromaticum',
    slug: 'clove',
    overview: 'Clove is a powerful aromatic spice with both culinary and medicinal uses. Native to Indonesia, clove buds have been valued for centuries to relieve digestive discomfort, freshen breath, ease tooth pain, and support men\'s reproductive health.',
    benefits: ['Oral health and dental care', 'Digestive support and nausea relief', 'Anti-inflammatory pain relief'],
    active_compounds: 'Eugenol, Tannins, Flavonoids, Volatile oils',
    traditional_uses: 'In Traditional Chinese Medicine, clove (Ding Xiang) is considered a warming herb that strengthens the spleen and kidneys, warms the middle burner, and stops nausea. It has been used to treat digestive weakness, impotence, and cold-related abdominal pain.',
    suitable_for: ['People with digestive issues', 'Dental problems', 'Cold constitution'],
    not_suitable_for: ['Acid reflux or stomach ulcers', 'Pregnancy', 'Children under 12 unless supervised'],
    dosage_forms: [
      { form: 'Whole cloves (tea)', dosage: '1-3 g/day', usage: 'Steep in hot water' },
      { form: 'Powder', dosage: '0.5-1 g/day', usage: 'Mix with food or water' },
      { form: 'Oil (external)', dosage: '1-2 diluted drops', usage: 'Apply topically' }
    ],
    safety_warnings: ['Not for acid reflux or stomach ulcers', 'Avoid during pregnancy', 'Not for children under 12 unless supervised'],
    interactions: ['May interact with blood thinning medications'],
    scientific_evidence: 'Modern research confirms clove\'s antimicrobial, analgesic, and anti-inflammatory properties. Studies show effectiveness for dental pain, digestive issues, and as a natural preservative with strong antioxidant activity.',
    constitution_match: [
      { type: 'Cold Constitution', suitable: 'yes' as const, description: 'Warming properties help cold conditions' },
      { type: 'Hot Constitution', suitable: 'warning' as const, description: 'Use with caution as it may aggravate heat symptoms' }
    ],
    pairs_well_with: ['Ginger', 'Cinnamon', 'Cardamom'],
    user_stories: [
      { quote: 'Clove oil helped my toothache immediately.', author: 'John D.', location: 'New York, USA' }
    ],
    faqs: [
      { question: 'Is clove oil safe for toothache?', answer: 'Yes, but must be diluted. Apply 1-2 drops mixed with carrier oil.' }
    ],
    seo_keywords: ['clove benefits', 'clove uses', 'clove tea', 'clove oil benefits'],
    evidence_level: 'Moderate' as const,
    category: 'Warming Herbs',
    properties: ['Warming', 'Antimicrobial', 'Analgesic', 'Anti-inflammatory']
  }
}

export default async function ClovePage() {
  const herbData = await getCloveData()
  
  return <HerbDetailClient herbData={herbData} slug="clove" />
}
