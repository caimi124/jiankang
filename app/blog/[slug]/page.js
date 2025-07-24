import { notFound } from 'next/navigation'
import { sanityClient, queries, urlFor } from '../../../lib/sanity'
import PortableTextRenderer from '../../../components/blog/PortableTextRenderer'
import Image from 'next/image'

// 生成静态参数
export async function generateStaticParams() {
  const posts = await sanityClient.fetch(
    `*[_type == "blogPost" && !(_id in path("drafts.**"))] { "slug": slug.current }`
  )
  return posts.map((post) => ({ slug: post.slug }))
}

// 生成动态metadata
export async function generateMetadata({ params }) {
  const post = await sanityClient.fetch(queries.blogPostBySlug(params.slug))
  
  if (!post) {
    return {
      title: '文章未找到 | HerbScience',
    }
  }

  const { title, excerpt, seo, mainImage } = post

  return {
    title: seo?.metaTitle || `${title} | HerbScience博客`,
    description: seo?.metaDescription || excerpt,
    keywords: seo?.keywords?.join(', '),
    robots: seo?.noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: seo?.metaTitle || title,
      description: seo?.metaDescription || excerpt,
      images: mainImage ? [urlFor(mainImage).width(1200).height(630).url()] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || title,
      description: seo?.metaDescription || excerpt,
      images: mainImage ? [urlFor(mainImage).width(1200).height(630).url()] : [],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const post = await sanityClient.fetch(queries.blogPostBySlug(params.slug))

  if (!post) {
    notFound()
  }

  const {
    title,
    body,
    publishedAt,
    updatedAt,
    author,
    categories,
    tags,
    mainImage,
    estimatedReadingTime,
    relatedHerbs
  } = post

  // 获取相关文章
  const relatedPosts = categories?.length > 0 
    ? await sanityClient.fetch(queries.relatedPosts(categories.map(c => c._id), post._id))
    : []

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 文章头部 */}
        <header className="mb-8">
          {/* 分类标签 */}
          {categories && categories.length > 0 && (
            <div className="mb-4">
              {categories.map((category) => (
                <span
                  key={category._id}
                  className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full mr-2"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {/* 标题 */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center text-gray-600 mb-6 gap-4">
            {/* 作者信息 */}
            {author && (
              <div className="flex items-center space-x-3">
                {author.avatar && (
                  <div className="relative w-10 h-10">
                    <Image
                      src={urlFor(author.avatar).width(40).height(40).url()}
                      alt={author.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{author.name}</p>
                  {author.credentials && author.credentials.length > 0 && (
                    <p className="text-sm text-gray-500">{author.credentials[0]}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4 text-sm">
              <time dateTime={publishedAt}>
                发布于 {new Date(publishedAt).toLocaleDateString('zh-CN')}
              </time>
              {updatedAt && updatedAt !== publishedAt && (
                <time dateTime={updatedAt}>
                  更新于 {new Date(updatedAt).toLocaleDateString('zh-CN')}
                </time>
              )}
              {estimatedReadingTime && (
                <span>{estimatedReadingTime}分钟阅读</span>
              )}
            </div>
          </div>

          {/* 主图 */}
          {mainImage && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
              <Image
                src={urlFor(mainImage).width(800).height(400).url()}
                alt={mainImage.alt || title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <div className="prose prose-lg prose-green max-w-none mb-12">
          <PortableTextRenderer content={body} />
        </div>

        {/* 标签 */}
        {tags && tags.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">标签</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag._id}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 相关草药 */}
        {relatedHerbs && relatedHerbs.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🌿 相关草药</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {relatedHerbs.map((herb) => (
                <a
                  key={herb._id}
                  href={`/herbs/${herb.slug.current}`}
                  className="p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center"
                >
                  <div className="font-medium text-green-900">{herb.name}</div>
                  <div className="text-sm text-green-600">{herb.englishName}</div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 作者介绍 */}
        {author && (
          <div className="border-t border-gray-200 pt-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                {author.avatar && (
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={urlFor(author.avatar).width(64).height(64).url()}
                      alt={author.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    关于作者：{author.name}
                  </h4>
                  {author.credentials && (
                    <p className="text-sm text-gray-600 mb-2">
                      {author.credentials.join(' | ')}
                    </p>
                  )}
                  {author.bio && (
                    <div className="prose prose-sm prose-gray">
                      <PortableTextRenderer content={author.bio} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* 相关文章 */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              相关推荐文章
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {relatedPost.mainImage && (
                    <div className="relative h-48">
                      <Image
                        src={urlFor(relatedPost.mainImage).width(300).height(200).url()}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      <a href={`/blog/${relatedPost.slug.current}`} className="hover:text-green-600">
                        {relatedPost.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {relatedPost.excerpt}
                    </p>
                    <time className="text-xs text-gray-500">
                      {new Date(relatedPost.publishedAt).toLocaleDateString('zh-CN')}
                    </time>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
} 