/**
 * 中文页面404问题诊断工具
 * 检查所有中文页面的可访问性
 */

const https = require('https');

const pagesToCheck = [
  { url: 'https://herbscience.shop/zh/', name: '中文首页' },
  { url: 'https://herbscience.shop/zh/blog', name: '中文博客' },
  { url: 'https://herbscience.shop/zh/herb-finder', name: '中文草药查找器' },
  { url: 'https://herbscience.shop/zh/constitution-test', name: '中文体质测试' },
  { url: 'https://herbscience.shop/zh/dosage-calculator', name: '中文剂量计算器' },
  { url: 'https://herbscience.shop/zh/about', name: '中文关于页面' },
  { url: 'https://herbscience.shop/zh/privacy', name: '中文隐私政策' },
  { url: 'https://herbscience.shop/zh/articles', name: '中文文章列表' },
];

function checkPage(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const is404 = res.statusCode === 404 || 
                      data.includes('404') || 
                      data.includes('Page Not Found') ||
                      data.includes('页面未找到');
        
        resolve({
          statusCode: res.statusCode,
          is404: is404,
          contentLength: data.length,
          hasContent: data.length > 1000,
          preview: data.substring(0, 200)
        });
      });
    });

    req.on('error', (e) => {
      resolve({
        statusCode: 0,
        is404: true,
        error: e.message
      });
    });

    req.end();
  });
}

async function runDiagnostics() {
  console.log('\n==============================================');
  console.log('  中文页面404问题诊断报告');
  console.log('==============================================\n');
  console.log(`检查时间: ${new Date().toLocaleString('zh-CN')}\n`);

  const results = [];

  for (const page of pagesToCheck) {
    console.log(`检查: ${page.name}`);
    console.log(`URL: ${page.url}`);
    
    const result = await checkPage(page.url);
    results.push({ ...page, ...result });
    
    if (result.error) {
      console.log(`❌ 错误: ${result.error}`);
    } else if (result.is404) {
      console.log(`❌ 状态: 404 或页面显示404内容`);
    } else if (result.statusCode === 200 && result.hasContent) {
      console.log(`✅ 状态: ${result.statusCode} - 正常`);
      console.log(`   内容长度: ${result.contentLength} bytes`);
    } else {
      console.log(`⚠️ 状态: ${result.statusCode} - 可疑`);
      console.log(`   内容长度: ${result.contentLength} bytes`);
    }
    console.log('---');
  }

  console.log('\n==============================================');
  console.log('  诊断总结');
  console.log('==============================================\n');

  const normalPages = results.filter(r => r.statusCode === 200 && r.hasContent && !r.is404);
  const errorPages = results.filter(r => r.is404 || r.error || r.statusCode !== 200);
  const suspiciousPages = results.filter(r => r.statusCode === 200 && !r.hasContent);

  console.log(`✅ 正常页面: ${normalPages.length}/${pagesToCheck.length}`);
  console.log(`❌ 错误页面: ${errorPages.length}/${pagesToCheck.length}`);
  console.log(`⚠️ 可疑页面: ${suspiciousPages.length}/${pagesToCheck.length}`);

  if (errorPages.length > 0) {
    console.log('\n有问题的页面:');
    errorPages.forEach(p => {
      console.log(`  - ${p.name} (${p.url})`);
      if (p.error) {
        console.log(`    错误: ${p.error}`);
      } else {
        console.log(`    状态码: ${p.statusCode}`);
      }
    });
  }

  if (suspiciousPages.length > 0) {
    console.log('\n可疑页面 (状态200但内容少):');
    suspiciousPages.forEach(p => {
      console.log(`  - ${p.name} (${p.url})`);
      console.log(`    内容长度: ${p.contentLength} bytes`);
    });
  }

  console.log('\n==============================================');
  console.log('  建议的修复措施');
  console.log('==============================================\n');

  if (errorPages.length === 0 && suspiciousPages.length === 0) {
    console.log('✅ 所有页面正常，未发现404问题！');
    console.log('\n如果您在浏览器中看到404，可能的原因:');
    console.log('  1. 浏览器缓存问题 - 清除缓存并刷新');
    console.log('  2. CDN缓存问题 - 等待CDN缓存更新');
    console.log('  3. 客户端JavaScript错误 - 检查浏览器控制台');
    console.log('  4. 动态内容加载失败 - 检查API端点');
  } else {
    console.log('发现问题，建议采取以下措施:');
    console.log('  1. 检查Vercel部署日志');
    console.log('  2. 验证文件路径是否正确');
    console.log('  3. 检查middleware.ts重定向规则');
    console.log('  4. 清除Vercel缓存并重新部署');
    console.log('  5. 检查next.config.js的路由配置');
  }

  console.log('\n==============================================\n');
}

runDiagnostics().catch(console.error);

