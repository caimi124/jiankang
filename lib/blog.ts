import { sanityFetch, blogQueries, type BlogPost, type Category, type Tag } from './sanity'
import { PortableText } from '@portabletext/react'

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

// Portable Text 组件配置
export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      
      return (
        <div className="my-8">
          <img
            src={buildImageUrl(value.asset._ref)}
            alt={value.alt || ''}
            className="w-full h-auto rounded-lg shadow-lg"
            loading="lazy"
          />
          {value.alt && (
            <p className="text-sm text-gray-600 text-center mt-2 italic">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      
      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-5 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700 bg-blue-50 py-2">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
    number: ({ children }: any) => <li className="ml-4">{children}</li>,
  },
}

// 渲染Portable Text内容
export function renderPortableText(content: any[]) {
  return <PortableText value={content} components={portableTextComponents} />
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