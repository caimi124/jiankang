# 🌿 草药页面模板结构详解

## 📋 **模板总览**

新生成的草药页面包含 **10大核心部分**，总字数目标：**2000-3000字**

```
┌─────────────────────────────────────┐
│  1. SEO元数据 (Metadata)            │
│  2. 结构化数据 (Schema.org)         │
├─────────────────────────────────────┤
│  3. 面包屑导航 (Breadcrumbs)        │
│  4. Hero区域 (Hero Section)         │
│     ├─ Quick Summary ⭐ 关键部分    │
│     └─ CTA按钮                      │
├─────────────────────────────────────┤
│  5. 目录导航 (Table of Contents)    │
├─────────────────────────────────────┤
│  6. 科学证据和益处 (Benefits) ⭐    │
│  7. 剂量指南 (Dosage) ⭐            │
│  8. 安全性信息 (Safety) ⭐          │
│  9. TCM视角 (TCM Perspective)       │
│ 10. FAQ (常见问题) ⭐               │
│ 11. 科学参考文献 (References)       │
│ 12. 医疗免责声明 (Disclaimer)       │
├─────────────────────────────────────┤
│ 13. 相关草药推荐 (Related Herbs)    │
│ 14. 底部CTA (Final CTA)             │
└─────────────────────────────────────┘

⭐ = 必须优先填充的关键内容
```

---

## 1️⃣ **SEO元数据（第7-30行）**

### **位置：** 文件开头 `export const metadata`

### **需要修改的内容：**

```typescript
export const metadata: Metadata = {
  // ✏️ 修改标题（包含草药名称）
  title: '[草药名]: Benefits, Dosage, Side Effects & Reviews | HerbScience',
  
  // ✏️ 修改描述（150-160字符）
  description: 'Complete guide to [草药名]: scientific evidence, traditional use, dosage recommendations, safety information, and real user reviews.',
  
  // ✏️ 修改关键词数组
  keywords: [
    '[草药英文名]',
    '[草药英文名] benefits',
    '[草药英文名] side effects',
    '[草药英文名] dosage',
    '[草药英文名] reviews',
    'what is [草药英文名]',
    '[草药英文名] for [主要用途]',
    // ... 添加5-10个相关关键词
  ],
  
  // ✏️ 修改Open Graph信息
  openGraph: {
    title: '[草药名]: Complete Evidence-Based Guide',
    description: 'Scientific benefits, safe dosage, and real user experiences with [草药名]',
    images: ['/images/herbs/[草药slug].jpg'], // 需要添加图片
  },
  
  // ✏️ 修改canonical URL
  alternates: {
    canonical: 'https://herbscience.shop/herbs/[草药slug]'
  }
}
```

**📝 填充示例（Ashwagandha）：**
```typescript
title: 'Ashwagandha: Benefits, Dosage, Side Effects & Reviews | HerbScience',
description: 'Complete guide to Ashwagandha: reduce stress by 28%, improve sleep quality, boost energy. Evidence-based dosage, safety info, and real user reviews.',
keywords: [
  'ashwagandha',
  'ashwagandha benefits',
  'ashwagandha for stress',
  'ashwagandha for anxiety',
  'ashwagandha dosage',
  'ashwagandha side effects',
  'withania somnifera',
  'adaptogenic herbs'
]
```

---

## 2️⃣ **结构化数据（第32-45行）**

### **位置：** `const structuredData`

### **需要修改的内容：**

```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  // ✏️ 修改名称
  'name': '[草药名] Guide',
  // ✏️ 修改描述
  'description': 'Complete guide to [草药名] benefits, dosage, and safety',
  'about': {
    '@type': 'Drug',
    // ✏️ 修改草药名称
    'name': '[草药名]',
    'description': 'Herbal supplement',
    'proprietaryName': '[草药名]'
  },
  'lastReviewed': new Date().toISOString().split('T')[0] // 自动生成
}
```

**✅ 此部分大多数内容自动生成，只需修改草药名称**

---

