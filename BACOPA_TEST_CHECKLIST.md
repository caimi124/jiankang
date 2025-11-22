# 🧪 Bacopa Monnieri 页面测试清单

## ✅ 开发服务器已启动
- 🌐 URL: http://localhost:3002
- ✅ 状态: 运行中
- ⏱️ 启动时间: 7.3秒

---

## 🔍 必测页面链接

### 主页面 (3个URL别名都应该工作)
1. **主URL**: http://localhost:3002/herbs/bacopa
2. **别名1**: http://localhost:3002/herbs/bacopa-monnieri  
3. **别名2**: http://localhost:3002/herbs/brahmi

---

## ✅ 功能测试清单

### 1. 页面加载测试
- [ ] 页面能正常加载，无404错误
- [ ] 页面标题显示: "Bacopa Monnieri"
- [ ] 拉丁学名显示: "Bacopa monnieri (L.) Wettst."
- [ ] 中文名称显示: "假马齿苋 (Brahmi)"
- [ ] 分类标签显示: "Cognitive Enhancement & Brain Support"
- [ ] 证据等级标签显示: "Strong Evidence"

### 2. Tab导航测试
- [ ] Overview Tab - 默认打开
- [ ] Benefits & Uses Tab - 可切换
- [ ] Safety & Dosage Tab - 可切换
- [ ] Scientific Evidence Tab - 可切换
- [ ] Traditional Use Tab - 可切换
- [ ] FAQ Tab - 可切换

### 3. Overview Tab内容
- [ ] "What is Bacopa Monnieri?" 标题显示
- [ ] Overview段落完整显示（3000+字）
- [ ] "Key Active Compounds" 区块显示
  - [ ] Bacoside A/B 等8种成分加粗显示
- [ ] "Primary Properties" 区块显示
  - [ ] 9个特性标签（绿色圆角）
- [ ] "How to Use Bacopa Monnieri" 区块显示
  - [ ] 蓝色提示框: "Best taken with food..."
  - [ ] 4个使用方法编号显示

### 4. 食谱模块测试 ⭐ 重点
在 "How to Use" 区块中应该看到:

#### 食谱1: Bacopa Pesto
- [ ] 标题: "🌿 Bacopa Pesto (Brahmi Basil Pesto)"
- [ ] 副标题: "A flavorful way to add Bacopa to your daily meals"
- [ ] 绿色渐变背景 (green-50 to emerald-50)
- [ ] Ingredients列表（6项）
  - [ ] 1 cup soaked pine nuts
  - [ ] 1/2 cup fresh basil
  - [ ] 1/2 cup fresh Bacopa leaves
  - [ ] Juice of 1 lemon
  - [ ] 1 tsp Himalayan salt
  - [ ] 50ml water or olive oil
- [ ] Instructions列表（2步）
- [ ] 蓝色使用提示框

#### 食谱2: Bacopa Lentil Stew
- [ ] 标题: "🍲 Bacopa Lentil Stew (Comforting & Nourishing)"
- [ ] 副标题: "Ideal for stress relief, students, and calming meals"
- [ ] 琥珀色渐变背景 (amber-50 to yellow-50)
- [ ] Ingredients列表（8项）
- [ ] Instructions列表（7步）
- [ ] 琥珀色"Perfect for"提示框
  - [ ] 包含TCM术语: "Heart Blood and calms Shen (Spirit)"

#### 食谱3: Traditional Bacopa Tea
- [ ] 编号4的茶饮用法
- [ ] 剂量: 1-2 teaspoons dried Bacopa
- [ ] 时间建议: morning or early afternoon

### 5. Benefits Tab测试
- [ ] "Science-Backed Benefits" 标题显示
- [ ] 10个功效卡片显示
  - [ ] 每个卡片有绿色勾选图标
  - [ ] 临床数据显示: "+24% memory", "78% children"等
- [ ] "Who Should Consider Bacopa?" 区块
  - [ ] "Suitable For" 列表（11项，绿色勾选）
  - [ ] "Who Should Avoid It" 列表（8项，红色叉号）

### 6. Safety & Dosage Tab测试
- [ ] "Dosage & Safety Guidelines" 标题
- [ ] 5种剂型卡片显示
  1. [ ] Standardized Extract (20-55% bacosides) - 100-300mg
  2. [ ] Full-Spectrum Extract - 300mg daily
  3. [ ] Bacopa Tea - 1-2 teaspoons
  4. [ ] Bacopa Powder - 1/2-1 teaspoon
  5. [ ] Children's Dose (≥14 years) - 100-225mg
