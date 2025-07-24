import { sanityClient, queries } from '../../lib/sanity'
import BlogPostCard from '../../components/blog/BlogPostCard'

export const metadata = {
  title: '草药健康博客 | HerbScience.shop',
  description: '探索草药的神奇世界，获取专业的健康建议和最新研究成果',
}

export default async function BlogPage() {
  // 从Sanity获取博客文章
  const posts = await sanityClient.fetch(queries.allBlogPosts)
  const categories = await sanityClient.fetch(queries.allCategories)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero区域 */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              🌿 草药健康博客
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              探索草药的神奇世界，获取专业的健康建议和最新研究成果
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 主内容区 */}
          <main className="lg:w-2/3">
            {posts && posts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {posts.map((post) => (
                  <BlogPostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  内容正在准备中
                </h3>
                <p className="text-gray-600 mb-6">
                  我们正在为您准备精彩的草药健康内容，敬请期待！
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    💡 提示：如何添加内容
                  </h4>
                  <p className="text-blue-700 text-sm">
                    现在您可以通过 Sanity CMS 管理界面轻松添加和编辑博客文章，无需编写代码！
                  </p>
                </div>
              </div>
            )}
          </main>

          {/* 侧边栏 */}
          <aside className="lg:w-1/3">
            {/* 分类筛选 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📂 文章分类
              </h3>
              <div className="space-y-2">
                <a
                  href="/blog"
                  className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  全部文章
                </a>
                {categories?.map((category) => (
                  <a
                    key={category._id}
                    href={`/blog/category/${category.slug.current}`}
                    className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>

            {/* 最新文章 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🌟 最新文章
              </h3>
              <div className="space-y-4">
                {posts?.slice(0, 3).map((post) => (
                  <div key={post._id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
                      <a href={`/blog/${post.slug.current}`}>
                        {post.title}
                      </a>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
} 