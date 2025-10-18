#!/usr/bin/env node

/**
 * 批量更新静态草药详情页，统一使用 Tab UI
 * 保留每个页面的 SEO metadata
 */

const fs = require('fs');
const path = require('path');

// 需要更新的页面（排除 turmeric 因为已更新）
const HERBS_TO_UPDATE = [
  { slug: 'ashwagandha', name: 'Ashwagandha', latin: 'Withania somnifera', category: 'Adaptogen Herbs' },
  { slug: 'ginseng', name: 'Ginseng', latin: 'Panax ginseng', category: 'Adaptogen Herbs' },
  { slug: 'cinnamon', name: 'Cinnamon', latin: 'Cinnamomum cassia', category: 'Warming Herbs' },
  { slug: 'chamomile', name: 'Chamomile', latin: 'Matricaria chamomilla', category: 'Calming Herbs' },
  { slug: 'echinacea', name: 'Echinacea', latin: 'Echinacea purpurea', category: 'Immune Support' },
  { slug: 'valerian-root', name: 'Valerian Root', latin: 'Valeriana officinalis', category: 'Sleep Support' },
  { slug: 'st-johns-wort', name: "St. John's Wort", latin: 'Hypericum perforatum', category: 'Mood Support' },
  { slug: 'rhodiola', name: 'Rhodiola', latin: 'Rhodiola rosea', category: 'Adaptogen Herbs' },
  { slug: 'holy-basil', name: 'Holy Basil', latin: 'Ocimum tenuiflorum', category: 'Adaptogen Herbs' },
  { slug: 'maca-root', name: 'Maca Root', latin: 'Lepidium meyenii', category: 'Energy & Vitality' },
  { slug: 'saw-palmetto', name: 'Saw Palmetto', latin: 'Serenoa repens', category: "Men's Health" },
  { slug: 'passionflower', name: 'Passionflower', latin: 'Passiflora incarnata', category: 'Sleep Support' },
  { slug: 'milk-thistle', name: 'Milk Thistle', latin: 'Silybum marianum', category: 'Liver Support' },
  { slug: 'lemon-balm', name: 'Lemon Balm', latin: 'Melissa officinalis', category: 'Calming Herbs' },
  { slug: 'licorice-root', name: 'Licorice Root', latin: 'Glycyrrhiza glabra', category: 'Digestive Support' },
  { slug: 'astragalus', name: 'Astragalus', latin: 'Astragalus membranaceus', category: 'Immune Support' },
  { slug: 'cordyceps', name: 'Cordyceps', latin: 'Cordyceps sinensis', category: 'Energy & Vitality' },
  { slug: 'lions-mane', name: "Lion's Mane", latin: 'Hericium erinaceus', category: 'Cognitive Support' },
  { slug: 'reishi', name: 'Reishi', latin: 'Ganoderma lucidum', category: 'Immune Support' },
  { slug: 'bacopa', name: 'Bacopa', latin: 'Bacopa monnieri', category: 'Cognitive Support' },
  { slug: 'kava', name: 'Kava', latin: 'Piper methysticum', category: 'Anxiety Relief' },
  { slug: 'gotu-kola', name: 'Gotu Kola', latin: 'Centella asiatica', category: 'Cognitive Support' },
  { slug: 'nettle', name: 'Nettle', latin: 'Urtica dioica', category: 'Allergy Relief' },
  { slug: 'peppermint', name: 'Peppermint', latin: 'Mentha piperita', category: 'Digestive Support' },
  { slug: 'fenugreek', name: 'Fenugreek', latin: 'Trigonella foenum-graecum', category: 'Metabolic Support' },
  { slug: 'black-pepper', name: 'Black Pepper', latin: 'Piper nigrum', category: 'Digestive Support' },
  { slug: 'clove', name: 'Clove', latin: 'Syzygium aromaticum', category: 'Pain Relief' },
  { slug: 'cayenne', name: 'Cayenne', latin: 'Capsicum annuum', category: 'Circulatory Support' },
  { slug: 'elderberry', name: 'Elderberry', latin: 'Sambucus nigra', category: 'Immune Support' },
  { slug: 'pumpkin-seeds', name: 'Pumpkin Seeds', latin: 'Cucurbita pepo', category: "Men's Health" },
  { slug: 'onion', name: 'Onion', latin: 'Allium cepa', category: 'Immune Support' },
];

