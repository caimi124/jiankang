#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

/**
 * HerbScience.shop 谷歌收录提交脚本
 * 自动检查和提交网站到Google Search Console
 */

const config = {
  domain: 'www.herbscience.shop',
  sitemap: 'https://www.herbscience.shop/sitemap.xml',
  urls: [
    'https://www.herbscience.shop',
    'https://www.herbscience.shop/zh',
    'https://www.herbscience.shop/herb-finder',
    'https://www.herbscience.shop/constitution-test',
    'https://www.herbscience.shop/ingredient-checker',
    'https://www.herbscience.shop/knowledge-center',
    'https://www.herbscience.shop/herbs/ginseng',
    'https://www.herbscience.shop/herbs/ginger', 
    'https://www.herbscience.shop/herbs/turmeric'
  ]
};

class GoogleIndexingChecker {
  constructor() {
    this.results = {
      sitemapStatus: null,
      robotsStatus: null,
      urlStatuses: [],
      recommendations: []
    };
  }

  // 检查sitemap可访问性
  async checkSitemap() {
    console.log('🔍 检查 Sitemap 状态...');
    
    return new Promise((resolve) => {
      https.get(config.sitemap, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          this.results.sitemapStatus = {
            status: res.statusCode,
            accessible: res.statusCode === 200,
            size: data.length,
            urlCount: (data.match(/<url>/g) || []).length
          };
          
          if (res.statusCode === 200) {
            console.log('✅ Sitemap 可访问');
            console.log(`   - URL数量: ${this.results.sitemapStatus.urlCount}`);
          } else {
            console.log('❌ Sitemap 无法访问');
            this.results.recommendations.push('修复Sitemap访问问题');
          }
          resolve();
        });
      }).on('error', () => {
        this.results.sitemapStatus = { accessible: false, error: 'Network error' };
        console.log('❌ Sitemap 网络错误');
        resolve();
      });
    });
  }

  // 检查robots.txt
  async checkRobots() {
    console.log('🔍 检查 Robots.txt 状态...');
    
    return new Promise((resolve) => {
      https.get(`https://${config.domain}/robots.txt`, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          this.results.robotsStatus = {
            status: res.statusCode,
            accessible: res.statusCode === 200,
            allowsGoogle: data.includes('User-agent: *') && data.includes('Allow: /'),
            hasSitemap: data.includes('Sitemap:')
          };
          
          if (res.statusCode === 200) {
            console.log('✅ Robots.txt 可访问');
            console.log(`   - 允许谷歌爬取: ${this.results.robotsStatus.allowsGoogle ? '是' : '否'}`);
            console.log(`   - 包含Sitemap: ${this.results.robotsStatus.hasSitemap ? '是' : '否'}`);
          } else {
            console.log('❌ Robots.txt 无法访问');
          }
          resolve();
        });
      }).on('error', () => {
        this.results.robotsStatus = { accessible: false, error: 'Network error' };
        resolve();
      });
    });
  }

  // 检查主要URL的状态
  async checkUrls() {
    console.log('🔍 检查关键页面状态...');
    
    for (const url of config.urls) {
      await new Promise((resolve) => {
        https.get(url, (res) => {
          const urlStatus = {
            url,
            status: res.statusCode,
            accessible: res.statusCode === 200,
            hasMetaTitle: false,
            hasMetaDescription: false
          };

          if (res.statusCode === 200) {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
              urlStatus.hasMetaTitle = /<title>/i.test(data);
              urlStatus.hasMetaDescription = /<meta[^>]*name=["\']description["\'][^>]*>/i.test(data);
              
              this.results.urlStatuses.push(urlStatus);
              console.log(`   ✅ ${url} - 状态良好`);
              resolve();
            });
          } else {
            this.results.urlStatuses.push(urlStatus);
            console.log(`   ❌ ${url} - 状态码: ${res.statusCode}`);
            resolve();
          }
        }).on('error', () => {
          this.results.urlStatuses.push({
            url,
            accessible: false,
            error: 'Network error'
          });
          console.log(`   ❌ ${url} - 网络错误`);
          resolve();
        });
      });
    }
  }

  // 生成Google Search Console验证指南
  generateSearchConsoleGuide() {
    const guide = `
# 🔍 Google Search Console 设置指南

## 1. 添加网站属性
1. 访问 https://search.google.com/search-console/
2. 点击 "添加属性"
3. 选择 "URL前缀" 
4. 输入: https://www.herbscience.shop

## 2. 验证网站所有权
推荐使用以下验证方法：

### 方法1: HTML标签验证（推荐）
1. 在Search Console中选择 "HTML标签" 验证方法
2. 复制提供的meta标签
3. 将标签添加到 app/layout.tsx 的 <head> 部分：
   \`\`\`
   <meta name="google-site-verification" content="您的验证码" />
   \`\`\`

### 方法2: Google Analytics验证
如果您已使用Google Analytics：
1. 确保使用相同的Google账户
2. 选择 "Google Analytics" 验证方法
3. 自动验证完成

## 3. 提交Sitemap
验证成功后：
1. 在左侧菜单选择 "站点地图"
2. 添加新的站点地图: sitemap.xml
3. 点击 "提交"

## 4. 监控索引状态
- 覆盖率报告: 检查已索引/未索引页面
- URL检查工具: 测试特定URL的索引状态
- 效果报告: 查看搜索表现数据

## 当前网站SEO状态
✅ Sitemap: ${this.results.sitemapStatus?.accessible ? '正常' : '需要修复'}
✅ Robots.txt: ${this.results.robotsStatus?.accessible ? '正常' : '需要修复'}
✅ 页面可访问性: ${this.results.urlStatuses.filter(u => u.accessible).length}/${this.results.urlStatuses.length} 正常

## 建议的优化步骤
${this.results.recommendations.length > 0 ? this.results.recommendations.map(r => `- ${r}`).join('\n') : '- 当前网站SEO配置良好，可直接提交到Google Search Console'}
`;

    fs.writeFileSync('GOOGLE_SEARCH_CONSOLE_GUIDE.md', guide);
    console.log('\n📝 已生成 Google Search Console 设置指南: GOOGLE_SEARCH_CONSOLE_GUIDE.md');
  }

  // 运行完整检查
  async runFullCheck() {
    console.log('🚀 开始 HerbScience.shop 谷歌收录检查...\n');

    await this.checkSitemap();
    await this.checkRobots();
    await this.checkUrls();

    // 生成建议
    if (this.results.sitemapStatus?.accessible && this.results.robotsStatus?.accessible) {
      this.results.recommendations.push('网站基础SEO配置良好，可以提交到Google Search Console');
    }

    if (this.results.urlStatuses.every(u => u.accessible)) {
      this.results.recommendations.push('所有关键页面都可正常访问');
    }

    // 生成指南
    this.generateSearchConsoleGuide();

    // 输出摘要
    console.log('\n📊 检查摘要:');
    console.log(`✅ Sitemap状态: ${this.results.sitemapStatus?.accessible ? '正常' : '异常'}`);
    console.log(`✅ Robots.txt状态: ${this.results.robotsStatus?.accessible ? '正常' : '异常'}`);
    console.log(`✅ 可访问页面: ${this.results.urlStatuses.filter(u => u.accessible).length}/${this.results.urlStatuses.length}`);

    console.log('\n🎯 后续步骤:');
    console.log('1. 查看生成的 GOOGLE_SEARCH_CONSOLE_GUIDE.md 文件');
    console.log('2. 按照指南设置 Google Search Console');
    console.log('3. 提交网站sitemap');
    console.log('4. 监控索引状态和搜索表现');

    return this.results;
  }
}

// 运行检查
if (require.main === module) {
  const checker = new GoogleIndexingChecker();
  checker.runFullCheck().catch(console.error);
}

module.exports = GoogleIndexingChecker; 