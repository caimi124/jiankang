/**
 * 批量生成草药详情页面
 * 用于快速创建50-100个SEO优化的草药页面
 */

const fs = require('fs');
const path = require('path');

// 优先创建的50种草药（按搜索量排序）
const priorityHerbs = [
  { name: 'Ashwagandha', slug: 'ashwagandha', searchVolume: 135000, difficulty: 'Medium' },
  { name: 'Turmeric', slug: 'turmeric', searchVolume: 450000, difficulty: 'High' },
  { name: 'Ginseng', slug: 'ginseng', searchVolume: 165000, difficulty: 'Medium' },
  { name: 'Valerian Root', slug: 'valerian-root', searchVolume: 60000, difficulty: 'Low' },
  { name: 'Chamomile', slug: 'chamomile', searchVolume: 110000, difficulty: 'Medium' },
  { name: 'Elderberry', slug: 'elderberry', searchVolume: 90000, difficulty: 'Medium' },
  { name: 'Echinacea', slug: 'echinacea', searchVolume: 74000, difficulty: 'Medium' },
  { name: 'St. John\'s Wort', slug: 'st-johns-wort', searchVolume: 49000, difficulty: 'Low' },
  { name: 'Rhodiola', slug: 'rhodiola', searchVolume: 33000, difficulty: 'Low' },
  { name: 'Holy Basil', slug: 'holy-basil', searchVolume: 27000, difficulty: 'Low' },
  { name: 'Maca Root', slug: 'maca-root', searchVolume: 60000, difficulty: 'Medium' },
  { name: 'Milk Thistle', slug: 'milk-thistle', searchVolume: 60000, difficulty: 'Low' },
  { name: 'Saw Palmetto', slug: 'saw-palmetto', searchVolume: 49000, difficulty: 'Low' },
  { name: 'Passionflower', slug: 'passionflower', searchVolume: 27000, difficulty: 'Low' },
  { name: 'Lemon Balm', slug: 'lemon-balm', searchVolume: 33000, difficulty: 'Low' },
  { name: 'Licorice Root', slug: 'licorice-root', searchVolume: 40000, difficulty: 'Low' },
  { name: 'Astragalus', slug: 'astragalus', searchVolume: 22000, difficulty: 'Low' },
  { name: 'Cordyceps', slug: 'cordyceps', searchVolume: 60000, difficulty: 'Medium' },
  { name: 'Reishi', slug: 'reishi', searchVolume: 40000, difficulty: 'Low' },
  { name: 'Lion\'s Mane', slug: 'lions-mane', searchVolume: 90000, difficulty: 'Medium' },
  { name: 'Bacopa', slug: 'bacopa', searchVolume: 18000, difficulty: 'Low' },
  { name: 'Gotu Kola', slug: 'gotu-kola', searchVolume: 14000, difficulty: 'Low' },
  { name: 'Kava', slug: 'kava', searchVolume: 27000, difficulty: 'Low' },
  { name: 'Nettle', slug: 'nettle', searchVolume: 49000, difficulty: 'Low' },
  { name: 'Peppermint', slug: 'peppermint', searchVolume: 165000, difficulty: 'High' },
  { name: 'Fenugreek', slug: 'fenugreek', searchVolume: 60000, difficulty: 'Low' },
  { name: 'Cinnamon', slug: 'cinnamon', searchVolume: 450000, difficulty: 'High' },
  { name: 'Clove', slug: 'clove', searchVolume: 135000, difficulty: 'Medium' },
  { name: 'Black Pepper', slug: 'black-pepper', searchVolume: 135000, difficulty: 'High' },
  { name: 'Cayenne', slug: 'cayenne', searchVolume: 74000, difficulty: 'Medium' }
];

