import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Sanity配置
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// 检查Sanity配置是否有效
const isValidConfig = 
  projectId && projectId !== 'your-project-id' && projectId !== 'your-project-id-here' && projectId.length > 8

// Sanity客户端
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // 生产环境使用CDN
  token: process.env.SANITY_API_TOKEN, // 用于写操作
})

// 预览模式客户端（不使用CDN，获取最新数据）
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// 获取客户端（根据预览模式）
export const getClient = (usePreview = false) => (usePreview ? previewClient : client)

// 图片URL构建器
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// 通用查询函数
export async function sanityFetch<T = any>(
  query: string,
  params: any = {},
  options: { 
    next?: { revalidate?: number | false; tags?: string[] }
    cache?: RequestCache
  } = {}
): Promise<T> {
  const { next = { revalidate: 60 }, cache = 'force-cache' } = options
  
  // 检查配置是否有效，无效则直接抛出错误
  if (!isValidConfig) {
    throw new Error('Sanity configuration is invalid or missing. Please set up valid environment variables.')
  }
  
  try {
    return await client.fetch<T>(query, params, {
      cache,
      next,
    })
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
}

// 博客相关查询
export const blogQueries = {
  // 获取所有已发布的博客文章
  getAllPosts: `
    *[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      featured,
      "author": author->{name, slug, avatar, title},
      "category": category->{title, slug, color, icon},
      "tags": tags[]->{title, slug},
      featured_image,
      seoTitle,
      seoDescription,
      seoKeywords
    }
  `,
  
  // 根据slug获取单篇文章
  getPostBySlug: `
    *[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      readTime,
      featured,
      "author": author->{name, slug, avatar, title, bio, credentials, specialties},
      "category": category->{title, slug, color, icon},
      "tags": tags[]->{title, slug},
      featured_image,
      seoTitle,
      seoDescription,
      seoKeywords,
      status
    }
  `,
  
  // 获取特色文章
  getFeaturedPosts: `
    *[_type == "blogPost" && status == "published" && featured == true] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      "author": author->{name, slug},
      "category": category->{title, slug, color, icon},
      "tags": tags[]->{title, slug},
      featured_image
    }
  `,
  
  // 根据分类获取文章
  getPostsByCategory: `
    *[_type == "blogPost" && status == "published" && category._ref == $categoryId] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      "author": author->{name, slug},
      "category": category->{title, slug, color, icon},
      featured_image
    }
  `,
  
  // 获取相关文章
  getRelatedPosts: `
    *[_type == "blogPost" && status == "published" && _id != $postId && count(tags[@._ref in *[_type == "blogPost" && _id == $postId][0].tags[]._ref]) > 0] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "author": author->{name, slug},
      "category": category->{title, slug}
    }
  `
}

// 其他查询
export const queries = {
  // 获取所有分类
  getAllCategories: `
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color,
      icon,
      "postCount": count(*[_type == "blogPost" && category._ref == ^._id && status == "published"])
    }
  `,
  
  // 获取所有标签
  getAllTags: `
    *[_type == "tag"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      "postCount": count(*[_type == "blogPost" && references(^._id) && status == "published"])
    }
  `,
  
  // 获取所有作者
  getAllAuthors: `
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      avatar,
      title,
      bio,
      credentials,
      specialties,
      "postCount": count(*[_type == "blogPost" && author._ref == ^._id && status == "published"])
    }
  `,
  
  // 获取站点设置
  getSiteSettings: `
    *[_type == "siteSettings"][0] {
      title,
      description,
      keywords,
      logo,
      favicon,
      socialMedia,
      analytics
    }
  `
}

// 类型定义
export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content?: any[]
  publishedAt: string
  readTime: number
  featured: boolean
  author: Author
  category: Category
  tags: Tag[]
  featured_image?: any
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  status: 'draft' | 'published' | 'archived'
}

export interface Author {
  _id?: string
  name: string
  slug: { current: string }
  avatar?: any
  title?: string
  bio?: string
  credentials?: string[]
  specialties?: string[]
  social?: {
    website?: string
    linkedin?: string
    twitter?: string
  }
}

export interface Category {
  _id?: string
  title: string
  slug: { current: string }
  description?: string
  color?: { hex: string }
  icon?: string
}

export interface Tag {
  _id?: string
  title: string
  slug: { current: string }
  description?: string
}

export interface SiteSettings {
  title: string
  description: string
  keywords: string[]
  logo?: any
  favicon?: any
  socialMedia?: {
    twitter?: string
    facebook?: string
    instagram?: string
    youtube?: string
  }
  analytics?: {
    googleAnalytics?: string
    googleTagManager?: string
  }
} 