- [ ] "Important Safety Warnings" 区块（橙色边框）
  - [ ] 8条警告，包括Phase I临床数据
- [ ] "Potential Drug Interactions" 区块（红色边框）
  - [ ] 5项药物相互作用

### 7. Scientific Evidence Tab测试
- [ ] "Scientific Evidence & Research" 标题
- [ ] 蓝色研究总结框显示
  - [ ] 成人12周研究: +24%, +22%, +22%
  - [ ] 儿童6个月研究: 78%, 85%
  - [ ] 青少年研究: 83%
  - [ ] 细胞研究机制
  - [ ] 起效时间线: 15-30分钟, 4-6周, 8-12周

### 8. Traditional Use Tab测试
- [ ] 传统用途描述
- [ ] TCM理论占比70%验证:
  - [ ] 提及: 心经、肝经、心血不足、肝阳上亢、肾阴不足
  - [ ] 提及: 安神、养心血、清热、补肾阴
  - [ ] 提及: 脑海 (Sea of Marrow)
- [ ] Ayurveda理论占比30%:
  - [ ] 提及: Medhya Rasayana
  - [ ] 提及: Vata, Pitta, Kapha
  - [ ] 提及: 3000+年使用历史

#### TCM体质匹配区块
- [ ] 6种体质模式卡片显示:
  1. [ ] 心血不足 - ✅ Excellent match (绿色)
  2. [ ] 肝阳上亢 - ✅ Perfect (绿色)
  3. [ ] 肾阴不足 - ✅ Highly suitable (绿色)
  4. [ ] 气滞 - ✅ Good support (绿色)
  5. [ ] 脾气虚 - ⚠️ Use with caution (黄色)
  6. [ ] 阳虚 - ❌ Not recommended (红色)

### 9. FAQ Tab测试
- [ ] 10个FAQ问答显示
- [ ] 关键问题覆盖:
  1. [ ] Does Bacopa help with ADHD?
  2. [ ] How long until I notice improvements?
  3. [ ] Is Bacopa safe for teenagers?
  4. [ ] Can Bacopa help with brain fog?
  5. [ ] What is the best form to take?
  6. [ ] Does Bacopa make you sleepy?
  7. [ ] Can I take Bacopa with coffee?
  8. [ ] Is Bacopa safe for children?
  9. [ ] Is Bacopa the same as Gotu Kola?
  10. [ ] Can I take Bacopa long-term?

### 10. 用户故事区块
- [ ] 4个用户故事卡片显示
  - [ ] Michael C. (Boston) - 医学生
  - [ ] Patricia L. (Toronto) - ADHD儿童家长
  - [ ] Robert D. (Melbourne) - 62岁记忆改善
  - [ ] Jennifer K. (Seattle) - 焦虑缓解

### 11. 相关草药推荐
- [ ] "Pairs Well With" 区块显示
- [ ] 8个推荐草药链接:
  - [ ] Ashwagandha (可点击)
  - [ ] Gotu Kola
  - [ ] Lion's Mane Mushroom
  - [ ] Ginkgo Biloba
  - [ ] Rhodiola
  - [ ] Holy Basil (Tulsi)
  - [ ] Omega-3 Fatty Acids
  - [ ] Phosphatidylserine

---

## 🎨 UI/UX测试

### 视觉设计
- [ ] Hero区块: 绿色渐变背景
- [ ] 快速统计卡片: 4个卡片横排
  - [ ] Safety Level (Shield图标)
  - [ ] Evidence Quality (FlaskConical图标)
  - [ ] Main Uses (Users图标)
  - [ ] Important Notes (AlertTriangle图标)
- [ ] 收藏按钮: 点击变红色
- [ ] 分享按钮: 正常显示

### 响应式测试
- [ ] 桌面端 (>1024px): 布局正常
- [ ] 平板端 (768-1024px): 自适应良好
- [ ] 移动端 (<768px): 卡片堆叠显示

### 交互功能
- [ ] Tab切换: 平滑过渡
- [ ] 内链跳转: Ashwagandha/Ginkgo链接正常
- [ ] 滚动流畅: 无卡顿
- [ ] 图标显示: Lucide React图标正常

---

## 🔍 SEO测试

### Meta标签验证 (浏览器DevTools)
打开 http://localhost:3002/herbs/bacopa
按F12 -> Elements -> `<head>` 查看:

- [ ] `<title>` 包含: "Bacopa Monnieri Benefits, Dosage & Safety"
- [ ] `<meta name="description">` ~160字符
- [ ] `<meta name="keywords">` 包含47个关键词
- [ ] `<meta property="og:title">` 正确
- [ ] `<meta property="og:description">` 正确
- [ ] `<meta property="og:type">` = "article"
- [ ] `<meta property="og:url">` = "/herbs/bacopa"
- [ ] `<link rel="canonical">` = "/herbs/bacopa"

