const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function findTSXFiles(dir) {
  const files = []
  
  function walkDir(currentDir) {
    const items = fs.readdirSync(currentDir)
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        walkDir(fullPath)
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath)
      }
    }
  }
  
  walkDir(dir)
  return files
}

function extractLinks(content) {
  const links = []
  
  // 匹配 href= 链接
  const hrefMatches = content.match(/href=["'](\/[^"']*?)["']/g)
  if (hrefMatches) {
    hrefMatches.forEach(match => {
      const url = match.match(/href=["'](\/[^"']*?)["']/)[1]
      links.push({ type: 'href', url, line: getLineNumber(content, match) })
    })
  }
  
  // 匹配 Link href= 
  const linkMatches = content.match(/<Link[^>]*href=["'](\/[^"']*?)["']/g)
  if (linkMatches) {
    linkMatches.forEach(match => {
      const url = match.match(/href=["'](\/[^"']*?)["']/)[1]
      links.push({ type: 'Link', url, line: getLineNumber(content, match) })
    })
  }
  
  // 匹配动态路由重定向
  const redirectMatches = content.match(/window\.location\.href\s*=\s*["'`](\/[^"'`]*?)["'`]/g)
  if (redirectMatches) {
    redirectMatches.forEach(match => {
      const url = match.match(/=\s*["'`](\/[^"'`]*?)["'`]/)[1]
      links.push({ type: 'redirect', url, line: getLineNumber(content, match) })
    })
  }
  
  return links
}

function getLineNumber(content, searchString) {
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(searchString.substring(0, 20))) {
      return i + 1
    }
  }
  return 0
}

function checkPathExists(urlPath) {
  // 移除查询参数
  const cleanPath = urlPath.split('?')[0].split('#')[0]
  
  // 检查静态页面
  const possiblePaths = [
    `app${cleanPath}/page.tsx`,
    `app${cleanPath}.tsx`,
    `pages${cleanPath}.tsx`,
    `pages${cleanPath}/index.tsx`,
    `public${cleanPath}`,
    `public${cleanPath}.html`
  ]
  
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return { exists: true, type: 'static', path: possiblePath }
    }
  }
  
  // 检查动态路由
  const pathSegments = cleanPath.split('/').filter(Boolean)
  let currentPath = 'app'
  
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i]
    
    // 检查具体路径
    const specificPath = path.join(currentPath, segment)
    if (fs.existsSync(specificPath)) {
      currentPath = specificPath
      continue
    }
    
    // 检查动态路由 [slug]
    const dynamicPath = path.join(currentPath, '[slug]')
    if (fs.existsSync(dynamicPath)) {
      currentPath = dynamicPath
      continue
    }
    
    // 检查其他动态模式
    const dynamicPatterns = ['[id]', '[...slug]', '[...params]']
    let found = false
    for (const pattern of dynamicPatterns) {
      const patternPath = path.join(currentPath, pattern)
      if (fs.existsSync(patternPath)) {
        currentPath = patternPath
        found = true
        break
      }
    }
    
    if (!found) {
      return { exists: false, type: 'unknown', path: cleanPath }
    }
  }
  
  // 检查最终页面文件
  const finalPagePath = path.join(currentPath, 'page.tsx')
  if (fs.existsSync(finalPagePath)) {
    return { exists: true, type: 'dynamic', path: finalPagePath }
  }
  
  return { exists: false, type: 'missing_page', path: cleanPath }
}

function analyzeHerbsData() {
  try {
    const herbsDataPath = 'lib/herbs-data.ts'
    if (!fs.existsSync(herbsDataPath)) {
      log('yellow', '⚠️  Herbs data file not found')
      return []
    }
    
    const content = fs.readFileSync(herbsDataPath, 'utf8')
    const issues = []
    
    // 检查是否有重复的ID
    const idMatches = content.match(/id:\s*['"]([^'"]+)['"]/g)
    if (idMatches) {
      const ids = idMatches.map(match => match.match(/id:\s*['"]([^'"]+)['"]/)[1])
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
      if (duplicates.length > 0) {
        issues.push(`Duplicate herb IDs found: ${duplicates.join(', ')}`)
      }
    }
    
    return issues
  } catch (error) {
    log('red', `Error analyzing herbs data: ${error.message}`)
    return [`Error reading herbs data: ${error.message}`]
  }
}

function checkApiRoutes() {
  const apiIssues = []
  const apiDir = 'app/api'
  
  if (!fs.existsSync(apiDir)) {
    return ['API directory not found']
  }
  
  // 检查重要的API路由
  const importantApis = [
    'herbs/[slug]/route.ts',
    'blog/[slug]/route.ts',
    'herbs/data/route.ts'
  ]
  
  importantApis.forEach(api => {
    const apiPath = path.join(apiDir, api)
    if (!fs.existsSync(apiPath)) {
      apiIssues.push(`Missing API route: ${api}`)
    } else {
      // 检查API文件内容
      try {
        const content = fs.readFileSync(apiPath, 'utf8')
        if (!content.includes('export') || !content.includes('NextResponse')) {
          apiIssues.push(`API route ${api} may have implementation issues`)
        }
      } catch (error) {
        apiIssues.push(`Error reading API route ${api}: ${error.message}`)
      }
    }
  })
  
  return apiIssues
}

