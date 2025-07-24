import { blogPost } from './blogPost'
import { author } from './author'
import { category } from './category'
import { tag } from './tag'
import { siteSettings } from './siteSettings'

export const schemaTypes = [
  // 博客相关
  blogPost,
  author,
  category,
  tag,
  
  // 站点设置
  siteSettings,
] 