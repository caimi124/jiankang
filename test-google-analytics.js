#!/usr/bin/env node

/**
 * Google Analytics 和 Tag Manager 安装验证脚本
 * 用于检查跟踪代码是否正确安装
 */

const fs = require('fs');
const path = require('path');

function checkGoogleAnalyticsInFile(filePath, fileName) {
  try {
    console.log(`\n🔍 检查文件: ${fileName}`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ 文件不存在: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查Google Analytics组件引用
    const hasGoogleAnalyticsComponent = content.includes('GoogleAnalytics');
    
    // 检查Google Tag Manager noscript组件引用
    const hasGoogleTagManagerComponent = content.includes('GoogleTagManagerNoScript');
    
    // 检查Google Analytics gtag配置
    const hasGtagConfig = content.includes('gtag(\'config\', \'G-31K0XJ79MR\')');
    
    // 检查Google Tag Manager脚本
    const hasGTMScript = content.includes('googletagmanager.com/gtm.js');
    
    // 检查Google Tag Manager noscript
    const hasGTMNoscript = content.includes('googletagmanager.com/ns.html');
    
    console.log(`   📊 Google Analytics组件: ${hasGoogleAnalyticsComponent ? '✅' : '❌'}`);
    console.log(`   📋 Google Tag Manager组件: ${hasGoogleTagManagerComponent ? '✅' : '❌'}`);
    
    const isComplete = hasGoogleAnalyticsComponent && hasGoogleTagManagerComponent;
    
    if (isComplete) {
      console.log(`✅ ${fileName} - Google Analytics和Tag Manager安装完整`);
    } else {
      console.log(`❌ ${fileName} - 缺少某些跟踪代码`);
    }
    
    return isComplete;

  } catch (error) {
    console.error(`❌ 检查 ${fileName} 时出错:`, error.message);
    return false;
  }
}

function checkComponentFile() {
  const componentPath = path.join(__dirname, 'components', 'GoogleAnalytics.tsx');
  console.log(`\n🔍 检查组件文件: GoogleAnalytics.tsx`);
  
  if (!fs.existsSync(componentPath)) {
    console.error(`❌ 组件文件不存在: ${componentPath}`);
    return false;
  }

  const content = fs.readFileSync(componentPath, 'utf8');
  
  // 检查各种必要的元素
  const hasGoogleAnalyticsId = content.includes('G-31K0XJ79MR');
  const hasGTMId = content.includes('GTM-T5ZM339M');
  const hasScriptComponent = content.includes('import Script from \'next/script\'');
  const hasClientDirective = content.includes('\'use client\'');
  const hasNoscriptComponent = content.includes('GoogleTagManagerNoScript');
  
  console.log(`   📦 Next.js Script组件: ${hasScriptComponent ? '✅' : '❌'}`);
  console.log(`   🖥️ Client组件指令: ${hasClientDirective ? '✅' : '❌'}`);
  console.log(`   📊 GA ID (G-31K0XJ79MR): ${hasGoogleAnalyticsId ? '✅' : '❌'}`);
  console.log(`   📋 GTM ID (GTM-T5ZM339M): ${hasGTMId ? '✅' : '❌'}`);
  console.log(`   🔧 Noscript组件: ${hasNoscriptComponent ? '✅' : '❌'}`);
  
  const isComplete = hasScriptComponent && hasClientDirective && hasGoogleAnalyticsId && hasGTMId && hasNoscriptComponent;
  
  if (isComplete) {
    console.log(`✅ GoogleAnalytics组件配置完整`);
  } else {
    console.log(`❌ GoogleAnalytics组件配置不完整`);
  }
  
  return isComplete;
}

function main() {
  console.log('🧪 Google Analytics & Tag Manager 安装验证');
  console.log('='.repeat(60));

  const files = [
    {
      path: path.join(__dirname, 'app', 'layout.tsx'),
      name: 'Main Layout (English)'
    },
    {
      path: path.join(__dirname, 'app', 'zh', 'layout.tsx'),
      name: 'Chinese Layout (中文)'
    }
  ];

  let allValid = true;

  // 检查组件文件
  const componentValid = checkComponentFile();
  allValid = allValid && componentValid;

  // 检查布局文件
  files.forEach(file => {
    const isValid = checkGoogleAnalyticsInFile(file.path, file.name);
    allValid = allValid && isValid;
  });

  console.log('\n' + '='.repeat(60));
  if (allValid) {
    console.log('🎉 Google Analytics和Tag Manager安装验证通过！');
    console.log('\n📋 安装总结:');
    console.log('   ✅ Google Analytics ID: G-31K0XJ79MR');
    console.log('   ✅ Google Tag Manager ID: GTM-T5ZM339M');
    console.log('   ✅ 英文版网站 (app/layout.tsx)');
    console.log('   ✅ 中文版网站 (app/zh/layout.tsx)');
    console.log('   ✅ Next.js Script组件优化');
    console.log('   ✅ Noscript回退支持');
    console.log('\n🚀 下一步操作:');
    console.log('   1. 部署到生产环境');
    console.log('   2. 访问网站并检查浏览器开发者工具的Network标签');
    console.log('   3. 验证Google Analytics实时报告');
    console.log('   4. 检查Google Tag Manager预览模式');
    console.log('\n📊 验证方法:');
    console.log('   • 浏览器F12 → Network → 搜索 "gtag" 和 "gtm"');
    console.log('   • Google Analytics → 实时 → 概览');
    console.log('   • Google Tag Manager → 预览');
  } else {
    console.log('❌ 安装验证失败，请检查上述错误');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkGoogleAnalyticsInFile, checkComponentFile }; 