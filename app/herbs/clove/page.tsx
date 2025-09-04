import { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Breadcrumb from '../../../components/Breadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Clove Benefits and Uses | HerbScience',
    description: 'Explore the benefits of clove (Syzygium aromaticum) for digestion, oral health, and inflammation. Learn about its active compounds, uses, and contraindications.',
    keywords: 'Clove benefits, Clove uses, Clove tea, Clove oil benefits, Clove for digestion, Clove for oral health',
  };
}

export default function ClovePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Herbs', href: '/herb-finder' },
            { label: 'Clove', href: '/herbs/clove' },
          ]}
        />

        <section>
          <h1 className="text-3xl font-bold">Clove (Syzygium aromaticum)</h1>
          <p className="mt-4 text-lg">
            Clove is a powerful aromatic spice with both culinary and medicinal uses. Native to Indonesia, clove buds have been valued for centuries to relieve digestive discomfort, freshen breath, ease tooth pain, and support men’s reproductive health.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Active Compounds in Clove</h2>
          <ul className="list-disc ml-6 mt-4">
            <li><strong>Eugenol</strong> – primary bioactive compound with strong antiseptic and analgesic effects</li>
            <li><strong>Tannins</strong> – tighten tissues and reduce inflammation</li>
            <li><strong>Flavonoids</strong> – add antioxidant support</li>
            <li><strong>Volatile oils</strong> – provide aromatic and antimicrobial activity</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Clove Benefits & Uses</h2>
          <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Use Case</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Oral health</td>
                <td className="border border-gray-300 px-4 py-2">Clove oil helps with toothache, gum pain, and bad breath.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Nausea & vomiting</td>
                <td className="border border-gray-300 px-4 py-2">Clove tea soothes an upset stomach, motion sickness, or morning nausea.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Bloating & poor appetite</td>
                <td className="border border-gray-300 px-4 py-2">Stimulates digestive enzymes and reduces gas.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Anti-inflammatory</td>
                <td className="border border-gray-300 px-4 py-2">Helps with arthritis, headaches, and swelling.</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Clove Contraindications</h2>
          <ul className="list-disc ml-6 mt-4">
            <li>Not recommended for people with acid reflux, stomach ulcers, or heat-type conditions.</li>
            <li>Avoid during pregnancy and in children under 12 unless supervised.</li>
            <li>Overuse may cause nausea, dizziness, or GI irritation.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Daily Dosage Guide</h2>
          <ul className="list-disc ml-6 mt-4">
            <li><strong>Whole Cloves (tea):</strong> 1–3 g/day</li>
            <li><strong>Clove Powder:</strong> 0.5–1 g/day</li>
            <li><strong>Clove Oil (external):</strong> 1–2 diluted drops</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
