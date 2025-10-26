/**
 * 草药Slug生成工具 - 确保前端和后端一致
 */

export function generateHerbSlug(chineseName: string, englishName: string, herbId?: string): string {
  // 优先使用英文名称，但过滤掉待翻译标记
  let name = englishName || chineseName || 'unknown-herb'
  
  // 处理特殊情况：待翻译、空值等
  if (!name || name.includes('待翻译') || name.trim() === '') {
    name = chineseName || 'unknown-herb'
  }
  
  // 清理名称：移除括号中的内容，移除特殊字符
  name = name
    .replace(/\([^)]*\)/g, '') // 移除括号内容 
    .replace(/（[^）]*）/g, '') // 移除中文括号内容
    .replace(/\s*\/\s*.*$/g, '') // 移除斜杠后的内容
    .replace(/\s*待翻译\s*/g, '') // 移除待翻译标记
    .trim()
  
  // 生成slug
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, '-')           // 空格替换为连字符
    .replace(/[^\w\-\u4e00-\u9fff]/g, '') // 只保留字母数字连字符和中文
    .replace(/\-\-+/g, '-')        // 多个连字符替换为单个
    .replace(/^-+|-+$/g, '')       // 移除首尾连字符
  
  // 确保slug有效
  if (!slug || slug === '-' || slug.length < 2) {
    return herbId ? `herb-${herbId.slice(-8)}` : `herb-${Date.now().toString().slice(-8)}`
  }
  
  return slug
}

export function normalizeSlug(slug: string): string {
  // 首先尝试解码URL编码（处理 %E7%94%9F%E5%A7%9C 这种情况）
  let decoded = slug
  try {
    // 只有当slug包含%时才尝试解码，避免重复解码
    if (slug.includes('%')) {
      decoded = decodeURIComponent(slug)
    }
  } catch (e) {
    // 如果解码失败，使用原始slug
    decoded = slug
  }
  
  // 转换为小写并trim
  decoded = decoded.toLowerCase().trim()
  
  // 如果包含中文字符，直接返回（不做进一步normalize）
  // 这样可以在aliases中匹配中文名称如 '生姜'
  if (/[\u4e00-\u9fff]/.test(decoded)) {
    return decoded
  }
  
  // 对于英文slug，进行标准化处理
  return decoded
    .replace(/[^a-z0-9\-]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
}