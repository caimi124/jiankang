import { createClient } from 'next-sanity'
import { cache } from 'react'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  stega: {
    enabled: false,
    studioUrl: '/admin'
  }
})

// 验证必需的环境变量
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable')
}

// 用于预览模式的客户端
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts'
})

export const getClient = (usePreview = false) => (usePreview ? previewClient : client)

// 缓存的查询函数
export const sanityFetch = cache(async <T>(
  query: string,
  params: Record<string, any> = {},
  options?: {
    revalidate?: number | false
    tags?: string[]
  }
): Promise<T> => {
  const { revalidate = 60, tags } = options || {}
  
  return client.fetch<T>(query, params, {
    next: { revalidate, tags }
  })
})

// 博客相关查询
export const BLOG_QUERIES = {
  // 获取所有已发布的博客文章
  ALL_POSTS: `
    *[_type == "blog" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      "author": author->{name, slug, avatar, credentials},
      "category": category->{title, slug, color},
      tags,
      publishedAt,
      readTime,
      featured,
      featuredImage,
      seo
    }
  `,
  
  // 获取单篇博客文章
  POST_BY_SLUG: `
    *[_type == "blog" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      "author": author->{name, slug, avatar, bio, credentials, expertise, social},
      "category": category->{title, slug, color, icon},
      tags,
      publishedAt,
      readTime,
      featured,
      featuredImage,
      seo,
      _updatedAt
    }
  `,
  
  // 获取特色文章
  FEATURED_POSTS: `
    *[_type == "blog" && status == "published" && featured == true] | order(publishedAt desc) [0...6] {
      _id,
      title,
      slug,
      excerpt,
      "author": author->{name, slug},
      "category": category->{title, slug, color},
      tags,
      publishedAt,
      readTime,
      featuredImage
    }
  `,
  
  // 获取按分类的文章
  POSTS_BY_CATEGORY: `
    *[_type == "blog" && status == "published" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      "author": author->{name, slug},
      "category": category->{title, slug, color},
      tags,
      publishedAt,
      readTime,
      featuredImage
    }
  `,
  
  // 获取相关文章
  RELATED_POSTS: `
    *[_type == "blog" && status == "published" && _id != $excludeId && (category->slug.current == $categorySlug || count((tags[])[@ in $tags]) > 0)] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      "author": author->{name, slug},
      "category": category->{title, slug, color},
      tags,
      publishedAt,
      readTime,
      featuredImage
    }
  `,
  
  // 获取所有分类
  ALL_CATEGORIES: `
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color,
      icon,
      "postCount": count(*[_type == "blog" && status == "published" && references(^._id)])
    }
  `,
  
  // 获取所有作者
  ALL_AUTHORS: `
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      avatar,
      bio,
      credentials,
      expertise,
      social,
      "postCount": count(*[_type == "blog" && status == "published" && references(^._id)])
    }
  `
}

// 辅助函数：检查Sanity连接
export async function testSanityConnection() {
  try {
    const result = await client.fetch('*[_type == "blog"][0...1]')
    return {
      success: true,
      message: 'Sanity connection successful',
      data: result
    }
  } catch (error) {
    return {
      success: false,
      message: 'Sanity connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// 辅助函数：格式化Portable Text为纯文本
export function portableTextToPlainText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  
  return blocks
    .filter(block => block._type === 'block')
    .map(block => {
      if (block.children) {
        return block.children.map((child: any) => child.text).join('')
      }
      return ''
    })
    .join('\n\n')
}

// 辅助函数：计算阅读时间
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
} 