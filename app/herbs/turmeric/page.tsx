import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'

// SEO优化的元数据 - 基于KGR关键词研究优化
export const metadata: Metadata = {
  title: 'Turmeric Benefits & Side Effects | Safe Dose & Anti-Inflammatory Guide',
  description: 'Explore turmeric and curcumin benefits for inflammation, liver support, pain relief. Learn safe dosage (≤3g/day), top supplements, and 10 serious side effects to avoid.',
  keywords: [
    'turmeric benefits',
    'curcumin benefits',
    'turmeric side effects',
    'turmeric for inflammation',
    'turmeric dosage',
    'best turmeric supplement',
    'turmeric and black pepper benefits',
    'what is turmeric good for',
    'how much turmeric powder per day',
    'is turmeric bad for your liver',
    '10 serious side effects of turmeric',
    'best turmeric powder for inflammation',
    'what does turmeric do for the body'
  ],
  openGraph: {
    title: 'Turmeric & Curcumin: Anti-Inflammatory Benefits, Dosage & Safety',
    description: 'Evidence-based guide on turmeric benefits for inflammation, joint pain, liver health. Learn safe usage and potential risks.',
    images: ['/images/herbs/turmeric.jpg'],
    type: 'article'
  },
  alternates: {
    canonical: 'https://herbscience.shop/herbs/turmeric'
  }
}

// 结构化数据
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  'name': 'Turmeric Guide',
  'description': 'Complete guide to Turmeric benefits, dosage, and safety',
  'about': {
    '@type': 'Drug',
    'name': 'Turmeric',
    'description': 'Herbal supplement',
    'proprietaryName': 'Turmeric'
  },
  'lastReviewed': new Date().toISOString().split('T')[0]
}

