const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'herbs-data-complete.ts');

console.log('🔧 正在删除重复的Turmeric记录...\n');

// 读取文件内容
let content = fs.readFileSync(filePath, 'utf8');

// 解析TS文件，提取数据数组
const dataMatch = content.match(/export const HERBS_DATABASE: Herb\[\] = (\[[\s\S]*?\n\],)/);
if (!dataMatch) {
  console.error('❌ 无法解析数据结构');
  process.exit(1);
}

// 解析JSON数据
const dataString = dataMatch[1].slice(0, -1); // 移除最后的逗号
const herbs = JSON.parse(dataString);

console.log(`📊 原始记录数: ${herbs.length}`);

// 查找turmeric记录
const turmericRecords = herbs.filter(herb => 
  herb.chinese_name?.includes('Turmeric') || 
  herb.chinese_name?.includes('姜黄') ||
  herb.english_name?.includes('姜黄')
);

console.log(`🔍 找到 ${turmericRecords.length} 条Turmeric相关记录:\n`);

turmericRecords.forEach((record, index) => {
  console.log(`--- 记录 ${index + 1} ---`);
  console.log(`ID: ${record.id}`);
  console.log(`中文名: ${record.chinese_name}`);
  console.log(`英文名: ${record.english_name}`);
  console.log(`功效: ${record.primary_effects?.join(', ')}`);
  console.log(`描述长度: ${record.description?.length || 0} 字符`);
  console.log('');
});

// 决策：保留内容最详细的记录（ID: 2156f14b-923c-808d-a02c-c608534c256a）
// 删除ID: 2156f14b-923c-8156-b583-da887bc753e3 的所有记录

const idToKeep = '2156f14b-923c-808d-a02c-c608534c256a';
const idToRemove = '2156f14b-923c-8156-b583-da887bc753e3';

// 使用Set来去重（基于ID）
const seen = new Set();
const dedupedHerbs = herbs.filter(herb => {
  // 如果是要删除的ID，直接跳过
  if (herb.id === idToRemove) {
    console.log(`🗑️  删除: ${herb.chinese_name} (ID: ${herb.id})`);
    return false;
  }
  
  // 对其他记录进行去重
  if (seen.has(herb.id)) {
    console.log(`🗑️  删除重复: ${herb.chinese_name} (ID: ${herb.id})`);
    return false;
  }
  
  seen.add(herb.id);
  return true;
});

console.log(`\n✅ 去重后记录数: ${dedupedHerbs.length}`);
console.log(`📉 删除了 ${herbs.length - dedupedHerbs.length} 条重复记录\n`);

// 重新构建文件内容
const newDataString = JSON.stringify(dedupedHerbs, null, 2);
const newContent = content.replace(
  /export const HERBS_DATABASE: Herb\[\] = \[[\s\S]*?\n\],/,
  `export const HERBS_DATABASE: Herb[] = ${newDataString},`
);

// 创建备份
const backupPath = filePath + '.backup-' + Date.now();
fs.writeFileSync(backupPath, content);
console.log(`📦 原文件已备份到: ${path.basename(backupPath)}`);

// 写入新文件
fs.writeFileSync(filePath, newContent);
console.log(`✅ 文件已更新: lib/herbs-data-complete.ts`);
console.log(`\n🎉 完成！请检查网站，确认只显示一个Turmeric记录`);

