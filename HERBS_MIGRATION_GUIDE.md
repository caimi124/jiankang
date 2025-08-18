# 🌿 草药数据库迁移到Sanity CMS指南

## 📋 迁移概述

您的草药数据库迁移已经准备就绪！现在可以将现有的草药数据从Notion迁移到新的Sanity CMS系统，实现WordPress级别的内容管理体验。

## 🚀 快速开始

### 步骤 1: 确保Sanity配置完成

请先按照 `SANITY_SETUP_GUIDE.md` 完成Sanity项目设置：

1. ✅ 创建Sanity项目并获得项目ID
2. ✅ 生成API Token (需要Editor权限)
3. ✅ 配置环境变量 `.env.local`

### 步骤 2: 验证环境变量

确保以下环境变量已正确设置：

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your-sanity-api-token
```

### 步骤 3: 执行草药数据迁移

```bash
# 启动开发服务器 (第一个终端)
npm run dev

# 启动Sanity Studio (第二个终端)
npm run sanity

# 执行草药迁移 (第三个终端)
npm run migrate-herbs
```

## 📊 迁移包含的数据

### 🌿 草药数据结构

每种草药包含以下信息：

| 字段 | 描述 | 示例 |
|------|------|------|
| **基础信息** | | |
| English Name | 英文名称 | Turmeric |
| Chinese Name | 中文名称 | 姜黄 |
| Latin Name | 拉丁学名 | Curcuma longa |
| Category | 药物分类 | 活血化瘀药 |
| Constitution Type | 体质匹配 | 血瘀体质 |
| **功效信息** | | |
| Primary Effects | 主要功效 | 抗炎、抗氧化、保护肝脏 |
| Secondary Effects | 次要功效 | 促进消化、改善关节健康 |
| Efficacy | 传统功效 | 消炎镇痛、活血化瘀 |
| **使用信息** | | |
| Dosage | 用法用量 | 每日500-1000mg标准化提取物 |
| Safety Level | 安全等级 | High/Medium/Low |
| Contraindications | 禁忌症 | 孕妇慎用，胆结石患者避免 |
| **详细描述** | | |
| Description | 基本描述 | 植物特性和基本介绍 |
| Traditional Use | 传统用法 | 中医理论和传统应用 |
| Modern Applications | 现代应用 | 现代研究和临床应用 |
| **实用信息** | | |
| Active Compounds | 活性成分 | 姜黄素、去甲氧基姜黄素 |
| Price Range | 价格范围 | 50-200元/公斤 |
| Storage Instructions | 储存方法 | 密封保存，避光防潮 |
| Preparation Methods | 制备方法 | 煎汤、研粉冲服、制成胶囊 |
| **SEO优化** | | |
| SEO Title | SEO标题 | 自动生成优化标题 |
| SEO Description | SEO描述 | 搜索引擎友好描述 |
| SEO Keywords | SEO关键词 | 相关搜索词汇 |

### 🔄 预装草药样本

迁移脚本包含以下高质量草药数据作为起始：

1. **姜黄 (Turmeric)** - 抗炎抗氧化明星
2. **人参 (Ginseng)** - 补气之王
3. **银杏叶 (Ginkgo Leaf)** - 脑健康专家
4. **当归 (Angelica)** - 血家圣药
5. **黄芪 (Astragalus)** - 免疫系统支柱

## 📝 迁移后的工作流

### 1. 访问管理界面

迁移完成后，访问 http://localhost:3000/admin 

### 2. 管理草药数据

在Sanity Studio中，您可以：

- ✅ **查看草药数据库**: 点击 "Herbs Database"
- ✅ **编辑现有草药**: 点击任意草药进行编辑
- ✅ **添加新草药**: 点击 "Create" 添加新条目
- ✅ **上传图片**: 为每种草药添加高质量图片
- ✅ **SEO优化**: 编辑每种草药的SEO信息
- ✅ **状态管理**: 设置为草稿、已发布或存档

### 3. 内容管理特色功能

#### 🖼️ 图片管理
- 拖拽上传草药图片
- 自动图片优化和CDN分发
- 热点裁剪功能

#### 📱 实时预览
- 编辑时实时预览网站效果
- 草稿模式预览

#### 🔍 SEO工具
- 自动生成SEO友好的URL
- Meta标签优化建议
- 搜索引擎友好的结构化数据

#### 👥 多用户协作
- 多人同时编辑
- 内容版本控制
- 评论和协作功能

## 🌐 网站集成

### 草药页面自动生成

迁移完成后，每种草药会自动生成专业页面：

- **URL格式**: `https://www.herbscience.shop/herbs/[slug]`
- **示例页面**: 
  - `/herbs/turmeric` - 姜黄详情页
  - `/herbs/ginseng` - 人参详情页
  - `/herbs/ginkgo-leaf` - 银杏叶详情页

