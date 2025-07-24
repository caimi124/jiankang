/**
 * 混合博客CMS系统
 * 同时支持 Sanity 和 Notion 作为内容源
 * 优先级：Sanity > Notion > 本地备份
 */

import { sanityFetch, BLOG_QUERIES, portableTextToPlainText } from './sanity'
import { simpleNotionBlogSync } from './notion-blog-sync-simple.js'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string | any[] // 支持Portable Text或纯文本
  author: {
    name: string
    slug?: string
    avatar?: string
    credentials?: string
    bio?: string
    expertise?: string[]
    social?: Record<string, string>
  }
  category: {
    title: string
    slug: string
    color?: string
    icon?: string
  }
  tags: string[]
  publishedAt: string
  readTime: string
  featured: boolean
  featuredImage?: any
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  source: 'sanity' | 'notion' | 'local'
}

export class HybridBlogCMS {
  private notionSync: any

  constructor() {
    // 延迟初始化Notion同步器
    this.initNotionSync()
  }

  private async initNotionSync() {
    try {
      const { simpleNotionBlogSync } = await import('./notion-blog-sync-simple.js')
      this.notionSync = simpleNotionBlogSync
    } catch (error) {
      console.log('Notion sync not available:', error)
    }
  }

  /**
   * 获取所有博客文章
   * 合并 Sanity 和 Notion 的内容
   */
  async getAllPosts(): Promise<BlogPost[]> {
    const posts: BlogPost[] = []

    try {
      // 1. 从 Sanity 获取文章
      const sanityPosts = await this.getSanityPosts()
      posts.push(...sanityPosts)
      console.log(`[Hybrid CMS] 从 Sanity 获取到 ${sanityPosts.length} 篇文章`)
    } catch (error) {
      console.log('[Hybrid CMS] Sanity 获取失败:', error)
    }

    try {
      // 2. 从 Notion 获取文章（排除 Sanity 中已有的）
      const notionPosts = await this.getNotionPosts()
      const filteredNotionPosts = notionPosts.filter(
        notionPost => !posts.some(post => post.slug === notionPost.slug)
      )
      posts.push(...filteredNotionPosts)
      console.log(`[Hybrid CMS] 从 Notion 获取到 ${filteredNotionPosts.length} 篇新文章`)
    } catch (error) {
      console.log('[Hybrid CMS] Notion 获取失败:', error)
    }

    // 3. 添加本地备份文章（如果没有其他来源）
    if (posts.length === 0) {
      const localPosts = this.getLocalBackupPosts()
      posts.push(...localPosts)
      console.log(`[Hybrid CMS] 使用本地备份 ${localPosts.length} 篇文章`)
    }

    // 按发布时间排序
    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  /**
   * 根据 slug 获取单篇文章
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      // 1. 优先从 Sanity 获取
      const sanityPost = await this.getSanityPostBySlug(slug)
      if (sanityPost) {
        console.log(`[Hybrid CMS] 从 Sanity 获取文章: ${slug}`)
        return sanityPost
      }
    } catch (error) {
      console.log('[Hybrid CMS] Sanity 获取单篇文章失败:', error)
    }

    try {
      // 2. 从 Notion 获取
      const notionPost = await this.getNotionPostBySlug(slug)
      if (notionPost) {
        console.log(`[Hybrid CMS] 从 Notion 获取文章: ${slug}`)
        return notionPost
      }
    } catch (error) {
      console.log('[Hybrid CMS] Notion 获取单篇文章失败:', error)
    }

    // 3. 本地备份
    const localPost = this.getLocalPostBySlug(slug)
    if (localPost) {
      console.log(`[Hybrid CMS] 从本地备份获取文章: ${slug}`)
      return localPost
    }

    return null
  }

  /**
   * 获取特色文章
   */
  async getFeaturedPosts(): Promise<BlogPost[]> {
    const allPosts = await this.getAllPosts()
    return allPosts.filter(post => post.featured).slice(0, 6)
  }

  /**
   * 按分类获取文章
   */
  async getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
    const allPosts = await this.getAllPosts()
    return allPosts.filter(post => post.category.slug === categorySlug)
  }

  // === PRIVATE METHODS ===

