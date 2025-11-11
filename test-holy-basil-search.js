// 测试 Holy Basil 是否在搜索数据库中
const { HERBS_DATABASE } = require('./lib/herbs-data-complete.ts');

console.log('==========================================');
console.log('测试 Holy Basil 搜索功能');
console.log('==========================================\n');

console.log(`总草药数量: ${HERBS_DATABASE.length}`);

// 1. 直接查找 Holy Basil
const holyBasil = HERBS_DATABASE.find(h => 
  h.id === 'holy-basil-2025' || 
  h.english_name === 'Holy Basil' ||
  h.chinese_name === '圣罗勒'
);

if (holyBasil) {
  console.log('\n✅ 找到 Holy Basil！');
  console.log('----------------------------');
  console.log('ID:', holyBasil.id);
  console.log('英文名:', holyBasil.english_name);
  console.log('中文名:', holyBasil.chinese_name);
  console.log('拉丁名:', holyBasil.latin_name);
  console.log('类别:', holyBasil.category);
  console.log('主要功效:', holyBasil.primary_effects);
  console.log('搜索关键词:', holyBasil.efficacy);
  console.log('描述:', holyBasil.description.substring(0, 100) + '...');
} else {
  console.log('\n❌ 未找到 Holy Basil！');
  console.log('数据库最后3条记录:');
  const last3 = HERBS_DATABASE.slice(-3);
  last3.forEach((h, idx) => {
    console.log(`\n${idx + 1}. ${h.english_name} (${h.chinese_name})`);
    console.log(`   ID: ${h.id}`);
  });
}

// 2. 模拟搜索 "Holy Basil"
console.log('\n==========================================');
console.log('模拟搜索: "Holy Basil"');
console.log('==========================================\n');

const searchTerm = 'Holy Basil';
const searchTerms = searchTerm.toLowerCase().split(/\s+/).filter(term => term.length > 0);

const searchResults = HERBS_DATABASE.filter(herb => {
  const searchableText = [
    herb.chinese_name,
    herb.english_name, 
    herb.latin_name,
    herb.description,
    ...(herb.efficacy || []),
    ...(herb.primary_effects || [])
  ].join(' ').toLowerCase();
  
  return searchTerms.every(term => searchableText.includes(term));
});

console.log(`搜索结果数量: ${searchResults.length}`);
if (searchResults.length > 0) {
  console.log('搜索结果:');
  searchResults.forEach((h, idx) => {
    console.log(`${idx + 1}. ${h.english_name} (${h.chinese_name})`);
  });
} else {
  console.log('❌ 未找到任何结果');
}

// 3. 模拟搜索 "圣罗勒"
console.log('\n==========================================');
console.log('模拟搜索: "圣罗勒"');
console.log('==========================================\n');

const searchTerm2 = '圣罗勒';
const searchResults2 = HERBS_DATABASE.filter(herb => {
  const searchableText = [
    herb.chinese_name,
    herb.english_name, 
    herb.latin_name,
    herb.description,
    ...(herb.efficacy || []),
    ...(herb.primary_effects || [])
  ].join(' ').toLowerCase();
  
  return searchableText.includes(searchTerm2.toLowerCase());
});

console.log(`搜索结果数量: ${searchResults2.length}`);
if (searchResults2.length > 0) {
  console.log('搜索结果:');
  searchResults2.forEach((h, idx) => {
    console.log(`${idx + 1}. ${h.english_name} (${h.chinese_name})`);
  });
} else {
  console.log('❌ 未找到任何结果');
}

// 4. 模拟搜索 "压力"
console.log('\n==========================================');
console.log('模拟搜索: "压力"');
console.log('==========================================\n');

const searchTerm3 = '压力';
const searchResults3 = HERBS_DATABASE.filter(herb => {
  const searchableText = [
    herb.chinese_name,
    herb.english_name, 
    herb.latin_name,
    herb.description,
    ...(herb.efficacy || []),
    ...(herb.primary_effects || [])
  ].join(' ').toLowerCase();
  
  return searchableText.includes(searchTerm3.toLowerCase());
});

console.log(`搜索结果数量: ${searchResults3.length}`);
if (searchResults3.length > 0) {
  const holyBasilInResults = searchResults3.find(h => h.english_name === 'Holy Basil' || h.chinese_name === '圣罗勒');
  if (holyBasilInResults) {
    console.log('✅ Holy Basil 在"压力"搜索结果中');
  } else {
    console.log('❌ Holy Basil 不在"压力"搜索结果中');
  }
  console.log('前5个搜索结果:');
  searchResults3.slice(0, 5).forEach((h, idx) => {
    console.log(`${idx + 1}. ${h.english_name} (${h.chinese_name})`);
  });
} else {
  console.log('❌ 未找到任何结果');
}

