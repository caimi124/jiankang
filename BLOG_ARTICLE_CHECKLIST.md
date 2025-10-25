# 📝 博客文章发布完整清单

## 🚨 **重要提醒**

您的网站有 **3个地方** 需要手动添加博客文章元数据。**缺一不可！**

---

## ✅ **每次新增博客文章必须完成的步骤**

### **步骤1：创建文章页面** ✍️

创建文件：
```
app/blog/[slug]/page.tsx
```

包含：
- Metadata（title, description, keywords, OpenGraph等）
- 完整的文章内容
- 结构化数据（JSON-LD）
- E-A-T信号（医学审核、参考文献）

---

### **步骤2：更新 `app/blog/page.tsx`** ⭐⭐⭐⭐⭐

**这是最重要的！** 这个文件的 `staticLocalArticles` 数组是主要数据源。

```typescript
// 在 app/blog/page.tsx 的 staticLocalArticles 数组顶部添加：
const staticLocalArticles = [
  {
    id: [时间戳，例如：1758713619590],
    _id: '[相同的时间戳]',
    title: "文章完整标题",
    excerpt: "文章摘要（150-200字）",
    category: "science" 或 "lifestyle",
    author: "作者名",
    publishedAt: "YYYY-MM-DD",
    readTime: [阅读时长（分钟）],
    featured: true,  // 是否显示在Featured Posts
    featured_image: null,
    slug: { current: "[slug]" },
    tags: ["关键词1", "关键词2", "关键词3", ...]
  },
  // ... 其他文章
]
```

**示例（Ashwagandha文章）：**
```typescript
{
  id: 1758713619590,
  _id: '1758713619590',
  title: "Ashwagandha Benefits for Female: Hormonal Imbalance, Stress & What It's Good For",
  excerpt: "Discover ashwagandha benefits for female health: balance hormones, reduce stress, improve sleep. Learn safe dosage, side effects, and what ashwagandha is good for. Evidence-based guide by licensed pharmacist.",
  category: "science",
  author: "曾楚平 (Zeng Chuping)",
  publishedAt: "2025-01-26",
  readTime: 8,
  featured: true,
  featured_image: null,
  slug: { current: "ashwagandha-for-women-hormone-balance" },
  tags: ["ashwagandha benefits for female", "ashwagandha for hormonal imbalance", "side effects of ashwagandha on females", "what is ashwagandha good for", "best herbs for stress and anxiety", "ashwagandha for women", "adaptogen herb", "hormonal balance", "women's health"]
}
```

---

### **步骤3：更新 `app/blog/BlogClient.tsx`** ⭐⭐⭐

这是第二重要的fallback数据源。

```typescript
// 在 app/blog/BlogClient.tsx 的 staticArticles 数组顶部添加：
const staticArticles = [
  {
    id: [时间戳],
    title: "文章标题",
    excerpt: "摘要",
    category: "science 或 lifestyle",
    author: "作者名",
    publishedAt: "YYYY-MM-DD",
    readTime: [阅读时长],
    featured_image: null,
    slug: { current: "[slug]" },
    tags: [关键词数组]
  },
  // ... 其他文章
]
```

---

### **步骤4：更新 `lib/sanity.ts`** ⭐⭐

这是Featured Posts的fallback数据源（如果文章需要推荐）。

```typescript
// 在 lib/sanity.ts 的 staticBlogData.featuredPosts 数组顶部添加：
export const staticBlogData = {
  featuredPosts: [
    {
      _id: '[递增ID，例如：4, 5, 6]',
      title: "文章标题",
      slug: { current: "[slug]" },
      excerpt: "摘要",
      publishedAt: "YYYY-MM-DD",
      readTime: [阅读时长],
      author: "作者名",
      category: "science 或 lifestyle",
      tags: [关键词数组],
      featured_image: null,
      seoTitle: "SEO标题",
      seoDescription: "SEO描述"
    },
    // ... 其他文章
  ]
}
```

---

### **步骤5：提交并推送** 🚀

```bash
git add .
git commit -m "feat: Add [文章名称] blog article with complete metadata"
git push origin main
```

---

### **步骤6：验证部署** 🧪

等待5-10分钟后：

1. **访问博客列表页：** https://herbscience.shop/blog
   - ✅ Featured Articles 区域显示新文章
   - ✅ Recent Articles 区域显示新文章
   - ✅ 文章卡片信息完整（标题、作者、日期、标签）

2. **点击文章卡片：** 确认跳转到正确的文章页面

3. **测试搜索功能：** 输入文章关键词，确认能搜索到

4. **测试分类筛选：** 点击对应分类，确认文章显示

---

## 🔧 **系统架构说明**

### **数据流向：**

