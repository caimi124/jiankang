/**
 * Google Search Console批量URL提交工具
 * 使用Google Indexing API快速提交新页面
 * 
 * 设置步骤：
 * 1. 访问 https://console.cloud.google.com/
 * 2. 创建服务账号并下载JSON密钥
 * 3. 将密钥重命名为 google-service-account.json
 * 4. 在Search Console中添加服务账号邮箱为所有者
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// 配置
const SITE_URL = 'https://herbscience.shop';
const SERVICE_ACCOUNT_FILE = path.join(__dirname, '../google-service-account.json');

// 优先提交的URL列表
const PRIORITY_URLS = [
  // 核心页面
  '/',
  '/constitution-test',
  '/herb-finder',
  '/blog',
  '/about',
  
  // 热门草药页（按搜索量排序）
  '/herbs/ashwagandha',
  '/herbs/turmeric',
  '/herbs/ginseng',
  '/herbs/valerian-root',
  '/herbs/chamomile',
  '/herbs/elderberry',
  '/herbs/echinacea',
  '/herbs/lions-mane',
  '/herbs/rhodiola',
  '/herbs/holy-basil',
  
  // 热门博客文章
  '/blog/best-herbs-for-sleep',
  '/blog/stress-relief-herbs',
  '/blog/immune-boosting-herbs'
];

/**
 * 初始化Google Indexing API客户端
 */
async function getAuthClient() {
  try {
    // 检查服务账号文件是否存在
    if (!fs.existsSync(SERVICE_ACCOUNT_FILE)) {
      console.error('❌ 错误：找不到服务账号密钥文件');
      console.error('📝 请按照以下步骤设置：');
      console.error('1. 访问 https://console.cloud.google.com/');
      console.error('2. 创建项目并启用 "Indexing API"');
      console.error('3. 创建服务账号并下载JSON密钥');
      console.error('4. 将密钥保存为 google-service-account.json');
      console.error('5. 在Search Console中添加服务账号为所有者');
      return null;
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_FILE,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    return await auth.getClient();
  } catch (error) {
    console.error('❌ 认证失败:', error.message);
    return null;
  }
}

/**
 * 提交单个URL到Google
 */
async function submitUrl(authClient, url, type = 'URL_UPDATED') {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  
  try {
    const indexing = google.indexing({ version: 'v3', auth: authClient });
    
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: fullUrl,
        type: type, // URL_UPDATED or URL_DELETED
      },
    });

    return { success: true, url: fullUrl, data: response.data };
  } catch (error) {
    return { success: false, url: fullUrl, error: error.message };
  }
}

/**
 * 批量提交URL
 */
async function batchSubmitUrls(urls) {
  console.log('🚀 开始批量提交URL到Google Search Console...\n');
  
  const authClient = await getAuthClient();
  if (!authClient) {
    console.error('❌ 无法初始化Google API客户端');
    return;
  }

  console.log(`📊 准备提交 ${urls.length} 个URL\n`);

  const results = {
    success: [],
    failed: []
  };

  // 批量提交（添加延迟避免触发限流）
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    
    process.stdout.write(`[${i + 1}/${urls.length}] 提交中: ${url} ... `);
    
    const result = await submitUrl(authClient, url);
    
    if (result.success) {
      console.log('✅ 成功');
      results.success.push(result.url);
    } else {
      console.log(`❌ 失败: ${result.error}`);
      results.failed.push({ url: result.url, error: result.error });
    }

    // 添加200ms延迟避免API限流
    if (i < urls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  // 打印结果汇总
  console.log('\n' + '='.repeat(60));
  console.log('📊 提交结果汇总');
  console.log('='.repeat(60));
  console.log(`✅ 成功: ${results.success.length} 个URL`);
  console.log(`❌ 失败: ${results.failed.length} 个URL`);
  
  if (results.failed.length > 0) {
    console.log('\n失败的URL：');
    results.failed.forEach(item => {
      console.log(`  - ${item.url}`);
      console.log(`    错误: ${item.error}`);
    });
  }

  console.log('\n💡 提示：');
  console.log('- Google通常在几分钟到几天内索引新提交的URL');
  console.log('- 可以在Search Console中查看索引状态');
  console.log('- 每天最多可提交200个URL（配额限制）');
  
  return results;
}

/**
 * 从sitemap读取URL
 */
function getUrlsFromSitemap(sitemapPath) {
  try {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
    
    if (!urlMatches) {
      return [];
    }

    return urlMatches.map(match => {
      const url = match.replace('<loc>', '').replace('</loc>', '');
      return url.replace(SITE_URL, ''); // 转换为相对路径
    });
  } catch (error) {
    console.error('读取sitemap失败:', error.message);
    return [];
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Google Search Console URL提交工具

用法:
  node submit-to-google-search-console.js [选项]

选项:
  --priority          提交优先级URL（默认）
  --sitemap <file>    从sitemap文件读取URL
  --url <url>         提交单个URL
  --all               提交所有页面
  -h, --help          显示帮助信息

示例:
  node submit-to-google-search-console.js --priority
  node submit-to-google-search-console.js --sitemap public/sitemap.xml
  node submit-to-google-search-console.js --url /herbs/ashwagandha
    `);
    return;
  }

  let urlsToSubmit = [];

  if (args.includes('--url')) {
    const urlIndex = args.indexOf('--url');
    const url = args[urlIndex + 1];
    urlsToSubmit = [url];
  } else if (args.includes('--sitemap')) {
    const sitemapIndex = args.indexOf('--sitemap');
    const sitemapPath = args[sitemapIndex + 1];
    urlsToSubmit = getUrlsFromSitemap(sitemapPath);
    console.log(`📄 从sitemap读取到 ${urlsToSubmit.length} 个URL`);
  } else if (args.includes('--all')) {
    // 读取所有sitemap
    const mainUrls = getUrlsFromSitemap(path.join(__dirname, '../public/sitemap.xml'));
    const herbsUrls = getUrlsFromSitemap(path.join(__dirname, '../public/sitemap-herbs.xml'));
    const blogUrls = getUrlsFromSitemap(path.join(__dirname, '../public/sitemap-blog.xml'));
    urlsToSubmit = [...new Set([...mainUrls, ...herbsUrls, ...blogUrls])];
  } else {
    // 默认提交优先级URL
    urlsToSubmit = PRIORITY_URLS;
  }

  if (urlsToSubmit.length === 0) {
    console.error('❌ 没有找到需要提交的URL');
    return;
  }

  await batchSubmitUrls(urlsToSubmit);
}

// 执行
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { submitUrl, batchSubmitUrls };

