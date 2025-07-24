# 🌿 HerbScience Sanity CMS 设置指南

## 📋 概述

您的混合架构已经搭建完成！现在需要完成Sanity CMS的配置，让您获得WordPress级别的内容管理体验。

## 🚀 快速设置步骤

### 步骤 1: 创建Sanity项目

1. **访问 [Sanity.io](https://www.sanity.io/) 并注册账户**

2. **创建新项目**
   ```bash
   # 在项目根目录运行
   npx sanity@latest init --coupon=herbscience2025
   ```
   
   选择选项：
   - ✅ Create new project
   - ✅ Use the default dataset configuration? **Y**
   - ✅ Project name: **HerbScience CMS**
   - ✅ Use TypeScript? **Y**
   - ✅ Package manager: **npm**

3. **获取项目配置信息**
   设置完成后，您会看到：
   ```
   Project ID: abc123def456  ← 复制这个
   Dataset: production       ← 使用默认值
   ```

### 步骤 2: 配置环境变量

创建 `.env.local` 文件：
```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def456  ← 替换为您的项目ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your-sanity-api-token      ← 稍后获取
```

### 步骤 3: 生成API Token

1. 访问 [Sanity Management Console](https://www.sanity.io/manage)
2. 选择您的项目
3. 进入 **API** → **Tokens**
4. 点击 **Add API token**
   - Name: `HerbScience Website`
   - Permissions: `Editor`
   - 复制生成的token到 `.env.local`

### 步骤 4: 启动Sanity Studio

```bash
# 启动开发服务器
npm run dev

# 在另一个终端启动Sanity Studio
npm run sanity
```

访问：
- 🌐 **网站**: http://localhost:3000
- ⚙️ **CMS管理**: http://localhost:3000/admin

## 📝 内容管理工作流

### 创建第一篇博客文章

1. **访问管理界面**: http://localhost:3000/admin
2. **点击 "Blog Posts"**
3. **点击 "Create" 按钮**
4. **填写文章信息**：
   - Title: `姜黄的神奇功效：不仅仅是调料那么简单`
   - Slug: 自动生成 `turmeric-benefits-guide`
   - Excerpt: 150字左右的摘要
   - Content: 使用富文本编辑器编写内容
   - Author: 选择或创建作者
   - Category: 选择分类
   - Tags: 添加相关标签
   - SEO信息: 填写SEO标题和描述

5. **发布文章**: 将Status改为 "Published"

### 创建作者和分类

**创建作者**:
1. 点击 "Authors" → "Create"
2. 填写姓名、头衔、简介等信息

**创建分类**:
1. 点击 "Categories" → "Create"
2. 填写分类名称、描述、选择颜色

## 🔧 高级功能

### 实时预览
- 在Sanity Studio中编辑时，可以实时预览网站效果
- 支持草稿模式，发布前可以预览

### 图片管理
- 拖拽上传图片
- 自动优化和CDN分发
- 支持热点裁剪

### SEO优化
- 每篇文章独立的SEO设置
- 自动生成Open Graph标签
- 结构化数据支持

## 🌍 部署到生产环境

### Vercel部署

1. **更新环境变量**
   在Vercel Dashboard中添加所有环境变量

2. **配置Sanity CORS**
   ```bash
   # 允许您的域名访问Sanity
   npx sanity cors add https://www.herbscience.shop --credentials
   ```

3. **部署Sanity Studio**
   ```bash
   # 部署到 yourdomain.sanity.studio
   npm run sanity:deploy
   ```

## 📊 内容策略建议

### 推荐的文章分类
1. **🔬 科学研究** - 最新研究发现
2. **⚠️ 安全指南** - 用药安全和相互作用
3. **🌱 传统医学** - 中医药文化
4. **💪 生活方式** - 日常养生
5. **🌿 草药百科** - 具体草药介绍

### SEO优化文章建议
- `姜黄的功效与作用：科学证据全解析`
- `怀孕期间能吃人参吗？完整安全指南`
- `失眠最有效的5种草药：自然助眠方案`
- `草药 vs 西药：效果对比和选择指南`

## 🆘 常见问题

**Q: 忘记Sanity项目ID怎么办？**
A: 访问 [Sanity Management](https://www.sanity.io/manage) 查看所有项目

**Q: API Token权限不够怎么办？**  
A: 重新生成Token时选择 "Editor" 或 "Admin" 权限

**Q: 文章不显示在网站上？**
A: 检查文章Status是否为 "Published"

**Q: 图片显示不出来？**
A: 检查项目ID和数据集配置是否正确

## 🎯 下一步

✅ **已完成的功能**:
- Sanity CMS完整配置
- 博客数据结构设计
- 富文本编辑器
- SEO优化功能
- 图片管理系统

🔄 **即将实现**:
- 多语言内容管理
- 内容定时发布
- 评论系统集成
- 高级分析功能

---

*设置完成后，您就拥有了一个既有Next.js技术优势，又有WordPress级别内容管理便利性的混合架构网站！* 