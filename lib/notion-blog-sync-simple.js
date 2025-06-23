// 简化版Notion博客同步服务
// 直接创建页面，不依赖特定数据库结构

const { Client } = require('@notionhq/client')

class SimpleNotionBlogSync {
  constructor(apiKey, databaseId) {
    this.notion = new Client({
      auth: apiKey,
    })
    this.databaseId = databaseId
  }

  async syncBlogPost(blogPost) {
    try {
      console.log(`[Notion] 同步博客文章: ${blogPost.title}`)

      // 创建简单的页面
      const page = await this.notion.pages.create({
        parent: {
          database_id: this.databaseId,
        },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: blogPost.title,
                },
              },
            ],
          },
        },
        children: [
          {
            object: 'block',
            type: 'heading_1',
            heading_1: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: blogPost.title,
                  },
                },
              ],
            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `作者: ${blogPost.author} | 分类: ${blogPost.category} | 发布时间: ${blogPost.published_date}`,
                  },
                },
              ],
            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `摘要: ${blogPost.excerpt}`,
                  },
                  annotations: {
                    italic: true,
                  },
                },
              ],
            },
          },
          {
            object: 'block',
            type: 'divider',
            divider: {},
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: blogPost.content.substring(0, 1900),
                  },
                },
              ],
            },
          },
          {
            object: 'block',
            type: 'divider',
            divider: {},
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `标签: ${blogPost.tags.join(', ')}`,
                  },
                  annotations: {
                    color: 'blue',
                  },
                },
              ],
            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: `SEO关键词: ${blogPost.seo_keywords.join(', ')}`,
                  },
                  annotations: {
                    color: 'green',
                  },
                },
              ],
            },
          },
        ],
      })

      console.log(`[Notion] 创建文章成功: ${blogPost.title}`)
      console.log(`[Notion] 页面ID: ${page.id}`)
      console.log(`[Notion] 页面URL: ${page.url}`)

      return {
        success: true,
        pageId: page.id,
        pageUrl: page.url
      }
    } catch (error) {
      console.error('[Notion] 同步失败:', error.message)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // 获取数据库中的所有页面
  async getAllPages() {
    try {
      const response = await this.notion.databases.query({
        database_id: this.databaseId,
        sorts: [
          {
            timestamp: 'created_time',
            direction: 'descending',
          },
        ],
      })

      return response.results
    } catch (error) {
      console.error('[Notion] 获取页面列表失败:', error)
      return []
    }
  }

  // 测试连接
  async testConnection() {
    try {
      const database = await this.notion.databases.retrieve({
        database_id: this.databaseId
      })
      
      return {
        success: true,
        databaseTitle: database.title[0]?.plain_text || '未命名数据库',
        databaseId: database.id
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}

// 实例化同步服务
const simpleNotionBlogSync = new SimpleNotionBlogSync(
  process.env.NOTION_API_KEY || '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',
  process.env.NOTION_BLOG_DATABASE_ID || '21b6f14b923c80e5a851dc0e82f8f349'
)

module.exports = {
  SimpleNotionBlogSync,
  simpleNotionBlogSync
} 