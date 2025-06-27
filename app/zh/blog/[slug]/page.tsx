import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '../../../../components/Navigation'
import Breadcrumb from '../../../../components/Breadcrumb'
import { Calendar, User, Tag, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import { getBlogPostBySlug } from '../../../../lib/blog-data'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// 生成元数据
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = getBlogPostBySlug(resolvedParams.slug)
  
  if (!post) {
    return {
      title: '文章未找到 - 草药博客',
      description: '找不到您请求的博客文章。'
    }
  }

  return {
    title: `${post.title} | 草药博客`,
    description: post.excerpt || `阅读关于${post.title}的文章 - 基于科学的草药知识分享。`,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author || '草药科学团队' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://www.herbscience.shop/zh/blog/${resolvedParams.slug}`,
      siteName: 'HerbScience',
      images: [
        {
          url: '/hero-bg.svg',
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/hero-bg.svg']
    },
    alternates: {
      canonical: `https://www.herbscience.shop/zh/blog/${resolvedParams.slug}`,
    }
  }
}

// 静态参数生成
export async function generateStaticParams() {
  return [
    { slug: 'tcm-modernization-science' },
    { slug: 'winter-herbs-guide' },
    { slug: 'turmeric-benefits-guide-chinese' },
    { slug: 'ginseng-buying-guide' },
    { slug: 'turmeric-gut-relief-guide' }
  ]
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = getBlogPostBySlug(resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  // JSON-LD结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author || '草药科学团队'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.herbscience.shop/logo.png'
      }
    },
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    keywords: post.tags?.join(', ') || '',
    url: `https://www.herbscience.shop/zh/blog/${resolvedParams.slug}`
  }

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb 
              items={[
                { label: '首页', href: '/zh' },
                { label: '博客', href: '/zh/blog' },
                { label: post.title, href: `/zh/blog/${resolvedParams.slug}` }
              ]} 
            />

            {/* 返回按钮 */}
            <div className="mb-6">
              <Link href="/zh/blog">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span>返回博客列表</span>
                </button>
              </Link>
            </div>

            {/* 文章内容 */}
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* 文章头部 */}
              <div className="p-8 border-b border-gray-200">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    {post.category && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    )}
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.publishDate}
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author || '草药科学团队'}
                    </span>
                    {post.readTime && (
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {post.title}
                  </h1>
                  
                  {post.excerpt && (
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {/* 标签 */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 文章正文 */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  {/* 使用段落分割内容 */}
                  {post.content.split('\n\n').map((paragraph: string, index: number) => {
                    if (paragraph.trim() === '') return null
                    
                    // 处理标题
                    if (paragraph.startsWith('##')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                          {paragraph.replace('##', '').trim()}
                        </h2>
                      )
                    }
                    
                    if (paragraph.startsWith('#')) {
                      return (
                        <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                          {paragraph.replace('#', '').trim()}
                        </h1>
                      )
                    }
                    
                    // 处理列表
                    if (paragraph.includes('\n-') || paragraph.includes('\n1.')) {
                      const items = paragraph.split('\n').filter(line => line.trim())
                      return (
                        <div key={index} className="my-6">
                          {items.map((item: string, itemIndex: number) => {
                            if (item.startsWith('-') || item.match(/^\d+\./)) {
                              return (
                                <li key={itemIndex} className="ml-6 mb-2 text-gray-700 leading-relaxed">
                                  {item.replace(/^-\s*/, '').replace(/^\d+\.\s*/, '')}
                                </li>
                              )
                            } else {
                              return (
                                <p key={itemIndex} className="mb-4 text-gray-700 leading-relaxed">
                                  {item}
                                </p>
                              )
                            }
                          })}
                        </div>
                      )
                    }
                    
                    // 普通段落
                    return (
                      <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  })}
                </div>
              </div>

              {/* 文章底部 */}
              <div className="p-8 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>作者：{post.author || '草药科学团队'}</p>
                    <p>发布时间：{post.publishDate}</p>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>分享给朋友们</p>
                  </div>
                </div>
              </div>
            </article>

            {/* 相关文章推荐 */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">相关文章</h2>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center text-gray-500">
                  <p>正在加载相关文章...</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
} 