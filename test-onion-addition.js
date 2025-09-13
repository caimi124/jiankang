// 测试洋葱数据是否正确添加到数据库
const fs = require('fs');

console.log('🧅 测试洋葱数据添加...');

// 读取文件内容
const fileContent = fs.readFileSync('./lib/herbs-data-complete.ts', 'utf8');

// 检查洋葱是否存在
const hasOnion = fileContent.includes('"english_name": "Onion"');
const hasOnionId = fileContent.includes('onion-1757692057323-4ethdd');

console.log('洋葱英文名存在:', hasOnion ? '✅' : '❌');
console.log('洋葱ID存在:', hasOnionId ? '✅' : '❌');

// 检查数组结构
const lines = fileContent.split('\n');
const arrayStart = lines.findIndex(line => line.includes('export const HERBS_DATABASE'));
const arrayEnd = lines.findIndex((line, index) => index > arrayStart && line.includes('];'));

console.log('HERBS_DATABASE数组开始行:', arrayStart + 1);
console.log('HERBS_DATABASE数组结束行:', arrayEnd + 1);

if (arrayEnd === -1) {
  console.log('❌ 数组没有正确结束');
} else {
  console.log('✅ 数组结构看起来正确');
}

// 查找最后几个条目
const lastFewLines = lines.slice(Math.max(0, arrayEnd - 20), arrayEnd + 1);
console.log('\n最后20行:');
lastFewLines.forEach((line, index) => {
  const lineNum = Math.max(0, arrayEnd - 20) + index + 1;
  console.log(`${lineNum}: ${line}`);
});