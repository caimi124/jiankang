import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { Calendar, User, Tag, ArrowLeft, Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getBlogPostBySlug } from '../../../lib/sanity.js'
import { PortableText } from '@portabletext/react'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// 从Sanity获取博客文章数据
async function getBlogPost(slug: string) {
  try {
    // Try Sanity first
    const sanityPost = await getBlogPostBySlug(slug)
    if (sanityPost) {
      return sanityPost
    }

    // Fallback to local data
    return getLocalBlogPost(slug)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return getLocalBlogPost(slug)
  }
}

// 生成元数据
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Article Not Found - HerbScience Blog',
      description: 'The requested blog article could not be found.'
    }
  }

  return {
    title: post.seoTitle || `${post.title} | HerbScience Blog`,
    description: post.seoDescription || post.excerpt || post.description || `Read about ${post.title} on HerbScience - evidence-based herbal medicine insights.`,
    keywords: post.seoKeywords?.join(', ') || post.tags?.map((tag: any) => typeof tag === 'string' ? tag : tag.title).join(', '),
    authors: [{ name: post.author?.name || post.author || 'HerbScience Team' }],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.description,
      type: 'article',
      url: `https://herbscience.shop/blog/${resolvedParams.slug}`,
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
      description: post.excerpt || post.description,
      images: ['/hero-bg.svg']
    },
    alternates: {
      canonical: `https://herbscience.shop/blog/${resolvedParams.slug}`,
      languages: {
        'en': `https://herbscience.shop/blog/${resolvedParams.slug}`,
        'x-default': `https://herbscience.shop/blog/${resolvedParams.slug}`,
      }
    }
  }
}

