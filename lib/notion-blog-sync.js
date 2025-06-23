// Notion博客同步服务 (JavaScript版本)
// 用于将博客文章同步到Notion数据库

const { Client } = require('@notionhq/client')

class NotionBlogSync {
  constructor(apiKey, databaseId) {
    this.notion = new Client({
      auth: apiKey,
    })
    this.databaseId = databaseId
  }

  async syncBlogPost(blogPost) {
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

  async findExistingPost(slug) {
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

  async createBlogPost(blogPost) {
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
                  content: blogPost.content.substring(0, 1900) + '...',
                },
              },
            ],
          },
        },
      ],
    })
  }

  async updateBlogPost(pageId, blogPost) {
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
  async syncMultiplePosts(blogPosts) {
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
  async getAllPosts() {
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
const notionBlogSync = new NotionBlogSync(
  process.env.NOTION_API_KEY || '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',
  process.env.NOTION_BLOG_DATABASE_ID || '21b6f14b923c80e5a851dc0e82f8f349'
)

// 辅助函数：从HTML内容提取纯文本
function extractTextFromHTML(html) {
  return html
    .replace(/<[^>]*>/g, '') // 移除HTML标签
    .replace(/\s+/g, ' ') // 标准化空格
    .trim()
}

// 辅助函数：生成blog post对象
function createBlogPostFromContent(title, htmlContent, metadata) {
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

module.exports = {
  NotionBlogSync,
  notionBlogSync,
  extractTextFromHTML,
  createBlogPostFromContent
} 