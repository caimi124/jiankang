/**
 * 检查所有页面的 SEO Title 和 Description 长度
 * SEO 最佳实践：
 * - Title: 50-60 字符
 * - Description: 150-160 字符
 */

const fs = require('fs');
const path = require('path');

// 递归查找所有 page.tsx 文件
function findPageFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // 跳过 node_modules 和 .next
      if (item !== 'node_modules' && item !== '.next' && item !== 'sanity') {
        findPageFiles(fullPath, files);
      }
    } else if (item === 'page.tsx') {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 提取 metadata 中的 title 和 description
function extractMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 提取 title
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const title = titleMatch ? titleMatch[1] : null;
  
  // 提取 description
  const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
  const description = descMatch ? descMatch[1] : null;
  
  return { title, description };
}

// 主函数
function main() {
  console.log('🔍 检查所有页面的 SEO Title 和 Description 长度...\n');
  
  const appDir = path.join(__dirname, '..', 'app');
  const pageFiles = findPageFiles(appDir);
  
  const issues = [];
  const passed = [];
  
  for (const file of pageFiles) {
    const relativePath = path.relative(appDir, file);
    const { title, description } = extractMetadata(file);
    
    if (!title && !description) {
      // 动态页面，跳过
      continue;
    }
    
    const titleLength = title ? title.length : 0;
    const descLength = description ? description.length : 0;
    
    const hasTitleIssue = titleLength > 60;
    const hasDescIssue = descLength > 160 || descLength < 120;
    
    if (hasTitleIssue || hasDescIssue) {
      issues.push({
        file: relativePath,
        title,
        titleLength,
        description,
        descLength,
        hasTitleIssue,
        hasDescIssue
      });
    } else if (title || description) {
      passed.push({
        file: relativePath,
        titleLength,
        descLength
      });
    }
  }
  
  // 输出有问题的页面
  if (issues.length > 0) {
    console.log('❌ 发现 SEO 问题：\n');
    
    for (const issue of issues) {
      console.log(`📄 ${issue.file}`);
      
      if (issue.hasTitleIssue) {
        console.log(`  ⚠️  Title 太长: ${issue.titleLength} 字符 (推荐 ≤60)`);
        console.log(`      "${issue.title}"`);
      }
      
      if (issue.hasDescIssue) {
        console.log(`  ⚠️  Description ${issue.descLength > 160 ? '太长' : '太短'}: ${issue.descLength} 字符 (推荐 150-160)`);
        console.log(`      "${issue.description}"`);
      }
      
      console.log('');
    }
    
    console.log(`\n❌ 总计 ${issues.length} 个页面需要优化\n`);
  }
  
  // 输出通过检查的页面
  if (passed.length > 0) {
    console.log(`✅ ${passed.length} 个页面通过 SEO 检查\n`);
  }
  
  // 统计
  console.log('📊 统计：');
  console.log(`   总检查页面: ${issues.length + passed.length}`);
  console.log(`   有问题: ${issues.length}`);
  console.log(`   通过: ${passed.length}`);
  console.log(`   通过率: ${Math.round((passed.length / (issues.length + passed.length)) * 100)}%\n`);
  
  // 如果有问题，退出码为 1
  process.exit(issues.length > 0 ? 1 : 0);
}

main();