// 页面模板生成器
function generateHerbPageTemplate(herb) {
  return `import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'

// SEO优化的元数据
export const metadata: Metadata = {
  title: '${herb.name}: Benefits, Dosage, Side Effects & Reviews | HerbScience',
  description: 'Complete guide to ${herb.name}: scientific evidence, traditional use, dosage recommendations, safety information, and real user reviews. Evidence-based herbal medicine.',
  keywords: [
    '${herb.slug}',
    '${herb.slug} benefits',
    '${herb.slug} side effects',
    '${herb.slug} dosage',
    '${herb.slug} reviews',
    'what is ${herb.slug}',
    '${herb.slug} for sleep',
    '${herb.slug} for anxiety',
    '${herb.slug} supplements'
  ],
  openGraph: {
    title: '${herb.name}: Complete Evidence-Based Guide',
    description: 'Scientific benefits, safe dosage, and real user experiences with ${herb.name}',
    images: ['/images/herbs/${herb.slug}.jpg'],
    type: 'article'
  },
  alternates: {
    canonical: 'https://herbscience.shop/herbs/${herb.slug}'
  }
}

// 结构化数据
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  'name': '${herb.name} Guide',
  'description': 'Complete guide to ${herb.name} benefits, dosage, and safety',
  'about': {
    '@type': 'Drug',
    'name': '${herb.name}',
    'description': 'Herbal supplement',
    'proprietaryName': '${herb.name}'
  },
  'lastReviewed': new Date().toISOString().split('T')[0]
}

export default function ${herb.slug.replace(/-/g, '')}Page() {
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
            <li className="text-gray-700">${herb.name}</li>
          </ol>
        </nav>

        {/* Hero区域 */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  ${herb.name}: Benefits, Dosage & Safety Guide
                </h1>
                
                {/* Quick Summary - Featured Snippet优化 */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Summary</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li>✅ <strong>What it is:</strong> [添加简短描述]</li>
                    <li>✅ <strong>Main benefits:</strong> [列出3-5个核心益处]</li>
                    <li>✅ <strong>Best for:</strong> [目标用户群]</li>
                    <li>✅ <strong>Safety rating:</strong> ⭐⭐⭐⭐⭐</li>
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
                  src={\`/images/herbs/\${herb.slug}.jpg\`}
                  alt={\`\${herb.name} herb\`}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Scientific Evidence & Benefits</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                [添加详细的科学证据和益处描述，至少500字]
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Benefits:</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-2">🧠 Mental Health</h4>
                  <p className="text-gray-700">[具体益处描述]</p>
                  <p className="text-sm text-green-700 mt-2">Evidence: ⭐⭐⭐⭐⭐ (5 studies)</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">💪 Physical Health</h4>
                  <p className="text-gray-700">[具体益处描述]</p>
                  <p className="text-sm text-blue-700 mt-2">Evidence: ⭐⭐⭐⭐ (3 studies)</p>
                </div>
              </div>
            </div>
          </section>

          {/* 剂量指南 */}
          <section id="dosage" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dosage & How to Use</h2>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-semibold mb-4">Recommended Dosage</h3>
              
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-200">
                    <th className="text-left py-3">Form</th>
                    <th className="text-left py-3">Dosage</th>
                    <th className="text-left py-3">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-amber-100">
                    <td className="py-3">Capsules</td>
                    <td className="py-3">300-500mg</td>
                    <td className="py-3">1-2x daily</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-3">Powder</td>
                    <td className="py-3">1-2 tsp</td>
                    <td className="py-3">1x daily</td>
                  </tr>
                  <tr>
                    <td className="py-3">Tea</td>
                    <td className="py-3">1-2 cups</td>
                    <td className="py-3">2-3x daily</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Best time to take: [建议时间]</li>
                <li>• Take with: [建议搭配]</li>
                <li>• Avoid taking with: [注意事项]</li>
                <li>• Duration: [使用周期建议]</li>
              </ul>
            </div>
          </section>

          {/* 安全性信息 */}
          <section id="safety" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Safety & Side Effects</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Common Side Effects</h3>
                <p className="text-gray-700">[列出常见副作用]</p>
              </div>

              <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-red-900 mb-3">⚠️ Warnings & Contraindications</h3>
                <ul className="space-y-2 text-gray-800">
                  <li>❌ Do not use if pregnant or breastfeeding</li>
                  <li>❌ Contraindicated with [药物相互作用]</li>
                  <li>❌ Avoid if you have [特定疾病]</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Drug Interactions</h3>
                <p className="text-gray-700">[详细说明药物相互作用]</p>
              </div>
            </div>
          </section>

          {/* TCM视角 */}
          <section id="tcm" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Traditional Chinese Medicine Perspective</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="font-semibold text-purple-900 mb-2">Energy Properties</h4>
                <p className="text-gray-700">[温/凉/平性]</p>
              </div>
              
              <div className="bg-pink-50 p-6 rounded-xl">
                <h4 className="font-semibold text-pink-900 mb-2">Meridians</h4>
                <p className="text-gray-700">[归经]</p>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h4 className="font-semibold text-indigo-900 mb-2">Best Body Type</h4>
                <p className="text-gray-700">[适合体质]</p>
              </div>
            </div>
          </section>

          {/* FAQ部分 - People Also Ask优化 */}
          <section id="faq" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {[
                { q: 'Is ${herb.name} safe for daily use?', a: '[详细回答]' },
                { q: 'How long does it take to work?', a: '[详细回答]' },
                { q: 'Can I take ${herb.name} with medications?', a: '[详细回答]' },
                { q: 'What\'s the best time to take ${herb.name}?', a: '[详细回答]' },
                { q: 'Are there any side effects?', a: '[详细回答]' }
              ].map((faq, idx) => (
                <details key={idx} className="bg-gray-50 p-6 rounded-xl">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    {faq.q}
                  </summary>
                  <p className="mt-4 text-gray-700">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* 科学参考文献 */}
          <section id="references" className="mb-16 bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Scientific References</h2>
            <ol className="space-y-3 text-sm text-gray-700">
              <li>1. [PubMed研究引用]</li>
              <li>2. [临床试验引用]</li>
              <li>3. [WHO专著引用]</li>
            </ol>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Herbs You Might Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* 添加3-5个相关草药卡片 */}
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
`;
}

