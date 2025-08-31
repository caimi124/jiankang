// 完整的Notion到Sanity迁移和SEO优化脚本
// 使用您提供的实际数据库ID和项目配置

require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');
const { createClient } = require('@sanity/client');

class HerbScienceMigration {
  constructor() {
    // 使用您的实际配置
    this.config = {
      notion: {
        token: process.env.NOTION_TOKEN || 'YOUR_NOTION_TOKEN_HERE',
        herbsDb: process.env.NOTION_HERBS_DB_ID || 'YOUR_HERBS_DB_ID_HERE',
        faqsDb: process.env.NOTION_FAQS_DB_ID || 'YOUR_FAQS_DB_ID_HERE',
        dosagesDb: process.env.NOTION_DOSAGES_DB_ID || 'YOUR_DOSAGES_DB_ID_HERE',
        studiesDb: process.env.NOTION_STUDIES_DB_ID || 'YOUR_STUDIES_DB_ID_HERE'
      },
      sanity: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '13rzzwgz',
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
        organizationId: process.env.SANITY_ORGANIZATION_ID || 'ou4t3rSBT'
      }
    };

    // 初始化客户端
    this.notion = new Client({ auth: this.config.notion.token });
    
    this.sanity = createClient({
      projectId: this.config.sanity.projectId,
      dataset: this.config.sanity.dataset,
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false
    });

