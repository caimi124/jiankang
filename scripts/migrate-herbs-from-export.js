require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function slugify(str) {
  return String(str || '')
    .trim()
    .toLowerCase()
    .replace(/\((待翻译)\)/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 96) || 'herb';
}

function mapSafety(level) {
  if (!level) return 'medium';
  const v = String(level).trim();
  if (v === '高' || /high/i.test(v)) return 'high';
  if (v === '中' || /medium/i.test(v)) return 'medium';
  if (v === '低' || /low/i.test(v)) return 'low';
  return 'medium';
}

function mapConstitution(t) {
  if (!t) return undefined;
  const m = String(t).trim();
  const table = {
    '平和体质': 'balanced',
    '气虚体质': 'qi-deficiency',
    '血虚体质': 'blood-deficiency',
    '阳虚体质': 'yang-deficiency',
    '阴虚体质': 'yin-deficiency',
    '痰湿体质': 'phlegm-dampness',
    '湿热体质': 'damp-heat',
    '血瘀体质': 'blood-stasis',
    '气郁体质': 'qi-stagnation',
    '特禀体质': 'special-constitution',
  };
  return table[m] || undefined;
}

function toArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return String(val)
    .split(/[，,|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function mapHerb(item) {
  const latin = item['草药名称'] || '';
  const englishCommon = item['植物学名'] || latin;
  const chinese = (item['中文名'] || '').replace(/\(待翻译\)/g, '').trim();

  const slug = slugify(englishCommon || latin);

  return {
    _type: 'herb',
    _id: `herb-${slug}`,
    title: englishCommon || latin,
    chineseName: chinese,
    latinName: latin,
    slug: { _type: 'slug', current: slug },
    description: item['简要描述'] || '',
    dosage: item['推荐剂量'] || '',
    safetyLevel: mapSafety(item['安全性等级']),
    contraindications: item['注意事项'] || '',
    constitutionType: mapConstitution(item['中医体质匹配']),
    primaryEffects: toArray(item['功效分类']),
    modernApplications: item['治疗领域'] || '',
    traditionalUse: item['参考链接'] || '',
    // 其余字段留空，后续在Studio中完善
    secondaryEffects: [],
    efficacy: [],
    activeCompounds: [],
    storageInstructions: '',
    preparationMethods: [],
    qualityIndicators: '',
    seasonalAvailability: '',
    geographicDistribution: '',
    cultivationNotes: '',
    harvestProcessing: '',
    seoTitle: `${englishCommon || latin} (${chinese}) - Benefits, Dosage & Safety | HerbScience`,
    seoDescription: `Learn about ${englishCommon || latin} benefits, dosage, safety and traditional uses.`,
    seoKeywords: [slug, englishCommon || latin, chinese].filter(Boolean),
    status: 'published',
    publishedAt: new Date().toISOString(),
  };
}

async function migrateFromExport() {
  console.log('🌿 从 herbs-notion-export.json 批量迁移到 Sanity...');
  // 读取
  const raw = fs.readFileSync('herbs-notion-export.json', 'utf8');
  const data = JSON.parse(raw);
  const herbs = Array.isArray(data.herbs) ? data.herbs : [];
  console.log(`📋 待处理: ${herbs.length} 条`);

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (let i = 0; i < herbs.length; i++) {
    const item = herbs[i];
    const doc = mapHerb(item);
    try {
      const existing = await client.fetch('*[_type=="herb" && slug.current==$slug][0]', { slug: doc.slug.current });
      if (existing) {
        await client.patch(existing._id).set(doc).commit();
        updated++;
        console.log(`🔄 更新: ${doc.title}`);
      } else {
        await client.create(doc);
        created++;
        console.log(`✅ 创建: ${doc.title}`);
      }
      await new Promise((r) => setTimeout(r, 200));
    } catch (e) {
      failed++;
      console.error(`❌ 失败: ${doc.title} -> ${e.message}`);
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 批量迁移完成');
  console.log(`✅ 新建: ${created}`);
  console.log(`🔄 更新: ${updated}`);
  console.log(`❌ 失败: ${failed}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━');
}

if (require.main === module) {
  if (!process.env.SANITY_API_TOKEN || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ 缺少必要环境变量，请检查 .env.local');
    process.exit(1);
  }
  migrateFromExport().catch((e) => {
    console.error('❌ 迁移过程失败:', e);
    process.exit(1);
  });
}
