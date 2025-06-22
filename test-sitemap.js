#!/usr/bin/env node

/**
 * Sitemap 测试和验证脚本
 * 用于检查生成的sitemap是否正确
 */

const fs = require('fs');
const path = require('path');

function validateSitemapXML(filePath) {
  try {
    console.log(`\n🔍 检查文件: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ 文件不存在: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否是XML格式
    if (!content.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
      console.error('❌ 不是有效的XML文件');
      console.log('文件开头:', content.substring(0, 100));
      return false;
    }

    // 检查是否包含HTML标签
    if (content.includes('<html') || content.includes('<body') || content.includes('<head')) {
      console.error('❌ 文件包含HTML内容而不是XML');
      return false;
    }

    // 检查sitemap结构
    if (content.includes('<sitemapindex')) {
      console.log('✅ 检测到sitemap索引文件');
      const sitemapMatches = content.match(/<sitemap><loc>([^<]+)<\/loc><\/sitemap>/g);
      if (sitemapMatches) {
        console.log(`📋 包含 ${sitemapMatches.length} 个sitemap文件`);
        sitemapMatches.forEach((match, index) => {
          const url = match.match(/<loc>([^<]+)<\/loc>/)[1];
          console.log(`   ${index + 1}. ${url}`);
        });
      }
    } else if (content.includes('<urlset')) {
      console.log('✅ 检测到sitemap URL集合');
      const urlMatches = content.match(/<url>/g);
      if (urlMatches) {
        console.log(`📋 包含 ${urlMatches.length} 个URL`);
        
        // 显示一些示例URL
        const locMatches = content.match(/<loc>([^<]+)<\/loc>/g);
        if (locMatches && locMatches.length > 0) {
          console.log('📄 示例URL:');
          locMatches.slice(0, 5).forEach((match, index) => {
            const url = match.match(/<loc>([^<]+)<\/loc>/)[1];
            console.log(`   ${index + 1}. ${url}`);
          });
          if (locMatches.length > 5) {
            console.log(`   ... 还有 ${locMatches.length - 5} 个URL`);
          }
        }
      }
    }

    console.log(`✅ ${filePath} 验证通过`);
    return true;

  } catch (error) {
    console.error(`❌ 验证 ${filePath} 时出错:`, error.message);
    return false;
  }
}

function main() {
  console.log('🧪 Sitemap 验证测试');
  console.log('='.repeat(50));

  const publicDir = path.join(__dirname, 'public');
  const sitemapFiles = [
    path.join(publicDir, 'sitemap.xml'),
    path.join(publicDir, 'sitemap-0.xml'),
    path.join(publicDir, 'robots.txt')
  ];

  let allValid = true;

  sitemapFiles.forEach(file => {
    if (file.endsWith('.xml')) {
      const isValid = validateSitemapXML(file);
      allValid = allValid && isValid;
    } else if (file.endsWith('robots.txt')) {
      // 检查robots.txt
      console.log(`\n🔍 检查文件: ${file}`);
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        console.log('✅ robots.txt 内容:');
        console.log(content);
      } else {
        console.error(`❌ 文件不存在: ${file}`);
        allValid = false;
      }
    }
  });

  console.log('\n' + '='.repeat(50));
  if (allValid) {
    console.log('🎉 所有sitemap文件验证通过！');
    console.log('\n📋 总结:');
    console.log('   ✅ sitemap.xml (索引文件)');
    console.log('   ✅ sitemap-0.xml (URL集合)');
    console.log('   ✅ robots.txt');
    console.log('\n🚀 建议的下一步:');
    console.log('   1. 重新部署到生产环境');
    console.log('   2. 访问 https://www.herbscience.shop/sitemap.xml 验证');
    console.log('   3. 在Google Search Console重新提交sitemap');
  } else {
    console.log('❌ 存在问题，请检查上述错误');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateSitemapXML }; 