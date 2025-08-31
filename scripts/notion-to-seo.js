// Notion到SEO优化的完整自动化流程
// 一键将Notion草药数据转换为SEO优化的网站内容

require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');
const { createClient } = require('@sanity/client');
const { HerbSEOOptimizer } = require('./ai-herb-optimizer');

class NotionToSEOPipeline {
  constructor() {
    // Notion客户端
    this.notion = new Client({ 
      auth: process.env.NOTION_TOKEN 
    });
    
    // Sanity客户端
    this.sanity = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '13rzzwgz',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false
    });
    
    // SEO优化器
    this.optimizer = new HerbSEOOptimizer();
    
    // 数据库ID
    this.herbsDbId = process.env.NOTION_HERBS_DB_ID;
    this.faqsDbId = process.env.NOTION_FAQS_DB_ID;
    this.dosagesDbId = process.env.NOTION_DOSAGES_DB_ID;
  }

  // 从Notion获取草药数据
  async fetchHerbFromNotion(herbId) {
    try {
      console.log(`📥 Fetching herb data from Notion: ${herbId}`);
      
      const page = await this.notion.pages.retrieve({ page_id: herbId });
      const props = page.properties;
      
      // 获取关联的FAQs
      const faqs = await this.fetchRelatedFAQs(herbId);
      
      // 获取关联的用量信息
      const dosages = await this.fetchRelatedDosages(herbId);
      
      const herbData = {
        id: herbId,
        name: this.extractText(props['Herb Name']),
        chinese_name: this.extractText(props['ChineseName']) || '',
        latin_name: this.extractText(props['LatinName']) || '',
        slug: this.extractText(props['Slug']) || this.generateSlug(this.extractText(props['Herb Name'])),
        category: this.extractSelect(props['Category']) || '',
        overview: this.extractText(props['Overview']) || '',
        benefits: this.extractMultiSelect(props['Benefits']) || [],
        safety_level: this.extractSelect(props['SafetyRating']) || 'medium',
        contraindications: this.extractMultiSelect(props['Contraindications'])?.join(', ') || '',
        not_suitable_for: this.extractMultiSelect(props['NotRecommendedFor']) || [],
        recommended_for: this.extractMultiSelect(props['RecommendedFor']) || [],
        active_compounds: this.extractMultiSelect(props['ActiveCompounds']) || [],
        pregnancy_safety: this.extractSelect(props['Pregnancy']) || '',
        lactation_safety: this.extractSelect(props['Lactation']) || '',
        drug_interactions: this.extractMultiSelect(props['InteractsWithDrugs']) || [],
        faqs: faqs,
        dosage_forms: dosages
      };
      
      console.log(`✅ Successfully fetched: ${herbData.name}`);
      return herbData;
      
    } catch (error) {
      console.error(`❌ Error fetching herb ${herbId}:`, error.message);
      return null;
    }
  }

  // 获取关联的FAQs
  async fetchRelatedFAQs(herbId) {
    if (!this.faqsDbId) return [];
    
    try {
      const response = await this.notion.databases.query({
        database_id: this.faqsDbId,
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
      console.error('Error fetching FAQs:', error.message);
      return [];
    }
  }

  // 获取关联的用量信息
  async fetchRelatedDosages(herbId) {
    if (!this.dosagesDbId) return [];
    
    try {
      const response = await this.notion.databases.query({
        database_id: this.dosagesDbId,
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
      console.error('Error fetching dosages:', error.message);
      return [];
    }
  }

  // 从Notion获取所有草药
  async fetchAllHerbsFromNotion() {
    if (!this.herbsDbId) {
      console.error('❌ NOTION_HERBS_DB_ID not configured');
      return [];
    }
    
    try {
      console.log('📥 Fetching all herbs from Notion...');
      
      const response = await this.notion.databases.query({
        database_id: this.herbsDbId,
        filter: {
          property: 'Publish',
          checkbox: { equals: true }
        }
      });
      
      console.log(`Found ${response.results.length} published herbs`);
      
      const herbs = [];
      for (const page of response.results) {
        const herbData = await this.fetchHerbFromNotion(page.id);
        if (herbData) {
          herbs.push(herbData);
        }
        
        // 添加延迟避免API限制
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      return herbs;
    } catch (error) {
      console.error('❌ Error fetching herbs from Notion:', error.message);
      return [];
    }
  }

  // 上传到Sanity
  async uploadToSanity(optimizedHerb) {
    try {
      console.log(`📤 Uploading to Sanity: ${optimizedHerb.title}`);
      
      const result = await this.sanity.createOrReplace(optimizedHerb);
      
      console.log(`✅ Successfully uploaded: ${optimizedHerb.title}`);
      return result;
    } catch (error) {
      console.error(`❌ Error uploading to Sanity:`, error.message);
      throw error;
    }
  }

  // 完整的处理流程
  async processHerb(herbId) {
    try {
      console.log(`\n🚀 Processing herb: ${herbId}`);
      
      // 1. 从Notion获取数据
      const notionData = await this.fetchHerbFromNotion(herbId);
      if (!notionData) return null;
      
      // 2. SEO优化
      const optimizedData = await this.optimizer.optimizeHerb(notionData);
      
      // 3. 上传到Sanity
      const sanityResult = await this.uploadToSanity(optimizedData);
      
      // 4. 生成博客大纲
      const blogOutlines = this.optimizer.generateBlogOutlines(
        notionData.name, 
        { primary: optimizedData.targetKeywords }
      );
      
      console.log(`✅ Processed: ${notionData.name}`);
      console.log(`   - SEO keywords: ${optimizedData.targetKeywords.length}`);
      console.log(`   - Blog outlines: ${blogOutlines.length}`);
      
      return {
        herb: sanityResult,
        blogOutlines: blogOutlines
      };
    } catch (error) {
      console.error(`❌ Error processing herb ${herbId}:`, error.message);
      return null;
    }
  }

  // 批量处理所有草药
  async processAllHerbs() {
    console.log('🚀 Starting complete Notion to SEO pipeline...\n');
    
    // 获取所有草药
    const herbs = await this.fetchAllHerbsFromNotion();
    if (herbs.length === 0) {
      console.log('❌ No herbs found in Notion');
      return;
    }
    
    console.log(`📊 Found ${herbs.length} herbs to process\n`);
    
    const results = [];
    const blogOutlines = [];
    
    for (const herb of herbs) {
      const result = await this.processHerb(herb.id);
      if (result) {
        results.push(result.herb);
        blogOutlines.push(...result.blogOutlines);
      }
      
      // 添加延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 生成报告
    this.generateReport(results, blogOutlines);
    
    return { herbs: results, blogs: blogOutlines };
  }

  // 生成处理报告
  generateReport(herbs, blogOutlines) {
    console.log('\n📊 === 处理完成报告 ===');
    console.log(`✅ 成功处理草药: ${herbs.length}`);
    console.log(`📝 生成博客大纲: ${blogOutlines.length}`);
    
    console.log('\n🌿 处理的草药:');
    herbs.forEach((herb, index) => {
      console.log(`${index + 1}. ${herb.title} (${herb.slug.current})`);
    });
    
    console.log('\n📝 博客文章规划:');
    const groupedBlogs = {};
    blogOutlines.forEach(blog => {
      const herbName = blog.title.split(' ')[0];
      if (!groupedBlogs[herbName]) groupedBlogs[herbName] = [];
      groupedBlogs[herbName].push(blog.title);
    });
    
    Object.entries(groupedBlogs).forEach(([herb, blogs]) => {
      console.log(`\n${herb}:`);
      blogs.forEach((blog, index) => {
        console.log(`  ${index + 1}. ${blog}`);
      });
    });
    
    console.log('\n🔗 下一步建议:');
    console.log('1. 检查Sanity Studio中的内容');
    console.log('2. 重新生成网站sitemap');
    console.log('3. 提交新URLs到Google Search Console');
    console.log('4. 开始创建博客内容');
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

  // 测试连接
  async testConnections() {
    console.log('🔍 Testing connections...\n');
    
    // 测试Notion
    try {
      await this.notion.users.me();
      console.log('✅ Notion connection: OK');
    } catch (error) {
      console.log('❌ Notion connection: FAILED');
      console.log('   Error:', error.message);
    }
    
    // 测试Sanity
    try {
      const result = await this.sanity.fetch('*[_type == "herb"][0]');
      console.log('✅ Sanity connection: OK');
    } catch (error) {
      console.log('❌ Sanity connection: FAILED');
      console.log('   Error:', error.message);
    }
    
    console.log('');
  }
}

// 主执行函数
async function main() {
  const pipeline = new NotionToSEOPipeline();
  
  // 测试连接
  await pipeline.testConnections();
  
  // 处理所有草药
  await pipeline.processAllHerbs();
}

// 导出类和主函数
module.exports = { NotionToSEOPipeline };

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}
