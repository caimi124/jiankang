# Turmeric博客文章 - Sanity CMS部署指南

## 📋 概述

本指南帮助你将优化后的Turmeric博客文章（"How Much Turmeric Per Day?"）部署到Sanity CMS。

---

## ✅ 部署前准备

### 1. 确认Sanity配置

检查你的环境变量文件（`.env.local`）是否包含：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token
```

**如何获取API Token:**
1. 访问 https://sanity.io/manage
2. 选择你的项目
3. 进入 **API** > **Tokens**
4. 创建新token，权限选择 **Editor** 或 **Administrator**
5. 复制token到 `.env.local`

---

### 2. 安装Sanity Client（如果还没安装）

```bash
npm install @sanity/client
```

---

## 🚀 部署方法

### 方法A：使用脚本自动部署（推荐）

#### 步骤1：运行部署脚本

```bash
node add-turmeric-blog-to-sanity.js
```

#### 步骤2：查看部署结果

脚本会自动：
- ✅ 创建或检查作者（HerbScience Team）
- ✅ 创建或检查分类（Herbal Guides）
- ✅ 创建标签（Turmeric, Dosage Guide, Inflammation, TCM Constitution）
- ✅ 创建博客文章，包含完整内容

**成功输出示例：**
```
🎉 成功！Turmeric博客文章已添加到Sanity CMS

📊 文章详情:
   ID: 123abc...
   标题: How Much Turmeric Per Day? Safe Dosage Guide (2025 Update)
   Slug: how-much-turmeric-per-day
   状态: published
   阅读时间: 8分钟

✅ 现在你可以在Sanity Studio中编辑这篇文章:
   URL: https://herbscience.sanity.studio/desk/blogPost;123abc...
```

---

### 方法B：手动在Sanity Studio中创建

如果你更喜欢在Sanity Studio的可视化界面中操作：

#### 步骤1：打开Sanity Studio

```bash
cd sanity
npm run dev
```

访问：http://localhost:3333

#### 步骤2：创建新博客文章

1. 点击左侧菜单 **Blog Post**
2. 点击右上角 **Create** 按钮
3. 填写以下字段：

**基本信息：**
- **Title**: `How Much Turmeric Per Day? Safe Dosage Guide (2025 Update)`
- **Slug**: `how-much-turmeric-per-day`
- **Excerpt**: 
  ```
  Discover the safe turmeric dosage per day. Learn how much turmeric you should take for inflammation, what turmeric does for your body, and how to avoid side effects. Complete evidence-based guide with dosage tables and recipes.
  ```

**SEO字段：**
- **SEO Title**: `How Much Turmeric Per Day? Safe Dosage Guide (2025)`
- **SEO Description**: 
  ```
  Discover the safe turmeric dosage per day. Learn how much turmeric you should take for inflammation, what does turmeric do for your body, and avoid side effects. Evidence-based guide.
  ```
- **SEO Keywords**: 添加以下标签
  - how much turmeric per day
  - turmeric dosage
  - what does turmeric do for the body
  - turmeric powder dosage
  - recommended dosage of turmeric for inflammation
  - how much turmeric daily
  - turmeric supplement dose
  - best way to take turmeric
  - turmeric side effects
  - best turmeric supplement

**内容（Content）：**
从 `TURMERIC_DOSAGE_BLOG_OPTIMIZED.md` 文件第33行开始，复制所有内容到Sanity的可视化编辑器。

**元数据：**
- **Author**: 选择或创建 "HerbScience Team"
- **Category**: 选择或创建 "Herbal Guides"
- **Tags**: 创建并选择：
  - Turmeric
  - Dosage Guide
  - Inflammation
  - TCM Constitution
- **Read Time**: `8` 分钟
- **Featured**: ✅ 勾选
- **Status**: `published`
- **Published At**: 选择今天的日期

#### 步骤3：保存并发布

点击右上角 **Publish** 按钮。

---

## 🔍 部署后验证

### 1. 在Sanity Studio中检查

访问你的Sanity Studio：
- 确认文章出现在 **Blog Post** 列表中
- 检查所有字段是否正确填写
- 确认SEO字段完整

### 2. 在网站前端检查

```bash
# 在项目根目录运行
npm run dev
```

访问：
- **博客列表页**: http://localhost:3000/blog
- **文章详情页**: http://localhost:3000/blog/how-much-turmeric-per-day

**检查项：**
- ✅ 文章标题和摘要显示正确
- ✅ 内容格式正确（标题、段落、列表）
- ✅ 标签和分类显示
- ✅ SEO meta标签正确（查看页面源代码）

### 3. SEO检查

使用浏览器开发者工具查看：

```html
<!-- 应该看到这些meta标签 -->
<title>How Much Turmeric Per Day? Safe Dosage Guide (2025)</title>
<meta name="description" content="Discover the safe turmeric dosage per day..." />
<meta property="og:title" content="How Much Turmeric Per Day?..." />
<meta property="og:description" content="..." />
```

---

## 📊 SEO优化总结

### 目标关键词覆盖

| 关键词 | KGR指标 | 布局位置 |
|--------|---------|----------|
| how much turmeric per day | 0.07 | 标题、H2、内容 |
| turmeric dosage | 1.81 | H2、表格、FAQ |
| what does turmeric do for the body | 0.007 | H2、内容 |
| recommended dosage of turmeric for inflammation | 0.001 | H3、表格 |
| how much turmeric daily | 0.08 | 内容、FAQ |
| best way to take turmeric | 0.145 | H2、内容 |

### 预期效果

**第1-2周：**
- Google开始索引新文章
- 出现在长尾关键词搜索结果中（KGR < 0.25）

**第2-4周：**
- 排名提升到前50位
- 开始获得自然流量

**第4-8周：**
- 目标关键词排名进入前20位
- 每天预计10-50次自然访问

**3个月后：**
- 核心关键词排名稳定在前10位
- 每天预计50-200次自然访问

---

## 🔗 内部链接策略

在文章中已嵌入以下内部链接：

1. **Constitution Test**: `https://herbscience.shop/constitution-test`
2. **Herb Finder**: `https://herbscience.shop/herb-finder`
3. **相关草药详情页** (待创建):
   - Ginger page
   - Chamomile page
   - Holy Basil page