  /**
   * 从 Sanity 获取所有文章
   */
  private async getSanityPosts(): Promise<BlogPost[]> {
    try {
      const sanityPosts = await sanityFetch<any[]>(BLOG_QUERIES.ALL_POSTS)
      
      return sanityPosts.map(post => ({
        id: post._id,
        title: post.title,
        slug: post.slug.current,
        excerpt: post.excerpt,
        content: post.content || '',
        author: {
          name: post.author?.name || 'HerbScience Team',
          slug: post.author?.slug?.current,
          avatar: post.author?.avatar,
          credentials: post.author?.credentials
        },
        category: {
          title: post.category?.title || 'Health',
          slug: post.category?.slug?.current || 'health',
          color: post.category?.color || 'blue'
        },
        tags: post.tags || [],
        publishedAt: post.publishedAt,
        readTime: post.readTime || '5 min read',
        featured: post.featured || false,
        featuredImage: post.featuredImage,
        seo: post.seo,
        source: 'sanity' as const
      }))
    } catch (error) {
      console.error('[Hybrid CMS] Sanity posts fetch error:', error)
      return []
    }
  }

  /**
   * 从 Sanity 根据 slug 获取单篇文章
   */
  private async getSanityPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const post = await sanityFetch<any>(BLOG_QUERIES.POST_BY_SLUG, { slug })
      
      if (!post) return null

      return {
        id: post._id,
        title: post.title,
        slug: post.slug.current,
        excerpt: post.excerpt,
        content: post.content, // Portable Text
        author: {
          name: post.author?.name || 'HerbScience Team',
          slug: post.author?.slug?.current,
          avatar: post.author?.avatar,
          credentials: post.author?.credentials,
          bio: post.author?.bio ? portableTextToPlainText(post.author.bio) : undefined,
          expertise: post.author?.expertise,
          social: post.author?.social
        },
        category: {
          title: post.category?.title || 'Health',
          slug: post.category?.slug?.current || 'health',
          color: post.category?.color || 'blue',
          icon: post.category?.icon
        },
        tags: post.tags || [],
        publishedAt: post.publishedAt,
        readTime: post.readTime || '5 min read',
        featured: post.featured || false,
        featuredImage: post.featuredImage,
        seo: post.seo,
        source: 'sanity' as const
      }
    } catch (error) {
      console.error('[Hybrid CMS] Sanity single post fetch error:', error)
      return null
    }
  }

  /**
   * 从 Notion 获取所有文章
   */
  private async getNotionPosts(): Promise<BlogPost[]> {
    try {
      if (!this.notionSync) {
        await this.initNotionSync()
      }

      if (!this.notionSync) {
        console.log('[Hybrid CMS] Notion sync not available')
        return []
      }

      const notionPages = await this.notionSync.getAllPages()
      
      return notionPages.map((page: any) => ({
        id: page.id,
        title: page.title,
        slug: page.slug,
        excerpt: page.excerpt || page.content?.substring(0, 200) + '...',
        content: page.content || '',
        author: {
          name: page.author || 'HerbScience Team'
        },
        category: {
          title: page.category || 'Health',
          slug: (page.category || 'health').toLowerCase().replace(/\s+/g, '-'),
          color: 'green'
        },
        tags: page.tags || [],
        publishedAt: page.published_date || page.created_time,
        readTime: page.read_time || '5 min read',
        featured: page.featured || false,
        seo: {
          keywords: page.seo_keywords
        },
        source: 'notion' as const
      }))
    } catch (error) {
      console.error('[Hybrid CMS] Notion posts fetch error:', error)
      return []
    }
  }

  /**
   * 从 Notion 根据 slug 获取单篇文章
   */
  private async getNotionPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const allNotionPosts = await this.getNotionPosts()
      return allNotionPosts.find(post => post.slug === slug) || null
    } catch (error) {
      console.error('[Hybrid CMS] Notion single post fetch error:', error)
      return null
    }
  }

  /**
   * 获取本地备份文章
   */
  private getLocalBackupPosts(): BlogPost[] {
    const localPosts = [
      {
        id: 'local-turmeric-guide',
        title: 'Turmeric Made Simple: How to Use It Today for Real Gut Relief and Pain Reduction',
        slug: 'turmeric-gut-relief-guide',
        excerpt: 'Feeling bloated, achy, or tired? Discover how turmeric can help calm your gut, reduce inflammation, and boost your energy.',
        content: 'Complete turmeric guide content...',
        author: {
          name: 'HerbScience Team'
        },
        category: {
          title: 'Lifestyle',
          slug: 'lifestyle',
          color: 'green'
        },
        tags: ['turmeric benefits', 'gut health', 'natural pain relief', 'inflammation'],
        publishedAt: '2025-01-19T00:00:00Z',
        readTime: '8 min read',
        featured: true,
        source: 'local' as const
      }
    ]

    return localPosts
  }

  /**
   * 根据 slug 获取本地备份文章
   */
  private getLocalPostBySlug(slug: string): BlogPost | null {
    const localPosts = this.getLocalBackupPosts()
    return localPosts.find(post => post.slug === slug) || null
  }
}

// 导出单例实例
export const hybridBlogCMS = new HybridBlogCMS() 