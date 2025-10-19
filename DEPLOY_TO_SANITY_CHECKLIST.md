# Sanity CMS 部署检查清单

**项目ID:** 13rzzwgz  
**Dataset:** production  
**日期:** 2025-01-19

---

## ✅ 准备工作检查

### 1. 环境配置

- [x] `.env.local` 文件已存在
- [ ] `SANITY_API_TOKEN` 已配置（需要你手动配置）
- [x] `NEXT_PUBLIC_SANITY_PROJECT_ID` = 13rzzwgz
- [x] `NEXT_PUBLIC_SANITY_DATASET` = production

**如何获取API Token：**

1. 访问：https://www.sanity.io/manage/personal/tokens
2. 点击 "Add API token"
3. 配置：
   - **Label:** HerbScience Blog Deployment
   - **Permissions:** ⚠️ 必须选择 **Editor** (需要写入权限)
4. 复制生成的token
5. 打开项目根目录的 `.env.local` 文件
6. 找到这一行：`SANITY_API_TOKEN=your-token-here`
7. 替换为：`SANITY_API_TOKEN=你的实际token`
8. 保存文件

⚠️ **重要：** Token只显示一次，请妥善保存！

---

### 2. 依赖检查

- [x] `@sanity/client` 已安装 (v7.11.2)
- [x] `sanity` 已安装 (v4.9.0)
- [x] `next-sanity` 已安装 (v10.1.4)

✅ 所有依赖已就绪！

---

## 🚀 部署步骤

### 步骤1：配置API Token

```bash
# 编辑.env.local文件
# 将 SANITY_API_TOKEN=your-token-here
# 改为 SANITY_API_TOKEN=sk_你的实际token
```

---

### 步骤2：部署Turmeric博客文章（2篇）

#### 部署第一篇：Turmeric剂量指南

```bash
node add-turmeric-blog-to-sanity.js
```

**预期输出：**
```
🌿 开始添加Turmeric博客文章到Sanity CMS...

步骤1: 检查作者...
✅ 作者已存在: HerbScience Team (或创建成功)

步骤2: 检查分类...
✅ 分类已存在: Herbal Guides (或创建成功)

步骤3: 创建标签...
✅ 标签创建成功: Turmeric
✅ 标签创建成功: Dosage Guide
✅ 标签创建成功: Inflammation
✅ 标签创建成功: TCM Constitution

步骤4: 创建博客文章...

🎉 成功！Turmeric博客文章已添加到Sanity CMS

📊 文章详情:
   ID: xxx
   标题: How Much Turmeric Per Day? Safe Dosage Guide (2025 Update)
   Slug: how-much-turmeric-per-day
   状态: published
   阅读时间: 8分钟
```

---

#### 部署第二篇：Turmeric副作用警告

```bash
node add-turmeric-side-effects-blog-to-sanity.js
```

**预期输出：**
```
🌿 开始添加"10 Serious Side Effects of Turmeric"博客文章到Sanity CMS...

步骤1: 检查作者...
✅ 作者已存在: HerbScience Team

步骤2: 检查分类...
✅ 分类创建成功: Herb Safety

步骤3: 创建标签...
✅ 标签创建成功: Turmeric
✅ 标签创建成功: Safety
✅ 标签创建成功: Side Effects
✅ 标签创建成功: Curcumin
✅ 标签创建成功: Medication Interactions

步骤4: 创建博客文章...

🎉 成功！"10 Serious Side Effects of Turmeric"博客文章已添加到Sanity CMS

📊 文章详情:
   ID: xxx
   标题: 10 Serious Side Effects of Turmeric You Should Know (2025)
   Slug: 10-serious-side-effects-of-turmeric
   状态: published
   阅读时间: 10分钟
   Featured: true

🎯 预期SEO效果:
   - 核心关键词KGR: 0.0226 (超级金矿!)
   - 月搜索量: 10,000次
   - 预计2-4周进入前20位
   - 预计3个月进入前10位
   - 预计月流量: 15,000-25,000次访问
```

---

## 🔍 验证部署

### 方法1：Sanity Studio（本地）

```bash
cd sanity
npm run dev
```

然后访问：http://localhost:3333

检查：
- [ ] 左侧菜单点击 "Blog Posts"
- [ ] 应该看到2篇新文章：
  - "How Much Turmeric Per Day? Safe Dosage Guide (2025 Update)"
  - "10 Serious Side Effects of Turmeric You Should Know (2025)"
- [ ] 点击文章查看完整内容
- [ ] 确认 Category, Tags, Author 都正确关联

---

### 方法2：Sanity Dashboard（在线）

访问：https://www.sanity.io/organizations/ou4t3rSBT/project/13rzzwgz

1. 登录你的Sanity账号
2. 进入项目 "HerbScience CMS"
3. 查看 "Content" → "Blog Posts"
4. 确认2篇文章已添加

---

### 方法3：前端网站验证

**前提：** 确保Next.js项目已配置从Sanity读取数据

访问以下URL（部署后）：
- [ ] https://herbscience.shop/blog
- [ ] https://herbscience.shop/blog/how-much-turmeric-per-day
- [ ] https://herbscience.shop/blog/10-serious-side-effects-of-turmeric

检查：
- [ ] 文章标题显示正确
- [ ] 文章内容完整显示
- [ ] 图片（如果有）正常加载
- [ ] SEO meta标签正确
- [ ] 移动端响应式正常

---

## ❌ 常见错误排查

### 错误1：Authentication failed

**症状：**
```
❌ 添加失败: Authentication failed
```

