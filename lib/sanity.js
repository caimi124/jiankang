import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity 配置
export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

// Sanity 客户端 (用于读取数据)
export const sanityClient = createClient(config)

// Sanity 客户端 (用于写入数据，需要token)
export const sanityWriteClient = createClient({
  ...config,
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

// 图片URL构建器
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}

// 常用查询
export const queries = {
  // 获取所有发布的博客文章
  allBlogPosts: `*[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author,
    categories,
    tags,
    mainImage,
    estimatedReadingTime
  }`,
  
  // 根据slug获取单篇文章
  blogPostBySlug: (slug) => `*[_type == "blogPost" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    updatedAt,
    author,
    categories,
    tags,
    mainImage,
    seo,
    relatedHerbs,
    estimatedReadingTime
  }`,
  
  // 获取相关文章
  relatedPosts: (categories, currentPostId) => `*[_type == "blogPost" && 
    count((categories[]->_id)[@ in ${JSON.stringify(categories)}]) > 0 && 
    _id != "${currentPostId}" && 
    !(_id in path("drafts.**"))] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage
  }`,
  
  // 获取所有分类
  allCategories: `*[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description
  }`,
  
  // 获取草药相关文章
  herbRelatedPosts: (herbSlug) => `*[_type == "blogPost" && 
    "${herbSlug}" in relatedHerbs[]->slug.current && 
    !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    estimatedReadingTime
  }`
} 