// 静态参数生成
export async function generateStaticParams() {
  // 返回一些常见的博客文章slugs
  return [
    { slug: 'turmeric-gut-relief-guide' },
    { slug: 'herbs-for-anxiety-natural-alternatives' },
    { slug: 'turmeric-pregnancy-safety-guide' },
    { slug: 'herbs-for-sleep-insomnia' },
    { slug: 'ginseng-vs-coffee-energy' }
  ]
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  // JSON-LD结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.description,
    author: {
      '@type': 'Person',
      name: post.author?.name || post.author || 'HerbScience Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      logo: {
        '@type': 'ImageObject',
        url: 'https://herbscience.shop/logo.png'
      }
    },
    datePublished: post.publishedAt || post.published_date || post.date,
    dateModified: post.publishedAt || post.published_date || post.date,
    keywords: post.tags?.map((tag: any) => typeof tag === 'string' ? tag : tag.title).join(', ') || '',
    url: `https://herbscience.shop/blog/${resolvedParams.slug}`
  }

  // 面包屑 JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://herbscience.shop/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://herbscience.shop/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://herbscience.shop/blog/${resolvedParams.slug}` }
    ]
  }

  // FAQPage JSON-LD（如果文章包含 faqs 字段）
  const faqJsonLd = Array.isArray(post.faqs) && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  } : null

  return (
    <>
      {/* 使用路由级 OpenGraph 生成图像（/blog/[slug]/opengraph-image） */}
      <meta property="og:image" content={`https://herbscience.shop/blog/${resolvedParams.slug}/opengraph-image`} />
      <meta name="twitter:image" content={`https://herbscience.shop/blog/${resolvedParams.slug}/opengraph-image`} />
      {/* JSON-LD 结构化数据 */}
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
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.title, href: `/blog/${resolvedParams.slug}` }
              ]} 
            />

            {/* 返回按钮 */}
            <div className="mb-6">
              <Link href="/blog">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Blog</span>
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
                      {new Date(post.publishedAt || post.published_date || post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author?.name || post.author || 'HerbScience Team'}
                    </span>
                    {(post.readTime || post.read_time) && (
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime || post.read_time} min read
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
                    {post.tags.map((tag: any, index: number) => (
                       <span
                         key={index}
                         className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                       >
                         <Tag className="h-3 w-3 mr-1" />
                         {typeof tag === 'string' ? tag : tag.title}
                       </span>
                     ))}
                  </div>
                )}
              </div>

              {/* 文章正文 */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  {Array.isArray(post.content) ? (
                    // Sanity PortableText content
                    <PortableText
                      value={post.content}
                      components={{
                        block: {
                          h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
                          h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>,
                          h3: ({children}) => <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{children}</h3>,
                          normal: ({children}) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                          blockquote: ({children}) => <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
                        },
                        marks: {
                          strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                          em: ({children}) => <em className="italic">{children}</em>,
                          code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
                        },
                        list: {
                          bullet: ({children}) => <ul className="list-disc list-inside space-y-2 my-4">{children}</ul>,
                          number: ({children}) => <ol className="list-decimal list-inside space-y-2 my-4">{children}</ol>,
                        },
                        listItem: {
                          bullet: ({children}) => <li className="text-gray-700">{children}</li>,
                          number: ({children}) => <li className="text-gray-700">{children}</li>,
                        }
                      }}
                    />
                  ) : post.content ? (
                    // HTML content
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  ) : (
                    <div className="text-gray-700 leading-relaxed space-y-6">
                      <p>
                        {post.description || 'This article is currently being updated with the latest information. Please check back soon for the complete content.'}
                      </p>
                      
                      {resolvedParams.slug === 'turmeric-gut-relief-guide' && (
                        <div className="space-y-6">
                          <h2 className="text-2xl font-bold text-gray-900">What Is Turmeric — Explained Simply</h2>
                          <p>
                            Turmeric is a bright yellow root used for thousands of years in cooking and traditional medicine, especially in Asia. Its main active compound, <strong>curcumin</strong>, is known for powerful anti-inflammatory and antioxidant effects.
                          </p>
                          <p>
                            In simple terms, turmeric helps reduce "inflammation fires" in your body—those hidden causes behind bloating, joint pain, and sluggish digestion.
                          </p>

                          <h2 className="text-2xl font-bold text-gray-900">How Turmeric Can Help You Feel Better</h2>
                          <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Soothes bloating and digestive discomfort</strong> by calming irritated gut tissues.</li>
                            <li><strong>Reduces joint pain and stiffness</strong>, helping you move more comfortably.</li>
                            <li><strong>Supports your immune system</strong> and promotes overall wellness.</li>
                          </ul>
                          <p>Many people report feeling lighter, less achy, and more energetic after adding turmeric to their daily routine.</p>

                          <h2 className="text-2xl font-bold text-gray-900">How to Start Using Turmeric Right Now</h2>
                          
                          <h3 className="text-xl font-semibold text-gray-900">1. Add Turmeric Powder to Your Meals</h3>
                          <p>
                            Start by mixing <strong>½ to 1 teaspoon</strong> of turmeric powder into your soups, scrambled eggs, rice, or smoothies daily. It adds a mild earthy flavor and a golden color.
                          </p>

                          <h3 className="text-xl font-semibold text-gray-900">2. Make Turmeric Tea</h3>
                          <p>
                            Boil 1 teaspoon of turmeric powder with a pinch of black pepper (this helps your body absorb turmeric better) in water. Add lemon or honey for taste. Drink 1-2 cups a day for gut comfort.
                          </p>

                          <h3 className="text-xl font-semibold text-gray-900">3. Take Turmeric Capsules</h3>
                          <p>
                            Look for supplements with <strong>standardized curcumin extract</strong> and black pepper (piperine). Recommended dosage is <strong>500-1000 mg daily</strong>, split into 1-2 doses. Capsules are convenient and ensure consistent intake.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 相关链接 */}
              <div className="p-8 bg-gray-50 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Resources</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link 
                    href="/herbs/turmeric"
                    className="group block p-6 bg-white rounded-xl hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">
                      Complete Turmeric Herb Profile
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Detailed scientific information about turmeric's properties, dosage, and safety.
                    </p>
                    <div className="flex items-center text-blue-600 mt-3">
                      <span className="text-sm">Learn more</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </div>
                  </Link>
                  
                  <Link 
                    href="/ingredient-checker"
                    className="group block p-6 bg-white rounded-xl hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">
                      Check Turmeric Safety
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Analyze turmeric interactions with your medications and supplements.
                    </p>
                    <div className="flex items-center text-blue-600 mt-3">
                      <span className="text-sm">Check safety</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </div>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  )
}

// 本地博客文章数据作为备用
function getLocalBlogPost(slug: string) {
  const localPosts = {
    'turmeric-gut-relief-guide': {
      title: 'Turmeric Made Simple: How to Use It Today for Real Gut Relief and Pain Reduction',
      excerpt: 'Feeling bloated, achy, or tired? Discover how turmeric can help calm your gut, reduce inflammation, and boost your energy.',
      author: 'HerbScience Team',
      date: '2025-01-19',
      read_time: '8 min read',
      category: 'lifestyle',
      tags: ['turmeric benefits', 'gut health', 'natural pain relief', 'inflammation'],
      description: 'A comprehensive guide to using turmeric for digestive health and pain relief, with practical tips and dosage recommendations.'
    }
    // 可以添加更多本地文章数据
  }
  
  return localPosts[slug as keyof typeof localPosts] || null
} 