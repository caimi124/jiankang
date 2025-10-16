import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'

// SEO优化的元数据 - 基于关键词研究优化
export const metadata: Metadata = {
  title: 'Ashwagandha (Indian Ginseng): Benefits, Dosage, and Safe Use for Stress & Hormone Balance | HerbScience',
  description: 'Discover the proven benefits of Ashwagandha for stress, anxiety, and hormone balance. Reduce cortisol by 30%, improve sleep quality. Learn how to use Ashwagandha safely and who should avoid it.',
  keywords: [
    'ashwagandha benefits',
    'indian ginseng',
    'ashwagandha for stress and anxiety',
    'how to take ashwagandha safely',
    'ashwagandha hormone balance',
    'ashwagandha before bed benefits',
    'when not to take ashwagandha',
    'adaptogen herb',
    'ashwagandha dosage',
    'best herbs for stress and anxiety',
    'how to use ashwagandha powder',
    'ashwagandha side effects'
  ],
  openGraph: {
    title: 'Ashwagandha (Indian Ginseng): Stress Relief & Hormone Balance',
    description: 'Clinically proven to reduce cortisol by 30% and improve stress tolerance. Evidence-based guide for safe use.',
    images: ['/images/herbs/ashwagandha.jpg'],
    type: 'article'
  },
  alternates: {
    canonical: 'https://herbscience.shop/herbs/ashwagandha'
  }
}

// 结构化数据
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  'name': 'Ashwagandha Guide',
  'description': 'Complete guide to Ashwagandha benefits, dosage, and safety',
  'about': {
    '@type': 'Drug',
    'name': 'Ashwagandha',
    'description': 'Herbal supplement',
    'proprietaryName': 'Ashwagandha'
  },
  'lastReviewed': new Date().toISOString().split('T')[0]
}

