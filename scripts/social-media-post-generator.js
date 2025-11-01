/**
 * 社交媒体内容生成器
 * 
 * 使用方法:
 * node scripts/social-media-post-generator.js
 * 
 * 功能:
 * - 为每个草药页面生成社交媒体帖子
 * - 生成Twitter/Facebook/LinkedIn内容
 * - 包含hashtags和链接
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://herbscience.shop';

// 草药数据
const herbs = [
  {
    name: 'Turmeric',
    chineseName: '姜黄',
    benefits: ['Reduces inflammation', 'Supports joint health', 'Boosts immunity'],
    emoji: '🌟',
    hashtags: ['turmeric', 'curcumin', 'antiinflammatory', 'herbalmedicine']
  },
  {
    name: 'Ashwagandha',
    chineseName: '印度人参',
    benefits: ['Reduces stress', 'Improves sleep', 'Boosts energy'],
    emoji: '🧘',
    hashtags: ['ashwagandha', 'adaptogen', 'stress', 'anxiety']
  },
  {
    name: 'Ginger',
    chineseName: '生姜',
    benefits: ['Eases nausea', 'Aids digestion', 'Reduces inflammation'],
    emoji: '🫚',
    hashtags: ['ginger', 'digestion', 'nausea', 'naturalremedy']
  },
  {
    name: 'Ginseng',
    chineseName: '人参',
    benefits: ['Boosts energy', 'Enhances focus', 'Supports immune system'],
    emoji: '⚡',
    hashtags: ['ginseng', 'energy', 'focus', 'tcm']
  },
  {
    name: 'Rhodiola',
    chineseName: '红景天',
    benefits: ['Combats fatigue', 'Improves mental performance', 'Reduces stress'],
    emoji: '🏔️',
    hashtags: ['rhodiola', 'adaptogen', 'fatigue', 'mentalhealth']
  },
  {
    name: 'Cinnamon',
    chineseName: '肉桂',
    benefits: ['Regulates blood sugar', 'Rich in antioxidants', 'Supports heart health'],
    emoji: '🍂',
    hashtags: ['cinnamon', 'bloodsugar', 'antioxidants', 'health']
  }
];

// 功能页面数据
const features = [
  {
    name: 'Constitution Test',
    description: 'Discover your Traditional Chinese Medicine body type',
    url: '/constitution-test',
    emoji: '🧬',
    hashtags: ['tcm', 'bodytype', 'constitution', 'wellness']
  },
  {
    name: 'Herb Finder',
    description: 'Find the perfect herbs for your health goals',
    url: '/herb-finder',
    emoji: '🔍',
    hashtags: ['herbs', 'health', 'natural', 'wellness']
  },
  {
    name: 'Dosage Calculator',
    description: 'Get personalized herbal dosage recommendations',
    url: '/dosage-calculator',
    emoji: '💊',
    hashtags: ['dosage', 'herbs', 'safety', 'health']
  }
];

console.log('\n📱 社交媒体内容生成器\n');
console.log('=' .repeat(60));

let allPosts = {
  twitter: [],
  facebook: [],
  linkedin: []
};

// 生成草药相关帖子
console.log('\n🌿 草药推广内容:\n');

herbs.forEach((herb, index) => {
  const url = `${BASE_URL}/herbs/${herb.name.toLowerCase().replace(' ', '-')}`;
  
  // Twitter格式 (280字符限制)
  const twitterPost = {
    platform: 'Twitter',
    content: `${herb.emoji} ${herb.name} (${herb.chineseName}) Benefits:\n\n` +
             `✅ ${herb.benefits.join('\n✅ ')}\n\n` +
             `Learn more: ${url}\n\n` +
             `#${herb.hashtags.join(' #')} #herbalmedicine #naturalhealing`,
    url: url,
    herb: herb.name
  };
  
  // Facebook格式 (更详细)
  const facebookPost = {
    platform: 'Facebook',
    content: `${herb.emoji} Discover the Power of ${herb.name} (${herb.chineseName})\n\n` +
             `🌿 Science-backed benefits:\n\n` +
             herb.benefits.map(b => `• ${b}`).join('\n') + '\n\n' +
             `💡 Did you know? ${herb.name} has been used in traditional medicine for centuries, ` +
             `and modern research supports many of its benefits.\n\n` +
             `📚 Learn more about safe usage, dosage, and potential interactions:\n` +
             `👉 ${url}\n\n` +
             `#${herb.hashtags.join(' #')} #herbalmedicine #naturalhealing #wellness`,
    url: url,
    herb: herb.name
  };
  
  // LinkedIn格式 (专业风格)
  const linkedinPost = {
    platform: 'LinkedIn',
    content: `Evidence-Based Guide: ${herb.name} (${herb.chineseName}) ${herb.emoji}\n\n` +
             `As interest in complementary medicine grows, it's crucial to understand ` +
             `the science behind traditional remedies.\n\n` +
             `${herb.name} has shown promise in:\n` +
             herb.benefits.map(b => `• ${b}`).join('\n') + '\n\n' +
             `Our comprehensive guide covers:\n` +
             `✓ Scientific research and clinical studies\n` +
             `✓ Recommended dosages and administration\n` +
             `✓ Safety considerations and contraindications\n` +
             `✓ Traditional Chinese Medicine perspective\n\n` +
             `Access the full guide: ${url}\n\n` +
             `#${herb.hashtags.join(' #')} #herbalmedicine #integrativehealth #wellness`,
    url: url,
    herb: herb.name
  };
  
  allPosts.twitter.push(twitterPost);
  allPosts.facebook.push(facebookPost);
  allPosts.linkedin.push(linkedinPost);
  
  console.log(`${index + 1}. ${herb.name} - Content generated ✅`);
});

// 生成功能页面帖子
console.log('\n🎯 功能推广内容:\n');

features.forEach((feature, index) => {
  const url = BASE_URL + feature.url;
  
  const twitterPost = {
    platform: 'Twitter',
    content: `${feature.emoji} ${feature.name}\n\n` +
             `${feature.description}\n\n` +
             `Try it now: ${url}\n\n` +
             `#${feature.hashtags.join(' #')} #health #wellness`,
    url: url,
    feature: feature.name
  };
  
  const facebookPost = {
    platform: 'Facebook',
    content: `${feature.emoji} Introducing: ${feature.name}\n\n` +
             `${feature.description}\n\n` +
             `✨ Features:\n` +
             `• Free to use\n` +
             `• Science-based recommendations\n` +
             `• Personalized results\n` +
             `• Privacy protected\n\n` +
             `Get started: ${url}\n\n` +
             `#${feature.hashtags.join(' #')} #health #wellness #herbalmedicine`,
    url: url,
    feature: feature.name
  };
  
  allPosts.facebook.push(facebookPost);
  allPosts.twitter.push(twitterPost);
  
  console.log(`${index + 1}. ${feature.name} - Content generated ✅`);
});

console.log('\n' + '='.repeat(60));
console.log('\n📊 生成统计:\n');
console.log(`• Twitter帖子: ${allPosts.twitter.length}`);
console.log(`• Facebook帖子: ${allPosts.facebook.length}`);
console.log(`• LinkedIn帖子: ${allPosts.linkedin.length}`);

// 保存到文件
const outputDir = path.join(__dirname, '..', 'social-media-content');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 保存Twitter内容
const twitterFile = path.join(outputDir, 'twitter-posts.md');
let twitterContent = `# Twitter/X 发布内容\n\n`;
twitterContent += `**生成时间:** ${new Date().toLocaleString('zh-CN')}\n\n`;
twitterContent += `**总数:** ${allPosts.twitter.length}条推文\n\n`;
twitterContent += `## 使用说明\n\n`;
twitterContent += `1. 复制下面的内容\n`;
twitterContent += `2. 登录 Twitter.com\n`;
twitterContent += `3. 粘贴并发布\n`;
twitterContent += `4. **建议:** 每天发布1-2条,不要一次发完\n\n`;
twitterContent += `---\n\n`;

allPosts.twitter.forEach((post, index) => {
  twitterContent += `## 第${index + 1}条 - ${post.herb || post.feature}\n\n`;
  twitterContent += `\`\`\`\n${post.content}\n\`\`\`\n\n`;
  twitterContent += `**字符数:** ${post.content.length}/280\n\n`;
  twitterContent += `---\n\n`;
});

fs.writeFileSync(twitterFile, twitterContent, 'utf8');

// 保存Facebook内容
const facebookFile = path.join(outputDir, 'facebook-posts.md');
let facebookContent = `# Facebook 发布内容\n\n`;
facebookContent += `**生成时间:** ${new Date().toLocaleString('zh-CN')}\n\n`;
facebookContent += `**总数:** ${allPosts.facebook.length}条帖子\n\n`;
facebookContent += `---\n\n`;

allPosts.facebook.forEach((post, index) => {
  facebookContent += `## 第${index + 1}条 - ${post.herb || post.feature}\n\n`;
  facebookContent += `${post.content}\n\n`;
  facebookContent += `**建议配图:** 搜索 "${post.herb || post.feature} herbs" 的高质量图片\n\n`;
  facebookContent += `---\n\n`;
});

fs.writeFileSync(facebookFile, facebookContent, 'utf8');

// 保存LinkedIn内容
const linkedinFile = path.join(outputDir, 'linkedin-posts.md');
let linkedinContent = `# LinkedIn 发布内容\n\n`;
linkedinContent += `**生成时间:** ${new Date().toLocaleString('zh-CN')}\n\n`;
linkedinContent += `**总数:** ${allPosts.linkedin.length}条帖子\n\n`;
linkedinContent += `---\n\n`;

allPosts.linkedin.forEach((post, index) => {
  linkedinContent += `## 第${index + 1}条 - ${post.herb}\n\n`;
  linkedinContent += `${post.content}\n\n`;
  linkedinContent += `---\n\n`;
});

fs.writeFileSync(linkedinFile, linkedinContent, 'utf8');

// 生成发布计划
const scheduleFile = path.join(outputDir, '30-day-posting-schedule.md');
let scheduleContent = `# 30天社交媒体发布计划\n\n`;
scheduleContent += `**开始日期:** ${new Date().toISOString().split('T')[0]}\n\n`;
scheduleContent += `## 策略\n\n`;
scheduleContent += `• **频率:** 每天2-3条帖子\n`;
scheduleContent += `• **时间:** 早上9点、下午2点、晚上7点\n`;
scheduleContent += `• **平台:** Twitter + Facebook + LinkedIn\n\n`;
scheduleContent += `---\n\n`;

for (let day = 1; day <= 30; day++) {
  const date = new Date();
  date.setDate(date.getDate() + (day - 1));
  const dateStr = date.toISOString().split('T')[0];
  
  scheduleContent += `## Day ${day} - ${dateStr}\n\n`;
  
  // 每天轮换不同的草药
  const herbIndex = (day - 1) % herbs.length;
  const herb = herbs[herbIndex];
  
  scheduleContent += `### 早上 9:00 - Twitter\n`;
  scheduleContent += `📄 文件: twitter-posts.md - 第${herbIndex + 1}条\n`;
  scheduleContent += `🌿 内容: ${herb.name}\n\n`;
  
  scheduleContent += `### 下午 2:00 - Facebook\n`;
  scheduleContent += `📄 文件: facebook-posts.md - 第${herbIndex + 1}条\n`;
  scheduleContent += `🌿 内容: ${herb.name}\n\n`;
  
  if (day % 3 === 0) {
    scheduleContent += `### 晚上 7:00 - LinkedIn\n`;
    scheduleContent += `📄 文件: linkedin-posts.md - 第${Math.floor(day / 3)}条\n`;
    scheduleContent += `🌿 内容: ${herb.name}\n\n`;
  }
  
  scheduleContent += `**完成:** [ ] Twitter  [ ] Facebook  [ ] LinkedIn\n\n`;
  scheduleContent += `---\n\n`;
}

fs.writeFileSync(scheduleFile, scheduleContent, 'utf8');

console.log('\n✅ 内容已生成并保存:\n');
console.log(`📄 ${twitterFile}`);
console.log(`📄 ${facebookFile}`);
console.log(`📄 ${linkedinFile}`);
console.log(`📅 ${scheduleFile}`);

console.log('\n💡 下一步:\n');
console.log('1. 查看生成的内容文件');
console.log('2. 按照30天计划发布');
console.log('3. 监控互动和点击');
console.log('4. 调整内容策略\n');

console.log('🎉 完成! 祝社交媒体营销成功!\n');

