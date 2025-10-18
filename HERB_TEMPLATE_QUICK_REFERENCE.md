# 🎯 草药页面模板快速参考指南

## 📋 **模板结构一览表**

```
┌─────────────────────────────────────────────────────────────────┐
│                     草药页面完整结构                              │
├─────────────────────────────────────────────────────────────────┤
│ 第 1 部分：SEO元数据 (7-30行)                                    │
│ ├─ Title: [草药名]: Benefits, Dosage, Side Effects             │
│ ├─ Description: 150-160字简介                                  │
│ ├─ Keywords: 5-10个关键词                                      │
│ └─ Open Graph: 社交媒体分享卡片                                │
│                                                                 │
│ 第 2 部分：结构化数据 (32-45行)                                 │
│ └─ Schema.org MedicalWebPage - Google搜索增强                   │
├─────────────────────────────────────────────────────────────────┤
│ 第 3 部分：面包屑导航 (60-68行)                                 │
│ └─ Home › Herbs › [草药名]                                      │
├─────────────────────────────────────────────────────────────────┤
│ 第 4 部分：Hero区域 (70-116行) ⭐⭐⭐⭐⭐                        │
│ ├─ H1标题: [草药名]: Benefits, Dosage & Safety Guide           │
│ ├─ Quick Summary (最重要！)                                     │
│ │   ├─ What it is: 30-50字                                     │
│ │   ├─ Main benefits: 3-5个核心益处                            │
│ │   ├─ Best for: 目标用户                                      │
│ │   └─ Safety rating: ⭐⭐⭐⭐⭐                                │
│ ├─ CTA按钮: Get Personalized Recommendation                    │
│ └─ Hero图片: /images/herbs/[slug].jpg                          │
├─────────────────────────────────────────────────────────────────┤
│ 第 5 部分：目录导航 (118-131行)                                 │
│ └─ Benefits | Dosage | Safety | Research | TCM | FAQ           │
├─────────────────────────────────────────────────────────────────┤
│ 第 6 部分：科学证据和益处 (136-161行) ⭐⭐⭐⭐⭐                │
│ ├─ 引言段落: 500-800字                                         │
│ └─ Key Benefits卡片 (2-4个)                                    │
│     ├─ 🧠 Mental Health: 200-300字                             │
│     ├─ 💪 Physical Health: 200-300字                           │
│     ├─ 😴 Sleep Quality: 200-300字                             │
│     └─ 🎓 Cognitive Function: 200-300字                        │
├─────────────────────────────────────────────────────────────────┤
│ 第 7 部分：剂量指南 (163-207行) ⭐⭐⭐⭐⭐                       │
│ ├─ 剂量表格 (3-5种剂型)                                        │
│ │   ├─ Capsules: 300-500mg, 1-2x daily                         │
│ │   ├─ Powder: 1-2 grams, 2x daily                             │
│ │   └─ Tea: 1-2 cups, 2-3x daily                               │
│ └─ Pro Tips (4-5条建议)                                        │
│     ├─ Best time to take                                       │
│     ├─ Take with                                               │
│     ├─ Avoid taking with                                       │
│     └─ Duration                                                │
├─────────────────────────────────────────────────────────────────┤
│ 第 8 部分：安全性信息 (209-233行) ⭐⭐⭐⭐⭐                     │
│ ├─ Common Side Effects: 常见副作用                             │
│ ├─ ⚠️ Warnings & Contraindications (必须详细!)                │
│ │   ├─ ❌ Pregnancy & Breastfeeding                            │
│ │   ├─ ❌ Autoimmune Diseases                                  │
│ │   ├─ ❌ Surgery                                              │
│ │   └─ ❌ Specific Medications                                 │
│ └─ Drug Interactions: 药物相互作用                             │
├─────────────────────────────────────────────────────────────────┤
│ 第 9 部分：TCM视角 (235-255行)                                  │
│ ├─ Energy Properties: 温/凉/平性                               │
│ ├─ Meridians: 归经                                             │
│ └─ Best Body Type: 适合体质                                    │
├─────────────────────────────────────────────────────────────────┤
│ 第 10 部分：FAQ (257-277行) ⭐⭐⭐⭐⭐                          │
│ └─ 10-15个问题，每个150-200字答案                              │
│     ├─ Is [草药] safe for daily use?                           │
│     ├─ How long does it take to work?                          │
│     ├─ Can I take [草药] with medications?                     │
│     ├─ What's the best time to take [草药]?                    │
│     └─ Are there any side effects?                             │
├─────────────────────────────────────────────────────────────────┤
│ 第 11 部分：科学参考文献 (279-287行)                            │
│ └─ 5-10个PubMed/WHO引用                                        │
├─────────────────────────────────────────────────────────────────┤
│ 第 12 部分：医疗免责声明 (289-297行) ✅ 无需修改                │
├─────────────────────────────────────────────────────────────────┤
│ 第 13 部分：相关草药推荐 (300-308行)                            │
│ └─ 3-5个相关草药卡片                                           │
├─────────────────────────────────────────────────────────────────┤
│ 第 14 部分：底部CTA (310-327行) ✅ 无需修改                     │
│ └─ Take Free Constitution Test →                               │
└─────────────────────────────────────────────────────────────────┘

总字数要求：2000-3000字
总行数：约330行代码
```

