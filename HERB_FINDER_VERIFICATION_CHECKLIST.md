# ✅ Herb Finder 优化验证清单

## 📋 部署前检查

### 代码质量检查
- [ ] 运行 `npm run build` 确保无编译错误
- [ ] 检查 TypeScript 类型错误
- [ ] 检查 ESLint 警告
- [ ] 测试所有交互功能（搜索、筛选、分页）

### 内容验证
- [ ] 页面 title 正确显示
- [ ] Meta description 正确显示
- [ ] H1/H2/H3 标题层级合理
- [ ] 所有新增模块正确渲染
- [ ] FAQ 展开/折叠功能正常

### SEO 技术检查
- [ ] 结构化数据正确（用 Schema.org Validator 验证）
- [ ] Canonical URL 正确
- [ ] robots meta 标签正确（index, follow）
- [ ] 无重复的 H1 标签
- [ ] 图片有 alt 属性
- [ ] 内部链接正常工作

---

## 🚀 部署后验证

### 1️⃣ 页面加载验证
访问 https://herbscience.shop/herb-finder

#### 基础功能
- [ ] 页面加载速度 < 3 秒
- [ ] 无 JavaScript 错误（打开 Console）
- [ ] 草药卡片正确显示
- [ ] 搜索功能正常
- [ ] 筛选功能正常
- [ ] 分页功能正常

#### SEO 元素
- [ ] 页面标题显示为：`Herb Finder - Find Herbs by Symptoms, Body Type & Health Goals | HerbScience`
- [ ] 查看源代码，确认 meta description 包含关键词
- [ ] 查看源代码，确认结构化数据存在

---

### 2️⃣ 内容验证

#### Hero Banner
- [ ] H1 显示为：`Herb Finder – Find Safe, Evidence-Based Herbs for Your Health Goals`
- [ ] 副标题包含 "safe, evidence-based herbs"
- [ ] 三个信任标识显示：
  - ✓ Safe herbal supplements
  - ✓ Find herbs by symptoms
  - ✓ Body type matching

#### Popular Categories
- [ ] 标题显示为：`Find Herbs by Health Goals`
- [ ] 副标题显示
- [ ] 6 个分类按钮全部显示
- [ ] 点击分类按钮，筛选功能正常

#### 搜索栏
- [ ] Placeholder 文字正确：`Find herbs by symptoms (e.g., 'stress', 'sleep problems'...`
- [ ] 输入关键词后实时搜索
- [ ] Advanced Filters 可展开/折叠

#### 新增教育模块
- [ ] "How to Use Herb Finder" 模块显示
  - 4 个步骤列表显示
  - "Take Free Body Constitution Test" 链接正常
  
- [ ] "Safe Herbal Use Guide" 模块显示
  - 4 个安全提示显示
  - Pro Tip 框显示
  
- [ ] "Why Use Our Evidence-Based Herb Finder?" 模块显示
  - 3 个卖点卡片显示
  - 图标正确显示

#### FAQ Section
- [ ] FAQ 标题显示为：`Herb Finder FAQ - Common Questions About Finding Herbs`
- [ ] 9 个问题全部显示
- [ ] 点击问题可展开/折叠
- [ ] 答案内容正确

#### Disclaimer
- [ ] 免责声明框显示
- [ ] 警告图标显示

---

### 3️⃣ 响应式设计验证

#### 桌面 (>1024px)
- [ ] 布局正常
- [ ] 草药卡片 3-4 列显示
- [ ] 所有元素对齐

#### 平板 (768-1024px)
- [ ] 布局自适应
- [ ] 草药卡片 2-3 列显示
- [ ] 导航菜单正常

#### 手机 (<768px)
- [ ] 布局单列显示
- [ ] 草药卡片堆叠
- [ ] 汉堡菜单正常
- [ ] 搜索框全宽显示

---

### 4️⃣ 无障碍性验证

#### 键盘导航
- [ ] Tab 键可以遍历所有交互元素
- [ ] Enter 键可以激活按钮和链接
- [ ] 焦点样式明显可见

#### 屏幕阅读器
- [ ] ARIA labels 存在
- [ ] 语义化 HTML 标签（header, main, nav, section）
- [ ] 图片有 alt 文本
- [ ] 表单元素有 label

#### 颜色对比度
- [ ] 文字与背景对比度 ≥ 4.5:1
- [ ] 链接颜色可区分
- [ ] 按钮状态明显

---

### 5️⃣ SEO 技术验证