    // SEO关键词模板
    this.seoTemplates = {
      titleTemplate: '{herb} ({latin}): Benefits, Dosage, Safety & Uses | HerbScience',
      descriptionTemplate: 'Discover {herb} benefits for {primaryBenefit}. Evidence-based dosage, safety information, and expert guidance. Learn how to use {herb} safely.',
      keywordTemplates: {
        primary: ['{herb} benefits', '{herb} dosage', '{herb} uses', '{herb} side effects'],
        secondary: ['{herb} for {condition}', '{herb} safety', '{herb} tea', '{herb} extract'],
        longTail: ['is {herb} safe', 'how to use {herb}', 'best {herb} supplement', '{herb} drug interactions']
      }
    };
  }

  // 从Notion获取所有草药
  async fetchAllHerbsFromNotion() {
    try {
      console.log('📥 Fetching herbs from Notion...');
      
      const response = await this.notion.databases.query({
        database_id: this.config.notion.herbsDb,
        filter: {
          property: 'Publish',
          checkbox: { equals: true }
        }
      });

      console.log(`Found ${response.results.length} published herbs`);
      
      const herbs = [];
      for (const page of response.results) {
        const herbData = await this.processHerbPage(page);
        if (herbData) {
          herbs.push(herbData);
        }
        // 添加延迟避免API限制
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      return herbs;
    } catch (error) {
      console.error('❌ Error fetching herbs:', error);
      return [];
    }
  }

  // 处理单个草药页面
  async processHerbPage(page) {
    try {
      const props = page.properties;
      const herbId = page.id;

      // 提取基础信息
      const herbData = {
        id: herbId,
        name: this.extractText(props['Herb Name']),
        latinName: this.extractText(props['LatinName']) || '',
        slug: this.extractText(props['Slug']) || this.generateSlug(this.extractText(props['Herb Name'])),
        category: this.extractSelect(props['Category']) || '',
        overview: this.extractText(props['Overview']) || '',
        benefits: this.extractMultiSelect(props['Benefits']) || [],
        activeCompounds: this.extractMultiSelect(props['ActiveCompounds']) || [],
        recommendedFor: this.extractMultiSelect(props['RecommendedFor']) || [],
        notRecommendedFor: this.extractMultiSelect(props['NotRecommendedFor']) || [],
        contraindications: this.extractMultiSelect(props['Contraindications']) || [],
        drugInteractions: this.extractMultiSelect(props['InteractsWithDrugs']) || [],
        safetyRating: this.extractSelect(props['SafetyRating']) || 'medium',
        pregnancy: this.extractSelect(props['Pregnancy']) || '',
        lactation: this.extractSelect(props['Lactation']) || '',
        tags: this.extractMultiSelect(props['Tags']) || []
      };

      // 获取关联数据
      const faqs = await this.fetchRelatedFAQs(herbId);
      const dosages = await this.fetchRelatedDosages(herbId);
      const studies = await this.fetchRelatedStudies(herbId);

      // 生成SEO优化内容
      const seoOptimized = this.generateSEOContent(herbData);

      return {
        ...herbData,
        ...seoOptimized,
        faqs,
        dosages,
        studies
      };

    } catch (error) {
      console.error(`❌ Error processing herb page:`, error);
      return null;
    }
  }

  // 获取关联的FAQs
  async fetchRelatedFAQs(herbId) {
    try {
      const response = await this.notion.databases.query({
        database_id: this.config.notion.faqsDb,
        filter: {
          property: 'Herb',
          relation: { contains: herbId }
        }
      });

      return response.results.map(faq => ({
        question: this.extractText(faq.properties['Question']),
        answer: this.extractText(faq.properties['Answer'])
      })).filter(faq => faq.question && faq.answer);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }
  }

  // 获取关联的用量信息
  async fetchRelatedDosages(herbId) {
    try {
      const response = await this.notion.databases.query({
        database_id: this.config.notion.dosagesDb,
        filter: {
          property: 'Herb',
          relation: { contains: herbId }
        }
      });

      return response.results.map(dosage => ({
        form: this.extractSelect(dosage.properties['Form']),
        notes: this.extractText(dosage.properties['Notes']) || ''
      })).filter(dosage => dosage.form);
    } catch (error) {
      console.error('Error fetching dosages:', error);
      return [];
    }
  }

  // 获取关联的研究数据
  async fetchRelatedStudies(herbId) {
    try {
      const response = await this.notion.databases.query({
        database_id: this.config.notion.studiesDb,
        filter: {
          property: 'Herb',
          relation: { contains: herbId }
        }
      });

      return response.results.map(study => ({
        title: this.extractText(study.properties['名称']),
        studyType: this.extractSelect(study.properties['StudyType']),
        effectDirection: this.extractSelect(study.properties['EffectDirection']),
        riskOfBias: this.extractSelect(study.properties['RiskOfBias'])
      })).filter(study => study.title);
    } catch (error) {
      console.error('Error fetching studies:', error);
      return [];
    }
  }

  // 生成SEO优化内容
  generateSEOContent(herbData) {
    const herb = herbData.name.toLowerCase();
    const primaryBenefit = herbData.benefits[0] || 'health';

    // 生成关键词
    const keywords = {
      primary: [],
      secondary: [],
      longTail: []
    };

    // 生成主要关键词
    this.seoTemplates.keywordTemplates.primary.forEach(template => {
      keywords.primary.push(template.replace('{herb}', herb));
    });

    // 基于功效生成次要关键词
    herbData.benefits.forEach(benefit => {
      const condition = this.extractConditionFromBenefit(benefit);
      if (condition) {
        keywords.secondary.push(`${herb} for ${condition}`);
      }
    });

    // 生成长尾关键词
    this.seoTemplates.keywordTemplates.longTail.forEach(template => {
      keywords.longTail.push(template.replace('{herb}', herb));
    });

    // 生成SEO标题
    const seoTitle = this.seoTemplates.titleTemplate
      .replace('{herb}', herbData.name)
      .replace('{latin}', herbData.latinName);

    // 生成Meta描述
    const metaDescription = this.seoTemplates.descriptionTemplate
      .replace('{herb}', herbData.name)
      .replace('{primaryBenefit}', primaryBenefit.toLowerCase())
      .replace('{herb}', herbData.name);

    // 生成优化的FAQs
    const optimizedFAQs = this.generateOptimizedFAQs(herbData);

    return {
      seoTitle,
      metaDescription,
      targetKeywords: keywords.primary,
      semanticKeywords: [...keywords.secondary, ...keywords.longTail],
      optimizedFAQs
    };
  }

  // 生成优化的FAQs
  generateOptimizedFAQs(herbData) {
    const faqs = [
      {
        question: `What is ${herbData.name} used for?`,
        answer: `${herbData.name} is traditionally used for ${herbData.benefits.join(', ').toLowerCase()}. Modern research supports several of these traditional uses, particularly for ${herbData.benefits[0] || 'general wellness'}.`
      },
      {
        question: `Is ${herbData.name} safe to take daily?`,
        answer: `${herbData.name} is generally considered ${herbData.safetyRating === 'Green' ? 'safe' : 'requiring caution'} for most people when taken as directed. However, it's always best to consult with a healthcare provider before starting any daily herbal regimen.`
      },
      {
        question: `What is the recommended dosage of ${herbData.name}?`,
        answer: `The recommended dosage of ${herbData.name} varies depending on the form (capsule, tea, extract) and intended use. Always follow product labels and consult healthcare providers for personalized advice.`
      }
    ];

    if (herbData.contraindications.length > 0) {
      faqs.push({
        question: `Who should not take ${herbData.name}?`,
        answer: `People with ${herbData.contraindications.join(', ').toLowerCase()} should avoid ${herbData.name}. ${herbData.pregnancy === 'Avoid' ? 'Pregnant women should not use this herb.' : 'Pregnant and breastfeeding women should consult healthcare providers before use.'}`
      });
    }

    return faqs;
  }

  // 上传到Sanity
  async uploadToSanity(herbData) {
    try {
      console.log(`📤 Uploading ${herbData.name} to Sanity...`);

      const sanityDocument = {
        _type: 'herb',
        _id: `herb-${herbData.slug}`,
        title: herbData.name,
        chineseName: herbData.chineseName || '',
        latinName: herbData.latinName,
        slug: {
          _type: 'slug',
          current: herbData.slug
        },
        
        // SEO字段
        seoTitle: herbData.seoTitle,
        metaDescription: herbData.metaDescription,
        targetKeywords: herbData.targetKeywords,
        semanticKeywords: herbData.semanticKeywords,
        
        // 内容字段
        category: herbData.category,
        description: herbData.overview,
        benefits: herbData.benefits,
        activeCompounds: herbData.activeCompounds,
        recommendedFor: herbData.recommendedFor,
        notRecommendedFor: herbData.notRecommendedFor,
        contraindications: herbData.contraindications,
        drugInteractions: herbData.drugInteractions,
        safetyRating: herbData.safetyRating,
        pregnancySafety: herbData.pregnancy,
        lactationSafety: herbData.lactation,
        tags: herbData.tags,
        
        // 关联数据
        faqs: herbData.faqs,
        dosages: herbData.dosages,
        studies: herbData.studies,
        optimizedFAQs: herbData.optimizedFAQs,
        
        // 发布信息
        publishedAt: new Date().toISOString(),
        status: 'published'
      };

      const result = await this.sanity.createOrReplace(sanityDocument);
      console.log(`✅ Successfully uploaded: ${herbData.name}`);
      return result;

    } catch (error) {
      console.error(`❌ Error uploading ${herbData.name}:`, error);
      throw error;
    }
  }

  // 生成博客文章大纲
  generateBlogOutlines(herbData) {
    const blogTopics = [
      `${herbData.name} Benefits: Science-Backed Health Effects`,
      `${herbData.name} Dosage Guide: How Much is Safe?`,
      `${herbData.name} Side Effects and Safety Warnings`,
      `${herbData.name} Tea: Recipe and Preparation Guide`,
      `${herbData.name} vs Other Herbs: Comparison Guide`,
      `${herbData.name} for ${herbData.benefits[0] || 'Health'}: Evidence Review`,
      `${herbData.name} Drug Interactions: What to Know`,
      `${herbData.name} During Pregnancy: Safety Guidelines`
    ];

    return blogTopics.map(topic => ({
      title: topic,
      slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      targetHerb: herbData.name,
      estimatedWordCount: 1200,
      outline: [
        'Introduction',
        `Understanding ${herbData.name}`,
        'Scientific Evidence',
        'Practical Applications',
        'Safety Considerations',
        'FAQs',
        'Conclusion'
      ]
    }));
  }

  // 执行完整迁移
  async executeFullMigration() {
    console.log('🚀 Starting complete Notion to Sanity migration...\n');

    try {
      // 1. 测试连接
      await this.testConnections();

      // 2. 获取所有草药数据
      const herbs = await this.fetchAllHerbsFromNotion();
      if (herbs.length === 0) {
        console.log('❌ No herbs found in Notion');
        return;
      }

      console.log(`📊 Processing ${herbs.length} herbs...\n`);

      // 3. 处理每个草药
      const results = [];
      const allBlogOutlines = [];

      for (const herb of herbs) {
        try {
          // 上传到Sanity
          const sanityResult = await this.uploadToSanity(herb);
          results.push(sanityResult);

          // 生成博客大纲
          const blogOutlines = this.generateBlogOutlines(herb);
          allBlogOutlines.push(...blogOutlines);

          console.log(`✅ Processed: ${herb.name} (${herb.slug})`);
          console.log(`   - Keywords: ${herb.targetKeywords?.length || 0}`);
          console.log(`   - FAQs: ${herb.faqs?.length || 0}`);
          console.log(`   - Dosages: ${herb.dosages?.length || 0}\n`);

          // 添加延迟
          await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
          console.error(`❌ Failed to process ${herb.name}:`, error.message);
        }
      }

      // 4. 生成报告
      this.generateMigrationReport(results, allBlogOutlines);

    } catch (error) {
      console.error('❌ Migration failed:', error);
    }
  }

  // 测试连接
  async testConnections() {
    console.log('🔍 Testing connections...\n');

    // 测试Notion
    try {
      await this.notion.users.me();
      console.log('✅ Notion connection: OK');
    } catch (error) {
      console.log('❌ Notion connection: FAILED');
      throw new Error(`Notion: ${error.message}`);
    }

    // 测试Sanity
    try {
      const result = await this.sanity.fetch('*[_type == "herb"][0..2]');
      console.log('✅ Sanity connection: OK');
    } catch (error) {
      console.log('❌ Sanity connection: FAILED');
      console.log('   Please check SANITY_API_TOKEN in .env.local');
      throw new Error(`Sanity: ${error.message}`);
    }

    console.log('');
  }

  // 生成迁移报告
  generateMigrationReport(herbs, blogOutlines) {
    console.log('\n📊 === 迁移完成报告 ===');
    console.log(`✅ 成功迁移草药: ${herbs.length}`);
    console.log(`📝 生成博客大纲: ${blogOutlines.length}`);

    console.log('\n🌿 已迁移的草药:');
    herbs.forEach((herb, index) => {
      console.log(`${index + 1}. ${herb.title || herb._id}`);
    });

    console.log('\n📝 博客文章规划:');
    const groupedBlogs = {};
    blogOutlines.forEach(blog => {
      const herbName = blog.targetHerb;
      if (!groupedBlogs[herbName]) groupedBlogs[herbName] = [];
      groupedBlogs[herbName].push(blog.title);
    });

    Object.entries(groupedBlogs).forEach(([herb, blogs]) => {
      console.log(`\n${herb} (${blogs.length}篇):`);
      blogs.slice(0, 3).forEach((blog, index) => {
        console.log(`  ${index + 1}. ${blog}`);
      });
      if (blogs.length > 3) {
        console.log(`  ... 还有${blogs.length - 3}篇`);
      }
    });

    console.log('\n🔗 下一步建议:');
    console.log('1. 访问 Sanity Studio 检查内容');
    console.log('2. 更新网站以使用 Sanity 数据');
    console.log('3. 生成新的 sitemap');
    console.log('4. 提交到 Google Search Console');
    console.log('5. 开始创建博客内容');

    console.log('\n🌐 访问链接:');
    console.log(`- Sanity Studio: https://${this.config.sanity.projectId}.sanity.studio`);
    console.log(`- Sanity Manage: https://www.sanity.io/manage/project/${this.config.sanity.projectId}`);
  }

  // 工具方法
  extractText(property) {
    if (property?.title) return property.title[0]?.plain_text || '';
    if (property?.rich_text) return property.rich_text[0]?.plain_text || '';
    return '';
  }

  extractSelect(property) {
    return property?.select?.name || '';
  }

  extractMultiSelect(property) {
    return property?.multi_select?.map(item => item.name) || [];
  }

  generateSlug(text) {
    return text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }

  extractConditionFromBenefit(benefit) {
    const conditions = {
      'blood sugar': 'diabetes management',
      'cold': 'cold and flu',
      'pain': 'pain relief',
      'inflammation': 'inflammation',
      'digestion': 'digestive health',
      'sleep': 'sleep problems',
      'anxiety': 'stress and anxiety',
      'circulation': 'blood circulation',
      'immune': 'immune support',
      'energy': 'energy and fatigue'
    };

    for (const [key, condition] of Object.entries(conditions)) {
      if (benefit.toLowerCase().includes(key)) {
        return condition;
      }
    }
    return null;
  }
}

// 执行迁移
async function main() {
  console.log('🌿 HerbScience Notion to Sanity Migration\n');
  
  const migration = new HerbScienceMigration();
  await migration.executeFullMigration();
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { HerbScienceMigration };
