import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { Calendar, User, Tag, ArrowLeft, Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// 从本地数据获取博客文章
import { getBlogPostBySlug } from '../../../lib/blog-data'

async function getBlogPostFromNotion(slug: string) {
  // 直接从本地数据获取
  return getBlogPostBySlug(slug)
}

// 生成元数据
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getBlogPostFromNotion(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Article Not Found - HerbScience Blog',
      description: 'The requested blog article could not be found.'
    }
  }

  return {
    title: `${post.title} | HerbScience Blog`,
    description: post.excerpt || `Read about ${post.title} on HerbScience - evidence-based herbal medicine insights.`,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author || 'HerbScience Team' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://www.herbscience.shop/blog/${resolvedParams.slug}`,
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
      canonical: `https://www.herbscience.shop/blog/${resolvedParams.slug}`,
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
  const post = await getBlogPostFromNotion(resolvedParams.slug)
  
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
      name: post.author || 'HerbScience Team'
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
    url: `https://www.herbscience.shop/blog/${resolvedParams.slug}`
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
                      {post.publishDate}
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author || 'HerbScience Team'}
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
                         className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                       >
                         <Tag className="h-3 w-3 mr-1" />
                         {tag}
                       </span>
                     ))}
                  </div>
                )}
              </div>

              {/* 文章正文 */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  {post.content ? (
                    <div className="text-gray-700 leading-relaxed space-y-6">
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
                              <ul className="list-disc pl-6 space-y-2">
                                {items.map((item: string, itemIndex: number) => {
                                  if (item.startsWith('-') || item.match(/^\d+\./)) {
                                    return (
                                      <li key={itemIndex} className="text-gray-700 leading-relaxed">
                                        {item.replace(/^-\s*/, '').replace(/^\d+\.\s*/, '')}
                                      </li>
                                    )
                                  }
                                  return null
                                })}
                              </ul>
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
                  ) : (
                    <div className="text-gray-700 leading-relaxed space-y-6">
                      <p>
                        This article is currently being updated with the latest information. Please check back soon for the complete content.
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