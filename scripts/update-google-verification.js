#!/usr/bin/env node

/**
 * Google验证码快速更新脚本
 * 交互式更新app/layout.tsx中的Google验证码
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔍 Google Search Console 验证码更新工具\n');

console.log('📋 获取验证码步骤:');
console.log('1. 访问: https://search.google.com/search-console');
console.log('2. 添加资源: https://herbscience.shop');
console.log('3. 选择"HTML标记"验证方法');
console.log('4. 复制 content="..." 中的验证码\n');

rl.question('请输入您的Google验证码 (不包括引号): ', (verificationCode) => {
  
  if (!verificationCode || verificationCode.trim() === '') {
    console.log('❌ 验证码不能为空');
    rl.close();
    return;
  }

  // 清理输入，移除可能的引号和空格
  const cleanCode = verificationCode.trim().replace(/["']/g, '');
  
  if (cleanCode === 'your-google-verification-code-here') {
    console.log('❌ 请输入实际的验证码，而不是占位符');
    rl.close();
    return;
  }

  // 验证码基本格式检查
  if (cleanCode.length < 10) {
    console.log('⚠️  验证码似乎过短，请确认是否正确');
  }

  const layoutPath = path.join(process.cwd(), 'app/layout.tsx');
  
  if (!fs.existsSync(layoutPath)) {
    console.log('❌ 找不到 app/layout.tsx 文件');
    rl.close();
    return;
  }

  try {
    // 备份原文件
    const backupPath = layoutPath + '.backup.' + Date.now();
    fs.copyFileSync(layoutPath, backupPath);
    console.log(`📁 备份文件创建: ${path.basename(backupPath)}`);

    // 读取并更新文件
    let content = fs.readFileSync(layoutPath, 'utf8');
    
    // 替换验证码
    const oldPattern = /google:\s*['"]your-google-verification-code-here['"]/;
    const newValue = `google: '${cleanCode}'`;
    
    if (oldPattern.test(content)) {
      content = content.replace(oldPattern, newValue);
      fs.writeFileSync(layoutPath, content);
      
      console.log('\n✅ Google验证码更新成功!');
      console.log(`🔍 新验证码: ${cleanCode}`);
      
      // 验证更新结果
      const updatedContent = fs.readFileSync(layoutPath, 'utf8');
      if (updatedContent.includes(cleanCode)) {
        console.log('✅ 验证: 文件更新确认');
      } else {
        console.log('⚠️  警告: 更新可能未成功，请手动检查');
      }
      
      console.log('\n📋 接下来的步骤:');
      console.log('1. 测试构建: npm run build');
      console.log('2. 本地测试: npm run dev');
      console.log('3. 部署更新: git add . && git commit -m "Update Google verification" && git push');
      console.log('4. 回到Google Search Console点击"验证"');
      
      console.log('\n🎯 部署后验证:');
      console.log('- 访问您的网站');
      console.log('- 查看页面源代码');
      console.log('- 确认包含: <meta name="google-site-verification" content="' + cleanCode + '" />');
      
    } else {
      console.log('❌ 未找到验证码占位符，可能已经被修改过');
      console.log('请手动更新 app/layout.tsx 文件中的 verification.google 字段');
    }
    
  } catch (error) {
    console.log('❌ 更新失败:', error.message);
  }
  
  rl.close();
});

rl.on('close', () => {
  console.log('\n👋 感谢使用Google验证码更新工具');
});