## 3️⃣ **面包屑导航（第60-68行）**

### **位置：** `<nav aria-label="Breadcrumb">`

### **需要修改的内容：**

```tsx
<ol className="flex items-center gap-2 text-sm">
  <li><Link href="/">Home</Link></li>
  <li className="text-gray-400">›</li>
  <li><Link href="/herbs">Herbs</Link></li>
  <li className="text-gray-400">›</li>
  {/* ✏️ 修改草药显示名称 */}
  <li className="text-gray-700">[草药显示名称]</li>
</ol>
```

**✅ 只需修改最后一个面包屑项**

---

## 4️⃣ **Hero区域（第70-116行）⭐ 关键部分**

### **A. 主标题（第75-77行）**

```tsx
<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
  {/* ✏️ 修改标题 */}
  [草药名]: Benefits, Dosage & Safety Guide
</h1>
```

### **B. Quick Summary（第80-88行）⭐ 最重要**

这是**Featured Snippet优化**的关键部分，会显示在Google搜索结果顶部！

```tsx
<ul className="space-y-2 text-gray-700">
  {/* ✏️ 填充4个要点，每个30-50字 */}
  <li>✅ <strong>What it is:</strong> [简短描述草药是什么，30-50字]</li>
  <li>✅ <strong>Main benefits:</strong> [列出3-5个核心益处，用逗号分隔]</li>
  <li>✅ <strong>Best for:</strong> [目标用户群，例如：stressed professionals, anxious individuals]</li>
  <li>✅ <strong>Safety rating:</strong> ⭐⭐⭐⭐⭐ (根据实际安全性调整星级)</li>
</ul>
```

**📝 填充示例（Ashwagandha）：**
```tsx
<li>✅ <strong>What it is:</strong> Ancient Ayurvedic adaptogenic herb used for over 3,000 years to reduce stress and boost energy</li>
<li>✅ <strong>Main benefits:</strong> Reduces cortisol by 28%, improves anxiety, enhances sleep quality, increases muscle strength</li>
<li>✅ <strong>Best for:</strong> Stressed professionals, anxious individuals, people with insomnia, athletes</li>
<li>✅ <strong>Safety rating:</strong> ⭐⭐⭐⭐⭐ (Very safe when used appropriately)</li>
```

### **C. Hero图片（第104-113行）**

```tsx
<Image
  src={`/images/herbs/[草药slug].jpg`}  // ✏️ 需要添加图片文件
  alt={`[草药名] herb`}
  width={600}
  height={400}
  className="rounded-2xl shadow-2xl"
  priority
/>
```

**📸 图片要求：**
- 尺寸：1200x800px 或 600x400px
- 格式：JPG或WebP
- 大小：<200KB
- 位置：`public/images/herbs/[slug].jpg`
- 来源：Unsplash, Pexels, Pixabay（免费商用）

---

## 5️⃣ **目录导航（第118-131行）**

### **位置：** 粘性导航栏

```tsx
<nav className="flex items-center gap-6 overflow-x-auto">
  <a href="#benefits">Benefits</a>
  <a href="#dosage">Dosage</a>
  <a href="#safety">Safety</a>
  <a href="#research">Research</a>
  <a href="#tcm">TCM View</a>
  <a href="#reviews">Reviews</a>
  <a href="#faq">FAQ</a>
</nav>
```

**✅ 无需修改，锚点链接已配置好**

---

## 6️⃣ **科学证据和益处（第136-161行）⭐ 核心内容**

### **A. 引言段落（第141-143行）**

```tsx
<p className="text-gray-700 leading-relaxed mb-6">
  {/* ✏️ 填充500-800字的详细描述 */}
  [详细介绍草药的历史、科学研究、主要功效等，至少500字]
</p>
```

**📝 内容结构建议：**
1. 草药介绍（100字）：名称、来源、历史背景
2. 现代研究（200字）：科学研究发现、临床试验结果
3. 主要机制（200字）：如何起作用、活性成分

### **B. Key Benefits卡片（第147-159行）**