---

## 🎯 **必须填充的内容（按优先级）**

### **🔥 P0 - 最高优先级（必须完成）**

| # | 内容部分 | 位置 | 字数 | 时间 | 重要性 |
|---|----------|------|------|------|--------|
| 1 | **Quick Summary** | 83-86行 | 100-150字 | 15分钟 | ⭐⭐⭐⭐⭐ |
| 2 | **Key Benefits卡片** | 148-158行 | 600-800字 | 45分钟 | ⭐⭐⭐⭐⭐ |
| 3 | **Dosage表格** | 179-193行 | 100-200字 | 20分钟 | ⭐⭐⭐⭐⭐ |
| 4 | **Safety警告** | 221-225行 | 200-300字 | 30分钟 | ⭐⭐⭐⭐⭐ |
| 5 | **FAQ** | 262-275行 | 1500-2000字 | 60分钟 | ⭐⭐⭐⭐⭐ |

**P0总时间：** ⏱️ **约2.5小时** - 完成后即可发布！

---

### **⚡ P1 - 高优先级（建议完成）**

| # | 内容部分 | 位置 | 字数 | 时间 | 重要性 |
|---|----------|------|------|------|--------|
| 6 | **引言段落** | 142行 | 500-800字 | 40分钟 | ⭐⭐⭐⭐ |
| 7 | **Pro Tips** | 201-204行 | 100-150字 | 20分钟 | ⭐⭐⭐⭐ |
| 8 | **Drug Interactions** | 230行 | 200-300字 | 25分钟 | ⭐⭐⭐⭐ |
| 9 | **Scientific References** | 283-285行 | 5-10条 | 30分钟 | ⭐⭐⭐⭐ |

**P1总时间：** ⏱️ **约2小时**

---

### **📌 P2 - 一般优先级（可选）**

| # | 内容部分 | 位置 | 字数 | 时间 | 重要性 |
|---|----------|------|------|------|--------|
| 10 | **TCM视角** | 242-252行 | 150-200字 | 20分钟 | ⭐⭐⭐ |
| 11 | **相关草药** | 304-306行 | - | 15分钟 | ⭐⭐⭐ |
| 12 | **Hero图片** | 106行 | - | 10分钟 | ⭐⭐⭐ |

**P2总时间：** ⏱️ **约45分钟**

---

## 📝 **内容填充模板（复制即用）**

### **1. Quick Summary（4个要点）**

```tsx
<li>✅ <strong>What it is:</strong> [草药类型] from [来源地区/传统] used for [主要用途] for over [历史时长]</li>
<li>✅ <strong>Main benefits:</strong> [益处1 with 数据], [益处2], [益处3], [益处4]</li>
<li>✅ <strong>Best for:</strong> [用户群1], [用户群2 with 具体症状], [用户群3]</li>
<li>✅ <strong>Safety rating:</strong> ⭐⭐⭐⭐⭐ ([安全性简评])</li>
```

**示例（Turmeric）：**
```tsx
<li>✅ <strong>What it is:</strong> Golden spice from India containing curcumin, used in Ayurveda for over 4,000 years as powerful anti-inflammatory</li>
<li>✅ <strong>Main benefits:</strong> Reduces inflammation by 58%, relieves arthritis pain, supports heart health, improves cognitive function</li>
<li>✅ <strong>Best for:</strong> People with joint pain, chronic inflammation, those seeking brain health support, digestive issues</li>
<li>✅ <strong>Safety rating:</strong> ⭐⭐⭐⭐⭐ (Very safe, well-tolerated by most people)</li>
```

---

### **2. Benefits卡片（每个200-300字）**

```tsx
<div className="bg-green-50 p-6 rounded-xl">
  <h4 className="font-semibold text-green-900 mb-2">[图标] [益处标题]</h4>
  <p className="text-gray-700 mb-4">
    [草药名] provides [具体益处类型]. Clinical research demonstrates:
  </p>
  <ul className="text-gray-700 space-y-2">
    <li>• <strong>[具体数据/百分比]</strong> [效果描述] ([研究引用])</li>
    <li>• <strong>[具体改善]</strong> [时间范围内的效果]</li>
    <li>• <strong>[长期益处]</strong> [持续使用的效果]</li>
  </ul>
  <div className="mt-4 p-3 bg-white rounded-lg">
    <p className="text-sm font-semibold text-green-900">Evidence Level: ⭐⭐⭐⭐⭐</p>
    <p className="text-xs text-gray-600">Based on [数量] RCTs with [参与者数量]+ participants</p>
  </div>
</div>
```

---

### **3. Dosage表格（3-5行）**

```tsx
<tr className="border-b border-amber-100">
  <td className="py-3">[剂型名称]</td>
  <td className="py-3">[剂量范围]</td>
  <td className="py-3">[频率]</td>
</tr>
```

