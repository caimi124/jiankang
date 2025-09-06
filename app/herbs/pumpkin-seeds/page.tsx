import { Metadata } from 'next'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '🌱 Pumpkin Seeds (Cucurbita pepo) – Benefits for Prostate, Hair, Hormones & Parasites | HerbScience',
    description: 'Discover evidence-based benefits of pumpkin seeds for prostate health, hair loss, hormone balance, menopause, and parasite treatment. Learn safe dosage and TCM insights.',
    keywords: [
      'pumpkin seeds benefits',
      'pumpkin seeds for prostate',
      'pumpkin seeds hair loss',
      'pumpkin seeds hormones',
      'pumpkin seeds parasites',
      'pumpkin seeds menopause',
      'cucurbita pepo',
      'pepitas health benefits',
      'natural prostate support',
      'anti-parasitic herbs'
    ],
    openGraph: {
      title: 'Pumpkin Seeds – Benefits for Prostate, Hair, Hormones & Parasites',
      description: 'Evidence-based guide to pumpkin seeds for men\'s health, women\'s health, and family wellness. Safe, natural, effective.',
      type: 'article',
      url: 'https://herbscience.shop/herbs/pumpkin-seeds',
      images: [
        {
          url: 'https://herbscience.shop/images/herbs/pumpkin-seeds-benefits.jpg',
          width: 1200,
          height: 630,
          alt: 'Pumpkin seeds for prostate health and hormone balance'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Pumpkin Seeds – Benefits for Prostate, Hair, Hormones & Parasites',
      description: 'Evidence-based guide to pumpkin seeds for men\'s health, women\'s health, and family wellness.',
      images: ['https://herbscience.shop/images/herbs/pumpkin-seeds-benefits.jpg']
    },
    alternates: {
      canonical: 'https://herbscience.shop/herbs/pumpkin-seeds'
    }
  }
}

