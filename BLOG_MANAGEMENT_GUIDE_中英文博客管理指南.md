# 📚 HerbScience 中英文博客管理指南

> **最后更新：** 2025年10月30日  
> **版本：** 2.0  
> **状态：** ✅ 已完成系统分离

---

## 🎯 核心原则

### ✅ **DO（正确做法）**

1. **中英文完全分离**
   - 英文文章和中文文章在Sanity中通过 `language` 字段区分
   - 英文文章：`language: "en"` 或不设置
   - 中文文章：`language: "zh"`

2. **URL 结构清晰**
   - 英文博客：`/blog/{slug}`
   - 中文博客：`/zh/blog/{slug}`
   - **重要：** slug不需要添加语言后缀（如 `-zh`）

3. **内容独立管理**
   - 每篇文章都是独立的文档
   - 中英文文章可以使用相同的slug（系统通过路径和language字段区分）

### ❌ **DON'T（错误做法）**

1. ❌ **不要在slug中添加语言后缀**
   - 错误：`red-onion-vs-white-onion-health-benefits-zh`
   - 正确：`red-onion-vs-white-onion-health-benefits` + `language: "zh"`

2. ❌ **不要混合语言内容**
   - 英文文章中不要包含中文内容
   - 中文文章中不要包含英文内容（除了必要的术语）

3. ❌ **不要在错误的路径下创建文章**
   - 中文文章必须通过 `/zh/blog/` 访问
   - 英文文章必须通过 `/blog/` 访问

---

## 📋 Sanity CMS 字段规范

### 必填字段

```javascript
{
  _type: "blogPost",
  title: "文章标题",              // 必填，中文或英文
  slug: {
    current: "article-slug"       // 必填，使用英文slug（中英文可相同）
  },
  language: "zh" | "en",          // 必填！用于区分语言
  excerpt: "文章摘要",             // 必填
  content: [...],                  // 必填，PortableText格式
  status: "published" | "draft",  // 必填
  publishedAt: "2025-01-27",      // 必填
  author: reference,               // 必填，引用author文档
  category: reference,             // 必填，引用category文档
  tags: [references],              // 可选
  readTime: 8,                     // 必填，阅读时长（分钟）
  featured: true | false,          // 可选，是否推荐
  seoTitle: "SEO标题",            // 推荐
  seoDescription: "SEO描述",      // 推荐
  seoKeywords: ["关键词1", ...]   // 推荐
}
```

### 关键字段说明

#### `language` 字段（最重要！）

```javascript
// 英文文章
language: "en"  // 或者不设置（默认为英文）

// 中文文章
language: "zh"  // 必须明确设置
```

#### `slug` 字段

```javascript
// ✅ 正确示例
slug: {
  current: "red-onion-vs-white-onion-health-benefits"  // 简洁，无语言后缀
}

// ❌ 错误示例
slug: {
  current: "red-onion-vs-white-onion-health-benefits-zh"  // 不要添加-zh
}
```

---

## 🔄 工作流程

### 创建新的英文博客文章

1. **在Sanity Studio中创建新文档**
   ```
   类型: blogPost
   ```

2. **填写基本信息**
   ```javascript
   title: "Your English Title"
   slug: "your-english-slug"
   language: "en"  // 或留空
   excerpt: "English excerpt..."
   status: "published"
   ```

3. **填写内容**
   - 使用PortableText编辑器
   - 可添加图片、标题、列表等

4. **SEO优化**
   - 填写 seoTitle
   - 填写 seoDescription
   - 添加 tags

5. **发布**
   - 点击 Publish
   - 文章将出现在 `/blog/` 页面

### 创建新的中文博客文章

1. **在Sanity Studio中创建新文档**
   ```
   类型: blogPost
   ```

2. **填写基本信息**
   ```javascript
   title: "您的中文标题"
   slug: "your-english-slug"  // 使用英文slug，可与英文版相同
   language: "zh"  // 必须明确设置！
   excerpt: "中文摘要..."
   status: "published"
   ```

3. **填写内容**
   - 使用PortableText编辑器
   - 全部使用中文内容

4. **SEO优化**
   - 填写中文 seoTitle
   - 填写中文 seoDescription
   - 添加中文 tags

5. **发布**
   - 点击 Publish
   - 文章将出现在 `/zh/blog/` 页面

### 翻译现有文章

如果您想将英文文章翻译成中文：

1. **创建新的文档**（不要修改原英文文档）
2. **复制内容并翻译**
3. **设置关键字段**：
   ```javascript
   title: "翻译后的中文标题"
   slug: "same-slug-as-english"  // 可以使用相同的slug
   language: "zh"  // 必须设置为zh
   ```
4. **发布**

**重要：** 中英文文章是两个独立的文档！

---

## 🛠️ 代码架构说明

### 查询函数分离

**英文博客查询** (`lib/sanity.ts`)

```typescript
// 自动过滤：只返回英文文章（language == "en" 或未设置）
getAllBlogPosts()         // 所有英文文章
getFeaturedBlogPosts()    // 推荐英文文章
getBlogPostBySlug(slug)   // 根据slug获取英文文章
getBlogPostsByCategory()  // 根据分类获取英文文章
```

**中文博客查询** (`lib/sanity.ts`)