**解决方案：**
1. 检查 `.env.local` 中的 `SANITY_API_TOKEN` 是否正确
2. 确认token权限是 **Editor** 而不是 Viewer
3. 确认token没有过期
4. 重新生成token并更新 `.env.local`

---

### 错误2：Project not found

**症状：**
```
❌ 添加失败: Project '13rzzwgz' not found
```

**解决方案：**
1. 确认 `.env.local` 中的项目ID是 `13rzzwgz`
2. 确认你的Sanity账号有访问该项目的权限
3. 访问 https://www.sanity.io/organizations/ou4t3rSBT/project/13rzzwgz 确认项目存在

---

### 错误3：文章已存在

**症状：**
```
❌ 添加失败: Document with slug 'how-much-turmeric-per-day' already exists
```

**解决方案：**
1. 这是正常的，说明文章已经添加过了
2. 如果需要更新内容，手动在Sanity Studio中编辑
3. 或者修改脚本添加更新逻辑

---

### 错误4：Schema validation error

**症状：**
```
❌ 添加失败: Validation error in field 'content'
```

**解决方案：**
1. 检查 `sanity/schemas/blogPost.ts` schema定义
2. 确认content字段类型是 `array` of `block`
3. 确认脚本生成的Block Content格式正确
4. 重新运行脚本

---

## 📊 部署后待办事项

### 立即执行（今天）

- [ ] 提交新文章到Google Search Console
  ```
  https://herbscience.shop/blog/how-much-turmeric-per-day
  https://herbscience.shop/blog/10-serious-side-effects-of-turmeric
  ```
- [ ] 请求索引（Priority: High）
- [ ] 检查页面SEO meta标签
- [ ] 测试移动端显示

---

### 本周执行

- [ ] 建立内部链接
  - 从Ashwagandha页面链接到Turmeric文章
  - 两篇Turmeric文章互相链接
  - 从首页Featured模块展示
- [ ] 社交媒体发布
  - Twitter
  - LinkedIn
  - Facebook健康社群
- [ ] 设置Google Analytics事件追踪

---

### 2周内执行

- [ ] 创建信息图
  - Turmeric剂量对比表
  - 10个副作用一览图
- [ ] 反向链接建设
  - Reddit r/Supplements
  - Quora问答
  - 健康论坛参与

---

## 📈 监控指标

### Google Search Console

**追踪关键词排名：**
- how much turmeric per day
- turmeric dosage
- 10 serious side effects of turmeric
- turmeric side effects
- is turmeric bad for your liver

**目标：**
- 第1周：开始索引
- 第2-4周：进入前50位
- 第4-8周：进入前20位
- 3个月：进入前10位

---

### Google Analytics

**追踪指标：**
- 页面浏览量（Pageviews）
- 平均停留时间（目标：>4分钟）
- 跳出率（目标：<60%）
- 转化率：
  - Constitution Test点击率（目标：>5%）
  - Newsletter订阅率（目标：>3%）

---

## 🎯 成功标准

### 1个月后

✅ 两篇文章都被Google索引  
✅ 合计获得500+自然访问  
✅ 平均停留时间>3分钟  
✅ 获得首个自然反向链接

### 3个月后

✅ "10 serious side effects" 排名前10  
✅ 合计月流量20,000+  
✅ 获得10+自然反向链接  
✅ Constitution Test转化率>4%

### 6个月后

✅ 合计月流量80,000+  
✅ 成为turmeric安全性主题权威  
✅ 获得50+高质量反向链接  
✅ Newsletter订阅列表20,000+

---

## 📚 相关文档

- **Sanity配置指南:** `SANITY_SETUP_GUIDE.md`
- **Turmeric剂量文章:** `TURMERIC_DOSAGE_BLOG_OPTIMIZED.md`
- **Turmeric副作用文章:** `TURMERIC_SIDE_EFFECTS_BLOG_OPTIMIZED.md`
- **SEO分析报告:** `TURMERIC_SIDE_EFFECTS_SEO_ANALYSIS.md`
- **完整报告:** `TURMERIC_BLOG_SERIES_COMPLETION_REPORT.md`

---

## 🆘 需要帮助？

**问题1：脚本运行失败**
- 检查错误信息
- 确认所有配置正确
- 查看本文档的错误排查部分

**问题2：文章不显示在前端**
- 确认Next.js配置了Sanity数据源
- 检查Sanity query是否正确
- 清除Next.js缓存并重新构建

**问题3：SEO meta标签缺失**
- 检查前端页面组件
- 确认从Sanity读取了seoTitle和seoDescription
- 添加Open Graph和Twitter Card标签

---

## ✅ 快速开始

如果你准备好了，按照以下步骤开始：

1. **配置API Token**（5分钟）
   ```bash
   # 编辑.env.local，添加你的Sanity API Token
   ```

2. **运行部署脚本**（1分钟）
   ```bash
   node add-turmeric-blog-to-sanity.js
   node add-turmeric-side-effects-blog-to-sanity.js
   ```

3. **验证部署**（5分钟）
   - 访问Sanity Studio
   - 检查文章是否正确添加
   - 验证所有字段完整

4. **前端集成**（10-30分钟）
   - 确保Next.js读取Sanity数据
   - 测试文章页面显示
   - 验证SEO meta标签

5. **提交搜索引擎**（5分钟）
   - Google Search Console提交新URL
   - 请求索引

**总耗时：** 约30-50分钟

---

**🎊 准备好了吗？开始部署你的黄金内容吧！** 🚀

有任何问题随时查阅本文档或相关文档。

