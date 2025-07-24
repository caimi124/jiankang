#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

/**
 * 🔍 HerbScience.shop Google收录诊断和修复工具
 * 
 * 功能：
 * 1. 检测网站收录障碍
 * 2. 验证SEO配置
 * 3. 提供修复建议
 * 4. 自动提交到搜索引擎
 */

class GoogleIndexingDiagnostic {
  constructor() {
    this.domain = 'www.herbscience.shop';
    this.protocol = 'https';
    this.baseUrl = `${this.protocol}://${this.domain}`;
    this.issues = [];
    this.recommendations = [];
  }

  // 1. 检查robots.txt
  async checkRobotsTxt() {
    console.log('🤖 检查 robots.txt...');
    
    try {
      const response = await this.makeRequest('/robots.txt');
      
      if (response.includes('Disallow: /')) {
        this.issues.push('❌ robots.txt完全禁止爬虫访问');
        this.recommendations.push('修改robots.txt允许搜索引擎爬取');
      } else if (response.includes('User-agent: *\nAllow: /')) {
        console.log('✅ robots.txt配置正确');
      }
      
      if (!response.includes('Sitemap:')) {
        this.issues.push('❌ robots.txt缺少sitemap声明');
        this.recommendations.push('在robots.txt中添加Sitemap: URL');
      }
      
    } catch (error) {
      this.issues.push('❌ 无法访问robots.txt文件');
      this.recommendations.push('创建robots.txt文件');
    }
  }

  // 2. 检查sitemap.xml
  async checkSitemap() {
    console.log('🗺️ 检查 sitemap.xml...');
    
    try {
      const response = await this.makeRequest('/sitemap.xml');
      
      if (response.includes('<html>')) {
        this.issues.push('❌ sitemap.xml返回HTML而非XML格式');
        this.recommendations.push('修复sitemap生成，确保返回正确的XML格式');
      } else if (response.includes('<sitemapindex>')) {
        console.log('✅ sitemap.xml格式正确');
        
        // 检查sitemap中的URL数量
        const urlCount = (response.match(/<sitemap>/g) || []).length;
        console.log(`📊 包含 ${urlCount} 个sitemap文件`);
      }
      
    } catch (error) {
      this.issues.push('❌ sitemap.xml不可访问');
      this.recommendations.push('生成并部署sitemap.xml文件');
    }
  }

  // 3. 检查关键页面可访问性
  async checkKeyPages() {
    console.log('📄 检查关键页面...');
    
    const keyPages = [
      '/',
      '/zh',
      '/herbs/ginseng', 
      '/herbs/turmeric',
      '/constitution-test',
      '/herb-finder',
      '/blog'
    ];

    for (const page of keyPages) {
      try {
        const response = await this.makeRequest(page);
        
        if (response.includes('<title>') && !response.includes('404')) {
          console.log(`✅ ${page} - 可访问`);
        } else {
          this.issues.push(`❌ ${page} - 返回404或无效内容`);
        }
        
      } catch (error) {
        this.issues.push(`❌ ${page} - 无法访问`);
      }
    }
  }

  // 4. 检查Meta标签和SEO设置
  async checkSEOMetaTags() {
    console.log('🏷️ 检查SEO元标签...');
    
    try {
      const response = await this.makeRequest('/');
      
      // 检查基本SEO标签
      const checks = [
        { tag: '<title>', name: 'Title标签' },
        { tag: 'name="description"', name: 'Description meta标签' },
        { tag: 'property="og:title"', name: 'Open Graph标签' },
        { tag: 'name="viewport"', name: 'Viewport标签' }
      ];

      checks.forEach(check => {
        if (response.includes(check.tag)) {
          console.log(`✅ ${check.name} - 存在`);
        } else {
          this.issues.push(`❌ 缺少${check.name}`);
        }
      });

      // 检查Google验证代码
      if (response.includes('google-site-verification')) {
        if (response.includes('your-google-site-verification-code') || 
            response.includes('your-actual-verification-code')) {
          this.issues.push('❌ Google验证代码仍为占位符');
          this.recommendations.push('设置真实的Google Search Console验证代码');
        } else {
          console.log('✅ Google验证代码 - 已设置');
        }
      } else {
        this.issues.push('❌ 缺少Google Search Console验证代码');
        this.recommendations.push('添加Google Search Console验证meta标签');
      }
      
    } catch (error) {
      this.issues.push('❌ 无法检查首页SEO设置');
    }
  }

  // 5. 检查结构化数据
  async checkStructuredData() {
    console.log('🏗️ 检查结构化数据...');
    
    try {
      const response = await this.makeRequest('/');
      
      if (response.includes('application/ld+json')) {
        console.log('✅ 结构化数据 - 已实现');
      } else {
        this.issues.push('❌ 缺少JSON-LD结构化数据');
        this.recommendations.push('添加Schema.org结构化数据标记');
      }
      
    } catch (error) {
      this.issues.push('❌ 无法检查结构化数据');
    }
  }