需要创建**2-4个卡片**，每个卡片包含：

```tsx
<div className="bg-green-50 p-6 rounded-xl">
  {/* ✏️ 修改图标和标题 */}
  <h4 className="font-semibold text-green-900 mb-2">🧠 [益处类别]</h4>
  
  {/* ✏️ 填充200-300字描述 */}
  <p className="text-gray-700">[详细描述这个益处，包括科学证据]</p>
  
  {/* ✏️ 添加证据等级 */}
  <p className="text-sm text-green-700 mt-2">Evidence: ⭐⭐⭐⭐⭐ ([X] studies)</p>
</div>
```

**📊 建议的益处类别：**
- 🧠 Mental Health（心理健康）
- 😴 Sleep Quality（睡眠质量）
- 💪 Physical Performance（体能表现）
- 🎓 Cognitive Function（认知功能）
- 🛡️ Immune Support（免疫支持）
- ❤️ Heart Health（心脏健康）

**证据等级说明：**
- ⭐⭐⭐⭐⭐ (5星): 5+ RCTs，强有力证据
- ⭐⭐⭐⭐ (4星): 3-4 RCTs，中等证据
- ⭐⭐⭐ (3星): 1-2 RCTs或多个观察性研究
- ⭐⭐ (2星): 仅有初步研究或动物试验
- ⭐ (1星): 仅有传统使用经验，无科学研究

---

## 7️⃣ **剂量指南（第163-207行）⭐ 实用信息**

### **A. 剂量表格（第170-195行）**

```tsx
<table className="w-full">
  <thead>
    <tr className="border-b border-amber-200">
      <th className="text-left py-3">Form</th>
      <th className="text-left py-3">Dosage</th>
      <th className="text-left py-3">Frequency</th>
    </tr>
  </thead>
  <tbody>
    {/* ✏️ 填充3-5种剂型和剂量 */}
    <tr className="border-b border-amber-100">
      <td className="py-3">[剂型：如Capsules, Powder, Tea]</td>
      <td className="py-3">[剂量：如300-500mg]</td>
      <td className="py-3">[频率：如1-2x daily]</td>
    </tr>
    {/* 添加更多行... */}
  </tbody>
</table>
```

**📝 常见剂型模板：**
| Form | Dosage | Frequency |
|------|--------|-----------|
| Standardized Extract | 300-600mg | 1-2x daily |
| Root Powder | 1-2 grams | 2x daily |
| Tea | 1-2 cups | 2-3x daily |
| Tincture | 2-4ml | 1-2x daily |
| Capsules | 500mg | 2x daily |

### **B. Pro Tips（第198-206行）**

```tsx
<ul className="space-y-2 text-gray-700">
  {/* ✏️ 填充4-5条使用建议 */}
  <li>• Best time to take: [最佳服用时间，如：Morning with breakfast]</li>
  <li>• Take with: [建议搭配，如：Black pepper for better absorption]</li>
  <li>• Avoid taking with: [注意事项，如：Sedatives or thyroid medications]</li>
  <li>• Duration: [使用周期，如：8-12 weeks for optimal results]</li>
</ul>
```

---

## 8️⃣ **安全性信息（第209-233行）⭐ 必须详细**

### **A. 常见副作用（第214-217行）**

```tsx
<div>
  <h3 className="text-xl font-semibold mb-3">Common Side Effects</h3>
  {/* ✏️ 列出常见副作用，如果安全性很高可说"Generally well-tolerated" */}
  <p className="text-gray-700">[列出常见副作用，如：Mild digestive upset, drowsiness (rare)]</p>
</div>
```

### **B. 警告和禁忌（第219-226行）**

```tsx
<div className="bg-red-50 border border-red-200 p-6 rounded-xl">
  <h3 className="text-xl font-semibold text-red-900 mb-3">⚠️ Warnings & Contraindications</h3>
  <ul className="space-y-2 text-gray-800">
    {/* ✏️ 填充3-5条警告，必须包含的常见警告： */}
    <li>❌ Do not use if pregnant or breastfeeding</li>
    <li>❌ Contraindicated with [具体药物类别]</li>
    <li>❌ Avoid if you have [特定疾病，如：autoimmune diseases]</li>
    {/* 添加更多... */}
  </ul>
</div>
```

