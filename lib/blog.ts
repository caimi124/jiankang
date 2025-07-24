import { sanityFetch, blogQueries, type BlogPost, type Category, type Tag } from './sanity'

// 构建图片URL的辅助函数
function buildImageUrl(assetRef: string): string {
  if (!assetRef) return ''
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  
  // 处理asset reference格式
  const imageId = assetRef
    .replace('image-', '')
    .replace('-jpg', '.jpg')
    .replace('-png', '.png')
    .replace('-webp', '.webp')
    .replace('-svg', '.svg')
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}`
}

// 获取所有博客文章
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    return await sanityFetch<BlogPost[]>(blogQueries.getAllPosts, {}, {
      next: { revalidate: 300, tags: ['blog-posts'] } // 5分钟缓存
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// 根据slug获取单篇文章
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await sanityFetch<BlogPost>(blogQueries.getPostBySlug, { slug }, {
      next: { revalidate: 60, tags: [`blog-post:${slug}`] }
    })
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
}

// 获取特色文章
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    return await sanityFetch<BlogPost[]>(blogQueries.getFeaturedPosts, {}, {
      next: { revalidate: 600, tags: ['featured-posts'] } // 10分钟缓存
    })
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

// 获取相关文章
export async function getRelatedBlogPosts(postId: string): Promise<BlogPost[]> {
  try {
    return await sanityFetch<BlogPost[]>(blogQueries.getRelatedPosts, { postId }, {
      next: { revalidate: 300, tags: ['related-posts'] }
    })
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

// 根据分类获取文章
export async function getBlogPostsByCategory(categoryId: string): Promise<BlogPost[]> {
  try {
    return await sanityFetch<BlogPost[]>(blogQueries.getPostsByCategory, { categoryId }, {
      next: { revalidate: 300, tags: [`category:${categoryId}`] }
    })
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}

// 生成静态路径
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const slugQuery = `*[_type == "blogPost" && status == "published"].slug.current`
    return await sanityFetch<string[]>(slugQuery, {}, {
      next: { revalidate: 3600, tags: ['blog-slugs'] } // 1小时缓存
    })
  } catch (error) {
    console.error('Error fetching blog slugs:', error)
    return []
  }
}

// 辅助函数：格式化日期
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 辅助函数：计算阅读时间
export function calculateReadTime(content: any[]): number {
  if (!content) return 1
  
  // 估算字数（简单计算）
  const text = content
    .filter(block => block._type === 'block')
    .map(block => 
      block.children
        ?.map((child: any) => child.text)
        .join(' ') || ''
    )
    .join(' ')
  
  const wordsPerMinute = 200 // 中文阅读速度
  const wordCount = text.length / 2 // 中文字符估算
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  
  return Math.max(1, readTime)
}

// 导出图片URL构建函数
export { buildImageUrl } 