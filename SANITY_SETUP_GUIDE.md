# Sanity CMS 配置指南

## 📋 项目信息

- **Project ID:** `13rzzwgz`
- **Organization ID:** `ou4t3rSBT`
- **Dataset:** `production`
- **Dashboard:** https://www.sanity.io/organizations/ou4t3rSBT/project/13rzzwgz

---

## ⚙️ 环境变量配置

### 步骤1：创建 `.env.local` 文件

在项目根目录创建 `.env.local` 文件：

```bash
# Sanity CMS 配置
NEXT_PUBLIC_SANITY_PROJECT_ID=13rzzwgz
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Token (需要从Sanity Dashboard获取)
SANITY_API_TOKEN=your-token-here

# Next.js 配置
NEXT_PUBLIC_SITE_URL=https://herbscience.shop
```

---

### 步骤2：获取 Sanity API Token

1. 访问：https://www.sanity.io/manage/personal/tokens
2. 点击 "Add API token"
3. 配置：
   - **Label:** HerbScience Blog Deployment
   - **Permissions:** Editor (需要写入权限)
4. 复制生成的token
5. 替换 `.env.local` 中的 `your-token-here`

**重要：** Token只显示一次，请妥善保存！

---

## 🚀 部署博客内容

### 方法1：使用自动脚本（推荐）

```bash
# 1. 部署第一篇博客（Turmeric剂量指南）
node add-turmeric-blog-to-sanity.js

# 2. 部署第二篇博客（Turmeric副作用）
node add-turmeric-side-effects-blog-to-sanity.js
```

脚本会自动：
- ✅ 创建或检查Author (HerbScience Team)
- ✅ 创建Category (Herbal Guides, Herb Safety)
- ✅ 创建Tags
- ✅ 创建完整博客文章
- ✅ 设置SEO字段

---

### 方法2：手动在Sanity Studio

#### 启动Sanity Studio

```bash
cd sanity
npm run dev
```

然后访问：http://localhost:3333

#### 手动创建内容

1. 点击 "Blog Posts"
2. 点击 "Create" 按钮
3. 填写内容（参考文档）：
   - `TURMERIC_DOSAGE_BLOG_OPTIMIZED.md`
   - `TURMERIC_SIDE_EFFECTS_BLOG_OPTIMIZED.md`

---

## 🌿 部署草药数据库

### Ashwagandha已在代码中

Ashwagandha的数据已经在 `app/api/herbs/[slug]/route.ts` 中，通过API路由提供。

如果要同步到Sanity CMS：

1. 在Sanity Studio中点击 "Herbs Database"
2. 创建新Herb条目
3. 填写Ashwagandha数据

或者创建自动同步脚本（类似博客部署脚本）。

---

## 🔍 验证部署

### 检查Sanity Studio

1. 访问：http://localhost:3333（本地）
2. 或访问：https://herbscience.sanity.studio（生产环境）
3. 确认文章出现在 "Blog Posts" 列表

### 检查前端网站

1. 确保Next.js项目读取Sanity数据
2. 访问：
   - http://localhost:3000/blog/how-much-turmeric-per-day
   - http://localhost:3000/blog/10-serious-side-effects-of-turmeric

---

## 📊 Sanity Studio 访问

### 本地开发

```bash
cd sanity
npm install
npm run dev
```

访问：http://localhost:3333

### 生产环境

部署Sanity Studio到Vercel或Netlify：

```bash
cd sanity
npm run build
```

---

## ❓ 常见问题

### Q1: "Authentication failed" 错误

**A:** 检查 `.env.local` 中的 `SANITY_API_TOKEN` 是否正确，并确保token有 Editor 权限。

---

### Q2: 脚本找不到项目

**A:** 确认 `.env.local` 文件在项目根目录，且包含正确的项目ID。

---

### Q3: 文章显示但没有内容

**A:** 检查Sanity schema和前端组件是否匹配，确保Block Content正确渲染。

---

## 🔐 安全提示

1. ❌ 不要提交 `.env.local` 到Git
2. ❌ 不要在公开代码中暴露API Token
3. ✅ 使用不同的token用于开发和生产环境
4. ✅ 定期轮换API Token

---

## 📚 相关文档

- Sanity官方文档：https://www.sanity.io/docs
- Next.js + Sanity集成：https://www.sanity.io/guides/nextjs
- Sanity CLI文档：https://www.sanity.io/docs/cli

---

## 🎯 快速开始清单

- [ ] 创建 `.env.local` 文件
- [ ] 获取Sanity API Token
- [ ] 配置项目ID和Dataset
- [ ] 安装依赖：`npm install @sanity/client`
- [ ] 运行部署脚本
- [ ] 验证Sanity Studio
- [ ] 验证前端网站
- [ ] 提交到Google Search Console

---

**配置完成后，就可以运行部署脚本了！** 🚀
