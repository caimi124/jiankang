#!/usr/bin/env node

const fetch = require('node-fetch');

const testHerbs = ['clove', 'pumpkin-seeds', 'cinnamon', 'rhubarb'];

async function testHerbPages() {
  console.log('🔍 测试草药页面可访问性...\n');
  
  for (const herb of testHerbs) {
    try {
      const url = `http://localhost:3000/herbs/${herb}`;
      console.log(`📋 测试: ${herb}`);
      console.log(`🔗 URL: ${url}`);
      
      const response = await fetch(url);
      const status = response.status;
      const statusText = response.statusText;
      
      if (status === 200) {
        console.log(`✅ 状态: ${status} ${statusText} - 页面正常`);
        const text = await response.text();
        if (text.includes('404') || text.includes('Not Found')) {
          console.log(`⚠️  警告: 页面返回200但内容包含404信息`);
        } else {
          console.log(`✅ 内容: 页面内容正常`);
        }
      } else if (status === 404) {
        console.log(`❌ 状态: ${status} ${statusText} - 页面不存在`);
      } else {
        console.log(`⚠️  状态: ${status} ${statusText} - 其他错误`);
      }
      
      console.log('---');
    } catch (error) {
      console.log(`❌ 错误: ${error.message}`);
      console.log('---');
    }
  }
  
  console.log('🔍 检查静态数据库中的草药数据...\n');
  
  try {
    const { HERBS_DATABASE } = require('./lib/herbs-data-complete.ts');
    
    for (const herb of testHerbs) {
      const foundHerb = HERBS_DATABASE.find(h => {
        const herbSlug = h.english_name.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        return herbSlug === herb;
      });
      
      if (foundHerb) {
        console.log(`✅ ${herb}: 在数据库中找到 - ${foundHerb.english_name}`);
      } else {
        console.log(`❌ ${herb}: 在数据库中未找到`);
      }
    }
  } catch (error) {
    console.log(`❌ 数据库检查错误: ${error.message}`);
  }
  
  console.log('\n🔍 检查generateStaticParams生成的slug...\n');
  
  try {
    // 模拟generateStaticParams的逻辑
    const { HERBS_DATABASE } = require('./lib/herbs-data-complete.ts');
    const staticSlugs = HERBS_DATABASE.map(herb => ({
      slug: herb.english_name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    }));
    
    for (const herb of testHerbs) {
      const foundSlug = staticSlugs.find(s => s.slug === herb);
      if (foundSlug) {
        console.log(`✅ ${herb}: 在静态参数中找到`);
      } else {
        console.log(`❌ ${herb}: 在静态参数中未找到`);
      }
    }
    
    console.log('\n📋 所有生成的slug (前10个):');
    staticSlugs.slice(0, 10).forEach(s => console.log(`  - ${s.slug}`));
    
  } catch (error) {
    console.log(`❌ 静态参数检查错误: ${error.message}`);
  }
}

testHerbPages().catch(console.error);
