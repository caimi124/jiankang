/**
 * 外链建设指导工具
 * 
 * 使用方法:
 * node scripts/backlink-builder-guide.js
 * 
 * 功能:
 * - 生成需要提交的目录网站列表
 * - 生成社交媒体账号创建清单
 * - 生成Quora/Reddit问题列表
 * - 追踪进度
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔗 外链建设助手 - HerbScience.shop\n');
console.log('=' .repeat(60));

// 目录网站提交清单
const directories = [
  {
    name: 'Google My Business',
    url: 'https://business.google.com/create',
    priority: '⭐⭐⭐⭐⭐',
    category: 'Health & Wellness',
    notes: '最重要！提供高权重反向链接',
    timeEstimate: '15分钟'
  },
  {
    name: 'Bing Places for Business',
    url: 'https://www.bingplaces.com/',
    priority: '⭐⭐⭐⭐⭐',
    category: 'Health & Wellness',
    notes: 'Bing搜索引擎的商家目录',
    timeEstimate: '10分钟'
  },
  {
    name: 'Herbpathy',
    url: 'https://www.herbpathy.com/',
    priority: '⭐⭐⭐⭐',
    category: 'Herbal Medicine',
    notes: '草药专业目录，行业相关',
    timeEstimate: '15分钟'
  },
  {
    name: 'Natural Health Directory',
    url: 'Google搜索: "natural health directory submit"',
    priority: '⭐⭐⭐⭐',
    category: 'Natural Health',
    notes: '自然健康类目录',
    timeEstimate: '10分钟'
  },
  {
    name: 'HealthWeb',
    url: 'Google搜索: "healthweb directory"',
    priority: '⭐⭐⭐',
    category: 'Health Information',
    notes: '健康信息目录',
    timeEstimate: '10分钟'
  }
];

// 社交媒体清单
const socialMedia = [
  {
    platform: 'Twitter/X',
    url: 'https://twitter.com/i/flow/signup',
    username: '@HerbScience',
    priority: '⭐⭐⭐⭐⭐',
    actions: [
      '创建账号',
      '上传头像 (使用 public/logo.png)',
      '设置简介: "Evidence-based herbal medicine guide | TCM & modern science"',
      '添加网站链接',
      '发布第1条推文'
    ],
    timeEstimate: '20分钟'
  },
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/pages/create',
    username: 'HerbScience Page',
    priority: '⭐⭐⭐⭐⭐',
    actions: [
      '创建专页',
      '类别: Health & Wellness',
      '上传头像和封面图',
      '添加"访问网站"按钮',
      '发布第1篇帖子'
    ],
    timeEstimate: '20分钟'
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/company/setup/new/',
    username: 'HerbScience',
    priority: '⭐⭐⭐⭐',
    actions: [
      '创建公司页面',
      '填写完整信息',
      '添加网站链接',
      '发布专业内容'
    ],
    timeEstimate: '15分钟'
  },
  {
    platform: 'Pinterest',
    url: 'https://www.pinterest.com/business/create/',
    username: '@HerbScience',
    priority: '⭐⭐⭐',
    actions: [
      '创建商业账号',
      '创建"Herbal Medicine"看板',
      '上传草药图片+链接',
      '简介添加网站'
    ],
    timeEstimate: '20分钟'
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/accounts/emailsignup/',
    username: '@herbscience',
    priority: '⭐⭐⭐',
    actions: [
      '创建账号',
      '设置Bio链接',
      '发布草药图片',
      '使用相关hashtags'
    ],
    timeEstimate: '15分钟'
  }
];

// Quora问题列表
const quoraQuestions = [
  'What are the benefits of turmeric?',
  'Is ashwagandha safe for long-term use?',
  'What herbs help with anxiety?',
  'Best herbs for inflammation?',
  'How does Traditional Chinese Medicine work?',
  'What is TCM body constitution?',
  'Natural remedies for better sleep?',
  'Herbs for immune system support?',
  'What herbs should I avoid?',
  'How to choose quality herbal supplements?',
  'Difference between Eastern and Western herbs?',
  'Can herbs interact with medications?',
  'Best adaptogenic herbs for stress?',
  'What herbs help with digestion?',
  'Natural alternatives to caffeine?'
];

// Reddit subreddits
const redditCommunities = [
  {
    name: 'r/herbalism',
    url: 'https://www.reddit.com/r/herbalism/',
    members: '150K+',
    strategy: '分享草药知识，回答问题，建立信任后偶尔引用网站'
  },
  {
    name: 'r/TCM',
    url: 'https://www.reddit.com/r/TCM/',
    members: '20K+',
    strategy: '讨论中医体质理论，分享专业见解'
  },
  {
    name: 'r/Supplements',
    url: 'https://www.reddit.com/r/Supplements/',
    members: '500K+',
    strategy: '提供草药补充剂建议，注重科学依据'
  },
  {
    name: 'r/AlternativeHealth',
    url: 'https://www.reddit.com/r/AlternativeHealth/',
    members: '50K+',
    strategy: '分享自然疗法经验'
  }
];

// 生成报告
console.log('\n📋 第一步：目录网站提交 (预计1-2小时)\n');
directories.forEach((dir, index) => {
  console.log(`${index + 1}. ${dir.name} ${dir.priority}`);
  console.log(`   URL: ${dir.url}`);
  console.log(`   类别: ${dir.category}`);
  console.log(`   时间: ${dir.timeEstimate}`);
  console.log(`   备注: ${dir.notes}`);
  console.log('');
});

console.log('=' .repeat(60));
console.log('\n📱 第二步：社交媒体账号创建 (预计1.5小时)\n');
socialMedia.forEach((social, index) => {
  console.log(`${index + 1}. ${social.platform} ${social.priority}`);
  console.log(`   用户名: ${social.username}`);
  console.log(`   URL: ${social.url}`);
  console.log(`   时间: ${social.timeEstimate}`);
  console.log(`   任务清单:`);
  social.actions.forEach(action => {
    console.log(`      □ ${action}`);
  });
  console.log('');
});

console.log('=' .repeat(60));
console.log('\n❓ 第三步：Quora问答 (每周目标：10个回答)\n');
console.log('搜索以下问题并提供300-500字的专业回答:\n');
quoraQuestions.forEach((question, index) => {
  console.log(`${index + 1}. "${question}"`);
});
console.log('\n策略:');
console.log('• 提供真实价值，不要只是推广');
console.log('• 回答末尾自然引用: "Learn more at HerbScience.shop"');
console.log('• 每天回答2-3个问题\n');

console.log('=' .repeat(60));
console.log('\n💬 第四步：Reddit社区参与 (持续进行)\n');
redditCommunities.forEach((subreddit, index) => {
  console.log(`${index + 1}. ${subreddit.name} (${subreddit.members} members)`);
  console.log(`   URL: ${subreddit.url}`);
  console.log(`   策略: ${subreddit.strategy}`);
  console.log('');
});
console.log('⚠️  重要提醒:');
console.log('• 先提供价值，不要直接发链接');
console.log('• 参与讨论，建立信誉');
console.log('• 在个人资料添加网站链接');
console.log('• 遵守各subreddit的规则\n');

// 生成进度追踪文件
const outputDir = path.join(__dirname, '..', 'backlink-progress');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 目录提交追踪
let directoryTracking = `# 目录网站提交进度追踪\n\n`;
directoryTracking += `**开始日期:** ${new Date().toISOString().split('T')[0]}\n\n`;
directoryTracking += `## 提交清单\n\n`;
directories.forEach((dir, index) => {
  directoryTracking += `### ${index + 1}. ${dir.name} ${dir.priority}\n\n`;
  directoryTracking += `- **URL:** ${dir.url}\n`;
  directoryTracking += `- **类别:** ${dir.category}\n`;
  directoryTracking += `- **预计时间:** ${dir.timeEstimate}\n`;
  directoryTracking += `- **状态:** [ ] 待提交  [ ] 已提交  [ ] 已通过\n`;
  directoryTracking += `- **提交日期:** _____\n`;
  directoryTracking += `- **备注:** ${dir.notes}\n\n`;
});

fs.writeFileSync(
  path.join(outputDir, 'directory-submission-tracker.md'),
  directoryTracking,
  'utf8'
);

// 社交媒体追踪
let socialTracking = `# 社交媒体账号创建进度\n\n`;
socialTracking += `**开始日期:** ${new Date().toISOString().split('T')[0]}\n\n`;
socialMedia.forEach((social, index) => {
  socialTracking += `## ${index + 1}. ${social.platform} ${social.priority}\n\n`;
  socialTracking += `- **用户名:** ${social.username}\n`;
  socialTracking += `- **URL:** ${social.url}\n`;
  socialTracking += `- **预计时间:** ${social.timeEstimate}\n\n`;
  socialTracking += `**任务清单:**\n\n`;
  social.actions.forEach(action => {
    socialTracking += `- [ ] ${action}\n`;
  });
  socialTracking += `\n**完成日期:** _____\n`;
  socialTracking += `**实际用户名:** _____\n`;
  socialTracking += `**网站链接已添加:** [ ] 是  [ ] 否\n\n`;
  socialTracking += `---\n\n`;
});

fs.writeFileSync(
  path.join(outputDir, 'social-media-tracker.md'),
  socialTracking,
  'utf8'
);

// Quora追踪
let quoraTracking = `# Quora问答进度追踪\n\n`;
quoraTracking += `**目标:** 每周回答10个问题\n`;
quoraTracking += `**开始日期:** ${new Date().toISOString().split('T')[0]}\n\n`;
quoraTracking += `## 问题列表\n\n`;
quoraQuestions.forEach((question, index) => {
  quoraTracking += `### ${index + 1}. ${question}\n\n`;
  quoraTracking += `- **状态:** [ ] 待回答  [ ] 已回答\n`;
  quoraTracking += `- **回答日期:** _____\n`;
  quoraTracking += `- **回答URL:** _____\n`;
  quoraTracking += `- **是否添加网站链接:** [ ] 是  [ ] 否\n`;
  quoraTracking += `- **获得点赞数:** _____\n\n`;
});

fs.writeFileSync(
  path.join(outputDir, 'quora-answers-tracker.md'),
  quoraTracking,
  'utf8'
);

// 每周总结模板
let weeklyTemplate = `# 外链建设周报\n\n`;
weeklyTemplate += `**周数:** 第___周\n`;
weeklyTemplate += `**日期范围:** _____ 到 _____\n\n`;
weeklyTemplate += `## 本周完成\n\n`;
weeklyTemplate += `### 目录提交\n`;
weeklyTemplate += `- 提交数量: _____\n`;
weeklyTemplate += `- 通过数量: _____\n`;
weeklyTemplate += `- 待处理: _____\n\n`;
weeklyTemplate += `### 社交媒体\n`;
weeklyTemplate += `- 创建账号数: _____\n`;
weeklyTemplate += `- 发布内容数: _____\n`;
weeklyTemplate += `- 新增粉丝: _____\n\n`;
weeklyTemplate += `### Quora回答\n`;
weeklyTemplate += `- 回答数量: _____\n`;
weeklyTemplate += `- 总点赞: _____\n`;
weeklyTemplate += `- 总浏览: _____\n\n`;
weeklyTemplate += `### Reddit参与\n`;
weeklyTemplate += `- 评论数: _____\n`;
weeklyTemplate += `- 帖子数: _____\n`;
weeklyTemplate += `- Karma增长: _____\n\n`;
weeklyTemplate += `## 外链统计\n\n`;
weeklyTemplate += `- 新增反向链接: _____\n`;
weeklyTemplate += `- 总反向链接: _____\n`;
weeklyTemplate += `- 域名权重变化: _____\n\n`;
weeklyTemplate += `## 下周计划\n\n`;
weeklyTemplate += `1. \n`;
weeklyTemplate += `2. \n`;
weeklyTemplate += `3. \n\n`;
weeklyTemplate += `## 问题和挑战\n\n`;
weeklyTemplate += `\n\n`;
weeklyTemplate += `## 学到的经验\n\n`;
weeklyTemplate += `\n`;

fs.writeFileSync(
  path.join(outputDir, 'weekly-report-template.md'),
  weeklyTemplate,
  'utf8'
);

console.log('=' .repeat(60));
console.log('\n✅ 进度追踪文件已生成:\n');
console.log(`📁 ${outputDir}/`);
console.log('   • directory-submission-tracker.md');
console.log('   • social-media-tracker.md');
console.log('   • quora-answers-tracker.md');
console.log('   • weekly-report-template.md\n');

console.log('📊 预期效果:\n');
console.log('• 第1周: 10-20个外部链接');
console.log('• 第2周: 30-40个外部链接');
console.log('• 第3周: 50-70个外部链接');
console.log('• 第4周: 80-100个外部链接\n');

console.log('💡 提示:\n');
console.log('• 每天花30-45分钟执行这些任务');
console.log('• 每周五更新周报，检查进度');
console.log('• 使用Ahrefs Free Backlink Checker追踪反向链接');
console.log('• 质量 > 数量，专注高权重链接\n');

console.log('🚀 现在就开始执行第一步: 提交Google My Business!\n');

