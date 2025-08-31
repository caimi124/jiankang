// AI驱动的草药SEO优化引擎
// 将Notion草药数据自动优化为SEO友好内容

require('dotenv').config({ path: '.env.local' });

class HerbSEOOptimizer {
  constructor() {
    this.targetKeywordTemplates = {
      primary: [
        '{herb} benefits',
        '{herb} uses',
        '{herb} dosage',
        '{herb} side effects',
        '{herb} tea',
        '{herb} extract'
      ],
      secondary: [
        '{herb} for {condition}',
        '{herb} vs {competitor}',
        '{herb} safety',
        '{herb} interactions',
        '{herb} pregnancy',
        '{herb} reviews'
      ],
      longTail: [
        'is {herb} safe for daily use',
        'how much {herb} should I take',
        'what is {herb} good for',
        'can I take {herb} with medications',
        '{herb} natural health benefits',
        'best {herb} supplement brand'
      ]
    };
  }

  // 生成针对性关键词
  generateKeywords(herbName, latinName, benefits) {
    const herb = herbName.toLowerCase();
    const keywords = {
      primary: [],
      secondary: [],
      longTail: []
    };

    // 生成主要关键词
    this.targetKeywordTemplates.primary.forEach(template => {
      keywords.primary.push(template.replace('{herb}', herb));
    });

    // 基于功效生成次要关键词
    if (benefits && benefits.length > 0) {
      benefits.forEach(benefit => {
        const condition = this.extractCondition(benefit);
        if (condition) {
          keywords.secondary.push(`${herb} for ${condition}`);
          keywords.longTail.push(`is ${herb} good for ${condition}`);
        }
      });
    }

    // 生成长尾关键词
    this.targetKeywordTemplates.longTail.forEach(template => {
      keywords.longTail.push(template.replace('{herb}', herb));
    });

    return keywords;
  }

  // 从功效描述中提取病症
  extractCondition(benefit) {
    const conditions = {
      'cold': 'cold and flu',
      'pain': 'pain relief',
      'inflammation': 'inflammation',
      'digestion': 'digestive health',
      'sleep': 'sleep problems',
      'anxiety': 'anxiety and stress',
      'blood sugar': 'diabetes',
      'circulation': 'blood circulation',
      'immune': 'immune system',
      'energy': 'fatigue and low energy'
    };

    for (const [key, condition] of Object.entries(conditions)) {
      if (benefit.toLowerCase().includes(key)) {
        return condition;
      }
    }
    return null;
  }

  // 生成SEO优化的标题
  generateSEOTitle(herbName, latinName, primaryBenefit) {
    const templates = [
      `${herbName} (${latinName}): Benefits, Dosage, Safety & Uses | HerbScience`,
      `${herbName} Benefits: Science-Based Uses, Dosage & Safety Guide`,
      `Complete ${herbName} Guide: Benefits, Dosage, Side Effects & Reviews`,
      `${herbName} for ${primaryBenefit}: Evidence-Based Guide | HerbScience`
    ];
    
    return templates[0]; // 使用最SEO友好的模板
  }

  // 生成Meta描述
  generateMetaDescription(herbName, benefits, safetyLevel) {
    const benefitsText = benefits.slice(0, 2).join(', ').toLowerCase();
    const safety = safetyLevel === 'high' ? 'generally safe' : 'use with caution';
    
    return `Discover ${herbName} benefits for ${benefitsText}. Evidence-based dosage, safety information, and expert guidance. ${herbName} is ${safety} when used properly. Learn more.`;
  }

  // 生成结构化FAQ
  generateOptimizedFAQs(herbName, benefits, contraindications) {
    const faqs = [
      {
        question: `What is ${herbName} used for?`,
        answer: `${herbName} is traditionally used for ${benefits.join(', ').toLowerCase()}. Modern research supports several of these traditional uses.`
      },
      {
        question: `Is ${herbName} safe to take daily?`,
        answer: `${herbName} is generally safe for most people when taken as directed. However, consult with a healthcare provider before daily use, especially if you have medical conditions.`
      },
      {
        question: `What is the recommended dosage of ${herbName}?`,
        answer: `The recommended dosage of ${herbName} varies depending on the form and intended use. Always follow product labels and consult healthcare providers for personalized advice.`
      }
    ];

    if (contraindications) {
      faqs.push({
        question: `Who should not take ${herbName}?`,
        answer: `People with ${contraindications.toLowerCase()} should avoid ${herbName}. Pregnant and breastfeeding women should consult healthcare providers before use.`
      });
    }

    return faqs;
  }

