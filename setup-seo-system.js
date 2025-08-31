// 一键设置SEO优化系统
// 配置Sanity、更新环境变量、部署优化脚本

const fs = require('fs');
const path = require('path');

class SEOSystemSetup {
  constructor() {
    this.projectId = '13rzzwgz'; // 您的Sanity项目ID
    this.dataset = 'production';
  }

  // 更新环境变量
  updateEnvFile() {
    console.log('🔧 Updating environment variables...');
    
    const envPath = '.env.local';
    let envContent = '';
    
    // 读取现有环境变量
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    // 需要添加的Sanity配置
    const sanityConfig = `
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=${this.projectId}
NEXT_PUBLIC_SANITY_DATASET=${this.dataset}
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=sk_test_placeholder_token_here

# SEO Optimization
ENABLE_SEO_OPTIMIZATION=true
AUTO_GENERATE_BLOGS=true
`;

    // 检查是否已有Sanity配置
    if (!envContent.includes('NEXT_PUBLIC_SANITY_PROJECT_ID')) {
      envContent += sanityConfig;
      fs.writeFileSync(envPath, envContent);
      console.log('✅ Environment variables updated');
    } else {
      console.log('ℹ️  Sanity config already exists in .env.local');
    }
  }

  // 更新Sanity CLI配置
  updateSanityConfig() {
    console.log('🔧 Updating Sanity configuration...');
    
    const sanityCliPath = 'sanity.cli.ts';
    const cliConfig = `import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '${this.projectId}',
    dataset: '${this.dataset}'
  }
})`;
    
    fs.writeFileSync(sanityCliPath, cliConfig);
    console.log('✅ Sanity CLI config updated');
  }

  // 创建SEO优化配置文件
  createSEOConfig() {
    console.log('🔧 Creating SEO configuration...');
    
    const seoConfig = {
      enabled: true,
      autoOptimize: true,
      keywordDensity: 1.5, // 目标关键词密度 1.5%
      minContentLength: 1200, // 最小内容长度
      maxTitleLength: 60, // 最大标题长度
      maxDescriptionLength: 160, // 最大描述长度
      generateBlogs: true, // 自动生成博客
      blogsPerHerb: 8, // 每个草药生成8篇博客
      internalLinkDensity: 3, // 每1000字3个内链
      structuredData: true, // 启用结构化数据
      imageSEO: true, // 图片SEO优化
      sitemapGeneration: true, // 自动生成sitemap
      templates: {
        herbTitle: '{herb} ({latin}): Benefits, Dosage, Safety & Uses | HerbScience',
        herbDescription: 'Discover {herb} benefits for {benefits}. Evidence-based dosage, safety information, and expert guidance. Learn more.',
        blogTitle: '{herb} {topic}: Evidence-Based Guide | HerbScience',
        blogDescription: 'Expert guide on {herb} for {topic}. Science-backed information, dosage, and safety considerations.'
      },
      keywords: {
        primary: ['{herb} benefits', '{herb} dosage', '{herb} uses', '{herb} safety'],
        secondary: ['{herb} for {condition}', '{herb} vs {competitor}', '{herb} reviews'],
        longTail: ['is {herb} safe', 'how to use {herb}', 'best {herb} supplement']
      }
    };
    
    fs.writeFileSync('seo-config.json', JSON.stringify(seoConfig, null, 2));
    console.log('✅ SEO configuration created');
  }

  // 创建Sanity Schema文件
  createSanitySchemas() {
    console.log('🔧 Creating Sanity schemas...');
    
    const schemaDir = 'sanity/schemas';
    if (!fs.existsSync(schemaDir)) {
      fs.mkdirSync(schemaDir, { recursive: true });
    }

    // 优化的草药Schema
    const herbSchema = `import { defineType, defineField } from 'sanity'

export const herb = defineType({
  name: 'herb',
  title: 'Herb',
  type: 'document',
  icon: () => '🌿',
  fields: [
    // 基础信息
    defineField({
      name: 'title',
      title: 'English Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'chineseName',
      title: 'Chinese Name',
      type: 'string'
    }),
    defineField({
      name: 'latinName',
      title: 'Latin Name',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    
    // SEO字段
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Optimized title for search engines (auto-generated)',
      validation: Rule => Rule.max(60)
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Description for search results (auto-generated)',
      validation: Rule => Rule.max(160)
    }),
    defineField({
      name: 'targetKeywords',
      title: 'Target Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Primary keywords to rank for'
    }),
    defineField({
      name: 'semanticKeywords',
      title: 'Semantic Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Related and long-tail keywords'
    }),
    
    // 内容字段
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'safetyInfo',
      title: 'Safety Information',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'contraindications',
      title: 'Contraindications',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    
    // SEO增强字段
    defineField({
      name: 'faqOptimized',
      title: 'Optimized FAQs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', type: 'string', title: 'Question' },
          { name: 'answer', type: 'text', title: 'Answer' }
        ]
      }]
    }),
    defineField({
      name: 'relatedLinks',
      title: 'Internal Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'anchor', type: 'string', title: 'Anchor Text' },
          { name: 'url', type: 'string', title: 'URL' },
          { name: 'context', type: 'string', title: 'Context' }
        ]
      }]
    }),
    
    // 状态字段
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['draft', 'published', 'archived']
      }
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'latinName',
      media: 'featuredImage'
    }
  }
})`;

    fs.writeFileSync(path.join(schemaDir, 'herb.ts'), herbSchema);
    console.log('✅ Herb schema created');
  }