```typescript
// 自动过滤：只返回中文文章（language == "zh"）
getAllBlogPostsZh()         // 所有中文文章
getFeaturedBlogPostsZh()    // 推荐中文文章
getBlogPostBySlugZh(slug)   // 根据slug获取中文文章
```

### URL路由

| 语言 | 列表页 | 详情页 | 查询函数 |
|------|--------|--------|----------|
| 英文 | `/blog` | `/blog/{slug}` | `getAllBlogPosts()` |
| 中文 | `/zh/blog` | `/zh/blog/{slug}` | `getAllBlogPostsZh()` |

---

## 🐛 常见问题与解决方案

### Q1: 英文博客页面出现中文文章

**原因：** 文章的 `language` 字段未设置或设置错误

**解决方案：**
1. 打开Sanity Studio
2. 找到该文章
3. 检查 `language` 字段
4. 英文文章设置为 `"en"`，中文文章设置为 `"zh"`

### Q2: 中文博客页面找不到文章（404）

**原因：** 文章的 `language` 字段未设置为 `"zh"`

**解决方案：**
1. 打开Sanity Studio
2. 找到该文章
3. 将 `language` 字段设置为 `"zh"`
4. 重新发布

### Q3: URL出现 `-zh` 后缀

**原因：** Slug字段包含了语言后缀

**解决方案：**
1. 打开Sanity Studio
2. 编辑文章的 slug
3. 移除 `-zh` 后缀
4. 确保 `language` 字段设置正确

### Q4: 如何批量检查文章状态

运行检查脚本：

```bash
node scripts/fix-sanity-blog-posts.js
```

输出会显示：
- 所有文章列表
- 带-zh后缀的文章（需要修复）
- 英文和中文文章统计

### Q5: 如何删除错误的文章

**使用脚本删除带-zh后缀的文章：**

```bash
node scripts/fix-sanity-blog-posts.js --delete
```

**手动删除：**
1. 打开Sanity Studio
2. 找到文章
3. 点击"..."菜单
4. 选择"Delete"

---

## 📊 最佳实践

### 1. 使用一致的slug命名

```
good-example:
- red-onion-vs-white-onion-health-benefits
- ginger-tea-menstrual-cramps-natural-relief
- ashwagandha-for-women-hormone-balance

bad-example:
- Red_Onion_VS_White_Onion  // 避免大写和下划线
- red-onion-白洋葱           // 避免混合语言
- article-123                // 使用描述性slug
```

### 2. SEO优化清单

- ✅ title长度: 50-60字符
- ✅ seoDescription长度: 150-160字符
- ✅ 添加3-5个相关tags
- ✅ 使用目标关键词
- ✅ 添加featured_image（推荐）
- ✅ 设置readTime

### 3. 内容质量标准

- ✅ 段落清晰，使用小标题
- ✅ 添加列表、引用增强可读性
- ✅ 包含实用信息和行动建议
- ✅ 引用权威来源
- ✅ 避免过度SEO优化

### 4. 发布前检查

```
□ 标题是否清晰
□ slug是否合理
□ language字段是否正确
□ 内容是否完整
□ 是否有拼写错误
□ SEO信息是否完善
□ 是否添加了tags
□ 作者和分类是否正确
```

---

## 🚀 快速参考

### 创建文章速查表

```javascript
// 英文文章模板
{
  title: "English Title",
  slug: { current: "english-slug" },
  language: "en",
  excerpt: "English summary...",
  author: reference_to_author,
  category: reference_to_category,
  status: "published",
  publishedAt: "2025-01-27",
  readTime: 8
}

// 中文文章模板
{
  title: "中文标题",
  slug: { current: "english-slug" },  // 可与英文相同
  language: "zh",  // 必须设置！
  excerpt: "中文摘要...",
  author: reference_to_author,
  category: reference_to_category,
  status: "published",
  publishedAt: "2025-01-27",
  readTime: 8
}
```

### 常用命令

```bash
# 检查文章状态
node scripts/fix-sanity-blog-posts.js

# 删除错误的-zh后缀文章
node scripts/fix-sanity-blog-posts.js --delete

# 启动Sanity Studio
cd sanity && npm run dev

# 本地测试
npm run dev
```

---

## 📞 需要帮助？

如果遇到问题：

1. 检查本文档的"常见问题"部分
2. 运行 `node scripts/fix-sanity-blog-posts.js` 检查数据
3. 查看Sanity Studio中的文章字段
4. 确认 `language` 字段设置正确

---

## ✅ 检查清单

每次创建或修改文章时，使用此清单：

- [ ] Slug使用英文，不包含语言后缀
- [ ] Language字段正确设置（en或zh）
- [ ] Title、excerpt、content完整
- [ ] SEO信息已填写
- [ ] 作者和分类已关联
- [ ] Status设置为published
- [ ] PublishedAt日期正确
- [ ] ReadTime已估算
- [ ] Tags已添加（3-5个）
- [ ] 内容已校对
- [ ] 在对应语言的博客列表页可见

---

**🎉 恭喜！现在您已经掌握了HerbScience博客管理系统！**

保持中英文内容独立、清晰、高质量，您的网站将获得更好的用户体验和SEO效果。

