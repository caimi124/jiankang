// Simple JavaScript version for sitemap generation
const fs = require('fs');

function generateHerbSlug(chineseName, englishName, herbId) {
  let name = englishName || chineseName || 'unknown-herb'
  
  if (!name || name.includes('待翻译') || name.trim() === '') {
    name = chineseName || 'unknown-herb'
  }
  
  name = name
    .replace(/\([^)]*\)/g, '')
    .replace(/（[^）]*）/g, '')
    .replace(/\s*\/\s*.*$/g, '')
    .replace(/\s*待翻译\s*/g, '')
    .trim()
  
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\u4e00-\u9fff]/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+|-+$/g, '')
  
  if (!slug || slug === '-' || slug.length < 2) {
    return herbId ? `herb-${herbId.slice(-8)}` : `herb-${Date.now().toString().slice(-8)}`
  }
  
  return slug
}

function getStaticHerbSlugs() {
  try {
    // Read the TypeScript file and extract herb data
    const content = fs.readFileSync('./lib/herbs-data-complete.ts', 'utf8');
    
    // Extract all herb entries using regex
    const herbPattern = /{\s*"id":\s*"([^"]*)",[\s\S]*?"chinese_name":\s*"([^"]+)",[\s\S]*?"english_name":\s*"([^"]*)"[\s\S]*?}/g;
    let match;
    const herbs = [];
    
    while ((match = herbPattern.exec(content)) !== null) {
      const [, id, chineseName, englishName] = match;
      const slug = generateHerbSlug(chineseName, englishName, id);
      if (slug && slug !== '-' && slug.length > 1) {
        herbs.push({ slug });
      }
    }
    
    return herbs;
  } catch (e) {
    console.warn('[sitemap] Static herbs extraction failed:', e?.message)
    return []
  }
}

module.exports = {
  getStaticHerbSlugs
};