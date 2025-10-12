#!/usr/bin/env node

/**
 * 重定向问题测试工具
 * 测试Google Search Console报告的问题URL
 */

const https = require('https');
const http = require('http');

// 问题URL列表（来自Google Search Console报告）
const problemUrls = [
  'https://www.herbscience.shop/user-experiences',
  'https://www.herbscience.shop/herb-finder',
  'https://www.herbscience.shop/herbs/ginger',
  'https://www.herbscience.shop/blog',
  'https://www.herbscience.shop/constitution-test',
  'https://www.herbscience.shop/about',
  'http://www.herbscience.shop/'
];

// 对应的正确URL（非www版本）
const correctUrls = [
  'https://herbscience.shop/',
  'https://herbscience.shop/herb-finder',
  'https://herbscience.shop/herbs/ginger',
  'https://herbscience.shop/blog',
  'https://herbscience.shop/constitution-test',
  'https://herbscience.shop/about',
  'https://herbscience.shop/'
];

// 测试HTTP请求
function testUrl(url, followRedirects = true) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      },
      // 不跟随重定向，手动处理
      followRedirect: false,
      timeout: 10000
    };

    const req = client.request(url, options, (res) => {
      const result = {
        url: url,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res.headers,
        location: res.headers.location,
        isRedirect: res.statusCode >= 300 && res.statusCode < 400,
        isError: res.statusCode >= 400
      };

      // 如果跟随重定向且有location头
      if (followRedirects && result.isRedirect && result.location) {
        // 递归测试重定向目标
        testUrl(result.location, false).then(targetResult => {
          resolve({
            ...result,
            finalUrl: targetResult.url,
            finalStatusCode: targetResult.statusCode,
            redirectChain: [url, result.location]
          });
        }).catch(reject);
      } else {
        resolve(result);
      }
    });

    req.on('error', (error) => {
      reject({
        url: url,
        error: error.message,
        isError: true
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({
        url: url,
        error: 'Request timeout',
        isError: true
      });
    });

    req.end();
  });
}

// 分析重定向问题
function analyzeRedirectIssues(results) {
  console.log('\n🔍 重定向问题分析:');
  console.log('=' .repeat(80));
  
  const issues = [];
  
  results.forEach((result, index) => {
    const problemUrl = problemUrls[index];
    const expectedUrl = correctUrls[index];
    
    console.log(`\n📍 测试URL: ${problemUrl}`);
    console.log(`   期望重定向到: ${expectedUrl}`);
    
    if (result.error) {
      console.log(`   ❌ 错误: ${result.error}`);
      issues.push({
        type: 'CONNECTION_ERROR',
        url: problemUrl,
        error: result.error
      });
    } else if (result.isRedirect) {
      console.log(`   🔄 重定向状态: ${result.statusCode} ${result.statusMessage}`);
      console.log(`   📍 重定向到: ${result.location}`);
      
      if (result.finalStatusCode >= 200 && result.finalStatusCode < 300) {
        console.log(`   ✅ 最终状态: ${result.finalStatusCode} (正常)`);
        
        // 检查重定向是否正确
        if (result.location && result.location.includes('herbscience.shop') && !result.location.includes('www.')) {
          console.log(`   ✅ 重定向目标正确 (非www域名)`);
        } else {
          console.log(`   ❌ 重定向目标不正确`);
          issues.push({
            type: 'INCORRECT_REDIRECT',
            url: problemUrl,
            actualTarget: result.location,
            expectedTarget: expectedUrl
          });
        }
      } else {
        console.log(`   ❌ 最终状态: ${result.finalStatusCode} (错误)`);
        issues.push({
          type: 'FINAL_ERROR',
          url: problemUrl,
          finalStatusCode: result.finalStatusCode,
          finalUrl: result.finalUrl
        });
      }
    } else if (result.statusCode >= 200 && result.statusCode < 300) {
      console.log(`   ✅ 直接访问: ${result.statusCode} (正常)`);
      if (problemUrl.includes('www.')) {
        console.log(`   ⚠️  警告: www域名直接可访问，应该重定向到非www`);
        issues.push({
          type: 'NO_REDIRECT',
          url: problemUrl,
          expectedTarget: expectedUrl
        });
      }
    } else {
      console.log(`   ❌ 错误状态: ${result.statusCode} ${result.statusMessage}`);
      issues.push({
        type: 'HTTP_ERROR',
        url: problemUrl,
        statusCode: result.statusCode,
        statusMessage: result.statusMessage
      });
    }
  });
  
  return issues;
}

// 生成修复建议
function generateFixSuggestions(issues) {
  console.log('\n🛠️  修复建议:');
  console.log('=' .repeat(80));
  
  const issueTypes = [...new Set(issues.map(i => i.type))];
  
  issueTypes.forEach(type => {
    const typeIssues = issues.filter(i => i.type === type);
    console.log(`\n📋 ${type} (${typeIssues.length}个问题):`);
    
    typeIssues.forEach(issue => {
      console.log(`   - ${issue.url}`);
      
      switch (type) {
        case 'NO_REDIRECT':
          console.log(`     建议: 添加www到非www的重定向规则`);
          break;
        case 'INCORRECT_REDIRECT':
          console.log(`     当前重定向到: ${issue.actualTarget}`);
          console.log(`     应该重定向到: ${issue.expectedTarget}`);
          break;
        case 'FINAL_ERROR':
          console.log(`     最终URL返回错误: ${issue.finalStatusCode}`);
          break;
        case 'CONNECTION_ERROR':
          console.log(`     连接错误: ${issue.error}`);
          break;
        case 'HTTP_ERROR':
          console.log(`     HTTP错误: ${issue.statusCode} ${issue.statusMessage}`);
          break;
      }
    });
  });
  
  console.log('\n🔧 具体修复步骤:');
  console.log('1. 检查vercel.json中的重定向配置');
  console.log('2. 确保所有www域名重定向到非www');
  console.log('3. 检查HTTP到HTTPS的重定向');
  console.log('4. 验证重定向目标URL是否可访问');
  console.log('5. 重新部署后测试所有URL');
}

// 主函数
async function main() {
  console.log('🚀 重定向问题诊断工具');
  console.log('=' .repeat(80));
  console.log('测试Google Search Console报告的问题URL...\n');
  
  const results = [];
  
  // 测试所有问题URL
  for (let i = 0; i < problemUrls.length; i++) {
    const url = problemUrls[i];
    console.log(`测试 ${i + 1}/${problemUrls.length}: ${url}`);
    
    try {
      const result = await testUrl(url);
      results.push(result);
      console.log(`   ✅ 完成`);
    } catch (error) {
      results.push(error);
      console.log(`   ❌ 失败: ${error.error || error.message}`);
    }
    
    // 避免请求过于频繁
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // 分析结果
  const issues = analyzeRedirectIssues(results);
  
  // 生成修复建议
  generateFixSuggestions(issues);
  
  // 总结
  console.log('\n📊 测试总结:');
  console.log(`✅ 正常: ${results.filter(r => !r.isError && (!r.isRedirect || r.finalStatusCode >= 200 && r.finalStatusCode < 300)).length}个URL`);
  console.log(`❌ 问题: ${issues.length}个URL`);
  
  if (issues.length === 0) {
    console.log('\n🎉 所有URL重定向正常！');
  } else {
    console.log('\n⚠️  发现问题，需要修复重定向配置。');
  }
}

// 运行测试
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testUrl,
  analyzeRedirectIssues,
  generateFixSuggestions
};