### 结构化数据验证
在 `<head>` 中查看 `<script type="application/ld+json">`:

1. [ ] **Medical Content Schema** 存在
   - `@type: MedicalWebPage`
   - 包含作者信息（曾楚平）
   - 包含专业资质

2. [ ] **Product Schema** 存在
   - `@type: Product`
   - 名称: Bacopa Monnieri
   - 描述和功效

3. [ ] **FAQ Schema** 存在
   - `@type: FAQPage`
   - 包含10个问答

4. [ ] **Article Schema** 存在
   - `@type: Article`
   - 医学专家署名
   - E-A-T优化

5. [ ] **Breadcrumb Schema** 存在
   - Home > Herb Database > Bacopa Monnieri

6. [ ] **Medical Citation Schema** 存在
   - 临床研究引用

---

## 🌐 URL别名测试

测试所有3个URL都能正常访问同一页面:

### URL 1: /herbs/bacopa (主URL)
```bash
访问: http://localhost:3002/herbs/bacopa
预期: ✅ 页面正常加载
实际: [ ] 通过 / [ ] 失败
```

### URL 2: /herbs/bacopa-monnieri (拉丁学名别名)
```bash
访问: http://localhost:3002/herbs/bacopa-monnieri
预期: ✅ 重定向或显示相同内容
实际: [ ] 通过 / [ ] 失败
```

### URL 3: /herbs/brahmi (梵文名别名)
```bash
访问: http://localhost:3002/herbs/brahmi
预期: ✅ 重定向或显示相同内容
实际: [ ] 通过 / [ ] 失败
```

---

## 📱 移动端测试

在浏览器DevTools中切换到移动设备模式 (F12 -> Toggle Device Toolbar):

### iPhone 12 Pro (390x844)
- [ ] 页面布局正常
- [ ] Tab导航可横向滚动
- [ ] 食谱卡片垂直堆叠
- [ ] 文字大小适中，可读性好

### iPad (768x1024)
- [ ] 2列卡片布局
- [ ] Tab全部可见，无需滚动
- [ ] 图片和图标大小适中

---

## ⚡ 性能测试

### 加载速度
- [ ] 首次加载 < 3秒
- [ ] 后续加载 < 1秒 (缓存)
- [ ] 图片懒加载正常

### 控制台检查
打开浏览器控制台 (F12 -> Console):
- [ ] 无JavaScript错误
- [ ] 无React警告
- [ ] 无网络请求失败

---

## 🐛 已知问题排查

如果遇到以下问题:

### 问题1: 页面404
**解决方案**:
```bash
1. 检查开发服务器是否运行
2. 清除 .next 缓存: rm -rf .next
3. 重启: npm run dev
```

### 问题2: 食谱不显示
**检查**:
- slug 是否匹配 'bacopa', 'bacopa-monnieri', 'brahmi'
- HerbDetailClient.tsx 第398行条件判断

### 问题3: TCM体质不显示
**检查**:
- 切换到 "Traditional Use" Tab
- herb-detail-fallback.ts 数据是否正确导入

### 问题4: 样式错误
**解决**:
```bash
清除Tailwind缓存: npm run dev
强制刷新: Ctrl + Shift + R
```

---

## 📊 最终验收标准

全部通过后才算完成:

- [ ] **功能完整性**: 所有Tab内容正常显示
- [ ] **食谱模块**: 2个食谱完整可见
- [ ] **TCM比例**: 70% TCM + 30% 西方理论清晰呈现
- [ ] **SEO优化**: Meta标签和Schema正确
- [ ] **URL别名**: 3个URL都能访问
- [ ] **移动响应**: 手机/平板布局正常
- [ ] **性能良好**: 加载快速，无错误
- [ ] **内容准确**: 无拼写错误，数据正确

---

## 🚀 部署前最后检查

在推送到生产环境前:

1. [ ] 运行构建测试: `npm run build`
2. [ ] 检查TypeScript错误: `npm run type-check`
3. [ ] 验证Sitemap包含Bacopa: 访问 /sitemap.xml
4. [ ] 测试生产构建: `npm run start`
5. [ ] 所有测试项通过 ✓

---

## 📝 测试完成签名

**测试人员**: ________________
**测试日期**: ________________
**测试结果**: ⬜ 通过 / ⬜ 不通过
**备注**: ________________

---

**生成时间**: 2025-11-22 11:20 UTC+08:00
