import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '../../../../components/Navigation'
import Breadcrumb from '../../../../components/Breadcrumb'
import SocialShare from '../../../../components/SocialShare'
import EnhancedCTA from '../../../../components/EnhancedCTA'
import ReadingExperience from '../../../../components/ReadingExperience'
import RelatedArticles from '../../../../components/RelatedArticles'
import PerformanceMonitor from '../../../../components/PerformanceMonitor'
import { ReadingProgress } from '../../../../components/blog/ReadingProgress'
import { SmartCTA } from '../../../../components/blog/SmartCTA'
import { Calendar, User, Tag, ArrowLeft, Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getBlogPostBySlug } from '../../../../lib/sanity'
import { PortableText } from '@portabletext/react'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// 从Sanity获取博客文章数据
async function getBlogPost(slug: string) {
  try {
    const sanityPost = await getBlogPostBySlug(slug)
    if (sanityPost) {
      return sanityPost
    }
    return null
  } catch (error) {
    console.error('获取博客文章失败:', error)
    return null
  }
}

// 生成元数据
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)
  
  if (!post) {
    return {
      title: '文章未找到 - HerbScience博客',
      description: '请求的博客文章未找到。'
    }
  }

  const keywords = (post as any).seoKeywords?.join(', ') || 
    post.tags?.map((tag: any) => {
      if (typeof tag === 'string') return tag
      if (typeof tag === 'object' && tag !== null) {
        return tag.title?.title || tag.title || tag.name || ''
      }
      return String(tag)
    }).filter(Boolean).join(', ')
  
  const getDescription = () => {
    const seoDesc = (post as any).seoDescription
    if (seoDesc && typeof seoDesc === 'string') return seoDesc
    
    const excerpt = post.excerpt
    if (excerpt && typeof excerpt === 'string') return excerpt
    
    const description = (post as any).description
    if (description && typeof description === 'string') return description
    
    return `阅读关于${post.title}的内容 - HerbScience循证草药医学见解。`
  }
  
  return {
    title: (post as any).seoTitle || `${post.title} | HerbScience博客`,
    description: getDescription(),
    keywords,
    authors: [{ name: (post.author as any)?.name || post.author || 'HerbScience团队' }],
    openGraph: {
      title: post.title,
      description: getDescription(),
      type: 'article',
      url: `https://herbscience.shop/zh/blog/${resolvedParams.slug}`,
      siteName: 'HerbScience',
      images: [
        {
          url: '/hero-bg.svg',
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: getDescription(),
      images: ['/hero-bg.svg']
    },
    alternates: {
      canonical: `https://herbscience.shop/zh/blog/${resolvedParams.slug}`,
      languages: {
        'zh': `https://herbscience.shop/zh/blog/${resolvedParams.slug}`,
        'en': `https://herbscience.shop/blog/${resolvedParams.slug}`,
        'x-default': `https://herbscience.shop/blog/${resolvedParams.slug}`,
      }
    }
  }
}

// 静态参数生成
export async function generateStaticParams() {
  return [
    { slug: 'red-onion-vs-white-onion-health-benefits' },
    { slug: 'ginger-tablets-chews-nausea-bloating-guide' },
    { slug: 'ginger-tea-menstrual-cramps-natural-relief' },
    { slug: 'turmeric-gut-relief-guide' },
    { slug: 'ashwagandha-for-women-hormone-balance' },
    { slug: 'rhodiola-smart-way-daily-rituals' },
    { slug: 'rhodiola-tea-recipes-energy-focus' },
    { slug: 'why-rhodiola-works-body-type' },
  ]
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const tagsText = post.tags?.map((tag: any) => {
    if (typeof tag === 'string') return tag
    if (typeof tag === 'object' && tag !== null) {
      return tag.title?.title || tag.title || tag.name || ''
    }
    return String(tag)
  }).filter(Boolean).join(', ') || ''
  
  const safeDescription = (() => {
    const excerpt = post.excerpt
    if (excerpt && typeof excerpt === 'string') return excerpt
    
    const description = (post as any).description
    if (description && typeof description === 'string') return description
    
    return ''
  })()
  
  const safeCategory = (() => {
    const category = post.category
    if (!category) return ''
    if (typeof category === 'string') return category
    if (typeof category === 'object' && category !== null) {
      return (category as any).title?.title || (category as any).title || (category as any).name || ''
    }
    return String(category)
  })()
  
  // JSON-LD结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: safeDescription,
    inLanguage: 'zh-CN',
    author: {
      '@type': 'Person',
      name: (post.author as any)?.name || post.author || 'HerbScience团队'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      logo: {
        '@type': 'ImageObject',
        url: 'https://herbscience.shop/logo.png'
      }
    },
    datePublished: (post as any).publishedAt || (post as any).published_date || (post as any).date,
    dateModified: (post as any).publishedAt || (post as any).published_date || (post as any).date,
    keywords: tagsText,
    url: `https://herbscience.shop/zh/blog/${resolvedParams.slug}`
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: 'https://herbscience.shop/zh' },
      { '@type': 'ListItem', position: 2, name: '博客', item: 'https://herbscience.shop/zh/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://herbscience.shop/zh/blog/${resolvedParams.slug}` }
    ]
  }

  const faqJsonLd = Array.isArray((post as any).faqs) && (post as any).faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (post as any).faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  } : null

  return (
    <>
      <meta property="og:image" content={`https://herbscience.shop/zh/blog/${resolvedParams.slug}/opengraph-image`} />
      <meta name="twitter:image" content={`https://herbscience.shop/zh/blog/${resolvedParams.slug}/opengraph-image`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      
      <ReadingProgress />
      <SmartCTA />
      <ReadingExperience />
      <PerformanceMonitor pageType="blog" pageSlug={resolvedParams.slug} />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
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

            <div className="mb-6">
              <Link href="/zh/blog">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span>返回博客</span>
                </button>
              </Link>
            </div>

            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors">
              <div className="px-8 py-12">
                <div className="mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date((post as any).publishedAt || (post as any).published_date || (post as any).date).toLocaleDateString('zh-CN')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{(post.author as any)?.name || post.author || 'HerbScience团队'}</span>
                    </div>
                    {safeCategory && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{safeCategory}</span>
                      </div>
                    )}
                    {((post as any).readTime || (post as any).read_time) && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{(post as any).readTime || (post as any).read_time}分钟阅读</span>
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  {safeDescription && (
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {safeDescription}
                    </p>
                  )}
                  
                  <div className="flex justify-end mt-6">
                    <SocialShare 
                      title={post.title}
                      url={`https://herbscience.shop/zh/blog/${resolvedParams.slug}`}
                      description={safeDescription}
                    />
                  </div>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: any, index: number) => {
                      const tagText = typeof tag === 'string' 
                        ? tag 
                        : typeof tag === 'object' && tag !== null
                          ? (tag.title?.title || tag.title || tag.name || String(tag))
                          : String(tag)
                      
                      return (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tagText}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="px-8 pb-8">
                <div className="prose prose-lg max-w-none dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-li:text-gray-300 dark:prose-strong:text-white prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:mb-6 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg">
                  {Array.isArray((post as any).content) ? (
                    <PortableText
                      value={(post as any).content}
                      components={{
                        block: {
                          h1: ({children}) => <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-8 tracking-tight">{children}</h1>,
                          h2: ({children}) => <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 tracking-tight">{children}</h2>,
                          h3: ({children}) => <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 tracking-tight">{children}</h3>,
                          normal: ({children}) => <p className="text-lg text-gray-700 leading-relaxed mb-6">{children}</p>,
                          blockquote: ({children}) => <blockquote className="border-l-4 border-green-500 bg-green-50 py-4 px-6 rounded-r-lg italic text-gray-600 my-6">{children}</blockquote>,
                        },
                        marks: {
                          strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                          em: ({children}) => <em className="italic">{children}</em>,
                          code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
                        },
                        list: {
                          bullet: ({children}) => <ul className="list-disc list-inside space-y-3 my-6 text-lg">{children}</ul>,
                          number: ({children}) => <ol className="list-decimal list-inside space-y-3 my-6 text-lg">{children}</ol>,
                        },
                        listItem: {
                          bullet: ({children}) => <li className="text-gray-700 leading-relaxed">{children}</li>,
                          number: ({children}) => <li className="text-gray-700 leading-relaxed">{children}</li>,
                        }
                      }}
                    />
                  ) : (post as any).content ? (
                    <div dangerouslySetInnerHTML={{ __html: (post as any).content }} />
                  ) : (
                    <div className="text-gray-700 leading-relaxed space-y-6">
                      <p>
                        {(post as any).description || '此文章内容正在更新中,请稍后查看完整内容。'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-8 py-8 border-t border-gray-200 dark:border-gray-700">
                <EnhancedCTA type="constitution-test" />
              </div>

              <div className="px-8 py-8 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">相关资源</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link 
                    href="/zh/herb-finder"
                    className="group block p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 border border-transparent hover:border-green-200 dark:hover:border-green-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 mb-2">
                      草药查找器
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      浏览我们的草药数据库,找到适合您的草药。
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mt-3">
                      <span className="text-sm">了解更多</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </div>
                  </Link>
                  
                  <Link 
                    href="/zh/constitution-test"
                    className="group block p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 border border-transparent hover:border-green-200 dark:hover:border-green-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 mb-2">
                      体质测试
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      了解您的体质类型,获得个性化草药建议。
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mt-3">
                      <span className="text-sm">开始测试</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </div>
                  </Link>
                </div>
              </div>
            </article>

            <RelatedArticles 
              currentSlug={resolvedParams.slug}
              category={safeCategory}
              tags={post.tags?.map((tag: any) => {
                if (typeof tag === 'string') return tag
                if (typeof tag === 'object' && tag !== null) {
                  return tag.title?.title || tag.title || tag.name || ''
                }
                return String(tag)
              }).filter(Boolean) || []}
            />
          </div>
        </main>
      </div>
    </>
  )
}