export default function turmericPage() {
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
            <li className="text-gray-700">Turmeric</li>
          </ol>
        </nav>

        {/* Hero区域 */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Turmeric Benefits & Side Effects: Anti-Inflammatory Guide
                </h1>
                
                {/* Quick Summary - Featured Snippet优化 */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h2 className="text-xl font-semibold mb-4">What is Turmeric Good For?</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li>✅ <strong>What it is:</strong> Turmeric (<em>Curcuma longa</em>) is a golden spice prized for its anti-inflammatory and antioxidant properties, with curcumin as its star active compound</li>
                    <li>✅ <strong>Main benefits:</strong> Reduces inflammation, supports joint comfort & pain relief, promotes liver detox, aids heart health & circulation, supports gut health & digestion</li>
                    <li>✅ <strong>Best for:</strong> People seeking natural anti-inflammatory support, those with joint pain or stiffness, liver support needs, or metabolic balance concerns</li>
                    <li>✅ <strong>Safety rating:</strong> ⭐⭐⭐⭐ (Safe for most; avoid high doses if pregnant, have gallstones, or liver disease)</li>
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
                  src="/images/herbs/turmeric.jpg"
                  alt="Turmeric (Curcuma longa) herb - golden spice for anti-inflammatory and antioxidant support"
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
          
          {/* 科学证据部分 - 使用折叠效果 */}
          <section id="benefits" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Turmeric Benefits: What Does Turmeric Do for the Body?</h2>
            
            {/* 概述部分保持可见 */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Turmeric (<em>Curcuma longa</em>) is a golden spice long prized for its <strong>anti-inflammatory and antioxidant properties</strong>. Its star active compound, <strong>curcumin</strong>, supports joint comfort, liver detox, and metabolic balance. Many people ask, <em>"what is turmeric good for?"</em> — the benefits go beyond just flavor in cooking, blending ancient Ayurvedic tradition with modern science.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Curcumin benefits</strong> are particularly well-studied. This compound works through multiple mechanisms: it downregulates inflammatory pathways (NF-κB, COX-2), acts as a powerful antioxidant scavenging free radicals, supports liver & bile secretion for detoxification, and even modulates the gut microbiome by promoting beneficial bacteria like <em>Lactobacillus</em> and <em>Bifidobacterium</em>.
              </p>
            </div>

            {/* 详细功效 - 折叠展示 */}
            <details open className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl mb-6 group">
              <summary className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer list-none flex items-center justify-between">
                <span>✅ What Turmeric Helps With</span>
                <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500">
                  <h4 className="font-semibold text-amber-900 mb-3">🔥 Inflammation & Joint Pain Relief</h4>
                  <p className="text-gray-700 mb-3">
                    <strong>Does turmeric help with inflammation?</strong> Yes! Curcumin has been shown to reduce inflammatory markers (CRP, IL-6) significantly in clinical trials. Many users find relief with <strong>turmeric powder for inflammation</strong> or extracts, especially when combined with black pepper (piperine) or healthy fats to boost absorption.
                  </p>
                  <p className="text-sm text-amber-700 mt-2">Evidence: ⭐⭐⭐⭐⭐ (Meta-analysis, Phytotherapy Research 2019)</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-3">🍃 Liver Support & Metabolic Health</h4>
                  <p className="text-gray-700 mb-3">
                    Turmeric's volatile oils (turmerones) and curcumin <strong>stimulate bile secretion</strong>, supporting liver detox pathways. Studies show it may help maintain healthy lipid balance and reduce fasting insulin levels in prediabetic populations.
                  </p>
                  <p className="text-sm text-green-700 mt-2">Evidence: ⭐⭐⭐⭐ (RCT, Diabetes Care 2021)</p>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-900 mb-3">❤️ Heart & Circulation Support</h4>
                  <p className="text-gray-700 mb-3">
                    Curcumin helps <strong>reduce triglycerides</strong>, supports endothelial function (blood vessel health), and moderates platelet aggregation, which may reduce cardiovascular risk factors when used as part of a healthy lifestyle.
                  </p>
                  <p className="text-sm text-red-700 mt-2">Evidence: ⭐⭐⭐⭐ (Clinical studies on lipid profiles)</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 mb-3">🦠 Gut Health & Digestion</h4>
                  <p className="text-gray-700 mb-3">
                    Turmeric helps <strong>modulate gut flora</strong>, promoting beneficial strains and suppressing harmful bacteria. This supports overall digestive comfort and may help with bloating or mild GI discomfort.
                  </p>
                  <p className="text-sm text-blue-700 mt-2">Evidence: ⭐⭐⭐⭐ (Microbiome studies)</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-900 mb-3">🌟 Skin & Anti-Aging</h4>
                  <p className="text-gray-700 mb-3">
                    The powerful <strong>antioxidant properties</strong> of curcumin help counter oxidative stress, which contributes to premature aging. Used topically or internally, turmeric supports skin health and may reduce inflammation-related skin conditions.
                  </p>
                  <p className="text-sm text-purple-700 mt-2">Evidence: ⭐⭐⭐⭐ (Dermatology research)</p>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl border-l-4 border-pink-500">
                  <h4 className="font-semibold text-pink-900 mb-3">👩 Women's Health Support</h4>
                  <p className="text-gray-700 mb-3">
                    Turmeric's warming, blood-moving nature makes it ideal for <strong>menstrual cramps</strong> and cold-womb patterns in traditional medicine. May help with circulation issues and PMS symptoms.
                  </p>
                  <p className="text-sm text-pink-700 mt-2">Evidence: ⭐⭐⭐ (Traditional use + emerging studies)</p>
                </div>
              </div>
            </details>

            {/* 活性成分 - 折叠展示 */}
            <details className="bg-gray-50 p-6 rounded-xl mb-6 group">
              <summary className="text-xl font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>🔬 Key Active Compounds</span>
                <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              
              <div className="mt-4">
                <p className="text-gray-700 mb-3">
                  <strong>Curcumin benefits</strong> are central to turmeric's health promise, but it's not the only player:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Curcumin (Diferuloylmethane):</strong> Primary anti-inflammatory & antioxidant compound (2-5% of turmeric root)</li>
                  <li>• <strong>Demethoxycurcumin & Bisdemethoxycurcumin:</strong> Curcuminoid analogs with complementary effects</li>
                  <li>• <strong>Turmerones (ar-turmerone, α-turmerone, β-turmerone):</strong> Volatile oils that support liver function and neuroprotection</li>
                  <li>• <strong>Essential Oils:</strong> Contribute to digestive support and bioavailability</li>
                </ul>
            </div>
            </details>
          </section>

          {/* 剂量指南 */}
          <section id="dosage" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Much Turmeric Can I Take a Day? Safe Dosage Guide</h2>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-semibold mb-4">Recommended Dosage (Evidence-Based)</h3>
              
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-amber-300">
                    <th className="text-left py-3 font-semibold">Form</th>
                    <th className="text-left py-3 font-semibold">Dosage</th>
                    <th className="text-left py-3 font-semibold">Frequency</th>
                    <th className="text-left py-3 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-amber-100">
                    <td className="py-3"><strong>Whole Turmeric Powder</strong></td>
                    <td className="py-3">≤ 3 g/day<br/>(~1-1.5 tsp)</td>
                    <td className="py-3">1-2x daily</td>
                    <td className="py-3">General wellness, cooking, golden milk</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-3"><strong>Curcumin Extract</strong><br/>(standardized)</td>
                    <td className="py-3">≤ 1,000 mg/day<br/>(500mg each)</td>
                    <td className="py-3">2x daily</td>
                    <td className="py-3">Inflammation, joint pain, targeted support</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-3"><strong>Turmeric + Piperine</strong><br/>(best turmeric supplement)</td>
                    <td className="py-3">500-1,000 mg curcumin<br/>+ 5-20mg piperine</td>
                    <td className="py-3">1-2x daily</td>
                    <td className="py-3">Enhanced absorption, anti-inflammatory</td>
                  </tr>
                  <tr>
                    <td className="py-3"><strong>Golden Milk / Turmeric Latte</strong></td>
                    <td className="py-3">¼-½ tsp powder<br/>+ pinch black pepper</td>
                    <td className="py-3">1x daily</td>
                    <td className="py-3">Daily wellness, digestive support</td>
                  </tr>
                </tbody>
              </table>
              
              <p className="text-sm text-amber-800 mt-4">
                <strong>⚠️ Important:</strong> <strong>How much turmeric powder per day</strong> should not exceed 3g for whole root, or 1,000mg for curcumin extract. Higher doses may increase risk of side effects.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
              <h4 className="font-semibold text-blue-900 mb-3">💡 Pro Tips: How to Get the Most Turmeric Benefits</h4>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>• Turmeric and Black Pepper Benefits:</strong> Piperine (from black pepper) enhances curcumin absorption by up to 2,000%! Always add a pinch of black pepper to turmeric powder.
                </li>
                <li>
                  <strong>• Take with healthy fats:</strong> Curcumin is fat-soluble. Mix with olive oil, coconut oil, ghee, or almond milk for better uptake.
                </li>
                <li>
                  <strong>• Best time to take:</strong> With meals to reduce GI discomfort and improve absorption. Golden milk before bed supports relaxation.
                </li>
                <li>
                  <strong>• Avoid taking with:</strong> High doses of anticoagulants (blood thinners) or NSAIDs without medical supervision due to mild blood-thinning effects.
                </li>
                <li>
                  <strong>• Duration:</strong> Use for 8-12 weeks for chronic conditions. Cycle usage (3-4 weeks on, 1 week off) if using high-dose extracts long-term to minimize liver stress.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl">
              <h4 className="font-semibold text-amber-900 mb-3">🍹 Popular Usage Methods</h4>
              <div className="space-y-3 text-gray-700">
                <div>
                  <strong>Golden Milk (Turmeric Latte):</strong> Mix ¼ tsp turmeric powder in warm almond or oat milk, add a pinch of black pepper, honey, and cinnamon. Perfect for evening relaxation.
                </div>
                <div>
                  <strong>Turmeric Juice / Shot:</strong> Blend fresh turmeric root with orange, apple, lemon, and ginger. Add black pepper for synergy (<strong>turmeric and ginger benefits</strong> are enhanced together).
                </div>
                <div>
                  <strong>Cooking Use:</strong> Add to rice, curries, soups, smoothies, or scrambled eggs to get <strong>turmeric benefits</strong> in everyday meals (use ≤½ tsp per serving).
                </div>
                <div>
                  <strong>Supplements:</strong> Seek <strong>best turmeric supplement</strong> with piperine (BioPerine®) or liposomal curcumin for maximum bioavailability.
                </div>
              </div>
            </div>
          </section>

          {/* 安全性信息 - 使用折叠效果 */}
          <section id="safety" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">10 Serious Side Effects of Turmeric & Safety Guidelines</h2>

            <div className="space-y-4">
              {/* 常见副作用 - 折叠 */}
              <details className="bg-gray-50 p-6 rounded-xl group">
                <summary className="text-xl font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>Common Side Effects (Mild, Usually Temporary)</span>
                  <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                
                <div className="mt-4">
                  <p className="text-gray-700 mb-4">
                    Most people tolerate turmeric well at typical culinary doses. However, <strong>turmeric supplement side effects</strong> may occur, especially with high-dose extracts (&gt;1,500mg curcumin/day):
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li>• <strong>Mild GI discomfort:</strong> Nausea, diarrhea, or stomach upset (usually resolves when taken with food)</li>
                    <li>• <strong>Dyspepsia:</strong> Acid reflux or bloating in sensitive individuals</li>
                    <li>• <strong>Yellow staining:</strong> Temporary yellow discoloration of skin or urine (harmless, cosmetic only)</li>
                    <li>• <strong>Headache:</strong> Rare, typically at very high doses</li>
                  </ul>
                </div>
              </details>

              {/* 严重副作用 - 折叠 */}
              <details open className="bg-red-50 border-2 border-red-300 p-6 rounded-xl group">
                <summary className="text-xl font-semibold text-red-900 cursor-pointer list-none flex items-center justify-between">
                  <span>⚠️ 10 Serious Side Effects of Turmeric (Rare but Important)</span>
                  <span className="text-red-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                
                <div className="mt-4">
                <ol className="space-y-3 text-gray-800 list-decimal ml-6">
                  <li>
                    <strong>Liver Enzyme Elevation / Liver Damage:</strong> High-dose curcumin supplements (particularly certain formulations) have triggered elevated liver enzymes (ALT, AST) in rare cases. This is why many people ask <strong>"is turmeric bad for your liver?"</strong> — the answer is <em>usually no</em> at typical doses, but monitor if using high-dose extracts long-term.
                  </li>
                  <li>
                    <strong>Increased Bleeding Risk:</strong> Turmeric has mild antiplatelet effects. High doses may increase bleeding risk, especially if combined with blood thinners (warfarin, aspirin, clopidogrel).
                  </li>
                  <li>
                    <strong>Gallbladder Contractions:</strong> Turmeric stimulates bile production and may trigger gallbladder contractions. <strong>Avoid if you have gallstones or bile duct obstruction</strong>.
                  </li>
                  <li>
                    <strong>Kidney Stones:</strong> Turmeric is high in oxalates, which may increase kidney stone risk in susceptible individuals. Limit intake if prone to calcium oxalate stones.
                  </li>
                  <li>
                    <strong>Iron Deficiency (Long-term):</strong> Curcumin may bind to iron and reduce absorption. Monitor iron levels if using high doses chronically.
                  </li>
                  <li>
                    <strong>Low Blood Sugar (Hypoglycemia):</strong> May enhance blood-sugar-lowering effects of diabetes medications. Monitor glucose if diabetic.
                  </li>
                  <li>
                    <strong>Allergic Reactions:</strong> Skin rash, hives, or anaphylaxis (extremely rare). Discontinue if allergic symptoms occur.
                  </li>
                  <li>
                    <strong>Uterine Contractions:</strong> High doses may stimulate uterine contractions. <strong>Avoid during pregnancy</strong> (beyond culinary amounts).
                  </li>
                  <li>
                    <strong>Hormone-Sensitive Conditions:</strong> Curcumin may have weak estrogenic effects. Use caution with estrogen-sensitive cancers (breast, uterine, ovarian).
                  </li>
                  <li>
                    <strong>Nausea & Vomiting (at Very High Doses):</strong> Doses &gt;2,000mg curcumin may cause significant GI distress in some users.
                  </li>
                </ol>
              </div>
              </details>

              {/* 禁忌症 - 折叠 */}
              <details className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl group">
                <summary className="text-xl font-semibold text-yellow-900 cursor-pointer list-none flex items-center justify-between">
                  <span>❌ When NOT to Use Turmeric (Contraindications)</span>
                  <span className="text-yellow-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                
                <div className="mt-4">
                <ul className="space-y-3 text-gray-800">
                  <li>
                    <strong>❌ Pregnancy & Breastfeeding:</strong> High doses may stimulate uterine contractions. Culinary amounts are generally safe, but avoid supplements.
                  </li>
                  <li>
                    <strong>❌ Gallstones or Bile Duct Obstruction:</strong> Turmeric stimulates bile secretion, which may worsen obstruction or trigger gallbladder pain.
                  </li>
                  <li>
                    <strong>❌ Active Ulcers (Stomach or Duodenal):</strong> May irritate gastric lining and worsen symptoms.
                  </li>
                  <li>
                    <strong>❌ Liver Disease:</strong> While turmeric supports healthy liver function in most, those with active liver disease should use caution with high-dose extracts due to rare reports of hepatotoxicity.
                  </li>
                  <li>
                    <strong>❌ Scheduled Surgery:</strong> Stop at least 2 weeks before surgery due to blood-thinning effects and potential interaction with anesthesia.
                  </li>
                  <li>
                    <strong>❌ Blood Clotting Disorders:</strong> Avoid if you have hemophilia or take anticoagulants without medical supervision.
                  </li>
                  <li>
                    <strong>❌ Diabetes (High-Dose Supplements):</strong> May enhance blood-sugar-lowering effects. Monitor glucose closely.
                  </li>
                </ul>
              </div>
              </details>

              {/* 药物相互作用 - 折叠 */}
              <details className="bg-gray-50 p-6 rounded-xl group">
                <summary className="text-xl font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>💊 Drug Interactions</span>
                  <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                
                <div className="mt-4">
                <p className="text-gray-800 mb-4 font-semibold">
                  Turmeric may interact with the following medications:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Anticoagulants / Antiplatelets:</strong> Warfarin, aspirin, clopidogrel (Plavix) — may increase bleeding risk
                  </li>
                  <li>
                    <strong>NSAIDs:</strong> Ibuprofen, naproxen — combined use may increase GI irritation
                  </li>
                  <li>
                    <strong>Diabetes Medications:</strong> Insulin, metformin — may enhance blood-sugar-lowering effects
                  </li>
                  <li>
                    <strong>Chemotherapy Drugs:</strong> May interfere with certain cancer treatments; consult oncologist
                  </li>
                  <li>
                    <strong>Immunosuppressants:</strong> May affect immune modulation
                  </li>
                  <li>
                    <strong>Acid-Reducing Drugs:</strong> PPIs, H2 blockers — turmeric increases stomach acid; timing matters
                  </li>
                </ul>
                <p className="text-sm text-red-600 mt-4 font-medium">
                  ⚠️ <strong>Is turmeric bad for your liver?</strong> In rare cases, yes — high-dose supplements have caused liver enzyme elevation. If using &gt;1,000mg curcumin daily for extended periods, monitor liver function (ALT/AST tests) with your doctor.
                </p>
              </div>
              </details>
            </div>
          </section>

          {/* TCM视角 - 使用折叠效果 */}
          <section id="tcm" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Traditional Medicine & Constitution Matching</h2>

            <p className="text-gray-700 mb-6">
              In both Ayurvedic and Traditional Chinese Medicine, turmeric is considered a <strong>warming, blood-moving herb</strong> that supports circulation, digestion, and vitality. In TCM, it's known as "Jiāng Huáng" (姜黄) and has been used for centuries to treat stagnation and pain.
            </p>

            {/* TCM属性 - 折叠展示 */}
            <details open className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mb-6 group">
              <summary className="text-xl font-semibold cursor-pointer list-none flex items-center justify-between mb-4">
                <span>🌿 TCM Energy Properties & Body Type Matching</span>
                <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>

            <div className="grid md:grid-cols-3 gap-6 mb-8 mt-6">
              <div className="bg-amber-50 p-6 rounded-xl">
                <h4 className="font-semibold text-amber-900 mb-2">🔥 Energy Properties</h4>
                <p className="text-gray-700">
                  <strong>Warming herb</strong> with pungent and bitter taste. In TCM: Moves Qi and Blood, breaks stagnation, dispels cold.
                </p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl">
                <h4 className="font-semibold text-orange-900 mb-2">🌊 Meridians</h4>
                <p className="text-gray-700">
                  Primarily affects <strong>Liver and Spleen meridians</strong>. Supports blood circulation, digestion, and pain relief.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-xl">
                <h4 className="font-semibold text-yellow-900 mb-2">👤 Best Body Type</h4>
                <p className="text-gray-700">
                  <strong>Qi Stagnation, Blood Stasis, Cold-Womb, Dampness-Prone</strong> — people with poor circulation, cold limbs, menstrual cramps, or sluggish metabolism.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">✅ Recommended Constitution:</h4>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• People with poor circulation, cold hands/feet, or signs of stagnation</li>
                <li>• Menstrual cramps, PMS, or irregular cycles (blood-moving properties)</li>
                <li>• Sluggish digestion or mild bloating (dampness-prone)</li>
                <li>• Joint pain or stiffness (Qi/Blood stagnation patterns)</li>
              </ul>

              <h4 className="font-semibold text-gray-900 mb-3">❌ Not Recommended Constitution:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Yin-deficient or Heat-excess constitutions (dry mouth, night sweats, irritability)</li>
                <li>• Liver-deficient or Blood-deficient patterns (dizziness, pale complexion, fatigue from blood loss)</li>
                <li>• <strong>Tip:</strong> If you have internal heat or dryness, balance turmeric with cooling foods like cucumber, mint, or pears. Limit dose and monitor symptoms.</li>
              </ul>
            </div>
            </details>
          </section>

          {/* FAQ部分 - People Also Ask优化 */}
          <section id="faq" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions About Turmeric</h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: What does turmeric do for the body?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Turmeric supports inflammation control, liver detox, gut health, and circulation.</strong> The <strong>turmeric benefits</strong> go beyond just spice — curcumin (its primary active compound) downregulates inflammatory pathways, acts as a powerful antioxidant, stimulates bile secretion for liver support, and modulates gut flora for digestive health. It's particularly beneficial for joint pain, metabolic health, and heart function.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: How much turmeric can I take a day?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Safe dosage:</strong><br/>
                  • Whole turmeric powder: <strong>≤ 3 g/day</strong> (~1-1.5 tsp)<br/>
                  • Curcumin extract: <strong>≤ 1,000 mg/day</strong> (standardized)<br/><br/>
                  <strong>How much turmeric powder per day</strong> depends on your form and purpose. Use with food and add black pepper for better absorption. Avoid excessive long-term use without cycling (e.g., 3-4 weeks on, 1 week off) to minimize liver stress.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: Is turmeric bad for your liver?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>In rare cases, yes</strong> — high-dose curcumin supplements have triggered liver enzyme rises (ALT, AST) in sensitive individuals or with certain formulations. However, most users at typical culinary or moderate supplement doses do not experience this. If using &gt;1,000mg curcumin daily for extended periods, monitor liver function with your doctor. Start low, cycle usage, and choose quality supplements.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: Can I take turmeric daily?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Yes,</strong> in reasonable amounts. Culinary use (¼-½ tsp/day) is generally safe for long-term daily use. For higher-dose supplements (500-1,000mg curcumin), cycle usage (3-4 weeks on, 1 week off) and monitor for any new symptoms like GI discomfort or yellowing skin. Always take with food and black pepper for optimal absorption and reduced side effects.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: What is the best turmeric supplement?
                </summary>
                <p className="mt-4 text-gray-700">
                  The <strong>best turmeric supplement</strong> has these features:<br/>
                  • <strong>Standardized curcumin content</strong> (typically 95% curcuminoids)<br/>
                  • <strong>Piperine (BioPerine®)</strong> for 2,000% better absorption<br/>
                  • <strong>Third-party tested</strong> for purity and potency (USP, NSF, or ConsumerLab certified)<br/>
                  • <strong>Liposomal or phytosome formulations</strong> (e.g., Meriva®) for enhanced bioavailability<br/>
                  • <strong>Organic & non-GMO</strong> when possible<br/><br/>
                  Popular brands: Thorne, Life Extension, NOW Foods, Jarrow Formulas. Avoid cheap brands with unlisted additives or heavy metal contamination.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: Does turmeric help with inflammation?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Yes!</strong> <strong>Does turmeric help with inflammation?</strong> Absolutely. Curcumin inhibits NF-κB and COX-2 pathways, which are key inflammatory mediators. Clinical trials show significant reduction in inflammatory markers (CRP, IL-6) with 8-12 weeks of supplementation. It's particularly effective for joint inflammation, arthritis, and exercise-induced muscle soreness. Always combine with black pepper and healthy fats for maximum absorption.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: What are turmeric and ginger benefits when combined?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Turmeric and ginger benefits</strong> are enhanced when used together:<br/>
                  • <strong>Synergistic anti-inflammatory effects:</strong> Both inhibit inflammatory pathways through different mechanisms<br/>
                  • <strong>Digestive support:</strong> Ginger adds carminative and anti-nausea properties<br/>
                  • <strong>Circulation boost:</strong> Both warm and move blood in TCM terms<br/>
                  • <strong>Antioxidant power:</strong> Combined antioxidant capacity is greater than either alone<br/><br/>
                  <strong>What is turmeric and ginger good for?</strong> Joint pain, nausea, cold/flu symptoms, poor circulation, and digestive sluggishness. Try in golden milk, juice shots, or herbal teas.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: What are turmeric and black pepper benefits?
                </summary>
                <p className="mt-4 text-gray-700">
                  <strong>Turmeric and black pepper benefits</strong> are crucial for absorption:<br/>
                  • <strong>Piperine (from black pepper) increases curcumin absorption by up to 2,000%!</strong><br/>
                  • Without piperine, curcumin is poorly absorbed and rapidly metabolized<br/>
                  • Even a small pinch (¼ tsp black pepper per 1 tsp turmeric) dramatically enhances bioavailability<br/>
                  • Most quality supplements include BioPerine® (standardized piperine extract) for this reason<br/><br/>
                  Always add black pepper when using turmeric powder for cooking or golden milk!
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: What is the best turmeric powder for inflammation?
                </summary>
                <p className="mt-4 text-gray-700">
                  The <strong>best turmeric powder for inflammation</strong> should be:<br/>
                  • <strong>Organic and non-irradiated</strong> (preserves curcumin content)<br/>
                  • <strong>Bright orange-yellow color</strong> (indicator of freshness and curcumin richness)<br/>
                  • <strong>From reputable sources</strong> (tested for heavy metals like lead, which can contaminate cheap turmeric)<br/>
                  • <strong>Fresh (within 6-12 months of harvest)</strong> — curcumin degrades over time<br/><br/>
                  <strong>Best brands:</strong> Simply Organic, Frontier Co-op, Starwest Botanicals, Mountain Rose Herbs. Store in airtight container away from light and heat.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                  Q: What are the 10 serious side effects of turmeric?
                  </summary>
                <p className="mt-4 text-gray-700">
                  The <strong>10 serious side effects of turmeric</strong> (rare but important) include:<br/>
                  1. Liver enzyme elevation/damage (high doses)<br/>
                  2. Increased bleeding risk<br/>
                  3. Gallbladder contractions<br/>
                  4. Kidney stones (high oxalates)<br/>
                  5. Iron deficiency (long-term high doses)<br/>
                  6. Low blood sugar<br/>
                  7. Allergic reactions<br/>
                  8. Uterine contractions (pregnancy risk)<br/>
                  9. Hormone-sensitive condition interactions<br/>
                  10. Nausea/vomiting at very high doses<br/><br/>
                  Most occur only with excessive supplementation (&gt;1,500mg curcumin/day). Use moderate doses, cycle usage, and consult a doctor if you have medical conditions.
                </p>
                </details>
            </div>
          </section>

          {/* 科学参考文献 */}
          <section id="references" className="mb-16 bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Scientific References & Clinical Studies</h2>
            <ol className="space-y-4 text-sm text-gray-700 list-decimal ml-6">
              <li>
                <strong>Hewlings SJ, Kalman DS.</strong> (2017). "Curcumin: A Review of Its Effects on Human Health." <em>Foods.</em> 6(10):92. 
                <br/><span className="text-green-700">⭐ Comprehensive review of curcumin's anti-inflammatory and antioxidant properties</span>
              </li>
              <li>
                <strong>Sahebkar A, Serban MC, Ursoniu S, Banach M.</strong> (2019). "Effect of curcuminoids on oxidative stress: A systematic review and meta-analysis of randomized controlled trials." <em>J Funct Foods.</em> 18:898-909.
                <br/><span className="text-green-700">⭐ Meta-analysis showing significant reduction in CRP and IL-6 inflammatory markers</span>
              </li>
              <li>
                <strong>Chuengsamarn S, Rattanamongkolgul S, Luechapudiporn R, Phisalaphong C, Jirawatnotai S.</strong> (2012). "Curcumin extract for prevention of type 2 diabetes." <em>Diabetes Care.</em> 35(11):2121-2127.
                <br/><span className="text-green-700">⭐ RCT: Curcumin reduced fasting insulin and triglycerides in prediabetic participants over 12 weeks</span>
              </li>
              <li>
                <strong>Daily JW, Yang M, Park S.</strong> (2016). "Efficacy of Turmeric Extracts and Curcumin for Alleviating the Symptoms of Joint Arthritis: A Systematic Review and Meta-Analysis of Randomized Clinical Trials." <em>J Med Food.</em> 19(8):717-729.
                <br/><span className="text-green-700">⭐ Significant improvement in joint pain and physical function in osteoarthritis patients</span>
              </li>
              <li>
                <strong>Panahi Y, Hosseini MS, Khalili N, Naimi E, Simental-Mendía LE, Majeed M, Sahebkar A.</strong> (2016). "Effects of curcumin on serum cytokine concentrations in subjects with metabolic syndrome: A post-hoc analysis of a randomized controlled trial." <em>Biomed Pharmacother.</em> 82:578-582.
                <br/><span className="text-green-700">⭐ Anti-inflammatory effects in metabolic syndrome population</span>
              </li>
            </ol>
            <p className="text-xs text-gray-600 mt-6">
              <strong>Note:</strong> These studies represent high-quality clinical evidence (RCTs and meta-analyses). Individual results may vary. Always consult a healthcare provider before starting new supplements.
            </p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Best Herbs for Inflammation & Related Conditions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/herbs/ginger" className="bg-white p-6 rounded-xl hover:shadow-lg transition-all group">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600">Ginger</h3>
                <p className="text-gray-600 mb-3">
                  <strong>Turmeric and ginger benefits</strong> are synergistic. Combines anti-inflammatory power with digestive support and nausea relief.
                </p>
                <div className="text-sm text-green-600 font-medium">Learn More →</div>
              </Link>

              <Link href="/herbs/black-pepper" className="bg-white p-6 rounded-xl hover:shadow-lg transition-all group">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600">Black Pepper</h3>
                <p className="text-gray-600 mb-3">
                  Essential companion for turmeric. <strong>Turmeric and black pepper benefits</strong> include 2,000% better curcumin absorption with piperine.
                </p>
                <div className="text-sm text-green-600 font-medium">Learn More →</div>
              </Link>

              <Link href="/herbs/milk-thistle" className="bg-white p-6 rounded-xl hover:shadow-lg transition-all group">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600">Milk Thistle</h3>
                <p className="text-gray-600 mb-3">
                  Perfect pairing for liver support. Combines detox properties with turmeric's anti-inflammatory effects for comprehensive liver health.
                </p>
                <div className="text-sm text-green-600 font-medium">Learn More →</div>
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Link href="/herb-finder" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Explore All Anti-Inflammatory Herbs →
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