function generateReport(results) {
  const timestamp = new Date().toISOString()
  const reportContent = `
# 404 Link Check Report
Generated: ${timestamp}

## Summary
- Total files checked: ${results.totalFiles}
- Total links found: ${results.totalLinks}
- Broken links: ${results.brokenLinks.length}
- Warnings: ${results.warnings.length}
- API issues: ${results.apiIssues.length}
- Herbs data issues: ${results.herbsIssues.length}

## Broken Links
${results.brokenLinks.map(link => 
  `- **${link.url}** in \`${link.file}:${link.line}\` (${link.type})`
).join('\n')}

## Warnings
${results.warnings.map(warning => `- ${warning}`).join('\n')}

## API Issues
${results.apiIssues.map(issue => `- ${issue}`).join('\n')}

## Herbs Data Issues
${results.herbsIssues.map(issue => `- ${issue}`).join('\n')}

## Recommendations
${generateRecommendations(results)}
`

  fs.writeFileSync('LINK_CHECK_REPORT.md', reportContent)
  log('green', '📄 Report saved to LINK_CHECK_REPORT.md')
}

function generateRecommendations(results) {
  const recommendations = []
  
  if (results.brokenLinks.length > 0) {
    recommendations.push('1. **Fix broken links**: Review and update the broken links listed above')
    recommendations.push('2. **Add redirects**: Consider adding redirects in next.config.js for moved pages')
  }
  
  if (results.apiIssues.length > 0) {
    recommendations.push('3. **Fix API routes**: Ensure all dynamic API routes are properly implemented')
  }
  
  if (results.herbsIssues.length > 0) {
    recommendations.push('4. **Clean herbs data**: Fix any data integrity issues in the herbs database')
  }
  
  recommendations.push('5. **Monitor 404s**: Use the /api/404-monitor endpoint to track real user 404 errors')
  recommendations.push('6. **Regular checks**: Run this script regularly to catch issues early')
  
  return recommendations.join('\n')
}

function main() {
  log('cyan', '🔍 Starting broken link check...')
  
  const results = {
    totalFiles: 0,
    totalLinks: 0,
    brokenLinks: [],
    warnings: [],
    apiIssues: [],
    herbsIssues: []
  }
  
  // 检查TSX文件中的链接
  const files = findTSXFiles('app')
  results.totalFiles = files.length
  
  log('blue', `📁 Found ${files.length} files to check`)
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8')
      const links = extractLinks(content)
      results.totalLinks += links.length
      
      for (const link of links) {
        const check = checkPathExists(link.url)
        if (!check.exists) {
          results.brokenLinks.push({
            file: file.replace(process.cwd(), ''),
            url: link.url,
            line: link.line,
            type: link.type,
            reason: check.type
          })
        }
      }
    } catch (error) {
      results.warnings.push(`Error reading ${file}: ${error.message}`)
    }
  }
  
  // 检查API路由
  log('blue', '🔌 Checking API routes...')
  results.apiIssues = checkApiRoutes()
  
  // 检查草药数据
  log('blue', '🌿 Checking herbs data integrity...')
  results.herbsIssues = analyzeHerbsData()
  
  // 输出结果
  log('bright', '\n📊 RESULTS:')
  log('green', `✅ Total files checked: ${results.totalFiles}`)
  log('blue', `🔗 Total links found: ${results.totalLinks}`)
  
  if (results.brokenLinks.length > 0) {
    log('red', `❌ Broken links: ${results.brokenLinks.length}`)
    results.brokenLinks.forEach(link => {
      log('red', `  - ${link.url} in ${link.file}:${link.line}`)
    })
  } else {
    log('green', '✅ No broken links found!')
  }
  
  if (results.warnings.length > 0) {
    log('yellow', `⚠️  Warnings: ${results.warnings.length}`)
    results.warnings.forEach(warning => log('yellow', `  - ${warning}`))
  }
  
  if (results.apiIssues.length > 0) {
    log('red', `🔌 API issues: ${results.apiIssues.length}`)
    results.apiIssues.forEach(issue => log('red', `  - ${issue}`))
  }
  
  if (results.herbsIssues.length > 0) {
    log('red', `🌿 Herbs data issues: ${results.herbsIssues.length}`)
    results.herbsIssues.forEach(issue => log('red', `  - ${issue}`))
  }
  
  // 生成报告
  generateReport(results)
  
  log('bright', '\n🎯 Check complete!')
  
  // 返回错误码如果有问题
  if (results.brokenLinks.length > 0 || results.apiIssues.length > 0) {
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { 
  findTSXFiles, 
  extractLinks, 
  checkPathExists, 
  analyzeHerbsData,
  checkApiRoutes
} 