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
    title: 'Clove',
    chineseName: '丁香',
    latinName: 'Syzygium aromaticum',
    description: 'Clove is a powerful aromatic spice with both culinary and medicinal uses. Native to Indonesia, clove buds have been valued for centuries to relieve digestive discomfort, freshen breath, ease tooth pain, and support men\'s reproductive health.',
    primaryEffects: ['Oral health and dental care', 'Digestive support and nausea relief', 'Anti-inflammatory pain relief'],
    activeCompounds: ['Eugenol', 'Tannins', 'Flavonoids', 'Volatile oils'],
    dosage: 'Whole cloves (tea): 1-3 g/day. Powder: 0.5-1 g/day. Oil (external): 1-2 diluted drops.',
    safetyLevel: 'medium',
    contraindications: ['Not for acid reflux or stomach ulcers', 'Avoid during pregnancy', 'Not for children under 12 unless supervised'],
    traditionalUse: 'In Traditional Chinese Medicine, clove (Ding Xiang) is considered a warming herb that strengthens the spleen and kidneys, warms the middle burner, and stops nausea. It has been used to treat digestive weakness, impotence, and cold-related abdominal pain.',
    modernApplications: 'Modern research confirms clove\'s antimicrobial, analgesic, and anti-inflammatory properties. Studies show effectiveness for dental pain, digestive issues, and as a natural preservative with strong antioxidant activity.',
    slug: 'clove',
    seoTitle: 'Clove Benefits and Uses | HerbScience',
    seoDescription: 'Explore the benefits of clove (Syzygium aromaticum) for digestion, oral health, and inflammation. Learn about its active compounds, uses, and contraindications.',
    seoKeywords: ['clove benefits', 'clove uses', 'clove tea', 'clove oil benefits']
  }
}

export default async function ClovePage() {
  const herbData = await getCloveData()
  
  return <HerbDetailClient herbData={herbData} />
}