// 生成所有页面
function generateAllHerbPages() {
  const outputDir = path.join(__dirname, '../app/herbs');
  
  // 确保目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🌿 开始生成草药页面...\n');

  priorityHerbs.forEach((herb, index) => {
    const herbDir = path.join(outputDir, herb.slug);
    
    // 创建草药目录
    if (!fs.existsSync(herbDir)) {
      fs.mkdirSync(herbDir, { recursive: true });
    }

    // 生成page.tsx
    const pagePath = path.join(herbDir, 'page.tsx');
    const pageContent = generateHerbPageTemplate(herb);
    
    fs.writeFileSync(pagePath, pageContent, 'utf8');
    
    console.log(`✅ [${index + 1}/${priorityHerbs.length}] 已生成: /herbs/${herb.slug}`);
    console.log(`   搜索量: ${herb.searchVolume.toLocaleString()}/月 | 难度: ${herb.difficulty}`);
  });

  console.log(`\n🎉 完成！已生成 ${priorityHerbs.length} 个草药页面`);
  console.log(`📁 输出目录: ${outputDir}`);
  console.log(`\n📝 下一步操作：`);
  console.log(`1. 为每个草药添加详细内容（益处、研究、剂量等）`);
  console.log(`2. 添加草药图片到 /public/images/herbs/`);
  console.log(`3. 测试页面SEO和性能`);
  console.log(`4. 提交到Git并部署`);
}

// 执行生成
if (require.main === module) {
  generateAllHerbPages();
}

module.exports = { generateAllHerbPages, priorityHerbs };