### 搜索和筛选功能

用户可以通过以下方式找到草药：

- 🔍 **名称搜索**: 英文名、中文名、拉丁名
- 🏷️ **分类筛选**: 按药物分类浏览
- 🧬 **体质匹配**: 根据中医体质推荐
- 💊 **功效筛选**: 按主要功效查找
- ⚡ **安全等级**: 按安全性筛选

## 📈 SEO优化效果

每种草药页面都经过SEO优化：

### 🎯 技术SEO
- ✅ 服务端渲染 (SSR)
- ✅ 静态生成 (SSG)
- ✅ 结构化数据 (JSON-LD)
- ✅ 语义化HTML
- ✅ 移动端优化

### 📊 内容SEO
- ✅ 关键词优化标题
- ✅ 搜索友好描述
- ✅ 内部链接建设
- ✅ 相关内容推荐

### 📱 用户体验
- ✅ 快速加载 (< 2秒)
- ✅ 响应式设计
- ✅ 无障碍访问
- ✅ 清晰的信息架构

## 🔧 故障排除

### 常见问题

**Q: 迁移失败显示"SANITY_API_TOKEN未设置"**
A: 
```bash
# 1. 检查.env.local文件是否存在
# 2. 确保token具有Editor或Admin权限
# 3. 重启开发服务器
npm run dev
```

**Q: 显示"项目ID未正确设置"**
A: 
```bash
# 检查项目ID是否正确（不应该是'your-project-id'）
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
```

**Q: 迁移成功但网站上看不到草药**
A: 
```bash
# 1. 确保状态设为"published"
# 2. 清除浏览器缓存
# 3. 检查slug是否正确
```

**Q: 无法访问管理界面**
A: 
```bash
# 确保Sanity Studio正在运行
npm run sanity
# 然后访问 http://localhost:3000/admin
```

### 高级配置

#### 批量导入更多草药

如果您有大量草药数据需要迁移：

1. 编辑 `scripts/migrate-herbs-to-sanity.js`
2. 修改 `loadExistingHerbsData()` 函数
3. 添加您的草药数据数组
4. 重新运行迁移命令

#### 自定义字段

如需添加新字段：

1. 编辑 `sanity/schemas/herb.ts`
2. 添加新的 `defineField()` 定义
3. 更新迁移脚本中的 `createHerbDocument()` 函数
4. 重新构建和部署

## 🎉 迁移完成检查清单

- [ ] ✅ Sanity项目配置完成
- [ ] ✅ 环境变量设置正确
- [ ] ✅ 草药迁移脚本执行成功
- [ ] ✅ 管理界面可以正常访问
- [ ] ✅ 草药数据在CMS中显示正确
- [ ] ✅ 网站上可以查看草药页面
- [ ] ✅ 图片上传功能测试
- [ ] ✅ SEO标签生成正确
- [ ] ✅ 移动端显示正常

## 🚀 下一步计划

### 内容扩展
1. **添加更多草药**: 扩展到100+种常用草药
2. **丰富图片内容**: 为每种草药添加高质量图片
3. **视频内容**: 添加草药介绍视频
4. **用户评价**: 收集和展示用户使用体验

### 功能增强
1. **多语言支持**: 英文、中文界面切换
2. **高级搜索**: AI驱动的智能搜索
3. **个性化推荐**: 基于用户体质的个性化推荐
4. **专家系统**: 集成中医诊断专家系统

### 商业化
1. **草药商城**: 集成电商功能
2. **专家咨询**: 在线中医师咨询
3. **会员系统**: 高级内容和功能
4. **移动应用**: 开发配套APP

---

🎊 **恭喜！您现在拥有了一个现代化的草药数据库管理系统，既有Next.js的技术优势，又有WordPress级别的内容管理便利性！**

有任何问题，请参考 `SANITY_SETUP_GUIDE.md` 或随时联系技术支持。