  // 生成内链建议
  generateInternalLinks(herbName, category, benefits) {
    const links = [];
    
    // 相关分类链接
    links.push({
      anchor: `other ${category.toLowerCase()} herbs`,
      url: `/herbs?category=${category.toLowerCase()}`,
      context: 'category_related'
    });

    // 相关功效链接
    benefits.forEach(benefit => {
      const condition = this.extractCondition(benefit);
      if (condition) {
        links.push({
          anchor: `herbs for ${condition}`,
          url: `/herbs?benefit=${condition.replace(' ', '-')}`,
          context: 'benefit_related'
        });
      }
    });

    return links;
  }

  // 生成完整的SEO优化内容
  async optimizeHerb(notionHerbData) {
    console.log(`🔧 Optimizing SEO for: ${notionHerbData.name}`);

    const keywords = this.generateKeywords(
      notionHerbData.name,
      notionHerbData.latin_name,
      notionHerbData.benefits
    );

    const seoTitle = this.generateSEOTitle(
      notionHerbData.name,
      notionHerbData.latin_name,
      notionHerbData.benefits?.[0] || 'health'
    );

    const metaDescription = this.generateMetaDescription(
      notionHerbData.name,
      notionHerbData.benefits || [],
      notionHerbData.safety_level
    );

    const faqs = this.generateOptimizedFAQs(
      notionHerbData.name,
      notionHerbData.benefits || [],
      notionHerbData.contraindications
    );

    const internalLinks = this.generateInternalLinks(
      notionHerbData.name,
      notionHerbData.category,
      notionHerbData.benefits || []
    );

    // 生成Sanity文档格式
    const optimizedData = {
      _type: 'herb',
      _id: `herb-${notionHerbData.slug || notionHerbData.name.toLowerCase().replace(/\s+/g, '-')}`,
      
      // 基础信息
      title: notionHerbData.name,
      chineseName: notionHerbData.chinese_name,
      latinName: notionHerbData.latin_name,
      slug: {
        _type: 'slug',
        current: notionHerbData.slug || notionHerbData.name.toLowerCase().replace(/\s+/g, '-')
      },
      
      // SEO优化字段
      seoTitle,
      metaDescription,
      targetKeywords: keywords.primary,
      semanticKeywords: [...keywords.secondary, ...keywords.longTail],
      
      // 优化内容
      category: notionHerbData.category,
      description: notionHerbData.overview || notionHerbData.description,
      benefits: notionHerbData.benefits || [],
      dosage: notionHerbData.dosage_forms || [],
      safetyInfo: notionHerbData.safety_warnings || [],
      contraindications: notionHerbData.not_suitable_for || [],
      
      // 增强的FAQ
      faqOptimized: faqs,
      
      // 内链建议
      relatedLinks: internalLinks,
      
      // 发布状态
      publishedAt: new Date().toISOString(),
      status: 'published'
    };

    console.log(`✅ Generated SEO optimization for: ${notionHerbData.name}`);
    console.log(`   - Primary keywords: ${keywords.primary.length}`);
    console.log(`   - SEO title: ${seoTitle.length} chars`);
    console.log(`   - Meta description: ${metaDescription.length} chars`);
    console.log(`   - FAQs generated: ${faqs.length}`);

    return optimizedData;
  }

