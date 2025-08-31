# 🚀 HerbScience 完整迁移设置指南

## 📋 当前配置状态

### ✅ 已确认的信息
- **Notion Token**: `YOUR_NOTION_TOKEN_HERE`
- **Sanity 项目ID**: `13rzzwgz`
- **Sanity 组织ID**: `ou4t3rSBT`
- **数据集**: `production`

### 📊 Notion数据库ID
- **Herbs**: `YOUR_HERBS_DB_ID_HERE`
- **FAQs**: `YOUR_FAQS_DB_ID_HERE`
- **Dosages**: `YOUR_DOSAGES_DB_ID_HERE`
- **Studies**: `YOUR_STUDIES_DB_ID_HERE`

## 🔧 立即执行步骤

### 第1步：更新环境变量
创建或更新 `.env.local` 文件：

```bash
# 复制以下内容到 .env.local
NOTION_TOKEN=YOUR_NOTION_TOKEN_HERE
NOTION_HERBS_DB_ID=YOUR_HERBS_DB_ID_HERE
NOTION_FAQS_DB_ID=YOUR_FAQS_DB_ID_HERE
NOTION_DOSAGES_DB_ID=YOUR_DOSAGES_DB_ID_HERE
NOTION_STUDIES_DB_ID=YOUR_STUDIES_DB_ID_HERE

NEXT_PUBLIC_SANITY_PROJECT_ID=13rzzwgz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=YOUR_SANITY_TOKEN_HERE

SANITY_ORGANIZATION_ID=ou4t3rSBT
NEXT_PUBLIC_APP_URL=https://www.herbscience.shop
```

### 第2步：获取Sanity API Token

1. **访问 Sanity管理页面**:
   ```
   https://www.sanity.io/manage/project/13rzzwgz
   ```

2. **创建API Token**:
   - 点击 `Settings` → `API` → `Tokens`
   - 点击 `Add API token`
   - 名称: `HerbScience Migration`
   - 权限: `Editor` 或 `Maintainer`
   - 复制生成的 token

3. **更新环境变量**:
   - 将token替换 `.env.local` 中的 `YOUR_SANITY_TOKEN_HERE`

### 第3步：设置Sanity项目

```bash
# 安装Sanity CLI (如果还没有)
npm install -g @sanity/cli

# 登录Sanity
sanity login

# 部署schemas到您的项目
sanity deploy

# 确认项目配置
sanity manage
```

### 第4步：执行完整迁移

```bash
# 安装依赖
npm install @notionhq/client @sanity/client

# 执行迁移脚本
node scripts/complete-migration.js
```

## 📊 预期迁移结果

### 🌿 草药数据
迁移脚本将自动处理：
- ✅ 所有已发布的草药基础信息
- ✅ 关联的FAQs、用量、研究数据
- ✅ SEO优化（关键词、标题、描述）
- ✅ 结构化数据准备

### 📝 SEO优化内容
每个草药将自动生成：
- **SEO标题**: "Clove (Syzygium aromaticum): Benefits, Dosage, Safety & Uses | HerbScience"
- **Meta描述**: 优化的150字描述
- **目标关键词**: 4-6个主要关键词
- **语义关键词**: 12-20个相关和长尾关键词
- **优化FAQ**: 3-4个SEO友好的问答

### 📚 博客内容规划
为每个草药生成8篇博客大纲：
1. `{Herb} Benefits: Science-Backed Health Effects`
2. `{Herb} Dosage Guide: How Much is Safe?`
3. `{Herb} Side Effects and Safety Warnings`
4. `{Herb} Tea: Recipe and Preparation Guide`
5. `{Herb} vs Other Herbs: Comparison Guide`
6. `{Herb} for {Condition}: Evidence Review`
7. `{Herb} Drug Interactions: What to Know`
8. `{Herb} During Pregnancy: Safety Guidelines`

## 🚀 迁移后的优势

### 💡 内容管理
- **继续在Notion编辑** - 工作流程不变
- **一键同步到Sanity** - 自动SEO优化
- **批量内容生成** - AI驱动的博客创建

### 🔍 SEO表现
- **完美的技术SEO** - 结构化数据、sitemap、性能
- **关键词优化** - 每页4-20个目标关键词
- **内容深度** - 平均1200+字的优质内容
- **内链网络** - 自动化内链建设

### 📈 预期效果
- **第1个月**: 所有页面被Google收录，关键词排名前50
- **第3个月**: 核心关键词前20，长尾词大量上榜
- **第6个月**: 核心词前5，成为草药信息权威站点

## 🛠️ 故障排除

### 常见问题

#### 1. Notion连接失败
```bash
# 检查token权限
curl -H "Authorization: Bearer YOUR_NOTION_TOKEN_HERE" \
     "https://api.notion.com/v1/users/me"
```

#### 2. Sanity连接失败
- 确认API token权限为 `Editor` 或以上
- 检查项目ID是否正确: `13rzzwgz`
- 确认dataset为 `production`

#### 3. Schema部署失败
```bash
# 重新部署schemas
sanity deploy --force
```

#### 4. 数据库访问权限
确保您的Notion集成已经被添加到所有相关数据库中

## 📞 支持信息

### 迁移完成后检查清单
- [ ] 所有草药数据已迁移到Sanity
- [ ] SEO元数据自动生成
- [ ] 关联数据(FAQs/Dosages/Studies)完整
- [ ] Sanity Studio可以访问和编辑
- [ ] 网站能正确显示优化后的内容

### 下一步行动
1. **验证迁移结果** - 检查Sanity Studio
2. **更新网站代码** - 切换到Sanity数据源
3. **生成sitemap** - 提交到Google Search Console
4. **开始博客创作** - 使用生成的大纲
5. **监控SEO效果** - 设置Google Analytics跟踪

### 技术支持
如遇问题，请提供：
- 错误日志截图
- `.env.local` 配置状态（隐藏敏感信息）
- 迁移脚本运行结果

---

**🎯 目标**: 将您的草药数据库从"难以SEO优化的Notion"转变为"专业的、搜索引擎友好的内容管理系统"，同时保持您熟悉的编辑体验。