export default function PumpkinSeedsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pumpkin Seeds (Cucurbita pepo) – Benefits for Prostate, Hair, Hormones & Parasites',
    description: 'Evidence-based guide to pumpkin seeds for prostate health, hair loss, hormone balance, menopause, and parasite treatment.',
    image: 'https://herbscience.shop/images/herbs/pumpkin-seeds-benefits.jpg',
    author: {
      '@type': 'Organization',
      name: 'HerbScience',
      url: 'https://herbscience.shop'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      logo: {
        '@type': 'ImageObject',
        url: 'https://herbscience.shop/logo.png'
      }
    },
    mainEntity: {
      '@type': 'Drug',
      name: 'Pumpkin Seeds',
      alternateName: ['南瓜子', 'Cucurbita pepo', 'Pepitas'],
      description: 'Nutrient-packed edible seeds rich in zinc, magnesium, healthy fats, and antioxidants for prostate health, hormone balance, and anti-parasitic effects.',
      activeIngredient: ['Phytosterols (β-sitosterol)', 'Zinc', 'Magnesium', 'Tryptophan', 'Cucurbitin', 'Vitamin E & Selenium'],
      dosageForm: ['Raw seeds', 'Oil', 'Powder', 'Extract'],
      indication: ['Prostate Health (BPH)', 'Hair Loss Prevention', 'Menopause Support', 'Anti-Parasitic', 'Hormone Balance'],
      mechanismOfAction: 'Phytosterols block 5-alpha-reductase, zinc supports hormone production, cucurbitin paralyzes intestinal worms, tryptophan converts to melatonin',
      clinicalPharmacology: 'Studies show 40% hair regrowth after 6 months, reduced urinary symptoms in BPH, fewer hot flashes in menopause, and effective parasite treatment'
    },
    datePublished: '2025-01-19',
    dateModified: new Date().toISOString().split('T')[0]
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can pumpkin seeds help with hair loss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, they block 5-alpha-reductase and support hormone balance, reducing thinning hair. Studies show 40% hair regrowth after 6 months of pumpkin seed extract.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I use pumpkin seeds for parasites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Take 30–50 g of ground raw seeds daily for about a week, ideally on an empty stomach. The cucurbitin paralyzes intestinal worms naturally.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are pumpkin seeds good for women in menopause?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. They reduce hot flashes, improve sleep, and support healthy cholesterol levels through phytosterols and essential fatty acids.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can kids eat pumpkin seeds for worms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, in small amounts. Mix ground seeds with honey or porridge for safe deworming. Use 1 tsp ground seeds for children.'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Herbs', href: '/herb-finder' },
              { label: 'Pumpkin Seeds', href: '/herbs/pumpkin-seeds' }
            ]} 
          />
          
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">🌱</div>
              <div>
                <h1 className="text-4xl font-bold text-green-800 mb-2">
                  Pumpkin Seeds (Cucurbita pepo)
                </h1>
                <p className="text-xl text-gray-600">
                  Benefits for Prostate, Hair, Hormones & Parasites
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Prostate Health', 'Hormonal Balance', 'Heart Health', 'Antioxidant', 'Anti-Parasitic', 'Men\'s Health', 'Women\'s Health', 'Immune Support'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <span>🧠</span> Overview
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Pumpkin seeds, also called <strong>pepitas</strong>, are nutrient-packed edible seeds from the pumpkin fruit. They are rich in <strong>zinc, magnesium, healthy fats, and antioxidants</strong>, making them a superfood with wide-ranging health benefits.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Traditionally used for <strong>prostate support, intestinal parasites, and women's hormonal balance</strong>, pumpkin seeds are now backed by modern studies showing positive effects on <strong>men's fertility, hair growth, menopause relief, heart health, and sleep quality</strong>.
              </p>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <p className="text-green-800 font-medium">
                  👉 If you&apos;re struggling with <strong>prostate issues, hair loss, menopause symptoms, or parasite infections</strong>, pumpkin seeds may be a natural solution worth adding to your diet.
                </p>
              </div>
            </div>
          </div>

          {/* Active Compounds */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <span>⚗️</span> Active Compounds in Pumpkin Seeds
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <strong className="text-gray-800">Phytosterols (β-sitosterol)</strong>
                    <p className="text-gray-600 text-sm">supports prostate health & hormone balance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <strong className="text-gray-800">Zinc</strong>
                    <p className="text-gray-600 text-sm">boosts fertility, immunity, and hair strength</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <strong className="text-gray-800">Magnesium</strong>
                    <p className="text-gray-600 text-sm">relaxes blood vessels, reduces blood pressure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <strong className="text-gray-800">Tryptophan</strong>
                    <p className="text-gray-600 text-sm">promotes melatonin for better sleep</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <strong className="text-gray-800">Cucurbitin</strong>
                    <p className="text-gray-600 text-sm">natural anti-parasitic compound</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <strong className="text-gray-800">Vitamin E & Selenium</strong>
                    <p className="text-gray-600 text-sm">antioxidant defense against aging</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <strong className="text-gray-800">Omega-6 fatty acids & CoQ10</strong>
                    <p className="text-gray-600 text-sm">support heart health & skin vitality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
              <span>💪</span> Benefits & Conditions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Men's Health */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                  <span>🧔</span> For Men's Health
                </h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-800">Prostate Health (BPH):</strong>
                    <p className="text-blue-700 text-sm mt-1">Reduces urinary symptoms and supports normal prostate size</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-800">Male Fertility & Libido:</strong>
                    <p className="text-blue-700 text-sm mt-1">Zinc boosts testosterone and sperm quality</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-800">Hair Loss (Androgenic Alopecia):</strong>
                    <p className="text-blue-700 text-sm mt-1">Supports hair regrowth via hormonal balance</p>
                  </div>
                </div>
              </div>

              {/* Women's Health */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-pink-700 flex items-center gap-2">
                  <span>👩</span> For Women's Health
                </h3>
                <div className="space-y-3">
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <strong className="text-pink-800">Menopause Support:</strong>
                    <p className="text-pink-700 text-sm mt-1">Relieves hot flashes, mood swings, and insomnia</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <strong className="text-pink-800">Skin & Aging:</strong>
                    <p className="text-pink-700 text-sm mt-1">Antioxidants improve elasticity and slow skin aging</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <strong className="text-pink-800">Bone Health:</strong>
                    <p className="text-pink-700 text-sm mt-1">Magnesium and zinc strengthen bones after menopause</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Family & General Health */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-700 flex items-center gap-2">
                  <span>👨‍👩‍👧</span> For Families
                </h3>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <strong className="text-purple-800">Anti-Parasitic:</strong>
                    <p className="text-purple-700 text-sm mt-1">Safe traditional remedy for hookworm and tapeworm infections</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <strong className="text-purple-800">Immune Boost:</strong>
                    <p className="text-purple-700 text-sm mt-1">Strengthens resistance against colds and infections</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                  <span>🌍</span> General Wellness
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Regulates <strong>blood pressure & cholesterol</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Improves <strong>sleep quality</strong> naturally</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Reduces <strong>inflammation & oxidative stress</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dosage Guide */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <span>📏</span> Daily Dose Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <strong className="text-green-800">General Health:</strong>
                  <p className="text-green-700 mt-1">10–30 g daily (1–2 handfuls)</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <strong className="text-orange-800">Parasite Cleanse:</strong>
                  <p className="text-orange-700 mt-1">30–50 g daily × 7–10 days</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <strong className="text-blue-800">Menopause / Hair Loss:</strong>
                  <p className="text-blue-700 mt-1">1 tbsp pumpkin seed oil OR 20–30 g seeds daily</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <strong className="text-purple-800">Children (deworming):</strong>
                  <p className="text-purple-700 mt-1">1 tsp ground seeds mixed with honey or porridge</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
              <span>❓</span> FAQ (User Pain Points)
            </h2>
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Q: Can pumpkin seeds help with hair loss?
                </h3>
                <p className="text-gray-700">
                  A: Yes, they block 5-alpha-reductase and support hormone balance, reducing thinning hair. Studies show 40% hair regrowth after 6 months of pumpkin seed extract.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Q: How do I use pumpkin seeds for parasites?
                </h3>
                <p className="text-gray-700">
                  A: Take 30–50 g of ground raw seeds daily for about a week, ideally on an empty stomach. The cucurbitin paralyzes intestinal worms naturally.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Q: Are pumpkin seeds good for women in menopause?
                </h3>
                <p className="text-gray-700">
                  A: Absolutely. They reduce hot flashes, improve sleep, and support healthy cholesterol levels through phytosterols and essential fatty acids.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Q: Can kids eat pumpkin seeds for worms?
                </h3>
                <p className="text-gray-700">
                  A: Yes, in small amounts. Mix ground seeds with honey or porridge for safe deworming. Use 1 tsp ground seeds for children.
                </p>
              </div>
            </div>
          </div>

          {/* TCM & Safety */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span>🔍</span> TCM Constitution
              </h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <strong className="text-green-800">✅ Best for:</strong>
                  <p className="text-green-700 text-sm mt-1">Qi Deficiency, Kidney Yang Deficiency, Blood Deficiency, Spleen Deficiency</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <strong className="text-red-800">❌ Not for:</strong>
                  <p className="text-red-700 text-sm mt-1">Damp-Heat patterns (bloating, greasy tongue, sluggish digestion)</p>
                </div>
                <p className="text-gray-700 text-sm">
                  👉 In Traditional Chinese Medicine, pumpkin seeds are <strong>warm and tonifying</strong>, suitable for people with fatigue, frequent urination, or hormonal imbalance.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
                <span>⚠️</span> Contraindications
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span className="text-gray-700 text-sm">Avoid if allergic to seeds/nuts</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span className="text-gray-700 text-sm">Use caution with <strong>diuretics or blood pressure medication</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span className="text-gray-700 text-sm">People with <strong>weak digestion or loose stools</strong> should eat in moderation</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span className="text-gray-700 text-sm">Not ideal for <strong>damp-heat constitutions</strong> in TCM terms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Studies */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <span>📚</span> Medical Studies Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <strong className="text-blue-800">Prostate Health:</strong>
                  <p className="text-blue-700 text-sm mt-1">Pumpkin seed oil reduced urinary symptoms in men with BPH.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <strong className="text-green-800">Hair Loss:</strong>
                  <p className="text-green-700 text-sm mt-1">40% hair regrowth after 6 months of pumpkin seed extract (clinical trial).</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <strong className="text-pink-800">Menopause Relief:</strong>
                  <p className="text-pink-700 text-sm mt-1">Women taking pumpkin seed oil had fewer hot flashes & better HDL cholesterol.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <strong className="text-orange-800">Parasite Treatment:</strong>
                  <p className="text-orange-700 text-sm mt-1">Cucurbitin confirmed effective against hookworms & tapeworms.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <strong className="text-purple-800">Sleep Quality:</strong>
                  <p className="text-purple-700 text-sm mt-1">Tryptophan-rich pumpkin seeds improved sleep onset and duration.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <span>🧑‍⚕️</span> Case Study
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Pumpkin Seeds for Pediatric Hookworm Infection
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <strong className="text-gray-800">Patient:</strong>
                    <p className="text-gray-700 text-sm">Female, 4 years old, fatigue, pica, bloating</p>
                  </div>
                  <div>
                    <strong className="text-gray-800">Treatment:</strong>
                    <p className="text-gray-700 text-sm">90–150 g raw pumpkin seeds/day (divided doses) × 4 weeks</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <strong className="text-gray-800">Results:</strong>
                    <p className="text-gray-700 text-sm">Appetite improved, bloating gone, no more hookworm eggs in stool test</p>
                  </div>
                  <div>
                    <strong className="text-gray-800">Clinical Note:</strong>
                    <p className="text-gray-700 text-sm">Safe, effective traditional therapy for children – should complement, not replace, medical care.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