  // 批量优化所有草药
  async batchOptimizeHerbs(herbsList) {
    console.log(`🚀 Starting batch optimization for ${herbsList.length} herbs...\n`);
    
    const optimizedHerbs = [];
    
    for (const herb of herbsList) {
      try {
        const optimized = await this.optimizeHerb(herb);
        optimizedHerbs.push(optimized);
        
        // 添加延迟避免API限制
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`❌ Error optimizing ${herb.name}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Batch optimization completed!`);
    console.log(`✅ Successfully optimized: ${optimizedHerbs.length} herbs`);
    
    return optimizedHerbs;
  }

  // 生成博客文章大纲
  generateBlogOutlines(herbName, keywords) {
    const outlines = [];
    
    keywords.primary.forEach(keyword => {
      outlines.push({
        title: this.generateBlogTitle(keyword, herbName),
        slug: keyword.replace(/\s+/g, '-').toLowerCase(),
        targetKeyword: keyword,
        outline: this.generateBlogStructure(keyword, herbName),
        estimatedWordCount: this.estimateWordCount(keyword)
      });
    });
    
    return outlines;
  }

  generateBlogTitle(keyword, herbName) {
    const titleTemplates = {
      'benefits': `${herbName} Benefits: Science-Based Health Effects & Uses`,
      'dosage': `${herbName} Dosage Guide: How Much is Safe & Effective?`,
      'side effects': `${herbName} Side Effects: Safety & Precautions Guide`,
      'tea': `${herbName} Tea: Benefits, Recipe & Preparation Guide`,
      'extract': `${herbName} Extract vs Whole Herb: Which is Better?`,
      'uses': `${herbName} Uses: Traditional & Modern Applications`
    };
    
    for (const [key, template] of Object.entries(titleTemplates)) {
      if (keyword.includes(key)) {
        return template;
      }
    }
    
    return `${herbName} Guide: ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`;
  }

  generateBlogStructure(keyword, herbName) {
    return [
      'Introduction: What You Need to Know',
      `Understanding ${herbName}`,
      'Scientific Evidence & Research',
      'Practical Applications',
      'Safety & Considerations',
      'Frequently Asked Questions',
      'Conclusion & Recommendations'
    ];
  }

  estimateWordCount(keyword) {
    const wordCountMap = {
      'benefits': 1800,
      'dosage': 1200,
      'side effects': 1500,
      'tea': 1000,
      'extract': 1300,
      'uses': 1600
    };
    
    for (const [key, count] of Object.entries(wordCountMap)) {
      if (keyword.includes(key)) {
        return count;
      }
    }
    
    return 1200; // 默认字数
  }
}

// 示例用法
async function demonstrateOptimization() {
  const optimizer = new HerbSEOOptimizer();
  
  // 示例草药数据（来自Notion）
  const sampleHerb = {
    name: 'Clove',
    chinese_name: '丁香',
    latin_name: 'Syzygium aromaticum',
    slug: 'clove',
    category: 'Digestive',
    overview: 'Clove is a warming spice with powerful antiseptic and analgesic properties.',
    benefits: ['oral health', 'digestive support', 'pain relief'],
    safety_level: 'high',
    contraindications: 'pregnancy, heavy bleeding',
    dosage_forms: ['tea', 'oil', 'capsule']
  };
  
  // 执行优化
  const optimized = await optimizer.optimizeHerb(sampleHerb);
  
  console.log('\n📊 优化结果示例:');
  console.log(`SEO标题: ${optimized.seoTitle}`);
  console.log(`Meta描述: ${optimized.metaDescription}`);
  console.log(`主要关键词: ${optimized.targetKeywords.join(', ')}`);
  console.log(`FAQ数量: ${optimized.faqOptimized.length}`);
  
  // 生成博客大纲
  const blogOutlines = optimizer.generateBlogOutlines(sampleHerb.name, {
    primary: optimized.targetKeywords
  });
  
  console.log(`\n📝 生成博客大纲: ${blogOutlines.length}篇`);
  blogOutlines.forEach((outline, index) => {
    console.log(`${index + 1}. ${outline.title} (${outline.estimatedWordCount} words)`);
  });
}

module.exports = { HerbSEOOptimizer };

// 如果直接运行此脚本
if (require.main === module) {
  demonstrateOptimization().catch(console.error);
}
