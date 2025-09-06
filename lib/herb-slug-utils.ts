/**
 * 草药Slug生成工具 - 确保前端和后端一致
 */

export function generateHerbSlug(chineseName: string, englishName: string, herbId?: string): string {
  // 优先使用英文名称
  let name = englishName || chineseName || 'unknown-herb'
  
  // 清理名称：移除括号中的内容，移除特殊字符
  name = name
    .replace(/\([^)]*\)/g, '') // 移除括号内容 
    .replace(/（[^）]*）/g, '') // 移除中文括号内容
    .replace(/\s*\/\s*.*$/g, '') // 移除斜杠后的内容
    .trim()
  
  // 生成slug
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, '-')           // 空格替换为连字符
    .replace(/[^\w\-\u4e00-\u9fff]/g, '') // 只保留字母数字连字符和中文
    .replace(/\-\-+/g, '-')        // 多个连字符替换为单个
    .replace(/^-+|-+$/g, '')       // 移除首尾连字符
  
  // 如果生成失败，使用备用方案
  return slug || (herbId ? 'herb-' + herbId : 'herb-' + Date.now())
}

export function normalizeSlug(slug: string): string {
  return slug.toLowerCase().trim()
    .replace(/[^a-z0-9\-]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
}