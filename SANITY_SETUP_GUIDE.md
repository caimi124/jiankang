# 🌿 HerbScience CMS 设置指南

## 🎯 概述

您的网站现在已经集成了 **Sanity CMS**，这是一个现代化的无头内容管理系统。您可以通过可视化界面轻松管理博客内容，无需编写代码！

---

## 🚀 快速开始

### 步骤 1: 创建 Sanity 项目

```bash
# 1. 登录 Sanity (如果没有账号会引导注册)
npx sanity login

# 2. 创建新项目
npx sanity init

# 按照提示操作:
# - 选择 "Create new project" 
# - 项目名称: "HerbScience CMS"
# - 使用默认的 dataset: "production"
# - 选择模板: "Clean project with no predefined schemas"
```

### 步骤 2: 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入您的 Sanity 项目信息：

```env
# Sanity 配置
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_AUTH_TOKEN=your-auth-token-here
```

**获取项目信息:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: 在 sanity init 过程中会显示
- `SANITY_AUTH_TOKEN`: 前往 [sanity.io/manage](https://sanity.io/manage) → 选择项目 → API → Tokens → Add API token

### 步骤 3: 启动 Sanity Studio

```bash
# 启动 CMS 管理界面
npx sanity dev

# Studio 将在 http://localhost:3333 运行
```

---

## 📝 内容管理功能

### 🌟 核心功能

1. **📝 博客文章管理**
   - 可视化富文本编辑器
   - 图片上传和管理
   - SEO 设置 (标题、描述、关键词)
   - 分类和标签管理
   - 草药关联系统

2. **🎨 内容类型**
   - **文章分类**: 组织内容结构
   - **标签**: 细化内容标记
   - **作者管理**: 多作者协作
   - **草药引用**: 自动链接到草药页面

3. **🔧 高级功能**
   - 实时预览
   - 版本历史
   - 协作编辑
   - 内容调度发布

---

## 🎨 内容创建工作流

### 创建第一篇文章

1. **登录 Studio**: 访问 `http://localhost:3333`

2. **创建分类**:
   ```
   名称: "健康指南"
   描述: "专业的草药健康建议"
   颜色: 绿色
   ```

3. **创建作者**:
   ```
   姓名: "Dr. [您的姓名]"
   专业资质: ["中医师", "营养学博士"]
   专业领域: ["草药学", "营养学"]
   ```

4. **创建标签**:
   ```
   - "抗炎"
   - "免疫增强" 
   - "消化健康"
   - "心血管"
   ```

5. **创建文章**:
   ```
   标题: "姜黄的十大健康益处：科学验证的天然抗炎剂"
   摘要: "探索姜黄的强大抗炎特性及其在现代健康管理中的应用"
   分类: 选择"健康指南"
   标签: 选择"抗炎"、"免疫增强"
   相关草药: 选择"Turmeric"
   ```

---

## 🌐 部署 CMS 到生产环境

### 选项 1: Vercel 集成部署

```bash
# 1. 在 Vercel 项目中添加环境变量
# 前往 Vercel Dashboard → 项目设置 → Environment Variables

NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_AUTH_TOKEN=your-token

# 2. 重新部署
git push origin main
```

### 选项 2: Studio 独立部署

```bash
# 1. 构建 Studio
npx sanity build

# 2. 部署到 Sanity 的托管服务
npx sanity deploy
```

---

## 🔗 访问地址

- **开发环境 CMS**: `http://localhost:3333`
- **生产环境 CMS**: `https://your-project-name.sanity.studio`
- **网站博客页面**: `https://www.herbscience.shop/blog`

---

## 💡 内容策略建议

### 🎯 推荐文章类型

1. **草药功效指南**
   ```
   标题模式: "[草药名] 的 [数字] 大健康益处"
   示例: "人参的 7 大能量提升益处"
   ```

2. **健康问题解决方案**
   ```
   标题模式: "自然缓解 [症状] 的最佳草药"
   示例: "自然缓解焦虑的最佳草药"
   ```

3. **安全指南**
   ```
   标题模式: "[草药] 的安全使用指南"
   示例: "银杏叶的安全使用指南"
   ```

4. **科学研究**
   ```
   标题模式: "最新研究：[草药] 在 [领域] 的突破"
   示例: "最新研究：灵芝在免疫调节的突破"
   ```

### 📊 SEO 最佳实践

1. **标题优化**:
   - 包含目标关键词
   - 50-60 字符长度
   - 数字和情感词汇

2. **内容结构**:
   - 使用 H2、H3 标题组织内容
   - 添加相关草药链接
   - 包含图片和说明

3. **内部链接**:
   - 链接到相关草药页面
   - 添加相关文章推荐
   - 使用草药专用链接功能

---

## 🔧 常见问题

### Q: 如何添加图片？
A: 在编辑器中点击图片图标，上传图片并填写 ALT 文字。

### Q: 如何链接到草药页面？
A: 选择文字 → 点击链接 → 选择"草药链接" → 选择对应草药。

### Q: 如何设置 SEO？
A: 在文章底部的"SEO设置"区域填写自定义标题和描述。

### Q: 如何预览文章？
A: Studio 右上角有预览按钮，可以实时查看文章效果。

---

## 🎉 完成设置

设置完成后，您将拥有：

✅ **专业的内容管理系统**  
✅ **SEO 优化的博客页面**  
✅ **与草药数据库的深度集成**  
✅ **多人协作编辑功能**  
✅ **移动端友好的管理界面**  

现在您可以专注于创作优质内容，而不用担心技术细节！

---

*需要帮助？联系开发团队或查看 [Sanity 官方文档](https://www.sanity.io/docs)* 