```
app/blog/page.tsx (Server Component)
  ├─ 从 Sanity CMS 获取数据
  ├─ 从 staticLocalArticles 获取本地文章
  ├─ 合并两者（本地文章排在前面）
  └─ 传递给 BlogClient (Client Component)
       ├─ 如果有 initialPosts，使用它
       └─ 否则使用 staticArticles（fallback）
```

### **为什么需要3个地方都更新？**

1. **`app/blog/page.tsx` → staticLocalArticles**
   - 主要数据源
   - Server Component，在服务器端渲染
   - 与Sanity数据合并后传给BlogClient

2. **`app/blog/BlogClient.tsx` → staticArticles**
   - Fallback数据源
   - 当Sanity连接失败或page.tsx没有传递数据时使用
   - 确保页面至少有一些内容显示

3. **`lib/sanity.ts` → staticBlogData.featuredPosts**
   - Featured Posts的fallback数据源
   - 同样是为了在Sanity不可用时提供备份数据

---

## 🚨 **常见错误**

### ❌ **错误1：只创建了文章页面，没有更新元数据数组**
**结果：** 文章页面可以直接访问，但不会出现在博客列表中

### ❌ **错误2：只更新了BlogClient.tsx和sanity.ts，没有更新page.tsx**
**结果：** 文章仍然不显示在博客列表中（因为page.tsx的数据会覆盖）

### ❌ **错误3：slug不一致**
**结果：** 文章卡片点击后404错误

### ❌ **错误4：时间戳ID重复**
**结果：** React key冲突，可能导致渲染问题

---

## 💡 **快速检查清单**

发布文章前，确认以下每一项：

- [ ] ✅ 创建了 `app/blog/[slug]/page.tsx`
- [ ] ✅ 更新了 `app/blog/page.tsx` 的 `staticLocalArticles`
- [ ] ✅ 更新了 `app/blog/BlogClient.tsx` 的 `staticArticles`
- [ ] ✅ 更新了 `lib/sanity.ts` 的 `featuredPosts`（如果要推荐）
- [ ] ✅ 所有3处的 `slug` 完全一致
- [ ] ✅ 使用了唯一的时间戳ID
- [ ] ✅ Git commit并push
- [ ] ✅ 验证Vercel部署成功
- [ ] ✅ 访问博客页面确认显示
- [ ] ✅ Google Search Console请求索引

---

## 🔮 **未来优化方向**

### **方案A：自动扫描文件系统（推荐）**

```typescript
// app/blog/page.tsx
import fs from 'fs'
import path from 'path'

export default async function BlogPage() {
  // 自动扫描 app/blog/ 目录
  const blogDir = path.join(process.cwd(), 'app/blog')
  const slugs = fs.readdirSync(blogDir)
    .filter(item => !item.endsWith('.tsx') && !item.endsWith('.ts'))
  
  // 动态导入每个文章的metadata
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await import(`./app/blog/${slug}/page`)
      return {
        slug,
        ...metadata
      }
    })
  )
  
  return <BlogClient initialPosts={articles} />
}
```

### **方案B：使用MDX + Contentlayer**

自动管理Markdown文件作为内容源，无需手动维护数组。

### **方案C：完全迁移到Sanity CMS**

所有文章都存储在Sanity，不使用本地静态文件。

---

## 📊 **当前博客文章列表**

| 文章名称 | Slug | 发布日期 | 分类 | 状态 |
|---------|------|---------|------|------|
| Ashwagandha Benefits for Female | ashwagandha-for-women-hormone-balance | 2025-01-26 | science | ✅ 已发布 |
| Why Rhodiola Works for Body Type | why-rhodiola-works-body-type | 2025-01-23 | science | ✅ 已发布 |
| Rhodiola Tea Recipes | rhodiola-tea-recipes-energy-focus | 2025-01-22 | lifestyle | ✅ 已发布 |
| How to Take Rhodiola Smart Way | rhodiola-smart-way-daily-rituals | 2025-01-22 | lifestyle | ✅ 已发布 |
| Personalized Herbal Supplements | why-some-herbs-work-for-you-and-others-dont | 2024-01-15 | science | ✅ 已发布 |
| Best Herbs for Anxiety | herbs-for-anxiety-natural-alternatives | 2024-01-10 | science | ✅ 已发布 |
| Turmeric Pregnancy Safety | turmeric-pregnancy-safety-guide | 2024-01-08 | science | ✅ 已发布 |
| Best Herbs for Sleep | herbs-for-sleep-insomnia | 2024-01-06 | lifestyle | ✅ 已发布 |

---

## 📞 **需要帮助？**

如果遇到问题，检查：
1. Vercel部署日志是否有错误
2. 浏览器控制台是否有JavaScript错误
3. 3个数组中的数据是否完全一致（特别是slug）
4. 文章文件路径是否正确

---

**最后更新：** 2025-01-26  
**文档版本：** 1.0  
**维护者：** AI Assistant + 曾楚平