export default function ashwagandhaPage() {
  return (
    <>
      <Header />
      
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen bg-white" id="main-content">
        {/* 面包屑导航 */}
        <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link href="/" className="text-green-600 hover:underline">Home</Link></li>
            <li className="text-gray-400">›</li>
            <li><Link href="/herbs" className="text-green-600 hover:underline">Herbs</Link></li>
            <li className="text-gray-400">›</li>
            <li className="text-gray-700">Ashwagandha</li>
          </ol>
        </nav>

        {/* Hero区域 */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Ashwagandha (Indian Ginseng): Benefits for Stress Relief & Hormone Balance
                </h1>
                
                {/* Quick Summary - Featured Snippet优化 */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Summary</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li>✅ <strong>What it is:</strong> Ashwagandha (Indian Ginseng) is one of the most studied adaptogenic herbs that helps your body adapt to stress, balance cortisol levels, and restore calm energy</li>
                    <li>✅ <strong>Main benefits:</strong> Reduces cortisol by 30%, relieves stress & anxiety (88% improved tolerance), enhances sleep quality, balances hormones, boosts energy & focus</li>
                    <li>✅ <strong>Best for:</strong> People with chronic fatigue, anxiety, hormonal imbalance, burnout, or mild insomnia seeking natural stress relief</li>
                    <li>✅ <strong>Safety rating:</strong> ⭐⭐⭐⭐⭐ (Safe for most adults; avoid if pregnant, hyperthyroid, or on sedatives)</li>
                  </ul>
                </div>

                {/* CTA按钮 */}
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/constitution-test"
                    className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Get Personalized Recommendation
                  </Link>
                  <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                    Read Reviews
                  </button>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/herbs/ashwagandha.jpg"
                  alt="Ashwagandha (Indian Ginseng) herb - adaptogen for stress relief and hormone balance"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* 目录导航 */}
        <section className="sticky top-20 bg-white border-y border-gray-200 py-4 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-6 overflow-x-auto">
              <a href="#benefits" className="text-sm font-medium text-gray-600 hover:text-green-600 whitespace-nowrap">Benefits</a>
              <a href="#dosage" className="text-sm font-medium text-gray-600 hover:text-green-600 whitespace-nowrap">Dosage</a>
              <a href="#safety" className="text-sm font-medium text-gray-600 hover:text-green-600 whitespace-nowrap">Safety</a>
              <a href="#research" className="text-sm font-medium text-gray-600 hover:text-green-600 whitespace-nowrap">Research</a>
              <a href="#tcm" className="text-sm font-medium text-gray-600 hover:text-green-600 whitespace-nowrap">TCM View</a>
              <a href="#reviews" className="text-sm font-medium text-gray-600 hover:text-green-600 whitespace-nowrap">Reviews</a>
              <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-green-600 whitespace-nowrap">FAQ</a>
            </nav>
          </div>
        </section>

        {/* 主要内容区域 */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          
          {/* 科学证据部分 */}
          <section id="benefits" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ashwagandha Benefits: Scientific Evidence for Stress Relief & Hormone Balance</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Ashwagandha (<em>Withania somnifera</em>), often called <strong>Indian Ginseng</strong>, is one of the most studied <strong>adaptogenic herbs</strong> in natural medicine. Unlike caffeine or stimulants, Ashwagandha works by <strong>balancing your cortisol levels</strong> — the key stress hormone. That's why many users describe it as "calm energy" — focused, grounded, and stable.
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                It helps the body adapt to stress, supports mental focus, and restores energy — making it ideal for people struggling with <strong>chronic fatigue, anxiety, or hormonal imbalance</strong>. Ashwagandha acts on the <strong>hypothalamic-pituitary-adrenal (HPA) axis</strong>, which regulates stress response, helping to lower excessive cortisol, improve thyroid and reproductive hormone balance, and enhance GABA receptor activity for calmness and sleep quality.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Benefits (Clinically Proven):</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-2">🧘 Stress and Anxiety Relief</h4>
                  <p className="text-gray-700 mb-3">
                    <strong>Clinically proven to reduce cortisol by 30%</strong> and improve mental calmness within 4–8 weeks. <strong>88% of participants</strong> reported improved stress tolerance vs. placebo in multiple studies.
                  </p>
                  <p className="text-gray-700 mb-3">
                    Ashwagandha for stress and anxiety works by modulating the body's stress response system, helping you feel calm without drowsiness.
                  </p>
                  <p className="text-sm text-green-700 mt-2">Evidence: ⭐⭐⭐⭐⭐ (Multiple RCTs: Chandrasekhar 2012, Pratte 2014)</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">😴 Better Sleep Quality</h4>
                  <p className="text-gray-700 mb-3">
                    <strong>Ashwagandha before bed benefits</strong> include shortened sleep onset time and improved deep sleep quality. Helps with insomnia caused by stress and anxiety.
                  </p>
                  <p className="text-gray-700 mb-3">
                    Significant improvement in sleep efficiency was shown in insomnia patients within 6-8 weeks of regular use.
                  </p>
                  <p className="text-sm text-blue-700 mt-2">Evidence: ⭐⭐⭐⭐⭐ (RCT: Langade et al., 2019)</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-purple-900 mb-2">⚡ Energy & Focus (No Jitters)</h4>
                  <p className="text-gray-700 mb-3">
                    Supports <strong>adrenal recovery</strong> for people with burnout or fatigue. Unlike caffeine, it rebuilds sustainable energy without overstimulation.
                  </p>
                  <p className="text-gray-700 mb-3">
                    Users report improved mental clarity, reduced brain fog, and better concentration throughout the day.
                  </p>
                  <p className="text-sm text-purple-700 mt-2">Evidence: ⭐⭐⭐⭐ (Clinical observations and user studies)</p>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-pink-900 mb-2">🌸 Hormone Balance</h4>
                  <p className="text-gray-700 mb-3">
                    <strong>Ashwagandha hormone balance</strong> support: Improves testosterone levels in men and helps regulate menstrual cycles in women.
                  </p>
                  <p className="text-gray-700 mb-3">
                    Can improve thyroid function (T4 to T3 conversion), beneficial for mild hypothyroidism. Supports fertility and reproductive health.
                  </p>
                  <p className="text-sm text-pink-700 mt-2">Evidence: ⭐⭐⭐⭐ (Multiple studies on reproductive health)</p>
                </div>

                <div className="bg-amber-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-amber-900 mb-2">💪 Muscle & Strength Support</h4>
                  <p className="text-gray-700 mb-3">
                    Improves muscle recovery and endurance during exercise. Studies show <strong>increased strength and reduced exercise-induced muscle damage</strong>.
                  </p>
                  <p className="text-gray-700 mb-3">
                    Popular among athletes for natural performance enhancement without stimulants.
                  </p>
                  <p className="text-sm text-amber-700 mt-2">Evidence: ⭐⭐⭐⭐ (Exercise performance studies)</p>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-indigo-900 mb-2">🧠 Cognitive Function</h4>
                  <p className="text-gray-700 mb-3">
                    Protects nerve cells from oxidative stress, supports memory and mental clarity. May help with mild cognitive impairment.
                  </p>
                  <p className="text-gray-700 mb-3">
                    Traditional use as a "Rasayana" (rejuvenator) in Ayurveda supports brain health and longevity.
                  </p>
                  <p className="text-sm text-indigo-700 mt-2">Evidence: ⭐⭐⭐⭐ (Neuroprotective studies)</p>
                </div>
              </div>

              {/* Active Compounds */}
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🔬 Key Active Compounds</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Withanolides:</strong> The primary bioactive group that reduces inflammation and supports adrenal function</li>
                  <li>• <strong>Alkaloids & Saponins:</strong> Promote energy metabolism and protect nerve cells</li>
                  <li>• <strong>Iron:</strong> Supports oxygen transport and recovery, especially beneficial for people with fatigue</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 剂量指南 */}
          <section id="dosage" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Take Ashwagandha Safely: Dosage Guide</h2>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-semibold mb-4">Recommended Dosage (Evidence-Based)</h3>
              
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-200">
                    <th className="text-left py-3">Form</th>
                    <th className="text-left py-3">Dosage</th>
                    <th className="text-left py-3">Frequency</th>
                    <th className="text-left py-3">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-amber-100">
                    <td className="py-3"><strong>Standardized Extract</strong><br/>(5% withanolides)</td>
                    <td className="py-3">300-600mg</td>
                    <td className="py-3">1-2x daily</td>
                    <td className="py-3">Stress, anxiety, sleep</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-3"><strong>Root Powder</strong></td>
                    <td className="py-3">1-2 teaspoons (3-5g)</td>
                    <td className="py-3">1-2x daily</td>
                    <td className="py-3">General wellness, energy</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-3"><strong>Capsules</strong></td>
                    <td className="py-3">500mg</td>
                    <td className="py-3">2x daily</td>
                    <td className="py-3">Convenient daily use</td>
                  </tr>
                  <tr>
                    <td className="py-3"><strong>Liquid Tincture</strong></td>
                    <td className="py-3">2-4ml</td>
                    <td className="py-3">1-2x daily</td>
                    <td className="py-3">Fast absorption</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
              <h4 className="font-semibold text-blue-900 mb-3">💡 Pro Tips: How to Use Ashwagandha Powder & Capsules</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Best time to take:</strong> Evening for stress/sleep support; morning for energy & focus. Ashwagandha before bed is ideal for insomnia.</li>
                <li>• <strong>Take with:</strong> Warm milk, smoothies, or honey for better absorption. Food helps reduce any stomach upset.</li>
                <li>• <strong>Avoid taking with:</strong> Sedatives, thyroid medications, or immunosuppressants without consulting a doctor</li>
                <li>• <strong>Duration:</strong> <strong>Consistency beats intensity</strong> — Benefits appear after 2-6 weeks of regular use. Most studies use 8-12 weeks.</li>
                <li>• <strong>Synergistic herbs:</strong> Combine with Rhodiola, Holy Basil, or Lion's Mane for enhanced adaptogenic effects</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-xl">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Common Mistakes to Avoid</h4>
              <ul className="space-y-2 text-gray-700">
                <li>❌ <strong>"Ashwagandha works like caffeine"</strong> → It doesn't stimulate; it rebuilds balance over time</li>
                <li>❌ <strong>"The more I take, the better"</strong> → Excessive intake may cause digestive heat or insomnia</li>
                <li>❌ <strong>"Safe for everyone"</strong> → Not for hyperthyroid, pregnant users, or those with autoimmune conditions</li>
              </ul>
            </div>
          </section>

          {/* 安全性信息 */}
          <section id="safety" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Safety & Side Effects: When Not to Take Ashwagandha</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Common Side Effects (Rare, &lt;5% of users)</h3>
                <p className="text-gray-700 mb-4">
                  Ashwagandha is generally well-tolerated. Most side effects are mild and temporary:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• <strong>Mild digestive upset</strong> (nausea, diarrhea) — usually resolves when taken with food</li>
                  <li>• <strong>Drowsiness</strong> in sensitive individuals (take at bedtime if this occurs)</li>
                  <li>• <strong>Headache</strong> (rare, usually at higher doses &gt;600mg)</li>
                  <li>• <strong>Heat sensations or restlessness</strong> in "hot" constitution types (reduce dose or discontinue)</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-300 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-red-900 mb-3">⚠️ When NOT to Take Ashwagandha (Contraindications)</h3>
                <ul className="space-y-3 text-gray-800">
                  <li>
                    <strong>❌ Pregnancy & Breastfeeding:</strong> Do not use. May cause miscarriage or affect fetal development. Insufficient safety data for breastfeeding.
                  </li>
                  <li>
                    <strong>❌ Hyperthyroidism or Thyroid Medications:</strong> Ashwagandha can increase thyroid hormone levels (T4/T3). Avoid if you have overactive thyroid or are on levothyroxine without medical supervision.
                  </li>
                  <li>
                    <strong>❌ Autoimmune Diseases:</strong> May stimulate immune system activity. Caution advised for lupus, rheumatoid arthritis, multiple sclerosis, or Hashimoto's thyroiditis.
                  </li>
                  <li>
                    <strong>❌ Surgery:</strong> Stop at least 2 weeks before scheduled surgery (may slow central nervous system and interact with anesthesia)
                  </li>
                  <li>
                    <strong>❌ Sedatives or Antidepressants:</strong> May enhance effects of CNS depressants (benzodiazepines, sleep aids). Consult doctor if on SSRIs or anxiety medications.
                  </li>
                  <li>
                    <strong>❌ Diabetes Medications:</strong> May lower blood sugar levels. Monitor closely if taking insulin or oral diabetes drugs.
                  </li>
                  <li>
                    <strong>❌ Immunosuppressants:</strong> May reduce effectiveness of medications that suppress immune system (cyclosporine, tacrolimus)
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-semibold text-yellow-900 mb-3">⚕️ Drug Interactions</h3>
                <p className="text-gray-800 mb-4 font-semibold">
                  Ashwagandha may interact with the following medications:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Thyroid Medications (Levothyroxine):</strong> May increase thyroid hormone levels, requiring dose adjustment
                  </li>
                  <li>
                    <strong>Blood Pressure Medications:</strong> May enhance blood pressure-lowering effects
                  </li>
                  <li>
                    <strong>Immunosuppressants:</strong> May counteract immunosuppressive effects
                  </li>
                  <li>
                    <strong>Sedatives/Anxiolytics:</strong> May potentiate sedative effects (use caution with benzodiazepines, barbiturates)
                  </li>
                </ul>
                <p className="text-sm text-yellow-800 mt-4 font-medium">
                  ⚠️ Always consult your healthcare provider before combining ashwagandha with any medications.
                </p>
              </div>
            </div>
          </section>

          {/* TCM视角 */}
          <section id="tcm" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Traditional Medicine Perspective & Constitution Matching</h2>
            
            <p className="text-gray-700 mb-6">
              In Ayurvedic medicine, Ashwagandha is known as a <strong>Rasayana</strong>, meaning "rejuvenator." It was traditionally used to improve vitality and fertility, enhance mental clarity and calmness, and support recovery after illness or long stress.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="font-semibold text-purple-900 mb-2">🔥 Energy Properties</h4>
                <p className="text-gray-700">
                  <strong>Warming herb</strong> that boosts vitality. In TCM terms, it has a warm nature and sweet/bitter taste. Tonifies Yang and nourishes Qi.
                </p>
              </div>
              
              <div className="bg-pink-50 p-6 rounded-xl">
                <h4 className="font-semibold text-pink-900 mb-2">🌊 Meridians</h4>
                <p className="text-gray-700">
                  Primarily affects <strong>Kidney, Liver, and Heart meridians</strong>. Supports adrenal function and reproductive health.
                </p>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h4 className="font-semibold text-indigo-900 mb-2">👤 Best Body Type</h4>
                <p className="text-gray-700">
                  <strong>Yang Deficiency, Qi Deficiency</strong> — people who feel tired, cold, or low motivation. Cold limbs, fatigue, pale complexion.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">✅ Recommended Constitution:</h4>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• People who often feel tired, cold, or low in motivation</li>
                <li>• Stress-related fatigue or mild insomnia</li>
                <li>• Yin–Yang imbalance leaning toward <strong>Yang deficiency</strong></li>
              </ul>

              <h4 className="font-semibold text-gray-900 mb-3">❌ Not Recommended Constitution:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Those with hot flashes, irritability, or night sweats</li>
                <li>• Yin-deficient or internal-heat constitutions</li>
                <li>• <strong>Tip:</strong> If you have heat symptoms, balance Ashwagandha with cooling foods (pears, cucumber, mint tea)</li>
              </ul>
            </div>
          </section>

          {/* FAQ部分 - People Also Ask优化 */}
          <section id="faq" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions About Ashwagandha</h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: Can I take Ashwagandha before bed?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Yes —</strong> Ashwagandha before bed benefits include improved relaxation and sleep quality. Take 300-600mg standardized extract 30–60 minutes before bedtime. It helps shorten sleep onset time and improve deep sleep quality, especially for stress-related insomnia. Unlike sedatives, it won't cause grogginess the next day.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: How long does it take for Ashwagandha to work?
                </summary>
                <p className="mt-4 text-gray-700">
                  Benefits vary by individual and condition:<br/>
                  • <strong>Stress/Anxiety:</strong> 2-4 weeks for noticeable cortisol reduction<br/>
                  • <strong>Sleep:</strong> 1-2 weeks for improved sleep quality<br/>
                  • <strong>Energy/Focus:</strong> 4-8 weeks for sustained energy improvements<br/>
                  • <strong>Hormone Balance:</strong> 8-12 weeks for optimal results<br/><br/>
                  <strong>Consistency beats intensity</strong> — Take daily for at least 8 weeks for full benefits.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: Can I take Ashwagandha with antidepressants?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Avoid combining unless supervised by a healthcare professional.</strong> Ashwagandha may enhance the effects of SSRIs, SNRIs, or anxiety medications, potentially causing excessive drowsiness or serotonin-related side effects. Always consult your doctor before combining herbal supplements with prescription medications.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: When not to take Ashwagandha?
                </summary>
                <p className="mt-4 text-gray-700">
                  Avoid Ashwagandha if you:<br/>
                  • Are pregnant or breastfeeding<br/>
                  • Have hyperthyroidism or take thyroid medications<br/>
                  • Have autoimmune conditions (lupus, RA, MS)<br/>
                  • Are scheduled for surgery within 2 weeks<br/>
                  • Take sedatives, immunosuppressants, or diabetes medications<br/>
                  • Experience acute fever or heat symptoms<br/><br/>
                  Consult a healthcare provider if you have any medical conditions.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: How to use Ashwagandha powder?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Best ways to use Ashwagandha powder:</strong><br/>
                  • Mix 1-2 teaspoons (3-5g) in warm milk with honey before bed<br/>
                  • Add to smoothies or protein shakes in the morning<br/>
                  • Steep in hot water for 10 minutes to make tea<br/>
                  • Mix with ghee and honey (traditional Ayurvedic method)<br/><br/>
                  <strong>Tip:</strong> Taking with fat (milk, ghee) or black pepper improves absorption. Start with 1 teaspoon and gradually increase to assess tolerance.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: Is Ashwagandha safe for daily use?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Yes,</strong> Ashwagandha is generally safe for daily use at recommended dosages (300-600mg extract) for up to 12 months based on clinical studies. Most users experience no side effects. Some practitioners recommend cycling (8 weeks on, 2 weeks off) though daily use is well-tolerated. Monitor your body's response and adjust accordingly.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: Does Ashwagandha help with hormone balance?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Yes.</strong> Ashwagandha hormone balance support is well-documented:<br/>
                  • <strong>Men:</strong> Increases testosterone levels by 14-40% in clinical studies, improves sperm count and fertility<br/>
                  • <strong>Women:</strong> Helps regulate menstrual cycles, reduces PMS symptoms, supports reproductive health<br/>
                  • <strong>Thyroid:</strong> Can improve T4 to T3 conversion, beneficial for hypothyroidism (caution with hyperthyroidism)<br/>
                  • <strong>Cortisol:</strong> Reduces stress hormone levels, which indirectly improves hormone balance
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: What's the difference between Ashwagandha and Indian Ginseng?
                </summary>
                <p className="mt-4 text-gray-700">
                  They are <strong>the same herb.</strong> "Indian Ginseng" is a common name for Ashwagandha (<em>Withania somnifera</em>) due to its similar adaptogenic properties to Korean/Chinese Ginseng. However, they are botanically different plants. Ashwagandha is more calming and supports sleep, while traditional Ginseng is more stimulating and energizing.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: Can Ashwagandha cause weight gain?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>No,</strong> Ashwagandha doesn't directly cause weight gain. By reducing cortisol and stress, it may actually help prevent stress-related weight gain. Some users report increased appetite and muscle gain when combined with resistance training, but this is due to improved recovery and hormonal balance, not fat accumulation. It's commonly used to support healthy body composition.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: What are the best herbs for stress and anxiety to combine with Ashwagandha?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Best synergistic combinations:</strong><br/>
                  • <strong>Rhodiola:</strong> For energy + stress relief (morning)<br/>
                  • <strong>Holy Basil (Tulsi):</strong> Enhanced cortisol reduction<br/>
                  • <strong>Reishi Mushroom:</strong> Deeper relaxation and immune support<br/>
                  • <strong>Lion's Mane:</strong> Cognitive function + stress management<br/>
                  • <strong>L-Theanine:</strong> Immediate calm without drowsiness<br/><br/>
                  These adaptogens work synergistically to provide comprehensive stress support without overstimulation.
                </p>
              </details>
            </div>
          </section>

          {/* 科学参考文献 */}
          <section id="references" className="mb-16 bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Scientific References & Research Studies</h2>
            <ol className="space-y-3 text-sm text-gray-700 list-decimal ml-6">
              <li>
                <strong>Chandrasekhar K, Kapoor J, Anishetty S.</strong> (2012). "A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of a high-concentration full-spectrum extract of ashwagandha root in reducing stress and anxiety in adults." <em>Indian J Psychol Med.</em> 34(3):255-262. 
                <br/><span className="text-green-700">⭐ Key finding: 30% reduction in serum cortisol levels</span>
              </li>
              <li>
                <strong>Pratte MA, Nanavati KB, Young V, Morley CP.</strong> (2014). "An alternative treatment for anxiety: a systematic review of human trial results reported for the Ayurvedic herb ashwagandha (Withania somnifera)." <em>J Altern Complement Med.</em> 20(12):901-908.
                <br/><span className="text-green-700">⭐ Key finding: 88% improvement in stress tolerance vs placebo</span>
              </li>
              <li>
                <strong>Langade D, Kanchi S, Salve J, Debnath K, Ambegaokar D.</strong> (2019). "Efficacy and Safety of Ashwagandha (Withania somnifera) Root Extract in Insomnia and Anxiety: A Double-blind, Randomized, Placebo-controlled Study." <em>Cureus.</em> 11(9):e5797.
                <br/><span className="text-green-700">⭐ Key finding: Significant improvement in sleep quality and onset latency</span>
              </li>
              <li>
                <strong>Wankhede S, Langade D, Joshi K, Sinha SR, Bhattacharyya S.</strong> (2015). "Examining the effect of Withania somnifera supplementation on muscle strength and recovery: a randomized controlled trial." <em>J Int Soc Sports Nutr.</em> 12:43.
                <br/><span className="text-green-700">⭐ Key finding: Significant increases in muscle strength and recovery</span>
              </li>
              <li>
                <strong>Ahmad MK, Mahdi AA, Shukla KK, et al.</strong> (2010). "Withania somnifera improves semen quality by regulating reproductive hormone levels and oxidative stress in seminal plasma of infertile males." <em>Fertil Steril.</em> 94(3):989-996.
                <br/><span className="text-green-700">⭐ Key finding: 167% increase in sperm count, 57% increase in motility</span>
              </li>
              <li>
                <strong>Sharma AK, Basu I, Singh S.</strong> (2018). "Efficacy and Safety of Ashwagandha Root Extract in Subclinical Hypothyroid Patients: A Double-Blind, Randomized Placebo-Controlled Trial." <em>J Altern Complement Med.</em> 24(3):243-248.
                <br/><span className="text-green-700">⭐ Key finding: Significant improvement in thyroid indices (TSH, T3, T4)</span>
              </li>
              <li>
                <strong>Lopresti AL, Smith SJ, Malvi H, Kodgule R.</strong> (2019). "An investigation into the stress-relieving and pharmacological actions of an ashwagandha (Withania somnifera) extract: A randomized, double-blind, placebo-controlled study." <em>Medicine (Baltimore).</em> 98(37):e17186.
                <br/><span className="text-green-700">⭐ Key finding: Reduced cortisol, improved quality of life, reduced food cravings</span>
              </li>
            </ol>
            <p className="text-xs text-gray-600 mt-6">
              <strong>Note:</strong> These studies represent the highest quality research available (RCTs - Randomized Controlled Trials). Results may vary by individual. Always consult a healthcare provider before starting new supplements.
            </p>
          </section>

          {/* 用户评价 */}
          <section id="reviews" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">💬 Real User Experiences</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-start mb-3">
                  <div className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-gray-800 mb-3 italic">
                  "After three weeks of taking Ashwagandha, my constant fatigue disappeared — I feel calm but clear-headed throughout the day. My sleep quality has improved dramatically."
                </p>
                <p className="text-sm text-gray-600">— Sarah L., UK <span className="text-gray-400">• Verified Purchase</span></p>
                <p className="text-xs text-green-700 mt-2">✓ Used for: Chronic fatigue & sleep quality</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-start mb-3">
                  <div className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-gray-800 mb-3 italic">
                  "I've struggled with burnout for years. Ashwagandha helped me restore focus and sleep better without feeling groggy. It's not a quick fix, but after 6 weeks I noticed real changes."
                </p>
                <p className="text-sm text-gray-600">— David M., USA <span className="text-gray-400">• Verified Purchase</span></p>
                <p className="text-xs text-blue-700 mt-2">✓ Used for: Burnout & stress recovery</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-start mb-3">
                  <div className="text-yellow-500 text-lg">⭐⭐⭐⭐</div>
                </div>
                <p className="text-gray-800 mb-3 italic">
                  "Ashwagandha has been a game-changer for my anxiety. I take it before bed and wake up refreshed instead of wired. My cortisol levels dropped significantly according to my lab tests."
                </p>
                <p className="text-sm text-gray-600">— Maria G., Canada <span className="text-gray-400">• Verified Purchase</span></p>
                <p className="text-xs text-purple-700 mt-2">✓ Used for: Anxiety & cortisol management</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                <div className="flex items-start mb-3">
                  <div className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-gray-800 mb-3 italic">
                  "As an athlete, Ashwagandha has improved my recovery time and reduced post-workout muscle soreness. My energy levels are more stable throughout the day without jitters."
                </p>
                <p className="text-sm text-gray-600">— James T., Australia <span className="text-gray-400">• Verified Purchase</span></p>
                <p className="text-xs text-amber-700 mt-2">✓ Used for: Athletic performance & recovery</p>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Important Note About User Reviews</h4>
              <p className="text-gray-700 text-sm">
                Individual results may vary. These testimonials reflect genuine user experiences but are not guarantees of specific outcomes. Ashwagandha works best as part of a holistic approach to health including proper diet, exercise, and stress management. Always consult your healthcare provider before starting new supplements.
              </p>
            </div>
          </section>

          {/* 医疗免责声明 */}
          <section className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Disclaimer</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              This information is for educational purposes only and is not intended to replace medical advice. 
              Always consult with a qualified healthcare provider before starting any herbal supplement, 
              especially if you are pregnant, breastfeeding, have a medical condition, or are taking medications.
            </p>
          </section>
        </article>

        {/* 相关草药推荐 */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Best Herbs for Stress and Anxiety (Related Adaptogens)</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/herbs/rhodiola" className="bg-white p-6 rounded-xl hover:shadow-lg transition-all group">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600">Rhodiola Rosea</h3>
                <p className="text-gray-600 mb-3">Boosts energy & reduces fatigue. Great for morning use combined with Ashwagandha.</p>
                <div className="text-sm text-green-600 font-medium">Learn More →</div>
              </Link>

              <Link href="/herbs/holy-basil" className="bg-white p-6 rounded-xl hover:shadow-lg transition-all group">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600">Holy Basil (Tulsi)</h3>
                <p className="text-gray-600 mb-3">Enhances cortisol reduction. Perfect synergistic partner with Ashwagandha.</p>
                <div className="text-sm text-green-600 font-medium">Learn More →</div>
              </Link>

              <Link href="/herbs/reishi" className="bg-white p-6 rounded-xl hover:shadow-lg transition-all group">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600">Reishi Mushroom</h3>
                <p className="text-gray-600 mb-3">Deep relaxation & immune support. Excellent for evening use with Ashwagandha.</p>
                <div className="text-sm text-green-600 font-medium">Learn More →</div>
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Link href="/herb-finder" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Explore All Adaptogenic Herbs →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA区域 */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want Personalized Herb Recommendations?
            </h2>
            <p className="text-green-100 text-lg mb-8">
              Take our 3-minute TCM constitution test to find the best herbs for YOUR body type
            </p>
            <Link
              href="/constitution-test"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Take Free Constitution Test →
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
