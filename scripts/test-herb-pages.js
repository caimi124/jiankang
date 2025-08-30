#!/usr/bin/env node

/**
 * 🌿 草药详情页面测试脚本
 * 用于验证修复是否成功
 */

// 引入必要的模块
const http = require('http');
const fs = require('fs');
const path = require('path');

// 测试配置
const TEST_HOST = 'localhost';
const TEST_PORT = 3000;
const TEST_TIMEOUT = 5000; // 5秒超时
const TEST_HERBS = [
  'ginseng',
  'ginger',
  'turmeric',
  'ashwagandha',
  'echinacea'
];

console.log('🧪 开始测试草药详情页面...\n');

// 创建测试环境文件
async function createTestEnv() {
  console.log('📝 创建测试环境变量...');
  
  const envContent = `# 测试环境配置
NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder-project-id-123456789
NEXT_PUBLIC_SANITY_DATASET=development
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=placeholder-token
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
`;

  try {
    const envPath = path.join(process.cwd(), '.env.test');
    fs.writeFileSync(envPath, envContent);
    console.log('✅ 测试环境变量已创建:', envPath);
    return true;
  } catch (error) {
    console.error('❌ 创建环境变量失败:', error.message);
    return false;
  }
}

// 测试单个页面
function testPage(path) {
  return new Promise((resolve) => {
    const url = `http://${TEST_HOST}:${TEST_PORT}${path}`;
    console.log(`🔍 测试页面: ${url}`);
    
    const req = http.get(url, (res) => {
      const { statusCode } = res;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (statusCode === 200) {
          console.log(`✅ 页面可访问: ${path} (HTTP ${statusCode})`);
          resolve({ success: true, path, statusCode });
        } else {
          console.log(`❌ 页面错误: ${path} (HTTP ${statusCode})`);
          resolve({ success: false, path, statusCode });
        }
      });
    });
    
    req.on('error', (error) => {
      console.error(`❌ 请求失败: ${path} - ${error.message}`);
      resolve({ success: false, path, error: error.message });
    });
    
    req.setTimeout(TEST_TIMEOUT, () => {
      req.destroy();
      console.error(`⏱️ 请求超时: ${path}`);
      resolve({ success: false, path, error: 'Timeout' });
    });
  });
}

// 运行所有测试
async function runTests() {
  // 测试首页
  const results = [];
  results.push(await testPage('/'));
  
  // 测试草药列表页
  results.push(await testPage('/herb-finder'));
  
  // 测试草药详情页
  for (const herb of TEST_HERBS) {
    results.push(await testPage(`/herbs/${herb}`));
  }
  
  // 统计结果
  const success = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('\n📊 测试结果汇总:');
  console.log(`总计: ${results.length} 个页面`);
  console.log(`成功: ${success} 个页面`);
  console.log(`失败: ${failed} 个页面`);
  
  if (failed === 0) {
    console.log('\n🎉 所有页面测试通过！修复成功！');
  } else {
    console.log('\n⚠️ 部分页面测试失败，请查看上方日志。');
  }
  
  return { success, failed, total: results.length };
}

// 主函数
async function main() {
  await createTestEnv();
  console.log('\n⚠️ 请确保开发服务器正在运行 (npm run dev)');
  console.log('⚠️ 如果服务器未运行，请在另一个终端窗口启动它\n');
  
  console.log('🚀 3秒后开始测试...');
  setTimeout(async () => {
    await runTests();
  }, 3000);
}

// 执行主函数
main().catch(error => {
  console.error('❌ 测试过程中发生错误:', error);
  process.exit(1);
});
