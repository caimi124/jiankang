# 🔧 Notion环境配置指南

## 紧急修复 - Clove和Pumpkin Seed 404问题

### 问题原因
当前网站无法访问新建的Notion数据库，因为缺少环境变量配置。

### 立即解决方案

#### 1. 创建 `.env.local` 文件（项目根目录）

```bash
# 在项目根目录创建 .env.local 文件
touch .env.local
```

#### 2. 添加以下内容到 `.env.local`

```env
# Notion API Configuration for HerbScience
NOTION_TOKEN=你的Notion API Token

# 新的四个数据库ID（已从您的URL中提取）
NOTION_HERBS_DB_ID=24e6f14b923c80249bcdcfa5b5cc3907
NOTION_FAQS_DB_ID=24e6f14b923c8047a4a8ccb06faa0da9
NOTION_DOSAGES_DB_ID=24e6f14b923c803da9d8f17e1d3e472b
NOTION_STUDIES_DB_ID=24e6f14b923c80d28180f41c1d52ec98

# Next.js应用配置
NEXT_PUBLIC_APP_URL=https://www.herbscience.shop
```

#### 3. 获取Notion API Token

1. 访问 https://www.notion.so/my-integrations
2. 点击 "New integration"
3. 命名为 "HerbScience API"
4. 复制生成的 Token
5. 将Token粘贴到 `.env.local` 文件中

#### 4. 配置数据库权限

确保您的Notion集成有权限访问这四个数据库：
- Herbs: https://www.notion.so/24e6f14b923c80249bcdcfa5b5cc3907
- FAQs: https://www.notion.so/24e6f14b923c8047a4a8ccb06faa0da9
- Dosages: https://www.notion.so/24e6f14b923c803da9d8f17e1d3e472b
- Studies: https://www.notion.so/24e6f14b923c80d28180f41c1d52ec98

在每个数据库页面右上角点击 "..." → "Connections" → 添加您的集成

### 验证配置

配置完成后，重启开发服务器：
```bash
npm run dev
```

然后访问：
- http://localhost:3000/herbs/clove
- http://localhost:3000/herbs/pumpkin-seed

## 数据库迁移状态

### ✅ 已在新Notion中找到
- Clove (丁香) - 完整数据，包含案例分析
- Pumpkin Seed (南瓜子) - 完整数据，包含化学成分

### 🔄 需要迁移的数据
目前 `lib/herbs-data-complete.ts` 中有58种草药，但新Notion数据库中只有少数几种。建议：

1. 保留当前的备用数据系统（回退机制已存在）
2. 逐步将重要草药迁移到新Notion数据库
3. 优先迁移热门草药：Ginseng, Turmeric, Ginger等

## 技术架构优势

新的四数据库架构相比单一数据库有显著优势：

1. **关联性更强**：FAQs、Dosages、Studies分别关联到主Herbs表
2. **扩展性更好**：每个领域可以独立添加字段
3. **维护性更强**：数据结构清晰，便于内容管理
4. **SEO友好**：结构化数据支持更好的搜索引擎优化

## 建议的数据迁移优先级

1. **高优先级**（立即迁移）：
   - Ginseng（人参）
   - Turmeric（姜黄）  
   - Ginger（生姜）
   - Garlic（大蒜）

2. **中优先级**（本周内）：
   - Echinacea（紫锥菊）
   - Ginkgo（银杏）
   - Green Tea（绿茶）
   - Ashwagandha（印度人参）

3. **低优先级**（逐步迁移）：
   - 其余50种草药

这样可以确保网站功能正常的同时，逐步完善数据库。