**常用剂型模板：**
```
Standardized Extract | 300-600mg | 1-2x daily
Root Powder | 1-2 grams | 2x daily
Tea | 1-2 cups | 2-3x daily
Tincture | 2-4ml | 1-2x daily
Capsules | 500mg | 2x daily
```

---

### **4. Safety警告（3-5条）**

```tsx
<li>❌ <strong>[警告类别]:</strong> [详细说明具体禁忌和原因]</li>
```

**必须包含的警告模板：**
```
❌ Pregnancy & Breastfeeding: Do not use. May cause [具体风险]
❌ [疾病类型]: May [相互作用/影响] (consult doctor if you have [疾病])
❌ [药物类别]: May interact with [具体药物] by [作用机制]
❌ Surgery: Stop at least 2 weeks before surgery (may [具体风险])
❌ Allergies: Avoid if allergic to [相关植物/成分]
```

---

### **5. FAQ答案（150-200字）**

```markdown
[直接回答问题 - 1句话]

[详细解释 - 2-3句话]

[具体建议或数据 - 列表形式]:
• [要点1]
• [要点2]  
• [要点3]

[结束建议 - 1句话提醒]
```

**示例（"Is [草药] safe for daily use?"）：**
```
Yes, [草药] is generally safe for daily use when taken at recommended dosages.

Clinical studies have shown safety for up to [X] months of continuous use at doses of [X-Y]mg per day. Most users experience no side effects, and those that occur are typically mild and temporary.

Key safety points:
• Start with lower dose and gradually increase
• Take with food to improve absorption and reduce stomach upset
• Consult doctor if on medications or have health conditions
• Most experts recommend cycling (8 weeks on, 2 weeks off)

Always monitor your body's response and adjust accordingly.
```

---

## 🚀 **快速填充流程（30分钟版本）**

### **Step 1: Quick Summary（5分钟）**
1. What it is → 复制草药基本信息
2. Main benefits → 列出3-4个核心益处
3. Best for → 写出目标用户
4. Safety rating → 评估安全性

### **Step 2: Benefits卡片（10分钟）**
1. 选择2个最重要的益处
2. 每个写150-200字
3. 添加数据支持
4. 标注证据等级

### **Step 3: Dosage表格（3分钟）**
1. 查找标准剂量（Google: "[herb] dosage"）
2. 填入3种常见剂型
3. 添加频率建议

### **Step 4: Safety警告（5分钟）**
1. 孕妇禁用（标准警告）
2. 查找药物相互作用
3. 添加3-4条具体禁忌

### **Step 5: FAQ（7分钟）**
1. 从标准FAQ模板选择10个
2. 简短回答（每个100字）
3. 后续可详细完善

**Total: 30分钟** = 可发布的基础版本！ ✅

---

## 📊 **质量检查清单**

### **发布前必查（5分钟）**

```
SEO检查：
□ 标题包含草药名称
□ Description < 160字符
□ Keywords 5-10个
□ Canonical URL正确

内容检查：
□ Quick Summary 4个要点完整
□ Benefits至少2个卡片
□ Dosage表格至少3行
□ Safety警告至少3条
□ FAQ至少5个问题

技术检查：
□ 图片路径正确（即使暂时没图也要设置）
□ 所有[占位符]已删除
□ 没有语法错误
□ 本地测试通过 (npm run dev)
```

---

## 💡 **Pro Tips - 节省时间的技巧**

### **1. 使用AI辅助（ChatGPT/Claude）**
```
Prompt示例：
"为Ashwagandha草药生成Quick Summary，包括：
1. What it is (30字)
2. Main benefits (列出4个，带数据)
3. Best for (3个用户群)
4. Safety rating

要求：专业、基于科学研究、易读"
```

### **2. 复用内容模板**
- 80%的FAQ可以跨草药复用（改名字即可）
- Safety警告大部分相似
- 表格结构完全一致

### **3. 批量处理**
- 同时打开5个草药页面
- 先完成所有Quick Summary
- 再完成所有Dosage表格
- 流水线作业，效率提升50%

### **4. 分阶段发布**
- **第1天**：完成P0内容，发布基础版
- **第2-3天**：补充P1内容
- **第4-7天**：完善P2内容和图片

---

## 🎯 **下一步行动**

### **现在就做（10分钟）：**
```bash
# 1. 打开一个草药页面
code app/herbs/ashwagandha/page.tsx

# 2. 打开内容模板参考
code HERB_CONTENT_TEMPLATE_ASHWAGANDHA.md

# 3. 复制第一个部分（Quick Summary）
# 4. 粘贴并微调
```

### **今天完成（2小时）：**
- ✅ 完成1个草药的所有P0内容
- ✅ 本地测试
- ✅ 提交到Git

### **本周完成（10小时）：**
- ✅ 完成3-5个高价值草药
- ✅ 添加图片
- ✅ 部署到生产环境

---

**🚀 准备开始了吗？我建议从Ashwagandha开始，因为我已经准备好了完整内容！**

**需要我帮您：**
1. ✅ 直接填充Ashwagandha的内容？
2. ✅ 生成其他草药（如Turmeric）的内容模板？
3. ✅ 创建批量填充脚本？

**告诉我您的选择，我立即帮您执行！** 💪