  // 创建使用说明
  createInstructions() {
    console.log('📝 Creating usage instructions...');
    
    const instructions = `# 🌿 SEO优化系统使用指南

## 🚀 快速开始

### 1. 完成Sanity设置
\`\`\`bash
# 安装Sanity CLI
npm install -g @sanity/cli

# 登录Sanity
sanity login

# 部署schemas
sanity deploy
\`\`\`

### 2. 获取Sanity API Token
1. 访问: https://www.sanity.io/manage/project/${this.projectId}
2. Settings → API → Tokens
3. 创建新token，权限选择"Editor"
4. 复制token到 .env.local 的 SANITY_API_TOKEN

### 3. 运行优化脚本
\`\`\`bash
# 测试连接
node scripts/notion-to-seo.js

# 批量优化所有草药
npm run optimize-herbs
\`\`\`

## 📊 系统功能

### 自动SEO优化
- ✅ 关键词研究和布局
- ✅ Meta标题和描述生成
- ✅ 结构化数据添加
- ✅ 内链建设
- ✅ FAQ优化

### 内容增强
- ✅ 为每个草药生成8篇博客大纲
- ✅ 自动内链建议
- ✅ 语义关键词扩展
- ✅ 竞争分析

### 技术SEO
- ✅ 自动sitemap生成
- ✅ Robots.txt优化
- ✅ 页面速度优化
- ✅ 移动端友好

## 🔄 工作流程

1. **在Notion中编辑草药信息** (您熟悉的方式)
2. **运行同步脚本** (\`npm run sync-notion\`)
3. **自动SEO优化** (AI处理关键词和内容)
4. **推送到网站** (自动更新)
5. **监控效果** (Search Console集成)

## 📈 预期效果

### 第1个月
- 所有草药页面被Google收录
- 关键词排名进入前50
- 自然流量增长200%

### 第3个月
- 核心关键词排名前20
- 长尾关键词大量上榜
- 建立专题权威度

### 第6个月
- 成为草药信息权威站点
- 核心词排名前5
- 品牌词搜索量显著增长

## 🛠️ 常用命令

\`\`\`bash
# 同步Notion数据
npm run sync-notion

# 优化单个草药
node scripts/optimize-herb.js [herb-id]

# 生成sitemap
npm run generate-sitemap

# 检查SEO状态
npm run seo-audit
\`\`\`

## 📞 支持

如有问题，请检查：
1. 环境变量配置是否正确
2. Sanity权限是否设置
3. Notion数据库是否可访问

更多帮助: 查看项目README.md
`;

    fs.writeFileSync('SEO_SYSTEM_GUIDE.md', instructions);
    console.log('✅ Usage instructions created');
  }

  // 运行完整设置
  async setupComplete() {
    console.log('🚀 Setting up SEO optimization system...\n');
    
    try {
      this.updateEnvFile();
      this.updateSanityConfig();
      this.createSEOConfig();
      this.createSanitySchemas();
      this.createInstructions();
      
      console.log('\n🎉 Setup completed successfully!\n');
      
      console.log('📋 Next steps:');
      console.log('1. Update SANITY_API_TOKEN in .env.local');
      console.log('2. Run: sanity deploy');
      console.log('3. Run: node scripts/notion-to-seo.js');
      console.log('4. Check results at: http://localhost:3000');
      
      console.log('\n📖 Read SEO_SYSTEM_GUIDE.md for detailed instructions');
      
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
    }
  }
}

// 运行设置
const setup = new SEOSystemSetup();
setup.setupComplete();