**⚠️ 必须包含的警告类别：**
1. 妊娠和哺乳期
2. 药物相互作用
3. 特定疾病禁忌
4. 手术前停用
5. 过敏反应

### **C. 药物相互作用（第228-232行）**

```tsx
<div>
  <h3 className="text-xl font-semibold mb-3">Drug Interactions</h3>
  {/* ✏️ 详细说明药物相互作用 */}
  <p className="text-gray-700">
    [草药名] may interact with: <br/>
    • [药物类别1]: [交互作用描述] <br/>
    • [药物类别2]: [交互作用描述] <br/>
    Always consult your healthcare provider before combining with medications.
  </p>
</div>
```

---

## 9️⃣ **TCM视角（第235-255行）**

### **三个卡片需要填充：**

```tsx
<div className="grid md:grid-cols-3 gap-6">
  {/* ✏️ 卡片1：能量属性 */}
  <div className="bg-purple-50 p-6 rounded-xl">
    <h4 className="font-semibold text-purple-900 mb-2">Energy Properties</h4>
    <p className="text-gray-700">[温性/凉性/平性 + 简短描述]</p>
  </div>
  
  {/* ✏️ 卡片2：归经 */}
  <div className="bg-pink-50 p-6 rounded-xl">
    <h4 className="font-semibold text-pink-900 mb-2">Meridians</h4>
    <p className="text-gray-700">[归经，如：Liver, Kidney, Heart]</p>
  </div>
  
  {/* ✏️ 卡片3：适合体质 */}
  <div className="bg-indigo-50 p-6 rounded-xl">
    <h4 className="font-semibold text-indigo-900 mb-2">Best Body Type</h4>
    <p className="text-gray-700">[适合的体质类型]</p>
  </div>
</div>
```

**📝 TCM内容模板：**
- **Energy Properties**: Warm/Cool/Neutral nature, taste (sweet, bitter, pungent, sour, salty)
- **Meridians**: Which organs/meridians it affects (Liver, Kidney, Spleen, etc.)
- **Best Body Type**: Qi Deficiency, Yang Deficiency, Yin Deficiency, etc.

---

## 🔟 **FAQ部分（第257-277行）⭐ SEO黄金区**

### **需要创建10-15个问题**

```tsx
<div className="space-y-4">
  {[
    // ✏️ 替换为实际的FAQ内容
    { q: 'Is [草药名] safe for daily use?', a: '[150-200字详细回答]' },
    { q: 'How long does it take to work?', a: '[150-200字详细回答]' },
    { q: 'Can I take [草药名] with medications?', a: '[150-200字详细回答]' },
    // ... 添加7-12个问题
  ].map((faq, idx) => (
    <details key={idx} className="bg-gray-50 p-6 rounded-xl">
      <summary className="font-semibold text-gray-900 cursor-pointer">
        {faq.q}
      </summary>
      <p className="mt-4 text-gray-700">{faq.a}</p>
    </details>
  ))}
</div>
```

**💡 获取FAQ的最佳来源：**
1. **Google "People Also Ask"** - 搜索草药名称，查看PAA问题
2. **Reddit/Quora** - 用户真实问题
3. **Amazon产品评论** - 查看常见疑问
4. **竞争对手网站** - Healthline, WebMD等

**📝 必须包含的10个标准FAQ：**
1. Is [草药] safe for daily use?
2. How long does it take to work?
3. Can I take [草药] with medications?
4. What's the best time to take [草药]?
5. Are there any side effects?
6. Can pregnant/breastfeeding women take [草药]?
7. What's the difference between [形式A] and [形式B]?
8. Does [草药] cause [常见误解]?
9. Can I take [草药] if I have [常见疾病]?
10. What's the best [草药] supplement brand?

---

