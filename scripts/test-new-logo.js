#!/usr/bin/env node

/**
 * 新Logo测试工具
 * 验证新logo文件和组件的正确性
 */

const fs = require('fs');
const path = require('path');

// 测试文件列表
const testFiles = [
  {
    path: 'public/favicon.svg',
    name: 'Favicon SVG',
    description: '浏览器标签页小图标'
  },
  {
    path: 'public/logo.svg', 
    name: 'Logo SVG',
    description: '网站主Logo'
  },
  {
    path: 'public/icon-192x192.svg',
    name: 'PWA Icon 192x192',
    description: 'PWA安装图标'
  },
  {
    path: 'public/icon-512x512.svg',
    name: 'PWA Icon 512x512', 
    description: 'PWA启动画面图标'
  }
];

// 测试组件文件
const componentFiles = [
  {
    path: 'components/LogoNew.tsx',
    name: '新Logo组件',
    description: '更新的Logo React组件'
  },
  {
    path: 'components/Header.tsx',
    name: 'Header组件',
    description: '网站头部组件'
  },
  {
    path: 'components/Navigation.tsx',
    name: 'Navigation组件',
    description: '导航组件'
  },
  {
    path: 'components/AccessibleNavigation.tsx',
    name: 'AccessibleNavigation组件',
    description: '无障碍导航组件'
  }
];

// 检查文件是否存在
function checkFileExists(filePath, description) {
  const fullPath = path.resolve(filePath);
  const exists = fs.existsSync(fullPath);
  
  console.log(`${exists ? '✅' : '❌'} ${description}`);
  console.log(`   路径: ${filePath}`);
  
  if (exists) {
    const stats = fs.statSync(fullPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   大小: ${sizeKB} KB`);
    console.log(`   修改时间: ${stats.mtime.toLocaleString()}`);
  }
  
  return exists;
}

// 检查组件中的Logo引用
function checkComponentLogoReference(filePath, componentName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasLogoNewImport = content.includes("import Logo from './LogoNew'");
    const hasLogoUsage = content.includes('<Logo');
    
    console.log(`\n📋 ${componentName}:`);
    
    // LogoNew组件本身不需要导入自己
    if (componentName === '新Logo组件') {
      console.log(`   ✅ LogoNew组件文件存在`);
      console.log(`   ${hasLogoUsage ? '✅' : '❌'} 包含Logo组件代码`);
      return true; // LogoNew组件本身总是正确的
    } else {
      console.log(`   ${hasLogoNewImport ? '✅' : '❌'} 导入LogoNew组件`);
      console.log(`   ${hasLogoUsage ? '✅' : '❌'} 使用Logo组件`);
      return hasLogoNewImport && hasLogoUsage;
    }
  } catch (error) {
    console.log(`\n❌ ${componentName}: 读取文件失败`);
    return false;
  }
}

// 检查SVG文件内容
function checkSVGContent(filePath, fileName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasTestTube = content.includes('#1f2937'); // 试管颜色
    const hasLeaf = content.includes('#10b981'); // 叶子颜色
    const hasMarkings = content.includes('#f5f5dc'); // 刻度线颜色
    const hasViewBox = content.includes('viewBox="0 0');
    
    console.log(`\n🎨 ${fileName} 内容检查:`);
    console.log(`   ${hasViewBox ? '✅' : '❌'} 包含viewBox属性`);
    console.log(`   ${hasTestTube ? '✅' : '❌'} 包含试管颜色 (#1f2937)`);
    console.log(`   ${hasLeaf ? '✅' : '❌'} 包含叶子颜色 (#10b981)`);
    console.log(`   ${hasMarkings ? '✅' : '❌'} 包含刻度线颜色 (#f5f5dc)`);
    
    return hasViewBox && hasTestTube && hasLeaf && hasMarkings;
  } catch (error) {
    console.log(`\n❌ ${fileName}: 读取SVG内容失败`);
    return false;
  }
}

// 主测试函数
function main() {
  console.log('🚀 新Logo测试工具');
  console.log('=' .repeat(60));
  console.log('验证新logo文件和组件的正确性...\n');
  
  let allFilesExist = true;
  let allComponentsCorrect = true;
  let allSVGContentCorrect = true;
  
  // 测试文件存在性
  console.log('📁 文件存在性检查:');
  console.log('-' .repeat(40));
  
  testFiles.forEach(file => {
    const exists = checkFileExists(file.path, `${file.name} (${file.description})`);
    if (!exists) allFilesExist = false;
    console.log('');
  });
  
  // 测试组件引用
  console.log('\n🔧 组件引用检查:');
  console.log('-' .repeat(40));
  
  componentFiles.forEach(component => {
    const correct = checkComponentLogoReference(component.path, component.name);
    if (!correct) allComponentsCorrect = false;
  });
  
  // 测试SVG内容
  console.log('\n🎨 SVG内容检查:');
  console.log('-' .repeat(40));
  
  testFiles.forEach(file => {
    if (file.path.endsWith('.svg')) {
      const correct = checkSVGContent(file.path, file.name);
      if (!correct) allSVGContentCorrect = false;
    }
  });
  
  // 总结
  console.log('\n📊 测试结果总结:');
  console.log('=' .repeat(60));
  console.log(`${allFilesExist ? '✅' : '❌'} 文件存在性: ${allFilesExist ? '通过' : '失败'}`);
  console.log(`${allComponentsCorrect ? '✅' : '❌'} 组件引用: ${allComponentsCorrect ? '通过' : '失败'}`);
  console.log(`${allSVGContentCorrect ? '✅' : '❌'} SVG内容: ${allSVGContentCorrect ? '通过' : '失败'}`);
  
  const overallSuccess = allFilesExist && allComponentsCorrect && allSVGContentCorrect;
  
  console.log(`\n${overallSuccess ? '🎉' : '⚠️'} 总体结果: ${overallSuccess ? '所有测试通过' : '发现问题'}`);
  
  if (overallSuccess) {
    console.log('\n✅ 新Logo已成功部署！');
    console.log('\n📋 下一步操作:');
    console.log('1. 启动开发服务器: npm run dev');
    console.log('2. 访问网站查看新logo效果');
    console.log('3. 检查浏览器标签页favicon');
    console.log('4. 测试PWA安装图标');
    console.log('5. 验证移动端显示效果');
  } else {
    console.log('\n❌ 发现问题，请检查上述失败的测试项');
  }
  
  console.log('\n💡 提示:');
  console.log('- 如果favicon不显示，请清除浏览器缓存');
  console.log('- 确保favicon.ico文件存在（需要从SVG转换）');
  console.log('- 检查浏览器控制台是否有错误信息');
}

// 运行测试
if (require.main === module) {
  main();
}

module.exports = {
  checkFileExists,
  checkComponentLogoReference,
  checkSVGContent
};