  // 6. 生成Google Search Console设置指南
  generateGoogleConsoleGuide() {
    const guide = `
# 🔧 Google Search Console 完整设置指南

## 第一步：验证网站所有权

### 方法1：HTML标签验证（推荐）
1. 访问 https://search.google.com/search-console/
2. 点击"添加属性" → 选择"URL前缀"
3. 输入：https://www.herbscience.shop
4. 选择"HTML标签"验证方法
5. 复制提供的meta标签，类似：
   \`\`\`html
   <meta name="google-site-verification" content="ABC123..." />
   \`\`\`
6. 将标签添加到 app/layout.tsx 文件：
   \`\`\`javascript
   verification: {
     google: 'ABC123...',  // 只需要content值
   },
   \`\`\`
7. 重新部署网站
8. 返回Google Search Console点击"验证"

### 方法2：HTML文件验证
1. 下载Google提供的HTML文件
2. 上传到网站根目录 (public/ 文件夹)
3. 确保文件可通过 https://www.herbscience.shop/google123.html 访问

## 第二步：提交Sitemap

验证成功后：
1. 在左侧菜单选择"站点地图"
2. 输入sitemap URL：sitemap.xml
3. 点击"提交"
4. 等待Google处理（通常24-48小时）

## 第三步：请求编入索引

对于重要页面：
1. 使用"网址检查"工具
2. 输入具体页面URL
3. 点击"请求编入索引"
4. 对以下页面执行此操作：
   - https://www.herbscience.shop/
   - https://www.herbscience.shop/zh
   - https://www.herbscience.shop/herbs/ginseng
   - https://www.herbscience.shop/constitution-test

## 第四步：监控收录状态

定期检查：
- 覆盖率报告：查看已索引页面数量
- 效果报告：监控搜索流量
- URL检查：测试特定页面索引状态
`;

    fs.writeFileSync('GOOGLE_SEARCH_CONSOLE_SETUP.md', guide);
    console.log('📝 已生成设置指南：GOOGLE_SEARCH_CONSOLE_SETUP.md');
  }

  // 7. 创建手动提交脚本
  generateSubmissionScript() {
    const script = `#!/usr/bin/env node

// 手动URL提交脚本
const urls = [
  'https://www.herbscience.shop/',
  'https://www.herbscience.shop/zh',
  'https://www.herbscience.shop/herbs/ginseng',
  'https://www.herbscience.shop/herbs/turmeric', 
  'https://www.herbscience.shop/constitution-test',
  'https://www.herbscience.shop/herb-finder',
  'https://www.herbscience.shop/blog'
];

console.log('🚀 开始提交URL到搜索引擎...');

// IndexNow API (Bing)
async function submitToIndexNow() {
  const indexNowData = {
    host: 'www.herbscience.shop',
    key: 'generate-your-key',
    keyLocation: 'https://www.herbscience.shop/indexnow-key.txt',
    urlList: urls
  };
  
  console.log('📤 准备提交到IndexNow API (Bing)');
  console.log('💡 提示：需要设置IndexNow密钥才能自动提交');
}

// 手动提交指引
console.log('\\n📋 手动提交清单：');
console.log('1. Google Search Console: 使用URL检查工具逐个提交');
console.log('2. Bing Webmaster Tools: 提交sitemap'); 
console.log('3. 等待24-48小时查看收录状态');

submitToIndexNow();
`;

    fs.writeFileSync('submit-urls-manually.js', script);
    console.log('📄 已生成手动提交脚本：submit-urls-manually.js');
  }

  // HTTP请求助手函数
  makeRequest(path) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.domain,
        port: 443,
        path: path,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-Checker/1.0)'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}`));
          }
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.end();
    });
  }

  // 主检测流程
  async runDiagnostic() {
    console.log('🚀 开始 HerbScience.shop Google收录诊断...\n');

    try {
      await this.checkRobotsTxt();
      await this.checkSitemap();
      await this.checkKeyPages();
      await this.checkSEOMetaTags();
      await this.checkStructuredData();
      
      console.log('\n📊 诊断报告：');
      
      if (this.issues.length === 0) {
        console.log('🎉 恭喜！网站SEO配置良好，应该可以被Google正常收录');
        console.log('💡 如果仍未收录，可能需要1-2周时间等待Google处理');
      } else {
        console.log('⚠️ 发现以下问题：');
        this.issues.forEach(issue => console.log('  ' + issue));
        
        console.log('\n🔧 修复建议：');
        this.recommendations.forEach(rec => console.log('  • ' + rec));
      }

      // 生成指南和脚本
      this.generateGoogleConsoleGuide();
      this.generateSubmissionScript();
      
      console.log('\n📋 后续步骤：');
      console.log('1. 按照修复建议解决发现的问题');
      console.log('2. 查看 GOOGLE_SEARCH_CONSOLE_SETUP.md 完成设置');
      console.log('3. 使用 submit-urls-manually.js 手动提交重要页面');
      console.log('4. 等待24-48小时检查收录状态');

    } catch (error) {
      console.error('❌ 诊断过程出错：', error.message);
    }
  }
}

// 运行诊断
const diagnostic = new GoogleIndexingDiagnostic();
diagnostic.runDiagnostic(); 