## 1️⃣1️⃣ **科学参考文献（第279-287行）**

```tsx
<ol className="space-y-3 text-sm text-gray-700">
  {/* ✏️ 添加5-10个科学引用 */}
  <li>
    1. [作者], et al. "[研究标题]." <em>[期刊名].</em> [年份];[卷](期):页码. 
    <a href="https://pubmed.ncbi.nlm.nih.gov/[PMID]" target="_blank">PubMed</a>
  </li>
  {/* 添加更多... */}
</ol>
```

**📚 寻找科学文献的来源：**
- **PubMed**: https://pubmed.ncbi.nlm.nih.gov/
- **Google Scholar**: https://scholar.google.com/
- **WHO Herbal Monographs**: https://apps.who.int/medicinedocs/
- **NCCIH**: https://www.nccih.nih.gov/health/herbsataglance

**引用格式示例：**
```
Chandrasekhar K, Kapoor J, Anishetty S. A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of a high-concentration full-spectrum extract of ashwagandha root in reducing stress and anxiety in adults. Indian J Psychol Med. 2012;34(3):255-262. PubMed
```

---

## 1️⃣2️⃣ **医疗免责声明（第289-297行）**

```tsx
<section className="border-t border-gray-200 pt-8">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Disclaimer</h3>
  <p className="text-sm text-gray-600 leading-relaxed">
    This information is for educational purposes only and is not intended to replace medical advice. 
    Always consult with a qualified healthcare provider before starting any herbal supplement, 
    especially if you are pregnant, breastfeeding, have a medical condition, or are taking medications.
  </p>
</section>
```

**✅ 此部分无需修改，保持原样**

---

## 1️⃣3️⃣ **相关草药推荐（第300-308行）**

```tsx
<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Herbs You Might Like</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {/* ✏️ 添加3-5个相关草药卡片 */}
      {/* 可以手动添加，或后续创建动态组件 */}
    </div>
  </div>
</section>
```

**推荐策略：**
- 功效相似的草药（如：Ashwagandha → Rhodiola, Holy Basil）
- 同一类别的草药（如：适应原草药、助眠草药）
- 可以搭配使用的草药

---

## 1️⃣4️⃣ **底部CTA（第310-327行）**

```tsx
<section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-white mb-4">
      Want Personalized Herb Recommendations?
    </h2>
    <p className="text-green-100 text-lg mb-8">
      Take our 3-minute TCM constitution test to find the best herbs for YOUR body type
    </p>
    <Link href="/constitution-test" className="...">
      Take Free Constitution Test →
    </Link>
  </div>
</section>
```

**✅ 此部分无需修改，自动引导用户到体质测试**

---

## 📊 **内容填充优先级和时间估算**

| 优先级 | 部分 | 字数要求 | 预计时间 | 重要性 |
|--------|------|----------|----------|--------|
| 🔥 **P0** | Quick Summary | 100-150字 | 15分钟 | ⭐⭐⭐⭐⭐ |
| 🔥 **P0** | Key Benefits卡片 | 600-800字 | 45分钟 | ⭐⭐⭐⭐⭐ |
| 🔥 **P0** | Dosage表格 | 100-200字 | 20分钟 | ⭐⭐⭐⭐⭐ |
| 🔥 **P0** | Safety警告 | 200-300字 | 30分钟 | ⭐⭐⭐⭐⭐ |
| 🔥 **P0** | FAQ (10个) | 1500-2000字 | 60分钟 | ⭐⭐⭐⭐⭐ |
| **P1** | 引言段落 | 500-800字 | 40分钟 | ⭐⭐⭐⭐ |
| **P1** | Scientific References | 5-10条引用 | 30分钟 | ⭐⭐⭐⭐ |
| **P2** | TCM视角 | 150-200字 | 20分钟 | ⭐⭐⭐ |
| **P2** | 图片添加 | - | 10分钟 | ⭐⭐⭐ |

**总计时间：** 约 **3-4小时/草药**

**快速版本（仅P0内容）：** 约 **2小时/草药**

---

