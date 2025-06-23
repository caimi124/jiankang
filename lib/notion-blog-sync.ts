// Notion博客同步服务
// 用于将博客文章同步到Notion数据库

import { Client } from '@notionhq/client'

interface BlogPost {
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  published_date: string
  slug: string
  seo_keywords: string[]
  read_time: string
  status: 'draft' | 'published' | 'archived'
}

export class NotionBlogSync {
  private notion: Client
  private databaseId: string

  constructor(apiKey: string, databaseId: string) {
    this.notion = new Client({
      auth: apiKey,
    })
    this.databaseId = databaseId
  }

  async syncBlogPost(blogPost: BlogPost): Promise<boolean> {
    try {
      console.log(`[Notion] 同步博客文章: ${blogPost.title}`)

      // 检查文章是否已存在
      const existingPost = await this.findExistingPost(blogPost.slug)
      
      if (existingPost) {
        // 更新现有文章
        await this.updateBlogPost(existingPost.id, blogPost)
        console.log(`[Notion] 更新文章成功: ${blogPost.title}`)
      } else {
        // 创建新文章
        await this.createBlogPost(blogPost)
        console.log(`[Notion] 创建文章成功: ${blogPost.title}`)
      }

      return true
    } catch (error) {
      console.error('[Notion] 同步失败:', error)
      return false
    }
  }

  private async findExistingPost(slug: string): Promise<any> {
    try {
      const response = await this.notion.databases.query({
        database_id: this.databaseId,
        filter: {
          property: 'Slug',
          rich_text: {
            equals: slug
          }
        }
      })

      return response.results.length > 0 ? response.results[0] : null
    } catch (error) {
      console.error('[Notion] 查找文章失败:', error)
      return null
    }
  }

  private async createBlogPost(blogPost: BlogPost): Promise<void> {
    await this.notion.pages.create({
      parent: {
        database_id: this.databaseId,
      },
      properties: {
        'Title': {
          title: [
            {
              text: {
                content: blogPost.title,
              },
            },
          ],
        },
        'Slug': {
          rich_text: [
            {
              text: {
                content: blogPost.slug,
              },
            },
          ],
        },
        'Author': {
          rich_text: [
            {
              text: {
                content: blogPost.author,
              },
            },
          ],
        },
        'Category': {
          select: {
            name: blogPost.category,
          },
        },
        'Tags': {
          multi_select: blogPost.tags.map(tag => ({ name: tag })),
        },
        'Published Date': {
          date: {
            start: blogPost.published_date,
          },
        },
        'Status': {
          select: {
            name: blogPost.status,
          },
        },
        'Excerpt': {
          rich_text: [
            {
              text: {
                content: blogPost.excerpt,
              },
            },
          ],
        },
        'Read Time': {
          rich_text: [
            {
              text: {
                content: blogPost.read_time,
              },
            },
          ],
        },
        'SEO Keywords': {
          rich_text: [
            {
              text: {
                content: blogPost.seo_keywords.join(', '),
              },
            },
          ],
        },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: blogPost.content.substring(0, 2000) + '...',
                },
              },
            ],
          },
        },
      ],
    })
  }

  private async updateBlogPost(pageId: string, blogPost: BlogPost): Promise<void> {
    await this.notion.pages.update({
      page_id: pageId,
      properties: {
        'Title': {
          title: [
            {
              text: {
                content: blogPost.title,
              },
            },
          ],
        },
        'Author': {
          rich_text: [
            {
              text: {
                content: blogPost.author,
              },
            },
          ],
        },
        'Category': {
          select: {
            name: blogPost.category,
          },
        },
        'Tags': {
          multi_select: blogPost.tags.map(tag => ({ name: tag })),
        },
        'Status': {
          select: {
            name: blogPost.status,
          },
        },
        'Excerpt': {
          rich_text: [
            {
              text: {
                content: blogPost.excerpt,
              },
            },
          ],
        },
        'Read Time': {
          rich_text: [
            {
              text: {
                content: blogPost.read_time,
              },
            },
          ],
        },
        'SEO Keywords': {
          rich_text: [
            {
              text: {
                content: blogPost.seo_keywords.join(', '),
              },
            },
          ],
        },
      },
    })
  }

  // 批量同步多篇文章
  async syncMultiplePosts(blogPosts: BlogPost[]): Promise<{success: number, failed: number}> {
    let success = 0
    let failed = 0

    for (const post of blogPosts) {
      const result = await this.syncBlogPost(post)
      if (result) {
        success++
      } else {
        failed++
      }
      
      // 避免API rate limit
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    return { success, failed }
  }

  // 获取Notion数据库中的所有文章
  async getAllPosts(): Promise<any[]> {
    try {
      const response = await this.notion.databases.query({
        database_id: this.databaseId,
        sorts: [
          {
            property: 'Published Date',
            direction: 'descending',
          },
        ],
      })

      return response.results
    } catch (error) {
      console.error('[Notion] 获取文章列表失败:', error)
      return []
    }
  }
}

// 实例化同步服务
export const notionBlogSync = new NotionBlogSync(
  process.env.NOTION_API_KEY || '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',
  process.env.NOTION_BLOG_DATABASE_ID || '21b6f14b923c80e5a851dc0e82f8f349'
)

// 辅助函数：从HTML内容提取纯文本
export function extractTextFromHTML(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // 移除HTML标签
    .replace(/\s+/g, ' ') // 标准化空格
    .trim()
}

// 辅助函数：生成blog post对象
export function createBlogPostFromContent(
  title: string,
  htmlContent: string,
  metadata: {
    author: string
    category: string
    tags: string[]
    slug: string
    publishDate: string
    readTime: string
    seoKeywords: string[]
  }
): BlogPost {
  const textContent = extractTextFromHTML(htmlContent)
  const excerpt = textContent.substring(0, 200) + '...'

  return {
    title,
    content: textContent,
    excerpt,
    author: metadata.author,
    category: metadata.category,
    tags: metadata.tags,
    published_date: metadata.publishDate,
    slug: metadata.slug,
    seo_keywords: metadata.seoKeywords,
    read_time: metadata.readTime,
    status: 'published'
  }
} 