#### Google Rich Results Test
1. 访问 https://search.google.com/test/rich-results
2. 输入 URL: https://herbscience.shop/herb-finder
3. 确认以下结构化数据：
   - [ ] CollectionPage Schema
   - [ ] BreadcrumbList Schema
   - [ ] SearchAction Schema
   - [ ] FAQPage Schema (9 个问题)
   - [ ] ItemList Schema (草药列表)
4. 确认无错误或警告

#### Schema.org Validator
1. 访问 https://validator.schema.org/
2. 查看页面源代码，复制所有 JSON-LD
3. 粘贴到 validator 验证
4. 确认无错误

#### Google Search Console
1. 登录 GSC
2. 请求索引：URL Inspection → Request Indexing
3. 提交 sitemap：Sitemaps → Submit sitemap

---

### 6️⃣ 性能验证

#### PageSpeed Insights
1. 访问 https://pagespeed.web.dev/
2. 输入 URL: https://herbscience.shop/herb-finder
3. 目标分数：
   - [ ] 移动端 Performance ≥ 80
   - [ ] 桌面端 Performance ≥ 90
   - [ ] SEO Score = 100
   - [ ] Accessibility Score ≥ 90

#### Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

---

### 7️⃣ 关键词排名监控设置

#### Google Search Console
1. 进入 Performance → Search Results
2. 添加筛选器：Page = `/herb-finder`
3. 导出数据作为基线
4. 记录当前排名：

| 关键词 | 当前排名 | 目标排名 (3个月) |
|--------|----------|------------------|
| herb finder | ___ | Top 20 |
| find herbs by symptoms | ___ | Top 10 |
| best herbs for stress and anxiety | ___ | Top 5 |
| safe herbal supplements | ___ | Top 20 |
| herbs for sleep support | ___ | Top 10 |
| immune boosting herbs | ___ | Top 10 |

#### 第三方工具（可选）
- [ ] Ahrefs: 添加关键词监控
- [ ] SEMrush: 设置位置跟踪
- [ ] Google Analytics: 创建自定义报告

---

## 📊 监控计划

### 每周检查（前 4 周）
- [ ] GSC 展示次数变化
- [ ] GSC 点击次数变化
- [ ] GSC 平均排名变化
- [ ] 页面停留时间
- [ ] 跳出率

### 每月检查
- [ ] 关键词排名变化
- [ ] 自然流量增长
- [ ] 转化率（体质测试、草药详情页点击）
- [ ] 用户反馈

### 每季度复审
- [ ] SEO 策略调整
- [ ] 内容更新
- [ ] 新关键词挖掘
- [ ] 竞争对手分析

---

## 🐛 常见问题排查

### 问题 1：页面标题没有更新
**解决方案**：
```bash
# 清除 Next.js 缓存
rm -rf .next
npm run build
```

### 问题 2：结构化数据未通过验证
**解决方案**：
- 检查 JSON-LD 语法
- 确保所有必填字段存在
- 使用 JSON Lint 验证格式

### 问题 3：草药卡片不显示
**解决方案**：
- 检查 Console 错误
- 确认 `HERBS_DATABASE` 数据存在
- 检查组件导入路径

### 问题 4：搜索功能不工作
**解决方案**：
- 检查 `filters.search` state
- 确认 `applyFilters` 函数正常执行
- 检查 `filteredHerbs` 数据

### 问题 5：新模块未显示
**解决方案**：
- 确认 `!error && herbs.length > 0` 条件满足
- 检查 CSS 样式是否加载
- 清除浏览器缓存

---

## ✅ 最终确认

### 部署前
- [ ] 所有代码已提交到 Git
- [ ] 本地测试通过
- [ ] Build 成功
- [ ] 无 TypeScript 错误

### 部署后
- [ ] 生产环境页面正常
- [ ] 所有新功能工作正常
- [ ] SEO 元素正确
- [ ] 性能达标

### SEO 提交
- [ ] Google Search Console 已提交索引请求
- [ ] Bing Webmaster Tools 已提交（可选）
- [ ] 社交媒体已分享（可选）

---

## 📝 验证记录

**验证人员**: ___________
**验证日期**: ___________
**验证结果**: [ ] 通过 / [ ] 需要修复

### 发现的问题
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### 修复计划
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

---

## 🎉 验证完成

如果所有检查项都已通过，恭喜！🎊

**下一步**：
1. 开始监控 Google Search Console 数据
2. 计划下一批 Landing Pages 创作
3. 撰写配套 Blog 文章

**优化周期**：
- 1 周后：首次数据复查
- 1 个月后：效果评估
- 3 个月后：全面复审

祝页面排名蒸蒸日上！📈
