import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity'

export default function BlogPostCard({ post }) {
  const {
    title,
    slug,
    excerpt,
    publishedAt,
    author,
    categories,
    tags,
    mainImage,
    estimatedReadingTime
  } = post

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* 文章主图 */}
      {mainImage && (
        <div className="relative h-48 w-full">
          <Image
            src={urlFor(mainImage).width(400).height(200).url()}
            alt={mainImage.alt || title}
            fill
            className="object-cover"
          />
          {/* 分类标签 */}
          {categories && categories.length > 0 && (
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full text-white ${getCategoryColor(categories[0].color)}`}>
                {categories[0].name}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* 标题 */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link 
            href={`/blog/${slug.current}`}
            className="hover:text-green-600 transition-colors"
          >
            {title}
          </Link>
        </h3>

        {/* 摘要 */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* 标签 */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag._id}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 文章信息 */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            {author?.avatar && (
              <div className="relative w-6 h-6">
                <Image
                  src={urlFor(author.avatar).width(24).height(24).url()}
                  alt={author.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <span>{author?.name}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {estimatedReadingTime && (
              <span>{estimatedReadingTime}分钟阅读</span>
            )}
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString('zh-CN')}
            </time>
          </div>
        </div>
      </div>
    </article>
  )
}

// 获取分类颜色类
function getCategoryColor(color) {
  const colors = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500'
  }
  return colors[color] || 'bg-gray-500'
} 