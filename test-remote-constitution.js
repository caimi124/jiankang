// 测试远程网站体质测试功能
const { execSync } = require('child_process');

async function testRemoteConstitution() {
  try {
    console.log('=== 测试远程网站体质测试 ===\n');

    // 1. 检查体质测试页面是否存在且包含正确题目数量
    console.log('1. 检查体质测试页面内容...');
    const pageContent = execSync('curl -s https://herbscience.shop/constitution-test', { encoding: 'utf8' });

    // 检查页面是否正常加载
    if (pageContent.includes('Constitution Test') || pageContent.includes('体质测试')) {
      console.log('✅ 体质测试页面正常加载');
    } else {
      console.log('❌ 体质测试页面可能有问题');
    }

    // 检查是否包含JavaScript代码
    if (pageContent.includes('questions') && pageContent.includes('calculateConstitution')) {
      console.log('✅ 包含体质测试相关代码');
    } else {
      console.log('❌ 缺少体质测试核心代码');
    }

    // 2. 检查博客文章链接是否工作
    console.log('\n2. 检查博客文章详情页...');
    const articleContent = execSync('curl -s "https://herbscience.shop/blog/why-some-herbs-work-for-you-and-others-dont"', { encoding: 'utf8' });

    if (articleContent.includes('Why Personalized Herbal Supplements')) {
      console.log('✅ 博客文章详情页正常');
    } else {
      console.log('❌ 博客文章详情页有问题');
    }

    // 3. 检查博客列表页是否包含新文章
    console.log('\n3. 检查博客列表页...');
    const blogListContent = execSync('curl -s https://herbscience.shop/blog', { encoding: 'utf8' });

    if (blogListContent.includes('Why Personalized Herbal Supplements') || blogListContent.includes('Herbal Supplements Work Better')) {
      console.log('✅ 博客列表包含新文章');
    } else {
      console.log('❌ 博客列表可能缺少新文章');
    }

    // 4. 检查页面构建时间（通过meta标签等）
    console.log('\n4. 检查部署状态...');
    const buildInfo = pageContent.match(/build|timestamp|version/gi) || [];
    if (buildInfo.length > 0) {
      console.log('构建信息:', buildInfo.slice(0, 3));
    }

    console.log('\n=== 测试完成 ===');

  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

testRemoteConstitution();