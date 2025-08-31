import { blogPost } from './blogPost'
import { author } from './author'
import { category } from './category'
import { tag } from './tag'
import { siteSettings } from './siteSettings'
import { herb } from './herb'
import { faq } from './faq'
import { dosage } from './dosage'
import { study } from './study'

export const schemaTypes = [
  // 博客相关
  blogPost,
  author,
  category,
  tag,
  
  // 草药相关
  herb,
  faq,
  dosage,
  study,
  
  // 站点设置
  siteSettings,
] 