**下一步建议：**
- 从网站其他页面链接到这篇文章
- 在Ashwagandha详情页添加"相关文章"模块
- 在首页Featured Articles中展示此文章

---

## 🎯 后续优化建议

### 1. 创建配套内容

基于KGR数据，创建以下高价值文章：

| 文章标题 | 目标关键词 | KGR | 优先级 |
|---------|-----------|-----|--------|
| 10 Serious Side Effects of Turmeric | 10 serious side effects of turmeric | 0.0226 | 🔥 高 |
| Turmeric vs Ginger: Which Is Better? | turmeric and ginger benefits | 0.621 | 🔥 高 |
| Is Turmeric Bad for Your Liver? | is turmeric bad for your liver | 0.006 | 🔥 高 |
| Best Turmeric Supplements 2025 | best turmeric supplement | 0.266 | 中 |
| Turmeric Tea Benefits & Recipes | turmeric tea benefits | 7.77 | 低 |

### 2. 添加图片和视频

- 创建信息图：Turmeric Dosage Cheat Sheet
- 制作视频：How to Make Golden Milk
- 添加对比图：不同turmeric补充剂吸收率

### 3. 结构化数据

在前端页面添加JSON-LD structured data:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Much Turmeric Per Day? Safe Dosage Guide (2025 Update)",
  "description": "Discover the safe turmeric dosage per day...",
  "author": {
    "@type": "Organization",
    "name": "HerbScience"
  },
  "publisher": {
    "@type": "Organization",
    "name": "HerbScience",
    "logo": {
      "@type": "ImageObject",
      "url": "https://herbscience.shop/logo.png"
    }
  },
  "datePublished": "2025-01-19",
  "dateModified": "2025-01-19"
}
```

---

## ❓ 常见问题

### Q1: 脚本运行失败，提示 "Authentication failed"

**A:** 检查 `.env.local` 中的 `SANITY_API_TOKEN` 是否正确，并确保token有写入权限。

---

### Q2: 文章在Sanity中显示，但前端看不到？

**A:** 可能原因：
1. Sanity CDN缓存需要几分钟更新
2. 检查文章的 `status` 是否为 `published`
3. 重启开发服务器：`npm run dev`

---

### Q3: 如何修改已发布的文章？

**A:** 
1. 在Sanity Studio中找到文章
2. 直接编辑内容
3. 点击 **Publish** 更新
4. 前端会自动同步（可能需要1-2分钟）

---

### Q4: 想在本地预览内容，但不发布？

**A:** 在Sanity Studio中：
1. 将 **Status** 改为 `draft`
2. 点击 **Publish**
3. 文章将不会出现在前端网站

---

## 📧 需要帮助？

如果在部署过程中遇到问题：

1. 检查Sanity控制台错误信息
2. 查看 `add-turmeric-blog-to-sanity.js` 脚本输出
3. 确认Sanity项目配置正确

---

## ✅ 完成清单

在完成部署后，确认以下事项：

- [ ] 文章已成功添加到Sanity CMS
- [ ] 在Sanity Studio中可以看到文章
- [ ] 前端网站显示文章正常
- [ ] SEO meta标签正确
- [ ] 内部链接有效
- [ ] 在Google Search Console提交新URL
- [ ] 更新sitemap.xml（如果需要）
- [ ] 在社交媒体分享文章链接

---

**🎉 恭喜！你已成功部署Turmeric博客文章！**

现在开始监控流量和排名效果吧！ 🚀

