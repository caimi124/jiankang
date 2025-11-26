import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import SocialShare from '../../../components/SocialShare'
import EnhancedCTA from '../../../components/EnhancedCTA'
import ReadingExperience from '../../../components/ReadingExperience'
import RelatedArticles from '../../../components/RelatedArticles'
import PerformanceMonitor from '../../../components/PerformanceMonitor'
import EnhancedBlogContent from '../../../components/EnhancedBlogContent'
// 🎨 使用新的 Blog UX 优化组件
import { ReadingProgress } from '../../../components/blog/ReadingProgress'
import { SmartCTA } from '../../../components/blog/SmartCTA'
import { TableOfContents } from '../../../components/blog/TableOfContents'
import { Calendar, User, Tag, ArrowLeft, Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getBlogPostBySlug } from '../../../lib/sanity'
import { PortableText } from '@portabletext/react'
import { generateBlogMetaDescription, truncateDescription } from '@/lib/utils'

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

  // 安全地提取keywords
  const keywords = (post as any).seoKeywords?.join(', ') || 
    post.tags?.map((tag: any) => {
      if (typeof tag === 'string') return tag
      if (typeof tag === 'object' && tag !== null) {
        return tag.title?.title || tag.title || tag.name || ''
      }
      return String(tag)
    }).filter(Boolean).join(', ')
  
  // 安全地提取description
  const getDescription = () => {
    const seoDesc = (post as any).seoDescription
    if (seoDesc && typeof seoDesc === 'string') return seoDesc
    
    const excerpt = post.excerpt
    if (excerpt && typeof excerpt === 'string') return excerpt
    
    const description = (post as any).description
    if (description && typeof description === 'string') return description
    
    return `Read about ${post.title} on HerbScience - evidence-based herbal medicine insights.`
  }

  // ✅ 优化 SEO Meta Tags（Bing/Google 最佳实践）
  const rawTitle = (post as any).seoTitle || post.title
  const rawDescription = getDescription()
  
  // Title: 50-60 字符，Description: 120-155 字符
  const optimizedTitle = truncateDescription(rawTitle, 60, 50)
  const optimizedDescription = generateBlogMetaDescription(post.title, rawDescription)
  
  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords,
    authors: [{ name: (post.author as any)?.name || post.author || 'HerbScience Team' }],
    openGraph: {
      title: truncateDescription(post.title, 60, 30),
      description: optimizedDescription,
      type: 'article',
      url: `https://herbscience.shop/blog/${resolvedParams.slug}`,
      siteName: 'HerbScience',
      images: [
        {
          url: '/hero-bg.svg',
          width: 1200,
          height: 630,
          alt: truncateDescription(post.title, 100, 30)
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: truncateDescription(post.title, 60, 30),
      description: optimizedDescription,
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
    { slug: 'what-is-echinacea-good-for-personalized-immune-support' },
    { slug: 'turmeric-gut-relief-guide' },
    { slug: 'herbs-for-anxiety-natural-alternatives' },
    { slug: 'turmeric-pregnancy-safety-guide' },
    { slug: 'herbs-for-sleep-insomnia' },
    { slug: 'ginseng-vs-coffee-energy' },
    { slug: 'why-some-herbs-work-for-you-and-others-dont' },
    { slug: 'herb-drug-interaction-safety' },
    { slug: 'how-much-turmeric-per-day' }, // 🆕 新增
    { slug: '10-serious-side-effects-of-turmeric' }, // 🆕 新增
    { slug: 'pickled-onion-benefits' }, // 🆕 新增
    { slug: 'onion-for-cholesterol-heart-health' }, // 🆕 新增
    { slug: 'onion-for-digestion-bloating' }, // 🆕 新增
  ]
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  // 安全地提取tags文本用于JSON-LD
  const tagsText = post.tags?.map((tag: any) => {
    if (typeof tag === 'string') return tag
    if (typeof tag === 'object' && tag !== null) {
      return tag.title?.title || tag.title || tag.name || ''
    }
    return String(tag)
  }).filter(Boolean).join(', ') || ''
  
  // 安全地提取description（用于JSON-LD和页面渲染）
  const safeDescription = (() => {
    const excerpt = post.excerpt
    if (excerpt && typeof excerpt === 'string') return excerpt
    
    const description = (post as any).description
    if (description && typeof description === 'string') return description
    
    return ''
  })()
  
  // 安全地提取category
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
    author: {
      '@type': 'Person',
      name: (post.author as any)?.name || post.author || 'HerbScience Team'
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
      
      {/* 🎨 新增：阅读进度条（带百分比圆环） */}
      <ReadingProgress />
      
      {/* 🎨 新增：智能CTA（根据滚动位置变化） */}
      <SmartCTA />
      
      {/* 阅读体验控制 */}
      <ReadingExperience />
      
      {/* 性能监控 */}
      <PerformanceMonitor pageType="blog" pageSlug={resolvedParams.slug} />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
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
            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors">
              {/* 文章头部 */}
              <div className="px-8 py-12">
                <div className="mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date((post as any).publishedAt || (post as any).published_date || (post as any).date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{(post.author as any)?.name || post.author || 'HerbScience Team'}</span>
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
                        <span>{(post as any).readTime || (post as any).read_time} min read</span>
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
                  
                  {/* 分享按钮 */}
                  <div className="flex justify-end mt-6">
                    <SocialShare 
                      title={post.title}
                      url={`https://herbscience.shop/blog/${resolvedParams.slug}`}
                      description={safeDescription}
                    />
                  </div>
                </div>

                {/* 标签 */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: any, index: number) => {
                      // 安全地提取tag文本
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

              {/* 文章正文 */}
              <div className="px-8 pb-8">
                {/* 特殊优化的文章 - 使用增强版组件 */}
                {resolvedParams.slug === 'why-some-herbs-work-for-you-and-others-dont' ? (
                  <EnhancedBlogContent 
                    content={(post as any).content || ''}
                    title={post.title}
                  />
                ) : (
                  <div className="prose prose-lg max-w-none dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-li:text-gray-300 dark:prose-strong:text-white prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:mb-6 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg">
                    {Array.isArray((post as any).content) ? (
                      // Sanity PortableText content
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
                      // HTML content
                      <div dangerouslySetInnerHTML={{ __html: (post as any).content }} />
                    ) : (
                      <div className="text-gray-700 leading-relaxed space-y-6">
                        <p>
                          {(post as any).description || 'This article is currently being updated with the latest information. Please check back soon for the complete content.'}
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
                )}
              </div>

              {/* 增强CTA区域 */}
              <div className="px-8 py-8 border-t border-gray-200 dark:border-gray-700">
                <EnhancedCTA type="constitution-test" />
              </div>

              {/* 相关链接 */}
              <div className="px-8 py-8 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Related Resources</h3>
                {(() => {
                  const title = (post.title || '').toLowerCase()
                  let herbSlug = 'turmeric'
                  let herbName = 'Turmeric'
                  if (title.includes('echinacea')) { herbSlug = 'echinacea'; herbName = 'Echinacea' }
                  else if (title.includes('ginger')) { herbSlug = 'ginger'; herbName = 'Ginger' }
                  else if (title.includes('ashwagandha')) { herbSlug = 'ashwagandha'; herbName = 'Ashwagandha' }
                  else if (title.includes('rhodiola')) { herbSlug = 'rhodiola'; herbName = 'Rhodiola' }
                  else if (title.includes('onion')) { herbSlug = 'onion'; herbName = 'Onion' }
                  return (
                <div className="grid md:grid-cols-2 gap-6">
                  <Link 
                    href={`/herbs/${herbSlug}`}
                    className="group block p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 border border-transparent hover:border-green-200 dark:hover:border-green-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 mb-2">
                      {`Complete ${herbName} Herb Profile`}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Detailed scientific information about this herb's properties, dosage, and safety.
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mt-3">
                      <span className="text-sm">Learn more</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </div>
                  </Link>
                  
                  <Link 
                    href="/ingredient-checker"
                    className="group block p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 border border-transparent hover:border-green-200 dark:hover:border-green-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 mb-2">
                      {`Check ${herbName} Safety`}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Analyze interactions with your medications and supplements.
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mt-3">
                      <span className="text-sm">Check safety</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </div>
                  </Link>
                </div>
                  )
                })()}
              </div>
            </article>

            {/* 相关文章推荐 */}
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

// 本地博客文章数据作为备用
function getLocalBlogPost(slug: string) {
  const localPosts = {
    'what-is-echinacea-good-for-personalized-immune-support': {
      title: 'What Is Echinacea Good For? A Practical Guide to Personalized Immune Support',
      excerpt: 'Clear, TCM-informed guide to echinacea benefits, dosing, and safety. Learn how to use echinacea tablets, tincture, capsules, or drops for personalized immune support.',
      author: 'HerbScience Team',
      publishedAt: '2025-01-27',
      read_time: '9',
      category: 'science',
      tags: [
        'echinacea benefits',
        'echinacea immune support',
        'echinacea tablets',
        'echinacea tincture',
        'echinacea supplement',
        'echinacea capsules',
        'echinacea drops',
        'echinacea dosage for cold',
        'what is echinacea good for',
        'TCM body type'
      ],
      seoTitle: 'What Is Echinacea Good For? Benefits, Dosage, Tablets vs Tincture | HerbScience',
      seoDescription: 'Evidence-based echinacea benefits and dosage. Compare echinacea tablets vs tincture vs capsules. Use TCM body-type guidance to personalize echinacea immune support safely.',
      seoKeywords: [
        'echinacea benefits',
        'echinacea immune support',
        'echinacea tablets',
        'echinacea tincture',
        'echinacea capsules',
        'echinacea drops',
        'best echinacea supplement',
        'echinacea dosage',
        'echinacea dosage for cold'
      ],
      description: 'Use echinacea the smart way: when to take it, how much, and which form fits you best — guided by TCM body types to reduce side effects and maximize results.',
      faqs: [
        { question: 'What is echinacea good for?', answer: 'Echinacea is commonly used for short-term immune support, especially at the first sign of a cold or during seasonal stress. It may help shorten illness duration when taken early and consistently for a brief period.' },
        { question: 'What is the best echinacea supplement: tablets, tincture, or capsules?', answer: 'Tincture and liquid drops absorb quickly and are ideal at the first symptom. Tablets and capsules are convenient for daily short-term use. Choose based on your routine and sensitivity.' },
        { question: 'What is the echinacea dosage for a cold?', answer: 'Typical adult use: 300–500 mg echinacea tablets or capsules 2–3 times daily, or 2–3 servings of tincture per day at first symptoms. Use for 5–10 days and avoid long-term daily use.' },
        { question: 'Who should avoid echinacea?', answer: 'People with autoimmune conditions, severe allergies to Asteraceae (daisy family), or pronounced Yang-deficient cold constitutions should avoid or use with medical guidance. Pregnant or breastfeeding individuals should consult a clinician.' }
      ],
      content: `
<p><strong>Echinacea</strong> is a popular <strong>herbal supplement</strong> known for <strong>immune support</strong>. But generic advice like “take echinacea for a cold” often leads to guessing. This practical guide shows exactly <em>when</em> and <em>how</em> to use <strong>echinacea tablets</strong>, <strong>echinacea tincture</strong>, <strong>capsules</strong>, or <strong>drops</strong> — and how to personalize your plan using <strong>Traditional Chinese Medicine (TCM)</strong> body types to reduce side effects and get better results.</p>

<h2>Why Personalization Matters (TCM Body Types)</h2>
<p>Not everyone responds to an <strong>echinacea supplement</strong> the same way. In TCM, your <strong>constitution</strong> guides herb selection:</p>
<ul>
  <li><strong>Yang‑deficient (cold, low energy):</strong> May do better with gentle warming support; pair echinacea with ginger tea and avoid long-term use.</li>
  <li><strong>Yin‑deficient (dry, warm, irritable):</strong> Often responds well to short-term <strong>echinacea immune support</strong>, especially at the first sign of a cold.</li>
  <li><strong>Balanced constitution:</strong> Generally safe for short-term prevention during seasonal stress.</li>
  </ul>

<h2>1) Early Cold or Flu Symptoms</h2>
<p><em>Scenario:</em> scratchy throat, sneezing, fatigue.</p>
<p><strong>Action:</strong> Start echinacea at the very first sign to potentially shorten illness duration.</p>
<ul>
  <li><strong>Echinacea tea or liquid tincture:</strong> 2–3 times daily at first symptoms.</li>
  <li><strong>Echinacea tablets or capsules:</strong> 300–500 mg, 2–3 times daily for 5–10 days.</li>
  <li><strong>TCM Tip:</strong> Dry/warm constitutions respond best. Cold, fatigued types can pair with warm ginger tea.</li>
</ul>
<p><em>Practical tip:</em> Begin immediately — waiting until a full-blown cold develops is less effective.</p>

<h2>2) High‑Stress Lifestyle</h2>
<p><em>Scenario:</em> long work hours, travel, poor sleep, or seasonal stress.</p>
<p><strong>Action:</strong> Use an <strong>echinacea supplement</strong> preventively for <strong>1–2 weeks</strong> during peak stress.</p>
<ul>
  <li>Short-term <strong>echinacea capsules</strong> or <strong>tincture</strong> daily for 1–2 weeks.</li>
  <li>Pair with vitamin C, good sleep, and hydration.</li>
  <li><strong>TCM Tip:</strong> Stress often creates Qi deficiency (low energy). If cold hands/feet, combine with Qi‑tonifying herbs like <em>Astragalus</em>.</li>
</ul>

<h2>3) School Season (Kids)</h2>
<p><em>Scenario:</em> school/daycare exposure.</p>
<ul>
  <li>Use pediatric <strong>echinacea drops</strong> according to label at first sniffles.</li>
  <li>Combine with elderberry syrup for added <strong>immune support</strong>.</li>
  <li><strong>TCM Tip:</strong> Children with sensitive digestion may need smaller doses or alternatives.</li>
</ul>

<h2>4) Smart Combinations</h2>
<p><strong>Goal:</strong> boost immunity without overload.</p>
<ul>
  <li><strong>Elderberry + echinacea tincture:</strong> seasonal protection.</li>
  <li><strong>Zinc + echinacea tablets:</strong> short-term boost.</li>
  <li><strong>Vitamin C + echinacea capsules:</strong> daily resilience.</li>
</ul>
<p><strong>TCM Tip:</strong> Avoid long-term daily use. Cycle herbs based on constitution to prevent imbalance.</p>

<h2>5) Safety & Side Effects</h2>
<ul>
  <li><strong>Avoid if:</strong> autoimmune disorders, severe Asteraceae allergies, or pronounced Yang‑deficient cold constitution.</li>
  <li><strong>Possible side effects:</strong> mild GI upset, rash, headache.</li>
  <li><strong>Pregnancy & breastfeeding:</strong> consult a healthcare provider.</li>
</ul>

<h2>Quick Reference</h2>
<table>
  <thead>
    <tr>
      <th>Scenario</th>
      <th>Form</th>
      <th>Timing</th>
      <th>TCM Tip</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Early cold</td>
      <td>Tea, <strong>echinacea tincture</strong>, <strong>capsules</strong></td>
      <td>First sign, 2–3×/day</td>
      <td>Dry/warm constitution responds best</td>
    </tr>
    <tr>
      <td>Stress & fatigue</td>
      <td><strong>Capsules</strong>, <strong>tincture</strong></td>
      <td>1–2 weeks</td>
      <td>Combine with Qi‑tonifying support if cold/low energy</td>
    </tr>
    <tr>
      <td>Children</td>
      <td>Pediatric <strong>drops</strong></td>
      <td>First sniffle</td>
      <td>Watch digestive sensitivity</td>
    </tr>
    <tr>
      <td>Seasonal prevention</td>
      <td><strong>Capsules</strong>, tablets, <strong>tincture</strong></td>
      <td>Short cycles</td>
      <td>Cycle based on constitution</td>
    </tr>
  </tbody>
 </table>

<h2>Key Takeaways</h2>
<ul>
  <li>Use echinacea at the <strong>right time</strong>: first symptoms or seasonal stress.</li>
  <li>Pick the form that fits your lifestyle: <strong>echinacea tablets</strong>, <strong>tincture</strong>, <strong>capsules</strong>, or <strong>drops</strong>.</li>
  <li>Let <strong>TCM body type</strong> guide dosing and duration to improve results and reduce side effects.</li>
</ul>

<p><strong>Core value:</strong> Stop guessing. Use <em>personalized</em> echinacea plans — grounded in TCM — to support immunity safely and effectively.</p>
`
    },
    'herb-drug-interaction-safety': {
      title: 'Herb-Drug Interaction Safety: Evidence-Based Guide to Using Herbs with Medications',
      excerpt: 'Learn how to safely combine herbal supplements with prescription medications. Evidence-based interactions, risk factors, and practical safety steps.',
      author: 'HerbScience Team',
      date: '2025-09-28',
      read_time: '8',
      category: 'safety',
      tags: ['herb-drug interaction safety','herbal safety','evidence-based herbal medicine','supplement interactions','patient safety'],
      content: `
<p>Combining <strong>herbal supplements</strong> with prescription medications can be beneficial, but it also carries risks if not done carefully. This guide explains the most important <strong>herb–drug interactions</strong>, who is at higher risk, and how to use herbs safely with evidence-based best practices.</p>

<h2>Why Herb–Drug Interaction Safety Matters</h2>
<ul>
  <li><strong>Enzyme interactions</strong>: Some herbs affect CYP450 enzymes (e.g., CYP3A4), changing drug levels.</li>
  <li><strong>Pharmacodynamic overlap</strong>: Herbs and drugs with similar effects may <em>add up</em> (e.g., sedatives).</li>
  <li><strong>High‑risk groups</strong>: Polypharmacy, chronic illness, liver/kidney impairment, pregnancy.</li>
  <li><strong>Data quality</strong>: Evidence ranges from case reports to clinical trials—always weigh certainty.</li>
  
</ul>

<h2>Common Interaction Examples (Illustrative)</h2>
<ul>
  <li><strong>St. John's Wort</strong> (CYP3A4 induction): May lower levels of many drugs (e.g., some antidepressants, oral contraceptives).</li>
  <li><strong>Ginkgo</strong>: May increase bleeding risk when combined with anticoagulants/antiplatelets.</li>
  <li><strong>Valerian</strong>: Sedation may be additive with CNS depressants.</li>
  <li><strong>Licorice (glycyrrhizin)</strong>: May elevate blood pressure and potassium loss—caution with diuretics.</li>
  <li><strong>Goldenseal</strong> (CYP3A4/CYP2D6 inhibition): Potential to raise levels of some drugs.</li>
</ul>

<h2>Practical 5‑Step Safety Framework</h2>
<ol>
  <li><strong>List everything</strong>: Include prescription drugs, OTC meds, and all supplements.</li>
  <li><strong>Check interactions</strong>: Use trusted resources; start with single herbs before blends.</li>
  <li><strong>Start low, go slow</strong>: Titrate cautiously; track changes for 2–4 weeks.</li>
  <li><strong>Monitor signals</strong>: Watch for bleeding, dizziness, sedation, blood pressure changes, GI issues.</li>
  <li><strong>Consult professionals</strong>: Discuss plans with your clinician and pharmacist when on prescriptions.</li>
</ol>

<h2>Who Should Be Extra Careful</h2>
<ul>
  <li>Adults over 65, pregnant/breastfeeding individuals</li>
  <li>People with liver/kidney conditions</li>
  <li>Anyone taking anticoagulants, anti‑seizure meds, immunosuppressants, or narrow therapeutic index drugs</li>
</ul>

<h2>Key Takeaway</h2>
<p>Herbs can be powerful allies when used <strong>evidence‑based and safely</strong>. Focus on <strong>interaction checks</strong>, conservative dosing, and professional guidance when using herbs alongside medications.</p>
`
    },
    'turmeric-gut-relief-guide': {
      title: 'Turmeric Made Simple: How to Use It Today for Real Gut Relief and Pain Reduction',
      excerpt: 'Feeling bloated, achy, or tired? Discover how turmeric can help calm your gut, reduce inflammation, and boost your energy.',
      author: 'HerbScience Team',
      date: '2025-01-19',
      read_time: '8 min read',
      category: 'lifestyle',
      tags: ['turmeric benefits', 'gut health', 'natural pain relief', 'inflammation'],
      description: 'A comprehensive guide to using turmeric for digestive health and pain relief, with practical tips and dosage recommendations.'
    },
    'why-some-herbs-work-for-you-and-others-dont': {
      title: 'Why Personalized Herbal Supplements Work Better Than One-Size-Fits-All Herbal Remedies',
      excerpt: 'Walk into any supplement store and you\'ll see shelves stacked with herbal capsules and teas. But why do some herbs work for you while others don\'t? Discover how constitution tests and body type assessments help you find safe herbal supplements that actually work.',
      author: 'Dr. Sarah Chen',
      date: '2024-01-15',
      read_time: '9',
      category: 'science',
      tags: ["personalized herbal supplements","herbal remedies","constitution test","body type test","safe herbal supplements","natural supplements","immune boosting herbs","stress relief herbs","herbs for focus and energy"],
      content: `
<p>Walk into any supplement store and you'll see shelves stacked with herbal capsules and teas: ginseng for energy, echinacea for immunity, valerian for sleep. Sounds simple, right? Take the herb, feel the benefit.</p>

<p>But reality isn't that straightforward.</p>

<ul>
<li>Some people swear ginseng makes them feel amazing.</li>
<li>Others take it and feel nothing.</li>
<li>A few even feel worse—more jittery, more tired, or off balance.</li>
</ul>

<p>It's just like coffee: some people get a boost, others feel anxious, and some can drink a cup before bed and still sleep soundly. <strong>Herbal remedies</strong> are the same—your body's response depends on your <strong>individual makeup</strong>.</p>

<h2>The Problem With "One-Size-Fits-All" Herbal Supplements</h2>

<p>Most people in the West use <strong>natural supplements</strong> in a <strong>one-size-fits-all</strong> way. Buy a bottle, follow the label, hope it works.</p>

<p>But your body isn't "average." Giving everyone the same herb for fatigue is like giving everyone the same dose of caffeine—it helps some, hurts others, and leaves many unaffected.</p>

<p>What's missing is a <strong>systematic way to match the right herb to the right person</strong>—a way to create <strong>personalized herbal supplements</strong> based on your body's patterns and needs.</p>

<h2>How Science and Tradition Meet: Pattern-Based Herbal Use</h2>

<p>For <strong>over 2,000 years</strong>, Chinese medicine has used a method called <strong>syndrome differentiation</strong> (or "pattern diagnosis") to choose <strong>herbal remedies</strong> scientifically. Instead of guessing, practitioners observe your body and lifestyle:</p>

<ul>
<li>Are you prone to fatigue, feeling cold, or low-energy?</li>
<li>Do you tend to feel restless, hot, or over-stimulated?</li>
<li>Are you naturally more sluggish or more energetic?</li>
</ul>

<p>Based on these observations, <strong>safe herbal supplements</strong> are chosen to <strong>fit your personal constitution</strong>.</p>

<p>For example:</p>

<ul>
<li><strong>Ginseng</strong> often helps people with low energy, sluggishness, or weakened immunity—but can overstimulate those who are naturally high-energy or anxious.</li>
<li><strong>Valerian or chamomile</strong> supports those struggling with stress or insomnia, but may feel sedating for people who are already calm sleepers.</li>
<li><strong>Adaptogenic herbs</strong> like ashwagandha work differently depending on your stress patterns and constitution.</li>
</ul>

<p>This approach isn't folklore—it's a <strong>codified system</strong>, taught in universities, practiced by licensed professionals, and used in healthcare in China for thousands of years. Millions of people follow it, and it's part of a structured medical system.</p>

<h2>How a Constitution Test Helps Match You With the Right Herbal Remedies</h2>

<p>Ever wonder why your friend swears by an herb that did nothing for you? That's why. <strong>Herbal remedies</strong> aren't universal.</p>

<ul>
<li>The <strong>right herb</strong> can restore balance, boost energy, and improve focus.</li>
<li>The <strong>wrong one</strong> might leave you jittery, tired, or out of balance.</li>
</ul>

<p>A simple <strong>constitution test</strong> or <strong>body type test</strong> can identify your needs before you start taking anything. This is why <strong>personalized herbal supplements, safe herbal use, and pattern-based guidance</strong> are essential for effectiveness.</p>

<h2>Real Examples: How Body Types Respond to Different Herbs</h2>

<h3>Example 1: Immune Boosting Herbs</h3>
<p><strong>Echinacea</strong> and <strong>elderberry</strong> are popular <strong>immune boosting herbs</strong>, but they work differently depending on your constitution:</p>
<ul>
<li>If you tend to feel cold and have low energy, these herbs may give you the boost you need</li>
<li>If you're already warm-natured and energetic, they might make you feel overstimulated</li>
</ul>

<h3>Example 2: Stress Relief Herbs</h3>
<p><strong>Valerian</strong> and <strong>chamomile</strong> are classic <strong>stress relief herbs</strong>, but they're not right for everyone:</p>
<ul>
<li>Great for people who feel "wired but tired" or have racing thoughts</li>
<li>May cause drowsiness in people who are naturally low-energy</li>
</ul>

<h3>Example 3: Herbs for Focus and Energy</h3>
<p><strong>Ginseng</strong> and <strong>rhodiola</strong> are among the most popular <strong>herbs for focus and energy</strong>:</p>
<ul>
<li>Perfect for people with sluggish metabolism and mental fog</li>
<li>Can cause anxiety or restlessness in naturally high-energy people</li>
</ul>

<h2>How to Use Herbs the Smart Way</h2>

<p>The good news? You don't need a medical degree to start.</p>

<ul>
<li>Simple <strong>constitution tests</strong> or <strong>body type quizzes</strong> can help identify your needs.</li>
<li>Look for <strong>herbal remedies</strong> that match your pattern—whether for <strong>immune boosting herbs</strong>, <strong>stress relief herbs</strong>, or <strong>herbs for focus and energy</strong>.</li>
<li>Pay attention to safety: even <strong>natural supplements</strong> have side effects if they don't match your body.</li>
</ul>

<p>In short: <strong>know yourself first, then choose herbs scientifically.</strong> That's how you get real results.</p>

<h2>Your Step-by-Step Guide to Safe Herbal Use</h2>

<h3>Step 1: Take a Constitution Test</h3>
<p>Before trying any <strong>herbal remedies</strong>, understand your body type. A simple <strong>body type test</strong> can reveal whether you tend toward:</p>
<ul>
<li>Low energy and cold constitution (may benefit from warming, energizing herbs)</li>
<li>High energy and warm constitution (may benefit from cooling, calming herbs)</li>
<li>Balanced constitution (can handle a wider range of herbs safely)</li>
</ul>

<h3>Step 2: Choose Quality, Standardized Natural Supplements</h3>
<ul>
<li>Look for <strong>safe herbal supplements</strong> with standardized extracts</li>
<li>Choose reputable brands with third-party testing</li>
<li>Start with single herbs rather than complex formulas</li>
</ul>

<h3>Step 3: Test One Herb at a Time</h3>
<ul>
<li>Try one <strong>herbal remedy</strong> for 2-4 weeks</li>
<li>Keep a daily journal of energy, mood, and symptoms</li>
<li>Pay attention to timing and dosage</li>
</ul>

<h2>Takeaway: The Future of Personalized Herbal Supplements</h2>

<p><strong>Herbal remedies</strong> are powerful—but only when they fit your body. Forget one-size-fits-all. Think <strong>personalized herbal supplements, safe herbal guidance, and pattern-based herbal use</strong>. By aligning <strong>natural supplements</strong> with your body type, you unlock their real potential—for energy, immunity, stress relief, and focus.</p>

<p>Ready to discover which <strong>herbal remedies</strong> work best for your unique constitution?</p>

<h3>Take Your Constitution Test Today</h3>

<p>Take our <a href="/constitution-test"><strong>TCM Constitution Test</strong></a> to understand your unique <strong>body type</strong> and get <strong>personalized herbal supplement</strong> recommendations based on your individual constitution and health patterns. It's free, takes 5 minutes, and gives you a personalized roadmap to <strong>safe herbal use</strong>.</p>
  `,
      description: 'Discover the fascinating science behind individual herb effectiveness. Learn why the same herb can work wonders for some people but not others, and how to find what works best for your unique body chemistry.'
    }
    // 可以添加更多本地文章数据
  }

  return localPosts[slug as keyof typeof localPosts] || null
}