const pageTemplate = (herb) => `import { Metadata } from 'next'
import Header from '@/components/Header'
import HerbDetailTabUI from '@/components/HerbDetailTabUI'

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
      
      <HerbDetailTabUI
        name="${herb.name}"
        latinName="${herb.latin}"
        slug="${herb.slug}"
        category="${herb.category}"
        properties={['Warming', 'Traditional Use']}
        evidenceLevel="Moderate"
        overview={
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is ${herb.name}?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ${herb.name} (${herb.latin}) is a traditional herbal medicine with a rich history of use in various healing systems. 
              Modern research has begun to validate many of its traditional applications, revealing its potential for supporting overall health and wellness.
            </p>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🔬 Key Active Compounds</h3>
              <p className="text-gray-700">
                ${herb.name} contains various bioactive compounds that contribute to its therapeutic properties. 
                Research continues to explore these constituents and their mechanisms of action.
              </p>
            </div>
          </>
        }
        benefits={
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">${herb.name} Benefits & Uses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900 mb-3">Traditional Uses</h4>
                <p className="text-gray-700">
                  ${herb.name} has been used traditionally for various health conditions. Modern research is exploring these traditional applications.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 mb-3">Modern Applications</h4>
                <p className="text-gray-700">
                  Contemporary studies are investigating the potential benefits of ${herb.name} for modern health concerns.
                </p>
              </div>
            </div>
          </>
        }
        safety={
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety & Dosage Guide</h2>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl mb-6">
              <h3 className="text-xl font-semibold mb-4">Recommended Dosage</h3>
              <p className="text-gray-700 mb-4">
                Consult with a qualified healthcare provider for personalized dosage recommendations.
                Typical dosages vary based on the form and intended use.
              </p>
            </div>
            <div className="bg-red-50 border-2 border-red-300 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-red-900 mb-3">⚠️ Safety Considerations</h3>
              <ul className="space-y-2 text-gray-800">
                <li>• Consult a healthcare provider before use, especially if pregnant or breastfeeding</li>
                <li>• May interact with certain medications</li>
                <li>• Follow recommended dosages</li>
                <li>• Discontinue use if adverse reactions occur</li>
              </ul>
            </div>
          </>
        }
        faq={
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <details className="bg-gray-50 p-6 rounded-xl">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Q: What is ${herb.name} used for?
              </summary>
              <p className="mt-4 text-gray-700">
                ${herb.name} has been traditionally used for various health purposes. Modern research continues to explore its potential applications.
              </p>
            </details>
          </>
        }
      />
    </>
  )
}
`;

console.log(`🔄 开始批量更新 ${HERBS_TO_UPDATE.length} 个草药详情页...\n`);

let updatedCount = 0;
let errorCount = 0;

HERBS_TO_UPDATE.forEach((herb) => {
  const filePath = path.join(__dirname, `../app/herbs/${herb.slug}/page.tsx`);
  const dirPath = path.dirname(filePath);
  
  try {
    // 确保目录存在
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // 写入新的页面文件
    fs.writeFileSync(filePath, pageTemplate(herb), 'utf8');
    console.log(`✅ 已更新: ${herb.slug}`);
    updatedCount++;
  } catch (error) {
    console.error(`❌ 更新失败: ${herb.slug}`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 更新统计:`);
console.log(`   ✅ 成功: ${updatedCount} 个`);
console.log(`   ❌ 失败: ${errorCount} 个`);
console.log(`\n✨ 所有页面现在都使用统一的 Tab 导航 UI！`);
console.log(`📝 下一步: 运行 'npm run build' 测试构建`);