## 🎯 **快速填充检查清单**

### ✅ **完成前检查（每个草药页面）**

#### **SEO元数据**
- [ ] Title包含草药名称和关键词
- [ ] Description在155字符内，吸引点击
- [ ] Keywords包含5-10个相关词
- [ ] Canonical URL正确
- [ ] Open Graph图片路径正确

#### **核心内容**
- [ ] Quick Summary填写完整（4个要点）
- [ ] Benefits部分至少2个卡片，每个200+字
- [ ] Dosage表格包含3-5种剂型
- [ ] Pro Tips包含4-5条建议
- [ ] Safety警告详细且准确
- [ ] 药物相互作用已说明
- [ ] FAQ至少10个问题，每个150+字答案

#### **次要内容**
- [ ] TCM三个卡片已填充
- [ ] Scientific References至少5条
- [ ] 引言段落500+字

#### **技术检查**
- [ ] 草药图片已添加到 `/public/images/herbs/[slug].jpg`
- [ ] 所有[占位符]已替换为实际内容
- [ ] 没有拼写错误
- [ ] 链接都能正常工作

#### **SEO检查**
- [ ] 标题自然包含关键词
- [ ] 内容易读，段落适中
- [ ] 使用了H2、H3等标题层级
- [ ] 图片有alt标签

---

## 📝 **内容填充模板汇总**

### **Quick Summary模板**
```
✅ What it is: [草药类型] used in [传统医学系统] for [主要用途]
✅ Main benefits: [益处1], [益处2], [益处3], [益处4]
✅ Best for: [用户群1], [用户群2], [用户群3]
✅ Safety rating: ⭐⭐⭐⭐⭐ ([安全性评价])
```

### **Benefits卡片模板**
```
标题：[图标] [益处类别]
内容：
[草药名] provides significant benefits for [具体领域]. Research shows:
• [具体数据/结果1]
• [具体数据/结果2]
• [具体数据/结果3]

Evidence: ⭐⭐⭐⭐⭐ ([X] RCTs with [Y] participants)
```

### **FAQ答案模板**
```
[回答关键问题，然后提供细节]

For [具体情况]:
• [要点1]
• [要点2]
• [要点3]

[结束建议/注意事项]
```

---

## 🚀 **下一步行动**

### **选项1：手动填充（推荐学习阶段）**
1. 选择1个草药（建议从Ashwagandha开始）
2. 使用 `HERB_CONTENT_TEMPLATE_ASHWAGANDHA.md` 中的内容
3. 复制粘贴到对应位置
4. 预计时间：1小时

### **选项2：批量填充（效率优先）**
1. 准备10个草药的Quick Summary（各15分钟）
2. 批量填充Benefits和Dosage（各30分钟）
3. 使用FAQ模板快速复制调整
4. 预计时间：每个草药30-45分钟

### **选项3：AI辅助填充（最快速）**
1. 使用ChatGPT/Claude生成初稿
2. 人工审核和调整
3. 添加科学引用
4. 预计时间：每个草药20-30分钟

---

## 💡 **专业提示**

### **内容写作技巧：**
1. **使用数据支持**: "Reduces stress by 28%" 比 "Helps reduce stress" 更有说服力
2. **避免绝对化**: 用 "may help" 而不是 "will cure"
3. **平衡正面和注意事项**: 既要介绍益处，也要说明禁忌
4. **用户语言**: 避免过多专业术语，解释医学概念
5. **结构清晰**: 使用列表、表格、卡片提高可读性

### **SEO优化技巧：**
1. **关键词自然分布**: 在标题、开头、小标题中自然使用
2. **内链策略**: 链接到相关草药和症状页面
3. **外链权威**: 引用PubMed、WHO等权威来源
4. **用户意图**: 回答"是什么"、"怎么用"、"安全吗"等核心问题
5. **Featured Snippet**: Quick Summary格式化为列表，易于抓取

---

**准备好开始填充内容了吗？我建议从Ashwagandha开始，因为我已经准备好了完整的内容模板！** 🌿

